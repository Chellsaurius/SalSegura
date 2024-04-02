import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  // const {login, googleLogin, fbLogin} = useContext(AuthContext);

  const handleSendPasswordResetEmail = async () => {
    if (!email) {
      ToastAndroid.show(
        'No hay datos, por favor introduce un correo.',
        ToastAndroid.SHORT,
      );
      return;
    }

    setLoading(true);

    try {
      // Verificar si el usuario inició sesión con Google
      // const currentUser = auth().currentUser;
      // if (currentUser && currentUser.providerData.some(provider => provider.providerId === 'google.com')) {
      //   setLoading(false);
      //   ToastAndroid.show('No se puede restablecer la contraseña debido a que se registro con Google', ToastAndroid.SHORT);
      //   return;
      // }

      // Verificar si el correo existe en la base de datos
      const userExists = await checkUserExists(email);
      if (!userExists) {
        setLoading(false);
        ToastAndroid.show(
          'El correo no existe en el sistema.',
          ToastAndroid.SHORT,
        );
        return;
      }

      // Verificar si el usuario está inhabilitado
      const isUserDisabled = await checkUserDisabled(email);
      if (isUserDisabled) {
        setLoading(false);
        ToastAndroid.show(
          'No se puede recuperar la contraseña, cuenta inhabilitada.',
          ToastAndroid.SHORT,
        );
        return;
      }

      // Enviar correo de restablecimiento de contraseña
      await auth().sendPasswordResetEmail(email);
      setLoading(false);
      ToastAndroid.show(
        'Se ha enviado un correo para restablecer la contraseña.',
        ToastAndroid.SHORT,
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
      ToastAndroid.show(
        'Ocurrió un error al enviar el correo de restablecimiento.',
        ToastAndroid.SHORT,
      );
    }
  };

  const checkUserExists = async email => {
    try {
      // Realizar una consulta a la colección de usuarios en Firebase Firestore
      const userSnapshot = await firebase
        .firestore()
        .collection('users')
        .where('email', '==', email)
        .limit(1) // Limitar el resultado a un solo documento
        .get();
        
      // Verificar si se encontraron resultados en la consulta
      if (!userSnapshot.empty) {
        // Si el usuario existe, verificar si está registrado con Google
        const userData = userSnapshot.docs[0].data();
        if (userData.registeredWithGoogle) {
          return false; // Usuario registrado con Google, no se puede restablecer la contraseña
        }
        return true; // Usuario registrado en la aplicación
      } else {
        return false; // Usuario no encontrado en la colección de usuarios
      }
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la consulta
      console.error('Error al verificar usuario:', error);
      throw error;
    }
  };

  const checkUserDisabled = async email => {
    try {
      // Realizar una consulta a la colección de usuarios en Firebase Firestore
      const userSnapshot = await firebase
        .firestore()
        .collection('users')
        .where('email', '==', email)
        .limit(1) // Limitar el resultado a un solo documento
        .get();
  
      // Verificar si se encontraron resultados en la consulta
      if (!userSnapshot.empty) {
        // Si el usuario existe, obtener sus datos
        const userData = userSnapshot.docs[0].data();
        // Verificar si el usuario está inhabilitado
        if (userData.disabled) {
          return true; // Usuario inhabilitado
        } else {
          return false; // Usuario habilitado
        }
      } else {
        return false; // Usuario no encontrado en la colección de usuarios
      }
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la consulta
      console.error('Error al verificar usuario inhabilitado:', error);
      throw error;
    }
  };
  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../assets/img/salamanca.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Salamanca Segura</Text>
        <Text style={styles.text}>Restablecer contraseña</Text>

        <FormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText="Correo"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          required
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            Si estas inhabilitado no puedes restablecer tu contraseña.
          </Text>
          <Text style={styles.color_textPrivate}>
            No necesitas restablecer la contraseña si te registraste con Google.
          </Text>
          {/* <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
              Terminos de servicio
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> y </Text>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Política de privacidad
          </Text> */}
        </View>

        <FormButton
          buttonTitle="Enviar"
          onPress={handleSendPasswordResetEmail}
          disabled={loading}
        />
        {loading && <ActivityIndicator size="small" />}
        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.navButtonText}>
            No tienes cuenta. Registrate aquí.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: '5%',
    color: '#11235a',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: '5%',
    justifyContent: 'center',
    
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
    textAlign: 'center',
    marginBottom: '2%'
  },
});
