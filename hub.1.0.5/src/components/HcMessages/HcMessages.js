
// ----- IMPORTS

import * as React from 'react';
import MediaQuery from 'react-responsive';
import Pagination from 'react-js-pagination';
import HcMessagesData from './HcMessagesData';
import HcMessagesCommandBar from './components/HcMessagesCommandBar/HcMessagesCommandBar';
import HcMessagesList from './components/HcMessagesList/HcMessagesList';
import HcMessagesNewMessageForm from './components/HcMessagesNewMessageForm/HcMessagesNewMessageForm';
import ScreenSizes from '../../services/ScreenSizes';

import './HcMessages.sass';
import './HcMessagesSmall.sass';
import './HcMessagesMediumLarge.sass';

// ----- COMPONENT

const messagesPerPageSmallScreen = 8;
const messagesPerPageLargeScreen = 16;
const startingPageNumber = 1;

export default class HcMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messagesArray: [],
			messagesThisPageSmallScreen: [],
			messagesThisPageLargeScreen: [],
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
					const messagesThisPage = 
						this.returnMessagesThisPage(startingPageNumber, allMessageMessages);
					this.setState(() => ({
						messagesArray: allMessageMessages,
						messagesThisPageSmallScreen: messagesThisPage.messagesThisPageSmallScreen,
						messagesThisPageLargeScreen: messagesThisPage.messagesThisPageLargeScreen,
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
		const messagesThisPage =
			this.returnMessagesThisPage(pageNumber, this.state.messagesArray);
		this.setState({
			activePage: pageNumber,
			messagesThisPageSmallScreen: messagesThisPage.messagesThisPageSmallScreen,
			messagesThisPageLargeScreen: messagesThisPage.messagesThisPageLargeScreen,
		});
	}
	returnMessagesThisPage(pageNumber, messagePool) {
		// preserve function parameter; subtract 1, because pages logically start with 1
		// 		 but technically with 0
		const pageNumberCopy = pageNumber - 1;
		// return corresponding sections of array
		return {
			messagesThisPageSmallScreen: messagePool
				.slice(pageNumberCopy * messagesPerPageSmallScreen, (pageNumberCopy + 1) * messagesPerPageSmallScreen),
			messagesThisPageLargeScreen: messagePool
				.slice(pageNumberCopy * messagesPerPageLargeScreen, (pageNumberCopy + 1) * messagesPerPageLargeScreen),
		};
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
			const messagesThisPage =
				this.returnMessagesThisPage(startingPageNumber, newMessageArray);
			return {
				messagesArray: newMessageArray,
				messagesThisPageSmallScreen: messagesThisPage.messagesThisPageSmallScreen,
				messagesThisPageLargeScreen: messagesThisPage.messagesThisPageLargeScreen,
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
					const messagesThisPage =
						this.returnMessagesThisPage(startingPageNumber, allMessageMessages);
					this.setState(() => ({
						messagesArray: allMessageMessages,
						messagesThisPageSmallScreen: messagesThisPage.messagesThisPageSmallScreen,
						messagesThisPageLargeScreen: messagesThisPage.messagesThisPageLargeScreen,
					}));
				});
		} else {
			HcMessagesData.ReturnHcMessagesAllMessagesWSpecifiedTag(menuItem.name)
				.then((specifiedMessages) => {
					const messagesThisPage = 
						this.returnMessagesThisPage(startingPageNumber, specifiedMessages);
					this.setState(() => ({
						messagesArray: specifiedMessages,
						messagesThisPageSmallScreen: messagesThisPage.messagesThisPageSmallScreen,
						messagesThisPageLargeScreen: messagesThisPage.messagesThisPageLargeScreen,
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
					<MediaQuery maxDeviceWidth={ScreenSizes.ReturnSmallMax()}>
						<HcMessagesList
							messagesThisPage={this.state.messagesThisPageSmallScreen}
						/>
						<Pagination
							activePage={this.state.activePage}
							itemsCountPerPage={messagesPerPageSmallScreen}
							totalItemsCount={this.state.messagesArray.length}
							pageRangeDisplayed={
								((this.state.messagesArray.length / messagesPerPageSmallScreen) + 1) > 3 ? 
									3 :
									(this.state.messagesArray.length / messagesPerPageSmallScreen) + 1
							}
							onChange={this.handlePageChange}
						/>
					</MediaQuery>
					<MediaQuery minDeviceWidth={ScreenSizes.ReturnMediumMin()}>
						<HcMessagesList
							messagesThisPage={this.state.messagesThisPageLargeScreen}
						/>
						<Pagination
							activePage={this.state.activePage}
							itemsCountPerPage={messagesPerPageLargeScreen}
							totalItemsCount={this.state.messagesArray.length}
							pageRangeDisplayed={
								(this.state.messagesArray.length / messagesPerPageLargeScreen) + 1
							}
							onChange={this.handlePageChange}
						/>
					</MediaQuery>
				</div>
			) :
			(
				<div id="hc-messages-top" className="mos-react-component-root">
					<h2>Latest Messages</h2>
					<HcMessagesList messagesThisPage={this.state.messagesArray} />
				</div>
			);
	}
}
