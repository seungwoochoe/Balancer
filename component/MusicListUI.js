import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, FlatList, Animated } from 'react-native';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../models/data';
const { width, height } = Dimensions.get("window");
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const rem = width / 20;
const theme = '#107dac';
const listHeight = width * 0.16;

const MusicListUI = ({ navigation }) => {

  const renderElement = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('음악 재생화면')}
        style={styles.musicItem}>
        <View style={{ width: listHeight }}>
          <Image
            source={item.image}
            style={{ width: '87%', height: '87%', borderRadius: 4, }}
          />
        </View>
        <View style={{ width: width - listHeight, marginLeft: '2%' }}>
          <Text style={{ fontSize: rem * 0.98, }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: rem * 0.75, color: '#888', fontWeight: '300', marginTop: '0.9%', }}>
            {item.artist}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const renderShuffleButon = () => {
    return (
      <TouchableOpacity
        style={styles.shuffleButton}
        onPress={() => { }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="logo-electron" size={rem * 1.7} color={theme}></Ionicons>
          <Text style={{ fontSize: rem * 1.2, color: theme, fontWeight: '600', justifyContent: 'center' }}> Shuffle </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Songs</Text>
      <Animated.FlatList
        style={{ marginTop: '3%' }}
        data={songs}
        ListHeaderComponent={renderShuffleButon}
        renderItem={renderElement}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginTop: '16%',
    marginLeft: '5%',
    backgroundColor: '#fff'
  },
  titleText: {
    fontSize: rem * 1.9,
    fontWeight: 'bold',
    color: '#222',
  },
  shuffleButton: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: '3%',
    marginTop: '4%',
    marginBottom: '3%',
    marginHorizontal: '23%',
    borderRadius: 10,
  },
  musicItem: {
    alignItems: 'center',
    height: listHeight,
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.7,
  },
});

export default MusicListUI;
