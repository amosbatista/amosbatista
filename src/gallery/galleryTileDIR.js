// Directive to tile all posts in a standard 
angular.module('site.gallery').directive('galleryTile', function(){

	return {
		restrict: "E",
		scope: {
			postList: '=',
			processedPostList: "=?"
		},
		templateUrl: '_galleryTile.html',
		link: function (scope, element){

			scope.processedPostList = [];
			
			// Get the size of the screen
			var _containerWidth = element.parent()[0].offsetWidth;
			var _containerHeight = element.parent()[0].offsetHeight;

			// Getting the block size
			var _blockWidth = _containerWidth / 4;
			var _blockHeight = _containerHeight / 5;


			// The mobile algorithm
			var squareTileAlgorithm = function(params){

				// Stop recursion if there's not image to set
				if(params.imageList.length <= 0){
					return;
				}

				var currentImage = params.imageList.pop();

				scope.processedPostList.push({
					mainImage: currentImage.mainImage,
					dimensions: {
						top: 0, 
						left: params.currentX,
						width: params.blockWidth,
						offsetHeight: 100
					}
				});

				console.log(params);

				// Go to the next line, when filled the width
				if(params.currentX + params.blockWidth > params.containerWidth)

					squareTileAlgorithm({
						imageList: params.imageList,
						currentX: 0,
						containerWidth: params.containerWidth,
						blockWidth: params.blockWidth
					})

				else

					squareTileAlgorithm({
						imageList: params.imageList,
						currentX: params.currentX + params.blockWidth,
						containerWidth: params.containerWidth,
						blockWidth: params.blockWidth
					})
			};

			squareTileAlgorithm({
				imageList: scope.postList,
				currentX: 0,
				containerWidth: _containerWidth,
				blockWidth: _blockWidth
			})
		}
	}
});