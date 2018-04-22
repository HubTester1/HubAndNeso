
// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneData from './HcGetItDoneData';
import HcGetItDoneLink from './HcGetItDoneLink';

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
			<div id="hc-get-it-done" className="mos-react-component-root">
				<h2>Get it Done</h2>
				<ul>
					{
						this.state.listItemsArray.map((listItemValue, listItemIndex) => (
							<HcGetItDoneLink
								key={listItemValue.key}
								listItemId={listItemValue.key}
								listItemContent={listItemValue}
							/>
						))
					}
				</ul>
			</div>
		);
	}
}
