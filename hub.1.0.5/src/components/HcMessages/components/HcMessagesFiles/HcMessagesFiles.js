
// ----- IMPORTS

import * as React from 'react';
import Dropzone from 'react-dropzone';
import HcMessageFilePreview from '../HcMessageFilePreview/HcMessageFilePreview';

// ----- COMPONENT

// /* eslint-disable */
/* eslint react/prefer-stateless-function: 0 */
export default class HcMessagesFiles extends React.Component {
	render() {
		return (
			<div className="hc-messages-images mos-react-component-root">
				{!this.props.newMessageImagesAreUploading && 
					<Dropzone
						onDrop={this.props.handleChangedImage}
						accept="image/jpeg,image/jpg,image/png,image/gif"
						multiple
						// onDropRejected={handleDropRejected}
					>
						Drag a file here or click or tap to upload.
					</Dropzone>
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
