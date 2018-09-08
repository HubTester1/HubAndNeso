

// ---- GLOBAL VARS

var debugMode = true;

var loadingStartTime = Date.now();
var loadingFinishTime;

var latestMOSMainVersion = "1.04";
var latestDevMOSMainVersion = "1.04";
var latestDevMOSMainMediumVersion = "1.04";
var latestDevMOSMainLongVersion = "1.04";

var mosMainLatestMinorVersionForMajorVersion1 = "0";
var devMOSMainLatestMinorVersionForMajorVersion1 = "0";
var devMOSMainMediumLatestMinorVersionForMajorVersion1 = "0";
var devMOSMainLongLatestMinorVersionForMajorVersion1 = "0";

// Not in use because no major version 2 has been created; 
//		these are here to demo
// var mosSWFLatestMinorVersionForMajorVersion2 = "0";
// var devMOSSWFLatestMinorVersionForMajorVersion2 = "0";
// var devMOSSWFMediumLatestMinorVersionForMajorVersion2 = "0";
// var devMOSSWFLongLatestMinorVersionForMajorVersion2 = "0";

// Not in use because no major version 3 has been created; 
//		these are here to demo
// var mosSWFLatestMinorVersionForMajorVersion3 = "0";
// var devMOSSWFLatestMinorVersionForMajorVersion3 = "0";
// var devMOSSWFMediumLatestMinorVersionForMajorVersion3 = "0";
// var devMOSSWFLongLatestMinorVersionForMajorVersion3 = "0";

var latestMOSCSSVersion = "1.0";
var latestLibrariesCSSVersion = "1.0";

var latestConcatenatedLibsVersion = "1.0";
/*var latestGlobalFunctionsVersion = "1.0";
var latestGlobalSettingsVersion = "1.0";
var latestGlobalConfigVersion = "1.0";
*/
var date = new Date();
var timestamp = date.getTime();



if (debugMode) { console.log("using mos-loader m250") }



// get portion of local site collection path that comes after "sites/"
if (location.pathname.indexOf("sites/") != -1) {

	var localSiteCollectionPathAfterSitesSlash = location.pathname.slice(7);

	// get portion of that that comes before the first slash
	var localSiteCollectionToken = localSiteCollectionPathAfterSitesSlash.substr(0, localSiteCollectionPathAfterSitesSlash.indexOf("/"));

	// formulate local site collection URL
	var localSiteCollectionURL = "https://bmos.sharepoint.com/sites/" + localSiteCollectionToken + "/";

} else {
	
	var localSiteCollectionURL = "https://bmos.sharepoint.com/";
}

// config base paths of file storage locations
var devCentrallyManagedFileBasePathBasePath = 	"/sites/hubdev/DevCode4/"; // "/sites/hubdev/DevCode4/";
var prodCentrallyManagedFileBasePathBasePath = 	"/sites/hubprod/Code4/";
var centrallyManagedFileBasePathBasePath = prodCentrallyManagedFileBasePathBasePath;
// note: will determine whether or not the centrally managed dev file base path should be used instead, 
// 		but can only do so after the site's local settings have been loaded and parsed

// stylesheets
var stylesheetsToLoad = [

	/*
		// jQuery UI
		{ "centrallyManaged": 1, "css": 1, "lib": 1, 	"path": "jquery.ui.1.10.4.custom.min.css" },
		// Vis JS
		{ "centrallyManaged": 1, "css": 1, "lib": 1, 	"path": "vis.4.16.1.min.css" },
		// Full Calendar
		{ "centrallyManaged": 1, "css": 1, "lib": 1, 	"path": "fullcalendar.2.7.0.min.css" },
		// Office UI Fabric
		{ "centrallyManaged": 1, "css": 1, "lib": 1, 	"path": "office-ui-fabric.2.5.0.min.css" },
		{ "centrallyManaged": 1, "css": 1, "lib": 1, 	"path": "office-ui-fabric.2.5.0.components.min.css" },
	*/
	// Concatenation of above files
	{ "centrallyManaged": 1, "css": 1, "lib": 1, 	"path": "_libs.concatenated." + latestLibrariesCSSVersion + ".css" },
	// MOS
	// { "centrallyManaged": 1, "css": 1, 				"path": "mos." + latestMOSCSSVersion + ".css" },
	{ "centrallyManaged": 1, "css": 1, 				"path": "mos.css" },
];



