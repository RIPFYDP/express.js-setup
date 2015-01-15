var chai         = require('chai'),
    expect       = chai.expect,
    _            = require('lodash'),
    routesConfig = require('../../../config/application/routes');

describe('config/application/routes', function() {
  it('should export an array', function() {
    expect(routesConfig).to.be.a('Array');
  });

  it('should have an array of hashes/objects', function() {
    _.each(routesConfig, function(route) {
      expect(route).to.be.a('Object');
      expect(route).to.have.property('router');
      expect(route).to.have.property('base');
    });
  });
});
