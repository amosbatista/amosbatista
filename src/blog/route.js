angular.module("site.blog").config([
	'$stateProvider',
	function(
		state
	){
		state

			.state('blog', {
				templateUrl: "blog.html",
				controller: "blogCtrl",
				url: '/blog'
			})
	}
])
