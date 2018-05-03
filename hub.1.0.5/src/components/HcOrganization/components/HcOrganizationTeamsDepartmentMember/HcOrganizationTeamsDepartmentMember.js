
// ----- IMPORTS

import * as React from 'react';
import { HoverCard } from 'office-ui-fabric-react/lib/HoverCard';

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
					data-property="this is the property"
					onClick={this.handleMemberClick}
				>
					{this.props.memberContent.displayName}
				</button>
			</li>
		);
	}
}
