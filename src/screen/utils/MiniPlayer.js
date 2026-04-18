import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { usePlayer } from './playerStore';
import {
  pauseSong,
  resumeSong,
  nextSong,
  prevSong,
  getCurrentTime,
  getDuration,
  seekTo,
} from './player';

import { useNavigation } from '@react-navigation/native';

export default function MiniPlayer() {
  const { currentSong, isPlaying } = usePlayer();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 🔥 IMPORTANT

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🎵 Progress
  useEffect(() => {
    const interval = setInterval(() => { 
      getCurrentTime((sec) => setProgress(sec || 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // ⏱ Duration
  useEffect(() => {
    setDuration(getDuration() || 0);
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Player')}
      style={{
        position: 'absolute',
        bottom: hp('8%') + insets.bottom, // ✅ FIXED
        left: wp('3%'),
        right: wp('3%'),
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: wp('4%'),
        padding: wp('3%'),
      }}
    >
      {/* 🎵 Top Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        {/* Image */}
        <Image
          source={{ uri: currentSong.image_url }}
          style={{
            width: wp('10%'),
            height: wp('10%'),
            borderRadius: wp('2%'),
          }}
        />

        {/* Title */}
        <View style={{ flex: 1, marginLeft: wp('3%') }}>
          <Text
            style={{ color: '#fff', fontSize: wp('3.5%') }}
            numberOfLines={1}
          >
            {currentSong.title}
          </Text>
        </View>

        {/* Controls */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              prevSong();
            }}
          >
            <Text style={{ color: '#fff', fontSize: wp('4%') }}>⏮</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              isPlaying ? pauseSong() : resumeSong();
            }}
            style={{ marginHorizontal: wp('3%') }}
          >
            <Text style={{ color: '#fff', fontSize: wp('4%') }}>
              {isPlaying ? '❚❚' : '▶'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              nextSong();
            }}
          >
            <Text style={{ color: '#fff', fontSize: wp('4%') }}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🎚 Slider */}
      <Slider
        style={{ width: '100%', marginTop: hp('1%') }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={progress}
        minimumTrackTintColor="#00c6ff"
        maximumTrackTintColor="#555"
        thumbTintColor="#00c6ff"
        onSlidingComplete={(val) => seekTo(val)}
      />
    </TouchableOpacity>
  );
}