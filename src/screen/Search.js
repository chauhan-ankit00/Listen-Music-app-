// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   FlatList,
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { supabase } from '../supabase/supabase';
// import { playSong } from './utils/player';

// export default function Search({ navigation }) {
//   const [query, setQuery] = useState('');
//   const [songs, setSongs] = useState([]);
//   const [filteredSongs, setFilteredSongs] = useState([]);

//   // 🎵 Fetch songs
//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const fetchSongs = async () => {
//     const { data } = await supabase
//       .from('songs_with_category')
//       .select('*');

//     // ✅ remove duplicates
//     const seen = new Set();
//     const unique = (data || []).filter(item => {
//       if (seen.has(item.id)) return false;
//       seen.add(item.id);
//       return true;
//     });

//     setSongs(unique);
//   };

//   // 🔍 Search
//   useEffect(() => {
//     if (!query.trim()) {
//       setFilteredSongs([]);
//     } else {
//       const filtered = songs.filter(item =>
//         item.title?.toLowerCase().includes(query.toLowerCase()) ||
//         item.artist?.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredSongs(filtered);
//     }
//   }, [query, songs]);

//   return (
//     <LinearGradient
//       colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
//       style={styles.container}
//     >
//       {/* 🔥 HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//           <Image
//             source={require('../assets/profile.png')}
//             style={styles.logo}
//           />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Search</Text>
//       </View>

//       {/* 🔍 SEARCH BAR */}
//       <View style={styles.searchBox}>
//         <TextInput
//           placeholder="Search songs or artists..."
//           placeholderTextColor="#999"
//           value={query}
//           onChangeText={setQuery}
//           style={styles.input}
          
//         />
//       </View>

//       {/* EMPTY STATES */}
//       {query.length === 0 && (
//         <Text style={styles.emptyText}>
//           Start typing to search songs 🎵
//         </Text>
//       )}

//       {query.length > 0 && filteredSongs.length === 0 && (
//         <Text style={styles.emptyText}>
//           No songs found 😔
//         </Text>
//       )}

//       {/* 🎵 RESULTS */}
//       <FlatList
//         data={filteredSongs}
//         keyExtractor={(item, index) => item.id + '-' + index}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: hp('10%') }}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity
//             onPress={() => playSong(item, filteredSongs, index)}
//           >
//             <View style={styles.songRow}>
              
//               {/* 🎧 Image */}
//               <Image
//                 source={{ uri: item.image_url }}
//                 style={styles.songImage}
//               />

//               {/* 🎵 Info */}
//               <View style={{ marginLeft: wp('4%'), flex: 1 }}>
//                 <Text style={styles.songTitle} numberOfLines={1}>
//                   {item.title}
//                 </Text>

//                 <Text style={styles.songArtist} numberOfLines={1}>
//                   {item.artist}
//                 </Text>
//               </View>

//               {/* ⋮ THREE DOTS */}
//               <TouchableOpacity
//                 onPress={(e) => {
//                   e.stopPropagation();
//                   console.log('Options:', item.title);
//                 }}
//               >
//                 <Icon
//                   name="ellipsis-vertical"
//                   size={wp('5%')}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: wp('7%'),
//     paddingHorizontal: wp('4%'),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },

//   logo: {
//     width: wp('10%'),
//     height: wp('10%'),
//   },

//   headerTitle: {
//     color: '#fff',
//     fontSize: wp('5.5%'),
//     fontWeight: 'bold',
//     marginLeft: wp('3%'),
//   },

//   searchBox: {
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: wp('10%'),
//     paddingHorizontal: wp('4%'),
//     marginBottom: hp('2%'),
//     borderWidth: 1.5,          // ✅ border thickness
//   borderColor: '#000',
//   },

//   input: {
//     height: hp('6%'),
//     fontSize: wp('4%'),
//     color: '#000',
//   },

//   emptyText: {
//     color: '#aaa',
//     textAlign: 'center',
//     marginTop: hp('3%'),
//     fontSize: wp('4%'),
//   },

//   // 🎵 MATCH CATEGORY STYLE
//   songRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//     backgroundColor: 'rgba(255,255,255,0.1)', // ✅ SAME AS CATEGORY
//     borderRadius: wp('3%'),
//     padding: wp('2%'),
//   },

//   songImage: {
//     width: wp('15%'),
//     height: wp('15%'),
//     borderRadius: wp('3%'),
//   },

//   songTitle: {
//     color: '#fff',
//     fontSize: wp('4%'),
//   },

//   songArtist: {
//     color: '#eee',
//     fontSize: wp('3.5%'),
//     marginTop: hp('0.3%'),
//   },
// });


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { supabase } from '../supabase/supabase';
import { playSong } from './utils/player';

export default function Search({ navigation }) {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  // 🎵 Fetch songs
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data } = await supabase
      .from('songs_with_category')
      .select('*');

    // ✅ Remove duplicates
    const seen = new Set();
    const unique = (data || []).filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

    setSongs(unique);
  };

  // 🔍 Search filter
  useEffect(() => {
    if (!query.trim()) {
      setFilteredSongs([]);
    } else {
      const filtered = songs.filter(item =>
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.artist?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [query, songs]);

  return (
    <LinearGradient
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={styles.container}
    >
      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchBox}>
        <Icon
          name="search"
          size={wp('5%')}
          color="#999"
          style={{ marginRight: wp('2%') }}
        />

        <TextInput
          placeholder="Search songs or artists..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />

        {/* ❌ CLEAR BUTTON */}
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Icon name="close-circle" size={wp('5%')} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* 🧠 EMPTY STATE */}
      {query.length === 0 && (
        <Text style={styles.emptyText}>
          Start typing to search songs 🎵
        </Text>
      )}

      {/* 😔 NO RESULTS */}
      {query.length > 0 && filteredSongs.length === 0 && (
        <Text style={styles.emptyText}>
          No songs found 😔
        </Text>
      )}

      {/* 🎵 SONG LIST */}
      <FlatList
        data={filteredSongs}
        keyExtractor={(item, index) => item.id + '-' + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('10%') }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => playSong(item, filteredSongs, index)}
          >
            <View style={styles.songRow}>
              
              {/* 🎧 Image */}
              <Image
                source={{ uri: item.image_url }}
                style={styles.songImage}
              />

              {/* 🎵 Info */}
              <View style={{ marginLeft: wp('4%'), flex: 1 }}>
                <Text style={styles.songTitle} numberOfLines={1}>
                  {item.title}
                </Text>

                <Text style={styles.songArtist} numberOfLines={1}>
                  {item.artist}
                </Text>
              </View>

              {/* ⋮ THREE DOT MENU */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp('7%'),
    paddingHorizontal: wp('4%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },

  logo: {
    width: wp('10%'),
    height: wp('10%'),
  },

  headerTitle: {
    color: '#fff',
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    marginLeft: wp('3%'),
  },

  // 🔍 SEARCH BAR
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp('10%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    borderWidth: 1.5,
    borderColor: '#00c6ff',
  },

  input: {
    flex: 1,
    height: hp('6%'),
    fontSize: wp('4%'),
    color: '#000',
  },

  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: hp('3%'),
    fontSize: wp('4%'),
  },

  // 🎵 SONG LIST (same as category)
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: wp('3%'),
    padding: wp('2%'),
  },

  songImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('3%'),
  },

  songTitle: {
    color: '#fff',
    fontSize: wp('4%'),
  },

  songArtist: {
    color: '#eee',
    fontSize: wp('3.5%'),
    marginTop: hp('0.3%'),
  },
});