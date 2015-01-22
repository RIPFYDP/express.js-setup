var chai        = require('chai'),
    expect      = chai.expect,
    test        = require('assert'),
    Mongo       = require('../../../config/db/mongo'),
    Q           = require('q');

describe('config/db/mongo', function() {

  describe('#connect', function() {
    it('should connect to mongodb', function(done) {
      var mongo      = new Mongo(),
          deferred   = Q.defer(),
          options;

      // Open just 1 connection
      options = {
        server: {
          poolSize: 1
        }
      };

      mongo.connect(options)
      .then(function(db) {
        var collection = db.collection('users');

        collection.find({}).toArray(function(err, items) {
          expect(items).to.be.a('Array');
          done();
        });
      },
      function(error) {},
      function(progress) {});
    });

  });
});
