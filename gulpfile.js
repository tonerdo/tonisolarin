var gulp = require('gulp'),
  gulpUtil = require('gulp-util'),
  minifyHTML = require('gulp-minify-html'),
  changed = require('gulp-changed'),
  concat = require('gulp-concat'),
  stripDebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  serve = require('gulp-serve'),
  minifyCSS = require('gulp-minify-css');

// minify new or changed HTML pages
gulp.task('minify-html', function () {
  var htmlSrc = './src/*.html',
    htmlDst = './public';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));

  htmlSrc = './src/views/*.html';
  htmlDst = './public/views';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));

});

// JS concat, strip debugging and minify
gulp.task('minify-js', function () {
  gulp.src(['./src/js/*.js', './src/js/controllers/*.js'])
    .pipe(concat('scripts.bundle.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
});

// CSS concat, auto-prefix and minify
gulp.task('minify-css', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('serve', serve({
  root: ['public'],
  port: 8000
}));

// default gulp task
gulp.task('default', ['minify-html', 'minify-js', 'minify-css'], function () {
  
  // watch for HTML changes
  gulp.watch('./src/**/*.html', ['minify-html']);

  // watch for JS changes
  gulp.watch('./src/**/*.js', ['minify-js']);
  
  // watch for CSS changes
  gulp.watch('./src/**/*.css', ['minify-css']);

});