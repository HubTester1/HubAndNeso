
module.exports = {
	ReturnIsSPO: () => window.location.hostname.indexOf('sharepoint') > -1,
	ReturnIsHCScreen: () => window.location.pathname.toLowerCase().indexOf('app.aspx') > -1 ||
			window.location.hostname.indexOf('192') > -1,
};
