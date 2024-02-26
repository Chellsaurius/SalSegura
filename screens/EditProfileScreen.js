import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../navigation/AuthProvider';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormButton from '../components/FormButton';

const EditProfileScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getUser = async () => {
    const currentUser = await firestore()
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

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        // password: userData.password,
        userImg: imgUrl,
      })
      .then(() => {
        console.log('Usuario actualizado!');
        Alert.alert(
          'Perfil actualizado! 😎',
          'Tu perfil se actualizo exitosamente',
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Agregar tiempo al nombre de imagen subida
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`userphotos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Establecer estado transferido
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Imagen cargada!',
      //   'Gracias por hacer de Salamanca Gto. una mejor ciudad!😁',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1024,
      height: 720,
      cropping: true,
      compressImageQuality: 0.5,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      setModalVisible(!modalVisible);
      // this.bs.current.snapTo(1); ------ Pero yo no uso esto, investigar para el MODAL / Lo que hace es que cuando se seleccione la imagen se quite la ventana de Animated ------------
    }).catch(e => {
      console.log(e);
      // Alert.alert('Foto cancelada', 'Por favor inserta una foto.');
      ToastAndroid.show('Foto cancelada!', ToastAndroid.SHORT);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1024,
      height: 720,
      cropping: true,
      compressImageQuality: 0.5,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      setModalVisible(!modalVisible);
      // this.bs.current.snapTo(1); ------ Pero yo no uso esto, investigar para el MODAL ------------
    }).catch(e => {
      console.log(e);
      // Alert.alert('Foto cancelada', 'Por favor inserta una foto.');
      ToastAndroid.show('Imagen cancelada!', ToastAndroid.SHORT);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Lo cerraste');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.panel}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Actualizar Foto</Text>
                <Text style={styles.panelSubtitle}>
                  Elige tu foto de perfil
                </Text>
              </View>
              <TouchableOpacity
                style={styles.panelButton}
                onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Tomar foto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.panelButton}
                onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>
                  Elegir una foto de galeria
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.panelButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.panelButtonTitle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.modalView}>
              <Text style={styles.modalText}>Actualizar foto de perfil</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Tomar Foto</Text>
              </Pressable>
            </View> */}
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>

      <View
        style={{
          margin: 20,
          // opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={{height: 200, width: 200}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'baseline',
                  }}>
                  <MaterialIcons
                    name="photo-camera-back"
                    size={35}
                    color="#FFFFFF"
                    style={{
                      opacity: 0.7,
                      // borderWidth: 0.2,
                      borderColor: '#FFFFFF',
                      borderRadius: 5,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 50,
              marginBottom: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {/* Natanael Cervantes */}
            {userData ? userData.fname : ''} {userData ? userData.lname : ''}
          </Text>
          {/* <Text style={styles.textStyle}>{user.uid}</Text> */}
        </View>
        {/* Inputs de Editar Perfil */}
        <View style={styles.action}>
          <AntDesign name="user" size={25} color="#EA9215" />
          <TextInput
            placeholder="Nombre"
            placeholderTextColor={'#EA9215'}
            value={userData ? userData.fname : ''}
            onChangeText={txt => setUserData({...userData, fname: txt})}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <AntDesign name="user" size={25} color="#EA9215" />
          <TextInput
            placeholder="Apellido"
            placeholderTextColor={'#EA9215'}
            value={userData ? userData.lname : ''}
            onChangeText={txt => setUserData({...userData, lname: txt})}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>

        {/* Si el usuario se logeo con Google, que no se vean esto campos */}
        <View style={styles.action}>
          <Feather name="mail" size={25} color="#EA9215" />
          {/* <TextInput
            placeholder="Email"
            placeholderTextColor={'#EA9215'}
            keyboardType="email-address"
            value={userData ? userData.email : ''}
            onChangeText={txt => setUserData({...userData, email: txt})}
            autoCorrect={false}
            style={styles.textInput}
          /> */}
          <Text style={styles.textStyle}>
            {' '}
            {userData ? userData.email : ''}
          </Text>
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={25}
            color="#EA9215"
          />
          <TextInput
            placeholder="Cambiar Contraseña"
            placeholderTextColor={'#EA9215'}
            keyboardType="visible-password"
            // value={userData ? userData.password : ''}
            // onChangeText={(txt) => setUserData({...userData, password: txt})}
            // autoCorrect={false}
            style={styles.textInput}
          />
          {/* <Text style={styles.textStyle}>{userData ? userData.password : ''}</Text> */}
        </View>
        {/* <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Actualizar</Text>
        </TouchableOpacity> */}
        <FormButton
          buttonTitle="Actualizar"
          style={styles.commandButton}
          onPress={handleUpdate}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '70%',
    marginLeft: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // backgroundColor: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#EA9215',
  },
  buttonClose: {
    backgroundColor: '#EA9215',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#EA9215',
    alignItems: 'center',
    marginTop: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: '#EEEEEE',
    paddingTop: 20,
    width: '100%',
    borderRadius: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: '#000000',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#EA9215',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
});
