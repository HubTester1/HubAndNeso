
// ----- PULL IN MODULES & OTHER STUFF

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SampleWebPartStrings';
import Sample from './components/Sample';
import { ISampleProps } from './components/ISampleProps';
import MockHttpClient from './MockHttpClient';
import {
	SPHttpClient,
	SPHttpClientResponse
} from '@microsoft/sp-http';
import {
	Environment,
	EnvironmentType
} from '@microsoft/sp-core-library';
import styles from './components/Sample.module.scss';


// ----- DEFINE INTERFACES

// web part properties
export interface ISampleWebPartProps {
	description: string;
	hereknae: string;
	volschtein: string;
}

// array of list objects
export interface ISPLists {
	value: ISPList[];
}

// list objects
export interface ISPList {
	Title: string;
	Id: string;
}


// ----- DEFINE WEB PART

export default class SampleWebPart extends BaseClientSideWebPart<ISampleWebPartProps> {

	// RENDER THE WEBPART ---

	public render(): void {

		// create react elment using:
		// 		the Sample class that extends React.Component in components/Sample.tsx
		//		props, which implements ISampleProps interface defined in components/ISampleProps.ts
		// note: this.properties is this web part's properties, as defined in the property pane
		const element: React.ReactElement<ISampleProps> =
			React.createElement(
				Sample,
				{
					description: this.properties.description,
					context: this.context
				}
			);
		
		// render the react element
		ReactDom.render(element, this.domElement);
		
		// populate react element with data
		this._getDataAndPopulateReactComponentAsync();
	}

	// DATA ---

	private _getDataAndPopulateReactComponentAsync(): void {
		// if we're in the local environment
		if (Environment.type === EnvironmentType.Local) {
			// get a promise to get mock list data
			this._getMockListData()
				// if the promise is resolved with the data
				.then((response) => {
					// pass the data's value property (an array of lists) to populating method
					this._populateReactComponentWithListData(response.value);
				});
		// if we're in the SPO environment
		} else if (Environment.type == EnvironmentType.SharePoint ||
			Environment.type == EnvironmentType.ClassicSharePoint) {
			// get a promise to get sp list data
			this._getSPListData()
				// if the promise is resolved with the data
				.then((response) => {
					// pass the data's value property (an array of lists) to populating method
					this._populateReactComponentWithListData(response.value);
				});
		}
	}

	private _populateReactComponentWithListData(items: ISPList[]): void {
		// set up var
		// html will be a markup string
		let html: string = '';
		// build up the markup string with the list data
		// iterate over the array of lists
		items.forEach((item: ISPList) => {
			// add an ol and li for this list
			// 		this should really push to react, but I didn't flesh it out;
			// 		thus, styles won't work
			// 		<ul class="${styles.list}">
			// 		<li class="${styles.listItem}" >
			html += `<ul>
						<li>
						<span class="ms-font-l">${item.Title}</span>
						</li>
					</ul>`;
		});
		// get the DOM element to which the markup will be added
		const listContainer: Element = this.domElement.querySelector('#spListContainer');
		// add the markup to the DOM element
		listContainer.innerHTML = html;
	}

	// method to get data from mock http client
	private _getMockListData(): Promise<ISPLists> {
		return MockHttpClient.get()
			.then((data: ISPList[]) => {
				var listData: ISPLists = { value: data };
				return listData;
			}) as Promise<ISPLists>;
	}

	// method to get data from SharePoint http client
	private _getSPListData(): Promise<ISPLists> {
		return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + 
				`/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
			.then((response: SPHttpClientResponse) => {
				return response.json();
			});
	}









	// PROPERTY PANE (config ui) ---

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: "A description of this page of the property pane"
					},
					groups: [
						{
							groupName: "Field Group One",
							groupFields: [
								PropertyPaneTextField('description', {
									label: "Describe this WebPart"
								})
							]
						}, {
							groupName: "Field Group Two",
							groupFields: [
								PropertyPaneTextField('hereknae', {
									label: "What is a Hereknae?"
								})
							]
						}
					]
				}, {
					header: {
						description: "A description of this OTHER page of the property pane"
					},
					groups: [
						{
							groupName: "Field Group Three",
							groupFields: [
								PropertyPaneTextField('volschtein', {
									label: "What is a Volschtein?"
								})
							]
						}
					]
				}
			]
		};
	}

	// VERSIONING??? ---
	// no idea
	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}
}
