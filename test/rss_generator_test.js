var assert = require("assert"),
    should = require("should"),
    LinkReadability = require("../lib/link_readability").ReadableLinks,
    PageParser = require("../lib/page_parser").PageParser,
    RssGenerator = require("../lib/rss_generator").RssGenerator;

describe('RssGenerator', function(){
  describe('feeds', function(){

    it('should return the feeds ', function(done){
      var page_parser = new PageParser();
      page_parser.getLinks(function(links){
        LinkReadability.parse(links, function(resultLinks){
          resultLinks.length.should.above(20);
          done();
        });
      });
    });

    it("should return the rss feedds", function(done){
      var rssGenerator = new RssGenerator();
      rssGenerator.feeds(function(feeds){

        feeds.length.should.above(20);
        done();
      });
    });

  })
})
