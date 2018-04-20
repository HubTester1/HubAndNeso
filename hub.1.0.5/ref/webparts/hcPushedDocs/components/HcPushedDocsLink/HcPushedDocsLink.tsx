
// ----- IMPORTS

import * as React from 'react';



// ----- DEFINE INTERFACES





// ----- COMPONENT

class hcPushedDocsLink extends React.Component<any, any> {
	public render() {
		console.log(this.props.listItemContent);
		return (
			<li key={this.props.listItemKey} id={`hc-pushed-links-list-item_${this.props.listItemKey}`} className="hc-pushed-links-list-item mos-react-component-root">
				<a href={this.props.listItemContent.url} className={`hc-pushed-links-link ${this.props.listItemContent.type}`}>{this.props.listItemContent.anchorText}</a>
			</li>
		);
	}
}

export default hcPushedDocsLink;