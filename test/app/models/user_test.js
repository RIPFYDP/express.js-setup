var chai           = require('chai'),
    expect         = chai.expect,
    _              = require('lodash'),
    faker          = require('faker'),
    Q              = require('q'),
    Mongo          = require('../../../config/db/mongo'),
    deferred       = Q.defer(),
    mongo          = new Mongo(),
    globalLibrary  = require('../../../config/application/global_library'),
    db,

    User   = require('../../../app/models/user');


before(function(done) {

  mongo.connect()
  .then(
    function(docs) {
      globalLibrary.db = docs;
      done();
    },
    function(error) {},
    function(progress) {}
  );

});

describe('app/models/user', function() {

  it('.all', function(done) {
    User.all()
    .then(
      function (docs) {
        expect(docs).to.be.a('Array');
        expect(docs[0]).to.be.a('Object');
        done();
      },
      function(error) {},
      function(progress) {}
    );
  });

  it('.find', function(done) {
    var user;
    User.all()
    .then(
      function(docs) {
        user = docs[0];
        return User.find({username: user.username});
      }
    )
    .then(
      function(docs) {
        expect(docs).to.be.a('Object');
        expect(docs.username).to.be.equal(user.username);
        done();
      }
    );
  });

  it('#save', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.save()
    .then(
      function(docs) {
        expect(docs).to.be.a('Object');
        expect(docs).to.have.property('_id');
        expect(docs.username).to.be.equal(options.username);
        expect(docs.email).to.be.equal(options.email);
        expect(docs.password).to.be.equal(options.password);
        done();
      },
      function(error) {},
      function(progress) {}
    );
  });

  it('#signUp', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      expect(docs).to.be.a('Object');
      expect(docs).to.have.property('_id');
      expect(docs.username).to.be.equal(options.username);
      expect(docs.email).to.be.equal(options.email);
      expect(docs.password).to.not.equal(options.password);
      done();
    });
  });

  it('#comparePassword success', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      docs.comparePassword(options.password, function(err, res) {
        if (err) {
          throw new Error(err);
        } else {
          expect(res).to.be.equal(true);
          done();
        }
      });
    });
  });

  it('#comparePassword fail', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      docs.comparePassword('WrongPasswordShouldFail', function(err, res) {
        if (err) {
          throw new Error(err);
        } else {
          expect(res).to.be.equal(false);
          done();
        }
      });
    });
  });

});
