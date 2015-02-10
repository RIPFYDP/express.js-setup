var app       = require('../../../../app'),
    User      = require('../../../../app/models/user'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    faker     = require('faker'),
    expect    = chai.expect,
    server,
    nightmare;

describe('/settings', function() {
  this.timeout(80000);

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

  it('signed out', function(done) {
    nightmare.goto('http://localhost:3001/settings/preferences')
    .url(function(url) {
      expect(url).to.equal('http://localhost:3001/sign_in');
    })
    .run(done);
  });

  it('title signed in', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      nightmare.goto('http://localhost:3001/sign_in')
      .type('input[name="usernameEmail"]', options.email)
      .type('input[name="password"]', options.password)
      .click('button.btn.btn-default')
      .wait('.alert-message')

      .goto('http://localhost:3001/settings/preferences')
      .url(function(url) {
        expect(url).to.equal('http://localhost:3001/settings/preferences');
      })
      .evaluate(function() {
        return document.querySelector('title').innerText;
      }, function(text) {
        expect(text).to.equal('Settings - Preferences');
      })
      .run(done);
    });

  });

  it('update email preference', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      nightmare.goto('http://localhost:3001/sign_in')
      .type('input[name="usernameEmail"]', options.email)
      .type('input[name="password"]', options.password)
      .click('button.btn.btn-default')
      .wait('.alert-message')

      .goto('http://localhost:3001/settings/preferences')
      .url(function(url) {
        expect(url).to.equal('http://localhost:3001/settings/preferences');
      })
      .check('input[name="get_emails"]')
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(function() {
        return document.querySelector('.alert-message').innerText;
      }, function(text) {
        expect(text).to.equal('Success! Updated the email preference.');
      })
      .evaluate(function() {
        return document.querySelector('input[name="get_emails"]').hasAttribute('checked');
      }, function(text) {
        expect(text).to.equal(true);
      })

      .run(done);
    });
  });
});
