import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default function Search({ navigation }) {

  

  return (
    <LinearGradient colors={['#00c6ff', '#c59dec']} style={styles.container}>
      <Text style={styles.title}>Search</Text>

      
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