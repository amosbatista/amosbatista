angular.module('site.portfolio').config( [
	'$routeProvider',
	function(
		router
	){
		router
			
			.when('/portfolio', {
				templateUrl: "portfolio.html",
				controller: "portfolioCtrl"
			})

			.when('/portfolio/masterrow', {
				templateUrl: "masterrow.html",
				controller: "masterrowCtrl"
			})
	}
])
