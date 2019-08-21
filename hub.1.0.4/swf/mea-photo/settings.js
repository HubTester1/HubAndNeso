
(function ($) {

	var mData = {
		'componentID': 117,
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
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Needed Date',
						'internalName': 'NeededDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Modified By',
						'internalName': 'Editor',
						'userName': 1
					}, {
						'displayName': 'Modified',
						'internalName': 'Modified',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Open',
						'tableID': 'open',
						'someColsAreUsers': 1,
						'basicEOLQueryRelevantValue': 0,
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicEOLQueryRelevantValue': 1,
					}
				]
			}
		},
		'my': {
			'buttons': [
			],
			'preamble': '<p>Marketing Communications has a large collection of images that are approved for general use.</p>' +
			'<p><strong>A minimum of two business days is required</strong>.</p>',
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
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Needed Date',
						'internalName': 'NeededDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
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
		'autoTrackSubmissionAndCompletionAndCancellation': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Complete", "display": "All work for this request has been completed" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				]
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'photoReqNotifications': 1,
		'versioningMatters': 0,







		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'The Photo(s)',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Project Name',
				'labelContent': 'Project Name',
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Needed Date',
				'listFieldName': 'NeededDate',
				'labelContent': 'Date Needed',
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'helpNotes': [
					{
						'text': 'Must be at least two business days from today',
						'htmlID': 'date-needed_help-note',
						'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
						'hideForAdmin': ['Submitted', 'Completed', 'Cancelled']
					}, {
						'text': "Due to the short notice, photo(s) may not be ready by this date.",
						'htmlID': "needed-date-too-soon",
						'emphasis': 1,
						'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
						'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
					}
				],
				'onChange': [
					{ 'thisDateFieldLessThanDaysFromNow': "2", 'show': [{ 'noteID': "needed-date-too-soon" }] },
					{ 'thisDateFieldGreaterThanDaysFromNowEqualTo': "2", 'hide': [{ 'noteID': "needed-date-too-soon" }] }
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'File Type',
				'labelContent': 'File Type(s)',
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'If specific types are needed; e.g., EPS, TIFF, JPG, GIF, etc.',
						'htmlID': 'file-types_help-note',
						'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
						'hideForAdmin': ['Submitted', 'Completed', 'Cancelled']
					}
				]
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Photo Description or Sample',
				'choiceSetLabel': 'Do you prefer to describe the photo you need or attach a sample?',
				'choices': [
					{
						'value': 'describe',
						'display': 'I\'ll describe the photo'
					}, {
						'value': 'attach',
						'display': 'I\'ll attach a sample'
					}
				],
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'onChange': [
					{
						"thisFieldEquals": ["describe"],
						"hide": [
							{ "fieldName": "Attachment" },
						],
						"optional": [
							{ "fieldName": "Attachment", "type": "mosFile" },
						],
						"show": [
							{ "fieldName": "Description" },
						],
						"require": [
							{ "fieldName": "Description", "type": "textarea" },
						],
					}, {
						"thisFieldEquals": ["attach"],
						"hide": [
							{ "fieldName": "Description" },
						],
						"optional": [
							{ "fieldName": "Description", "type": "textarea" },
						],
						"show": [
							{ "fieldName": "Attachment" },
						],
						"require": [
							{ "fieldName": "Attachment", "type": "mosFile" },
						],
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Description',
				'labelContent': 'Photo Description',
				'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'helpNotes': [
					{
						'text': 'E.g., venue-specific photos (places and things), emotive photos (people) specified by the brand',
						'htmlID': 'photo-description_help-note',
						'hideForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
						'hideForAdmin': ['Submitted', 'Completed', 'Cancelled']
					}
				],
				/* 'onChange': [
					{ 'thisFieldNotEquals': [''], 'optional': [{ 'fieldName': 'Attachment' }] },
					{ 'thisFieldEquals': [''], 'require': [{ 'fieldName': 'Attachment' }] }
				], */
			/* }, {
				'elementType': 'field',
				'controlType': 'file',
				'fieldName': 'Attachment',
				'labelContent': '...or Attach a Sample',
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'onChange': [
					{ 'thisFieldNotEquals': [''], 'optional': [{ 'fieldName': 'Description' }] },
					{ 'thisFieldEquals': [''], 'require': [{ 'fieldName': 'Description' }] }
				], */

			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Attachment',
				'labelContent': 'Sample Photo',
				'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'populatableForNonAdmin': [""],
				'populatableForAdmin': [""],
				'replaceableForNonAdmin': [''],
				'replaceableForAdmin': [''],
				// 'requiredForNonAdmin': [''],
				// 'requiredForAdmin': [''],
				/* 'onChange': [
					{ 'thisFieldNotEquals': [''], 'optional': [{ 'fieldName': 'Description' }] },
					{ 'thisFieldEquals': [''], 'require': [{ 'fieldName': 'Description' }] }
				], */










			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Usage',
				'labelContent': 'Where and How Will the Photo(s) be Used?',
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';
	fData.CustomScriptLast = '';

	fData.CustomScriptLast += 'if($(\'input[name="Photo-Description-or-Sample"]:checked\').val() === "attach") {' +
		'	$("div#label-and-control_Attachment").removeClass("hidden"); \n' +
		'}; \n';

	fData.CustomScriptLast += 'if($(\'input[name="Photo-Description-or-Sample"]:checked\').val() === "describe") {' +
		'	$("div#label-and-control_Description").removeClass("hidden"); \n' +
		'}; \n';

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
