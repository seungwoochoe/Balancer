import { Audio } from 'expo-av';


export const SoundObj = new Audio.Sound();

let songNow = {
    title: " ",
    artist: " ",
    image: require("../assets/artwork/anysong.jpg"),
    id: " ",
    uri: require('../assets/songs/1.mp3'),
    duration: 152,
}

export default songNow;