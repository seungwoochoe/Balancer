import React from 'react';
import MusicPlayerUI from './component/MusicPlayerUI';
import MusicListUI from './component/MusicListUI';
import About from './component/About'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import data from './models/data';
import * as Shuffle from './containers/Shuffle.js';

const RootStack = createNativeStackNavigator();

const App = () => {
  data.forEach((element) => {
    Asset.fromModule(element.image).downloadAsync();
  });

  
  // let playlist = Shuffle.getPrunedPlaylistFromStorage();
  // playlist = Shuffle.appendMorePlaylist(musicList, playlist);



  return (
    <NavigationContainer theme={{ colors: { background: '#fff' } }}>
      <RootStack.Navigator screenOptions={{ headerShown: false, presentation: 'card', gestureEnabled: true }}>
        <RootStack.Screen name="MusicListUI" component={MusicListUI} />
        <RootStack.Screen name="MusicPlayerUI" component={MusicPlayerUI} />
        <RootStack.Screen name="About" component={About} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
