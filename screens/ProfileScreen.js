import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../navigation/AuthProvider';

const ProfileScreen = ({navigation}) => {
  const {user, logout, isGoogleAuthenticated} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('Datos de Usuario: ', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const isGoogleUser = user?.providerData.some(provider => provider.providerId === 'google.com');

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Te registraste con Google, no puedes editar tu perfil.',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#3A4750'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg
              : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.fname : 'Test'}{' '}
          {userData ? userData.lname : 'User'}
        </Text>
        {/* <Text  >{user.uid}{"\n"}</Text> */}
        {/* <Text style={styles.aboutUser} >Hello my name is Jenny Doe and i am software deveper and 23 years old</Text> */}
        <View style={styles.userBtnWrapper}>
          {!isGoogleUser ? (
          <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <Text style={styles.userBtnTxt}>Editar Perfil</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                showToastWithGravity()
              }}>
              <Text style={styles.userBtnTxt}>Editar Perfil</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
            <Text style={styles.userBtnTxt}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#3A4750',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EEEEEE',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#EA9215',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#FFFFFF',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#3A4750',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#EA9215',
    textAlign: 'center',
    borderRadius: 20,
    height: 50,
    width: 200,
    textAlign: 'center',
    marginTop: 20,
  },
});
