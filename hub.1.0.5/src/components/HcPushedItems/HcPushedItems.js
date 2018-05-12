
// ----- IMPORTS

import * as React from 'react';
import HcPushedItemsData from './HcPushedItemsData';
import HcPushedItemsLink from './HcPushedItemsLink';

import './HcPushedItems.sass';
import './HcPushedItemsMediumLarge.sass';
import './HcPushedItemsSmall.sass';

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
				<h3>Please Be Aware</h3>
				<ul id="hc-pushed-items-list">
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
