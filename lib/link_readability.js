var readability = require('readability'),
    _ = require('underscore'),
    // https://github.com/mranney/node_redis
    redis = require("redis"),
    client = redis.createClient();


function ReadableLinks(){
}

/**
 * attach readable text and html to links
 */
ReadableLinks.attach(links, function(callback){
});


exports.ReadableLinks = ReadableLinks;

