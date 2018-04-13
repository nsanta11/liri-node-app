require("dotenv").config();

var request = require("request");


//Add the code required to import the keys.js file and store it in a variable.
var test = require("./LIRI.js").test;

//var spotify = new Spotify(LIRI.2spotify);
//var client = new Twitter(LIRI.twitter);

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`


var command = process.argv[2];
var input = process.argv[3];
movieName = "";

// Create an empty variable for holding the movie name



// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
function ombd () {
    console.log("working!")
    for (var i = 3; i < input.length; i++) {

    if (i > 3 && i < input.length) {

        input = movieName + "+" + input[i];

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
    console.log("Release Year: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }

});


if (command==="movie-this"){
    omdb();
}
else if (command==="spotify-this-song"){
    spotify();
}
else if (command==="my-tweets"){
    twitter();
}
else if (command==="do-what-it-says"){
    console.log("whatever");
}
else {
    console.log("please enter a valid input!")
}


}




