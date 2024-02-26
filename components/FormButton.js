import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { windowHeight } from '../utils/Dimentions';

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#2e64e5',
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
    alignSelf: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
});