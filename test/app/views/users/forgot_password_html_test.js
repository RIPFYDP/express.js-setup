var app       = require('../../../../app'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    faker     = require('faker'),
    User      = require('../../../../app/models/user'),
    expect    = chai.expect,
    server,
    nightmare;

describe('/forgot_password', function() {
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
    nightmare.goto('http://localhost:3001/forgot_password')
    .evaluate(
      function() {
        return document.querySelector('title').innerText.trim();
      },
      function(text) {
        expect(text).to.equal('Forgot password');
      }
    )
    .run(done);
  });
});
