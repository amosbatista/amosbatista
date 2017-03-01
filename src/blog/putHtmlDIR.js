// The directive will insert HTML tags directly into the element
angular.module("site.blog").directive('putHtml', function(){

	return {
		restrict: "A",
		scope: {
			content: '='
		},
		link: function (scope, element){
			if(scope.content == undefined)
				element[0].innerHTML = '';
			else
				element[0].innerHTML = scope.content;
		}
	}
});