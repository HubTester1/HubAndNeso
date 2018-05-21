
module.exports = {
	ReturnV4DevStylesSrcFolder: () => './hub.1.0.4/sass',
	ReturnV4DevStylesDistFolder: () => './hub.1.0.4/css',
	ReturnV4DevDistFolder: () => './hub.1.0.4',
	ReturnV4SPSaveDevOptions: () => ({
		siteUrl: 'https://bmos.sharepoint.com/sites/hubdev',
		notification: true,
		folder: 'DevCode4',
		flatten: false,
	}),
};
