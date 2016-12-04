//grab data from keys.js and assign to twitterKeysFile
var twitterKeysFile = require("./keys.js");
twitterKeysFile = twitterKeysFile.twitterKeys;
// first argument will run the functions
// second argument will be the song or movie to pass in the function
var action = process.argv[2];
var songOrMovie = process.argv[3];
var fs = require("fs");

function LIRICommand() {
    // switch-case statement to call functions
    switch (action) {
        case "my-tweets":
            twitterAPI();
            break;
        case "spotify-this-song":
            spotifyAPI();
            break;
        case "movie-this":
            omdbAPI();
            break;
        case "do-what-it-says":
            textFile();
            break;
    }
}

function twitterAPI() {
    var twitter = require('twitter');
    //consume twitterKeysFile to build the arguments for the twitter get function
    var client = new twitter({
        consumer_key: twitterKeysFile.consumer_key,
        consumer_secret: twitterKeysFile.consumer_secret,
        access_token_key: twitterKeysFile.access_token_key,
        access_token_secret: twitterKeysFile.access_token_secret
    });
    var params = {
        screen_name: 'omarhadary'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //loop through
            for (i = 0; i < tweets.length; i++) {
                var theStuff = "Tweet " + [i + 1] + ": " + tweets[i].text + " ... Created on: " + tweets[i].created_at;
                console.log(theStuff);
                fs.appendFile("log.txt", theStuff + "\n", function(err) {
                    if (err) {
                        console.log("Error: " + err);
                    }
                });
            };
        }
    });
}

function spotifyAPI() {
    var spotify = require('spotify');
    spotify.search({
        type: 'track',
        query: songOrMovie
    }, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
            //if no song is provided
        } else if (songOrMovie == null) {
            songOrMovie = "the sign ace of base";
            spotifyAPI();
            return;
        }
        //if song is provided
        var theStuff = JSON.stringify("Artist(s): " + data.tracks.items[0].artists[0].name) + ".\nThe song\'s name: " + data.tracks.items[0].name + ".\nA preview link of the song from Spotify: " + data.tracks.items[0].preview_url + "\nThe album that the song is from: " + data.tracks.items[0].album.name + ".";
        console.log(theStuff);
        fs.appendFile("log.txt", "\n----------Spotify Data----------\n" + theStuff, function(err) {
            if (err) {
                console.log("Error: " + err);
            }
        });
    });
};

function omdbAPI() {
    var request = require("request");
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + songOrMovie + "&y=&plot=short&r=json&tomatoes=true";
    request(queryUrl, function(error, response, body) {
        if (error) {
            return console.log("Error occurred: " + error);
        } else if (songOrMovie == null) {
            songOrMovie = "Mr. Nobody";
            omdbAPI();
            return;
        }
        var theStuff = "Movie Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry of Production: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\nRotten Tomatoes URL: " + JSON.parse(body).tomatoURL;
        console.log(theStuff);
        fs.appendFile("log.txt", "\n----------Movie Data----------\n" + theStuff, function(err) {
            if (err) {
                console.log("Error: " + err);
            }
        });
    });
};

function textFile() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        // split text file content by comma
        var textFileArr = data.split(",");
        // assign the text file 0 index to action and 1 index to songOrMovie
        action = textFileArr[0];
        songOrMovie = textFileArr[1];
        //run the main LIRI function to call the corresponding command
        LIRICommand();
    });
};
LIRICommand();