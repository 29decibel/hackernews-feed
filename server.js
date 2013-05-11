var express = require('express'),
    app = express(),
    RssGenerator = require("./lib/rss_generator").RssGenerator;

app.get('/', function(req, res){

  var rss = new RssGenerator();

  rss.feeds(function(feeds){
    res.charset = 'UTF-8';
    res.header('Content-Type', 'text/xml');
    res.send(feeds);
  });

});

app.listen(80);
