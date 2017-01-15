// Directive to set an animation transition, and load a 'comment-like' character group, into the home
appWebSite.directive('commentAnimation', ['$timeout', function(timeout){
	
	return{
		
		templateUrl: '_commentAnimation.html',
		restrict: "E",
		
		link: function (scope, element){
			var commentCharList = [
				{
					className: 'comment-position-javascript',
					charList: ['/*', '<br>', '*/']
				},
				{
					className: 'comment-position-visual-basic',
					charList: ["'", '<br>', "'"]
				}
			];


			// When screen loads, load the characters and insert the style transition
			timeout(function(){
				var charListItem = Math.floor(Math.random() * 2);
				var commentComponent = document.getElementById("codeCommentContainer");
				commentComponent.innerHTML = commentCharList[charListItem].charList[0] + commentCharList[charListItem].charList[1] + commentCharList[charListItem].charList[2];
				commentComponent.className = "show-comment-animated code-comment " + commentCharList[charListItem].className;
			});

		}

	}
	
}]);