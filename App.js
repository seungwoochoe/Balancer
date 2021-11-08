import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import MusicListRetriever from './containers/MusicListRetriever';
import MusicPlayerUI from './component/MusicPlayerUI';




const App = () => {
  return (
    <View style={styles.container}>
      <MusicListRetriever /> 
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
