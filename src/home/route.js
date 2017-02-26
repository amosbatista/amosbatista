angular.module("site.home").config( [
	'$stateProvider',
	'$urlRouterProvider',
	function(
		stateProvider,
		urlRouter
	){	
		
		urlRouter.otherwise('/home');

		stateProvider

			.state('home', {
				templateUrl: "home.html",
				controller: "homeCtrl",
				url: '/home'
			})
	}
])
