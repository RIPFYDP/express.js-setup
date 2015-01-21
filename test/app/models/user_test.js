var chai   = require('chai'),
    expect = chai.expect,
    _      = require('lodash'),

    app           = require('../../../app'),
    http          = require('http'),
    globalLibrary = require('../../../config/application/global_library'),
    Mongo         = require('../../../config/db/mongo'),
    mongo         = new Mongo(),
    mongoOptions  = {
                      server: {
                        poolSize: 1
                      }
                    },

    User   = require('../../../app/models/user'),
    port   = 3002,
    server;

before(function(done) {

  app.set('port', port);

  server = http.createServer(app);
  mongo.connect(mongoOptions, function(){
    globalLibrary.db = mongo.db;
    server.listen(port);
    done();
  });

});

describe('app/models/user', function() {
  it('.all', function() {

    User.all()
    .then(function (docs) {
      expect(docs).to.be.a('Array');
      expect(docs[0]).to.be.a('Object');
    }, function(error) {
    }, function(progress) {
    });

  });
});
