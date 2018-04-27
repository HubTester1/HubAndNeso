
// ----- IMPORTS

import * as React from 'react';

// ----- COMPONENT

const HcMessagesMessageImage = (props) => {
	if (props.imageContent) {
		return (
			<div
				id={`hc-messages-message-image-container_${props.imageID}`}
				className="hc-messages-message-image mos-react-component-root"
			>
				<img 
					id={`hc-messages-message-image_${props.imageID}`}
					src={props.imageContent.url}
				/>
			</div>
		);
	}
	return (null);
};

export default HcMessagesMessageImage;
