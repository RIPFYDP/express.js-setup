var gulp    = require('gulp'),
    mocha   = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    exit    = require('gulp-exit');

gulp.task('default', function() {});

gulp.task('server', ['nodemon']);

gulp.task('nodemon', function() {
  nodemon({
    script: 'bin/www',
  }).on('restart');
});

gulp.task('test-once', function() {
  return gulp.src('test/**/**/*.js', {read: false})
             .pipe(mocha({reporter: 'nyan'}))
             .pipe(exit());
});
