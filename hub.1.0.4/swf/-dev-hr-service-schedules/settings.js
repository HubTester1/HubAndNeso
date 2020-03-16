(function ($) {

	// GSE Schedule 2

	var mData = {
		'componentID': 20159,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		'currentRequestVersion': 2,
		'devAdminNotifications': 1,
		'notifications': 1,
		'detailTitle': [
			{
				'roles': ['gseHRAdmin', 'gseJobAdmin', 'gseManager'],
				'title': 'GSE Schedule'
			// }, {
			// 	'roles': ['gseUserOnly'],
			// 	'title': 'GSE Signup Opportunity'
			}
		]
	};

	console.log("using settings m1");

	var oData = {
		
		// screen 2.3
		'gseSchedulesListHRAdmin': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?f=cal",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Stats",
					"href": "/sites/hr-service-config/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Configuration",
					"href": "/sites/hr-service-config/SitePages/App.aspx?r=1",
					"target": null
				}
			],
		},
		
		// screen 2.3
		'gseSchedulesListJobAdmin': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?f=cal",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
					"target": null
				}
			],
		},
		
		// screen 2.3
		'gseSchedulesListManager': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null,
					"restrictedToRoles": ["gseJobAdmin"]
				}, {
					"linkType": "goForward",
					"anchorText": "My and My Staff Members' Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?f=cal",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My and My Staff Members' Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
					"target": null
				}
			],
		},
		
		// screen 2.3
		'gseSchedulesListStaff': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Signup Opportunities Calendar",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?f=cal",
					"target": null
				}
			],
		},
		



		// screen 2.2
		'gseSchedulesCalendarHRAdmin': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule List",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Stats",
					"href": "/sites/hr-service-config/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Configuration",
					"href": "/sites/hr-service-config/SitePages/App.aspx?r=1",
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
		
		// screen 2.2
		'gseSchedulesCalendarJobAdmin': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule List",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
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
		},
		
		// screen 2.2
		'gseSchedulesCalendarManager': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My and My Staff Members' Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule List",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My and My Staff Members' Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
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
		},
		
		// screen 2.2
		'gseSchedulesCalendarStaff': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Schedule",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Signup Opportunities List",
					"href": "/sites/hr-service-schedules/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Signups",
					"href": "/sites/hr-service-signups/SitePages/App.aspx",
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
		'autoTrackGSEScheduleStatuses': 1,
		'autoProcessGSESignupCreditFromSchedule': 1,
		'bypassNormalDataSaving': [''],
		'customDataSavingFunction': {
			'useFunction': 'ReturnNewGSESchedulesSubmissionValuePairArrayOfArrays',
			'requestStatuses': ['']
		},
		'alwaysTalkToRequester': 1,
		'additionalViewPermissionsFunction': 'ReturnGSEScheduleAdditionalViewAccess',
		'standardElementGroups': {
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Cancel", "display": "This schedule is cancelled" }
				]
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'gseScheduleNotifications': 1,
		'versioningMatters': 0,

		'uniqueElements': [
			{

			// 	'elementType': 'field',
			// 	'controlType': 'url',
			// 	'fieldName': 'Quark Request',
			// 	'labelContent': 'On Quark',
			// 	'editableForNonAdmin': [],
			// 	'editableForAdmin': [],
			// }, {
				"elementType": "markup",
				"tag": "h2",
				"content": "This Schedule",
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
				"labelContent": "Schedule ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Schedule Creation Date",
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
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Nickname",
				"labelContent": "Schedule Nickname",
				"listFieldName": "Title",
				"helpNotes": [{
					"text": "Give this schedule a name you can reference later",
					"htmlID": "request-nickname_help-note",
					"urgent": 0,
					"hideForNonAdmin": ["Submitted", "Completed", "Cancelled"],
					"hideForAdmin": ["Submitted", "Completed", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["Submitted", "Completed", "Cancelled"]
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
				"hideForNonAdmin": ["Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["Submitted", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Cancelled"],
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
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this schedule"
				}],
				"hideForNonAdmin": ["", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"]
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
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
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1
			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': "Job",
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'listItemChooser',
				'fieldName': 'GSE Job Request ID',
				'listFieldName': 'JobID',
				'editableLabelContent': 'GSE Job Request ID',
				'nonEditableLabelContent': 'GSE Job Request',
				'choosingAnchorContent': 'Select from your approved requests',
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],
				'dialogTitle': 'My Approved Jobs',
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
							'displayName': 'Job Title',
							'internalName': 'JobTitle',
						}, {
							'displayName': 'Created',
							'internalName': 'RequestDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Last Modified',
							'internalName': 'Modified',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}
					],
					'tables': [
						{
							'tableID': 'list-item-view',
							'webURL': 'https://bmos.sharepoint.com/sites/hr-service-jobs',
							'devWebURL': 'https://bmos.sharepoint.com/sites/-dev-hr-service-jobs',
							'myRSQueryRelevantStatus': 'Approved',
							'getRequesterFrom': 'JobAdmin',
							'sortColAndOrder': [0, 'desc']
						}
					]
				},
				'addtlValidationType': 'validPositiveInteger',
				'hideButtonForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'hideButtonForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]			
			
			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': "Schedule Details",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "StartTime",
				'listFieldName': "StartTime",
				'labelContent': "Start Time",
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]
			/*
				CORONAVIRUS MOD
				schedules no longer half or full days
			*/

			}, {
				'elementType': "field",
				'controlType': "radio",
				'requestVersion': 1,
				'fieldName': "ShiftLength",
				'listFieldName': "ShiftLength",
				'choiceSetLabel': "Shift Length",
				"choices": [
					{
						"value": "3.5 hours",
						"display": "This is a half-day shift"
					}, {
						"value": "7.5 hours",
						"display": "This is a full-day shift"
					}
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"onChange": [
					{
						"thisFieldEquals": ["3.5 hours"],
						"hide": [
							{ "fieldName": "Meal Time" },
							{ "fieldName": "Break Time" },
						],
						"optional": [
							{ "fieldName": "Meal Time", "type": "time" },
							{ "fieldName": "Break Time", "type": "time" },
						],
					}, {
						"thisFieldEquals": ["7.5 hours"],
						"show": [
							{ "fieldName": "Meal Time" },
							{ "fieldName": "Break Time" },
						],
						"require": [
							{ "fieldName": "Meal Time", "type": "time" },
							{ "fieldName": "Break Time", "type": "time" },
						],
					}
				]
			/*
				CORONAVIRUS MOD
				schedule durations now in hours
			*/
			}, {
				'elementType': "field",
				'controlType': "text",
				'requestVersion': 2,
				'fieldName': "Hours",
				'listFieldName': "Hours",
				'labelContent': "How many hours will this last?",
				'addtlValidationType': 'validPositiveFloat',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],





			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Number of Positions",
				'listFieldName': "NumberOfPositions",
				'labelContent': "Number of Positions",
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]

			/*
				CORONAVIRUS MOD
				During closure, durations are open-ended. Meal and break scheduling is optional.
			*/
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "Meal Time",
				'labelContent': "Meal Time",
				// 'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				// 'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "Break Time",
				'labelContent': "Break Time",
				// 'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				// 'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Notes",
				'labelContent': "Notes",
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Individual or Pattern',
				'choiceSetLabel': 'Use Individual Dates or a Pattern of Repeating Dates?',
				'choices': [
					{
						'value': 'individual',
						'display': 'Individual Dates'
					}, {
						'value': 'pattern',
						'display': 'Pattern of Repeating Dates'
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				'hideForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["Submitted", "Completed", "Cancelled"],
				'helpNotes': [
					{
						'text': "Must be tomorrow or later. Earlier dates will be ignored.",
						'htmlID': "future-warning",
						'hideForNonAdmin': ["Completed", "Cancelled"],
						'hideForAdmin': ["Completed", "Cancelled"]
					}, {
						'text': "This will create individual schdules for the dates that fit your pattern. Your pattern won't be saved, but you'll be able to cancel the individual schedules.",
						'htmlID': "individual-date-warning",
						'emphasis': 1,
						'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
						'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]
					}
				],
				'onChange': [
					{ 
						'thisFieldEquals': ['individual'],
						'show': [{ 'divID': 'simple-dates' }],
						'require': [{ 'fieldName': 'Repeating Date', 'type': 'datepicker', 'repeatable': 1 }],
						'hide': [
							{ 'divID': 'pattern-and-range' },
							{ 'noteID': "individual-date-warning" }
						],
						'optional': [
							{ 'fieldName': 'Pattern Basis', 'type': 'select' }, 
							{ 'fieldName': 'Start Date', 'type': 'datePicker' }, 
							{ 'fieldName': 'Ending Basis', 'type': 'select' }
						]
					}, { 
						'thisFieldEquals': ['pattern'],
						'show': [
							{ 'divID': 'pattern-and-range' },
							{ 'noteID': "individual-date-warning" }
						],
						'require': [
							{ 'fieldName': 'Pattern Basis', 'type': 'select' }, 
							{ 'fieldName': 'Start Date', 'type': 'datePicker' }, 
							{ 'fieldName': 'Ending Basis', 'type': 'select' }
						], 
						'hide': [{ 'divID': 'simple-dates' }], 
						'optional': [{ 'fieldName': 'Repeating Date', 'type': 'datepicker', 'repeatable': 1 }]
					},
				],


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'simple-dates',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'simple-date',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Repeating Date',
				'labelContent': 'Date',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlClass': 'remove-section-anchor',
				'content': 'Remove this Date',
				'removeThisRepeat': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-simple-date',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert a Date',
				'repeatSectionID': 'simple-date',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1










			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern-and-range',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]












			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern-basis',
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Pattern Basis',
				'labelContent': 'Occurs',
				"setOptions": [
					{ "value": "xDays", "display": "Every given number of days" },
					{ "value": "weekdays", "display": "Every weekday" },
					{ "value": "xWeeks", "display": "Every given number of weeks" },
					{ "value": "monthlySameDay", "display": "The same day every given number of months" },
					{ "value": "monthlySameWeek", "display": "The same week every given number of months" },
					{ "value": "yearlySameDay", "display": "The same day each year" },
					{ "value": "yearlySameWeek", "display": "The same week each year" }
				],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"onChange": [
					{
						"thisFieldEquals": ["xDays"],

						"show": [{ "divID": "pattern_x-days" }],
						"require": [{ "fieldName": "X Days", "type": "text" }],
						"hide": [
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Monthly Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["weekdays"],

						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Monthly Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["xWeeks"],

						"show": [{ "divID": "pattern_x-weeks" },],
						"require": [
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Monthly Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["monthlySameDay"],

						"show": [{ "divID": "pattern_monthly-same-day" },],
						"require": [
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Monthly Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["monthlySameWeek"],

						"show": [{ "divID": "pattern_monthly-same-week" },],
						"require": [
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Monthly Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["yearlySameDay"],

						"show": [{ "divID": "pattern_yearly-same-day" },],
						"require": [
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Monthly Date for Same Date Each Year", "type": "text" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
						"set": [
							{
								"fieldName": "Monthly Date for Same Date Each Year",
								"type": "text",
								"method": "dynamic",
								"value": "$().ReturnFormattedDateTime('nowLocal', null, 'D', null)"
							}
						]
					}, {
						"thisFieldEquals": ["yearlySameWeek"],

						"show": [{ "divID": "pattern_yearly-same-week" }],
						"require": [
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Monthly Date for Same Date Each Year", "type": "text" },
						],
					}

				]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1






			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_x-days',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]

				// X days

			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Days",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"helpNotes": [
					{
						"text": "day(s)",
						"htmlID": "x-days_help-note",
						"urgent": 0,
					}
				],
				'onChange': [
					{
						'thisFieldIsPositiveInteger': 1,
						'removeError': [
							{ 'fieldName': "X Days" }
						]
					}, {
						'thisFieldIsPositiveInteger': 0,
						'setError': [
							{ 'fieldName': "X Days", "message": "Please enter a valid positive integer" }
						]
					}
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_x-weeks',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]

				// Weekly
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Weeks",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"helpNotes": [
					{
						"text": "week(s)",
						"htmlID": "x-weeks_help-note",
						"urgent": 0,
					}
				],
				'onChange': [
					{
						'thisFieldIsPositiveInteger': 1,
						'removeError': [
							{ 'fieldName': "X Weeks" }
						]
					}, {
						'thisFieldIsPositiveInteger': 0,
						'setError': [
							{ 'fieldName': "X Weeks", "message": "Please enter a valid positive integer" }
						]
					}
				],
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Days of Week for X Weeks",
				"choiceSetLabel": "On",
				"choices": [
					{
						"value": "1",
						"display": "Sunday"
					}, {
						"value": "2",
						"display": "Monday"
					}, {
						"value": "3",
						"display": "Tuesday"
					}, {
						"value": "4",
						"display": "Wednesday"
					}, {
						"value": "5",
						"display": "Thursday"
					}, {
						"value": "6",
						"display": "Friday"
					}, {
						"value": "7",
						"display": "Saturday"
					}
				],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_monthly-same-day',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]

				// Monthly same day
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Months For Same Day",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"helpNotes": [
					{
						"text": "month(s)",
						"htmlID": "x-months-for-same-day_help-note",
						"urgent": 0,
					}
				],
				'onChange': [
					{
						'thisFieldIsPositiveInteger': 1,
						'removeError': [
							{ 'fieldName': "X Months For Same Day" }
						]
					}, {
						'thisFieldIsPositiveInteger': 0,
						'setError': [
							{ 'fieldName': "X Months For Same Day", "message": "Please enter a valid positive integer" }
						]
					}
				],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Day of Month for X Months",
				"labelContent": "On",
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"helpNotes": [
					{
						"text": "day of month",
						"htmlID": "day-of-month-for-x-months_help-note",
						"urgent": 0,
					}
				],
				'onChange': [
					{
						'thisFieldIsPositiveInteger': 1,
						'removeError': [
							{ 'fieldName': "Day of Month for X Months" }
						]
					}, {
						'thisFieldIsPositiveInteger': 0,
						'setError': [
							{ 'fieldName': "Day of Month for X Months", "message": "Please enter a valid positive integer" }
						]
					}
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_monthly-same-week',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]

				// Monthly same week
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Months For Same Week",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"helpNotes": [
					{
						"text": "month(s)",
						"htmlID": "x-months-for-same-week_help-note",
						"urgent": 0,
					}
				],
				'onChange': [
					{
						'thisFieldIsPositiveInteger': 1,
						'removeError': [
							{ 'fieldName': "X Months For Same Week" }
						]
					}, {
						'thisFieldIsPositiveInteger': 0,
						'setError': [
							{ 'fieldName': "X Months For Same Week", "message": "Please enter a valid positive integer" }
						]
					}
				],
			}, {
				'elementType': 'multifield',
				'multifieldName': 'Ordinal and Day of Week For X Months For Same Week',
				'labelContent': 'On <span class="hidden">Which Day of the Month?</span>',
				'subfields': [
					{
						'controlType': 'select',
						'subfieldName': 'Ordinal For Day of Week For X Months For Same Week',
						"setOptions": [
							{ "value": "1", "display": "First" },
							{ "value": "2", "display": "Second" },
							{ "value": "3", "display": "Third" },
							{ "value": "4", "display": "Fourth" }
						],
						'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
					}, {
						'controlType': 'select',
						'subfieldName': 'Days of Week For X Months For Same Week',
						"setOptions": [
							{ "value": "Sunday", "display": "Sunday" },
							{ "value": "Monday", "display": "Monday" },
							{ "value": "Tuesday", "display": "Tuesday" },
							{ "value": "Wednesday", "display": "Wednesday" },
							{ "value": "Thursday", "display": "Thursday" },
							{ "value": "Friday", "display": "Friday" },
							{ "value": "Saturday", "display": "Saturday" }
						],
						'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
					}
				]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_yearly-same-day',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]

				// Yearly same day

			}, {
				'elementType': 'multifield',
				'multifieldName': 'Month and Monthly Date for Same Date Each Year',
				'labelContent': 'On <span class="hidden">Which Day of the Month?</span>',
				'subfields': [
					{
						'controlType': 'select',
						'subfieldName': 'Months for Same Date Each Year',
						"setOptions": [
							{ "value": "1", "display": "January" },
							{ "value": "2", "display": "February" },
							{ "value": "3", "display": "March" },
							{ "value": "4", "display": "April" },
							{ "value": "5", "display": "May" },
							{ "value": "6", "display": "June" },
							{ "value": "7", "display": "July" },
							{ "value": "8", "display": "August" },
							{ "value": "9", "display": "September" },
							{ "value": "10", "display": "October" },
							{ "value": "11", "display": "November" },
							{ "value": "12", "display": "December" }
						],
						'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
					}, {
						'controlType': 'text',
						'subfieldName': 'Monthly Date for Same Date Each Year',
						'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
					}
				],
				'onChange': [
					{
						'fieldIsPositiveInteger': {
							"fieldName": "Monthly Date for Same Date Each Year",
							"value": 1
						},
						'removeError': [
							{ 'fieldName': "Monthly Date for Same Date Each Year" }
						]
					}, {
						'fieldIsPositiveInteger': {
							"fieldName": "Monthly Date for Same Date Each Year",
							"value": 0
						},
						'setError': [
							{ 'fieldName': "Monthly Date for Same Date Each Year", "message": "Please enter a valid positive integer" }
						]
					}
				],

				//}, {
				//    'elementType': 'field',
				//    'controlType': 'select',
				//    'fieldName': 'Months for Same Date Each Year',
				//    'labelContent': 'On <span class="hidden">Which Month</span>',
				//    "setOptions": [
				//        { "value": "1", "display": "January" },
				//        { "value": "2", "display": "February" },
				//        { "value": "3", "display": "March" },
				//        { "value": "4", "display": "April" },
				//        { "value": "5", "display": "May" },
				//        { "value": "6", "display": "June" },
				//        { "value": "7", "display": "July" },
				//        { "value": "8", "display": "August" },
				//        { "value": "9", "display": "September" },
				//        { "value": "10", "display": "October" },
				//        { "value": "11", "display": "November" },
				//        { "value": "12", "display": "December" }
				//    ],
				//}, {
				//    "elementType": "field",
				//    "controlType": "text",
				//    "fieldName": "Monthly Date for Same Date Each Year",
				//    "labelContent": '<span class="hidden">On Which Day of the Month</span>',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_yearly-same-week',
				'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]

				// Yearly same week






			}, {
				'elementType': 'multifield',
				'multifieldName': 'Ordinal and Day of Week For Same Week Each Year',
				'labelContent': 'On <span class="hidden">Which Week?</span>',
				'subfields': [
					{
						'controlType': 'select',
						'subfieldName': 'Ordinal For Same Week Each Year',
						"setOptions": [
							{ "value": "1", "display": "First" },
							{ "value": "2", "display": "Second" },
							{ "value": "3", "display": "Third" },
							{ "value": "4", "display": "Fourth" }
						],
						'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
					}, {
						'controlType': 'select',
						'subfieldName': 'Days of Week For Same Week Each Year',
						"setOptions": [
							{ "value": "Sunday", "display": "Sunday" },
							{ "value": "Monday", "display": "Monday" },
							{ "value": "Tuesday", "display": "Tuesday" },
							{ "value": "Wednesday", "display": "Wednesday" },
							{ "value": "Thursday", "display": "Thursday" },
							{ "value": "Friday", "display": "Friday" },
							{ "value": "Saturday", "display": "Saturday" }
						],
						'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
					}
				]


				//}, {
				//    'elementType': 'field',
				//    'controlType': 'select',
				//    'fieldName': 'Ordinal For Same Week Each Year',
				//    'labelContent': 'On <span class="hidden">Which Week</span>',
				//    "setOptions": [
				//        { "value": "1", "display": "First" },
				//        { "value": "2", "display": "Second" },
				//        { "value": "3", "display": "Third" },
				//        { "value": "4", "display": "Fourth" }
				//    ],
				//}, {
				//    'elementType': 'field',
				//    'controlType': 'select',
				//    'fieldName': 'Days of Week For Same Week Each Year',
				//    'labelContent': '<span class="hidden">On Which Day of the Week</span>',
				//    "setOptions": [
				//        { "value": "Sunday", "display": "Sunday" },
				//        { "value": "Monday", "display": "Monday" },
				//        { "value": "Tuesday", "display": "Tuesday" },
				//        { "value": "Wednesday", "display": "Wednesday" },
				//        { "value": "Thursday", "display": "Thursday" },
				//        { "value": "Friday", "display": "Friday" },
				//        { "value": "Saturday", "display": "Saturday" }
				//    ],




			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Months for Same Week Each Year',
				'labelContent': 'In',
				"setOptions": [
					{ "value": "1", "display": "January" },
					{ "value": "2", "display": "February" },
					{ "value": "3", "display": "March" },
					{ "value": "4", "display": "April" },
					{ "value": "5", "display": "May" },
					{ "value": "6", "display": "June" },
					{ "value": "7", "display": "July" },
					{ "value": "8", "display": "August" },
					{ "value": "9", "display": "September" },
					{ "value": "10", "display": "October" },
					{ "value": "11", "display": "November" },
					{ "value": "12", "display": "December" }
				],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1












			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Start Date',
				'labelContent': 'Start Date',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Ending Basis',
				'labelContent': 'Ends',
				"setOptions": [
					// { "value": "never", "display": "Never" },
					{ "value": "xOccurrences", "display": "After a given number of occurrences" },
					{ "value": "date", "display": "By a date" }
				],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				"onChange": [
					{
						"thisFieldEquals": ["never"],
						"show": [],
						"require": [],
						"hide": [
							{ "divID": "range_x-occurrences" },
							{ "divID": "range_ending-date" },
						],
						"optional": [
							{ "fieldName": "Qty Occurrences", "type": "text" },
							{ "fieldName": "Ending Date", "type": "text" },
						]
					}, {
						"thisFieldEquals": ["xOccurrences"],
						"show": [{ "divID": "range_x-occurrences" }],
						"require": [{ "fieldName": "Qty Occurrences", "type": "text" }],
						"hide": [{ "divID": "range_ending-date" }],
						"optional": [{ "fieldName": "Ending Date", "type": "datepicker" }]
					}, {
						"thisFieldEquals": ["date"],
						"show": [{ "divID": "range_ending-date" }],
						"require": [{ "fieldName": "Ending Date", "type": "datepicker" }],
						"hide": [{ "divID": "range_x-occurrences" }],
						"optional": [{ "fieldName": "Qty Occurrences", "type": "text" }]
					}
				]

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'range_x-occurrences',
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],

				// X occurrences

			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Qty Occurrences",
				"labelContent": "Number of Occurrences",
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
				'onChange': [
					{
						'thisFieldIsPositiveInteger': 1,
						'removeError': [
							{ 'fieldName': "Qty Occurrences" }
						]
					}, {
						'thisFieldIsPositiveInteger': 0,
						'setError': [
							{ 'fieldName': "Qty Occurrences", "message": "Please enter a valid positive integer" }
						]
					}
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'range_ending-date',
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],

				// By date




			}, {
				"elementType": "field",
				"controlType": "datePicker",
				"fieldName": "Ending Date",
				"labelContent": "Ending Date",
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Date",
				'labelContent': "Date",
				'listFieldName': "Date",
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'requiredForNonAdmin': [],
				'requiredForAdmin': [],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]
			/* }, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'gse-schedule-dates',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Completed', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'gse-schedule-date',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Repeating Date",
				'labelContent': "Date",
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]
			},  {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Completed', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-gse-schedule-date',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert another date',
				'repeatSectionID': 'gse-schedule-date',
				'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Completed', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1 */

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'signup-people',
				'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Signups',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': "markup",
				'tag': "ul",
				'htmlID': 'Signup-People-List',
				'content': '<span id="Signup-People-List-Items" class="content-placeholder">I can\'t find any signups to show you.</span>',
				'begin': 1,
				'end': 1,

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'signups',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Signups',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'signup',
				'htmlClass': 'repeat-container',
				'repeatable': 1,
				'bypassSavingChildren': 1
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'begin': 1,
			}, {
				'elementType': 'markup',
				'tag': 'span',
				'htmlID': 'Signup-Name',
				'htmlClass': "content-placeholder",
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': '<span id="Signup-Name" class="content-placeholder"></span>',
				'end': 1,
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Signup ID",
				'labelContent': "Signup ID",
				'disabledForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "radio",
				'fieldName': "Signup Credit",
				'choiceSetLabel': "Grant credit?",
				"choices": [
					{
						"value": "yes",
						"display": "Yes, grant this person credit for this job, date, and time"
					}, {
						"value": "no",
						"display": "No, deny this person credit for this job, date, and time"
					}
				],
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Signup Credit Denial Reason",
				'labelContent': "Why is credit denied?",
				'disabledForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],

			// }, {
			// 	'elementType': "markup",
			// 	'tag': "a",
			// 	'begin': 1,
			// 	'end': 1,
			// 	'htmlClass': "remove-section-anchor",
			// 	'content': "Remove",
			// 	'removeThisRepeat': 1,
			// 	'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
			// 	'hideForAdmin': ['Submitted', 'Completed', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			// }, {
			// 	'elementType': 'markup',
			// 	'tag': 'a',
			// 	'begin': 1,
			// 	'end': 1,
			// 	'htmlID': 'repeat-signup',
			// 	'htmlClass': 'repeat-section-anchor',
			// 	'content': 'Insert another signup',
			// 	'repeatSectionID': 'signup',
				// 'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				// 'hideForAdmin': ['Submitted', 'Completed', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Status",
				"begin": 1,
				"end": 1,
				'hideForNonAdmin': [''],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Request Status for Requester",
				'labelContent': "Schedule Status",
				'disabledForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForNonAdmin': [''],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = '$("div#label-and-control_Requested-For").hide("fast").addClass("hidden");';

	fData.CustomScriptLast += '$().EnableGSEScheduleSignupDisplaysAndResponses(); \n';

	fData.CustomScriptLast += '$("input#id-or-link_GSE-Job-Request-ID").change(function() { \n' + 
								'	$().ImportGSEJobRequestDataToGSESchedule($("input#id-or-link_GSE-Job-Request-ID").val()); \n' + 
								'}); \n';

	fData.CustomScriptLast += 'if ($("input#shiftlength_75-hours").is(":checked")) { \n' +
								'   $("div#label-and-control_Meal-Time").show("fast").removeClass("hidden"); \n' +
								'   $("div#label-and-control_Break-Time").show("fast").removeClass("hidden"); \n' +
								'} \n';
	fData.CustomScriptLast += '$("input#Hours").change(function() { \n' +
		'	$().ValidateInRealTimeForPositiveFloat($("input#Hours").val(), "input#Hours"); \n' +
		'}); \n';

	fData.CustomScriptLast += '$("input#Number-of-Positions").change(function() { \n' +
		'	$().ValidateInRealTimeForPositiveFloat($("input#Number-of-Positions").val(), "input#Number-of-Positions"); \n' +
		'}); \n';
	









	// TEMPORARY

	/* // repeats
	// fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	// fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	// fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	// fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	
	// radios / checks
	fData.CustomScriptLast += '$("input#shiftlength_35-hours").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast += '$("input#locationisoffsite_no").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast += '$("input#individual-or-pattern_individual").prop("checked", true).attr("checked", true); \n';
	
	// texts
	fData.CustomScriptLast += '$("input#Request-Nickname").val("Req Nick");';
	fData.CustomScriptLast += '$("input#id-or-link_GSE-Job-Request-ID").val("11");';
	fData.CustomScriptLast += '$("input#Number-of-Positions").val("3");';
	fData.CustomScriptLast += '$("input#Hours").val("0.25");';
	fData.CustomScriptLast += '$("input#Repeating-Date").val("March 18, 2020");';
	// fData.CustomScriptLast += '$("input#Repeating-Date-repeat-1").val("March 2, 2019");';
	// fData.CustomScriptLast += '$("input#Repeating-Date-repeat-2").val("March 3, 2019");';
	// fData.CustomScriptLast += '$("input#Repeating-Date-repeat-3").val("March 4, 2019");';
	// fData.CustomScriptLast += '$("input#Repeating-Date-repeat-4").val("March 5, 2019");';
	
	// selects
	fData.CustomScriptLast += '$("select#hours-input_StartTime option[value=\'T09\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_StartTime option[value=\':00:00\']").attr("selected","selected"); \n';
	// fData.CustomScriptLast += '$("select#hours-input_MealTime option[value=\'T11\']").attr("selected","selected"); \n';
	// fData.CustomScriptLast += '$("select#minutes-input_MealTime option[value=\':00:00\']").attr("selected","selected"); \n';
	// fData.CustomScriptLast += '$("select#hours-input_BreakTime option[value=\'T13\']").attr("selected","selected"); \n';
	// fData.CustomScriptLast += '$("select#minutes-input_BreakTime option[value=\':30:00\']").attr("selected","selected"); \n';

	// hidden
	fData.CustomScriptLast += '$("input#time-storage_StartTime").val("2000-01-01T09:00:00Z"); \n';
	// fData.CustomScriptLast += '$("input#time-storage_MealTime").val("2000-01-01T11:00:00Z"); \n';
	// fData.CustomScriptLast += '$("input#time-storage_BreakTime").val("2000-01-01T13:30:00Z"); \n';
	fData.CustomScriptLast += '$("div#simple-dates").removeClass("hidden"); \n'; */



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
