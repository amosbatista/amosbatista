angular.module("site.blog").controller("blogCtrl", [
	'postlist',
	'featuredPosts',
	'tags',
	'subFeaturedPosts',
	function(
		postList,
		featured,
		tags,
		subFeatured
	){
		console.log('Response of Wordpress from route', postList);
		console.log('Featured', featured);
		console.log('Sub-Featured', subFeatured);
		console.log('Tags', tags);
	
	}
])