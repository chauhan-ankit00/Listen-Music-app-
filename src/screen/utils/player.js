// import Sound from 'react-native-sound';

// // 🔥 Required for playback
// Sound.setCategory('Playback');

// let sound = null;

// export const playSong = (url) => {
//   try {
//     console.log('▶️ Playing:', url);

//     // Stop previous song properly
//     if (sound) {
//       sound.stop(() => {
//         sound.release();
//       });
//     }

//     // Create new sound
//     sound = new Sound(url, null, (error) => {
//       if (error) {
//         console.log('❌ Load error:', error);
//         return;
//       }

//       // Start playing
//       sound.play((success) => {
//         if (success) {
//           console.log('✅ Finished playing');
//         } else {
//           console.log('❌ Playback failed');
//         }
//       });
//     });

//   } catch (e) {
//     console.log('❌ Exception:', e);
//   }
// };  


import Sound from 'react-native-sound';
import { setCurrentSong } from './playerStore';

Sound.setCategory('Playback');

let sound = null;

export const playSong = (song) => {
  try {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    sound = new Sound(song.audio_url, null, (error) => {
      if (error) {
        console.log(error);
        return;
      }

      sound.play();
      setCurrentSong(song); // 🔥 update UI
    });
  } catch (e) {
    console.log(e);
  }
};