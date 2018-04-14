require("dotenv").config();

var request = require("request");
var fs = require("fs")
var Spotify = require("node-spotify-api");
var Twitter = require('twitter');


//Add the code required to import the keys.js file and store it in a variable.

var keys = require("./keys.js");
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

//var doWhat = require("./random.txt");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];
movieName = "";
songName = "";

function omdb () {
    console.log(input)
//    if (!process.argv[3]){
//        process.argv[3] = "Mr. Nobody";
//        var input = process.argv[3];
//        }
        for (var i = 0; i < input.length; i++) {
            if (input[i] === " ") {
                movieName += "+"
            }
            else {
                movieName += input[i];
            }

    }
    

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's rotten tomato rating is: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }

});
}

if (command==="movie-this"){
    omdb();
}
else if (command==="spotify-this-song"){
    spot();
}
else if (command==="my-tweets"){
    twit();
}
else if (command==="do-what-it-says"){
    doWhatItSays();
}

else {
    console.log("please enter a valid input!")
}

function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function(error, data){
        var txt = data.split(',');
        command = txt[0];
        console.log(command);
        songName = txt[1];
        console.log(songName);
        spot();
})
}

function spot() {
    console.log(input)
  //  if (!input){
  //      process.argv[3] = "The Sign Ace of Base";
  //      var input = process.argv[3];
  //  }
    // if (!input && command==="do-what-it-says"){
    //     doWhatItSays();
    // }
        for (var i = 0; i < input.length; i++) {
            if (input[i] === " ") {
                songName += "+"
            }
            else{
            songName += input[i];
            }
    }
    

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
      console.log(data.tracks.items[0].artists[0].name); 
      console.log(data.tracks.items[0].name); 
      console.log(data.tracks.items[0].preview_url); 
      console.log(data.tracks.items[0].album.name);
      
    });
}

function twit() {
var params = {screen_name: 'ToniHawk24', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i=0; i<20; i++) {
    console.log(tweets[i].text + "\n");
    }
  }
  else if (err) {
    return console.log('Error occurred: ' + err);
  }

});
}





