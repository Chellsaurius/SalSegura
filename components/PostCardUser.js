import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/es';
import React, { useContext, useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../navigation/AuthProvider';
import {
  BtnStatus,
  Card,
  DividerResp,
  Interaction,
  InteractionWrapper,
  PostImgResp,
  PostText,
  PostTextRes,
  PostTime,
  TxtRespReporte,
  TxtStatus,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName
} from '../styles/FeedStylesMyPosts';
import ProgressiveImage from './ProgressiveImage';

moment.locale('es');  // Establece el idioma a español

const PostCardUser = ({item, onDelete}) => {
  const {user, logout, isGoogleAuthenticated} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('Datos de Usuario: ', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const isGoogleUser = user?.providerData.some(
    provider => provider.providerId === 'google.com',
  );

  useEffect(() => {
    getUser();
  }, []);

  let statusColor;
  let statusText;

  switch (item.estatus) {
    case 0:
      statusColor = '#7FC7D9';
      statusText = 'Por revisar';
      break;
    case 1:
      statusColor = '#40A2E3';
      statusText = 'Revisado';
      break;
    case 2:
      statusColor = '#E8C872';
      statusText = 'En proceso';
      break;
    case 3:
      statusColor = '#0D9276';
      statusText = 'Completo';
      break;
      case 10:
        statusColor = '#EA9215';
        statusText = 'Finalizado';
        break;
    case 999:
      statusColor = '#D04848';
      statusText = 'Rechazado';
      break;
    default:
      // Valor por defecto o manejo de otro caso si es necesario
      break;
  }

  return (
    <Card key={item.id}>
      <UserInfo>
      {!isGoogleUser ? (
          <UserImg
            source={{
              uri: userData
                ? userData.userImg
                : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
        ) : (
          <UserImg
            source={{
              uri: user && user.photoURL 
              ? user.photoURL 
              : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
        )}
        
        <UserInfoText>
          <UserName>
            {userData ? userData.fname || 'Test' : user.displayName}{' '}
            {userData ? userData.lname || 'User' : ''}
          </UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>Calle: {item.calle}</PostText>
      <PostText>Col. {item.colonia}</PostText>
      <PostText>{item.reporte}</PostText>

      {/* <Divider /> */}
      {/* <PostText>{item.estatus}</PostText> */}

      {item.estatus !== undefined && (
        <BtnStatus style={{backgroundColor: statusColor}}>
          <TxtStatus style={{marginTop: 10}}>Estatus: {statusText}</TxtStatus>
        </BtnStatus>
      )}

      {/* <PostImg source={{uri: item.postImg}} /> */}
      <ProgressiveImage
        defaultImageSource={require('../assets/posts/post-img-1.jpg')}
        source={{uri: item.postImg}}
        style={{width: '100%', height: 250, borderRadius: 20}}
        resizeMode="cover"
      />

      {item.estatus == 0 ? (
        <InteractionWrapper>
          <Interaction onPress={() => onDelete(item.id)}>
            <FontAwesome5 name="trash-alt" size={25} color="#000000" />
          </Interaction>
        </InteractionWrapper>
      ) : null}
      {item.respReporte != '0' && (
        <>
          <DividerResp />
          <TxtRespReporte><PostTextRes style={{color: 'white'}}>Reporte atendido por:{"\n"}{item.atendidoPor}</PostTextRes></TxtRespReporte>
          <PostImgResp source={{uri: item.respReporte}} />
        </>
      )}

      {/* {item.respReporte != '0' ? (
        
      ) : null}
      {item.respReporte != '0' ? (
        
      ) : null} */}
    </Card>
  );
};

export default PostCardUser;
