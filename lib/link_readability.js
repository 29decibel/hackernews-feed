var Readability = require("readabilitySAX").Readability,
    _           = require('underscore'),
    // https://github.com/mranney/node_redis
    redis       = require("redis"),
    client      = redis.createClient(),
    async       = require("async"),
    Parser = require("htmlparser2/lib/Parser.js"),
    request = require('request');


function ReadableLinks(){
}

/**
 * attach readable text and html to links
 */
ReadableLinks.parse = function(links, callback){
  var resultLinks = [];

  async.map(links, function(link, finish){
    // parse link and get the readability content
    var readable = new Readability({pageURL: link.url}),
        parser = new Parser(readable);

    // make a request to the url
    request(link.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parser.parseComplete(body)
        link.text = readable.getText();
        link.html = readable.getHTML();
        resultLinks.push(link);

        // trigger finish
        finish();
      }
    });

  },function(err, results){
    // all urls is finished parse
    callback(resultLinks);
  });

};


exports.ReadableLinks = ReadableLinks;

