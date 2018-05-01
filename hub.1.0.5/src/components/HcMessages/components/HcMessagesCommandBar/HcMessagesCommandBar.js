
// ----- IMPORTS

import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

// ----- COMPONENT

export default class HcMessagesCommandBar extends React.Component {
	returnCommanBarItems() {
		const hideShowButton = 
		this.props.showingNewMessageForm ?
			{
				key: 'hideNewMessage',
				name: 'Hide New Message',
				icon: 'ChevronUpMed',
				ariaLabel: 'Hide the new message form',
				onClick: this.props.handleClickHideNewMessageButton,
			} : 
			{
				key: 'newMessage',
				name: 'New',
				icon: 'Add',
				ariaLabel: 'Add a message',
				onClick: this.props.handleClickNewMessageButton,
			};
		return [
			hideShowButton,
			{
				key: 'tagFilter',
				name: 'Category',
				icon: 'Filter',
				items: this.returnTagFilterItems(),
				onClick: this.props.handleClickTagFilterMenuLabel,
			},
		];
	}
	returnTagFilterItems() {
		const tagFilterItemsGenerated = this.props.tagsArray.map(tagObject => ({
			key: tagObject.camlName,
			name: tagObject.name,
			onClick: this.props.handleClickTagFilterMenuItem,
		}));
		const tagFilterItems = [
			{
				key: 'all',
				name: 'All',
				onClick: this.props.handleClickTagFilterMenuItem,
			},
			...tagFilterItemsGenerated,
		];
		return tagFilterItems;
	}
	render() {
		return (
			<div id="hc-messages-command-bar" className="mos-react-component-root">
				<Fabric>
					<CommandBar
						isSearchBoxVisible={false}
						items={this.returnCommanBarItems()}
					/>
				</Fabric>
			</div>
		);
	}
}
