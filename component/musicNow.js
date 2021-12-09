import { Audio } from 'expo-av';


export const SoundObj = new Audio.Sound();

let songNow = {
    title: "아무노래",
    artist: "Zico",
    image: require("../assets/artwork/anysong.jpg"),
    id: "1",
    uri: require('../assets/songs/1.mp3'),
    duration: 172,
    isPlayin: true
}


export default songNow;