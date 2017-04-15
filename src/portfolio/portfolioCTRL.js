angular.module('site.portfolio').controller('portfolioCtrl', [
	"$scope",
	function(scope){

		scope.shareOpt = {
	  		title: 'Meu Portfólio',
	  		description: 'As minhas maiores criações na área de Desenvolvimento.',
	  		imageName: 'print-portfolio.jpg'
		}

		scope.$emit('toHideLoadScreen');
	}
]);