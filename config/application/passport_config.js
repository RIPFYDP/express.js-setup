var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    _              = require('lodash'),
    User           = require('../../app/models/user'),
    validator      = require('validator'),
    Q              = require('q'),
    globalLibrary  = require('./global_library'),
    passportConfig;

// Local authentication strategy
// Works against username and email
passport.use(new LocalStrategy(
  {usernameField: 'usernameEmail'},
  function(usernameEmail, password, done) {

    if (validator.isEmail(usernameEmail)) {
      User.find({email: usernameEmail})
      .then(
        function(docs) {
          var user = docs;

          if (_.isEmpty(user)) {
            return done(null, false, { message: 'Email not found.' });
          }

          user.comparePassword(password, function(err, isValid) {

            if (isValid) {
              globalLibrary.currentUser = user;
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid password.' });
            }
          });
        }
      );
    } else {
      User.find({username: usernameEmail})
      .then(
        function(docs) {
          var user = docs;

          if (_.isEmpty(user)) {
            return done(null, false, { message: 'User not found.' });
          }

          user.comparePassword(password, function(err, isValid) {

            if (isValid) {
              globalLibrary.currentUser = user;
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid password.' });
            }
          });
        }
      );
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.callbackFindById({_id: id}, function(err, user) {
    done(err, user);
  });
});

module.exports = passportConfig;
