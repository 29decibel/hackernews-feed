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

    it("should get the readable content of https pages", function(done){
      // mock the links
      PageParser.prototype.getLinks = function(callback){
        var mockLinks = [{title: 'https test', url:"https://github.com/mikeal/request"}];
        // always run the callback in the next event loop
        setTimeout(callback(mockLinks), 0);
      }

      // doing test here
      var rssGenerator = new RssGenerator();
      rssGenerator.feeds(function(feeds){

        //feeds.indexOf("Super simple to use").should.above(0);
        done();
      });
    });

  })
})
