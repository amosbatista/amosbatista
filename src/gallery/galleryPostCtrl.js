angular.module("site.gallery").controller("galleryPostCtrl", [
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