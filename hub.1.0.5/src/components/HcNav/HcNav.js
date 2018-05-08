
// ----- IMPORTS

import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

// ----- COMPONENT

const HcNavLarge = props => (
	<div className="hc-top-command-bar mos-react-component-root">
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
	</div>
);

export default HcNavLarge;
