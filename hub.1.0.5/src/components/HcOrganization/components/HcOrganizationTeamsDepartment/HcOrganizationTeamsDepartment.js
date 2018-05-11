
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
			<AccordionItem>
				{/* <li id={`hc-organization-teams-department_${this.props.departmentId}`} 
					className="hc-organization-teams-department mos-react-component-root"> */}
				<AccordionItemTitle>
					<h5>{this.props.departmentContent.name}</h5>
				</AccordionItemTitle>
				<AccordionItemBody>
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
					<Accordion>
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
					</Accordion>
				</AccordionItemBody>
				{/* </li> */}
			</AccordionItem>
		);
	}
}
