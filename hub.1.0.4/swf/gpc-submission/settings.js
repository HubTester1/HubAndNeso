(function ($) {

	console.log("using settings m58");

	var mData = {
		'componentID': 155,
		"swf": 1,
		// "mosMainKey": "prod",
		// "mosMainKey": "dev",
		// "mosMainKey": "devMedium",
		"mosMainKey": "devLong",
		"currentRequestVersion": 1,
		"devAdminNotifications": 1,
		"notifications": 1
	};

	var oData = {
		'admin': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "Admin GPC Initial Concept Approval Requests",
					"href": "/sites/gpc-concept/SitePages/App.aspx",
					// "idValue": "",
					// "classValues": "button_swf-new-event-with-timeline",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Configure GPC People",
					"href": "/sites/gpc-configuration/SitePages/App.aspx?r=1252",
					// "idValue": "",
					// "classValues": "button_swf-new-event-with-timeline",
					"restrictedToRoles": ["gpcPeopleEditor"],
					"target": "_blank"
				}, {
					"linkType": "goForward",
					"anchorText": "Documentation",
					"href": "/sites/gpc-submission/SitePages/GPC%20Submission%20Request%20Workflow%20Documentation.aspx",
					// "idValue": "",
					// "classValues": "button_swf-new-event-with-timeline",
					"target": "_blank"
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Proposal Developer',
						'internalName': 'ProposalDeveloper',
						'userName': 1
					}, {
						'displayName': 'Project Title',
						'internalName': 'ProjectTitle',
					}, {
						'displayName': 'Funder',
						'internalName': 'Funder',
					}, {
						'displayName': 'GPC Submission Date',
						'internalName': 'SubmissionDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
					}, {
						'displayName': 'Proposal Due Date',
						'internalName': 'ProposalDueDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
					}
				],
				'tables': [
					{
						'tableTitle': 'In Development',
						'tableID': 'in-development',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'In Development',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'LegacyID',
								'internalName': 'LegacyID'
							}
						],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Pending Approval / Approval Pending Comments',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryTwoRelevantStatuses': ['Pending Approval', 'Approval Pending Comments'],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Proposal Ready for Submission',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Proposal Ready for Submission',
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Proposal Submitted',
						'tableID': 'grant-proposal-submitted',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Proposal Submitted',
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Awarded',
						'tableID': 'grant-awarded',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Awarded',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'GPC Submission Date',
								'internalName': 'SubmissionDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}
						],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Declined',
						'tableID': 'grant-declined',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Declined',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'GPC Submission Date',
								'internalName': 'SubmissionDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}
						],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'cancelled',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Cancelled',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'GPC Submission Date',
								'internalName': 'SubmissionDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}
						],
						'sortColAndOrder': [0, 'desc']
					}
				]
			}
		},
		'my': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "My GPC Initial Concept Requests",
					"href": "/sites/gpc-concept/SitePages/App.aspx",
					// "idValue": "",
					// "classValues": "button_swf-new-event-with-timeline",
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Project Title',
						'internalName': 'ProjectTitle',
					}, {
						'displayName': 'Funder',
						'internalName': 'Funder',
					}, {
						'displayName': 'GPC Submission Date',
						'internalName': 'SubmissionDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Proposal Due Date',
						'internalName': 'ProposalDueDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'In Development',
						'tableID': 'in-development',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Eq>" +
							"			<FieldRef Name='RequestStatus'></FieldRef>" +
							"			<Value Type='Text'>In Development</Value>" +
							"		</Eq>" +
							"		<Or>" +
							"			<Contains>" +
							"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
							"				<Value Type='Text'>myName</Value>" +
							"			</Contains>" +
							"			<Or>" +
							"				<Contains>" +
							"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
							"					<Value Type='Text'>myName</Value>" +
							"				</Contains>" +
							"				<Or>" +
							"					<Contains>" +
							"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"					<Contains>" +
							"						<FieldRef Name='Author'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"				</Or>" +
							"			</Or>" +
							"		</Or>" +
							"	</And>" +
							"</Where>",
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Pending Approval / Approval Pending Comments',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Or>" +
							"			<Eq>" +
							"				<FieldRef Name='RequestStatus'></FieldRef>" +
							"				<Value Type='Text'>Pending Approval</Value>" +
							"			</Eq>" +
							"			<Eq>" +
							"				<FieldRef Name='RequestStatus'></FieldRef>" +
							"				<Value Type='Text'>Approval Pending Comments</Value>" +
							"			</Eq>" +
							"		</Or>" +
							"		<Or>" +
							"			<Contains>" +
							"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
							"				<Value Type='Text'>myName</Value>" +
							"			</Contains>" +
							"			<Or>" +
							"				<Contains>" +
							"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
							"					<Value Type='Text'>myName</Value>" +
							"				</Contains>" +
							"				<Or>" +
							"					<Contains>" +
							"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"					<Contains>" +
							"						<FieldRef Name='Author'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"				</Or>" +
							"			</Or>" +
							"		</Or>" +
							"	</And>" +
							"</Where>",
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Proposal Ready for Submission',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Eq>" +
							"			<FieldRef Name='RequestStatus'></FieldRef>" +
							"			<Value Type='Text'>Grant Proposal Ready for Submission</Value>" +
							"		</Eq>" +
							"		<Or>" +
							"			<Contains>" +
							"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
							"				<Value Type='Text'>myName</Value>" +
							"			</Contains>" +
							"			<Or>" +
							"				<Contains>" +
							"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
							"					<Value Type='Text'>myName</Value>" +
							"				</Contains>" +
							"				<Or>" +
							"					<Contains>" +
							"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"					<Contains>" +
							"						<FieldRef Name='Author'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"				</Or>" +
							"			</Or>" +
							"		</Or>" +
							"	</And>" +
							"</Where>",
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Proposal Submitted',
						'tableID': 'grant-proposal-submitted',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Eq>" +
							"			<FieldRef Name='RequestStatus'></FieldRef>" +
							"			<Value Type='Text'>Grant Proposal Submitted</Value>" +
							"		</Eq>" +
							"		<Or>" +
							"			<Contains>" +
							"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
							"				<Value Type='Text'>myName</Value>" +
							"			</Contains>" +
							"			<Or>" +
							"				<Contains>" +
							"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
							"					<Value Type='Text'>myName</Value>" +
							"				</Contains>" +
							"				<Or>" +
							"					<Contains>" +
							"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"					<Contains>" +
							"						<FieldRef Name='Author'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"				</Or>" +
							"			</Or>" +
							"		</Or>" +
							"	</And>" +
							"</Where>",
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Awarded',
						'tableID': 'grant-awarded',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Eq>" +
							"			<FieldRef Name='RequestStatus'></FieldRef>" +
							"			<Value Type='Text'>Grant Awarded</Value>" +
							"		</Eq>" +
							"		<Or>" +
							"			<Contains>" +
							"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
							"				<Value Type='Text'>myName</Value>" +
							"			</Contains>" +
							"			<Or>" +
							"				<Contains>" +
							"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
							"					<Value Type='Text'>myName</Value>" +
							"				</Contains>" +
							"				<Or>" +
							"					<Contains>" +
							"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"					<Contains>" +
							"						<FieldRef Name='Author'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"				</Or>" +
							"			</Or>" +
							"		</Or>" +
							"	</And>" +
							"</Where>",
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Declined',
						'tableID': 'grant-declined',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Eq>" +
							"			<FieldRef Name='RequestStatus'></FieldRef>" +
							"			<Value Type='Text'>Grant Declined</Value>" +
							"		</Eq>" +
							"		<Or>" +
							"			<Contains>" +
							"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
							"				<Value Type='Text'>myName</Value>" +
							"			</Contains>" +
							"			<Or>" +
							"				<Contains>" +
							"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
							"					<Value Type='Text'>myName</Value>" +
							"				</Contains>" +
							"				<Or>" +
							"					<Contains>" +
							"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"					<Contains>" +
							"						<FieldRef Name='Author'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"				</Or>" +
							"			</Or>" +
							"		</Or>" +
							"	</And>" +
							"</Where>",
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'cancelled',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Eq>" +
							"			<FieldRef Name='RequestStatus'></FieldRef>" +
							"			<Value Type='Text'>Cancelled</Value>" +
							"		</Eq>" +
							"		<Or>" +
							"			<Contains>" +
							"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
							"				<Value Type='Text'>myName</Value>" +
							"			</Contains>" +
							"			<Or>" +
							"				<Contains>" +
							"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
							"					<Value Type='Text'>myName</Value>" +
							"				</Contains>" +
							"				<Or>" +
							"					<Contains>" +
							"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"					<Contains>" +
							"						<FieldRef Name='Author'></FieldRef>" +
							"						<Value Type='Text'>myName</Value>" +
							"					</Contains>" +
							"				</Or>" +
							"			</Or>" +
							"		</Or>" +
							"	</And>" +
							"</Where>",
						'sortColAndOrder': [0, 'desc']
					}
				]
			}
		},
		'gpcSubmissionApprovalViewer': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "GPC Initial Concept Approval Requests",
					"href": "/sites/gpc-concept/SitePages/App.aspx",
					// "idValue": "",
					// "classValues": "button_swf-new-event-with-timeline",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Configure GPC People",
					"href": "/sites/gpc-configuration/SitePages/App.aspx?r=1252",
					// "idValue": "",
					// "classValues": "button_swf-new-event-with-timeline",
					"restrictedToRoles": ["gpcPeopleEditor"],
					"target": "_blank",
					"renderPermissionsFunction": "ReturnGPCPeopleEditingAccess"
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Proposal Developer',
						'internalName': 'ProposalDeveloper',
						'userName': 1
					}, {
						'displayName': 'Project Title',
						'internalName': 'ProjectTitle',
					}, {
						'displayName': 'Funder',
						'internalName': 'Funder',
					}, {
						'displayName': 'GPC Submission Date',
						'internalName': 'SubmissionDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
					}, {
						'displayName': 'Proposal Due Date',
						'internalName': 'ProposalDueDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
					}
				],
				'tables': [
					{
						/*'tableTitle': 'In Development',
						'tableID': 'in-development',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'In Development',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}
						],
						'sortColAndOrder': [0, 'desc']
					}, {*/
						'tableTitle': 'Pending Approval / Approval Pending Comments',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryTwoRelevantStatuses': ['Pending Approval', 'Approval Pending Comments'],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Proposal Ready for Submission',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Proposal Ready for Submission',
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Proposal Submitted',
						'tableID': 'grant-proposal-submitted',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Proposal Submitted',
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Awarded',
						'tableID': 'grant-awarded',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Awarded',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'GPC Submission Date',
								'internalName': 'SubmissionDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}
						],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Grant Declined',
						'tableID': 'grant-declined',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Grant Declined',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'GPC Submission Date',
								'internalName': 'SubmissionDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}
						],
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'cancelled',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Cancelled',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Proposal Developer',
								'internalName': 'ProposalDeveloper',
								'userName': 1
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle',
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder',
							}, {
								'displayName': 'GPC Submission Date',
								'internalName': 'SubmissionDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Proposal Due Date',
								'internalName': 'ProposalDueDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}
						],
						'sortColAndOrder': [0, 'desc']
					}
				]
			}
		}
	};

	var fData = {
		'alwaysTalkToRequester': 1,
		'autoTrackGPCSubmissionStatuses': 1,
		'saveApprovalFields': 1,
		'devPriorToApproval': 1,
		'standardElementGroups': {
			/*'standardPrintButton': { 
				'buttonText': 'Print Request',
				'printFunction': 'PrintGPCSubmissionApprovalRequest'
			},*/
			// 'standardThisRequestAndRequesterElements': 1,
			'standardButtonElementsInitiallyHidden': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'conditionalSubmissionNoticesAndButtonValues': [
			{
				'condition': function () {
					return ($('input#Request-Status').val() === "" || $('input#Request-Status').val() === "In Development"); // || $('input#Request-Status').val() === "Approval Pending Comments"
				},
				'submissionNotice': 'You\'ll be able to make changes after saving.'
				// 'buttonValue': 'Blankety-blank',
				// 'buttonWidth': '26rem'
			}, {
				'condition': function () {
					return ($('input#Request-Status').val() === "Approval Pending Comments");
				},
				'submissionNotice': '<p class="alert">This request will not be re-submitted to GPC until the "Ready?" checkbox is checked.</p><p>You\'ll be able to make changes after saving.</p>'
				// 'buttonValue': 'Blankety-blank',
				// 'buttonWidth': '26rem'
			}
		],
		'gpcSubmissionApprovalRequestNotifications': 1,
		'additionalViewPermissionsFunction': 'ReturnGPCSubmissionApprovalRequestAdditionalViewAccess',
		'versioningMatters': 0,


		'uniqueElements': [
			{
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Migrated From Quark",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Legacy ID",
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "print-to-screen",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "This Request",
				"htmlID": "header_this-request",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlClass": "label-and-control",
				"htmlID": "requirement-legend",
				"content": '	<div class="label"></div>' +
					'	<div class="field-type-indication"><span class="field-type-indicator field-required"><span class="message message-required"></span></span></div>' +
					'	<div class="control">= required field</div>',
				"begin": 1,
				"end": 1



				// }, {
				// 	'elementType': 'field',
				// 	'controlType': 'url',
				// 	'fieldName': 'Quark Request',
				// 	'labelContent': 'Quark Request',
				// 	'editableForNonAdmin': [],
				// 	'editableForAdmin': [],






			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request ID",
				"labelContent": "Request ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Request Date",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": {
					'incomingFormat': null,
					'returnFormat': 'MMMM D, YYYY',
					'determineYearDisplayDynamically': 0
				},
				"isoFormatOnSubmit": {
					'incomingFormat': null,
					'returnFormat': null,
					'determineYearDisplayDynamically': null
				},
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Nickname",
				"labelContent": "Request Nickname",
				"listFieldName": "Title",
				"helpNotes": [{
					"text": "Give this request a name you can reference later",
					"htmlID": "request-nickname_help-note",
					"urgent": 0,
					"hideForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Self or Other",
				"labelContent": "If we have questions, talk to you or someone else?",
				"setOptions": [{
					"value": "Self",
					"display": "Talk to me"
				}, {
					"value": "Other",
					"display": "Talk to someone else"
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"hideForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"onChange": [{
					"thisFieldEquals": ["Self"],
					"hide": [{
						"fieldName": "Requested For"
					}],
					"optional": [{
						"fieldName": "Requested For",
						"type": "peoplepicker"
					}],
					"set": [{
						"fieldName": "Requested For",
						"type": "peoplePicker",
						"value": "currentUser"
					}]
				}, {
					"thisFieldEquals": ["Other"],
					"show": [{
						"fieldName": "Requested For"
					}],
					"require": [{
						"fieldName": "Requested For",
						"type": "peoplepicker"
					}],
					"set": [{
						"fieldName": "Requested For",
						"type": "peoplePicker",
						"value": ""
					}]
				}]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested For",
				"labelContent": "If needed, talk to",
				"listFieldName": "RequestedFor",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this request"
				}],
				"hideForNonAdmin": ["", "Validator Picked Up", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"]
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": [""],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Requester",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1

			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Initial Concept Approval Request',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				'hideForAdmin': ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"]
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Concept Request',
				'choiceSetLabel': 'Has a GPC Initial Concept Approval Request been approved for this grant?',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, my <a href="/sites/gpc-concept/SitePages/My GPC Initial Concept Approval Requests.aspx" target="_blank">GPC Initial Concept Approval Request</a> has been approved'
					}, {
						'value': 'no',
						'display': 'No, GPC hasn\'t approved this concept'
					}
				],
				'helpNotes': [
					{
						'text': "You must have your initial concept approved by GPC prior to submitting this request",
						'htmlID': "help-note_no-concept-approval",
						'emphasis': 1,
						'hideForNonAdmin': ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
						'hideForAdmin': ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"]
					}
				],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#concept-request_yes'],
						'show': [
							{ 'divID': 'container_primary-fieldset' },
							{ 'divID': 'submit-or-exit' },
						],
						'hide': [
							{ 'noteID': 'help-note_no-concept-approval' },
						],
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#concept-request_no'],
						'hide': [
							{ 'divID': 'container_primary-fieldset' },
							{ 'divID': 'submit-or-exit' },
						],
						'show': [
							{ 'noteID': 'help-note_no-concept-approval' },
						],
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				'hideForNonAdmin': ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				'hideForAdmin': ["In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_primary-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],

			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Project Basics",
				"begin": 1,
				"end": 1

			}, {
				'elementType': 'field',
				'controlType': 'listItemChooser',
				'fieldName': 'GPC Initial Concept Approval Request ID',
				// 'listFieldName': 'EventSpaceRequestID',
				'editableLabelContent': 'GPC Initial Concept Approval Request ID',
				'nonEditableLabelContent': 'GPC Initial Concept Approval Request',
				'choosingAnchorContent': 'Select from your approved requests',
				'editableForNonAdmin': ['', 'In Development'],
				'editableForAdmin': ['', 'In Development'],
				'dialogTitle': 'My Approved GPC Initial Concept Approval Requests',
				'listItemViewSections': {
					'commonColumns': [
						{
							'displayName': 'Request ID',
							'internalName': 'ID',
							'anchorNoHref': 1
						}, {
							'displayName': 'Request Nickname',
							'internalName': 'Title'
						}, {
							'displayName': 'Project Title',
							'internalName': 'ProjectTitle',
						}, {
							'displayName': 'Proposal Due Date',
							'internalName': 'ProposalDueDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
						}
					],
					'tables': [
						{
							'tableID': 'list-item-view',
							'webURL': 'https://bmos.sharepoint.com/sites/gpc-concept',
							'customCAMLQuery': "<Where>" +
								"	<And>" +
								"		<Eq>" +
								"			<FieldRef Name='RequestStatus'></FieldRef>" +
								"			<Value Type='Text'>Approved</Value>" +
								"		</Eq>" +
								"		<Or>" +
								"			<Contains>" +
								"				<FieldRef Name='ProposalDeveloper'></FieldRef>" +
								"				<Value Type='Text'>myName</Value>" +
								"			</Contains>" +
								"			<Or>" +
								"				<Contains>" +
								"					<FieldRef Name='MOSPrincipalInvestigator'></FieldRef>" +
								"					<Value Type='Text'>myName</Value>" +
								"				</Contains>" +
								"				<Or>" +
								"					<Contains>" +
								"						<FieldRef Name='MOSCoInvestigator'></FieldRef>" +
								"						<Value Type='Text'>myName</Value>" +
								"					</Contains>" +
								"					<Contains>" +
								"						<FieldRef Name='Author'></FieldRef>" +
								"						<Value Type='Text'>myName</Value>" +
								"					</Contains>" +
								"				</Or>" +
								"			</Or>" +
								"		</Or>" +
								"	</And>" +
								"</Where>",
							'sortColAndOrder': [0, 'desc']
						}
					]
				},
				'addtlValidationType': 'validPositiveInteger',
				'helpNotes': [
					{
						'text': "E.g., 77",
						'htmlID': "help-note_concept-request-id",
						'hideForNonAdmin': ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
						'hideForAdmin': ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"]
					}
				],
				'hideButtonForNonAdmin': ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				'hideButtonForAdmin': ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				'onChange': [
					{ 'thisFieldIsPositiveInteger': 1, 'show': [{ 'divID': "label-and-control_Import-from-GPC-Initial-Concept-Approval-Request" }] },
					{ 'thisFieldIsPositiveInteger': 0, 'hide': [{ 'divID': "label-and-control_Import-from-GPC-Initial-Concept-Approval-Request" }] }
				],




			}, {
				'elementType': 'field',
				'controlType': 'buttonWithLabel',
				'fieldName': 'Import from GPC Initial Concept Approval Request',
				'labelContent': 'Import info from GPC Initial Concept Approval Request?',
				'buttonContent': 'Yes, import request info',
				'helpNotes': [
					{
						'text': "You can change info here after it's imported",
						'htmlID': "help-note_import-from-concept-request",
					}
				],
				'hideForNonAdmin': ["", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],


			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Project Title",
				"labelContent": "Project Title",
				"listFieldName": "ProjectTitle",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "MOS Principal Investigator",
				"labelContent": "MOS Principal Investigator",
				"listFieldName": "MOSPrincipalInvestigator",
				"yieldsViewPermissions": 1,
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "MOS Co-Investigator",
				"labelContent": "MOS Co-Investigator",
				"listFieldName": "MOSCoInvestigator",
				"yieldsViewPermissions": 1,
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Proposal Developer",
				"labelContent": "Proposal Developer",
				"listFieldName": "ProposalDeveloper",
				"yieldsViewPermissions": 1,
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Funder",
				"labelContent": "Funder",
				"listFieldName": "Funder",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'RFP or Other Relevant Website',
				'labelContent': 'RFP or Other Relevant Website',
				'editableForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments'],
				'editableForAdmin': ['', 'In Development'],
				"helpNotes": [
					{
						"text": "E.g., https://www.nsf.gov/xyz-123",
						"htmlID": "rfp-or-other-website-link_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Proposal Type",
				"labelContent": "Proposal Type",
				"setOptions": [{
					"value": "Letter of Support",
					"display": "Letter of Support"
				}, {
					"value": "Letter of Intent",
					"display": "Letter of Intent"
				}, {
					"value": "Preliminary Proposal",
					"display": "Preliminary Proposal"
				}, {
					"value": "Contract",
					"display": "Contract"
				}, {
					"value": "Full New Proposal",
					"display": "Full Proposal (new)"
				}, {
					"value": "Full Proposal Based on Previous Prelim",
					"display": "Full Proposal Based on Previous Prelim"
				}],
				// "hideForNonAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				// "hideForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Proposal Due Date',
				'labelContent': 'Proposal Due Date',
				'listFieldName': 'ProposalDueDate',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ['Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'If the proposal is a subaward, this is the date the proposal is due to the Prime, not the Funder',
						'htmlID': 'proposal-due-date_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Expected Decision Date Boolean",
				"choiceSetLabel": "Is the expected decision date known",
				"choices": [{
					"value": "yes",
					"display": "Yes, the expected decision date is known"
				}, {
					"value": "no",
					"display": "No, the expected decision date is not known"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{
						'thisFieldEquals': ["yes"],
						'show': [{ 'fieldName': 'Expected Decision Date' }]
					}, {
						'thisFieldEquals': ["yes"],
						'addlAndConditions': ['$("input#ready-for-submission-to-committee_yes").is(":checked")'],
						'require': [{ 'fieldName': 'Expected Decision Date', 'type': 'date' }]
					}, {
						'thisFieldEquals': ["no"],
						'hide': [{ 'fieldName': 'Expected Decision Date' }],
						'optional': [{ 'fieldName': 'Expected Decision Date', 'type': 'date' }]
					}
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Expected Decision Date',
				'labelContent': 'Expected Decision Date',
				//'listFieldName': 'ManualDate',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ['Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],

			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Museum Role",
				"choiceSetLabel": "Museum Role",
				"choices": [{
					"value": "primeRecipient",
					"display": "Prime Recipient"
				}, {
					"value": "subawardee",
					"display": "Subawardee"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{
						'thisFieldEquals': ["subawardee"],
						'show': [{ 'fieldName': 'Prime Institution' }, { 'fieldName': 'Outside PI' }]
					}, {
						'thisFieldEquals': ["subawardee"],
						'addlAndConditions': ['$("input#ready-for-submission-to-committee_yes").is(":checked")'],
						'require': [{ 'fieldName': 'Prime Institution', 'type': 'text' }]
					}, {
						'thisFieldEquals': ["primeRecipient"],
						'hide': [{ 'fieldName': 'Prime Institution' }, { 'fieldName': 'Outside PI' }],
						'optional': [{ 'fieldName': 'Prime Institution', 'type': 'text' }]
					}
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Prime Institution",
				"labelContent": "Prime Institution",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Outside PI",
				"labelContent": "Outside PI",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]

			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Project Narrative",
				"begin": 1,
				"end": 1
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Project Narrative File',
				'labelContent': 'Project Narrative',
				'populatableForNonAdmin': ["", "In Development"],
				'populatableForAdmin': ["", "In Development"],
				// 'populatablePerFunction': 'ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess',
				'replaceableForNonAdmin': ["In Development", "Pending Approval", "Approval Pending Comments"],
				'replaceableForAdmin': ["In Development"],
				// 'replaceablePerFunction': 'ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess',
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Project Budget",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "MOS Direct Costs",
				"labelContent": "MOS Direct Costs",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': 'State amounts in USD, using standard American currency format',
						'htmlID': 'mos-direct-costs_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "IDC",
				"labelContent": "IDC",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': 'State amounts in USD, using standard American currency format',
						'htmlID': 'idc_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Total MOS Budget",
				"labelContent": "Total MOS Budget",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Total Project Budget",
				"labelContent": "Total Project Budget",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': 'If different from total MOS budget',
						'htmlID': 'total-project-budget_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
					}
				]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Cost Share",
				"labelContent": "Cost Share",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': 'Enter 0 if none. State amounts in USD, using standard American currency format.',
						'htmlID': 'cost-share_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Subaward Materials or Not",
				"choiceSetLabel": "Do you have the required subaward materials in hand?",
				"choices": [{
					"value": "yes",
					"display": "Yes, I've got them"
				}, {
					"value": "no",
					"display": "There are no subawards"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Project Budget File',
				'labelContent': 'Project Budget',
				'populatableForNonAdmin': ["", "In Development"],
				'populatableForAdmin': ["", "In Development"],
				'populatablePerFunction': 'ReturnGPCSubmissionApprovalRequestProjectBudgetWriteAccess',
				'replaceableForNonAdmin': ['In Development', 'Pending Approval', 'Approval Pending Comments'],
				'replaceableForAdmin': ['In Development'],
				'replaceablePerFunction': 'ReturnGPCSubmissionApprovalRequestProjectBudgetWriteAccess',
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Project Budget Justification File',
				'labelContent': 'Project Budget Justification',
				'populatableForNonAdmin': ["", "In Development", "Pending Approval"],
				'populatableForAdmin': ["", "In Development"],
				'populatablePerFunction': 'ReturnGPCSubmissionApprovalRequestProjectBudgetJustificationWriteAccess',
				'replaceableForNonAdmin': ['In Development', 'Pending Approval', 'Approval Pending Comments'],
				'replaceableForAdmin': ['In Development'],
				'replaceablePerFunction': 'ReturnGPCSubmissionApprovalRequestProjectBudgetJustificationWriteAccess',




			}, {
				"elementType": "markup",
				"tag": "div",
				'htmlID': 'container_project-needs',
				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Project Needs",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "EEP Needs Negotiator on Load",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "EDC Needs Negotiator on Load",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Web Needs Negotiator on Load",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Infra Needs Negotiator on Load",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "RE Needs Negotiator on Load",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "IRB Review Discussee on Load",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "EH Needs Negotiator on Load",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Names Locked",

			}, {
				"elementType": "markup",
				"tag": "h3",
				"content": "Staffing and Similar Needs",
				"begin": 1,
				"end": 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'radio-button-set-fake-labels',
				'content': '<div class="radio-button-set-fake-label" id="fake-label_yes"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_no"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_not-applicable"></div>',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "EEP Needs",
				"choiceSetLabel": "Education and Enrichment Programs staff needs have been negotiated with <span id=\"choice-set-label_EEP-needs-negotiator\">placeholder</span>",
				"choices": [{
					"value": "yes",
					"display": "Yes, Education and Enrichment Programs staff needs have been negotiated with <span id=\"affirmative-label_EEP-needs-negotiator\">placeholder</span>"
				}, {
					"value": "no",
					"display": "No, Education and Enrichment Programs staff needs have been negotiated with <span id=\"negative-label_EEP-needs-negotiator\">placeholder</span>"
				}, {
					"value": "notApplicable",
					"display": "Education and Enrichment Programs staff needs are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{
						'thisFieldEquals': ["yes"],
						'show': [{ 'divID': 'container_eep-staff-member-names' }]
						/*}, { 
							'thisFieldEquals': ["yes"],
							'addlAndConditions': ['$("input#ready-for-submission-to-committee_yes").is(":checked")'],
							'require': [{ 'fieldName': "EEP Staff Member Names", 'type': "textarea" }]*/
					}, {
						'thisFieldEquals': ["no", "notApplicable"],
						'hide': [{ 'divID': 'container_eep-staff-member-names' }],
						// 'optional': [{ 'fieldName': "EEP Staff Member Names", 'type': "textarea" }]
					},
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_eep-staff-member-names',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'EEP Staff Member Names',
				'labelContent': 'EEP Staff Member Names',
				'disabledForNonAdmin': ['Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,


			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "EDC Needs",
				"choiceSetLabel": "Exhibit Development and Conservation staff needs have been negotiated with <span id=\"choice-set-label_EDC-needs-negotiator\">placeholder</span>",
				"choices": [{
					"value": "yes",
					"display": "Yes, Exhibit Development and Conservation staff needs have been negotiated with <span id=\"affirmative-label_EDC-needs-negotiator\">placeholder</span>"
				}, {
					"value": "no",
					"display": "No, Exhibit Development and Conservation staff needs have not been negotiated with <span id=\"negative-label_EDC-needs-negotiator\">placeholder</span>"
				}, {
					"value": "notApplicable",
					"display": "Exhibit Development and Conservation staff needs are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{
						'thisFieldEquals': ["yes"],
						'show': [{ 'divID': 'container_edc-staff-member-names' }]
						/*}, { 
							'thisFieldEquals': ["yes"],
							'addlAndConditions': ['$("input#ready-for-submission-to-committee_yes").is(":checked")'],
							'require': [{ 'fieldName': "EDC Staff Member Names", 'type': "textarea" }]*/
					}, {
						'thisFieldEquals': ["no", "notApplicable"],
						'hide': [{ 'divID': 'container_edc-staff-member-names' }],
						// 'optional': [{ 'fieldName': "EDC Staff Member Names", 'type': "textarea" }] 
					},
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_edc-staff-member-names',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'EDC Staff Member Names',
				'labelContent': 'EDC Staff Member Names',
				'disabledForNonAdmin': ['Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,



			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Web Needs",
				"choiceSetLabel": "Website needs (whether internal or external) have been negotiated with <span id=\"choice-set-label_Web-needs-negotiator\">placeholder</span>",
				"choices": [{
					"value": "yes",
					"display": "Yes, website needs (whether internal or external) have been negotiated with <span id=\"affirmative-label_Web-needs-negotiator\">placeholder</span>"
				}, {
					"value": "no",
					"display": "No, website needs (whether internal or external) have not been negotiated with <span id=\"negative-label_Web-needs-negotiator\">placeholder</span>"
				}, {
					"value": "notApplicable",
					"display": "Website needs (whether internal or external) are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Infra Needs",
				"choiceSetLabel": "IIT infrastructure needs have been negotiated with <span id=\"choice-set-label_Infra-needs-negotiator\">placeholder</span>",
				"choices": [{
					"value": "yes",
					"display": "Yes, IIT infrastructure needs have been negotiated with <span id=\"affirmative-label_Infra-needs-negotiator\">placeholder</span>"
				}, {
					"value": "no",
					"display": "No, IIT infrastructure needs have not been negotiated with <span id=\"negative-label_Infra-needs-negotiator\">placeholder</span>"
				}, {
					"value": "notApplicable",
					"display": "IIT infrastructure needs are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "RE Needs",
				"choiceSetLabel": "Research & Evaluation needs have been negotiated with <span id=\"choice-set-label_RE-needs-negotiator\">placeholder</span>",
				"choices": [{
					"value": "yes",
					"display": "Yes, Research & Evaluation needs have been negotiated with <span id=\"affirmative-label_RE-needs-negotiator\">placeholder</span>"
				}, {
					"value": "no",
					"display": "No, Research & Evaluation needs have not been negotiated with <span id=\"negative-label_RE-needs-negotiator\">placeholder</span>"
				}, {
					"value": "notApplicable",
					"display": "Research & Evaluation needs are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "External Evaluator Needs",
				"choiceSetLabel": "External evaluator has been contacted; scope, timeline, and budget have been agreed to",
				"choices": [{
					"value": "yes",
					"display": "Yes, external evaluator has been contacted; scope, timeline, and budget have been agreed to"
				}, {
					"value": "no",
					"display": "No, external evaluator has been contacted; scope, timeline, and budget have been agreed to"
				}, {
					"value": "notApplicable",
					"display": "External evaluator is not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "IRB Needs",
				"choiceSetLabel": "IRB review has been discussed with <span id=\"choice-set-label_IRB-review-discussee\">placeholder</span>",
				"choices": [{
					"value": "yes",
					"display": "Yes, IRB review has been discussed with <span id=\"affirmative-label_IRB-review-discussee\">placeholder</span>"
				}, {
					"value": "no",
					"display": "No, IRB review has been discussed with <span id=\"negative-label_IRB-review-discussee\">placeholder</span>"
				}, {
					"value": "notApplicable",
					"display": "IRB review is not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "New Staff Needs",
				"choiceSetLabel": "New staff positions will be required",
				"choices": [{
					"value": "yes",
					"display": "Yes, new staff positions will be required"
				}, {
					"value": "no",
					"display": "No, new staff positions will not be required"
				}, {
					"value": "notApplicable",
					"display": "New staff positions are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{
						'thisFieldEquals': ["yes"],
						'show': [{ 'divID': 'container_new-staff-positions' }]
					}, {
						'thisFieldEquals': ["yes"],
						'addlAndConditions': ['$("input#ready-for-submission-to-committee_yes").is(":checked")'],
						'require': [{ 'fieldName': "New Staff Positions", 'type': "textarea" }]
					}, {
						'thisFieldEquals': ["no", "notApplicable"],
						'hide': [{ 'divID': 'container_new-staff-positions' }],
						'optional': [{ 'fieldName': "New Staff Positions", 'type': "textarea" }]
					},
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_new-staff-positions',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': '',
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'New Staff Positions',
				'labelContent': 'What new staff positions will be required?',
				'disabledForNonAdmin': ['Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,

			}, {
				"elementType": "markup",
				"tag": "h3",
				"content": "Space Needs",
				"begin": 1,
				"end": 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'radio-button-set-fake-labels',
				'content': '<div class="radio-button-set-fake-label" id="fake-label_yes"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_no"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_not-applicable"></div>',
				'begin': 1,
				'end': 1


			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Office Space Needs",
				"choiceSetLabel": "New office space will be required",
				"choices": [{
					"value": "yes",
					"display": "Yes, new office space will be required"
				}, {
					"value": "no",
					"display": "No, new office space will not be required"
				}, {
					"value": "notApplicable",
					"display": "New office space needs are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{
						'thisFieldEquals': ["yes"],
						'show': [{ 'divID': 'container_staff-quantity-for-office-space' }]
					}, {
						'thisFieldEquals': ["yes"],
						'addlAndConditions': ['$("input#ready-for-submission-to-committee_yes").is(":checked")'],
						'require': [{ 'fieldName': "Staff Quantity for Office Space", 'type': "textarea" }]
					}, {
						'thisFieldEquals': ["no", "notApplicable"],
						'hide': [{ 'divID': 'container_staff-quantity-for-office-space' }],
						'optional': [{ 'fieldName': "Staff Quantity for Office Space", 'type': "text" }]
					},
				],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_staff-quantity-for-office-space',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Staff Quantity for Office Space',
				'labelContent': 'For how many staff members will new office space be required?',
				'disabledForNonAdmin': ['Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,



			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Exhibit Halls Space Needs",
				"choiceSetLabel": "Exhibit Halls space needs have been discussed with <span id=\"choice-set-label_EH-needs-negotiator\">placeholder</span>",
				"choices": [{
					"value": "yes",
					"display": "Yes, Exhibit Halls space needs have been discussed with <span id=\"affirmative-label_EH-needs-negotiator\">placeholder</span>"
				}, {
					"value": "no",
					"display": "No, Exhibit Halls space needs have not been discussed with <span id=\"negative-label_EH-needs-negotiator\">placeholder</span>"
				}, {
					"value": "notApplicable",
					"display": "Exhibit Halls space needs are not applicable"
				}],
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Pending Approval", "Approval Pending Comments"],
				"requiredForAdmin": [],
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1,



			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Submission to Committee",
				"begin": 1,
				"end": 1
/*			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Historical PID Comments",
				"labelContent": "Historical PID Comments",
				"htmlClass": "historical-notes-as-preface",
				"disabledForNonAdmin": ["", "Pending Approval", "Approval Pending Comments", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Approval Pending Comments", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
*/			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "PID Comments",
				"labelContent": "Principal Investigator / Proposal Developer Comments",
				"disabledForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Ready for Submission to Committee",
				"choiceSetLabel": "Ready?",
				"choices": [{
					"value": "yes",
					"display": "Yes, I'm ready to request the Grant Planning Committee's approval for this submission"
				}],
				"hideForNonAdmin": ["Pending Approval", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"helpNotes": [
					{
						"text": "Some fields have become required",
						"htmlID": "ready-for-submission_help-note",
						"emphasis": 1,
						"hideForNonAdmin": ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				'onChange': [
					{
						'thisFieldIsChecked': 1,
						'show': [
							// { 'noteID': 'ready-for-submission_help-note' }, 
							{ 'fieldName': 'Submission Signature' },
							{ 'fieldName': 'Submission Date' },
						],
						'require': [
							{ 'fieldName': 'GPC Initial Concept Approval Request ID', 'type': 'text' },
							{ 'fieldName': 'Project Title', 'type': 'text' },
							{ 'fieldName': 'MOS Principal Investigator', 'type': 'peoplePicker' },
							{ 'fieldName': 'Proposal Developer', 'type': 'peoplePicker' },
							{ 'fieldName': 'Funder', 'type': 'text' },
							// { 'fieldName': 'RFP or Other Relevant Website', 'type': 'url' },
							{ 'fieldName': 'Proposal Type', 'type': 'select' },
							{ 'fieldName': 'Proposal Due Date', 'type': 'datePicker' },
							{ 'fieldName': 'Expected Decision Date Boolean', 'type': 'radio' },
							{ 'fieldName': 'Museum Role', 'type': 'radio' },
							{ 'fieldName': 'Project Narrative File', 'type': 'mosFile' },
							{ 'fieldName': 'MOS Direct Costs', 'type': 'text' },
							{ 'fieldName': 'IDC', 'type': 'text' },
							{ 'fieldName': 'Cost Share', 'type': 'text' },
							{ 'fieldName': 'Subaward Materials or Not', 'type': 'radio' },
							{ 'fieldName': 'Project Budget File', 'type': 'mosFile' },


							{ 'fieldName': 'EEP Needs', 'type': 'radio' },
							{ 'fieldName': 'EDC Needs', 'type': 'radio' },
							{ 'fieldName': 'Web Needs', 'type': 'radio' },
							{ 'fieldName': 'Infra Needs', 'type': 'radio' },
							{ 'fieldName': 'RE Needs', 'type': 'radio' },
							{ 'fieldName': 'External Evaluator Needs', 'type': 'radio' },
							{ 'fieldName': 'IRB Needs', 'type': 'radio' },
							{ 'fieldName': 'New Staff Needs', 'type': 'radio' },
							{ 'fieldName': 'Office Space Needs', 'type': 'radio' },
							{ 'fieldName': 'Exhibit Halls Space Needs', 'type': 'radio' },

						],
						'set': [
							{ 'fieldName': 'Names Locked', 'type': 'hidden', 'value': '1' },
						]
					}, {
						'thisFieldIsChecked': 1,
						'addlAndConditions': ['$("input#museum-role_subawardee").is(":checked")'],
						'require': [
							{ 'fieldName': 'Prime Institution', 'type': 'text' },
						]
					}, {
						'thisFieldIsChecked': 1,
						'addlAndConditions': ['$("input#Request-Status").val() === "" || $("input#Request-Status").val() === "In Development"'],
						'show': [
							{ 'noteID': 'ready-for-submission_help-note' }
						]
					}, {
						'thisFieldIsChecked': 1,
						'addlAndConditions': ['$("input#expected-decision-date-boolean_yes").is(":checked")'],
						'require': [
							{ 'fieldName': 'Expected Decision Date', 'type': 'date' },
						]
						/*}, {
							'thisFieldIsChecked': 1,
							'addlAndConditions': ['$("input#eep-needs_yes").is(":checked")'],
							'require': [
								{ 'fieldName': 'EEP Staff Member Names', 'type': 'textarea' },
							]
						}, {
							'thisFieldIsChecked': 1,
							'addlAndConditions': ['$("input#edc-needs_yes").is(":checked")'],
							'require': [
								{ 'fieldName': 'EDC Staff Member Names', 'type': 'textarea' },
							]*/
					}, {
						'thisFieldIsChecked': 1,
						'addlAndConditions': ['$("input#new-staff-needs_yes").is(":checked")'],
						'require': [
							{ 'fieldName': 'New Staff Positions', 'type': 'textarea' },
						]
					}, {
						'thisFieldIsChecked': 1,
						'addlAndConditions': ['$("input#office-space-needs_yes").is(":checked")'],
						'require': [
							{ 'fieldName': 'Staff Quantity for Office Space', 'type': 'text' },
						]

					}, {
						'thisFieldIsChecked': 0,
						'hide': [
							{ 'noteID': 'ready-for-submission_help-note' },
							{ 'fieldName': 'Submission Signature' },
							{ 'fieldName': 'Submission Date' },
						],
					}, {
						'thisFieldIsChecked': 0,
						'addlAndConditions': ['$("input#Request-Status").val() === "" || $("input#Request-Status").val() === "In Development"'],
						'optional': [
							{ 'fieldName': 'Project Title', 'type': 'text' },
							{ 'fieldName': 'MOS Principal Investigator', 'type': 'peoplePicker' },
							{ 'fieldName': 'Proposal Developer', 'type': 'peoplePicker' },
							{ 'fieldName': 'Funder', 'type': 'text' },
							// { 'fieldName': 'RFP or Other Relevant Website', 'type': 'url' },
							{ 'fieldName': 'Proposal Type', 'type': 'select' },
							{ 'fieldName': 'Proposal Due Date', 'type': 'datePicker' },
							{ 'fieldName': 'Expected Decision Date Boolean', 'type': 'radio' },
							{ 'fieldName': 'Museum Role', 'type': 'radio' },
							{ 'fieldName': 'Project Narrative File', 'type': 'mosFile' },
							{ 'fieldName': 'MOS Direct Costs', 'type': 'text' },
							{ 'fieldName': 'IDC', 'type': 'text' },
							{ 'fieldName': 'Cost Share', 'type': 'text' },
							{ 'fieldName': 'Subaward Materials or Not', 'type': 'radio' },
							{ 'fieldName': 'Project Budget File', 'type': 'mosFile' },

							{ 'fieldName': 'Prime Institution', 'type': 'text' },
							{ 'fieldName': 'Expected Decision Date', 'type': 'text' },
							// { 'fieldName': 'EEP Staff Member Names', 'type': 'text' },
							// { 'fieldName': 'EDC Staff Member Names', 'type': 'text' },
							{ 'fieldName': 'New Staff Positions', 'type': 'text' },
							{ 'fieldName': 'Staff Quantity for Office Space', 'type': 'text' },

							{ 'fieldName': 'EEP Needs', 'type': 'radio' },
							{ 'fieldName': 'EDC Needs', 'type': 'radio' },
							{ 'fieldName': 'Web Needs', 'type': 'radio' },
							{ 'fieldName': 'Infra Needs', 'type': 'radio' },
							{ 'fieldName': 'RE Needs', 'type': 'radio' },
							{ 'fieldName': 'External Evaluator Needs', 'type': 'radio' },
							{ 'fieldName': 'IRB Needs', 'type': 'radio' },
							{ 'fieldName': 'New Staff Needs', 'type': 'radio' },
							{ 'fieldName': 'Office Space Needs', 'type': 'radio' },
							{ 'fieldName': 'Exhibit Halls Space Needs', 'type': 'radio' },
						],
						'set': [
							{ 'fieldName': 'Names Locked', 'type': 'hidden', 'value': '' },
						]
					}
				],

			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Submission Signature",
				"labelContent": "Signature",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Approval Pending Comments"],
				"hideForAdmin": ["", "In Development", "Approval Pending Comments"]
			}, {
				"elementType": "field",
				'controlType': 'datePicker',
				"fieldName": "Submission Date",
				"labelContent": "Date",
				'listFieldName': 'SubmissionDate',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Approval Pending Comments"],
				"hideForAdmin": ["", "In Development", "Approval Pending Comments"]


			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_approvals",
				"begin": 1,
				"hideForNonAdmin": ["", "In Development"],
				"hideForAdmin": ["", "In Development"]
			}, {
				"elementType": "markup",
				"tag": "h2",
				"htmlID": "header_approvals",
				"content": "Committee Response",
				"begin": 1,
				"end": 1
				// }, {
				//	 "elementType": "markup",
				//	 "tag": "div",
				//	 "htmlID": "swf-specific-approval-preface",
				//	 "htmlClass": "preface",
				//	 "begin": 1,
				//	 "end": 1,
				//	 "hideForNonAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				//	 "hideForAdmin": ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlClass": "preface",
				"content": "Here to approve? Just find your name and set the corresponding approval indicator " +
					"to 'I approve'.",
				"htmlID": "approval-instructions",
				"begin": 1,
				"end": 1,
				"hideForNonAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "all-approvals",
				"content": '',
				"begin": 1,


			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "approver_Finance",
				"htmlClass": "approver-container",
				'dataAttributes': [{
					'key': 'approver-key',
					'value': 'FinanceApprovers'
				}],

				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Approval Indicator - Finance",
				"choiceSetLabel": "Approval Indicator",
				"htmlClass": "approval-indicator",
				"choices": [{
					"value": "approve",
					"display": "I approve"
/*					},{
						"value": "disapprove",
						"display": "I disapprove"
*/					}, {
					"value": "needInfo",
					"display": "Approval withheld pending comments"
				}],
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
/*				'helpNotes': [
					{
						'text': approvalStmt,
						'htmlID': 'approval-indicator_help-note-1_Finance',
					}, {
						'text': 'Are you sure? The only way to undo this is for the requester to initiate a new request.',
						'htmlID': 'approval-indicator_help-note-2_Finance',
						'urgent': 1,
						'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
*/			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Signature - Finance",
				"labelContent": "Signature",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Date - Finance",
				"labelContent": "Date",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Approval Notes - Finance",
				"labelContent": "Notes",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Visible to all who can access this request',
						'htmlID': 'approval-indicator_help-note-3_Finance',
					}
				]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1


				/*}, {
					"elementType": "markup",
					"tag": "div",
					"htmlID": "approver_Logistics",
					"htmlClass": "approver-container",
					'dataAttributes': [{
						'key': 'approver-key',
						'value': 'LogisticsApprovers'
					}],
	
					"begin": 1,
				}, {
					"elementType": "markup",
					"tag": "h3",
					"begin": 1,
					"end": 1,
				}, {
					"elementType": "field",
					"controlType": "radio",
					"fieldName": "Approval Indicator - Logistics",
					"choiceSetLabel": "Approval Indicator",
					"choices": [{
							"value": "approve",
							"display": "I approve"
						// },{
						// 	"value": "disapprove",
						// 	"display": "I disapprove"
						},{
							"value": "needInfo",
							"display": "Approval withheld pending comments"
					}],
					'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					// 'helpNotes': [
					// 	{
					// 		'text': approvalStmt,
					// 		'htmlID': 'approval-indicator_help-note-1_Logistics',
					// 	}, {
					// 		'text': 'Are you sure? The only way to undo this is for the requester to initiate a new request.',
					// 		'htmlID': 'approval-indicator_help-note-2_Logistics',
					// 		'urgent': 1,
					// 		'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					// 		'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					// 	}
					// ]
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Approval Signature - Logistics",
					"labelContent": "Signature",
					'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Approval Date - Logistics",
					"labelContent": "Date",
					'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				}, {
					"elementType": "field",
					"controlType": "textarea",
					"fieldName": "Approval Notes - Logistics",
					"labelContent": "Notes",
					'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					'helpNotes': [
						{
							'text': 'Visible to all who can access this request',
							'htmlID': 'approval-indicator_help-note-3_Logistics',
						}
					]
				}, {
					"elementType": "markup",
					"tag": "div",
					"end": 1*/

			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "approver_EDC",
				"htmlClass": "approver-container",
				'dataAttributes': [{
					'key': 'approver-key',
					'value': 'EDCApprovers'
				}],

				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Approval Indicator - EDC",
				"choiceSetLabel": "Approval Indicator",
				"choices": [{
					"value": "approve",
					"display": "I approve"
/*					},{
						"value": "disapprove",
						"display": "I disapprove"
*/					}, {
					"value": "needInfo",
					"display": "Approval withheld pending comments"
				}],
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
/*				'helpNotes': [
					{
						'text': approvalStmt,
						'htmlID': 'approval-indicator_help-note-1_EDC',
					}, {
						'text': 'Are you sure? The only way to undo this is for the requester to initiate a new request.',
						'htmlID': 'approval-indicator_help-note-2_EDC',
						'urgent': 1,
						'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
*/			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Signature - EDC",
				"labelContent": "Signature",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Date - EDC",
				"labelContent": "Date",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Approval Notes - EDC",
				"labelContent": "Notes",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Visible to all who can access this request',
						'htmlID': 'approval-indicator_help-note-3_EDC',
					}
				]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1

			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "approver_EEP",
				"htmlClass": "approver-container",
				'dataAttributes': [{
					'key': 'approver-key',
					'value': 'EEPApprovers'
				}],

				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Approval Indicator - EEP",
				"choiceSetLabel": "Approval Indicator",
				"choices": [{
					"value": "approve",
					"display": "I approve"
/*					},{
						"value": "disapprove",
						"display": "I disapprove"
*/					}, {
					"value": "needInfo",
					"display": "Approval withheld pending comments"
				}],
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
/*				'helpNotes': [
					{
						'text': approvalStmt,
						'htmlID': 'approval-indicator_help-note-1_EEP',
					}, {
						'text': 'Are you sure? The only way to undo this is for the requester to initiate a new request.',
						'htmlID': 'approval-indicator_help-note-2_EEP',
						'urgent': 1,
						'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
*/			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Signature - EEP",
				"labelContent": "Signature",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Date - EEP",
				"labelContent": "Date",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Approval Notes - EEP",
				"labelContent": "Notes",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Visible to all who can access this request',
						'htmlID': 'approval-indicator_help-note-3_EEP',
					}
				]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "approver_CFG",
				"htmlClass": "approver-container",
				'dataAttributes': [{
					'key': 'approver-key',
					'value': 'CFGApprovers'
				}],

				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Approval Indicator - CFG",
				"choiceSetLabel": "Approval Indicator",
				"choices": [{
					"value": "approve",
					"display": "I approve"
/*					},{
						"value": "disapprove",
						"display": "I disapprove"
*/					}, {
					"value": "needInfo",
					"display": "Approval withheld pending comments"
				}],
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
/*				'helpNotes': [
					{
						'text': approvalStmt,
						'htmlID': 'approval-indicator_help-note-1_CFG',
					}, {
						'text': 'Are you sure? The only way to undo this is for the requester to initiate a new request.',
						'htmlID': 'approval-indicator_help-note-2_CFG',
						'urgent': 1,
						'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
*/			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Signature - CFG",
				"labelContent": "Signature",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Date - CFG",
				"labelContent": "Date",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Approval Notes - CFG",
				"labelContent": "Notes",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Visible to all who can access this request',
						'htmlID': 'approval-indicator_help-note-3_CFG',
					}
				]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1

			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "approver_DIM",
				"htmlClass": "approver-container",
				'dataAttributes': [{
					'key': 'approver-key',
					'value': 'DIMApprovers'
				}],

				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Approval Indicator - DIM",
				"choiceSetLabel": "Approval Indicator",
				"choices": [{
					"value": "approve",
					"display": "I approve"
/*					},{
						"value": "disapprove",
						"display": "I disapprove"
*/					}, {
					"value": "needInfo",
					"display": "Approval withheld pending comments"
				}],
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
/*				'helpNotes': [
					{
						'text': approvalStmt,
						'htmlID': 'approval-indicator_help-note-1_DIM',
					}, {
						'text': 'Are you sure? The only way to undo this is for the requester to initiate a new request.',
						'htmlID': 'approval-indicator_help-note-2_DIM',
						'urgent': 1,
						'hideForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
*/			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Signature - DIM",
				"labelContent": "Signature",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Date - DIM",
				"labelContent": "Date",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Approval Notes - DIM",
				"labelContent": "Notes",
				'disabledForNonAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Grant Proposal Ready for Submission', 'Grant Proposal Submitted', 'Grant Awarded', 'Grant Declined', 'Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Visible to all who can access this request',
						'htmlID': 'approval-indicator_help-note-3_DIM',
					}
				]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1


			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1



			}, {
				"elementType": "markup",
				"tag": "h3",
				"begin": 1,
				"end": 1,
				"content": "Other Reviewers"

/*			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Historical Other Preservable Notes",
				"labelContent": "Historical Other Reviewers' Comments",
				"htmlClass": "historical-notes-as-preface",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"]
*/			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Other Reviewer Comments",
				"labelContent": "Comments",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"]

			}, {
				"elementType": "markup",
				"tag": "h3",
				"begin": 1,
				"end": 1,
				"content": "Request Status"
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Change Request Status",
				"labelContent": "Change Request Status",
				'setOptions': [
					// { "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Cancel", "display": "This request has been cancelled" },
					{ "value": "GrantProposalReadyForSubmission", "display": "Grant proposal is ready for submission" },
					{ "value": "GrantProposalSubmitted", "display": "Grant proposal has been submitted" },
					{ "value": "GrantAwarded", "display": "Grant has been awarded" },
					{ "value": "GrantDeclined", "display": "Grant has been declined" }
				],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"]


			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1


			}, {
				"elementType": "markup",
				"tag": "h2",
				"begin": 1,
				"end": 1,
				"content": "Request Status",
				"hideForNonAdmin": ["", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status 2",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}
		]
	};



	// configure customScript for this SWF here
	//	(customScriptFirst will be prepended to auto-generated script)
	//	(fData.CustomScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = '$("div#container_about-the-requester").hide("fast").addClass("hidden");';

	fData.CustomScriptLast += '$("input#Request-Status-2").val($("input#Request-Status").val());';

	fData.CustomScriptLast += '$("div#label-and-control_Requested-For").hide("fast").addClass("hidden");';

	fData.CustomScriptLast += 'if ($("input#migrated-from-quark").val() == "1") { \n' +
		'	$("div#label-and-control_GPC-Initial-Concept-Approval-Request-ID").hide("fast").addClass("hidden"); \n' +
		'	$("div#label-and-control_Import-from-GPC-Initial-Concept-Approval-Request").hide("fast").addClass("hidden"); \n' +
		'} \n';












	fData.CustomScriptLast += 'if ($("input#museum-role_subawardee").is(":checked")) { \n' +
		'	$("div#label-and-control_Prime-Institution").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Pending Approval" || $("input#Request-Status").val() == "Approval Pending Comments") { \n' +
		'		$().SetFieldToRequired("Prime-Institution", "text"); \n' +
		'	} \n' +
		'	$("div#label-and-control_Outside-PI").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#expected-decision-date-boolean_yes").is(":checked")) { \n' +
		'	$("div#label-and-control_Expected-Decision-Date").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Pending Approval" || $("input#Request-Status").val() == "Approval Pending Comments") { \n' +
		'		$().SetFieldToRequired("Expected-Decision-Date", "date"); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#eep-needs_yes").is(":checked")) { \n' +
		'	$("div#container_eep-staff-member-names").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#edc-needs_yes").is(":checked")) { \n' +
		'	$("div#container_edc-staff-member-names").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#new-staff-needs_yes").is(":checked")) { \n' +
		'	$("div#container_new-staff-positions").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Pending Approval" || $("input#Request-Status").val() == "Approval Pending Comments") { \n' +
		'		$().SetFieldToRequired("New-Staff-Positions", "textarea"); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#office-space-needs_yes").is(":checked")) { \n' +
		'	$("div#container_staff-quantity-for-office-space").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Pending Approval" || $("input#Request-Status").val() == "Approval Pending Comments") { \n' +
		'		$().SetFieldToRequired("Staff-Quantity-for-Office-Space", "textarea"); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += '$("input#MOS-Direct-Costs, input#IDC, input#Total-Project-Budget, input#Cost-Share").on("change", function() { \n' +
		'	$().ProcessGPCCurrencyFields();\n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#ready-for-submission-to-committee_yes").on("change", function() { \n' +
		'	if (this.checked) { \n' +
		'		$("input#Submission-Signature").val($("input#Current-User-Display-Name").val()); \n' +
		'		$("input#Submission-Date").val($().ReturnFormattedDateTime("nowLocal", null, "MMMM D, YYYY")) \n' +
		'			.attr("data-iso-date-on-load", $().ReturnFormattedDateTime("nowUTC", null, null, null)); \n' +
		'		$("div#submission-notice").html("Please check your information before saving it. You won\'t be able to make edits afterward.");\n' +
		'	} else { \n' +
		'		$("input#Submission-Signature").val(""); \n' +
		'		$("input#Submission-Date").val("").attr("value", ""); \n' +
		'		$("div#submission-notice").html("You\'ll be able to make changes after saving.");\n' +
		'	} \n' +
		'}); \n';

	fData.CustomScriptLast += '$().SetGPCSubmissionNeedsPeople(); \n';

	fData.CustomScriptLast += '$("#Import-from-GPC-Initial-Concept-Approval-Request").on("click", function () { \n' +
		'	if ($("input#id-or-link_GPC-Initial-Concept-Approval-Request-ID").length) { \n ' +
		'		$().ImportGPCConceptRequestDataToGPCSubmissionRequest($("input#id-or-link_GPC-Initial-Concept-Approval-Request-ID").val()); \n' +
		'	} else { \n' +
		'		$().ImportGPCConceptRequestDataToGPCSubmissionRequest(GetParamFromUrl($("a#id-or-link_GPC-Initial-Concept-Approval-Request-ID").attr("href"), "r")); \n' +
		'	} \n' +
		'}); \n';

	fData.CustomScriptLast += '$().SetGPCSubmissionApprovalRequestNonWriteAccess(); \n';

	fData.CustomScriptLast += '$().EnableGPCSubmissionApprovalRequestStatusManagement(); \n';

	// fData.CustomScriptLast +=	'if ($("input#Request-Status").val() == "Pending Approval" || $("input#Request-Status").val() == "Approval Pending Comments") { \n' + 
	// 							'	$().EnableGPCSubmissionApprovalCommitteeResponses(); \n' +
	// 							'}';


	fData.CustomScriptLast += '$().EnableGPCSubmissionApprovalCommitteeResponses(); \n';




	fData.CustomScriptLast += 'if ($("input#Request-Status").val() != "Pending Approval" && $("input#Request-Status").val() != "Approval Pending Comments") { \n' +
		'	$().RedisableGPCSubmissionApprovalCommitteeResponses(); \n' +
		'}';

	fData.CustomScriptLast += 'if($("input#Request-Status").val() != "" && $("input#Request-Status").val() != "In Development" && $("input#Request-Status").val() != "Pending Approval") { \n' +
		'	if ($("a#mos-drag-and-drop-file-container_Project-Budget-Justification-File").attr("href") == "" || !(document.getElementById("mos-drag-and-drop-file-container_Project-Budget-Justification-File").hasAttribute("href"))) { \n' +
		'		$("div#label-and-control_Project-Budget-Justification-File").hide("fast").addClass("hidden"); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += '$("input.approval-indicator").on("change", function () { \n' +
		'	var approvalHelpNoteID = $(this).closest("div.control").find("div[id^=\'approval-indicator_help-note-1\']").attr("id"); \n' +
		'	var disapprovalHelpNote = $(this).closest("div.control").find("div[id^=\'approval-indicator_help-note-2\']").attr("id"); \n' +
		'	if ($(this).val() == "disapprove") { \n' +
		'		if (!$("#" + disapprovalHelpNote).is(":visible")) { \n' +
		'			$("#" + disapprovalHelpNote).show("fast"); \n' +
		'			$("#" + disapprovalHelpNote).removeClass("hidden"); \n' +
		'		} \n' +
		'		if ($("#" + approvalHelpNoteID).is(":visible")) { \n' +
		'			$("#" + approvalHelpNoteID).hide("fast"); \n' +
		'			$("#" + approvalHelpNoteID).addClass("hidden"); \n' +
		'		} \n' +
		'		$(this).closest("div.control").find("input[value=\'approve\']").removeAttr("checked");' +
		'		$(this).closest("div.control").find("input[value=\'disapprove\']").attr("checked", true);' +
		'		$(this).closest("div.control").find("input[value=\'needInfo\']").removeAttr("checked");' +
		'		$(this).closest("div.approver-container").attr("data-approval-status", "disapproved");' +
		'	} else if ($(this).val() == "approve") { \n' +
		'		if (!$("#" + approvalHelpNoteID).is(":visible")) { \n' +
		'			$("#" + approvalHelpNoteID).show("fast"); \n' +
		'			$("#" + approvalHelpNoteID).removeClass("hidden"); \n' +
		'		} \n' +
		'		if ($("#" + disapprovalHelpNote).is(":visible")) { \n' +
		'			$("#" + disapprovalHelpNote).hide("fast"); \n' +
		'			$("#" + disapprovalHelpNote).addClass("hidden"); \n' +
		'		} \n' +
		'		$(this).closest("div.control").find("input[value=\'disapprove\']").removeAttr("checked");' +
		'		$(this).closest("div.control").find("input[value=\'approve\']").attr("checked", true);' +
		'		$(this).closest("div.control").find("input[value=\'needInfo\']").removeAttr("checked");' +
		'		$(this).closest("div.approver-container").attr("data-approval-status", "approved");' +
		'	} else if ($(this).val() == "needInfo") { \n' +
		'		if (!$("#" + approvalHelpNoteID).is(":visible")) { \n' +
		'			$("#" + approvalHelpNoteID).show("fast"); \n' +
		'			$("#" + approvalHelpNoteID).removeClass("hidden"); \n' +
		'		} \n' +
		'		if ($("#" + disapprovalHelpNote).is(":visible")) { \n' +
		'			$("#" + disapprovalHelpNote).hide("fast"); \n' +
		'			$("#" + disapprovalHelpNote).addClass("hidden"); \n' +
		'		} \n' +
		'		$(this).closest("div.control").find("input[value=\'disapprove\']").removeAttr("checked");' +
		'		$(this).closest("div.control").find("input[value=\'needInfo\']").attr("checked", true);' +
		'		$(this).closest("div.control").find("input[value=\'approve\']").removeAttr("checked");' +
		'		$(this).closest("div.approver-container").attr("data-approval-status", "needInfo");' +
		'	} \n' +
		'}); \n';


	$.fn.ReturnThisAppMData = function () {
		return mData;
	};

	$.fn.ReturnThisAppOData = function () {
		return oData;
	};

	$.fn.ReturnThisAppFData = function () {
		return fData;
	};

})(jQuery);