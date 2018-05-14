
// ----- IMPORTS

import * as React from 'react';
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
	};

	componentDidMount() {
		HcPushedItemsData.ReturnAllPushedItemsData()
			.then((allPushedItemsData) => {
				this.setState(() => ({
					listItemsArray: allPushedItemsData,
				}));
			});
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
							<div className="accordion__title__text">Please Be Aware</div>
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
				<h2>Please Be Aware</h2>
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
			</div>
		);
	}	
}
