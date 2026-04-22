import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { supabase } from '../supabase/supabase';

export default function Login({ navigation }) {
  // ✅ STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  // 🔐 LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Enter email & password');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      navigation.replace('Home');
    }
  };

  // 📝 SIGNUP
  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Enter email & password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Minimum 6 characters required');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      Alert.alert('Signup Error', error.message);
    } else {
      Alert.alert('Success', 'Account created! Now login.');
      setIsSignup(false); // switch to login after signup
    }
  };

  // 🔄 HANDLE BOTH
  const handleAuth = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={styles.background}
    >
      <View style={styles.container}>

        {/* 🎧 LOGO */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

        {/* 📧 EMAIL */}
        <View style={styles.inputBox}>
          <Icon name="mail-outline" size={wp('5%')} color="#777" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* 🔑 PASSWORD */}
        <View style={styles.inputBox}>
          <Icon name="lock-closed-outline" size={wp('5%')} color="#777" />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry={secure}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {/* 👁 TOGGLE */}
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={wp('5%')}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* 🔘 BUTTON */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleAuth}>
          <LinearGradient
            colors={
              isSignup
                ? ['#00c6ff', '#0072ff']
                : ['#F72585', '#7209B7']
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isSignup ? 'Sign Up' : 'Log In'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <Text style={styles.or}>or</Text>

        {/* 🔁 TOGGLE LOGIN / SIGNUP */}
        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.signup}>
            {isSignup
              ? 'Already have an account? '
              : 'Don’t have an account? '}

            <Text style={styles.signupText}>
              {isSignup ? 'Log In' : 'Sign Up'}
            </Text>
          </Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
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
    marginBottom: hp('3%'),
  },

  inputBox: {
    width: wp('90%'),
    height: hp('6.5%'),
    backgroundColor: '#fff',
    borderRadius: wp('10%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    marginLeft: wp('2%'),
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
    color: '#aaa',
  },

  signup: {
    fontSize: wp('3.8%'),
    color: '#aaa',
  },

  signupText: {
    color: '#F72585',
    fontWeight: 'bold',
  },
});