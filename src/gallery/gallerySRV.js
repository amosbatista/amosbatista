angular.module('site.gallery').factory('gallerySRV', [
	'postListResource',
	function(
		resource
	){
		return {
			getList: function(filters){
				return new Promise (function(resolve, reject){
					resource.list(
						{
							tags: filters.tagList['gallery'],
							per_page: 14,
							'_embed': 1 // Bring all media and another embed data into response

						},
						function(dataReturn){

							dataReturn = dataReturn.map(function(post){
								return {
									mainImage: post._embedded["wp:featuredmedia"] != undefined ? post._embedded["wp:featuredmedia"][0].source_url : '',
									category: post._embedded["wp:term"].find( function (termList){
										return termList.find( function(term){
											return term.taxonomy == 'category';	
										});
									})[0].name,
									title: post.title.rendered,
									excerpt: post.excerpt.rendered
										.replace('<p>', '')
										.replace('</p>', ''),
									createdDate: post.date,
									postName: post.slug,
									all: post
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