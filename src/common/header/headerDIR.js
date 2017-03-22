angular.module('common.header', []);

angular.module('common.header').directive("myHeader", [
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
				scope.headerLinkToShow = headerLinkList.filter( function (link ){
					return link.location != locationObj.path();
				});


				/* Header behavior with the footer. Header hides, when footers shows and vice-versa */
				/* Event to detect the apperance of footer */
				scope.$on("footerIsRising", function(){
					element[0].classList.add('hide-header');
					element[0].classList.remove('show-header');
				});
				scope.$on("footerIsHiding", function(){
					element[0].classList.add('show-header');
					element[0].classList.remove('hide-header');
				});
			}
		}
	}
]);