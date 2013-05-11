var RSS = require("rss"),
    LinkReadability = require("../lib/link_readability").ReadableLinks,
    PageParser = require("../lib/page_parser").PageParser;

function RssGenerator(){}

RssGenerator.prototype.links = function(callback){

  var page_parser = new PageParser();
  page_parser.getLinks(function(links){
    LinkReadability.parse(links, function(resultLinks){
      callback(resultLinks);
    });
  });
}


RssGenerator.prototype.feeds = function(callback){
  var link,
      i,
      feed = new RSS({
        title: 'Hacker News Front Page',
        description: 'Hacker news front page',
        feed_url: 'http://example.com/rss.xml',
        site_url: 'http://example.com',
        image_url: 'http://example.com/icon.png',
        author: 'hacker news'
      });

  this.links(function(resultLinks){

    for (i=0; i < resultLinks.length; i++) {
      link = resultLinks[i];

      feed.item({
        title:  link.title,
        description: link.html,
        url: link.url,
        author: link.author,
        date: link.updated_at
      });
    };

    callback(feed.xml());

  });

}

exports.RssGenerator = RssGenerator;
