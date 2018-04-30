
// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneLinkListItem from '../HcGetItDoneLinkListItem/HcGetItDoneLinkListItem';

// ----- COMPONENT

export default class HcGetItDoneViewByAlpha extends React.Component {
	render() {
		return (
			<div id="hc-get-it-done-view-by-alpha" className="mos-react-component-root">
				<ul>
					{
						this.props.listItemsAlphaArray.map((listItemValue, listItemIndex) => (
							<HcGetItDoneLinkListItem
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
