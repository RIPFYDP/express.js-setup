var settingsController = {
  profile: function(req, res) {
    var options = {
      title: 'Settings - Profile',
      liActive: 'profile'
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

  },

  postAccountPassword: function(req, res) {

  },

  postAccountEmail: function(req, res) {

  },

  postAccountDeactivate: function(req, res) {

  }
};

module.exports = settingsController;
