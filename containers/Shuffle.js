const PLAYLIST_SIZE = 20;

const SKIP_WEIGHT_MODIFIER = 0.85;
const BOOST_WEIGHT_MODIFIER = 0.2;

const fakeuserActionList = [
    { url: "../assets/songs/1.mp3", action: "like" },
    { url: "../assets/songs/5.mp3", action: "skip" },
    { url: "../assets/songs/5.mp3", action: "skip" },
    { url: "../assets/songs/5.mp3", action: "skip" },
    { url: "../assets/songs/5.mp3", action: "skip" },
    { url: "../assets/songs/2.mp3", action: "like" },
    { url: "../assets/songs/2.mp3", action: "like" }
];

const fakeLoadedPlaylist = [{
        url: "../assets/songs/1.mp3",
        duration: 72,
        title: "1",
        artist: "AKMU",
        artwork: "../assets/artwork/1.jpg",
        weight: 1.2,
        isPlayed: "true",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/2.mp3",
        duration: 52,
        title: "2",
        artist: "Lauv",
        artwork: "../assets/artwork/2.jpg",
        weight: 1.4,
        isPlayed: "true",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/3.mp3",
        duration: 61,
        title: "3",
        artist: "Lauv",
        artwork: "../assets/artwork/3.jpg",
        weight: 1,
        isPlayed: "true",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/2.mp3",
        duration: 52,
        title: "2",
        artist: "Lauv",
        artwork: "../assets/artwork/2.jpg",
        weight: 1.4,
        isPlayed: "true",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/1.mp3",
        duration: 72,
        title: "1",
        artist: "AKMU",
        artwork: "../assets/artwork/1.jpg",
        weight: 1.2,
        isPlayed: "true",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/4.mp3",
        duration: 60,
        title: "4",
        artist: "Ed Sheeran",
        artwork: "../assets/artwork/4.jpg",
        weight: 1,
        isPlayed: "true",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/2.mp3",
        duration: 52,
        title: "2",
        artist: "Lauv",
        artwork: "../assets/artwork/2.jpg",
        weight: 1.4,
        isPlayed: "true",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/1.mp3",
        duration: 72,
        title: "1",
        artist: "AKMU",
        artwork: "../assets/artwork/1.jpg",
        weight: 1.2,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/2.mp3",
        duration: 52,
        title: "2",
        artist: "Lauv",
        artwork: "../assets/artwork/2.jpg",
        weight: 1.4,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/1.mp3",
        duration: 72,
        title: "1",
        artist: "AKMU",
        artwork: "../assets/artwork/1.jpg",
        weight: 1.2,
        isPlayed: "false",
        isTrigger: "true"
    },
    {
        url: "../assets/songs/3.mp3",
        duration: 61,
        title: "3",
        artist: "Lauv",
        artwork: "../assets/artwork/3.jpg",
        weight: 1,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/5.mp3",
        duration: 44,
        title: "5",
        artist: "Goldberg",
        artwork: "../assets/artwork/5.jpg",
        weight: 0.5220062499999999,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/2.mp3",
        duration: 52,
        title: "2",
        artist: "Lauv",
        artwork: "../assets/artwork/2.jpg",
        weight: 1.4,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/4.mp3",
        duration: 60,
        title: "4",
        artist: "Ed Sheeran",
        artwork: "../assets/artwork/4.jpg",
        weight: 1,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/1.mp3",
        duration: 72,
        title: "1",
        artist: "AKMU",
        artwork: "../assets/artwork/1.jpg",
        weight: 1.2,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/3.mp3",
        duration: 61,
        title: "3",
        artist: "Lauv",
        artwork: "../assets/artwork/3.jpg",
        weight: 1,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/1.mp3",
        duration: 72,
        title: "1",
        artist: "AKMU",
        artwork: "../assets/artwork/1.jpg",
        weight: 1.2,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/4.mp3",
        duration: 60,
        title: "4",
        artist: "Ed Sheeran",
        artwork: "../assets/artwork/4.jpg",
        weight: 1,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/2.mp3",
        duration: 52,
        title: "2",
        artist: "Lauv",
        artwork: "../assets/artwork/2.jpg",
        weight: 1.4,
        isPlayed: "false",
        isTrigger: "false"
    },
    {
        url: "../assets/songs/3.mp3",
        duration: 61,
        title: "3",
        artist: "Lauv",
        artwork: "../assets/artwork/3.jpg",
        weight: 1,
        isPlayed: "false",
        isTrigger: "true"
    }
];

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
            playlist.push({...musicList[index - 1] });
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

export { getPrunedPlaylistFromStorage, createPlaylist, complementPlaylist, appendMorePlaylist };
//createplaylist: 20개 완전랜덤으로 만든다.
//complementPlaylist: 고른 1 개를 처음으로 하여 20개를 만든다.
//appendMorePlaylist: 10개씩 리스트 뒤에 추가해준다(현재 20개이기 떄문에 수정해야함.)