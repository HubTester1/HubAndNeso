
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
	console.log(props);
	return (
		<li id={`hc-staff-lookup-persona_${props.personaId}`} className="hc-staff-lookup-persona mos-react-component-root">
			<div className="persona-card-dialog-header">
				{
					props.personaContent.photoURL &&
					<span className="avatar" style={photoStyleObject} />
				}
				{
					!props.personaContent.photoURL &&
					<span className="avatar">
						<span className="avatar-initials">{props.personaContent.firstInitial}{props.personaContent.lastInitial}
						</span>
					</span>
				}
				<span className="name_title_department">
					{
						props.personaContent.displayName &&
						<p className="name">{props.personaContent.displayName}</p>
					}
					{
						props.personaContent.title &&
						<p className="title">{props.personaContent.title}</p>
					}
					{
						props.personaContent.department &&
						<p className="department">{props.personaContent.department}</p>
					}
				</span>
			</div>
			<ul className="persona-card-dialog-body">
				{
					props.personaContent.uiMessage &&

					<p className="ui-message">{props.personaContent.uiMessage}</p>
				}
				{
					props.personaContent.officePhone &&
					props.personaContent.mobilePhone &&

					<li className="phone-numbers">
						<ul>
							<li className="business-phone-number">Business: {props.personaContent.officePhone}</li>
							<li className="mobile-phone-number">Mobile: {props.personaContent.mobilePhone}</li>
						</ul>
					</li>
				}
				{
					props.personaContent.officePhone &&
					!props.personaContent.mobilePhone &&

					<li className="business-phone-number">Business: {props.personaContent.officePhone}</li>
				}
				{
					!props.personaContent.officePhone &&
					props.personaContent.mobilePhone &&

					<li className="business-phone-number">Business: {props.personaContent.mobilePhone}</li>
				}
				{
					props.personaContent.email &&

					<li className="email">
						<a href={`mailto:${props.personaContent.email}`}>
							{props.personaContent.email}
						</a>
					</li>
				}
				{
					props.personaContent.profileToken &&
					
					<li className="profile">
						<a 
							href={`https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=${props.personaContent.profileToken}`}
							target="_blank"
						>
							Profile
						</a>
					</li>
				}
			</ul>
		</li>
	);
};

export default HcStaffLookupPersonaCard;
