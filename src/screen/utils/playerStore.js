import { useState, useEffect } from 'react';

let listeners = [];

let state = {
  currentSong: null,
  isPlaying: false,
  playlist: [],
  index: 0,
};

const notify = () => {
  listeners.forEach(l => l({ ...state }));
};

export const setPlayer = (data) => {
  state = { ...state, ...data };
  notify();
};

export const usePlayer = () => {
  const [data, setData] = useState(state);

  useEffect(() => {
    listeners.push(setData);
    return () => {
      listeners = listeners.filter(l => l !== setData);
    };
  }, []);

  return data;
};