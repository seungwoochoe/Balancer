import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import MusicPlayer from './component/MusicPlayer';

const App = () => {
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
});