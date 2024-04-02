import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  // const isUserDisabled = async (uid) => {
  //   try {
  //     const userRecord = await auth().getUser(uid);
  //     return userRecord.disabled;
  //   } catch (error) {
  //     console.error('Error al verificar usuario inhabilitado:', error);
  //     return true;
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            // if (password.length >= 6) {
            await auth().signInWithEmailAndPassword(email, password);
            // }else{
            //   Alert('La contraseña debe contener al menos 6 caracteres');
            // }
          } catch (e) {
            console.log(e);
            if (e.code === 'auth/invalid-credential') {
              ToastAndroid.show(
                'Usuario o contraseña incorrecta!',
                ToastAndroid.SHORT,
              );
            } else if (e.code === 'auth/user-disabled') {
              ToastAndroid.show('Usuario inhabilitado!', ToastAndroid.SHORT);
            } else if (e.code === 'auth/too-many-requests') {
              ToastAndroid.show(
                'Usuario inhabilitado, intentalo más tarde.' + e,
                ToastAndroid.SHORT,
              );
            } else {
              ToastAndroid.show(
                'Usuario inhabilitado, intentalo más tarde.',
                ToastAndroid.SHORT,
              );
            }
          }
        },
        googleLogin: async () => {
          try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            // console.log(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.log({error});
            ToastAndroid.show('Usuario inhabilitado...!', ToastAndroid.SHORT);
          }
        },
        // isUserDisabled, // Agregamos la función isUserDisabled al contexto de autenticación
        fbLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccessToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential);
          } catch (error) {
            console.log({error});
          }
        },
        register: async (email, password) => {
          try {
            // Expresión regular para validar el correo electrónico
            const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            // Validar el correo electrónico
            if (!emailRegex.test(email)) {
              ToastAndroid.show(
                'Ingrese una direccion de correo valida.',
                ToastAndroid.SHORT,
              );
              // console.log(email);
              return;
            }
            if (password.length >= 6) {
              await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .set({
                      fname: '',
                      lname: '',
                      email: email,
                      createdAt: firestore.Timestamp.fromDate(new Date()),
                      userImg:
                        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    })
                    .catch(error => {
                      console.log(
                        'Algo salió mal al agregar un usuario: ',
                        error,
                      );
                    });
                })
                .catch(error => {
                  ToastAndroid.show(
                    'Correo electronico ya registrado.',
                    ToastAndroid.SHORT,
                  );
                  console.log('Algo salió mal al registrarse: ', error);
                });
            } else {
              ToastAndroid.show('La contraseña debe contener al menos 6 caracteres.', ToastAndroid.SHORT);
              // Alert('La contraseña debe contener al menos 6 caracteres');
            }
          } catch (e) {
            console.log(e);
            ToastAndroid.show('Ha ocurrido un error.', ToastAndroid.SHORT);
            // Alert('Ha ocurrido un error');
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
