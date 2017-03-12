angular.module("site.gallery").controller("galleryCtrl", [
	'$scope',
	'gallery',
	function(
		scope,
		gallery
	){
		scope.gallery = gallery;
		
	}
])