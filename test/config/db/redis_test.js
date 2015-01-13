var chai        = require('chai'),
    expect      = chai.expect,
    assert      = require('assert'),
    RedisClient = require('../../../config/db/redis');

describe('config/db/redis', function() {
  describe('RedisClient#connect', function() {

    // If this test fails, make sure redis is running.
    it('should connect to redis', function() {
      assert.equal(RedisClient.connected, true);
    });
  });
});
