angular.module("site.blog").factory('postSRV',[
	'postBySlugResource',
	'dataSRV',
	function(
		resource,
		objData
	){
		return {
			getPost: function(filters){
				return new Promise (function(resolve, reject){
					resource.list(
						{
							slug: filters.postName,
							'_embed': 1 // Bring all media and another embed data into response
						},
						function(dataReturn){

							resolve({
								mainImage: dataReturn[0]._embedded["wp:featuredmedia"] != undefined ? dataReturn[0]._embedded["wp:featuredmedia"][0].source_url : '',
								imageCaption: dataReturn[0]._embedded["wp:featuredmedia"] != undefined || dataReturn[0]._embedded["wp:featuredmedia"][0].caption != undefined ? dataReturn[0]._embedded["wp:featuredmedia"][0].caption.rendered.replace("<p>", "").replace("</p>", "") : '',
								category: dataReturn[0]._embedded["wp:term"].find( function (termList){
									return termList.find( function(term){
										return term.taxonomy == 'category';	
									});
								})[0].name,
								title: dataReturn[0].title.rendered,
								excerpt: dataReturn[0].excerpt.rendered
									.replace('<p>', '')
									.replace('</p>', ''),
								createdDate: objData.formatarDataMesExtenso(post.date),
								content: dataReturn[0].content.rendered,
								/*all: dataReturn[0]*/
							});
						}
					);
				});
			}
		}
	}
])