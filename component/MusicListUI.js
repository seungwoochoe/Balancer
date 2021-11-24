import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, Animated, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../models/data';
const { width, height } = Dimensions.get("window");

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
        <View style={{ width: width - listHeight * 2 - width * 0.05, marginLeft: '2%' }}>
          <Text style={{ fontSize: rem * 0.98, }} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{ fontSize: rem * 0.75, color: '#888', fontWeight: '300', marginTop: '0.9%', }} numberOfLines={1}>
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
          <Ionicons name="shuffle" size={rem * 1.7} color={theme}></Ionicons>
          <Text style={{ fontSize: rem * 1.2, color: theme, fontWeight: '600', justifyContent: 'center' }}> Shuffle </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" animated="true" />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.titleText}>Songs</Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('About') }}
          style={{ padding: '4%' }}
        >
          <Ionicons name="information-circle-outline" size={rem * 1.4} color={'#999'}></Ionicons>

        </TouchableOpacity>

      </View>
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
    width: '100%',
    marginTop: '16%',
    backgroundColor: '#fff'
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
    marginTop: '4%',
    marginBottom: '3%',
    marginHorizontal: '18%',
    borderRadius: 10,
  },
  musicItem: {
    alignItems: 'center',
    height: listHeight,
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.7,
    marginHorizontal: '5%',
  },
});

export default MusicListUI;
