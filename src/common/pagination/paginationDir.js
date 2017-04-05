angular.module("common.pagination").directive("pagination", 
	[
		'paginationSrv',
		function(
			pagination
		){

		return {
			templateUrl: "_pagination.html",
			restrict: "E",
			replace: true,
			scope: {
				totalPages: "=",
				paginationFunction: "="
			},

			link: function(scope, element){
				scope.currentPage = 1;

				scope.paginationList = pagination(scope.currentPage, scope.totalPages).pagList;

				// Execute the user function to process the function with the page info
				scope.toExecutePagination = function(pageToGo){
					pageToGo = Number(pageToGo);
					scope.paginationFunction(pageToGo);
					scope.paginationList = pagination(pageToGo, scope.totalPages).pagList;
					scope.currentPage = pageToGo;
				}
			}
		}
	}
]);