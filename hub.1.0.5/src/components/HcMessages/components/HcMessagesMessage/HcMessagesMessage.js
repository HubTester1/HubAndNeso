
// ----- IMPORTS

import * as React from 'react';
import HcMessagesMessageCreator from '../HcMessagesMessageCreator/HcMessagesMessageCreator';
import HcMessagesMessageImage from '../HcMessagesMessageImage/HcMessagesMessageImage';
import MOSUtilities from '../../../../services/MOSUtilities';

// ----- COMPONENT

const HcMessagesMessage = props => 
	(
		<div id={`hc-messages-message_${props.messageId}`} className="hc-messages-message mos-react-component-root">
			<h3 className="hc-messages-message-subject">
				{props.messageContent.subject}
			</h3>
			<HcMessagesMessageCreator
				creator={props.messageContent.creator}
			/>

			<p className="hc-messages-message-created">
				{MOSUtilities.ReturnFormattedDateTime({
					incomingDateTimeString: props.messageContent.created,
					incomingReturnFormat: 'MMMM D, YYYY',
					determineYearDisplayDynamically: 1,
				})}
			</p>
			{
				props.messageContent.images &&
				props.messageContent.images.map(imageValue => (
					<HcMessagesMessageImage
						key={imageValue.key}
						imageID={imageValue.key}
						imageContent={imageValue}
					/>
				))
			}
			<div className="hc-messages-message-body">{props.messageContent.body}</div>
			{/* note: currently only one tag per message */}
			<p className="hc-messages-message-tags">#{props.messageContent.tags[0]}</p>
		</div>
	);
export default HcMessagesMessage;

