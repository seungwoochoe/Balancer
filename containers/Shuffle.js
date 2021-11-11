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

// If there is no or only one music in storage, this function should not be called.
async function createPlaylist(musicList) {
  const userActionList = fakeuserActionList;
  const weightedMusicList = calculateWeight(musicList, userActionList);
  const playlist = drawMusic(weightedMusicList);
  console.log("\n🎧 playlist size is 20.\n", playlist);
}

async function getUserActionList() {
  try {
    const userActionListJsonString = await AsyncStorage.getItem('userActionList');
    return userActionListJsonString != null ? JSON.parse(userActionListJsonString) : [];
  } catch (err) {
    console.log(err);
  }
};

function calculateWeight(musicList, userActionList) {
  const resetMusicList = resetWeights(musicList);
  return applyUserActionEffects(resetMusicList, userActionList);
};

function resetWeights(musicList) {
  musicList.forEach(music => {
    music.weight = 1;
  });
  return musicList;
};

function applyUserActionEffects(musicList, userActionList) {
  const SKIP_WEIGHT_MODIFIER = 0.85;
  const BOOST_WEIGHT_MODIFIER = 0.2;

  userActionList.forEach(userAction => {
    let targetMusic = musicList.find(music => music.title === userAction.title);

    if (userAction.action === "skip") {
      targetMusic.weight = targetMusic.weight * SKIP_WEIGHT_MODIFIER;
    } else {
      targetMusic.weight = targetMusic.weight + BOOST_WEIGHT_MODIFIER;
    }
  });
  console.log("This is 🎶 list after applying user actions.\n", musicList);
  return musicList;
};

function drawMusic(musicList) {
  const PLAYLIST_SIZE = 20;

  const totalWeight = getTotalWeight(musicList);
  const playlist = [];

  for (let k = 0; k < PLAYLIST_SIZE; k++) {
    const randomWeight = Math.random() * totalWeight;

    let weightSum = 0;
    let index = 0;
    while (weightSum <= randomWeight) {
      weightSum += musicList[index].weight;
      index++;
    }

    if (k > 0 && playlist[k - 1] === musicList[index - 1]) {
      k--;
    } else {
      playlist.push(musicList[index - 1]);      
    }
  }
  return playlist;
}

function getTotalWeight(musicList) {
  let totalWeight = 0;

  musicList.forEach(music => {
    totalWeight += music.weight;
  });
  return totalWeight;
}



createPlaylist(fakeMusicList);

