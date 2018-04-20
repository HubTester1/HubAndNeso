
// ----- IMPORTS

import * as React from 'react';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
// import XXX from '../XXX/XXX';

// ----- DEFINE INTERFACES





// ----- COMPONENT

class HcMessagesCategoryDropdown extends React.Component<any, any> {
	
	public returnCategoryDropdownOptions() {
		return this.props.categoriesArray.map(categoryObject => {
			return {
				key: categoryObject.camlName,
				text: categoryObject.name
			};
		});
	}
	
	public render() {
		return (
			<div className="hc-messages-category-dropdown mos-react-component-root">
				<Dropdown
					// placeHolder='Select an Option'
					label='Category'
					// id='Basicdrop1'
					ariaLabel='Message category'
					required={true}
					options={this.returnCategoryDropdownOptions()}
					// onFocus={this._log('onFocus called')}
					// onBlur={this._log('onBlur called')}
					// componentRef={this._basicDropdown}
				/>
			</div>
		);
	}
}

export default HcMessagesCategoryDropdown;