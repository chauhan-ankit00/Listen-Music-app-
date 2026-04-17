import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { supabase } from '../supabase/supabase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔐 LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email & password');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      // Alert.alert('Success', 'Logged in!');
      console.log('User:', data.user);

      // 👉 Navigate to Home
      navigation.replace('Home');
    }
  };

  // 📝 SIGNUP FUNCTION
  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Signup Error', error.message);
    } else {
      Alert.alert('Success', 'Check your email for verification');
    }
  };

  return (
    // <ImageBackground
    //   source={require('../assets/background.png')}
    //   style={styles.background}
    // >
     <LinearGradient colors={['#7209B7', '#3A0CA3', '#1E1E2F']} style={ styles.background }>
      <View style={styles.container}>

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

        {/* Email */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Email"
            type="email-address"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
          <LinearGradient
            colors={['#F72585', '#7209B7']} 
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <Text style={styles.or}>or</Text>

        {/* SIGNUP */}
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signup}>
            Don’t have an account?{' '}
            <Text style={styles.signupText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

      </View>
     </LinearGradient>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },

  logo: {
    width: wp('50%'),
    height: wp('50%'),
    marginBottom: hp('2%'),
  },

  inputBox: {
    width: wp('90%'),
    height: hp('6.5%'),
    backgroundColor: '#fff',
    borderRadius: wp('10%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
  },

  input: {
    fontSize: wp('4%'),
    color: '#000',
  },

  button: {
    width: wp('90%'),
    height: hp('6.5%'),
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },

  or: {
    marginVertical: hp('2%'),
    fontSize: wp('4%'),
    color: '#555',
  },

  signup: {
    fontSize: wp('3.8%'),
    color: '#555',
  },

  signupText: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});