var Readability = require("readabilitySAX"),
    _           = require('underscore'),
    async       = require("async"),
    request = require('request'),
    util = require('util');


if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
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

    // parsed before
    redis.get(link.url, function(err, reply){
      if(reply){
        var cacheLink = JSON.parse(reply);

        resultLinks.push(cacheLink);

        finish();

      } else {

        // Let the Readability get the readable content
        Readability.get(link.url,'html', function(result){

          if(result.error) {
            console.log("ERROR" + result.text);
            return;
          }

          link.text = result.text;
          link.html = result.html;
          link.title = result.title;
          link.updated_at = new Date().toString();
          link.score = result.score;

          // cache the result
          redis.set(link.url, JSON.stringify(link));

          // push to result
          resultLinks.push(link);

          // trigger finish
          finish();
        });
      }
    });

  },function(err, results){
    // all urls is finished parse
    callback(resultLinks);
  });

};


exports.ReadableLinks = ReadableLinks;

