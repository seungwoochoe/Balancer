import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from'react';
import {SafeAreaView,View,Text,StyleSheet, Dimensions, Image, FlatList, Animated} from'react-native';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 아이콘 라이브러리
import songs from '../models/data';
const {width, height} = Dimensions.get("window");
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MusicListUI = ({navigation}) => {
    return(
        <SafeAreaView style = {{
            flex : 1,
            justifyContent : 'center',
            alignItems: 'center'
        }}>
            <TouchableOpacity
            onPress ={() => navigation.navigate('음악 재생화면')}
 
            style = {{
                backgroundColor:"#AD40AF",
                padding: 20,
                width : '90%',
                borderRadius : 5,
                flexDirection: 'row',
            }}>
                <Text style ={{ color: "#FFFFFF"}}>음악 재생화면으로 가기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default MusicListUI;