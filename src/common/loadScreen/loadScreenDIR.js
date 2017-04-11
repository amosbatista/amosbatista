/* The directive will work with Angular Events:
toToggleLoadScreen - Insert a random text and show the screen.
toHideLoadScreen - Hide the directive*/
angular.module('common.loadScreen').directive("loadScreen", [
	'env',
	function(
		objConfig
	){
		return{
			restrict: "E",
			templateUrl: "loadScreen.html",
			replace: true,
			link: function (scope, element){

				scope.$on('toShowLoadScreen', function(){
					scope.randomMessage = objConfig.config.loadScreenCustomMessages[
						Math.ceil(
							Math.random() * objConfig.config.loadScreenCustomMessages.length
						)
					];

					element[0].classList.add('show-load-screen');
					element[0].classList.remove('hide-load-screen');
				});

				scope.$on('toHideLoadScreen', function(){
					element[0].classList.add('hide-load-screen');
					element[0].classList.remove('show-load-screen');
				});
			}
		}
	}
])