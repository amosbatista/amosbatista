angular.module("site.blog").controller("blogCtrl", [
	'postlist',
	function(
		postList
	){
		console.log('Response of Wordpress from route', postList);
	
	}
])