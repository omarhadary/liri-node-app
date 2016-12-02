//grab data from keys.js and assign to twitterKeys
var twitterKeysFile = require("./keys.js");
twitterKeysFile = twitterKeysFile.twitterKeys;
// first argument will run the functions
// second argument will be the song or movie to pass in the function
var action = process.argv[2];
var value = process.argv[3];

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


    var client = new twitter({
        consumer_key: twitterKeysFile.consumer_key,
        consumer_secret: twitterKeysFile.consumer_secret,
        access_token_key: twitterKeysFile.access_token_key,
        access_token_secret: twitterKeysFile.access_token_secret
    });

    var params = {screen_name: 'omarhadary'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });

}

function spotifyAPI() {

}

function omdbAPI() {

}

function textFile() {

}