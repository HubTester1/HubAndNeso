
// ----- IMPORTS

import * as React from 'react';
import HcGetItDoneData from './HcGetItDoneData';
import HcGetItDoneCommandBar from './components/HcGetItDoneCommandBar/HcGetItDoneCommandBar';
import HcGetItDoneViewByAlpha from './components/HcGetItDoneViewByAlpha/HcGetItDoneViewByAlpha';
import HcGetItDoneViewByGroup from './components/HcGetItDoneViewByGroup/HcGetItDoneViewByGroup';

import './HcGetItDone.sass';
import './HcGetItDoneSmall.sass';
import './HcGetItDoneMediumLarge.sass';

// ----- COMPONENT

export default class HcGetItDone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showViewByAlpha: false,
			showViewByGroup: true,
			listItemsAlphaArray: [],
			listItemsGroupedArray: [],
			queryError: false,
		};
		this.handleClickViewByAlphaButton = this.handleClickViewByAlphaButton.bind(this);
		this.handleClickViewByGroupButton = this.handleClickViewByGroupButton.bind(this);
	}
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
	handleClickViewByAlphaButton(e) {
		e.preventDefault();
		this.setState(() => ({
			showViewByAlpha: true,
			showViewByGroup: false,
		}));
	}
	handleClickViewByGroupButton(e) {
		e.preventDefault();
		this.setState(() => ({
			showViewByAlpha: false,
			showViewByGroup: true,
		}));
	}
	render() {
		return (
			<div id="hc-get-it-done" className="mos-react-component-root" name="hc-get-it-done">
				<h2>Get it Done</h2>
				{
					!this.state.queryError &&

					<div id="hc-get-it-done-body">
						<HcGetItDoneCommandBar
							handleClickViewByGroupButton={this.handleClickViewByGroupButton}
							handleClickViewByAlphaButton={this.handleClickViewByAlphaButton}
						/>
						{
							this.state.showViewByGroup &&

							<HcGetItDoneViewByGroup
								listItemsGroupedArray={this.state.listItemsGroupedArray}
							/>
						}
						{
							this.state.showViewByAlpha &&

							<HcGetItDoneViewByAlpha
								listItemsAlphaArray={this.state.listItemsAlphaArray}
							/>
						}
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
