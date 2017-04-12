var gutil = require( 'gulp-util' );

function ftpCredentials(){
	return {
	    host:     'myHost',
	    user:     'myUser',
	    password: 'myPassword',
	    parallel: 1,
	    log:      gutil.log
	}
}

module.exports = ftpCredentials;