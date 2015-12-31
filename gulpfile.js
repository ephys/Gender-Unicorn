'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');
gulp.task('css', function() {
	try {
		gulp.src('./_assets/css/main.scss')
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(minify())
			.pipe(gulp.dest('./assets/css'));
	} catch(e) {
		console.log(e);
	}
});

gulp.task('default', function() {
	gulp.watch('./_assets/css/*.scss', ['css']);
});