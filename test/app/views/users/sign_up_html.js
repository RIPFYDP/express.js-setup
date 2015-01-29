var app       = require('../../../../app'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    expect    = chai.expect,
    server,
    nightmare;

describe('/sign_up', function() {
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

  it('title', function(done) {
    nightmare.goto('http://localhost:3001/sign_up')
    .evaluate(function() {
      return document.querySelector('title').innerText;
    }, function(text) {
      expect(text).to.equal('Sign up');
    })
    .run(done);
  });

})
