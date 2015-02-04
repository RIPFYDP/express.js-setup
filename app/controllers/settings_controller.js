var settingsController = {
  index: function(req, res) {
    var options = {
      title: 'Settings'
    };

    res.render('settings/index', options);
  }
};

module.exports = settingsController;
