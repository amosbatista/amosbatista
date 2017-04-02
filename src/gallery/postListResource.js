/*angular.module("site.gallery").factory("postListResource", [
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
				isArray: true
			}
		});
	}
]);*/