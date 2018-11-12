/* eslint-disable */
let debugMode = true;

if (debugMode) { console.log('this controller m1'); }

// hold the ready event; hold will be released when all scripts have loaded
$.holdReady(true);


// get portion of local site collection path that comes after "sites/"
if (location.pathname.indexOf('sites/') != -1) {
	let localSiteCollectionPathAfterSitesSlash = location.pathname.slice(7);

	// get portion of that that comes before the first slash
	let localSiteCollectionToken = localSiteCollectionPathAfterSitesSlash.substr(0, localSiteCollectionPathAfterSitesSlash.indexOf('/'));

	// formulate local site collection URL
	var localSiteCollectionURL = 'https://bmos.sharepoint.com/sites/' + localSiteCollectionToken + '/';
} else {
	var localSiteCollectionURL = 'https://bmos.sharepoint.com/';
}

// config base paths of file storage locations
let devCentrallyManagedFileBasePathBasePath = 	'/sites/hubdev/DevCode2/';
let prodCentrallyManagedFileBasePathBasePath = 	'/sites/hubprod/Code2/';
let centrallyManagedFileBasePathBasePath = prodCentrallyManagedFileBasePathBasePath;
// to do: set location to prod, not dev


// stylesheets
let stylesheetsToLoad = [
	
	// note: attempts to concatenate lib files had negative results that didn't seem worth fixing

	// jQuery UI
	{
 'centrallyManaged': 1, css: 1, 'lib': 1, 	path: 'jquery.ui.1.10.4.custom.min.css' 
},
	// Vis JS
	{
 centrallyManaged: 1, css: 1, lib: 1, 	path: 'vis.4.16.1.min.css' 
},
	// Full Calendar
	{
 centrallyManaged: 1, css: 1, 'lib': 1, 	'path': 'fullcalendar.2.7.0.min.css' 
},
	// Office UI Fabric
	{
 centrallyManaged: 1, css: 1, 'lib': 1, 	'path': 'office-ui-fabric.2.5.0.min.css' 
},
	{
 centrallyManaged: 1, css: 1, 'lib': 1, 	path: 'office-ui-fabric.2.5.0.components.min.css' 
},
	// MOS
	{ centrallyManaged: 1, 'css': 1, 				path: 'mos.css' },
];


// libraries
let libraryLoadingPromises = [];
let librariesToLoad = [
	
	/* // jQuery UI
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
	*/
	// Concatenation of above files
	{
 centrallyManaged: 1, js: 1, lib: 1, 				'path': '_libs.concatenated.js' 
},
	// Vis JS -- too large to be concatenated with other files (using convenient tools)
	{
 'centrallyManaged': 1, 'js': 1, lib: 1, 				path: 'vis.4.16.1.min.js' 
},

	// Bowser
	{ centrallyManaged: 0, 						'path': 'https://cdnjs.cloudflare.com/ajax/libs/bowser/1.0.0/bowser.min.js' },

	// Yammer Embed
	{ centrallyManaged: 0, 						path: 'https://c64.assets-yammer.com/assets/platform_embed.js' },

	// Microsoft PeoplePicker
	{ centrallyManaged: 0, 						'path': '/_layouts/15/clienttemplates.js' },
	{ centrallyManaged: 0, 						'path': '/_layouts/15/clientforms.js' },
	{ centrallyManaged: 0, 						'path': '/_layouts/15/clientpeoplepicker.js' },
	{ 'centrallyManaged': 0, 						'path': '/_layouts/15/autofill.js' },
	// required for peoplepicker, but getting message that it's already loaded
	// { "centrallyManaged": 0, 						"path": "/_layouts/15/SP.runtime.js" },
];


// functions - global
let globalFunctionsLoadingPromises = [];
let globalFunctionsToLoad = [
	{
 'centrallyManaged': 1, 'js': 1, 'function': 1, path: 'functions.global.js' 
},
];


// settings - global and local
let settingsLoadingPromises = [];
let settingsToLoad = [
	{
 centrallyManaged: 1, js: 1, 'config': 1,	path: 'settings.js' 
},
	{ centrallyManaged: 0, 				'path': `${localSiteCollectionURL  }SiteAssets/settings.js` },
];


// config
let configLoadingPromises = [];
let configToLoad = [
	{
 centrallyManaged: 1, 'js': 1, 'config': 1, 'path': 'config.js' 
},
];


// swf / community
let swfCommunityLoadingPromises = [];
let swfCommunityToLoad = [
	{ centrallyManaged: 1, 'js': 1, swf: 1 },
	{ 'centrallyManaged': 1, js: 1, 'com': 1 },
];


LoadJSFiles(librariesToLoad, libraryLoadingPromises, () => {
	console.log('got to 1');
	LoadJSFiles (globalFunctionsToLoad, globalFunctionsLoadingPromises, function() {
		console.log('got to 2');
		LoadJSFiles (settingsToLoad, settingsLoadingPromises, function() {
	    	console.log('got to 3');
	    	var mData = $().ReturnThisSiteSettings();
	    	if (typeof(mData.devFiles) != "undefined" && mData.devFiles == 1) { 
				console.log('got to 4');
	    		centrallyManagedFileBasePathBasePath = devCentrallyManagedFileBasePathBasePath;
	    	}
			console.log('got to 5');
			LoadJSFiles (configToLoad, configLoadingPromises, function() {
				console.log('got to 6');
				LoadCSSFiles (stylesheetsToLoad, function() {
					console.log('got to 7');
					LoadJSFiles(swfCommunityToLoad, swfCommunityLoadingPromises, function() {
						console.log('got to 8');
						$.holdReady(false);
					});
				});
			});
		});
	});
});


