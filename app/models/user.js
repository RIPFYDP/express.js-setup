var mongoConfig = require('../../config/db/mongo_config'),
    db          = require('../../config/db/mongo'),
    User        = function() {};

User = {
  all: function() {
    var users;

    users = [];

    return users;
  }
}

module.exports = User;
