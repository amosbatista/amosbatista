// All post list
angular.module("site.blog").factory('postListSRV',[
	'postListResource',
	'dataSRV',
	'env',
	function(
		resource,
		objData,
		configObj
	){
		return {
			getList: function(filters){
				return new Promise (function(resolve, reject){
					resource.list(
						{
							tags: filters.tagList['blog'],
							page: filters.page,
							per_page: configObj.config.postPerPage,
							'_embed': 1 // Bring all media and another embed data into response

						},
						function(dataReturn){
							console.log('DAdos retornados', dataReturn);

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
									createdDate: objData.formatarDataMesExtenso(post.date),
									postName: post.slug,
									maxPages: post.header('X-WP-TotalPages'),
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