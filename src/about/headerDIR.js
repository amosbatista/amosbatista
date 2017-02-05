appWebSite.directive("myHeader", [
	'$timeout',
	'$location',
	function(
		timeout,
		locationObj
	){
		return {
			restrict: "A",
			templateUrl: "_header.html",
			replace: true,
			link: function (scope, element){

				var headerAnimation = null;
				var headerAnimationLimits = 0;
				var headerTransictionFactor = 0;
				var headerAnimationCurrentTop = 0;

				/* Links redirects*/
				var headerLinkToHome = function(){
					locationObj.path('/');
				}

				var headerLinkList = [
					{
						name: 'Home',
						location: '/',
						iconClass: 'fa-home',
						linkFunction: headerLinkToHome,
						linkClass: 'link-home'
					},
					{
						name: 'About',
						location: '/about',
						iconClass: 'fa-arrow-up',
						linkFunction: headerLinkToHome,
						linkClass: 'link-about'
					},
					{
						name: 'Gallery',
						location: '/gallery',
						iconClass: 'fa-arrow-right',
						linkFunction: headerLinkToHome,
						linkClass: 'link-gallery'
					},
					{
						name: 'Portfolio',
						location: '/portfolio',
						iconClass: 'fa-arrow-left',
						linkFunction: headerLinkToHome,
						linkClass: 'link-portfolio'
					},
					{
						name: 'Blog',
						location: '/blog',
						iconClass: 'fa-arrow-down',
						linkFunction: headerLinkToHome,
						linkClass: 'link-blog'
					},
					
				];

				// Set all links to show (remove the link of current page)
				scope.hederLinkToShow = headerLinkList.filter( function (link ){
					return link.location != locationObj.path();
				});


				/* Header behavior with the footer. Header hides, when footers shows and vice-versa */
				/* Event to detect the apperance of footer */
				scope.$on("footerIsRising", function(){
					isBrigingFooterUp = true;

					if(headerAnimation == null){
						animationProcess();	
					}
					
				});
				scope.$on("footerIsHiding", function(){
					isBrigingFooterUp = false;

					if(headerAnimation == null){
						animationProcess();	
					}
				});


				/* Page orientation detection */
				var detectOrientation = function (){

					if(window.innerWidth <= window.innerHeight){
						headerAnimationLimits = 200;
						headerTransictionFactor = 20;
						return "portrait";
					}
					else{
						headerAnimationLimits = 430; // Header top + header size
						headerTransictionFactor = 40;
						return "landscape";
					}
				};

				var pageOrientation = detectOrientation();

				document.addEventListener("resize", function(){
					pageOrientation = detectOrientation();
				});

				

				headerAnimationCurrentTop = headerAnimationLimits;

				/* Animation process to footer transition */
				var animationProcess = function(){

					headerAnimation = setInterval(function(){

						// Limits of animation, according orientation and scroll position
						// Bringing footer up
						if(isBrigingFooterUp == true){

							
							if( headerAnimationCurrentTop <= 0){
								headerAnimationCurrentTop = 0;
								clearInterval(headerAnimation);
								headerAnimation = null;
							}
							else{
								headerAnimationCurrentTop = headerAnimationCurrentTop - headerTransictionFactor;	
							}
							
						}
						
						// Bringing footer down
						else{

							if(headerAnimationCurrentTop >= headerAnimationLimits){
								headerAnimationCurrentTop = headerAnimationLimits;
								clearInterval(headerAnimation);
								headerAnimation = null;
							}
							else{
								headerAnimationCurrentTop = headerAnimationCurrentTop + headerTransictionFactor;	
							}

							

							
						}

						element[0].style.transform = 'translate(0px, -' + (headerAnimationLimits - headerAnimationCurrentTop) + 'px)';

					}, 30);
				}
			}
		}
	}
]);