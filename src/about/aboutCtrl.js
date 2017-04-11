angular.module('site.about').controller('aboutCtrl', [
	'$scope',
	'$state',
	function(
		scope,
		state

	){

		scope.$emit('toHideLoadScreen');

		scope.goHome = function(){
			scope.$emit('toShowLoadScreen');
			state.go('home');
		}
	}
])