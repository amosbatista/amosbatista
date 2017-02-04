

// Directive controlls the body style
appWebSite.directive('body', [
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

				return function(currentValue){

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
			var easyScrollEvent = function(scrollEvent){

				scrollDirection = scrollDirection || new _scrollDirection(element[0].scrollTop);

				/* Scroll direction */
				var direction = scrollDirection(element[0].scrollTop);

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
			var footerAndHeaderEvent = function (scrollEvent){

				/* Scroll direction */
				var direction = scrollDirection(element[0].scrollTop);

				switch (direction){
					case "down":

						if( (element[0].scrollHeight - element[0].scrollTop) - 10 >= element[0].clientHeight ){
							console.log('Bottom');
						}
						break;

					case "up":
						if( (element[0].scrollHeight - element[0].scrollTop) - 10 >= element[0].clientHeight ){
							console.log('Rose');
						}
						break;
				}
			}

			var eventProcessor = function(scrollEvent){

				if(isOccourFirstScroll == false)
					isOccourFirstScroll = true;
				else{
					easyScrollEvent(scrollEvent);
					footerAndHeaderEvent(scrollEvent);
				}
			};

			timeout(function(){
				
				/*window.scroll(0,0);*/
				element[0].scrollTop = 0;

				/* The scroll event listener */
				document.addEventListener("scroll", eventProcessor);

			}, 500);

			// When load the page, force the scroll to the top
			// document.removeEventListener("scroll", eventProcessor);

			

			
			
		}
	}
}]);