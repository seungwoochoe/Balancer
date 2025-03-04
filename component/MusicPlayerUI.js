import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../models/data';
import { Audio } from 'expo-av';
import { shuffleSongList } from '../models/shuffledata';
import { shuffleActionList } from '../models/shuffledata';
import { createPlaylist, complementPlaylist, appendMorePlaylist } from '../containers/Shuffle';
import { song2 } from './MusicListUI';
const { width, height } = Dimensions.get("window");
const rem = width / 20;
const theme = '#eee';

const volume = 0.1;

let CurrentMusicState;
let isPressProgBar = false;
import { SoundObj } from './MusicNow';
import songNow from './MusicNow';
import { set } from 'react-native-reanimated';
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from 'expo-av/build/AV';


const MusicPlayerUI = ({ route, navigation }) => {
  // console.log(song2);
  //const {selected1, musicUri, selected} = route.params;
  const [valval, setvalval] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  //const [songIndex, setSongIndex] = useState(selected);
  const scrollX = useRef(new Animated.Value(songNow.index * width * 0.9)).current;
  const songSlider = useRef(null);
  // console.log(songNow.image);
  const fileExtension = Image.resolveAssetSource(songNow.image).uri.split('.').pop();
  let blurRadius;
  const [canstop, SetcanStop] = useState(songNow.isPlayin);

  if (fileExtension === "jpeg") {
    blurRadius = 120000 / height;
  } else {
    blurRadius = 275;
  }

  useEffect(()=> {
    song2.forEach(element => {
      element.id = Math.random().toString();
    })
  }, []);

  useEffect(async () => {
    //'../assets/songs/2.mp3'
    // console.log(songNow);
    if (route.params.load !== "no") {
      await SoundObj.loadAsync(songNow.uri, initialStatus = { volume: volume });
      CurrentMusicState = await SoundObj.getStatusAsync();
      // console.log(CurrentMusicState);
      await SoundObj.playAsync();

      scrollX.addListener(({ value }) => {
        const index = Math.round(value / (width * 0.9));
        //setSongIndex(index);
      });

      return () => {
        scrollX.removeAllListeners();
      }
    }
  }, []);


  async function skipToNext() {
    if (songNow.index !== song2.length - 1) {
      shuffleActionList.push({
        title: songNow.title,
        action: "skip"
      });
      console.log("\n\n⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️\n", shuffleActionList);
      // console.log(shuffleActionList);
      setIsBusy(true);
      await SoundObj.unloadAsync();
      songNow.title = song2[songNow.index + 1].title;
      songNow.artist = song2[songNow.index + 1].artist;
      songNow.image = song2[songNow.index + 1].image;
      songNow.id = song2[songNow.index + 1].id;
      songNow.uri = song2[songNow.index + 1].uri;
      songNow.duration = song2[songNow.index + 1].duration;
      songNow.index += 1;

      await SoundObj.loadAsync(songNow.uri, initialStatus = { volume: volume });
      await SoundObj.playAsync();
      CurrentMusicState = await SoundObj.getStatusAsync();
      SetcanStop(true);
      songNow.isPlayin = canstop;

      songSlider.current.scrollToOffset({
        offset: (songNow.index + 1) * width * 0.9,
      });
      setIsBusy(false);

      if (song2 != songs) {

        let imsi = createPlaylist(songs, 10 - song2.length + songNow.index, shuffleActionList);

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

  async function skipToPrevious() {
    if (songNow.index !== 0) {
      setIsBusy(true);
      await SoundObj.unloadAsync();
      songNow.title = song2[songNow.index - 1].title;
      songNow.artist = song2[songNow.index - 1].artist;
      songNow.image = song2[songNow.index - 1].image;
      songNow.id = song2[songNow.index - 1].id;
      songNow.uri = song2[songNow.index - 1].uri;
      songNow.duration = song2[songNow.index - 1].duration;
      songNow.index -= 1;

      await SoundObj.loadAsync(songNow.uri, initialStatus = { volume: volume });
      await SoundObj.playAsync();
      CurrentMusicState = await SoundObj.getStatusAsync();
      SetcanStop(true);
      songNow.isPlayin = canstop;

      songSlider.current.scrollToOffset({
        offset: (songNow.index - 1) * width * 0.9,
      });
      setIsBusy(false);
    }
  }

  useEffect(() => {

    try {
      SoundObj.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          skipToNext();
        }
        if (!isPressProgBar && status.isLoaded) {
          setvalval((status.positionMillis) / (status.durationMillis));
        }
      })
    } catch (err) {
    }
  }, []);



  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View style={{
        width: width * 0.9,
        alignItems: 'center',
      }}>
        <Image
          source={songNow.image}
          style={styles.arworkImage}
        />
      </Animated.View>
    );
  }
  const slideStart = () => {
    isPressProgBar = true;
    // console.log('pressing bar');
  }
  async function sliedEnd(value) {
    CurrentMusicState = await SoundObj.getStatusAsync();
    isPressProgBar = false;
    // console.log('pressing bar ended');
    await SoundObj.setPositionAsync(value * CurrentMusicState.durationMillis);
  }


  const heartclicked = () => {
    shuffleActionList.push({
      title: songNow.title,
      action: "boost"
    });
    console.log("\n\n⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️\n", shuffleActionList);
    //title: "A Day To Remember", action: "skip" 
  }


  const endsec = () => {

    if (CurrentMusicState) {
      let min = parseInt(parseInt((CurrentMusicState.durationMillis) / 1000) / 60), sec = parseInt((CurrentMusicState.durationMillis) / 1000) % 60;
      if (sec < 10) sec = '0' + sec;
      return ('' + min + ':' + sec);

    } else return 0;
  }

  const currentPosition = () => {
    if (CurrentMusicState) {

      let min = parseInt(parseInt((valval * CurrentMusicState.durationMillis) / 1000) / 60), sec = parseInt(parseInt((valval * CurrentMusicState.durationMillis) / 1000)) % 60;
      if (sec < 10) sec = '0' + sec;
      return ('' + min + ':' + sec);

    } else return 0;
  }


  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // const fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 3 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 3000
  //   }).start();
  // };

  // useEffect(() => {
  //   fadeOut();
  // }, [...[songs[songIndex]]]);



  async function onAudioPress() {
    CurrentMusicState = await SoundObj.getStatusAsync();
    // console.log((CurrentMusicState.positionMillis));
    //  console.log((CurrentMusicState.durationMillis));
    setvalval((CurrentMusicState.positionMillis) / (CurrentMusicState.durationMillis));

    if (canstop) {
      // console.log('Pausing Sound');
      await SoundObj.pauseAsync();
      SetcanStop(false);
      songNow.isPlayin = false;
      // console.log(songNow.isPlayin);
    }
    else {
      // console.log('Playing Sound');
      await SoundObj.playAsync();
      SetcanStop(true);
      songNow.isPlayin = true;
    }
  }


  return (
    <ImageBackground source={songNow.image} blurRadius={blurRadius} style={{ flex: 1, transform: [{ rotate: '180deg' }] }}>
      <StatusBar barStyle="light-content" animated="true" />
      <View style={{ flex: 1, transform: [{ rotate: '180deg' }], alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        <View style={styles.artworkWrapper}>
          <Animated.FlatList
            ref={songSlider}
            data={song2}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentOffset={{ x: songNow.index * width * 0.9 }}
            onScroll={Animated.event(
              [{
                nativeEvent: {
                  contentOffset: { x: scrollX }
                }
              }],
              { useNativeDriver: true }
            )}
          />
        </View>

        <View style={{ flex: .8, width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 7, paddingRight: '7%' }}>
            <Text style={styles.title} numberOfLines={1}>{songNow.title}</Text>
            <Text style={styles.artist} numberOfLines={1}>{songNow.artist}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity disabled={isBusy} onPress={heartclicked}>

              <Ionicons name="heart-outline" size={rem * 1.5} color={theme}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 0.8, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Slider
              style={styles.progressContainer}
              value={valval}
              minimumValue={0}
              maximumValue={1}
              thumbTintColor={theme}
              minimumTrackTintColor={theme}
              maximumTrackTintColor='#aaa'
              onSlidingComplete={sliedEnd}
              onSlidingStart={(value) => slideStart(value)}
            />
            <View style={styles.progressLabelContainer}>
              <Text style={{ color: '#bbb', fontSize: rem * 0.75 }}>{currentPosition()}</Text>
              <Text style={{ color: '#bbb', fontSize: rem * 0.75 }}>{endsec()}</Text>
            </View>
          </View>
        </View>


        <View style={{ flex: 2, flexDirection: 'row' }}>
          <View style={styles.MusicControls}>
            <TouchableOpacity disabled={isBusy} onPress={skipToPrevious}>
              <Ionicons name="play-back" size={rem * 2} color={theme}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity disabled={isBusy} onPress={onAudioPress} >
              <Ionicons name={canstop ? "pause" : "play"} size={canstop ? rem * 2.8 : rem * 2.4} color={theme}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity disabled={isBusy} onPress={skipToNext}>
              <Ionicons name="play-forward" size={rem * 2} color={theme}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  artworkWrapper: {
    flex: 3500 / height,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingBottom: '6%',
    alignItems: 'flex-end',
    shadowColor: 'black',
    shadowRadius: width * 0.075,
    shadowOpacity: 0.24,
  },
  arworkImage: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 15,
  },
  title: {
    fontSize: 12.5 * height / width,
    color: '#eee',
    fontWeight: '600',
  },
  artist: {
    fontSize: 10.5 * height / width,
    color: '#cfcfcf',
    fontWeight: '300',
  },
  progressContainer: {
    width: width * 0.84,
    alignItems: 'center',
  },
  progressLabelContainer: {
    width: width * 0.84,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  MusicControls: {
    width: '62%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '18%',
    justifyContent: 'space-between',
  }
});

export default MusicPlayerUI;
