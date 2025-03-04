import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, Animated, StatusBar, Platform, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import songs from '../models/data';
import songNow from './MusicNow';
import { SoundObj } from './MusicNow';
import { useIsFocused } from '@react-navigation/native';
import { shuffleSongList } from '../models/shuffledata';
import { shuffleActionList } from '../models/shuffledata';
import { createPlaylist, complementPlaylist, appendMorePlaylist } from '../containers/Shuffle';

const { width, height } = Dimensions.get("window");
const rem = width / 20;
const theme = '#107dac';
const buttonTheme = '#333';
const listHeight = width * 0.16;
const bottomBarHeight = height / 8.2;
let blurIntensity;
if (Platform.OS === 'ios') {
  blurIntensity = 96;
} else {
  blurIntensity = 200;
}
export let song2 = songs.sort((a, b) => (a.title >= b.title) ? 1 : -1);
const MusicListUI = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [dumm, setdumm] = useState(0);
  async function onPausePress() {
    if (songNow.isPlayin) {
      // console.log('Pausing Sound');
      await SoundObj.pauseAsync();
      songNow.isPlayin = false;
      setdumm(1 - dumm);
    }
    else {
      // console.log('Playing Sound');
      await SoundObj.playAsync();
      songNow.isPlayin = true;
      setdumm(1 - dumm);
    }
  }

  async function skipToNext() {
    if (songNow.index !== song2.length-1){
    shuffleActionList.push({
      title: songNow.title,
      action: "skip"
    });
   // console.log(shuffleActionList);

    await SoundObj.unloadAsync();
    songNow.title = song2[songNow.index +1].title;
    songNow.artist = song2[songNow.index +1].artist;
    songNow.image = song2[songNow.index +1].image;
    songNow.id = song2[songNow.index +1].id;
    songNow.uri = song2[songNow.index +1].uri;
    songNow.duration = song2[songNow.index +1].duration;
    songNow.index+=1;
    songNow.isPlayin = true;
    await SoundObj.loadAsync(songNow.uri);
    await SoundObj.playAsync();
    setdumm(1-dumm);
    CurrentMusicState = await SoundObj.getStatusAsync();
    if(song2 != songs){

      let imsi = createPlaylist(songs,10-song2.length+songNow.index,shuffleActionList );
      imsi.forEach(element => {

        shuffleSongList.push({
          uri: element.uri,
          title: element.title,
          artist: element.artist,
          image: element.image,
        })
      }
      );
      imsi.forEach(element => {

        song2.push({
          uri: element.uri,
          title: element.title,
          artist: element.artist,
          image: element.image,
        })
      }
      );
      // console.log('추가된 노래 리스트 --------');
      // console.log(imsi);
      // console.log('추가된 노래 리스트 끝 ----------');
    }
  }
  }

  async function shuffleButtonPressed() {
    await SoundObj.unloadAsync();
    shuffleSongList.length = 0;
    // console.log(shuffleSongList);
    // console.log('shuffle-------------');

    //console.log(shuffleActionList);
    let imsi = createPlaylist(songs, 10, shuffleActionList);
    // console.log('--------------------------imsi');
    // console.log(imsi);
    // console.log('--------------------------imsi');

    imsi.forEach(element => {

      shuffleSongList.push({
        uri: element.uri,
        title: element.title,
        artist: element.artist,
        image: element.image,
      })
    }
    );
    // console.log(shuffleSongList);
    song2 = shuffleSongList;
    //console.log(createPlaylist(song2, 10, shuffleActionList));
    await shuffledSongInput();

  }
  async function shuffledSongInput() {
    

    await SoundObj.unloadAsync();
    // console.log(songNow);
    // console.log('------- MusicNow로 복사중 -----');
    songNow.title = shuffleSongList[0].title;
    songNow.artist = shuffleSongList[0].artist;
    // console.log(shuffleSongList[0].image);


    songNow.image = shuffleSongList[0].image;
    songNow.uri = shuffleSongList[0].uri;
    songNow.isPlayin = true;
    songNow.index = 0;
    // console.log(songNow);
    // console.log('------- MusicNow로 복사 완료 -----');

    navigation.navigate('MusicPlayerUI', {})
  }

  async function songInput(item) {
    
    song2 = songs;
      
      if (songNow.title != item.title) {
        
        await SoundObj.unloadAsync();
        // console.log(songNow);
        // console.log('------- MusicNow로 복사중 -----');
        songNow.title = item.title;
        songNow.artist = item.artist;
        songNow.image = item.image;
        songNow.id = item.id;
        songNow.uri = item.uri;
        songNow.duration = item.duration;
        songNow.isPlayin = true;
        songNow.index = item.id - 1;
        // console.log(songNow);
        // console.log('------- MusicNow로 복사 완료 -----');
      }
   



    navigation.navigate('MusicPlayerUI', { selected: item.id - 1, selected1: item, musicUri: item.uri })
  }
  const RenderShuffleButon = () => {
    return (
      <TouchableOpacity
        style={styles.shuffleButton}
        onPress={() => shuffleButtonPressed()}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="shuffle" size={rem * 1.7} color={theme}></Ionicons>
          <Text style={{ fontSize: rem * 1.2, color: theme, fontWeight: '600', justifyContent: 'center' }}> Shuffle </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const RenderSong = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => songInput(item)}
        style={styles.music}>
        <View style={{ width: listHeight }}>
          <Image
            source={item.image}
            style={{ width: '87%', height: '87%', borderRadius: 4, }}
          />
        </View>
        <View style={{ width: width - listHeight * 2 - width * 0.05, marginLeft: '2%' }}>
          <Text style={{ fontSize: rem * 0.92, }} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{ fontSize: rem * 0.75, color: '#888', fontWeight: '300', marginTop: '0.9%', }} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" animated="true" />

      <View style={{ height: width / 4, flexDirection: 'row', paddingTop: '5%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.titleText}>songs</Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('About') }}
          style={{
            padding:
              '4%'
          }}
        >
          <Ionicons name="information-circle-outline" size={rem * 1.4} color={'#999'}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <Animated.FlatList
          style={{ paddingTop: '1%' }}
          data={songs}
          ListHeaderComponent={RenderShuffleButon}
          ListFooterComponent={<View style={{ height: bottomBarHeight }}></View>}
          renderItem={RenderSong}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>

      <BlurView intensity={blurIntensity} tint={'light'} style={styles.bottomBarContainer}>
        <View style={{ flex: 13, alignItems: 'center', height: '100%', paddingTop: height * 0.0125 }}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('MusicPlayerUI', {load: 'no'}) }}

            style={styles.bottomMusic}>
            <View style={{
              width: listHeight,
              shadowColor: 'black',
              shadowRadius: width * 0.02,
              shadowOpacity: 0.15,
            }}>
              <Image
                source={songNow.image}
                style={{ width: '87%', height: '87%', borderRadius: 4, }}
              />
            </View>
            <View style={{ width: width - listHeight * 2 - width * 0.22, marginLeft: '2%' }}>
              <Text style={{ fontSize: rem * 0.92, }} numberOfLines={1}>
                {songNow.title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6, alignItems: 'center', height: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: Math.pow(height, 3.3) * 0.000000002 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', }}>
            <TouchableOpacity onPress={onPausePress} style={{  padding: songNow.isPlayin ? rem * 0.6 : rem * 0.775 }} >
              <Ionicons name={songNow.isPlayin ? "pause" : "play"} size={songNow.isPlayin ? rem * 2 : rem * 1.65} color={buttonTheme}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext} style={{ padding: '7%' }}>
              <Ionicons name="play-forward" size={rem * 1.8} color={buttonTheme}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: rem * 1.9,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: '5%',
  },
  shuffleButton: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: '2.5%',
    marginTop: '2%',
    marginBottom: '3%',
    marginHorizontal: '18%',
    borderRadius: 10,
  },
  music: {
    alignItems: 'center',
    height: listHeight,
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.7,
    marginHorizontal: '5%',
  },
  bottomBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: bottomBarHeight,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomMusic: {
    alignItems: 'center',
    height: listHeight,
    flexDirection: 'row',
    paddingLeft: width * 0.05,
  }
});

export default MusicListUI;
