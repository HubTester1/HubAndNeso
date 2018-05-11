
// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { scroller } from 'react-scroll';

import './HcNav.sass';
import './HcNavSmall.sass';
import './HcNavMediumLarge.sass';

// ----- COMPONENT


export default class HcNav extends React.Component {
	constructor(props) {
		super(props);
		this.scrollToGetItDone = this.scrollToGetItDone.bind(this);
		this.scrollToMessages = this.scrollToMessages.bind(this);
		this.scrollToOrganization = this.scrollToOrganization.bind(this);
		this.scrollToCalendarsSchedules = this.scrollToCalendarsSchedules.bind(this);
	}
	scrollToGetItDone() {
		scroller.scrollTo('hc-get-it-done', {
			duration: 500,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	scrollToMessages() {
		scroller.scrollTo('hc-messages-all', {
			duration: 1000,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	scrollToOrganization() {
		scroller.scrollTo('hc-organization', {
			duration: 1250,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	scrollToCalendarsSchedules() {
		scroller.scrollTo('hc-calendars-and-schedules', {
			duration: 1500,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	render() {
		return (
			<nav id="hc-navigation" className="mos-react-component-root">
				<ul id="hc-navigation__items">
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'FormLibrary' }}
							text="Get it Done"
							className="hc-navigation__items__item__button"
							onClick={this.scrollToGetItDone}
						/>
					</li>
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'Message' }}
							text="Messages"
							className="hc-navigation__items__item__button"
							onClick={this.scrollToMessages}
						/>
					</li>
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'People' }}
							text="Organization, Teams, & Staff"
							className="hc-navigation__items__item__button"
							onClick={this.scrollToOrganization}
						/>
					</li>
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'Calendar' }}
							text="Calendars & Schedules"
							className="hc-navigation__items__item__button"
							onClick={this.scrollToCalendarsSchedules}
						/>
					</li>
				</ul>
			</nav>
		);
	}
}
