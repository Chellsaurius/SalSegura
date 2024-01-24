import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => (
  <Button
    title='Omitir'
    color="#000000"
    {...props}
  />
);
const Next = ({...props}) => (
  <Button
    title='>'
    color="#045633"
    {...props}
  />
);
const Done = ({...props}) => (
  <TouchableOpacity
    style={{marginHorizontal:10,marginRight:30}}
    {...props}
  >
    <Text style={{fontSize:20}}>Ok</Text>
  </TouchableOpacity>
);

const SliderScreeen = ({navigation}) => {
  return (
    <Onboarding
    SkipButtonComponent = {Skip}
    NextButtonComponent = {Next}
    DoneButtonComponent  = {Done}
    onSkip = {()=> navigation.replace("Login")}
    onDone = {()=> navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#27374D',
          image: <Image source={require('../assets/img/logo.png')} />,
          title: 'Logo',
          subtitle: '',
        },
        {
          backgroundColor: '#526D82',
          image: <Image source={require('../assets/img/salamanca.png')} />,
          title: 'Salamanca',
          subtitle: '',
        },
        {
          backgroundColor: '#9DB2BF',
          image: <Image source={require('../assets/img/SG2.png')} />,
          title: 'Cultura',
          subtitle: '',
        },
      ]}
    />
  );
};
export default SliderScreeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
