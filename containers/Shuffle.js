// import AsyncStorage from '@react-native-async-storage/async-storage';

const fakeMusicList = [
  {
    "title": "1",
    "artist": "AKMU",
    "weight": 1
  },
  {
    "title": "2",
    "artist": "LAUV",
    "weight": 1
  },
  {
    "title": "3",
    "artist": "LAUV",
    "weight": 1
  },
  {
    "title": "4",
    "artist": "Mark Zuckerberg",
    "weight": 1
  },
  {
    "title": "5",
    "artist": "Joe Goldberg",
    "weight": 1
  },
];

const fakeuserActionList = [
  {
    "title": "3",
    "action": "like"
  },
  {
    "title": "5",
    "action": "skip"
  },
  {
    "title": "5",
    "action": "skip"
  },
  {
    "title": "5",
    "action": "skip"
  },
  {
    "title": "5",
    "action": "skip"
  },
  {
    "title": "4",
    "action": "like"
  },
  {
    "title": "4",
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

const calculateWeight = (musicList, userActionList) => {
  userActionList.forEach(userAction => {
    let targetMusic = musicList.find(music => music.title === userAction.title);

    if (userAction.action === "skip") {
      targetMusic.weight = targetMusic.weight * SKIP_WEIGHT_MODIFIER;
    } else {
      targetMusic.weight = targetMusic.weight + BOOST_WEIGHT_MODIFIER;
    }
  });
};

const resetWeight = (musicList) => {
  musicList.forEach(music => {
    music.weight = 1;
  })
};

const createPlaylist = (musicList) => {
  let playlistSize = 0;
  let weightTotal = 0;
  const playlist = [];

  if (musicList.length < DEFAULT_PLAYLIST_SIZE) {
    playlistSize = musicList.length;
  } else {
    playlistSize = DEFAULT_PLAYLIST_SIZE;
  }

  musicList.forEach(music => {
    weightTotal += music.weight;
  })
  console.log("Total weight: ", weightTotal);

  for (let k = 0; k < playlistSize; k++) {
    const randomWeight = Math.random() * weightTotal;
    console.log(randomWeight);

    let weightSum = 0;
    let index = 0;
    while (weightSum <= randomWeight) {
      weightSum += musicList[index].weight;
      index++;
    }

    if (k > 0 && playlist[k - 1] === musicList[index - 1]) {
      console.log("Duplicate");
      k--;
    } else {
      playlist.push(musicList[index - 1]);      
    }
  }
  console.log(playlist);
}





// const musicList = loadMusicList();
// const userActionList = loadUserActionList();

const SKIP_WEIGHT_MODIFIER = 0.85;
const BOOST_WEIGHT_MODIFIER = 0.2;

const DEFAULT_PLAYLIST_SIZE = 20;
const ACTION_LIST_SIZE = 50;

calculateWeight(fakeMusicList, fakeuserActionList);
createPlaylist(fakeMusicList);

console.log(fakeMusicList);
