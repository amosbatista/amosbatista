angular.module("site.blog").factory('postSRV',[
	'postBySlugResource',
	function(
		resource
	){
		return {
			getPost: function(filters){
				return new Promise (function(resolve, reject){
					resource.list(
						{
							postName: filters.postName,
							'_embed': 1 // Bring all media and another embed data into response
						},
						function(dataReturn){

							resolve({
								mainImage: dataReturn[0]._embedded["wp:featuredmedia"] != undefined ? dataReturn[0]._embedded["wp:featuredmedia"][0].source_url : '',
								category: dataReturn[0]._embedded["wp:term"].find( function (termList){
									return termList.find( function(term){
										return term.taxonomy == 'category';	
									});
								})[0].name,
								title: dataReturn[0].title.rendered,
								excerpt: dataReturn[0].excerpt.rendered,
								createdDate: dataReturn[0].date,
								all: dataReturn[0]
							});
						}
					);
				});
			}
		}
	}
])