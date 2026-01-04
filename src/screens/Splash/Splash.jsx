import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/img/map.png';

const { width, height } = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate('bottomTab');
    });
  }, [navigation, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#13c8ec"
        barStyle="dark-content"
      />

      <View style={styles.bgBlobTopRight} />
      <View style={styles.bgBlobLeft} />
      <View style={styles.bgBlobBottomRight} />

      {/* Main content */}
      <View style={styles.content}>
        <View style={{ flex: 1 }} />

        {/* Logo */}
        <View style={styles.logoCard}>
          <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Title */}
        <Text style={styles.title}>My Location</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Navigate the world with ease.</Text>

        <View style={{ flex: 1 }} />

        {/* Loader */}
        <View style={styles.loaderContainer}>
          <View style={styles.loaderBg}>
            <Animated.View
              style={[styles.loaderActive, { width: progressWidth }]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const PRIMARY = '#13c8ec';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bgBlobTopRight: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: PRIMARY,
    opacity: 0.05,
    borderRadius: 999,
  },

  bgBlobLeft: {
    position: 'absolute',
    top: height * 0.25,
    left: -width * 0.3,
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: PRIMARY,
    opacity: 0.1,
    borderRadius: 999,
  },

  bgBlobBottomRight: {
    position: 'absolute',
    bottom: height * 0.1,
    right: width * 0.1,
    width: width * 0.35,
    height: width * 0.35,
    backgroundColor: PRIMARY,
    opacity: 0.05,
    borderRadius: 999,
  },

  content: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },

  logoCard: {
    width: 112,
    height: 112,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    marginBottom: 32,
  },

  logo: {
    width: 64,
    height: 64,
    tintColor: PRIMARY,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },

  tagline: {
    marginTop: 8,
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 22,
  },

  loaderContainer: {
    marginBottom: 24,
  },

  loaderBg: {
    width: 200,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    overflow: 'hidden',
  },

  loaderActive: {
    height: '100%',
    backgroundColor: PRIMARY,
    borderRadius: 999,
  },
});
