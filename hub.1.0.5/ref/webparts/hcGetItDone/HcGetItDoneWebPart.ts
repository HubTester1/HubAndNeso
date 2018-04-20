
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
import HcGetItDone from './components/HcGetItDone';
import { IHcGetItDoneProps } from './components/IHcGetItDoneProps';


// ----- INTERFACES

// the complex type somethinged by the web part class; *coincidentally*, it is blank because
// 		we're not taking any props from the SP property pane
export interface IHcGetItDoneWebPartProps {}

// ----- WEB PART

export default class HcGetItDoneWebPart extends BaseClientSideWebPart<IHcGetItDoneWebPartProps> {

	// RENDER THE WEBPART ---

	public render(): void {

		// create the main react component using:
		// 		the HcGetItDoneWebPart class that extends React.Component in components/HcGetItDoneWebPart.tsx
		//		props, which implements IHcGetItDoneProps interface defined in
		// 		components/IHcGetItDoneProps.ts; *coincidentally*, it is blank because
		// 		we're not taking any props from the SP property pane
		const mainReactComponent: React.ReactElement<IHcGetItDoneProps> = React.createElement(
			HcGetItDone,
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
