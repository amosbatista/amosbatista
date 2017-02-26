angular.module("site.blog").config([
	'$stateProvider',
	function(
		state
	){
		state

			.state('blog', {
				templateUrl: "blog.html",
				controller: "blogCtrl",
				url: '/blog',
				resolve: {
					postListService: 'postListSRV',
					postlist: ['postListService', function(service){
						return service.getList();
					}]
				}
			})
	}
])
