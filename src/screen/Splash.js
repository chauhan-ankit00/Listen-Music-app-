import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase/supabase';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;
    let hasNavigated = false;
    const splashStart = Date.now();
    const MIN_SPLASH_MS = 1200;

    const navigateWithDelay = session => {
      if (hasNavigated) {
        return;
      }
      const elapsed = Date.now() - splashStart;
      const waitTime = Math.max(MIN_SPLASH_MS - elapsed, 0);

      setTimeout(() => {
        if (!isMounted || hasNavigated) {
          return;
        }
        hasNavigated = true;
        navigation.replace(session ? 'Home' : 'Login');
      }, waitTime);
    };

    const bootstrapSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.log('Session restore error:', error.message);
        }
        navigateWithDelay(data?.session ?? null);
      } catch (error) {
        console.log(error);
        navigateWithDelay(null);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        navigateWithDelay(session);
      }
    });

    bootstrapSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/splash.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Optional loader */}
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});