angular.module('site.portfolio').controller('portfolioCtrl', [
	"$scope",
	function(scope){

		scope.shareOpt = {
	  		title: 'Portfolio - amosbatista.com',
	  		description: 'As minhas maiores criações na área de Desenvolvimento.',
	  		imageName: 'print-portfolio.jpg'
		}

		scope.$emit('toHideLoadScreen');
	}
]);