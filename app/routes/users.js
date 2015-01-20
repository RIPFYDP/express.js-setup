var express       = require('express');
    router        = express.Router(),
    globalLibrary = require('../../config/application/global_library'),
    User          = require('../models/user'),
    db            = globalLibrary.db;

/* GET users listing. */
router.get('/', function(req, res) {
  var template = 'users/index',
      options = {};

  options = {
    title:     'This is users page',
    firstName: 'Jason',
    lastName: 'Kim',
    users: User.all()
  };
  console.log(db);

  res.render(template, options);
});

module.exports = router;
