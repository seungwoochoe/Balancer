import React from 'react';
import MusicPlayerUI from './component/MusicPlayerUI';
import MusicListUI from './component/MusicListUI';
import About from './component/About'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import data from './models/data';
import * as Shuffle from './containers/Shuffle.js';

const Stack = createNativeStackNavigator();



const App = () => {
  data.forEach((element) => {
    Asset.fromModule(element.image).downloadAsync();
  });

  // let playlist = Shuffle.getPrunedPlaylistFromStorage();
  // playlist = Shuffle.appendMorePlaylist(musicList, playlist);


  return (
    <NavigationContainer theme={{ colors: { background: '#fff' } }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={MusicListUI} name='음악 리스트' />
        <Stack.Screen component={MusicPlayerUI} name='음악 재생화면' />
        <Stack.Screen component={About} name='About' />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
