
// ----- IMPORTS

import * as React from 'react';
import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';


// ----- DEFINE INTERFACES





// ----- COMPONENT

class HcMessagesList extends React.Component<any, any> {
	public render() {
		return (
			<ul id="hc-messages-list" className="mos-react-component-root">
				{
					this.props.messagesArray.map((messageValue, messageIndex) => (
						<HcMessagesMessage
							key={messageIndex}
							messageKey={messageIndex}
							messageContent={messageValue}
						/>
					))
				}
			</ul>
		);
	}
}

export default HcMessagesList;