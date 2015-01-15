var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  var template = 'users/index',
      options = {};

  options = {
    firstName: 'Jason',
    lastName: 'Kim'
  };

  res.render(template, options);
});

module.exports = router;
