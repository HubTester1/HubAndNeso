
(function ($) {

	// EVENTS

	var mData = {
		'componentID': 171,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 0,
		'notifications': 0,
		'detailTitle': 'Museum Event'
	};

	console.log("using settings m2");



	var oData = {
		'mwEventList': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Event",
					"href": "/sites/mw-events/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Event Calendar",
					"href": "/sites/mw-events/SitePages/App.aspx?f=cal",
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Event ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Title',
						'internalName': 'Title',
					}, {
						'displayName': 'Date',
						'internalName': 'EventDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Start',
						'internalName': 'EventStartTime',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'h:mm a' }
					}, {
						'displayName': 'End',
						'internalName': 'EventEndTime',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'h:mm a' }
					}, {
						'displayName': 'Contact',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Location',
						'internalName': 'EventLocation',
					}, {
						'displayName': 'Count',
						'internalName': 'EventCount',
					// }, {
					// 	'displayName': 'Created By',
					// 	'internalName': 'Author',
					// 	'userName': 1
					// }, {
					// 	'displayName': 'Created',
					// 	'internalName': 'RequestDate',
					// 	'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': '',
						'tableID': 'list-view',
						'someColsAreUsers': 1,
						'sortColAndOrder': [[2, 'desc'], [3, 'asc']],
					}
				]
			}
		},
		'mwEventCalendar': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Event",
					"href": "/sites/mw-events/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Event List",
					"href": "/sites/mw-events/SitePages/App.aspx",
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
						'displayName': "Staff Volunteer Name(s)",
						'internalName': "StaffVolNames",
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
		'bypassNormalDataSaving': [''],
		'customDataSavingFunction': {
			'useFunction': 'ReturnNewMuseumEventsSubmissionValuePairArrayOfArrays',
			'requestStatuses': ['']
		},
		'standardElementGroups': {
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				"elementType": "markup",
				"tag": "div",
				"htmlID": "print-to-screen",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlClass": "label-and-control",
				"content": '   <div class="label"></div>' +
					'   <div class="field-type-indication"><span class="field-type-indicator field-required"><span class="message message-required"></span></span></div>' +
					'   <div class="control">= required field</div>',
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request ID",
				"labelContent": "Event ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Event Created",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Legacy Event Creation Date",
				"labelContent": "Event Created",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "This event was migrated from Quark, and this date is approximate.",
						"htmlID": "legacy-event-creation-date_help-note",
						"urgent": 0,
					}
				],










			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Self or Other",
				"labelContent": "If someone has questions, talk to you or someone else?",
				"setOptions": [
					{ "value": "Self", "display": "Talk to me" },
					{ "value": "Other", "display": "Talk to someone else" }
				],
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
				"hideForNonAdmin": ["Submitted", "Cancelled"],
				"hideForAdmin": ["Submitted", "Cancelled"],
				"disabledForNonAdmin": ["Submitted", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Cancelled"],
				"onChange": [
					{ "thisFieldEquals": ["Self"], "hide": [{ "fieldName": "Requested For" }], "optional": [{ "fieldName": "Requested For", "type": "peoplepicker" }], "set": [{ "fieldName": "Requested For", "type": "peoplePicker", "value": "currentUser" }] },
					{ "thisFieldEquals": ["Other"], "show": [{ "fieldName": "Requested For" }], "require": [{ "fieldName": "Requested For", "type": "peoplepicker" }], "set": [{ "fieldName": "Requested For", "type": "peoplePicker", "value": "" }] }
				]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested For",
				"labelContent": "Contact",
				"listFieldName": "RequestedFor",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Legacy Contact",
				"labelContent": "Contact",
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "This event was migrated from Quark, and the contact person is no longer with the Museum. To change the contact, remove this event and create a new one.",
						"htmlID": "legacy-contact_help-note",
						"urgent": 0,
					}
				],
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Remove",
				"choices": [
					{
						"value": "cancel",
						"display": "Yes, I wish to remove this event from the calendar"
					}
				],
				"hideForNonAdmin": ["", "Validator Picked Up", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"]



				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Event Creator",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1














			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Title',
				'labelContent': 'Title',
				"listFieldName": "Title",
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Location',
				"listFieldName": "EventLocation",
				'labelContent': 'Location',
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			/* }, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Event Location',
				"listFieldName": "EventLocation",
				'labelContent': 'Location',
				'loadOptions': {
					'listName': 'MuseumLocations',
					'displayField': 'Title',
					'valueField': 'Title',
					'orderField': 'Title'
				}
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Add Location Boolean",
				"choiceSetLabel": "Add a Location",
				"choices": [
					{
						"value": "add",
						"display": "Yes, I need to add a location to the list"
					}
				],
				"onChange": [
					{ "thisFieldEquals": ["add"], "show": [{ "divID": "label-and-control_Location-to-Add" }], "require": [{ "fieldName": "Location to Add", "type": "text" }], "set": [{ "fieldName": "Event Location", "type": "select", "optionIndex": 0 }] }
				] */
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Location to Add',
				'labelContent': 'Location to Add',
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],

















			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Event Department",
				// "listFieldName": "EventDepartment",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions',
					// 'params': {
					// 	'otherOptionPosition': 'top'
					// }
				},



			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Count',
				"listFieldName": "EventCount",
				'labelContent': 'Count',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Event Notes',
				'labelContent': 'Notes',
			}, {
				'elementType': 'field',
				'controlType': 'time',
				'fieldName': 'Start Time',
				'labelContent': 'Start Time',
				"listFieldName": "EventStartTime",
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				'elementType': 'field',
				'controlType': 'time',
				'fieldName': 'End Time',
				'labelContent': 'End Time',
				"listFieldName": "EventEndTime",
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Individual or Pattern',
				'choiceSetLabel': 'Use Individual Dates or a Pattern of Repeating Dates?',
				'choices': [
					{
						'value': 'individual',
						'display': 'Individual Dates'
					}, {
						'value': 'pattern',
						'display': 'Pattern of Repeating Dates'
					}
				],
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
				'onChange': [
					{ 'thisFieldEquals': ['individual'], 'show': [{ 'divID': 'simple-dates' }], 'require': [{ 'fieldName': 'Repeating Date', 'type': 'datepicker', 'repeatable': 1 }], 'hide': [{ 'divID': 'pattern-and-range' }], 'optional': [{ 'fieldName': 'Pattern Basis', 'type': 'select' }, { 'fieldName': 'Start Date', 'type': 'datePicker' }, { 'fieldName': 'Ending Basis', 'type': 'select' }] },
					{ 'thisFieldEquals': ['pattern'], 'show': [{ 'divID': 'pattern-and-range' }], 'require': [{ 'fieldName': 'Pattern Basis', 'type': 'select' }, { 'fieldName': 'Start Date', 'type': 'datePicker' }, { 'fieldName': 'Ending Basis', 'type': 'select' }], 'hide': [{ 'divID': 'simple-dates' }], 'optional': [{ 'fieldName': 'Repeating Date', 'type': 'datepicker', 'repeatable': 1 }] },
				],





			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Change Pattern of Repeating Dates',
				'choiceSetLabel': 'Change Pattern of Repeating Dates',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I want to change the pattern'
					}
				],
				'hideForNonAdmin': ["", "Cancelled"],
				'hideForAdmin': ["", "Cancelled"],
				'helpNotes': [
					{
						'text': "This will cause any changes to specific occurrences in the series to be cancelled.",
						'htmlID': "pattern-change-warning",
					}, {
						'text': "If there were changes to specific occurrences in the series, the changes will be cancelled and those occurrences will match the series again.",
						'htmlID': "pattern-change-urgent-warning",
						'emphasis': 1,
						'hideForNonAdmin': ["", "Submitted", "Cancelled"],
						'hideForAdmin': ["", "Submitted", "Cancelled"]
					}
				],
				'onChange': [
					{
						'thisFieldIsChecked': 1,
						'disable': [{ 'fieldName': 'Change Pattern of Repeating Dates', 'inputIDs': ['change-pattern-of-repeating-dates_yes'] }],
						'enable': [
							{ 'fieldName': 'Pattern Basis' },
							{ 'fieldName': 'X Days' },
							{ 'fieldName': 'X Weeks' },
							{
								'fieldName': 'Days of Week for X Weeks', 'inputIDs': [
									'days-of-week-for-x-weeks_1',
									'days-of-week-for-x-weeks_2',
									'days-of-week-for-x-weeks_3',
									'days-of-week-for-x-weeks_4',
									'days-of-week-for-x-weeks_5',
									'days-of-week-for-x-weeks_6',
									'days-of-week-for-x-weeks_7',
								]
							},
							{ 'fieldName': 'X Months For Same Day' },
							{ 'fieldName': 'Day of Month for X Months' },
							{ 'fieldName': 'X Months For Same Week' },
							{ 'fieldName': 'Ordinal and Day of Week For X Months For Same Week', 'selectIDs': ['Ordinal-For-Day-of-Week-For-X-Months-For-Same-Week', 'Days-of-Week-For-X-Months-For-Same-Week'] },
							{ 'fieldName': 'Month and Date for Same Date Each Year', 'selectIDs': ['Months-for-Same-Date-Each-Year'], 'inputIDs': ['Date-for-Same-Date-Each-Year'] },
							{ 'fieldName': 'Ordinal and Day of Week For Same Week Each Year', 'selectIDs': ['Ordinal-For-Same-Week-Each-Year', 'Days-of-Week-For-Same-Week-Each-Year'] },
							{ 'fieldName': 'Months for Same Week Each Year' },
							{ 'fieldName': 'Start Date' },
							{ 'fieldName': 'Ending Basis' },
							{ 'fieldName': 'Qty Occurrences' },
							{ 'fieldName': 'Ending Date' },
						],
						'show': [{ 'noteID': "pattern-change-urgent-warning" }],
						'hide': [{ 'noteID': "pattern-change-warning" }]
					},
				],







			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'simple-dates',
				'htmlClass': 'repeating-content-container',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'simple-date',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Repeating Date',
				'labelContent': 'Date',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlClass': 'remove-section-anchor',
				'content': 'Remove this Date',
				'removeThisRepeat': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-simple-date',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert a Date',
				'repeatSectionID': 'simple-date',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1










			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern-and-range',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]












			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern-basis',
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Pattern Basis',
				'labelContent': 'Occurs',
				"setOptions": [
					{ "value": "xDays", "display": "Every given number of days" },
					{ "value": "weekdays", "display": "Every weekday" },
					{ "value": "xWeeks", "display": "Every given number of weeks" },
					{ "value": "monthlySameDay", "display": "The same day every given number of months" },
					{ "value": "monthlySameWeek", "display": "The same week every given number of months" },
					{ "value": "yearlySameDay", "display": "The same day each year" },
					{ "value": "yearlySameWeek", "display": "The same week each year" }
				],
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
				"onChange": [
					{
						"thisFieldEquals": ["xDays"],

						"show": [{ "divID": "pattern_x-days" }],
						"require": [{ "fieldName": "X Days", "type": "text" }],
						"hide": [
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["weekdays"],

						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["xWeeks"],

						"show": [{ "divID": "pattern_x-weeks" },],
						"require": [
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["monthlySameDay"],

						"show": [{ "divID": "pattern_monthly-same-day" },],
						"require": [
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["monthlySameWeek"],

						"show": [{ "divID": "pattern_monthly-same-week" },],
						"require": [
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_yearly-same-day" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Date for Same Date Each Year", "type": "text" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
					}, {
						"thisFieldEquals": ["yearlySameDay"],

						"show": [{ "divID": "pattern_yearly-same-day" },],
						"require": [
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Date for Same Date Each Year", "type": "text" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-week" }
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
						"set": [
							{ 
								"fieldName": "Date for Same Date Each Year", 
								"type": "text",
								"method": "dynamic",
								"value": "$().ReturnFormattedDateTime('nowLocal', null, 'D', null)" }
							]
					}, {
						"thisFieldEquals": ["yearlySameWeek"],

						"show": [{ "divID": "pattern_yearly-same-week" }],
						"require": [
							{ "fieldName": "Ordinal For Same Week Each Year", "type": "select" },
							{ "fieldName": "Days of Week For Same Week Each Year", "type": "select" },
							{ "fieldName": "Months for Same Week Each Year", "type": "select" },
						],
						"hide": [
							{ "divID": "pattern_x-days" },
							{ "divID": "pattern_x-weeks" },
							{ "divID": "pattern_monthly-same-day" },
							{ "divID": "pattern_monthly-same-week" },
							{ "divID": "pattern_yearly-same-day" },
						],
						"optional": [
							{ "fieldName": "X Days", "type": "text" },
							{ "fieldName": "X Weeks", "type": "text" },
							{ "fieldName": "Days of Week for X Weeks", "type": "check" },
							{ "fieldName": "X Months For Same Day", "type": "text" },
							{ "fieldName": "Day of Month for X Months", "type": "text" },
							{ "fieldName": "X Months For Same Week", "type": "text" },
							{ "fieldName": "Ordinal For Day of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Days of Week For X Months For Same Week", "type": "select" },
							{ "fieldName": "Months for Same Date Each Year", "type": "select" },
							{ "fieldName": "Date for Same Date Each Year", "type": "text" },
						],
					}

				]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1





			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_x-days',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]

				// X days

			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Days",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "day(s)",
						"htmlID": "x-days_help-note",
						"urgent": 0,
					}
				],


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_x-weeks',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]

				// Weekly
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Weeks",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "week(s)",
						"htmlID": "x-weeks_help-note",
						"urgent": 0,
					}
				],
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Days of Week for X Weeks",
				"choiceSetLabel": "On",
				"choices": [
					{
						"value": "1",
						"display": "Sunday"
					}, {
						"value": "2",
						"display": "Monday"
					}, {
						"value": "3",
						"display": "Tuesday"
					}, {
						"value": "4",
						"display": "Wednesday"
					}, {
						"value": "5",
						"display": "Thursday"
					}, {
						"value": "6",
						"display": "Friday"
					}, {
						"value": "7",
						"display": "Saturday"
					}
				],
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_monthly-same-day',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]

				// Monthly same day
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Months For Same Day",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "month(s)",
						"htmlID": "x-months-for-same-day_help-note",
						"urgent": 0,
					}
				],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Day of Month for X Months",
				"labelContent": "On",
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "day of month",
						"htmlID": "day-of-month-for-x-months_help-note",
						"urgent": 0,
					}
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_monthly-same-week',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]

				// Monthly same week
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "X Months For Same Week",
				"labelContent": "Every",
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "month(s)",
						"htmlID": "x-months-for-same-week_help-note",
						"urgent": 0,
					}
				],
			}, {
				'elementType': 'multifield',
				'multifieldName': 'Ordinal and Day of Week For X Months For Same Week',
				'labelContent': 'On <span class="hidden">Which Day of the Month?</span>',
				'subfields': [
					{
						'controlType': 'select',
						'subfieldName': 'Ordinal For Day of Week For X Months For Same Week',
						"setOptions": [
							{ "value": "1", "display": "First" },
							{ "value": "2", "display": "Second" },
							{ "value": "3", "display": "Third" },
							{ "value": "4", "display": "Fourth" }
						],
						'disabledForNonAdmin': ["Submitted", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Cancelled"],
					}, {
						'controlType': 'select',
						'subfieldName': 'Days of Week For X Months For Same Week',
						"setOptions": [
							{ "value": "Sunday", "display": "Sunday" },
							{ "value": "Monday", "display": "Monday" },
							{ "value": "Tuesday", "display": "Tuesday" },
							{ "value": "Wednesday", "display": "Wednesday" },
							{ "value": "Thursday", "display": "Thursday" },
							{ "value": "Friday", "display": "Friday" },
							{ "value": "Saturday", "display": "Saturday" }
						],
						'disabledForNonAdmin': ["Submitted", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Cancelled"],
					}
				]
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_yearly-same-day',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]

				// Yearly same day

			}, {
				'elementType': 'multifield',
				'multifieldName': 'Month and Date for Same Date Each Year',
				'labelContent': 'On <span class="hidden">Which Day of the Month?</span>',
				'subfields': [
					{
						'controlType': 'select',
						'subfieldName': 'Months for Same Date Each Year',
						"setOptions": [
							{ "value": "1", "display": "January" },
							{ "value": "2", "display": "February" },
							{ "value": "3", "display": "March" },
							{ "value": "4", "display": "April" },
							{ "value": "5", "display": "May" },
							{ "value": "6", "display": "June" },
							{ "value": "7", "display": "July" },
							{ "value": "8", "display": "August" },
							{ "value": "9", "display": "September" },
							{ "value": "10", "display": "October" },
							{ "value": "11", "display": "November" },
							{ "value": "12", "display": "December" }
						],
						'disabledForNonAdmin': ["Submitted", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Cancelled"],
					}, {
						'controlType': 'text',
						'subfieldName': 'Date for Same Date Each Year',
						'disabledForNonAdmin': ["Submitted", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Cancelled"],
					}
				]
				//}, {
				//    'elementType': 'field',
				//    'controlType': 'select',
				//    'fieldName': 'Months for Same Date Each Year',
				//    'labelContent': 'On <span class="hidden">Which Month</span>',
				//    "setOptions": [
				//        { "value": "1", "display": "January" },
				//        { "value": "2", "display": "February" },
				//        { "value": "3", "display": "March" },
				//        { "value": "4", "display": "April" },
				//        { "value": "5", "display": "May" },
				//        { "value": "6", "display": "June" },
				//        { "value": "7", "display": "July" },
				//        { "value": "8", "display": "August" },
				//        { "value": "9", "display": "September" },
				//        { "value": "10", "display": "October" },
				//        { "value": "11", "display": "November" },
				//        { "value": "12", "display": "December" }
				//    ],
				//}, {
				//    "elementType": "field",
				//    "controlType": "text",
				//    "fieldName": "Date for Same Date Each Year",
				//    "labelContent": '<span class="hidden">On Which Day of the Month</span>',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1




			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'pattern_yearly-same-week',
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"]

				// Yearly same week






			}, {
				'elementType': 'multifield',
				'multifieldName': 'Ordinal and Day of Week For Same Week Each Year',
				'labelContent': 'On <span class="hidden">Which Week?</span>',
				'subfields': [
					{
						'controlType': 'select',
						'subfieldName': 'Ordinal For Same Week Each Year',
						"setOptions": [
							{ "value": "1", "display": "First" },
							{ "value": "2", "display": "Second" },
							{ "value": "3", "display": "Third" },
							{ "value": "4", "display": "Fourth" }
						],
						'disabledForNonAdmin': ["Submitted", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Cancelled"],
					}, {
						'controlType': 'select',
						'subfieldName': 'Days of Week For Same Week Each Year',
						"setOptions": [
							{ "value": "Sunday", "display": "Sunday" },
							{ "value": "Monday", "display": "Monday" },
							{ "value": "Tuesday", "display": "Tuesday" },
							{ "value": "Wednesday", "display": "Wednesday" },
							{ "value": "Thursday", "display": "Thursday" },
							{ "value": "Friday", "display": "Friday" },
							{ "value": "Saturday", "display": "Saturday" }
						],
						'disabledForNonAdmin': ["Submitted", "Cancelled"],
						'disabledForAdmin': ["Submitted", "Cancelled"],
					}
				]


				//}, {
				//    'elementType': 'field',
				//    'controlType': 'select',
				//    'fieldName': 'Ordinal For Same Week Each Year',
				//    'labelContent': 'On <span class="hidden">Which Week</span>',
				//    "setOptions": [
				//        { "value": "1", "display": "First" },
				//        { "value": "2", "display": "Second" },
				//        { "value": "3", "display": "Third" },
				//        { "value": "4", "display": "Fourth" }
				//    ],
				//}, {
				//    'elementType': 'field',
				//    'controlType': 'select',
				//    'fieldName': 'Days of Week For Same Week Each Year',
				//    'labelContent': '<span class="hidden">On Which Day of the Week</span>',
				//    "setOptions": [
				//        { "value": "Sunday", "display": "Sunday" },
				//        { "value": "Monday", "display": "Monday" },
				//        { "value": "Tuesday", "display": "Tuesday" },
				//        { "value": "Wednesday", "display": "Wednesday" },
				//        { "value": "Thursday", "display": "Thursday" },
				//        { "value": "Friday", "display": "Friday" },
				//        { "value": "Saturday", "display": "Saturday" }
				//    ],




			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Months for Same Week Each Year',
				'labelContent': 'In',
				"setOptions": [
					{ "value": "1", "display": "January" },
					{ "value": "2", "display": "February" },
					{ "value": "3", "display": "March" },
					{ "value": "4", "display": "April" },
					{ "value": "5", "display": "May" },
					{ "value": "6", "display": "June" },
					{ "value": "7", "display": "July" },
					{ "value": "8", "display": "August" },
					{ "value": "9", "display": "September" },
					{ "value": "10", "display": "October" },
					{ "value": "11", "display": "November" },
					{ "value": "12", "display": "December" }
				],
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1












			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Start Date',
				'labelContent': 'Start Date',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Ending Basis',
				'labelContent': 'Ends',
				"setOptions": [
					{ "value": "never", "display": "Never" },
					{ "value": "xOccurrences", "display": "After a given number of occurrences" },
					{ "value": "date", "display": "By a date" }
				],
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
				"onChange": [
					{
						"thisFieldEquals": ["never"],
						"show": [],
						"require": [],
						"hide": [
							{ "divID": "range_x-occurrences" },
							{ "divID": "range_ending-date" },
						],
						"optional": [
							{ "fieldName": "Qty Occurrences", "type": "text" },
							{ "fieldName": "Ending Date", "type": "text" },
						]
					}, {
						"thisFieldEquals": ["xOccurrences"],
						"show": [{ "divID": "range_x-occurrences" }],
						"require": [{ "fieldName": "Qty Occurrences", "type": "text" }],
						"hide": [{ "divID": "range_ending-date" }],
						"optional": [{ "fieldName": "Ending Date", "type": "datepicker" }]
					}, {
						"thisFieldEquals": ["date"],
						"show": [{ "divID": "range_ending-date" }],
						"require": [{ "fieldName": "Ending Date", "type": "datepicker" }],
						"hide": [{ "divID": "range_x-occurrences" }],
						"optional": [{ "fieldName": "Qty Occurrences", "type": "text" }]
					}
				]

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'range_x-occurrences',
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],

				// X occurrences

			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Qty Occurrences",
				"labelContent": "Number of Occurrences",
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'range_ending-date',
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],

				// By date

			}, {
				"elementType": "field",
				"controlType": "datePicker",
				"fieldName": "Ending Date",
				"labelContent": "Ending Date",
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'disabledForNonAdmin': ["Submitted", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"],
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Event Date",
				'labelContent': "Date",
				'listFieldName': "EventDate",
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'requiredForNonAdmin': [],
				'requiredForAdmin': [],
				'hideForNonAdmin': [''],
				'hideForAdmin': [''],
				'disabledForNonAdmin': ["Submitted", "Completed", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Cancelled"]
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (fData.CustomScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = 'if ($("input#individual-or-pattern_individual").is(":checked")) { \n' +
								'   $("div#simple-dates").show("fast").removeClass("hidden"); \n' +
								'} \n';


	fData.CustomScriptLast += 'if ($("input#individual-or-pattern_pattern").is(":checked")) { \n' +
							'   $("div#pattern-and-range").show("fast").removeClass("hidden"); \n' +
							'} \n';

	fData.CustomScriptLast += 'if ($("input#Legacy-Contact").val() != "") { \n' +
							'   $("div#label-and-control_Requested-For").hide("fast").addClass("hidden"); \n' +
							'   $("div#label-and-control_Legacy-Contact").show("fast").removeClass("hidden"); \n' +
							'} \n';

	fData.CustomScriptLast += 'if ($("input#Legacy-Event-Creation-Date").val() != "") { \n' +
							'   $("div#label-and-control_Request-Date").hide("fast").addClass("hidden"); \n' +
							'   $("div#label-and-control_Legacy-Event-Creation-Date").show("fast").removeClass("hidden"); \n' +
							'} \n';

	fData.CustomScriptLast += 'if ($("select#Pattern-Basis").val() == "xDays") { \n' +
						'   $("div#pattern_x-days").show("fast").removeClass("hidden"); \n' +
						'} \n';

	fData.CustomScriptLast += 'if ($("select#Pattern-Basis").val() == "xWeeks") { \n' +
						'   $("div#pattern_x-weeks").show("fast").removeClass("hidden"); \n' +
						'} \n';

	fData.CustomScriptLast += 'if ($("select#Pattern-Basis").val() == "monthlySameDay") { \n' +
						'   $("div#pattern_monthly-same-day").show("fast").removeClass("hidden"); \n' +
						'} \n';

	fData.CustomScriptLast += 'if ($("select#Pattern-Basis").val() == "monthlySameWeek") { \n' +
						'   $("div#pattern_monthly-same-week").show("fast").removeClass("hidden"); \n' +
						'} \n';

	fData.CustomScriptLast += 'if ($("select#Pattern-Basis").val() == "yearlySameDay") { \n' +
						'   $("div#pattern_yearly-same-day").show("fast").removeClass("hidden"); \n' +
						'} \n';

	fData.CustomScriptLast += 'if ($("select#Pattern-Basis").val() == "yearlySameWeek") { \n' +
						'   $("div#pattern_yearly-same-week").show("fast").removeClass("hidden"); \n' +
						'} \n';

	fData.CustomScriptLast += 'if ($("select#Ending-Basis").val() == "xOccurrences") { \n' +
						'   $("div#range_x-occurrences").show("fast").removeClass("hidden"); \n' +
						'} \n';

	fData.CustomScriptLast += 'if ($("select#Ending-Basis").val() == "date") { \n' +
						'   $("div#range_ending-date").show("fast").removeClass("hidden"); \n' +
						'} \n';

	// =============================

	// TEMP

	fData.CustomScriptLast += '$("div#label-and-control_Individual-or-Pattern").addClass("hidden"); \n';
	fData.CustomScriptLast += '$().SetFieldToRequired("Repeating-Date", "datepicker"); \n';
	fData.CustomScriptLast += '$("div#simple-dates").removeClass("hidden"); \n';
	fData.CustomScriptLast += '$("div#label-and-control_Change-Pattern-of-Repeating-Dates").addClass("hidden"); \n';
	fData.CustomScriptLast += '$("input#individual-or-pattern_individual").prop("checked", true).attr("checked", true); \n';



	// =============================

	/* // selects
	fData.CustomScriptLast += '$("select#Self-or-Other option[value=\'Self\']").attr("selected","selected"); \n';	
	fData.CustomScriptLast += '$("select#hours-input_Start-Time option[value=\'T09\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_Start-Time option[value=\':00:00\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#hours-input_End-Time option[value=\'T17\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_End-Time option[value=\':00:00\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#Event-Department option[value=\'Accessibility\']").attr("selected","selected"); \n';

	// hidden
	fData.CustomScriptLast += '$("input#time-storage_Start-Time").val("2000-01-01T09:00:00Z"); \n';
	fData.CustomScriptLast += '$("input#time-storage_End-Time").val("2000-01-01T17:00:00Z"); \n';
	
	// texts
	fData.CustomScriptLast += '$("input#Event-Title").val("Event Title");';
	fData.CustomScriptLast += '$("input#Event-Location").val("Location");';
	fData.CustomScriptLast += '$("input#Event-Count").val("50");';
	fData.CustomScriptLast += '$("textarea#Event-Notes").val("These are my notes.");';
	fData.CustomScriptLast += '$("input#Repeating-Date").val("November 8, 2018");';

	// people picker
	fData.CustomScriptLast +=
		"	$().PutAddtlPeopleInPicker('Requested For', [{ \n" +
		"	'name': 'James Baker'," +
		"	'email': 'jbaker@mos.org'," +
		"	'account': 'i:0#.f|membership|jbaker@mos.org'" +
		"}]);";
 */





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
