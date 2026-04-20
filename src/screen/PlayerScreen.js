import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';

import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { usePlayer } from './utils/playerStore';
import {
  pauseSong,
  resumeSong,
  nextSong,
  prevSong,
  getCurrentTime,
  getDuration,
  seekTo,
} from './utils/player';

import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase/supabase';

export default function PlayerScreen() {
  const { currentSong, isPlaying } = usePlayer();
  const navigation = useNavigation();

  const song = currentSong || {};

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [playlists, setPlaylists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [liked, setLiked] = useState(false); //  state

  //  Progress
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime((sec) => setProgress(sec || 0));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  //  Duration
  useEffect(() => {
    setDuration(getDuration() || 0);
  }, [currentSong]);

  //  CHECK IF LIKED
  useEffect(() => {
    checkIfLiked();
  }, [currentSong]);

  const checkIfLiked = async () => {
    if (!song.id) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: likedPlaylist } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .eq('name', 'Liked Songs')
      .single();

    if (!likedPlaylist) return;

    const { data } = await supabase
      .from('playlist_songs')
      .select('*')
      .eq('playlist_id', likedPlaylist.id)
      .eq('song_id', song.id);

    setLiked(data.length > 0);
  };

  //  TOGGLE LIKE
  const handleLike = async () => {
    if (!song.id) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // get/create liked playlist
    let { data: likedPlaylist } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .eq('name', 'Liked Songs')
      .single();

    if (!likedPlaylist) {
      const { data } = await supabase
        .from('playlists')
        .insert([{ name: 'Liked Songs', user_id: user.id }])
        .select()
        .single();

      likedPlaylist = data;
    }

    if (liked) {
      //  remove like
      await supabase
        .from('playlist_songs')
        .delete()
        .eq('playlist_id', likedPlaylist.id)
        .eq('song_id', song.id);

      setLiked(false);
    } else {
      //  add like (prevent duplicate)
      const { data } = await supabase
        .from('playlist_songs')
        .select('*')
        .eq('playlist_id', likedPlaylist.id)
        .eq('song_id', song.id);

      if (data.length === 0) {
        await supabase.from('playlist_songs').insert([
          {
            playlist_id: likedPlaylist.id,
            song_id: song.id,
          },
        ]);
      }

      setLiked(true);
    }
  };

  //  FETCH PLAYLISTS
  const fetchPlaylists = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id);

    setPlaylists(data || []);
  };

  //  ADD SONG
  const handleAddToPlaylist = async (playlistId) => {
    if (!song.id) return;

    const { data } = await supabase
      .from('playlist_songs')
      .select('*')
      .eq('playlist_id', playlistId)
      .eq('song_id', song.id);

    if (data.length === 0) {
      await supabase.from('playlist_songs').insert([
        {
          playlist_id: playlistId,
          song_id: song.id,
        },
      ]);
    }

    setModalVisible(false);
    Alert.alert('Added to playlist 🎵');
  };

  const formatTime = (sec) => {
    if (!sec) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={{
        flex: 1,
        paddingTop: hp('6%'),
        paddingHorizontal: wp('5%'),
      }}
    >
      {!song.id ? (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color:'#fff', fontSize: wp('5%') }}>
            No song playing 🎧
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>

          {/* BACK */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: hp('1%'),
              left: 0,
            }}
          >
            <Icon name="arrow-back" size={wp('7%')} color="#fff" />
          </TouchableOpacity>

          {/* IMAGE */}
          <Image
            source={{ uri: song.image_url }}
            style={{
              width: wp('65%'),
              height: wp('65%'),
              borderRadius: wp('5%'),
              marginTop: hp('6%'),
            }}
          />

          {/* TITLE */}
          <Text style={{
            color:'#fff',
            fontSize: wp('5%'),
            marginTop: hp('2%'),
            textAlign:'center'
          }}>
            {song.title}
          </Text>

          {/* ❤️ + ➕ */}
          <View style={{
            flexDirection:'row',
            marginTop: hp('2%'),
          }}>
            <TouchableOpacity onPress={handleLike}>
              <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={wp('7%')}
                color={liked ? 'red' : '#fff'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetchPlaylists();
                setModalVisible(true);
              }}
              style={{ marginLeft: wp('6%') }}
            >
              <Icon name="add-circle-outline" size={wp('7%')} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* SLIDER */}
          <Slider
            style={{ width:'100%', marginTop: hp('3%') }}
            minimumValue={0}
            maximumValue={duration || 1}
            value={progress}
            onSlidingComplete={seekTo}
          />

          {/* TIME */}
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
          }}>
            <Text style={{ color:'#fff', fontSize: wp('3.5%') }}>
              {formatTime(progress)}
            </Text>
            <Text style={{ color:'#fff', fontSize: wp('3.5%') }}>
              {formatTime(duration)}
            </Text>
          </View>

          {/* CONTROLS */}
          <View style={{
            flexDirection:'row',
            marginTop: hp('5%'),
            alignItems:'center'
          }}>
            <TouchableOpacity onPress={prevSong}>
              <Text style={{ fontSize: wp('8%'), color:'#fff' }}>⏮</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={isPlaying ? pauseSong : resumeSong}
              style={{ marginHorizontal: wp('10%') }}
            >
              <Text style={{ fontSize: wp('10%'), color:'#fff' }}>
                {isPlaying ? '❚❚' : '▶'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={nextSong}>
              <Text style={{ fontSize: wp('8%'), color:'#fff' }}>⏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* MODAL */}
      <Modal visible={modalVisible} transparent>
        <View style={{
          flex:1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent:'center'
        }}>
          <View style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            margin: wp('5%'),
            borderRadius: wp('3%'),
            padding: wp('5%')
          }}>
            <Text style={{
              fontSize: wp('5%'),
              marginBottom: hp('2%'), 
              color:'#fff'
            }}>
              Select Playlist
            </Text> 
            

            <FlatList
              data={playlists}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAddToPlaylist(item.id)}
                  style={{ paddingVertical: hp('1%') }}
                >
                  <Text style={{ fontSize: wp('4%'),color:'#fff', borderBottomWidth:1, borderColor:'#292828',  }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: hp('2%'),color:'#fff' }}>Cancel</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}