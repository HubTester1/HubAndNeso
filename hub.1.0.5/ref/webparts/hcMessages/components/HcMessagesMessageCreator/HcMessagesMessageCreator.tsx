
// ----- IMPORTS

import * as React from 'react';


// ----- DEFINE INTERFACES





// ----- COMPONENT

class HcMessagesMessageCreator extends React.Component<any, any> {
	public render() {
		return (
			<p className="hc-messages-message-creator mos-react-component-root">
				<a data-creator-account={this.props.creator.account} >
					{this.props.creator.displayName}
				</a>
			</p>
		);
	}
}

export default HcMessagesMessageCreator;