angular.module("site.gallery").directive('dinamicAbsolute', function(){

	return {
		restrict: "A",
		scope: {

			/* Main object: {
				top: 0px, 
				left: 0px, 
				width: 0px,
				height: 0px;
			}*/
			dimensions: '='
		},
		link: function (scope, element){
			element[0].style.position = 'absolute';
			element[0].style.top = scope.top + 'px';
			element[0].style.left = scope.left + 'px';
			element[0].style.width = scope.width + 'px';
			element[0].style.height = scope.height + 'px';

		}
	}
});