/* The directive that set the footer link scroll animation
 Angular events:
 easyScrollDown - When user scroll the page down 
 easyScrollUp - When user scroll up
*/
angular.module('common.easyScroll', []);
angular.module('common.easyScroll').directive('easyScrollContentLink', [ function(){

	// The function process to show the link
	var scrollAndShowProcessFunction = function(scope, element){
		
		element[0].classList.add('swing-link');
	}


	// The function process to hide the link
	var scrollAndHideProcessFunction = function(scope, element){
		element[0].classList.remove('swing-link');
	}

	return {
		restrict: "A",
		link: function(scope, element){

			element[0].classList.add('easy-scroll-link');		

			// Activate the transition into this directive when receive the event
			scope.$on ("easyScrollDown", function(){
				scrollAndHideProcessFunction(scope, element);
			});

			scope.$on ("easyScrollUp", function(){
				scrollAndShowProcessFunction(scope, element);
			});

			// Emit the event at click, to activate to another directives
			element.bind("click", function(clickEvent){
				scope.$emit ('easyScrollDown');
			});
			
		}
	}
}]);




// The page header directive. When receives the 'easyScrollDown', scroll, to hide the element
angular.module('common.easyScroll').directive('easyScrollTop', function(){

	return {
		restrict: "A",
		link: function(scope, element){

			scope.$on ("easyScrollDown", function(){
				element[0].classList.add('easy-scroll-title');
			});

			scope.$on ("easyScrollUp", function(){
				element[0].classList.remove('easy-scroll-title');
			});
		}
	}
});


// The page content directive. When receives the 'easyScrollDown', scroll and show the element
angular.module('common.easyScroll').directive('easyScrollContent', function(){

	return {
		restrict: "A",
		link: function(scope, element){
			

			scope.$on ("easyScrollDown", function(){
				element[0].classList.add('easy-scroll-content');
			});

			scope.$on ("easyScrollUp", function(){
				element[0].classList.remove('easy-scroll-content');
			});
		}
	}
});