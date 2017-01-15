// The scroll down click. When clicked, emit the 'startEasyScroll' event
appWebSite.directive('easyScroll', [ function(){

	var showElement = true;
	var linkOpacity = 1;
	var animation;

	return {
		restrict: "A",
		link: function(scope, element){
			element.bind("click", function(clickEvent){
				clickEvent.preventDefault();

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


				scope.$emit ('startEasyScroll');
			});
		}
	};

}]);



// The page header directive. When receives the 'startEasyScroll', scroll the element
appWebSite.directive('easyScrollTop', function(){

	var translateY = 1;
	var translateOpac = 0.1;
	var animation; 

	return {
		restrict: "A",
		link: function(scope, element){

			scope.$on ("startEasyScroll", function(){

				animation = setInterval(function (){

					// End of animation
					if(translateY >= window.innerHeight){
						translateY = window.innerHeight;
						clearInterval (animation);
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