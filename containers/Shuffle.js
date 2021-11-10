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

const fakeUserActivity = [
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
]

const getMusicList = async () => {
	try {
		const musicListJsonString = await AsyncStorage.getItem('musicList');
		return musicList = await JSON.parse(musicListJsonString);
	} catch (err) {
		console.log(err);
	}
};

const getUserActivity = async () => {
	try {
		const userActivityJsonString = await AsyncStorage.getItem('userActivity');
		return userActivity = await JSON.parse(userActivityJsonString);
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
}

// const musicList = getMusicList();
// const userActivity = getUserActivity();

fakeUserActivity.forEach(element => {
	let target = fakeMusicList.find(music => music.title === element.title);

	if (element.action === "skip") {
		target = updateWeight_skipped(target);
	} else {
		target = updateWeight_liked(target);
	}
});

console.log(fakeUserActivity);
console.log(fakeMusicList);