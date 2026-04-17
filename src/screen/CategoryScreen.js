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
  const { category } = route.params;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data } = await supabase
      .from('songs_with_category')
      .select('*')
      .eq('category', category);

    setSongs(data || []);
  };

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
        
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={wp('7%')} color="#fff" />
        </TouchableOpacity>

        {/* Center Image + Title */}
        <View style={{ alignItems: 'center', marginTop: hp('1%') }}>
          <Image
            source={{ uri: songs[0]?.image_url }}
            style={{
              width: wp('50%'),
              height: wp('50%'),
              borderRadius: wp('5%'),
            }}
          />

          <Text
            style={{
              color: '#fff',
              fontSize: wp('6%'),
              fontWeight: 'bold',
              marginTop: hp('1%'),
              textTransform: 'capitalize',
            }}
          >
            {category}
          </Text>
        </View>
      </View>

      {/* 🎵 SONG LIST */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
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
              }}
            >
              {/* 🎧 Image */}
              <Image
                source={{ uri: item.image_url }}
                style={{
                  width: wp('15%'),
                  height: wp('15%'),
                  borderRadius: wp('3%'),
                }}
              />

              {/* 🎵 Info */}
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

              {/* ⋮ THREE DOT MENU */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation(); // prevent song play
                  console.log('Options for:', item.title);
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