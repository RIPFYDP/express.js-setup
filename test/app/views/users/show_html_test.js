var app       = require('../../../../app'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    faker     = require('faker'),
    Q         = require('q'),
    User      = require('../../../../app/models/user'),
    expect    = chai.expect,
    server,
    nightmare;

describe('/user/username', function() {
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
    var user = new User({
      username: faker.internet.username,
      email: faker.internet.email,
      password: faker.internet.password
    });

    user.save()
    .then(function(docs) {
      nightmare.goto('http://localhost:3001/user/' + docs.username)
      .evaluate(function() {
        return document.querySelector('title').innerText;
      }, function(text) {
        expect(text).to.equal('Overview for ' + docs.username);
      })
      .run(done);
    });
  });

});
