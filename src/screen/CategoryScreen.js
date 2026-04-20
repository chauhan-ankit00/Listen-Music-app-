import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
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

  //  FETCH DATA
  useEffect(() => {
    if (type === 'playlist') {
      fetchPlaylistSongs();
    } else {
      fetchCategorySongs();
    }
  }, []);

  //  CATEGORY SONGS
  const fetchCategorySongs = async () => {
    const { data } = await supabase
      .from('songs_with_category')
      .select('*')
      .eq('category', category);

    setSongs(data || []);
  };

  //  PLAYLIST SONGS
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
      const formatted = data.map(item => item.songs);
      setSongs(formatted);
    }
  };

  //  TITLE
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
      {/*  HEADER */}
      <View style={{ marginBottom: hp('2%') }}>
        
        {/*  BACK */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={wp('7%')} color="#fff" />
        </TouchableOpacity>

        {/*  IMAGE + TITLE */}
        <View style={{ alignItems: 'center', marginTop: hp('1%') }}>

          {/*  SAFE IMAGE */}
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

          {/*  TITLE */}
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

      {/*  SONG LIST */}
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
              {/*  IMAGE */}
              <Image
                source={{ uri: item.image_url }}
                style={{
                  width: wp('15%'),
                  height: wp('15%'),
                  borderRadius: wp('3%'),
                }}
              />

              {/*  INFO */}
              <View style={{ marginLeft: wp('4%'), flex: 1 }}>
                <Text
                  style={{ color: '#fff', fontSize: wp('4%') }}
                  numberOfLines={1}
                >
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

              {/* ⋮ OPTIONS */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  console.log('Options:', item.title);
                }}
              >
                <Icon
                  name="ellipsis-vertical"
                  size={wp('5%')}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}