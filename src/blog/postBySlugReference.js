angular.module("site.blog").factory("postBySlugResource", [
	'$resource',
	'env',
	function(
		resource,
		env
	){
		return resource(env.config.wordPressAPIURL + env.config.postBySlug,
		{
			slug: '@postName'
		},
		{
			list: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);