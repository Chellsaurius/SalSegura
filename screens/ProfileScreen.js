import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const ProfileScreen = () => {
  const {user, logout} = useContext(AuthContext);
  return(
    <View style = {styles.container}>
      <Text style = { styles.text }>
        Usuario {user.uid}
      </Text>
      <FormButton buttonTitle='Logout' onPress={() => logout()} style={ styles.btn }/>
    </View>
  );
  
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container:{
      backgroundColor:'#3A4750',
      flex :1,
      justifyContent:'center',
      alignItems:'center',
      padding:20,
  },
  text:{
      fontSize:20,
      color:'#FFFFFF',
  }, 
  btn: {
    backgroundColor: '#EA9215',
    textAlign: 'center',
    borderRadius: 20,
    height: 50, 
    width: 200, 
    textAlign: 'center',
    marginTop: 20,
    
  }
});