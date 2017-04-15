angular.module('site.portfolio').controller('masterrowCtrl', [
	'$scope',
	function(scope){
		scope.$emit('toHideLoadScreen');

		scope.shareOpt = {
	  		title: 'Portfólio: Masterrow',
	  		description: 'Crie tabelas dinâmicas com esta mais nova ferramenta JavaScript.',
	  		imageName: 'logo.png'
		}

		
	}
])