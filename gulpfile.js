'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');


gulp.task('default', ['browser-sync'], function () {
});

// Not currently in use
gulp.task('css', function () {
	gulp.src('./public/stylesheets/main.css')
	.pipe(uglifycss({
		"maxLineLen": 9999,
		"uglyComments": true
	}))
	.pipe(gulp.dest('./public/css'));
});

gulp.task('browser-sync', ['nodemon', "sass"/*, "css"*/], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
    files: ["./public/stylesheets/style.css", "./views/**/*.pug", "./public/js/*.js"],
    browser: "firefox",
    port: 7000,
	});
  gulp.watch("./public/stylesheets/*.*", ['sass']);
	// gulp.watch("./public/stylesheets/main.css", ['css']);

});

gulp.task('sass', function () {
  return gulp.src('./public/stylesheets/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheets'))
		.pipe(browserSync.stream());
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});
