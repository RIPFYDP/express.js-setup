var gulp        = require('gulp'),
    mocha       = require('gulp-mocha'),
    nodemon     = require('gulp-nodemon'),
    exit        = require('gulp-exit'),
    jshint      = require('gulp-jshint'),
    shell       = require('gulp-shell'),
    duration    = require('gulp-duration')
    runSequence = require('run-sequence'),
    stylish     = require('jshint-stylish');

gulp.task('default', function() {});

gulp.task('server', ['nodemon']);

gulp.task('nodemon', function() {
  process.env.NODE_ENV = 'development';

  nodemon({
    script: 'bin/www',
  }).on('restart');
});

gulp.task('test-complete', function(callback) {
  process.env.NODE_ENV = 'test';
  runSequence('jake-prepopulate', 'test-once',
  callback);
});

gulp.task('jake-prepopulate', shell.task([
'jake db:drop',
'jake db:seed']));

gulp.task('test-once', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src('test/**/**/*.js', {read: false})
             .pipe(mocha({reporter: 'nyan'}))
             .pipe(duration('Running tests'))
             .pipe(exit());
});

gulp.task('lint', function() {
  return gulp.src(['./app.js', './config/**/*.js', './test/**/*',
    'app/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});
