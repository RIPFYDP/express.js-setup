var Q              = require('q'),
    passport       = require('passport'),
    User           = require('../models/user'),
    passportConfig = require('../../config/application/passport_config');

var usersController = {
  index: function(req, res) {
    var template = 'users/index',
    options = {};

    options = {
      title:     'This is users page',
      firstName: 'Jason',
      lastName:  'Kim'
    };
    User.all()
    .then(
      function (docs) {
        options.users = docs;
        res.render(template, options);
      },
      function(error) {
        res.render(template, options);
      },
      function(progress) {
      }
    );
  },

  signIn: function(req, res) {
    var options;

    options = {
      title: 'Sign in'
    };

    res.render('users/sign_in', options);
  },

  signUp: function(req, res) {
    var options;

    options = {
      title: 'Sign up'
    };

    res.render('users/sign_up', options);
  },

  signInPost: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      return res.redirect('/sign_in');
    })(req, res);
  },

  signUpPost: function(req, res) {
  }
};

module.exports = usersController;
