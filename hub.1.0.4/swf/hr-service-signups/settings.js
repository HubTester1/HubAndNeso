(function ($) {

	var mData = {
		'componentID': 160,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 2,
		'devAdminNotifications': 1,
		'notifications': 0,
		'detailTitle': [
			{
				'roles': ['gseHRAdmin', 'gseJobAdmin', 'gseManager', 'gseUserOnly'],
				'title': 'GSE Signup Opportunity'
			}
		]

	};

	console.log("using settings m1");

	var oData = {

		// screen 3.2
		'gseSignupsHRAdmin': {
			'buttons': [
				{
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
					"anchorText": "Schedule List",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx",
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

		// screen 3.2
		'gseSignupsManager': {
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
					"anchorText": "Schedule List",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx",
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

		// screen 3.2
		'gseSignupsStaff': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "GSE Signup Option Calendar",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
					"target": null,
					"restrictedToRoles": ["gseUserOnly"]
				}, {
					"linkType": "goForward",
					"anchorText": "GSE Signup Option List",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx",
					"target": null,
					"restrictedToRoles": ["gseUserOnly"]




				}, {
					"linkType": "goForward",
					"anchorText": "My Jobs",
					"href": "/sites/hr-service-jobs/SitePages/App.aspx",
					"target": null,
					"restrictedToRoles": ["gseJobAdmin"]
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule Calendar",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx?f=cal",
					"target": null,
					"restrictedToRoles": ["gseJobAdmin"]
				}, {
					"linkType": "goForward",
					"anchorText": "Schedule List",
					"href": "/sites/hr-service-schedule/SitePages/App.aspx",
					"target": null,
					"restrictedToRoles": ["gseJobAdmin"]





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
		'alwaysTalkToRequester': 1,
		'autoTrackGSESignupStatuses': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		/* 'standardChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'newlyApprOrPending': { 'admin': 1, 'requester': 1 },
			'assignmentHasChanged': { 'workNewlyNeededNotify': 1, 'workNotNeededNotify': 1 },
			'endOfLife': {
				'admin': 1,
				'requester': {
					'completion': 'specific',
					'nonCompletion': 1
				}
			},
		}, */
		'versioningMatters': 0,


		'uniqueElements': [
			{
				'elementType': "markup",
				'tag': "h2",
				'content': '<span id="Job-Title" class="content-placeholder"></span>',
				'begin': 1,
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "h3",
				'content': 'Logistics',
				'begin': 1,
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "ul",
				'begin': 1,
			}, {
				'elementType': "markup",
				'tag': "li",
				'content': 'Positions Available <span style="background-color: #fcc" id="" class="content-placeholder">X</span>' + 
							' out of <span id="Number-of-Positions" class="content-placeholder"></span>',
				'begin': 1,
				'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			// }, {
			// 	'elementType': "markup",
			// 	'tag': "h3",
			// 	'content': '<span id="" class="content-placeholder"></span>',
			// 	'begin': 1,
			// 	'end': 1
			}, {
				'elementType': "markup",
				'tag': "ul",
				'end': 1



			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Job ID",
				'listFieldName': "JobID",
				'labelContent': "Job ID",
				'disabledForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'disabledForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Schedule ID",
				'listFieldName': "ScheduleID",
				'labelContent': "Schedule ID",
				'disabledForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'disabledForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Request Status",
				'listFieldName': "RequestStatus",
				'labelContent': "Signup Status",
				'disabledForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'disabledForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Credit Denial Reason",
				'listFieldName': "CreditDenialReason",
				'labelContent': "Credit Denial Reason",
				'disabledForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'disabledForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				// 'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			}, {
				'elementType': "markup",
				'tag': "div",
				'content': '<div id="gse-schedule-save-button-container"><a data-button-type="save" id="form-submit-button">Save</a></div>' + 
							'<div id="gse-schedule-exit-button-container"><a data-button-type="noSave" id="exit-sans-save-button" style="background-color: #fcc !important">Go to X</a></div>',
				'begin': 1,
				'end': 1







			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = '$("h2#header_this-request, div#requirement-legend, div#label-and-control_Request-Nickname").addClass("hidden");';



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
