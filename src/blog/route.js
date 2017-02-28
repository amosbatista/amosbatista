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
					tagListService: 'tagListSRV',
					postListService: 'postListSRV',
					featuredService: 'featuredPostListSRV',
					subFeaturedService: 'subFeaturedPostListSRV',

					tags: ['tagListService', function(service){
						return service.getList();
					}],
					
					subFeaturedPosts: ['subFeaturedService', 'tags', function(service, tags){
						return service.getList({
							currentPage: 0,
							tagList: tags
						});
					}],
					featuredPosts: ['featuredService', 'tags', function(service, tags){
						return service.getList({
							currentPage: 0,
							tagList: tags
						});
					}],
					postlist: ['postListService', function(service){
						return service.getList();
					}]
				}
			})
	}
])
