var gulp    = require('gulp'),
    mocha   = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    exit    = require('gulp-exit'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish');

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

gulp.task('lint', function() {
  return gulp.src(['./app.js', './config/**/*.js', './test/**/*'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});
