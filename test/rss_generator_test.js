var assert = require("assert"),
    should = require("should"),
    LinkReadability = require("../lib/link_readability").ReadableLinks,
    PageParser = require("../lib/page_parser").PageParser;

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

  })
})
