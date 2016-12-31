var gulp = require('gulp');
var pug	= require('gulp-pug');
var less = require ('gulp-less');
var flatten = require('gulp-flatten');
var concatCss = require('gulp-concat-css');
var jsConcat = require('gulp-concat');


/* Paths */
var pugOrigin = ["src/*.pug", "src/**/*.pug"];
var lessMainOrigin = ["src/main/main.less"];
var lessOrigin = ["src/**/*.less"];
var cssPostLessOrigin = ["cssProcess/*.css"];
var jsOrigin = [
	"src/plugins/*.js",
	"src/main/main.js",
	"src/about/*.js",
	"src/home/*.js",
];


/* Pug
Process to HTML and save to the same dest folder */
gulp.task ('pug', function(){

	return gulp.src(pugOrigin)
		.pipe(pug())
  		.pipe(flatten())
		.pipe(gulp.dest('dest'));
});

/* Application
Concatenate all JS files from project and plugins*/
gulp.task ('app', function(){

	return gulp.src(jsOrigin)
  		.pipe(jsConcat('app.js'))
		.pipe(gulp.dest('dest/main'));
});


/* Less 
Convert the files to css folder*/
gulp.task ('less', function(){

	return gulp.src(lessMainOrigin)
		.pipe(less())
		.pipe(gulp.dest('cssProcess'));
});


/* Concatenate CSS. Unify all css, after copy project style and plugins to the same folder*/
gulp.task ('concatenateCSS', function(){

	return gulp.src(cssPostLessOrigin)
		.pipe(concatCss('/style.css'))
		.pipe(gulp.dest('dest/main'));
});



/*  Watch*/
gulp.watch( pugOrigin, ['pug']);
gulp.watch( lessOrigin, ['less']);
gulp.watch( cssPostLessOrigin, ['concatenateCSS']);
gulp.watch( jsOrigin, ['app']);



// Main task
/*gulp.task ('default', ['less', 'pug', 'jsScript', 'cssConcat']);*/
gulp.task ('default', ['pug', 'less', 'concatenateCSS', 'app']);