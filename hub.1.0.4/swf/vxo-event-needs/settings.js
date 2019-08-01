
(function ($) {



	var mData = {
		'componentID': 123,
		"swf": 1,
		"mosMainKey": "prod",
		// "mosMainKey": "dev",
		// "mosMainKey": "devMedium",
		// "mosMainKey": "devLong",
		// "useRecordedMOSMainMajorVersion": 1,
		"currentRequestVersion": 1,
		"devAdminNotifications": 1,
		"notifications": 1
	};

	console.log("using settings m1");


	var oData = {
		'admin': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "Process Documentation",
					"href": "/sites/vxo-event-needs/SitePages/Process%20Documentation.aspx",
					"target": "_blank"
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Event Name',
						'internalName': 'EventName',
					}, {
						'displayName': 'Starting',
						'internalName': 'EventBeginningDatetime',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 0 }
					}, {
						'displayName': 'Space',
						'internalName': 'EventSpace',
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Requested By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Today & Upcoming',
						'tableID': 'upcoming',
						'someColsAreUsers': 1,
						'rsQueryAndFieldGEQToday': ["Submitted", "EventBeginningDatetime"],
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Past',
						'tableID': 'past',
						'someColsAreUsers': 1,
						'rsQueryAndFieldLessThanToday': ["Submitted", "EventBeginningDatetime"],
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Cancelled',
						'sortColAndOrder': [2, 'desc']
					}
				]
			}
		},
		'nonAdminInHouseNeedsSheets': {
			'buttons': [
			],
			'preamble': '<p style="font-size: 2rem; font-weight: 300; margin-top: 1rem">Events may not be created or modified after 7 days from their start date.</p>',
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Event Name',
						'internalName': 'EventName',
					}, {
						'displayName': 'Starting',
						'internalName': 'EventBeginningDatetime',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 0 }
					}, {
						'displayName': 'Space',
						'internalName': 'EventSpace',
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Requested By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Today & Upcoming',
						'tableID': 'upcoming',
						'someColsAreUsers': 1,
						'rsQueryAndFieldGEQToday': ["Submitted", "EventBeginningDatetime"],
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Past',
						'tableID': 'past',
						'someColsAreUsers': 1,
						'rsQueryAndFieldLessThanToday': ["Submitted", "EventBeginningDatetime"],
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Cancelled',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Cancelled',
						'sortColAndOrder': [2, 'desc']









						/* 'tableTitle': 'Today & Upcoming',
						'tableID': 'upcoming',
						'someColsAreUsers': 1,
						'MyRSQueryAndFieldGEQToday': {
							requestStatus: "Submitted",
							field: "EventBeginningDatetime"
						},
						'sortColAndOrder': [3, 'asc']
					}, {
						'tableTitle': 'Past',
						'tableID': 'past',
						'someColsAreUsers': 1,
						'MyRSQueryAndFieldLTToday': {
							requestStatus: "Submitted",
							field: "EventBeginningDatetime"
						},
						'sortColAndOrder': [3, 'desc']
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 1,
						'sortColAndOrder': [3, 'desc'] */
					}
				]
			}
		}
	};



	var fData = {
		'additionalViewPermissionsFunction': 'ReturnOne',
		'autoTrackSubmissionAndCancellation': 1,
		'newRequestConditionalConfirmationAdditions': [
			{
				'condition': function () { return true; },
				'addition': '<ul> \n' +
					'   <li>Add your event to the <a href="https://quark.mos.org/schedule/uberschedule/calendarview.cfm" target="_blank">Museum Calendar</a> and attend the weekly logistics meeting Wednesdays at 10 a.m. in the Hodgkinson Conference Room.</li> \n' +
					'   <li>Floorplans must be submitted for Skyline, d\'Arbeloff, Caf&eacute;, Blue Wing, Atrium, Hornblower, Green Wing, Nichols, HHL, Omni and Planetarium Foyer, and Omni and Planetarium Foyer and Atrium.</li> \n'
			}, {
				'condition': function () { return true; },
				'addition': '   <li>Related requests and contacts: \n' +
					'	   <ul> \n'
			}, {
				'condition': function () { return $('input#buyouts_yes').is(':checked'); },
				'addition': '		   <li>Buyouts: Email <a href="mailto:buyout@mos.org?subject=New buyout">buyout@mos.org</a>.</li> \n'
			}, {
				'condition': function () { return $('input#wolfgang-puck-catering_linens').is(':checked') || $('input#wolfgang-puck-catering_menu').is(':checked') || $('input#wolfgang-puck-catering_other').is(':checked'); },
				'addition': '		   <li>WPC  \n' +
					'			   <ul>  \n' +
					'				   <li>When this request is approved, you must submit a <a href="https://bmos.sharepoint.com/ECSDocs/Puck%20Conference%20Catering%20Form.docx" target="_blank">Conference Catering Request</a>.</li>  \n' +
					'				   <li>Questions: x3198 or x3199.</li>  \n' +
					'			   </ul>  \n' +
					'		   </li>  \n'
			}, {
				'condition': function () { return $('input#iit-help-desk-and-infrastracture_yes').is(':checked'); },
				'addition': '		   <li>IIT help desk / infrastructure service  \n' +
					'			  <ul>  \n' +
					'				  <li><a href="http://kepler/TIWEB8/scripts/TIWebPortal/TrackItUser.asp" target="_blank">Submit a work order</a>. (Must be connected to the Museum network.)</li>  \n' +
					'				  <li>Questions: x0131.</li>  \n' +
					'			  </ul>  \n' +
					'		   </li>  \n'
			}, {
				'condition': function () { return $('input#iit-av_yes').is(':checked'); },
				'addition': '		   <li>IIT A/V service  \n' +
					'			  <ul>  \n' +
					'				  <li>When this request is approved, you must submit an <a href="https://quark.mos.org/getitdone/avrequest/avrequest.php" target="_blank">Event AV Request</a>.</li>  \n' +
					'				  <li>Questions: x3163.</li>  \n' +
					'			  </ul>  \n' +
					'		   </li>  \n'
			}, {
				'condition': function () { return $('input#exhibit-maintenance_scatterbenches').is(':checked') || $('input#exhibit-maintenance_other').is(':checked'); },
				'addition': '		   <li>Exhibit maintenance questions: x0161.</li> \n'
			}, {
				'condition': function () { return $('input#parking-validation_under10').is(':checked') || $('input#parking-validation_10Plus').is(':checked') || $('input#security-detail_yes').is(':checked') || $('input#crowd-management_yes').is(':checked'); }, // $('input#guest-access_yes').is(':checked') || 
				'addition': '		   <li>Public Safety  \n' +
					'			  <ul>  \n' +
					'				  <li>Free or $5 parking validation: submit a <a href="https://bmos.sharepoint.com/sites/ps-garage-discount/SitePages/My%20Garage%20Discount%20Requests.aspx" target="_blank">Garage Discount Request</a>.</li>  \n' +
					'				  <li>Questions about parking, security detail, guest access, or crowd management: x4495.</li>  \n' +
					'			  </ul>  \n' +
					'		   </li>  \n'
			}, {
				'condition': function () { return $('input#facilities_threeMinuteDelay').is(':checked') || $('input#facilities_tempcontrol').is(':checked') || $('input#facilities_more').is(':checked'); },
				'addition': '		   <li>Facilities: <a href="http://kepler/TIWEB8/scripts/TIWebPortal/TrackItUser.asp" target="_blank">submit a work order</a>. (Must be connected to the Museum network.)</li>  \n'
			}, {
				'condition': function () { return true; },
				'addition': '	   </ul> \n' +
					'   </li> \n' +
					'</ul> \n'
			}
		],
		'standardElementGroups': {
			'standardPrintButton': {
				'buttonText': 'Print Needs Sheet',
				'printFunction': 'PrintNeedsSheet'
			},
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Cancel", "display": "This request has been cancelled" }
				]
			},
			'standardButtonElementsInitiallyHidden': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'eventNeedsNotifications': 1,
		/* {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 1, 'requester': 1, 'additional': 1 },
			'pendingApproval': { 'admin': 1, 'requester': 1 },
			'floorplanChanged': { 'admin': 1, 'requester': 1, 'additional': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': ['Cancelled'] }
		}, */
		'versioningMatters': 0,

		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Space Request',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ["Submitted", "Cancelled"],
				'hideForAdmin': ["Submitted", "Cancelled"]
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Space Reservation',
				'choiceSetLabel': 'Do you have a confirmed space reservation for your event?',
				'choices': [
					{
						'value': 'outlook',
						'display': 'Yes, I\'ve successfully reserved a space through Outlook'
					}, {
						'value': 'eventSpaceRequest',
						'display': 'Yes, my <a href="/sites/vxo-event-space/SitePages/App.aspx" target="_blank">Event Space Request</a> has been approved'
					}, {
						'value': 'none',
						'display': 'No, I don\'t have a space confirmed yet'
					}
				],
				'helpNotes': [
					{
						'text': "You must have a space confirmed prior to submitting this request",
						'htmlID': "no-space-confirmed",
						'emphasis': 1,
						'hideForNonAdmin': ["", "Submitted", "Cancelled"],
						'hideForAdmin': ["", "Submitted", "Cancelled"]
					}
				],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#space-reservation_none'],
						'show': [
							{ 'noteID': 'no-space-confirmed' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_none'],
						'hide': [
							{ 'noteID': 'no-space-confirmed' },
						],





					}, {

						'anyOfSpecificCheckboxesAreChecked': ['input#space-reservation_outlook', 'input#space-reservation_eventspacerequest'],
						'show': [
							{ 'divID': 'basics-and-schedule-and-services-container' },
							{ 'divID': 'submit-or-exit' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_outlook', 'input#space-reservation_eventspacerequest'],
						'hide': [
							{ 'divID': 'basics-and-schedule-and-services-container' },
							{ 'divID': 'submit-or-exit' },
						],






					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#space-reservation_eventspacerequest'],
						'show': [
							{ 'fieldName': 'Event Space Request ID' },
						],
						'require': [
							{ 'fieldName': 'Event Space Request ID', 'type': 'listItemChooser' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_eventspacerequest'],
						'hide': [
							{ 'fieldName': 'Event Space Request ID' },
						],
						'optional': [
							{ 'fieldName': 'Event Space Request ID', 'type': 'listItemChooser' },
						],
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
				'hideForNonAdmin': ["Submitted", "Cancelled"],
				'hideForAdmin': ["Submitted", "Cancelled"]


				/*}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Catering Contacted',
				'choiceSetLabel': 'Have you contacted WPC about your event?',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I\'ve talked to WPC about this event and/or submitted a <a href="https://bmos.sharepoint.com/sites/wpc-catering/SitePages/My%20Puck%20Catering%20Requests.aspx" target="_blank">Puck Catering Request</a> for it'
					}, {
						'value': 'notNecessary',
						'display': 'No, because this event doesn\'t require food, beverage, or linens'
					}, {
						'value': 'no',
						'display': 'No, but I will need WPC to supply food, beverage, or linens'
					}
				],
				'helpNotes': [
					{
						'text': 'You must contact WPC and/or submit a <a href="https://bmos.sharepoint.com/sites/wpc-catering/SitePages/My%20Puck%20Catering%20Requests.aspx" target="_blank">Puck Catering Request</a> prior to submitting this request',
						'htmlID': "wpc-not-contacted",
						'emphasis': 1,
						'hideForNonAdmin': ["", "Submitted", "Cancelled"],
						'hideForAdmin': ["", "Submitted", "Cancelled"]
					}
				],
				'onChange': [
					{
					//	 'allOfSpecificCheckboxesAreChecked': ['input#space-reservation_none'], 
					//	 'show': [
					//		 { 'noteID': 'no-space-confirmed' },
					//	 ],
					// }, {
						'allOfSpecificCheckboxesAreChecked': ['input#catering-contacted_no'], 
						'show': [
							{ 'noteID': 'wpc-not-contacted' },
						],
					// }, {
					//	 'allOfSpecificCheckboxesAreChecked': ['input#av-contacted_no'], 
					//	 'show': [
					//		 { 'noteID': 'av-not-contacted' },
					//	 ],
					




					}, {
					//	 'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_none'], 
					//	 'hide': [
					//		 { 'noteID': 'no-space-confirmed' },
					//	 ],
					// }, {
						'noneOfSpecificCheckboxesAreChecked': ['input#catering-contacted_no'], 
						'hide': [
							{ 'noteID': 'wpc-not-contacted' },
						],
					// }, {
					//	 'noneOfSpecificCheckboxesAreChecked': ['input#av-contacted_no'], 
					//	 'hide': [
					//		 { 'noteID': 'av-not-contacted' },
					//	 ],
					




					}, {



						'anyOfSpecificCheckboxesAreCheckedInAllCheckboxSets': [
							['input#space-reservation_outlook','input#space-reservation_eventspacerequest'],
							['input#catering-contacted_yes','input#catering-contacted_notnecessary'],
							['input#av-contacted_yes','input#av-contacted_notnecessary'],
						],
						'show': [
							{ 'divID': 'basics-and-schedule-and-services-container' },
							{ 'divID': 'submit-or-exit' },
						],
					}, {
						'noneOfSpecificCheckboxesAreCheckedInAnyCheckboxSets': [
							['input#space-reservation_outlook','input#space-reservation_eventspacerequest'],
							['input#catering-contacted_yes','input#catering-contacted_notnecessary'],
							['input#av-contacted_yes','input#av-contacted_notnecessary'],
						], 
						'hide': [
							{ 'divID': 'basics-and-schedule-and-services-container' },
							{ 'divID': 'submit-or-exit' },
						],
					





					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#space-reservation_eventspacerequest'], 
						'show': [
							{ 'fieldName': 'Event Space Request ID' },
						],
						'require': [
							{ 'fieldName': 'Event Space Request ID', 'type': 'listItemChooser' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_eventspacerequest'], 
						'hide': [
							{ 'fieldName': 'Event Space Request ID' },
						],
						'optional': [
							{ 'fieldName': 'Event Space Request ID', 'type': 'listItemChooser' },
						],
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
				'hideForNonAdmin': ["Submitted", "Cancelled"],
				'hideForAdmin': ["Submitted", "Cancelled"]

			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'AV Contacted',
				'choiceSetLabel': 'Have you contacted AV about your event?',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I\'ve talked to AV about this event and/or submitted an <a href="https://bmos.sharepoint.com/sites/iit-event-av/SitePages/My%20Event%20AV%20Requests.aspx" target="_blank">Event AV Request</a> for it'
					}, {
						'value': 'notNecessary',
						'display': 'No, because this event doesn\'t require AV\'s help'
					}, {
						'value': 'no',
						'display': 'No, but I will need AV\'s help'
					}
				],
				'helpNotes': [
					{
						'text': 'You must contact AV and/or submit a <a href="https://bmos.sharepoint.com/sites/iit-event-av/SitePages/My%20Event%20AV%20Requests.aspx" target="_blank">Event AV Request</a> prior to submitting this request',
						'htmlID': "av-not-contacted",
						'emphasis': 1,
						'hideForNonAdmin': ["", "Submitted", "Cancelled"],
						'hideForAdmin': ["", "Submitted", "Cancelled"]
					}
				],
				'onChange': [
					{
					//	 'allOfSpecificCheckboxesAreChecked': ['input#space-reservation_none'], 
					//	 'show': [
					//		 { 'noteID': 'no-space-confirmed' },
					//	 ],
					// }, {
					//	 'allOfSpecificCheckboxesAreChecked': ['input#catering-contacted_no'], 
					//	 'show': [
					//		 { 'noteID': 'wpc-not-contacted' },
					//	 ],
					// }, {
						'allOfSpecificCheckboxesAreChecked': ['input#av-contacted_no'], 
						'show': [
							{ 'noteID': 'av-not-contacted' },
						],
					




					}, {
					//	 'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_none'], 
					//	 'hide': [
					//		 { 'noteID': 'no-space-confirmed' },
					//	 ],
					// }, {
					//	 'noneOfSpecificCheckboxesAreChecked': ['input#catering-contacted_no'], 
					//	 'hide': [
					//		 { 'noteID': 'wpc-not-contacted' },
					//	 ],
					// }, {
						'noneOfSpecificCheckboxesAreChecked': ['input#av-contacted_no'], 
						'hide': [
							{ 'noteID': 'av-not-contacted' },
						],
					




					}, {



						'anyOfSpecificCheckboxesAreCheckedInAllCheckboxSets': [
							['input#space-reservation_outlook','input#space-reservation_eventspacerequest'],
							['input#catering-contacted_yes','input#catering-contacted_notnecessary'],
							['input#av-contacted_yes','input#av-contacted_notnecessary'],
						],
						'show': [
							{ 'divID': 'basics-and-schedule-and-services-container' },
							{ 'divID': 'submit-or-exit' },
						],
					}, {
						'noneOfSpecificCheckboxesAreCheckedInAnyCheckboxSets': [
							['input#space-reservation_outlook','input#space-reservation_eventspacerequest'],
							['input#catering-contacted_yes','input#catering-contacted_notnecessary'],
							['input#av-contacted_yes','input#av-contacted_notnecessary'],
						], 
						'hide': [
							{ 'divID': 'basics-and-schedule-and-services-container' },
							{ 'divID': 'submit-or-exit' },
						],
					





					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#space-reservation_eventspacerequest'], 
						'show': [
							{ 'fieldName': 'Event Space Request ID' },
						],
						'require': [
							{ 'fieldName': 'Event Space Request ID', 'type': 'listItemChooser' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_eventspacerequest'], 
						'hide': [
							{ 'fieldName': 'Event Space Request ID' },
						],
						'optional': [
							{ 'fieldName': 'Event Space Request ID', 'type': 'listItemChooser' },
						],
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
				'hideForNonAdmin': ["Submitted", "Cancelled"],
				'hideForAdmin': ["Submitted", "Cancelled"]

					*/




















			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'basics-and-schedule-and-services-container',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'The Basics',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'listItemChooser',
				'fieldName': 'Event Space Request ID',
				'listFieldName': 'EventSpaceRequestID',
				'editableLabelContent': 'Event Space Request ID',
				'nonEditableLabelContent': 'Event Space Request',
				'choosingAnchorContent': 'Select from your Event Space Requests',
				'editableForNonAdmin': [''],
				'editableForAdmin': [''],
				'dialogTitle': 'My Approved Event Space Requests',
				'listItemViewSections':
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
							'displayName': 'Event Starting',
							'internalName': 'EventBeginningDatetime',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 0 }
						}
					],
					'tables': [
						{
							'tableID': 'list-item-view',
							'webURL': 'https://bmos.sharepoint.com/sites/vxo-event-space',
							'basicRSQueryRelevantStatus': 'Approved'
						}
					]
				},
				'addtlValidationType': 'validPositiveInteger',
				'helpNotes': [
					{
						'text': "E.g., 77",
						'htmlID': "help-note_event-space-request-id",
						'hideForNonAdmin': ["Submitted", "Cancelled"],
						'hideForAdmin': ["Submitted", "Cancelled"]
					}
				],
				'hideForNonAdmin': [""],
				'hideForAdmin': [""],
				'hideButtonForNonAdmin': ["Cancelled"],
				'hideButtonForAdmin': ["Cancelled"],
				'onChange': [
					{ 'thisFieldIsPositiveInteger': 1, 'show': [{ 'divID': "label-and-control_Import-from-Event-Space-Request" }] },
					{ 'thisFieldIsPositiveInteger': 0, 'hide': [{ 'divID': "label-and-control_Import-from-Event-Space-Request" }] }
				],
			}, {
				'elementType': 'field',
				'controlType': 'buttonWithLabel',
				'fieldName': 'Import from Event Space Request',
				'labelContent': 'Import event info from Event Space Request?',
				'buttonContent': 'Yes, import Event Space Request info',
				'helpNotes': [
					{
						'text': "You can change info here after it's imported, without affecting the Event Space Request",
						'htmlID': "help-note_import-from-event-space-request",
					}
				],
				'hideForNonAdmin': ["", "Submitted", "Cancelled"],
				'hideForAdmin': ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Event Space',
				'choiceSetLabel': 'Event Space',
				'listFieldName': 'EventSpace',
				'choices': [
					{
						'value': 'Atrium', 'display': 'Atrium'
					}, {
						'value': 'Blue Wing', 'display': 'Blue Wing'
					}, {
						'value': 'Green Wing', 'display': 'Green Wing'
					}, {
						'value': 'Museum Caf&eacute;', 'display': 'Museum Caf&eacute;'
					}, {
						'value': 'Nichols', 'display': 'Nichols'
					}, {
						'value': 'HHL', 'display': 'Hall of Human Life'
					}, {
						'value': 'Omni and Planetarium Foyer', 'display': 'Omni and Planetarium Foyer'
					}, {
						'value': 'Omni and Planetarium Foyer and Atrium', 'display': 'Omni and Planetarium Foyer and Atrium'
					}, {
						'value': 'Skyline or d\'Arbeloff', 'display': 'Skyline or d\'Arbeloff'
					}, {
						'value': '6th floor', 'display': '6th floor'
					}, {
						'value': 'Hodgkinson', 'display': 'Hodgkinson'
					}, {
						'value': 'Hornblower', 'display': 'Hornblower'
					}, {
						'value': 'Lower Morse', 'display': 'Lower Morse'
					}, {
						'value': 'Other', 'display': 'Other'
					}
				],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled'],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#event-space_other'],
						'show': [
							{ 'divID': 'event-space-specification-container' },
							{ 'fieldName': 'Other Event Space' },
						],
						'require': [{ 'fieldName': 'Other Event Space', 'type': 'text' }]
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#event-space_other'],
						'hide': [
							{ 'fieldName': 'Other Event Space' },
						],
						'optional': [{ 'fieldName': 'Other Event Space', 'type': 'text' }]
					}, {
						'noneOfSpecificCheckboxesAreChecked': [
							'input#event-space_other',
							'input#event-space_skyline-or-darbeloff'
						],
						'hide': [
							{ 'divID': 'event-space-specification-container' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#event-space_skyline-or-darbeloff'],
						'hide': [
							{ 'fieldName': 'Skyline or d\'Arbeloff' },
						],
						'optional': [{ 'fieldName': 'Skyline or d\'Arbeloff', 'type': 'select' }]
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#event-space_skyline-or-darbeloff'],
						'addlOrConditions': ['$("input#Current-User-is-Admin").val() == 1'],
						'show': [
							{ 'divID': 'event-space-specification-container' },
							{ 'fieldName': 'Skyline or d\'Arbeloff' },
						],

					},
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'event-space-specification-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Other Event Space',
				'listFieldName': 'OtherEventSpace',
				'labelContent': 'Other Event Space',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Skyline or d\'Arbeloff',
				'listFieldName': 'SkylineOrDArbeloff',
				'labelContent': 'Skyline or d\'Arbeloff',
				'setOptions': [
					{ 'value': 'Skyline', 'display': 'Skyline' },
					{ 'value': 'd\'Arbeloff', 'display': 'd\'Arbeloff' }
				],
				'disabledForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'disabledForAdmin': ['Cancelled'],
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'field',
				'controlType': 'mosFile',
				'fieldName': 'Floor Plan',
				'labelContent': 'Floor Plan',


				'populatableForNonAdmin': ['', 'Submitted'],
				'populatableForAdmin': ['', 'Submitted'],
				'replaceableForNonAdmin': ['Submitted'],
				'replaceableForAdmin': ['Submitted'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Name',
				'listFieldName': 'EventName',
				'labelContent': 'Event Name',
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Total Attendance',
				'labelContent': 'Total Attendance',
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Total Non-Staff Attendance',
				'labelContent': 'Total Non-Staff Attendance',
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Beginning Datetime',
				'listFieldName': 'EventBeginningDatetime',
				'labelContent': 'Starting',
				'addtlValidationType': 'validMaxDaysFromNow',
				'addtlValidationQuantity': 7,
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Ending Datetime',
				// 'listFieldName': 'EventEndingDatetime',
				'labelContent': 'Ending',
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Space Reserved Beginning Datetime',
				'labelContent': 'Space Reserved Starting',
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Space Reserved Ending Datetime',
				'labelContent': 'Space Reserved Ending',
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Onsite Contact",
				"labelContent": "Onsite Contact",
				"yieldsViewPermissions": 1,
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Event Schedule',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Schedule',
				'labelContent': 'What\'s happening when?',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Services Needed',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Tables and Equipment and Cleaning',
				'choiceSetLabel': 'Tables, Equipment, and Cleaning',
				'choices': [
					{
						'value': 'registrationTable',
						'display': 'I\'ll need a registration table in the lobby'
					}, {
						'value': 'rentalEquipment',
						'display': 'I\'ll be using rental equipment'
					}, {
						'value': 'more',
						'display': 'More'
					}
				],
				'onChange': [
					{
						'allOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_registrationtable'],
						'show': [
							{ 'divID': 'tables-cleaning-equipment-options-container' },
							{ 'divID': 'tables-cleaning-equipment-registration-table-times-container' },
						],
						'require': [
							{ 'fieldName': 'Registration Table Beginning Datetime', 'type': 'datetime' },
							{ 'fieldName': 'Registration Table Ending Datetime', 'type': 'datetime' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container', 'div#tables-cleaning-equipment-rental-equipment-container', 'div#tables-cleaning-equipment-more-container'],
						'set': [
							{ 'fieldName': 'Registration Table Beginning Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Beginning Datetime' },
							{ 'fieldName': 'Registration Table Ending Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Ending Datetime' },
						]
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_registrationtable'],
						'hide': [
							{ 'divID': 'tables-cleaning-equipment-registration-table-times-container' },
						],
						'optional': [
							{ 'fieldName': 'Registration Table Beginning Datetime', 'type': 'datetime' },
							{ 'fieldName': 'Registration Table Ending Datetime', 'type': 'datetime' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container', 'div#tables-cleaning-equipment-rental-equipment-container', 'div#tables-cleaning-equipment-more-container']
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_rentalequipment'],
						'show': [
							{ 'divID': 'tables-cleaning-equipment-options-container' },
							{ 'divID': 'tables-cleaning-equipment-rental-equipment-container' },
						],
						'require': [
							{ 'fieldName': 'Rental Equipment Setup', 'type': 'radio' },
							{ 'fieldName': 'Rental Equipment Pickup Location', 'type': 'radio' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container', 'div#tables-cleaning-equipment-rental-equipment-container', 'div#tables-cleaning-equipment-more-container']
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_rentalequipment'],
						'hide': [
							{ 'divID': 'tables-cleaning-equipment-rental-equipment-container' },
						],
						'optional': [
							{ 'fieldName': 'Rental Equipment Setup', 'type': 'radio' },
							{ 'fieldName': 'Rental Equipment Pickup Location', 'type': 'radio' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container', 'div#tables-cleaning-equipment-rental-equipment-container', 'div#tables-cleaning-equipment-more-container']
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_more'],
						'show': [
							{ 'divID': 'tables-cleaning-equipment-options-container' },
							{ 'divID': 'tables-cleaning-equipment-more-container' },
						],
						'require': [
							{ 'fieldName': 'More Tables and Equipment and Cleaning', 'type': 'textarea' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container', 'div#tables-cleaning-equipment-rental-equipment-container', 'div#tables-cleaning-equipment-more-container']
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_more'],
						'hide': [
							{ 'divID': 'tables-cleaning-equipment-more-container' },
						],
						'optional': [
							{ 'fieldName': 'More Tables and Equipment and Cleaning', 'type': 'textarea' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container', 'div#tables-cleaning-equipment-rental-equipment-container', 'div#tables-cleaning-equipment-more-container']
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_registrationtable', 'input#tables-and-equipment-and-cleaning_rentalequipment', 'input#tables-and-equipment-and-cleaning_more'],
						'hide': [
							{ 'divID': 'tables-cleaning-equipment-options-container' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container', 'div#tables-cleaning-equipment-rental-equipment-container', 'div#tables-cleaning-equipment-more-container']
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'tables-cleaning-equipment-options-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
				'htmlID': 'tables-cleaning-equipment-registration-table-times-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Registration Table Beginning Datetime',
				'labelContent': 'Setup Completed By',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Registration Table Ending Datetime',
				'labelContent': 'Breakdown Starting',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
				'htmlID': 'tables-cleaning-equipment-rental-equipment-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Rental Equipment Setup',
				'choiceSetLabel': 'Rental Equipment Setup',
				'choices': [
					{
						'value': 'vendor',
						'display': 'The vendor will set up'
					}, {
						'value': 'museumContractor',
						'display': 'C&W will set up (for an additional fee)'
					}
				],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Rental Equipment Pickup Location',
				'choiceSetLabel': 'Rental Equipment Pickup Location',
				'choices': [
					{
						'value': 'door16Ramp',
						'display': 'Door #16 Ramp'
					}, {
						'value': 'receiving',
						'display': 'Receiving'
					}, {
						'value': 'eventSpace',
						'display': 'Event Space'
					}
				],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Rental Equipment Porter Service',
				'choiceSetLabel': 'Rental Equipment Porter Service',
				'choices': [
					{
						'value': 'beforeSetup',
						'display': 'Porter service will be needed for setup'
					}, {
						'value': 'afterSetup',
						'display': 'Porter service will be needed for pickup'
					}
				],
				'disabledForNonAdmin': ['Cancelled'],
				'disabledForAdmin': ['Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
				'htmlID': 'tables-cleaning-equipment-more-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'More Tables and Equipment and Cleaning',
				'labelContent': 'What more tables, equipment, and cleaning?',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,

			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Wolfgang Puck Catering',
				'choiceSetLabel': 'Wolfgang Puck Catering',
				'choices': [
					{
						'value': 'linens',
						'display': 'Linens'
					}, {
						'value': 'menu',
						'display': 'Menu'
					}, {
						'value': 'other',
						'display': 'Other'
					}
				],
				'onChange': [
					{
						'anyOfSpecificCheckboxesAreChecked': [
							'input#wolfgang-puck-catering_menu',
							'input#wolfgang-puck-catering_linens',
							'input#wolfgang-puck-catering_other'
						],
						'show': [{ 'divID': 'wpc-details-container' }, { 'fieldName': 'WPC Account Number' }],
						'require': [{ 'fieldName': 'WPC Account Number', 'type': 'text' }]
					}, {
						'noneOfSpecificCheckboxesAreChecked': [
							'input#wolfgang-puck-catering_menu',
							'input#wolfgang-puck-catering_linens',
							'input#wolfgang-puck-catering_other'
						],
						'hide': [{ 'divID': 'wpc-details-container' }, { 'fieldName': 'WPC Account Number' }],
						'optional': [{ 'fieldName': 'WPC Account Number', 'type': 'text' }]
					}, {
						'anyOfSpecificCheckboxesAreChecked': ['input#wolfgang-puck-catering_other'],
						'show': [{ 'fieldName': 'WPC Other' }],
						'require': [{ 'fieldName': 'WPC Other', 'type': 'textarea' }]
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#wolfgang-puck-catering_other'],
						'hide': [{ 'fieldName': 'WPC Other' }],
						'optional': [{ 'fieldName': 'WPC Other', 'type': 'textarea' }]
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'wpc-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'WPC Account Number',
				'labelContent': 'Account #',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'WPC Other',
				'labelContent': 'What other from WPC?',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,

















			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'IIT Help Desk and Infrastracture',
				'choiceSetLabel': 'IIT Help Desk and/or Infrastracture',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I\'ll need help desk and/or infrastracture assistance'
					}
				],
				'onChange': [
					{ 'anyOfSpecificCheckboxesAreChecked': ['input#iit-help-desk-and-infrastracture_yes'], 'show': [{ 'divID': 'help-desk-or-infra-account-number-container' }], 'require': [{ 'fieldName': 'Help Desk or Infrastracture Account Number', 'type': 'text' }] },
					{ 'noneOfSpecificCheckboxesAreChecked': ['input#iit-help-desk-and-infrastracture_yes'], 'hide': [{ 'divID': 'help-desk-or-infra-account-number-container' }], 'optional': [{ 'fieldName': 'Help Desk or Infrastracture Account Number', 'type': 'text' }] },
				],
				'helpNotes': [
					{
						'text': "E.g., phone, netbook, networking",
						'htmlID': "help-note_help-desk-or-infra-assistance-needed",
						'hideForNonAdmin': ["Submitted", "Cancelled"],
						'hideForAdmin': ["Submitted", "Cancelled"]
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'help-desk-or-infra-account-number-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Help Desk or Infrastracture Account Number',
				'labelContent': 'Account #',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,









			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'IIT AV',
				'choiceSetLabel': 'IIT A/V',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I\'ll need A/V assistance'
					}
				],
				'onChange': [
					{ 'anyOfSpecificCheckboxesAreChecked': ['input#iit-av_yes'], 'show': [{ 'divID': 'av-account-number-container' }], 'require': [{ 'fieldName': 'AV Account Number', 'type': 'text' }] },
					{ 'noneOfSpecificCheckboxesAreChecked': ['input#iit-av_yes'], 'hide': [{ 'divID': 'av-account-number-container' }], 'optional': [{ 'fieldName': 'AV Account Number', 'type': 'text' }] },
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'av-account-number-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'AV Account Number',
				'labelContent': 'Account #',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,





			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Exhibit Maintenance',
				'choiceSetLabel': 'Exhibit Maintenance',
				'choices': [
					{
						'value': 'scatterBenches',
						'display': 'Scatter CS&T benches in the Blue Wing level 1'
					}, {
						'value': 'other',
						'display': 'Other'
					}
				],
				'onChange': [
					{ 'anyOfSpecificCheckboxesAreChecked': ['input#exhibit-maintenance_other'], 'show': [{ 'divID': 'other-exhibit-maintenance-service-container' }], 'require': [{ 'fieldName': 'Other Exhibit Maintenance Service', 'type': 'textarea' }] },
					{ 'noneOfSpecificCheckboxesAreChecked': ['input#exhibit-maintenance_other'], 'hide': [{ 'divID': 'other-exhibit-maintenance-service-container' }], 'optional': [{ 'fieldName': 'Other Exhibit Maintenance Service', 'type': 'textarea' }] },
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'other-exhibit-maintenance-service-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Other Exhibit Maintenance Service',
				'labelContent': 'Specify Other Exhibit Maintenance Service',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,















			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Parking Validation',
				'choiceSetLabel': 'Parking Validation',
				'choices': [
					{
						'value': 'under10',
						'display': '<10 cars are expected, so I will leave validation at info desk'
					}, {
						'value': '10Plus',
						'display': '10+ cars are expected, so I will submit a request for free or $5 flat rate validator'
					}, {
						'value': 'none',
						'display': 'No parking validation needed'
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Security Detail',
				'choiceSetLabel': 'Security Detail',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I will need a security detail'
					}
				],
				'onChange': [
					{
						'thisFieldIsChecked': 1,
						'show': [{ 'divID': 'security-detail-details-container' }],
						'require': [
							{ 'fieldName': 'Security Detail Account Number', 'type': 'text' },
							{ 'fieldName': 'Security Detail Location', 'type': 'text' },
							{ 'fieldName': 'Security Detail Beginning Datetime', 'type': 'datetime' },
							{ 'fieldName': 'Security Detail Ending Datetime', 'type': 'datetime' }
						],
						'set': [
							{ 'fieldName': 'Security Detail Location', 'type': 'text', 'method': 'dynamic', 'value': '$("input#Event-Space").val()' },
							{ 'fieldName': 'Security Detail Beginning Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Beginning Datetime' },
							{ 'fieldName': 'Security Detail Ending Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Ending Datetime' },
						]
					}, {
						'thisFieldIsChecked': 0,
						'hide': [{ 'divID': 'security-detail-details-container' }],
						'optional': [
							{ 'fieldName': 'Security Detail Account Number', 'type': 'text' },
							{ 'fieldName': 'Security Detail Location', 'type': 'text' },
							{ 'fieldName': 'Security Detail Beginning Datetime', 'type': 'datetime' },
							{ 'fieldName': 'Security Detail Ending Datetime', 'type': 'datetime' }
						]
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'security-detail-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Security Detail Account Number',
				'labelContent': 'Account #',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Security Detail Location',
				'labelContent': 'Location',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Security Detail Beginning Datetime',
				'labelContent': 'Starting',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Security Detail Ending Datetime',
				'labelContent': 'Ending',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,






			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Elevator Access',
				'choiceSetLabel': 'Enable elevator access without museum badge?',
				'choices': [
					{
						'value': '4AndOr5',
						'display': '4th and/or 5th floors'
					}, {
						'value': '6OrdArb',
						'display': '6th floor or d\'Arbeloff'
					}
				],
				'onChange': [
					{
						'anyOfSpecificCheckboxesAreChecked': ['input#elevator-access_4andor5'],
						'show': [{ 'divID': 'elevator-access-details-container' }],
						'require': [{ 'fieldName': 'Elevator Access Security', 'type': 'radio' }]
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#elevator-access_4andor5'],
						'hide': [{ 'divID': 'elevator-access-details-container' }],
						'optional': [{ 'fieldName': 'Elevator Access Security', 'type': 'radio' }]
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'elevator-access-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Elevator Access Security',
				'choiceSetLabel': 'Elevator Access Security',
				'choices': [
					{
						'value': 'hired',
						'display': 'A security guard will be hired to handle 4th and/or 5th floor security'
					}, {
						'value': 'internal',
						'display': 'We will handle 4th and/or 5th floor security ourselves'
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,



















			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Facilities',
				'choiceSetLabel': 'Facilities',
				'choices': [
					{
						'value': 'threeMinuteDelay',
						'display': 'I will need a three-minute delay'
					}, {
						'value': 'tempControl',
						'display': 'I will need temperature control'
					}, {
						'value': 'more',
						'display': 'More'
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
				'onChange': [
					{
						'noneOfSpecificCheckboxesAreChecked': ['#facilities_tempcontrol', '#facilities_more'],
						'hide': [{ 'divID': 'facilities-subsection-container' }]
					}, {
						'anyOfSpecificCheckboxesAreChecked': ['#facilities_tempcontrol', '#facilities_more'],
						'show': [{ 'divID': 'facilities-subsection-container' }]

					}, {
						'allOfSpecificCheckboxesAreChecked': ['#facilities_tempcontrol'],
						'show': [
							{ 'divID': 'facilities-temperature-control-subsection' },
							{ 'fieldName': 'Temperature Control Beginning Datetime' },
							{ 'fieldName': 'Temperature Control Ending Datetime' }
						],
						'require': [
							{ 'fieldName': 'Temperature Control Beginning Datetime' },
							{ 'fieldName': 'Temperature Control Ending Datetime' }
						],
						'set': [
							{ 'fieldName': 'Temperature Control Beginning Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Space Reserved Beginning Datetime' },
							{ 'fieldName': 'Temperature Control Ending Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Space Reserved Ending Datetime' },
						],
						'calibrateOddEvenSubsectionClasses': [
							'div#facilities-temperature-control-subsection',
							'div#facilities-more-subsection'
						]
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['#facilities_tempcontrol'],
						'hide': [
							{ 'divID': 'facilities-temperature-control-subsection' },
							{ 'fieldName': 'Temperature Control Beginning Datetime' },
							{ 'fieldName': 'Temperature Control Ending Datetime' }
						],
						'optional': [
							{ 'fieldName': 'Temperature Control Beginning Datetime' },
							{ 'fieldName': 'Temperature Control Ending Datetime' }
						],
						'calibrateOddEvenSubsectionClasses': [
							'div#facilities-temperature-control-subsection',
							'div#facilities-more-subsection'
						]
					}, {
						'allOfSpecificCheckboxesAreChecked': ['#facilities_more'],
						'show': [
							{ 'divID': 'facilities-more-subsection' },
							{ 'fieldName': 'More Facilities' }
						],
						'require': [{ 'fieldName': 'More Facilities', 'type': 'textarea' }],
						'calibrateOddEvenSubsectionClasses': [
							'div#facilities-temperature-control-subsection',
							'div#facilities-more-subsection'
						]
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['#facilities_more'],
						'hide': [
							{ 'divID': 'facilities-more-subsection' },
							{ 'fieldName': 'More Facilities' }
						],
						'optional': [{ 'fieldName': 'More Facilities', 'type': 'textarea' }],
						'calibrateOddEvenSubsectionClasses': [
							'div#facilities-temperature-control-subsection',
							'div#facilities-more-subsection'
						]
					}
				],



			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'facilities-subsection-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'facilities-temperature-control-subsection',
				'htmlClass': 'subsection',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Temperature Control Beginning Datetime',
				'labelContent': 'Temperature Control Starting',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Temperature Control Ending Datetime',
				'labelContent': 'Temperature Control Ending',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'facilities-more-subsection',
				'htmlClass': 'subsection',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'More Facilities',
				'labelContent': 'What more from Facilities?',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,













			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Crowd Management',
				'choiceSetLabel': 'Crowd Management',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I will need crowd management'
					}
				],
				'helpNotes': [
					{
						'text': 'Required for 100+ attendees when alcohol is served',
						'htmlID': 'crowd-management_help-note',
						'hideForNonAdmin': ['Cancelled'],
						'hideForAdmin': ['Cancelled']
					}
				],
				'onChange': [
					{ 'thisFieldIsChecked': 1, 'set': [{ 'fieldName': 'Number of Crowd Managers', 'type': 'text', 'method': 'dynamic', 'value': 'Math.max(1, Math.floor($("input#Total-Attendance").val()/250))' }], 'show': [{ 'divID': 'crowd-management-details-container' }], 'require': [{ 'fieldName': 'Number of Crowd Managers', 'type': 'text' }] },
					{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': 'crowd-management-details-container' }], 'optional': [{ 'fieldName': 'Number of Crowd Managers', 'type': 'text' }] }
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'crowd-management-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Number of Crowd Managers',
				'labelContent': 'Number of Crowd Managers',
				'helpNotes': [
					{
						'text': '1 crowd manager required for every 250 attendees',
						'htmlID': 'crowd-management_help-note',
						'hideForNonAdmin': ['Submitted', 'Cancelled'],
						'hideForAdmin': ['Submitted', 'Cancelled']
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,











			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Buyouts',
				'choiceSetLabel': 'Buyouts',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, this event includes a buyout'
					}
				],
				'onChange': [
					{ 'thisFieldIsChecked': 1, 'show': [{ 'divID': 'buyout-details-container' }], 'require': [{ 'fieldName': 'Buyout Venues', 'type': 'check' }, { 'fieldName': 'Buyout Scheduled or Not', 'type': 'radio' }, { 'fieldName': 'Buyout Titles', 'type': 'text' }, { 'fieldName': 'Buyout Show Time', 'type': 'text' }, { 'fieldName': 'Buyout Order Number', 'type': 'text' }] },
					{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': 'buyout-details-container' }], 'optional': [{ 'fieldName': 'Buyout Venues', 'type': 'check' }, { 'fieldName': 'Other Buyout Venue', 'type': 'text' }, { 'fieldName': 'Buyout Scheduled or Not', 'type': 'radio' }, { 'fieldName': 'Buyout Titles', 'type': 'text' }, { 'fieldName': 'Buyout Show Time', 'type': 'text' }, { 'fieldName': 'Buyout Order Number', 'type': 'text' }] },
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'buyout-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Buyout Venues',
				'choiceSetLabel': 'Buyout Venues',
				'choices': [
					{
						'value': 'omni',
						'display': 'Omni'
					}, {
						'value': 'planetarium',
						'display': 'Planetarium'
					}, {
						'value': '4dTheater',
						'display': '4-D Theater'
					}, {
						'value': 'nichols',
						'display': 'Nichols'
					}, {
						'value': 'stearns',
						'display': 'Stearns'
					}, {
						'value': 'other',
						'display': 'Other'
					}
				],
				'onChange': [
					{ 'anyOfSpecificCheckboxesAreChecked': ['input#buyout-venues_other'], 'show': [{ 'fieldName': 'Other Buyout Venue' }], 'require': [{ 'fieldName': 'Other Buyout Venue', 'type': 'text' }] },
					{ 'noneOfSpecificCheckboxesAreChecked': ['input#buyout-venues_other'], 'hide': [{ 'fieldName': 'Other Buyout Venue' }], 'optional': [{ 'fieldName': 'Other Buyout Venue', 'type': 'text' }] },
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Other Buyout Venue',
				'labelContent': 'Specify Other Venue',
				'hideForNonAdmin': ['', 'Submitted', 'Cancelled'],
				'hideForAdmin': ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Buyout Scheduled or Not',
				'choiceSetLabel': 'Scheduled or Not',
				'choices': [
					{
						'value': 'scheduled',
						'display': 'Scheduled'
					}, {
						'value': 'unscheduled',
						'display': 'Unscheduled'
					}
				],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Titles',
				'labelContent': 'Title(s)',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Show Time',
				'labelContent': 'Show Time(s)',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Order Number',
				'labelContent': 'Order Number',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],









			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Buyout Notes',
				'labelContent': 'Notes',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,







			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Additional Notes',
				'labelContent': 'Additional Notes',
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'email-notification-boolean-container',
				// "hideForNonAdmin": [""],
				// "hideForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Notification',
				'begin': 1,
				'end': 1,
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Additional Notification',
				'choiceSetLabel': 'Notify the internal events team?',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, email <a href="mailto:internalevents@mos.org">internalevents@mos.org</a>'
					}, {
						'value': 'no',
						'display': 'No, do not notify the team'
					}
				],
				'requiredForNonAdmin': ['', 'Submitted'],
				'requiredForAdmin': ['', 'Submitted'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}
		]
	};


	// configure customScript for this SWF here
	//	(customScriptFirst will be prepended to auto-generated script)
	//	(customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	// view access

	fData.CustomScriptLast = '';

	// data import

	fData.CustomScriptLast = '$("#Import-from-Event-Space-Request").on("click", function () { \n' +
		'	console.log("clickedddddddd");$().ImportEventSpaceRequestDataToEventRequest($("#id-or-link_Event-Space-Request-ID").val()); \n' +
		'}); \n';

	// clear last notification selection

	fData.CustomScriptLast += '$("input#additional-notification_no").prop("checked", false).attr("checked", false); \n' +
		'$("input#additional-notification_yes").prop("checked", false).attr("checked", false);';

	// event space reserved through Outlook

	fData.CustomScriptLast += 'if ($("input#Request-Status").val() !== "") { \n' +
		'	if ($("input#space-reservation_outlook").is(":checked")) { \n' +
		'	   $("div#label-and-control_Event-Space-Request-ID").hide("fast").addClass("hidden"); \n' +
		'	} \n' +
		'} \n';


	// event space = other

	fData.CustomScriptLast += 'if ($("input#event-space_other").is(":checked")) { \n' +
		'   $("div#event-space-specification-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Other-Event-Space").show("fast").removeClass("hidden"); \n' +
		'} \n';

	// event space = Skyline or d'Arbeloff

	fData.CustomScriptLast += 'if ($("input#event-space_skyline-or-darbeloff").is(":checked")) { \n' +
		'   $("div#event-space-specification-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Skyline-or-dArbeloff").show("fast").removeClass("hidden"); \n' +
		'} \n';

	// validate event date

	fData.CustomScriptLast += '$("input#date-input_Event-Beginning-Datetime, input#date-input_Event-Ending-Datetime, input#date-input_Space-Reserved-Beginning-Datetime, input#date-input_Space-Reserved-Ending-Datetime").on("change", function() { \n' +
		'	$().ProcessInHouseNeedsSheetsDateField();\n' +
		'}); \n';


	// floor plan

	/* fData.CustomScriptLast += '$("select#Change-Request-Status").on("change", function () { \n ' +
		'	if($(this).val() == "Approve") { \n' +
		'		$().SetFieldToRequired("Floor-Plan", "complexFile", 0); \n' +
		'	} else {  \n' +
		'		$().SetFieldToOptional("Floor-Plan", "complexFile", 0); \n' +
		'	} \n' +
		'}); \n'; */

	// Tables, Equipment, and Cleaning

	fData.CustomScriptLast += 'if ($("input#tables-and-equipment-and-cleaning_registrationtable").is(":checked")) { \n' +
		'   $("div#tables-cleaning-equipment-options-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#tables-cleaning-equipment-registration-table-times-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Registration-Table-Beginning-Datetime", "datetime", 0); \n' +
		'		$().SetFieldToRequired("Registration-Table-Ending-Datetime", "datetime", 0); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#tables-and-equipment-and-cleaning_rentalequipment").is(":checked")) { \n' +
		'   $("div#tables-cleaning-equipment-options-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#tables-cleaning-equipment-rental-equipment-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Rental-Equipment-Setup", "radio", 0); \n' +
		'		$().SetFieldToRequired("Rental-Equipment-Pickup-Location", "radio", 0); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#tables-and-equipment-and-cleaning_more").is(":checked")) { \n' +
		'   $("div#tables-cleaning-equipment-options-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#tables-cleaning-equipment-more-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("More-Tables-and-Equipment-and-Cleaning", "textarea", 0); \n' +
		'	} \n' +
		'} \n';

	// Wolfgang Puck Catering

	fData.CustomScriptLast += 'if ($("input#wolfgang-puck-catering_linens").is(":checked") || $("input#wolfgang-puck-catering_menu").is(":checked") || $("input#wolfgang-puck-catering_other").is(":checked")) { \n' +
		'   $("div#wpc-details-container").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_WPC-Account-Number").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("WPC-Account-Number", "text", 0); \n' +
		'	} \n' +
		'} \n';


	fData.CustomScriptLast += 'if ($("input#wolfgang-puck-catering_other").is(":checked")) { \n' +
		'   $("div#label-and-control_WPC-Other").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("WPC-Other", "textarea", 0); \n' +
		'	} \n' +
		'} \n';

	// IIT Help Desk and/or Infrastracture

	fData.CustomScriptLast += 'if ($("input#iit-help-desk-and-infrastracture_yes").is(":checked")) { \n' +
		'   $("div#help-desk-or-infra-account-number-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Help-Desk-or-Infrastracture-Account-Number", "text", 0); \n' +
		'	} \n' +
		'} \n';

	// IIT A/V

	fData.CustomScriptLast += 'if ($("input#iit-av_yes").is(":checked")) { \n' +
		'   $("div#av-account-number-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("AV-Account-Number", "text", 0); \n' +
		'	} \n' +
		'} \n';

	// Exhibit Maintenance

	fData.CustomScriptLast += 'if ($("input#exhibit-maintenance_other").is(":checked")) { \n' +
		'   $("div#other-exhibit-maintenance-service-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Other-Exhibit-Maintenance-Service", "textarea", 0); \n' +
		'	} \n' +
		'} \n';

	// Security Detail

	fData.CustomScriptLast += 'if ($("input#security-detail_yes").is(":checked")) { \n' +
		'   $("div#security-detail-details-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Security-Detail-Account-Number", "text", 0); \n' +
		'		$().SetFieldToRequired("Security-Detail-Location", "text", 0); \n' +
		'		$().SetFieldToRequired("Security-Detail-Beginning-Datetime", "datetime", 0); \n' +
		'		$().SetFieldToRequired("Security-Detail-Ending-Datetime", "datetime", 0); \n' +
		'	} \n' +
		'} \n';

	// Elevator Access

	fData.CustomScriptLast += 'if ($("input#elevator-access_4andor5").is(":checked")) { \n' +
		'   $("div#elevator-access-details-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Elevator-Access-Security", "radio", 0); \n' +
		'	} \n' +
		'} \n';


	// Facilities

	fData.CustomScriptLast += 'if ($("input#facilities_tempcontrol").is(":checked") || $("input#facilities_more").is(":checked")) { \n' +
		'   $("div#facilities-subsection-container").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#facilities_tempcontrol").is(":checked")) { \n' +
		'   $("div#facilities-temperature-control-subsection").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Temperature-Control-Beginning-Datetime").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_Temperature-Control-Ending-Datetime").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Temperature-Control-Beginning-Datetime", "datetime", 0); \n' +
		'		$().SetFieldToRequired("Temperature-Control-Ending-Datetime", "datetime", 0); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#facilities_more").is(":checked")) { \n' +
		'   $("div#facilities-more-subsection").show("fast").removeClass("hidden"); \n' +
		'   $("div#label-and-control_More-Facilities").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("More-Facilities", "textarea", 0); \n' +
		'	} \n' +
		'} \n';

	// Crowd Management

	fData.CustomScriptLast += 'if ($("input#crowd-management_yes").is(":checked")) { \n' +
		'   $("div#crowd-management-details-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Number-of-Crowd-Managers", "textarea", 0); \n' +
		'	} \n' +
		'} \n';

	// Buyouts

	fData.CustomScriptLast += 'if ($("input#buyouts_yes").is(":checked")) { \n' +
		'   $("div#buyout-details-container").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Buyout-Venues", "check", 0); \n' +
		'		$().SetFieldToRequired("Buyout-Scheduled-or-Not", "radio", 0); \n' +
		'		$().SetFieldToRequired("Buyout-Titles", "text", 0); \n' +
		'		$().SetFieldToRequired("Buyout-Show-Time", "text", 0); \n' +
		'		$().SetFieldToRequired("Buyout-Order-Number", "text", 0); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#buyout-venues_other").is(":checked")) { \n' +
		'   $("div#label-and-control_Other-Buyout-Venue").show("fast").removeClass("hidden"); \n' +
		'	if ($("input#Request-Status").val() == "Submitted") { \n' +
		'		$().SetFieldToRequired("Other-Buyout-Venue", "text", 0); \n' +
		'	} \n' +
		'} \n';

	fData.CustomScriptLast += '$("div#container_about-the-requester").hide("fast").addClass("hidden"); \n';


	fData.CustomScriptLast += '$("input#requester-cancellation_cancel").change(function() { \n' +
		'	if ($("input#requester-cancellation_cancel").is(":checked")) { \n' +
		'   	$("div#email-notification-boolean-container").hide("fast").addClass("hidden"); \n' +
		'   	$().SetFieldToOptional("Additional-Notification", "check", 0); \n' +
		'	} else { \n' +
		'   	$("div#email-notification-boolean-container").show("fast").removeClass("hidden"); \n' +
		'   	$().SetFieldToRequired("Additional-Notification", "check", 0); \n' +
		'	} \n' +
		'}); \n';

	fData.CustomScriptLast += '$().SetEventNeedsRequestNonWriteAccess(); \n';


	// fData.CustomScriptLast +=	 '$("input#WPC-Account-Number").on("change", function () { \n ' + 
	//						 '   if($("input#IIT-Account-Number").val() == "") { \n ' + 
	//						 '	   if($("input#WPC-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#IIT-Account-Number").val($("input#WPC-Account-Number").val()) \n ' + 
	//						 '	   } else if($("input#Security-Detail-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#IIT-Account-Number").val($("input#Security-Detail-Account-Number").val()) \n ' + 
	//						 '	   } \n ' + 
	//						 '   } \n ' + 
	//						 '   if($("input#Security-Detail-Account-Number").val() == "") { \n ' + 
	//						 '	   if($("input#WPC-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#Security-Detail-Account-Number").val($("input#WPC-Account-Number").val()) \n ' + 
	//						 '	   } else if($("input#IIT-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#Security-Detail-Account-Number").val($("input#IIT-Account-Number").val()) \n ' + 
	//						 '	   } \n ' + 
	//						 '   } \n ' + 
	//						 '}); \n ';

	// fData.CustomScriptLast +=	 '$("input#IIT-Account-Number").on("change", function () { \n ' + 
	//						 '   if($("input#Security-Detail-Account-Number").val() == "") { \n ' + 
	//						 '	   if($("input#WPC-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#Security-Detail-Account-Number").val($("input#WPC-Account-Number").val()) \n ' + 
	//						 '	   } else if($("input#IIT-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#Security-Detail-Account-Number").val($("input#IIT-Account-Number").val()) \n ' + 
	//						 '	   } \n ' + 
	//						 '   } \n ' + 
	//						 '   if($("input#WPC-Account-Number").val() == "") { \n ' + 
	//						 '	   if($("input#IIT-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#WPC-Account-Number").val($("input#IIT-Account-Number").val()) \n ' + 
	//						 '	   } else if($("input#Security-Detail-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#WPC-Account-Number").val($("input#Security-Detail-Account-Number").val()) \n ' + 
	//						 '	   } \n ' + 
	//						 '   } \n ' + 
	//						 '}); \n ';

	// fData.CustomScriptLast +=	 '$("input#Security-Detail-Account-Number").on("change", function () { \n ' + 
	//						 '   if($("input#IIT-Account-Number").val() == "") { \n ' + 
	//						 '	   if($("input#WPC-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#IIT-Account-Number").val($("input#WPC-Account-Number").val()) \n ' + 
	//						 '	   } else if($("input#Security-Detail-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#IIT-Account-Number").val($("input#Security-Detail-Account-Number").val()) \n ' + 
	//						 '	   } \n ' + 
	//						 '   } \n ' + 
	//						 '   if($("input#WPC-Account-Number").val() == "") { \n ' + 
	//						 '	   if($("input#IIT-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#WPC-Account-Number").val($("input#IIT-Account-Number").val()) \n ' + 
	//						 '	   } else if($("input#Security-Detail-Account-Number").val() != "") { \n ' + 
	//						 '		   $("input#WPC-Account-Number").val($("input#Security-Detail-Account-Number").val()) \n ' + 
	//						 '	   } \n ' + 
	//						 '   } \n ' + 
	//						 '}); \n ';


	/*	fData.CustomScriptLast += '$("select#Change-Request-Status").on("change", function () { \n ' + 
							'   if($(this).val() == "Approve" && $("select#Event-Space").val() == "Skyline or d\'Arbeloff") { \n ' + 
							'	   $().SetFieldToRequired("Skyline-or-dArbeloff", "select", 0); \n' + 
							'   } \n' + 
							'}); \n';
	*/



	// fData.CustomScriptLast += '$("input#Event-Date").on("change", function () { \n ' + 
	//					 '   if($("input#date-input_Space-Reserved-Beginning-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Space-Reserved-Beginning-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '   if($("input#date-input_Space-Reserved-End-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Space-Reserved-End-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '   if($("input#date-input_Event-Beginning-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Event-Beginning-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '   if($("input#date-input_Event-End-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Event-End-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '   if($("input#date-input_Security-Detail-Beginning-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Security-Detail-Beginning-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '   if($("input#date-input_Security-Detail-Ending-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Security-Detail-Ending-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '   if($("input#date-input_Guest-Access-Beginning-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Guest-Access-Beginning-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '   if($("input#date-input_Guest-Access-Ending-Datetime").val() == "") { \n ' + 
	//					 '	   $("input#date-input_Guest-Access-Ending-Datetime").val($("input#Event-Date").val()) \n ' + 
	//					 '   } \n ' + 
	//					 '});';




	// TEMPORARY

	// texts
	fData.CustomScriptLast += '$("input#Request-Nickname").val("nick"); \n';
	fData.CustomScriptLast += '$("input#id-or-link_Event-Space-Request-ID").val("214"); \n';
	fData.CustomScriptLast += '$("input#Total-Non-Staff-Attendance").val("75"); \n';

	// selects
	fData.CustomScriptLast += '$("select#Self-or-Other option[value=\'Self\']").attr("selected","selected"); \n';

	// radios / checks
	fData.CustomScriptLast += '$("input#space-reservation_eventspacerequest").prop("checked", true).attr("checked", true); \n';

	// people picker
	fData.CustomScriptLast += "$().PutAddtlPeopleInPicker('Requested For', [{" +
		"	'name': 'Hub Tester4'," +
		"	'email': 'sp4@mos.org'," +
		"	'account': 'i:0#.f|membership|sp4@mos.org'" +
		"}]);";
	fData.CustomScriptLast += "$().PutAddtlPeopleInPicker('Onsite Contact', [{" +
		"	'name': 'Hub Tester4'," +
		"	'email': 'sp4@mos.org'," +
		"	'account': 'i:0#.f|membership|sp4@mos.org'" +
		"}]);";

	// hidden
	fData.CustomScriptLast += '$("div#basics-and-schedule-and-services-container").show("fast").removeClass("hidden"); \n';
	fData.CustomScriptLast += '$("div#label-and-control_Event-Space-Request-ID").show("fast").removeClass("hidden"); \n';
	fData.CustomScriptLast += '$("div#submit-or-exit").show("fast").removeClass("hidden"); \n';

	// import
	// fData.CustomScriptLast += '$().ImportEventSpaceRequestDataToEventRequest($("#id-or-link_Event-Space-Request-ID").val()); \n';



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