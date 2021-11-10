// import AsyncStorage from '@react-native-async-storage/async-storage';

const fakeMusicList = [
  {
    "title": "1",
    "artist": "AKMU",
    "weight": 100
  },
  {
    "title": "2",
    "artist": "LAUV",
    "weight": 100
  },
  {
    "title": "3",
    "artist": "LAUV",
    "weight": 100
  },
  {
    "title": "4",
    "artist": "Mark Zuckerberg",
    "weight": 100
  },
  {
    "title": "5",
    "artist": "Meta",
    "weight": 100
  },
];

let fakeuserActionList = [
  {
    "title": "3",
    "action": "like"
  },
  {
    "title": "4",
    "action": "skip"
  },
  {
    "title": "4",
    "action": "skip"
  },
  {
    "title": "4",
    "action": "skip"
  },
  {
    "title": "5",
    "action": "skip"
  },
  {
    "title": "5",
    "action": "like"
  }
];

const loadMusicList = async () => {
  try {
    const musicListJsonString = await AsyncStorage.getItem('musicList');
    return musicList = await JSON.parse(musicListJsonString);
  } catch (err) {
    console.log(err);
  }
};

const loadUserActionList = async () => {
  try {
    const userActionListJsonString = await AsyncStorage.getItem('userActionList');
    return userActionList = await JSON.parse(userActionListJsonString);
  } catch (err) {
    console.log(err);
  }
};

const updateWeight_skipped = (music) => {
  music.weight = music.weight*0.9;
  return music;
};

const updateWeight_liked = (music) => {
  music.weight = music.weight*1.1;
  return music;
};

const resetWeight = (musicList) => {
  musicList.forEach(music => {
    music.weight = 100;
  })
}

const calculateWeight = (musicList, userActionList) => {
  userActionList.forEach(element => {
    let targetMusic = musicList.find(music => music.title === element.title);

    if (element.action === "skip") {
      targetMusic = updateWeight_skipped(targetMusic);
    } else {
      targetMusic = updateWeight_liked(targetMusic);
    }
  });
  return musicList;
};



// const musicList = loadMusicList();
// let userActionList = loaduserActionList();

calculateWeight(fakeMusicList, fakeuserActionList);

console.log(fakeuserActionList);
console.log(fakeMusicList);
