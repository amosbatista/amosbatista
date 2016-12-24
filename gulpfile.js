var gulp = require('gulp');
var pug	= require('gulp-pug');
var less = require ('gulp-less');

gulp.task ('default', function(){
	return gulp.src("views/*.pug")
		.pipe(pug())
		.pipe( gulp.dest('dist/') );
});

gulp.watch(["*", 'views/*'], ['default']);