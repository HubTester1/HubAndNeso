
// ----- IMPORTS

import * as React from 'react';
import HcMessagesData from './HcMessagesData';
// import HcPushedItemsLink from './HcPushedItemsLink';

// ----- COMPONENT

export default class HcGetItDone extends React.Component {
	state = {
		listItemsArray: [],
	};

	componentDidMount() {
		HcMessagesData.ReturnNesoMessagesCategoriesForHcMessages()
			.then((allMessageCategories) => {
				// console.log(allMessageCategories);
				/* this.setState(() => ({
					listItemsArray: allPushedItemsData,
				})); */
			});
		HcMessagesData.ReturnNesoMessagesMessagesForHcMessages()
			.then((allMessageMessages) => {
				// console.log(allMessageMessages);
				/* this.setState(() => ({
					listItemsArray: allPushedItemsData,
				})); */
			});
	}

	render() {
		return (
			<div id="hc-pushed-items" className="mos-react-component-root">
				<h2>Messages</h2>
			</div>
		);
	}
}
