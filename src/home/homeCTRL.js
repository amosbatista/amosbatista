angular.module('site.home').controller('homeCtrl', [
	'$scope',
	'$state',
	"$rootScope",
	function(
		scope,
		state,
		root
	){
		scope.$emit('toHideLoadScreen');

		root.ogMetadata = {
			url: window.location.href,
			title: "AmosBatista.com",
			description: "Bem-vindos ao meu site, blog, portfólio e galeria.",
			image: window.location.origin + "/img/print-home.jpg"
		}



		scope.goToAboutPage = function(){
			scope.$emit('toShowLoadScreen');
			state.go('about');
		}

		scope.goToPortfolio = function(){
			scope.$emit('toShowLoadScreen');
			state.go('portfolio');
		}

		scope.goToBlog = function(){
			scope.$emit('toShowLoadScreen');
			state.go('blog');
		}

		scope.goToGallery = function(){
			scope.$emit('toShowLoadScreen');
			state.go('gallery');
		}
	}
])