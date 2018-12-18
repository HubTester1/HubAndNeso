
// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

// ----- COMPONENT


export default class HcPushedDocsLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSecondaryLinks: false,
		};
		this.handleSecondaryLinkControlClick = this.handleSecondaryLinkControlClick.bind(this);
	}
	handleSecondaryLinkControlClick() {
		this.setState(prevState => ({
			showSecondaryLinks: !prevState.showSecondaryLinks,
		}));
	}
	render() {
		return (
			<li id={`hc-pushed-items-item_${this.props.listItemId}`} className={`hc-pushed-items-item ${this.props.listItemContent.type} mos-react-component-root`}>
				<div className="hc-pushed-items-item-primary-link-container">
					<a href={this.props.listItemContent.displayOnlyUrl} className={`hc-pushed-items-item-primary-link ${this.props.listItemContent.type}`}>{this.props.listItemContent.anchorText}</a>
				</div>
				<div className="hc-pushed-items-item-secondary-link-and-link-control-container">
					{
						((this.props.screenType === 'small' && !this.state.showSecondaryLinks) || this.props.screenType === 'medium' || this.props.screenType === 'large') && 

						<div className="hc-pushed-items-item-secondary-link-control-container">
							<DefaultButton
								iconProps={{ iconName: 'More' }}
								text="All Options"
								className="hc-pushed-items-item-secondary-link-control"
								onClick={this.handleSecondaryLinkControlClick}
							/>
						</div>
					}
					{
						this.props.listItemContent.type === 'file' && ((this.props.screenType === 'small' && this.state.showSecondaryLinks) || this.props.screenType === 'medium' || this.props.screenType === 'large') && 

						<div className="hc-pushed-items-item-secondary-link-container">
							<a href={this.props.listItemContent.displayOnlyUrl} className="hc-pushed-items-item-secondary-link hc-pushed-items-item-display-only-link">
								<span className="hc-pushed-items-item-secondary-link-text-container">
									Display file in browser: {this.props.listItemContent.anchorText}
								</span>
							</a>
							<a href={this.props.listItemContent.handleFileUrl} className="hc-pushed-items-item-secondary-link hc-pushed-items-item-handle-file-link">
								<span className="hc-pushed-items-item-secondary-link-text-container">
									Open or download file: {this.props.listItemContent.anchorText}
								</span>
							</a>
						</div>
					}
					{
						this.props.listItemContent.type === 'page' && ((this.props.screenType === 'small' && this.state.showSecondaryLinks) || this.props.screenType === 'medium' || this.props.screenType === 'large') && 

						<div className="hc-pushed-items-item-secondary-link-container">
							<a href={this.props.listItemContent.displayOnlyUrl} className="hc-pushed-items-item-secondary-link hc-pushed-items-item-navigation-link">
								<span className="hc-pushed-items-item-secondary-link-text-container">
									Navigate to page: {this.props.listItemContent.anchorText}
								</span>
							</a>
						</div>
					}
				</div>
			</li>
		);
	}
}
