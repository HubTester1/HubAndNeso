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
			'standardButtonElements': 1,
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
				'content': 'Positions Available <span id="Positions-Available" class="content-placeholder"></span>' + 
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
				'elementType': "markup",
				'tag': "h2",
				'content': 'Signup',
				'begin': 1,
				'end': 1
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
				"labelContent": "Signup ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Signup Date",
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
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
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
					"hideForNonAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
					"hideForAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
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
				"hideForNonAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForNonAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
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
				"labelContent": "Who Signed Up",
				"listFieldName": "RequestedFor",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this signup"
				}],
				"hideForNonAdmin": ["", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForNonAdmin": ["Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["Credit Granted", "Credit Denied", "Cancelled"]
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
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
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1





			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Job ID",
				'listFieldName': "JobID",
				'labelContent': "Job ID",
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Schedule ID",
				'listFieldName': "ScheduleID",
				'labelContent': "Schedule ID",
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Sign Up",
				"choiceSetLabel": "Do you wish to sign up?",
				"choices": [{
					"value": "signUp",
					"display": "Yes, I wish to do this job at this date and time"
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"hideForNonAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Request Status for Requester",
				'labelContent': "Signup Status",
				'disabledForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'disabledForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'hideForNonAdmin': ["",],
				'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Credit Denial Reason for Requester",
				'labelContent': "Credit Denial Reason",
				'disabledForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'disabledForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Cancelled"],
				'hideForAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
			
			
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "admin",
				"content": '',
				"begin": 1,
				"hideForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": [""]
			}, {
				"elementType": "markup",
				"tag": "h3",
				"content": 'Admin',
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Change Request Status",
				"labelContent": "Change Signup Status",
				"setOptions": [
					{ "value": "Grant Credit", "display": "Grant credit for this signup" },
					{ "value": "Deny Credit", "display": "Deny credit for this signup" },
					{ "value": "Cancel", "display": "Cancel this signup" },
				],
				"hideForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"hideForAdmin": ["", "Credit Granted", "Credit Denied", "Cancelled"],
				"onChange": [{
					"thisFieldEquals": ["Grant Credit", "Cancel"],
					"hide": [{
						"fieldName": "Credit Denial Reason"
					}],
					"optional": [{
						"fieldName": "Credit Denial Reason",
						"type": "textarea"
					}]
				}, {
					"thisFieldEquals": ["Deny Credit"],
					"show": [{
						"fieldName": "Credit Denial Reason"
					}],
					"require": [{
						"fieldName": "Credit Denial Reason",
						"type": "textarea"
					}]
				}]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Signup Status",
				"disabledForNonAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				"disabledForAdmin": ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Credit Denial Reason",
				'labelContent': "Credit Denial Reason",
				'disabledForNonAdmin': ["", "Signed Up", "Credit Granted", "Credit Denied", "Cancelled"],
				'disabledForAdmin': ["", "Credit Granted", "Credit Denied", "Cancelled"],
				'hideForNonAdmin': ["", "Signed Up", "Credit Granted", "Cancelled"],
				'hideForAdmin': ["", "Signed Up", "Credit Granted", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "New Admin Notes",
				"labelContent": "Admin Notes"
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Historical Admin Notes",
				"labelContent": "Historical Admin Notes",
				"disabledForNonAdmin": ["", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"]


			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1






			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = '';
	/* 	'$("h2#header_this-request, div#requirement-legend, ' + 
								'div#label-and-control_Request-ID, div#label-and-control_Request-Date, ' + 
								'div#label-and-control_Self-or-Other, div#label-and-control_Requested-For, ' + 
								'div#label-and-control_Requester-Cancellation, div#container_about-the-requester, ' + 
								// 'div#XXXXX, div#XXXXX, ' +
								// 'div#XXXXX, div#XXXXX, ' + 
								// 'div#XXXXX, div#XXXXX, ' + 
								// 'div#XXXXX, div#XXXXX, ' + 
								// 'div#XXXXX, div#XXXXX, ' + 
								'div#label-and-control_Request-Nickname").addClass("hidden");';

	fData.CustomScriptLast +=	'if ($("input#Request-Status").val() == "") {' + 
								'	$("div#submission-notice").addClass("hidden");' + 
								'}'; */



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
