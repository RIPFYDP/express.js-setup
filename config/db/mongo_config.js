var mongoConfig = {
  development: {
    name: 'express-js-setup-development',
    baseUrl: 'mongodb://localhost:27017'
  },
  test: {
    name: 'express-js-setup-test',
    baseUrl: 'mongodb://localhost:27017'
  },
  staging: {},
  production: {}
};

mongoConfig.development.url = function() {
  return mongoConfig.development.baseUrl + '/' + mongoConfig.development.name;
}();
mongoConfig.test.url = function() {
  return mongoConfig.test.baseUrl + '/' + mongoConfig.test.name;
}();

module.exports = mongoConfig;
