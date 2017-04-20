angular.module("common.shareButtons").directive("shareButtons", [
	'LinkedIn',
	function(
		linkedinAPI
	){

		return{
			restrict: "E",
			templateUrl: "_shareButton.html",
			replace: true,
			scope: {
				shareOptions: "="
			},
			link: function (scope, element){

				// Linkedin
				scope.linkedinShare = function(){

					var payload = { 
						content: {
							title: scope.shareOptions.title,
							description: scope.shareOptions.description,
							"submitted-url": window.location.href,
							"submitted-image-url": scope.shareOptions.imageUrl || window.location.origin + "/img/" + scope.shareOptions.imageName

						},
						visibility: { 
							code: "anyone"
						} 
					};

					linkedinAPI.API.Raw("/people/~/shares?format=json")
						.method("POST")
						.body(JSON.stringify(payload))
						.result(function(data){
							console.log("Success", data);
						})
						.error(function(data){
							console.log("Error", data);
						});


				}

				// Facebook
				scope.fbShare = function(){

					FB.ui(
						{
							method: 'share',
					  		href: window.location.href,
					  		title: scope.shareOptions.title,
					  		description: scope.shareOptions.description,
					  		picture: scope.shareOptions.imageUrl || window.location.origin + "/img/" + scope.shareOptions.imageName

						}, 
						function(response){
							//console.log("FB response", response)
						}
					);

				};
			}
		}

	}
]);
