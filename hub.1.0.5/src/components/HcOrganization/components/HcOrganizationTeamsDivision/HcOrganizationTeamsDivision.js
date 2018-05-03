
// ----- IMPORTS

import * as React from 'react';
import HcOrganizationTeamsDepartment from '../HcOrganizationTeamsDepartment/HcOrganizationTeamsDepartment';

// ----- COMPONENT

const HcOrganizationTeamsDivision = props => (
	<li id={`hc-organization-teams-division_${props.divisionId}`} className="hc-organization-teams-division mos-react-component-root">
		<h4>{props.divisionContent.name}</h4>
		<p>
			<a
				href={props.divisionContent.orgChart}
				target="_blank"
				className="hc-organization-teams-division-org-chart-link"
			>
			Organization Chart
			</a>
		</p>
		{
			props.divisionContent.hubScreenToken && 

			<p>
				<a
					href={`https://bmos.sharepoint.com/SitePages/${props.divisionContent.hubScreenToken}.aspx`}
					target="_blank"
					className="hc-organization-teams-division-hub-team-link"
				>
				On The Hub
				</a>
			</p>
		}
		<ul>
			{
				props.divisionContent.depts.map(departmentValue => (
					<HcOrganizationTeamsDepartment
						key={departmentValue.reactKey}
						departmentId={departmentValue.reactKey}
						departmentContent={departmentValue}
					/>
				))
			}
		</ul>
	</li>
);

export default HcOrganizationTeamsDivision;
