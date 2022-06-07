const fs = require('fs');

let data = JSON.parse(fs.readFileSync('./data.json').toString());

data = data.map((element) => {
  return {
    wordLength: element.tweet.length,
    likes: element.nlikes
  }
});

data.sort((a, b) => a.wordLength - b.wordLength);

let lengths = data.map(tweet => tweet.wordLength);
let lengthRatio = lengths[lengths.length - 1] / 100;
lengths = lengths.map(length => Math.round(length / lengthRatio))
fs.writeFileSync('src/lengths.json', JSON.stringify(lengths));

let likes = data.map(tweet => tweet.likes);
let likeRatio = Math.max(...likes) / 100;
likes = likes.map(like => Math.round(like / likeRatio))
fs.writeFileSync('src/likes.json', JSON.stringify(likes));
