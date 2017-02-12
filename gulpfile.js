var gulp = require('gulp');
var pug	= require('gulp-pug');
var less = require ('gulp-less');
var flatten = require('gulp-flatten');
var concatCss = require('gulp-concat');
var jsConcat = require('gulp-concat');
var plumber = require('gulp-plumber');


/* Paths */
var pugOrigin = ["src/*.pug", "src/**/*.pug"];
var lessMainOrigin = ["src/main/main.less"];
var lessOrigin = ["src/**/*.less"];
/*var pluginCSSOrigin = [
	'node_modules/font-awesome/css/font-awesome.css'
];*/
var cssPostLessOrigin = ["cssProcess/*.css"];
var jsOrigin = [
	"node_modules/angular/angular.js",
	"node_modules/angular-route/angular-route.js",
	"src/plugins/*.js",
	"src/common/header/*.js",
	"src/common/footer/*.js",
	"src/about/*.js",
	"src/home/*.js",
	"src/portfolio/*.js",
	"src/main/*.js",
];

/* Font awesome */
var fontAwesomeOrigin = {
	root: 'node_modules/font-awesome',
	css: '/css/font-awesome.css',
	fonts: '/fonts/*.*'
}

//  Image
var imageSource = ['img/*.*'];

var destinationFolder = "dest";


/* Pug
Process to HTML and save to the same dest folder */
gulp.task ('pug', function(){

	return gulp.src(pugOrigin)
		.pipe(plumber())
		.pipe(pug())
  		.pipe(flatten())
		.pipe(gulp.dest(destinationFolder));
});

/* Application
Concatenate all JS files from project and plugins*/
gulp.task ('app', function(){

	return gulp.src(jsOrigin)
		.pipe(plumber())
  		.pipe(jsConcat('app.js'))
		.pipe(gulp.dest(destinationFolder + '/main'));
});


/* Less 
Convert the files to css folder*/
gulp.task ('less', function(){

	return gulp.src(lessMainOrigin)
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('cssProcess'));
});

/* Plugin 
Copy the CSS folders to the processment*/
gulp.task ('cssPlugin', function(){

	return gulp.src(pluginCSSOrigin)
		.pipe(gulp.dest('cssProcess'));
});

// Image copy
gulp.task ('image', function(){

	return gulp.src(imageSource)
		.pipe(gulp.dest(destinationFolder + '/img'));
});


/* Font awesome process to copy files to the destin */
gulp.task ('fontAwesome_CSS', function(){

	return gulp.src(fontAwesomeOrigin.root + fontAwesomeOrigin.css)
		.pipe(gulp.dest('cssProcess'));
});

gulp.task ('fontAwesome_Fonts', function(){

	return gulp.src(fontAwesomeOrigin.root + fontAwesomeOrigin.fonts)
		.pipe(gulp.dest(destinationFolder + "/fonts"));
});



/* Concatenate CSS. Unify all css, after copy project style and plugins to the same folder*/
gulp.task ('concatenateCSS', function(){

	return gulp.src(cssPostLessOrigin)
		.pipe(plumber())
		.pipe(concatCss('/style.css'))
		.pipe(gulp.dest(destinationFolder + '/main'));
});



/*  Watch*/
gulp.watch( pugOrigin, ['pug']);
gulp.watch( lessOrigin, ['less']);
gulp.watch( cssPostLessOrigin, ['concatenateCSS']);
gulp.watch( jsOrigin, ['app']);
gulp.watch( imageSource, ['image']);



// Main task
gulp.task ('default', ['pug', 'less', 'concatenateCSS', 'app', 'fontAwesome_CSS', 'fontAwesome_Fonts', 'image']);