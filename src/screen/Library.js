import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



export default function Library({ navigation }) {

  

  return (
    <LinearGradient colors={['#00c6ff', '#c59dec']} style={{ flex: 1, paddingTop: wp('7%'), paddingHorizontal: wp('4%'), paddingBottom: hp('8%') }}>
      <Text style={styles.title}>Library 🎧</Text>

      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b1e0ed'
  },

  

 
});