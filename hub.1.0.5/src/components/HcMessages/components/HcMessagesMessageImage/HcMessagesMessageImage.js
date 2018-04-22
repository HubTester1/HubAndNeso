
// ----- IMPORTS

import * as React from 'react';

// ----- COMPONENT

const HcMessagesMessageImage = (props) => {
	if (props.messageContent.messageImage) {
		return (
			<div className="hc-messages-message-image mos-react-component-root">
				<img src={props.messageContent.messageImage} />
			</div>
		);
	} 
	return (null);
};

export default HcMessagesMessageImage;