// Directive to tile all posts in a standard 
angular.module('site.gallery').directive('galleryTile', function(){

	return {
		restrict: "E",
		scope: {
			postList: '='
		},
		templateUrl: '_galleryTile.html',
		link: function (scope, element){
			
			// Get the size of the screen
			var containerWidth = element.parent()[0].offsetWidth;
			var containerHeight = element.parent()[0].offsetHeight;
			

			// Getting the block size



		}
	}
});