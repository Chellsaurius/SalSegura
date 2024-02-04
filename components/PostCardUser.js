import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../navigation/AuthProvider';
import {
  Card,
  DividerResp,
  Interaction,
  InteractionWrapper,
  PostImgResp,
  PostText,
  PostTextRes,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName,
} from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';

const PostCardUser = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card key={item.id}>
      <UserInfo>
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
      </UserInfo>
      <PostText>Calle: {item.calle}</PostText>
      <PostText>Col. {item.colonia}</PostText>
      <PostText>{item.reporte}</PostText>
      {/* <Divider /> */}

      {/* <PostImg source={{uri: item.postImg}} /> */}
      <ProgressiveImage
        defaultImageSource={require('../assets/posts/post-img-1.jpg')}
        source={{uri: item.postImg}}
        style={{width: '100%', height: 250, marginTop: 10, borderRadius: 20}}
        resizeMode="cover"
      />

      {item.estatus == 0 ? (
        <InteractionWrapper>
          <Interaction onPress={() => onDelete(item.id)}>
            <FontAwesome5 name="trash-alt" size={25} color="#000000" />
          </Interaction>
        </InteractionWrapper>
      ) : null}
      {item.respReporte != '0' ? <DividerResp /> : null}
      {item.respReporte != '0' ? (
        <PostTextRes>Reporte atendido: </PostTextRes>
      ) : null}
      {item.respReporte != '0' ? (
        <PostImgResp source={{uri: item.respReporte}} />
      ) : null}
    </Card>
  );
};

export default PostCardUser;
