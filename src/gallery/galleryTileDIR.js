// Directive to tile all posts in a standard 
angular.module('site.gallery').directive('galleryTile', function(){

	return {
		restrict: "E",
		scope: {
			postList: '=',
			processedPostList: "=?"
		},
		replace: true,
		templateUrl: '_galleryTile.html',
		link: function (scope, element){

			scope.processedPostList = scope.processedPostList || [];

			// Defining element size
			element.parent()[0].style.height = window.innerHeight + 'px';
			
			// Get the size of the screen
			var _containerWidth = element.parent()[0].offsetWidth;
			var _containerHeight = element.parent()[0].offsetHeight;

			// Getting the block size
			var _blocksPerLine = 5;
			var _blockWidth = _containerWidth / _blocksPerLine;
			var _blockHeight = _containerHeight / _blocksPerLine;



			// The mobile algorithm
			var squareTileAlgorithm = function(params){

				// Stop recursion if there's not image to set
				if(params.imageList.length <= 0){
					return;
				}

				params.amountBlockInLine = params.amountBlockInLine || 0;

				var currentImage = params.imageList.pop();

				scope.processedPostList.push({
					mainImage: currentImage.mainImage,
					dimensions: {
						top: params.currentY, 
						left: params.currentX,
						width: params.blockWidth,
						height: params.blockHeight
					}
				});

				console.log(params);

				// Go to the next line, when filled the width
				if (params.amountBlockInLine >= params.blockPerLine - 1)

					squareTileAlgorithm({
						imageList: params.imageList,
						currentX: 0,
						currentY: params.currentY + params.blockHeight,
						containerWidth: params.containerWidth,
						blockWidth: params.blockWidth,
						blockHeight: params.blockHeight,
						blockPerLine: params.blockPerLine,
						amountBlockInLine: 0

					})

				else

					squareTileAlgorithm({
						imageList: params.imageList,
						currentX: params.currentX + params.blockWidth,
						currentY: params.currentY,
						containerWidth: params.containerWidth,
						blockWidth: params.blockWidth,
						blockHeight: params.blockHeight,
						blockPerLine: params.blockPerLine,
						amountBlockInLine: params.amountBlockInLine + 1
					})
			};

			squareTileAlgorithm({
				imageList: scope.postList,
				currentX: 0,
				currentY: 0,
				containerWidth: _containerWidth,
				blockWidth: _blockWidth,
				blockHeight: _blockHeight,
				blockPerLine: _blocksPerLine
			})
		}
	}
});