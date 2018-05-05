
// ----- IMPORTS

import * as React from 'react';
import Truncate from 'react-truncate';
import Modal from 'react-responsive-modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';
// import HcMessagesMessageImage from '../HcMessagesMessageImage/HcMessagesMessageImage';
// import MOSUtilities from '../../../../services/MOSUtilities';

// ----- COMPONENT

export default class HcMessagesMessagePreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		this.onCloseModal = this.onCloseModal.bind(this);
	}

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};
	render() {
		return (
			<li id={`hc-messages-message-preview_${this.props.messageId}`} className="hc-messages-message-preview mos-react-component-root">
				<h3 className="hc-messages-message-subject">
					{this.props.messageContent.subject}
				</h3>
				<Truncate
					lines={1} 
					ellipsis={
						<span>... 
							<DefaultButton
								iconProps={{ iconName: 'Fullscreen' }}
								text="Full message"
								onClick={this.onOpenModal}
							/>
						</span>
					}
				>
					<div className="hc-messages-message-body">{this.props.messageContent.body}</div>
				</Truncate>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
					<HcMessagesMessage
						key={this.props.key}
						messageId={this.props.messageId}
						messageContent={this.props.messageContent}
					/>
				</Modal>
				{/* <HcMessagesMessageCreator
				creator={this.props.messageContent.creator}
			/>

			<p className="hc-messages-message-created">
				{MOSUtilities.ReturnFormattedDateTime({
					incomingDateTimeString: this.props.messageContent.created,
					incomingReturnFormat: 'MMMM D, YYYY',
					determineYearDisplayDynamically: 1,
				})}
			</p>
			{
				this.props.messageContent.images &&
				this.props.messageContent.images.map(imageValue => (
					<HcMessagesMessageImage
						key={imageValue.key}
						imageID={imageValue.key}
						imageContent={imageValue}
					/>
				))
			}
			<div className="hc-messages-message-body">{this.props.messageContent.body}</div> */}
				{/* note: currently only one tag per message */}
				{/* <p className="hc-messages-message-tags">#{this.props.messageContent.tags[0]}</p> */}
			</li>
		);
	}
}
