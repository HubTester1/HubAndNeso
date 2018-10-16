
/* 
	We use this so that we can alter which files load (in some cases globally, in some cases
	according to a site's settings) without having to modify the SP master page for a site or 
	for all sites.
*/

// ---- GLOBAL VARS

const debugMode = true;
const date = new Date();
const timestamp = date.getTime();

if (debugMode) { console.log('using mos-loader m3'); }

// get portion of local site collection path that comes after "sites/"
let localSiteCollectionURL = '';
if (location.pathname.indexOf('sites/') !== -1) {
	const localSiteCollectionPathAfterSitesSlash = location.pathname.slice(7);
	// get portion of that that comes before the first slash
	const localSiteCollectionToken = localSiteCollectionPathAfterSitesSlash.substr(0, localSiteCollectionPathAfterSitesSlash.indexOf('/'));
	// formulate local site collection URL
	localSiteCollectionURL = `https://bmos.sharepoint.com/sites/${localSiteCollectionToken}/`;
} else {
	localSiteCollectionURL = 'https://bmos.sharepoint.com/';
}


// config base paths of file storage locations
const devCentrallyManagedFileBasePathBasePath = '/sites/hubdev/DevCode5/';
const prodCentrallyManagedFileBasePathBasePath = '/sites/hubprod/Code5/';
const centrallyManagedFileBasePathBasePath = prodCentrallyManagedFileBasePathBasePath;
// note: will determine whether or not the centrally managed dev file base path should 
// 		be used instead, but can only do so after the site's local settings have been 
// 		loaded and parsed

// stylesheets
const stylesheetsToLoad = [
	{ centrallyManaged: 1, 						path: 'mos.1.0.5.Styles.css' },
];

// libraries
/* const libraryLoadingPromises = [];
const librariesToLoad = [

	// SP Services
	// { "centrallyManaged": 1, 						"path": "jquery.SPServices.2014.02.min.js" },
]; */

// local settings
const settingsLoadingPromises = [];
const settingsToLoad = [
	{ localSiteAssets: 1,		notCached: 1,		path: 'settings.js' },
];

// mos.1.0.5
const mosLoadingPromises = [];
const mosToLoad = [
	{ centrallyManaged: 1,	notCached: 1,		path: 'mos.1.0.5.App.js' },
	// { "centrallyManaged": 1,						"path": "mos.1.0.5.TransitionHelper.js" },
];


function ReturnURLToLoad(file, mData) {
	let urlToLoad = '';

	if (typeof (file.centrallyManaged) !== 'undefined' && file.centrallyManaged === 1) {
		urlToLoad += centrallyManagedFileBasePathBasePath;
	}

	if (typeof (file.localSiteAssets) !== 'undefined' && file.localSiteAssets === 1) {
		urlToLoad += `${localSiteCollectionURL}SiteAssets/`;
	}

	if (typeof (file.path) !== 'undefined') {
		urlToLoad += file.path;
	}

	if (typeof (file.notCached) !== 'undefined' && file.notCached === 1) {
		urlToLoad += `?v=${timestamp}`;
	} else if (debugMode) {
		urlToLoad += `?v=${timestamp}`;
	}
	// console.log(urlToLoad);
	return urlToLoad;
}


function LoadCSSFiles(filesToLoad, callback) {
	filesToLoad.forEach((file) => {
		const urlToLoad = ReturnURLToLoad(file);
		const fileReference = document.createElement('link');
		const relAttribute = document.createAttribute('rel');
		const hrefAttribute = document.createAttribute('href');
		relAttribute.value = 'stylesheet';
		hrefAttribute.value = urlToLoad;
		fileReference.setAttributeNode(relAttribute);
		fileReference.setAttributeNode(hrefAttribute);
		document.getElementsByTagName('head')[0].appendChild(fileReference);
	});
	if (callback && typeof (callback) === 'function') {
		callback();
	}
}


function LoadJSFile(urlToLoad) {
	// return a new promise
	return new Promise((resolve, reject) => {
		console.log(urlToLoad);
		
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.status >= 200 && this.status < 300) {
				console.log(xhr.response);
				eval(xhr.response);
				resolve(xhr.response);
			} else {
				reject({
					urlToLoad,
					status: this.status,
					statusText: xhr.statusText,
				});
			}
		};
		/* xhr.onerror = function () {
			reject({
				urlToLoad,
				status: this.status,
				statusText: xhr.statusText,
			});
		}; */
		xhr.open('GET', urlToLoad);
		xhr.send();
	});
}


function LoadJSFiles(filesToLoad, promiseTracker, mData, callback) {
	filesToLoad.forEach((file) => {
		const urlToLoad = ReturnURLToLoad(file, mData);

		// const script = document.createElement('script');
		// script.async = false;
		// script.src = urlToLoad;
		// document.getElementsByTagName('body')[0].appendChild(script);
		// document.head.appendChild(script);

		promiseTracker.push(LoadJSFile(urlToLoad));

		/* promiseTracker.push($.ajax({
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
			})); */
	});

	// Wait for all promises to complete (pass or fail) 
	/* return $.when.apply($, promiseTracker).always(function () {
		if (callback && typeof (callback) === "function") {
			callback();
		}
	}); */
	// wait for all promises to be completed (pass or fail)
	Promise.all(promiseTracker)
		// if the promise is resolved with the settings
		.then((results) => {
			if (callback && typeof (callback) === 'function') {
				callback();
			}
		})
		.catch((error) => {
			console.log(`___failed to load: ${error.urlToLoad}`);
			console.log(error);
			console.log(error.status);
			console.log(error.statusText);
		});

	if (callback && typeof (callback) === 'function') {
		callback();
	}
}


/* function StrInStr(haystack, needle, flag) {
	let position = 0;
	haystack += '';
	needle += '';
	position = haystack.indexOf(needle);

	if (position == -1) {
		return false;
	} 
	if (flag == 1) {
		// return from beginning of string to beginning of needle
		return haystack.substr(0, position);
	} else if (flag == 2) {
		// return ?
		return haystack.slice(needle.length);
	} else if (flag == 3) {
		// return from needle to end of string, needle-exclusive
		return haystack.slice(position + needle.length);
	} 
	// return from needle to end of string, needle-inclusive
	return haystack.slice(position);
} */


function LoadFiles() {
	LoadCSSFiles(stylesheetsToLoad, () => {
		LoadJSFiles(settingsToLoad, settingsLoadingPromises, null, () => {
			const mData = window;
			console.log(mData);
			console.log('mData');
			// ReturnThisAppMData();
			/* if (StrInStr(mData.mosKey, "dev") != false) {
				centrallyManagedFileBasePathBasePath = devCentrallyManagedFileBasePathBasePath;
			} */
			LoadJSFiles(mosToLoad, mosLoadingPromises, mData, () => {
				// indicate readiness
			});
		});
	});
}

(function () {
	LoadFiles();
}());
