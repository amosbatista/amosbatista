angular.module("site.blog").controller("postCtrl", [
	'$scope',
	'post',
	function(
		scope,
		post
	){
		console.log('The loaded post', post);

		scope.post = post;
	}
])