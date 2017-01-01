var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    stylus = require('gulp-stylus');

gulp.task('stylus', function () {
  gulp.src('./public/stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/stylus/*.styl', ['stylus']);
  gulp.watch('./public/css/*.css');
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js njk css',
	env: { 'NODE_ENV': 'development' },
    stdout: false
  });
});

gulp.task('default', ['stylus','develop','watch'])
