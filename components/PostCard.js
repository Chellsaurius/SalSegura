import React, { useContext } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../navigation/AuthProvider';
import {
  Card,
  Interaction,
  InteractionWrapper,
  PostImg,
  PostText,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName,
} from '../styles/FeedStyles';

const PostCard = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserImg source={{uri: item.userImg}} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{item.postTime.toString()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>Calle: {item.calle}</PostText>
      <PostText>Col. {item.colonia}</PostText>
      <PostText>{item.reporte}</PostText>
      {/* <Divider /> */}

      <PostImg source={{uri: item.postImg}} />

      {user.uid == item.userId ? (
        <InteractionWrapper>
          <Interaction onPress={() => onDelete(item.id)}>
            <FontAwesome5 name="trash-alt" size={25} color='#000000'/>
          </Interaction>
        </InteractionWrapper>
      ) : null}
    </Card>
  );
};

export default PostCard;
