
// ----- IMPORTS

import * as React from 'react';



// ----- DEFINE INTERFACES





// ----- COMPONENT

class hcGetItDoneLink extends React.Component<any, any> {
	public render() {
		console.log(this.props.listItemContent);
		return (
			<li key={this.props.listItemKey} id={`hc-get-it-done-list-item_${this.props.listItemKey}`} className="hc-get-it-done-list-item mos-react-component-root">
				<p><a href={this.props.listItemContent.url} className={`hc-pushed-links-link ${this.props.listItemContent.type}`}>{this.props.listItemContent.anchorText}</a></p>
				<p>{this.props.listItemContent.description}</p>
			</li>
		);
	}
}

export default hcGetItDoneLink;