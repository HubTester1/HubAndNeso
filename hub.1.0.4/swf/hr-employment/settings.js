
(function ($) {

	var mData = {
		'componentID': 85,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		"currentRequestVersion": 1,
		'devAdminNotifications': 1,
		'notifications': 0,
	};

	console.log("using settings m2");



	var oData = {
		'admin': {
			'buttons': [
			],
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
						'displayName': "Staff, Volunteer, Contractor Name(s)",
						'internalName': "StaffVolNames",
					}, {
						'displayName': "Start Date",
						'internalName': "StartDate",
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
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
							'	<Eq>' +
							'	  <FieldRef Name="RequestStatus"></FieldRef>' +
							'	  <Value Type="Text">Approved</Value>' +
							'	</Eq>' +
							'	<IsNull>' +
							'	  <FieldRef Name="AssignedTo"></FieldRef>' +
							'	</IsNull>' +
							'  </And>' +
							'</Where>'
					}, {
						'tableTitle': 'Assigned',
						'tableID': 'assigned',
						'someColsAreUsers': 1,
						'customCAMLQuery': '<Where>' +
							'  <And>' +
							'	<Eq>' +
							'	  <FieldRef Name="RequestStatus"></FieldRef>' +
							'	  <Value Type="Text">Approved</Value>' +
							'	</Eq>' +
							'	<IsNotNull>' +
							'	  <FieldRef Name="AssignedTo"></FieldRef>' +
							'	</IsNotNull>' +
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
								'displayName': "Staff, Volunteer, Contractor Name(s)",
								'internalName': "StaffVolNames",
							}, {
								'displayName': "Start Date",
								'internalName': "StartDate",
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
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
							}
						]
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'sortColAndOrder': [0, 'desc'],
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
								'displayName': "Staff, Volunteer, Contractor Name(s)",
								'internalName': "StaffVolNames",
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
						'displayName': "Staff Volunteer Name(s)",
						'internalName': "StaffVolNames",
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
		'standardElementGroups': {
			// 'standardPrintButton': {
			// 	'buttonText': 'Print Request',
			// 	'printFunction': 'PrintEmploymentAuthorizationRequest',
			// 	'hideForNonAdmin': [],
			// 	'hideForAdmin': [],
			// },
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				/* 'elementType': "markup",
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
			}, { */
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Job Description',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Job Description',
				'choiceSetLabel': 'Has a job description been created or updated since November 2014?',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, the job description was created or updated after November 2014'
					}, {
						'value': 'no',
						'display': 'No, a job description hasn\'t been created or updated since November 2014'
					}
				],
				'helpNotes': [
					{
						'text': "You must create or update a job description prior to submitting this request",
						'htmlID': "help-note_no-job-description",
						'emphasis': 1,
						'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
						'hideForAdmin': ['', 'Submitted', 'Cancelled']
					}
				],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#job-description_yes'],
						'show': [
							{ 'divID': 'container_primary-fieldset' },
							{ 'divID': 'submit-or-exit' },
						],
						'hide': [
							{ 'noteID': 'help-note_no-job-description' },
						],
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#job-description_no'],
						'hide': [
							{ 'divID': 'container_primary-fieldset' },
							{ 'divID': 'submit-or-exit' },
						],
						'show': [
							{ 'noteID': 'help-note_no-job-description' },
						],
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'container_primary-fieldset',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],


			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': "Job Data",
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions',
					'params': {
						'otherOptionPosition': 'top'
					}
				},
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [{
					"thisFieldNotEquals": ["other"],
					"hide": [{
						"fieldName": "Other Department"
					}],
					"optional": [{
						"fieldName": "Other Department",
						"type": "text"
					}]
				}, {
					"thisFieldEquals": ["other"],
					"show": [{
						"fieldName": "Other Department"
					}],
					"require": [{
						"fieldName": "Other Department",
						"type": "text"
					}]
				}]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Other Department",
				'labelContent': "Other Department",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Manager Name",
				'labelContent': "Approving Manager's Name",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Title",
				'labelContent': "Position Title",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Quantity",
				'labelContent': "Number of Positions Requested",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
				// }, {
				// 	'elementType': "field",
				// 	'controlType': "text",
				// 	'fieldName': "Grade",
				// 	'labelContent': "Grade",
				// 	'requiredForNonAdmin': [""],
				// 	'requiredForAdmin': [""],
				// 	'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				// 	'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "select",
				'fieldName': "Grade",
				'labelContent': "Grade",
				"setOptions": [
					{
						"value": "Intern",
						"display": "Intern"
					}, {
						"value": "25",
						"display": "25"
					}, {
						"value": "26",
						"display": "26"
					}, {
						"value": "27",
						"display": "27"
					}, {
						"value": "28",
						"display": "28"
					}, {
						"value": "29",
						"display": "29"
					}, {
						"value": "30",
						"display": "30"
					}, {
						"value": "31",
						"display": "31"
					}, {
						"value": "32",
						"display": "32"
					}, {
						"value": "33",
						"display": "33"
					}, {
						"value": "34",
						"display": "34"
					}, {
						"value": "35",
						"display": "35"
					}, {
						"value": "36",
						"display": "36"
					}, {
						"value": "37",
						"display": "37"
					}, {
						"value": "38",
						"display": "38"
					}, {
						"value": "39",
						"display": "39"
					}, {
						"value": "40",
						"display": "40"
					}, {
						"value": "41",
						"display": "41"
					}, {
						"value": "42",
						"display": "42"
					}, {
						"value": "43",
						"display": "43"
					}, {
						"value": "44",
						"display": "44"
					}, {
						"value": "45",
						"display": "45"
					}, {
						"value": "46",
						"display": "46"
					}
				],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Employee Classification",
				"labelContent": "Employee Classification",
				"setOptions": [
					{
						"value": "Regular FT",
						"display": "Regular, Full-time"
					}, {
						"value": "Regular PT",
						"display": "Regular, Part-time"
						// }, {
						// 	"value": "Casual FT",
						// 	"display": "Casual, Full-time"
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
						// }, {
						// 	"value": "Campaign FT",
						// 	"display": "Campaign, Full-time"
						// }, {
						// 	"value": "Campaign PT",
						// 	"display": "Campaign, Part-time"
					}, {
						"value": "Intern",
						"display": "Intern"
						// }, {
						// 	"value": "Intern FT",
						// 	"display": "Intern, Full-time"
						// }, {
						// 	"value": "Intern PT",
						// 	"display": "Intern, Part-time"
					}, {
						"value": "Fellow FT",
						"display": "Fellow, Full-time"
					}, {
						"value": "Fellow PT",
						"display": "Fellow, Part-time"
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [{
					"thisFieldEquals": ["Regular FT", "Regular PT"],
					"hide": [{
						"fieldName": "Proposed End Date"
					}],
					"optional": [{
						"fieldName": "Proposed End Date",
						"type": "datePicker"
					}]
				}, {
					"thisFieldNotEquals": ["Regular FT", "Regular PT"],
					"show": [{
						"fieldName": "Proposed End Date"
					}],
					"require": [{
						"fieldName": "Proposed End Date",
						"type": "datePicker"
					}]
				}]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Scheduled Hours Biweekly",
				'labelContent': "Scheduled Hours, Biweekly",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'htmlClass': 'auto-populated',
				'fieldName': "Scheduled Hours Annually",
				'labelContent': "Scheduled Hours, Annually",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Proposed Hourly Wage",
				'labelContent': "Proposed Hourly Wage",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'htmlClass': 'auto-populated',
				'fieldName': "Proposed Annualized Salary",
				'labelContent': "Proposed Annualized Salary",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Proposed Start Date",
				'labelContent': "Proposed Start Date",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Proposed End Date",
				'labelContent': "Proposed End Date",
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "radio",
				'fieldName': "Overtime Status",
				'choiceSetLabel': "Overtime Status",
				'choices': [
					{
						'value': "exempt",
						'display': "Exempt"
					}, {
						'value': "nonexempt",
						'display': "Non-exempt"
					}
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Schedule",
				'labelContent': "What is the work schedule for this position?",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled']







			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Funding Source",
				"labelContent": "Funding Source",
				"setOptions": [
					{
						// 	"value": "Campaign Funds",
						// 	"display": "Campaign Funds"
						// }, {
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
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [
					{
						"thisFieldNotEquals": ["Grant Funds", "Endowment Funds"],
						"hide": [{
							"divID": "account-numbers-sets"
						}],
						"optional": [
							{
								"fieldName": "Grant Project Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Grant Source Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Percent Salary from this Account",
								"type": "text",
								'repeatable': 1
							}
						]
					}, {
						"thisFieldEquals": ["Grant Funds", "Endowment Funds"],
						"show": [{
							"divID": "account-numbers-sets"
						}],
						"require": [
							{
								"fieldName": "Grant Project Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Grant Source Code",
								"type": "text",
								'repeatable': 1
							}, {
								"fieldName": "Percent Salary from this Account",
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
				'fieldName': "Grant Project Code",
				'labelContent': "Grant Project Code",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				// 'helpNotes': [
				// 	{
				// 		'text': "E.g., https'://matrix.mos.org/depts/iit",
				// 		'htmlID': "intranet-url_help-note",
				// 		'hideForNonAdmin': ['Submitted', 'Cancelled'],
				// 		'hideForAdmin': ['Submitted', 'Cancelled']
				// 	}
				// ]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Grant Source Code",
				'labelContent': "Grant Source Code",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				// 'helpNotes': [
				// 	{
				// 		'text': "E.g., view, edit, receive notifications, etc.",
				// 		'htmlID': "intranet-access-type_help-note",
				// 		'hideForNonAdmin': ['Submitted', 'Cancelled'],
				// 		'hideForAdmin': ['Submitted', 'Cancelled']
				// 	}
				// ]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Percent Salary from this Account",
				'labelContent': "Percent Salary from this Account",
				'htmlClass': 'format-percent',
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				// 'helpNotes': [
				// 	{
				// 		'text': "E.g., view, edit, receive notifications, etc.",
				// 		'htmlID': "intranet-access-type_help-note",
				// 		'hideForNonAdmin': ['Submitted', 'Cancelled'],
				// 		'hideForAdmin': ['Submitted', 'Cancelled']
				// 	}
				// ]
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
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Workspace Approved',
				'choiceSetLabel': 'Workspace Approved by Facilities?',
				'choices': [
					{
						'value': 'approved',
						'display': 'Yes, Facilities has approved a workspace for this position'
					}, {
						'value': 'unneeded',
						'display': 'No, but a workspace is not needed for this position'
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Job Opening Reason',
				'choiceSetLabel': 'Why are you submitting this request?',
				'choices': [
					{
						'value': 'backfill',
						'display': 'Backfill'
					}, {
						'value': 'promotion',
						'display': 'Promotion'
					}, {
						'value': 'wageOrScheduleChange',
						'display': 'Wage / Schedule Change'
					}, {
						'value': 'additionToFTE',
						'display': 'Addition to Budgeted FTE'
					}
				],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#job-opening-reason_backfill'],
						'show': [
							{ 'fieldName': 'Backfill For' },
							{ 'fieldName': 'Replacement Salary' },
						],
						"require": [
							{
								"fieldName": "Backfill For",
								"type": "text"
							}, {
								"fieldName": "Replacement Salary",
								"type": "text"
							}
						],
						'hide': [
							{ 'fieldName': 'Promotion For' },
							{ 'fieldName': 'Wage or Schedule Change For' },
						],
						"optional": [
							{
								"fieldName": "Promotion For",
								"type": "text"
							}, {
								"fieldName": "Wage or Schedule Change For",
								"type": "text"
							}
						],
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#job-opening-reason_promotion'],
						'show': [
							{ 'fieldName': 'Promotion For' },
							{ 'fieldName': 'Replacement Salary' },
						],
						"require": [
							{
								"fieldName": "Promotion For",
								"type": "text"
							}, {
								"fieldName": "Replacement Salary",
								"type": "text"
							}
						],
						'hide': [
							{ 'fieldName': 'Backfill For' },
							{ 'fieldName': 'Wage or Schedule Change For' },
						],
						"optional": [
							{
								"fieldName": "Backfill For",
								"type": "text"
							}, {
								"fieldName": "Wage or Schedule Change For",
								"type": "text"
							}
						],
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#job-opening-reason_wageorschedulechange'],
						'show': [
							{ 'fieldName': 'Wage or Schedule Change For' },
							{ 'fieldName': 'Replacement Salary' },
						],
						"require": [
							{
								"fieldName": "Wage or Schedule Change For",
								"type": "text"
							}, {
								"fieldName": "Replacement Salary",
								"type": "text"
							}
						],
						'hide': [
							{ 'fieldName': 'Backfill For' },
							{ 'fieldName': 'Promotion For' },
						],
						"optional": [
							{
								"fieldName": "Backfill For",
								"type": "text"
							}, {
								"fieldName": "Promotion For",
								"type": "text"
							}
						],
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#job-opening-reason_additiontofte'],
						'hide': [
							{ 'fieldName': 'Backfill For' },
							{ 'fieldName': 'Promotion For' },
							{ 'fieldName': 'Wage or Schedule Change For' },
							{ 'fieldName': 'Replacement Salary' },
						],
						"optional": [
							{
								"fieldName": "Backfill For",
								"type": "text"
							}, {
								"fieldName": "Promotion For",
								"type": "text"
							}, {
								"fieldName": "Wage or Schedule Change For",
								"type": "text"
							}, {
								"fieldName": "Replacement Salary",
								"type": "text"
							}
						],
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Backfill For",
				'labelContent': "Backfill for whom?",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Promotion For",
				'labelContent': "Promotion for whom?",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Wage or Schedule Change For",
				'labelContent': "Wage / Schedule Change for whom?",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],

				/* }, {
					'elementType': "field",
					'controlType': "text",
					'fieldName': "Grant Funding Source",
					'labelContent': "Grant Funding Source",
					'disabledForNonAdmin': ['Submitted', 'Cancelled'],
					'disabledForAdmin': ['Submitted', 'Cancelled'],
					"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
					"hideForAdmin": ['', 'Submitted', 'Cancelled'],
					'helpNotes': [
						{
							'text': "For restricted funding sources, please specify both Source Number and Name, e.g. 4512 NSF Star Wars Grant.",
							'htmlID': "help-note_grant-funding-source",
							'hideForNonAdmin': ['Submitted', 'Cancelled'],
							'hideForAdmin': ['Submitted', 'Cancelled']
						}
					],
				}, {
					'elementType': 'field',
					'controlType': 'radio',
					'fieldName': 'HRC Grading',
					'choiceSetLabel': 'HRC Grading',
					'choices': [
						{
							'value': 'graded',
							'display': 'Graded by HRC'
						}, {
							'value': 'pending',
							'display': 'HRC Grading is Pending'
						}
					],
					"requiredForNonAdmin": [""],
					"requiredForAdmin": [""],
					'hideForNonAdmin': ['Submitted', 'Cancelled'],
					'hideForAdmin': ['Submitted', 'Cancelled'],
					"onChange": [{
						"thisFieldEquals": ["pending"],
						"hide": [{
							"fieldName": "HRC Last Updated"
						}],
						"optional": [{
							"fieldName": "HRC Last Updated",
							"type": "datePicker"
						}]
					}, {
						"thisFieldEquals": ["graded"],
						"show": [{
							"fieldName": "HRC Last Updated"
						}],
						"require": [{
							"fieldName": "HRC Last Updated",
							"type": "datePicker"
						}]
					}]
				}, {
					'elementType': "field",
					'controlType': "datePicker",
					'fieldName': "HRC Last Updated",
					'labelContent': "On what date was HRC grading last updated?",
					'disabledForNonAdmin': ['Submitted', 'Cancelled'],
					'disabledForAdmin': ['Submitted', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted', 'Cancelled'], */



			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Replacement Salary",
				'labelContent': "What was the last annual salary paid for this position?",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Salary Change",
				'labelContent': "Salary Change",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Salary Change Reason",
				'labelContent': "Salary Change Reason",
				'disabledForNonAdmin': ['Submitted', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'end': 1,
				'content': '<h2>Process</h2>' +
					'<a id="standard-printer-button-inside-request" data-print-function="PrintEmploymentAuthorizationRequest">Print Request</a>' +
					'<p>Print this request, acquire appropriate signatures, and submit it to Human Resources.</p>'
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';
	fData.CustomScriptLast = '';


	/* fData.CustomScriptLast += '$("input#job-description_yes").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast +=	'$("input#overtime-status_exempt").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast +=	'$("input#workspace-approved_approved").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast +=	'$("input#job-opening-reason_replacement").prop("checked", true).attr("checked", true); \n';
	// fData.CustomScriptLast +=	'$("input#job-opening-reason_grant").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast +=	'$("input#hrc-grading_graded").prop("checked", true).attr("checked", true); \n';
	// fData.CustomScriptLast +=	'$("input#XXXXXXXXXXXXXXXX").prop("checked", true).attr("checked", true); \n';


	fData.CustomScriptLast += '$("select#Department option[value=\'Accounting\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#Grade option[value=\'25\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Employee-Classification option[value=\'Grant FT\']").attr("selected","selected"); \n';
	fData.CustomScriptLast +=	'$("select#Funding-Source option[value=\'Grant Funds\']").attr("selected","selected"); \n';
	// fData.CustomScriptLast +=	'$("select#XXXXXXXXXXXXXXXX option[value=\'XXXXXXXXXXXXXXXX\']").attr("selected","selected"); \n';


	fData.CustomScriptLast +=	'$("input#Position-Title").val("Position Title"); \n';
	fData.CustomScriptLast +=	'$("input#Grade").val("Grade 1"); \n';
	// fData.CustomScriptLast +=	'$("input#Scheduled-Hours-Biweekly").val("80"); \n';
	// fData.CustomScriptLast +=	'$("input#Scheduled-Hours-Annually").val("2080"); \n';
	// fData.CustomScriptLast +=	'$("input#Proposed-Hourly-Wage").val("35"); \n';
	// fData.CustomScriptLast +=	'$("input#Proposed-Annualized-Salary").val("72000"); \n';
	fData.CustomScriptLast +=	'$("input#Proposed-Start-Date").val("June 26, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Proposed-End-Date").val("June 27, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Grant-Project-Code").val("123"); \n';
	fData.CustomScriptLast +=	'$("input#Grant-Source-Code").val("4567"); \n';
	fData.CustomScriptLast +=	'$("input#Percent-Salary-from-this-Account").val("49"); \n';
	fData.CustomScriptLast +=	'$("input#Grant-Funding-Source").val("This grant funding source"); \n';
	// fData.CustomScriptLast +=	'$("input#HRC-Last-Updated").val("June 28, 2018"); \n';
	fData.CustomScriptLast +=	'$("input#Backfill-For").val("Backfill Name"); \n';
	fData.CustomScriptLast +=	'$("input#Promotion-For").val("Promotion Name"); \n';
	fData.CustomScriptLast +=	'$("input#Wage-or-Schedule-Change-For").val("Wage Change Name"); \n';
	// fData.CustomScriptLast +=	'$("input#Replacement-Salary").val("71000"); \n';
	// fData.CustomScriptLast +=	'$("input#XXXXXXXXXXXXXXXX").val("XXXXXXXXXXXXX"); \n';


	fData.CustomScriptLast +=	'$("textarea#Schedule").val("M-F, 9-5"); \n';
	// fData.CustomScriptLast +=	'$("textarea#XXXXXXXXXXXXXXXX").val("XXXXXXXXXXXXX"); \n';









	fData.CustomScriptLast += '$("div.subsection-container, div#container_primary-fieldset").each(function() { $(this).removeClass("hidden"); });'; */

	fData.CustomScriptLast += '$("input#Proposed-Hourly-Wage, input#Scheduled-Hours-Biweekly, input#Replacement-Salary").on("change", function() { \n' +
		'console.log("firing");' +
		'	$().ProcessEARAndPARHourAndWageFields("Proposed-Hourly-Wage", "Proposed-Annualized-Salary", "Scheduled-Hours-Biweekly", "Scheduled-Hours-Annually", "Replacement-Salary");\n' +
		'}); \n';

	fData.CustomScriptLast += '$("div#request-form").on("change", "input.format-percent", function() { \n' +
		'	$().ProcessEARPercentFields($(this).attr("id"));\n' +
		'}); \n';




	/* fData.CustomScriptLast += 
		'$("input#Replacement-Salary").on("change", function () { ' +
		'	var replacementSalaryString = $("input#Replacement-Salary").val().replace("\$", "").replace(/[,]/g, "");' +
		'	if (replacementSalaryString != "") {' +
		'		$().ValidateInRealTimeForPositiveNumberInUSDFormat(replacementSalaryString, "input#Replacement-Salary");' +
		'	}' +
		'});'; */






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
