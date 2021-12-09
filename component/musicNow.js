import { Audio } from 'expo-av';


export const SoundObj = new Audio.Sound();

let songNow = {
    uri: require('../assets/songs/6.mp3'),
    title: "A Day To Remember",
    artist: "Benjamin Tissot",
    image: require("../assets/artworks/pexels-min-an-1454789.jpg"),
    id: "6",
    isPlayin: true,
    index: 0
}



export default songNow;