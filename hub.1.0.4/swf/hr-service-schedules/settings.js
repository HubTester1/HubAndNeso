(function ($) {

	// GSE Schedule 2

	var mData = {
		'componentID': 159,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		'devAdminNotifications': 0,
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

	console.log("using settings m2");

	var oData = {
		
		// screen 2.3
		'gseSchedulesListHRAdmin': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "Configuration",
					"href": "/sites/hr-service-config/SitePages/App.aspx?r=1",
					"target": null
				}, {
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
				}
			],
			/* 'sections': {
				'commonColumns': [
					{
						'displayName': 'Schedule ID',
						'internalName': 'ID',
					}, {
						'displayName': "Job Admin",
						'dataName': "JobAdmin",
					}, {
						'displayName': "Date",
						'internalName': "Date",
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Start Time',
						'internalName': 'StartTime',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'h:mm a' }
					}, {
						'displayName': "Schedule Length",
						'internalName': "ShiftLength",
					}, {
						'displayName': "Location",
						'internalName': "Location",
					}, {
						'displayName': "Positions Available",
						'dataName': "PositionsAvailable",
					}, {
						'displayName': "Signups",
						'dataName': "Signups",
					}, {
						'internalName': "NumberOfPositions",
					}, {
						'internalName': "JobID",
					}
				],
				'tables': [
					{
						'tableTitle': 'Submitted',
						'tableID': 'submitted',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Submitted'
					}, {
						'tableTitle': 'Completed',
						'tableID': 'completed',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Completed'
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'cancelled',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Cancelled'
					}
				]
			} */
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
			/* 'sections': {
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
						'displayName': 'Start Time',
						'internalName': 'StartTime'
					}, {
						'displayName': "Shift Length",
						'internalName': "ShiftLength",
					}, {
						'displayName': "Number of Positions",
						'internalName': "NumberOfPositions",
					}, {
						'displayName': "Location",
						'internalName': "Location",
					}, {
						'displayName': "JobID",
						'internalName': "JobID",
					}, {
						'displayName': "Date",
						'internalName': "Date",
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
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
						'myRSQueryRelevantStatusAssigned': 'Approved'
					}
				]
			} */
		},
		
		// screen 2.3
		'gseSchedulesListManager': {
			'buttons': [
				{
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
			/* 'sections': {
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
						'displayName': 'Start Time',
						'internalName': 'StartTime'
					}, {
						'displayName': "Shift Length",
						'internalName': "ShiftLength",
					}, {
						'displayName': "Number of Positions",
						'internalName': "NumberOfPositions",
					}, {
						'displayName': "Location",
						'internalName': "Location",
					}, {
						'displayName': "JobID",
						'internalName': "JobID",
					}, {
						'displayName': "Date",
						'internalName': "Date",
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
						'myDeptRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Unassigned',
						'tableID': 'unassigned',
						'someColsAreUsers': 1,
						'myDeptRSQueryRelevantStatusUnassigned': 'Approved'
					}, {
						'tableTitle': 'Assigned',
						'tableID': 'assigned',
						'someColsAreUsers': 1,
						'myDeptRSQueryRelevantStatusAssigned': 'Approved'
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'sortColAndOrder': [0, 'desc'],
						'myDeptRSQueryRelevantStatus': 'Closed'
					}
				]
			} */
		},
		
		// screen 2.3
		'gseSchedulesListStaff': {
			'buttons': [
				{
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
			/* 'sections': {
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
						'displayName': 'Start Time',
						'internalName': 'StartTime'
					}, {
						'displayName': "Shift Length",
						'internalName': "ShiftLength",
					}, {
						'displayName': "Number of Positions",
						'internalName': "NumberOfPositions",
					}, {
						'displayName': "Location",
						'internalName': "Location",
					}, {
						'displayName': "JobID",
						'internalName': "JobID",
					}, {
						'displayName': "Date",
						'internalName': "Date",
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
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
						'myRSQueryRelevantStatusAssigned': 'Approved'
					}
				]
			} */
		},
		



		// screen 2.2
		'gseSchedulesCalendarHRAdmin': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "Configuration",
					"href": "/sites/hr-service-config/SitePages/App.aspx?r=1",
					"target": null
				}, {
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
							'customCAMLQuery':  "<Where>" +
												"		<Eq>" +
												"			<FieldRef Name='RequestStatus'></FieldRef>" +
												"			<Value Type='Text'>Approved</Value>" +
												"		</Eq>" +
												"</Where>",
							'sortColAndOrder': [0, 'desc']
						}
					]
				},
				'addtlValidationType': 'validPositiveInteger',
				'hideButtonForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'hideButtonForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			// }, {
			// 	'elementType': "field",
			// 	'controlType': "text",
			// 	'fieldName': "Job Title",
			// 	'labelContent': "Job Title",
			// 	'requiredForNonAdmin': ['', 'Submitted'],
			// 	'requiredForAdmin': ['', 'Submitted'],
			// 	'disabledForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
			// 	'disabledForAdmin': ['', 'Submitted', 'Completed', 'Cancelled']
			// }, {
			// 	'elementType': "field",
			// 	'controlType': "textarea",
			// 	'fieldName': "Job Description",
			// 	'labelContent': "Job Description",
			// 	'requiredForNonAdmin': ['', 'Submitted'],
			// 	'requiredForAdmin': ['', 'Submitted'],
			// 	'disabledForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
			// 	'disabledForAdmin': ['', 'Submitted', 'Completed', 'Cancelled']
			
			
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
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "radio",
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
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled'],
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






			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Number of Positions",
				'listFieldName': "NumberOfPositions",
				'labelContent': "Number of Positions",
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Location",
				'listFieldName': "Location",
				'labelContent': "Location",
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "radio",
				'fieldName': "LocationIsOffsite",
				// 'listFieldName': "LocationIsOffsite",
				'choiceSetLabel': "Is this location offsite?",
				"choices": [
					{
						"value": "yes",
						"display": "Yes, this location is offsite"
					}, {
						"value": "no",
						"display": "No, this location is not offsite"
					}
				],
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "Meal Time",
				'labelContent': "Meal Time",
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "Break Time",
				'labelContent': "Break Time",
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Notes",
				'labelContent': "Notes",
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
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
						'text': "This will create individual schdules for the dates that fit your pattern. Your pattern won't be saved, but you'll be able to edit or cancel the individual schedules.",
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
						'hide': [{ 'divID': 'pattern-and-range' }],
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

 			/* }, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Change Pattern of Repeating Dates',
				'choiceSetLabel': 'Change Pattern of Repeating Dates',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I want to change the pattern'
					}
				],
				'hideForNonAdmin': ["", "Completed", "Cancelled"],
				'hideForAdmin': ["", "Completed", "Cancelled"],
				'helpNotes': [
					{
						'text': "This will cause any changes to specific occurrences in the series to be cancelled.",
						'htmlID': "pattern-change-warning",
					}, {
						'text': "If there were changes to specific occurrences in the series, the changes will be cancelled and those occurrences will match the series again.",
						'htmlID': "pattern-change-urgent-warning",
						'emphasis': 1,
						'hideForNonAdmin': ["", "Submitted", "Completed", "Cancelled"],
						'hideForAdmin': ["", "Submitted", "Completed", "Cancelled"]
					}
				],
				'onChange': [
					{
						'thisFieldIsChecked': 1,
						'disable': [{ 'fieldName': 'Change Pattern of Repeating Dates', 'inputIDs': ['change-pattern-of-repeating-dates_yes'] }],
						'enable': [
							{ 'fieldName': 'Pattern Basis' },
							{ 'fieldName': 'X Days' },
							{ 'fieldName': 'X Weeks' },
							{
								'fieldName': 'Days of Week for X Weeks', 'inputIDs': [
									'days-of-week-for-x-weeks_1',
									'days-of-week-for-x-weeks_2',
									'days-of-week-for-x-weeks_3',
									'days-of-week-for-x-weeks_4',
									'days-of-week-for-x-weeks_5',
									'days-of-week-for-x-weeks_6',
									'days-of-week-for-x-weeks_7',
								]
							},
							{ 'fieldName': 'X Months For Same Day' },
							{ 'fieldName': 'Day of Month for X Months' },
							{ 'fieldName': 'X Months For Same Week' },
							{ 'fieldName': 'Ordinal and Day of Week For X Months For Same Week', 'selectIDs': ['Ordinal-For-Day-of-Week-For-X-Months-For-Same-Week', 'Days-of-Week-For-X-Months-For-Same-Week'] },
							{ 'fieldName': 'Month and Monthly Date for Same Date Each Year', 'selectIDs': ['Months-for-Same-Date-Each-Year'], 'inputIDs': ['Date-for-Same-Date-Each-Year'] },
							{ 'fieldName': 'Ordinal and Day of Week For Same Week Each Year', 'selectIDs': ['Ordinal-For-Same-Week-Each-Year', 'Days-of-Week-For-Same-Week-Each-Year'] },
							{ 'fieldName': 'Months for Same Week Each Year' },
							{ 'fieldName': 'Start Date' },
							{ 'fieldName': 'Ending Basis' },
							{ 'fieldName': 'Qty Occurrences' },
							{ 'fieldName': 'Ending Date' },
						],
						'show': [{ 'noteID': "pattern-change-urgent-warning" }],
						'hide': [{ 'noteID': "pattern-change-warning" }]
					},
				], */







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
				'requiredForNonAdmin': ['Submitted'],
				'requiredForAdmin': ['Submitted'],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
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
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
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

	fData.CustomScriptLast += '$("input#Number-of-Positions").change(function() { \n' +
		'	$().ValidateInRealTimeForPositiveInteger($("input#Number-of-Positions").val(), "input#Number-of-Positions"); \n' +
		'}); \n';


// Number of Positions








	// TEMPORARY

	/* // repeats
	fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	fData.CustomScriptLast += '$().RepeatElement("simple-date");';
	
	// radios / checks
	fData.CustomScriptLast += '$("input#shiftlength_35-hours").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast += '$("input#locationisoffsite_no").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast += '$("input#individual-or-pattern_individual").prop("checked", true).attr("checked", true); \n';
	
	// texts
	fData.CustomScriptLast += '$("input#Request-Nickname").val("Req Nick");';
	fData.CustomScriptLast += '$("input#id-or-link_GSE-Job-Request-ID").val("215");';
	fData.CustomScriptLast += '$("input#Number-of-Positions").val("3");';
	fData.CustomScriptLast += '$("input#Location").val("Lobby");';
	fData.CustomScriptLast += '$("input#Repeating-Date").val("October 1, 2018");';
	fData.CustomScriptLast += '$("input#Repeating-Date-repeat-1").val("October 2, 2018");';
	fData.CustomScriptLast += '$("input#Repeating-Date-repeat-2").val("October 3, 2018");';
	fData.CustomScriptLast += '$("input#Repeating-Date-repeat-3").val("October 4, 2018");';
	fData.CustomScriptLast += '$("input#Repeating-Date-repeat-4").val("October 5, 2018");';
	
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
