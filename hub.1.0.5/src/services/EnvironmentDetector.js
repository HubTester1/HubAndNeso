
module.exports = {
	ReturnIsSPO: () => window.location.hostname.indexOf('sharepoint') > -1,
	ReturnIsHCScreen: () => window.location.pathname.toLowerCase() === '/sites/hc11/sitepages/app.aspx' || window.location.pathname.toLowerCase() === '/sites/hc12/sitepages/app.aspx' || window.location.pathname.toLowerCase() === '/sites/hc13/sitepages/app.aspx' || window.location.pathname.toLowerCase() === '/sites/hc14/sitepages/app.aspx' || window.location.hostname.indexOf('192') > -1,
};
