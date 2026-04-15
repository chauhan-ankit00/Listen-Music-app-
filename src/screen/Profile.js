import { View, Text, StyleSheet,Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { supabase } from '../supabase/supabase'
import LinearGradient from 'react-native-linear-gradient';

export default function Profile() {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
    
        if (error) {
          Alert.alert('Error', error.message);
        } else {
          Alert.alert('Logged out');
    
          // 👉 Go back to Login screen
          navigation.replace('Login');
        }
      };
  return (
    <LinearGradient  colors={['#00c6ff', '#c59dec']} style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b1e0ed'
  },
    button: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})