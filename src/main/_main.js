angular.module("site", [
	'ui.router',
	'ngResource',
	'linkedin',
	'common',
	'site.about',
	'site.portfolio',
	'site.blog',
	'site.home',
	'site.gallery',
	"angular-masterrow"

]);


// Script to execute when main module is ready
angular.module("site").run([
	"googleAnalyticsSrv",
	function(
		googleAnalyt
	){
		googleAnalyt();	
	}
])