angular.module("site.gallery").controller("galleryCtrl", [
	'$scope',
	'gallery',
	function(
		scope,
		gallery
	){
		scope.$emit('toHideLoadScreen');
		scope.gallery = gallery;

		scope.shareOpt = {
	  		title: 'Galeria - Desenhos, Fotos e outras Artes',
	  		description: 'A galeria de todas as minhas artes visuais (desenhos, fotos, e outros).',
	  		imageName: 'print-gallery.jpg'
		}
		
	}
])