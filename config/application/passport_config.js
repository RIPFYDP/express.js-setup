var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    User           = require('../../app/models/user'),
    emailValidator = require('email-validator'),
    passportConfig;

// Local authentication strategy
// Works against username and email
passport.use(new LocalStrategy(
  {usernameField: 'usernameEmail'},
  function(usernameEmail, password, done) {

    if (emailValidator.validate(usernameEmail)) {
      User.find({email: usernameEmail})
      .then(
        function(docs) {
          if (!docs) {
            return done(null, false, {message: 'Incorrect email.'});
          }
          // TODO: Eventually uncomment this.
          // if (!user.validPassword(password)) {
          if (false) {
            return done(null, false, {message: 'Incorrect passwordl'});
          }
          return done(null, docs);
        }
      );
    } else {
      User.find({username: usernameEmail})
      .then(
        function(docs) {
          if (!docs) {
            return done(null, false, {message: 'Incorrect username.'});
          }
          // TODO: Eventually uncomment this.
          // if (!user.validPassword(password)) {
          if (false) {
            return done(null, false, {message: 'Incorrect passwordl'});
          }

          return done(null, docs);
        }
      );
    }
  }
));

module.exports = passportConfig;
