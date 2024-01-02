import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const EditProfileScreen = () => {
    const {user, logout} = useContext(AuthContext);
    return(
        <View style = {styles.container}>
            <Text style = { styles.text } >Bienvenido {user.uid}</Text>
            {/* <FormButton buttonTitle = 'Logout' onPress = { () => logout() }/> */}
        </View>
    );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EEEEEE',
        flex :1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    text:{
        fontSize:20,
        color:'#000000',
    }
});
    
