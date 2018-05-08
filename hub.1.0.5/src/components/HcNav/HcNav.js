
// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import './HcNav.sass';
import './HcNavSmall.sass';
import './HcNavMediumLarge.sass';

// ----- COMPONENT

const HcNavLarge = props => (
	<nav id="hc-navigation" className="mos-react-component-root">
		{
			props.navType === 'large' &&

			<Fabric>
				<CommandBar
					isSearchBoxVisible={false}
					items={
						[
							{
								key: 'top',
								name: 'Top',
								icon: 'Up',
								ariaLabel: 'Go to the top of Hub Central',
								// href: ''
							}, {
								key: 'getItDone',
								name: 'Get it Done',
								icon: 'Forward',
								ariaLabel: 'Go to the Get it Done section of Hub Central',
								// href: ''
							}, {
								key: 'people',
								name: 'Organization, Teams, & Staff',
								icon: 'Forward',
								ariaLabel: 'Go to the Organization, Teams, and Staff section of Hub Central',
								// href: ''
							}, {
								key: 'schedulesAndCalendars',
								name: 'Schedules & Calendars',
								icon: 'Forward',
								ariaLabel: 'Go to the Schedules and Calendars section of Hub Central',
								// href: ''
							},
						]
					}
				/>
			</Fabric>
		}
		{
			props.navType === 'small' &&

			<ul id="hc-navigation__items">
				<li className="hc-navigation__items__item">
					<DefaultButton
						iconProps={{ iconName: 'Up' }}
						text="Top"
						className="hc-navigation__items__item__button"
						// onClick={this.doSomething}
					/>
				</li>
				<li className="hc-navigation__items__item">
					<DefaultButton
						iconProps={{ iconName: 'Forward' }}
						text="Get it Done"
						className="hc-navigation__items__item__button"
						// onClick={this.doSomething}
					/>
				</li>
				<li className="hc-navigation__items__item">
					<DefaultButton
						iconProps={{ iconName: 'Forward' }}
						text="Organization, Teams, & Staff"
						className="hc-navigation__items__item__button"
						// onClick={this.doSomething}
					/>
				</li>
				<li className="hc-navigation__items__item">
					<DefaultButton
						iconProps={{ iconName: 'Forward' }}
						text="Schedules & Calendars"
						className="hc-navigation__items__item__button"
						// onClick={this.doSomething}
					/>
				</li>
			</ul>
		}
	</nav>
);

export default HcNavLarge;
