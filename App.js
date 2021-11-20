import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import MusicPlayerUI from './component/MusicPlayerUI';
import MusicListUI from './component/MusicListUI';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={MusicListUI} name = '음악 리스트' options = {{headerShown : false}}/>
        <Stack.Screen component={MusicPlayerUI} name = '음악 재생화면' options = {{headerTitle : ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
