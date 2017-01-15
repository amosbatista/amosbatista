appWebSite.config( [
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
	}
])
