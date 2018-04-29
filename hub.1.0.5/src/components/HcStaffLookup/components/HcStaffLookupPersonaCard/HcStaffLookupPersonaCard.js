
/* eslint class-methods-use-this: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint max-len: 0 */

// ----- IMPORTS

import * as React from 'react';

// ----- COMPONENT

const HcStaffLookupPersonaCard = (props) => {
	let photoStyleObject = {};
	if (props.personaContent.photoURL) {
		photoStyleObject = {
			backgroundImage: `url(${props.personaContent.photoURL})`,
		};
	}
	return (
		<div id={`hc-staff-lookup-persona_${props.personaId}`} className="hc-staff-lookup-persona mos-react-component-root">
			<span id="persona-card-dialog-header">
				{
					props.personaContent.photoURL &&
						<span id="avatar" style={photoStyleObject} />
				}
				{
					!props.personaContent.photoURL &&
						<span id="avatar">
							<span id="avatar-initials">{props.personaContent.firstInitial}{props.personaContent.lastInitial}
							</span>
						</span>
				}
				<span id="name_title_department">
					{
						props.personaContent.displayName &&
						<span id="name">{props.personaContent.displayName}</span>
					}
					{
						props.personaContent.title &&
						<span id="title">{props.personaContent.title}</span>
					}
					{
						props.personaContent.department &&
						<span id="department">{props.personaContent.department}</span>
					}
				</span>
			</span>
			<ul id="persona-card-dialog-body">
				{
					props.personaContent.officePhone &&
						props.personaContent.mobilePhone &&
						<li id="phone-numbers">
							<ul>
								<li id="business-phone-number">Business: {props.personaContent.officePhone}</li>
								<li id="mobile-phone-number">Mobile: {props.personaContent.mobilePhone}</li>
							</ul>
						</li>
				}
				{
					props.personaContent.officePhone &&
						<li id="business-phone-number">Business: {props.personaContent.officePhone}</li>
				}
				{
					props.personaContent.mobilePhone &&
						<li id="business-phone-number">Business: {props.personaContent.mobilePhone}</li>
				}
				{
					props.personaContent.email &&
						<li id="email">
							<a href={`mailto:${props.personaContent.email}`}>
								{props.personaContent.email}
							</a>
						</li>
				}
				{
					props.personaContent.profileToken &&
						<li id="profile">
							<a 
								href={`https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=${props.personaContent.profileToken}`}
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

export default HcStaffLookupPersonaCard;
