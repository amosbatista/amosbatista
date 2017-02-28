/*The service is the same of post list, but only get the sub-featured 
(if page orientation is landscape) posts*/
angular.module("site.blog").factory('subFeaturedPostListSRV',[
	'postListResource',
	function(
		resource
	){
		return {
			getList: function(filters){

				return new Promise (function(resolve, reject){

					if(filters.currentPage == undefined || filters.currentPage > 1)
						resolve(null);

					

					if(window.innerWidth > window.innerHeight)
						return (null);


					var tagList = filters.tagList['sub-featured'];

					resource.list(
						{
							tags: tagList,
							'_embed': 1 // Bring all media and another embed data into response
						},
						function(dataReturn){
							resolve(dataReturn);
						}
					);
				});
			}
		}
	}
])