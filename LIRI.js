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
name = "";

function omdb() {
    if (!process.argv[3]) {
        input = "Mr. Nobody";
    }
    for (var i = 0; i < input.length; i++) {
        if (input[i] === " ") {
            movieName += "+"
        }
        else {
            movieName += inƒput[i];
        }

    }


    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

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

if (command === "movie-this") {
    omdb();
}
else if (command === "spotify-this-song") {
    spot();
}
else if (command === "my-tweets") {
    twit();
}
else if (command === "do-what-it-says") {
    doWhatItSays();
}

else if (command === "read-song") {
    readSongs();
}

else {
    console.log("please enter a valid input!")
}

function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var txt = data.split(",");
        command = txt[0];
        //console.log(command);
        songName = txt[1];
        //console.log(songName);
        
        for (var i = 0; i < songName.length; i++) {
            if (songName[i] === " ") {
                name += "+"
            }
            else {
                 name += songName[i];
            }
        }
    
        spotify.search({ type: 'track', query: name }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
    
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url? data.tracks.items[0].preview_url: "No url available");
            console.log(data.tracks.items[0].album.name? data.tracks.items[0].album.name: "No album name available");
    
        });
    });
}

function readSongs() {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songs = data.split(",");
        for (var i = 0; i < songs.length; i++) {
            if (i % 2 === 0) {
                console.log("Artist: " + songs[i] + " | " + "Title: " + songs[i+1])
            }
        }
    })
}

function spot() {
    input = !process.argv[3]? "The Sign Ace of Base": process.argv[3];
  
    for (var i = 0; i < input.length; i++) {
        if (input[i] === " ") {
            songName += "+"
        }
        else {
            songName += input[i];
        }
    }

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].artists[0].name;
        var song = data.tracks.items[0].name
        fs.appendFile("./random.txt", ", " + artist + ", " + '"' + song + '"', function (error, data) {
            //console.log(data);
        });

        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url? data.tracks.items[0].preview_url: "No url available");
        console.log(data.tracks.items[0].album.name);

    });

};

function twit() {
    var params = { screen_name: 'ToniHawk24', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text + "\n");
            }
        }
        else if (err) {
            return console.log('Error occurred: ' + err);
        }

    });
}
