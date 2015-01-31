var app       = require('../../../../app'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    faker     = require('faker'),
    User      = require('../../../../app/models/user'),
    Q         = require('q'),
    expect    = chai.expect,
    server,
    nightmare;

faker.locale = 'en';

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

  it('sign up successfully', function(done) {
    var username = faker.internet.userName();

    nightmare.goto('http://localhost:3001/sign_up')
    .type('input[name="username"]', username)
    .type('input[name="email"]', faker.internet.email())
    .type('input[name="password"]', faker.internet.password())
    .click('button.btn.btn-default')
    .wait('.alert-message')
    .evaluate(
      function() {
        return document.querySelector('.alert-message').innerText;
      },
      function(text) {
        expect(text).to.equal('Thank you for signing up, ' + username);
      }
    )
    .run(done);
  });

  it('sign up with existing username', function(done) {
    User.all()
    .then(function(docs){
      var user = docs[0];
      var username = user.username;

      nightmare.goto('http://localhost:3001/sign_up')
      .type('input[name="username"]', username)
      .type('input[name="email"]', faker.internet.email())
      .type('input[name="password"]', faker.internet.password())
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('Sorry, the username, ' + username + ' is already taken.');
        }
      )
      .run(done);
    });
  });

  it('sign up with existing email', function(done) {
    User.all()
    .then(function(docs){
      var user = docs[0];
      var email = user.email;

      nightmare.goto('http://localhost:3001/sign_up')
      .type('input[name="username"]', faker.internet.userName())
      .type('input[name="email"]', email)
      .type('input[name="password"]', faker.internet.password())
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('Sorry, ' + email + ' is already used to sign up.');
        }
      )
      .run(done);
    });


  });

})
