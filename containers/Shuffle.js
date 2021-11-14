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
  const userActionList = fakeuserActionList;
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
    let targetMusic = musicList.find(music => music.url === userAction.url);

    if (targetMusic != null) {
      if (userAction.action === "skip") {
        targetMusic.weight = targetMusic.weight * SKIP_WEIGHT_MODIFIER;
      } else {
        targetMusic.weight = targetMusic.weight + BOOST_WEIGHT_MODIFIER;
      }  
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
  {
    url: ".../Documents/4.mp3",
    duration: 184,
    title: "4",
    artist: "Ed Sheeran",
    artwork: ".../4.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/2.mp3",
    duration: 182,
    title: "2",
    artist: "Lauv",
    artwork: ".../2.jpg",
    weight: 1.4,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/5.mp3",
    duration: 185,
    title: "5",
    artist: "Goldberg",
    artwork: ".../5.jpg",
    weight: 0.5220062499999999,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/2.mp3",
    duration: 182,
    title: "2",
    artist: "Lauv",
    artwork: ".../2.jpg",
    weight: 1.4,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/1.mp3",
    duration: 181,
    title: "1",
    artist: "AKMU",
    artwork: ".../1.jpg",
    weight: 1.2,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/4.mp3",
    duration: 184,
    title: "4",
    artist: "Ed Sheeran",
    artwork: ".../4.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/2.mp3",
    duration: 182,
    title: "2",
    artist: "Lauv",
    artwork: ".../2.jpg",
    weight: 1.4,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/1.mp3",
    duration: 181,
    title: "1",
    artist: "AKMU",
    artwork: ".../1.jpg",
    weight: 1.2,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/2.mp3",
    duration: 182,
    title: "2",
    artist: "Lauv",
    artwork: ".../2.jpg",
    weight: 1.4,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/1.mp3",
    duration: 181,
    title: "1",
    artist: "AKMU",
    artwork: ".../1.jpg",
    weight: 1.2,
    isPlayed: "false",
    isTrigger: "true"
  },
  {
    url: ".../Documents/3.mp3",
    duration: 183,
    title: "3",
    artist: "Lauv",
    artwork: ".../3.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/4.mp3",
    duration: 184,
    title: "4",
    artist: "Ed Sheeran",
    artwork: ".../4.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/1.mp3",
    duration: 181,
    title: "1",
    artist: "AKMU",
    artwork: ".../1.jpg",
    weight: 1.2,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/3.mp3",
    duration: 183,
    title: "3",
    artist: "Lauv",
    artwork: ".../3.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/2.mp3",
    duration: 182,
    title: "2",
    artist: "Lauv",
    artwork: ".../2.jpg",
    weight: 1.4,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/3.mp3",
    duration: 183,
    title: "3",
    artist: "Lauv",
    artwork: ".../3.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/2.mp3",
    duration: 182,
    title: "2",
    artist: "Lauv",
    artwork: ".../2.jpg",
    weight: 1.4,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/3.mp3",
    duration: 183,
    title: "3",
    artist: "Lauv",
    artwork: ".../3.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/4.mp3",
    duration: 184,
    title: "4",
    artist: "Ed Sheeran",
    artwork: ".../4.jpg",
    weight: 1,
    isPlayed: "false",
    isTrigger: "false"
  },
  {
    url: ".../Documents/2.mp3",
    duration: 182,
    title: "2",
    artist: "Lauv",
    artwork: ".../2.jpg",
    weight: 1.4,
    isPlayed: "false",
    isTrigger: "true"
  }
];

const fakeMusicList =  [
  { url: ".../Documents/1.mp3", duration: 181, title: "1", artist: "AKMU", artwork: ".../1.jpg" },
  { url: ".../Documents/2.mp3", duration: 182, title: "2", artist: "Lauv", artwork: ".../2.jpg" },
  { url: ".../Documents/3.mp3", duration: 183, title: "3", artist: "Lauv", artwork: ".../3.jpg" },
  { url: ".../Documents/4.mp3", duration: 184, title: "4", artist: "Ed Sheeran", artwork: ".../4.jpg" },
  { url: ".../Documents/5.mp3", duration: 185, title: "5", artist: "Goldberg", artwork: ".../5.jpg" }
];

const fakeuserActionList = [
  { url: ".../Documents/1.mp3", action: "like" },
  { url: ".../Documents/5.mp3", action: "skip" },
  { url: ".../Documents/5.mp3", action: "skip" },
  { url: ".../Documents/5.mp3", action: "skip" },
  { url: ".../Documents/5.mp3", action: "skip" },
  { url: ".../Documents/2.mp3", action: "like" },
  { url: ".../Documents/2.mp3", action: "like" }
];


async function test() {
  let playlist = [];
  // playlist = await(createPlaylist(fakeMusicList, PLAYLIST_SIZE));

  playlist = await getPrunedPlaylistFromStorage();
  playlist = await complementPlaylist(fakeMusicList, playlist);
  // playlist = await appendMorePlaylist(fakeMusicList, playlist);
  
  console.log("\n🎧 Playlist");
  console.log(playlist);
}
test();