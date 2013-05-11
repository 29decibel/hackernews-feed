var Readability = require("readabilitySAX").Readability,
    _           = require('underscore'),
    async       = require("async"),
    Parser = require("htmlparser2/lib/Parser.js"),
    request = require('request');

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
} else {
  var redis = require("redis").createClient();
}


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
        link.title = readable.getTitle();

        resultLinks.push(link);
      }

      // trigger finish
      finish();
    });

  },function(err, results){
    // all urls is finished parse
    callback(resultLinks);
  });

};


exports.ReadableLinks = ReadableLinks;

