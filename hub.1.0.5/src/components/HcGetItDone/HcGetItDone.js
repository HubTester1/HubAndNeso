
// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneData from './HcGetItDoneData';
// import HcPushedItemsLink from './HcPushedItemsLink';

// ----- COMPONENT

export default class HcGetItDone extends React.Component {
	state = {
		listItemsArray: [],
	};

	componentDidMount() {
		HcGetItDoneData.ReturnAllGetItDoneData()
			.then((allPushedItemsData) => {
				this.setState(() => ({
					listItemsArray: allPushedItemsData,
				}));
			});
	}

	render() {
		return (
			<div id="hc-pushed-items" className="mos-react-component-root">
				<h2>Please Be Aware</h2>
			</div>
		);
	}
}
