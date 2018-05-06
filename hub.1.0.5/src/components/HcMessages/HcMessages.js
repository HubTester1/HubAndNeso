
// ----- IMPORTS

import * as React from 'react';
import Pagination from 'react-js-pagination';
import HcMessagesData from './HcMessagesData';
import HcMessagesCommandBar from './components/HcMessagesCommandBar/HcMessagesCommandBar';
import HcMessagesList from './components/HcMessagesList/HcMessagesList';
import HcMessagesNewMessageForm from './components/HcMessagesNewMessageForm/HcMessagesNewMessageForm';

// ----- COMPONENT

const messagesPerPage = 5;
const startingPageNumber = 1;

export default class HcMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messagesArray: [],
			messagesThisPage: [],
			activePage: startingPageNumber,
			tagsArray: [],
			showNewMessageForm: false,
		};
		this.addMessageToList = this.addMessageToList.bind(this);
		this.handleClickNewMessageButton = this.handleClickNewMessageButton.bind(this);
		this.handleClickHideNewMessageButton = this.handleClickHideNewMessageButton.bind(this);
		this.handleClickTagFilterMenuLabel = this.handleClickTagFilterMenuLabel.bind(this);
		this.handleClickTagFilterMenuItem = this.handleClickTagFilterMenuItem.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}
	componentDidMount() {
		if (this.props.allOrTop === 'all') {
			HcMessagesData.ReturnHcMessagesTags()
				.then((allMessageTags) => {
					this.setState(() => ({
						tagsArray: allMessageTags,
					}));
				});
			HcMessagesData.ReturnHcMessagesAllMessages()
				.then((allMessageMessages) => {
					this.setState(() => ({
						messagesArray: allMessageMessages,
						messagesThisPage: this.returnMessagesThisPage(startingPageNumber, allMessageMessages),
					}));
				});
		}
		if (this.props.allOrTop === 'top') {
			HcMessagesData.ReturnHcMessagesTopMessages()
				.then((allMessageMessages) => {
					this.setState(() => ({
						messagesArray: allMessageMessages,
					}));
				});
		}
	}
	handlePageChange(pageNumber) {
		this.setState({
			activePage: pageNumber,
			messagesThisPage: this.returnMessagesThisPage(pageNumber, this.state.messagesArray),
		});
	}
	returnMessagesThisPage(pageNumber, messagePool) {
		console.log('firing');
		console.log('messagePool');
		console.log(messagePool);
		// preserve function parameter; subtract 1, because pages logically start with 1
		// 		 but technically with 0
		const pageNumberCopy = pageNumber - 1;
		console.log('pageNumberCopy');
		console.log(pageNumberCopy);
		console.log('pageNumberCopy * messagesPerPage');
		console.log(pageNumberCopy * messagesPerPage);
		console.log('(pageNumberCopy + 1) * messagesPerPage');
		console.log((pageNumberCopy + 1) * messagesPerPage);

		// return corresponding section of array
		return messagePool
			.slice(pageNumberCopy * messagesPerPage, (pageNumberCopy + 1) * messagesPerPage);
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
				messagesThisPage: this.returnMessagesThisPage(startingPageNumber, newMessageArray),
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

		if (menuItem.name === 'All') {
			HcMessagesData.ReturnHcMessagesAllMessages()
				.then((allMessageMessages) => {
					this.setState(() => ({
						messagesArray: allMessageMessages,
						messagesThisPage: this.returnMessagesThisPage(startingPageNumber, allMessageMessages),
					}));
				});
		} else {
			HcMessagesData.ReturnHcMessagesAllMessagesWSpecifiedTag(menuItem.name)
				.then((specifiedMessages) => {
					this.setState(() => ({
						messagesArray: specifiedMessages,
						messagesThisPage: this.returnMessagesThisPage(startingPageNumber, specifiedMessages),
					}));
				});
		}
		// return true to close the menu
		return true;
	}

	render() {
		return (this.props.allOrTop === 'all') ?
			(
				<div id="hc-messages-all" className="mos-react-component-root">
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
					<HcMessagesList
						messagesThisPage={this.state.messagesThisPage}
					/>
					<Pagination
						activePage={this.state.activePage}
						itemsCountPerPage={messagesPerPage}
						totalItemsCount={this.state.messagesArray.length}
						pageRangeDisplayed={5}
						onChange={this.handlePageChange}
					/>
				</div>
			) :
			(
				<div id="hc-messages-top" className="mos-react-component-root">
					<h2>Latest Messages</h2>
					<HcMessagesList messagesArray={this.state.messagesArray} />
				</div>
			);
	}
}
