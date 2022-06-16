const fs = require('fs');
const checkWord = require('check-if-word');
const words = checkWord('en');

let data = JSON.parse(fs.readFileSync('./data.json').toString());

const q1 = () => {
  data = data.filter((element) => element.tweet.length != null)
  
  data = data.map((element) => {
    return {
      wordLength: element.tweet.length,
      likes: element.nlikes
    }
  });
  
  data.sort((a, b) => {
    if (a.wordLength > b.wordLength) {
      return 1;
    }
    if (a.wordLength < b.wordLength) {
      return -1;
    }
    return 0;
  });;
  
  let lengths = data.map(tweet => tweet.wordLength);
  // let lengthRatio = lengths[lengths.length - 1] / 100;
  // lengths = lengths.map(length => Math.round(length / lengthRatio))
  fs.writeFileSync('src/components/Q1/lengths.json', JSON.stringify(lengths));
  
  let likes = data.map(tweet => tweet.likes);
  // let likeRatio = Math.max(...likes) / 100;
  // likes = likes.map(like => Math.round(like / likeRatio))
  fs.writeFileSync('src/components/Q1/likes.json', JSON.stringify(likes));
}

const q2 = () => {
  data = data.map((element) => {
    return {
      tweet: String(element.tweet),
      likes: Number(element.nlikes),
    }
  });
  
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
      if (words.check(word)) {
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
      }
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
  
  histogram = histogram.slice(0, 20);
  
  // const avgLikes = [];
  // const words = [];
  
  // histogram.forEach((element) => {
  //   words.push(element.word);
  //   avgLikes.push(element.avgLikes);
  // })
  
  fs.writeFileSync('src/components/Q2/wordLikes.json', JSON.stringify(histogram));
}

const q3 = () => {
  data = data.map((element) => {
    return {
      tweet: String(element.tweet),
    }
  });
  
  let histogram = {};
  
  data.forEach((element) => {
    let tweet = element.tweet;
  
    tweet = tweet.replace(/@[A-Za-z0-9]+/g, "");
    tweet = tweet.replace(/#[A-Za-z0-9]+/g, "");
    tweet = tweet.replace(/http\S+/g, "");
    tweet = tweet.replace(/www.\S+/g, "");
    tweet = tweet.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  
    tweet.split(' ').forEach((word) => {
      if (words.check(word)) {
        word = word.toLowerCase();
        let histogramElement = histogram[word];
  
        if (!histogramElement) {
          histogramElement = {
            count: 1,
          };
        }
  
        histogramElement.count++;
        histogram[word] = histogramElement;
      }
    })
  })
  
  histogram = Object.keys(histogram).map((word) => {
    const element = histogram[word];
    return {
      word: word,
      count: element.count
    };
  })
  
  histogram.sort((a, b) => {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count > b.count) {
      return -1;
    }
    return 0;
  });
  
  histogram = histogram.slice(1, 21);
  
  fs.writeFileSync('src/components/Q3/wordCounts.json', JSON.stringify(histogram));
}

const q4 = () => {
  data = data.map((element) => {
    return {
      tweet: String(element.tweet),
    }
  });
  
  let histogram = {};
  
  data.forEach((element) => {
    let tweet = element.tweet.toLowerCase();
    if (tweet.includes("tesla is")) {
      tweet = tweet.replace(/@[A-Za-z0-9]+/g, "");
      tweet = tweet.replace(/#[A-Za-z0-9]+/g, "");
      tweet = tweet.replace(/http\S+/g, "");
      tweet = tweet.replace(/www.\S+/g, "");
      tweet = tweet.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    
      
      tweet.split(' ').forEach((word) => {
        if (words.check(word)) {
          let histogramElement = histogram[word];
    
          if (!histogramElement) {
            histogramElement = {
              count: 1,
            };
          }
    
          histogramElement.count++;
          histogram[word] = histogramElement;
        }
      })
    }
  })
  
  histogram = Object.keys(histogram).map((word) => {
    const element = histogram[word];
    return {
      word: word,
      count: element.count
    };
  })
  
  histogram.sort((a, b) => {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count > b.count) {
      return -1;
    }
    return 0;
  });
  
  histogram = histogram.slice(2, 23);
  
  fs.writeFileSync('src/components/Q4/wordCounts.json', JSON.stringify(histogram));
}

q2();
q3();
q4();
