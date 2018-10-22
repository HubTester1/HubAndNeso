
// ----- IMPORTS

import * as React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { RectShape } from 'react-placeholder/lib/placeholders';
import {
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';

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
			ready: false,
			fakeReady: false,
		};
		this.handleClickViewByAlphaButton = this.handleClickViewByAlphaButton.bind(this);
		this.handleClickViewByGroupButton = this.handleClickViewByGroupButton.bind(this);
		this.returnHcGetItDoneBody = this.returnHcGetItDoneBody.bind(this);
	}
	componentDidMount() {
		HcGetItDoneData.ReturnAllGetItDoneData()
			.then((allGetItDoneItemsData) => {
				this.setState(() => ({
					listItemsAlphaArray: allGetItDoneItemsData.allListItemsAlpha,
					listItemsGroupedArray: allGetItDoneItemsData.allListItemsGrouped,
					ready: true,
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
	returnHcGetItDoneBody() {
		if (this.props.uData.roles) {
			return (
				<div id="hc-get-it-done-body">
					<HcGetItDoneCommandBar
						handleClickViewByGroupButton={this.handleClickViewByGroupButton}
						handleClickViewByAlphaButton={this.handleClickViewByAlphaButton}
					/>
					{
						this.state.showViewByGroup &&

						<HcGetItDoneViewByGroup
							listItemsGroupedArray={this.state.listItemsGroupedArray}
							uData={this.props.uData}
						/>

					}
					{
						this.state.showViewByAlpha &&

						<HcGetItDoneViewByAlpha
							listItemsAlphaArray={this.state.listItemsAlphaArray}
							uData={this.props.uData}
						/>
					}
				</div>
			);
		}
		return (
			<div id="hc-get-it-done-body" />
		);
	}
	returnPlaceholder() {
		return (
			<div
				className="mos-placeholder-column-container hc-get-it-done-placeholder"
			>
				<RectShape className="mos-placeholder-column hc-get-it-done-placeholder-column" />
				<RectShape className="mos-placeholder-column hc-get-it-done-placeholder-column" />
				<RectShape className="mos-placeholder-column hc-get-it-done-placeholder-column" />
				<RectShape className="mos-placeholder-column hc-get-it-done-placeholder-column" />
			</div>
		);
	}
	render() {
		if (!this.state.queryError && this.props.screenType === 'small') {
			return (
				<AccordionItem
					id="hc-get-it-done"
					className="hc-get-it-done mos-react-component-root accordion__item"
					hideBodyClassName="accordion__item--hidden"
					name="hc-get-it-done"
				>
					<AccordionItemTitle
						className="hc-get-it-done__title accordion__title accordion__title--animated"
					>
						<h2 className="u-position-relative">
							<div className="accordion__title__text">Get it Done</div>
							<div className="accordion__arrow" role="presentation" />
						</h2>
					</AccordionItemTitle>
					<AccordionItemBody
						className="hc-get-it-done__body accordion__body"
					>
						{this.returnHcGetItDoneBody()}
					</AccordionItemBody>
				</AccordionItem>
			);
		}
		if (!this.state.queryError && this.props.screenType === 'medium') {
			return (
				<div id="hc-get-it-done" className="mos-react-component-root" name="hc-get-it-done">
					<h2>Get it Done</h2>
					<ReactPlaceholder
						customPlaceholder={this.returnPlaceholder()}
						ready={this.state.ready}
						showLoadingAnimation
					>
						{this.returnHcGetItDoneBody()}
					</ReactPlaceholder>
				</div>
			);
		}
		return (
			<p id="hc-get-it-done-body">I can&apos;t show you this information right now.</p>
		);
	}
}
