angular.module("site.blog").controller("postCtrl", [
	'$scope',
	'post',
	function(
		scope,
		post
	){
		scope.shareOpt = {
	  		title: post.title,
	  		description: post.excerpt,
	  		imageUrl: post.mainImage
		}

		scope.post = post;
	}
])