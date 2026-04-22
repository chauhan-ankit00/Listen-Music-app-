import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import { supabase } from '../supabase/supabase';
import { playSong } from './utils/player';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CategoryScreen({ route, navigation }) {
  const { category, type, playlist } = route.params;

  const [songs, setSongs] = useState([]);

  // 🔥 MODAL STATE
  const [removeModal, setRemoveModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    if (type === 'playlist') {
      fetchPlaylistSongs();
    } else {
      fetchCategorySongs();
    }
  }, []);

  // 🎵 CATEGORY SONGS
  const fetchCategorySongs = async () => {
    const { data } = await supabase
      .from('songs_with_category')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    setSongs(data || []);
  };

  // 🎵 PLAYLIST SONGS
  const fetchPlaylistSongs = async () => {
    const { data, error } = await supabase
      .from('playlist_songs')
      .select(`
        song_id,
        songs (
          id,
          title,
          artist,
          image_url,
          audio_url
        )
      `)
      .eq('playlist_id', playlist.id);

    if (!error && data) {
      const formatted = data
        .map(item => item.songs)
        .filter(Boolean); // ✅ prevent crash

      setSongs(formatted);
    }
  };

  // ❌ REMOVE SONG
  const removeFromPlaylist = async () => {
    try {
      if (!playlist?.id || !selectedSong) return;

      const { error } = await supabase
        .from('playlist_songs')
        .delete()
        .eq('playlist_id', playlist.id)
        .eq('song_id', selectedSong.id);

      if (error) {
        console.log(error);
        return;
      }

      // ✅ update UI instantly
      setSongs(prev =>
        prev.filter(item => item.id !== selectedSong.id)
      );

      setRemoveModal(false);
      setSelectedSong(null);

    } catch (err) {
      console.log(err);
    }
  };

  const title = type === 'playlist' ? playlist.name : category;

  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={{
        flex: 1,
        paddingTop: hp('5%'),
        paddingHorizontal: wp('4%'),
      }}
    >

      {/* 🔥 HEADER */}
      <View style={{ marginBottom: hp('2%') }}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={wp('7%')} color="#fff" />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: hp('1%') }}>
          {songs.length > 0 && (
            <Image
              source={{ uri: songs[0]?.image_url }}
              style={{
                width: wp('50%'),
                height: wp('50%'),
                borderRadius: wp('5%'),
              }}
            />
          )}

          <Text
            style={{
              color: '#fff',
              fontSize: wp('6%'),
              fontWeight: 'bold',
              marginTop: hp('1%'),
              textTransform: 'capitalize',
            }}
          >
            {title}
          </Text>
        </View>
      </View>

      {/* 🎵 SONG LIST */}
      <FlatList
        data={songs}
        keyExtractor={(item, index) => item.id + '-' + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('10%') }}

        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => playSong(item, songs, index)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: hp('2%'),
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: wp('3%'),
                padding: wp('2%'),
              }}
            >

              <Image
                source={{ uri: item.image_url }}
                style={{
                  width: wp('15%'),
                  height: wp('15%'),
                  borderRadius: wp('3%'),
                }}
              />

              <View style={{ marginLeft: wp('4%'), flex: 1 }}>
                <Text style={{ color: '#fff', fontSize: wp('4%') }} numberOfLines={1}>
                  {item.title}
                </Text>

                <Text
                  style={{
                    color: '#eee',
                    fontSize: wp('3.5%'),
                    marginTop: hp('0.3%'),
                  }}
                  numberOfLines={1}
                >
                  {item.artist}
                </Text>
              </View>

              {/* ⋮ MENU */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();

                  if (type === 'playlist') {
                    setSelectedSong(item);
                    setRemoveModal(true);
                  }
                }}
              >
                <Icon name="ellipsis-vertical" size={wp('5%')} color="#fff" />
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        )}
      />

      {/* 🔥 REMOVE MODAL */}
      <Modal visible={removeModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          
          <View style={styles.modalBox}>

            {/* ❌ CLOSE */}
            <TouchableOpacity
              onPress={() => setRemoveModal(false)}
              style={styles.closeBtn}
            >
              <Icon name="close" size={wp('6%')} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Remove from Playlist
            </Text>

            <Text style={styles.modalSubtitle}>
              {selectedSong?.title}
            </Text>
            <LinearGradient colors={['#F72585', '#7209B7']} style={styles.removeBtn}>
              <TouchableOpacity onPress={removeFromPlaylist}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Remove
              </Text>
            </TouchableOpacity>
            </LinearGradient>

            

          </View>

        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = {
  modalContainer: {
    flex: 1,
   backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: wp('85%'),
   backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: wp('5%'),
    padding: wp('5%'),
  },

  modalTitle: {
    color: '#fff',
    fontSize: wp('5%'),
    textAlign: 'center',
    marginBottom: hp('1%'),
  },

  modalSubtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },

  removeBtn: {
    backgroundColor: '#ff4d4d',
    padding: wp('3%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },

  closeBtn: {
    position: 'absolute',
    top: wp('3%'),
    right: wp('3%'),
  },
};