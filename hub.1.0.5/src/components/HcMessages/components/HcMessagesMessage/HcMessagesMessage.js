
// ----- IMPORTS

import * as React from 'react';
import HcMessagesMessageCreator from '../HcMessagesMessageCreator/HcMessagesMessageCreator';
import HcMessagesMessageImage from '../HcMessagesMessageImage/HcMessagesMessageImage';

// ----- COMPONENT

const HcMessagesMessage = props => (
	<li id={`hc-messages-message_${props.messageId}`} className="hc-messages-message mos-react-component-root">
		<h3 className="hc-messages-message-subject">
			{props.messageContent.subject}
		</h3>
		<HcMessagesMessageCreator
			creator={props.messageContent.creator}
		/>
		<HcMessagesMessageImage
			messageContent={props.messageContent}
		/>
		<p className="hc-messages-message-created">{props.messageContent.created}</p>
		<div className="hc-messages-message-body">{props.messageContent.body}</div>
		<p className="hc-messages-message-tags">#{props.messageContent.tag}</p>
	</li>
);

export default HcMessagesMessage;