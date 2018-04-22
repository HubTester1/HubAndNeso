
// ----- IMPORTS

import * as React from 'react';
import HcMessagesData from './HcMessagesData';
import HcMessagesCommandBar from './components/HcMessagesCommandBar/HcMessagesCommandBar';
import HcMessagesList from './components/HcMessagesList/HcMessagesList';
import HcMessagesNewMessageForm from './components/HcMessagesNewMessageForm/HcMessagesNewMessageForm';

// ----- COMPONENT

export default class HcMessages extends React.Component {
	state = {
		messagesArray: [],
		tagsArray: [],
	};

	componentDidMount() {
		HcMessagesData.ReturnNesoMessagesTagsForHcMessages()
			.then((allMessageTags) => {
				this.setState(() => ({
					tagsArray: allMessageTags,
				}));
			});
		HcMessagesData.ReturnNesoMessagesMessagesForHcMessages()
			.then((allMessageMessages) => {
				this.setState(() => ({
					messagesArray: allMessageMessages,
				}));
			});
	}

	render() {
		return (
			<div id="hc-messages" className="mos-react-component-root">
				<h2>Messages</h2>
				<HcMessagesCommandBar
					tagsArray={this.state.tagsArray}
				/>
				<HcMessagesNewMessageForm
					tagsArray={this.state.tagsArray}
					onClick={this.handleNewMessage}
				/>
				<HcMessagesList messagesArray={this.state.messagesArray} />
			</div>
		);
	}
}
