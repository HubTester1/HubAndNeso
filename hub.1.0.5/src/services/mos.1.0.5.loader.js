
/* eslint-disable */

/* 
	We use this so that we can alter which files load (in some cases globally, in some cases
	according to a site's settings) without having to modify the SP master page for a site or 
	for all sites.
*/

// ---- GLOBAL VARS

var debugMode = true;
var date = new Date();
var timestamp = date.getTime();

if (debugMode) { console.log('using mos-loader m2'); }



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
var devCentrallyManagedFileBasePathBasePath = "/sites/hubdev/DevCode5/";
var prodCentrallyManagedFileBasePathBasePath = "/sites/hubprod/Code5/";
var centrallyManagedFileBasePathBasePath = prodCentrallyManagedFileBasePathBasePath;
// note: will determine whether or not the centrally managed dev file base path should be used instead, 
// 		but can only do so after the site's local settings have been loaded and parsed

// stylesheets
var stylesheetsToLoad = [
	{ "centrallyManaged": 1, 						"path": "mos.1.0.5.css" },
];

// libraries
var libraryLoadingPromises = [];
var librariesToLoad = [

	// SP Services
	{ "centrallyManaged": 1, 						"path": "jquery.SPServices.2014.02.min.js" },
];

// local settings
var settingsLoadingPromises = [];
var settingsToLoad = [
	{ "localSiteAssets": 1,		"notCached": 1,		"path": "settings.js" },
];

// mos.1.0.5
var mosLoadingPromises = [];
var mosToLoad = [
	{ "centrallyManaged": 1,						"path": "mos.1.0.5.vendor.js" },
	// { "centrallyManaged": 1,	"notCached": 1,		"path": "mos.1.0.5.app.js" },
	{ "centrallyManaged": 1,						"path": "mos.1.0.5.transition-helper.js" },
];

function LoadFiles() {
	LoadJSFiles(settingsToLoad, settingsLoadingPromises, null, function () {

		var mData = $().ReturnThisAppMData();
		if (StrInStr(mData.mosKey, "dev") != false) {
			centrallyManagedFileBasePathBasePath = devCentrallyManagedFileBasePathBasePath;
		}

		LoadJSFiles(librariesToLoad, libraryLoadingPromises, null, function () {

			LoadJSFiles(mosToLoad, mosLoadingPromises, mData, function () {
				LoadCSSFiles(stylesheetsToLoad, function () {
					$.holdReady(false);
				});
			});
		});
	});
}



function LoadCSSFiles(filesToLoad, callback) {

	$.each(filesToLoad, function (i, file) {
		var urlToLoad = ReturnURLToLoad(file);
		var fileReference = document.createElement("link");
		$(fileReference).attr("rel", "stylesheet");
		$(fileReference).attr("href", urlToLoad);
		$('head').append(fileReference);
	});

	if (callback && typeof (callback) === "function") {
		callback();
	}
}



function LoadJSFiles(filesToLoad, promiseTracker, mData, callback) {

	$.each(filesToLoad, function (i, file) {

		var urlToLoad = ReturnURLToLoad(file, mData);

		// console.log("file");
		// console.log(file);
		console.log(urlToLoad);

		promiseTracker.push($.ajax({
			type: "GET",
			url: urlToLoad,
			dataType: "script",
			cache: true,
		})
			// .done(function() {
			// 	console.log("SUCCESS: " + file.path);
			// })
			.fail(function (jqXHR, textStatus) {
				console.log("___failed to load: " + urlToLoad);
				console.log(textStatus);
				// console.log(jqXHR);
			}));
	});

	// Wait for all promises to complete (pass or fail) 
	return $.when.apply($, promiseTracker).always(function () {
		if (callback && typeof (callback) === "function") {
			callback();
		}
	});
}



function ReturnURLToLoad(file, mData) {

	var urlToLoad = "";

	if (typeof (file.centrallyManaged) != "undefined" && file.centrallyManaged == 1) {
		urlToLoad += centrallyManagedFileBasePathBasePath;
	}

	if (typeof (file.localSiteAssets) != "undefined" && file.localSiteAssets == 1) {
		urlToLoad += localSiteCollectionURL + 'SiteAssets/';
	}

	if (typeof (file.path) != "undefined") {
		urlToLoad += file.path;
	}

	if (typeof (file.notCached) != "undefined" && file.notCached == 1) {
		urlToLoad += "?v=" + timestamp;
	} else if (debugMode) {
		urlToLoad += "?v=" + timestamp;
	}

	return urlToLoad;

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




(function () {
	LoadFiles();
})()
