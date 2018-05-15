
// ----- IMPORTS

import * as React from 'react';
import Truncate from 'react-truncate';
import Modal from 'react-modal';
import MediaQuery from 'react-responsive';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';
// import HcMessagesMessageImagePreview from 
// '../HcMessagesMessageImagePreview/HcMessagesMessageImagePreview';
import ScreenSizes from '../../../../services/ScreenSizes';

// ----- COMPONENT

export default class HcMessagesMessagePreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModalFull: false,
			showInlineFull: false,
		};
		this.handleOpenModalClick = this.handleOpenModalClick.bind(this);
		this.handleAfterModalOpens = this.handleAfterModalOpens.bind(this);
		this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
		this.handleOpenInlineFullClick = this.handleOpenInlineFullClick.bind(this);
		this.handleCloseInlineFullClick = this.handleCloseInlineFullClick.bind(this);
	}
	handleOpenModalClick() {
		this.setState({ showModalFull: true });
	}
	handleAfterModalOpens() {
		// console.log('after open modal');
	}
	handleCloseModalClick() {
		this.setState({ showModalFull: false });
	}
	handleOpenInlineFullClick() {
		this.setState({ showInlineFull: true });
	}
	handleCloseInlineFullClick() {
		this.setState({ showInlineFull: false });
	}
	render() {
		Modal.setAppElement('#react-mount-point');
		/* const customStyles = {
			content: {
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)',
			},
		}; */
		return (
			<li id={`hc-messages-message-preview_${this.props.messageId}`} className="hc-messages-message-preview mos-react-component-root">
				{
					!this.state.showInlineFull &&

					<h3 className="hc-messages-message-subject">
						{this.props.messageContent.subject}
					</h3>
				}
				{
					/* !this.state.showInlineFull &&
					this.props.messageContent.images &&
					this.props.messageContent.images[0] &&

					<HcMessagesMessageImagePreview
						imageID={this.props.messageContent.images[0].previewKey}
						imageContent={this.props.messageContent.images[0]}
					/> */
				}
				{
					!this.state.showInlineFull &&

					<div className="hc-messages-message-preview-truncated-body">
						<MediaQuery minWidth={ScreenSizes.ReturnMediumMin()}>
							<Truncate
								lines={2}
								ellipsis={
									<span>...
										<DefaultButton
											className="hc-messages-message-full-message-button"
											iconProps={{ iconName: 'Fullscreen' }}
											text="Full message"
											onClick={this.handleOpenModalClick}
										/>
									</span>
								}
							>
								<div className="hc-messages-message-body">{this.props.messageContent.body}</div>
							</Truncate>
							<Modal
								className="hc-messages-message-full-message-modal"
								isOpen={this.state.showModalFull}
								onAfterOpen={this.handleAfterModalOpens}
								onRequestClose={this.handleCloseModalClick}
								// style={customStyles}
								contentLabel="More"
								ariaHideApp={false}
							>
								<HcMessagesMessage
									messageId={this.props.messageId}
									messageContent={this.props.messageContent}
									handleCloseModalClick={this.handleCloseModalClick}
									handleCloseInlineFullClick={this.handleCloseInlineFullClick}
								/>
							</Modal>
						</MediaQuery>
						<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
							<Truncate
								lines={1}
								ellipsis={
									<span>...
										<DefaultButton
											className="hc-messages-message-full-message-button"
											iconProps={{ iconName: 'ChevronDown' }}
											text="Full message"
											onClick={this.handleOpenInlineFullClick}
										/>
									</span>
								}
							>
								<div className="hc-messages-message-body">{this.props.messageContent.body}</div>
							</Truncate>
						</MediaQuery>
					</div>
				}
				{
					this.state.showInlineFull &&

					<HcMessagesMessage
						messageId={this.props.messageId}
						messageContent={this.props.messageContent}
						handleCloseModalClick={this.handleCloseModalClick}
						handleCloseInlineFullClick={this.handleCloseInlineFullClick}
					/>
				}
			</li>
		);
	}
}
