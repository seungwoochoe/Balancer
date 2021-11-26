import React, { Component, useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, Animated, StatusBar, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import songs from '../models/data';
import {Audio} from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
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

const MusicListUI = ({ navigation }) => {

  const RenderShuffleButon = () => {
    return (
      <TouchableOpacity
        style={styles.shuffleButton}
        onPress={() => { }}
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
        onPress={() => navigation.navigate('MusicPlayerUI',{selected: item.id-1, selected1: item, musicUri: item.uri})}
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

  const RenderSongForBottomBar = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MusicPlayerUI')}

        style={styles.bottomMusic}>
        <View style={{
          width: listHeight,
          shadowColor: 'black',
          shadowRadius: width * 0.02,
          shadowOpacity: 0.15,
        }}>
          <Image
            source={item.image}
            style={{ width: '87%', height: '87%', borderRadius: 4, }}
          />
        </View>
        <View style={{ width: width - listHeight * 2 - width * 0.22, marginLeft: '2%' }}>
          <Text style={{ fontSize: rem * 0.92, }} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" animated="true" />

      <View style={{ height: width / 4, flexDirection: 'row', paddingTop: '5%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.titleText}>Songs</Text>
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
          <RenderSongForBottomBar item={songs[3]} />
        </View>
        <View style={{ flex: 6, alignItems: 'center', height: '100%', paddingTop: height * 0.022 }}>
          <View style={{ alignItems: 'center', flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => { }} style={{ padding: '10%' }} >
              <Ionicons name="play" size={rem * 1.65} color={buttonTheme}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={{ padding: '10%' }}>
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
