
// ----- IMPORTS

import * as React from 'react';
import Dropzone from 'react-dropzone';
import HcMessageFilePreview from '../HcMessageFilePreview/HcMessageFilePreview';

// ----- COMPONENT

// /* eslint-disable */
/* eslint react/prefer-stateless-function: 0 */
export default class HcMessagesFiles extends React.Component {
	render() {
		const dropzoneInputProps = { id: 'hc-messages-images-file-input' };
		return (
			<div className="hc-messages-images mos-react-component-root">
				{!this.props.newMessageImagesAreUploading && 
					<div className="hc-messages-images-file-input-container">
						{/* note: eslint isn't recognizing that Dropzone is associate with this label */}
						{/* eslint-disable jsx-a11y/label-has-for */}
						<label htmlFor="hc-messages-images-file-input">Images</label>
						<Dropzone
							onDrop={this.props.handleChangedImage}
							accept="image/jpeg,image/jpg,image/png,image/gif"
							multiple
							name="hc-messages-images-file-input"
							inputProps={dropzoneInputProps}
						>
					Drag images here, or click or tap here to browse
						</Dropzone>
					</div>
				}
				{this.props.newMessageImagesAreUploading && 
					<div>
						------ Files are uploading -----
					</div>
				}
				{!this.props.newMessageImagesAreUploading && this.props.newMessageImages[0] && 
					this.props.newMessageImages.map(imageValue => (
						<HcMessageFilePreview
							key={imageValue.key}
							imageId={imageValue.key}
							imageContent={imageValue}
						/>))
				}
			</div>
		);
	}
}
