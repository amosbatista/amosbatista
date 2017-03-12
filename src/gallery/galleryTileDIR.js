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

			var originalPostlist = scope.postList.slice();

			/* Page orientation detection */
			var detectOrientation = function (){

				if(window.innerWidth <= window.innerHeight)
					return "portrait";
				else
					return "landscape";
			};

			pageOrientation = detectOrientation();

			window.addEventListener("resize", function(){
				pageOrientation = detectOrientation();
			});


			scope.processedPostList = scope.processedPostList || [];


			// Defining container height
			element.parent()[0].style.height = window.innerHeight - 190 + 'px';
			
			// Get the size of the screen
			var _containerWidth = element.parent()[0].offsetWidth;
			var _containerHeight = element.parent()[0].offsetHeight;


			// The mobile algorithm
			var squareTileAlgorithm = function(params){

				// Getting the block size
				params.blockPerLine = params.blockPerLine || 4;
				params.blockWidth = params.blockWidth || params.containerWidth / params.blockPerLine;
				params.blockHeight = params.blockHeight || params.containerHeight / params.blockPerLine;

				// Stop recursion if there's not image to set
				if(params.imageList.length <= 0){
					return;
				}

				params.amountBlockInLine = params.amountBlockInLine || 0;

				var currentImage = params.imageList.pop();

				scope.processedPostList.push({
					mainImage: currentImage.mainImage,
					postName: currentImage.postName,
					dimensions: {
						top: params.currentY, 
						left: params.currentX,
						width: params.blockWidth,
						height: params.blockHeight
					}
				});				

				// Go to the next line, when filled the width
				if (params.amountBlockInLine >= params.blockPerLine - 1)

					squareTileAlgorithm({
						imageList: params.imageList,
						currentX: 0,
						currentY: params.currentY + params.blockHeight,
						containerWidth: params.containerWidth,
						containerHeight: params.containerHeight,
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
						containerHeight: params.containerHeight,
						blockWidth: params.blockWidth,
						blockHeight: params.blockHeight,
						blockPerLine: params.blockPerLine,
						amountBlockInLine: params.amountBlockInLine + 1
					})
			};

			// The Euclidean Tile Algorithm
			/*
				Params: 
					plotArea: {
						point1, point2: {
							x, y: int
						}
					},
					imageList: []
			*/
			var euclideanTileAlgorithm = function(params){

				// Recursion End
				if(params.imageList.length <= 0)
					return;


				var theTileFunction = function (params){

					// Generate 1 or 2
					var randomGenerator = function(){
						//return 1;
						return Math.ceil(Math.random() * 2);
					}

					// Recursion End
					if(params.imageList.length <= 0)
						return null;
					if(params.amtBlocks <= 0)
						return params.plotArea;

					var currentBlock = params.imageList.pop();
					var newPlotArea;
					var newDimension;

					// Verifying if plot area is vertical/horizontal
					if(Math.abs(params.plotArea.point2.y - params.plotArea.point1.y) > Math.abs(params.plotArea.point2.x - params.plotArea.point1.x)){ // Vertical

						if(randomGenerator() == 1){

							newDimension =  {
								top: params.plotArea.point1.y, 
								left: params.plotArea.point1.x,
								width: params.newBlockSize,
								height: params.newBlockSize
							}
							

							newPlotArea =  {
								point1: {
									x: params.plotArea.point1.x,
									y: params.plotArea.point1.y + params.newBlockSize
								},
								point2: {
									x: params.plotArea.point2.x,
									y: params.plotArea.point2.y
								}
							}
						}
						
						else{

							newDimension = {
								top: Math.abs(params.plotArea.point2.y - params.newBlockSize), 
								left: params.plotArea.point1.x,
								width: params.newBlockSize,
								height: params.newBlockSize
							}
							

							newPlotArea = {
								point1: {
									x: params.plotArea.point1.x,
									y: params.plotArea.point1.y
								},
								point2: {
									x: params.plotArea.point2.x,
									y: Math.abs(params.plotArea.point2.y - params.newBlockSize)
								}
							}
						}
					}
					else{ // Horizontal

						if(randomGenerator() == 1){
							newDimension =  {
								top: params.plotArea.point1.y, 
								left: params.plotArea.point1.x,
								width: params.newBlockSize,
								height: params.newBlockSize
							}
							
							newPlotArea = {
								point1: {
									x: params.plotArea.point1.x + params.newBlockSize,
									y: params.plotArea.point1.y
								},
								point2: {
									x: params.plotArea.point2.x,
									y: params.plotArea.point2.y
								}
							}
						}
						
						else{
							newDimension = {
								top: params.plotArea.point1.y, 
								left: Math.abs(params.plotArea.point2.x - params.newBlockSize),
								width: params.newBlockSize,
								height: params.newBlockSize
							}

							newPlotArea = {
								point1: {
									x: params.plotArea.point1.x,
									y: params.plotArea.point1.y
								},
								point2: {
									x: Math.abs(params.plotArea.point2.x - params.newBlockSize),
									y: params.plotArea.point2.y
								}
							}
						}
					}

					var plotArea = Math.abs(params.plotArea.point1.x - params.plotArea.point2.x) *  Math.abs(params.plotArea.point1.y - params.plotArea.point2.y);
					var originalPlotArea = Math.abs(params.originalPlotArea.point1.x - params.originalPlotArea.point2.x) *  Math.abs(params.originalPlotArea.point1.y - params.originalPlotArea.point2.y);
					var scaleSize;
					var currentScalePercentage = plotArea * 100 / originalPlotArea;
					
					switch (true){
						case (currentScalePercentage < 1): scaleSize = 5; break;
						case (currentScalePercentage < 3): scaleSize = 4; break;
						case (currentScalePercentage < 5): scaleSize = 3; break;
						case (currentScalePercentage < 8): scaleSize = 2; break;
						case (currentScalePercentage < 10): scaleSize = 1; break;
						default: scaleSize = 0; break;
					}

					scope.processedPostList.push({
						postName: currentBlock.postName,
						mainImage: currentBlock.mainImage,
						dimensions: newDimension,
						class: 'eucld-alg-hoverEffect scale-size-' + scaleSize // Hover transition
					});

					// The Recursive call
					return theTileFunction({
						amtBlocks: params.amtBlocks - 1,
						newBlockSize: params.newBlockSize,
						imageList: params.imageList,
						plotArea: newPlotArea,
						originalPlotArea: params.originalPlotArea
					});

				}

				// How many interaction we had
				params.originalPlotArea = params.originalPlotArea || params.plotArea;

				var amtBlocks;
				var newBlockSize;

				if((params.plotArea.point2.x - params.plotArea.point1.x) > (params.plotArea.point2.y - params.plotArea.point1.y)){
					amtBlocks = Math.floor((params.plotArea.point2.x - params.plotArea.point1.x) / (params.plotArea.point2.y - params.plotArea.point1.y));
					newBlockSize = Math.abs(params.plotArea.point2.y - params.plotArea.point1.y);
				}
				else{
					amtBlocks = Math.floor((params.plotArea.point2.y - params.plotArea.point1.y) / (params.plotArea.point2.x - params.plotArea.point1.x));
					newBlockSize = Math.abs(params.plotArea.point2.x - params.plotArea.point1.x);
				}
					
				//var newBlockSize = (params.plotArea.point2.x - params.plotArea.point1.x) % (params.plotArea.point2.y - params.plotArea.point1.y);
				

				var newPlotArea = theTileFunction({
					amtBlocks: amtBlocks,
					newBlockSize: newBlockSize,
					imageList: params.imageList,
					plotArea: params.plotArea, 
					originalPlotArea: params.originalPlotArea
				});

				euclideanTileAlgorithm({
					plotArea: newPlotArea,
					imageList: params.imageList,
					originalPlotArea: params.originalPlotArea
				});

			}

			// Algorith decision
			if(_containerWidth > 700 && _containerHeight > 400){

				euclideanTileAlgorithm({
					plotArea: {
						point1: {
							x: 0, y: 0,
						},
						point2: {
							x: _containerWidth, y: _containerHeight,
							//x: 1920, y: 1080,
						}
					},
					imageList: scope.postList
				});	
			}

			else{

				squareTileAlgorithm({
					imageList: scope.postList,
					currentX: 0,
					currentY: 0,
					containerWidth: _containerWidth,
					containerHeight: _containerHeight
				})	
			}

			

			

			window.addEventListener("resize", function(){

				scope.processedPostList = [];

				/*scope.$digest();*/

				var postList = originalPostlist.slice();

				var _containerWidth = element.parent()[0].offsetWidth;
				var _containerHeight = element.parent()[0].offsetHeight;

				if(_containerWidth > 700 && _containerHeight > 400){

					euclideanTileAlgorithm({
						plotArea: {
							point1: {
								x: 0, y: 0,
							},
							point2: {
								x: _containerWidth, y: _containerHeight,
								//x: 1920, y: 1080,
							}
						},
						imageList: postList
					});	
				}

				else{

					squareTileAlgorithm({
						imageList: postList,
						currentX: 0,
						currentY: 0,
						containerWidth: _containerWidth,
						containerHeight: _containerHeight
					})	
				}

				scope.$digest();
			});
		}
	}
});