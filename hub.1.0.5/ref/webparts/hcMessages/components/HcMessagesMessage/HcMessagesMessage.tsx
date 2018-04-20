
// ----- IMPORTS

import * as React from 'react';

import HcMessagesMessageCreator from '../HcMessagesMessageCreator/HcMessagesMessageCreator';
import HcMessagesMessageImage from '../HcMessagesMessageImage/HcMessagesMessageImage';


// ----- DEFINE INTERFACES





// ----- COMPONENT

class HcMessagesMessage extends React.Component<any, any> {
	public render() {
		return (
			<li key={this.props.messageKey} id={`hc-messages-message_${this.props.messageKey}`} className="hc-messages-message mos-react-component-root">
				<h3 className="hc-messages-message-subject">
					{this.props.messageContent.messageSubject}
				</h3>
				<HcMessagesMessageCreator
					creator={this.props.messageContent.messageCreator}
				/>
				<HcMessagesMessageImage
					messageContent={this.props.messageContent}
				/>
				<p className="hc-messages-message-created">{this.props.messageContent.messageCreated}</p>
				<div className="hc-messages-message-body">{this.props.messageContent.messageBody}</div>
			</li>
		);
	}
}

export default HcMessagesMessage;