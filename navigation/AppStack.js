import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AddPostScreen from '../screens/AddPostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import MyPostScreen from '../screens/MyPostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// NavBar
const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    {/* <Stack.Screen name='Salamanca' component={HomeScreen} /> */}
    <Stack.Screen
      name="Salamanca Reporta"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#EEEEEE',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
          headerStyle: {
            backgroundColor: '#303841',
            shadowColor: '#ffffff',
            elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#303841"
              color="#EA9215"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: 'Generar reporte',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#EEEEEE',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#303841',
          shadowColor: '#3A4750',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#EA9215" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    </Stack.Navigator>
);

const MyPostStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Mis reportes" component={MyPostScreen} 
    options={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#EEEEEE',
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 18,
    },
      headerStyle: {
        backgroundColor: '#303841',
        shadowColor: '#ffffff',
        elevation: 0,
    },
    }}
    />
    <Stack.Screen
      name="Mis Post"
      component={MyPostScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#EEEEEE',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
      },
        headerStyle: {
          backgroundColor: '#303841',
          shadowColor: '#ffffff',
          elevation: 0,
      },
      }}
      // options={({route}) => ({
      //   // title: route.params.userName,
      //   headerBackTitleVisible: false,
      // })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#EA9215',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
      },
        headerStyle: {
          backgroundColor: '#303841',
          shadowColor: '#ffffff',
          elevation: 0,
      },
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

// Tab Navigator
const AppStack = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: '#EA9215',
        tabBarInactiveTintColor: '#EEEEEE',
        tabBarStyle: {
          backgroundColor: '#303841',
        }
      }}>
      <Tab.Screen
        name="Salamanca"
        component={FeedStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Reportes Ciudadania',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="post-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MisReportes"
        component={MyPostStack}
        options={{
          // title: "Generar reporte",
          headerShown: false,
          tabBarLabel: 'Mis Reportes',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="post-add" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};


export default AppStack;
