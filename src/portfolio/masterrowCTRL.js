angular.module('site.portfolio').controller('masterrowCtrl', [
	'$scope',
	function(scope){
		scope.$emit('toHideLoadScreen');

		scope.shareOpt = {
	  		title: 'Masterrow - Portfólio - amosbatista.com',
	  		description: 'Crie tabelas dinâmicas com esta mais nova ferramenta javaScript.',
	  		imageName: 'logo.png'
		}

		
	}
])