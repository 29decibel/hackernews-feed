## Hacker news RSS feed
* a url parser to parse the urls of main page
* using node-readability to parse the url
* using redis to cache the parsed article
* a RSS generator to generate the rss from the previous result
* heroku friendly

## What it would look like in Feedly
![ScreenShot](http://29decibel.github.com/hackernews-feed/images/hackernews-feed.png)

## Here is the result
[HN RSS](http://hackernews-rss.herokuapp.com)

## Deploy to heroku
```bash
$ git clone git://github.com/29decibel/hackernews-feed.git

$ cd hackernews-feed

$ heroku create

# add redis support
$ heroku addons:add redistogo

$ git push heroku master

# go enjoy your hacker news feed
$ heroku open

```

## Thanks
* https://github.com/fb55/readabilitySAX
