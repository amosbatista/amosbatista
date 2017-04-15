angular.module("common.shareButtons").directive("shareButtons", function(){

	return{
		restrict: "E",
		templateUrl: "_shareButton.html",
		replace: true,
		scope: {
			shareOptions: "="
		},
		link: function (scope, element){

			// Linkedin
			scope.linkedinShareLink = 'https://www.linkedin.com/shareArticle?'
				+ 'mini=true&'
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

});
