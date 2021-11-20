import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, FlatList, Animated } from 'react-native';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 아이콘 라이브러리
import songs from '../models/data';
const { width, height } = Dimensions.get("window");
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MusicListUI = ({ navigation }) => {

  const renderElement = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('음악 재생화면')}
        style={styles.musicItem}>
        <View style={{flex: 1}}>
          <Image
            source={item.image}
            style={{
              width: 55,
              height: 55,
              borderRadius: 4,
            }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{
            fontSize: 18,
          }}>{item.title}</Text>
          <Text style={{
            fontSize: 14,
            color: '#888',
            fontWeight: '300',
            marginTop: 2,
          }}>
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
        onPress={() => {}}
      >
        <View style={{flexDirection: 'row'}}>
        <Ionicons name="logo-electron" size={25} color="darkcyan"></Ionicons>
        <Text style={{fontSize: 20, color: 'darkcyan', fontWeight: '600', justifyContent: 'center'}}> Shuffle</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Songs</Text>
      <Animated.FlatList
        style={{
          marginTop: 10,
        }}
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
    marginTop: 54,
    marginLeft: 18,
    marginRight: 18,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'left',
  },
  shuffleButton: {
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 13,
    marginTop: 2,
    marginBottom: 12,
    marginHorizontal: 95,
    borderRadius: 10,
  },
  musicItem: {
    alignItems: 'center',
    height: 63,
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.7,
  },
});

export default MusicListUI;
