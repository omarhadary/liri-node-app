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
    var params = {
        screen_name: 'omarhadary'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet " + [i + 1] + ": " + tweets[i].text + " ... Created on: " + tweets[i].created_at)
            };
        }
    });
}

function spotifyAPI() {
    var spotify = require('spotify');

    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
        if ( err ) {
           return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data, null, 2));
    });
};

function omdbAPI() {};

function textFile() {};