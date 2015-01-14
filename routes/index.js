var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* Bootstrap page */
router.get('/bootstrap-page', function(req, res) {
  res.render('bootstrap-page', {});
});

module.exports = router;
