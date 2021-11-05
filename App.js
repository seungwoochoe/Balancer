import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import MusicPlayerUI from './component/MusicPlayerUI';

const App = () => {
  return (
    <View style={styles.container}>
      <MusicPlayerUI />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
