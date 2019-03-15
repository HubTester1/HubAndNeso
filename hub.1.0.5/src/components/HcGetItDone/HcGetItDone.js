
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
			listItemsToRenderAlphaArray: [],
			listItemsToRenderGroupedArray: [],
			queryError: false,
			ready: false,
		};
		this.handleClickViewByAlphaButton = this.handleClickViewByAlphaButton.bind(this);
		this.handleClickViewByGroupButton = this.handleClickViewByGroupButton.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.returnHcGetItDoneBody = this.returnHcGetItDoneBody.bind(this);
	}
	componentDidMount() {
		HcGetItDoneData.ReturnAllGetItDoneData(this.props.uData)
			.then((allGetItDoneItemsData) => {
				this.setState(() => ({
					listItemsAlphaArray: allGetItDoneItemsData.allListItemsAlpha,
					listItemsGroupedArray: allGetItDoneItemsData.allListItemsGrouped,
					listItemsToRenderAlphaArray: allGetItDoneItemsData.allListItemsAlpha,
					listItemsToRenderGroupedArray: allGetItDoneItemsData.allListItemsGrouped,
					ready: true,
				}));
			})
			.catch((error) => {
				console.log('ReturnAllGetItDoneData error');
				console.log(error);
				this.setState(() => ({
					queryError: true,
					ready: true,
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
	handleFilterTextChange(filterText) {
		console.log(`filterText = ${filterText}`);
		console.log('base set = ', this.state.listItemsGroupedArray);
		if (!filterText) {
			this.setState(() => ({
				listItemsToRenderAlphaArray: this.state.listItemsAlphaArray,
				listItemsToRenderGroupedArray: this.state.listItemsGroupedArray,
			}));
		} else {
			const newlistItemsToRenderGroupedArray = [];
			const newListItemsToRenderAlphaArray = this.state.listItemsAlphaArray
				.filter(this.returnItemIncludesFilterText(filterText));
			this.state.listItemsGroupedArray.forEach((groupValue, groupIndex) => {
				const groupCopy = JSON.parse(JSON.stringify(groupValue));
				const groupCopyOriginalItems = JSON.parse(JSON.stringify(groupCopy.items));
				groupCopy.items = 
					groupCopyOriginalItems.filter(this.returnItemIncludesFilterText(filterText));
				if (groupCopy.items.length) {
					newlistItemsToRenderGroupedArray.push(groupCopy);
				}
			});
			this.setState(() => ({
				listItemsToRenderAlphaArray: newListItemsToRenderAlphaArray,
				listItemsToRenderGroupedArray: newlistItemsToRenderGroupedArray,
			}));
		}
	}
	returnItemIncludesFilterText(filterText) {
		return item => 
			item.anchorText.toLowerCase().includes(filterText.toLowerCase()) || 
			(item.description && item.description.toLowerCase().includes(filterText.toLowerCase()));
	}
	returnHcGetItDoneBody() {
		console.log('GET BODY');
		// if this user has no roles property, then uData wasn't constructed properly and 
		// 		we won't risk exposing links to them inappropriately
		if (this.props.uData.roles) {
			return (
				<div id="hc-get-it-done-body">
					<HcGetItDoneCommandBar
						handleClickViewByGroupButton={this.handleClickViewByGroupButton}
						handleClickViewByAlphaButton={this.handleClickViewByAlphaButton}
						handleFilterTextChange={this.handleFilterTextChange}
					/>
					{
						this.state.showViewByGroup &&

						<HcGetItDoneViewByGroup
							listItemsGroupedArray={this.state.listItemsToRenderGroupedArray}
						/>
					}
					{
						this.state.showViewByAlpha &&

						<HcGetItDoneViewByAlpha
							listItemsAlphaArray={this.state.listItemsToRenderAlphaArray}
						/>
					}
				</div>
			);
		}
		return (
			<div id="hc-get-it-done-body" />
		);
	}
	returnPlaceholder(screenType) {
		if (screenType === 'medium') {
			return (
				<div
					className="mos-placeholder-column-container hc-get-it-done-placeholder"
				>
					<RectShape className="mos-placeholder-column hc-get-it-done-placeholder-column" />
					<RectShape className="mos-placeholder-column hc-get-it-done-placeholder-column" />
				</div>
			);
		}
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
		console.log('render set = ', this.state.listItemsToRenderGroupedArray);
		// console.log('this.state.listItemsToRenderGroupedArray');
		// console.log(this.state.listItemsToRenderGroupedArray);
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
		if (
			!this.state.queryError && 
			(this.props.screenType === 'medium' || this.props.screenType === 'large')
		) {
			return (
				<div id="hc-get-it-done" className="mos-react-component-root" name="hc-get-it-done">
					<h2>Get it Done</h2>
					<ReactPlaceholder
						customPlaceholder={this.returnPlaceholder(this.props.screenType)}
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
