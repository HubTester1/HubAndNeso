
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
			showNewMessageForm: false, // ============================================== REVERT
		};
		this.addMessageToList = this.addMessageToList.bind(this);
		this.handleClickNewMessageButton = this.handleClickNewMessageButton.bind(this);
		this.handleClickHideNewMessageButton = this.handleClickHideNewMessageButton.bind(this);
		this.handleClickTagFilterMenuLabel = this.handleClickTagFilterMenuLabel.bind(this);
		this.handleClickTagFilterMenuItem = this.handleClickTagFilterMenuItem.bind(this);
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
				tags: [newMessageProperties.newMessageTags[0]],
				key: newMessageProperties.newMessageKey,
			}, ...prevState.messagesArray];
			return {
				messagesArray: newMessageArray,
			};
		});
	}
	handleClickNewMessageButton(e) {
		e.preventDefault();
		this.setState(() => ({
			showNewMessageForm: true,
		}));
	}
	handleClickHideNewMessageButton(e) {
		e.preventDefault();
		this.setState(() => ({
			showNewMessageForm: false,
		}));
	}
	handleClickTagFilterMenuLabel(e) {
		e.preventDefault();
	}
	handleClickTagFilterMenuItem(e, menuItem) {
		// must prevent default or else *#@^$#%^ SP page will try to submit a form (because
		// 		a button has been clicked inside a form tag); unfortunately, this also
		// 		prevents the menu from closing
		e.preventDefault();
		console.log(menuItem);

		if (menuItem.name === 'All') {
			HcMessagesData.ReturnNesoMessagesMessagesForHcMessages()
				.then((allMessageMessages) => {
					this.setState(() => ({
						messagesArray: allMessageMessages,
					}));
				});
		} else {
			HcMessagesData.ReturnNesoMessagesMessagesWithSpecifiedTagForHcMessages(menuItem.name)
				.then((specifiedMessages) => {
					console.log(specifiedMessages);
					this.setState(() => ({
						messagesArray: specifiedMessages,
					}));
				});
		}
		// return true to close the menu
		return true;
	}

	render() {
		return (
			<div id="hc-messages" className="mos-react-component-root">
				<h2>Messages</h2>
				<HcMessagesCommandBar
					tagsArray={this.state.tagsArray}
					handleClickNewMessageButton={this.handleClickNewMessageButton}
					handleClickHideNewMessageButton={this.handleClickHideNewMessageButton}
					showingNewMessageForm={this.state.showNewMessageForm}
					handleClickTagFilterMenuLabel={this.handleClickTagFilterMenuLabel}
					handleClickTagFilterMenuItem={this.handleClickTagFilterMenuItem}
				/>
				<HcMessagesNewMessageForm
					show={this.state.showNewMessageForm}
					tagsArray={this.state.tagsArray}
					addMessageToList={this.addMessageToList}
					uData={this.props.uData}
				/>
				<HcMessagesList messagesArray={this.state.messagesArray} />
			</div>
		);
	}
}
