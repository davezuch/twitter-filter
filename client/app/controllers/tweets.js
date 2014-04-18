if (Meteor.isClient) {
    filter = new RegExp('code|html|js|javascript|ecma|css|compass|sass|node|npm|grunt|meteor|angular|dev|front.{0,1}end|browser|chrome|firefox|mozilla|google|apple|sdk|ios|android|responsive|spa', 'i');

    filterTweet = function(tweet) {
        var str = tweet.text;
        _.each(tweet.entities.url, function(url) {
            str += url.display_url;
        });

        if (str.match(filter)) {
            Tweets.insert(tweet);
        }
    }

    twitStream = new Meteor.Stream('tweets');

    twitStream.emit('connect');

    twitStream.on('initial', function(err, tweets) {
        console.log('tweets: ', err, tweets);
        //window.tweets = tweets;
        //Tweets.insert(tweets);
        _.each(tweets, filterTweet);
    })

    twitStream.on('tweet', function(tweet) {
        console.log('tweet: ', tweet);
        tweet.created_at = moment(tweet.created_at).toDate();
        filterTweet(tweet);
    });

    Template.tweets.tweets = function() {
        return Tweets.find({}, {
            sort: {
                'created_at': -1
            }
        });
    };

    Template.tweets.isPhoto = function() {
        return 'photo' === this.type;
    };
}
