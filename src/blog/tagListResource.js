angular.module("site.blog").factory("tagListResource", [
	'$resource',
	'env',
	function(
		resource,
		env
	){
		return resource(env.config.wordPressAPIURL + env.config.tagList,
		{},
		{
			list: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);