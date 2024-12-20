import React, { useContext, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();

  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../assets/img/salamanca.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Salamanca Segura</Text>

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

        {/* <FormInput
          labelValue={confirmPassword}
          onChangeText={userPassword => setConfirmPassword(userPassword)}
          placeholderText="Confirmar contraseña"
          iconType="lock"
          secureTextEntry={true}
          required
        /> */}

        <FormButton
          buttonTitle="Ingresar"
          onPress={() => {
            if (email && password) {
              // if (password === confirmPassword) {
                login(email, password);
              // } else {
              //   Alert.alert(
              //     'Contraseña incorrecta',
              //     'Por favor introduce la contraseña correcta.',
              //   );
              // }
            } else {
              ToastAndroid.show('Faltan campos!, Por favor completa todos los campos requeridos.', ToastAndroid.SHORT);
            }
          }}
        />
        <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.navButtonText}>Olvidaste tu contraseña</Text>
        </TouchableOpacity>

        {Platform.OS === 'android' ? (
          <View>
            {/* <SocialButton
            buttonTitle="Sign In with Facebook"
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
export default LoginScreen;

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
    marginBottom: 10,
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
});
