
// ----- IMPORTS

import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import HcMessagesTagDropdown from '../HcMessagesTagDropdown/HcMessagesTagDropdown';
import HcMessagesExpirationDate from '../HcMessagesExpirationDate/HcMessagesExpirationDate';
import HcMessagesData from '../../HcMessagesData';

const shortid = require('shortid');

// ----- COMPONENT

export default class HcMessagesNewMessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newMessageTag: { key: undefined },
			newMessageSubject: undefined,
			newMessageBody: undefined,
			newMessageImage: undefined,
			newMessageExpirationDate: undefined,
			newMessageTagError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageError: undefined,
			newMessageIsInvalid: undefined,
			newMessageSaveAttempted: false,
			newMessageSaveFailure: undefined,
			newMessageSaveSuccess: undefined,
			newMessageIITNotificationFailure: undefined,
		};
		this.handleChangedTag = this.handleChangedTag.bind(this);
		this.handleChangedSubject = this.handleChangedSubject.bind(this);
		this.handleChangedBody = this.handleChangedBody.bind(this);
		this.handleChangedImage = this.handleChangedImage.bind(this);
		this.handleChangedExpirationDate = this.handleChangedExpirationDate.bind(this);
		this.handleAddMessage = this.handleAddMessage.bind(this);
	}
	handleChangedTag(value) {
		if (value) {
			let newMessageIsInvalidRealTimeCheck;
			if (this.state.newMessageSaveAttempted && (!this.state.newMessageSubject ||
				!this.state.newMessageBody)) {
				newMessageIsInvalidRealTimeCheck = true;
			}
			this.setState(() => ({
				newMessageTag: value,
				newMessageTagError: undefined,
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
			}));
		} else {
			this.setState(() => ({
				newMessageTag: undefined,
				newMessageTagError: 'Cannot be blank',
			}));
		}
	}
	handleChangedSubject(value) {
		if (value) {
			let newMessageIsInvalidRealTimeCheck;
			if (this.state.newMessageSaveAttempted && (!this.state.newMessageTag.text || 
				!this.state.newMessageBody)) {
				newMessageIsInvalidRealTimeCheck = true;
			}
			this.setState(() => ({
				newMessageSubject: value,
				newMessageSubjectError: undefined,
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
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
			let newMessageIsInvalidRealTimeCheck;
			if (this.state.newMessageSaveAttempted && 
				(!this.state.newMessageTag.text || !this.state.newMessageSubject)) {
				newMessageIsInvalidRealTimeCheck = true;
			}
			this.setState(() => ({
				newMessageBody: value,
				newMessageBodyError: undefined,
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
			}));
		} else {
			this.setState(() => ({
				newMessageBody: undefined,
				newMessageBodyError: 'Cannot be blank',
			}));
		}
	}
	handleChangedImage(value) {
		if (value) {
			let newMessageIsInvalidRealTimeCheck;
			if (this.state.newMessageSaveAttempted && 
				(!this.state.newMessageTag.text || !this.state.newMessageSubject ||
				!this.state.newMessageBody)) {
				newMessageIsInvalidRealTimeCheck = true;
			}
			this.setState(() => ({
				newMessageImage: value,
				newMessageIsInvalid: newMessageIsInvalidRealTimeCheck,
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
	handleAddMessage() {
		const newErrors = {
			newMessageTagError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageIsInvalid: undefined,
		};

		if (!this.state.newMessageTag.text) {
			newErrors.newMessageTagError = 'Cannot be blank';
		}

		if (!this.state.newMessageSubject) {
			newErrors.newMessageSubjectError = 'Cannot be blank';
		}

		if (!this.state.newMessageBody) {
			newErrors.newMessageBodyError = 'Cannot be blank';
		}

		if (!this.state.newMessageTag.text || !this.state.newMessageSubject || 
			!this.state.newMessageBody) {
			newErrors.newMessageIsInvalid = true;
			this.setState(() => ({
				newMessageTagError: newErrors.newMessageTagError,
				newMessageSubjectError: newErrors.newMessageSubjectError,
				newMessageBodyError: newErrors.newMessageBodyError,
				newMessageIsInvalid: newErrors.newMessageIsInvalid,
				newMessageSaveAttempted: true,
			}));
		} else {
			// construct message object
			const newMessageProperties = {
				newMessageTag: this.state.newMessageTag,
				newMessageSubject: this.state.newMessageSubject,
				newMessageBody: this.state.newMessageBody,
				newMessageImage: this.state.newMessageImage,
				newMessageExpirationDate: this.state.newMessageExpirationDate,
				newMessageKey: shortid.generate(),
				newMessageCreated: '2018-04-19',
				newMessageCreator: {
					account: 'jbaker',
					displayName: 'James Baker',
				},
			};
			// send message to Neso
			HcMessagesData.SendNesoMessagesMessage(
				'https://neso.mos.org:3001/hcMessages/addMessage', 
				newMessageProperties,
			)
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
		}
	}
	resetNewMessageState() {
		this.setState(() => ({
			newMessageTag: { key: undefined },
			newMessageSubject: undefined,
			newMessageBody: undefined,
			newMessageImage: undefined,
			newMessageExpirationDate: undefined,
			newMessageTagError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageError: undefined,
			newMessageIsInvalid: undefined,
			newMessageSaveAttempted: false,
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
		this.props.addMessageToList(newMessageProperties);
		this.resetNewMessageState();
		this.setState(() => ({
			newMessageSaveSuccess: true,
		}));
	}

	returnFormFieldContainerClassNameString(errorPropertyName) {
		return errorPropertyName && this.state[errorPropertyName] ? 
			'mos-react-form-field contains-errors' : 
			'mos-react-form-field';
	}

	render() {
		return (
			<div id="hc-messages-new-message-form" className="mos-react-component-root">
				<h3>New Message</h3>
				<div className={this.returnFormFieldContainerClassNameString('newMessageTagError')}>
					<HcMessagesTagDropdown
						tagsArray={this.props.tagsArray}
						onChanged={this.handleChangedTag}
						selectedKey={this.state.newMessageTag.key}
					/>
					<div className="mos-react-form-field-error">
						{this.state.newMessageTagError}
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
				<div className={this.returnFormFieldContainerClassNameString('newMessageImageError')}>
					<TextField
						label="Image - replace with file input"
						value={this.state.newMessageImage}
						onChanged={this.handleChangedImage}
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
				<button type="button" onClick={this.handleAddMessage}>Save</button>
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
}
