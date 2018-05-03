
/* eslint-disable class-methods-use-this */

// ----- IMPORTS

import * as React from 'react';
import HcOrganizationTeamsDepartmentMember from '../HcOrganizationTeamsDepartmentMember/HcOrganizationTeamsDepartmentMember';

// ----- COMPONENT

export default class HcOrganizationTeamsDepartment extends React.Component {
	/* constructor(props) {
		super(props);
		this.state = {
			personas: [],
		};
		this.setSelectedPersonas = this.setSelectedPersonas.bind(this);
	}
	setSelectedPersonas(personaData) {
		this.setState(prevState => ({
			personas: [personaData, ...prevState.personas],
		}));
	} */
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
								// personas={this.state.personas}
								// onMemberClick={this.setSelectedPersonas}
							/>
						))
					}
				</ul>
			</li>
		);
	}
}
