'use strict';

var gulp       = require('gulp');
var plugins    = require('gulp-load-plugins')();
var argv       = require('yargs').argv;
var eslint = require('gulp-eslint');

var paths = {
  sourceFiles: 'lib/**/*.js',
  testFiles: 'test/**/*.js',
  gulpFile: 'gulpfile.js'
};

var TIMEOUT = 30000;

gulp.task('test', function () {
  return gulp.src(paths.testFiles)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: TIMEOUT,
      grep: argv.grep
    }))
    .on('error', function (error) {
      plugins.util.log(plugins.util.colors.red(error.message));
    })
    .pipe(plugins.exit());
});

gulp.task('eslint', function() {
  return gulp.src('lib/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .on('data', function(file) {
      if(file.eslint.messages && file.eslint.messages.length){
        gulp.fail = true;
      }
    });
});
