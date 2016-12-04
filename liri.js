//grab data from keys.js and assign to twitterKeysFile
var twitterKeysFile = require("./keys.js");
twitterKeysFile = twitterKeysFile.twitterKeys;
// first argument will run the functions
// second argument will be the song or movie to pass in the function
var action = process.argv[2];
var songOrMovie = process.argv[3];
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
                console.log("Tweet " + [i + 1] + ": " + tweets[i].text + " ... Created on: " + tweets[i].created_at)
            };
        }
    });
}

function spotifyAPI() {
    var spotify = require('spotify');
    spotify.search({ type: 'track', query: songOrMovie }, function(err, data) {
        if ( err ) {
           return console.log('Error occurred: ' + err);
            //if no song is provided
        } else if (songOrMovie == null) {
            songOrMovie = "the sign ace of base";
            spotifyAPI();
            return;
        }
        //if song is provided
        return console.log(JSON.stringify("Artist(s): "+data.tracks.items[0].artists[0].name)+".\nThe song's name: "+data.tracks.items[0].name+".\nA preview link of the song from Spotify: "+data.tracks.items[0].preview_url+"\nThe album that the song is from: "+data.tracks.items[0].album.name+".");
    });
};

function omdbAPI() {};

function textFile() {};