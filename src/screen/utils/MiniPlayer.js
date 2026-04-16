import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

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
import { LinearEasing } from 'react-native-reanimated/lib/typescript/css/easing';
import LinearGradient from 'react-native-linear-gradient';
export default function MiniPlayer() {
  const { currentSong, isPlaying } = usePlayer();
  const navigation = useNavigation();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🎵 Smooth progress update
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime((sec) => {
        setProgress(sec || 0);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // ⏱ Update duration when song changes
  useEffect(() => {
    const d = getDuration();
    setDuration(d || 0);
  }, [currentSong]);

  // ✅ IMPORTANT: condition AFTER hooks
  if (!currentSong) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Player')}
      style={{
        position: 'absolute',
        bottom: 70,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 15,
        padding: 10,
      }}
    >
      {/* 🎵 Top Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        {/* Image */}
        <Image
          source={{ uri: currentSong.image_url }}
          style={{ width: 40, height: 40, borderRadius: 8 }}
        />

        {/* Title */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ color: '#fff' }} numberOfLines={1}>
            {currentSong.title}
          </Text>
        </View>

        {/* Controls */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          {/* ⏮ Prev */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              prevSong();
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>⏮</Text>
          </TouchableOpacity>

          {/* ⏯ Play / Pause */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              isPlaying ? pauseSong() : resumeSong();
            }}
            style={{ marginHorizontal: 10 }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>
              {isPlaying ? '❚❚' : '▶'}
            </Text>
          </TouchableOpacity>

          {/* ⏭ Next */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              nextSong();
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🎚 Progress Slider */}
     
       <Slider
        style={{ width: '100%', marginTop: 8 }}
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