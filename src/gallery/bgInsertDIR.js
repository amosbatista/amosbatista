angular.module("site.gallery").directive('galleryBgInsert', function(){

	return {
		restrict: "A",
		scope: {
			imageUrl: '='
		},
		link: function (scope, element){
			
			if(scope.imageUrl != undefined)
				element[0].style['background-image'] = 'url("' + scope.imageUrl + '")';
		}
	}
});