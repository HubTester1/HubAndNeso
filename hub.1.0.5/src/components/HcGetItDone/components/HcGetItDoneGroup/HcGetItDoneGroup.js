
/* eslint-disable  react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';
// import HcGetItDoneLink from '../HcGetItDoneLink/HcGetItDoneLink';

// ----- COMPONENT

export default class HcGetItDoneViewByGroup extends React.Component {
	render() {
		// console.log(this.props.listItemsGroupedArray);
		// extract into array from object its "child" / first level keys;
		// 		these keys correspond to group names
		const groupKeys = Object.keys(this.props.listItemsGroupedArray);
		// sort groups alphabetically
		groupKeys.sort();
		// return render
		return (
			<div id="hc-get-it-done-view-by-group" className="mos-react-component-root">
				{
					/* groupKeys.map((groupValue) => {

					}) */
				}
			</div>
		);
	}
}
