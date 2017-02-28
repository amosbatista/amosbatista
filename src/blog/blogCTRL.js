angular.module("site.blog").controller("blogCtrl", [
	'$scope',
	'postlist',
	'featuredPosts',
	'subFeaturedPosts',
	function(
		scope,
		postList,
		featured,
		subFeatureds
	){
		console.log('Response of Wordpress from route', postList);
		console.log('Featured', featured);
		console.log('Sub-Featured', subFeatureds);

		scope.featured = featured;
		scope.subFeatured_1 = subFeatureds[1];	
		scope.subFeatured_2 = subFeatureds[2];	

		scope.postList = postList;
	}
])