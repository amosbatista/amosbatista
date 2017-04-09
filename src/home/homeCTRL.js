angular.module('site.home').controller('homeCtrl', [
	'$scope',
	'$state',
	function(
		scope,
		state
	){
		scope.goToAboutPage = function(){
			state.go('about');
		}

		scope.goToPortfolio = function(){
			state.go('portfolio');
		}

		scope.goToBlog = function(){
			state.go('blog');
		}

		scope.goToGallery = function(){
			state.go('gallery');
		}
	}
])