if (Meteor.isServer) {
    Meteor.startup(function() {
        // save tweets to DB in case rate limit is reached
        SavedTweets = new Meteor.Collection('tweets');
        // connect the twitter api
        var twitStream = new Meteor.Stream('tweets'),
            conf = JSON.parse(Assets.getText('twitter.json')),
            twit = new TwitMaker({
                consumer_key: conf.consumer.key,
                consumer_secret: conf.consumer.secret,
                access_token: conf.access_token.key,
                access_token_secret: conf.access_token.secret
            }),
            stream = twit.stream('user');

        stream.on('tweet', function(tweet) {
            twitStream.emit('tweet', tweet);
        });

        twitStream.on('connect', function() {
            twit.get('statuses/home_timeline', {'count': conf.count}, Meteor.bindEnvironment(function(err, tweets) {
                if (tweets) {
                    // cache tweets
                    SavedTweets.insert(tweets);
                } else {
                    // use cached tweets when rate limit is reached
                    tweets = SavedTweets.findOne();
                }
                twitStream.emit('initial', err, tweets);
            }));
        });
    });
}