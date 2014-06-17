// --------------------------------------------- //
// DEFINE GLOBAL NAMESPACE
// --------------------------------------------- //
window.BH = window.BH || {}


// --------------------------------------------- //
// DEFINE GLOBAL LIBS
// --------------------------------------------- //

// force compilation of global libs that don't return a value.
require("log");

// --------------------------------------------- //


(function (BH) {

	var _bannerHammer;

	BH.Supports = {

		// BH.Supports.isAndroidNativeBrowser
		isAndroidNativeBrowser: (function () {
			var ua = navigator.userAgent.toLowerCase();
			return ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1 && ua.indexOf('chrome') == -1;
		})()
	};

	BH.Config = {

		init : function ()
		{
			log("App:: [BH.Config.init]");

			// add swiftclick to target non-Android touch devices.
			if (!BH.Supports.isAndroidNativeBrowser)
			{
				// attach SwiftClick to remove click latency on touch devices.
				var swiftclick = require("swiftclick").attach(document.body);
			}

			_bannerHammer = require("bannerhammer");
		}
	};

	BH.Config.init();

})(window.BH || {});