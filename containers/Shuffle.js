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

const calculateWeight = (musicList, userActionList) => {
  userActionList.forEach(userAction => {
    let targetMusic = musicList.find(music => music.title === userAction.title);

    if (userAction.action === "skip") {
      targetMusic.weight = targetMusic.weight*SKIP_WEIGHT_MODIFIER;
    } else {
      targetMusic.weight = targetMusic.weight*BOOST_WEIGHT_MODIFIER;
    }
  });
  return musicList;
};

const resetWeight = (musicList) => {
  musicList.forEach(music => {
    music.weight = 100;
  })
};

const makePlaylist = (musicList) => {
  let playListSize = 0;
  let weightTotal = 0;
  const playList = [];

  if (musicList.length < DEFAULT_PLAYLIST_SIZE) {
    playListSize = musicList.length;
  } else {
    playListSize = DEFAULT_PLAYLIST_SIZE;
  }

  musicList.forEach(music => {
    weightTotal += music.weight;
  })
  console.log(weightTotal);

  for (let k = 0; k < playListSize; k++) {
    const randomWeight = Math.random() * weightTotal;
    console.log(randomWeight);

    let weightSum = 0;
    let index = 0;
    while (weightSum <= randomWeight) {
      weightSum += musicList[index].weight;
      index++;
    }

    if (k > 0 && playList[k - 1] === musicList[index - 1]) {
      console.log("Duplicate");
      k--;
    } else {
      playList.push(musicList[index - 1]);      
    }
  }
  console.log(playList);
}





// const musicList = loadMusicList();
// let userActionList = loadUserActionList();

const SKIP_WEIGHT_MODIFIER = 0.85;
const BOOST_WEIGHT_MODIFIER = 1.2;

const DEFAULT_PLAYLIST_SIZE = 20;
const ACTION_LIST_SIZE = 50;

// calculateWeight(fakeMusicList, fakeuserActionList);
makePlaylist(fakeMusicList);
