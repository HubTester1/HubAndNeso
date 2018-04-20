
// ----- IMPORTS

import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
// import XXX from '../XXX/XXX';

// ----- DEFINE INTERFACES





// ----- COMPONENT

class HcMessagesCommandBar extends React.Component<any, any> {

	public returnCommanBarItems() {
		return [
			{
				key: "newMessage",
				name: "New",
				icon: "Add",
				ariaLabel: 'Add a message',
			}, {
				key: "categoryFilter",
				name: "Category Filter",
				icon: "Filter",
				items: this.returnCategoryFilterItems()
			}
		];
	}

	public returnCategoryFilterItems() {
		return this.props.categoriesArray.map(categoryObject => {
			return {
				key: categoryObject.camlName,
				name: categoryObject.name
			};
		});
	}

	public render() {
		return (
			<div className="hc-messages-command-bar mos-react-component-root">
				<CommandBar
					isSearchBoxVisible={false}
					items={this.returnCommanBarItems()}
				/>
			</div>
		);
	}
}

export default HcMessagesCommandBar;