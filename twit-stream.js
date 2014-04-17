// Tweets = new Meteor.Collection('tweet');
// TweetStream = new Meteor.Stream('tweets');

// if (Meteor.isClient) {
//     TweetStream.on('twit', function(twit) {
//         console.log(arguments);
//     });

//     TweetStream.on('stream', function(stream) {
//         console.log(arguments);
//     });

//     TweetStream.on('tweet', function(tweet) {
//         console.log(arguments);
//         tweet.created_at = moment(tweet.created_at).toDate();
//         Tweets.insert(tweet);
//     });

//     Template.tweets.tweets = function() {
//         return Tweets.find({}, {
//             sort: {
//                 'created_at': -1
//             }
//         });
//     };

//     Template.tweets.isPhoto = function() {
//         return 'photo' === this.type;
//     };
// }

// if (Meteor.isServer) {
//     TweetStream.permissions.read(function(userId, eventName) {
//         return true;
//     });

//     TweetStream.permissions.write(function(userId, eventName) {
//         return true;
//     });

//     Twitter = Meteor.require('twitter');
//     conf = JSON.parse(Assets.getText('twitter.json'));
//     twit = new Twitter({
//         consumer_key: conf.consumer.key,
//         consumer_secret: conf.consumer.secret,
//         access_token: conf.access_token.key,
//         access_token_secret: conf.access_token.secret
//     });

//     twit.stream('statuses/sample', function(stream) {
//         stream.on('data', function(data) {
//             //console.log(util.inspect(data));
//             TweetStream.emit('tweet', data);
//         });
//     });

//     setTimeout(function(){TweetStream.emit('twit', twit)}, 3000);
// }
