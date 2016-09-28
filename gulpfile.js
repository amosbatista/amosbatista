
/* LIBRARIES */
var gulp 			= require('gulp');
var pug				= require('gulp-pug');
var browserSync 	= require ('browser-sync').create();
var less 			= require ('gulp-less');
var minifycss 		= require('gulp-minify-css');
var jsConcat		= require ('gulp-concat');
var rename			= require('gulp-rename');
var uglyfly 		= require('gulp-uglyfly');
var plumber 		= require('gulp-plumber');



// FILE SOURCES
var viewsSource = [
		'views/*.pug',
		'!views/index.pug',
	];
var indexViewSource = 'views/index.pug';

var lessSource = 'less/style.less';
var lessOtherFileSource = 'less/**/*.less';
var imgSource = [
		'img/*.jpg',
		'img/*.png',
	];
var cssPluginsSource = [
	'node_modules/chartist/dist/chartist.css'
];

var jsSource = [
	'node_modules/angular/angular.js',
	'plugins/socket.io.js',
	'node_modules/angular-animate/angular-animate.js',

	'node_modules/chartist/dist/chartist.js',
	'node_modules/angular-chartist.js/dist/angular-chartist.js',
	'app/**/*.js'
];



var destFolder = 'dest/';



/* Browser Sync*/
gulp.task('browser-sync', function(){

	browserSync.init({
		proxy: "localhost",
		notify: false
	});

});


// Move all images to the destination
gulp.task('img-copy', function(){

	return gulp.src(imgSource)
		.pipe(gulp.dest(destFolder + 'img'))
		.pipe(browserSync.stream());
});

// Process the LESS file, minify and send it to the destination
gulp.task('css-process', function(){
	
	return gulp.src(lessSource)
		.pipe(plumber())
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(destFolder + 'css'))
		.pipe(browserSync.stream());
});

// Process the plugins file, minify and send it to the destination
gulp.task('css-plugins', function(){
	
	return gulp.src(cssPluginsSource)
		.pipe(plumber())
		.pipe(minifycss())
		.pipe(gulp.dest(destFolder + 'css'))
		.pipe(browserSync.stream());
});


// Concatenate the app source, with ALL plugins, minify and send to destination
gulp.task ('app-script', function (){

	//return gulp.src([angularSource, chartSource, angularChartSource, jsSource])
	return gulp.src(jsSource)
		.pipe(plumber())
		.pipe(jsConcat('script.min.js'))
		//.pipe(uglyfly())
		.pipe(gulp.dest(destFolder + 'app'))
		.pipe(browserSync.stream());
});



// PUG (OR JADE) PROCESSING -- WITHOUT THE INDEX (It will go into root)
gulp.task('pug', function (){
	
	return gulp.src(viewsSource)
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe( gulp.dest(destFolder + 'views'))
		.pipe(browserSync.stream());
});

// Index file process
gulp.task('indexPage', function (){
	
	return gulp.src(indexViewSource)
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe( gulp.dest(destFolder))
		.pipe(browserSync.stream());
});


// WATCH
gulp.task ('watch', function(){

	gulp.watch(viewsSource, ['indexPage']);
	gulp.watch(indexViewSource, ['indexPage']);
	gulp.watch(lessOtherFileSource, ['css-process']);	
	gulp.watch(cssPluginsSource, ['css-plugins']);
	//gulp.watch([angularSource, chartSource, angularChartSource, jsSource], ['app-script']);
	gulp.watch(jsSource, ['app-script']);
	gulp.watch(imgSource, ['img-copy']);

});

// DEFAULT TASK
gulp.task( 'default', ['pug', 'indexPage', 'app-script', 'css-process', 'css-plugins', 'img-copy', 'watch', 'browser-sync']);
