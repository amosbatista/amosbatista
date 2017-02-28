// The directive will insert HTML tags directly into the element
angular.module("site.blog").directive('putHtml', function(){

	return {
		restrict: "A",
		scope: {
			content: '='
		},
		link: function (scope, element){
			element[0].innerHTML = scope.content
				.replace('<p>', '')
				.replace('</p>', '');
		}
	}
});