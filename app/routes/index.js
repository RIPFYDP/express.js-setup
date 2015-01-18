var express = require('express'),
    router  = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var options;

  options = {
    title: 'Express MV*'
  };

  res.render('application/index', options);
});

router.get('/log_in', function(req, res) {
  var options;

  options = {
    title: 'Log in'
  };

  res.render('users/log_in', options);
});

router.get('/sign_up', function(req, res) {
  var options;

  options = {
    title: 'Sign up'
  };

  res.render('users/sign_up', options);
});

module.exports = router;
