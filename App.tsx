import { StyleSheet, View } from 'react-native';
import React from 'react';
import Navigator from './src/navigation/Navigator';

const App = () => {
  return (
    <View style={styles.conatiner}>
        <Navigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});
