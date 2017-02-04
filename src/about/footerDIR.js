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

				/* Links redirects*/
				var footerLinkToHome = function(){
					console.log("Go Home");
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

			}
		}
	}
]);