// libraries
var libraryLoadingPromises = [];
var librariesToLoad = [
	
	/*
		// jQuery UI
		{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "jquery.ui.1.11.4.min.js" },
		// SP Services
		{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "jquery.SPServices.2014.02.min.js" },
		// Datatables
		{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "jquery.dataTables.1.10.11.min.js" },
		// Moment JS
		{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "moment.withLocales.2.13.0.min.js" },
		{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "moment.recur.min.js" },
		// Full Calendar
		{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "fullcalendar.2.7.0.min.js" },
		// Collapsible
		{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "jquery.collapsible.js" },
		// Vis JS
		// { "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "vis.4.16.1.min.js" },
	*/
	// Concatenation of above files
	{ "centrallyManaged": 1, "js": 1, "lib": 1, 					"path": "_libs.concatenated." + latestConcatenatedLibsVersion + ".js" },

	// Bowser
	{ "centrallyManaged": 0, 										"path": "https://cdnjs.cloudflare.com/ajax/libs/bowser/1.9.3/bowser.min.js" },

	// Yammer Embed
	// { "centrallyManaged": 0, 									"path": "https://c64.assets-yammer.com/assets/platform_embed.js" },

	// Microsoft PeoplePicker
	{ "centrallyManaged": 0, 										"path": "/_layouts/15/clienttemplates.js" },
	{ "centrallyManaged": 0, 										"path": "/_layouts/15/clientforms.js" },
	{ "centrallyManaged": 0, 										"path": "/_layouts/15/clientpeoplepicker.js" },
	{ "centrallyManaged": 0, 										"path": "/_layouts/15/autofill.js" },
	// supposedly required for peoplepicker, but getting message that it's already loaded
	// { "centrallyManaged": 0, 										"path": "/_layouts/15/SP.runtime.js" },

	// Numeral
	{ "centrallyManaged": 1, "js": 1, "lib": 1, 				"path": "numeral.2.0.6.min.js" },
];


// local settings
var settingsLoadingPromises = [];
var settingsToLoad = [
	{ "centrallyManaged": 0, "notCached": 1, 		"path": localSiteCollectionURL + "SiteAssets/settings.js" },
];



// mos-main
var mosMainLoadingPromises = [];
var mosMainToLoad = [
	{ "centrallyManaged": 1, "js": 1, "mosMain": 1},
];



function loadFiles () {
	LoadJSFiles (settingsToLoad, settingsLoadingPromises, null, function() {
		
		var mData = $().ReturnThisAppMData();
		if (StrInStr(mData.mosMainKey, "dev") != false) {
			centrallyManagedFileBasePathBasePath = devCentrallyManagedFileBasePathBasePath;
		}

	    LoadJSFiles (librariesToLoad, libraryLoadingPromises, null, function() {	

			LoadJSFiles (mosMainToLoad, mosMainLoadingPromises, mData, function() {
				LoadCSSFiles (stylesheetsToLoad, function() {
					loadingFinishTime = Date.now();
					if (debugMode) { console.log('resource loading time = ' + (loadingFinishTime - loadingStartTime)/1000 + ' seconds'); }
					$.holdReady(false);
				});
			});
		});
	});
}



// SETTINGS MUST BE LOADED WITH TIMESTAMP SO THAT THE LATEST VERSION IS ALWAYS USED;
//		IT'S IMFEASIBLE TO GO TO TRACK A VERSION NUMBER FOR EACH SITE'S SETTINGS

