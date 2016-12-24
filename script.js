// Comments char list, for the home
var commentComponent = document.getElementById("codeCommentContainer");
var commentCharList = [
	{
		className: 'comment-position-javascript',
		charList: ['/*', '<br>', '*/']
	},
	{
		className: 'comment-position-visual-basic',
		charList: ["'", '<br>', "'"]
	}
]

var charListItem = Math.floor(Math.random() * 2);
commentComponent.innerHTML = commentCharList[charListItem].charList[0] + commentCharList[charListItem].charList[1] + commentCharList[charListItem].charList[2];
commentComponent.className = "show-comment-animated code-comment " + commentCharList[charListItem].className;



/* Arrows animations */
var aboutLink = document.getElementById("linkAbout");
var transitionID = undefined;
var transitionValue = 0;
var accellFactor = 1;

aboutLink.addEventListener("mouseenter", function (mouseEvent){
	
	var icon = mouseEvent.currentTarget.children[0];

	transitionID = setInterval(function(){

		if(accellFactor <= 50)
			accellFactor = accellFactor + 2;
		transitionValue = transitionValue - accellFactor;

		// Return the arrow to above the link
		if(transitionValue < -250)
			transitionValue = 250;

		icon.style.transform = "translate(0px, " + transitionValue + "% )";
	}, 20);
});

aboutLink.addEventListener("mouseleave", function (mouseEvent){
	var icon = mouseEvent.currentTarget.children[0];

	clearInterval(transitionID);

	finishTransitionID = setInterval(function(){

		// Range to end the transition
		if(transitionValue > -10 && transitionValue < 10){
			icon.style.transform = "translate(0px, 0%)";
			clearInterval(finishTransitionID);
			finishTransitionID = undefined;
			accellFactor = 1;
			return;
		}

		if(transitionValue < 0)
			transitionValue = transitionValue + 5;
		else
			transitionValue = transitionValue - 5;

		icon.style.transform = "translate(0px, " + transitionValue + "%)";

	}, 5);

});
