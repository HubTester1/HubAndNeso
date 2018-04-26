
// ----- IMPORTS

import * as React from 'react';
import HcMessagesMessageCreator from '../HcMessagesMessageCreator/HcMessagesMessageCreator';
import HcMessagesMessageImage from '../HcMessagesMessageImage/HcMessagesMessageImage';
import MOSUtilities from '../../../../services/MOSUtilities';

// ----- COMPONENT

const HcMessagesMessage = (props) => 
	// console.log(props.messageContent);
	 (
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
			<p className="hc-messages-message-created">
				{MOSUtilities.ReturnFormattedDateTime({
					incomingDateTimeString: props.messageContent.created,
					incomingReturnFormat: 'MMMM D, YYYY',
					determineYearDisplayDynamically: 1,
				})}
			</p>
			<div className="hc-messages-message-body">{props.messageContent.body}</div>
			{/* currently only one tag per message */}
			<p className="hc-messages-message-tags">#{props.messageContent.tags[0]}</p>
		</li>
	)
;
export default HcMessagesMessage;
