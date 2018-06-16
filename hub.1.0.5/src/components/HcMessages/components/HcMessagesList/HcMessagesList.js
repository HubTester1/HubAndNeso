
// ----- IMPORTS

import * as React from 'react';
import HcMessagesMessagePreview from '../HcMessagesMessagePreview/HcMessagesMessagePreview';

// ----- COMPONENT
export default class HcMessagesList extends React.Component {
	render() {
		console.log('HcMessagesList uData');
		console.log(this.props.uData);
		if (this.props.messagesThisPage && this.props.messagesThisPage[0]) {
			return (
				<div id="hc-messages-list-and-pagination">
					<ul id="hc-messages-list" className="mos-react-component-root">
						{
							this.props.messagesThisPage.map((messageValue, messageIndex) => (
								<HcMessagesMessagePreview
									key={messageValue.key}
									messageId={messageValue.key}
									messageContent={messageValue}
									uData={this.props.uData}
									enableMessageUpdate={this.props.enableMessageUpdate}
								/>
							))
						}
					</ul>
				</div>
			);
		} 
		return ('Sorry, I can\'t find any messages to show you.');
	}
}
