var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    User           = require('../../app/models/user'),
    emailValidator = require('email-validator'),
    Q              = require('q'),
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
          var user = docs;

          if (!user) {
            return done(null, false, {message: 'Email not found.'});
          }

          user.comparePassword(password, function(err, isValid) {

            if (isValid) {
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
