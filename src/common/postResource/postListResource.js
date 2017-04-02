angular.module("common.postList", []);

angular.module("common.postList").factory("postListResource", [
	'$resource',
	'env',
	function(
		resource,
		env
	){
		return resource(env.config.wordPressAPIURL + env.config.postList,
		{},
		{
			list: {
				method: 'GET',
				isArray: true,
				transformResponse: function(data, headersGetter, status){
					
					data = JSON.parse(data);

					data.map( function(row){
						row.header = headersGetter;
						return row;
					});

		            return data;
		        }
			}
		});
	}
]);