function ReturnURLToLoad(file) {
	let urlToLoad = '';

	if (typeof (file.centrallyManaged) !== 'undefined' && file.centrallyManaged == 1) {
		urlToLoad += centrallyManagedFileBasePathBasePath;
	}

	if (typeof (file.siteCollection) !== 'undefined' && file.siteCollection == 1) {
		urlToLoad += localSiteCollectionPath;
	}

	if (typeof (file.js) !== 'undefined' && file.js == 1) {
		urlToLoad += 'js/';
	}

	if (typeof (file.css) !== 'undefined' && file.css == 1) {
		urlToLoad += 'css/';
	}

	if (typeof (file.lib) !== 'undefined' && file.lib == 1) {
		urlToLoad += 'libs/';
	}

	if (typeof (file.function) !== 'undefined' && file.function == 1) {
		urlToLoad += 'functions/';
	}

	if (typeof (file.config) !== 'undefined' && file.config == 1) {
		urlToLoad += 'config/';
	}

	if (typeof (file.swf) !== 'undefined' && file.swf == 1) {
		urlToLoad += 'swf/';

	    var mData = $().ReturnThisSiteSettings();
	    let requestID = $().GetParamFromUrl(location.search, 'requestID');
	    let globalMOSSWFLatestVersion = $().ReturnGlobalMOSSWFLatestVersion();
	    let swfFileName = '';

	    switch (mData.swfAPIKey) {
		case 'prod':
			swfFileName = 'mos-swf';
			break;
		case 'dev':
			swfFileName = 'dev_mos-swf';
			break;
		case 'devMedium':
			swfFileName = 'dev_mos-swf_medium';
			break;
		case 'devLong':
			swfFileName = 'dev_mos-swf_long';
			break;
	    }
	    // to do: elim devUpdate
	    let useVersionedFile = 0;

	    if (requestID != '' && typeof (mData.versioningMatters) !== 'undefined' && mData.versioningMatters == 1) {
			var SWFVersion = $().GetFieldsFromOneRow({
				'select': [
					{
						nameHere: 'number',
						nameInList: 'SWFVersion',
					},
				],
				where: {
					'field': 'ID',
					type: 'Number',
					'value': requestID,
				},
			});

			if (SWFVersion.number != globalMOSSWFLatestVersion) {
				useVersionedFile = 1;
			}
	    }

	    useVersionedFile == 1 ? swfFileName += `.${  SWFVersion.number  }.js` : swfFileName += '.js';

	    urlToLoad += swfFileName;
	}

	if (typeof (file.com) !== 'undefined' && file.com == 1) {
		urlToLoad += 'com/';

	    var mData = $().ReturnThisSiteSettings();
	    let comFileName = '';

	    if (typeof (mData.comAPIKey) !== 'undefined') {
		    switch (mData.comAPIKey) {
			case 'prod':
				comFileName = 'mos-com';
				break;
			case 'dev':
				comFileName = 'dev_mos-com';
				break;
			case 'devMedium':
				comFileName = 'dev_mos-com_medium';
				break;
			case 'devLong':
				comFileName = 'dev_mos-com_long';
				break;
		    }
		} else if (typeof (mData.devFiles) !== 'undefined' && mData.devFiles == 1) {
			comFileName = 'dev_mos-com';
		} else {
			comFileName = 'mos-com';
		}

	    urlToLoad += `${comFileName  }.js`;
	}

	if (typeof (file.path) !== 'undefined') {
		urlToLoad += file.path;
	}

	if (debugMode) {
		let date = new Date();
		let timestamp = date.getTime();
		urlToLoad += '?v=' + timestamp;   	
	}
    
	return urlToLoad;
}


function LoadCSSFiles(filesToLoad, callback) {
	$.each(filesToLoad, (i, file) => {
		var urlToLoad = ReturnURLToLoad (file);
        var fileReference = document.createElement("link");
        $(fileReference).attr("rel", "stylesheet");
        $(fileReference).attr("href", urlToLoad);
        $('head').append(fileReference);
	});
	
	if (callback && typeof (callback) === 'function') {
		callback();
	}
}


function LoadJSFiles(filesToLoad, promiseTracker, callback) {
	$.each(filesToLoad, (i, file) => {

		var urlToLoad = ReturnURLToLoad (file);

		// console.log("file");
		// console.log(file);
		// console.log(urlToLoad);

		promiseTracker.push($.ajax({
			type: "GET",
			url: urlToLoad,
			dataType: "script",
			cache: false,
		})
		// .done(function() {
		// 	console.log("SUCCESS: " + file.path);
		// })
		.fail(function( jqXHR, textStatus ) {
			console.log("___failed to load: " + urlToLoad);
			console.log(textStatus);
			console.log(jqXHR);
		}));
	});
	
	// Wait for all promises to complete (pass or fail) 
	return $.when(...promiseTracker).always(() => {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	});
}
