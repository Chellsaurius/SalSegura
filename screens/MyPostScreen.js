import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MyPostScreen = () => {
  return (
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

      {/* <SkeletonPlaceholder borderRadius={4}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 60, height: 60, borderRadius: 50}} />
            <View style={{marginLeft: 20}}>
              <Image
                style={{width: 120, height: 20}}
                source={require('../assets/users/user-1.jpg')}
              />
              <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>
                Hello world
              </Text>
            </View>
          </View>
          <View>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
          </View>
        </SkeletonPlaceholder> */}
    </ScrollView>
  );
};

export default MyPostScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#EEEEEE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  // text: {
  //   fontSize: 20,
  //   color: '#000000',
  // },
});
