var app       = require('../../../../app'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    expect    = chai.expect,
    server,
    nightmare;

describe('/', function() {
  this.timeout(30000);

  before(function(done) {
    server = app.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  beforeEach(function() {
    nightmare = new Nightmare();
  });

  it('/', function(done) {
    nightmare.goto('http://localhost:3001')
      .evaluate(function() {
        return document.querySelector('title').innerText.trim();
      }, function(text) {
        expect(text).to.equal('Express MV*');
      })
      .run(done);
  });

});
