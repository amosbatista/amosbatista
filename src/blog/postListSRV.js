angular.module("site.blog").factory('postListSRV',[
	'postListResource',
	function(
		resource
	){
		return {
			getList: function(filters){

				return new Promise (function(resolve, reject){
					resource.list(
						{
							'_embed': 1 // Bring all media and another embed data into response
						},
						function(dataReturn){

							dataReturn = dataReturn.map(function(post){
								return {
									mainImage: dataReturn[0]._embedded["wp:featuredmedia"][0].source_url,
									category: dataReturn[0]._embedded["wp:term"].find( function (termList){
										return termList.find( function(term){
											return term.taxonomy == 'category';	
										});
									})[0].name,
									title: dataReturn[0].title.rendered,
									excerpt: dataReturn[0].excerpt.rendered
								}
							});
							
							resolve(dataReturn);
						}
					);
				});
			}
		}
	}
])