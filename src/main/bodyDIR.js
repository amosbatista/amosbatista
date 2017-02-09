

// Directive controlls the body style
angular.module("site").directive('body', [
	'$timeout',
	'$location',
	function(
		timeout,
		location
	){

	return {
		restrict: "E",
		link: function(scope, element){

			var scrollDirection;
			var isOccourFirstScroll = false;


			/* Class to hold and detect scroll direction */
			var _scrollDirection = function(initialPosition){

				/*var initialPosition = initialPosition;*/
				return{
					getLastPosition: function(){
						return initialPosition;
					},

					setDirection: function(currentValue){
						var valueToReturn = '';	

						/* Scroll direction */
						if(currentValue > initialPosition) 
							valueToReturn = "down";
						else{

							if(currentValue < initialPosition)
								valueToReturn = "up";
							else
								valueToReturn = "stead";
						}

						initialPosition = currentValue;

						return valueToReturn;
					}
				}
			}


			/* According the page href, change the body style */
			scope.$on('$locationChangeSuccess', function (){

				switch (location.path()){
					case '/about':
						element[0].className = 'body-about-page';
						break;
					default:
						element[0].className = 'body-home-page';
						break;
				}
			});





			/* Manipulation of page scroll events */
			var easyScrollEvent = function(direction){

				switch (direction){
					case "down":
						if( element[0].scrollTop <= 10 ){
							element[0].scrollTop = 60;
							scope.$broadcast ('easyScrollDown');
						}
						break;

					case "up":
						if( element[0].scrollTop <= 5 ){
							element[0].scrollTop = 0;
							scope.$broadcast ('easyScrollUp');
						}
						break;
				}
			}

			// Event to scroll down the page when happen the scroll down
			scope.$on('easyScrollDown', function(){
				element[0].scrollTop = 60;
			});

			scope.$on('easyScrollUp', function(){
				element[0].scrollTop = 0;
			});

			
			/* Header and Footer behavior */
			var footerAndHeaderEvent = function (direction, lastPosition){

				// Indicate to bring the foot upper or not, if user reached the bottom of the screen
				if ((element[0].scrollHeight - element[0].scrollTop == element[0].clientHeight) == true)
					scope.$broadcast ('footerIsRising');
				else{

					// If direction is up and last position was the bottom
					if(direction == "up" && ((element[0].scrollHeight - lastPosition == element[0].clientHeight) == true))
						scope.$broadcast ('footerIsHiding');
				}

			}

			var eventProcessor = function(scrollEvent){

				scrollDirection = scrollDirection || new _scrollDirection(element[0].scrollTop);

				if(isOccourFirstScroll == false){
					isOccourFirstScroll = true;
				}
				else{

					/* Scroll direction */
					var lastPosition = scrollDirection.getLastPosition();
					var direction = scrollDirection.setDirection(element[0].scrollTop);

					easyScrollEvent(direction);
					footerAndHeaderEvent(direction, lastPosition);
				}
			};

			timeout(function(){
				
				/*window.scroll(0,0);*/
				element[0].scrollTop = 0;

				/* The scroll event listener */
				document.addEventListener("scroll", eventProcessor);
				element[0].addEventListener("resize", eventProcessor);

			}, 500);		
			
		}
	}
}]);