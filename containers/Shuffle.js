// import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAYLIST_SIZE = 20;

const SKIP_WEIGHT_MODIFIER = 0.85;
const BOOST_WEIGHT_MODIFIER = 0.2;

async function getPrunedPlaylistFromStorage() {
  // let playlist = [];
  // try {
  //   const playlistJsonString = await AsyncStorage.getItem('playlist');
  //   playlist = playlistJsonString != null ? JSON.parse(playlistJsonString) : [];
  // } catch (err) {
  //   console.log(err);
  // }
  let playlist = fakeLoadedPlaylist;

  const isNotPlayed = (music) => music.isPlayed === "false";
  const notPlayedIndex = playlist.findIndex(isNotPlayed);
  return playlist.slice(notPlayedIndex);
};

async function complementPlaylist(musicList, currentPlaylist) {
  const playlistToBeAdded = await createPlaylist(musicList, PLAYLIST_SIZE - currentPlaylist.length);
  // console.log("\nplaylist to be added:\n", playlistToBeAdded);
  const playlist = [...currentPlaylist, ...playlistToBeAdded];
  // console.log("\nthis is 'playlist' from complementPlaylist function\n", playlist);
  return markIsTrigger(playlist);
}

async function appendMorePlaylist(musicList, currentPlaylist) {
  const playlistToBeAdded = await createPlaylist(musicList, PLAYLIST_SIZE);
  const playlist = [...currentPlaylist, ...playlistToBeAdded];
  return markIsTrigger(playlist);
}

// If there is no or only one music in storage, "createPlaylist" function should not be called.
async function createPlaylist(musicList, playlistSize) {
  // const userActionList = await getUserActionList();
  const userActionList = [];
  const weightedMusicList = calculateWeight(musicList, userActionList);
  let playlist = drawMusic(weightedMusicList, playlistSize);
  playlist = markIsPlayedToFalse(playlist);
  return markIsTrigger(playlist);
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
  // console.log("This is 🎶 list after applying user actions.\n", musicList);
  return musicList;
};

function drawMusic(musicList, number) {
  const totalWeight = getTotalWeight(musicList);
  const playlist = [];

  for (let k = 0; k < number; k++) {
    const randomWeight = Math.random() * totalWeight;

    let weightSum = 0;
    let index = 0;
    while (weightSum <= randomWeight) {
      weightSum += musicList[index].weight;
      index++;
    }

    if (k > 0 && playlist[k - 1].title === musicList[index - 1].title) {
      k--;
    } else {
      playlist.push({...musicList[index - 1]});      
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

function markIsPlayedToFalse(playlist) {
  playlist.forEach((music) => {
    music.isPlayed = "false";
  });
  return playlist;
}

// Marks music with "isTrigger", which is used for triggering appending new playlist to the current playlist.
function markIsTrigger(playlist) {
  // console.log("\n\n\nthis is 'playlist' from markIsTrigger function\n", playlist);
  let count = 0;
  playlist.forEach((music) => {
    count++;
    // console.log(count, count % (PLAYLIST_SIZE / 2), count % (PLAYLIST_SIZE / 2) === 0);
    if (count % (PLAYLIST_SIZE / 2) === 0) {
      music.isTrigger = "true";
    } else {
      music.isTrigger = "false";
    }
  });
  return playlist;
}

async function storePlaylist(playlist) {
  try {
    const playlistJsonString = JSON.stringify(playlist);
    await AsyncStorage.setItem('playlist', playlistJsonString);
  } catch (err) {
    console.log(err);
  }
};



const fakeLoadedPlaylist = [
  { title: "2", artist: "LAUV", weight: 1, isPlayed: "true", isTrigger: "false" },
  { title: "3", artist: "LAUV", weight: 1, isPlayed: "true", isTrigger: "false" },
  { title: "2", artist: "LAUV", weight: 1, isPlayed: "true", isTrigger: "false" },
  { title: "3", artist: "LAUV", weight: 1, isPlayed: "true", isTrigger: "false" },
  { title: "5", artist: "Goldberg", weight: 1, isPlayed: "true", isTrigger: "false" },
  { title: "4", artist: "Zuckerberg", weight: 1, isPlayed: "true", isTrigger: "false" },
  { title: "1", artist: "AKMU", weight: 1, isPlayed: "true", isTrigger: "false" },
  { title: "2", artist: "LAUV", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "1", artist: "AKMU", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "2", artist: "LAUV", weight: 1, isPlayed: "false", isTrigger: "true" },
  { title: "3", artist: "LAUV", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "1", artist: "AKMU", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "3", artist: "LAUV", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "5", artist: "Goldberg", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "4", artist: "Zuckerberg", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "1", artist: "AKMU", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "3", artist: "LAUV", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "2", artist: "LAUV", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "4", artist: "Zuckerberg", weight: 1, isPlayed: "false", isTrigger: "false" },
  { title: "5", artist: "Goldberg", weight: 1, isPlayed: "false", isTrigger: "true" }
];

const fakeMusicList =  [
  { title: "1", artist: "AKMU" },
  { title: "2", artist: "LAUV" },
  { title: "3", artist: "LAUV" },
  { title: "4", artist: "Zuckerberg" },
  { title: "5", artist: "Goldberg" }
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


async function test() {
  let playlist = [];
  // playlist = await(createPlaylist(fakeMusicList, PLAYLIST_SIZE));

  playlist = await getPrunedPlaylistFromStorage();
  // console.log("pruned playlist\n", playlist);

  playlist = await complementPlaylist(fakeMusicList, playlist);
  playlist = await appendMorePlaylist(fakeMusicList, playlist);
  console.log("\n\n🎧 Final playlist\n", playlist);
}
test();