var express = require('express'),
    router  = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var options;

  options = {
    title: "Express MV*"
  };

  res.render('application/index', options);
});

module.exports = router;
