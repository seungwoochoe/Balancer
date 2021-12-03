const PLAYLIST_SIZE = 4;

const SKIP_WEIGHT_MODIFIER = 0.85;
const BOOST_WEIGHT_MODIFIER = 0.2;


function complementPlaylist(musicList, currentPlaylist, userActionList) {
  let playlistToBeAdded = createPlaylist(musicList, PLAYLIST_SIZE - currentPlaylist.length, userActionList);
  while (currentPlaylist[currentPlaylist.length - 1].title === playlistToBeAdded[0].title) {
    playlistToBeAdded = createPlaylist(musicList, PLAYLIST_SIZE - currentPlaylist.length, userActionList);
  }
  const playlist = [...currentPlaylist, ...playlistToBeAdded];
  return markIsTrigger(playlist);
}

function appendMorePlaylist(musicList, currentPlaylist) {
  let playlistToBeAdded = createPlaylist(musicList, PLAYLIST_SIZE / 2);
  while (currentPlaylist[currentPlaylist.length - 1].title === playlistToBeAdded[0].title) {
    playlistToBeAdded = createPlaylist(musicList, PLAYLIST_SIZE / 2);
  }
  const playlist = [...currentPlaylist, ...playlistToBeAdded];
  return markIsTrigger(playlist);
}

// If there is no or only one music in storage, "createPlaylist" function should not be called.
function createPlaylist(musicList, playlistSize, userActionList) {
  const weightedMusicList = calculateWeight(musicList, userActionList);
  let playlist = drawMusic(weightedMusicList, playlistSize);
  playlist = markIsPlayedToFalse(playlist);
  playlist = assignID(playlist);
  return markIsTrigger(playlist);
}

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
    let targetMusic = musicList.find(music => music.uri === userAction.uri);

    if (targetMusic != null) {
      if (userAction.action === "skip") {
        targetMusic.weight = targetMusic.weight * SKIP_WEIGHT_MODIFIER;
      } else {
        targetMusic.weight = targetMusic.weight + BOOST_WEIGHT_MODIFIER;
      }  
    }
  });
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
    music.isPlayed = false;
  });
  return playlist;
}

// Marks music with "isTrigger", which is used for triggering appending new playlist to the current playlist.
function markIsTrigger(playlist) {
  let count = 0;
  playlist.forEach((music) => {
    count++;
    if (count % (PLAYLIST_SIZE / 2) === 0) {
      music.isTrigger = true;
    } else {
      music.isTrigger = false;
    }
  });
  return playlist;
}

function assignID(playlist) {
  playlist.forEach((element) => {
    element.id = Math.random().toString();
  })
  return playlist;
}

export { createPlaylist, complementPlaylist, appendMorePlaylist };
