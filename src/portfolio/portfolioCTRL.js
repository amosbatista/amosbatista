angular.module('site.portfolio').controller('portfolioCtrl', [
	"$scope",
	function(scope){
		scope.$emit('toHideLoadScreen');
	}
]);