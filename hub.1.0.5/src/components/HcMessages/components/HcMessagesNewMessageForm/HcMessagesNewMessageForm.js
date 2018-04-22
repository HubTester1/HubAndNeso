
// ----- IMPORTS

import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import HcMessagesTagDropdown from '../HcMessagesTagDropdown/HcMessagesTagDropdown';
import HcMessagesExpirationDate from '../HcMessagesExpirationDate/HcMessagesExpirationDate';


// ----- COMPONENT

const HcMessagesNewMessageForm = props => (
	<div id="hc-messages-new-message-form" className="mos-react-component-root">
		<h3>New Message</h3>
		<HcMessagesTagDropdown
			tagsArray={props.tagsArray}
		/>
		<TextField
			label="Subject"
			required
		/>
		<TextField
			label="Body"
			required
			multiline
			rows={6}
		/>
		<TextField
			label="Image - replace with file input"
			required
		/>
		<HcMessagesExpirationDate />
		<DefaultButton
			primary
			// data-automation-id='test'
			// disabled={disabled}
			// checked={checked}
			text="Save"
		// onClick={this._alertClicked}
		/>
	</div>
);

export default HcMessagesNewMessageForm;
