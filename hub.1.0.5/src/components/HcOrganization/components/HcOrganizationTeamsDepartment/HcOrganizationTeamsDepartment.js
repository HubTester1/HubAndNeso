
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
	render() {
		return (
			<AccordionItem
				className="hc-organization__teams__department mos-react-component-root accordion__item"
				hideBodyClassName="accordion__item--hidden"
			>
				<li id={`hc-organization__teams__department_${this.props.departmentId}`}>
					<AccordionItemTitle
						className="hc-organization__teams__department-title accordion__title"
					>
						<h5>{this.props.departmentContent.name}</h5>
					</AccordionItemTitle>
					<AccordionItemBody
						className="hc-organization__teams__department-body accordion__body"
					>
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
						<Accordion
							className="hc-organization__teams__department-members accordion"
						>
							<ul>
								{
									this.props.departmentContent.members.map(memberValue => (
										<HcOrganizationTeamsDepartmentMember
											key={memberValue.reactKey}
											memberId={memberValue.reactKey}
											memberContent={memberValue}
										/>
									))
								}
							</ul>
						</Accordion>
					</AccordionItemBody>
				</li>
			</AccordionItem>
		);
	}
}
