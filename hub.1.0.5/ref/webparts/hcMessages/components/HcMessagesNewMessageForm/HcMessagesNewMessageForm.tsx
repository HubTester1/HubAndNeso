
// ----- IMPORTS

import * as React from 'react';
import HcMessagesCategoryDropdown from '../HcMessagesCategoryDropdown/HcMessagesCategoryDropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import HcMessagesExpirationDate from '../HcMessagesExpirationDate/HcMessagesExpirationDate';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';


// ----- DEFINE INTERFACES





// ----- COMPONENT

class HcMessagesNewMessageForm extends React.Component<any, any> {
	public render() {
		return (
			<div className="hc-messages-category-dropdown mos-react-component-root">
				<HcMessagesCategoryDropdown
					categoriesArray={this.props.categoriesArray}
				/>
				<TextField
					label='Subject'
					required={true}
				/>
				<TextField
					label='Body'
					required={true}
					multiline
					rows={6}
				/>
				<TextField
					label='Image - replace with file input'
					required={true}
				/>
				<HcMessagesExpirationDate/>
				<DefaultButton
					primary={true}
					// data-automation-id='test'
					// disabled={disabled}
					// checked={checked}
					text='Save'
					// onClick={this._alertClicked}
				/>
			</div>
		);
	}
}

export default HcMessagesNewMessageForm;