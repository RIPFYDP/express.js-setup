var globalLibrary = require('../../config/application/global_library'),
    test          = require('assert'),
    User;

User = {
  all: function() {
    var users;

    users = [];

    globalLibrary.db.collection('users').find({}).toArray(function(err, items) {
      test.equal(null, err);

      users = items;
    });

    return users;
  }
}

module.exports = User;
