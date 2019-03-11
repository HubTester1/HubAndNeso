
// ----- IMPORTS

import * as React from 'react';
import Truncate from 'react-truncate';
import Modal from 'react-modal';
import MediaQuery from 'react-responsive';

import HcMessagesMessage from '../HcMessagesMessage/HcMessagesMessage';
// import HcMessagesMessageImagePreview from 
// '../HcMessagesMessageImagePreview/HcMessagesMessageImagePreview';
import ScreenSizes from '../../../../services/ScreenSizes';
import MOSUtilities from '../../../../services/MOSUtilities';

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
	returnHtml(html) {
		return { __html: `<div>${html}</div>` };
	}
	returnFriendlyDate(dateString) {
		// if today
		// 		time only
		// else if in the last week
		// 		day and time
		// else
		// 		day and date (display year dynamically)
		return MOSUtilities.ReturnFormattedDateTime({ incomingDateTimeString: dateString, incomingReturnFormat: 'ddd h:mm a' });
	}
	render() {
		Modal.setAppElement('#hub-central-mount-point');
		return (
			<li className="mos-react-component-root">
			
				{
					!this.state.showInlineFull &&
					
					<div className="hc-messages-message-preview">
						<h3 className="hc-messages-message-subject">
							<Truncate
								lines={1}
								ellipsis={<span>...</span>}
							>
								{this.props.messageContent.subject}
							</Truncate>
						</h3>
						<p className="hc-messages-message-date">
							<span className="hc-messages-message-date-prefix">Posted: </span>
							{this.returnFriendlyDate(this.props.messageContent.created)}
						</p>
						<p className="hc-messages-message-author">
							<span className="hc-messages-message-author-prefix">Posted by: </span>
							{this.props.messageContent.creator.displayName}
						</p>
						<div className="hc-messages-message-preview-truncated-body">
							<MediaQuery minWidth={ScreenSizes.ReturnMediumMin()}>
								<Truncate
									lines={1}
									ellipsis={<span>...</span>}
								>
									<div className="hc-messages-message-body" dangerouslySetInnerHTML={this.returnHtml(this.props.messageContent.body)} />
								</Truncate>
								
								<button
									className="hc-messages-message-full-message-button"
									onClick={this.handleOpenModalClick}
								>
									<span className="button-text-container">Full message</span>
								</button>
								{
									this.props.messageContent.creator.account === this.props.uData.account &&

									<div className="hc-messages-message-button-container">
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
									</div>
								}
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
									ellipsis={<span>...</span>}
								>
									<div className="hc-messages-message-body" dangerouslySetInnerHTML={this.returnHtml(this.props.messageContent.body)} />
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
					</div>
				}
				{
					this.state.showInlineFull &&

					<div className="hc-messages-message-inline-message">
						<HcMessagesMessage
							messageId={this.props.messageId}
							messageContent={this.props.messageContent}
							handleCloseModalClick={this.handleCloseModalClick}
							handleCloseInlineFullClick={this.handleCloseInlineFullClick}
						/>
					</div>
				}
			</li>
		);
	}
}
