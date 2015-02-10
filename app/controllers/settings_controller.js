var User = require('../models/user'),
    globalLibrary = require('../../config/application/global_library'),
    emailValidator = require('email-validator');

var settingsController = {
  profile: function(req, res) {
    var options = {
      title: 'Settings - Profile',
      liActive: 'profile',
      currentUser: globalLibrary.currentUser
    };

    res.render('settings/profile', options);
  },

  account: function(req, res) {
    var options = {
      title: 'Settings - Account settings',
      liActive: 'account',
      currentUser: globalLibrary.currentUser
    };

    res.render('settings/account', options);
  },

  preferences: function(req, res) {
    var options = {
      title: 'Settings - Preferences',
      liActive: 'preferences',
      currentUser: globalLibrary.currentUser
    };

    res.render('settings/preferences', options);
  },

  postProfile: function(req, res) {
    var user = User.find({email: req.body.email})
    .then(
      function(user) {
        user = new User(user);
        return user.selfUpdate({fullname: req.body.fullname});
      }
    )
    .then(
      function(user) {
        globalLibrary.currentUser = user;
        req.flash('success', 'Success! Updated the profile.');
        return res.redirect('/settings');
      }
    )
    .fail(function (error) {
      req.flash('danger', 'Sorry, we couldn\'t save your profile properly.');
      return res.redirect('/settings');
    });
  },

  postAccountPassword: function(req, res) {
    var user = globalLibrary.currentUser;

    user.comparePassword(req.body.current_password, function(err, isValid) {

      if (isValid) {
        user.updatePassword({password: req.body.new_password})
        .then(
          function(user) {
            globalLibrary.currentUser = user;
            req.flash('success', 'Success! Updated the password.');
            return res.redirect('/settings/account');
          },
          function(err) {
            req.flash('danger', 'Sorry, we couldn\'t update your password.');
            return res.redirect('/settings/account');
          }
        );
      } else {
        req.flash('danger', 'Sorry, your current password incorrect.');
        return res.redirect('/settings/account');
      }
    });
  },

  postAccountEmail: function(req, res) {
    var user = globalLibrary.currentUser;

    if (!emailValidator.validate(req.body.new_email)) {
      req.flash('danger', 'Your email is invalid.');
      return res.redirect('/settings/account');
    }

    user.selfUpdate({email: req.body.new_email})
    .then(
      function(user) {
        globalLibrary.currentUser = user;
        req.flash('success', 'Success! Updated the email.');
        return res.redirect('/settings/account');
      },
      function(err) {
        req.flash('danger', 'Sorry, we couldn\'t update your email.');
        return res.redirect('/settings/account');
      }
    );
  },

  postAccountDeactivate: function(req, res) {
    var user = globalLibrary.currentUser;

    if (user.email !== req.body.email) {
      req.flash('danger', 'You email is incorrect.');
      return res.redirect('/settings/account');
    }

    user.destroy()
    .then(
      function() {
        req.logout();
        globalLibrary.currentUser = {};
        req.flash('success', 'Sorry to see you go. We deactivated your account.');
        return res.redirect('/');
      },
      function(err) {
        req.flash('danger', 'Sorry, we couldn\'t deactivate your account.');
        return res.redirect('/settings/account');
      }
    );
  },

  postAccountEmailPreference: function(req, res) {
    var user = globalLibrary.currentUser;

    user.selfUpdate({get_emails: req.body.get_emails})
    .then(
      function(user) {
        globalLibrary.currentUser = user;
        req.flash('success', 'Success! Updated the email preference.');
        return res.redirect('/settings/preferences');
      },
      function(err) {
        req.flash('danger', 'Sorry, we couldn\'t update your email preference.');
        return res.redirect('/settings/preferences');
      }
    );
  }
};

module.exports = settingsController;
