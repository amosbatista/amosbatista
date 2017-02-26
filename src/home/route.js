angular.module("site.home").config( [
	'$routeProvider',
	function(
		router
	){
		router
			.when('/',{
				templateUrl: "home.html",
				controller: "homeCtrl"
			})

			.otherwise({
				templateUrl: "home.html",
				controller: "homeCtrl"
			})
	}
])
