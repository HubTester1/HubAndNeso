
/* eslint-disable  react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneGroup from '../HcGetItDoneGroup/HcGetItDoneGroup';

// ----- COMPONENT

export default class HcGetItDoneViewByGroup extends React.Component {
	render() {
		return (
			<div id="hc-get-it-done-view-by-group" className="mos-react-component-root">
				{
					this.props.listItemsGroupedArray.map(groupValue => (
						<HcGetItDoneGroup
							key={groupValue.key}
							groupId={groupValue.key}
							groupContent={groupValue}
						/>
					))
				}
			</div>
		);
	}
}
