
// ----- IMPORTS

import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

// ----- COMPONENT

export default class HcMessagesCommandBar extends React.Component {
	returnCommanBarItems() {
		let hideShowButton = {
			key: 'newMessage',
			name: 'New',
			icon: 'Add',
			ariaLabel: 'Add a message',
			onClick: this.props.handleClickNewMessageButton,
		};
		if (this.props.showingNewMessageForm && !this.props.updatingMessage) {
			hideShowButton = {
				key: 'hideNewMessage',
				name: 'Hide New Message',
				icon: 'ChevronUpMed',
				ariaLabel: 'Hide the new message form',
				onClick: this.props.handleClickHideNewMessageButton,
			};
		}
		if (this.props.showingNewMessageForm && this.props.updatingMessage) {
			hideShowButton = {
				key: 'hideUpdateMessage',
				name: 'Hide Message Modification',
				icon: 'ChevronUpMed',
				ariaLabel: 'Hide the message modification form',
				onClick: this.props.handleClickHideNewMessageButton,
			};
		}
			
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
