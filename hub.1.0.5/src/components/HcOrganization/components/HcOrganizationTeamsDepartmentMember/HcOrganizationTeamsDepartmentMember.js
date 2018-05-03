
// ----- IMPORTS

import * as React from 'react';
import HcOrganizationTeamsMemberPersonaCard from '../HcOrganizationTeamsMemberPersonaCard/HcOrganizationTeamsMemberPersonaCard';

// ----- COMPONENT
export default class HcOrganizationTeamsDepartmentMember extends React.Component {
	constructor(props) {
		super(props);
		this.handleMemberClick = this.handleMemberClick.bind(this);
	}
	handleMemberClick(e) {
		e.preventDefault();
		this.props.onMemberClick(this.props.memberContent);
	}
	render() {
		return (
			<li id={`hc-organization-teams-department-member_${this.props.memberId}`} className="hc-organization-teams-department-member mos-react-component-root">
				<button
					onClick={this.handleMemberClick}
				>
					{this.props.memberContent.displayName}
				</button>
				<HcOrganizationTeamsMemberPersonaCard
					memberAccount={this.props.memberContent.account}
					memberContent={this.props.memberContent}
					personas={this.props.personas}
				/>
			</li>
		);
	}
}
