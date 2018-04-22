
// ----- IMPORTS

import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import HcMessagesTagDropdown from '../HcMessagesTagDropdown/HcMessagesTagDropdown';
import HcMessagesExpirationDate from '../HcMessagesExpirationDate/HcMessagesExpirationDate';


// ----- COMPONENT

export default class HcMessagesNewMessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newMessageTag: undefined,
			newMessageSubject: undefined,
			newMessageBody: undefined,
			newMessageImage: undefined,
			newMessageExpirationDate: undefined,
			newMessageTagError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageError: undefined,
			newMessageExpirationDateError: undefined,
		};
		this.handleChangedTag = this.handleChangedTag.bind(this);
		this.handleChangedSubject = this.handleChangedSubject.bind(this);
		this.handleChangedBody = this.handleChangedBody.bind(this);
		this.handleChangedImage = this.handleChangedImage.bind(this);
		this.handleChangedExpirationDate = this.handleChangedExpirationDate.bind(this);
		this.handleAddMessage = this.handleAddMessage.bind(this);
	}
	handleChangedTag(value) {
		console.log(value);
		if (value.text) {
			this.setState(() => ({
				newMessageTag: value.text,
				newMessageTagError: undefined,
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
		this.setState(() => ({ newMessageBody: value }));
		this.setState(() => ({ newMessageBodyError: !value ? 'Cannot be blank' : undefined }));
	}
	handleChangedImage(value) {
		this.setState(() => ({ newMessageImage: value }));
	}
	handleChangedExpirationDate(value) {
		this.setState(() => ({ newMessageExpirationDate: value }));
	}
	handleAddMessage() {
		// must manually validate each property because we can't dynamically set 
		// 		the name of the error in setState
		/* const newErrorsForNewMessage = {
			newMessageTagError: undefined,
			newMessageSubjectError: undefined,
			newMessageBodyError: undefined,
			newMessageImageError: undefined,
			newMessageExpirationDateError: undefined,
		};
		if (!this.state.newMessageTag) {
			newErrorsForNewMessage.newMessageTagError = 'Cannot be blank';
		}
		if (!this.state.newMessageSubject) {
			newErrorsForNewMessage.newMessageSubjectError = 'Cannot be blank';
		}
		if (!this.state.newMessageBody) {
			newErrorsForNewMessage.newMessageBodyError = 'Cannot be blank';
		}
		if (!this.state.newMessageImage) {
			newErrorsForNewMessage.newMessageImageError = 'Cannot be blank';
		}
		console.log(newErrorsForNewMessage);

		this.setState(() => ({
			newMessageTagError: newErrorsForNewMessage.newMessageTagError,
			newMessageSubjectError: newErrorsForNewMessage.newMessageSubjectError,
			newMessageBodyError: newErrorsForNewMessage.newMessageBodyError,
			newMessageImageError: newErrorsForNewMessage.newMessageImageError,
			newMessageExpirationDateError: newErrorsForNewMessage.newMessageExpirationDateError,
		})); */
	}


	render() {
		console.log(this.state);
		return (
			<div id="hc-messages-new-message-form" className="mos-react-component-root">
				<h3>New Message</h3>
				<HcMessagesTagDropdown
					tagsArray={this.props.tagsArray}
					onChanged={this.handleChangedTag}
				/>
				<div className="mos-react-form-field-error">
					{this.state.newMessageErrors.newMessageTagError}
				</div>
				<TextField
					label="Subject"
					onChanged={this.handleChangedSubject}
				/>
				<div className="mos-react-form-field-error">{this.state.newMessageErrors.newMessageSubjectError}
				</div>
				<TextField
					label="Body"
					multiline
					rows={6}
					onChanged={this.handleChangedBody}
				/>
				<div className="mos-react-form-field-error">{this.state.newMessageErrors.newMessageBodyError}
				</div>
				<TextField
					label="Image - replace with file input"
					onChanged={this.handleChangedImage}
				/>
				<div className="mos-react-form-field-error">{this.state.newMessageErrors.newMessageImageError}
				</div>
				<HcMessagesExpirationDate
					onSelectDate={this.handleChangedExpirationDate}
				/>
				<div className="mos-react-form-field-error">{this.state.newMessageErrors.newMessageExpirationDateError}
				</div>
				<button type="button" onClick={this.handleAddMessage}>Save</button>
			</div>
		);
	}
}
