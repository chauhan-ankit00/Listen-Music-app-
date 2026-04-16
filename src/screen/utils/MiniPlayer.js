import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { usePlayer } from './playerStore';

export default function MiniPlayer() {
  const song = usePlayer();

  if (!song) return null;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 70, // above tab bar
        left: 10,
        right: 10,
        backgroundColor: '#222',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <Image
        source={{ uri: song.image_url }}
        style={{ width: 40, height: 40, borderRadius: 8 }}
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ color: '#fff' }}>{song.title}</Text>
      </View>

      <TouchableOpacity>
        <Text style={{ color: '#fff' }}>⏸</Text>
      </TouchableOpacity>
    </View>
  );
}