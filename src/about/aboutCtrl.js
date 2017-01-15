appWebSite.controller('aboutCtrl', [
	'$scope',
	'$location',
	function(
		scope,
		location

	){
		scope.goHome = function(){
			location.path('/');
		}
	}
])