
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
import HcPushedDocs from './components/HcPushedDocs';
import { IHcPushedDocsProps } from './components/IHcPushedDocsProps';



// ----- INTERFACES

// the complex type somethinged by the web part class; *coincidentally*, it is blank because
// 		we're not taking any props from the SP property pane
export interface IHcPushedDocsWebPartProps {}

// ----- WEB PART

export default class HcPushedDocsWebPart extends BaseClientSideWebPart<IHcPushedDocsWebPartProps> {

	// RENDER THE WEBPART ---

	public render(): void {

		// create the main react component using:
		// 		the HcPushedDocsWebPart class that extends React.Component in components/HcPushedDocsWebPart.tsx
		//		props, which implements IHcPushedDocsWebPartProps interface defined in
		// 		components/IHcPushedDocsWebPartProps.ts; *coincidentally*, it is blank because
		// 		we're not taking any props from the SP property pane
    const mainReactComponent: React.ReactElement<IHcPushedDocsProps > = React.createElement(
      HcPushedDocs,
		{ spHttpClient: this.context.spHttpClient }
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
