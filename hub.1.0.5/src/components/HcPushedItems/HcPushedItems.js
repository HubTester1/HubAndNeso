
// ----- IMPORTS

import * as React from 'react';
import HcPushedItemsData from './HcPushedItemsData';
import HcPushedItemsLink from './HcPushedItemsLink';

// ----- COMPONENT

export default class HcPushedItems extends React.Component {
	state = {
		listItemsArray: [],
	};

	componentDidMount() {
		HcPushedItemsData.ReturnAllPushedItemsData()
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
				<ul>
					{
						this.state.listItemsArray.map((listItemValue, listItemIndex) => (
							<HcPushedItemsLink
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
