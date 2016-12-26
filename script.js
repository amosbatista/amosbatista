// Comments char animation, for the home
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
/* Set a fade-in effect to another links who not hover
*/
var _fadeOtherLinks = function (linkList){

	return function(hoveredLink){

		linkList.forEach(function(link){

			if(link != hoveredLink){

				if(hoveredLink == undefined)
					link.classList.remove("home-fade-to-white");
				else
					link.classList.add("home-fade-to-white");
			}

			else
				link.classList.remove("home-fade-to-white");
		});
	}	
}

/* Receives a function, set the obj translation. 
This must receives the transition value, and must return a {X, Y} object*/
var mainLinkAnimation = function(){

	var lastElement = undefined;
	var animationLimit = 320;
	var transitionValue = 0;
	var _transitionComponent = undefined;
	var finishTransitionID = undefined;
	var animationID = undefined;

	return {

		start: function (spanElement, transitionComponent){

			// Check an occourring animation.
			if( animationID != undefined || finishTransitionID != undefined )
				return;

			lastElement = spanElement;
			_transitionComponent = transitionComponent;

			// Start of process
			var accellFactor = 1;

			animationID = setInterval(function(){

				if(accellFactor <= 50)
					accellFactor = accellFactor + 0.3;
				transitionValue = transitionValue - accellFactor;

				// Return the arrow to above the link
				if(transitionValue < -animationLimit)
					transitionValue = animationLimit;

				var transitionObj = _transitionComponent(transitionValue);

				spanElement.style.transform = "translate( " + transitionObj.X + "%, " + transitionObj.Y + "% )";
				
				
			}, 15);
		},

		// At same time the process is rolling, return a function, that allows to stop the process
		stop: function(){

			// Check an occourring animation.
			if( finishTransitionID != undefined || lastElement == undefined )
				return;

			clearInterval(animationID);
			animationID = undefined;

			transitionValue = animationLimit;

			finishTransitionID = setInterval(function(){

				transitionValue = transitionValue - 10;
				transitionObj = _transitionComponent(transitionValue);

				// Range to end the transition
				if(transitionValue > -10 && transitionValue < 10){
					lastElement.style.transform = "translate(0%, 0%)";
					clearInterval(finishTransitionID);

					finishTransitionID = undefined;
					lastElement = undefined;
					return;
				}

				lastElement.style.transform = "translate(" + transitionObj.X + "%, " + transitionObj.Y + "%)";

			}, 12);
		}

	}
}

var linksDOMObjects = [
	document.getElementById("linkAbout"),
	document.getElementById("linkGallery"),
	document.getElementById("linkBlog"),
	document.getElementById("linkPortfolio")
];

var animationObj = mainLinkAnimation();
var fadeOtherLinks = _fadeOtherLinks(linksDOMObjects);





linksDOMObjects[0].addEventListener("mouseenter", function (mouseEvent){

	animationObj.start(mouseEvent.currentTarget.children[0], function(transitionValue){

		return {
			X: 0, Y: transitionValue
		}

	});
	fadeOtherLinks(linksDOMObjects[0]);
});
linksDOMObjects[0].addEventListener("mouseleave", function (mouseEvent){
	animationObj.stop();
	fadeOtherLinks();
});


linksDOMObjects[1].addEventListener("mouseenter", function (mouseEvent){
	/* The children array changes, because the position in HTML code is different*/
	animationObj.start(mouseEvent.currentTarget.children[1], function(transitionValue){

		return {
			X: -transitionValue, Y: 0
		}

	});
	fadeOtherLinks(linksDOMObjects[1]);
});
linksDOMObjects[1].addEventListener("mouseleave", function (mouseEvent){
	animationObj.stop();
	fadeOtherLinks();
});


linksDOMObjects[2].addEventListener("mouseenter", function (mouseEvent){
	/* The children array changes, because the position in HTML code is different*/
	animationObj.start(mouseEvent.currentTarget.children[1], function(transitionValue){

		return {
			X: 0, Y: -transitionValue
		}

	});
	fadeOtherLinks(linksDOMObjects[2]);
});
linksDOMObjects[2].addEventListener("mouseleave", function (mouseEvent){
	animationObj.stop();
	fadeOtherLinks();
});

