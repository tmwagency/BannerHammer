// --------------------------------------------- //
// DEFINE GLOBAL NAMESPACE
// --------------------------------------------- //
window.BH = window.BH || {}

var DEV_ENVIRONMENT = true;


// --------------------------------------------- //
// DEFINE GLOBAL LIBS
// --------------------------------------------- //

// force compilation of global libs that don't return a value.
require("log");

if (!DEV_ENVIRONMENT)
{
	window.log = function(){return false;};
}

// --------------------------------------------- //


(function (BH) {

	var BANNER_WIDTH = 300;
	var BANNER_HEIGHT =	250;
	var CLICK_THROUGH_URL = "http://www.tmw.co.uk";

	var _bannerHammer;

	BH.Supports = {

		// BH.Supports.isAndroidNativeBrowser
		isAndroidNativeBrowser: (function () {
			var ua = navigator.userAgent.toLowerCase();
			return ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1 && ua.indexOf('chrome') == -1;
		})()
	};

	BH.Platforms = {
		none : "",
		doubleclick : "doubleclick",
		celtra : "celtra"
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

			var bannerEl = document.querySelector(".banner-container");

			_bannerHammer = require("bannerhammer");
			_bannerHammer.init(bannerEl, BANNER_WIDTH, BANNER_HEIGHT, CLICK_THROUGH_URL, BH.Platforms.doubleclick);
		}
	};

	BH.Config.init();

})(window.BH || {});
