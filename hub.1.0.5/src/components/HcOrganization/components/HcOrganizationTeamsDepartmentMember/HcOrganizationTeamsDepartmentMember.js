
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */

// ----- IMPORTS

import * as React from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';
import HcOrganizationTeamsMemberPersonaCard from '../HcOrganizationTeamsMemberPersonaCard/HcOrganizationTeamsMemberPersonaCard';

// ----- COMPONENT
export default class HcOrganizationTeamsDepartmentMember extends React.Component {
	/* constructor(props) {
		super(props);
		this.state = {
			showPersona: false,
		};
		this.handleMemberClick = this.handleMemberClick.bind(this);
	}
	handleMemberClick(e) {
		e.preventDefault();
		// this.props.onMemberClick(this.props.memberContent);
		this.setState(prevState => ({
			showPersona: !prevState.showPersona,
		}));
	} */
	render() {
		return (
			<AccordionItem>
				{/* <li id={`hc-organization-teams-department-member_${this.props.memberId}`} 
					className="hc-organization-teams-department-member mos-react-component-root"> */}
				{/* <button
					onClick={this.handleMemberClick}
				>
					{this.props.memberContent.displayName}
				</button> */}
				<AccordionItemTitle>
					<h3>{this.props.memberContent.displayName}</h3>
				</AccordionItemTitle>
					
				<HcOrganizationTeamsMemberPersonaCard
					memberAccount={this.props.memberContent.account}
					memberContent={this.props.memberContent}
					personas={this.props.personas}
				/>
				{/* </li> */}
			</AccordionItem>
		);
	}
}
