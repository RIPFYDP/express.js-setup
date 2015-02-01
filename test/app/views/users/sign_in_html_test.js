var app       = require('../../../../app'),
    User      = require('../../../../app/models/user'),
    Nightmare = require('nightmare'),
    chai      = require('chai'),
    faker     = require('faker'),
    expect    = chai.expect,
    server,
    nightmare;

describe('/sign_in', function() {
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

  it('title', function(done) {
    nightmare.goto('http://localhost:3001/sign_in')
    .evaluate(function() {
      return document.querySelector('title').innerText;
    }, function(text) {
      expect(text).to.equal('Sign in');
    })
    .run(done);
  });

  it('sign in successfully with email', function(done) {
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
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('Welcome, ' + options.username + '!');
        }
      )
      .run(done);
    });
  });

  it('sign in fail with email + wrong password', function(done) {
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
      .type('input[name="password"]', options.password+'fail')
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('Invalid password.');
        }
      )
      .run(done);
    });
  });

  it('sign in fail with email', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      nightmare.goto('http://localhost:3001/sign_in')
      .type('input[name="usernameEmail"]', options.email+'fail')
      .type('input[name="password"]', options.password)
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('Email not found.');
        }
      )
      .run(done);
    });
  });


  it('sign in successfully with username', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      nightmare.goto('http://localhost:3001/sign_in')
      .type('input[name="usernameEmail"]', options.username)
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
      .run(done);
    });
  });

  it('sign in fail with username + wrong password', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      nightmare.goto('http://localhost:3001/sign_in')
      .type('input[name="usernameEmail"]', options.username)
      .type('input[name="password"]', options.password+'fail')
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('Invalid password.');
        }
      )
      .run(done);
    });
  });

  it('sign in fail with wrong username', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      nightmare.goto('http://localhost:3001/sign_in')
      .type('input[name="usernameEmail"]', options.username+'fail')
      .type('input[name="password"]', options.password)
      .click('button.btn.btn-default')
      .wait('.alert-message')
      .evaluate(
        function() {
          return document.querySelector('.alert-message').innerText;
        },
        function(text) {
          expect(text).to.equal('User not found.');
        }
      )
      .run(done);
    });
  });
});
