(function ($) {

	var mData = {
		'componentID': 118,
		"swf": 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 2,
		'devAdminNotifications': 0,
		'notifications': 1
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
						'displayName': 'Request Nickname',
						'internalName': 'Title'
					}, {
						'displayName': 'Needed Date',
						'internalName': 'NeededDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Event Date',
						'internalName': 'EventDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Requested By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Quantity',
						'internalName': 'Quantity'
					}, {
						'displayName': 'Budget',
						'internalName': 'Budget'
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }                    }
				],
				'tables': [
					{
						'tableTitle': 'Open',
						'tableID': 'open',
						'someColsAreUsers': 1,
						'sortColAndOrder': [0, 'desc'],
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
						'displayName': 'Quantity',
						'internalName': 'Quantity'
					}, {
						'displayName': 'Needed Date',
						'internalName': 'NeededDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Event Date',
						'internalName': 'EventDate',
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
		'autoTrackSubmissionAndCancellation': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Cancel", "display": "This request has been cancelled" }
				]
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'mcProjectReqNotifications': 1,
		'versioningMatters': 0,

		'uniqueElements': [
			{
					'elementType': 'markup',
					'tag': 'h2',
					'content': 'The Project',
					'begin': 1,
					'end': 1
				}, {
					'elementType': 'field',
					'controlType': 'text',
					'fieldName': 'Project Name',
					'labelContent': 'Project Name',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'requiredForNonAdmin': [''],
					'requiredForAdmin': [''],
				}, {
					'elementType': 'field',
					'controlType': 'select',
					'fieldName': 'Project Type',
					'labelContent': 'Project Type',
					'setOptions': [
						{ 'value': 'New Print Project', 'display': 'New Print Project' },
						{ 'value': 'Reprint with Changes', 'display': 'Reprint with Changes' },
						{ 'value': 'Reprint with NO Changes', 'display': 'Reprint with NO Changes' },
						{ 'value': 'New Sign', 'display': 'New Sign' },
						{ 'value': 'New Slide or Colorvision', 'display': 'New Slide / Colorvision' },
						{ 'value': 'New PDF', 'display': 'New PDF' },
						{ 'value': 'New Other', 'display': 'New Other' }
					],
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'requiredForNonAdmin': [''],
					'requiredForAdmin': [''],
					'onChange': [
						{
							'thisFieldEquals': ['Reprint with Changes', 'Reprint with NO Changes'], 
							'show': [{ 'fieldName': 'Budget' }], 
							'require': [{ 'fieldName': 'Budget', 'type': 'radio' }],
							'hide': [{ 'fieldName': 'VP Approval' }, { 'fieldName': 'Describe Other Project Type' }, { 'fieldName': 'Sign Type' }], 
							'optional': [{ 'fieldName': 'VP Approval', 'type': 'check' }, { 'fieldName': 'Describe Other Project Type', 'type': 'textarea' }, { 'fieldName': 'Sign Type', 'type': 'select' }] 
						}, { 
							'thisFieldEquals': ['New Print Project'], 
							'show': [{ 'fieldName': 'Budget' }, { 'fieldName': 'VP Approval' }], 
							'require': [{ 'fieldName': 'Budget', 'type': 'radio' }, { 'fieldName': 'VP Approval', 'type': 'check' }], 
							'hide': [{ 'fieldName': 'Describe Other Project Type' }, { 'fieldName': 'Sign Type' }], 
							'optional': [{ 'fieldName': 'Describe Other Project Type', 'type': 'textarea' }, { 'fieldName': 'Sign Type', 'type': 'select' }] 
						}, { 
							'thisFieldEquals': ['New Other'], 
							'show': [{ 'fieldName': 'VP Approval' }, { 'fieldName': 'Budget' }, { 'fieldName': 'Describe Other Project Type' }], 
							'require': [{ 'fieldName': 'VP Approval', 'type': 'check' }, { 'fieldName': 'Budget', 'type': 'radio' }, { 'fieldName': 'Describe Other Project Type', 'type': 'textarea' }], 
							'hide': [{ 'fieldName': 'Sign Type' }], 
							'optional': [{ 'fieldName': 'Sign Type', 'type': 'select' }]
						}, { 
							'thisFieldEquals': ['New Sign'], 
							'show': [{ 'fieldName': 'Sign Type' }], 
							'require': [{ 'fieldName': 'Sign Type', 'type': 'select' }], 
							'hide': [{ 'fieldName': 'Budget' }, { 'fieldName': 'VP Approval' }, { 'fieldName': 'Describe Other Project Type' }],
							'optional': [{ 'fieldName': 'Budget', 'type': 'radio' }, { 'fieldName': 'VP Approval', 'type': 'check' }, { 'fieldName': 'Describe Other Project Type', 'type': 'textarea' }] 
						},{ 
							'thisFieldEquals': ['New PDF', 'New Slide or Colorvision', ''], 
							'hide': [{ 'fieldName': 'Budget' }, { 'fieldName': 'VP Approval' }, { 'fieldName': 'Describe Other Project Type' }, { 'fieldName': 'Sign Type' }], 
							'optional': [{ 'fieldName': 'Budget', 'type': 'radio' }, { 'fieldName': 'VP Approval', 'type': 'check' }, { 'fieldName': 'Describe Other Project Type', 'type': 'textarea' }, { 'fieldName': 'Sign Type', 'type': 'select' }]
						},
					]
				}, {
					'elementType': 'field',
					'controlType': 'textarea',
					'fieldName': 'Describe Other Project Type',
					'labelContent': 'Describe Other Project Type',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted','Completed', 'Cancelled'],
				}, {
					'elementType': 'field',
					'controlType': 'check',
					'fieldName': 'VP Approval',
					'choiceSetLabel': 'VP Approval',
					'choices': [
						{
							'value': 'approved',
							'display': 'Yes, this project has been approved by the VP of my division'
						}
					],
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted','Completed', 'Cancelled'],
				}, {
					'elementType': 'field',
					'controlType': 'radio',
					'fieldName': 'Budget',
					'listFieldName': 'Budget',
					'choiceSetLabel': 'Budget',
					'choices': [
						{
							'value': 'dept',
							'display': 'My department pays for printing'
						}, {
							'value': 'marCom',
							'display': 'MarCom pays for printing'
						}
					],
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted','Completed', 'Cancelled'],
				}, {
					'elementType': 'field',
					'controlType': 'select',
					'fieldName': 'Sign Type',
					'labelContent': 'Sign Type',
					'setOptions': [
						{ 'value': '22x28', 'display': 'Standard Stantion (22 x 28)' },
						{ 'value': '85x11', 'display': 'Tabletop with easel back (8.5 x 11)' },
						{ 'value': 'Nameplate', 'display': 'Nameplate' },
						{ 'value': 'Other', 'display': 'Other' }
					],
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
					'onChange': [
						{
							'thisFieldEquals': ['Other'],
							'show': [{ 'fieldName': 'Describe Other Sign Type' }],
							'require': [{ 'fieldName': 'Describe Other Sign Type', 'type': 'textarea' }], 
							'hide': [{ 'fieldName': 'Nameplate Type' }], 
							'optional': [{ 'fieldName': 'Nameplate Type', 'type': 'select' }]
						}, { 
							'thisFieldEquals': ['Nameplate'], 
							'show': [{ 'fieldName': 'Nameplate Type' }], 
							'require': [{ 'fieldName': 'Nameplate Type', 'type': 'select' }], 
							'hide': [{ 'fieldName': 'Describe Other Sign Type' }], 
							'optional': [{ 'fieldName': 'Describe Other Sign Type', 'type': 'textarea' }] 
						}, { 
							'thisFieldEquals': ['22x28', '85x11'], 
							'hide': [{ 'fieldName': 'Nameplate Type' }, { 'fieldName': 'Describe Other Sign Type' }], 
							'optional': [{ 'fieldName': 'Nameplate Type', 'type': 'select' }, { 'fieldName': 'Describe Other Sign Type', 'type': 'textarea' }]
						},
					]
				}, {
					'elementType': 'field',
					'controlType': 'textarea',
					'fieldName': 'Describe Other Sign Type',
					'labelContent': 'Describe Other Sign Type',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted','Completed', 'Cancelled'],
				}, {
					'elementType': 'field',
					'controlType': 'select',
					'fieldName': 'Nameplate Type',
					'labelContent': 'Nameplate Type',
					'setOptions': [
						{ 'value': 'Desk', 'display': 'Desk' },
						{ 'value': 'Directory', 'display': 'Directory' },
						{ 'value': 'Both', 'display': 'Both Desk & Directory' },
						{ 'value': 'Other', 'display': 'Other' }
					],
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted', 'Completed', 'Cancelled'],
					'onChange': [
						{ 
							'thisFieldEquals': ['Desk', 'Both'], 
							'show': [{ 'fieldName': 'Nameplate Name' }, { 'fieldName': 'Nameplate Dept' }], 
							'require': [{ 'fieldName': 'Nameplate Name', 'type': 'text' }, { 'fieldName': 'Nameplate Dept', 'type': 'text' }], 
							'hide': [{ 'fieldName': 'Describe Other Nameplate Type' }], 
							'optional': [{ 'fieldName': 'Describe Other Nameplate Type', 'type': 'textarea' }]
						}, { 
							'thisFieldEquals': ['Directory'], 
							'show': [{ 'fieldName': 'Nameplate Name' }], 
							'require': [{ 'fieldName': 'Nameplate Name', 'type': 'text' }], 
							'hide': [{ 'fieldName': 'Describe Other Nameplate Type' }, { 'fieldName': 'Nameplate Dept' }], 
							'optional': [{ 'fieldName': 'Describe Other Nameplate Type', 'type': 'textarea' }, { 'fieldName': 'Nameplate Dept', 'type': 'text' }]
						}, { 
							'thisFieldEquals': ['Other'], 
							'show': [{ 'fieldName': 'Describe Other Nameplate Type' }], 
							'require': [{ 'fieldName': 'Describe Other Nameplate Type', 'type': 'textarea' }], 
							'hide': [{ 'fieldName': 'Nameplate Name' }, { 'fieldName': 'Nameplate Dept' }], 
							'optional': [{ 'fieldName': 'Nameplate Name', 'type': 'text' }, { 'fieldName': 'Nameplate Dept', 'type': 'text' }]
						}, { 
							'thisFieldEquals': [''], 
							'hide': [{ 'fieldName': 'Describe Other Nameplate Type' }, { 'fieldName': 'Nameplate Name' }, { 'fieldName': 'Nameplate Dept' }],
							'optional': [{ 'fieldName': 'Describe Other Nameplate Type', 'type': 'textarea' }, { 'fieldName': 'Nameplate Name', 'type': 'text' }, { 'fieldName': 'Nameplate Dept', 'type': 'text' }]
						},
					]
				}, {
					'elementType': 'field',
					'controlType': 'text',
					'fieldName': 'Nameplate Name',
					'labelContent': 'Nameplate Name',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted','Completed', 'Cancelled'],
				}, {
					'elementType': 'field',
					'controlType': 'text',
					'fieldName': 'Nameplate Dept',
					'labelContent': 'Nameplate Dept',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted','Completed', 'Cancelled'],
				}, {
					'elementType': 'field',
					'controlType': 'textarea',
					'fieldName': 'Describe Other Nameplate Type',
					'labelContent': 'Describe Other Nameplate Type',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['', 'Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['', 'Submitted','Completed', 'Cancelled'],







				}, {
					'elementType': 'field',
					'controlType': 'text',
					'fieldName': 'Quantity',
					'labelContent': 'Quantity',
					'listFieldName': 'Quantity',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'requiredForNonAdmin': [''],
					'requiredForAdmin': [''],
				}, {
					'elementType': 'field',
					'controlType': 'datePicker',
					'fieldName': 'Needed Date',
					'labelContent': 'Needed Date',
					'listFieldName': 'NeededDate',
					'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
					'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'requiredForNonAdmin': [''],
					'requiredForAdmin': [''],
				}, {
					'elementType': 'field',
					'controlType': 'datePicker',
					'fieldName': 'Event Date',
					'labelContent': 'Event Date',
					'listFieldName': 'EventDate',
					'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
					'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'requiredForNonAdmin': [''],
					'requiredForAdmin': [''],
				}, {
					'elementType': 'field',
					'controlType': 'textarea',
					'fieldName': 'Description',
					'labelContent': 'Description',
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'requiredForNonAdmin': [''],
					'requiredForAdmin': [''],






				}, {
					'elementType': 'markup',
					'tag': 'div',
					'begin': 1,
					'htmlID': 'attachments',
					'htmlClass': 'repeating-content-container',
					'hideForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['Submitted','Completed', 'Cancelled'],
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
					'requestVersion': 1,
					'fieldName': 'Attachment',
					'labelContent': 'Attachment',
					'editableForNonAdmin': [''],
					'editableForAdmin': [''],



				}, {
					'elementType': 'field',
					'controlType': 'mosFile',
					'requestVersion': 2,
					'fieldName': 'Attachment Two',
					'labelContent': 'Attachment',
					'populatableForNonAdmin': [""],
					'populatableForAdmin': [""],
					'replaceableForNonAdmin': [""],
					'replaceableForAdmin': [""],
					'helpNotes': [
						{
							'text': "Files larger than 20 MB may take a long time to upload",
							'htmlID': "file-attachment-size-recommendation",
							'hideForNonAdmin': ['Submitted','Completed', 'Cancelled'],
							'hideForAdmin': ['Submitted','Completed', 'Cancelled']
						}
					],







				}, {
					'elementType': "markup",
					'tag': "a",
					'begin': 1,
					'end': 1,
					'htmlClass': "remove-section-anchor",
					'content': "Remove",
					'removeThisRepeat': 1,
					'hideForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['Submitted','Completed', 'Cancelled'],
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
					'disabledForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'disabledForAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForNonAdmin': ['Submitted','Completed', 'Cancelled'],
					'hideForAdmin': ['Submitted','Completed', 'Cancelled'],
				}, {
					'elementType': 'markup',
					'tag': 'div',
					'end': 1
				}
		]
	};


	// configure customScript for this SWF here
	//    (fData.CustomScriptFirst will be prepended to auto-generated script)
	//    (fData.CustomScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = 'if ($("textarea#Describe-Other-Project-Type").val() != "") { \n' +
								'   $("div#label-and-control_Describe-Other-Project-Type").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("input#vp-approval_approved").is(":checked")) { \n' +
								'   $("div#label-and-control_VP-Approval").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("input#budget_dept").is(":checked") || $("input#budget_marcom").is(":checked")) { \n' +
								'   $("div#label-and-control_Budget").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("select#Sign-Type").val() != "") { \n' +
								'   $("div#label-and-control_Sign-Type").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("textarea#Describe-Other-Sign-Type").val() != "") { \n' +
								'   $("div#label-and-control_Describe-Other-Sign-Type").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("select#Nameplate-Type").val() != "") { \n' +
								'   $("div#label-and-control_Nameplate-Type").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("input#Nameplate-Name").val() != "") { \n' +
								'   $("div#label-and-control_Nameplate-Name").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("input#Nameplate-Dept").val() != "") { \n' +
								'   $("div#label-and-control_Nameplate-Dept").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 'if ($("textarea#Describe-Other-Nameplate-Type").val() != "") { \n' +
								'   $("div#label-and-control_Describe-Other-Nameplate-Type").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += '$(\'a[id^="Attachment"]\').each(function() { \n' + 
								'   if ($(this).attr("href") != "") { \n' + 
								'       $("div#attachments").show("fast").removeClass("hidden"); \n' + 
								'   } \n' + 
								'}); \n';

	fData.CustomScriptLast += '$(\'a[id^="mos-drag-and-drop-file-container_Attachment-Two"]\').each(function() { \n' + 
								'   if ($(this).attr("href") != "") { \n' + 
								'       $("div#attachments").show("fast").removeClass("hidden"); \n' + 
								'   } \n' + 
								'}); \n';

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
