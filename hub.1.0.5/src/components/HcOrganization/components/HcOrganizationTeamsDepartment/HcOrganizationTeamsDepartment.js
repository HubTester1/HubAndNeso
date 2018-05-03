
/* eslint-disable class-methods-use-this */

// ----- IMPORTS

import * as React from 'react';
import { HoverCard } from 'office-ui-fabric-react/lib/HoverCard';
import HcOrganizationTeamsDepartmentMember from '../HcOrganizationTeamsDepartmentMember/HcOrganizationTeamsDepartmentMember';

// ----- COMPONENT

export default class HcOrganizationTeamsDepartment extends React.Component {
	constructor(props) {
		super(props);
		this.showMemberPersona = this.showMemberPersona.bind(this);
	}
	showMemberPersona(personaData) {
		console.log(personaData); // expandingCardProps={expandingCardProps} 
		return (
			<HoverCard id="myID1" instantOpenOnClick>
				<div className="HoverCard-item">
					{personaData.account}
				</div>
			</HoverCard>
		);
	}
	render() {
		return (
			<li id={`hc-organization-teams-department_${this.props.departmentId}`} className="hc-organization-teams-department mos-react-component-root">
				<h5>{this.props.departmentContent.name}</h5>
				{
					this.props.departmentContent.hubScreenToken &&

			<p>
				<a
					href={`https://bmos.sharepoint.com/SitePages/${this.props.departmentContent.hubScreenToken}.aspx`}
					target="_blank"
					className="hc-organization-teams-department-hub-team-link"
				>
					On The Hub
				</a>
			</p>
				}
				<ul>
					{
						this.props.departmentContent.members.map(memberValue => (
							<HcOrganizationTeamsDepartmentMember
								key={memberValue.reactKey}
								memberId={memberValue.reactKey}
								memberContent={memberValue}
								onMemberClick={this.showMemberPersona}
							/>
						))
					}
				</ul>
			</li>
		);
	}
}
