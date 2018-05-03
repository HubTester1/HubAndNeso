
/* eslint class-methods-use-this: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint max-len: 0 */

// ----- IMPORTS

import * as React from 'react';

// ----- COMPONENT

export default class HcStaffLookupPersonaCard extends React.Component {
	render() {
		let renderThisPersonaCard = false;
		this.props.personas.forEach((persona) => {
			if (persona.account == this.props.memberAccount) {
				renderThisPersonaCard = true;
			}
		});
		if (renderThisPersonaCard) {
			return (
				<div id={`hc-staff-lookup-persona_${this.props.personaId}`} className="hc-staff-lookup-persona mos-react-component-root">
					<span id="persona-card-dialog-header">
						{/* <span id="avatar">
				<span id="avatar-initials">{this.props.memberContent.firstInitial}{this.props.memberContent.lastInitial}
				</span>
			</span> */}
						<span id="name_title_department">
							{
								this.props.memberContent.displayName &&
						<span id="name">{this.props.memberContent.displayName}</span>
							}
							{
								this.props.memberContent.title &&
						<span id="title">{this.props.memberContent.title}</span>
							}
						</span>
					</span>
					<ul id="persona-card-dialog-body">
						{
							this.props.memberContent.officePhone &&
					this.props.memberContent.mobilePhone &&
					<li id="phone-numbers">
						<ul>
							<li id="business-phone-number">Business: {this.props.memberContent.officePhone}</li>
							<li id="mobile-phone-number">Mobile: {this.props.memberContent.mobilePhone}</li>
						</ul>
					</li>
						}
						{
							this.props.memberContent.officePhone &&
					<li id="business-phone-number">Business: {this.props.memberContent.officePhone}</li>
						}
						{
							this.props.memberContent.mobilePhone &&
					<li id="business-phone-number">Business: {this.props.memberContent.mobilePhone}</li>
						}
						{
							this.props.memberContent.email &&
					<li id="email">
						<a href={`mailto:${this.props.memberContent.email}`}>
							{this.props.memberContent.email}
						</a>
					</li>
						}
					</ul>
				</div>
			);
		} 
		return null;
	}
}
