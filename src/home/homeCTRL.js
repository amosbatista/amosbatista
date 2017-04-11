angular.module('site.home').controller('homeCtrl', [
	'$scope',
	'$state',
	function(
		scope,
		state
	){
		scope.$emit('toHideLoadScreen');

		scope.goToAboutPage = function(){
			scope.$emit('toShowLoadScreen');
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