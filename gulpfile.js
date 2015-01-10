var gulp  = require('gulp'),
    mocha = require('gulp-mocha'),
    exit  = require('gulp-exit');

gulp.task('default', function() {});

gulp.task('test-once', function() {
  return gulp.src('test/**/**/*.js', {read: false})
             .pipe(mocha({reporter: 'nyan'}))
             .pipe(exit());
});
