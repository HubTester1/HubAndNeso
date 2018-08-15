(function ($) {

	var mData = {
		'componentID': 148,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		// 'currentRequestVersion': 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m");



	var oData = {
		'admin': {
			'buttons': [
				// {
				//     "linkType": "goForward",
				//     "anchorText": "Admin GPC Initial Concept Approval Requests",
				//     "href": "/sites/gpc-concept/SitePages/Admin GPC Initial Concept Approval Requests.aspx",
				//     // "idValue": "",
				//     // "classValues": "button_swf-new-event-with-timeline",
				//     "target": null
				// }, {
				//     "linkType": "goForward",
				//     "anchorText": "Configure GPC People",
				//     "href": "/sites/gpc-config/SitePages/GPC Configuration.aspx?requestID=1",
				//     // "idValue": "",
				//     // "classValues": "button_swf-new-event-with-timeline",
				//     "target": "_blank"
				// }
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
						'displayName': "Special Event or Project",
						'internalName': "EventName",
					}, {
						'displayName': "Event or Project Date",
						'internalName': "EventDate",
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableID': 'all-requests',
						'someColsAreUsers': 1,
						'basicAllQueryRelevantValue': 1
					}
				]
			}
		},
		'my': {
			'buttons': [
			],
			'preamble': '<h2>Process</h2> \n' +
				'<ul> \n' +
				'	<li>Submit this request at least two weeks before the date of your event or project.</li> \n' +
				'	<li>Please call x0383 with questions.</li> \n' +
				'</ul> \n',
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
						'displayName': "Special Event or Project",
						'internalName': "EventName",
					}, {
						'displayName': "Event or Project Date",
						'internalName': "EventDate",
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'My Requests',
						'tableID': 'all-requests',
						'someColsAreUsers': 1,
						'basicMyAllQueryRelevantValue': 1
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackSubmissionAndCancellation': 1,
		'alwaysTalkToRequester': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'vsReqNotifications': 1,
		'versioningMatters': 0,

		'uniqueElements': [
			{
				'elementType': "markup",
				'tag': "h2",
				'content': "Staff Contacts and Notifications",
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Primary Staff Contact",
				"labelContent": "Primary Staff Contact",
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Secondary Staff Contact",
				"labelContent": "Secondary Staff Contact",
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Other Notifications",
				"labelContent": "Others to Notify of this Request",
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': "Volunteer Needs",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Special Event or Project",
				'labelContent': "Special Event or Project",
				'listFieldName': 'EventName',
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Volunteer Tasks",
				'labelContent': "Volunteer Tasks",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Number of Volunteers Desired",
				'labelContent': "Number of Volunteers Desired",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Event or Project Date",
				'listFieldName': 'EventDate',
				'labelContent': "Event or Project Date",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "time",
				'fieldName': "Volunteer Arrival Time",
				'labelContent': "Volunteer Arrival Time",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Estimated Number of Hours Needed",
				'labelContent': "Estimated Number of Hours Needed",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Special Skills Required",
				'labelContent': "Special Skills Required",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Additional Comments",
				'labelContent': "Additional Comments",
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "admin",
				"content": '',
				"begin": 1,
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": 'Request Status',
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled']
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
