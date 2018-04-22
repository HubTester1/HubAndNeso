
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
			newMessageIsInvalid: undefined,
		};
		this.handleChangedTag = this.handleChangedTag.bind(this);
		this.handleChangedSubject = this.handleChangedSubject.bind(this);
		this.handleChangedBody = this.handleChangedBody.bind(this);
		this.handleChangedImage = this.handleChangedImage.bind(this);
		this.handleAddMessage = this.handleAddMessage.bind(this);
	}
	handleChangedTag(value) {
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
	handleChangedImage(value) {
		if (value) {
			this.setState(() => ({
				newMessageImage: value,
				newMessageImageError: undefined,
			}));
		} else {
			this.setState(() => ({
				newMessageImage: undefined,
				newMessageImageError: 'Cannot be blank',
			}));
		}
	}
	handleAddMessage() {
		if (!this.state.newMessageTag || !this.state.newMessageSubject || 
			!this.state.newMessageBody || !this.state.newMessageImage) {
			this.setState(() => ({
				newMessageIsInvalid: true,
			}));
		} else {
			console.log("you're valid, good buddy");
		}
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
					/>
					<div className="mos-react-form-field-error">
						{this.state.newMessageTagError}
					</div>
				</div>
				<div className={this.returnFormFieldContainerClassNameString('newMessageSubjectError')}>
					<TextField
						label="Subject"
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
						onChanged={this.handleChangedBody}
					/>
					<div className="mos-react-form-field-error">
						{this.state.newMessageBodyError}
					</div>
				</div>
				<div className={this.returnFormFieldContainerClassNameString('newMessageImageError')}>
					<TextField
						label="Image - replace with file input"
						onChanged={this.handleChangedImage}
					/>
					<div className="mos-react-form-field-error">
						{this.state.newMessageImageError}
					</div>
				</div>
				<div className={this.returnFormFieldContainerClassNameString(null)}>
					<HcMessagesExpirationDate />
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
			</div>
		);
	}
}
