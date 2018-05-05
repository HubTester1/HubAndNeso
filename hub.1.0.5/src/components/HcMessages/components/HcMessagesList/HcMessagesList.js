
// ----- IMPORTS

import * as React from 'react';
// import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';
import HcMessagesMessagePreview from '../HcMessagesMessagePreview/HcMessagesMessagePreview';

// ----- COMPONENT

const HcMessagesList = (props) => {
	// console.log(props.messagesArray);
	if (props.messagesArray[0]) {
		return (
			<ul id="hc-messages-list" className="mos-react-component-root">
				{
					props.messagesArray.map((messageValue, messageIndex) => (
						<HcMessagesMessagePreview
							key={messageValue.key}
							messageId={messageValue.key}
							messageContent={messageValue}
						/>
					))
				}
			</ul>
		);
	} 
	return ('Sorry, I can\'t find any messages with that tag.');
};

export default HcMessagesList;
