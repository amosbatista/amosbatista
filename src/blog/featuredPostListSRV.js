/*The service is the same of post list, but only get the featured posts*/
angular.module("site.blog").factory('featuredPostListSRV',[
	'postListResource',
	function(
		resource
	){
		return {
			getList: function(filters){

				return new Promise (function(resolve, reject){

					var tagList = filters.tagList['featured'];

					resource.list(
						{
							tags: tagList,
							'_embed': 1, // Bring all media and another embed data into response
						},
						function(dataReturn){
							
							resolve({
								mainImage: dataReturn[0]._embedded["wp:featuredmedia"][0].source_url,
								category: dataReturn[0]._embedded["wp:term"].find( function (termList){
									return termList.find( function(term){
										return term.taxonomy == 'category';	
									});
								})[0].name,
								title: dataReturn[0].title.rendered,
								excerpt: dataReturn[0].excerpt.rendered
									.replace('<p>', '')
									.replace('</p>', ''),
								postName: dataReturn[0].slug,
								id: dataReturn[0].id,
							});
						}
					);
				});
			}
		}
	}
])