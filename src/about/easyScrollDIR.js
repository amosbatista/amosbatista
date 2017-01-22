// The directive that set the footer link scroll animation
appWebSite.directive('easyScrollLink', [ function(){

	// The function process to hide the link
	var scrollAndHideProcessFunction = function(scope, element){
		var showElement = true;
		var linkOpacity = 1;
		var animation;

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

			// Activate the transition into this directive when receive the event
			scope.$on ("startEasyScroll", function(){
				scrollAndHideProcessFunction(scope, element);
			});

			// Emit the event at click, to activate to another directives
			element.bind("click", function(clickEvent){
				scope.$emit ('startEasyScroll');
			});
			
		}
	}
}]);



// The page header directive. When receives the 'startEasyScroll', scroll, to hide the element
appWebSite.directive('easyScrollTop', function(){

	return {
		restrict: "A",
		link: function(scope, element){

			var translateY = 1;
			var translateOpac = 0.1;
			var animation; 

			scope.$on ("startEasyScroll", function(){

				animation = setInterval(function (){

					// End of animation
					if(translateY >= window.innerHeight){
						translateY = window.innerHeight;
						clearInterval (animation);
						animation = undefined;
					}

					// Process the values
					else{
						translateY = translateY * 1.2 + 5;
						translateOpac = translateOpac - 0.01;
					}

					element[0].style.transform = 'translate(0px, -' + translateY + 'px)';
					element[0].style.opacity = translateOpac;
				}, 50);
			});
		}
	}
});


// The page content directive. When receives the 'startEasyScroll', scroll and show the element
appWebSite.directive('easyScrollContent', function(){

	return {
		restrict: "A",
		link: function(scope, element){

			var animation; 
			var translateOpac = 0.1;
			var translateY = 175;

			scope.$on ("startEasyScroll", function(){

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
		}
	}
});


// The directive that hold a trigger to activate the easy scroll
appWebSite.directive('easyScroll', function(){

	

	return {
		restrict: "A",
		link: function(scope, element){

			var easyScrollEvent = function(scrollEvent){
				console.log("I'm scrolling");

				if( document.body.scrollTop > 0 ){
					scope.$emit ('startEasyScroll');
				}
			}

			// When load the page, force the scroll to the top
			/*document.removeEventListener("scroll", easyScrollEvent);*/
			document.scrollTop = 0;

			document.addEventListener("scroll", easyScrollEvent, true);

			

		}
	}
});