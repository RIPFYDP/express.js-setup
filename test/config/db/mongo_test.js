var chai        = require('chai'),
    expect      = chai.expect,
    test        = require('assert'),
    Mongo       = require('../../../config/db/mongo'),
    db;

describe('config/db/mongo', function() {
  describe('.init', function() {

    var mongo = new Mongo(),
        collection,
        options;

    // Open just 1 connection
    options = {
      server: {
        poolSize: 1
      }
    };

    mongo.connect(options, function(){
      collection = mongo.db.collection('users');
      collection.find({}).toArray(function(err, items) {
        expect(items).to.be.a('Array');
      });
    });
  });
});
