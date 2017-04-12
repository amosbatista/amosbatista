angular.module("common.shareButtons").directive("shareButtons", function(){

	return{
		restrict: "E",
		templateUrl: "_shareButton.html",
		replace: true,
		scope: {
			shareOptions: "="
		},
		link: function (scope, element){

			scope.openShare = function(){

			};
		}
	}

});
