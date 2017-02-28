angular.module("site.blog").factory('tagListSRV',[
	'tagListResource',
	function(
		resource
	){
		return {
			getList: function(){

				return new Promise (function(resolve, reject){
					resource.list(
						{},
						function(dataReturn){

							// Mounting tag structure
							var objTags = dataReturn.reduce( function (processedObject, tag){
								processedObject[tag.slug] = tag.id;
								return processedObject;
							}, {});

							resolve(objTags);
						}
					);
				});
			}
		}
	}
])