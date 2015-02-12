var swigHelper = {
  setup: function(swig) {
    swig.setDefaults({ cache: false });

    swig.setFilter('isString', function(element) {
      return typeof element === 'string';
    });
  }
};

module.exports = swigHelper;
