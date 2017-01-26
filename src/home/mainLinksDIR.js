// Directive to set the transition animation to the icon, at mouse over
appWebSite.directive('mainLink', ['$timeout', function(timeout){


	return {
		templateUrl: '_mainLink.html',
		restrict: "E",
		scope: {
			linkName: '@',
			linkAction: '&'
		},
		

		
		link: function (scope, element){
			var animationLimit = 320;
			var transitionValue = 0;
			var animationID = undefined;
			var linkElement;

			var linkList = [];

			/* All 4 link types */
			linkDefinition = {
				about : {
					id: "linkAbout",
					iconName: "fa-arrow-up",
					transition: function(transitionValue){
						return {
							X: 0, Y: transitionValue
						}
					}
				},

				gallery : {
					id: "linkGallery",
					iconName: "fa-arrow-right",
					transition: function(transitionValue){
						return {
							X: -transitionValue, Y: 0
						}
					}
				},

				blog : {
					id: "linkBlog",
					iconName: "fa-arrow-down",
					transition: function(transitionValue){
						return {
							X: 0, Y: -transitionValue
						}
					}
				},

				portfolio : {
					id: "linkPortfolio",
					iconName: "fa-arrow-left",
					transition: function(transitionValue){
						return {
							X: transitionValue, Y: 0
						}
					}
				},
			};

		
			// Select the definition set by the name, in the HTML page
			scope.linkId = linkDefinition[scope.linkName].id;
			scope.faIconName = linkDefinition[scope.linkName].iconName;
			var _transitionComponent = linkDefinition[scope.linkName].transition;

			// Get the all link, to the fade effect		
			timeout(function () {
			    linkList.push(document.getElementById(linkDefinition.about.id));
				linkList.push(document.getElementById(linkDefinition.gallery.id));
				linkList.push(document.getElementById(linkDefinition.blog.id));
				linkList.push(document.getElementById(linkDefinition.portfolio.id));		
			});

			/* Animation Process*/
			element.on('mouseenter', function (event){

				// Start of process
				var accellFactor = 1;
				transitionValue = 0;

				linkElement = document.getElementById (scope.linkId);

				

				animationID = setInterval(function(){

					if(accellFactor <= 50)
						accellFactor = accellFactor + 0.3;
					transitionValue = transitionValue - accellFactor;

					// Return the arrow to above the link
					if(transitionValue < -animationLimit)
						transitionValue = animationLimit;

					var transitionObj = _transitionComponent(transitionValue);

					// Translate the icon elements (there's 2, because gallery has another position)
					linkElement.children[0].style.transform = "translate( " + transitionObj.X + "%, " + transitionObj.Y + "% )";
					linkElement.children[2].style.transform = "translate( " + transitionObj.X + "%, " + transitionObj.Y + "% )";
					
				}, 15);	

			});

			element.on('mouseleave', function (event){

				clearInterval(animationID);
				animationID = undefined;

				transitionValue = animationLimit;

				finishTransitionID = setInterval(function(){

					transitionValue = transitionValue - 10;
					transitionObj = _transitionComponent(transitionValue);

					// Range to end the transition
					if(transitionValue > -10 && transitionValue < 10){
						linkElement.children[0].style.transform = "translate(0%, 0%)";
						clearInterval(finishTransitionID);

						finishTransitionID = undefined;
						return;
					}

					linkElement.children[0].style.transform = "translate(" + transitionObj.X + "%, " + transitionObj.Y + "%)";
					linkElement.children[2].style.transform = "translate(" + transitionObj.X + "%, " + transitionObj.Y + "%)";

				}, 12);
			});

			/* Fade links process */
			element.on('mouseenter', function (event){

				linkList.forEach(function(link){

					if(link.id != event.currentTarget.children[0].id)
						link.classList.add("home-fade-to-white");
					
				});
			});

			element.on('mouseleave', function (event){

				linkList.forEach(function(link){
					link.classList.remove("home-fade-to-white");
				});
			});

			/* Function to execute the process insert into the directive*/
			scope.executeAction = function(){
				/*element[0].preventDefault();*/
				scope.linkAction();
			}

			scope.$on("$destroy", function(event){
				clearInterval(animationID);
				animationID = undefined;
			});
		}
	}
}]);