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

				FB.ui(
					{
						method: 'share',
				  		href: window.location.href,
				  		title: scope.shareOptions.title,
				  		description: scope.shareOptions.description,
				  		picture: scope.shareOptions.imageUrl || window.location.origin + "/img/" + scope.shareOptions.imageName

					}, 
					function(response){
						console.log("FB response", response)
					}
				);

			};
		}
	}

});
