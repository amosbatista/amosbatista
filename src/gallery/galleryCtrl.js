angular.module("site.gallery").controller("galleryCtrl", [
	'$scope',
	'gallery',
	function(
		scope,
		gallery
	){
		scope.$emit('toHideLoadScreen');
		scope.gallery = gallery;
		
	}
])