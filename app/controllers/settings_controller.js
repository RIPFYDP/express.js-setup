var User = require('../models/user'),
    globalLibrary = require('../../config/application/global_library');

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
      liActive: 'account'
    };

    res.render('settings/account', options);
  },

  preferences: function(req, res) {
    var options = {
      title: 'Settings - Preferences',
      liActive: 'preferences'
    };

    res.render('settings/preferences', options);
  },

  postProfile: function(req, res) {
    var user = User.find({email: req.body.email})
    .then(
      function(user) {
        user = new User(user);
        return user.update({fullname: req.body.fullname});
      }
    )
    .then(
      function(user) {
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

  },

  postAccountEmail: function(req, res) {

  },

  postAccountDeactivate: function(req, res) {

  }
};

module.exports = settingsController;
