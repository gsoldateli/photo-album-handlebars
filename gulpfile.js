var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

var config = {
	dist: 'dist/',
	imgIn: 'images/**/*.{jpg,jpeg,png,gif}',
	jsIn: [
      'bower_components/handlebars/handlebars.js',
      'bower_components/zepto/zepto.js',
      'js/**/*.js'
      ],
  sassIn: 'sass/main.scss',
	cssOut: 'dist/css/',
	cssOutName: 'style.min.css',
	jsOut: 'dist/js/',
	jsOutName: 'script.min.js',
	imgOut: 'dist/images/'
};

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: './',
    open:false
  });

  gulp.watch(['index.html', config.jsIn], ['reload']);
  gulp.watch(config.jsIn, ['js']);
  gulp.watch(['sass/**/*.scss'], ['sass']);
});

gulp.task('sass', function() {
  return gulp.src(config.sassIn)
  	.pipe(sourcemaps.init())
    .pipe(sass())
  	.pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(concat(config.cssOutName))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.cssOut))
    .pipe(browserSync.stream());;
});

gulp.task('js', function() {
  return gulp.src(config.jsIn)
  	.pipe(sourcemaps.init())
    .pipe(concat(config.jsOutName))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.jsOut));
});

gulp.task('img', function() {
  return gulp.src(config.imgIn)
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgOut));
});