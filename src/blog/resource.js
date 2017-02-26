angular.module("site.blog").factory("wpGeneralResource", [
	'$resource',
	'env',
	function(
		resource,
		env
	){
		return resource(env.config.wordPressAPIURL);
	}
]);