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

				scope.isFixed = scope.isFixed || false;

				// Set the footer visible, when fixed
				if(scope.isFixed)
					element[0].classList.add('show-footer');


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

					if(scope.isFixed == false){
						element[0].classList.add('show-footer');
						element[0].classList.remove('hide-footer');
					}
					
				});
				scope.$on("footerIsHiding", function(){

					if(scope.isFixed == false){
						element[0].classList.add('hide-footer');
						element[0].classList.remove('show-footer');
					}
				});
			}
		}
	}
]);