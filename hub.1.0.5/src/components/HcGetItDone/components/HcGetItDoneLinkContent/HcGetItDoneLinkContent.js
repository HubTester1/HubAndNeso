
// ----- IMPORTS

import * as React from 'react';

// ----- COMPONENT

const HcGetItDoneLinkContent = props => (
	<div className="hc-get-it-done-item-cotnent mos-react-component-root">
		<p><a href={props.listItemContent.url} className={`hc-get-it-done-item-link ${props.listItemContent.type}`}>{props.listItemContent.anchorText}</a></p>
		<p>{props.listItemContent.description}</p>
	</div>
);

export default HcGetItDoneLinkContent;
