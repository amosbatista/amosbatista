/* The footer directive*/
appWebSite.directive("myFooter", [
	'$location',
	function(
		locationObj
	){
		return {
			restrict: "A",
			templateUrl: "_footer.html",
			replace: true,
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

				document.addEventListener("resize", function(){
					pageOrientation = detectOrientation();
				});


				/* Before any animation, set the footer limits*/
				if(pageOrientation == "portrait"){
					footerAnimationLimits = 200;
				}
				else{
					footerAnimationLimits = 150;
				}

				/* Set the initial transition*/
				/*element[0].style.transform = 'translate(0px, ' + footerAnimationLimits + 'px)';*/


				/* Animation process to footer transition */
				var animationProcess = function(){
					if(isBrigingFooterUp == true)
						console.log("Calling footer bring up");
					else
						console.log("Calling footer bring down");

					footerAnimation = setInterval(function(){

						// Limits of animation, according orientation and scroll position
						// Bringing footer up
						if(isBrigingFooterUp == true){

							if(footerAnimationCurrentTop >= footerAnimationLimits){
								footerAnimationCurrentTop = footerAnimationLimits;
								clearInterval(footerAnimation);
								footerAnimation = null;
							}
							else{
								footerAnimationCurrentTop = footerAnimationCurrentTop + 10;	
							}

							
						}
						
						// Bringing footer down
						else{

							if( footerAnimationCurrentTop <= 0){
								footerAnimationCurrentTop = 0;
								clearInterval(footerAnimation);
								footerAnimation = null;
							}
							else{
								footerAnimationCurrentTop = footerAnimationCurrentTop - 10;	
							}
						}

						element[0].style.transform = 'translate(0px, ' + (footerAnimationLimits - footerAnimationCurrentTop) + 'px)';

					}, 25);
				}
				

			}
		}
	}
]);