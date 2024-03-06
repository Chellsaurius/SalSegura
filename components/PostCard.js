import firestore from '@react-native-firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import {
  Card,
  DividerResp,
  PostImgResp,
  PostText,
  PostTextRes,
  TxtRespReporte
} from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';

// import { useRefresh } from '../components/RefreshPosts';

const PostCard = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isCardActive, setIsCardActive] = useState(true);

  // const { refresh, setRefresh } = useRefresh();
  // const [localRefresh, setLocalRefresh] = useState(false);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('Datos de Usuario: ', documentSnapshot.data());
          setUserData(documentSnapshot.data());

          // Verificar si el estatus es 3 y si la tarjeta aún está activa
          if (item.estatus === 3 && isCardActive) {
            setIsCardActive(true);
            // setRefresh(true);
          }
        }
      });
  };

  // useEffect(() => {
  //   setLocalRefresh(refresh);
  // }, [refresh]);

  useEffect(() => {
    getUser();
  }, []);
  // }, [localRefresh]);

  // No renderizar la tarjeta si isCardActive es false
  if (!isCardActive || item.estatus === 10) {
    return null;
  }

  return (
    <Card key={item.id}>
      {/* <UserInfo>
        <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
        <UserInfoText>
          <UserName>
            {userData ? userData.fname || 'Test' : 'Test'}{' '}
            {userData ? userData.lname || 'User' : 'User'}
          </UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo> */}
      <PostText>Calle: {item.calle}</PostText>
      <PostText>Col. {item.colonia}</PostText>
      <PostText>{item.reporte}</PostText>
      {/* <Divider /> */}

      {/* <PostImg source={{uri: item.postImg}} /> */}
      <ProgressiveImage
        defaultImageSource={require('../assets/posts/post-img-1.jpg')}
        source={{uri: item.postImg}}
        style={{width: '100%', height: 250, marginTop: '5%', borderRadius: 20}}
        resizeMode="cover"
      />

      {item.respReporte != '0' && (
        <>
          <DividerResp />
          <TxtRespReporte><PostTextRes style={{color: 'white'}}>Reporte atendido por:{"\n"}{item.atendidoPor}</PostTextRes></TxtRespReporte>
          <PostImgResp source={{uri: item.respReporte}} />
        </>
      )}
      
    </Card>
  );
};

export default PostCard;
