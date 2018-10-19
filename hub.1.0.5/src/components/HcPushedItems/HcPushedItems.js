
// ----- IMPORTS

import * as React from 'react';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';
import {
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';
import HcPushedItemsData from './HcPushedItemsData';
import HcPushedItemsLink from './HcPushedItemsLink';

import './HcPushedItems.sass';
import './HcPushedItemsMediumLarge.sass';
import './HcPushedItemsSmall.sass';

// ----- COMPONENT

export default class HcPushedItems extends React.Component {
	state = {
		listItemsArray: [],
		isDataLoaded: false,
	};

	componentDidMount() {
		HcPushedItemsData.ReturnAllPushedItemsData()
			.then((allPushedItemsData) => {
				this.setState(() => ({
					listItemsArray: allPushedItemsData,
					isDataLoaded: true,
				}));
			});
	}
	returnShimmerElements() {
		return (
			<div className="shimmer-elements-container">
				<ShimmerElementsGroup
					shimmerElements={[
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
					]}
				/>
				<ShimmerElementsGroup
					shimmerElements={[
						{ type: ElemType.gap, width: '100%' },
					]}
				/>
				<ShimmerElementsGroup
					shimmerElements={[
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
					]}
				/>
				<ShimmerElementsGroup
					shimmerElements={[
						{ type: ElemType.gap, width: '100%' },
					]}
				/>
				<ShimmerElementsGroup
					shimmerElements={[
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
						{ type: ElemType.gap, width: '5%' },
						{ type: ElemType.line },
					]}
				/>
			</div>
		);
	}
	render() {
		if (this.props.screenType === 'small') {
			return (
				<AccordionItem
					id="hc-pushed-items"
					className="hc-pushed-items mos-react-component-root accordion__item"
					hideBodyClassName="accordion__item--hidden"
					name="hc-pushed-items"
				>
					<AccordionItemTitle
						className="hc-pushed-items__title accordion__title accordion__title--animated"
					>
						<h2 className="u-position-relative">
							<div className="accordion__title__text">Quick Hits</div>
							<div className="accordion__arrow" role="presentation" />
						</h2>
					</AccordionItemTitle>
					<AccordionItemBody
						className="hc-pushed-items__body accordion__body"
					>
						<ul id="hc-pushed-items-list">
							{
								this.state.listItemsArray.map((listItemValue, listItemIndex) => (
									<HcPushedItemsLink
										key={listItemValue.key}
										listItemId={listItemValue.key}
										listItemContent={listItemValue}
									/>
								))
							}
						</ul>
					</AccordionItemBody>
				</AccordionItem>
			);
		} 
		return (
			<div id="hc-pushed-items" className="mos-react-component-root" name="hc-pushed-items">
				<h2>Quick Hits</h2>
				<Shimmer 
					className="shimmer"
					isDataLoaded={this.state.isDataLoaded}
					ariaLabel="Loading content"
					customElementsGroup={this.returnShimmerElements()}
				>
					<ul id="hc-pushed-items-list">
						{
							this.state.listItemsArray.map((listItemValue, listItemIndex) => (
								<HcPushedItemsLink
									key={listItemValue.key}
									listItemId={listItemValue.key}
									listItemContent={listItemValue}
								/>
							))
						}
					</ul>
				</Shimmer>
			</div>
		);
	}	
}
