// import { View, Text, ImageBackground, StyleSheet } from 'react-native';
// import React , {useEffect} from 'react';
// import { useNavigation } from '@react-navigation/native';

// export default function Splash() {
//     const navigation = useNavigation();
//    useEffect(()=>{
//         setTimeout(()=>{
//             // navigate to login screen
//                 navigation.replace('Login');
//         },2500)
//    },[]);
//   return (
//     <ImageBackground
//       source={require('../assets/splash.png')} //  image path
//       style={styles.background}
//       resizeMode="cover"
//     >
//       {/* <View style={styles.container}>
//         <Text style={styles.text}>Listen</Text>
//       </View> */}
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1, // full screen
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 32,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });


import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data } = await supabase.auth.getSession();

      // small delay for splash feel
      setTimeout(() => {
        if (data.session) {
          navigation.replace('Home');   // ✅ already logged in
        } else {
          navigation.replace('Login');  // ❌ not logged in
        }
      }, 2000);

    } catch (error) {
      console.log(error);
      navigation.replace('Login');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/splash.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Optional loader */}
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});