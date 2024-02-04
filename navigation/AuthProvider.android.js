import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

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
        }catch(e) {
          console.log(e);
          Alert('Ha ocurrido un error');
        }
      },
      googleLogin: async ()=> {
        try{
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          await auth().signInWithCredential(googleCredential);
        } catch(error){
          console.log({error});
        }
      },
      fbLogin: async () => {
        try {
          // Attempt login with permissions
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

          if (result.isCancelled) {
            throw 'User cancelled the login process';
          }

          // Once signed in, get the users AccessToken
          const data = await AccessToken.getCurrentAccessToken();

          if (!data) {
            throw 'Something went wrong obtaining access token';
          }

          // Create a Firebase credential with the AccessToken
          const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

          // Sign-in the user with the credential
          await auth().signInWithCredential(facebookCredential);
        }catch(error) {
          console.log({error});
        }
      },
      register: async (email, password) => {
        try {
          // if (password.length >= 6) {
            await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              firestore().collection('users').doc(auth().currentUser.uid)
              .set({
                fname: '',
                lname: '',
                email: email,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                userImg: null
              })
              .catch(error => {
                console.log('Algo salió mal al agregar un usuario: ', error);
              });
            })
            .catch(error => {
              console.log('Algo salió mal al registrarse: ', error);
            });
          // }else{
          //   Alert('La contraseña debe contener al menos 6 caracteres');
          // }
        }catch(e) {
          console.log(e)
          Alert('Ha ocurrido un error');
        }
      },
      logout: async () => {
        try {
          await auth().signOut();
        }catch(e) {
          console.log(e)
        }
      },
    }}>
      {children}
    </AuthContext.Provider>
  )
}
