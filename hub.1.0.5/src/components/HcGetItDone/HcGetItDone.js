
// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneData from './HcGetItDoneData';
import HcGetItDoneCommandBar from './components/HcGetItDoneCommandBar/HcGetItDoneCommandBar';
import HcGetItDoneViewByAlpha from './components/HcGetItDoneViewByAlpha/HcGetItDoneViewByAlpha';
import HcGetItDoneViewByGroup from './components/HcGetItDoneViewByGroup/HcGetItDoneViewByGroup';

// ----- COMPONENT

export default class HcGetItDone extends React.Component {
	state = {
		listItemsAlphaArray: [],
		listItemsGroupedArray: [],
	};

	componentDidMount() {
		HcGetItDoneData.ReturnAllGetItDoneData()
			.then((allPushedItemsData) => {
				this.setState(() => ({
					listItemsAlphaArray: allPushedItemsData,
					listItemsGroupedArray: allPushedItemsData,
				}));
			});
	}

	render() {
		return (
			<div id="hc-get-it-done" className="mos-react-component-root">
				<h2>Get it Done</h2>
				<HcGetItDoneCommandBar />
				<HcGetItDoneViewByAlpha
					listItemsAlphaArray={this.state.listItemsAlphaArray}
				/>
				<HcGetItDoneViewByGroup
					listItemsGroupedArray={this.state.listItemsGroupedArray}
				/>
			</div>
		);
	}
}
