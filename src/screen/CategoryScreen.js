// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
// import { supabase } from '../supabase/supabase';
// import { playSong } from './utils/player';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';


// export default function CategoryScreen({ route }) {
//   const { category } = route.params;
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const fetchSongs = async () => {
//     const { data } = await supabase
//       .from('songs_with_category')
//       .select('*')
//       .eq('category', category);

//     setSongs(data);
//   };

//   return (
//     <LinearGradient colors={['#00c6ff', '#c59dec']} style={{ flex: 1, paddingTop: wp('7%'), paddingHorizontal: wp('4%'), paddingBottom: hp('8%') }}>
//  <FlatList
//       data={songs}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <TouchableOpacity onPress={() => playSong(item.audio_url)}>
//           <View style={{ flexDirection: 'row', margin: 10 }}>
//             <Image
//               source={{ uri: item.image_url }}
//               style={{ width: 60, height: 60, borderRadius: 10 }}
//             />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={{ color: '#fff' }}>{item.title}</Text>
//               <Text style={{ color: '#fff' }}>{item.artist}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}
      
//     />
    
//     </LinearGradient>
   
//   );
// }


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase/supabase';
import { playSong } from './utils/player';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CategoryScreen({ route }) {
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
      colors={['#00c6ff', '#c59dec']}
     style={{ flex: 1, paddingTop: wp('7%'), paddingHorizontal: wp('4%'), paddingBottom: hp('8%') }}

    >
      <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>{category}</Text>
      
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id} 
        showsVerticalScrollIndicator={false}
        
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => playSong(item, songs, index)} // ✅ FIX
          >
            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp('2%'),
                alignItems: 'center',
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
                  style={{
                    color: '#fff',
                    fontSize: wp('4%'),
                  }}
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
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}