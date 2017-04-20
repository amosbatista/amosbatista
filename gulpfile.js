var gulp = require('gulp');
var pug	= require('gulp-pug');
var less = require ('gulp-less');
var flatten = require('gulp-flatten');
var concatCss = require('gulp-concat');
var jsConcat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var ftp = require('vinyl-ftp');

var ftpCredentials = require("./ftpCredentials");


/* Paths */
var pugOrigin = ["src/*.pug", "src/**/*.pug"];
var lessMainOrigin = ["src/main/main.less"];
var lessOrigin = ["src/**/*.less"];
var pluginCSSOrigin = [
	'node_modules/masterrow/dist/masterrow.css'
];
var cssPostLessOrigin = ["cssProcess/*.css"];
var jsOrigin = [
	"node_modules/angular/angular.js",
	"node_modules/angular-resource/angular-resource.js",
	"node_modules/angular-ui-router/release/angular-ui-router.js",
	"node_modules/moment/min/moment-with-locales.js",
	"node_modules/masterrow/dist/masterrow.js",
	"node_modules/angular-masterrow/dist/angular-masterrow.js",
	"bower_components/angular-linkedin/src/angular-linkedin.js",
	"src/common/main.js",
	"src/common/**/*.js",
	"src/about/*.js",
	"src/home/*.js",
	"src/portfolio/*.js",
	"src/blog/*.js",
	"src/gallery/*.js",
	"src/main/*.js",
	"!src/env.js" // Excluding environment config
];
var jsPluginSource = [
	'src/plugin/linkedinAPI.js'
];

var envScriptFile = 'src/env.js';

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
  		//.pipe(uglify())
		.pipe(gulp.dest(destinationFolder + '/main'));
});


// Process the config script
gulp.task ('env', function(){

	return gulp.src(envScriptFile)
		.pipe(plumber())
		.pipe(gulp.dest(destinationFolder + '/main'));
});

// Process the config scriot
gulp.task ('jsPlugin', function(){

	return gulp.src(jsPluginSource)
		.pipe(plumber())
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





// Final process, to send all the built files to FTP
var conn = ftp.create( ftpCredentials());

gulp.task ('ftpTask', function(){

	return gulp.src([
			destinationFolder + "/*.*",
			destinationFolder + "/**/*.*"
		])
		.pipe( conn.newer( '/public_html' ) ) // only upload newer files 
        .pipe( conn.dest( '/public_html' ) );

});
 



/* Concatenate CSS. Unify all css, after copy project style and plugins to the same folder*/
gulp.task ('concatenateCSS', function(){

	return gulp.src(cssPostLessOrigin)
		.pipe(plumber())
		.pipe(concatCss('/style.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(destinationFolder + '/main'));
});



/*  Watch*/
gulp.watch( pugOrigin, ['pug']);
gulp.watch( lessOrigin, ['less']);
gulp.watch( cssPostLessOrigin, ['concatenateCSS']);
gulp.watch( jsOrigin, ['app']);
gulp.watch( envScriptFile, ['env']);
gulp.watch( imageSource, ['image']);



// Main task
gulp.task ('default', ['pug', 'less', 'cssPlugin', 'concatenateCSS', 'app', 'env', 'fontAwesome_CSS', 'fontAwesome_Fonts', 'image', 'jsPlugin']);
gulp.task ('ftp', ['ftpTask']);