angular.module('site.about').controller('aboutCtrl', [
	'$scope',
	'$state',
	function(
		scope,
		state

	){
		scope.goHome = function(){
			state.go('home');
		}
	}
])