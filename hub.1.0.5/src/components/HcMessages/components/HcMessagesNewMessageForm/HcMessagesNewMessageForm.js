
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
			newMessageTags: [{ key: '' }],
			newMessageSubject: '',
			newMessageBody: '',
			newMessageImage: undefined,
			newMessageExpirationDate: '',
			newMessageID: undefined,
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageError: undefined,
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
		this.returnAndConditionallySetMessageID = this.returnAndConditionallySetMessageID.bind(this);
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
	handleChangedImage(value) {
		if (value) {
			this.setState(() => ({
				newMessageImage: value,
			}));
		} else {
			this.setState(() => ({
				newMessageImage: undefined,
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
					});
			}
		});
	}
	handleAddMessage() {
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
						newMessageImage: this.state.newMessageImage,
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
			newMessageImage: undefined,
			newMessageExpirationDate: '',
			newMessageID: undefined,
			newMessageTagsError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageError: undefined,
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
					{/* <div className={this.returnFormFieldContainerClassNameString('newMessageImageError')}>
						<TextField
							label="Image - replace with file input"
							value={this.state.newMessageImage}
							onChanged={this.handleChangedImage}
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageImageError}
						</div>
					</div> */}
					<div className={this.returnFormFieldContainerClassNameString('newMessageImageError')}>
						<HcMessagesFiles
							returnAndConditionallySetMessageID={this.returnAndConditionallySetMessageID}
							handleChangedImage={this.handleChangedImage}
						/>
						<div className="mos-react-form-field-error">
							{this.state.newMessageImageError}
						</div>
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
					<div id="validation-error-message">{
						this.state.newMessageIsInvalid ? 
							'The highlighted fields contain errors. Please make changes and try again' : 
							'' }
					</div>
					<a onClick={this.handleAddMessage}>Save</a>
					<div id="new-message-save-failure-message">{
						this.state.newMessageSaveFailure ?
							'<span class="urgent">Yikes!</span> We had a problem saving your information.' :
							''}
					</div>
					<div id="new-message-iit-notification-failure-message">{
						this.state.newMessageIITNotificationFailure ?
							'<span class="urgent">Oh no!</span> We couldn\'t notify IIT, either. Are you connected to the Internet?' :
							''}
					</div>
					<div id="new-message-save-success-message">{
						this.state.newMessageSaveSuccess ?
							'Your message was saved.' :
							''}
					</div>
				</div>
			);
		} 
		return (null);
	}
}
