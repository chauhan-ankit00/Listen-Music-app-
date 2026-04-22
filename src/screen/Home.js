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
      .select('*')
      .order('created_at', { ascending: false }); //  latest first

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
      colors={['#7209B7', '#3A0CA3', '#1E1E2F']}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* TOP CARDS */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Category', { category: 'pop mix' })
            }
          >
            <ImageBackground
              source={{ uri: getByCategory('pop mix')[0]?.image_url }}
              style={styles.bigCard}
              imageStyle={styles.radius}
            >
              <Text style={styles.bigText}>Pop Mix</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Category', { category: 'romantic' })
            }
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
        {['bhakti', 'bollywood', 'punjabi', 'haryanvi'].map(cat => {
          const songs = getByCategory(cat);

          if (songs.length === 0) return null;

          return (
            <View key={cat}>

              {/*  TITLE + SHOW ALL */}
              <View style={styles.rowBetween}>
                <Text style={styles.title}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Category', { category: cat })
                  }
                >
                  <Text style={styles.showAll}>Show All</Text>
                </TouchableOpacity>
              </View>

              {/* 🎵 SONG LIST */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {songs.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => playSong(item, songs, index)}
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
  container: {
    flex: 1,
    paddingTop: wp('7%'),
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('8%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },

  logo: {
    width: wp('10%'),
    height: wp('10%'),
  },

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
    borderRadius: wp('2%'),
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
  },

  title: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },

  showAll: {
    color: '#fff',
    fontSize: wp('3.5%'),
  },

  card: {
    marginRight: wp('3%'),
    marginTop: hp('1%'),
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