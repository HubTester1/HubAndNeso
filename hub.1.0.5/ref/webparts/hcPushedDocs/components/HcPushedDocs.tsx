
// ----- IMPORTS

import * as React from 'react';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import NesoHTTPClient from '../../../helpers/NesoHTTPClient';
import MosSpHTTPClient from '../../../helpers/MosSpHTTPClient';
import { IHcPushedDocsProps } from './IHcPushedDocsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import HcPushedDocsLink from './HcPushedDocsLink/HcPushedDocsLink';

// ----- DEFINE INTERFACES





// ----- COMPONENT

export default class HcPushedDocs extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {
			listItemsArray: []
		};
	}

	public componentDidMount() {
		// if we're in the SPO environment
		if (Environment.type == EnvironmentType.SharePoint ||
			Environment.type == EnvironmentType.ClassicSharePoint) {

			// collect the data from multiple SP lists and Neso
			let listItemQueryPromises = [
				MosSpHTTPClient.GetSPData({
					'spHttpClient': this.props.spHttpClient,
					'siteURL': 'https://bmos.sharepoint.com',
					'api': '/web/lists',
					'queryBase': "/GetByTitle('HubDocs')/items",
					"queryExtension": "$select=FileLeafRef,ServerRedirectedEmbedUrl,PushToHCName&$filter=PushToHC eq '1'"
				}),
				MosSpHTTPClient.GetSPData({
					'spHttpClient': this.props.spHttpClient,
					'siteURL': 'https://bmos.sharepoint.com',
					'api': '/web/lists',
					'queryBase': "/GetByTitle('HR Docs')/items",
					"queryExtension": "$select=FileLeafRef,ServerRedirectedEmbedUrl,PushToHCName&$filter=PushToHC eq '1'"
				}),
				MosSpHTTPClient.GetSPData({
					'spHttpClient': this.props.spHttpClient,
					'siteURL': 'https://bmos.sharepoint.com',
					'api': '/web/lists',
					'queryBase': "/GetByTitle('PublicSafetyDocs')/items",
					"queryExtension": "$select=FileLeafRef,ServerRedirectedEmbedUrl,PushToHCName&$filter=PushToHC eq '1'"
				}),
				MosSpHTTPClient.GetSPData({
					'spHttpClient': this.props.spHttpClient,
					'siteURL': 'https://bmos.sharepoint.com',
					'api': '/web/lists',
					'queryBase': "/GetByTitle('HCPushedLinks')/items",
					"queryExtension": ""
				}),
			];

			// wait for all queries to be completed
			Promise.all(listItemQueryPromises)
				// then
				.then((resultsReturnArray) => {
					// set up var to receive all list items
					let alllistItems = [];
					// iterate over the results and push them to allListItems
					resultsReturnArray.forEach(returnValue => {
						if (returnValue.value) {
							returnValue.value.forEach(itemValue => {
								let itemFormatted = {
									'url': '',
									'anchorText': '',
									'type': ''
								};
								if (itemValue.ServerRedirectedEmbedUrl) {
									itemFormatted.url = itemValue.ServerRedirectedEmbedUrl;
									itemFormatted.anchorText = itemValue.PushToHCName;
									itemFormatted.type = 'file';

									alllistItems.push(itemFormatted);
								}
								if (itemValue.URL) {
									itemFormatted.url = itemValue.URL.Url;
									itemFormatted.anchorText = itemValue.URL.Description;
									itemFormatted.type = 'link';

									alllistItems.push(itemFormatted);
								}
							});
						}
					});

					// sort allListItems by anchorText properties
					alllistItems.sort((a, b) => {
						if (a.anchorText < b.anchorText) return -1;
						if (a.anchorText > b.anchorText) return 1;
						return 0;
					});

					// set state to allListItems
					this.setState(() => ({
						listItemsArray: alllistItems,
					}));
				});



		}
	}

	public render() {
		return (
			<div id="hc-pushed" className="mos-react-component-root">
				<h2>Please Be Aware</h2>
				<ul>
					{
						this.state.listItemsArray.map((listItemValue, listItemIndex) => (
							<HcPushedDocsLink
								key={listItemIndex}
								listItemKey={listItemIndex}
								listItemContent={listItemValue}
							/>
						))
					}

				</ul>
			</div>
		);
	}
}
