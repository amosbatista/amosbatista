angular.module('site.about').controller('aboutCtrl', [
	'$scope',
	'$state',
	'$rootScope',
	function(
		scope,
		state,
		root

	){

		scope.$emit('toHideLoadScreen');
		scope.shareOpt = {
	  		title: 'Sobre o site amosbatista.com',
	  		description: 'Conheça um pouco mais sobre mim e sobre esta página.',
	  		imageName: 'print-about.jpg'
		}

		scope.goHome = function(){
			scope.$emit('toShowLoadScreen');
			state.go('home');
		}
	}
])