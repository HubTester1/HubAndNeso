
(function ($) {

	var mData = {
		'componentID': 20074,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m2");








	var dev = '-dev-';










	var oData = {
		'my': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "Upcoming Talks",
					"href": "/sites/" + dev + "mw-coffee-talk/SitePages/App.aspx?f=p",
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
						'displayName': "Title",
						'internalName': "TalkTitle",
					}, {
						'displayName': 'Speaker(s)',
						'internalName': 'Speakers',
						'userName': 1
					}, {
						'displayName': "Date & Time",
						'internalName': "Datetime",
						'friendlyFormatOnLoad': {
							'incomingFormat': null,
							'returnFormat': 'dddd, MMM D, YYYY, hA',
							'determineYearDisplayDynamically': 1
						}
					}, {
						'displayName': "Space",
						'internalName': "Space",
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
		'autoTrackPendingAndApproval': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Cancel", "display": "This request has been cancelled" },
				]
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'superSimpleChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 1, 'requester': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': 1 }
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': "markup",
				'tag': "h2",
				'content': "Talk Details",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Talk Title",
				'listFieldName': 'TalkTitle',
				'labelContent': "Title",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Disapproved', 'Cancelled'],
				"disabledForAdmin": ['Disapproved', 'Cancelled'],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Speakers",
				"labelContent": "Speaker(s)",
				'listFieldName': 'Speakers',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
				'helpNotes': [{
					'text': 'Include yourself, if you\'re a speaker.',
					'htmlID': "talk-speakers",
					'hideForNonAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
					'hideForAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"]
				}],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Description',
				'labelContent': 'Description',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Datetime',
				'listFieldName': 'Datetime',
				'labelContent': 'Date and Time',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
				'helpNotes': [{
					'text': 'Talks occur every other Wednesday at 9 am and alternate Wednesdays at 3:30 pm. Please make sure you\'re requesting an open spot.',
					'htmlID': "talk-datetime",
					'hideForNonAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
					'hideForAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"]
				}],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Space',
				'listFieldName': 'Space',
				'labelContent': 'Space',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
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
