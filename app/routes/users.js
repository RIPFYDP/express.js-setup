var express        = require('express'),
    router         = express.Router(),
    Q              = require('q'),
    passport       = require('passport'),
    User           = require('../models/user'),
    passportConfig = require('../../config/application/passport_config');

/* GET users listing. */
router.get('/', function(req, res) {
  var template = 'users/index',
      options = {};

  options = {
    title:     'This is users page',
    firstName: 'Jason',
    lastName:  'Kim'
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

router.post('/sign_in',
  function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      return res.redirect('/sign_in');
    })(req, res);
  }
);

module.exports = router;
