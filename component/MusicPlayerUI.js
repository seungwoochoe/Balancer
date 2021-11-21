import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../models/data';

const { width, height } = Dimensions.get("window");
const rem = width / 20;
const theme = '#eee';



const MusicPlayerUI = () => {
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width)
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    }
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  }

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  }

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View style={{
        width: width,
        alignItems: 'center',
      }}>
        <View style={styles.artworkWrapper}>
          <Image
            source={item.image}
            style={styles.arworkImage}
          />
        </View>
      </Animated.View>
    );
  }



  return (
    <ImageBackground source={songs[songIndex].image} blurRadius={(width / height) * 220} style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{
          width: width,
          alignItems: 'center',
        }}>
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
        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>

        <View>
          <Slider
            style={styles.progressContainer}
            value={20}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor='#ddd'
            minimumTrackTintColor='#ddd'
            maximumTrackTintColor='#9c9c9c'
            onSlidingComplete={() => { }}
          />
        </View>
        <View style={styles.progressLabelContainer}>
          <Text style={{color: '#bbb', fontSize: rem * 0.75}}>0 : 00</Text>
          <Text style={{color: '#bbb', fontSize: rem * 0.75}}>4 : 00</Text>
        </View>

        <View style={styles.MusicControls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-back" size={rem * 1.8} color={theme} style={{ marginTop: 25 }}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="pause-outline" size={rem * 2} color={theme}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons name="play-forward" size={rem * 1.8} color={theme} o style={{ marginTop: 25 }}></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="heart-outline" size={30} color="#FF0000"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="repeat" size={30} color="#000000"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="share-outline" size={30} color="#000000"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#000000"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { // 전체 컨테이너, 앱 배경 등의 색깔 조절
    flex: 1,
  },
  mainContainer: { //메인 컨테이너
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: { // 밑의 아이콘들을 구분하는 컨테이너
    width: '100%',
    alignItems: 'center',
    paddingBottom: 60,
    paddingTop: 40
  },
  bottomControls: { // 밑의 아이콘들이 담긴 컨테이너 조절
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  artworkWrapper: { //이미지 컨테이너
    width: width * 0.84,
    height: width * 0.84,
  },
  arworkImage: { // 이미지가 이미지 컨테이너에 어떻게 들어갈지 정하는 것
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  title: {
    marginTop: rem * 1.5,
    fontSize: rem * 1.32,
    color: '#eee',
    fontWeight: '600',
    textAlign: 'center'
  },
  artist: {//노래 가수 이름
    marginTop: rem * 0.2,
    fontSize: rem * 1.1,
    color: '#ddd',
    fontWeight: '200',
    textAlign: 'center',
  },
  progressContainer: {
    width: width * 0.88,
    // backgroundColor: 'black',
    height: 40,
    marginTop: 25,
    flexDirection: 'row'
  },
  progressLabelContainer: {
    width: width * 0.88,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  MusicControls: {
    marginBottom: -40,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  }
});

export default MusicPlayerUI;
