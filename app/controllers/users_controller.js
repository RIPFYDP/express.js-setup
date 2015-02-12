var _              = require('lodash'),
    Q              = require('q'),
    passport       = require('passport'),
    User           = require('../models/user'),
    passportConfig = require('../../config/application/passport_config'),
    globalLibrary  = require('../../config/application/global_library');

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
    var options = {
      title: 'Sign up'
    };

    res.render('users/sign_up', options);
  },

  signInPost: function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {

      if (err) {
        next(err);
      }

      if (!_.isEmpty(user)) {
        req.logIn(user, function(err) {

          if (err) {
            return next(err);
          }

          req.flash('success', 'Welcome, ' + user.username + '!');
          return res.redirect('/');
        });
      } else {
        req.flash('danger', info.message);
        return res.redirect('/sign_in');
      }

    })(req, res, next);
  },

  show: function(req, res) {
    User.find({username: req.params.username})
    .then(
      function(docs) {
        var options = {
          title: 'Overview for ' + docs.username,
          username: docs.username,
          email: docs.email
        };

        return res.render('users/show', options);
      },
      function(error) {
        // TODO: display 404
      }
    );
  },

  signUpPost: function(req, res) {
    // TODO: need error handling
    var user = new User({
      username: req.body.username,
      email:    req.body.email,
      password: req.body.password
    });

    user.signUp()
    .then(
      function(docs) {
        req.logIn(docs, function(err) {

          if (err) {
            return next(err);
          }

          req.flash('success', 'Thank you for signing up, ' + docs.username + '.');
          return res.redirect('/');
        });
      },
      function(err) {
        req.flash('danger', err);
        return res.redirect('/sign_up');
      }
    );
  },

  signOut: function(req, res) {
    req.logout();
    globalLibrary.currentUser = {};
    req.session.flash = [ { message: 'Signed out successfully.', type: 'success' } ];
    res.redirect('/');
  },

  forgotPassword: function(req, res) {
    var options = {
      title: 'Forgot password'
    };

    res.render('users/forgot_password', options);
  },

  forgotPasswordPost: function(req, res, next) {

  }
};

module.exports = usersController;
