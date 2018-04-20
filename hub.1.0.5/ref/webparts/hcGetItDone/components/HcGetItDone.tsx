
// ----- IMPORTS

import * as React from 'react';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import NesoHTTPClient from '../../../helpers/NesoHTTPClient';
import MosSpHTTPClient from '../../../helpers/MosSpHTTPClient';
import { IHcGetItDoneProps } from './IHcGetItDoneProps';
import { escape } from '@microsoft/sp-lodash-subset';
import HcGetItDoneLink from './HcGetItDoneLink/HcGetItDoneLink';

// ----- DEFINE INTERFACES





// ----- COMPONENT

export default class HcGetItDone extends React.Component<any, any> {

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

			// collect the data from SP list and Neso
			let listItemQueryPromises = [
				MosSpHTTPClient.GetSPData({
					'spHttpClient': this.props.spHttpClient,
					'siteURL': 'https://bmos.sharepoint.com',
					'api': '/web/lists',
					'queryBase': "/GetByTitle('HR Docs')/items",
					"queryExtension": "$select=FileLeafRef,ServerRedirectedEmbedUrl,Title&$filter=Category eq 'Request Forms'"
				}),

				// get a promise to get Neso data
				NesoHTTPClient.GetNesoData('https://neso.mos.org/hcGetItDone/allItems'),
			];

			// wait for all queries to be completed
			Promise.all(listItemQueryPromises)
				// then
				.then((resultsReturnArray) => {
					console.log('resultsReturnArray');
					console.log(resultsReturnArray);
					// set up var to receive all list items
					let alllistItems = [];
					// iterate over the results and push them to allListItems
					resultsReturnArray.forEach(returnValue => {
						if (returnValue.value) {
							returnValue.value.forEach(itemValue => {
								let itemFormatted = {
									'url': '',
									'anchorText': '',
									'description': '',
									'department': '',
									'type': ''
								};
								if (itemValue.ServerRedirectedEmbedUrl && itemValue.FileLeafRef) {
									itemFormatted.url = itemValue.ServerRedirectedEmbedUrl;
									itemFormatted.anchorText = itemValue.FileLeafRef.toString();
									itemFormatted.description = itemValue.Title;
									itemFormatted.department = 'HR';
									itemFormatted.type = 'file';

									alllistItems.push(itemFormatted);
								}
							});
						}
						if (returnValue.data && returnValue.data.error === false) {
							returnValue.data.docs.forEach(itemValue => {
								let itemFormatted = {
									'url': '',
									'anchorText': '',
									'description': '',
									'department': '',
									'type': ''
								};
								if (itemValue.URL && itemValue.Name) {
									itemFormatted.url = itemValue.URL;
									itemFormatted.anchorText = itemValue.Name;
									itemFormatted.description = itemValue.Description;
									itemFormatted.department = itemValue.Department;
									itemFormatted.type = 'swf';
									
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
			<div id="hc-get-it-done" className="mos-react-component-root">
				<h2>Get it Done</h2>
				<ul>
					{
						this.state.listItemsArray.map((listItemValue, listItemIndex) => (
							<HcGetItDoneLink
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
