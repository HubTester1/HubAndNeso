(function ($) {

	var mData = {
		'componentID': 73,
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


	// admin screen is hard-coded in API > RenderCommandBarAndDatatablesForEventAVForAdmin()
	var oData = {
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
			'standardPrintButton': {
				'buttonText': 'Print Request',
				'printFunction': 'PrintIITEventAVRequest',
				'hideForNonAdmin': [""],
				'hideForAdmin': [""],
			},
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
		'autoPopulateRequestedBy': 1,
		'superSimpleChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 1, 'requester': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': ['Cancelled'] }
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
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
					"disabledForAdmin": [], */
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Name',
				'listFieldName': 'EventName',
				'labelContent': 'Event Name',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Additional Information',
				'labelContent': 'Event Description',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Space',
				'listFieldName': 'EventSpace',
				'labelContent': 'Space',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'AV Beginning Datetime',
				'listFieldName': 'AVBeginningDatetime',
				'labelContent': 'Tech Check-in or Equipment Pick Up Time',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Beginning Datetime',
				'listFieldName': 'EventBeginningDatetime',
				'labelContent': 'Event Starting',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Ending Datetime',
				'listFieldName': 'EventEndingDatetime',
				'labelContent': 'Event Ending',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				'requestVersion': 1,
				"fieldName": "Onsite Contact",
				"labelContent": "Onsite Contact",
				"yieldsViewPermissions": 1,
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				"elementType": "field",
				"controlType": "text",
				'requestVersion': 2,
				"fieldName": "Onsite Contact",
				"labelContent": "Onsite Contact Name",
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
				'helpNotes': [
					{
						'text': "Please provide a first and last name",
						'htmlID': "help-note_onsite-contact-name",
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Account Number',
				'labelContent': 'Account #',
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],

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
				'populatableForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'replaceableForNonAdmin': [""],
				'replaceableForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
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
				'content': 'Equipment Needs',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Delivery or Receipt',
				'listFieldName': 'DeliveryOrReceipt',
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
				"disabledForAdmin": []
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'requestVersion': 1,
				'fieldName': 'Video',
				'choiceSetLabel': 'Video',
				'choices': [
					{
						'value': 'dvdPlayer',
						'display': 'DVD player'
					}
				],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'requestVersion': 1,
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
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'requestVersion': 2,
				'fieldName': 'Display',
				'choiceSetLabel': 'Display',
				'choices': [
					{
						'value': 'projection',
						'display': 'Projection'
						// }, {
						// 	'value': 'laserPointer',
						// 	'display': 'Laser Pointer'
					}, {
						'value': 'monitor',
						'display': 'Monitor'
					}, {
						'value': 'dvdPlayer',
						'display': 'DVD player'
					}, {
						'value': 'cstScreen',
						'display': 'CS&T Screen'
					}, {
						'value': 'other',
						'display': 'Other'
					}
				],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#display_other'],
						'show': [
							{ 'fieldName': 'Other Display' },
						],
						'require': [
							{ 'fieldName': 'Other Display', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#display_other'],
						'hide': [
							{ 'fieldName': 'Other Display' },
						],
						'optional': [
							{ 'fieldName': 'Other Display', 'type': 'text' },
						],
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Other Display',
				'labelContent': 'What other display?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'requestVersion': 1,
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
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'requestVersion': 2,
				'fieldName': 'Audio',
				'choiceSetLabel': 'Audio',
				'choices': [
					{
						'value': 'avMusic',
						'display': 'AV-Provided Music'
					}, {
						'value': 'clientMusic',
						'display': 'Client-Provided Music'
					}, {
						'value': 'podium',
						'display': 'Podium'
					}, {
						'value': 'mic',
						'display': 'Microphone'
					}, {
						'value': 'portableSoundSystem',
						'display': 'Portable Sound System'
					}, {
						'value': 'assistiveListeningDevice',
						'display': 'Assistive Listening Device'
					}, {
						'value': 'other',
						'display': 'Other'
					}
				],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#audio_other'],
						'show': [
							{ 'fieldName': 'Other Audio' },
						],
						'require': [
							{ 'fieldName': 'Other Audio', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#audio_other'],
						'hide': [
							{ 'fieldName': 'Other Audio' },
						],
						'optional': [
							{ 'fieldName': 'Other Audio', 'type': 'text' },
						],
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#audio_mic'],
						'show': [
							{ 'fieldName': 'Mic Types' },
						],
						'require': [
							{ 'fieldName': 'Mic Types', 'type': 'check' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#audio_mic'],
						'hide': [
							{ 'fieldName': 'Mic Types' },
						],
						'optional': [
							{ 'fieldName': 'Mic Types', 'type': 'check' },
						],
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'requestVersion': 2,
				'fieldName': 'Mic Types',
				'choiceSetLabel': 'Mic Types',
				'choices': [
					{
						'value': 'headset',
						'display': 'Headset'
					}, {
						'value': 'lavalier',
						'display': 'Lavalier'
					}, {
						'value': 'handheld',
						'display': 'Handheld'
					}, {
						'value': 'podium',
						'display': 'Podium'
					}, {
						'value': 'stand',
						'display': 'Stand'
					}
				],
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#mic-types_headset'],
						'show': [
							{ 'fieldName': 'Headset Mic Quantity' },
						],
						'require': [
							{ 'fieldName': 'Headset Mic Quantity', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#mic-types_headset'],
						'hide': [
							{ 'fieldName': 'Headset Mic Quantity' },
						],
						'optional': [
							{ 'fieldName': 'Headset Mic Quantity', 'type': 'text' },
						],



					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#mic-types_lavalier'],
						'show': [
							{ 'fieldName': 'Lavalier Mic Quantity' },
						],
						'require': [
							{ 'fieldName': 'Lavalier Mic Quantity', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#mic-types_lavalier'],
						'hide': [
							{ 'fieldName': 'Lavalier Mic Quantity' },
						],
						'optional': [
							{ 'fieldName': 'Lavalier Mic Quantity', 'type': 'text' },
						],



					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#mic-types_handheld'],
						'show': [
							{ 'fieldName': 'Handheld Mic Quantity' },
						],
						'require': [
							{ 'fieldName': 'Handheld Mic Quantity', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#mic-types_handheld'],
						'hide': [
							{ 'fieldName': 'Handheld Mic Quantity' },
						],
						'optional': [
							{ 'fieldName': 'Handheld Mic Quantity', 'type': 'text' },
						],



					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#mic-types_podium'],
						'show': [
							{ 'fieldName': 'Podium Mic Quantity' },
						],
						'require': [
							{ 'fieldName': 'Podium Mic Quantity', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#mic-types_podium'],
						'hide': [
							{ 'fieldName': 'Podium Mic Quantity' },
						],
						'optional': [
							{ 'fieldName': 'Podium Mic Quantity', 'type': 'text' },
						],



					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#mic-types_stand'],
						'show': [
							{ 'fieldName': 'Stand Mic Quantity' },
						],
						'require': [
							{ 'fieldName': 'Stand Mic Quantity', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#mic-types_stand'],
						'hide': [
							{ 'fieldName': 'Stand Mic Quantity' },
						],
						'optional': [
							{ 'fieldName': 'Stand Mic Quantity', 'type': 'text' },
						],



					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Headset Mic Quantity',
				'labelContent': 'How many headset mics?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Lavalier Mic Quantity',
				'labelContent': 'How many lavalier mics?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Handheld Mic Quantity',
				'labelContent': 'How many handheld mics?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Podium Mic Quantity',
				'labelContent': 'How many podium mics?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Stand Mic Quantity',
				'labelContent': 'How many stand mics?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],


			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Other Audio',
				'labelContent': 'What other audio equipment?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],





			}, {
				'elementType': 'field',
				'controlType': 'check',
				'requestVersion': 2,
				'fieldName': 'Miscellaneous Equipment',
				'choiceSetLabel': 'Miscellaneous',
				'choices': [
					{
						'value': 'laserPointer',
						'display': 'Laser Pointer'
					}, {
						'value': 'powerStrips',
						'display': 'Power Strips'
					}
				],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],
				"disabledForAdmin": [],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#miscellaneous-equipment_powerstrips'],
						'show': [
							{ 'fieldName': 'Power Strip Quantity' },
						],
						'require': [
							{ 'fieldName': 'Power Strip Quantity', 'type': 'text' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#miscellaneous-equipment_powerstrips'],
						'hide': [
							{ 'fieldName': 'Power Strip Quantity' },
						],
						'optional': [
							{ 'fieldName': 'Power Strip Quantity', 'type': 'text' },
						],
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'requestVersion': 2,
				'fieldName': 'Power Strip Quantity',
				'labelContent': 'How many power strips?',
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": [],



			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = '$("#Import-from-Event-Needs-Request").on("click", function () { \n' +
		'	$().ImportEventNeedsRequestDataToEventAVRequest($("#id-or-link_Event-Needs-Request-ID").val()); \n' +
		'}); \n';

	fData.CustomScriptLast += 'if ($("a#id-or-link_Event-Needs-Request-ID").attr("href") == "") { \n' +
		'	$("div#label-and-control_Event-Needs-Request-ID").hide("fast").addClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("a#Attachment").attr("href") == "") { \n' +
		'	$("div#attachments").hide("fast").addClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("div#Legacy-Files").html() == "") { \n' +
		'	$("div#label-and-control_Legacy-Files").hide("fast").addClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += '$("div#container_about-the-requester").hide("fast").addClass("hidden"); \n';

	fData.CustomScriptLast += '$("div#label-and-control_New-Admin-Notes").hide("fast").addClass("hidden"); \n';

	fData.CustomScriptLast += 'if ($("input#display_other").is(":checked")) { \n' +
		'	$("div#label-and-control_Other-Display").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#audio_other").is(":checked")) { \n' +
		'	$("div#label-and-control_Other-Audio").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#audio_mic").is(":checked")) { \n' +
		'	$("div#label-and-control_Mic-Types").show("fast").removeClass("hidden"); \n' +
		'} \n';




	fData.CustomScriptLast += 'if ($("input#mic-types_headset").is(":checked")) { \n' +
		'	$("div#label-and-control_Headset-Mic-Quantity").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#mic-types_lavalier").is(":checked")) { \n' +
		'	$("div#label-and-control_Lavalier-Mic-Quantity").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#mic-types_handheld").is(":checked")) { \n' +
		'	$("div#label-and-control_Handheld-Mic-Quantity").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#mic-types_podium").is(":checked")) { \n' +
		'	$("div#label-and-control_Podium-Mic-Quantity").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#mic-types_stand").is(":checked")) { \n' +
		'	$("div#label-and-control_Stand-Mic-Quantity").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#miscellaneous-equipment_powerstrips").is(":checked")) { \n' +
		'	$("div#label-and-control_Power-Strip-Quantity").show("fast").removeClass("hidden"); \n' +
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
