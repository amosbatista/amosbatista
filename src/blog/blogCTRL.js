angular.module("site.blog").controller("blogCtrl", [
	'generalSRV',
	function(
		service
	){
		service.response().then(function(data){
			console.log('Response of Wordpress', data);
		});
	}
])