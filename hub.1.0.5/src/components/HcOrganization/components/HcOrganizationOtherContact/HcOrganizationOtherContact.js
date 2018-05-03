
// ----- IMPORTS

import * as React from 'react';

// ----- COMPONENT

const HcOrganizationOtherContact = props => (
	<li id={`hc-organization-teams-other-contact_${props.contactId}`} className="hc-organization-teams-other-contact mos-react-component-root">
		<a
			className="hc-organization-teams-other-contact-link"
			href={`${props.contactContent.ServerRedirectedEmbedUrl}`}
			target="_blank"
		>
			{props.contactContent.HcOrgName}
		</a>
	</li>
);

export default HcOrganizationOtherContact;
