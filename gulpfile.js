'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');
gulp.task('css', function() {
	gulp.src('./_assets/css/main.scss')
		.pipe(plumber())
		.pipe(sass({errLogToConsole: true}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(minify())
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('default', function() {
	gulp.watch('./_assets/css/*.scss', ['css']);
});