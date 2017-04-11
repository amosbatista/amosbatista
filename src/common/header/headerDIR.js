angular.module('common.header', []);

angular.module('common.header').directive("myHeader", [
	'$timeout',
	'$state',
	function(
		timeout,
		state
	){
		return {
			restrict: "A",
			templateUrl: "_header.html",
			replace: true,
			link: function (scope, element){

				/* Links redirects*/
				var headerLinkToHome = function(){
					scope.$emit('toShowLoadScreen');
					state.go('home')
				}

				var headerLinkToGallery = function(){
					scope.$emit('toShowLoadScreen');
					state.go('gallery')
				}

				var headerLinkToAbout = function(){
					scope.$emit('toShowLoadScreen');
					state.go('about')
				}

				var headerLinkToBlog = function(){
					scope.$emit('toShowLoadScreen');
					state.go('blog')
				}

				var headerLinkToPortfolio = function(){
					scope.$emit('toShowLoadScreen');
					state.go('portfolio')
				}

				var headerLinkList = [
					{
						name: 'Home',
						location: 'home',
						iconClass: 'fa-home',
						linkFunction: headerLinkToHome,
						linkClass: 'link-home'
					},
					{
						name: 'About',
						location: 'about',
						iconClass: 'fa-arrow-up',
						linkFunction: headerLinkToAbout,
						linkClass: 'link-about'
					},
					{
						name: 'Gallery',
						location: 'gallery',
						iconClass: 'fa-arrow-right',
						linkFunction: headerLinkToGallery,
						linkClass: 'link-gallery'
					},
					{
						name: 'Portfolio',
						location: 'portfolios',
						iconClass: 'fa-arrow-left',
						linkFunction: headerLinkToPortfolio,
						linkClass: 'link-portfolio'
					},
					{
						name: 'Blog',
						location: 'blog',
						iconClass: 'fa-arrow-down',
						linkFunction: headerLinkToBlog,
						linkClass: 'link-blog'
					},
					
				];

				// Set all links to show (remove the link of current page)
				scope.headerLinkToShow = headerLinkList.filter( function (link ){
					return link.location != state.current.name;
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