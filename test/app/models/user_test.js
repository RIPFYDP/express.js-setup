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

  describe('.validate', function() {
    it('email', function() {
      var options = {
        email: faker.internet.email()
      };
      var user = new User(options);

      User.validate(user, function(err, boolean) {
        expect(err).to.equal(null);
        expect(boolean).to.equal(true);
      });
    });

    it('username', function() {
      var options = {
        username: faker.name.firstName() + '_' + faker.name.lastName()
      };
      var user = new User(options);

      User.validate(user, function(err, boolean) {
        expect(err).to.equal(null);
        expect(boolean).to.equal(true);
      });
    });

    it('fullname', function() {
      var options = {
        fullname: faker.name.firstName() + ' ' + faker.name.lastName()
      };
      var user = new User(options);

      User.validate(user, function(err, boolean) {
        expect(err).to.equal(null);
        expect(boolean).to.equal(true);
      });
    });

    it('password', function() {
      var options = {
        password: faker.internet.password()
      };
      var user = new User(options);

      User.validate(user, function(err, boolean) {
        expect(err).to.equal(null);
        expect(boolean).to.equal(true);
      });
    });

    it('get_emails', function() {
      var options = {
        get_emails: true
      };
      var user = new User(options);

      User.validate(user, function(err, boolean) {
        expect(err).to.equal(null);
        expect(boolean).to.equal(true);
      });
    });
  });

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

  it('#update', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);
    var fullname = faker.name.firstName() + ' ' + faker.name.lastName();

    user.signUp()
    .then(function(docs) {
      return docs.update({fullname: fullname});
    })
    .then(
      function(docs) {
        expect(docs.fullname).to.equal(fullname);
        done();
      },
      function(err) {
        assert.equal(null, err);
        done();
      }
    );
  });

  it('#selfUpdate', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);
    var newEmail = faker.internet.email();

    user.signUp()
    .then(function(docs) {
      return docs.selfUpdate({email: newEmail});
    })
    .then(
      function(docs) {
        expect(globalLibrary.currentUser.email).to.equal(newEmail);
        done();
      },
      function(err) {
        assert.equal(null, err);
        done();
      }
    );

  });

  it('#destroy', function(done) {
    var options = {
      username: faker.internet.userName(),
      email:    faker.internet.email(),
      password: faker.internet.password()
    };
    var user = new User(options);

    user.signUp()
    .then(function(docs) {
      return docs.destroy();
    })
    .then(
      function(docs) {
        expect(docs.result.ok).to.equal(1);
        done();
      },
      function(err) {
        assert.equal(null, err);
        done();
      }
    );
  });

});
