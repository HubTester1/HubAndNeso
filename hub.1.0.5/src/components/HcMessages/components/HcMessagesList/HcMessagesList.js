
// ----- IMPORTS

import * as React from 'react';
import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';

// ----- COMPONENT

const HcMessagesList = props => (
	<ul id="hc-messages-list" className="mos-react-component-root">
		{
			props.messagesArray.map((messageValue, messageIndex) => (
				<HcMessagesMessage
					key={messageValue.key}
					messageId={messageValue.key}
					messageContent={messageValue}
				/>
			))
		}
	</ul>
);

export default HcMessagesList;
