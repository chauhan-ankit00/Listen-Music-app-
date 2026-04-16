import { useState } from 'react';

let listeners = [];
let currentSong = null;

export const setCurrentSong = (song) => {
  currentSong = song;
  listeners.forEach((l) => l(song));
};

export const usePlayer = () => {
  const [song, setSong] = useState(currentSong);

  listeners.push(setSong);

  return song;
};