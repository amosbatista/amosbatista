
angular.module("site.about").config( [
	'$stateProvider',
	function(
		stateProvider
	){	
		stateProvider

			.state('about', {
				templateUrl: "about.html",
				controller: "aboutCtrl",
				url: '/about'
			})

	}
])
