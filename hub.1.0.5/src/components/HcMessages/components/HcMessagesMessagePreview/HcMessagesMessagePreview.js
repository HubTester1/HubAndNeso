
// ----- IMPORTS

import * as React from 'react';
import Truncate from 'react-truncate';
import Modal from 'react-modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';
import HcMessagesMessageImagePreview from '../HcMessagesMessageImagePreview/HcMessagesMessageImagePreview';
// import MOSUtilities from '../../../../services/MOSUtilities';

// ----- COMPONENT

export default class HcMessagesMessagePreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
		};
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	openModal() {
		this.setState({ modalIsOpen: true });
	}

	afterOpenModal() {
		console.log('after open modal');
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}
	render() {
		const customStyles = {
			content: {
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)',
			},
		};
		return (
			<li id={`hc-messages-message-preview_${this.props.messageId}`} className="hc-messages-message-preview mos-react-component-root">
				<h3 className="hc-messages-message-subject">
					{this.props.messageContent.subject}
				</h3>
				{
					this.props.messageContent.images &&

					<HcMessagesMessageImagePreview
						key={this.props.messageContent.images[0].key}
						imageID={this.props.messageContent.images[0].key}
						imageContent={this.props.messageContent.images[0]}
					/>
				}
				<Truncate
					lines={1} 
					ellipsis={
						<span>... 
							<DefaultButton
								iconProps={{ iconName: 'Fullscreen' }}
								text="Full message"
								onClick={this.openModal}
							/>
						</span>
					}
				>
					<div className="hc-messages-message-body">{this.props.messageContent.body}</div>
				</Truncate>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
					ariaHideApp={false}
				>
					<HcMessagesMessage
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
