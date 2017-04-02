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
				scope.paginationList = pagination(1, scope.totalPages).pagList;

				// Execute the user function to process the function with the page info
				scope.toExecutePagination = function(pageToGo){
					paginationFunction(pageToGo);
					scope.paginationList = pagination(pageToGo, scope.totalPages);
				}
			}
		}
	}
]);