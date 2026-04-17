import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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

export default function PlayerScreen() {
  const { currentSong, isPlaying } = usePlayer();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🎵 Smooth progress
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime((sec) => setProgress(sec || 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // ⏱ Duration
  useEffect(() => {
    const d = getDuration();
    setDuration(d || 0);
  }, [currentSong]);

  const formatTime = (sec) => {
    if (!sec) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentSong) return null;



  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={{ flex: 1, paddingTop: wp('7%'), paddingHorizontal: wp('4%'), paddingBottom: hp('8%') }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: wp('5%'),
        }}
      >
        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: hp('2%'),
            left: wp('0%'),
            zIndex: 10,
          }}
        >
          <Icon name="arrow-back" size={wp('7%')} color="#fff" />
        </TouchableOpacity>
        {/* 🎧 Image */}
        <Image
          source={{ uri: currentSong.image_url }}
          style={{
            width: wp('65%'),
            height: wp('65%'),
            borderRadius: wp('5%'),
          }}
        />

        {/* 🎵 Title */}
        <Text
          style={{
            color: '#fff',
            fontSize: wp('5%'),
            marginTop: hp('2%'),
            textAlign: 'center',
          }}
        >
          {currentSong.title}
        </Text>

        {/* 🎚 Slider */}
        <Slider
          style={{ width: '100%', marginTop: hp('3%') }}
          minimumValue={0}
          maximumValue={duration || 1}
          value={progress}
          minimumTrackTintColor="#00c6ff"
          maximumTrackTintColor="#555"
          thumbTintColor="#00c6ff"
          onSlidingComplete={(val) => seekTo(val)}
        />

        {/* ⏱ Time */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: hp('0.5%'),
          }}
        >
          <Text style={{ color: '#fff', fontSize: wp('3.5%') }}>
            {formatTime(progress)}
          </Text>
          <Text style={{ color: '#fff', fontSize: wp('3.5%') }}>
            {formatTime(duration)}
          </Text>
        </View>

        {/* 🎮 Controls */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp('5%'),
            alignItems: 'center',
          }}
        >
          {/* ⏮ Prev */}
          <TouchableOpacity onPress={prevSong}>
            <Text style={{ fontSize: wp('8%'), color: '#fff' }}>⏮</Text>
          </TouchableOpacity>

          {/* ⏯ Play / Pause */}
          <TouchableOpacity
            onPress={isPlaying ? pauseSong : resumeSong}
            style={{ marginHorizontal: wp('10%') }}
          >
            <Text style={{ fontSize: wp('10%'), color: '#fff' }}>
              {isPlaying ? '❚❚' : '▶'}
            </Text>
          </TouchableOpacity>

          {/* ⏭ Next */}
          <TouchableOpacity onPress={nextSong}>
            <Text style={{ fontSize: wp('8%'), color: '#fff' }}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}