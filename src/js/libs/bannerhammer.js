function BannerHammer ()
{
	var _self = this;
	var _el;
	var _width;
	var _height;
	var _clickArea;
	var _clicktroughURL;
	var _platform;


	_self.init = function (el, width, height, clickTroughURL, platform)
	{
		log("BannerHammer:: [init]");

		_el = el;
		_width = width;
		_height = height;
		_platform = platform;

		if (_platform === BH.Platforms.doubleclick)
  		{
  			// require the doubleclick enabler, which creates a global 'Enabler' object.
  			require("enabler");

  			if(Enabler.isInitialized())
  			{
  				enablerInitHandler();
  			}
  			else
  			{
  				Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  			}
		}
		else
		{
			createClickArea();
		}

		setDimensions();
		setContent();
    };


	function setDimensions ()
	{ 
		_el.style.width  = _width + "px";
		_el.style.height = _height + "px";
  	}

  	function setContent ()
  	{
  	}

  	function createClickArea ()
  	{
  		log("BannerHammer:: [createClickArea]");

  		_clickArea = document.createElement("div");
		_clickArea.style.width = _width + "px";
		_clickArea.style.height = _height + "px";
		_clickArea.addEventListener("click", clickAreaHandler);

		_el.insertBefore(_clickArea);
	}


	function enablerInitHandler ()
	{
		log("BannerHammer:: [enablerInitHandler]");
		// Start ad, initialise animation,
		// load in your image assets, call Enabler methods,
		// and/or include other Studio modules.

		createClickArea();
	}

	function clickAreaHandler (event)
	{
		log("BannerHammer:: [clickAreaHandler]");

		switch (_platform)
  		{
  			case BH.Platforms.doubleclick :
  				log("BannerHammer:: [createClickArea] using doubleClick platform.");
  				Enabler.exit();
  				break;
  				
  			default :
  				log("BannerHammer:: [createClickArea] NOT using doubleClick platform.");
  				break;
  		}
	}

	//assetDefinition(assetName, initialPos(x,y) , moveTo(x,y),scaleTo(x,y),opacity:(1,1), delay: millisecs, duration: millisecs, easeEffect:easeIn or easeOut ),
	//assetPreset(assetname, initialPos(x,y),presetName: presetName,  delay: millisecs, duration: millisecs);




}

module.exports = new BannerHammer();
