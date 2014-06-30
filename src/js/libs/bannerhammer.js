function BannerHammer ()
{
	var _self = this;
	var _bannerContainer;
	var _bannerWidth;
	var _bannerHeight;
	var _clicktroughURL;
	var _platform;


	_self.init = function (bannerWidth,bannerHeight,clicktroughURL,platform)

	{

		_bannerWidth =bannerWidth;
		_bannerHeight= bannerHeight;
		_bannerContainer = 	document.querySelector(".banner-container");
		_platform = platform;
		
		createBannerContainer();
		buildBannerContent();

		log("BannerHammer:: [init]");
	//	_move = require("movejs')
		//_title = 	document.querySelector("title-test");

		move(".tester")
		.x(300)
  		.y(20)
  		.end(next);

    };


	function createBannerContainer() { 

		if(_platform == "doubleClick") { 

		}

		_bannerContainer.style.width  = _bannerWidth+"px";
		_bannerContainer.style.height = _bannerHeight+"px";

  	};

  	function buildBannerContent() { 


  	}



    function next () { 

    	move(".tester")
		.x(Math.random()*200)
  		.y(Math.random()*200)
  		.end(next);

    }






	//var bannerName(bannerWidth,bannerHeight,clicktroughURL,platform) = new BannerHammer( 
	

	//assetDefinition(assetName, initialPos(x,y) , moveTo(x,y),scaleTo(x,y),opacity:(1,1), delay: millisecs, duration: millisecs, easeEffect:easeIn or easeOut ),
	//assetPreset(assetname, initialPos(x,y),presetName: presetName,  delay: millisecs, duration: millisecs);




}

module.exports = new BannerHammer();
