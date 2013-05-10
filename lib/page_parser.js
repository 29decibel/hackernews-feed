var request = require('request'),
    cheerio = require('cheerio'),
    hacker_news_url = "https://news.ycombinator.com/";


/**
 * PageParser parse the first page of hacker news
 */
function PageParser(){
}

/**
 * getLinks of the first page
 */
PageParser.prototype.getLinks = function(callback){
  // make a request to get the body of hackernews page
  request(hacker_news_url, function (error, response, body) {
    var $, links, link;

    if (!error && response.statusCode == 200) {
      // get the body
      $ = cheerio.load(body);

      // query the links
      links = $('td.title a').filter(function(i, el) {
        return el.attribs.href != 'news2';
      }).map(function(i, el){
        return { title:el.children[0] ? el.children[0].data : "", url:el.attribs.href};
      });

      // trigger callback
      callback(links);
    }
  })
}


// exports
exports.PageParser = PageParser;
