/*The service is the same of post list, but only get the featured posts*/
angular.module("site.blog").factory('featuredPostListSRV',[
	'postListResource',
	function(
		resource
	){
		return {
			getList: function(filters){

				return new Promise (function(resolve, reject){

					if(filters.currentPage == undefined || filters.currentPage > 1)
						resolve(null);

					var tagList = filters.tagList['featured'];

					resource.list(
						{
							tags: tagList
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