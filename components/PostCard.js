import React from 'react';
import {
  Card,
  PostImg,
  PostText,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName
} from '../styles/FeedStyles';

const PostCard = ({item}) => {
  return (
    <Card>
      <UserInfo>
        <UserImg source={item.userImg} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{item.postTime}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {/* <Divider /> */}
      
      <PostImg source={item.postImg} />
    </Card>
  );
};

export default PostCard;
