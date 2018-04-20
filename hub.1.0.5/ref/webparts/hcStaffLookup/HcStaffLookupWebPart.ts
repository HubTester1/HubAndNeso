
// ----- IMPORTS

// React and ReactDOM
import * as React from 'react';
import * as ReactDom from 'react-dom';
// no idea, but seems to be necessary
import { Version } from '@microsoft/sp-core-library';
// SP web part
// consider paring away IPropertyPaneConfiguration and PropertyPaneTextField
import {
	BaseClientSideWebPart,
	IPropertyPaneConfiguration,
	PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
// the main component
import HcStaffLookup from './components/HcStaffLookup';
import { IHcStaffLookupProps } from './components/IHcStaffLookupProps';


// ----- INTERFACES

// the complex type somethinged by the web part class; *coincidentally*, it is blank because
// 		we're not taking any props from the SP property pane
export interface IHcStaffLookupWebPartProps {
	description: string;
}

// ----- WEB PART

export default class HcStaffLookupWebPart extends BaseClientSideWebPart<IHcStaffLookupWebPartProps> {

	// RENDER THE WEBPART ---

	public render(): void {

		// create the main react component using:
		// 		the HcStaffLookupWebPart class that extends React.Component in components/HcStaffLookupWebPart.tsx
		//		props, which implements IHcStaffLookupProps interface defined in
		// 		components/IHcStaffLookupProps.ts; *coincidentally*, it is blank because
		// 		we're not taking any props from the SP property pane
		const mainReactComponent: React.ReactElement<IHcStaffLookupProps> = React.createElement(
			HcStaffLookup,
			{}
		);

		// render the react element
		ReactDom.render(mainReactComponent, this.domElement);
	}

	// VERSIONING??? ---
	// no idea
	protected get dataVersion(): Version {
		return Version.parse('1.0');
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

}
