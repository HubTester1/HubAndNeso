(function ($) {

	var mData = {
		'componentID': 20065,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 2,
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
						'displayName': 'Work Approver',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Offering Title',
						'internalName': 'OfferingTitle',
					}, {
						'displayName': 'Text Edited Date',
						'internalName': 'TextEditedDate',
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
						'displayName': 'Beginning Run Date',
						'internalName': 'BeginningRunDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Point Person',
						'internalName': 'PointPerson',
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
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
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Pending Approval',
						'sortColAndOrder': [0, 'desc'],
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
								'displayName': 'Work Approver',
								'internalName': 'RequestedFor',
								'userName': 1
							}, {
								'displayName': 'Offering Title',
								'internalName': 'OfferingTitle',
							}, {
								'displayName': 'Beginning Event Date',
								'internalName': 'BeginningEventDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Beginning Run Date',
								'internalName': 'BeginningRunDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Point Person',
								'internalName': 'PointPerson',
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
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
						]
					}, {
						'tableTitle': 'Approved (Waiting for Editing)',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved',
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Text Edited (Waiting for Web)',
						'tableID': 'text-edited',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Text Edited',
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Web Live (Waiting on Completion)',
						'tableID': 'web-live',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Web Live',
						'sortColAndOrder': [0, 'desc'],
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicEOLQueryRelevantValue': 1,
						'sortColAndOrder': [0, 'desc'],
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
						'displayName': 'Request Status',
						'internalName': 'RequestStatus'
					}, {
						'displayName': 'Beginning Event Date',
						'internalName': 'BeginningEventDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Beginning Run Date',
						'internalName': 'BeginningRunDate',
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
		'autoTrackPendingAndApprovalAndTextAndWeb': 1,
		'newRequestConditionalConfirmationAdditions': [
			{
				'condition': function () { return ($('input#relata-print-request_yes').is(':checked') || $('input#relata-pos-request_no').is(':checked')); },
				'addition': '<h2>Please Note</h2>'
			}, {
				'condition': function () { return ($('input#relata-print-request_yes').is(':checked')); },
				'addition': '<div class="single-message"><p>You\'ve indicated that you haven\'t requested your print items.</p>' +
					'<p><a href="https://bmos.sharepoint.com/sites/mea-mc-project/SitePages/App.aspx" target="_blank">' +
					'Request them now</a></p></div>'
			}, {
				'condition': function () { return $('input#relata-pos-request_no').is(':checked'); },
				'addition': '<div class="single-message"><p>You\'ve indicated that you haven\'t requested tickets.</p>' +
					'<p><a href="https://bmos.sharepoint.com/IIT%20Docs/ProductEvent_NeedsSheet.docx?d=wbf0321a73f054cfd989e68b17e18492e" target="_blank">' +
					'Request them now</a></p></div>'
			}
		],
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'promoReqNotifications': 1,
		'versioningMatters': 0,





		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Offering',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Offering Type',
				'labelContent': 'Type',
				'loadOptions': {
					'listName': 'MuseumOfferingTypes',
					'displayField': 'Title',
					'valueField': 'Value',
					'orderField': 'Order'
				},
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'onChange': [
					{

						// Dates

						'thisFieldEquals': ['Event'],
						'show': [{ 'divID': 'offering-datetime-sets' }],
						'hide': [{ 'fieldName': 'Offering Beginning Date' }, { 'fieldName': 'Offering End Date' }],
						'require': [{ 'fieldName': 'Offering Beginning Datetime', 'type': 'datetime', 'repeatable': 1 }, { 'fieldName': 'Offering End Datetime', 'type': 'datetime', 'repeatable': 1 }],
						'optional': [{ 'fieldName': 'Offering Beginning Date', 'type': 'datepicker' }]
					}, {
						'thisFieldEquals': ['4-D Film', 'Drop-In Activity', 'Exhibit', 'IMAX Film', 'Live Presentation', 'Member Exclusive', 'Planetarium Show'],
						'show': [{ 'fieldName': 'Offering Beginning Date' }, { 'fieldName': 'Offering End Date' }],
						'hide': [{ 'divID': 'offering-datetime-sets' }],
						'require': [{ 'fieldName': 'Offering Beginning Date', 'type': 'datepicker' }],
						'optional': [{ 'fieldName': 'Offering Beginning Datetime', 'type': 'datetime', 'repeatable': 1 }, { 'fieldName': 'Offering End Datetime', 'type': 'datetime', 'repeatable': 1 }]
					}, {

						// Location

						'thisFieldEquals': ['Event', 'Drop-In Activity', 'Exhibit', 'Live Presentation', 'Member Exclusive'],
						'show': [{ 'fieldName': 'Location' }],
						'require': [{ 'fieldName': 'Location', 'type': 'text' }],
					}, {
						'thisFieldEquals': ['4-D Film', 'IMAX Film', 'Planetarium Show'],
						'hide': [{ 'fieldName': 'Location' }],
						'optional': [{ 'fieldName': 'Location', 'type': 'text' }]
					}, {

						// Ages

						'thisFieldEquals': ['Exhibit'],
						'hide': [{ 'fieldName': 'Audience Age Youngest' }, { 'fieldName': 'Audience Age Oldest' }],
						'optional': [{ 'fieldName': 'Audience Age Youngest', 'type': 'select' }, { 'fieldName': 'Audience Age Oldest', 'type': 'select' }]
					}, {
						'thisFieldEquals': ['Event', 'Drop-In Activity', '4-D Film', 'IMAX Film', 'Planetarium Show', 'Live Presentation', 'Member Exclusive'],
						'show': [{ 'fieldName': 'Audience Age Youngest' }, { 'fieldName': 'Audience Age Oldest' }],
						'require': [{ 'fieldName': 'Audience Age Youngest', 'type': 'select' }, { 'fieldName': 'Audience Age Oldest', 'type': 'select' }],
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Offering Title',
				'labelContent': 'Title',
				'listFieldName': 'OfferingTitle',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Promoted Before',
				'choiceSetLabel': 'Has this offering been promoted before?',
				'choices': [
					{
						'value': 'promotedBefore',
						'display': 'Yes, this has been promoted before'
					}, {
						'value': 'notPromotedBefore',
						'display': 'No, this has not been promoted before'
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'onChange': [
					{ 'thisFieldEquals': ['promotedBefore'], 'show': [{ 'fieldName': 'Reuse Past Promotion' }], 'require': [{ 'fieldName': 'Reuse Past Promotion', 'type': 'radio' }] },
					{ 'thisFieldEquals': ['notPromotedBefore'], 'hide': [{ 'fieldName': 'Reuse Past Promotion' }], 'optional': [{ 'fieldName': 'Reuse Past Promotion', 'type': 'radio' }] }
				],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Reuse Past Promotion',
				'choiceSetLabel': 'May we use the previous promo\'s format with your provided content?',
				'choices': [
					{
						'value': 'reuse',
						'display': 'Yes, reuse the past format'
					}, {
						'value': 'doNotReuse',
						'display': 'No, I prefer a new format'
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Offering Description',
				'labelContent': 'Description',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Offering Beginning Date',
				'labelContent': 'Beginning Date',
				'listFieldName': 'BeginningRunDate',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Offering End Date',
				'labelContent': 'End Date',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'offering-datetime-sets',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'offering-datetime-set',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Offering Beginning Datetime',
				'labelContent': 'Beginning Date and Time',
				'listFieldName': 'BeginningEventDate',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Offering End Datetime',
				'labelContent': 'End Date and Time',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-offering-datetime-set',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert a Date / Time Set',
				'repeatSectionID': 'offering-datetime-set',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1


			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Ticket Type',
				'labelContent': 'Ticket Type',
				'setOptions': [
					{ 'value': 'Free with Exhibit Halls admission', 'display': 'Free with Exhibit Halls admission' },
					{ 'value': 'Free with registration', 'display': 'Free with registration' },
					{ 'value': 'Paid - POS', 'display': 'Paid online or at the box office' },
					{ 'value': 'Paid - Door', 'display': 'Paid at the door' },
					{ 'value': 'Paid - External', 'display': 'Paid through an external vendor' },
					{ 'value': 'Other', 'display': 'Other' }
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{

						// Ticket Type Secondary Options

						'thisFieldEquals': ['Free with Exhibit Halls admission'],
						'hide': [{ 'divID': 'ticket-type-secondary-options' }, { 'fieldName': 'Other Ticket Type Description' }, { 'fieldName': 'Registration Link' }, { 'fieldName': 'Price' }],
						'optional': [{ 'fieldName': 'Other Ticket Type Description', 'type': 'textarea' }, { 'fieldName': 'Price', 'type': 'text' }] // , { 'fieldName': 'Registration Link', 'type': 'url' }
					}, {
						'thisFieldEquals': ['Free with registration'],
						'hide': [{ 'fieldName': 'Other Ticket Type Description' }, { 'fieldName': 'Price' }],
						'optional': [{ 'fieldName': 'Other Ticket Type Description', 'type': 'textarea' }, { 'fieldName': 'Price', 'type': 'text' }],
						'show': [{ 'divID': 'ticket-type-secondary-options' }, { 'fieldName': 'Registration Link' }],
						//'require': [{ 'fieldName': 'Registration Link', 'type': 'url' }]
					}, {
						'thisFieldEquals': ['Paid - POS', 'Paid - Door', 'Paid - External'],
						'hide': [{ 'fieldName': 'Other Ticket Type Description' }, { 'fieldName': 'Registration Link' }],
						'optional': [{ 'fieldName': 'Other Ticket Type Description', 'type': 'textarea' }], // , { 'fieldName': 'Registration Link', 'type': 'url' }
						'show': [{ 'divID': 'ticket-type-secondary-options' }, { 'fieldName': 'Price' }],
						'require': [{ 'fieldName': 'Price', 'type': 'text' }]
					}, {
						'thisFieldEquals': ['Other'],
						'hide': [{ 'fieldName': 'Registration Link' }],
						//'optional': [{ 'fieldName': 'Registration Link', 'type': 'url' }],
						'show': [{ 'divID': 'ticket-type-secondary-options' }, { 'fieldName': 'Other Ticket Type Description' }, { 'fieldName': 'Price' }],
						'require': [{ 'fieldName': 'Other Ticket Type Description', 'type': 'textarea' }, { 'fieldName': 'Price', 'type': 'text' }]
					}, {

						// Relata POS Request

						'thisFieldEquals': ['Paid - POS'],
						'show': [{ 'fieldName': 'Relata POS Request' }],
						'require': [{ 'fieldName': 'Relata POS Request', 'type': 'radio' }]
					}, {
						'thisFieldEquals': ['Free with Exhibit Halls admission', 'Free with registration', 'Paid - Door', 'Paid - External', 'Other'],
						'hide': [{ 'fieldName': 'Relata POS Request' }],
						'optional': [{ 'fieldName': 'Relata POS Request', 'type': 'radio' }]
					},


				]

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'ticket-type-secondary-options',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Other Ticket Type Description',
				'labelContent': 'Other Ticket Type Description',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],






			}, {
				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'Registration Link',
				'labelContent': 'Registration Link',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],
				"helpNotes": [
					{
						"text": "E.g., http://www.eventbrite.com/e/xyz-123",
						"htmlID": "registration-link_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						"hideForAdmin": ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Price',
				'labelContent': 'Price',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,

			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Location',
				'labelContent': 'Location',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Audience Age Youngest',
				'labelContent': 'Audience Age, Youngest',
				'loadOptions': {
					'listName': 'MuseumAudienceAges',
					'displayField': 'Title',
					'valueField': 'Value',
					'orderField': 'Order'
				},
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Audience Age Oldest',
				'labelContent': 'Audience Age, Oldest',
				'loadOptions': {
					'listName': 'MuseumAudienceAges',
					'displayField': 'Title',
					'valueField': 'Value',
					'orderField': 'Order'
				},
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Audience Description',
				'labelContent': 'Audience Description',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Image Boolean',
				'choiceSetLabel': 'Do you have images we should consider using?',
				'choices': [
					{ 'value': 'Yes - Attach', 'display': 'Yes, and I\'ll attach them here' },
					{ 'value': 'Yes - Storage', 'display': 'Yes, and I\'ll tell you where they\'re stored' },
					{ 'value': 'Yes - Contact', 'display': 'Yes, and I\'ll tell you who to contact' },
					{ 'value': 'No', 'display': 'Nope' }
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{ 'thisFieldEquals': ['Yes - Attach'], 'show': [{ 'divID': 'image-attachments-and-credits' }], 'require': [{ 'fieldName': 'Image Attachment Two', 'type': 'mosFile' }, { 'fieldName': 'Attached Image Credit', 'type': 'text' }], 'hide': [{ 'divID': 'image-location-and-credit' }, { 'divID': 'image-contact' }, { 'divID': 'image-description' }], 'optional': [{ 'fieldName': 'Image Location', 'type': 'text' }, { 'fieldName': 'External Image Credit', 'type': 'text' }, { 'fieldName': 'Image Description', 'type': 'textarea' }, { 'fieldName': 'Image Contact', 'type': 'peoplePicker' }] },
					{ 'thisFieldEquals': ['Yes - Storage'], 'show': [{ 'divID': 'image-location-and-credit' }], 'require': [{ 'fieldName': 'Image Location', 'type': 'text' }, { 'fieldName': 'External Image Credit', 'type': 'text' }], 'hide': [{ 'divID': 'image-attachments-and-credits' }, { 'divID': 'image-contact' }, { 'divID': 'image-description' }], 'optional': [{ 'fieldName': 'Image Attachment Two', 'type': 'mosFile' }, { 'fieldName': 'Attached Image Credit', 'type': 'text' }, { 'fieldName': 'Image Description', 'type': 'textarea' }, { 'fieldName': 'Image Contact', 'type': 'peoplePicker' }] },
					{ 'thisFieldEquals': ['Yes - Contact'], 'show': [{ 'divID': 'image-contact' }], 'require': [{ 'fieldName': 'Image Contact', 'type': 'peoplePicker' }], 'hide': [{ 'divID': 'image-attachments-and-credits' }, { 'divID': 'image-location-and-credit' }, { 'divID': 'image-description' }], 'optional': [{ 'fieldName': 'Image Attachment Two', 'type': 'mosFile' }, { 'fieldName': 'Attached Image Credit', 'type': 'text' }, { 'fieldName': 'Image Location', 'type': 'text' }, { 'fieldName': 'External Image Credit', 'type': 'text' }, { 'fieldName': 'Image Description', 'type': 'textarea' }] },
					{ 'thisFieldEquals': ['No'], 'show': [{ 'divID': 'image-description' }], 'require': [{ 'fieldName': 'Image Description', 'type': 'textarea' }], 'hide': [{ 'divID': 'image-attachments-and-credits' }, { 'divID': 'image-location-and-credit' }, { 'divID': 'image-contact' }], 'optional': [{ 'fieldName': 'Image Attachment Two', 'type': 'mosFile' }, { 'fieldName': 'Attached Image Credit', 'type': 'text' }, { 'fieldName': 'Image Location', 'type': 'text' }, { 'fieldName': 'External Image Credit', 'type': 'text' }, { 'fieldName': 'Image Contact', 'type': 'peoplePicker' }] },
				]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'image-attachments-and-credits',
				'htmlClass': 'subsection-container repeating-content-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'image-attachment-and-credit',
				'htmlClass': 'subsection repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'file',
				'requestVersion': 1,
				'fieldName': 'Image Attachment',
				'labelContent': 'Attach Image',
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],
				'helpNotes': [
					{
						'text': 'Please provide as high a resolution as possible',
						'htmlID': 'image-attachment_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]







			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'requestVersion': 2,
				'fieldName': 'Image Attachment Two',
				'labelContent': 'Attach Image',
				'populatableForNonAdmin': [""],
				'populatableForAdmin': [""],
				'replaceableForNonAdmin': [""],
				'replaceableForAdmin': [""],
				'helpNotes': [
					{
						'text': "Please provide as high a resolution as possible, but files larger than 20 MB may take a long time to upload",
						'htmlID': 'image-attachment_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				],











			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Attached Image Credit',
				'labelContent': 'Image Credit',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Required credit is determined by the copyright holder',
						'htmlID': 'image-credit_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-image-attachment-and-credit',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert an image and credit',
				'repeatSectionID': 'image-attachment-and-credit',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1









			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'image-location-and-credit',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Image Location',
				'labelContent': 'Image Location',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Please provide as high a resolution as possible',
						'htmlID': 'image-attachment_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'External Image Credit',
				'labelContent': 'Image Credit',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Required credit is determined by the copyright holder',
						'htmlID': 'image-credit_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,









			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'image-contact',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'peoplePicker',
				'fieldName': 'Image Contact',
				'labelContent': 'Contact',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,







			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'image-description',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Image Description',
				'labelContent': 'Describe the content of the image we should acquire',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'E.g., "a picture of a porcupine, any variety"',
						'htmlID': 'image-credit_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,









			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Video Boolean',
				'choiceSetLabel': 'Do you have videos we should consider using?',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, I do'
					}, {
						'value': 'No',
						'display': 'Nope'
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'onChange': [
					{ 'thisFieldEquals': ['Yes'], 'show': [{ 'divID': 'video-locations-and-credits' }], 'require': [{ 'fieldName': 'Video Location', 'type': 'text' }, { 'fieldName': 'Video Credit', 'type': 'text' }] },
					{ 'thisFieldEquals': ['No'], 'hide': [{ 'divID': 'video-locations-and-credits' }], 'optional': [{ 'fieldName': 'Video Location', 'type': 'text' }, { 'fieldName': 'Video Credit', 'type': 'text' }] }
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'video-locations-and-credits',
				'htmlClass': 'subsection-container repeating-content-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'video-location-and-credit',
				'htmlClass': 'subsection repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Video Location',
				'labelContent': 'Video Location',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Video Credit',
				'labelContent': 'Video Credit',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'Required credit is determined by the copyright holder',
						'htmlID': 'image-credit_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-video-location-and-credit',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert a video location and credit',
				'repeatSectionID': 'video-location-and-credit',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1











			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Sponsors Boolean',
				'choiceSetLabel': 'Do sponsors or partners need recognition?',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, they do'
					}, {
						'value': 'No',
						'display': 'Nope'
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'onChange': [
					{ 'thisFieldEquals': ['Yes'], 'show': [{ 'divID': 'sponsors-names-logos-and-credits' }], 'require': [{ 'fieldName': 'Sponsor Name', 'type': 'text' }, { 'fieldName': 'Sponsor Credit', 'type': 'text' }] },
					{ 'thisFieldEquals': ['No'], 'hide': [{ 'divID': 'sponsors-names-logos-and-credits' }], 'optional': [{ 'fieldName': 'Sponsor Name', 'type': 'text' }, { 'fieldName': 'Sponsor Credit', 'type': 'text' }] }
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'sponsors-names-logos-and-credits',
				'htmlClass': 'subsection-container repeating-content-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'sponsors-name-logo-and-credit',
				'htmlClass': 'subsection repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Sponsor Name',
				'labelContent': 'Sponsor / Partner Name',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],



			}, {
				'elementType': 'field',
				'controlType': 'file',
				'requestVersion': 1,
				'fieldName': 'Sponsor Logo',
				'labelContent': 'Sponsor / Partner Logo',
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],



			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'requestVersion': 2,
				'fieldName': 'Sponsor Logo Two',
				'labelContent': 'Sponsor / Partner Logo',
				'populatableForNonAdmin': [""],
				'populatableForAdmin': [""],
				'replaceableForNonAdmin': [""],
				'replaceableForAdmin': [""],
				'helpNotes': [
					{
						'text': "Files larger than 20 MB may take a long time to upload",
						'htmlID': "sponsor-logo-size-recommendation",
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				],



			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Sponsor Credit',
				'labelContent': 'Sponsor / Partner Credit',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'helpNotes': [
					{
						'text': 'E.g., "In Cooperation With", etc.',
						'htmlID': 'sponsor-credit_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
					}
				]
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-sponsors-name-logo-and-credit',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert a sponsor',
				'repeatSectionID': 'sponsors-name-logo-and-credit',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1









			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Promotion',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Request Status Static',
				'labelContent': 'Request Status',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': [''],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Point Person Static',
				'labelContent': 'Point Person',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],









			}, {
				'elementType': 'markup',
				'tag': 'p',
				'content': 'Have a preference for which channels we consider?',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],









			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'web-container',
				'htmlClass': 'channel-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Web Listing Request',
				'choiceSetLabel': 'Web Listing',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, please'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Web Listing Status',
				'choiceSetLabel': 'Web Listing',
				'choices': [
					{
						'value': 'Channel Work Completed',
						'display': 'Completed'
					}, {
						'value': 'Channel Not Utilized',
						'display': 'Not Utilized'
					}
				],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{ 'thisFieldEquals': ['Channel Work Completed'], 'show': [{ 'fieldName': 'Web Listing Link' }], 'require': [{ 'fieldName': 'Web Listing Link', 'type': 'text' }] },
					{ 'thisFieldEquals': ['Channel Not Utilized'], 'hide': [{ 'fieldName': 'Web Listing Link' }], 'optional': [{ 'fieldName': 'Web Listing Link', 'type': 'text' }] }
				],
			}, {
				'elementType': 'field',
				'controlType': 'url',
				'fieldName': 'Web Listing Link',
				'labelContent': 'Web Listing Link',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'editableForNonAdmin': [],
				'editableForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited'],
				'helpNotes': [
					{
						'text': 'E.g., http://www.mos.org/exhibits/the-science-behind-pixar',
						'htmlID': 'web-listing-link_help-note',
						'urgent': 0,
						'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
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
				'htmlID': 'enews-container',
				'htmlClass': 'channel-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'ENews Request',
				'choiceSetLabel': 'ENews',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, please'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'ENews Status',
				'choiceSetLabel': 'ENews',
				'choices': [
					{
						'value': 'Channel Work Completed',
						'display': 'Completed'
					}, {
						'value': 'Channel Not Utilized',
						'display': 'Not Utilized'
					}
				],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,










			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'social-container',
				'htmlClass': 'channel-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Social Request',
				'choiceSetLabel': 'Social Media',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, please'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Social Status',
				'choiceSetLabel': 'Social',
				'choices': [
					{
						'value': 'Channel Work Completed',
						'display': 'Completed'
					}, {
						'value': 'Channel Not Utilized',
						'display': 'Not Utilized'
					}
				],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,










			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'event-calendar-container',
				'htmlClass': 'channel-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Event Calendar Request',
				'choiceSetLabel': 'Event Calendar',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, please'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Event Calendar Status',
				'choiceSetLabel': 'Event Calendar',
				'choices': [
					{
						'value': 'Channel Work Completed',
						'display': 'Completed'
					}, {
						'value': 'Channel Not Utilized',
						'display': 'Not Utilized'
					}
				],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,










			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'traditional-media-container',
				'htmlClass': 'channel-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Traditional Media Request',
				'choiceSetLabel': 'Traditional Media',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, please'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				"helpNotes": [
					{
						"text": "E.g., newspaper, television, online coverage, etc.",
						"htmlID": "traditional-media-request_help-note",
						"urgent": 0,
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Traditional Media Status',
				'choiceSetLabel': 'Traditional Media',
				'choices': [
					{
						'value': 'Channel Work Completed',
						'display': 'Completed'
					}, {
						'value': 'Channel Not Utilized',
						'display': 'Not Utilized'
					}
				],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,














			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'other-channel-container',
				'htmlClass': 'channel-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Other Channel Request',
				'choiceSetLabel': 'Something Specific Not Listed Above',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, please'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{ 'thisFieldIsChecked': 1, 'show': [{ 'divID': 'other-channel-description-subsection-container' }], 'require': [{ 'fieldName': 'Other Description', 'type': 'textarea' }] },
					{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': 'other-channel-description-subsection-container' }], 'optional': [{ 'fieldName': 'Other Description', 'type': 'textarea' }] },
				],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Other Channel Status',
				'choiceSetLabel': 'Other Channel',
				'choices': [
					{
						'value': 'Channel Work Completed',
						'display': 'Completed'
					}, {
						'value': 'Channel Not Utilized',
						'display': 'Not Utilized'
					}
				],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'other-channel-description-subsection-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Other Description',
				'labelContent': 'Description',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,








				// ======================================


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'related-work-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Related Work',
				'begin': 1,
				'end': 1



			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Relata POS Request',
				'choiceSetLabel': 'Have you created a Track-It work order for tickets?',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, I have'
					}, {
						'value': 'No',
						'display': 'Nope'
					}
				],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Relata Print Request',
				'choiceSetLabel': 'Need print items from MarCom and haven\'t requested them?',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, I do'
					}, {
						'value': 'No',
						'display': 'Nope'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Relata Work Orders',
				'choiceSetLabel': 'Are there related, open work orders in Track-It?',
				'choices': [
					{
						'value': 'Yes',
						'display': 'Yes, there are'
					}, {
						'value': 'No',
						'display': 'Nope'
					}
				],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'onChange': [
					{
						'thisFieldEquals': ['Yes'],
						'show': [{ 'divID': 'work-order-sets' }],
						'require': [{ 'fieldName': 'Work Order Number', 'type': 'text', 'repeatable': 1 }, { 'fieldName': 'Work Order Description', 'type': 'text', 'repeatable': 1 }],
					}, {
						'thisFieldEquals': ['No'],
						'hide': [{ 'divID': 'work-order-sets' }],
						'optional': [{ 'fieldName': 'Work Order Number', 'type': 'text', 'repeatable': 1 }, { 'fieldName': 'Work Order Description', 'type': 'text', 'repeatable': 1 }]
					}
				],



			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'work-order-sets',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': [''],
				'hideForAdmin': ['']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'work-order-set',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Work Order Number',
				'labelContent': 'Work Order #',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Work Order Description',
				'labelContent': 'Short Description',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-work-order-set',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert a Work Order',
				'repeatSectionID': 'work-order-set',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
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
				'tag': 'div',
				'begin': 1,
				'htmlID': 'requester-notes-container',
				'hideForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Notes',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Requester Notes',
				'labelContent': 'Anything Else?',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,






				// =====================================





			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'admin',
				'content': '',
				'begin': 1,
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['']
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Admin',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'approval-notification-history',
				'begin': 1,
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Approval Notification History',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'table',
				'htmlID': 'table_approval-notification-history',
				'content': '  <thead>' +
					'       <tr>' +
					'           <th id="th_recipient">Recipient</th>' +
					'           <th id="th_needed-or-not">Needed or Not Needed</th>' +
					'           <th id="th_date">Date & Time</th>' +
					'       </tr>' +
					'   </thead>' +
					'   <tbody>' +
					'   </tbody>',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Request Status and Notes',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Change Request Status',
				'labelContent': 'Change Request Status',
				'setOptions': [
					{ 'value': 'Approved', 'display': 'Approved' },
					{ 'value': 'Disapproved', 'display': 'Disapproved' },
					{ 'value': 'Text Edited', 'display': 'Text Edited' },
					{ 'value': 'Web Live', 'display': 'Web Live' },
					{ 'value': 'Complete', 'display': 'Work Completed' },
					{ 'value': 'Cancel', 'display': 'Request Cancelled' }
				],
				'hideForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{

						// Point Person and Dates

						'thisFieldEquals': ['Approved'],
						'require': [{ 'fieldName': 'Point Person', 'type': 'select' }, { 'fieldName': 'Text Edited Date', 'type': 'datepicker' }, { 'fieldName': 'Web Live Date', 'type': 'datepicker' }],
					}, {
						'thisFieldEquals': ['', 'Disapproved', 'Text Edited', 'Web Live', 'Complete', 'Cancel'],
						'optional': [{ 'fieldName': 'Point Person', 'type': 'select' }, { 'fieldName': 'Text Edited Date', 'type': 'datepicker' }, { 'fieldName': 'Web Live Date', 'type': 'datepicker' }]
					}, {

						// Web Listing Completed

						'thisFieldEquals': ['Web Live'],
						'require': [{ 'fieldName': 'Web Listing Status', 'type': 'radio' }]
					}, {
						'thisFieldEquals': ['', 'Approved', 'Disapproved', 'Text Edited', 'Complete', 'Cancel'],
						'optional': [{ 'fieldName': 'Web Listing Status', 'type': 'radio' }]
					}
				]
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Request Status',
				'listFieldName': 'RequestStatus',
				'labelContent': 'Request Status',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Point Person',
				'labelContent': 'Point Person',
				'listFieldName': 'PointPerson',
				'loadOptions': {
					'listName': 'Promo Request Point People',
					'displayField': 'Title',
					'valueField': 'Value',
					'orderField': 'Order'
				},
				'disabledForNonAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Text Edited Date',
				'labelContent': 'Text Edited Date',
				'listFieldName': 'TextEditedDate',
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
				'controlType': 'textarea',
				'fieldName': 'New Admin Notes',
				'labelContent': 'Admin Notes'
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Historical Admin Notes',
				'labelContent': 'Historical Admin Notes',
				'disabledForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,

			}
		]

	};


	// configure customScript for this SWF here
	//	  (fData.CustomScriptFirst will be prepended to auto-generated script)
	//	  (fData.CustomScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = '$("label[for=\'Self-or-Other\']").text("Will You or Someone Else be Approving Work?"); \n' +
		'$("label[for=\'Requested-For_TopSpan_EditorInput\']").text("Work Approver"); \n';

	fData.CustomScriptLast += 'if ($("input#promoted-before_promotedbefore").is(":checked")) { \n' +
		'   $("div#label-and-control_Reuse-Past-Promotion").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("select#Offering-Type").val() == "Event") { \n' +
		'   $("div#offering-datetime-sets").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("select#Offering-Type").val() != "Event") { \n' +
		'   $("div#label-and-control_Offering-Beginning-Date").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Offering-End-Date").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'var comparisonBankLocation = ["Event", "Drop-In Activity", "Exhibit", "Live Presentation", "Member Exclusive"]; \n' +
		'if (comparisonBankLocation.indexOf($("select#Offering-Type").val()) > -1) { \n' +
		'   $("div#label-and-control_Location").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'var comparisonBankLocation = ["Event", "Drop-In Activity", "4-D Film", "IMAX Film", "Planetarium Show", "Live Presentation", "Member Exclusive"]; \n' +
		'if (comparisonBankLocation.indexOf($("select#Offering-Type").val()) > -1) { \n' +
		'   $("div#label-and-control_Audience-Age-Youngest").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Audience-Age-Oldest").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'var comparisonBankPrice = ["Paid online or at the box office", "Paid at the door", "Paid through an external vendor", "Other"]; \n' +
		'if (comparisonBankPrice.indexOf($("select#Ticket-Type").val()) > -1) { \n' +
		'   $("div#ticket-type-secondary-options").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Price").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if (typeof($("a#Registration-Link").attr("href")) !== "undefined" && $("a#Registration-Link").attr("href") != "") { \n' +
		'   $("div#ticket-type-secondary-options").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Registration-Link").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'var comparisonBankOtherDescription = ["Other"]; \n' +
		'if (comparisonBankOtherDescription.indexOf($("select#Ticket-Type").val()) > -1) { \n' +
		'   $("div#label-and-control_Other-Ticket-Type-Description").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#image-boolean_yes---attach").is(":checked")) { \n' +
		'   $("div#image-attachments-and-credits").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#image-boolean_yes---storage").is(":checked")) { \n' +
		'   $("div#image-location-and-credit").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#image-boolean_yes---contact").is(":checked")) { \n' +
		'   $("div#image-contact").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#image-boolean_no").is(":checked")) { \n' +
		'   $("div#image-description").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#video-boolean_yes").is(":checked")) { \n' +
		'   $("div#video-locations-and-credits").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#sponsors-boolean_yes").is(":checked")) { \n' +
		'   $("div#sponsors-names-logos-and-credits").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += '$("#sponsors-names-logos-and-credits").find("a").each(function () { \n' +
		'    if ($(this).attr("href") == "") { \n' +
		'        $(this).closest("div[id^=\'label-and-control_Sponsor-Logo\'").hide("fast").addClass("hidden"); \n' +
		'    } \n' +
		'}); \n';

	fData.CustomScriptLast += 'if ($("input#web-listing-request_yes").is(":checked")) { \n' +
		'   $("div#web-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#enews-request_yes").is(":checked")) { \n' +
		'   $("div#enews-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#social-request_yes").is(":checked")) { \n' +
		'   $("div#social-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#event-calendar-request_yes").is(":checked")) { \n' +
		'   $("div#event-calendar-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#traditional-media-request_yes").is(":checked")) { \n' +
		'   $("div#traditional-media-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#other-channel-request_yes").is(":checked")) { \n' +
		'   $("div#other-channel-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#other-channel-description-subsection-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#relata-work-orders_yes").is(":checked")) { \n' +
		'   $("div#related-work-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("textarea#Requester-Notes").val()) { \n' +
		'   $("div#requester-notes-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#web-listing-status_channel-work-completed").is(":checked")) { \n' +
		'   $("div#label-and-control_Web-Listing-Link").show("fast").removeClass("hidden"); \n' +
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
