
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

import HcOrganizationTeamsDivision from '../HcOrganizationTeamsDivision/HcOrganizationTeamsDivision';
import HcOrganizationTeamsOtherTeam from '../HcOrganizationTeamsOtherTeam/HcOrganizationTeamsOtherTeam';

// ----- COMPONENT

export default class HcOrganizationTeams extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="hc-organization__teams" className="mos-react-component-root">
				<h3>Divisions, Departments, and Their Members</h3>
				<Accordion
					className="hc-organization__teams__divisions accordion"
				>
					<ul>
						{
							this.props.divDeptWTeamsArray.map(divisionValue => (
								<HcOrganizationTeamsDivision
									key={divisionValue.reactKey}
									divisionId={divisionValue.reactKey}
									divisionContent={divisionValue}
								/>
							))
						}
					
					</ul>
				</Accordion>
				<h3>Other Teams</h3>
				<ul>
					{
						this.props.nonDivDeptTeamsArray.map(teamValue => (
							<HcOrganizationTeamsOtherTeam
								key={teamValue.reactKey}
								teamId={teamValue.reactKey}
								teamContent={teamValue}
							/>
						))
					}
				</ul>
			</div>
		);
	}
}
