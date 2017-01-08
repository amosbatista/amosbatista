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
	}
])
