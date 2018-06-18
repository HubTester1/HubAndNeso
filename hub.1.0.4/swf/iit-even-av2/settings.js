(function ($) {

	var mData = {
		'componentID': 120,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 1,
		'devAdminNotifications': 1,
		'notifications': 0,
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
						'displayName': 'Event Name',
						'internalName': 'EventName'
					}, {
						'displayName': 'Event Date and Time',
						'internalName': 'EventBeginningDatetime',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
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
						'basicMyEOLQueryRelevantValue': 0,
						'getRequesterFrom': 'RequestedFor'
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 1,
						'getRequesterFrom': 'RequestedFor'
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackPendingAndApprovalAndCompleted': 1,
		'autoProcessAssignments': 1,
		'autoDateCompletion': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminAssignmentCompletionElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Complete", "display": "All work for this request has been completed" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				]
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'superSimpleChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 1, 'requester': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': ['Cancelled'] }
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				



				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'Quark Request',
				'labelContent': 'Quark Request',
				'editableForNonAdmin': [],
				'editableForAdmin': [],
			}, {


				
				
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Migrated From Quark",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Legacy ID",
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Event',
				'begin': 1,
				'end': 1
			/* }, {
				'elementType': 'field',
				'controlType': 'listItemChooser',
				'fieldName': 'Event Needs Request ID',
				'listFieldName': 'EventNeedsRequestID',
				'editableLabelContent': 'In-House Needs Sheet Request ID',
				'nonEditableLabelContent': 'In-House Needs Sheet Request',
				'choosingAnchorContent': 'Select from your In-House Needs Sheet Requests',
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],
				'dialogTitle': 'My Open In-House Needs Sheet Requests',
				'tData':
					{
						'commonColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'anchorNoHref': 1
							}, {
								'displayName': 'Request Nickname',
								'internalName': 'Title'
							}, {
								'displayName': 'Event Name',
								'internalName': 'EventName',
							}, {
								'displayName': 'Event Date',
								'internalName': 'EventDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						],
						'tables': [
							{
								'tableID': 'open',
								'webURL': 'https://bmos.sharepoint.com/sites/vxo-event-needs',
								'basicMyEOLQueryRelevantValue': 0
							}
						]
					},
				'addtlValidationType': 'validPositiveInteger',
				'helpNotes': [
					{
						'text': "E.g., 77",
						'htmlID': "help-note_event-needs-request-id",
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'hideButtonForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideButtonForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{ 'thisFieldIsPositiveInteger': 1, 'show': [{ 'divID': "label-and-control_Import-from-Event-Needs-Request" }] },
					{ 'thisFieldIsPositiveInteger': 0, 'hide': [{ 'divID': "label-and-control_Import-from-Event-Needs-Request" }] }
				],
			}, {
				'elementType': 'field',
				'controlType': 'buttonWithLabel',
				'fieldName': 'Import from Event Needs Request',
				'labelContent': 'Import event info from In-House Needs Sheet Request?',
				'buttonContent': 'Yes, import In-House Needs Sheet Request info',
				'helpNotes': [
					{
						'text': "You can change info here after it's imported",
						'htmlID': "help-note_import-from-event-needs-request",
					}
				],
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"], */
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Name',
				'listFieldName': 'EventName',
				'labelContent': 'Event Name',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Space',
				'labelContent': 'Space',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Beginning Datetime',
				'listFieldName': 'EventBeginningDatetime',
				'labelContent': 'Starting',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Ending Datetime',
				'labelContent': 'Ending',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Onsite Contact",
				"labelContent": "Onsite Contact",
				"yieldsViewPermissions": 1,
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Account Number',
				'labelContent': 'Account #',
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],







			/* }, {
				'elementType': 'field',
				'controlType': 'legacyFileSet',
				'fieldName': 'Legacy Files',
				'labelContent': 'Quark Files',



			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'attachments',
				'htmlClass': 'repeating-content-container',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'attachment',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'file',
				'fieldName': 'Attachment',
				'labelContent': 'Attachment',
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-attachment',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert an attachment',
				'repeatSectionID': 'attachment',
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1 */


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'attachments',
				'htmlClass': 'repeating-content-container',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'attachment',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Attachment',
				'labelContent': 'Attachment',
				'populatableForNonAdmin': [""],
				'populatableForAdmin': [""],
				'replaceableForNonAdmin': [""],
				'replaceableForAdmin': [""],
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-attachment',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert an attachment',
				'repeatSectionID': 'attachment',
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1







			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'AV Needs',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Delivery or Receipt',
				'choiceSetLabel': 'Delivery / Receipt',
				'choices': [
					{
						'value': 'pickup',
						'display': 'Pickup (1 day notice required)'
					}, {
						'value': 'delivery',
						'display': 'Delivery (3 days\' notice required)'
					}, {
						'value': 'techNeededForSetup',
						'display': 'Tech Needed for Setup (7 days\' notice required)'
					}, {
						'value': 'techNeededForDuration',
						'display': 'Tech Needed for Duration (7 days\' notice required)'
					}
				],
				'requiredForAdmin': [''],
				'requiredForNonAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Video',
				'choiceSetLabel': 'Video',
				'choices': [
					{
						'value': 'dvdPlayer',
						'display': 'DVD player'
					}
				],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Projection',
				'choiceSetLabel': 'Projection',
				'choices': [
					{
						'value': 'display',
						'display': 'Display'
					}, {
						'value': 'cartAndCables',
						'display': 'Display cart and cables'
					}, {
						'value': 'laserPointer',
						'display': 'Laser Pointer'
					}
				],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Audio',
				'choiceSetLabel': 'Audio',
				'choices': [
					{
						'value': 'podium',
						'display': 'Podium'
					}, {
						'value': 'mic',
						'display': 'Microphone'
					}, {
						'value': 'cdPlayer',
						'display': 'CD Player'
					}, {
						'value': 'soundSystem',
						'display': 'Sound System'
					}, {
						'value': 'assistiveListeningDevice',
						'display': 'Assistive Listening Device'
					}
				],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Anything Else?',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Additional Information',
				'labelContent': 'Additional Information',
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast =	'$("#Import-from-Event-Needs-Request").on("click", function () { \n' +
								'	$().ImportEventNeedsRequestDataToEventAVRequest($("#id-or-link_Event-Needs-Request-ID").val()); \n' +
								'}); \n';

	fData.CustomScriptLast +=	'if ($("a#id-or-link_Event-Needs-Request-ID").attr("href") == "") { \n' +
								'	$("div#label-and-control_Event-Needs-Request-ID").hide("fast").addClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast +=	'if ($("a#Attachment").attr("href") == "") { \n' +
								'	$("div#attachments").hide("fast").addClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast +=	'if ($("div#Legacy-Files").html() == "") { \n' + 
								'	$("div#label-and-control_Legacy-Files").hide("fast").addClass("hidden"); \n' + 
								'} \n';

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
