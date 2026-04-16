import Sound from 'react-native-sound';
import { setPlayer } from './playerStore';

Sound.setCategory('Playback');

let sound = null;

// 🔥 internal state
let currentState = {
  playlist: [],
  index: 0,
};

export const playSong = (song, playlist = [], index = 0) => {
  if (sound) {
    sound.stop(() => sound.release());
  }

  currentState = { playlist, index };

  sound = new Sound(song.audio_url, null, (error) => {
    if (error) {
      console.log('❌ Load error:', error);
      return;
    }

    sound.play((success) => {
      if (success) {
        // 🎯 Auto next song
        const nextIndex = index + 1;
        if (nextIndex < playlist.length) {
          playSong(playlist[nextIndex], playlist, nextIndex);
        }
      } else {
        console.log('❌ Playback failed');
      }
    });

    setPlayer({
      currentSong: song,
      isPlaying: true,
      playlist,
      index,
    });
  });
};

export const pauseSong = () => {
  if (sound) {
    sound.pause();
    setPlayer({ isPlaying: false });
  }
};

export const resumeSong = () => {
  if (sound) {
    sound.play();
    setPlayer({ isPlaying: true });
  }
};

export const nextSong = () => {
  const nextIndex = currentState.index + 1;
  if (nextIndex < currentState.playlist.length) {
    playSong(
      currentState.playlist[nextIndex],
      currentState.playlist,
      nextIndex
    );
  }
};

export const prevSong = () => {
  const prevIndex = currentState.index - 1;
  if (prevIndex >= 0) {
    playSong(
      currentState.playlist[prevIndex],
      currentState.playlist,
      prevIndex
    );
  }
};

export const getCurrentTime = (callback) => {
  if (sound) {
    sound.getCurrentTime(callback);
  }
};

export const getDuration = () => {
  return sound ? sound.getDuration() : 0;
};

export const seekTo = (seconds) => {
  if (sound) {
    sound.setCurrentTime(seconds);
  }
};