// Directive to set the transition animation to the icon, at mouse over
angular.module('site.home').directive('mainLink', ['$timeout', function(timeout){


	return {
		templateUrl: '_mainLink.html',
		restrict: "E",
		scope: {
			linkName: '@',
			linkAction: '&',
			linkCaption: "@"
		},
		

		
		link: function (scope, element){
			
			var linkList = [];

			/* All 4 link types */
			linkDefinition = {
				about : {
					id: "linkAbout",
					iconName: "fa-arrow-up",
				},

				gallery : {
					id: "linkGallery",
					iconName: "fa-arrow-right",
				},

				blog : {
					id: "linkBlog",
					iconName: "fa-arrow-down",
					
				},

				portfolio : {
					id: "linkPortfolio",
					iconName: "fa-arrow-left",
				},
			};

		
			// Select the definition set by the name, in the HTML page
			scope.linkId = linkDefinition[scope.linkName].id;
			scope.faIconName = linkDefinition[scope.linkName].iconName;
			

			// Get the all link, to the fade effect		
			timeout(function () {
			    linkList.push(document.getElementById(linkDefinition.about.id));
				linkList.push(document.getElementById(linkDefinition.gallery.id));
				linkList.push(document.getElementById(linkDefinition.blog.id));
				linkList.push(document.getElementById(linkDefinition.portfolio.id));		
			});

			/* Fade links process */
			element.on('mouseenter', function (event){

				// Swing effect
				element[0].classList.add("link-swing");

				linkList.forEach(function(link){

					if(link.id != event.currentTarget.children[0].id)
						link.classList.add("home-fade-to-white");
					
				});
			});

			element.on('mouseleave', function (event){

				element[0].classList.remove("link-swing");

				linkList.forEach(function(link){
					link.classList.remove("home-fade-to-white");
				});
			});




			/* Function to execute the process insert into the directive*/
			scope.executeAction = function(){

				setTimeout(function() {
					scope.linkAction();	
				}, (500));
				
				switch (scope.linkName){
					case 'about': 
						element.parent()[0].classList.add('slide-about');
						break;
					case 'portfolio': 
						element.parent()[0].classList.add('slide-portfolio');
						break;
					case 'blog': 
						element.parent()[0].classList.add('slide-blog');
						break;
					case 'gallery': 
						element.parent()[0].classList.add('slide-gallery');
						break;
				}				
			}
		}
	}
}]);