
// ----- IMPORTS

import * as React from 'react';
import Dropzone from 'react-dropzone';
import HcMessagesData from '../../HcMessagesData';

// ----- COMPONENT


/* eslint-disable */

export default class HcMessagesFiles extends React.Component {
	state = {
		filePreviews: [],
	};
	
	handleFileDrop(acceptedFiles, rejectedFiles) {
		this.props.returnAndConditionallySetMessageID()
			.then((messageID) => {
				console.log('messageID');
				console.log(messageID);
			})
			.catch((error) => {
				console.log('error');
				console.log(error);
			});
		/* console.log(acceptedFiles);
		HcMessagesData.UploadMessagesFiles(acceptedFiles)
			.then((response) => {
				ReturnNesoData
			});


		const file = acceptedFiles[0];
		web.getFolderByServerRelativeUrl('/HcMessagesFiles')
			.files.add(file.name, file, true)
			.then((_) => { 
				console.log('file done');
				console.log(_);
			});
		this.setState({ 
			filePreview: acceptedFiles[0].preview,
		}); */
	}

	render() {
		return (
			<div className="hc-messages-expiration-date mos-react-component-root">
				<Dropzone
					onDrop={this.handleFileDrop}
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
