
// ----- IMPORTS

import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import HcMessagesTagDropdown from '../HcMessagesTagDropdown/HcMessagesTagDropdown';
import HcMessagesFiles from '../HcMessagesFiles/HcMessagesFiles';
import HcMessagesExpirationDate from '../HcMessagesExpirationDate/HcMessagesExpirationDate';
import HcMessagesData from '../../HcMessagesData';
import MOSUtilities from '../../../../services/MOSUtilities';

const shortid = require('shortid');

// ----- COMPONENT

export default class HcMessagesNewMessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
			newMessageImagesError: undefined,
			newMessageImageUploadError: undefined,
			newMessageImagesWrongTypesError: undefined,
			newMessageIsInvalid: undefined,
			newMessageSaveAttempted: false,
			newMessageSaveFailure: undefined,
			newMessageSaveSuccess: undefined,
			newMessageIITNotificationFailure: undefined,
		};
		this.handleChangedTags = this.handleChangedTags.bind(this);
		this.handleChangedSubject = this.handleChangedSubject.bind(this);
		this.handleChangedBody = this.handleChangedBody.bind(this);
		this.handleChangedImage = this.handleChangedImage.bind(this);
		this.handleChangedExpirationDate = this.handleChangedExpirationDate.bind(this);
		this.handleAddMessage = this.handleAddMessage.bind(this);
	}
	returnNewMessageSaveAttemptedAndNewMessageIsInvalid() {
		if (this.state.newMessageSaveAttempted && (!this.state.newMessageTags[0].text || 
			!this.state.newMessageSubject || !this.state.newMessageBody)) {
			return true;
		} 
		return false;
	}
	handleChangedTags(value) {
		const newMessageIsInvalidRealTimeCheck 
			= this.returnNewMessageSaveAttemptedAndNewMessageIsInvalid();
		if (value && value.key) {
			this.setState(() => ({
				newMessageTags: [value],
				newMessageTagsError: undefined,
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
			}));
		} else {
			this.setState(() => ({
				newMessageTags: [{ key: '' }],
				newMessageTagsError: 'Cannot be blank',
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
			}));
		}
	}
	handleChangedSubject(value) {
		const newMessageIsInvalidRealTimeCheck
			= this.returnNewMessageSaveAttemptedAndNewMessageIsInvalid();
		if (value) {
			this.setState(() => ({
				newMessageSubject: value,
				newMessageSubjectError: undefined,
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
			}));
		} else {
			this.setState(() => ({
				newMessageSubject: undefined,
				newMessageSubjectError: 'Cannot be blank',
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
			}));
		}
	}
	handleChangedBody(value) {
		const newMessageIsInvalidRealTimeCheck
			= this.returnNewMessageSaveAttemptedAndNewMessageIsInvalid();
		if (value) {
			this.setState(() => ({
				newMessageBody: value,
				newMessageBodyError: undefined,
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
			}));
		} else {
			this.setState(() => ({
				newMessageBody: undefined,
				newMessageBodyError: 'Cannot be blank',
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
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
	setImagesAreProcessingInState(booleanValue) {
		this.setState({ newMessageImagesAreUploading: booleanValue });
	}
	handleChangedImage(acceptedFiles, rejectedFiles) {
		// if all files submitted for upload are of the right type (none were rejected by Dropzone)
		if (!rejectedFiles[0]) {
			// set state to indicate that images are processing
			this.setImagesAreProcessingInState(true);
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
							// set state to reflect results of all image uploads to this point
							// note: accounts for the possibility of multiple rounds of uploads
							this.setState((prevState) => {
								const previousFileArray = prevState.newMessageImages;
								const currentFileArray 
									= [...fileUploadResults.fileUploadResults, ...previousFileArray];
								return {
									// newMessageImagesAreUploading: false,
									newMessageImages: currentFileArray,
								};
							});
							// set state to indicate that images are no longer processing
							this.setImagesAreProcessingInState(false);
						})
						// if the promise to upload the files was rejected with an error
						// note: could be because a folder couldn't be created, or some other reason
						.catch((error) => {
							// set state to indicate that images are no longer processing
							this.setImagesAreProcessingInState(false);
							// set state to indicate image upload error
							this.setState({
								newMessageImageUploadError: true,
							});
						});
				})
				// if the promise was rejected with an error
				// note: messageIDError already set
				.catch((error) => {
					// set state to indicate that images are no longer processing
					this.setImagesAreProcessingInState(false);
					// set state to indicate image upload error
					this.setState({
						newMessageImageUploadError: true,
					});
				});
		// if 1+ files of the wrong type were submitted for upload (some were reject by Dropzone)
		} else {
			// set state to indicate an images error and an images wrong type error
			this.setState(() => ({
				newMessageImagesError: true,
				newMessageImagesWrongTypesError: true,
			}));
		}
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
		e.preventDefault();
		const newErrors = {
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageIsInvalid: undefined,
		};

		if (!this.state.newMessageTags[0].text) {
			newErrors.newMessageTagsError = 'Cannot be blank';
		}

		if (!this.state.newMessageSubject) {
			newErrors.newMessageSubjectError = 'Cannot be blank';
		}

		if (!this.state.newMessageBody) {
			newErrors.newMessageBodyError = 'Cannot be blank';
		}

		if (!this.state.newMessageTags[0].text || !this.state.newMessageSubject || 
			!this.state.newMessageBody) {
			newErrors.newMessageIsInvalid = true;
			this.setState(() => ({
				newMessageTagsError: newErrors.newMessageTagsError,
				newMessageSubjectError: newErrors.newMessageSubjectError,
				newMessageBodyError: newErrors.newMessageBodyError,
				newMessageIsInvalid: newErrors.newMessageIsInvalid,
				newMessageSaveAttempted: true,
			}));
		} else {
			// construct message object
			// get a promise to retrieve a message ID
			this.returnAndConditionallySetMessageID()
				// if the message ID was retrieved
				.then((newMessageIDResult) => {
					const newMessageCreatorObject = {
						account: this.props.uData.account,
						displayName: this.props.uData.displayName,
					};
					const newMessageProperties = {
						newMessageID: newMessageIDResult,
						newMessageTags: [this.state.newMessageTags[0].text],
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
			newMessageTags: [{ key: '' }],
			newMessageSubject: '',
			newMessageBody: '',
			newMessageImages: [],
			newMessageExpirationDate: '',
			newMessageID: undefined,
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImagesError: undefined,
			newMessageIsInvalid: undefined,
			newMessageSaveAttempted: false,
			newMessageSaveFailure: undefined,
			newMessageIITNotificationFailure: undefined,
			newMessageSaveSuccess: true,
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
		this.props.addMessageToList(newMessageProperties);
		this.resetNewMessageStateAndSetSaveSuccess();
	}
	returnFormFieldContainerClassNameString(errorPropertyName) {
		return errorPropertyName && this.state[errorPropertyName] ? 
			'mos-react-form-field contains-errors' : 
			'mos-react-form-field';
	}
	render() {
		if (this.props.show) {
			return (
				<div id="hc-messages-new-message-form" className="mos-react-component-root">
					<h3>New Message</h3>
					<div className={this.returnFormFieldContainerClassNameString('newMessageTagsError')}>
						<HcMessagesTagDropdown
							tagsArray={this.props.tagsArray}
							onChanged={this.handleChangedTags}
							selectedKey={this.state.newMessageTags[0].key}
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageTagsError}
						</div>
					</div>
					<div className={this.returnFormFieldContainerClassNameString('newMessageSubjectError')}>
						<TextField
							label="Subject"
							value={this.state.newMessageSubject}
							onChanged={this.handleChangedSubject}
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageSubjectError}
						</div>
					</div>
					<div className={this.returnFormFieldContainerClassNameString('newMessageBodyError')}>
						<TextField
							label="Body"
							multiline
							rows={6}
							value={this.state.newMessageBody}
							onChanged={this.handleChangedBody}
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageBodyError}
						</div>
					</div>
					<div className={this.returnFormFieldContainerClassNameString('newMessageImagesError')}>
						<HcMessagesFiles
							handleChangedImage={this.handleChangedImage}
							newMessageImagesAreUploading={this.state.newMessageImagesAreUploading}
							newMessageImages={this.state.newMessageImages}
						/>
						{
							this.state.newMessageImagesWrongTypesError &&

							<div id="mos-react-form-field-error-wrong-image-type" className="mos-react-form-field-error">
								<span className="urgent">Oops!</span> No images were uploaded. Only JPG, JPEG, GIF, and PNG files are allowed.
							</div>
						}
						{
							this.state.newMessageImageUploadError &&
							<div id="new-message-id-error-message" className="message-error-message">
								<span className="urgent">Whoopsie!</span> We can&apos;t save your images right now. Please try later.
							</div>
						}
					</div>
					<div className={this.returnFormFieldContainerClassNameString(null)}>
						<HcMessagesExpirationDate 
							value={this.state.newMessageExpirationDate}
							onSelectDate={this.handleChangedExpirationDate}
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageExpirationDateError}
						</div>
					</div>
					{
						this.state.newMessageIDError && 
						<div id="new-message-id-error-message" className="message-error-message">
							<span className="urgent">Whoopsie!</span> We can&apos;t save your stuff right now. Please try later.
						</div>
					}
					{
						this.state.newMessageIsInvalid &&
						<div id="form-entries-invalid-error-message" className="message-error-message">
							The highlighted fields contain errors. Please make changes and try again.
						</div>
					}
					{
						this.state.newMessageSaveFailure &&
						<div id="new-message-save-failure-error-message" className="message-error-message">
							<span className="urgent">Yikes!</span> We had a problem saving your information.
						</div>
					}
					{
						this.state.newMessageIITNotificationFailure &&
						<div id="new-message-iit-notification-failure-error-message" className="message-error-message">
							<span className="urgent">Oh no!</span> We couldn&apos;t notify IIT, either. Are you connected to the Internet?
						</div>
					}
					<button onClick={this.handleAddMessage}>Save</button>
					{
						this.state.newMessageSaveSuccess &&
						<div id="new-message-save-success-message" className="message-success-message">
							Your message was saved.
						</div>
					}
				</div>
			);
		} 
		return (null);
	}
}
