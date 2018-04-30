
// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneLink from '../HcGetItDoneLink/HcGetItDoneLink';

// ----- COMPONENT

export default class HcGetItDoneViewByAlpha extends React.Component {
	render() {
		return (
			<div id="hc-get-it-done-view-by-alpha" className="mos-react-component-root">
				<ul>
					{
						this.props.listItemsAlphaArray.map((listItemValue, listItemIndex) => (
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
