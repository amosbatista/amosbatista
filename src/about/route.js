angular.module("site.about").config( [
	'$routeProvider',
	function(
		router
	){
		router
			
			.when('/about', {
				templateUrl: "about.html",
				controller: "aboutCtrl"
			})	
	}
])
