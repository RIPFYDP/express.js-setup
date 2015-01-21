var async         = require('async'),
    Q             = require('q'),
    globalLibrary = require('../../config/application/global_library'),
    users,
    User;

User = {
  all: function() {
    var deferred = Q.defer();

    globalLibrary.db.collection('users').find({}).toArray(function(err, items) {

      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(items);
      }
    });

    return deferred.promise;
  }
};

module.exports = User;
