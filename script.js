const fs = require('fs');

let data = JSON.parse(fs.readFileSync('./data.json').toString());

// data = data.filter((element) => element.tweet.length != null)

// data = data.map((element) => {
//   return {
//     wordLength: element.tweet.length,
//     likes: element.nlikes
//   }
// });

// data.sort((a, b) => {
//   if (a.wordLength > b.wordLength) {
//     return 1;
//   }
//   if (a.wordLength < b.wordLength) {
//     return -1;
//   }
//   return 0;
// });;

// let lengths = data.map(tweet => tweet.wordLength);
// // let lengthRatio = lengths[lengths.length - 1] / 100;
// // lengths = lengths.map(length => Math.round(length / lengthRatio))
// fs.writeFileSync('src/lengths.json', JSON.stringify(lengths));

// let likes = data.map(tweet => tweet.likes);
// // let likeRatio = Math.max(...likes) / 100;
// // likes = likes.map(like => Math.round(like / likeRatio))
// fs.writeFileSync('src/likes.json', JSON.stringify(likes));

data = data.map((element) => {
  return {
    tweet: String(element.tweet),
    likes: Number(element.nlikes),
  }
});

/*
{
  word: "THE",
  likes: 1200000,
  count: 400,
}
*/
let histogram = {};

data.forEach((element) => {
  const likes = element.likes;
  let tweet = element.tweet;

  tweet = tweet.replace(/@[A-Za-z0-9]+/g, "");
  tweet = tweet.replace(/#[A-Za-z0-9]+/g, "");
  tweet = tweet.replace(/http\S+/g, "");
  tweet = tweet.replace(/www.\S+/g, "");
  tweet = tweet.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");

  tweet.split(' ').forEach((word) => {
    word = word.toLowerCase();
    let histogramElement = histogram[word];
    if (!histogramElement) {
      histogramElement = {
        likes: 0,
        count: 1,
      };
    }
    histogramElement.likes += likes;
    histogramElement.count++;
    histogram[word] = histogramElement;
  })
})

histogram = Object.keys(histogram).map((word) => {
  const element = histogram[word];
  return {
    word: word,
    avgLikes: element.likes / element.count
  };
})

histogram.sort((a, b) => {
  if (a.avgLikes < b.avgLikes) {
    return 1;
  }
  if (a.avgLikes > b.avgLikes) {
    return -1;
  }
  return 0;
});

histogram = histogram.slice(0, 12);

// const avgLikes = [];
// const words = [];

// histogram.forEach((element) => {
//   words.push(element.word);
//   avgLikes.push(element.avgLikes);
// })


fs.writeFileSync('src/components/Q2/wordLikes.json', JSON.stringify(histogram));
