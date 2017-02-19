angular.module('site.portfolio').directive('smallTabs', function(){

	return {
		templateUrl: '_smallTabs.html',
		restrict: 'E',
		transclude: true,
		replace: true,

		controller: function ($scope){

			$scope.tabList = [];
			$scope.tabList_Before = [];
			$scope.tabList_After = [];
			$scope.currentTabName = '';

			return{
				addTab: function (tabScope){

					if($scope.tabList.length <= 0){
						$scope.currentTabName = tabScope.tabName;
						tabScope.isCurrent = true;
					}

					else{
						tabScope.isCurrent = false;	

						// As this function runs only once, push all tabs to the after list
						$scope.tabList_Before.push (tabScope);
					}
					
					$scope.tabList.push(tabScope);					
				},
				selectTab: function(tabScopeToSelect){

					$scope.tabList_Before = [];
					$scope.tabList_After = [];

					var isSomeTabSelected = false;

					$scope.tabList.forEach( function(scopeItem){

						if(scopeItem.tabName == tabScopeToSelect.tabName){
							scopeItem.isCurrent = true;
							$scope.currentTabName = tabScopeToSelect.tabName;
							isSomeTabSelected = true;
						}
						else{
							scopeItem.isCurrent = false;

							if (isSomeTabSelected == false)
								$scope.tabList_After.push(scopeItem);
							else
								$scope.tabList_Before.push(scopeItem);
						}
					});					
				},
			};
		},
		
	}
});

angular.module('site.portfolio').directive('tabLink', function(){

	return {
		templateUrl: '_tabLink.html',
		restrict: 'E',
		transclude: true,
		replace: true,
		require: "^smallTabs",
		scope: {
			tabName: "@"
		},

		link: function (scope, element, attrs, ctrl){

			element.bind('click', function (event){

				scope.$apply(function (){
					ctrl.selectTab(scope);
				});
			})
		}
		
	}
});



angular.module('site.portfolio').directive('tab', function(){

	return {
		templateUrl: '_tab.html',
		restrict: 'E',
		require: "^smallTabs",
		transclude: true,
		replace: true,
		scope: {
			tabName: "@"
		},

		link: function (scope, element, attrs, ctrl){
			ctrl.addTab(scope);
		}
	}
});