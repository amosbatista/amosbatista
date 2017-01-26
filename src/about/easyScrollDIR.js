/* The directive that set the footer link scroll animation
 Angular events:
 easyScrollDown - When user scroll the page down 
 easyScrollUp - When user scroll up
*/

appWebSite.directive('easyScrollContentLink', [ function(){

	// The function process to show the link
	var scrollAndShowProcessFunction = function(scope, element, animation){
		var showElement = true;
		var linkOpacity = 0;
		var animation;
		

		// Clear the animation, if there's some activated
		clearInterval (animation);

		element[0].style.display = 'block';

		// Hide the link
		animation = setInterval(function (){

			// Animation end
			if(linkOpacity > 1 ){
				linkOpacity = 1;
				clearInterval (animation);
			}

			// Setup transition
			else{
				linkOpacity = Number((linkOpacity + 0.2).toFixed(2));
			}

			element[0].children[0].style.opacity = linkOpacity;

		}, 25);
	}


	// The function process to hide the link
	var scrollAndHideProcessFunction = function(scope, element, animation){
		var showElement = true;
		var linkOpacity = 1;
		

		// Clear the animation, if there's some activated
		clearInterval (animation);

		// Hide the link
		animation = setInterval(function (){

			// Animation end
			if(linkOpacity <= 0 ){
				linkOpacity = 0;
				element[0].style.display = 'none';
				clearInterval (animation);
			}

			// Setup transition
			else{
				linkOpacity = (linkOpacity - 0.2).toFixed(2);
			}

			element[0].children[0].style.opacity = linkOpacity;

		}, 25);
		
	}

	return {
		restrict: "A",
		link: function(scope, element){

			var animation;

			// Activate the transition into this directive when receive the event
			scope.$on ("easyScrollDown", function(){
				scrollAndHideProcessFunction(scope, element, animation);
			});

			scope.$on ("easyScrollUp", function(){
				scrollAndShowProcessFunction(scope, element, animation);
			});

			// Emit the event at click, to activate to another directives
			element.bind("click", function(clickEvent){
				scope.$emit ('easyScrollDown');
			});
			
		}
	}
}]);

/*appWebSite.directive('easyScrollTopLink', [ function(){

	// The function process to hide the link
	var scrollAndShowProcessFunction = function(scope, element){
		var showElement = true;
		var linkOpacity = 0;
		var animation;
		

		// Clear the animation, if there's some activated
		clearInterval (animation);

		element[0].style.display = 'block';

		// Hide the link
		animation = setInterval(function (){

			// Animation end
			if(linkOpacity > 1 ){
				linkOpacity = 1;
				clearInterval (animation);
			}

			// Setup transition
			else{
				linkOpacity = Number((linkOpacity + 0.2).toFixed(2));
			}

			element[0].children[0].style.opacity = linkOpacity;

		}, 25);
		
	}

	return {
		restrict: "A",
		link: function(scope, element){

			// Activate the transition into this directive when receive the event
			scope.$on ("easyScrollDown", function(){
				scrollAndShowProcessFunction(scope, element);
			});

			// Emit the event at click, to activate to another directives
			element.bind("click", function(clickEvent){
				scope.$emit ('easyScrollUp');
			});
			
		}
	}
}]);*/



// The page header directive. When receives the 'easyScrollDown', scroll, to hide the element
appWebSite.directive('easyScrollTop', function(){

	return {
		restrict: "A",
		link: function(scope, element){

			scope.$on ("easyScrollDown", function(){
				var translateY = 1;
				//var translateYLimit = window.innerHeight
				var translateYLimit = 200;
				var translateOpac = 0.9;

				var animation; 

				animation = setInterval(function (){

					// End of animation
					if(translateY >= translateYLimit){
						translateY = translateYLimit;
						clearInterval (animation);
						animation = undefined;
					}

					// Process the values
					else{
						translateY = translateY * 1.2 + 5;
						translateOpac = translateOpac - 0.07;
					}

					element[0].style.transform = 'translate(0px, -' + translateY + 'px)';
					element[0].style.opacity = translateOpac;
				}, 20);
			});

			scope.$on ("easyScrollUp", function(){
				var translateY = 200;
				var translateYLimit = 1;
				var translateOpac = 0;
			
				var animation; 

				animation = setInterval(function (){

					// End of animation
					if(translateY <= translateYLimit){
						translateY = translateYLimit;
						clearInterval (animation);
						animation = undefined;
					}

					// Process the values
					else{
						translateY = translateY / 1.2 - 5;
						translateOpac = translateOpac + 0.07;
					}

					element[0].style.transform = 'translate(0px, -' + translateY + 'px)';
					element[0].style.opacity = translateOpac;
				}, 20);
			});
		}
	}
});


// The page content directive. When receives the 'easyScrollDown', scroll and show the element
appWebSite.directive('easyScrollContent', function(){

	return {
		restrict: "A",
		link: function(scope, element){
			
			scope.$on ("easyScrollDown", function(){
				var animation; 
				var translateOpac = 0.1;
				var translateY = 175;

				animation = setInterval(function (){

					// Animation end
					if( translateY <= -75 ){
						translateOpac = 1;
						/*translateY = 0;*/
						clearInterval(animation);
						animation = undefined;
					}

					// Animation process
					else{
						translateOpac = translateOpac + 0.4;
						translateY = translateY - 50;
					}

					// Transition set
					element[0].style.transform = 'translateY(' + translateY + 'px)';
					element[0].style.opacity = translateOpac;

				}, 50);
			});

			scope.$on ("easyScrollUp", function(){
				var animation; 
				var translateOpac = 1;
				var translateY = 0;

				animation = setInterval(function (){

					// Animation end
					if( translateY >= 175 ){
						translateOpac = 0;
						/*translateY = 0;*/
						clearInterval(animation);
						animation = undefined;
					}

					// Animation process
					else{
						translateOpac = translateOpac - 0.4;
						translateY = translateY + 50;
					}

					// Transition set
					element[0].style.transform = 'translateY(' + translateY + 'px)';
					element[0].style.opacity = translateOpac;

				}, 50);
			});
		}
	}
});


// The directive that hold a trigger to activate the easy scroll
appWebSite.directive('easyScroll', function(){

	

	return {
		restrict: "A",
		link: function(scope, element){
			var lastScrollPosition = 0;

			var easyScrollEvent = function(scrollEvent){

				/* Scroll direction */
				if(document.body.scrollTop > lastScrollPosition){ // Down

					if( document.body.scrollTop <= 10 ){
						document.scrollTop = 40;
						scope.$emit ('easyScrollDown');
					}

				}
				else{

					if(document.body.scrollTop < lastScrollPosition){ // U

						if( document.body.scrollTop <= 20 ){
							document.scrollTop = 0;
							scope.$emit ('easyScrollUp');
						}

					}
					
				}

				lastScrollPosition = document.body.scrollTop;

			}

			// When load the page, force the scroll to the top
			/*document.removeEventListener("scroll", easyScrollEvent);*/
			document.scrollTop = 0;

			document.addEventListener("scroll", easyScrollEvent, true);

			

		}
	}
});