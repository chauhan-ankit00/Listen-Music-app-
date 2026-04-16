// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';


// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import HomeStack from './HomeStack';
// import Search from './Search';
// import Library from './Library';
// import Profile from './Profile';
// import MiniPlayer from './utils/MiniPlayer';

// const Tab = createBottomTabNavigator();

// export default function BottomTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,

//         tabBarIcon: ({ focused, color }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Search') {
//             iconName = focused ? 'search' : 'search-outline';
//           } else if (route.name === 'Library') {
//             iconName = focused ? 'library' : 'library-outline';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           }

//           return (
//             <Icon
//               name={iconName}
//               size={wp('6%')}   // 👈 responsive icon size
//               color={color}
//             />
//           );
//         },

//         tabBarActiveTintColor: '#000',
//         tabBarInactiveTintColor: '#fff',

//         tabBarStyle: {
//           height: hp('8%'),           // 👈 responsive height
//           paddingBottom: hp('1%'),    // 👈 responsive padding
//           borderTopLeftRadius: wp('5%'),
//           borderTopRightRadius: wp('5%'),
//           position: 'absolute',
//           backgroundColor:'transparent'
//         },

//         tabBarLabelStyle: {
//           fontSize: wp('3.2%'),       // 👈 responsive font
//           marginBottom: hp('0.5%'),
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Search" component={Search} />
//       <Tab.Screen name="Library" component={Library} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// }


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

export default function BottomTabs() {
  return (
    <View style={{ flex: 1 }}>
      
      {/* TABS */}
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
                size={wp('6%')}
                color={color}
              />
            );
          },

          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#fff',

          tabBarStyle: {
            height: hp('8%'),
            paddingBottom: hp('1%'),
            borderTopLeftRadius: wp('5%'),
            borderTopRightRadius: wp('5%'),
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.2)', // better visibility
          },

          tabBarLabelStyle: {
            fontSize: wp('3.2%'),
            marginBottom: hp('0.5%'),
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Library" component={Library} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>

      {/* 🔥 MINI PLAYER (GLOBAL) */}
      <MiniPlayer />

    </View>
  );
}