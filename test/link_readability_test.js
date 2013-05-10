var ReadableLinks = require("../lib/link_readability").ReadableLinks,
    assert = require("assert");


describe("ReadableLinks", function(){
  var links = [
    { title:'nice', url:"http://lwn.net/SubscriberLink/549580/82983789866b5fad/"}
  ];

  it("#attach readable article text/html", function(done){

    ReadableLinks.parse(links, function(resultLinks){

      assert.notEqual(null, resultLinks[0].text);
      assert.notEqual(null, resultLinks[0].html);
      done();
    });

  });
});
