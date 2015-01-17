var mongo       = require('mongodb'),
    mongoConfig = require('./mongo_config'),
    test        = require('assert'),
    MongoClient = mongo.MongoClient,
    _db,
    mongo;

mongo = {
  connect: function(callback) {
    MongoClient.connect(mongoConfig.development.url, function(err, docs) {
      test.equal(null, err);

      _db = docs;

      if (callback) {
        return callback(err);
      }
    });
  },

  db: function() {
    return _db;
  },

  close: function() {
    _db.close();
  }
};

mongo.db = function() {
  return _db;
}

module.exports = mongo;
