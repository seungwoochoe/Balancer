import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';


const MusicListRetriever = () => {
  let RNFS = require('react-native-fs');
  const documentDirectoryPath = RNFS.DocumentDirectoryPath;

  console.log(documentDirectoryPath);

  const [fileList, setFileList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    RNFS.readDir(RNFS.MainBundlePath)
    .then((result) => {
      setCount(count + 1);
      console.log(count);

      tempList = [];
      result.forEach((element) => {
        tempList.push(element.name);
        tempList.push("\n");
      })
      setFileList(tempList);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [fileList.length]);

  console.log(fileList);
  fileList.map((element) => {
    console.log(element);
  })
  return (
    <View>
      <Text>🗂: {documentDirectoryPath}{"\n\n🎶"}</Text>
      <Text>{fileList}</Text>
    </View>
  )
};

export default MusicListRetriever;

// MusicFiles.getAll({
//   blured: true, // works only when 'cover' is set to true
//   artist: true,
//   duration: true,
//   cover: true,
//   genre: true,
//   title: true,
//   cover: true,
//   minimumSongDuration: 10000,
//   fields: ['title','albumTitle','genre','lyrics','artwork','duration'] // for iOS Version
// }).then(tracks => {
//   musicFilesResult = tracks;
// }).catch(error => {
//   musicFilesResult = "Error occured :(";
// });


// Returning array format.

// [
//   {
//     id : 1,
//     title : "La danza del fuego",
//     author : "Mago de Oz",
//     album : "Finisterra",
//     genre : "Folk",
//     duration : 132132312321, // miliseconds
//     cover : "file:///sdcard/0/123.png",
//     blur : "file:///sdcard/0/123-blur.png", //Will come null if createBLur is set to false
//     path : "/sdcard/0/la-danza-del-fuego.mp3"
//   }
// ]