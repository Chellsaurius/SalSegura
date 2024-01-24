import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import PostCard from '../components/PostCard';
import { Container } from '../styles/FeedStyles';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreen = () => {
  const [reportes, setReportes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchReportes = async () => {
    try {
      const list = [];

      await firestore()
        .collection('reportes')
        // .where('estatus', '!=', 0)
        .orderBy('repTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Reportes: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {userId, reporte, calle, colonia, repImg, repTime, respReporte} =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Christy Alex',
              userImg:
                'https://imagenes.elpais.com/resizer/S9AkQVs_IKOK6fRyBlrNhanuQ9g=/1960x1470/filters:focal(1743x722:1753x732)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/VQPBQ4UU2OOA7MXYFFQFVJ4PBM.jpg',
              postTime: repTime,
              reporte,
              calle,
              colonia,
              postImg: repImg,
              respReporte,
              // Alumbrado y Limpia
            });
          });
        });

      setReportes(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Reportes: ', reportes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  useEffect(() => {
    fetchReportes();
    setDeleted(false);
  }, [deleted]);

  // Modal de confirmación para eliminar un reporte 
  const handleDelete = (reporteId) => {
    Alert.alert(
      'Eliminar reporte', 
      '¿Estás seguro de eliminar tu reporte?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Se presiono cancelar!'),
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => deleteReporte(reporteId),
        },
      ],
      { cancelable: false }
    );
  }

  const deleteReporte = reporteId => {
    console.log('Actual Reporte Id: ', reporteId);

    firestore()
      .collection('reportes')
      .doc(reporteId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {repImg} = documentSnapshot.data();

          // Si la imagen de publicación no es nula la eliminamos 
          
          if (repImg != null) {
            const storageRef = storage().refFromURL(repImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${repImg} ha sido eliminada exitosamente.`);
                deleteFirestoreData(reporteId);
                setDeleted(true);
              })
              .catch(e => {
                console.log('Error al borrar la imagen. ', e);
              });
              // De lo contrario, si la img de la publicación es nula entoces que elimine solo el texto
          } else {
            deleteFirestoreData(reporteId);
          }
        }
      });
  };

  const deleteFirestoreData = reportesId => {
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
      .catch(e => console.log('Error al eliminar el reporte.', e));
  };

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={{flex:1}}>
      {loading ? (
      <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{alignItems: 'center'}}>
      <SkeletonPlaceholder>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <View style={{width: 60, height: 60, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 30}}>
          <View
            style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
          />
          <View
            style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
          />
          <View
            style={{marginTop: 6, width: 300, height: 20, borderRadius: 4}}
          />
          <View
            style={{marginTop: 6, width: 350, height: 250, borderRadius: 4}}
          />
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <View style={{width: 60, height: 60, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 30}}>
          <View
            style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
          />
          <View
            style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
          />
          <View
            style={{marginTop: 6, width: 300, height: 20, borderRadius: 4}}
          />
          <View
            style={{marginTop: 6, width: 350, height: 250, borderRadius: 4}}
          />
        </View>
      </SkeletonPlaceholder>
      </ScrollView>
    ) : (
      <Container>
        <FlatList
          data={reportes}
          renderItem={({item}) => (
            <PostCard item={item} onDelete={handleDelete} />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    )}
    </SafeAreaView>
    
  );
};

export default HomeScreen;
