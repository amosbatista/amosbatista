// Directive to set a random animated background
appWebSite.directive('animatedBg', ['$timeout', function(timeout){

	return{
		
		templateUrl: '_animatedBG.html',
		restrict: "A",

		
		link: function (scope, element){
			var theCanvas;
			var context;
			var animation;

			// On load, ge the elements and generate the animation
			timeout(function(){
				theCanvas = element.find('canvas')[0];
				context = theCanvas.getContext ("2d");

				animation = pointsToCenter(element[0], theCanvas, context);
				animation.start();
			})

			window.addEventListener('resize', function(event){
				animation.stopAndClear();
				animation.start();
			});

			var pointsToCenter = function(container, theCanvas, context){
				
				var animationID = undefined;
				var limits;
				

				/* Helpers*/
				/* Receives: {
					context: the context object,
					point: the point coordinate
					X: coordinate,
					Y: coordinate
				}*/
				var drawPoint = function(paramethers){

					// Drawing the shape
					paramethers.context.beginPath();
					paramethers.context.arc(paramethers.point.X, paramethers.point.Y, 1, 0,2*Math.PI);
					paramethers.context.strokeStyle = paramethers.point.color;
					paramethers.context.stroke();
				};

				/* Clear all the canvas*/
				var clearAll = function(_context, _limits, _animationID){
					clearInterval(_animationID);
					_animationID = undefined;
					_context.clearRect(0, 0, _limits.canvasWidth, _limits.canvasHeight);
				};

				// The point structure
				var pointObj = function (X, Y, direction, color){
					var _X = X;
					var _Y = Y;

					return {
						X: _X,
						Y: _Y,
						direction: direction,
						color: color
					}
				};


				// Function to generate a point, outside canvas
				var generatePointToStart = function(direction){

					/* Generation color */
					var color = 'hsl(' + Math.floor( Math.random() * 360 ) + ', 50%, 50%)';

					/*var positionIndex = Math.ceil(Math.random() * 3);*/

					switch (direction){
						case 'up': //Up
							var newPoint = pointObj( Math.floor( Math.random() * limits.canvasWidth) , 0, direction, color); break;
						case 'down': //Down
							var newPoint = pointObj( Math.floor(Math.random() * limits.canvasWidth) , limits.canvasHeight , direction, color); break;
						case 'left': //Left
							var newPoint = pointObj(0, Math.floor(Math.random() * limits.canvasHeight), direction, color); break;
						case 'right': // Right
							var newPoint = pointObj(limits.canvasWidth, Math.floor(Math.random() * limits.canvasHeight), direction, color); break;
					}

					
					return newPoint;

				}

				return {
					start: function(){

						// Resizing the canvas to the container limits
						limits = {
							canvasWidth: container.offsetWidth,
							canvasHeight: container.offsetHeight
						}

						/* Main objects and constants*/
						theCanvas.width = limits.canvasWidth;
						theCanvas.height = limits.canvasHeight;

						// Creating the central point
						var centralPoint = pointObj(Math.floor(limits.canvasWidth / 2), Math.floor(limits.canvasHeight / 2));

						// Draw it to the center
						/*drawPoint({
							context: context,
							point: centralPoint
						});*/

						//Generate the points
						var pointList = [];

						pointList.push(generatePointToStart('up'));
						pointList.push(generatePointToStart('down'));
						pointList.push(generatePointToStart('left'));
						pointList.push(generatePointToStart('right'));

						// Start the interaction
						animationID = setInterval( function(){

							// Verify if the point has come to the destiny
							pointList.forEach( function (point){

								if (point.X == centralPoint.X && point.Y == centralPoint.Y){
									var newPoint = generatePointToStart(point.direction);
									point.X = newPoint.X;
									point.Y = newPoint.Y;
									point.color = newPoint.color;
								}

								drawPoint({
									context: context,
									point: point,
								});

								// Recalculate the point
								if(point.X > centralPoint.X)
									point.X --;
								if(point.X < centralPoint.X)
									point.X ++;

								if(point.Y > centralPoint.Y)
									point.Y --;
								if(point.Y < centralPoint.Y)
									point.Y ++;

							});

						}, 5 );
					},

					stopAndClear: function(){

						/* Clear the screen, to generate the animation, again */
						clearAll(context,limits, animationID);
					}				
				}
			}	
		}
	}

}]);