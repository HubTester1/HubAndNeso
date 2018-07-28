(function ($) {

	// GSE Schedule 2

	var mData = {
		'componentID': 159,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		'devAdminNotifications': 1,
		'notifications': 0,
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

	console.log("using settings m5");

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
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
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
											'</Where>'
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'sortColAndOrder': [0, 'desc'],
						'basicEOLQueryRelevantValue': 1
					}
				]
			}
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
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
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
			}
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
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My and My Staff Members' Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
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
			}
		},
		
		// screen 2.3
		'gseSchedulesListStaff': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "My GSE Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "GSE Signup Option Calendar",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
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
			}
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
					"href": "/sites/hr-service-schedule/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
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
					"anchorText": "New Job",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx?r=0",
					"target": null


				}, {
					"linkType": "goForward",
					"anchorText": "My Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule List",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
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
					"href": "/sites/hr-service-schedule/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "My and My Staff Members' Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
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
					"anchorText": "Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Signups",
					"href": "/sites/hr-service-signup/SitePages/App.aspx",
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
		// 'autoTrackGSEScheduleStatuses': 1,
		'autoTrackSubmissionAndCancellation': 1,
		'autoProcessGSEScheduleAndSignupModification': 1,
		'bypassNormalDataSaving': [''],
		'customDataSavingFunction': {
			'useFunction': 'ReturnNewGSESchedulesSubmissionValuePairArrayOfArrays',
			'requestStatuses': ['']
		},
		'alwaysTalkToRequester': 1,
		'additionalViewPermissionsFunction': 'ReturnGSEScheduleAdditionalViewAccess',
		'standardElementGroups': {
			// 'standardThisRequestAndRequesterElements': 1,
			// 'standardAdminElements': {
			// 	'changeRequestStatus': [
			// 		{ "value": "Approve", "display": "Approve this job" },
			// 		{ "value": "Disapprove", "display": "Disapprove this job" }
			// 	]
			// },
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		// 'standardChangeNotifications': {
		// 	'beginningOfLife': { 'admin': 1, 'requester': 1 },
		// 	'approved': { 'admin': 0, 'requester': 1 },
		// 	'endOfLife': {'admin': 1, 'requester': 1},
		// },
		'versioningMatters': 0,

		'uniqueElements': [
			{


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
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
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
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
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
					"hideForNonAdmin": ["Submitted", "Cancelled"],
					"hideForAdmin": ["Submitted", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Cancelled"],
				"hideForAdmin": ["Submitted", "Cancelled"]
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
				"hideForNonAdmin": ["Submitted", "Cancelled"],
				"hideForAdmin": ["Submitted", "Cancelled"],
				"disabledForNonAdmin": ["Submitted", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Cancelled"],
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
				"disabledForNonAdmin": ["Submitted", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this request"
				}],
				"hideForNonAdmin": ["", "Cancelled"],
				"hideForAdmin": ["", "Cancelled"],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"]
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
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
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1


			// 	'elementType': "markup",
			// 	'tag': "h2",
			// 	'content': "Job",
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "field",
			// 	'controlType': "select",
			// 	'fieldName': "Department",
			// 	'labelContent': "Department",
			// 	'listFieldName': "Department",
			// 	'loadOptions': {
			// 		'function': 'LoadDepartmentSelectOptions'
			// 	},
			// 	'requiredForNonAdmin': [""],
			// 	'requiredForAdmin': [""],
			// 	'disabledForNonAdmin': ['Cancelled'],
			// 	'disabledForAdmin': ['Cancelled'],
			// }, {

			// 	'elementType': "field",
			// 	'controlType': "hidden",
			// 	'fieldName': "Schedule ID",
			// 	'listFieldName': "ScheduleID",
			// 	'labelContent': "Schedule ID",
			// }, {



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
				// leave this - just signals basic validation to make sure the value is a positive integer
				'addtlValidationType': 'validPositiveInteger',

				'hideButtonForNonAdmin': ['Submitted', 'Cancelled'],
				'hideButtonForAdmin': ['Submitted', 'Cancelled'],
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
				// 'listFieldName': "StartTime",
				'labelContent': "Start Time",
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "radio",
				'fieldName': "ShiftLength",
				// 'listFieldName': "ShiftLength",
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
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Number of Positions",
				// 'listFieldName': "NumberOfPositions",
				'labelContent': "Number of Positions",
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Location",
				// 'listFieldName': "Location",
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
				'fieldName': "MealTime",
				'labelContent': "Meal Time",
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled']
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "BreakTime",
				'labelContent': "Break Time",
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
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
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'gse-schedule-dates',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled']
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
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled'],
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
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Request Status",
				'listFieldName': "RequestStatus",
				'labelContent': "Request Status",
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = '';




	// TEMPORARY

	/* // repeats
	fData.CustomScriptLast += '$().RepeatElement("gse-schedule-date");';
	fData.CustomScriptLast += '$().RepeatElement("gse-schedule-date");';
	
	// radios / checks
	fData.CustomScriptLast += '$("input#shiftlength_75-hours").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast += '$("input#locationisoffsite_no").prop("checked", true).attr("checked", true); \n';
	
	// texts
	fData.CustomScriptLast += '$("input#Request-Nickname").val("Req Nick");';
	fData.CustomScriptLast += '$("input#id-or-link_GSE-Job-Request-ID").val("4");';
	fData.CustomScriptLast += '$("input#Number-of-Positions").val("3");';
	fData.CustomScriptLast += '$("input#Location").val("Lobby");';
	fData.CustomScriptLast += '$("input#Repeating-Date").val("July 29, 2018");';
	fData.CustomScriptLast += '$("input#Repeating-Date-repeat-1").val("July 30, 2018");';
	fData.CustomScriptLast += '$("input#Repeating-Date-repeat-2").val("July 31, 2018");';
	
	// selects
	fData.CustomScriptLast += '$("select#hours-input_StartTime option[value=\'T09\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_StartTime option[value=\':00:00\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#hours-input_MealTime option[value=\'T11\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_MealTime option[value=\':00:00\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#hours-input_BreakTime option[value=\'T13\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_BreakTime option[value=\':30:00\']").attr("selected","selected"); \n';

	// hidden
	fData.CustomScriptLast += '$("input#time-storage_StartTime").val("2000-01-01T09:00:00Z"); \n';
	fData.CustomScriptLast += '$("input#time-storage_MealTime").val("2000-01-01T11:00:00Z"); \n';
	fData.CustomScriptLast += '$("input#time-storage_BreakTime").val("2000-01-01T13:30:00Z"); \n'; */


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
