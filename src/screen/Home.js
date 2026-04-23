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
import Icon from 'react-native-vector-icons/Ionicons';

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

  //Greeting based on time:
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 18) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  };
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

        {/* 👤 PROFILE */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* 👋 GREETING */}
        <View style={{ flex: 1, marginLeft: wp('3%') }}>
          <Text style={styles.greeting}>
            {getGreeting()}
          </Text>

          <Text style={styles.username}>
            Welcome back 🎧
          </Text>
        </View>

        {/* 🔍 SEARCH ICON */}
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search-outline" size={wp('6%')} color="#fff" />
        </TouchableOpacity>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TOP CARDS */}
        <View>

          {/* CARD 1 */}
          <TouchableOpacity
            style={styles.rowCard}
            onPress={() =>
              navigation.navigate('Category', { category: 'pop mix' })
            }
          >
            <ImageBackground
              source={{ uri: getByCategory('pop mix')[0]?.image_url }}
              style={styles.rowImage}
              imageStyle={styles.radius}
            />

            <Text style={styles.rowText}>Explore the Pop Mix vibes</Text>
          </TouchableOpacity>

          {/* CARD 2 */}
          <TouchableOpacity
            style={styles.rowCard}
            onPress={() =>
              navigation.navigate('Category', { category: 'romantic' })
            }
          >
            <ImageBackground
              source={{ uri: getByCategory('romantic')[0]?.image_url }}
              style={styles.rowImage}
              imageStyle={styles.radius}
            />

            <Text style={styles.rowText}>Feel the Romantic mood</Text>
          </TouchableOpacity>
          {/* CARD 3 */}
          <TouchableOpacity
            style={styles.rowCard}
            onPress={() =>
              navigation.navigate('Category', { category: 'english' })
            }
          >
            <ImageBackground
              source={{ uri: getByCategory('english')[0]?.image_url }}
              style={styles.rowImage}
              imageStyle={styles.radius}
            />

            <Text style={styles.rowText}>Feel the global beats</Text>
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
    marginBottom: hp('2%'),
  },

  logo: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
  },

  greeting: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
  },

  username: {
    color: '#aaa',
    fontSize: wp('3.3%'),
    marginTop: hp('0.2%'),
  },



  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: wp('3%'),
    padding: wp('2%'),
    marginBottom: hp('1%'),
  },

  rowImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('3%'),
  },

  rowText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    marginLeft: wp('4%'),
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