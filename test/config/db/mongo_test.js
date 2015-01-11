var chai        = require('chai'),
    expect      = chai.expect,
    test        = require('assert'),
    mongoConfig = require('../../../config/db/mongo_config'),
    MongoClient = require('../../../config/db/mongo');

describe('config/db/mongo', function() {
  describe('MongoClient#connect', function() {

    // If this test fails, make sure mongodb is running.
    it('should connect to mongodb', function() {
      var url = mongoConfig.development.baseUrl + '/' + 'test';

      MongoClient.connect(url, function(err, db) {
        test.equal(null, err);

        db.close();
      });

    });
  });
});
