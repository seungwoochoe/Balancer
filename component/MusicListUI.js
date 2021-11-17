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
    const renderElement = ({item}) => {
        return (
            <TouchableOpacity 
            onPress = {() => navigation.navigate('음악 재생화면')}
            style = {{
                width : width,
                justifyContent : 'space-between',
                alignItems : 'center',
                height : 100,
                flexDirection :'row',
                borderTopColor : "#FFFFFF",
                borderBottomColor : '#808080'
            }}>
                <View style = {{
                    padding : 10
                }}>
                    <Image
                        source = {item.image}
                        style = {{
                            borderRadius : 5,
                            width : 80,
                            height : 80
                        }}
                    />
                </View>
                <View style = {{
                    flex : 1,
                    alignItems : 'flex-start',
                    
                }}>
                    <Text style = {{
                        fontSize : 15,
                        fontWeight : '600'
                    }}>{item.title}</Text>
                    <Text style = {{
                        fontSize : 10,
                        fontWeight : '300'
                    }}>
                        {item.artist}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    return(
        <SafeAreaView style = {{
            flex : 1,
            justifyContent : 'center',
            alignItems: 'center'
        }}>
           <Animated.FlatList
                style ={{
                    marginTop : 40
                }}
                data = {songs}
                renderItem = {renderElement}
                keyExtractor = {(item) => item.id}
           >
           </Animated.FlatList>
        </SafeAreaView>
    );
}

export default MusicListUI;