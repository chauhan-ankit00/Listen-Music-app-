import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Alert,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { supabase } from '../supabase/supabase';

export default function Library({ navigation }) {


  const [modalVisible, setModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState([]);

  //  GREETING
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 18) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  };

  //  FETCH PLAYLISTS
  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id) // FILTER
      .order('created_at', { ascending: false });

    if (!error) {
      setPlaylists(data || []);
    }
  };

  //  CREATE PLAYLIST
  const createPlaylist = async () => {
    if (!playlistName.trim()) {
      Alert.alert('Enter playlist name');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('playlists').insert([
      {
        name: playlistName,
        user_id: user.id, // IMPORTANT
      },
    ]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setModalVisible(false);
      setPlaylistName('');
      fetchPlaylists();
    }
  };

  //  RETURN AFTER ALL HOOKS
  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={styles.container}
    >


      {/* HEADER */}
      <View style={styles.header}>

        {/* 👤 PROFILE */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* 👋 GREETING */}
        <View style={{ flex: 1, marginLeft: wp('3%') }}>
          <Text style={styles.greeting}>
            {getGreeting()}
          </Text>

          <Text style={styles.username}>
            Welcome back 🎧
          </Text>
        </View>

        {/* 🔍 SEARCH ICON */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="add" size={wp('6%')} color="#fff" />
        </TouchableOpacity>

      </View>

      {/*  PLAYLIST LIST */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('10%') }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home', {
                screen: 'Category',
                params: {
                  type: 'playlist',
                  playlist: item,
                }
              })
            }
          >
            <View style={styles.playlistRow}>

              {/*  Icon */}
              <View style={styles.playlistIcon}>
                <Icon name="musical-notes" size={wp('6%')} color="#fff" />
              </View>

              {/*  Info */}
              <View style={{ marginLeft: wp('4%') }}>
                <Text style={styles.playlistName}>{item.name}</Text>
                <Text style={styles.playlistSub}>Playlist</Text>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />

      {/*  MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>

            {/* ❌ CLOSE ICON */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeBtn}
            >
              <Icon name="close" size={wp('6%')} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Create Playlist</Text>

            <TextInput
              placeholder="Enter name"
              placeholderTextColor="#fff"
              value={playlistName}
              onChangeText={setPlaylistName}
              style={styles.input}
            />

            <LinearGradient colors={['#F72585', '#7209B7']} style={styles.btn}>
              <TouchableOpacity onPress={createPlaylist}>
                <Text style={{ color: '#fff' }}>Create</Text>
              </TouchableOpacity>
            </LinearGradient>

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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },

  logo: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
  },

  greeting: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
  },

  username: {
    color: '#aaa',
    fontSize: wp('3.3%'),
    marginTop: hp('0.2%'),
  },

  // 🎵 PLAYLIST UI
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: wp('3%'),
    padding: wp('3%'),
  },

  playlistIcon: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('3%'),
    backgroundColor: '#3A0CA3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  playlistName: {
    color: '#fff',
    fontSize: wp('4.5%'),
  },

  playlistSub: {
    color: '#ccc',
    fontSize: wp('3.5%'),
    marginTop: hp('0.3%'),
  },

  // MODAL
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
  },

  modalBox: {
    margin: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: 20,
  },

  modalTitle: {
    fontSize: wp('5%'),
    marginBottom: 10,
    color: '#fff',
  },

  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
  },
  closeBtn: {
    position: 'absolute',
    top: wp('3%'),
    right: wp('3%'),
    zIndex: 10,
  },

  btn: {

    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
}); 