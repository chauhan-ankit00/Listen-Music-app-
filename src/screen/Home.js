import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { supabase } from '../supabase/supabase';
import { playSong } from './utils/player';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Home({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data, error } = await supabase
      .from('songs_with_category')
      .select('*');

    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
  };

  const getByCategory = (cat) => {
    return data.filter(item => item.category === cat);
  };

  return (
    <LinearGradient
      colors={['#00c6ff', '#c59dec']}
      style={{ flex: 1, paddingTop: wp('7%'), paddingHorizontal: wp('4%'), paddingBottom: hp('8%') }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: wp('0%') }}
      >

        {/* TOP CARDS */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Category', { category: 'party' })}
          >
            <ImageBackground
              source={{ uri: getByCategory('party')[0]?.image_url }}
              style={styles.bigCard}
              imageStyle={styles.radius}
            >
              <Text style={styles.bigText}>Party Hits</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Category', { category: 'romantic' })}
          >
            <ImageBackground
              source={{ uri: getByCategory('romantic')[0]?.image_url }}
              style={styles.bigCard}
              imageStyle={styles.radius}
            >
              <Text style={styles.bigText}>Romantic</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* SECTIONS */}
        {['trending', 'latest', 'punjabi', 'haryanvi'].map((cat) => {
          const songs = getByCategory(cat);

          if (songs.length === 0) return null;

          return (
            <View key={cat}>
              <Text style={styles.title}>
                {cat === 'latest' ? 'Latest Release' : cat.toUpperCase()}
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {songs.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => playSong(item)}
                  >
                    <View style={styles.card}>
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.image}
                      />
                      <Text style={styles.text} numberOfLines={1}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
        })}

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bigCard: {
    width: wp('44%'),
    height: hp('18%'),
    justifyContent: 'flex-end',
    padding: wp('3%'),
  },

  bigText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },

  radius: {
    borderRadius: wp('5%'),
  },

  title: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },

  card: {
    marginRight: wp('3%'),
  },

  image: {
    width: wp('30%'),
    height: hp('14%'),
    borderRadius: wp('4%'),
  },

  text: {
    color: '#fff',
    marginTop: hp('0.5%'),
    fontSize: wp('3.5%'),
    width: wp('30%'),
  },
});