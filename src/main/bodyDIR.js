

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

			scope.$on('$locationChangeSuccess', function (){

				// According the page href, change the body style
				switch (location.path()){
					case '/about':
						element[0].className = 'body-about-page';
						break;
					default:
						element[0].className = 'body-home-page';
						break;
				}
			});
			
		}
	}
}]);