// import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAYLIST_SIZE = 20;

const SKIP_WEIGHT_MODIFIER = 0.85;
const BOOST_WEIGHT_MODIFIER = 0.2;

// If there is no or only one music in storage, "createPlaylist" function should not be called.
async function createPlaylist(musicList, playlistSize) {
  // const userActionList = await getUserActionList();
  const userActionList = fakeuserActionList;
  const weightedMusicList = calculateWeight(musicList, userActionList);
  const playlist = drawMusic(weightedMusicList, playlistSize);
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

function drawMusic(musicList, number) {
  const totalWeight = getTotalWeight(musicList);
  const playlist = [];

  for (let k = 0; k < number; k++) {
    const randomWeight = Math.random() * totalWeight;
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
  return playlist;
}

function getTotalWeight(musicList) {
  let totalWeight = 0;

  musicList.forEach(music => {
    totalWeight += music.weight;
  });
  return totalWeight;
}

async function storePlaylist(playlist) {
  try {
    const playlistJsonString = JSON.stringify(playlist);
    await AsyncStorage.setItem('playlist', playlistJsonString);
  } catch (err) {
    console.log(err);
  }
};

async function complementPlaylist(musicList, currentPlaylist) {
  const playlistToBeAdded = await createPlaylist(musicList, PLAYLIST_SIZE - createPlaylist.length);
  return currentPlaylist.append(playlistToBeAdded);
}

async function appendMorePlaylist(musicList, currentPlaylist) {
  const playlistToBeAdded = await createPlaylist(musicList, PLAYLIST_SIZE);
  return currentPlaylist.append(playlistToBeAdded);
}

async function getPrunedPlaylistFromStorage() {
  let playlist = [];
  try {
    const playlistJsonString = await AsyncStorage.getItem('playlist');
    playlist = playlistJsonString != null ? JSON.parse(playlistJsonString) : [];
  } catch (err) {
    console.log(err);
  }

  const isNotPlayed = (music) => music.isPlayed === "false";
  const notPlayedIndex = playlist.findIndex(isNotPlayed);
  return playlist.slice(notPlayedIndex);
};


const fakeMusicList = [
  {
    "title": "1",
    "artist": "AKMU",
  },
  {
    "title": "2",
    "artist": "LAUV",
  },
  {
    "title": "3",
    "artist": "LAUV",
  },
  {
    "title": "4",
    "artist": "Mark Zuckerberg",
  },
  {
    "title": "5",
    "artist": "Joe Goldberg",
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
