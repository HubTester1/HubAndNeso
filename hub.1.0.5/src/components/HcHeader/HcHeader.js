
/* eslint-disable react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { scroller } from 'react-scroll';
import Sticky from 'react-stickynode';
import Hamburger from '../Hamburger/Hamburger';
import BrandLogoOnlyH1ScrollToTop from '../Brands/BrandLogoOnlyH1ScrollToTop';
import BrandHorizontalH1ScrollToTop from '../Brands/BrandHorizontalH1ScrollToTop';

import './HcHeader.sass';
import './HcHeaderSmall.sass';
import './HcHeaderMediumLarge.sass';

// ----- COMPONENT

export default class HcHeader extends React.Component {
	constructor(props) {
		super(props);
		this.returnPushedItemsNavItem = this.returnPushedItemsNavItem.bind(this);
		this.returnGetItDoneNavItem = this.returnGetItDoneNavItem.bind(this);
		this.returnMessagesNavItem = this.returnMessagesNavItem.bind(this);
		this.returnOrganizationNavItem = this.returnOrganizationNavItem.bind(this);
		this.returnCalendarsSchedulesNavItem = this.returnCalendarsSchedulesNavItem.bind(this);
		this.handlePushedItemsNavItemClick = this.handlePushedItemsNavItemClick.bind(this);
		this.handleGetItDoneNavItemClick = this.handleGetItDoneNavItemClick.bind(this);
		this.handleMessagesNavItemClick = this.handleMessagesNavItemClick.bind(this);
		this.handleOrganizationNavItemClick = this.handleOrganizationNavItemClick.bind(this);
		this.handleCalendarsSchedulesNavItemClick = 
			this.handleCalendarsSchedulesNavItemClick.bind(this);
	}
	handlePushedItemsNavItemClick() {
		this.props.handleHamburgerOrNavItemClick();
		scroller.scrollTo('hc-pushed-items', {
			duration: 500,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	handleGetItDoneNavItemClick() {
		this.props.handleHamburgerOrNavItemClick();
		scroller.scrollTo('hc-get-it-done', {
			duration: 500,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	handleMessagesNavItemClick() {
		this.props.handleHamburgerOrNavItemClick();
		scroller.scrollTo('hc-messages-all', {
			duration: 1000,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	handleOrganizationNavItemClick() {
		this.props.handleHamburgerOrNavItemClick();
		scroller.scrollTo('hc-organization', {
			duration: 1250,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	handleCalendarsSchedulesNavItemClick() {
		this.props.handleHamburgerOrNavItemClick();
		scroller.scrollTo('hc-calendars-and-schedules', {
			duration: 1500,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	returnPushedItemsNavItem() {
		return (
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'Megaphone' }}
					text="Please Be Aware"
					className="hc-navigation__items__item__button"
					onClick={this.handlePushedItemsNavItemClick}
				/>
			</li>
		);
	}
	returnGetItDoneNavItem() {
		return (
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'FormLibrary' }}
					text="Get it Done"
					className="hc-navigation__items__item__button"
					onClick={this.handleGetItDoneNavItemClick}
				/>
			</li>
		);
	}
	returnMessagesNavItem() {
		return (
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'Message' }}
					text="Messages"
					className="hc-navigation__items__item__button"
					onClick={this.handleMessagesNavItemClick}
				/>
			</li>
		);
	}
	returnOrganizationNavItem() {
		return (
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'People' }}
					text="Organization, Teams, & Staff"
					className="hc-navigation__items__item__button"
					onClick={this.handleOrganizationNavItemClick}
				/>
			</li>
		);
	}
	returnCalendarsSchedulesNavItem() {
		return (
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'Calendar' }}
					text="Calendars & Schedules"
					className="hc-navigation__items__item__button"
					onClick={this.handleCalendarsSchedulesNavItemClick}
				/>
			</li>
		);
	}
	render() {
		return (
			<Sticky
				enableTransforms={false}
			>
				<header 
					id="hc-header" 
					className="mos-react-component-root"
				>
					{
						this.props.screenType === 'small' &&

						<div id="hamburger-and-brand-container">
							<Hamburger
								handleHamburgerOrNavItemClick={this.props.handleHamburgerOrNavItemClick}
							/>
							<BrandLogoOnlyH1ScrollToTop />
							<nav id="hc-navigation" className="mos-react-component-root">
								<ul id="hc-navigation__items">
									{this.returnPushedItemsNavItem()}
									{this.returnGetItDoneNavItem()}
									{this.returnMessagesNavItem()}
									{this.returnOrganizationNavItem()}
									{this.returnCalendarsSchedulesNavItem()}
								</ul>
							</nav>
						</div>
					}
					{
						this.props.screenType === 'medium' &&

						<nav id="hc-navigation" className="mos-react-component-root">
							<ul id="hc-navigation__items">
								<li className="hc-navigation__items__item">
									<BrandLogoOnlyH1ScrollToTop />
								</li>
								{this.returnPushedItemsNavItem()}
								{this.returnGetItDoneNavItem()}
								{this.returnMessagesNavItem()}
								{this.returnOrganizationNavItem()}
								{this.returnCalendarsSchedulesNavItem()}
							</ul>
						</nav>
					}
					{
						this.props.screenType === 'large' &&

						<nav id="hc-navigation" className="mos-react-component-root">
							<ul id="hc-navigation__items">
								<li className="hc-navigation__items__item">
									<BrandHorizontalH1ScrollToTop />
								</li>
								{this.returnPushedItemsNavItem()}
								{this.returnGetItDoneNavItem()}
								{this.returnMessagesNavItem()}
								{this.returnOrganizationNavItem()}
								{this.returnCalendarsSchedulesNavItem()}
							</ul>
						</nav>
					}
				</header>
			</Sticky>
		);
	}
}
