var mongo       = require('mongodb'),
    mongoConfig = require('./mongo_config'),
    test        = require('assert'),
    async       = require('async'),
    _           = require('lodash'),
    MongoClient = mongo.MongoClient,
    _db,
    Mongo;

Mongo = function() {};

Mongo.prototype.connect = function(options, callback) {
  var self = this,
      url = mongoConfig.development.url;

  MongoClient.connect(url, options, function(err, db) {
    test.equal(null, err);

    self.db = db;

    if (callback) {
      callback();
    }
  });
};

module.exports = Mongo;
