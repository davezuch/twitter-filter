function link(title, url) {
    return title.link(url + '" target="_blank').replace(/\&quot\;/g, '"');
}

Handlebars.registerHelper('moments', function(date) {
    return moment(date).format('HH:mm:ss');
});

Handlebars.registerHelper('linkify', function(tweet) {
    return tweet.text
        .replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
            var tweetText = url;
            if (undefined !== tweet.entities.urls && tweet.entities.urls.length > 0) {
                var myUrl = _.find(tweet.entities.urls, function(urlObj) {
                    return urlObj.url === url;
                });
                if (undefined !== myUrl && null !== myUrl) {
                    tweetText = myUrl.display_url;
                }
            }
            return link(tweetText, url);
        })
        .replace(/[#]+[A-Za-z0-9-_]+/g, function(hash) {
            var text = hash.replace('#', '');
            return link(hash, 'http://twitter.com/search/%23' + text);
        })
        .replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
            var username = u.replace('@', '');
            return link(u, 'http://twitter.com/' + username);
        });
});

Handlebars.registerHelper('thumb', function(image) {
    var html = '<img src="{{media_url}}" {{style}}">',
        height = parseInt(image.sizes.medium.h),
        margin = height > 200 && (height - 200) / 2,
        style = margin ? 'style="margin-top: -' + margin + 'px;' : '';

    return html.replace('{{media_url}}', image.media_url).replace('{{style}}', style);
});