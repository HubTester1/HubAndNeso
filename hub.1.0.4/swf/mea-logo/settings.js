
(function ($) {

	var mData = {
		'componentID': 116,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m2");



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
			'preamble': '<p>If you will be sending a logo to a vendor, please ' + 
				'<a href="/sites/mea-mc-project/SitePages/App.aspx">submit a MarCom Project Request</a> instead.</p>' +
				'<p>Marketing Communications oversees implementation of the brand. There are several versions of the logo and ' + 
				'address lines, and strict regulations about how they should be displayed. Please consult with us about ' +
				'logo use and the nature of your project.</p>' + 
				'<p><strong>A minimum of two business days is required.</strong></p>',
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
		'logoReqNotifications': 1,
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'The Logo(s)',
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
				'controlType': 'select',
				'fieldName': 'Usage',
				'labelContent': 'How Will Logo(s) be Used?',
				'setOptions': [
					{ 'value': 'Vendor', 'display': 'Sending to vendor' },
					{ 'value': 'Partner', 'display': 'Sending to partner' },
					{ 'value': 'Own', 'display': 'For my own use' },
				],
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'helpNotes': [
					{
						'text': 'Please submit a <a href="https://bmos.sharepoint.com/sites/mea-mc-project/SitePages/App.aspx">MarCom Project Request</a> instead.',
						'htmlID': 'submit-project-request',
						'emphasis': 1,
						'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
						'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
					}
				],
				'onChange': [
					{ 'thisFieldEquals': ['Own'], 'show': [{ 'fieldName': 'Usage Explanation' }], 'require': [{ 'fieldName': 'Usage Explanation', 'type': 'textarea' }], 'hide': [{ 'noteID': 'submit-project-request' }] },
					{ 'thisFieldEquals': ['', 'Partner'], 'hide': [{ 'fieldName': 'Usage Explanation' }, { 'noteID': 'submit-project-request' }], 'optional': [{ 'fieldName': 'Usage Explanation', 'type': 'textarea' }] },
					{ 'thisFieldEquals': ['Vendor'], 'hide': [{ 'fieldName': 'Usage Explanation' }], 'optional': [{ 'fieldName': 'Usage Explanation', 'type': 'textarea' }], 'show': [{ 'noteID': 'submit-project-request' }] },
				]
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Usage Explanation',
				'labelContent': 'Please Explain Usage',
				'disabledForNonAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Submitted', 'Completed', 'Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
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
						'text': "Due to the short notice, logo(s) may not be ready by this date.",
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
				'controlType': 'textarea',
				'fieldName': 'Description',
				'labelContent': 'Which Logo(s) Do You Need?',
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
