
(function ($) {

	var mData = {
		'componentID': 130,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 2,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m1");



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
						'displayName': "Make",
						'internalName': "BikeMake",
					}, {
						'displayName': "Model",
						'internalName': "BikeModel",
					}, {
						'displayName': 'Color',
						'internalName': 'BikeColor',
					}, {
						'displayName': 'Beginning',
						'internalName': 'Beginning',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Ending',
						'internalName': 'Ending',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Pending Approval',
					}, {
						'tableTitle': 'Today and Upcoming Approved',
						'tableID': 'today-and-upcoming-approved',
						'someColsAreUsers': 1,
						'rsQueryAndFieldGEQToday': {
							'requestStatus': 'Approved',
							'field': 'Ending',
						}
					}, {
						'tableTitle': 'Past Approved',
						'tableID': 'past-approved',
						'someColsAreUsers': 1,
						'rsQueryAndFieldLTToday': {
							'requestStatus': 'Approved',
							'field': 'Ending',
						}
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'cancelled',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Cancelled',
					}, {
						'tableTitle': 'Disapproved',
						'tableID': 'disapproved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Disapproved',
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
						'displayName': 'Beginning',
						'internalName': 'Beginning',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Ending',
						'internalName': 'Ending',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
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
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Pending Approval',
					}, {
						'tableTitle': 'Today and Upcoming Approved',
						'tableID': 'today-and-upcoming-approved',
						'someColsAreUsers': 1,
						'MyRSQueryAndFieldGEQToday': {
							'requestStatus': 'Approved',
							'field': 'Ending',
						}
					}, {
						'tableTitle': 'Past Approved',
						'tableID': 'past-approved',
						'someColsAreUsers': 1,
						'MyRSQueryAndFieldLTDate': {
							'requestStatus': 'Approved',
							'field': 'Ending',
						}
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'cancelled',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Cancelled',
					}, {
						'tableTitle': 'Disapproved',
						'tableID': 'disapproved',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Disapproved',
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackPendingAndApproval': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				],
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'superSimpleChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': 1 }
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'What, Where, & When',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Bike Make",
				"labelContent": "Bike Make",
				"listFieldName": "BikeMake",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Bike Model",
				"labelContent": "Bike Model",
				"listFieldName": "BikeModel",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Bike Color",
				"labelContent": "Bike Color",
				"listFieldName": "BikeColor",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Beginning Datetime',
				'labelContent': 'Beginning',
				'listFieldName': 'Beginning',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'End Datetime',
				'labelContent': 'Ending',
				'listFieldName': 'Ending',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Emergency Contact Info',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Emergency Contact Number",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"helpNotes": [
					{
						"text": "E.g., 617-723-2500",
						"htmlID": "emergency-contact-number_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				],
				'addtlValidationType': 'validPhone'
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Emergency Contact Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"helpNotes": [
					{
						"text": "If someone other than yourself",
						"htmlID": "emergency-contact-name_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				]
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Other',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Additional Information",
				"labelContent": "Additional Information",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "check",
				'fieldName': "Agrees To Terms",
				'choiceSetLabel': "Terms & Conditions",
				'choices': [
					{
						'value': "agrees",
						'display': "I have read and understood the following terms and conditions"
					}
				],
				"hideForNonAdmin": [],
				"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "markup",
				"tag": "ul",
				"htmlID": "terms-and-conditions",
				"content": '<li>Garage hours are 5am - 12am. It will not be opened after hours unless special arrangements ' +
					'   have been made with the Public Safety Department <em>prior</em> to the start date of this request.</li>' +
					'<li>The Museum assumes no liability for any bikes left in the cage.</li>',
				"begin": 1,
				"end": 1,
				"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
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
