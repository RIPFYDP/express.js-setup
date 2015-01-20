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
    var users = User.all();
    console.log(users);
    // mongo.db is now available.
    // console.log(globalLibrary.db);

    expect(users).to.be.a('Array');
  });
});
