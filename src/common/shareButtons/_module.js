angular.module("common.shareButtons", []);

// Load SKD
angular.module("common.shareButtons").run([
	'loadFacebookSDK',
	function(facebookSDK){
		console.log("Running the SDK");
		facebookSDK();
	}
]);

