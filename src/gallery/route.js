angular.module("site.gallery").config([
	'$stateProvider',
	function(
		state
	){
		state

			.state('gallery', {
				templateUrl: "gallery.html",
				controller: "galleryCtrl",
				url: '/gallery',
				resolve: {
					tagListService: 'tagListSRV',
					galleryService: 'gallerySRV',
					/*featuredService: 'featuredPostListSRV',
					subFeaturedService: 'subFeaturedPostListSRV',*/

					tags: ['tagListService', function(service){
						return service.getList();
					}],
					
					/*subFeaturedPosts: ['subFeaturedService', 'tags', function(service, tags){
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
					}],*/
					gallery: ['galleryService', 'tags', function(service, tags){
						return service.getList({
							currentPage: 0,
							tagList: tags
						});
					}]
				}
			})

			.state('galleryPost', {
				templateUrl: "galleryPost.html",
				controller: "galleryPostCtrl",
				url: '/gallery/:postName',
				resolve: {
					postService: 'galleryPostSRV',

					post: ['postService', '$stateParams', function (service, params){
						return service.getPost({
							postName: params.postName
						});
					}]
				}
			})			
			
	}
])
