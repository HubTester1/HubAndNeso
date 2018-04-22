
// ----- IMPORTS

import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

// ----- COMPONENT

export default class HcMessagesTagDropdown extends React.Component {
	returnTagDropdownOptions() {
		return this.props.tagsArray.map(tagObject => ({
			key: tagObject.camlName,
			text: tagObject.name,
		}));
	}

	render() {
		return (
			<div className="hc-messages-tag-dropdown mos-react-component-root">
				<Dropdown
					// placeHolder='Select an Option'
					label="Category"
					// id='Basicdrop1'
					ariaLabel="Message category"
					// required
					options={this.returnTagDropdownOptions()}
					onChanged={this.props.onChanged}
				// onFocus={this._log('onFocus called')}
				// onBlur={this._log('onBlur called')}
				// componentRef={this._basicDropdown}
				/>
			</div>
		);
	}
}
