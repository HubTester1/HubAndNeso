
// ----- IMPORTS

import * as React from 'react';
import { IHcTopCommandBarProps } from './IHcTopCommandBarProps';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

// ----- DEFINE INTERFACES





// ----- COMPONENT

export default class HcTopCommandBar extends React.Component<any, any> {
	
	public render() {
		return (
			<div id="hc-top-command-bar" className="mos-react-component-root">
				<CommandBar
					isSearchBoxVisible={false}
					items={
						[
							{
								key: "top",
								name: "Top",
								icon: "Up",
								ariaLabel: 'Go to the top of Hub Central',
								// href: ''
							}, {
								key: "getItDone",
								name: "Get it Done",
								icon: "Forward",
								ariaLabel: 'Go to the Get it Done section of Hub Central',
								// href: ''
							}, {
								key: "people",
								name: "Organization, Teams, & Staff",
								icon: "Forward",
								ariaLabel: 'Go to the Organization, Teams, and Staff section of Hub Central',
								// href: ''
							}, {
								key: "schedulesAndCalendars",
								name: "Schedules & Calendars",
								icon: "Forward",
								ariaLabel: 'Go to the Schedules and Calendars section of Hub Central',
								// href: ''
							}
						]
					}
				/>
			</div>
		);
	}
}
