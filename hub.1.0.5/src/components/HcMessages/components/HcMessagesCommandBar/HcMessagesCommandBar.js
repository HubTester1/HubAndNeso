
// ----- IMPORTS

import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
// eslint-disable-next-line
import { initializeIcons } from '@uifabric/icons';

// ----- COMPONENT

export default class HcMessagesCommandBar extends React.Component {
	returnCommanBarItems() {
		return [
			{
				key: 'newMessage',
				name: 'New',
				icon: 'Add',
				ariaLabel: 'Add a message',
			}, {
				key: 'tagFilter',
				name: 'Category Filter',
				icon: 'Filter',
				items: this.returnTagFilterItems(),
			},
		];
	}
	returnTagFilterItems() {
		return this.props.tagsArray.map(tagObject => ({
			key: tagObject.camlName,
			name: tagObject.name,
		}));
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
