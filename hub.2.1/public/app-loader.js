/**
 * @name App Loader Service
 * @category Services
 * @description File is loaded by JS script in SharePoint Online (SPO) master page (mos.2.1.master).
 * JS code executes automatically. This is the connection between SPO and this app.
 * 
 * Code either loads the app or arranges things for other SPO areas that use 
 * the same master page.
 * 
 * This is vanilla ES6; it is not compiled or otherwise manipulated. 
 * Thus, it is both source and distribution, and lives in /public.
 * 
 * @todo Get showe and shudson ribbon permission from database - in user service
 * @todo Get jbaker ribbon permission from database - in user service
 */

// global vars
const debugMode = true;
// eslint-disable-next-line no-undef
const userName = _spPageContextInfo.userLoginName.slice(0, -8);
// eslint-disable-next-line no-console
if (debugMode) { console.log('using app-loader m6'); }

// if this page is App.aspx
if (window.location.pathname.indexOf('/App.aspx') !== -1) {
	// extract params from URL into array
	const paramsReceived = window.location.search.substring(1).split('&');
	// set up array to hold params to be sent
	const paramsToSend = [];
	// set up base of iframe url
	let iframeURL = 'https://neso.mos.org:3001/index';
	// if there are params
	if (paramsReceived[0] !== '') {
		// iterate over each param
		paramsReceived.forEach((paramValue, paramIndex) => {
			const paramLabel = paramValue.substring(0, 1);
			const paramToken = paramValue.substring(2);
			// push param with corresponding label; u param is ignored here
			switch (paramLabel) {
			case 's':
				paramsToSend.push(`s=${paramToken}`);
				break;
			case 'p':
				paramsToSend.push(`p=${paramToken}`);
				break;
			case 'o':
				paramsToSend.push(`o=${paramToken}`);
				break;
			default:
				break;
			}
		});
	}
	// get current user
	paramsToSend.push(`u=${userName}`);
	// construct iframe URL
	paramsToSend.forEach((paramValue, paramIndex) => {
		iframeURL = paramIndex === 0 ? 
			`${iframeURL}?${paramValue}` :
			`${iframeURL}&${paramValue}`;
	});
	// mount iframe on app mount point
	const iframeElement = document.createElement('iframe');
	iframeElement.id = 'app-iframe';
	iframeElement.src = iframeURL;
	document.getElementById('app-mount-point').appendChild(iframeElement);
	// show app mount point
	document.getElementById('app-mount-point').className = 'visible';
	// hide loading screen
	document.getElementById('overlays-screen-container').style.display = 'none';
	document.getElementById('loading-screen').className = 'hidden';
// if this is NOT App.aspx
} else {
	// hide loading screen
	document.getElementById('overlays-screen-container').style.display = 'none';
	document.getElementById('loading-screen').className = 'hidden';
	// show SP main content
	document.getElementById('s4-workspace').className = 'visible';
	document.getElementById('s4-bodyContainer').className = 'visible';
	// if user is jbaker
	if (userName && userName === 'jbaker') {
		// show SP ribbon and make room for it
		document.getElementById('s4-ribbonrow').className = 'visible';
		document.getElementById('s4-bodyContainer').style.paddingTop = '1rem';
	}
	// for certain other users
	if (userName && (userName === 'showe' || userName === 'shudson')) {
		// try to get the ribbon for Accounting What's New list
		const ribbonForStanSarah = document.querySelector('form[action^="/Lists/Accounting%20Whats%20New%20Hub"] div#s4-ribbonrow');
		// if that ribbon was found
		if (ribbonForStanSarah) {
			// show it
			ribbonForStanSarah.style.display = 'block';
		}
	}
}
