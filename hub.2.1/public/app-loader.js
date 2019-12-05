
// ---- GLOBAL VARS

const debugMode = true;
const date = new Date();
const timestamp = date.getTime();

if (debugMode) { console.log('using app-loader m3'); }

// Note: param map:
// 		s = screen requested, e.g., messages
// 		p = partial screen requested, e.g., classifieds tab within messages
// 		u = user's account name
// 		o = user override, e.g., emulate sp1 while signed in as jbaker
// Note: we can't assume that a URL contains an accurate u param, as people
// 		will pass URLs around; therefore, we must extract the others and then 
// 		retrieve a new u param from Microsoft

// if this page is App.aspx
if (window.location.pathname.indexOf('/App.aspx') !== -1) {
	if (debugMode) { console.log('on APP'); }
	// extract params from URL into array
	const paramsReceived = window.location.search.substring(1).split("&");
	
	// set up array to hold params to be sent
	const paramsToSend = [];
	// set up base of iframe url
	let iframeURL = 'https://neso.mos.org:3001/index';
	// if there are params
	if (paramsReceived[0] !== "") {
		// iterate over each param
		paramsReceived.forEach((paramValue, paramIndex) => {
			const paramLabel = paramValue.substring(0, 1);
			const paramToken = paramValue.substring(2);
			// push param with corresponding label; u param is ignored here
			switch (paramLabel) {
				case 's':
					paramsToSend.push('s=' + paramToken);
					break;
				case 'p':
					paramsToSend.push('p=' + paramToken);
					break;
				case 'o':
					paramsToSend.push('o=' + paramToken);
					break;
				default:
					break;
			}
		});
	}

	// get current user
	paramsToSend.push('u=' + _spPageContextInfo.userLoginName.slice(0,-8));

	// construct iframe URL
	paramsToSend.forEach((paramValue, paramIndex) => {
		iframeURL = paramIndex === 0 ? 
			iframeURL + '?' + paramValue :
			iframeURL + '&' + paramValue;
	});

	// append CSS
	const cssString = `
		#app-iframe{position:absolute;width:100%;height:100%}
		#s4-ribbonrow{display:none;}
		#s4-workspace{display:none;}
	`;

	var linkElement = document.createElement('link');
	linkElement.setAttribute('rel', 'stylesheet');
	linkElement.setAttribute('type', 'text/css');
	linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(cssString));
	document.getElementsByTagName('head')[0].appendChild(linkElement);


	// append iframe	
	var iframeElement = document.createElement('iframe');
	iframeElement.id = 'app-iframe';
	iframeElement.src = iframeURL;
	document.getElementById('app-mount-point').appendChild(iframeElement);

	// hide loading
	document.getElementById('overlays-screen-container').style.display = 'none';
	document.getElementById('app-mount-point').className = 'visible';
	document.getElementById('loading-screen').className = 'hidden';

// if this is NOT App.aspx
} else {
	document.getElementById('overlays-screen-container').style.display = 'none';
	document.getElementById('s4-bodyContainer').className = 'visible';
	document.getElementById('app-mount-point').className = 'visible';
	document.getElementById('loading-screen').className = 'hidden';
}

