
// ----- IMPORTS

import * as React from 'react';
import Dropzone from 'react-dropzone';

// ----- COMPONENT

// /* eslint-disable */
/* eslint react/prefer-stateless-function: 0 */
export default class HcMessagesFiles extends React.Component {
	render() {
		return (
			<div className="hc-messages-expiration-date mos-react-component-root">
				<Dropzone
					onDrop={this.props.handleChangedImage}
					accept="image/jpeg,image/jpg,image/png,image/gif"
					multiple
					// onDropRejected={handleDropRejected}
				>
					Drag a file here or click or tap to upload.
				</Dropzone>
				{/* processing div */}
				{/* preview for each in array - classed according to success */}
				{/* hidden input containing array of urls */}
			</div>
		);
	}
}
