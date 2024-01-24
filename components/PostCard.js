import moment from 'moment';
import React, { useContext } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../navigation/AuthProvider';
import {
  Card,
  DividerResp,
  Interaction,
  InteractionWrapper,
  PostImgResp,
  PostText,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName
} from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';

const PostCard = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserImg source={{uri: item.userImg}} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
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
        style={{width: '100%', height: 250, marginTop: 10, borderRadius: 20 }}
        resizeMode='cover'
      />

      {user.uid == item.userId ? (
        <InteractionWrapper>
          <Interaction onPress={() => onDelete(item.id)}>
            <FontAwesome5 name="trash-alt" size={25} color='#000000'/>
          </Interaction>
        </InteractionWrapper>
      ) : null}
      {item.respReporte != '0' ? (
      <DividerResp /> ): null}
      {item.respReporte != '0' ? (
      <PostText>Reporte atendido: </PostText> ): null}
      {item.respReporte != '0' ? (
        <PostImgResp source={{uri: item.respReporte}} />
      ): null}
      
    </Card>
  );
};

export default PostCard;
