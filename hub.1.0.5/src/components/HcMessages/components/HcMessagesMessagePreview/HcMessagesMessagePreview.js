
// ----- IMPORTS

import * as React from 'react';
import Truncate from 'react-truncate';
import Modal from 'react-modal';
import MediaQuery from 'react-responsive';

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
	handleOpenModalClick(e) {
		e.preventDefault();
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
		Modal.setAppElement('#hub-central-mount-point');
		// console.log(this.props.messageContent);
		return (
			<li id={`hc-messages-message-preview_${this.props.messageId}`} className="hc-messages-message-preview mos-react-component-root">
				{
					!this.state.showInlineFull &&

					<h3 className="hc-messages-message-subject">
						{this.props.messageContent.subject}
					</h3>
				}
				{
					!this.state.showInlineFull &&

					<div className="hc-messages-message-preview-truncated-body">
						<MediaQuery minWidth={ScreenSizes.ReturnMediumMin()}>
							<Truncate
								lines={2}
								ellipsis={
									<span>...</span>
								}
							>
								<div className="hc-messages-message-body">{this.props.messageContent.body}</div>
							</Truncate>
							<div className="hc-messages-message-button-container">
								<button
									className="hc-messages-message-full-message-button"
									onClick={this.handleOpenModalClick}
								>
									<span className="button-text-container">Full message</span>
								</button>
								{
									this.props.messageContent.creator.account === this.props.uData.account &&

									<span className="hc-messages-message-conditional-button-container">
										<span className="hc-messages-message-conditional-button-separator" />
										<button
											className="hc-messages-message-enable-message-update-button"
											onClick={
												e => this.props.enableMessageUpdate(this.props.messageContent.messageID, e)
											}
										>
											<span className="button-text-container">Modify message</span>
										</button>
									</span>
								}
							</div>
							<Modal
								className="hc-messages-message-full-message-modal"
								isOpen={this.state.showModalFull}
								onAfterOpen={this.handleAfterModalOpens}
								onRequestClose={this.handleCloseModalClick}
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
									<span>...</span>
								}
							>
								<div className="hc-messages-message-body">{this.props.messageContent.body}</div>
							</Truncate>
							<div className="hc-messages-message-button-container">
								<button
									className="hc-messages-message-full-message-button"
									onClick={this.handleOpenInlineFullClick}
								>
									<span className="button-text-container">Full message</span>
								</button>
								{
									this.props.messageContent.creator.account === this.props.uData.account &&

									<button
										className="hc-messages-message-enable-message-update-button"
										onClick={
											e => this.props.enableMessageUpdate(this.props.messageContent.messageID, e)
										}
									>
										<span className="button-text-container">Modify message</span>
									</button>
								}
							</div>
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
