
// ----- IMPORTS

import * as React from 'react';


// ----- DEFINE INTERFACES





// ----- COMPONENT

class HcMessagesMessageImage extends React.Component<any, any> {
	public render() {
		if (this.props.messageContent.messageImage) {
			return (
				<div className="hc-messages-message-image mos-react-component-root">
					<img src={this.props.messageContent.messageImage} />
				</div>
			);
		} else {
			return (null);
		}
	}
}

export default HcMessagesMessageImage;