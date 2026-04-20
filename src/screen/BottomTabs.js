import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HomeStack from './HomeStack';
import Search from './Search';
import Library from './Library';
import Profile from './Profile';
import MiniPlayer from './utils/MiniPlayer';

const Tab = createBottomTabNavigator();


import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomTabs() {
  const insets = useSafeAreaInsets(); 

  return (
    <View style={{ flex: 1 }}>
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarIcon: ({ focused }) => {
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
                size={focused ? wp('7%') : wp('6%')}
                color="#fff"
                style={{ transform: [{ scale: focused ? 1.1 : 1 }] }}
              />
            );
          },

          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',

          tabBarStyle: {
            height: hp('8%') + insets.bottom, //  FIX
            paddingBottom: insets.bottom,     //  FIX
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            borderTopWidth: 0,
          },

          tabBarLabelStyle: {
            fontSize: wp('3.2%'),
            marginBottom: hp('0.5%'),
            color: '#fff',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Library" component={Library} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>

      <MiniPlayer />
    </View>
  );
}