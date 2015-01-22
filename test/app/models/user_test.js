var chai           = require('chai'),
    expect         = chai.expect,
    _              = require('lodash'),
    Q              = require('q'),
    Mongo          = require('../../../config/db/mongo'),
    deferred       = Q.defer(),
    mongo          = new Mongo(),
    globalLibrary  = require('../../../config/application/global_library'),
    db,

    User   = require('../../../app/models/user');


before(function(done) {

  mongo.connect()
  .then(
    function(docs) {
      globalLibrary.db = docs;
      done();
    },
    function(error) {},
    function(progress) {}
  );

});

describe('app/models/user', function() {
  it('.all', function(done) {

    User.all()
    .then(
    function (docs) {
      expect(docs).to.be.a('Array');
      expect(docs[0]).to.be.a('Object');
      done();
    },
    function(error) {},
    function(progress) {}
    );

  });
});
