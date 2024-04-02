import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../navigation/AuthProvider';
import {
  AddImage,
  InputField,
  InputWrapper,
  StatusWrapper,
  SubmitBtn,
  SubmitBtnText,
} from '../styles/AddPost';

import { useRefresh } from '../components/RefreshPosts';

const AddPostScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [calle, setCalle] = useState(null);
  const [colonia, setColonia] = useState(null);
  const [descripcion, setDescripcion] = useState(null);

  // const [refresh, setRefresh] = useState(false);
  const { refresh, setRefresh, notifyRefreshChange } = useRefresh();

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
    }).catch(e => {
      console.log(e);
      // Alert.alert('Imagen cancelada', 'Por favor inserta una imagen.');
      ToastAndroid.show('Imagen cancelada!', ToastAndroid.SHORT);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Url Imagen: ', imageUrl);

    firestore()
      .collection('reportes')
      .add({
        userId: user.uid,
        calle: calle,
        colonia: colonia,
        reporte: descripcion,
        repImg: imageUrl,
        estatus: 0,
        respReporte: '0',
        repTime: firestore.Timestamp.fromDate(new Date()),
        atendidoPor: "null",
        // fechaSub: 'YYYY/MM/DD'
      })
      .then(() => {
        console.log('Reporte subido!');
        ToastAndroid.showWithGravityAndOffset(
          'Tu reporte ha sido recibido. Reporte esta en revisión. Gracias por hacer de Salamanca Gto. una mejor ciudad! 😁',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          10000,
          300,
        );
        // Alert.alert(
        //   'Tu reporte ha sido recibido',
        //   'Tu reporte esta en revisión. Gracias por hacer de Salamanca Gto. una mejor ciudad! 😁',
        // );
        // Limpiar campos después de subir el reporte
        setCalle(null);
        setColonia(null);
        setDescripcion(null);

        // Activar la actualización automática
        setRefresh(true);

        // Activar la actualización automática
        notifyRefreshChange(); // Cambiará el estado de refresh y notificará a otros componentes
      })
      .catch(error => {
        console.log('Algo salió mal al subir el reporte', error);
      });
  };

  const uploadImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Agregar tiempo al nombre de imagen subida
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
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
    console.log('El estado "refresh" ha cambiado:', refresh);

    
  }, [refresh]);

  

  // const handleRefreshClick = () => {
  //   setRefresh(true);
  // }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <InputWrapper>
            {image != null ? <AddImage required source={{uri: image}} /> : <AddImage source={require('../assets/img/sImg2.png')} />}
            <InputField
              placeholder="Calle:"
              placeholderTextColor="grey"
              multiline
              numberOfLines={1}
              value={calle}
              onChangeText={content => setCalle(content)}
              required
            />
            <InputField
              placeholder="Colonia:"
              placeholderTextColor="grey"
              multiline
              numberOfLines={1}
              value={colonia}
              onChangeText={content => setColonia(content)}
              required
            />
            <InputField
              placeholder="Descripción:"
              placeholderTextColor="grey"
              multiline
              numberOfLines={3}
              value={descripcion}
              onChangeText={content => setDescripcion(content)}
              required
            />
            {uploading ? (
              <StatusWrapper>
                <Text style={styles.text}>{transferred} % Completado</Text>
                <ActivityIndicator size="large" color="#EA9215" />
              </StatusWrapper>
            ) : (
              <SubmitBtn onPress={() => {
                if(image && calle && colonia && descripcion) {
                  // submitPost
                  submitPost(image, calle, colonia, descripcion)
                  // handleRefreshClick();
                
                } else {
                  ToastAndroid.show('Por favor ingresa los datos.', ToastAndroid.SHORT);
                  // Alert.alert('No has ingresado datos', 'Por favor ingresa todos los datos.');
                }
              }}
              // {submitPost}
              >
                <SubmitBtnText> Reportar </SubmitBtnText>
              </SubmitBtn>
            )}
          </InputWrapper>

          {/* <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => console.log('notes tapped!')}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => {}}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}>+
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton> */}

          <ActionButton
            buttonColor="rgb(234, 146, 21)"
            ///icon={<Icon name="md-cut" style={styles.actionButtonIcon} />}
            verticalOrientation="down"
            renderIcon={active =>
              active ? (
                <MaterialCommunityIcons
                  name="camera-plus"
                  style={styles.actionButtonIcon}
                />
              ) : (
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  style={styles.actionButtonIcon}
                />
              )
            }>
            <ActionButton.Item
              buttonColor="#3A4750"
              title="Tomar foto"
              onPress={takePhotoFromCamera}>
              <MaterialCommunityIcons
                name="camera"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3A4750"
              title="Elegir foto de galería"
              onPress={choosePhotoFromLibrary}>
              <MaterialIcons
                name="add-photo-alternate"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
