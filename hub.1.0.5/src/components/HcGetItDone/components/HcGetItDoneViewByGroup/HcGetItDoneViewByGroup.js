
// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneLink from '../HcGetItDoneLink/HcGetItDoneLink';

// ----- COMPONENT

export default class HcGetItDoneViewByGroup extends React.Component {
	render() {
		return (
			<div id="hc-get-it-done-view-by-group" className="mos-react-component-root">
				<ul>
					{
						this.props.listItemsGroupedArray.map((listItemValue, listItemIndex) => (
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
