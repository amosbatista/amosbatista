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

			
			
	}
])
