import React, { useContext, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);
  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Crear una cuenta</Text>

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

        <FormInput
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText="Contraseña"
          iconType="lock"
          secureTextEntry={true}
          required
        />

        <FormInput
          labelValue={confirmPassword}
          onChangeText={userPassword => setConfirmPassword(userPassword)}
          placeholderText="Confirmar contraseña"
          iconType="lock"
          secureTextEntry={true}
          required
        />

        <FormButton
          buttonTitle="Iniciar Sesión"
          onPress={() => {
            if (email && password && confirmPassword) {
              if (password.length >= 6) {
                if (password === confirmPassword) {
                  register(email, password);
                } else {
                  ToastAndroid.show('Las contraseñas no coinciden!', ToastAndroid.SHORT);
                  // Alert.alert(
                  //   'Las contraseñas no coinciden',
                  //   'Las contraseñas deben coincidir.',
                  // );
                }
              } else {
                ToastAndroid.show('Faltan datos, la contraseña debe contener al menos 6 caracteres', ToastAndroid.SHORT);
                // Alert.alert(
                //   'Faltan datos',
                //   'La contraseña debe contener al menos 6 caracteres',
                // );
              }
            } else {
              ToastAndroid.show('No hay datos, por favor complete todos los campos requeridos.', ToastAndroid.SHORT);
              // Alert.alert(
              //   'No ingreso datos',
              //   'Por favor complete todos los campos requeridos.',
              // );
            }
          }}
          // register(email, password)}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            Al registrarse, confirma que acepta nuestros{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
              Terminos de servicio
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> y </Text>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Política de privacidad
          </Text>
        </View>

        {Platform.OS === 'android' ? (
          <View>
            {/* <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          /> */}

            <SocialButton
              buttonTitle="Iniciar Sesión con Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => googleLogin()}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>
            ¿Tienes una cuenta? Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
    marginTop: '5%',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
