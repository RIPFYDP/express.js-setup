var Q             = require('q'),
    attributa     = require('attributa'),
    bcrypt        = require('bcrypt'),
    globalLibrary = require('../../config/application/global_library'),
    users,
    User;

User = function(options) {
  attributa.assign(this, options);
};

// Class methods

// Return all users in an array.
User.all = function() {
  var deferred = Q.defer();

  globalLibrary.db.collection('users').find({}).toArray(function(err, items) {

    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
};

// Find all users with options.
User.find = function(options) {
  var deferred = Q.defer();

  globalLibrary.db.collection('users').find(options).toArray(function(err, items) {

    if (err) {
      deferred.reject(new Error(err));
    } else {

      if (items.length === 1) {
        items = items[0];
      }

      deferred.resolve(items);
    }
  });

  return deferred.promise;
};

// Instnce methods

User.prototype.save = function() {
  var deferred = Q.defer(),
      options  = {};

  attributa.assign(options, this);

  globalLibrary.db.collection('users').insert(options, function(err, items) {
    var user;

    if (err) {
      deferred.reject(new Error(err));
    } else {
      user = new User(items[0]);
      deferred.resolve(user);
    }
  });

  return deferred.promise;
};

User.prototype.signUp = function() {
  var deferred = Q.defer(),
      options  = {},
      self     = this;

  bcrypt.genSalt(12, function(err, salt) {
    bcrypt.hash(self.password, salt, function(err, hash) {

      if (err) {
        deferred.reject(new Error(err));
      } else {
        self.password = hash;

        self.save()
        .then(
          function(docs) {
            deferred.resolve(docs);
          },
          function(err) {
            deferred.reject(new Error(err));
          }
        );
      }

    });
  });

  return deferred.promise;
};

User.prototype.comparePassword = function(candidatePassword) {
  var deferred = Q.defer(),
      self     = this;

  bcrypt.compare(candidatePassword, self.password, function(err, res) {

    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(res);
    }
  });

  return deferred.promise;
};

module.exports = User;
