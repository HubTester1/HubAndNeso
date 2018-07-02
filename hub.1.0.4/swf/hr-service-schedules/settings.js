(function ($) {

	// GSE Schedule 2

	var mData = {
		'componentID': 159,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 1,
		'notifications': 0,
		'detailTitle': 'GSE Schedule'
	};

	console.log("using settings m4");

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
		'autoTrackGSEScheduleStatuses': 1,
		'alwaysTalkToRequester': 1,
		'bypassNormalDataSaving': 1,
		'customDataSavingFunction': 'ReturnGSESchedulesSubmissionValuePairArray',
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
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
			// 	'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
			// 	'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
			// }, {
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

				'hideButtonForNonAdmin': ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
				'hideButtonForAdmin': ["Pending Approval", "Approval Pending Comments", "Grant Proposal Ready for Submission", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Disapproved", "Cancelled"],
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
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
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
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "NumberOfPositions",
				'listFieldName': "NumberOfPositions",
				'labelContent': "Number of Positions",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Location",
				'listFieldName': "Location",
				'labelContent': "Location",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "radio",
				'fieldName': "LocationIsOffsite",
				'listFieldName': "LocationIsOffsite",
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
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "MealTime",
				'labelContent': "Meal Time",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "BreakTime",
				'labelContent': "Break Time",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Notes",
				'labelContent': "Notes",
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h2",
			// 	'content': "Dates",
			// 	'begin': 1,
			// 	'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'gse-schedule-dates',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
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
				'fieldName': "Date",
				'labelContent': "Date",
				'listFieldName': "Date",
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			},  {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "RequestStatus",
				'labelContent': "Request Status",
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = '';


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
