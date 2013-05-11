## Hacker news RSS feed
* a url parser to parse the urls of main page
* using node-readability to parse the url
* using redis to cache the parsed article
* a RSS generator to generate the rss from the previous result
* heroku friendly

![ScreenShot](http://29decibel.github.com/hackernews-feed/images/hackernews-feed.png)

## Deploy to heroku
```bash
$ git clone git://github.com/29decibel/hackernews-feed.git

$ cd hackernews-feed

$ heroku create

$ git push heroku master

# add redis support
$ heroku addons:add redistogo

# go enjoy your hacker news feed
$ heroku open

```

