angular.module("site.blog").factory('postListSRV',[
	'postListResource',
	function(
		resource
	){
		return {
			getList: function(filters){

				return new Promise (function(resolve, reject){
					resource.list(
						{},
						function(dataReturn){
							resolve(dataReturn);
						}
					);
				});
			}
		}
	}
])