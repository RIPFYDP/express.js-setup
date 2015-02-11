var Q             = require('q'),
    _             = require('lodash'),
    attributa     = require('attributa'),
    bcrypt        = require('bcrypt'),
    globalLibrary = require('../../config/application/global_library'),
    validator     = require('validator'),
    is            = require('is'),
    users,
    User;

User = function(options) {
  attributa.assign(this, options);
};

// Class methods

User.fields = [
  'email',
  'username',
  'fullname',
  'password',
  'get_emails'
];

User.validate = function(options, callback) {
  var fieldsConcern = Object.keys(options);
  var errors = {};
  var hasError = false;

  _.each(fieldsConcern, function(attribute) {
    var value = options[attribute];

    switch(attribute) {
      case 'email':
        errors.email = [];
        if (!validator.isEmail(value)) {
          hasError = true;
          errors.email.push("Invalid email address.")
        }
        break;
      case 'username':
        errors.username = [];
        if (!validator.isLength(value, 3, 20)) {
          hasError = true;
          errors.username.push('Username should be between 3 to 20 characters long');
        }
        if (!validator.matches(value, /^[a-zA-Z0-9_]+$/)) {
          hasError = true;
          errors.username.push('Username should only contain alphanumeric chracters and _');
        }
        break;
      case 'fullname':
        errors.fullname = [];
        if (!validator.isLength(value, 3, 250)) {
          hasError = true;
          errors.fullname.push('Name should be between 3 to 250 characters long');
        }
        if (!validator.matches(value, /^[a-zA-Z ]+$/)) {
          hasError = true;
          errors.fullname.push('Name should only contain alphabets');
        }
        break;
      case 'password':
        errors.password = [];
        if (!validator.isLength(value, 6)) {
          hasError = true;
          errors.password.push('Password should be between 3 to 250 characters long');
        }
        break;
      case 'get_emails':
        errors.get_emails = [];
        if (!is.boolean(value)) {
          hasError = true;
          errors.get_emails.push('Invalid email preference error.');
        }
        break;
    }
  });

  if (hasError) {
    callback(errors);
  }

  callback(null, true);
};

// Return all users in an array.
User.all = function() {
  var deferred = Q.defer();

  globalLibrary.db.collection('users').find({}).toArray(function(err, items) {

    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
};

// Find all users with options.
User.find = function(options) {
  var deferred = Q.defer();

  globalLibrary.db.collection('users').find(options).toArray(function(err, items) {

    if (err) {
      deferred.reject(new Error(err));
    } else {

      if (items.length === 1) {
        items = new User(items[0]);
      } else {
        _.each(items, function(item) {
          items = new User(items);
        });
      }

      deferred.resolve(items);
    }
  });

  return deferred.promise;
};

User.callbackFindById = function(options, callback) {
  globalLibrary.db.collection('users').find(options).toArray(function(err, items) {

    if (err) {
      callback(err);
    } else {
      items = new User(items[0]);
      callback(null, items);
    }
  });
};

// Instnce methods

User.prototype.save = function() {
  var deferred = Q.defer(),
      options  = {};

  attributa.assign(options, this);

  globalLibrary.db.collection('users').insertOne(options, function(err, items) {
    var user;

    if (err) {
      deferred.reject(new Error(err));
    } else {
      user = new User(items.ops[0]);
      deferred.resolve(user);
    }
  });

  return deferred.promise;
};

User.prototype.signUp = function() {
  var deferred = Q.defer(),
      options  = {},
      self     = this;

  bcrypt.genSalt(12, function(err, salt) {
    bcrypt.hash(self.password, salt, function(err, hash) {

      if (err) {
        deferred.reject(new Error(err));
      } else {
        self.password = hash;

        self.save()
        .then(
          function(docs) {
            deferred.resolve(docs);
          },
          function(err) {
            deferred.reject(new Error(err));
          }
        );
      }

    });
  });

  return deferred.promise;
};

User.prototype.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, res) {

    if (err) {
      return callback(err);
    } else {
      callback(null, res);
    }
  });
};

// Update user instance
User.prototype.update = function(options) {
  var self = this,
      deferred = Q.defer();

  globalLibrary.db.collection('users')
    .findOneAndUpdate({_id: self._id}, {$set: options}, {returnOriginal: false}, function(err, item) {

    if (err) {
      deferred.reject(new Error(err));
    } else {
      user = new User(item.value);
      deferred.resolve(user);
    }
  });

  return deferred.promise;
};

// Update currentUser instance
// Similar to User#update(), but updates globalLibrary.currentUser
User.prototype.selfUpdate = function(options) {
  var self = this,
      deferred = Q.defer();

  globalLibrary.db.collection('users')
    .findOneAndUpdate({_id: self._id}, {$set: options}, {returnOriginal: false}, function(err, item) {
    var user;

    if (err) {
      deferred.reject(new Error(err));
    } else {

      user = new User(item.value);
      globalLibrary.currentUser = user;
      deferred.resolve(user);
    }
  });

  return deferred.promise;
};

// Update currentUser password
User.prototype.updatePassword = function(options) {
  var self = this,
      deferred = Q.defer();

  bcrypt.genSalt(12, function(err, salt) {
    bcrypt.hash(options.password, salt, function(err, hash) {

      if (err) {
        deferred.reject(new Error(err));
      } else {
        options.password = hash;

        self.update(options)
        .then(
          function(docs) {
            deferred.resolve(docs);
          },
          function(err) {
            deferred.reject(new Error(err));
          }
        );
      }

    });
  });

  return deferred.promise;
};

User.prototype.destroy = function(options) {
  var self = this,
      deferred = Q.defer();

  globalLibrary.db.collection('users').deleteOne({email: self.email}, function(err, items) {
    var bool;

    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(items);
    }
  });

  return deferred.promise;
};

module.exports = User;
