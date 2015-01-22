var Q             = require('q'),
    Mongo         = require('./mongo'),
    globalLibrary = require('../application/global_library'),
    mongo         = new Mongo(),
    mongoConnector;

mongoConnector = {

  // .init
  // Caches mongo connections in globalLibrary
  init: function(options) {
    mongo.connect(options)
    .then(
      function(docs) {
        globalLibrary.db = docs;
      },
      function(error) {},
      function(progress) {}
    );
  }
};

module.exports = mongoConnector;
