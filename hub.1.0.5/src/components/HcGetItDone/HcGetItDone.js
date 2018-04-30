
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
		queryError: false,
	};

	componentDidMount() {
		HcGetItDoneData.ReturnAllGetItDoneData()
			.then((allGetItDoneItemsData) => {
				this.setState(() => ({
					listItemsAlphaArray: allGetItDoneItemsData.allListItemsAlpha,
					listItemsGroupedArray: allGetItDoneItemsData.allListItemsGrouped,
				}));
			})
			.catch((error) => {
				this.setState(() => ({
					queryError: true,
				}));
			});
	}

	render() {
		return (
			<div id="hc-get-it-done" className="mos-react-component-root">
				<h2>Get it Done</h2>
				{
					!this.state.queryError &&

					<div id="hc-get-it-done-body">
						<HcGetItDoneCommandBar />
						<HcGetItDoneViewByGroup
							listItemsGroupedArray={this.state.listItemsGroupedArray}
						/>
						<HcGetItDoneViewByAlpha
							listItemsAlphaArray={this.state.listItemsAlphaArray}
						/>
					</div>
				}
				{
					this.state.queryError &&

					<p id="hc-get-it-done-body">I can&apos;t show you this information right now.</p>
				}
			</div>
		);
	}
}
