import React from 'react';

import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../components/PostCard';
import { Container, } from '../styles/FeedStyles';

  const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    postTime: '4 mins ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-3.jpg'),
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    postTime: '2 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-6.jpg'),
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    postTime: '1 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-2.jpg'),
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-4.jpg'),
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-2.jpg'),
    postTime: '2 days ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-5.jpg'),
  },
];

const HomeScreen = () => {
    return(
        <Container>
          <FlatList 
            data={Posts}
            renderItem={({item}) => <PostCard item={item} />}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
          />
        </Container>
    );
}

export default HomeScreen;