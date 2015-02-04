var SessionHelper = {
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/sign_in');
  }
};

module.exports = SessionHelper;
