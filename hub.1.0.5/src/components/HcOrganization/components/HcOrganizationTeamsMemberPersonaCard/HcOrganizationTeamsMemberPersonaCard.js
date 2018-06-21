
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

// ----- COMPONENT

const HcOrgTeamsMemberPersonaCard = (props) => {
	let photoStyleObject = {};
	if (props.memberContent.photoURL) {
		photoStyleObject = {
			backgroundImage: `url(${props.memberContent.photoURL})`,
		};
	}
	return (
		<div
			id={`hc-organization-teams-member-persona_${props.memberAccount}`} 
			className="hc-organization-teams-member-persona mos-react-component-root"
		>
			<div className="persona-card-dialog-header">
				{
					props.memberContent.firstInitial &&
					props.memberContent.lastInitial &&
					<span className="avatar">
						<span className="avatar-initials">{props.memberContent.firstInitial}{props.memberContent.lastInitial}
						</span>
					</span>
				}
				<span className="name_title_department">
					{
						props.memberContent.displayName &&
						<p className="name">{props.memberContent.displayName}</p>
					}
					{
						props.memberContent.title &&
						<p className="title">{props.memberContent.title}</p>
					}
				</span>
			</div>
			<ul className="persona-card-dialog-body">
				{
					props.memberContent.uiMessage &&

					<p className="ui-message">{props.memberContent.uiMessage}</p>
				}
				{
					props.memberContent.officePhone &&
					props.memberContent.mobilePhone &&

					<li className="phone-numbers">
						<ul>
							<li className="office-phone-number">Business: {props.memberContent.officePhone}</li>
							<li className="mobile-phone-number">Mobile: {props.memberContent.mobilePhone}</li>
						</ul>
					</li>
				}
				{
					props.memberContent.officePhone &&
					!props.memberContent.mobilePhone &&

					<li className="phone-numbers">Business: {props.memberContent.officePhone}</li>
				}
				{
					!props.memberContent.officePhone &&
					props.memberContent.mobilePhone &&

					<li className="phone-numbers">Business: {props.memberContent.mobilePhone}</li>
				}
				{
					props.memberContent.email &&

					<li className="email">
						<a href={`mailto:${props.memberContent.email}`}>
							{props.memberContent.email}
						</a>
					</li>
				}
				{
					props.memberContent.profileToken &&

					<li className="profile">
						<a
							href={`https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=${props.memberContent.profileToken}`}
							target="_blank"
						>
							Profile
						</a>
					</li>
				}
			</ul>
		</div>
	);
};

export default HcOrgTeamsMemberPersonaCard;
