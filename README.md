**React Native Google Maps – Live Location with Animated Marker**

This project displays the user’s current location on Google Maps with a  marker using React Native.

Project Structure
project-root/
├── src/
│   └── map/
│       └── Map.js
├── android/
│   └── app/
│       └── src/
│           └── main/
│               └── AndroidManifest.xml
├── package.json
└── README.md


Main screen code location:
src/map/Map.js

Installation
1. Install dependencies
npm install

2. Install required libraries
npm install react-native-maps
npm install @react-native-community/geolocation

Android Setup
1. Add permissions

Open:

android/app/src/main/AndroidManifest.xml


Add the following before the <application> tag:

<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />

2. Add Google Maps API Key

Inside the <application> tag, add:

<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="Google_Service_Apikey"/>


Replace Google_Service_Apikey with your actual Google Maps API key.

Build & Run
1. Clean Android build
cd android
gradlew clean
cd ..

2. Run the application
npm run android



Features

Google Maps integration

Live user location

Location marker

Latitude & Longitude display

Runtime location permission handling


Attached Screensorts

![Screen 1](https://github.com/satyajitsingh001/Googlemap_Getmyloaction_ReactnativeApp/blob/d43ec14bffd5235613f9e80a99bfcbe03a12a88e/map_screen.jpeg)
![Screen 2](https://github.com/satyajitsingh001/Googlemap_Getmyloaction_ReactnativeApp/blob/d43ec14bffd5235613f9e80a99bfcbe03a12a88e/splash.jpeg)
