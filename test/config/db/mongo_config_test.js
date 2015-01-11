var chai        = require('chai'),
    expect      = chai.expect,
    mongoConfig = require('../../../config/db/mongo_config');

describe('config/db/mongo_config', function() {
  it('should have correct attributes', function() {
    expect(mongoConfig).to.have.ownProperty('development');
    expect(mongoConfig).to.have.ownProperty('test');
    expect(mongoConfig).to.have.ownProperty('staging');
    expect(mongoConfig).to.have.ownProperty('production');
  });

  describe('development', function() {
    var devEnv = mongoConfig.development;

    it('should have correct attributes', function() {
      expect(devEnv).to.have.ownProperty('name');
      expect(devEnv).to.have.ownProperty('baseUrl');
      expect(devEnv).to.have.ownProperty('url');
    });

    it('should have correct values for attributes', function() {
      expect(devEnv.name).to.be.a('string');
      expect(devEnv.baseUrl).to.be.a('string');
      expect(devEnv.url).to.be.a('string');
    });
  });
});
