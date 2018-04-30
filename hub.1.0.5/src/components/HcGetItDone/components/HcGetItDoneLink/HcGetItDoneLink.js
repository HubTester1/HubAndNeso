
// ----- IMPORTS

import * as React from 'react';

// ----- COMPONENT

const HcGetItDoneLink = props => (
	<li id={`hc-get-it-done-item_${props.listItemKey}`} className="hc-get-it-done-item mos-react-component-root">
		<p><a href={props.listItemContent.url} className={`hc-get-it-done-item-link ${props.listItemContent.type}`}>{props.listItemContent.anchorText}</a></p>
		<p>{props.listItemContent.description}</p>
	</li>
);

export default HcGetItDoneLink;
