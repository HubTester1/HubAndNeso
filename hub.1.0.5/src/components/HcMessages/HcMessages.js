
// ----- IMPORTS

import * as React from 'react';
import {
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';

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
		this.returnHcMessagesAllBody = this.returnHcMessagesAllBody.bind(this);
		this.enableMessageUpdate = this.enableMessageUpdate.bind(this);
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
			messagesThisPageSmallScreen: 
				messagePool
					.slice(
						pageNumberCopy * messagesPerPageSmallScreen, 
						(pageNumberCopy + 1) * messagesPerPageSmallScreen,
					),
			messagesThisPageLargeScreen: 
				messagePool
					.slice(
						pageNumberCopy * messagesPerPageLargeScreen, 
						(pageNumberCopy + 1) * messagesPerPageLargeScreen,
					),
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
	returnHcMessagesAllBody() {
		return (
			<div id="hc-messages-all-body">
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
				<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
					<HcMessagesList
						messagesThisPage={this.state.messagesThisPageSmallScreen}
						uData={this.props.uData}
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
				<MediaQuery minWidth={ScreenSizes.ReturnMediumMin()}>
					<HcMessagesList
						messagesThisPage={this.state.messagesThisPageLargeScreen}
						uData={this.props.uData}
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
		);
	}
	enableMessageUpdate(incomingMongoID, e) {
		// set state for controlled fields
		// open form and change button
		// scroll to form

		e.preventDefault();
		console.log('enable');
		console.log(incomingMongoID);
		this.state.messagesArray.forEach((message) => {
			if (message.mongoID === incomingMongoID) {
				console.log(message);
			}
		});


		// yello
	}
	render() {
		if (this.props.allOrTop === 'all' && this.props.screenType === 'medium') {
			return (
				<div id="hc-messages-all" className="mos-react-component-root" name="hc-messages-all">
					<h2>Messages</h2>
					{this.returnHcMessagesAllBody()}
				</div>
			);
		}
		if (this.props.allOrTop === 'all' && this.props.screenType === 'small') {
			return (
				<AccordionItem
					id="hc-messages-all"
					className="hc-messages-all mos-react-component-root accordion__item"
					hideBodyClassName="accordion__item--hidden"
					name="hc-messages-all"
				>
					<AccordionItemTitle
						className="hc-messages-all__title accordion__title accordion__title--animated"
					>
						<h2 className="u-position-relative">
							<div className="accordion__title__text">Messages</div>
							<div className="accordion__arrow" role="presentation" />
						</h2>
					</AccordionItemTitle>
					<AccordionItemBody
						className="hc-messages-all__body accordion__body"
					>
						{this.returnHcMessagesAllBody()}
					</AccordionItemBody>
				</AccordionItem>
			);
		}
		return (
			<div id="hc-messages-top" className="mos-react-component-root">
				<h2>Latest Messages</h2>
				<HcMessagesList
					messagesThisPage={this.state.messagesArray}
					enableMessageUpdate={this.enableMessageUpdate}
					uData={this.props.uData}
				/>
			</div>
		);
	}
}
