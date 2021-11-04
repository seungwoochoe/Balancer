import React from "react";
import {SafeAreaView,View, Text, StyleSheet,Dimensions,TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
const {width, height} = Dimensions.get('window');
const MusicPlayer = () => {
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
            <View style = {styles.artworkWrapper}>
                <Image 
                source={require('../assets/artwork/lilac.jpeg')} 
                style = {styles.artworkImage}
                />
            </View>

            <View>
                <Text style = {styles.title}>Song Title</Text>
                <Text style = {styles.artist}>Song Artist Name</Text>
            </View>
            <View>
              <Slider
              style = {styles.progressContainer}
              value = {10}
              minimumValue = {0}
              maximumValue = {100}
              mini
              />
            </View>
        </View>
        <View style={styles.bottomContainer}>
            <View style={styles.bottomControls}>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="heart-outline" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="repeat" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="share-outline" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="ellipsis-horizontal" size={30}/>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
};

export default MusicPlayer;

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : '#FFFFFF'
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer : {
        borderTopColor : '#000000',
        borderTopWidth: 2,
        width: width,
        alignItems: 'center',
        paddingVertical: 30

    },
    bottomControls : {
        flexDirection : 'row',justifyContent: 'space-between',width : '80%'
    },
    artworkWrapper : {
        marginTop : -30,
        width : 300,
        height : 300,
        marginBottom : 20
    },
    artworkImage :
    {
        width : '100%',
        height : '100%',
        borderRadius : 15
    },
    title : 
    {
        marginTop : 0,
        fontSize : 18,
        fontWeight :'600',
        textAlign : 'center',
        color : '#000000'
    },
    artist :
    {
        fontSize : 16,
        fontWeight :'200',
        textAlign : 'center',
        color : '#000000',
       marginBottom : 0
    },
    progressContainer : 
    {
      width : 350,
      height : 40,
      marginTop : 25,
      flexDirection : 'row' 
    }
});