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
							tagList: tags
						});
					}],
					featuredPosts: ['featuredService', 'tags', function(service, tags){
						return service.getList({
							tagList: tags
						});
					}],
					postlist: ['postListService', 'tags', 'subFeaturedPosts', 'featuredPosts', function(service, tags, subFeatureds, featureds){
						var _postsToExclude = [];
						_postsToExclude = _postsToExclude.concat(subFeatureds);
						_postsToExclude.push(featureds);

						return service.getList({
							tagList: tags,
							page: 1,
							postsToExclude: _postsToExclude
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