function ReturnURLToLoad (file, mData) {

	var urlToLoad = "";

	if (typeof(file.centrallyManaged) != "undefined" && file.centrallyManaged == 1) {
		urlToLoad += centrallyManagedFileBasePathBasePath;
	}

	if (typeof(file.siteCollection) != "undefined" && file.siteCollection == 1) {
		urlToLoad += localSiteCollectionPath;
	}

	if (typeof(file.js) != "undefined" && file.js == 1) {
		urlToLoad += "js/";
	}

	if (typeof(file.css) != "undefined" && file.css == 1) {
		urlToLoad += "css/";
	}

	if (typeof(file.lib) != "undefined" && file.lib == 1) {
		urlToLoad += "libs/";
	}

	if (typeof(file.mosMain) != "undefined" && file.mosMain == 1) {

	    var requestID = GetParamFromUrl(location.search, 'r');

	    // if we're loading an existing request and this swf app has useRecordedMOSMainMajorVersion set to 1
	    if (requestID != '' && typeof(mData.useRecordedMOSMainMajorVersion) != 'undefined' && mData.useRecordedMOSMainMajorVersion == 1) {
            
	    	// get the recorded swf major version
            var recordedSWFMajorVersion = $().GetFieldsFromOneRow({
                "select": [
                    {
                        "nameHere": "number",
                        "nameInList": "SWFVersion"
                    }
                ],
                "where": {
                    "field": "ID",
                    "type": "Number",
                    "value": requestID,
                }
            });

            recordedSWFMajorVersion = recordedSWFMajorVersion.slice(0, 1);

            // finish out file name using the latest minor version of this major version
		    switch(mData.swfAPIKey) {
				case "prod":
				    switch(recordedSWFMajorVersion) {
						case "1":
							urlToLoad += "mos-main.1." + mosMainLatestMinorVersionForMajorVersion1 + ".js";
							break;
						case "2":
							urlToLoad += "mos-main.2." + mosSWFLatestMinorVersionForMajorVersion2 + ".js";
							break;
						case "3":
							urlToLoad += "mos-main.3." + mosSWFLatestMinorVersionForMajorVersion3 + ".js";
							break;
				    }
					break;
				case "dev":
				    switch(recordedSWFMajorVersion) {
						case "1":
							urlToLoad += "dev_mos-main.1." + devMOSMainLatestMinorVersionForMajorVersion1 + ".js";
							break;
						case "2":
							urlToLoad += "dev_mos-main.2." + devMOSSWFLatestMinorVersionForMajorVersion2 + ".js";
							break;
						case "3":
							urlToLoad += "dev_mos-main.3." + devMOSSWFLatestMinorVersionForMajorVersion3 + ".js";
							break;
				    }
					break;
				case "devMedium":
				    switch(recordedSWFMajorVersion) {
						case "1":
							urlToLoad += "dev_mos-main_medium.1." + devMOSMainMediumLatestMinorVersionForMajorVersion1 + ".js";
							break;
						case "2":
							urlToLoad += "dev_mos-main_medium.2." + devMOSSWFMediumLatestMinorVersionForMajorVersion2 + ".js";
							break;
						case "3":
							urlToLoad += "dev_mos-main_medium.3." + devMOSSWFMediumLatestMinorVersionForMajorVersion3 + ".js";
							break;
				    }
					break;
				case "devLong":
				    switch(recordedSWFMajorVersion) {
						case "1":
							urlToLoad += "dev_mos-main_long.1." + devMOSMainLongLatestMinorVersionForMajorVersion1 + ".js";
							break;
						case "2":
							urlToLoad += "dev_mos-main_long.2." + devMOSSWFLongLatestMinorVersionForMajorVersion2 + ".js";
							break;
						case "3":
							urlToLoad += "dev_mos-main_long.3." + devMOSSWFLongLatestMinorVersionForMajorVersion3 + ".js";
							break;
				    }
					break;
		    }
	    
	    } else {

		    switch(mData.mosMainKey) {
				case "prod":
					urlToLoad += "mos-main." + latestMOSMainVersion + ".js";
					break;
				case "dev":
					urlToLoad += "dev_mos-main." + latestDevMOSMainVersion + ".js";
					break;
				case "devMedium":
					urlToLoad += "dev_mos-main_medium." + latestDevMOSMainMediumVersion + ".js";
					break;
				case "devLong":
					urlToLoad += "dev_mos-main_long." + latestDevMOSMainLongVersion + ".js";
					break;
		    }
		}
	}

	if (typeof(file.path) != "undefined") {
		urlToLoad += file.path;
	}
	
	if (typeof(file.notCached) != "undefined" && file.notCached == 1) {
		urlToLoad += "?v=" + timestamp;
	} else if (debugMode) {
		urlToLoad += "?v=" + timestamp;
	}
	return urlToLoad;
}



function LoadCSSFiles (filesToLoad, callback) {
	
	$.each(filesToLoad, function (i, file) {
		var urlToLoad = ReturnURLToLoad (file);
        var fileReference = document.createElement("link");
        $(fileReference).attr("rel", "stylesheet");
        $(fileReference).attr("href", urlToLoad);
        $('head').append(fileReference);
	});
	
	if (callback && typeof(callback) === "function") {
		callback();
	}
}



function LoadJSFiles (filesToLoad, promiseTracker, mData, callback) {
	
	$.each(filesToLoad, function (i, file) {

		var urlToLoad = ReturnURLToLoad (file, mData);

		// console.log("file");
		// console.log(file);
		// console.log(urlToLoad);

		promiseTracker.push($.ajax({
			type: "GET",
			url: urlToLoad,
			dataType: "script",
			cache: true,
		})
		// .done(function() {
		// 	console.log("SUCCESS: " + file.path);
		// })
		.fail(function( jqXHR, textStatus ) {
			console.log("___failed to load: " + urlToLoad);
			console.log(textStatus);
			// console.log(jqXHR);
		}));
	});
	
	// Wait for all promises to complete (pass or fail) 
	return $.when.apply($, promiseTracker).always(function () {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	});
}



function GetParamFromUrl (urlParams, paramToReturn) {

	// set up var
	var param = "";
	var paramEquals = "";
	// try to split up URL params into array
	var urlParams = urlParams.substring(1).split("&");

	// if URL did contain params
	if (urlParams[0] != "") {

		// iterate over each param
		$.each(urlParams, function (i, singleParam) {

			if (StrInStr(singleParam, paramToReturn, 0) != false) {

				// try to get param param in form "=x"
				paramEquals = StrInStr(singleParam, paramToReturn + "=", 0);

				if (paramEquals != false) {
					param = paramEquals.substr(parseInt(paramToReturn.length) + 1);
				}
			}

		});

	}
	return param;
}



function StrInStr(haystack, needle, flag) {

	var position = 0;
	haystack = haystack + '';
	needle = needle + '';
	position = haystack.indexOf(needle);

	if (position == -1) {
		return false;
	} else {
		if (flag == 1) {
			// return from beginning of string to beginning of needle
			return haystack.substr(0, position);
		} else if (flag == 2) {
			// return ?
			return haystack.slice(needle.length);
		} else if (flag == 3) {
			// return from needle to end of string, needle-exclusive
			return haystack.slice(position + needle.length);
		} else {
			// return from needle to end of string, needle-inclusive
			return haystack.slice(position);
		}
	}
}




(function(){
  loadFiles();
})()