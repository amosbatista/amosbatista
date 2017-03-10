/* The footer directive*/
angular.module('common.footer', []);

angular.module('common.footer').directive("myFooter", [
	'$location',
	function(
		locationObj
	){
		return {
			restrict: "A",
			templateUrl: "_footer.html",
			replace: true,
			scope: {
				isFixed: "@"
			},
			link: function (scope, element){

				/* Control the animation behavior*/
				var isBrigingFooterUp = false;				
				var footerAnimation = null;
				var footerAnimationLimits = 0;
				var footerAnimationCurrentTop = 0;
				var pageOrientation = '';

				/* Links redirects*/
				var footerLinkToHome = function(){
					locationObj.path('/');
				}

				var linkList = [
					{
						name: 'Home',
						location: '/',
						iconClass: 'fa-home',
						linkFunction: footerLinkToHome
					},
					{
						name: 'About',
						location: '/about',
						iconClass: 'fa-arrow-up',
						linkFunction: footerLinkToHome
					},
					{
						name: 'Gallery',
						location: '/gallery',
						iconClass: 'fa-arrow-right',
						linkFunction: footerLinkToHome
					},
					{
						name: 'Portfolio',
						location: '/portfolio',
						iconClass: 'fa-arrow-left',
						linkFunction: footerLinkToHome
					},
					{
						name: 'Blog',
						location: '/blog',
						iconClass: 'fa-arrow-down',
						linkFunction: footerLinkToHome
					},
					
				];

				// Set all links to show (remove the link of current page)
				scope.linkToShow = linkList.filter( function (link ){
					return link.location != locationObj.path();
				});



				/* Event to detect the apperance of footer */
				scope.$on("footerIsRising", function(){
					isBrigingFooterUp = true;

					if(footerAnimation == null){
						animationProcess();	
					}
					
				});
				scope.$on("footerIsHiding", function(){
					isBrigingFooterUp = false;

					if(footerAnimation == null){
						animationProcess();	
					}
				});


				/* Page orientation detection */
				var detectOrientation = function (){

					if(window.innerWidth <= window.innerHeight)
						return "portrait";
					else
						return "landscape";
				};

				pageOrientation = detectOrientation();

				window.addEventListener("resize", function(){
					pageOrientation = detectOrientation();

					/* Force translation fix*/
					/*if(isBrigingFooterUp == false && footerAnimation == null && pageOrientation == "portrait")
						element[0].style.transform = 'translate(0px, 200px)';*/
				});


				/* Before any animation, set the footer limits*/
				if(pageOrientation == "portrait"){
					footerAnimationLimits = 200;
				}
				else{
					footerAnimationLimits = 150;
				}

				// Remove the transition configuration when page had no scroll
				if(scope.isFixed )
					element[0].style.transform = '';

				/* Set the initial transition*/
				else
					element[0].style.transform = 'translate(0px, ' + footerAnimationLimits + 'px)';


				/* Animation process to footer transition */
				var animationProcess = function(){

					footerAnimation = setInterval(function(){

						// Limits of animation, according orientation and scroll position
						// Bringing footer up
						if(isBrigingFooterUp == true){

							if(footerAnimationCurrentTop >= footerAnimationLimits - 20){
								footerAnimationCurrentTop = footerAnimationLimits;
								clearInterval(footerAnimation);
								footerAnimation = null;
							}
							else{
								footerAnimationCurrentTop = footerAnimationCurrentTop + 20;	
							}

							
						}
						
						// Bringing footer down
						else{

							if( footerAnimationCurrentTop <= 0){
								footerAnimationCurrentTop = -5;
								clearInterval(footerAnimation);
								footerAnimation = null;
							}
							else{
								footerAnimationCurrentTop = footerAnimationCurrentTop - 20;	
							}
						}

						element[0].style.transform = 'translate(0px, ' + (footerAnimationLimits - footerAnimationCurrentTop) + 'px)';

					}, 30);
				}
				

			}
		}
	}
]);