linksDOMObjects[3].addEventListener("mouseenter", function (mouseEvent){
	/* The children array changes, because the position in HTML code is different*/
	animationObj.start(mouseEvent.currentTarget.children[0], function(transitionValue){

		return {
			X: transitionValue, Y: 0
		}

	});
	fadeOtherLinks(linksDOMObjects[3]);
});
linksDOMObjects[3].addEventListener("mouseleave", function (mouseEvent){
	animationObj.stop();
	fadeOtherLinks();
});



/* Canvas animation */
var animatedBG = function(){
	var theCanvas = document.getElementById("animatedBG");
	var canvasContainer = document.getElementById("animatedBGContainer");
	var context = theCanvas.getContext ("2d");
	
	// Resizing the canvas to the container limits
	var limits = {
		canvasWidth: canvasContainer.offsetWidth,
		canvasHeight: canvasContainer.offsetHeight
	}

	/* Helpers*/
	/* Receives: {
		context: the context object,
		point: the point coordinate
		X: coordinate,
		Y: coordinate
	}*/
	var drawPoint = function(paramethers){

		// Drawing the shape
		paramethers.context.beginPath();
		paramethers.context.arc(paramethers.point.X, paramethers.point.Y, 1, 0,2*Math.PI);
		paramethers.context.stroke();
	};

	// The point structure
	var pointObj = function (X, Y){
		var _X = X;
		var _Y = Y;

		return {
			X: _X,
			Y: _Y
		}
	};


	// Function to generate a point, outside canvas
	var generatePointToStart = function(limits){

		var positionIndex = Math.ceil(Math.random() * 3);

		switch (positionIndex){
			case 0: //Up
				var newPoint = pointObj( Math.floor( Math.random() * limits.canvasWidth) , 0); break;
			case 1: //Down
				var newPoint = pointObj( Math.floor(Math.random() * limits.canvasWidth) , limits.canvasHeight); break;
			case 2: //Left
				var newPoint = pointObj(0, Math.floor(Math.random() * limits.canvasHeight)); break;
			case 3: // Right
				var newPoint = pointObj(limits.canvasWidth, Math.floor(Math.random() * limits.canvasHeight)); break;
		}
		
		return newPoint;

	}

	

	/* Main objects and constants*/
	theCanvas.width = limits.canvasWidth;
	theCanvas.height = limits.canvasHeight;

	// Creating the central point
	var centralPoint = pointObj(Math.floor(limits.canvasWidth / 2), Math.floor(limits.canvasHeight / 2));

	// Draw it to the center
	drawPoint({
		context: context,
		point: centralPoint
	});

	//Generate the points
	var pointList = [];

	pointList.push(generatePointToStart(limits));

	// Start the interaction
	animationID = setInterval( function(){

		// Verify if the point has come to the destiny
		pointList.forEach( function (point, index, theArray){

			if (point.X == centralPoint.X && point.Y == centralPoint.Y){
				var newPoint = generatePointToStart(limits);
				point.X = newPoint.X;
				point.Y = newPoint.Y;
			}

			drawPoint({
				context: context,
				point: point
			});

			// Recalculate the point
			if(point.X > centralPoint.X)
				point.X --;
			if(point.X < centralPoint.X)
				point.X ++;

			if(point.Y > centralPoint.Y)
				point.Y --;
			if(point.Y < centralPoint.Y)
				point.Y ++;

		});

	}, 5 );



	

	/*var C_LIMITS = {
		X: 500,
		Y: 500
	}

	drawCircle ({
		context: context,
		X: 10,
		Y: 20
	});

	drawCircle ({
		context: context,
		X: 10,
		Y: 30
	});

	drawCircle ({
		context: context,
		X: 499,
		Y: 499
	});*/

	

};


animatedBG();