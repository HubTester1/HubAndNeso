
// ----- IMPORTS

import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';


// ----- COMPONENT

const HcGetItDoneCommandBar = props => (
	<div id="hc-organization-command-bar" className="mos-react-component-root">
		<Fabric>
			<CommandBar
				isSearchBoxVisible={false}
				items={
					[
						{
							key: 'teams',
							name: 'Divisions, Departments, & Other Teams',
							icon: 'Group',
							ariaLabel: 'Divisions, Departments, and Other Teams',
							onClick: props.handleClickShowTeams,
						}, {
							key: 'staffLookup',
							name: 'Staff Lookup',
							icon: 'TestUserSolid',
							ariaLabel: 'Staff Lookup',
							onClick: props.handleClickShowStaffLookup,
						}, {
							key: 'othercontacts',
							name: 'Other Contacts',
							icon: 'Megaphone',
							ariaLabel: 'Other Contacts',
							onClick: props.handleClickOtherContacts,
						}, {
							key: 'missionVision',
							name: 'Mission & Vision',
							icon: 'TextDocument',
							ariaLabel: 'Mission and Vision',
							onClick: props.handleClickShowMission,
						},
					]
				}
			/>
		</Fabric>
	</div>
);

export default HcGetItDoneCommandBar;
