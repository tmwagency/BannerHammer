// This next line references a grunt task to include the file below
// so we concatenate these two files
include "../../lib/plugins.min.js"

var creative = window.creative || {};

//timeout interval
creative.timeOut = 15;
creative.time = 0;
creative.timer = setTimeout(bannerTimeOut, creative.timeOut * 1000);

// triggered when time finish
function bannerTimeOut() {

	creative.adCompleted = true;
}

// starts everything
function startBannerAnimation()
{
	// write your code animations here
}