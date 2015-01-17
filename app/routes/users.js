var express = require('express');
    router  = express.Router(),
    User    = require('../models/user');

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

  res.render(template, options);
});

module.exports = router;
