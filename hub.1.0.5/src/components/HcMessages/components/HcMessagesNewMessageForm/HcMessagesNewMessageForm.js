
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
			newMessageImageSomeOrAllUploadsFailedWarning: undefined,
			newMessageImagesWrongTypesWarning: undefined,
			newMessageIsInvalid: undefined,
			newMessageImageUploadsImpossible: undefined, 
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
	setAndReturnMessageFormIsInvalid() {
		// set up new errors; default to no errors
		const newErrors = {
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageIsInvalid: undefined,
		};
		// if there's no tag
		if (!this.state.newMessageTags[0].text) {
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
		if (!this.state.newMessageTags[0].text || !this.state.newMessageSubject ||
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
				newMessageTags: [value],
				newMessageTagsError: undefined,
			}));
		} else {
			this.setState(() => ({
				newMessageTags: [{ key: '' }],
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
	handleChangedImage(acceptedFiles, rejectedFiles) {
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
							fileUploadResults.fileUploadResults.forEach((resultValue) => {
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
								return {
									// newMessageImagesAreUploading: false,
									newMessageImages: currentFileArray,
									newMessageImageSomeOrAllUploadsFailedWarning: 
										newMessageImageSomeOrAllUploadsFailedWarningValue,
								};
							});
							// set state to indicate that images are no longer processing
							this.setState({
								newMessageImagesAreUploading: false,
							});
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
			newMessageSaveSuccess: true,
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
							tabindex="1"
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
							required
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageSubjectError}
						</div>
					</div>
					<div className={this.returnFormFieldContainerClassNameString('newMessageBodyError')}>
						<TextField
							label="Body"
							multiline
							rows={3}
							autoAdjustHeight
							value={this.state.newMessageBody}
							onChanged={this.handleChangedBody}
							required
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageBodyError}
						</div>
					</div>
					<div className="mos-react-form-field">
						<HcMessagesFiles
							handleChangedImage={this.handleChangedImage}
							newMessageImagesAreUploading={this.state.newMessageImagesAreUploading}
							newMessageImages={this.state.newMessageImages}
							newMessageImagesWrongTypesWarning={this.state.newMessageImagesWrongTypesWarning}
							newMessageImageSomeOrAllUploadsFailedWarning={
								this.state.newMessageImageSomeOrAllUploadsFailedWarning
							}
							newMessageImageUploadsImpossible={this.state.newMessageImageUploadsImpossible}
						/>
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

						<div id="new-message-id-error-message" className="mos-react-form-error-message">
							<span className="urgent">Whoopsie!</span> We can&apos;t save your stuff right now. Please try later.
						</div>
					}
					{
						!this.state.newMessageIsInvalid &&

						<div id="form-entries-invalid-error-message" className="mos-react-form-error-message">
							The highlighted fields contain errors. Please make changes and try again.
						</div>
					}
					{
						this.state.newMessageSaveFailure &&

						<div id="new-message-save-failure-error-message" className="mos-react-form-error-message">
							<span className="urgent">Yikes!</span> We had a problem saving your information.
						</div>
					}
					{
						this.state.newMessageIITNotificationFailure &&

						<div id="new-message-iit-notification-failure-error-message" className="mos-react-form-error-message">
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
