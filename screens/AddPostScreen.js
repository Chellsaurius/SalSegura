import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
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

const AddPostScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [calle, setCalle] = useState(null);
  const [colonia, setColonia] = useState(null);
  const [descripcion, setDescripcion] = useState(null);

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
        respReporte: "0",
        repTime: firestore.Timestamp.fromDate(new Date()),
        // fechaSub: 'YYYY/MM/DD'
      })
      .then(() => {
        console.log('Reporte subido!');
        Alert.alert(
          'Tu reporte ha sido recibido',
          'Tu reporte esta en revisión. Gracias por hacer de Salamanca Gto. una mejor ciudad! 😁',
        );
        setCalle(null);
        setColonia(null);
        setDescripcion(null);
      })
      .catch((error) => {
        console.log('Algo salió mal al subir el reporte', error);
      });
  }

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

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}
        <InputField
          placeholder="Calle"
          placeholderTextColor="grey"
          multiline
          numberOfLines={1}
          value={calle}
          onChangeText={(content) => setCalle(content)}
        />
        <InputField
          placeholder="Colonia"
          placeholderTextColor="grey"
          multiline
          numberOfLines={1}
          value={colonia}
          onChangeText={(content) => setColonia(content)}
        />
        <InputField
          placeholder="Descripción"
          placeholderTextColor="grey"
          multiline
          numberOfLines={3}
          value={descripcion}
          onChangeText={(content) => setDescripcion(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text style={styles.text}>{transferred} % Completado</Text>
            <ActivityIndicator size="large" color="#EA9215" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost} >
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

      <ActionButton buttonColor="rgb(234, 146, 21)" 
      ///icon={<Icon name="md-cut" style={styles.actionButtonIcon} />}

      renderIcon={active => active ? (<MaterialCommunityIcons
        name="camera-plus" style={styles.actionButtonIcon} /> ) : (<MaterialCommunityIcons
          name="camera-plus-outline" style={styles.actionButtonIcon} />)}>
        <ActionButton.Item
          buttonColor="#3A4750"
          title="Tomar foto"
          onPress={takePhotoFromCamera}>
          <MaterialCommunityIcons name="camera" style={styles.actionButtonIcon} />
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
