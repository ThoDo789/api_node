const { datatype, fake } = require("faker");
const faker = require("faker");
const fs = require("fs");
// set locale to ise vietnamese
fake.locale = "vi";

// console.log(faker.datatype.datetime());
// console.log(faker.image.imageUrl());
// console.log(faker.image.avatar());
// console.log(faker.commerce.productDescription());
const getYear = () => {
  const year = faker.date.past();
  const strYear = JSON.stringify(year);
  strYear.slice(0, 4);
  const date = new Date(+year);
  return date.getFullYear();
};



const randomSongList = n => {
  if (n <= 0) return [];

  const songList = [];
  var i=0;
  Array.from(new Array(n)).forEach(() => {
    
 i++;
    
    const song = {
      id: faker.datatype.uuid(),
      nameSong: faker.commerce.productName(),
      author: faker.name.findName(),
      artist: faker.name.findName(),
      imageSong: i,
      liked: false,
      category: faker.music.genre(),
      music:i,
      desc: faker.commerce.productDescription(),
      playlist: false,
      years: getYear(),
     
    };
    songList.push(song);
  });

  return songList;
};

// IIFE
(() => {
  // random
  const songList = randomSongList(10);

  // prepare db object

  const db = {
    songs: songList,
    profile: {
      name: "thodo"
    }
  };
  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("generate data successfully");
  });
})();
