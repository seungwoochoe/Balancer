import {Audio} from 'expo-av';

export const SoundObj = new Audio.Sound();

const songNow = {
    title : "",
    artist : '',
    image : require("../assets/artwork/Blank.jpg"),
    songfile : '',
    duration : 0,

}

export default songNow;