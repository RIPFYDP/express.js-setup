var chai   = require('chai'),
    expect = chai.expect,
    _      = require('lodash'),
    User   = require('../../../app/models/user');

describe('app/models/user', function() {
  it('.all', function() {
    var users = User.all();

    expect(users).to.be.a('Array');
  });
});
