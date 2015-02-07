var _      = require('lodash'),
    faker  = require('faker'),
    Mongo  = require('mongodb').MongoClient,
    assert = require('assert'),
    bcrypt = require('bcrypt');
    config = require('../config/db/mongo_config');

namespace('db', function() {

  desc('Drop database');
  task('drop', function() {
    console.log('Drop database');

    if (process.env.NODE_ENV === 'development'
      || process.env.NODE_ENV === 'test') {
      Mongo.connect(config[process.env.NODE_ENV].url, function(err, db) {
        assert.equal(null, err);

        db.dropDatabase(function(err, result) {
          assert.equal(null, err);

          // Wait to seconds to let it replicate across
          setTimeout(function() {

            // Get the admin database
            db.admin().listDatabases(function(err, dbs) {

              // Grab the databases
              dbs = dbs.databases;

              // Did we find the db
              var found = false;

              // Check if we have the db in the list
              for (var i = 0; i < dbs.length; i++) {
                if (dbs[i].name === config.development.name) {
                  found = true;
                }
              }

              db.close();
            });
          }, 2000);
        });
      });
    }

  });

  desc('Seed database');
  task('seed', function() {
    console.log('Seed database');

    var users = [];

    // Create an array of 100 fake users
    _.times(100, function() {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(faker.internet.password(), salt, function(err, hash) {

          users.push({
            username: faker.internet.userName(),
            email:    faker.internet.email(),
            password: hash,
            fullname: ''
          });

        });
      });
    });

    if (process.env.NODE_ENV === 'development'
      || process.env.NODE_ENV === 'test') {

      // Connect to the database
      Mongo.connect(config[process.env.NODE_ENV].url, function(err, db) {
        assert.equal(null, err);

        // Create users collection
        db.createCollection('users', {}, function(err, collection) {
          assert.equal(null, err);

          // Insert users
          collection.insert(users, function(err, result) {
            assert.equal(null, err);

            db.close();
          })
        });
      });
    }
  });
});
