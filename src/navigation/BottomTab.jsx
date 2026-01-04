import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Map from '../screens/Map/Map';
import Home from '../screens/Home/Home';


const Tab = createBottomTabNavigator();

const BottomTab = () => {
   const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;
            try {
              if (route.name === 'Home') {
                iconSource = require('../assets/img/home.png');
              } else if (route.name === 'Map') {
                iconSource = require('../assets/img/map.png');
              } 
            } catch (error) {
              console.error(`Error loading icon for ${route.name}:`, error);
              return <Text style={styles.icon}>Icon Error</Text>;
            }
            return (
              <View>
                <Image
                  source={iconSource}
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                     tintColor: focused ? "#13c8ec" : "#2563EB",
                      transform: [{ scale: focused ? 1.19 : 1 }],
                    },
                  ]}
                />
              </View>
            );
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#13c8ec",
          tabBarInactiveTintColor: "#2563EB",
          tabBarStyle: {
            height: 70 + insets.bottom,
            paddingTop: 13,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
            backgroundColor: "#fff",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Home" component={Home} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});
