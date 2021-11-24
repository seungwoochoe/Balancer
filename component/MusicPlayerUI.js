import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, ImageBackground, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../models/data';

const { width, height } = Dimensions.get("window");
const rem = width / 20;
const theme = '#eee';
const blurRadius = Math.pow((width / height), 2.05) * 480;



const MusicPlayerUI = () => {
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / (width * 0.9))
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    }
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width * 0.9,
    });
  }

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width * 0.9,
    });
  }

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View style={{
        width: width * 0.9,
        alignItems: 'center',

      }}>
        <Image
          source={item.image}
          style={styles.arworkImage}
        />
      </Animated.View>
    );
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



  return (
    <ImageBackground source={songs[songIndex].image} blurRadius={blurRadius} style={{ flex: 1, transform: [{ rotate: '180deg' }] }}>
      <StatusBar barStyle="light-content" animated="true"/>
      <View style={{ flex: 1, transform: [{ rotate: '180deg' }], alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
        <View style={styles.artworkWrapper}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
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
            <Text style={styles.title} numberOfLines={1}>{songs[songIndex].title}</Text>
            <Text style={styles.artist} numberOfLines={1}>{songs[songIndex].artist}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={rem * 1.5} color={theme}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 0.8, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Slider
              style={styles.progressContainer}
              value={18}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor={theme}
              minimumTrackTintColor={theme}
              maximumTrackTintColor='#aaa'
              onSlidingComplete={() => { }}
            />
            <View style={styles.progressLabelContainer}>
              <Text style={{ color: '#bbb', fontSize: rem * 0.75 }}>0:00</Text>
              <Text style={{ color: '#bbb', fontSize: rem * 0.75 }}>4:00</Text>
            </View>
          </View>
        </View>


        <View style={{ flex: 2, flexDirection: 'row' }}>
          <View style={styles.MusicControls}>
            <TouchableOpacity onPress={skipToPrevious} style={{ padding: '10%' }}>
              <Ionicons name="play-back" size={rem * 2} color={theme}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={{ padding: '10%' }} >
              <Ionicons name="pause" size={rem * 2.8} color={theme}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext} style={{ padding: '10%' }}>
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
    fontSize: rem * 1.35,
    color: '#eee',
    fontWeight: '600',
  },
  artist: {
    fontSize: rem * 1.1,
    color: '#ccc',
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
