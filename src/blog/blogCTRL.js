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

		scope.featured = featured;
		scope.subFeatured_1 = subFeatureds[0];	
		scope.subFeatured_2 = subFeatureds[1];	

		scope.postList = postList;

		scope.totalPages = postList[0].maxPages;
	}
])