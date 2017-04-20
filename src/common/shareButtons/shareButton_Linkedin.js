angular.module("common.shareButtons").config([
	'LinkedInProvider',
	function(
		LinkedInProvider
	){
		
		LinkedInProvider.init({
		    apiKey: '78ygewsrtf69wj',
		    onLoad: function (sdk) {

		    },
		    /*authorize: true,
		    lang: 'en_US'*/
		});

	}
])