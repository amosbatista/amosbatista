angular.module("site.blog").config([
	'$routeProvider',
	function(
		router
	){
		router
			
			.when('/blog', {
				templateUrl: "blog.html",
				controller: "blogCtrl"
			})
	}
])
