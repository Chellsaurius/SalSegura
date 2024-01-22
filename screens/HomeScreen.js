import React, { useEffect, useState } from 'react';

import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../components/PostCard';
import { Container } from '../styles/FeedStyles';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-3.jpg'),
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-6.jpg'),
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-2.jpg'),
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-4.jpg'),
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-2.jpg'),
    postTime: '2 days ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-5.jpg'),
  },
];

const HomeScreen = () => {
  const[reportes, setReportes] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportes = async() => {
      try {
        const list = [];

        await firestore()
        .collection('reportes')
        .orderBy('repTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Reportes: ', querySnapshot.size);
          
          querySnapshot.forEach(doc => {
            const {userId, reporte, calle, colonia, repImg, repTime} = doc.data();
            list.push({
              id: doc.id,
              userId, 
              userName: 'Christy Alex',
              userImg: 'https://imagenes.elpais.com/resizer/S9AkQVs_IKOK6fRyBlrNhanuQ9g=/1960x1470/filters:focal(1743x722:1753x732)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/VQPBQ4UU2OOA7MXYFFQFVJ4PBM.jpg',
              postTime: repTime,
              reporte,
              calle,
              colonia,
              postImg: repImg,
          });
          })
        })

        setReportes(list);

        if(loading) {
          setLoading(false);
        }

        console.log('Reportes: ', reportes);

      } catch(e) {
        console.log(e);
      }
    }

    fetchReportes();

  }, []);

  const deleteReporte = (reporteId) => {
    console.log('Actual Reporte Id: ', reporteId);

    firestore().collection('reportes')
    .doc(reporteId)
    .get()
    .then(documentSnapshot => {
      if( documentSnapshot.exists ) {
        const {repImg} = documentSnapshot.data();

        if( repImg != null ) {
          const storageRef = storage().refFromURL(repImg);
          const imageRef = storage().ref(storageRef.fullPath);

          imageRef
          .delete()
          .then(() => {
            console.log(`${repImg} ha sido eliminada exitosamente.`);
            deleteFirestoreData(reporteId);
          })
          .catch((e) => {
            console.log('Error al borrar la imagen. ', e)
          })
        }
      }
    })
  }

  const deleteFirestoreData = (reportesId) => {
    firestore()
    .collection('reportes')
    .doc(reportesId)
    .delete()
    .then(() => {
      Alert.alert(
        'Reporte eliminado',
        'Tu reporte se elimino. Gracias por hacer de Salamanca Gto. una mejor ciudad!😁',
      );
    })
    .catch(e => console.log('Error al eliminar el reporte.', e))
  }

  return (
    <Container>
      <FlatList
        data={reportes}
        renderItem={({item}) => <PostCard item={item} onDelete={deleteReporte}/>}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default HomeScreen;
