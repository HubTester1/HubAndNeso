
/* eslint-disable max-len */

// ----- IMPORTS

import * as React from 'react';
import {
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';
import { scroller } from 'react-scroll';
import MediaQuery from 'react-responsive';
import Pagination from 'react-js-pagination';
import shortid from 'shortid';
import HcMessagesData from './HcMessagesData';
import HcMessagesCommandBar from './components/HcMessagesCommandBar/HcMessagesCommandBar';
import HcMessagesList from './components/HcMessagesList/HcMessagesList';
import HcMessagesNewMessageForm from './components/HcMessagesNewMessageForm/HcMessagesNewMessageForm';
import ScreenSizes from '../../services/ScreenSizes';
import MOSUtilities from '../../services/MOSUtilities';

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
			updatingMessage: false,

			newMessageID: undefined,
			newMessageTags: [{ key: '' }],
			newMessageSubject: '',
			newMessageBody: '',
			newMessageImages: [],
			newMessageExpirationDate: '',
			newMessageImagesAreUploading: false,
			newMessageIDError: undefined,
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageSomeOrAllUploadsFailedWarning: undefined,
			newMessageImagesWrongTypesWarning: undefined,
			newMessageIsInvalid: undefined,
			newMessageImageUploadsImpossible: undefined,
			newMessageSaveFailure: undefined,
			newMessageSaveSuccess: undefined,
			newMessageIITNotificationFailure: undefined,
		};
		this.addMessageToList = this.addMessageToList.bind(this);
		this.handleClickNewMessageButton = this.handleClickNewMessageButton.bind(this);
		this.handleClickHideNewMessageButton = this.handleClickHideNewMessageButton.bind(this);
		this.handleClickTagFilterMenuLabel = this.handleClickTagFilterMenuLabel.bind(this);
		this.handleClickTagFilterMenuItem = this.handleClickTagFilterMenuItem.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.returnHcMessagesAllBody = this.returnHcMessagesAllBody.bind(this);
		this.enableMessageUpdate = this.enableMessageUpdate.bind(this);
		this.handleChangedTags = this.handleChangedTags.bind(this);
		this.handleChangedSubject = this.handleChangedSubject.bind(this);
		this.handleChangedBody = this.handleChangedBody.bind(this);
		this.handleDroppedFiles = this.handleDroppedFiles.bind(this);
		this.handleFileDeletion = this.handleFileDeletion.bind(this);
		this.handleChangedExpirationDate = this.handleChangedExpirationDate.bind(this);
		this.handleAddMessage = this.handleAddMessage.bind(this);
		this.handleMessageUpdate = this.handleMessageUpdate.bind(this);
		this.returnFormFieldContainerClassNameString = 
			this.returnFormFieldContainerClassNameString.bind(this);
		this.handleChangedSubject = this.handleChangedSubject.bind(this);
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
	setAndReturnMessageFormIsInvalid() {
		// set up new errors; default to no errors
		const newErrors = {
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageIsInvalid: undefined,
		};
		// if there's no tag
		if (!this.state.newMessageTags[0].camlName) {
			// prepare tag error
			newErrors.newMessageTagsError = 'Cannot be blank';
		}
		// if there's no subject
		if (!this.state.newMessageSubject) {
			// prepare subject error
			newErrors.newMessageSubjectError = 'Cannot be blank';
		}
		// if there's no body
		if (!this.state.newMessageBody) {
			// prepare body error
			newErrors.newMessageBodyError = 'Cannot be blank';
		}

		// if there's no tag, subject, or body; if there is a messageID error
		if (!this.state.newMessageTags[0].camlName || !this.state.newMessageSubject ||
			!this.state.newMessageBody || this.state.newMessageIDError) {
			// prepare form validation error
			newErrors.newMessageIsInvalid = true;
		}
		// set state to indicate errors
		this.setState(() => ({
			newMessageTagsError: newErrors.newMessageTagsError,
			newMessageSubjectError: newErrors.newMessageSubjectError,
			newMessageBodyError: newErrors.newMessageBodyError,
			newMessageIsInvalid: newErrors.newMessageIsInvalid,
		}));
		// return to caller
		return newErrors.newMessageIsInvalid;
	}
	handleChangedTags(value) {
		if (value && value.key) {
			this.setState(() => ({
				newMessageTags: [{ camlName: value.key, name: value.text }],
				newMessageTagsError: undefined,
			}));
		} else {
			this.setState(() => ({
				newMessageTags: [{ camlName: '' }],
				newMessageTagsError: 'Cannot be blank',
			}));
		}
	}
	handleChangedSubject(value) {
		if (value) {
			this.setState(() => ({
				newMessageSubject: value,
				newMessageSubjectError: undefined,
			}));
		} else {
			this.setState(() => ({
				newMessageSubject: undefined,
				newMessageSubjectError: 'Cannot be blank',
			}));
		}
	}
	handleChangedBody(value) {
		if (value) {
			this.setState(() => ({
				newMessageBody: value,
				newMessageBodyError: undefined,
			}));
		} else {
			this.setState(() => ({
				newMessageBody: undefined,
				newMessageBodyError: 'Cannot be blank',
			}));
		}
	}
	returnAndConditionallySetMessageID() {
		// return a promise to return the message ID
		return new Promise((resolve, reject) => {
			// if the message ID is already in state
			if (this.state.newMessageID) {
				// resolve this promise with the message ID
				resolve(this.state.newMessageID);
				// if the message ID is NOT in state
			} else {
				// get a new message ID
				HcMessagesData.ReturnNesoNextMessageID()
					.then((newMessageIDResults) => {
						this.setState({
							newMessageID: newMessageIDResults.nextMessageID,
						});
						resolve(newMessageIDResults.nextMessageID);
					})
					.catch((nesoAxiosError) => {
						this.setState({
							newMessageIDError: true,
						});
						reject(nesoAxiosError);
					});
			}
		});
	}
	handleDroppedFiles(acceptedFiles, rejectedFiles) {
		// if all files submitted for upload are of the right type (none were rejected by Dropzone)
		if (!rejectedFiles[0]) {
			// set state to indicate that images are processing and unset warnings
			this.setState({
				newMessageImagesAreUploading: true,
				newMessageImageSomeOrAllUploadsFailedWarning: undefined,
				newMessageImagesWrongTypesWarning: undefined,
			});
			// note: will use messageID as folder name for uploaded files
			// get a promise to get a new messageID
			this.returnAndConditionallySetMessageID()
				// if the promise was resolved with the messageID
				.then((messageID) => {
					// get a promise to upload the files
					HcMessagesData.UploadMessagesFiles(messageID, acceptedFiles)
						// if the promise was *resolved* with some results
						// note: here, results could contain errors; results are for
						// 		one upload attempt per file
						.then((fileUploadResults) => {
							const uploadsSucceeded = [];
							const uploadsFailed = [];
							let newMessageImageSomeOrAllUploadsFailedWarningValue = false;
							fileUploadResults.data.imageProcessingResults.forEach((resultValue) => {
								if (!resultValue.error) {
									uploadsSucceeded.push(resultValue);
								} else {
									uploadsFailed.push(resultValue);
								}
							});
							if (uploadsFailed[0]) {
								newMessageImageSomeOrAllUploadsFailedWarningValue = true;
							}
							// set state to reflect results of all image uploads to this point
							// note: accounts for the possibility of multiple rounds of uploads
							this.setState((prevState) => {
								const previousFileArray = prevState.newMessageImages;
								const currentFileArray
									= [...uploadsSucceeded, ...previousFileArray];
								// console.log('the files after dropping and before saving');
								// console.log(currentFileArray);
								return {
									newMessageImagesAreUploading: false,
									newMessageImages: currentFileArray,
									newMessageImageSomeOrAllUploadsFailedWarning:
										newMessageImageSomeOrAllUploadsFailedWarningValue,
								};
							});
							/* // set state to indicate that images are no longer processing
							this.setState({
								newMessageImagesAreUploading: false,
							}); */
						})
						// if the promise to upload the files was rejected with an error
						// note: could be because a folder couldn't be created, or some other reason
						.catch((error) => {
							// set state to indicate that images are no longer processing and image upload error
							this.setState({
								newMessageImagesAreUploading: false,
								newMessageImageUploadsImpossible: true,
							});
						});
				})
				// if the promise was rejected with an error
				// note: messageIDError already set
				.catch((error) => {
					// set state to indicate that images are no longer processing
					this.setState({
						newMessageImagesAreUploading: false,
						newMessageImageUploadsImpossible: true,
					});
				});
			// if 1+ files of the wrong type were submitted for upload (some were reject by Dropzone)
		} else {
			// set state to indicate an images wrong type error
			this.setState(() => ({
				newMessageImagesWrongTypesWarning: true,
			}));
		}
	}
	handleFileDeletion(imageID, e) {
		// prevent navigating to image (because the control is inside a link)
		e.preventDefault();
		// set state to reflect all image uploads to this point minus the one whose button was clicked
		this.setState((prevState) => {
			const previousFileArray = prevState.newMessageImages;
			const currentFileArray = [];
			previousFileArray.forEach((file) => {
				if (file.key !== imageID) {
					currentFileArray.push(file);
				}
			});
			return {
				newMessageImages: currentFileArray,
			};
		});
	}
	handleChangedExpirationDate(value) {
		if (value) {
			this.setState(() => ({
				newMessageExpirationDate: value,
			}));
		} else {
			this.setState(() => ({
				newMessageExpirationDate: undefined,
			}));
		}
	}
	handleAddMessage(e) {
		// prevent submitting using the SP form tag
		e.preventDefault();
		// if the form is not invalid
		if (!this.setAndReturnMessageFormIsInvalid()) {
			// get a promise to retrieve a message ID
			this.returnAndConditionallySetMessageID()
				// if the message ID was retrieved
				.then((newMessageIDResult) => {
					// use the message ID + other message properties to construct a new message object
					const newMessageCreatorObject = {
						account: this.props.uData.account,
						displayName: this.props.uData.displayName,
					};
					const newMessageProperties = {
						newMessageID: newMessageIDResult,
						newMessageTags: [{ name: this.state.newMessageTags[0].name, camlName: this.state.newMessageTags[0].camlName }],
						newMessageSubject: this.state.newMessageSubject,
						newMessageBody: this.state.newMessageBody,
						newMessageImages: this.state.newMessageImages,
						newMessageExpirationDate: this.state.newMessageExpirationDate,
						newMessageKey: shortid.generate(),
						newMessageCreated: MOSUtilities.ReturnFormattedDateTime({
							incomingDateTimeString: 'nowLocal',
						}),
						newMessageCreator: newMessageCreatorObject,
					};
					// send message to Neso
					HcMessagesData.SendNesoMessagesMessage(newMessageProperties)
						.then((response) => {
							if (!response.data.error) {
								this.handleSaveSuccess(newMessageProperties);
							} else {
								this.handleSaveError();
							}
						})
						.catch((error) => {
							this.handleSaveError();
						});
				})
				.catch((newMessageIDError) => {
					this.handleSaveError();
				});
		}
	}
	resetNewMessageStateAndSetSaveSuccess() {
		this.setState(() => ({
			updatingMessage: false,
			newMessageID: undefined,
			newMessageTags: [{ camlName: '' }],
			newMessageSubject: '',
			newMessageBody: '',
			newMessageImages: [],
			newMessageExpirationDate: '',
			newMessageImagesAreUploading: false,
			newMessageIDError: undefined,
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageSomeOrAllUploadsFailedWarning: undefined,
			newMessageImagesWrongTypesWarning: undefined,
			newMessageIsInvalid: undefined,
			newMessageImageUploadsImpossible: undefined,
			newMessageSaveFailure: undefined,
			newMessageSaveSuccess: undefined,
			newMessageIITNotificationFailure: undefined,
		}));
	}
	handleSaveError() {
		HcMessagesData.SendSaveErrorEmail(this.state)
			.then((response) => {
				this.setState(() => ({
					newMessageSaveFailure: true,
				}));
			})
			.catch((error) => {
				this.setState(() => ({
					newMessageSaveFailure: true,
					newMessageIITNotificationFailure: true,
				}));
			});
	}
	handleSaveSuccess(newMessageProperties) {
		this.addMessageToList(newMessageProperties);
		this.resetNewMessageStateAndSetSaveSuccess();
	}
	returnFormFieldContainerClassNameString(errorPropertyName) {
		return errorPropertyName && this.state[errorPropertyName] ?
			'mos-react-form-field contains-errors' :
			'mos-react-form-field';
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
				images: newMessageProperties.newMessageImages,
				subject: newMessageProperties.newMessageSubject,
				tags: [newMessageProperties.newMessageTags[0]],
				expirationDate: newMessageProperties.newMessageExpirationDate,
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
		// prevent submitting using the SP form tag
		e.preventDefault();
		// reset state
		this.resetNewMessageStateAndSetSaveSuccess();
		// set state
		this.setState(() => ({
			showNewMessageForm: true,
		}));
	}
	handleClickHideNewMessageButton(e) {
		// prevent submitting using the SP form tag
		e.preventDefault();
		// set state
		this.setState(() => ({
			showNewMessageForm: false,
		}));
	}
	handleClickTagFilterMenuLabel(e) {
		// prevent submitting using the SP form tag
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
			HcMessagesData.ReturnHcMessagesAllMessagesWSpecifiedTag(menuItem.name, menuItem.key)
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
					updatingMessage={this.state.updatingMessage}
					handleClickTagFilterMenuLabel={this.handleClickTagFilterMenuLabel}
					handleClickTagFilterMenuItem={this.handleClickTagFilterMenuItem}
				/>
				<HcMessagesNewMessageForm
					showNewMessageForm={this.state.showNewMessageForm}
					updatingMessage={this.state.updatingMessage}
					tagsArray={this.state.tagsArray}
					addMessageToList={this.addMessageToList}
					uData={this.props.uData}
					
					newMessageID={this.state.newMessageID}
					newMessageTags={this.state.newMessageTags}
					newMessageSubject={this.state.newMessageSubject}
					newMessageBody={this.state.newMessageBody}
					newMessageImages={this.state.newMessageImages}
					newMessageExpirationDate={this.state.newMessageExpirationDate}
					newMessageImagesAreUploading={this.state.newMessageImagesAreUploading}
					newMessageIDError={this.state.newMessageExpinewMessageIDErrorrationDate}
					newMessageTagsError={this.state.newMessageTagsError}
					newMessageSubjectError={this.state.newMessageSubjectError}
					newMessageBodyError={this.state.newMessageBodyError}
					newMessageImageSomeOrAllUploadsFailedWarning={this.state.newMessageImageSomeOrAllUploadsFailedWarning}
					newMessageImagesWrongTypesWarning={this.state.newMessageImagesWrongTypesWarning}
					newMessageIsInvalid={this.state.newMessageIsInvalid}
					newMessageImageUploadsImpossible={this.state.newMessageImageUploadsImpossible}
					newMessageSaveFailure={this.state.newMessageSaveFailure}
					newMessageSaveSuccess={this.state.newMessageSaveSuccess}
					newMessageIITNotificationFailure={this.state.newMessageIITNotificationFailure}

					returnFormFieldContainerClassNameString={this.returnFormFieldContainerClassNameString}
					handleChangedTags={this.handleChangedTags}
					handleChangedSubject={this.handleChangedSubject}
					handleChangedBody={this.handleChangedBody}
					handleDroppedFiles={this.handleDroppedFiles}
					handleFileDeletion={this.handleFileDeletion}
					handleMessageUpdate={this.handleMessageUpdate}
					handleChangedExpirationDate={this.handleChangedExpirationDate}
					handleAddMessage={this.handleAddMessage}
				/>
				<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
					<HcMessagesList
						messagesThisPage={this.state.messagesThisPageSmallScreen}
						uData={this.props.uData}
						enableMessageUpdate={this.enableMessageUpdate}
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
						enableMessageUpdate={this.enableMessageUpdate}
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
	enableMessageUpdate(incomingMessageID, e) {
		// prevent submitting using the SP form tag
		e.preventDefault();
		// set state
		this.state.messagesArray.forEach((message) => {
			const messageCopy = message;
			if (messageCopy.messageID === incomingMessageID) {
				console.log('enabling message update; data:');
				console.log(messageCopy);
				if (typeof (messageCopy.expiration) === 'string') {
					messageCopy.expiration = new Date(messageCopy.expiration);
				}
				this.setState({
					showNewMessageForm: true,
					updatingMessage: true,
					newMessageID: messageCopy.messageID,
					newMessageSubject: messageCopy.subject,
					newMessageTags: [messageCopy.tags[0]],
					newMessageBody: messageCopy.body,
					newMessageExpirationDate: messageCopy.expiration,
					newMessageImages: messageCopy.images,
					newMessageSaveSuccess: undefined,
				});
				// scroll to form
				scroller.scrollTo('hc-messages-all', {
					duration: 500,
					offset: -70,
					delay: 0,
					smooth: 'easeInOutQuart',
				});
			}
		});
	}
	handleMessageUpdate(e) {
		// prevent submitting using the SP form tag
		e.preventDefault();
		// if the form is not invalid
		if (!this.setAndReturnMessageFormIsInvalid()) {
			// use the message ID + other message properties to construct a new message object
			const newMessageProperties = {
				newMessageID: this.state.newMessageID,
				newMessageTags: [{ name: this.state.newMessageTags[0].name, camlName: this.state.newMessageTags[0].camlName }],
				newMessageSubject: this.state.newMessageSubject,
				newMessageBody: this.state.newMessageBody,
				newMessageImagesToCheck: this.state.newMessageImages,
				newMessageImages: [],
				newMessageExpirationDate: this.state.newMessageExpirationDate,
			};
			newMessageProperties.newMessageImagesToCheck.forEach((checkingImage) => {
				const checkingImageCopy = checkingImage;
				if (!checkingImageCopy.imageKey) {
					checkingImageCopy.imageKey = shortid.generate();
				}
				newMessageProperties.newMessageImages.push(checkingImageCopy);
			});
			// send message to Neso
			HcMessagesData.SendNesoMessagesMessageUpdate(newMessageProperties)
				.then((response) => {
					if (!response.data.error) {
						this.handleUpdateSuccess(newMessageProperties);
					} else {
						this.handleSaveError();
					}
				})
				.catch((error) => {
					this.handleSaveError();
				});
		}
	}
	handleUpdateSuccess(newMessageProperties) {
		this.updateMessageInList(newMessageProperties);
		this.resetNewMessageStateAndSetSaveSuccess();
	}
	updateMessageInList(newMessageProperties) {
		this.setState((prevState) => {
			// set up container for updated messages
			const newMessageArray = [];
			// iterate over the existing message
			prevState.messagesArray.forEach((prevMessage) => {
				const prevMessageCopy = prevMessage;
				// if this is the message to update
				if (prevMessageCopy.messageID === newMessageProperties.newMessageID) {
					// replace previous properties with new properties
					prevMessageCopy.tags = [newMessageProperties.newMessageTags[0]];
					prevMessageCopy.subject = newMessageProperties.newMessageSubject;
					prevMessageCopy.body = newMessageProperties.newMessageBody;
					prevMessageCopy.images = newMessageProperties.newMessageImages;
					prevMessageCopy.expirationDate = newMessageProperties.newMessageExpirationDate;
				}
				// push message, updated or not, to container
				newMessageArray.push(prevMessageCopy);
			});
			const messagesThisPage =
				this.returnMessagesThisPage(startingPageNumber, newMessageArray);
			return {
				messagesArray: newMessageArray,
				messagesThisPageSmallScreen: messagesThisPage.messagesThisPageSmallScreen,
				messagesThisPageLargeScreen: messagesThisPage.messagesThisPageLargeScreen,
			};
		});
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
