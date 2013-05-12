var express = require("express"),
    app = express(),
    RssGenerator = require("./lib/rss_generator").RssGenerator;

app.use(express.logger());

app.get('/', function(req, res) {
  var rss = new RssGenerator();

  rss.feeds(function(feeds){
    res.charset = 'UTF-8';
    res.header('Content-Type', 'text/xml');
    res.header('Last-Modified', new Date().toString());
    res.header('Cache-Control', 'no-cache');
    res.send(feeds);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
