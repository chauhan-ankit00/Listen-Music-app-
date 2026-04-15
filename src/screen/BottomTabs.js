import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Home from './Home';
import Search from './Search';
import Library from './Library';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Icon
              name={iconName}
              size={wp('6%')}   // 👈 responsive icon size
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#fff',

        tabBarStyle: {
          height: hp('8%'),           // 👈 responsive height
          paddingBottom: hp('1%'),    // 👈 responsive padding
          borderTopLeftRadius: wp('5%'),
          borderTopRightRadius: wp('5%'),
          position: 'absolute',
          backgroundColor:'transparent'
        },

        tabBarLabelStyle: {
          fontSize: wp('3.2%'),       // 👈 responsive font
          marginBottom: hp('0.5%'),
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Library" component={Library} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}