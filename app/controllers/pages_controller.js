var pagesController = {
  index: function(req, res) {
    var options;

    options = {
      title: 'Express MV*'
    };

    res.render('application/index', options);
  }
};

module.exports = pagesController;
