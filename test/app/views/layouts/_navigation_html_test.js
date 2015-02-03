var app       = require('../../../../app'),
    User      = require('../../../../app/models/user'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    faker     = require('faker'),
    expect    = chai.expect,
    server,
    nightmare;

describe('navigation', function() {
  this.timeout(80000);

  before(function(done) {
    server = app.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  it('signed off state', function(done) {
    new Nightmare().goto('http://localhost:3001/')
    .exists('.sign-up', function(bool) {
      expect(bool).to.equal(true);
    })
    .exists('.sign-in', function(bool) {
      expect(bool).to.equal(true);
    })
    .exists('.sign-out', function(bool) {
      expect(bool).to.equal(false);
    })
    .run(done);
  });

  it('signed in state', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      new Nightmare()
      .goto('http://localhost:3001/sign_in')
      .type('input[name="usernameEmail"]', options.email)
      .type('input[name="password"]', options.password)
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('Welcome, ' + options.username + '!');
        }
      )
      .exists('.sign-up', function(bool) {
        expect(bool).to.equal(false);
      })
      .exists('.sign-in', function(bool) {
        expect(bool).to.equal(false);
      })
      .exists('.sign-out', function(bool) {
        expect(bool).to.equal(true);
      })
      .run(done);
    });
  });

});
