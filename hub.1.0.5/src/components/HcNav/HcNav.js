
// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import './HcNav.sass';
import './HcNavSmall.sass';
import './HcNavMediumLarge.sass';

// ----- COMPONENT

const HcNavLarge = props => (
	<nav id="hc-navigation" className="mos-react-component-root">
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
					iconProps={{ iconName: 'FormLibrary' }}
					text="Get it Done"
					className="hc-navigation__items__item__button"
					// onClick={this.doSomething}
				/>
			</li>
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'Message' }}
					text="Messages"
					className="hc-navigation__items__item__button"
				// onClick={this.doSomething}
				/>
			</li>
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'People' }}
					text="Organization, Teams, & Staff"
					className="hc-navigation__items__item__button"
				// onClick={this.doSomething}
				/>
			</li>
			<li className="hc-navigation__items__item">
				<DefaultButton
					iconProps={{ iconName: 'Calendar' }}
					text="Schedules & Calendars"
					className="hc-navigation__items__item__button"
					// onClick={this.doSomething}
				/>
			</li>
		</ul>
	</nav>
);

export default HcNavLarge;
