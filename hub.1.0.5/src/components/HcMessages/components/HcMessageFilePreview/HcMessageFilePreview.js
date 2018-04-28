
// ----- IMPORTS

import * as React from 'react';
import MOSUtilities from '../../../../services/MOSUtilities';

// ----- COMPONENT

export default class HcMessagesFilePreview extends React.Component {
	constructor(props) {
		super(props);
		this.ReturnFileSizeToReport = this.ReturnFileSizeToReport.bind(this);
		this.ReturnFileSizeFormattedToOneSignificantDigit = 
			this.ReturnFileSizeFormattedToOneSignificantDigit.bind(this);
	}
	ReturnFileSizeFormattedToOneSignificantDigit(fileSize) {
		let fileSizeString = fileSize.toFixed(1).toString();
		const quantityOfDigitsInFileSizeString = fileSizeString.length;
		const lastDigitInFileSizeString = fileSizeString.charAt(quantityOfDigitsInFileSizeString - 1);
		if (lastDigitInFileSizeString == '0') {
			fileSizeString = fileSizeString.substring(0, quantityOfDigitsInFileSizeString - 2);
		}
		return fileSizeString;
	}
	ReturnFileSizeToReport(rawFileSize) {
		// perform some file size conversions
		const fileSizeInKB = rawFileSize / 1000;
		const fileSizeInMB = fileSizeInKB / 1000;
		const fileSizeInGB = fileSizeInMB / 1000;

		// set fileSizeToReport to the first file size conversion to be less than 4 digits
		let fileSizeToReport = '';
		if (Math.round(fileSizeInKB) > 0 && Math.round(fileSizeInKB) < 1000) {
			fileSizeToReport = fileSizeInKB;
			fileSizeToReport = this.ReturnFileSizeFormattedToOneSignificantDigit(fileSizeToReport);
			fileSizeToReport += ' KB';
		} else if (Math.round(fileSizeInMB) > 0 && Math.round(fileSizeInMB) < 1000) {
			fileSizeToReport = fileSizeInMB;
			fileSizeToReport = this.ReturnFileSizeFormattedToOneSignificantDigit(fileSizeToReport);
			fileSizeToReport += ' MB';
		} else if (Math.round(fileSizeInGB) > 0 && Math.round(fileSizeInGB) < 1000) {
			fileSizeToReport = fileSizeInGB;
			fileSizeToReport = this.ReturnFileSizeFormattedToOneSignificantDigit(fileSizeToReport);
			fileSizeToReport += ' GB';
		} else {
			fileSizeToReport = `${rawFileSize} bytes`;
		}
		return fileSizeToReport;
	}

	render() {
		// if this image was uploaded successfully (error is false)
		if (!this.props.imageContent.error) {
			const backgroundImageUrl = MOSUtilities.ReplaceAll(' ', '%20', this.props.imageContent.url);
			const imagePreviewStyles = {
				backgroundImage: `url(${backgroundImageUrl})`,
			};
			const fileSizeFormatted = this.ReturnFileSizeToReport(this.props.imageContent.size);
			return (
				<a 
					id={`hc-messages-images-image-container_${this.props.imageId}`}
					className="hc-messages-images-image-container image-upload-success mos-react-component-root"
					href={this.props.imageContent.url} 
					target="_blank"
				>
					{/* image preview */}
					<div 
						id={`hc-messages-images-image-preview_${this.props.imageId}`}
						className="hc-messages-images-image-preview specific-image"
						style={imagePreviewStyles}
					/>
					{/* file data text */}
					<div
						id={`hc-messages-images-image-file-name-and-size_${this.props.imageId}`}
						className="hc-messages-images-image-file-name-and-size"
					>
						<div className="hc-messages-images-image-file-name">{this.props.imageContent.name}</div>
						<div className="hc-messages-images-image-file-size">{fileSizeFormatted}</div>
					</div>
					{/* delete control */}
					<button
						id={`hc-messages-images-image-file-control_${this.props.imageId}`} 
						className="hc-messages-images-image-file-control"
					>XXXXX
					</button>
				</a>
			);
		}
		// if this image was NOT uploaded successfully (error is true)
		return (
			<div className="hc-messages-images-image image-upload-error mos-react-component-root">
				{this.props.imageContent.name} could not be uploaded.
			</div>
		);
	}
}
