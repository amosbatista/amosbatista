angular.module("site.gallery").directive('galleryBgInsert', function(){

	return {
		restrict: "A",
		scope: {
			imageUrl: '=',
			bgClass: "="
		},
		link: function (scope, element){
			
			if(scope.imageUrl != undefined)
				element[0].style['background-image'] = 'url("' + scope.imageUrl + '")';

				if(Array.isArray(scope.bgClass)){

					var classList = scope.bgClass.split(' ');

					classList.forEach (function (className){
						element[0].classList.add(className);	
					});
				}

				
		}
	}
});