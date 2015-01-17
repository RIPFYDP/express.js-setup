var chai        = require('chai'),
    expect      = chai.expect,
    test        = require('assert'),
    mongo       = require('../../../config/db/mongo'),
    db;

describe('config/db/mongo', function() {

  describe('.init', function() {
    mongo.connect();
    db = mongo.db();
  });
});
