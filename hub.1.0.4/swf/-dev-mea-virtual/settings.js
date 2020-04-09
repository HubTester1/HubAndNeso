
(function ($) {

	var mData = {
		'componentID': 20064,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
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
						'displayName': 'Work Approver',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Title',
						'internalName': 'ContentTitle',
					}, {
						'displayName': 'Design and Editorial Date',
						'internalName': 'DesignEditorialDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Web Live Date',
						'internalName': 'WebLiveDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Beginning Event Date',
						'internalName': 'BeginningEventDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Point Person',
						'internalName': 'PointPerson',
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
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved',
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Design and Editorial Completed',
						'tableID': 'design-and-editorial-completed',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Design and Editorial Completed',
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'In Review',
						'tableID': 'in-review',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'In Review',
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Web Live',
						'tableID': 'web-live',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Web Live',
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'sortColAndOrder': [0, 'desc'],
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
						'displayName': 'Work Approver',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Title',
						'internalName': 'ContentTitle',
					}, {
						'displayName': 'Beginning Event Date',
						'internalName': 'BeginningEventDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Point Person',
						'internalName': 'PointPerson',
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Open',
						'tableID': 'open',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 0,
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 1,
						'sortColAndOrder': [0, 'desc'],
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackVirtualMuseumStatuses': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			// 'standardAdminElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'virtualMuseumRequestNotifications': 1,
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'General',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Content Title',
				'labelContent': 'Title',
				'listFieldName': 'ContentTitle',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Type',
				'labelContent': 'Type',
				'setOptions': [
					{ 'value': 'Video', 'display': 'Video' },
					{ 'value': 'Podcast', 'display': 'Podcast' },
					{ 'value': 'Link', 'display': 'File or web link' },
					{ 'value': 'Other', 'display': 'Other' }
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{
						'thisFieldEquals': ['Video'],
						'show': [
							{ 'divID': 'video-options' },
							{ 'divID': 'related-resource-options' },
							{ 'fieldName': 'Full Text' }
						],
						'require': [
							{ 'fieldName': 'Full Text', 'type': 'textarea' },
							{ 'fieldName': 'Related Resources Boolean', 'type': 'radio' }
						],
						'hide': [
							{ 'divID': 'audio-options' },
							{ 'divID': 'link-options' },
							{ 'divID': 'other-options' }
						],
						'optional': [
							{ 'fieldName': 'Other Type Details', 'type': 'textarea' }
						]
					}, {
						'thisFieldEquals': ['Podcast'],
						'show': [
							{ 'divID': 'audio-options' },
							{ 'divID': 'related-resource-options' },
							{ 'fieldName': 'Full Text' }
						],
						'require': [
							{ 'fieldName': 'Full Text', 'type': 'textarea' },
							{ 'fieldName': 'Related Resources Boolean', 'type': 'radio' }
						],
						'hide': [
							{ 'divID': 'video-options' },
							{ 'divID': 'link-options' },
							{ 'divID': 'other-options' }
						],
						'optional': [
							{ 'fieldName': 'Other Type Details', 'type': 'textarea' }
						]
					}, {
						'thisFieldEquals': ['Link'],
						'show': [
							{ 'divID': 'link-options' }
						],
						'hide': [
							{ 'divID': 'audio-options' },
							{ 'divID': 'video-options' },
							{ 'fieldName': 'Full Text' },
							{ 'divID': 'related-resource-options' },
							{ 'divID': 'other-options' }
						],
						'optional': [
							{ 'fieldName': 'Full Text', 'type': 'textarea' },
							{ 'fieldName': 'Other Type Details', 'type': 'textarea' },
							{ 'fieldName': 'Related Resources Boolean', 'type': 'radio' }
						]
					}, {
						'thisFieldEquals': ['Other'],
						'show': [
							{ 'divID': 'other-options' },
							{ 'divID': 'related-resource-options' }
						],
						'require': [
							{ 'fieldName': 'Other Type Details', 'type': 'textarea' },
							{ 'fieldName': 'Related Resources Boolean', 'type': 'radio' }
						],
						'hide': [
							{ 'divID': 'audio-options' },
							{ 'divID': 'video-options' },
							{ 'fieldName': 'Full Text' },
							{ 'divID': 'link-options' }
						],
						'optional': [
							{ 'fieldName': 'Full Text', 'type': 'textarea' }
						]
					}
				]





			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Channel',
				'labelContent': 'Channel',
				'loadOptions': {
					'listName': 'VirtualMuseumRequestChannels',
					'displayField': 'Title',
					'valueField': 'Value',
					'orderField': 'Order'
				},
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Content Summary',
				'labelContent': 'Content Summary',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"helpNotes": [
					{
						"text": "For internal reference. Help us understand what your content is about.",
						"htmlID": "content-summary_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Short Text',
				'labelContent': 'Short Text',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"helpNotes": [
					{
						"text": "140 characters maximum. This is the shorter text used in the card / tile.",
						"htmlID": "short-text_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Full Text',
				'labelContent': 'Full Text',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				"helpNotes": [
					{
						"text": "The text for the page",
						"htmlID": "full-text_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Scheduled Boolean',
				'choiceSetLabel': 'Is this a scheduled event?',
				'choices': [
					{ 'value': 'Yes', 'display': 'Yes, this only occurs within a specific time range' },
					{ 'value': 'No', 'display': 'Nope, this is always available' }
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{
						'thisFieldEquals': ['Yes'],
						'show': [
							{ 'fieldName': 'Beginning Event Datetime' },
							{ 'fieldName': 'End Event Datetime' }
						],
						'require': [
							{ 'fieldName': 'Beginning Event Datetime', 'type': 'datetime' },
							{ 'fieldName': 'End Event Datetime', 'type': 'datetime' }
						]
					}, {
						'thisFieldEquals': ['No'],
						'hide': [
							{ 'fieldName': 'Beginning Event Datetime' },
							{ 'fieldName': 'End Event Datetime' }
						],
						'optional': [
							{ 'fieldName': 'Beginning Event Datetime', 'type': 'datetime' },
							{ 'fieldName': 'End Event Datetime', 'type': 'datetime' }
						]
					},
				]


			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Beginning Event Datetime',
				'labelContent': 'Beginning Event Date and Time',
				'listFieldName': 'BeginningEventDate',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'End Event Datetime',
				'labelContent': 'End Event Date and Time',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				"helpNotes": [
					{
						"text": "The event date and time, not the content date and time.",
						"htmlID": "full-text_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],






			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'video-options',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Video Details',
				'begin': 1,
				'end': 1

			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Video Location',
				'labelContent': 'Video File Location',
				'disabledForNonAdmin': ['Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				"helpNotes": [
					{
						"text": "E.g., a OneDrive link or a Zeus location",
						"htmlID": "video-location_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,













			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'audio-options',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Podcast Details',
				'begin': 1,
				'end': 1

			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Audio Location',
				'labelContent': 'Audio File Location',
				'disabledForNonAdmin': ['Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				"helpNotes": [
					{
						"text": "E.g., a OneDrive link or a Zeus location",
						"htmlID": "audio-location_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Transcript Attachment',
				'labelContent': 'Attach Transcript File',
				'populatableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'populatableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'replaceableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'replaceableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,














			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'link-options',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'File or Link Details',
				'begin': 1,
				'end': 1

			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Main File Attachment',
				'labelContent': 'Attach File',
				'populatableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'populatableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'replaceableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'replaceableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				"helpNotes": [
					{
						"text": "PDFs only, please",
						"htmlID": "main-file_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'Main Link',
				'labelContent': 'Link',
				'editableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'editableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'helpNotes': [
					{
						"text": "E.g., http://www.example.com/e/xyz-123",
						'htmlID': 'main-link_help-note',
						'urgent': 0,
						'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,










			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'other-options',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Details',
				'begin': 1,
				'end': 1

			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Other Type Details',
				'labelContent': 'Everything else we need to know',
				'disabledForNonAdmin': ['Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,









			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'related-resource-options',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Related Resources',
				'begin': 1,
				'end': 1

			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Related Resources Boolean',
				'choiceSetLabel': 'Are there any relevant files or links we should post alongside this?',
				'choices': [
					{ 'value': 'Yes', 'display': 'Yes, I have files or links to add' },
					{ 'value': 'No', 'display': 'Nope, no files or links to add' }
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{
						'thisFieldEquals': ['Yes'],
						'show': [
							{ 'divID': 'related-resources-options-details' },
						],
					}, {
						'thisFieldEquals': ['No'],
						'hide': [
							{ 'divID': 'related-resources-options-details' },
						],
					},
				]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'related-resources-options-details',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Files',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'related-resources-files-container',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'related-resource-file',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Related File',
				'labelContent': 'Attach File',
				'populatableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'populatableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'replaceableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'replaceableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				"helpNotes": [
					{
						"text": "PDFs only, please",
						"htmlID": "related-file_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
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
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-related-resource-file',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Add another file',
				'repeatSectionID': 'related-resource-file',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Links',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'related-resources-links-container',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'related-resource-link',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'Related Link',
				'labelContent': 'Link',
				'editableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'editableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				"helpNotes": [
					{
						"text": "E.g., http://www.example.com/e/xyz-123",
						"htmlID": "related-resource-link_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
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
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-related-resource-link',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Add another link',
				'repeatSectionID': 'related-resource-link',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,









			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Workflow',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': [''],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Request Status Static',
				'labelContent': 'Request Status',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': [''],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Point Person Static',
				'labelContent': 'Point Person',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Web URL Static',
				'labelContent': 'Web URL',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],



















			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'admin',
				'content': '',
				'begin': 1,
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['']
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Admin',
				'begin': 1,
				'end': 1,

			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Point Person',
				'labelContent': 'Point Person',
				'listFieldName': 'PointPerson',
				'loadOptions': {
					'listName': 'VirtualMuseumRequestPointPeople',
					'displayField': 'Title',
					'valueField': 'Value',
					'orderField': 'Order'
				},
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Change Request Status',
				'labelContent': 'Change Request Status',
				'setOptions': [
					{ 'value': 'Approved', 'display': 'Approved' },
					{ 'value': 'Design and Editorial Completed', 'display': 'Design and Editorial Completed' },
					{ 'value': 'In Review', 'display': 'In Review' },
					{ 'value': 'Web Live', 'display': 'Web Live' },
					{ 'value': 'Complete', 'display': 'Completed' },
					{ 'value': 'Disapproved', 'display': 'Disapproved' },
					{ 'value': 'Cancel', 'display': 'Request Cancelled' }
				],
				'hideForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{

						// Point Person

						'thisFieldEquals': ['Approved'],
						'require': [
							{ 'fieldName': 'Point Person', 'type': 'select' },
							{ 'fieldName': 'Design and Editorial Date', 'type': 'datePicker' },
							{ 'fieldName': 'Web Live Date', 'type': 'datePicker' }
						],
					}, {
						'thisFieldEquals': ['', 'Disapproved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Complete', 'Cancel'],
						'optional': [
							{ 'fieldName': 'Point Person', 'type': 'select' }
						]
					}, {

						// Web URL

						'thisFieldEquals': ['In Review', 'Web Live'],
						'show': [
							{ 'fieldName': 'Web URL' }
						],
						'require': [
							{ 'fieldName': 'Web URL', 'type': 'radio' }
						]
					}, {
						'thisFieldEquals': ['', 'Approved', 'Disapproved', 'Design and Editorial Completed', 'Complete', 'Cancel'],
						'optional': [
							{ 'fieldName': 'Web URL', 'type': 'radio' }
						]
					}
				]
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Request Status',
				'listFieldName': 'RequestStatus',
				'labelContent': 'Request Status',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Design and Editorial Status',
				'choiceSetLabel': 'Design and Editorial Status',
				'choices': [
					{
						'value': 'design',
						'display': 'Design work is complete'
					}, {
						'value': 'editorial',
						'display': 'Editorial work is complete'
					}
				],
				'hideForNonAdmin': ['', 'Pending Approval', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': [
							'input#design-and-editorial-status_design',
							'input#design-and-editorial-status_editorial'
						],
						'set': [
							{
								'type': 'select',
								'fieldName': 'Change Request Status',
								'optionIndex': 2,
							},
						],
					}, {
						'notAllOfSpecificCheckboxesAreChecked': [
							'input#design-and-editorial-status_design',
							'input#design-and-editorial-status_editorial'
						],
						'set': [
							{
								'type': 'select',
								'fieldName': 'Change Request Status',
								'optionIndex': 0,
							},
						],
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Creative Details',
				'labelContent': 'Creative Details',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Design and Editorial Date',
				'labelContent': 'Design and Editorial Date',
				'listFieldName': 'DesignEditorialDate',
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Web Live Date',
				'labelContent': 'Web Live Date',
				'listFieldName': 'WebLiveDate',
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'Web URL',
				'labelContent': 'Web URL',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed'],
				'editableForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review'],
				'editableForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review'],
				"helpNotes": [
					{
						"text": "E.g., http://www.mos.org/xyz-123",
						"htmlID": "web-url_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'New Admin Notes',
				'labelContent': 'Admin Notes'
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Historical Admin Notes',
				'labelContent': 'Historical Admin Notes',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Pending Approval', 'Approved', 'Design and Editorial Completed', 'In Review', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,

			}

		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = '$("div#container_about-the-requester").hide("fast").addClass("hidden"); \n';

	fData.CustomScriptLast += 'if ($("input#scheduled-boolean_yes").is(":checked")) { \n' +
		'   $("div#label-and-control_Beginning-Datetime").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_End-Datetime").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#related-resources-boolean_yes").is(":checked")) { \n' +
		'   $("div#related-resource-options").show("fast").removeClass("hidden"); \n' +
		'   $("div#related-resources-options-details").show("fast").removeClass("hidden"); \n' +
		'   $("div#related-resources-files-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#related-resources-links-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#Request-Status").val() === "") { \n' +
		'   $("h2#header_this-request").before("<p style=\'padding: 2rem; background-color: #f2ea9a\'>To have a traditional Museum offering promoted on the website, create a <a href=\'https://bmos.sharepoint.com/sites/mea-promo/SitePages/App.aspx\'>Promotion Request</a> instead.</p>"); \n' +
		'} \n';


	// ========= TEMP

	/* fData.CustomScriptLast += '$("input#Request-Nickname").val("Req Nick");';
	fData.CustomScriptLast += '$("input#Content-Title").val("Content Title");';
	fData.CustomScriptLast += '$("select#Self-or-Other option[value=\'Other\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#Type option[value=\'Video\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("textarea#Description").val("This is a pretty rad description of this content.");';
	fData.CustomScriptLast += '$("input#scheduled-boolean_no").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast += '$("input#related-resources-boolean_no").prop("checked", true).attr("checked", true); \n';
	fData.CustomScriptLast +=
		"	$().PutAddtlPeopleInPicker('Requested For', [{ \n" +
		"	'name': 'Hub Tester1'," +
		"	'email': 'sp1@mos.org'," +
		"	'account': 'i:0#.f|membership|sp1@mos.org'" +
		"}]);";
	fData.CustomScriptLast += '$("div#video-options").show("fast").removeClass("hidden"); \n';
	fData.CustomScriptLast += '$("div#label-and-control_Requested-For").show("fast").removeClass("hidden"); \n'; */


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
