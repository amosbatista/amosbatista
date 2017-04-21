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

					var header = {
						Authorization: 'Bearer ' + linkedinAPI.ENV.auth.anonymous_token
					}

					linkedinAPI.API.Raw("/people/~/shares?format=json")
						.method("POST")
						.header(JSON.stringify(header))
						.body(JSON.stringify(payload))
						.result(function(data){
							console.log("Success", data);
						})
						.error(function(data){
							console.log("Error", data);
						});

				}

				// Linkedin Direct Link
				scope.linkedinShareLink = 'https://www.linkedin.com/cws/share?'
					 + 'url=' + encodeURI(window.location.href) + '&'
					 + 'title=' + encodeURI(scope.shareOptions.title) + '&'
					 + 'summary=' + encodeURI(scope.shareOptions.description) + '&'
					 + 'source=amosBatista.com';

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
