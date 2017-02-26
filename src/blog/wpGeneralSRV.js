angular.module("site.blog").factory('generalSRV',[
	'wpGeneralResource',
	function(
		resource
	){
		return {
			response: function(){

				return new Promise (function(resolve, reject){
					resource.get(
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