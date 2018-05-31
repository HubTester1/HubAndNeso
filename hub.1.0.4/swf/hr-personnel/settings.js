(function ($) {

	/* $().SPServices.SPUpdateMultipleListItems({
		//webURL: "",
		listName: "SWFList",
		//CAMLQuery: "",
		batchCmd: "Delete",
		//valuepairs: [],
		debug: false,
		completefunc: null
	}); */

	var mData = {
		'componentID': 98,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		"currentRequestVersion": 1,
		'devAdminNotifications': 1,
		'notifications': 0,
	};

	console.log("using settings m57");



	var oData = {
		'admin': {
			'buttons': [
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Requested By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': "Action",
						'internalName': "Action",
					}, {
						'displayName': "Existing Staff Member",
						'internalName': "ExistingStaffMember",
						'userName': 1
					}, {
						'displayName': "Hired Staff Member",
						'internalName': "HiredStaffMember",
					}, {
						'displayName': 'Saved Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Submitted',
						'tableID': 'submitted',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Submitted'
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
						'displayName': "Action",
						'internalName': "Action",
					}, {
						'displayName': "Existing Staff Member",
						'internalName': "ExistingStaffMember",
						'userName': 1
					}, {
						'displayName': "Hired Staff Member",
						'internalName': "HiredStaffMember",
					}, {
						'displayName': 'Saved Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Submitted',
						'tableID': 'open',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 0
					}
				]
			}
		}
	};



	var fData = {
		'standardElementGroups': {
			'standardPrintButton': {
				'buttonText': 'Print Request',
				'printFunction': 'PrintPersonnelActionRequest',
				'hideForNonAdmin': [],
				'hideForAdmin': [],
			},
			// 'standardThisRequestAndRequesterElements': 1,
			// 'standardButtonElements': 1,
			'standardButtonElementsInitiallyHidden': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'alwaysTalkToRequester': 1,
		'autoTrackSubmissionAndCancellation': 1,
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': "markup",
				'tag': "h2",
				'content': 'Process',
				'begin': 1,
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "p",
				'content': 'Print this request, acquire appropriate signatures, and submit it to Human Resources.',
				'begin': 1,
				'end': 1
			
			
			
			
			
			
			
			
			
			
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
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request ID",
				"labelContent": "Request ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Request Date",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": {
					'incomingFormat': null,
					'returnFormat': 'MMMM D, YYYY',
					'determineYearDisplayDynamically': 1
				},
				"isoFormatOnSubmit": {
					'incomingFormat': null,
					'returnFormat': null,
					'determineYearDisplayDynamically': null
				},
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
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
					"hideForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
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
				"hideForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this request"
				}],
				"hideForNonAdmin": ["", "Validator Picked Up", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"]
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Submitted", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Action',
				'begin': 1,
				'end': 1,

			}, {
				"elementType": "field",
				'controlType': 'check',
				"fieldName": "Action",
				"choiceSetLabel": "Which action(s)?",
				"choices": [
					{
						"value": "New Hire",
						"display": "New Hire"
					}, {
						"value": "Rehire",
						"display": "Rehire"
					}, {
						"value": "Position Change",
						"display": "Position Change"
					}, {
						"value": "Additional Position",
						"display": "Additional Position"
					}, {
						"value": "Wage Change",
						"display": "Wage Change"
					}, {
						"value": "Title Change",
						"display": "Title Change"
					}, {
						"value": "Schedule Change",
						"display": "Schedule Change"
					}, {
						"value": "Temporary Extension",
						"display": "Temporary Extension"
					}, {
						"value": "Termination",
						"display": "Termination"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [
				
					// main container, section container, buttons

					{
						"anyOfSpecificCheckboxesAreChecked": [
							"#action_new-hire",
							"#action_rehire",
							"#action_position-change",
							"#action_additional-position",
							"#action_wage-change",
							"#action_title-change",
							"#action_schedule-change",
							"#action_temporary-extension",
							"#action_termination",
						],
						"show": [
							{ "divID": "container_main" },
							{ "divID": "container_sections" },
							{ "divID": "submit-or-exit" },
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": [
							"#action_new-hire",
							"#action_rehire",
							"#action_position-change",
							"#action_additional-position",
							"#action_wage-change",
							"#action_title-change",
							"#action_schedule-change",
							"#action_temporary-extension",
							"#action_termination",
						],
						"hide": [
							{ "divID": "container_main" },
							{ "divID": "container_sections" },
							{ "divID": "submit-or-exit" },
						],

					// ear

					}, {
						"anyOfSpecificCheckboxesAreChecked": [
							"#action_new-hire",
							"#action_rehire",
							"#action_position-change",
							"#action_additional-position",
							"#action_wage-change",
							"#action_title-change",
							"#action_schedule-change",
							"#action_temporary-extension",
						],
						"show": [
							{ "divID": "container_ear" },
						],
						"require": [
							{
								"fieldName": "Employment Authorization Request",
								"type": "radio"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": [
							"#action_new-hire",
							"#action_rehire",
							"#action_position-change",
							"#action_additional-position",
							"#action_wage-change",
							"#action_title-change",
							"#action_schedule-change",
							"#action_temporary-extension",
						],
						"hide": [
							{ "divID": "container_ear" },
						],
						"optional": [
							{
								"fieldName": "Employment Authorization Request",
								"type": "radio"
							}
						],

					// staff member

					}, {
						"anyOfSpecificCheckboxesAreChecked": [
							"#action_position-change",
							"#action_additional-position",
							"#action_wage-change",
							"#action_title-change",
							"#action_schedule-change",
							"#action_temporary-extension",
							"#action_termination",
						],
						"show": [
							{ "divID": "container_staff-member" },
						],
						"require": [
							{
								"fieldName": "Status Change Staff Member",
								"type": "peoplePicker"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": [
							"#action_position-change",
							"#action_additional-position",
							"#action_wage-change",
							"#action_title-change",
							"#action_schedule-change",
							"#action_temporary-extension",
							"#action_termination",
						],
						"hide": [
							{ "divID": "container_staff-member" },
						],
						"optional": [
							{
								"fieldName": "Status Change Staff Member",
								"type": "peoplePicker"
							}
						],

					// hire or rehire fields

					}, {

						"anyOfSpecificCheckboxesAreChecked": ["#action_new-hire", "#action_rehire"],
						"show": [
							{ "divID": "container_hire-fieldset" },
						],
						"require": [
							{
								"fieldName": "Hire First Name",
								"type": "text"
							}, {
								"fieldName": "Hire Last Name",
								"type": "text"
							}, {
								"fieldName": "Hired Staff Member",
								"type": "text"
							}, {
								"fieldName": "Hire Manager",
								"type": "peoplePicker"
							}, {
								"fieldName": "Hire Department",
								"type": "select"
							}, {
								"fieldName": "Hire Working Title",
								"type": "text"
							}, {
								"fieldName": "Hire Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Hire Position Number",
								"type": "text"
							}, {
								"fieldName": "Hire Grade",
								"type": "text"
							}, {
								"fieldName": "Hire Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Hire Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Hire Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Hire Proposed Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Hire Proposed Annualized Salary",
								"type": "text"
							}, {
								"fieldName": "Hire Start Date",
								"type": "datePicker"
							}, {
								"fieldName": "Hire End Date",
								"type": "datePicker"
							}, {
								"fieldName": "Hire Funding Source",
								"type": "select"
							}
						],

					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_new-hire", "#action_rehire"],
						"hide": [
							{ "divID": "container_hire-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Hire First Name",
								"type": "text"
							}, {
								"fieldName": "Hire Last Name",
								"type": "text"
							}, {
								"fieldName": "Hired Staff Member",
								"type": "text"
							}, {
								"fieldName": "Hire Manager",
								"type": "peoplePicker"
							}, {
								"fieldName": "Hire Department",
								"type": "select"
							}, {
								"fieldName": "Hire Working Title",
								"type": "text"
							}, {
								"fieldName": "Hire Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Hire Position Number",
								"type": "text"
							}, {
								"fieldName": "Hire Grade",
								"type": "text"
							}, {
								"fieldName": "Hire Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Hire Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Hire Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Hire Proposed Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Hire Proposed Annualized Salary",
								"type": "text"
							}, {
								"fieldName": "Hire Start Date",
								"type": "datePicker"
							}, {
								"fieldName": "Hire End Date",
								"type": "datePicker"
							}, {
								"fieldName": "Hire Funding Source",
								"type": "select"
							}
						],

					// hire header

					}, {

						"anyOfSpecificCheckboxesAreChecked": ["#action_new-hire"],
						"show": [
							{ "headerID": "header_new-hire" },
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_new-hire"],
						"hide": [
							{ "headerID": "header_new-hire" },
						],

					// rehire header

					}, {

						"anyOfSpecificCheckboxesAreChecked": ["#action_rehire"],
						"show": [
							{ "headerID": "header_rehire" },
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_rehire"],
						"hide": [
							{ "headerID": "header_rehire" },
						],

					// position change

					}, {

						"anyOfSpecificCheckboxesAreChecked": ["#action_position-change"],
						"show": [
							{ "divID": "container_position-change-fieldset" },
						],
						"require": [
							{
								"fieldName": "Position Change Previous Working Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Working Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Department",
								"type": "select"
							}, {
								"fieldName": "Position Change Department",
								"type": "select"
							}, {
								"fieldName": "Position Change Previous Manager",
								"type": "peoplePicker"
							}, {
								"fieldName": "Position Change Manager",
								"type": "peoplePicker"
							}, {
								"fieldName": "Position Change Previous Grade",
								"type": "text"
							}, {
								"fieldName": "Position Change Grade",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Position Change Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Position Change Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Position Change Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Position Change Previous Start Date",
								"type": "datePicker"
							}, {
								"fieldName": "Position Change Start Date",
								"type": "datePicker"
							}
						],

					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_position-change"],
						"hide": [
							{ "divID": "container_position-change-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Position Change Previous Working Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Working Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Department",
								"type": "select"
							}, {
								"fieldName": "Position Change Department",
								"type": "select"
							}, {
								"fieldName": "Position Change Previous Manager",
								"type": "peoplePicker"
							}, {
								"fieldName": "Position Change Manager",
								"type": "peoplePicker"
							}, {
								"fieldName": "Position Change Previous Grade",
								"type": "text"
							}, {
								"fieldName": "Position Change Grade",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Position Change Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Position Change Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Position Change Previous Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Position Change Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Position Change Previous Start Date",
								"type": "datePicker"
							}, {
								"fieldName": "Position Change Start Date",
								"type": "datePicker"
							}
						],

					// additional position

					}, {
						"anyOfSpecificCheckboxesAreChecked": ["#action_additional-position"],
						"show": [
							{ "divID": "container_additional-position-fieldset" },
						],
						"require": [
							{
								"fieldName": "Additional Position Working Title",
								"type": "text"
							}, {
								"fieldName": "dditional Position Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Additional Position Department",
								"type": "select"
							}, {
								"fieldName": "Additional Position Grade",
								"type": "text"
							}, {
								"fieldName": "Additional Position Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Additional Position Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Additional Position Proposed Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Additional Position Proposed Annualized Salary",
								"type": "text"
							}, {
								"fieldName": "Additional Position Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Additional Position Start Date",
								"type": "datePicker"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_additional-position"],
						"hide": [
							{ "divID": "container_additional-position-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Additional Position Working Title",
								"type": "text"
							}, {
								"fieldName": "dditional Position Compensation Title",
								"type": "text"
							}, {
								"fieldName": "Additional Position Department",
								"type": "select"
							}, {
								"fieldName": "Additional Position Grade",
								"type": "text"
							}, {
								"fieldName": "Additional Position Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Additional Position Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Additional Position Proposed Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Additional Position Proposed Annualized Salary",
								"type": "text"
							}, {
								"fieldName": "Additional Position Employee Classification",
								"type": "select"
							}, {
								"fieldName": "Additional Position Start Date",
								"type": "datePicker"
							}
						],

					// wage change

					}, {
						"anyOfSpecificCheckboxesAreChecked": ["#action_wage-change"],
						"show": [
							{ "divID": "container_wage-change-fieldset" },
						],
						"require": [
							{
								"fieldName": "Wage Change Effective Beginning Date",
								"type": "datePicker"
							}, {
								"fieldName": "Wage Change Department",
								"type": "select"
							}, {
								"fieldName": "Wage Change Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Wage Change Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Wage Change Previous Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Wage Change Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Wage Change Annualized Salary",
								"type": "text"
							}, {
								"fieldName": "Wage Change Reason",
								"type": "select"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_wage-change"],
						"hide": [
							{ "divID": "container_wage-change-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Wage Change Effective Beginning Date",
								"type": "datePicker"
							}, {
								"fieldName": "Wage Change Department",
								"type": "select"
							}, {
								"fieldName": "Wage Change Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Wage Change Scheduled Hours Annually",
								"type": "text"
							}, {
								"fieldName": "Wage Change Previous Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Wage Change Hourly Wage",
								"type": "text"
							}, {
								"fieldName": "Wage Change Annualized Salary",
								"type": "text"
							}, {
								"fieldName": "Wage Change Reason",
								"type": "select"
							}
						],


					// title change

					}, {
						"anyOfSpecificCheckboxesAreChecked": ["#action_title-change"],
						"show": [
							{ "divID": "container_title-change-fieldset" },
						],
						"require": [
							{
								"fieldName": "Previous Position Title",
								"type": "text"
							}, {
								"fieldName": "New Position Title",
								"type": "text"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_title-change"],
						"hide": [
							{ "divID": "container_title-change-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Previous Position Title",
								"type": "text"
							}, {
								"fieldName": "New Position Title",
								"type": "text"
							}
						],

					// schedule change

					}, {
						"anyOfSpecificCheckboxesAreChecked": ["#action_schedule-change"],
						"show": [
							{ "divID": "container_schedule-change-fieldset" },
						],
						"require": [
							{
								"fieldName": "Schedule Change Effective Beginning Date",
								"type": "datePicker"
							}, {
								"fieldName": "Schedule Change Department",
								"type": "select"
							}, {
								"fieldName": "Schedule Change Previous Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Schedule Change Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Schedule Change Reason",
								"type": "text"
							}, {
								"fieldName": "Schedule Change Funding Source",
								"type": "text"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_schedule-change"],
						"hide": [
							{ "divID": "container_schedule-change-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Schedule Change Effective Beginning Date",
								"type": "datePicker"
							}, {
								"fieldName": "Schedule Change Department",
								"type": "select"
							}, {
								"fieldName": "Schedule Change Previous Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Schedule Change Scheduled Hours Biweekly",
								"type": "text"
							}, {
								"fieldName": "Schedule Change Reason",
								"type": "text"
							}, {
								"fieldName": "Schedule Change Funding Source",
								"type": "text"
							}
						],

					// temporary extension

					}, {
						"anyOfSpecificCheckboxesAreChecked": ["#action_temporary-extension"],
						"show": [
							{ "divID": "container_temporary-extension-fieldset" },
						],
						"require": [
							{
								"fieldName": "Temporary Extension Effective Beginning Date",
								"type": "datePicker"
							}, {
								"fieldName": "Temporary Extension Effective Ending Date",
								"type": "datePicker"
							}, {
								"fieldName": "Temporary Extension Reason",
								"type": "text"
							}, {
								"fieldName": "Temporary Extension Funding Source",
								"type": "text"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_temporary-extension"],
						"hide": [
							{ "divID": "container_temporary-extension-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Temporary Extension Effective Beginning Date",
								"type": "datePicker"
							}, {
								"fieldName": "Temporary Extension Effective Ending Date",
								"type": "datePicker"
							}, {
								"fieldName": "Temporary Extension Reason",
								"type": "text"
							}, {
								"fieldName": "Temporary Extension Funding Source",
								"type": "text"
							}
						],

					// termination

					}, {
						"anyOfSpecificCheckboxesAreChecked": ["#action_termination"],
						"show": [
							{ "divID": "container_termination-fieldset" },
						],
						"require": [
							{
								"fieldName": "Job Being Terminated",
								"type": "text"
							}, {
								"fieldName": "Termination Date",
								"type": "datePicker"
							}, {
								"fieldName": "Last Date Worked",
								"type": "datePicker"
							}, {
								"fieldName": "Termination Reason",
								"type": "select"
							}
						],
					}, {
						"noneOfSpecificCheckboxesAreChecked": ["#action_termination"],
						"hide": [
							{ "divID": "container_termination-fieldset" },
						],
						"optional": [
							{
								"fieldName": "Job Being Terminated",
								"type": "text"
							}, {
								"fieldName": "Termination Date",
								"type": "datePicker"
							}, {
								"fieldName": "Last Date Worked",
								"type": "datePicker"
							}, {
								"fieldName": "Termination Reason",
								"type": "select"
							}
						],





















						



























					}
				]






			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_main',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],






				
			
			

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_ear',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Employment Authorization Request',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Employment Authorization Request',
				'choiceSetLabel': 'Has an Employment Authorization Request been approved and submitted to HR for this position?',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, an approved EAR has been submitted for this position'
					}, {
						'value': 'no',
						'display': 'No, an approved EAR hasn\'t been submitted for this position'
					}
				],
				'helpNotes': [
					{
						'text': "You must create or update an <a href=\"https://bmos.sharepoint.com/sites/hr-employment/SitePages/App.aspx\">Employment Authorization Request</a> prior to submitting this request",
						'htmlID': "help-note_no-employment-authorization-request",
						'emphasis': 1,
						'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
						'hideForAdmin': ['', 'Submitted', 'Cancelled']
					}
				],

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,












				// --- STAFF MEMBER


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_staff-member',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Staff Member',
				'begin': 1,
				'end': 1,

			}, {
				'elementType': "field",
				'controlType': 'peoplePicker',
				'fieldName': "Status Change Staff Member",
				'listFieldName': "ExistingStaffMember",
				'labelContent': "Which staff member?",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,















				


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_sections',
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],












				// --- HIRE

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_hire-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'New Hire',
				'htmlID': 'header_new-hire',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Rehire',
				'htmlID': 'header_rehire',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire First Name",
				'labelContent': "First Name",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"onChange": [
					{
						"alwaysTrue": 1,
						"set": [{
							"fieldName": "Hired Staff Member",
							"type": "text",
							"method": "dynamic",
							"value": "$('input#Hire-First-Name').val() + ' ' + $('input#Hire-Last-Name').val()"
						}]
					}
				]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Last Name",
				'labelContent': "Last Name",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"onChange": [
					{
						"alwaysTrue": 1,
						"set": [{
							"fieldName": "Hired Staff Member",
							"type": "text",
							"method": "dynamic",
							"value": "$('input#Hire-First-Name').val() + ' ' + $('input#Hire-Last-Name').val()"
						}]
					}
				]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hired Staff Member",
				'listFieldName': "HiredStaffMember",
				'labelContent': "Hired Staff Member",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': "field",
				'controlType': 'peoplePicker',
				'fieldName': "Hire Manager",
				'labelContent': "Manager / Supervisor",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Hire Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Working Title",
				'labelContent': "Working Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Compensation Title",
				'labelContent': "Compensation Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Position Number",
				'labelContent': "Position Number",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Grade",
				'labelContent': "Grade",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Hire Employee Classification",
				"labelContent": "Employee Classification",
				"setOptions": [
					{
						"value": "Regular FT",
						"display": "Regular, Full-time"
					}, {
						"value": "Regular PT",
						"display": "Regular, Part-time"
					}, {
						"value": "Casual FT",
						"display": "Casual, Full-time"
					}, {
						"value": "Casual PT",
						"display": "Casual, Part-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Full-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Part-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Full-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Part-time"
					}, {
						"value": "Campaign FT",
						"display": "Campaign, Full-time"
					}, {
						"value": "Campaign PT",
						"display": "Campaign, Part-time"
					}, {
						"value": "Intern FT",
						"display": "Intern, Full-time"
					}, {
						"value": "Intern PT",
						"display": "Intern, Part-time"
					}, {
						"value": "Fellow FT",
						"display": "Fellow, Full-time"
					}, {
						"value": "Fellow PT",
						"display": "Fellow, Part-time"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [{
					"thisFieldEquals": ["Regular FT", "Regular PT"],
					"hide": [{
						"fieldName": "Hire End Date"
					}],
					"optional": [{
						"fieldName": "Hire End Date",
						"type": "datePicker"
					}]
				}, {
					"thisFieldNotEquals": ["Regular FT", "Regular PT"],
					"show": [{
						"fieldName": "Hire End Date"
					}],
					"require": [{
						"fieldName": "Hire End Date",
						"type": "datePicker"
					}]
				}]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Scheduled Hours Biweekly",
				'labelContent': "Scheduled Hours, Biweekly",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Scheduled Hours Annually",
				'labelContent': "Scheduled Hours, Annually",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Proposed Hourly Wage",
				'labelContent': "Proposed Hourly Wage",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Proposed Annualized Salary",
				'labelContent': "Proposed Annualized Salary",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Hire Start Date",
				'labelContent': "Start Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Hire End Date",
				'labelContent': "End Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']

			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Hire Funding Source",
				"labelContent": "Funding Source",
				"setOptions": [
					{
						"value": "Campaign Funds",
						"display": "Campaign Funds"
					}, {
						"value": "Operating Funds",
						"display": "Operating Funds"
					}, {
						"value": "Endowment Funds",
						"display": "Endowment Funds"
					}, {
						"value": "Grant Funds",
						"display": "Grant Funds"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [
					{
						"thisFieldNotEquals": ["Grant Funds"],
						"hide": [{
							"divID": "account-numbers-sets"
						}],
						"optional": [
							{
								"fieldName": "Hire Grant Object Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Hire Grant Source Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Hire Percent Salary from this Account",
								"type": "text",
								'repeatable': 1
							}
						]
					}, {
						"thisFieldEquals": ["Grant Funds"],
						"show": [{
							"divID": "account-numbers-sets"
						}],
						"require": [
							{
								"fieldName": "Hire Grant Object Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Hire Grant Source Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Hire Percent Salary from this Account",
								"type": "text",
								'repeatable': 1
							}
						]
					}
				]
			}, {
				'elementType': "markup",
				'tag': "div",
				'begin': 1,
				'htmlID': "account-numbers-sets",
				'htmlClass': "subsection-container repeating-content-container",
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "markup",
				'tag': "div",
				'begin': 1,
				'htmlID': "account-numbers-set",
				'htmlClass': "subsection repeat-container",
				'repeatable': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Grant Object Code",
				'labelContent': "Grant Object Code",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Grant Source Code",
				'labelContent': "Grant Source Code",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Hire Percent Salary from this Account",
				'labelContent': "Percent Salary from this Account",
				'htmlClass': 'format-percent',
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlID': "repeat-account-numbers-set",
				'htmlClass': "repeat-section-anchor",
				'content': "Insert an Account",
				'repeatSectionID': "account-numbers-set",
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,




				// --- POSITION CHANGE


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_position-change-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Position Change',
				'begin': 1,
				'end': 1,




			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Previous Working Title",
				'labelContent': "Previous Working Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Working Title",
				'labelContent': "Working Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']


			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Previous Compensation Title",
				'labelContent': "Previous Compensation Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Compensation Title",
				'labelContent': "Compensation Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']


			}, {
				"elementType": "field",
				"controlType": "select",
				'fieldName': "Position Change Previous Department",
				'labelContent': "Previous Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Position Change Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],


			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Previous Manager",
				'labelContent': "Previous Manager / Supervisor",
				'controlType': 'peoplePicker',
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Manager",
				'labelContent': "Manager / Supervisor",
				'controlType': 'peoplePicker',
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']


			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Previous Grade",
				'labelContent': "Previous Grade",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Grade",
				'labelContent': "Grade",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']

			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Previous Scheduled Hours Biweekly",
				'labelContent': "Previous Scheduled Hours, Biweekly",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Scheduled Hours Biweekly",
				'labelContent': "Scheduled Hours, Biweekly",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']


			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Previous Scheduled Hours Annually",
				'labelContent': "Previous Scheduled Hours, Annually",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Change Scheduled Hours Annually",
				'labelContent': "Scheduled Hours, Annually",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']


			}, {
				"elementType": "field",
				"controlType": "select",
				'fieldName': "Position Change Previous Employee Classification",
				'labelContent': "Previous Employee Classification",
				"setOptions": [
					{
						"value": "Regular FT",
						"display": "Regular, Full-time"
					}, {
						"value": "Regular PT",
						"display": "Regular, Part-time"
					}, {
						"value": "Casual FT",
						"display": "Casual, Full-time"
					}, {
						"value": "Casual PT",
						"display": "Casual, Part-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Full-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Part-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Full-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Part-time"
					}, {
						"value": "Campaign FT",
						"display": "Campaign, Full-time"
					}, {
						"value": "Campaign PT",
						"display": "Campaign, Part-time"
					}, {
						"value": "Intern FT",
						"display": "Intern, Full-time"
					}, {
						"value": "Intern PT",
						"display": "Intern, Part-time"
					}, {
						"value": "Fellow FT",
						"display": "Fellow, Full-time"
					}, {
						"value": "Fellow PT",
						"display": "Fellow, Part-time"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [
					{
						"thisFieldEquals": ["Regular FT", "Regular PT"],
						"hide": [
							{ "fieldName": "Position Change Previous End Date" },
							{ "fieldName": "Position Change End Date" },
						],
						"optional": [
							{
								"fieldName": "Position Change Previous End Date",
								"type": "datePicker"
							}, {
								"fieldName": "Position Change End Date",
								"type": "datePicker"
							}
						]
					}, {
						"thisFieldNotEquals": ["Regular FT", "Regular PT"],
						"show": [
							{ "fieldName": "Position Change Previous End Date" },
							{ "fieldName": "Position Change End Date" },
						],
						"require": [
							{
								"fieldName": "Position Change Previous End Date",
								"type": "datePicker"
							}, {
								"fieldName": "Position Change End Date",
								"type": "datePicker"
							}
						]
					}
				]
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Position Change Employee Classification",
				"labelContent": "Employee Classification",
				"setOptions": [
					{
						"value": "Regular FT",
						"display": "Regular, Full-time"
					}, {
						"value": "Regular PT",
						"display": "Regular, Part-time"
					}, {
						"value": "Casual FT",
						"display": "Casual, Full-time"
					}, {
						"value": "Casual PT",
						"display": "Casual, Part-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Full-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Part-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Full-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Part-time"
					}, {
						"value": "Campaign FT",
						"display": "Campaign, Full-time"
					}, {
						"value": "Campaign PT",
						"display": "Campaign, Part-time"
					}, {
						"value": "Intern FT",
						"display": "Intern, Full-time"
					}, {
						"value": "Intern PT",
						"display": "Intern, Part-time"
					}, {
						"value": "Fellow FT",
						"display": "Fellow, Full-time"
					}, {
						"value": "Fellow PT",
						"display": "Fellow, Part-time"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [{
					"thisFieldEquals": ["Regular FT", "Regular PT"],
					"hide": [
						{ "fieldName": "Position Change Previous End Date" },
						{ "fieldName": "Position Change End Date" },
					],
					"optional": [
						{
							"fieldName": "Position Change Previous End Date",
							"type": "datePicker"
						}, {
							"fieldName": "Position Change End Date",
							"type": "datePicker"
						}
					]
				}, {
					"thisFieldNotEquals": ["Regular FT", "Regular PT"],
					"show": [
						{ "fieldName": "Position Change Previous End Date" },
						{ "fieldName": "Position Change End Date" },
					],
					"require": [
						{
							"fieldName": "Position Change Previous End Date",
							"type": "datePicker"
						}, {
							"fieldName": "Position Change End Date",
							"type": "datePicker"
						}
					]
				}]


			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Position Change Previous Start Date",
				'labelContent': "Previous Start Date",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Position Change Start Date",
				'labelContent': "Start Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']


			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Position Change Previous End Date",
				'labelContent': "Previous End Date",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Position Change End Date",
				'labelContent': "End Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,







				// --- ADDITIONAL POSITION


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_additional-position-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Additional Position',
				'begin': 1,
				'end': 1,


			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Additional Position Working Title",
				'labelContent': "Working Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Additional Position Compensation Title",
				'labelContent': "Compensation Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Additional Position Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Additional Position Grade",
				'labelContent': "Grade",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Additional Position Scheduled Hours Biweekly",
				'labelContent': "Scheduled Hours, Biweekly",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Additional Position Scheduled Hours Annually",
				'labelContent': "Scheduled Hours, Annually",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Additional Position Proposed Hourly Wage",
				'labelContent': "Proposed Hourly Wage",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Additional Position Proposed Annualized Salary",
				'labelContent': "Proposed Annualized Salary",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Additional Position Employee Classification",
				"labelContent": "Employee Classification",
				"setOptions": [
					{
						"value": "Regular FT",
						"display": "Regular, Full-time"
					}, {
						"value": "Regular PT",
						"display": "Regular, Part-time"
					}, {
						"value": "Casual FT",
						"display": "Casual, Full-time"
					}, {
						"value": "Casual PT",
						"display": "Casual, Part-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Full-time"
					}, {
						"value": "Temporary PT",
						"display": "Temporary, Part-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Full-time"
					}, {
						"value": "Grant FT",
						"display": "Grant, Part-time"
					}, {
						"value": "Campaign FT",
						"display": "Campaign, Full-time"
					}, {
						"value": "Campaign PT",
						"display": "Campaign, Part-time"
					}, {
						"value": "Intern FT",
						"display": "Intern, Full-time"
					}, {
						"value": "Intern PT",
						"display": "Intern, Part-time"
					}, {
						"value": "Fellow FT",
						"display": "Fellow, Full-time"
					}, {
						"value": "Fellow PT",
						"display": "Fellow, Part-time"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [{
					"thisFieldEquals": ["Regular FT", "Regular PT"],
					"hide": [{
						"fieldName": "Additional Position End Date"
					}],
					"optional": [{
						"fieldName": "Additional Position End Date",
						"type": "datePicker"
					}]
				}, {
					"thisFieldNotEquals": ["Regular FT", "Regular PT"],
					"show": [{
						"fieldName": "Additional Position End Date"
					}],
					"require": [{
						"fieldName": "Additional Position End Date",
						"type": "datePicker"
					}]
				}]
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Additional Position Start Date",
				'labelContent': "Start Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Additional Position End Date",
				'labelContent': "End Date",
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,



				// --- WAGE CHANGE


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_wage-change-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Wage Change',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Wage Change Effective Beginning Date",
				'labelContent': "Effective Beginning Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Wage Change Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Wage Change Scheduled Hours Biweekly",
				'labelContent': "Scheduled Hours, Biweekly",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Wage Change Scheduled Hours Annually",
				'labelContent': "Scheduled Hours, Annually",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Wage Change Previous Hourly Wage",
				'labelContent': "Previous Hourly Wage",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Wage Change Hourly Wage",
				'labelContent': "Hourly Wage",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Wage Change Annualized Salary",
				'labelContent': "Annualized Salary",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Wage Change Reason",
				"labelContent": "Reason",
				"setOptions": [
					{
						"value": "Promotion",
						"display": "Promotion"
					}, {
						"value": "Merit",
						"display": "Merit"
					}, {
						"value": "Bonus",
						"display": "Bonus"
					}, {
						"value": "Incentive",
						"display": "Incentive"
					}, {
						"value": "Other",
						"display": "Other"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [{
					"thisFieldEquals": ["Other"],
					"show": [{
						"fieldName": "Wage Change Reason Explanation"
					}],
					"require": [{
						"fieldName": "Wage Change Reason Explanation",
						"type": "textarea"
					}]
				}, {
					"thisFieldNotEquals": ["Other"],
					"hide": [{
						"fieldName": "Wage Change Reason Explanation"
					}],
					"optional": [{
						"fieldName": "Wage Change Reason Explanation",
						"type": "textarea"
					}]
				}]

			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Wage Change Reason Explanation",
				'labelContent': "Please Explain",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,




			// --- TITLE CHANGE


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_title-change-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Title Change',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Previous Position Title",
				'labelContent': "Current Position Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "New Position Title",
				'labelContent': "New Position Title",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,




			// --- SCHEDULE CHANGE


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_schedule-change-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Schedule Change',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Schedule Change Effective Beginning Date",
				'labelContent': "Effective Beginning Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Schedule Change Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Schedule Change Previous Scheduled Hours Biweekly",
				'labelContent': "Previous Scheduled Hours, Biweekly",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Schedule Change Scheduled Hours Biweekly",
				'labelContent': "Scheduled Hours, Biweekly",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				"fieldName": "Schedule Change Reason",
				"labelContent": "Reason",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Schedule Change Funding Source",
				'labelContent': "Funding Source",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,




				// --- TEMPORARY EXTENSION


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_temporary-extension-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Temporary Extension',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Temporary Extension Effective Beginning Date",
				'labelContent': "Effective Beginning Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Temporary Extension Effective Ending Date",
				'labelContent': "Effective Ending Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				"fieldName": "Temporary Extension Reason",
				"labelContent": "Reason",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Temporary Extension Funding Source",
				'labelContent': "Funding Source",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,



				


				// --- TERMINATION


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_termination-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Termination',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Job Being Terminated",
				'labelContent': "Job Being Terminated",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Termination Date",
				'labelContent': "Termination Date",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Last Date Worked",
				'labelContent': "Last Date Worked",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Termination Reason",
				"labelContent": "Reason",
				"setOptions": [
					{
						"value": "Voluntary",
						"display": "Voluntary"
					}, {
						"value": "Involuntary",
						"display": "Involuntary"
					}, {
						"value": "Other",
						"display": "Other"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [
					{
						"thisFieldEquals": ["Voluntary"],
						"show": [{
							"fieldName": "Voluntary Termination Reason Explanation"
						}],
						"require": [{
							"fieldName": "Voluntary Termination Reason Explanation",
							"type": "select"
						}],
						"hide": [
							{ "fieldName": "Involuntary Termination Reason Explanation" },
							{ "fieldName": "Other Termination Reason Explanation" }
						],
						"optional": [
							{
								"fieldName": "Involuntary Termination Reason Explanation",
								"type": "text"
							}, {
								"fieldName": "Other Termination Reason Explanation",
								"type": "text"
							}
						]
					}, {
						"thisFieldEquals": ["Involuntary"],
						"show": [{
							"fieldName": "Involuntary Termination Reason Explanation"
						}],
						"require": [{
							"fieldName": "Involuntary Termination Reason Explanation",
							"type": "text"
						}],
						"hide": [
							{ "fieldName": "Voluntary Termination Reason Explanation" },
							{ "fieldName": "Other Termination Reason Explanation" }
						],
						"optional": [
							{
								"fieldName": "Voluntary Termination Reason Explanation",
								"type": "select"
							}, {
								"fieldName": "Other Termination Reason Explanation",
								"type": "text"
							}
						]
					}, {
						"thisFieldEquals": ["Other"],
						"show": [{
							"fieldName": "Other Termination Reason Explanation"
						}],
						"require": [{
							"fieldName": "Other Termination Reason Explanation",
							"type": "text"
						}],
						"hide": [
							{ "fieldName": "Voluntary Termination Reason Explanation" },
							{ "fieldName": "Involuntary Termination Reason Explanation" }
						],
						"optional": [
							{
								"fieldName": "Voluntary Termination Reason Explanation",
								"type": "select"
							}, {
								"fieldName": "Involuntary Termination Reason Explanation",
								"type": "text"
							}
						]
					}, {
						"thisFieldNotEquals": ["Voluntary", "Involuntary", "Other"],
						"hide": [
							{ "fieldName": "Voluntary Termination Reason Explanation" },
							{ "fieldName": "Involuntary Termination Reason Explanation" },
							{ "fieldName": "Other Termination Reason Explanation" }
						],
						"optional": [
							{
								"fieldName": "Voluntary Termination Reason Explanation",
								"type": "select"
							}, {
								"fieldName": "Involuntary Termination Reason Explanation",
								"type": "text"
							}, {
								"fieldName": "Other Termination Reason Explanation",
								"type": "text"
							}
						]
					}
				]

			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Voluntary Termination Reason Explanation",
				"labelContent": "Voluntary Termination Reason Explanation",
				"setOptions": [
					{
						"value": "ABS3",
						"display": "3 Days No Show (ABS3)"
					}, {
						"value": "EDU",
						"display": "Return to Education (EDU)"
					}, {
						"value": "OE",
						"display": "Other Employment (OE)"
					}, {
						"value": "PRS",
						"display": "Personal Reasons (PRS)"
					}, {
						"value": "REL",
						"display": "Relocate (REL)"
					}, {
						"value": "RESIGN",
						"display": "Resignation (RESIGN)"
					}, {
						"value": "RET",
						"display": "Retire (RET)"
					}, {
						"value": "SAL",
						"display": "Salary (SAL)"
					}, {
						"value": "TEMPEND",
						"display": "End of Temporary Position (TEMPEND)"
					}
				],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Involuntary Termination Reason Explanation",
				'labelContent': "Involuntary Termination Reason Explanation",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Other Termination Reason Explanation",
				'labelContent': "Other Termination Reason Explanation",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']







			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,





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
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	// --- LEGIT

	fData.CustomScriptLast = '$("div#request-form").on("change", "input.format-percent", function() { \n' +
		'	$().ProcessEARPercentFields($(this).attr("id"));\n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#Hire-Proposed-Hourly-Wage, input#Hire-Scheduled-Hours-Biweekly").on("change", function() { \n' +
		'	$().ProcessEARAndPARHourAndWageFields("Hire-Proposed-Hourly-Wage", "Hire-Proposed-Annualized-Salary", "Hire-Scheduled-Hours-Biweekly", "Hire-Scheduled-Hours-Annually");\n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#Position-Change-Previous-Scheduled-Hours-Biweekly").on("change", function() { \n' +
		'	$().ProcessEARAndPARHourFields("Position-Change-Previous-Scheduled-Hours-Biweekly", "Position-Change-Previous-Scheduled-Hours-Annually");\n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#Additional-Position-Proposed-Hourly-Wage, input#Additional-Position-Scheduled-Hours-Biweekly").on("change", function() { \n' +
		'	$().ProcessEARAndPARHourAndWageFields("Additional-Position-Proposed-Hourly-Wage", "Additional-Position-Proposed-Annualized-Salary", "Additional-Position-Scheduled-Hours-Biweekly", "Additional-Position-Scheduled-Hours-Annually");\n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#Additional-Position-Proposed-Hourly-Wage, input#Additional-Position-Scheduled-Hours-Biweekly").on("change", function() { \n' +
		'	$().ProcessEARAndPARHourAndWageFields("Additional-Position-Proposed-Hourly-Wage", "Additional-Position-Proposed-Annualized-Salary", "Additional-Position-Scheduled-Hours-Biweekly", "Additional-Position-Scheduled-Hours-Annually");\n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#Wage-Change-Hourly-Wage, input#Wage-Change-Scheduled-Hours-Biweekly").on("change", function() { \n' +
		'	$().ProcessEARAndPARHourAndWageFields("Wage-Change-Hourly-Wage", "Wage-Change-Annualized-Salary", "Wage-Change-Scheduled-Hours-Biweekly", "Wage-Change-Scheduled-Hours-Annually");\n' +
		'}); \n';


	// =============================================================================================================================

	// --- RADIO + CHECK


	// fData.CustomScriptLast +=	'$("input#employment-authorization-request_yes").prop("checked", true).attr("checked", true); \n';
	// fData.CustomScriptLast +=	'$("input#XXXXXXXXXXXXXXXX").prop("checked", true).attr("checked", true); \n';


	// --- SELECTS

	// fData.CustomScriptLast +=	'$("select#Action option[value=\'Status Change\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Hire-Department option[value=\'Accounting\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Hire-Employee-Classification option[value=\'Grant FT\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Hire-Funding-Source option[value=\'Grant Funds\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Position-Change-Previous-Employee-Classification option[value=\'Grant FT\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Position-Change-Employee-Classification option[value=\'Grant FT\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Position-Change-Previous-Department option[value=\'Accounting\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Position-Change-Department option[value=\'Accounting\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Additional-Position-Department option[value=\'Accounting\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Additional-Position-Employee-Classification option[value=\'Grant FT\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Wage-Change-Department option[value=\'Accounting\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Wage-Change-Reason option[value=\'Other\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Schedule-Change-Department option[value=\'Accounting\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Termination-Reason option[value=\'Voluntary\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Voluntary-Termination-Reason-Explanation option[value=\'OE\']").attr("selected","selected"); \n';
	// fData.CustomScriptLast +=	'$("select#XXXXXXXXXXXXXXXX option[value=\'XXXXXXXXXXXXXXXX\']").attr("selected","selected"); \n';


	// --- TEXT

	fData.CustomScriptLast +=	'$("input#Request-Nickname").val("Sample Request"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-First-Name").val("James"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Last-Name").val("Baker"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Working-Title").val("W Title"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Compensation-Title").val("C Title"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Position-Number").val("123"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Grade").val("37"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Scheduled-Hours-Biweekly").val("80"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Proposed-Hourly-Wage").val("35"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Start-Date").val("June 30, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-End-Date").val("August 30, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Grant-Object-Code").val("789"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Grant-Source-Code").val("4561"); \n';
	fData.CustomScriptLast +=	'$("input#Hire-Percent-Salary-from-this-Account").val("20"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Previous-Working-Title").val("W Title 1"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Working-Title").val("W Title 2"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Previous-Compensation-Title").val("C Title 1"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Compensation-Title").val("C Title 2"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Previous-Grade").val("37"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Grade").val("42"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Previous-Scheduled-Hours-Biweekly").val("80"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Scheduled-Hours-Biweekly").val("80"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Previous-Start-Date").val("April 28, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Start-Date").val("April 29, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-Previous-End-Date").val("May 17, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Position-Change-End-Date").val("May 18, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Additional-Position-Working-Title").val("W Title"); \n';
	fData.CustomScriptLast +=	'$("input#Additional-Position-Compensation-Title").val("C Title"); \n';
	fData.CustomScriptLast +=	'$("input#Additional-Position-Grade").val("37"); \n';
	fData.CustomScriptLast +=	'$("input#Additional-Position-Scheduled-Hours-Biweekly").val("80"); \n';
	fData.CustomScriptLast +=	'$("input#Additional-Position-Proposed-Hourly-Wage").val("35"); \n';
	fData.CustomScriptLast +=	'$("input#Additional-Position-Start-Date").val("June 30, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Additional-Position-End-Date").val("August 30, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Wage-Change-Effective-Beginning-Date").val("September 11, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Wage-Change-Previous-Hourly-Wage").val("35"); \n';
	fData.CustomScriptLast +=	'$("input#Wage-Change-Hourly-Wage").val("35"); \n';
	fData.CustomScriptLast +=	'$("input#Wage-Change-Scheduled-Hours-Biweekly").val("80"); \n';
	fData.CustomScriptLast +=	'$("input#Schedule-Change-Effective-Beginning-Date").val("October 24, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Schedule-Change-Previous-Scheduled-Hours-Biweekly").val("80"); \n';
	fData.CustomScriptLast +=	'$("input#Schedule-Change-Scheduled-Hours-Biweekly").val("80"); \n';
	fData.CustomScriptLast +=	'$("input#Schedule-Change-Reason").val("This is the schedule change reason."); \n';
	fData.CustomScriptLast +=	'$("input#Schedule-Change-Funding-Source").val("SC: 456-7894-456121"); \n';
	fData.CustomScriptLast +=	'$("input#Temporary-Extension-Effective-Beginning-Date").val("January 11, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Temporary-Extension-Effective-Ending-Date").val("February 11, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Temporary-Extension-Reason").val("This is the temporary extension reason."); \n';
	fData.CustomScriptLast +=	'$("input#Temporary-Extension-Funding-Source").val("TE: 456-7894-456121"); \n';
	fData.CustomScriptLast +=	'$("input#Termination-Date").val("Jun 8, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Last-Date-Worked").val("Jun 7, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Job-Being-Terminated").val("Term this job"); \n';
	fData.CustomScriptLast +=	'$("input#Involuntary-Termination-Reason-Explanation").val("Invol Reason Expl"); \n';
	fData.CustomScriptLast +=	'$("input#Other-Termination-Reason-Explanation").val("Other Reason Expl"); \n';
	// fData.CustomScriptLast +=	'$("input#XXXXXXXXXXXXXXXX").val("XXXXXXXXXXXXX"); \n';


	// --- TEXTAREA

	fData.CustomScriptLast +=	'$("textarea#Wage-Change-Reason-Explanation").val("This is my wage change explanation."); \n';
	// fData.CustomScriptLast +=	'$("textarea#XXXXXXXXXXXXXXXX").val("XXXXXXXXXXXXX"); \n';


	// --- PEOPLE PICKER

	fData.CustomScriptLast +=	"$().PutAddtlPeopleInPicker('Hire Manager', [{" + 
					"	'name': 'Hub Tester1'," + 
					"	'email': 'sp1@mos.org'," + 
					"	'account': 'i:0#.f|membership|sp1@mos.org'" + 
					"}]);";

	fData.CustomScriptLast +=	"$().PutAddtlPeopleInPicker('Status Change Staff Member', [{" + 
					"	'name': 'James Baker'," + 
					"	'email': 'jbaker@mos.org'," + 
					"	'account': 'i:0#.f|membership|jbaker@mos.org'" + 
					"}]);";

	fData.CustomScriptLast +=	"$().PutAddtlPeopleInPicker('Position Change Previous Manager', [{" + 
					"	'name': 'Hub Tester2'," + 
					"	'email': 'sp2@mos.org'," + 
					"	'account': 'i:0#.f|membership|sp2@mos.org'" + 
					"}]);";

	fData.CustomScriptLast +=	"$().PutAddtlPeopleInPicker('Position Change Manager', [{" + 
					"	'name': 'Hub Tester3'," + 
					"	'email': 'sp3@mos.org'," + 
					"	'account': 'i:0#.f|membership|sp3@mos.org'" + 
					"}]);";



	// fData.CustomScriptLast +=	'$(".hidden").each(function() { $(this).removeClass("hidden"); });';


	fData.CustomScriptLast +=	'$().ProcessEARAndPARHourAndWageFields("Hire-Proposed-Hourly-Wage", "Hire-Proposed-Annualized-Salary", "Hire-Scheduled-Hours-Biweekly", "Hire-Scheduled-Hours-Annually");';
	fData.CustomScriptLast +=	'$().ProcessEARPercentFields("Hire-Percent-Salary-from-this-Account");';


	// --- OTHER

	fData.CustomScriptLast +=	'$().ProcessEARAndPARHourFields("Position-Change-Previous-Scheduled-Hours-Biweekly", "Position-Change-Previous-Scheduled-Hours-Annually");';
	fData.CustomScriptLast +=	'$().ProcessEARAndPARHourFields("Position-Change-Scheduled-Hours-Biweekly", "Position-Change-Scheduled-Hours-Annually");';
	fData.CustomScriptLast +=	'$().ProcessEARAndPARHourAndWageFields("Additional-Position-Proposed-Hourly-Wage", "Additional-Position-Proposed-Annualized-Salary", "Additional-Position-Scheduled-Hours-Biweekly", "Additional-Position-Scheduled-Hours-Annually");';
	fData.CustomScriptLast +=	'$().ProcessEARAndPARHourAndWageFields("Wage-Change-Hourly-Wage", "Wage-Change-Annualized-Salary", "Wage-Change-Scheduled-Hours-Biweekly", "Wage-Change-Scheduled-Hours-Annually");';


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
