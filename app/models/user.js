var Q             = require('q'),
    globalLibrary = require('../../config/application/global_library'),
    users,
    User;

User = function(options) {
  this.username = options.username;
  this.password = options.password;
};

// Class methods

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

// Instnce methods

User.prototype.save = function() {
  var deferred = Q.defer(),
      options  = {
        username: this.username,
        password: this.password
      };

  globalLibrary.db.collection('users').insert(options, function(err, items) {

    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
};

module.exports = User;
