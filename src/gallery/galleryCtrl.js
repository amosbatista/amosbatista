angular.module("site.gallery").controller("galleryCtrl", [
	'$scope',
	'gallery',
	function(
		scope,
		gallery
	){
		console.log('Gallery', gallery);

		scope.gallery = gallery;
		
	}
])