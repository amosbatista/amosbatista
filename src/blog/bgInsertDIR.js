angular.module("site.blog").directive('bgInsert', function(){

	return {
		restrict: "A",
		scope: {
			imageUrl: '='
		},
		link: function (scope, element){
			element[0].style['background-image'] = 'url("' + scope.imageUrl + '")';
		}
	}
});