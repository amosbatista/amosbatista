angular.module('site.portfolio').controller('portfolioCtrl', [
	"$scope",
	function(scope){
		scope.$emit('toHideLoadScreen');
	}
]);

angular.module('site.portfolio').controller('masterrowCtrl', [
	'$scope',
	function(scope){
		scope.$emit('toHideLoadScreen');
	}
])