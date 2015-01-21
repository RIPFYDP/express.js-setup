var express       = require('express'),
    router        = express.Router(),
    Q             = require('q'),
    User          = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res) {
  var template = 'users/index',
      options = {};

  options = {
    title:     'This is users page',
    firstName: 'Jason',
    lastName: 'Kim'
  };

  User.all()
  .then(function (docs) {
    options.users = docs;
    res.render(template, options);
  }, function(error) {
    res.render(template, options);
  }, function(progress) {
  });
});

module.exports = router;
