var PageParser = require("../lib/page_parser").PageParser,
    assert = require("assert");

describe('PageParser', function(){
  var parser  = new PageParser();

  describe('#getLinks', function(){

    it("should return the links ", function(done){
      parser.getLinks(function(links){
        assert.equal(30, links.length);
        done();
      });
    });

    it("should contains title and url property", function(done){
      parser.getLinks(function(links){
        var link = links[0];
        done();
      });
    });

  });


});
