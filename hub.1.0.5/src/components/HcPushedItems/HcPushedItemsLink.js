
// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

// ----- COMPONENT

const HcPushedDocsLink = (props) => {
	console.log(props);
	return (
		<li id={`hc-pushed-items-item_${props.listItemId}`} className={`hc-pushed-items-item ${props.listItemContent.type} mos-react-component-root`}>
			<div className="hc-pushed-items-item-primary-link-container">
				<a href={props.listItemContent.displayOnlyUrl} className={`hc-pushed-items-item-primary-link ${props.listItemContent.type}`}>{props.listItemContent.anchorText}</a>
			</div>
			<div className="hc-pushed-items-item-secondary-link-and-link-control-container">
				<div className="hc-pushed-items-item-secondary-link-control-container">
					<DefaultButton
						iconProps={{ iconName: 'More' }}
						text="All Options"
						className="hc-pushed-items-item-secondary-link-control"
						// onClick={this.handleAboutButtonClick}
					/>
				</div>
				{
					props.listItemContent.type === 'file' &&

					<div className="hc-pushed-items-item-secondary-link-container">
						<a href={props.listItemContent.displayOnlyUrl} className="hc-pushed-items-item-secondary-link hc-pushed-items-item-display-only-link">
							<span className="hc-pushed-items-item-secondary-link-text-container">
								Display file in browser: {props.listItemContent.anchorText}
							</span>
						</a>
						<a href={props.listItemContent.handleFileUrl} className="hc-pushed-items-item-secondary-link hc-pushed-items-item-handle-file-link">
							<span className="hc-pushed-items-item-secondary-link-text-container">
								Open or download file: {props.listItemContent.anchorText}
							</span>
						</a>
					</div>
				}
				{
					props.listItemContent.type === 'page' &&

					<div className="hc-pushed-items-item-secondary-link-container">
						<a href={props.listItemContent.displayOnlyUrl} className="hc-pushed-items-item-secondary-link hc-pushed-items-item-navigation-link">
							<span className="hc-pushed-items-item-secondary-link-text-container">
								Navigate to page: {props.listItemContent.anchorText}
							</span>
						</a>
					</div>
				}
			</div>
		</li>
	);
};

export default HcPushedDocsLink;
