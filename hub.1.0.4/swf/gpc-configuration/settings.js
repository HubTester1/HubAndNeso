(function ($) {

	var mData = {
		'componentID': 153,
		"swf": 1,
		"mosMainKey": "prod",
		// "mosMainKey": "dev",
		// "mosMainKey": "devMedium",
		// "mosMainKey": "devLong",
		// "useRecordedMOSMainMajorVersion": 1,
		"currentRequestVersion": 1,
		// "devFiles": 1,
		"devAdminNotifications": 1,
		"notifications": 0
	};



	var oData = {
		'admin': {
			'buttons': [],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Requested By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Modified By',
						'internalName': 'Editor',
						'userName': 1
					}, {
						'displayName': 'Modified',
						'internalName': 'Modified',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Unapproved',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Unassigned',
						'tableID': 'unassigned',
						'someColsAreUsers': 1,
						'customCAMLQuery': '<Where>' +
							'  <And>' +
							'    <Eq>' +
							'      <FieldRef Name="RequestStatus"></FieldRef>' +
							'      <Value Type="Text">Approved</Value>' +
							'    </Eq>' +
							'    <IsNull>' +
							'      <FieldRef Name="AssignedTo"></FieldRef>' +
							'    </IsNull>' +
							'  </And>' +
							'</Where>'
					}, {
						'tableTitle': 'Assigned',
						'tableID': 'assigned',
						'someColsAreUsers': 1,
						'customCAMLQuery': '<Where>' +
							'  <And>' +
							'    <Eq>' +
							'      <FieldRef Name="RequestStatus"></FieldRef>' +
							'      <Value Type="Text">Approved</Value>' +
							'    </Eq>' +
							'    <IsNotNull>' +
							'      <FieldRef Name="AssignedTo"></FieldRef>' +
							'    </IsNotNull>' +
							'  </And>' +
							'</Where>',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Requested By',
								'internalName': 'Author',
								'userName': 1
							}, {
								'displayName': 'Talk To',
								'internalName': 'RequestedFor',
								'userName': 1
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Assigned To',
								'internalName': 'AssignedTo',
								'userName': 1
							}, {
								'displayName': 'Assignment Date',
								'internalName': 'AssignmentDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Modified By',
								'internalName': 'Editor',
								'userName': 1
							}, {
								'displayName': 'Modified',
								'internalName': 'Modified',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
							}
						]
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicEOLQueryRelevantValue': 1,
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}, {
								'displayName': 'Requested By',
								'internalName': 'Author',
								'userName': 1
							}, {
								'displayName': 'Talk To',
								'internalName': 'RequestedFor',
								'userName': 1
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Assigned To',
								'internalName': 'AssignedTo',
								'userName': 1
							}, {
								'displayName': 'Assignment Date',
								'internalName': 'AssignmentDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Completed By',
								'internalName': 'CompletedBy',
								'userName': 1
							}, {
								'displayName': 'Completion Date',
								'internalName': 'CompletionDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Modified By',
								'internalName': 'Editor',
								'userName': 1
							}, {
								'displayName': 'Modified',
								'internalName': 'Modified',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
							}
						]
					}
				]
			}
		},
		'my': {
			'buttons': [
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
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Request Status',
						'internalName': 'RequestStatus'
					}
				],
				'tables': [
					{
						'tableTitle': 'Open',
						'tableID': 'open',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 0
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 1
					}
				]
			}
		}
	};



	var fData = {
		'additionalViewPermissionsFunction': 'ReturnGPCPeopleEditingAccess',
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'versioningMatters': 0,



		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'GPC Chairs',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'p',
				'content': 'Please contact IIT to update the GPC Chairs.',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Viewing Permissions',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Initial Concept Approval Requests',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Initial Concept View Access",
				"labelContent": "Can view Initial Concept Approval Requests that have been submitted to GPC",
				'helpNotes': [
					{
						'text': "In addition to PI, co-PI, PD, and GPC chairs",
						'htmlID': "help-note_initial-concept-view-access",
					}
				],
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Submission Approval Requests',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Submission Approval View Access",
				"labelContent": "Can view Submission Approval Requests",
				'helpNotes': [
					{
						'text': "In addition to PI, co-PI, PD, and GPC chairs",
						'htmlID': "help-note_submission-view-access",
					}
				],



			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Editing Permissions',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'GPC People',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Edit GPC People",
				"labelContent": "Can Edit GPC People",
				/*'helpNotes': [
					{
						'text': "In addition to GPC chairs",
						'htmlID': "help-note_edit-gpc-people",
					}
				],*/
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Initial Concept Approval Requests',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Other Concept Reviewers",
				"labelContent": "Can Edit \"GPC Comments\"",



















			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Submission Approval Requests',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Edit Project Narrative",
				"labelContent": "Can Edit \"Project Narrative\"",
				'helpNotes': [
					{
						'text': "In addition to PI, co-PI, and PD",
						'htmlID': "help-note_edit-project-narrative",
					}
				],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Edit Project Budget",
				"labelContent": "Can Edit \"Project Budget\"",
				'helpNotes': [
					{
						'text': "In addition to PI, co-PI, and PD",
						'htmlID': "help-note_edit-project-budget",
					}
				],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Edit Project Budget Justification",
				"labelContent": "Can Edit \"Project Budget Justification\"",
				'helpNotes': [
					{
						'text': "In addition to PI, co-PI, and PD",
						'htmlID': "help-note_edit-project-budget-justification",
					}
				],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Other Submission Reviewers",
				"labelContent": "Can Add \"Comments\" to \"Other Reviewers\" section",

			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Use Change Request Status",
				"labelContent": "Can Use \"Change Request Status\" menu",
				'helpNotes': [
					{
						'text': "In addition to GPC Chairs",
						'htmlID': "help-note_use-change-request-status",
					}
				],







			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Submission Approvers',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Finance Approvers",
				"labelContent": "Finance Approver(s)",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Logistics Approvers",
				"labelContent": "Logistics Administration, Living Collections, and Museum Archives Approver(s)",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "EDC Approvers",
				"labelContent": "Exhibit Development and Conservation Approver(s)",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "EEP Approvers",
				"labelContent": "Education and Enrichment Programs Approver(s)",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "CFG Approvers",
				"labelContent": "Corporate, Foundation, and Government Support Approver(s)",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "DIM Approvers",
				"labelContent": "Digital and Interactive Media Approver(s)",



			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'People with Whom Needs are Negotiated / Discussed',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "EEP Needs Negotiator",
				"labelContent": "Person with whom Education and Enrichment Programs staff needs should be negotiated",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "EDC Needs Negotiator",
				"labelContent": "Person with whom Exhibit Development and Conservation staff needs should be negotiated",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Web Needs Negotiator",
				"labelContent": "Person with whom website needs should be negotiated",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Infra Needs Negotiator",
				"labelContent": "Person with whom IIT Infrastructure needs should be negotiated",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "RE Needs Negotiator",
				"labelContent": "Person with whom Research & Evaluation needs should be negotiated",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "IRB Review Discussee",
				"labelContent": "Person with whom IRB reviews should be discussed",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "EH Needs Negotiator",
				"labelContent": "Person with whom Exhibit Halls space needs should be negotiated",

















			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Notifications',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Initial Concept Approval Requests',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Initial Concept Notifications",
				"labelContent": "Receive Initial Concept Approval Request email notifications",
				'helpNotes': [
					{
						'text': "In addition to PI, co-PI, PD, and GPC chairs",
						'htmlID': "help-note_initial-concept-notifications",
					}
				],

			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Submission Approval Requests',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Submission Approval Notifications",
				"labelContent": "Receive Submission Approval Request email notifications",
				'helpNotes': [
					{
						'text': "In addition to PI, co-PI, PD, and GPC chairs",
						'htmlID': "help-note_submission-notifications",
					}
				],

























				/*}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Notifications',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Signers",
				"labelContent": "Signers",
				// "listFieldName": "Signers",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Concept Viewers",
				"labelContent": "Concept Viewers",
				// "listFieldName": "ConceptViewers",
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Submission Viewers",
				"labelContent": "Submission Viewers",
				// "listFieldName": "SubmissionViewers",




			// }, {
			//     "elementType": "field",
			//     "controlType": "peoplePicker",
			//     "fieldName": "XXX",
			//     "labelContent": "YYY",
			//     "listFieldName": "ZZZ",*/
			}
		]
	};


	// configure customScript for this SWF here
	//    (customScriptFirst will be prepended to auto-generated script)
	//    (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = '$("div#label-and-control_Request-Nickname").hide("fast").addClass("hidden");';

	fData.CustomScriptLast += '$("div#mos-form-submission-confirmation a.link_exit").remove();';

	fData.CustomScriptLast += '$("h1#pageTitle").html("GPC People Configuration");';



	$.fn.ReturnThisAppMData = function () {
		return mData;
	}

	$.fn.ReturnThisAppOData = function () {
		return oData;
	}

	$.fn.ReturnThisAppFData = function () {
		return fData;
	}

})(jQuery);