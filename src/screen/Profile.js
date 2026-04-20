import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { supabase } from '../supabase/supabase';

export default function Profile() {
  const navigation = useNavigation(); 

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Logged out successfully');
        navigation.replace('Login'); //  redirect to login
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
      console.log(err);
    }
  };

  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={styles.container}
    >
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp('7%'),
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
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
});