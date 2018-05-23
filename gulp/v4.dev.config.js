
module.exports = {
	ReturnV4DevStylesSrcFolder: () => './hub.1.0.4/sass',
	ReturnV4DevStylesSrcFile: () => './hub.1.0.4/sass/mos.sass',
	ReturnV4DevStylesDistFolder: () => './hub.1.0.4/css',
	ReturnV4DevStylesDistFile: () => './hub.1.0.4/css/mos.css',

	ReturnV4DevSWFAPIDevFiles: () => './hub.1.0.4/js/dev_mos-main*.js',
	
	ReturnV4DevDistFolder: () => './hub.1.0.4',
	ReturnV4SPSaveDevAllOptions: () => ({
		siteUrl: 'https://bmos.sharepoint.com/sites/hubdev',
		notification: true,
		folder: 'DevCode4',
		flatten: false,
	}),
	ReturnV4SPSaveDevCSSOptions: () => ({
		siteUrl: 'https://bmos.sharepoint.com/sites/hubdev',
		notification: true,
		folder: 'DevCode4/css',
		flatten: false,
	}),
	ReturnV4SPSaveDevSWFAPIOptions: () => ({
		siteUrl: 'https://bmos.sharepoint.com/sites/hubdev',
		notification: true,
		folder: 'DevCode4/js',
		flatten: false,
	}),
};
