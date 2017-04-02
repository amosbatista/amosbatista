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
					postlist: ['postListService', 'tags', function(service, tags){
						return service.getList({
							currentPage: 0,
							tagList: tags,
							page: 1
						});
					}]
				}
			})

			.state('blogPost', {
				templateUrl: "post.html",
				controller: "postCtrl",
				url: '/blog/:postName',
				resolve: {
					postService: 'postSRV',

					post: ['postService', '$stateParams', function (service, params){
						return service.getPost({
							postName: params.postName
						});
					}]
				}
			})

			
	}
])
