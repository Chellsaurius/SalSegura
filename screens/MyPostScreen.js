import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MyPostScreen extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style = { styles.text }>Mis reportes</Text>
      </View>
    );
  }
}

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