
(function ($) {

	console.log("using settings m58");

	var mData = {
		'componentID': 154,
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
					"anchorText": "Admin GPC Submission Approval Requests",
					"href": "/sites/gpc-submission/SitePages/App.aspx",
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
					"href": "/sites/gpc-concept/SitePages/GPC%20Initial%20Concept%20Request%20Workflow%20Documentation.aspx",
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
						'internalName': 'ProjectTitle'
					}, {
						'displayName': 'Funder',
						'internalName': 'Funder'
					}, {
						'displayName': 'Proposal Due Date',
						'internalName': 'ProposalDueDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval / Approval Pending Comments',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryTwoRelevantStatuses': ['Pending Approval', 'Approval Pending Comments'],
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved',
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
						'tableTitle': 'Disapproved',
						'tableID': 'disapproved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Disapproved',
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
					"anchorText": "My GPC Submission Approval Requests",
					"href": "/sites/gpc-submission/SitePages/App.aspx",
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
						'displayName': 'Request Nickname',
						'internalName': 'Title'
					}, {
						'displayName': 'Project Title',
						'internalName': 'ProjectTitle'
					}, {
						'displayName': 'Funder',
						'internalName': 'Funder'
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
								'displayName': 'Request Nickname',
								'internalName': 'Title'
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Project Title',
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
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
					}, {
						'tableTitle': 'Disapproved',
						'tableID': 'disapproved',
						'someColsAreUsers': 1,
						'customCAMLQuery': "<Where>" +
							"	<And>" +
							"		<Eq>" +
							"			<FieldRef Name='RequestStatus'></FieldRef>" +
							"			<Value Type='Text'>Disapproved</Value>" +
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
		'gpcInitialConceptApprovalViewer': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "GPC Submission Approval Requests",
					"href": "/sites/gpc-submission/SitePages/App.aspx",
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
						'internalName': 'ProjectTitle'
					}, {
						'displayName': 'Funder',
						'internalName': 'Funder'
					}, {
						'displayName': 'Proposal Due Date',
						'internalName': 'ProposalDueDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval / Approval Pending Comments',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryTwoRelevantStatuses': ['Pending Approval', 'Approval Pending Comments'],
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
						'sortColAndOrder': [0, 'desc']
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved',
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
						'tableTitle': 'Disapproved',
						'tableID': 'disapproved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Disapproved',
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
								'internalName': 'ProjectTitle'
							}, {
								'displayName': 'Funder',
								'internalName': 'Funder'
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
		'autoTrackGPCConceptStatuses': 1,
		'standardElementGroups': {
			'standardPrintButton': {
				'buttonText': 'Print Request',
				'printFunction': 'PrintGPCInitialConceptApprovalRequest'
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'conditionalSubmissionNoticesAndButtonValues': [
			{
				'condition': function () {
					return ($('input#Request-Status').val() === "" || $('input#Request-Status').val() === "In Development");
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
				/*}, {
					'condition': function () {
						return ($('input#Request-Status').val() !== "" && $('input#Request-Status').val() !== "In Development" && $('input#Request-Status').val() !== "Approval Pending Comments");
					},
					'submissionNotice': ''
					// 'buttonValue': 'Blankety-blank',
					// 'buttonWidth': '26rem'*/
			}
		],
		'gpcInitialConceptApprovalRequestNotifications': 1,
		'additionalViewPermissionsFunction': 'ReturnGPCInitialConceptApprovalRequestAdditionalViewAccess',
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
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"]
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
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"]
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
					"hideForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
					"hideForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"hideForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"]
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
				"hideForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"hideForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this request"
				}],
				"helpNotes": [{
					"text": "Add the reason for your cancellation to the <b>Principal Investigator / Proposal Developer Comments</b> field",
					"htmlID": "requester-cancellation_help-note",
					"emphasis": 1,
					"hideForNonAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
					"hideForAdmin": ["In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"]
				}],
				"hideForNonAdmin": ["", "Approved", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
				"onChange": [
					{
						"thisFieldIsChecked": 1,
						"show": [{ "noteID": "requester-cancellation_help-note" }],
						"require": [{ "fieldName": "PID Comments", "type": "textarea" }],
						"enable": [{ "fieldName": "PID Comments", "type": "textarea" }]
					}, {
						"thisFieldIsChecked": 0,
						"hide": [{ "noteID": "requester-cancellation_help-note" }],
						"optional": [{ "fieldName": "PID Comments", "type": "textarea" }]
					}, {
						"thisFieldIsChecked": 0,
						'addlOrConditions': ['$("input#Request-Status").val() != "Approved"', '$("input#Request-Status").val() != "Disapproved"', '$("input#Request-Status").val() != "Cancelled"'],
						"disable": [{ "fieldName": "PID Comments", "type": "textarea" }]
					}
				]



				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Disapproved", "Cancelled"]
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
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approved", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1



			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Project Basics",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Project Title",
				"labelContent": "Project Title",
				"listFieldName": "ProjectTitle",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "MOS Principal Investigator",
				"labelContent": "MOS Principal Investigator",
				"listFieldName": "MOSPrincipalInvestigator",
				"yieldsViewPermissions": 1,
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "MOS Co-Investigator",
				"labelContent": "MOS Co-Investigator",
				"listFieldName": "MOSCoInvestigator",
				"yieldsViewPermissions": 1,
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Proposal Developer",
				"labelContent": "Proposal Developer",
				"listFieldName": "ProposalDeveloper",
				"yieldsViewPermissions": 1,
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Funder",
				"labelContent": "Funder",
				"listFieldName": "Funder",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'RFP or Other Relevant Website',
				'labelContent': 'RFP or Other Relevant Website',
				'editableForNonAdmin': ['', 'In Development', 'Approval Pending Comments'],
				'editableForAdmin': ['', 'In Development'],
				"helpNotes": [
					{
						"text": "E.g., https://www.nsf.gov/xyz-123",
						"htmlID": "rfp-or-other-website-link_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approval Pending Comments', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				]
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
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Proposal Due Date',
				'labelContent': 'Proposal Due Date',
				'listFieldName': 'ProposalDueDate',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'If the proposal is a subaward, this is the date the proposal is due to the Prime, not the Funder',
						'htmlID': 'proposal-due-date_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
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
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
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
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Prime Institution",
				"labelContent": "Prime Institution",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Outside PI",
				"labelContent": "Outside PI",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]

			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Project Description",
				"begin": 1,
				"end": 1
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Project Description File',
				'labelContent': 'Project Description',
				'populatableForNonAdmin': ["", "In Development"],
				'populatableForAdmin': ["", "In Development"],
				'replaceableForNonAdmin': ['In Development', 'Approval Pending Comments'],
				'replaceableForAdmin': [],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],

			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "New or Existing Program",
				"choiceSetLabel": "Is this a new or existing program?",
				"choices": [{
					"value": "new",
					"display": "New program"
				}, {
					"value": "existing",
					"display": "Existing Program"
				}],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Budget Summary",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "MOS Direct Costs",
				"labelContent": "MOS Direct Costs",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': 'State amounts in USD, using standard American currency format',
						'htmlID': 'mos-direct-costs_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "IDC",
				"labelContent": "IDC",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': 'State amounts in USD, using standard American currency format',
						'htmlID': 'idc_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approval Pending Comments', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approval Pending Comments', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Total MOS Budget",
				"labelContent": "Total MOS Budget",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Total Project Budget",
				"labelContent": "Total Project Budget",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': 'If different from total MOS budget',
						'htmlID': 'total-project-budget_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				]
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Cost Share Required",
				"choiceSetLabel": "Will cost sharing be required?",
				"choices": [{
					"value": "yes",
					"display": "Yes, cost sharing will be required"
				}, {
					"value": "no",
					"display": "No, cost sharing will not be required"
				}],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": ["Approval Pending Comments"],
				"requiredForAdmin": ["Approval Pending Comments"],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Subawards or Not",
				"choiceSetLabel": "Will there be subawards?",
				"choices": [{
					"value": "yes",
					"display": "Yes, there will be subawards"
				}, {
					"value": "no",
					"display": "No, there will not be subawards"
				}],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]

			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Project Needs",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Staffing Needs",
				"choiceSetLabel": "Staffing Needs",
				"choices": [{
					"value": "PI Direct Reports",
					"display": "PI's Direct Reports"
				}, {
					"value": "EEP",
					"display": "Education & Enrichment Programs"
				}, {
					"value": "EDC",
					"display": "Exhibit Development & Conservation"
				}, {
					"value": "Interactive Media",
					"display": "Web & Interactive Media"
				}, {
					"value": "Infrastructure",
					"display": "IIT Infrastructure"
				}, {
					"value": "Research and Evaluation",
					"display": "Research & Evaluation"
				}, {
					"value": "New Staff",
					"display": "New Staff"
				}],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Space Needs",
				"choiceSetLabel": "Space Needs",
				"choices": [{
					"value": "New Office Space",
					"display": "New Office Space"
				}, {
					"value": "Exhibit Halls Space",
					"display": "Exhibit Halls Space"
				}],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Other Needs",
				"choiceSetLabel": "Other Needs",
				"choices": [{
					"value": "External Evaluator",
					"display": "External Evaluator"
				}],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Submission to Committee",
				"begin": 1,
				"end": 1



				/*}, {
					"elementType": "field",
					"controlType": "textarea",
					"fieldName": "Historical PID Comments",
					"labelContent": "Historical PID Comments",
					"htmlClass": "historical-notes-as-preface",
					"disabledForNonAdmin": ["", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]*/
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "PID Comments",
				"labelContent": "Principal Investigator / Proposal Developer Comments",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]

			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Ready for Submission to Committee",
				"choiceSetLabel": "Ready?",
				"choices": [{
					"value": "yes",
					"display": "Yes, I'm ready to request the Grant Planning Committee's approval for this initial concept"
				}],
				"hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"helpNotes": [
					{
						"text": "Some fields have become required",
						"htmlID": "ready-for-submission_help-note",
						"emphasis": 1,
						"hideForNonAdmin": ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['', 'In Development', 'Pending Approval', 'Approval Pending Comments', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				'onChange': [
					{
						'thisFieldIsChecked': 1,
						'show': [
							{ 'fieldName': 'Submission Signature' },
							{ 'fieldName': 'Submission Date' }
						],
						'require': [
							{ 'fieldName': 'Project Title', 'type': 'text' },
							{ 'fieldName': 'MOS Principal Investigator', 'type': 'peoplePicker' },
							{ 'fieldName': 'Proposal Developer', 'type': 'peoplePicker' },
							{ 'fieldName': 'Funder', 'type': 'text' },
							// { 'fieldName': 'RFP or Other Relevant Website', 'type': 'url' },
							{ 'fieldName': 'Proposal Type', 'type': 'select' },
							{ 'fieldName': 'Proposal Due Date', 'type': 'datePicker' },
							{ 'fieldName': 'Museum Role', 'type': 'radio' },
							{ 'fieldName': 'Project Description File', 'type': 'mosFile' },
							{ 'fieldName': 'New or Existing Program', 'type': 'radio' },
							// { 'fieldName': 'MOS Direct Costs', 'type': 'text' },
							// { 'fieldName': 'IDC', 'type': 'text' },
							{ 'fieldName': 'Cost Share Required', 'type': 'radio' }
						]
					}, {
						'thisFieldIsChecked': 1,
						'addlAndConditions': ['$("input#museum-role_subawardee").is(":checked")'],
						'require': [
							{ 'fieldName': 'Prime Institution', 'type': 'text' }
						]
					}, {
						'thisFieldIsChecked': 1,
						'addlAndConditions': ['$("input#Request-Status").val() === "" || $("input#Request-Status").val() === "In Development"'],
						'show': [
							{ 'noteID': 'ready-for-submission_help-note' }
						]
					}, {
						'thisFieldIsChecked': 0,
						'hide': [
							{ 'noteID': 'ready-for-submission_help-note' },
							{ 'fieldName': 'Submission Signature' },
							{ 'fieldName': 'Submission Date' }
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
							{ 'fieldName': 'Museum Role', 'type': 'radio' },
							{ 'fieldName': 'Project Description File', 'type': 'mosFile' },
							{ 'fieldName': 'New or Existing Program', 'type': 'radio' },
							{ 'fieldName': 'Prime Institution', 'type': 'text' },
							// { 'fieldName': 'MOS Direct Costs', 'type': 'text' },
							// { 'fieldName': 'IDC', 'type': 'text' },
							{ 'fieldName': 'Cost Share Required', 'type': 'radio' }
						]
					}
				]

				// some on change event handling for this field is in custom script, below, because, here, there is no access to the current user's name and passing a commoand to retrieve the user's name results in the command itself being printed where the user's name should be printed

			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Submission Signature",
				"labelContent": "Signature",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Approval Pending Comments"],
				"hideForAdmin": ["", "In Development", "Approval Pending Comments"]
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Committee Response",
				"begin": 1,
				"end": 1,
				"hideForNonAdmin": ["", "In Development"],
				"hideForAdmin": ["", "In Development"]
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Request Status",
				"begin": 1,
				"end": 1,
				"hideForNonAdmin": ["", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Change Request Status",
				"labelContent": "Change Request Status",
				"setOptions": [
					{ "value": "Approval Pending Comments", "display": "This request's approval is withheld pending comments" },
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "In Development", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": [""],
				"hideForAdmin": [""]

			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "GPC Comments",
				"labelContent": "GPC Comments",
				"disabledForNonAdmin": ["Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development"],
				"hideForAdmin": ["", "In Development"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Signature",
				"labelContent": "Signature",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Approval Date",
				"labelContent": "Date",
				"disabledForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments"],
				"hideForAdmin": ["", "In Development", "Pending Approval", "Approval Pending Comments"]
			}
		]
	};



	// configure customScript for this SWF here
	//	(fData.CustomScriptFirst will be prepended to auto-generated script)
	//	(fData.CustomScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = '$("div#label-and-control_Requested-For").hide("fast").addClass("hidden");';

	fData.CustomScriptLast += 'if ($("input#Request-Status").val() == "") { \n' +
		'	$().PutAddtlPeopleInPicker("Proposal Developer", [{ \n' +
		'		"name": $("input#Requester-Name").val(), \n' +
		'		"email": $("input#Requester-Email").val(), \n' +
		'		"account": $("input#Requester-Account").val() \n' +
		'	}]); \n' +
		'} \n';

	fData.CustomScriptLast += '$("input#MOS-Direct-Costs, input#IDC, input#Total-Project-Budget").on("change", function() { \n' +
		'	$().ProcessGPCCurrencyFields();\n' +
		'}); \n';

	fData.CustomScriptLast += 'if ($("input#museum-role_subawardee").is(":checked")) { \n' +
		'	$("div#label-and-control_Prime-Institution").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Approval Pending Comments") { \n' +
		'		$().SetFieldToRequired("Prime-Institution", "text"); \n' +
		'	} \n' +
		'	$("div#label-and-control_Outside-PI").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += '$("input#ready-for-submission-to-committee_yes").on("change", function() { \n' +
		'	if (this.checked) { \n' +
		'		$("input#Submission-Signature").val($("input#Current-User-Display-Name").val()); \n' +
		'		$("input#Submission-Date").val($().ReturnFormattedDateTime("nowLocal", null, "MMMM D, YYYY")) \n' +
		'			.attr("data-iso-date-on-load", $().ReturnFormattedDateTime("nowUTC", null, null, null)); \n' +
		'		$("div#submission-notice").html("Please check your information before saving it. You won\'t be able to make edits afterward.");\n' +
		// '		$().SetGPCInitialConceptApprovalRequestAdditionalViewAccess(); \n' + 
		'	} else { \n' +
		'		$("input#Submission-Signature").val(""); \n' +
		'		$("input#Submission-Date").val("").attr("value", ""); \n' +
		'		if ($("input#Request-Status").val() === "Approval Pending Comments") { \n' +
		'			$("div#submission-notice").html("<p class=\'alert\'>This request will not be re-submitted to GPC until the \\"Ready?\\" checkbox is checked.</p><p>You\'ll be able to make changes after saving.</p>");\n' +
		'		} \n' +
		'		if ($("input#Request-Status").val() === "" || $("input#Request-Status").val() === "In Development") { \n' +
		'			$("div#submission-notice").html("<p>You\'ll be able to make changes after saving.");\n' +
		'		} \n' +
		// '		$().UnsetGPCInitialConceptApprovalRequestAdditionalViewAccess(); \n' + 
		'	} \n' +
		'}); \n';

	fData.CustomScriptLast += '$("select#Change-Request-Status").on("change", function() { \n' +
		'	if ($(this).val() == "Approve" || $(this).val() == "Disapprove" || $(this).val() == "Cancel") { \n' +
		'		$("input#Approval-Signature").val($("input#Current-User-Display-Name").val()); \n' +
		'		$("input#Approval-Date").val($().ReturnFormattedDateTime("nowLocal", null, "MMMM D, YYYY")).attr("value", $().ReturnFormattedDateTime("nowLocal", null, "MMMM D, YYYY")); \n' +
		'		$("div#label-and-control_Approval-Signature").show("fast").removeClass("hidden"); \n' +
		'		$("div#label-and-control_Approval-Date").show("fast").removeClass("hidden"); \n' +
		'	} else { \n' +
		'		$("input#Approval-Signature").val(""); \n' +
		'		$("input#Approval-Date").val("").attr("value", ""); \n' +
		'		$("div#label-and-control_Approval-Signature").hide("fast").addClass("hidden"); \n' +
		'		$("div#label-and-control_Approval-Date").hide("fast").addClass("hidden"); \n' +
		'	} \n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#Submission-Date").prop("readonly", false).removeAttr("readonly").prop("disabled", true).attr("disabled", "true");';

	fData.CustomScriptLast += '$().SetGPCInitialConceptApprovalRequestNonWriteAccess(); \n';

	fData.CustomScriptLast += '$().EnableGPCConceptApprovalCommitteeResponses(); \n';



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