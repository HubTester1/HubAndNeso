
// ----- IMPORTS

import * as React from 'react';
import HcMessagesData from './HcMessagesData';
import HcMessagesCommandBar from './components/HcMessagesCommandBar/HcMessagesCommandBar';
import HcMessagesList from './components/HcMessagesList/HcMessagesList';
import HcMessagesNewMessageForm from './components/HcMessagesNewMessageForm/HcMessagesNewMessageForm';

// ----- COMPONENT

export default class HcMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messagesArray: [],
			tagsArray: [],
		};
		this.addMessageToList = this.addMessageToList.bind(this);
	}
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
	addMessageToList(newMessageProperties) {
		this.setState((prevState) => {
			const newMessageArray = [{
				body: newMessageProperties.newMessageBody,
				created: newMessageProperties.newMessageCreated,
				creator: newMessageProperties.newMessageCreator,
				image: newMessageProperties.newMessageImage,
				subject: newMessageProperties.newMessageSubject,
				tag: newMessageProperties.newMessageTag.text,
				key: newMessageProperties.newMessageKey,
			}, ...prevState.messagesArray];
			return {
				messagesArray: newMessageArray,
			};
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
					addMessageToList={this.addMessageToList}
					uData={this.props.uData}
				/>
				<HcMessagesList messagesArray={this.state.messagesArray} />
			</div>
		);
	}
}
