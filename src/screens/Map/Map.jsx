import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, { useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Map = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const coords = { latitude, longitude };
        setLocation(coords);

        mapRef.current?.animateToRegion(
          {
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      },
      error => {
        console.log(error);
        Alert.alert('Error', 'Unable to fetch location');
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      },
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#13c8ec"
        barStyle="dark-content"
      />

      {/* Top Box Section */}
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={requestLocationPermission}
        >
          <Text style={styles.buttonText}>Get My Location</Text>
        </TouchableOpacity>

        {/* Latitude and Longitude Boxes */}
        <View style={styles.coordinatesContainer}>
          <View style={styles.coordBox}>
            <Text style={styles.coordLabel}>Latitude</Text>
            <Text style={styles.coordValue}>
              {location ? location.latitude : '--'}
            </Text>
          </View>
          <View style={styles.coordBox}>
            <Text style={styles.coordLabel}>Longitude</Text>
            <Text style={styles.coordValue}>
              {location ? location.longitude : '--'}
            </Text>
          </View>
        </View>
      </View>

      {/* Map Section */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  topSection: {
    justifyContent: 'center',
    height: '40%',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 3,
  },
  button: {
    backgroundColor: '#13c8ec',
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coordBox: {
    flex: 0.48,
    backgroundColor: '#e6f7fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  coordLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  coordValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  map: {
    flex: 1,
  },
});
