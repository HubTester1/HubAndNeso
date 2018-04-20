import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class MosSpHTTPClient {

	public static GetSPData({ 
		spHttpClient, 
		siteURL, 
		api, 
		queryBase, 
		queryExtension
	}) {
		// construct query url
		const queryURL = (queryExtension) ? `${siteURL}/_api${api}${queryBase}?${queryExtension}` : `${siteURL}/_api${api}${queryBase}`;
		// return a new promise (or something else thenable)
		return spHttpClient.get(queryURL, SPHttpClient.configurations.v1)
			// if the promise (or whatever) is resolved with the result, then return the result
			.then((response) => { return response.json(); }); 
	}
}
