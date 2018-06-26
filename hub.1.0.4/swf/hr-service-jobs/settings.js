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
		'notifications': 1
	};

	console.log("using settings m1");

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
					},
					{
						'displayName': 'Nickname',
						'internalName': 'Title'
					},
					{
						'displayName': 'Reports To',
						'internalName': 'ReportsTo',
						'userName': 1
					},
					{
						'displayName': 'Job Title',
						'internalName': 'JobTitle'
					},
					{
						'displayName': 'Created',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					},
					{
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
						'tableTitle': 'Disapproved',
						'tableID': 'disapoved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Disapproved'
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
						'displayName': 'Job ID',
						'internalName': 'ID',
						'formLink': 1
					},
					{
						'displayName': 'Nickname',
						'internalName': 'Title'
					},
					{
						'displayName': 'Reports To',
						'internalName': 'ReportsTo',
						'userName': 1
					},
					{
						'displayName': 'Job Title',
						'internalName': 'JobTitle'
					},
					{
						'displayName': 'Created',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					},
					{
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
						'myRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Approved'
					}, {
						'tableTitle': 'Disapproved',
						'tableID': 'disapoved',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Disapproved'
					}
				]
			}
		},

		// screen 1.2
		'gseJobsManager': {
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
					},
					{
						'displayName': 'Nickname',
						'internalName': 'Title'
					},
					{
						'displayName': 'Reports To',
						'internalName': 'ReportsTo',
						'userName': 1
					},
					{
						'displayName': 'Job Title',
						'internalName': 'JobTitle'
					},
					{
						'displayName': 'Created',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					},
					{
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
						'myDeptRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'myDeptRSQueryRelevantStatus': 'Approved'
					}, {
						'tableTitle': 'Disapproved',
						'tableID': 'disapoved',
						'someColsAreUsers': 1,
						'myDeptRSQueryRelevantStatus': 'Disapproved'
					}
				]
			}
		}
	};

	var fData = {
		'autoTrackGSEJobStatuses': 1,
		// to do: set alwaysTalkToRequester
		// 'alwaysTalkToRequester': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "Approve this job" },
					{ "value": "Disapprove", "display": "Disapprove this job" }
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
				'elementType': "markup",
				'tag': "h3",
				'content': "Job Basics",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Job Title",
				'listFieldName': "JobTitle",
				'labelContent': "Job Title",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "peoplePicker",
				'fieldName': "Reports To",
				'listFieldName': "ReportsTo",
				'labelContent': "Reports To",
				'yieldsViewPermissions': 1,
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "select",
				'fieldName': "Department",
				'listFieldName': "Department",
				'labelContent': "Department",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Job Description",
				'listFieldName': "JobDescription",
				'labelContent': "Job Description",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Training Requirements",
				'labelContent': "Training Requirements and Other Special Demands",
				'listFieldName': "TrainingRequirements",
				"helpNotes": [{
					"text": "For saftey reasons, staff are not permitted to use forklifts, large ladders, cherry pickers, etc. Specify use of any chemicals, tools, solvents, etc.",
					"htmlID": "training-requirements_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Dress Requirements",
				'labelContent': "Dress Requirements",
				'listFieldName': "DressRequirements",
				"helpNotes": [{
					"text": "Protective devices required for the job such as helmet, saftey goggles, rubber gloves, etc.",
					"htmlID": "dress-requirements_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Job Duties",
				'listFieldName': "JobDuties",
				'labelContent': "Job Duties",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
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
				'listFieldName': "PhysicalDemandLifting",
				'labelContent': "Lifting",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "lifting_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Carrying",
				'listFieldName': "PhysicalDemandCarrying",
				'labelContent': "Carrying",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "carrying_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Pushing",
				'listFieldName': "PhysicalDemandPushing",
				'labelContent': "Pushing",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "pushing_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Pulling",
				'listFieldName': "PhysicalDemandPulling",
				'labelContent': "Pulling",
				"helpNotes": [{
					"text": "State amounts in pounds, using numerals only",
					"htmlID": "pulling_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
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
				'listFieldName': "PhysicalDemandStanding",
				'labelContent': "Standing %",
				"helpNotes": [{
					"text": "State percents using numerals only. Percents must total 100.",
					"htmlID": "standing_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Sitting",
				'listFieldName': "PhysicalDemandSitting",
				'labelContent': "Sitting %",
				"helpNotes": [{
					"text": "State percents using numerals only. Percents must total 100.",
					"htmlID": "sitting_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Physical Demand Walking",
				'listFieldName': "PhysicalDemandWalking",
				'labelContent': "Walking %",
				"helpNotes": [{
					"text": "State percents using numerals only. Percents must total 100.",
					"htmlID": "walking_help-note",
					"hideForNonAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
				}],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approve", "Completed", "Disapprove", "Cancelled"]
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