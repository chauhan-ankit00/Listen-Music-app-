import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  TextInput,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { supabase } from '../supabase/supabase';

export default function Profile() {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);

  // 🔐 MODAL STATE
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user || null);
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      navigation.replace('Login');
    }
  };

  // 🔑 UPDATE PASSWORD
  const updatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Error', 'Minimum 6 characters required');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Password updated');
      setModalVisible(false);
      setNewPassword('');
    }
  };

  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={styles.container}
    >
      {/* 👤 PROFILE */}
      <View style={styles.profileBox}>
        <Image
          source={require('../assets/profile.png')}
          style={styles.avatar}
        />

        <Text style={styles.email}>
          {user?.email || 'User'}
        </Text>
      </View>

      {/* ⚙️ MENU */}
      <View style={styles.menu}>

        {/* 🔑 CHANGE PASSWORD */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="lock-closed-outline" size={wp('5%')} color="#fff" />
          <Text style={styles.menuText}>Change Password</Text>
        </TouchableOpacity>

        {/* 🔒 PRIVACY */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Privacy Policy', 'Your data is safe 🔐')}
        >
          <Icon name="shield-checkmark-outline" size={wp('5%')} color="#fff" />
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>

        {/* 🚪 LOGOUT */}
        <TouchableOpacity
          style={[styles.menuItem, { marginTop: hp('2%') }]}
          onPress={handleLogout}
        >
          <Icon name="log-out-outline" size={wp('5%')} color="#ff4d4d" />
          <Text style={[styles.menuText, { color: '#ff4d4d' }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="#999"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.modalInput}
            />

            {/* BUTTONS */}
            <View style={styles.modalButtons}>
              
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#fff' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.updateBtn}
                onPress={updatePassword}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Update
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp('7%'),
    paddingHorizontal: wp('4%'),
  },

  profileBox: {
    alignItems: 'center',
    marginBottom: hp('4%'),
  },

  avatar: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('50%'),
  },

  email: {
    color: '#fff',
    marginTop: hp('1%'),
    fontSize: wp('4%'),
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },

  menuText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('4%'),
  },

  // 🔥 MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: wp('85%'),
    backgroundColor: '#1E1E2F',
    borderRadius: wp('5%'),
    padding: wp('5%'),
  },

  modalTitle: {
    color: '#fff',
    fontSize: wp('5%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
  },

  modalInput: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    height: hp('6%'),
    marginBottom: hp('2%'),
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelBtn: {
    backgroundColor: '#555',
    padding: wp('3%'),
    borderRadius: wp('3%'),
    width: '45%',
    alignItems: 'center',
  },

  updateBtn: {
    backgroundColor: '#7209B7',
    padding: wp('3%'),
    borderRadius: wp('3%'),
    width: '45%',
    alignItems: 'center',
  },
});