angular.module("common.shareButtons", []);

// Load any SKD in the project
angular.module("common.shareButtons").run([
	'loadFacebookSDK',
	function(facebookSDK){
		facebookSDK();
	}
]);

