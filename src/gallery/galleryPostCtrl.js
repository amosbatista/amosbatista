angular.module("site.gallery").controller("galleryPostCtrl", [
	'$scope',
	'post',
	function(
		scope,
		post
	){
		scope.post = post;

		scope.shareOpt = {
	  		title: post.title + " - Galeria - amosbatista.com",
	  		description: post.excerpt,
	  		imageUrl: post.mainImage
		}
	}
])