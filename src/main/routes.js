angular.module("site").config( [
	'$routeProvider',
	function(
		router
	){
		router
			.when('/',{
				templateUrl: "home.html",
				controller: "homeCtrl"
			})

			.when('/about', {
				templateUrl: "about.html",
				controller: "aboutCtrl"
			})	

			.when('/portfolio', {
				templateUrl: "portfolio.html",
				controller: "portfolioCtrl"
			})

			.when('/portfolio/masterrow', {
				templateUrl: "masterrow.html",
				controller: "masterrowCtrl"
			})

			.otherwise({
				templateUrl: "home.html",
				controller: "homeCtrl"
			})
	}
])
