
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
import HcOrganizationTeamsDepartment from '../HcOrganizationTeamsDepartment/HcOrganizationTeamsDepartment';

// ----- COMPONENT

export default class HcOrganizationTeamsDivision extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<AccordionItem>
				{/* <li id={`hc-organization-teams-division_${this.props.divisionId}`} 
					className="hc-organization-teams-division mos-react-component-root"> */}
				<AccordionItemTitle><h4>{this.props.divisionContent.name}</h4></AccordionItemTitle>
				<AccordionItemBody>
					<p>
						<a
							href={this.props.divisionContent.orgChart}
							target="_blank"
							className="hc-organization-teams-division-org-chart-link"
						>
							Organization Chart
						</a>
					</p>
					{
						this.props.divisionContent.hubScreenToken && 

						<p>
							<a
								href={`https://bmos.sharepoint.com/SitePages/${this.props.divisionContent.hubScreenToken}.aspx`}
								target="_blank"
								className="hc-organization-teams-division-hub-team-link"
							>
							On The Hub
							</a>
						</p>
					}
					<ul>
						{
							this.props.divisionContent.depts.map(departmentValue => (
								<HcOrganizationTeamsDepartment
									key={departmentValue.reactKey}
									departmentId={departmentValue.reactKey}
									departmentContent={departmentValue}
								/>
							))
						}
					</ul>
				</AccordionItemBody>
				{/* </li> */}
			</AccordionItem>
		);
	}
}
