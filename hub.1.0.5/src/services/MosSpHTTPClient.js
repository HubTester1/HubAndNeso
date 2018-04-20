import { Web } from 'sp-pnp-js';

module.exports = {

	GetListItemsBasic: (siteURL, listOrLib, listTitle) => {
		const web = new Web(siteURL);
		const listToken = listOrLib === 'list' ? `Lists${listTitle}` : listTitle;
		return web.lists.getByTitle(listToken).items.get();
	},

	GetListItemsSelectAndFilter: (siteURL, listOrLib, listTitle, selectFields, filter) => {
		const web = new Web(siteURL);
		const listToken = listOrLib === 'list' ? `Lists${listTitle}` : listTitle;
		console.log(selectFields);
		return web.lists.getByTitle(listToken).items.select(selectFields).get();
	},

};

