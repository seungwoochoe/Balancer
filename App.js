import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import MusicPlayerUI from './component/MusicPlayerUI';
import MusicListUI from './component/MusicListUI';
import About from './component/About'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Shuffle from './containers/Shuffle.js';

const Stack = createNativeStackNavigator();



const App = () => {

  // let playlist = Shuffle.getPrunedPlaylistFromStorage();
  // playlist = Shuffle.appendMorePlaylist(musicList, playlist);


  return (
    <NavigationContainer theme={{colors: {background: '#fff'}}}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={MusicListUI} name='음악 리스트' options={{ headerShown: false }} />
        <Stack.Screen component={MusicPlayerUI} name='음악 재생화면' options={{ headerTitle: '' }} />
        <Stack.Screen component={About} name='About' options={{ headerTitle: 'About' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
