var mongo       = require('mongodb'),
    mongoConfig = require('./mongo_config'),
    Q           = require('q'),
    _           = require('lodash'),
    MongoClient = mongo.MongoClient,
    _db,
    Mongo;

// Mongo model
Mongo = function() {};

// #connect
// Create a connection(s) to MongoDB.
Mongo.prototype.connect = function(options) {
  var self     = this,
      deferred = Q.defer(),
      url      = mongoConfig.development.url;

  options = (options === undefined) ? {} : options;

  MongoClient.connect(url, options, function(err, db) {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(db);
    }
  });

  return deferred.promise;
};

module.exports = Mongo;
