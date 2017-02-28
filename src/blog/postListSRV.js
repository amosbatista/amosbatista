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
							resolve(dataReturn);
						}
					);
				});
			}
		}
	}
])