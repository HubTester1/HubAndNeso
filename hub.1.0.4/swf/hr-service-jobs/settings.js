(function ($) {

	// GSE Job 2

	var mData = {
		'componentID': 158,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		'devAdminNotifications': 1,
		'notifications': 0
	};

	console.log("using settings m5");

	var oData = {

		// screen 1.2
		'gseJobsHRAdmin': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Job",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
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
						'displayName': 'Job ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Job Title',
						'internalName': 'JobTitle'
					}, {
						'displayName': 'Job Admin',
						'internalName': 'JobAdmin',
						'userName': 1
					}, {
						'displayName': 'Created',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Last Modified',
						'internalName': 'Modified',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					},
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved'
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
								'displayName': 'Nickname',
								'internalName': 'Title'
							}, {
								'displayName': 'Job Title',
								'internalName': 'JobTitle'
							}, {
								'displayName': 'Created',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Last Modified',
								'internalName': 'Modified',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						]

					}
				]
			}
		},

		// screen 1.2
		'gseJobsJobAdmin': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Job",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
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
						'displayName': 'Nickname',
						'internalName': 'Title'
					}, {
						'displayName': 'Job Title',
						'internalName': 'JobTitle'
					}, {
						'displayName': 'Created',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Last Modified',
						'internalName': 'Modified',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					},
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Pending Approval',
						'getRequesterFrom': 'JobAdmin'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Approved',
						'getRequesterFrom': 'JobAdmin'
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 1,
						'getRequesterFrom': 'JobAdmin',
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}, {
								'displayName': 'Nickname',
								'internalName': 'Title'
							}, {
								'displayName': 'Job Title',
								'internalName': 'JobTitle'
							}, {
								'displayName': 'Created',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Last Modified',
								'internalName': 'Modified',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						]
					}
				]
			}
		},

		// screen 1.2
		'gseJobsManager': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
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
						'displayName': 'Job ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Job Title',
						'internalName': 'JobTitle'
					}, {
						'displayName': 'Job Admin',
						'internalName': 'JobAdmin',
						'userName': 1
					}, {
						'displayName': 'Created',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Last Modified',
						'internalName': 'Modified',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					},
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved'
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
								'displayName': 'Nickname',
								'internalName': 'Title'
							}, {
								'displayName': 'Job Title',
								'internalName': 'JobTitle'
							}, {
								'displayName': 'Created',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Last Modified',
								'internalName': 'Modified',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						]

					}
				]
			}
		}
	};


	var fData = {
		'autoTrackGSEJobStatuses': 1,
		'alwaysTalkToRequester': 1,
		'additionalViewPermissionsFunction': 'ReturnGSEJobRequestAdditionalViewAccess',
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "This job is approved" },
					{ "value": "Disapprove", "display": "This job is disapproved" },
					{ "value": "Cancel", "display": "This job has been cancelled" },
					{ "value": "Archive", "display": "This job should be archived" }
				]
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'standardChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 0, 'requester': 1 },
			'endOfLife': { 'admin': 1, 'requester': 1 },
		},
		'versioningMatters': 0,


		'uniqueElements': [
			{
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Archival",
				"choiceSetLabel": "Archival",
				"choices": [{
					"value": "archive",
					"display": "Yes, I wish to archive this request"
				}],
				"helpNotes": [{
					"text": "You won't be able to schedule this job again, but existing schedules for this job will not be automatically cancelled.",
					"htmlID": "requester-archival_help-note"
				}],
				"hideForNonAdmin": ["", "Pending Approval", "Archived", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': "Job Basics",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Job Title",
				// 'listFieldName': "JobTitle",
				'labelContent': "Job Title",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "peoplePicker",
				'fieldName': "Job Admin",
				'listFieldName': "JobAdmin",
				'labelContent': "Job Admin / Reports To",
				'yieldsViewPermissions': 1,
				"helpNotes": [{
					"text": "This person can administer this job on The Hub, and is the person to whom staff members will report",
					"htmlID": "job-admin_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "select",
				'fieldName': "Department",
				// 'listFieldName': "Department",
				'labelContent': "Department",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Job Description",
				// 'listFieldName': "JobDescription",
				'labelContent': "Job Description",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Training Requirements",
				'labelContent': "Training Requirements and Other Special Demands",
				// 'listFieldName': "TrainingRequirements",
				"helpNotes": [{
					"text": "Chemicals, tools, solvents, etc. For saftey, use of forklifts, large ladders, cherry pickers, etc. is not allowed.",
					"htmlID": "training-requirements_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				// 'requiredForNonAdmin': [""],
				// 'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Dress Requirements",
				'labelContent': "Dress Requirements",
				// 'listFieldName': "DressRequirements",
				"helpNotes": [{
					"text": "Protective devices such as helmet, saftey goggles, rubber gloves, etc.",
					"htmlID": "dress-requirements_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				// 'requiredForNonAdmin': [""],
				// 'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			
			
			
			
			
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'gse-job-duties',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['Submitted', 'Cancelled'],
				'hideForAdmin': ['Submitted', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'gse-job-duty',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			
			
			
			
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Job Duty",
				'labelContent': "Job Duty",
				"helpNotes": [{
					"text": "Protective devices required for the job such as helmet, saftey goggles, rubber gloves, etc.",
					"htmlID": "dress-requirements_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-gse-job-duty',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert another duty',
				'repeatSectionID': 'gse-job-duty',
				'hideForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			
			
			
			
			
			
			
			
			// }, {
			// 	'elementType': "field",
			// 	'controlType': "textarea",
			// 	'fieldName': "Job Duties",
			// 	'listFieldName': "JobDuties",
			// 	'labelContent': "Job Duties",
			// 	'requiredForNonAdmin': [""],
			// 	'requiredForAdmin': [""],
			// 	'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
			// 	'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "markup",
				'tag': "h3",
				'content': "Physical Demands",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "h4",
				'content': "How Much Weight Will Be Handled",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Lifting",
				// 'listFieldName': "PhysicalDemandLifting",
				'labelContent': "Lifting",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "lifting_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Carrying",
				// 'listFieldName': "PhysicalDemandCarrying",
				'labelContent': "Carrying",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "carrying_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Pushing",
				// 'listFieldName': "PhysicalDemandPushing",
				'labelContent': "Pushing",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "pushing_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Pulling",
				// 'listFieldName': "PhysicalDemandPulling",
				'labelContent': "Pulling",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "pulling_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "markup",
				'tag': "h4",
				'content': "How Time Will Be Divided",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Standing",
				// 'listFieldName': "PhysicalDemandStanding",
				'labelContent': "Standing %",
				"helpNotes": [{
					"text": "State percents using numerals only. Percents must total 100.",
					"htmlID": "standing_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Sitting",
				// 'listFieldName': "PhysicalDemandSitting",
				'labelContent': "Sitting %",
				"helpNotes": [{
					"text": "State percents using numerals only. Percents must total 100.",
					"htmlID": "sitting_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Walking",
				// 'listFieldName': "PhysicalDemandWalking",
				'labelContent': "Walking %",
				"helpNotes": [{
					"text": "State percents using numerals only. Percents must total 100.",
					"htmlID": "walking_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Archived", "Disapproved", "Cancelled"]
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast =	'if ($("input#Request-Status").val() == "") { \n' + 
								'	$().PutCurrentUserInField("Job Admin"); \n' + 
								'} \n';

	fData.CustomScriptLast +=	'if ($("input#Request-Status").val() == "Approved") { \n' + 
								'	$("div#label-and-control_Requester-Cancellation").hide("fast").addClass("hidden"); \n' + 
								'} \n';

	fData.CustomScriptLast +=	'$("div#label-and-control_Requested-For, div#container_about-the-requester").hide("fast").addClass("hidden"); \n';


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