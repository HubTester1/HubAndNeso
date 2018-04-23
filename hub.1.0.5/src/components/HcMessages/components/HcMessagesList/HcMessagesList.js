
// ----- IMPORTS

import * as React from 'react';
import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';

// ----- COMPONENT

export default class HcMessagesList extends React.Component {
	render() {
		console.log('this.props.messagesArray');
		console.log(this.props.messagesArray);
		return (
			<ul id="hc-messages-list" className="mos-react-component-root">
				{
					this.props.messagesArray.map((messageValue, messageIndex) => (
						<HcMessagesMessage
							key={messageValue.key}
							messageId={messageValue.key}
							messageContent={messageValue}
						/>
					))
				}
			</ul>
		);
	}
}
/* 
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
 */
