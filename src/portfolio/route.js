angular.module('site.portfolio').config( [
	'$stateProvider',
	function(
		state
	){

		state

			.state('portfolio', {
				templateUrl: "portfolio.html",
				controller: "portfolioCtrl",
				url: '/portfolio'
			})

			.state('portfolio.masterrow', {
				templateUrl: "masterrow.html",
				controller: "masterrowCtrl",
				url: '/masterrow'
			})

	}
])
