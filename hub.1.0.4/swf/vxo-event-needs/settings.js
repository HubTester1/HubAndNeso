(function ($) {

	moment.locale('en');
	moment.suppressDeprecationWarnings = true;
	var currentLocalDateString = moment().format("YYYY-MM-DD") + " 00:00:00";
	
	console.log("using settings m42");

	var mData = {
		'componentID': 123,
		"swf": 1,
		// "mosMainKey": "prod",
		// "mosMainKey": "dev",
		// "mosMainKey": "devMedium",
		"mosMainKey": "devLong",
		// "useRecordedMOSMainMajorVersion": 1,
		"currentRequestVersion": 1,
		"devFiles": 1,
		"devAdminNotifications": 1,
		"notifications": 1
	};


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
						'tableTitle': 'Pending Revision',
						'tableID': 'pending-revision',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': "Pending Revision",
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': "Pending Approval",
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Approved, Today & Upcoming',
						'tableID': 'upcoming',
						'someColsAreUsers': 1,
						'rsQueryAndFieldGEQDate': ["Approved", "EventBeginningDatetime", currentLocalDateString],
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Approved, Past',
						'tableID': 'past',
						'someColsAreUsers': 1,
						'rsQueryAndFieldGEQDate': ["Approved", "EventBeginningDatetime", currentLocalDateString],
						'sortColAndOrder': [2, 'asc']
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicEOLQueryRelevantValue': 1,
						'sortColAndOrder': [2, 'desc']
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
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Pending Revision',
						'tableID': 'pending-revision',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Pending Revision'
					}, {
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved, Today & Upcoming',
						'tableID': 'upcoming',
						'someColsAreUsers': 1,
						'MyRSQueryAndFieldGEQDate': ["Approved", "EventBeginningDatetime", currentLocalDateString],
						'sortColAndOrder': [3, 'asc']
					}, {
						'tableTitle': 'Approved, Past',
						'tableID': 'past',
						'someColsAreUsers': 1,
						'MyRSQueryAndFieldLTDate': ["Approved", "EventBeginningDatetime", currentLocalDateString],
						'sortColAndOrder': [3, 'desc']
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 1,
						'sortColAndOrder': [3, 'desc']
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackPendingAndApprovalAndCompleted': 1,
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
							'				   <li>Questions: x3197.</li>  \n' +
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
				'condition': function () { return $('input#parking-validation_under20').is(':checked') || $('input#parking-validation_20plus').is(':checked') || $('input#security-detail_yes').is(':checked') || $('input#guest-access_yes').is(':checked') || $('input#crowd-management_yes').is(':checked'); },
				'addition': '		   <li>Public Safety  \n' +
							'			  <ul>  \n' +
							'				  <li>Free or $5 parking validation: submit a <a href="https://bmos.sharepoint.com/sites/ps-garage-discount/SitePages/My%20Garage%20Discount%20Requests.aspx" target="_blank">Garage Discount Request</a>.</li>  \n' +
							'				  <li>Questions about parking, security detail, guest access, or crowd management: x4495.</li>  \n' +
							'			  </ul>  \n' +
							'		   </li>  \n'
			}, {
				'condition': function () { return $('input#facilities_fiveminutedelay').is(':checked') || $('input#facilities_tempcontrol').is(':checked') || $('input#facilities_more').is(':checked'); },
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
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Complete", "display": "All work for this request has been completed" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				]
			},
			'standardButtonElementsInitiallyHidden': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'conditionalSubmissionNoticesAndButtonValues': [
			{
				'condition': function () {
					return ($('input#Request-Status').val() == "" || $('input#Request-Status').val() == "Pending Approval");
				},
				'submissionNotice': 'You can modify this request until it\'s approved.',
			}, {
				'condition': function () {
					return ($('input#Request-Status').val() == "Completed" || $('input#Request-Status').val() == "Disapproved" || $('input#Request-Status').val() == "Cancelled");
				},
				'submissionNotice': '',
			}
		],
		'eventNeedsNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 1, 'requester': 1, 'additional': 1 },
			'pendingApproval': { 'admin': 1, 'requester': 1 },
			'floorplanChanged': { 'admin': 1, 'requester': 1, 'additional': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': ['Disapproved', 'Cancelled'] }
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
				"tag": "h2",
				"content": "This Request",
				"htmlID": "header_this-request",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlClass": "label-and-control",
				"htmlID": "requirement-legend",
				"content": '	<div class="label"></div>' +
					'	<div class="field-type-indication"><span class="field-type-indicator field-required"><span class="message message-required"></span></span></div>' +
					'	<div class="control">= required field</div>',
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request ID",
				"labelContent": "Request ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Request Date",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": {
					'incomingFormat': null,
					'returnFormat': 'MMMM D, YYYY',
					'determineYearDisplayDynamically': 1
				},
				"isoFormatOnSubmit": {
					'incomingFormat': null,
					'returnFormat': null,
					'determineYearDisplayDynamically': null
				},
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Nickname",
				"labelContent": "Request Nickname",
				"listFieldName": "Title",
				"helpNotes": [{
					"text": "Give this request a name you can reference later",
					"htmlID": "request-nickname_help-note",
					"urgent": 0,
					"hideForNonAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Self or Other",
				"labelContent": "If we have questions, talk to you or someone else?",
				"setOptions": [{
					"value": "Self",
					"display": "Talk to me"
				}, {
					"value": "Other",
					"display": "Talk to someone else"
				}],
				"requiredForNonAdmin": ["", "Pending Revision", "Pending Approval"],
				"requiredForAdmin": ["", "Pending Revision", "Pending Approval"],
				"hideForNonAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"onChange": [{
					"thisFieldEquals": ["Self"],
					"hide": [{
						"fieldName": "Requested For"
					}],
					"optional": [{
						"fieldName": "Requested For",
						"type": "peoplepicker"
					}],
					"set": [{
						"fieldName": "Requested For",
						"type": "peoplePicker",
						"value": "currentUser"
					}]
				}, {
					"thisFieldEquals": ["Other"],
					"show": [{
						"fieldName": "Requested For"
					}],
					"require": [{
						"fieldName": "Requested For",
						"type": "peoplepicker"
					}],
					"set": [{
						"fieldName": "Requested For",
						"type": "peoplePicker",
						"value": ""
					}]
				}]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested For",
				"labelContent": "If needed, talk to",
				"listFieldName": "RequestedFor",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this request"
				}],
				"hideForNonAdmin": ["", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Reversion to Pending Revision",
				"choiceSetLabel": "Make Changes to This Approved Request",
				"choices": [{
					"value": "revert",
					"display": "Yes, I wish to make changes to this request and restart the approval process"
				}],
				"helpNotes": [{
					"text": "Save this request using the <b>Save</b> button. Then, re-select this request from under the <b>Pending Revision</b> header.",
					"htmlID": "requester-reversion-to-pending-approval_help-note",
					"emphasis": 1,
					"hideForNonAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				}],
				"hideForNonAdmin": ["", "Pending Revision", "Pending Approval", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"onChange": [{
					"allOfSpecificCheckboxesAreChecked": ["#requester-reversion-to-pending-approval_revert"],
					"show": [{ "noteID": "requester-reversion-to-pending-approval_help-note" }],
					"set": [{ "fieldName": "Request Status", "type": "text", "value": "Pending Approval" }]
				}, {
					"noneOfSpecificCheckboxesAreChecked": ["#requester-reversion-to-pending-approval_revert"],
					"hide": [{ "noteID": "requester-reversion-to-pending-approval_help-note" }],
					"set": [{ "fieldName": "Request Status", "type": "text", "value": "Approved" }]
				}]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Restart Approval Process",
				"choiceSetLabel": "Re-submit For Approval",
				"choices": [{
					"value": "ready",
					"display": "Yes, my changes are ready for approval"
				}],
				"helpNotes": [{
					"text": "This request cannot be approved until you've saved this request with this box checked.",
					"htmlID": "requester-reversion-to-pending-approval_help-note",
					"emphasis": 1,
					"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				}],
				"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Approved", "Approved", "Completed", "Disapproved", "Cancelled"],





			// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": [""],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Requester",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1


























			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Space Request',
				'begin': 1,
				'end': 1,
				'hideForNonAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
						'display': 'Yes, my <a href="/sites/vxo-event-space/SitePages/My%20Event%20Space%20Requests.aspx" target="_blank">Event Space Request</a> has been approved'
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
						'hideForNonAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						'hideForAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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

						'anyOfSpecificCheckboxesAreChecked': ['input#space-reservation_outlook','input#space-reservation_eventspacerequest'],
						'show': [
							{ 'divID': 'basics-and-schedule-and-services-container' },
							{ 'divID': 'submit-or-exit' },
						],
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#space-reservation_outlook','input#space-reservation_eventspacerequest'],
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
				"requiredForNonAdmin": ["", "Pending Revision", "Pending Approval"],
				"requiredForAdmin": ["", "Pending Revision", "Pending Approval"],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForNonAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			

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
						'hideForNonAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						'hideForAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForNonAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]

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
						'hideForNonAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						'hideForAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForNonAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]

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
						'hideForNonAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						'hideForAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				],
				'hideForNonAdmin': [""],
				'hideForAdmin': [""],
				'hideButtonForNonAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
				'hideButtonForAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				'hideForNonAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["", "Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				'disabledForNonAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': ["", "Pending Revision", "Pending Approval"],
				'requiredForAdmin': ["", "Pending Revision", "Pending Approval"],
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
							{ 'divID': 'event-space-specification-container' },
							{ 'fieldName': 'Other Event Space' },
						],
						'optional': [{ 'fieldName': 'Other Event Space', 'type': 'text' }]
					},
				],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'event-space-specification-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				'disabledForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				'controlType': 'complexFile',
				'fieldName': 'Floor Plan',
				'labelContent': 'Floor Plan',
				'populatableForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'populatableForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved'],
				'replaceableForNonAdmin': ['Pending Revision', 'Pending Approval'],
				'replaceableForAdmin': ['Pending Revision', 'Pending Approval', 'Approved'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Event Name',
				'listFieldName': 'EventName',
				'labelContent': 'Event Name',
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Total Attendance',
				'labelContent': 'Total Attendance',
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Total Non-Staff Attendance',
				'labelContent': 'Total Non-Staff Attendance',
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Beginning Datetime',
				'listFieldName': 'EventBeginningDatetime',
				'labelContent': 'Starting',
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Event Ending Datetime',
				'labelContent': 'Ending',
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Space Reserved Beginning Datetime',
				'labelContent': 'Space Reserved Starting',
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Space Reserved Ending Datetime',
				'labelContent': 'Space Reserved Ending',
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			



			// }, {
			// 	'elementType': 'field',
			// 	'controlType': 'date',
			// 	'fieldName': 'Skyline  Date',
			// 	'listFieldName': 'EventBeginningDatetime',
			// 	'labelContent': 'Starting',
			// 	'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
			// 	'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
			// 	"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			// 	"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Onsite Contact",
				"labelContent": "Onsite Contact",
				"yieldsViewPermissions": 1,
				'requiredForNonAdmin': ['', 'Pending Revision', 'Pending Approval'],
				'requiredForAdmin': ['', 'Pending Revision', 'Pending Approval'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],






				/*}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'event-elements-and-times',
				'htmlClass': 'repeating-content-container',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'event-element-and-time',
				'htmlClass': 'repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Time',
				'labelContent': 'Time',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Schedule Item',
				'labelContent': 'What\'s scheduled?',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlClass': 'remove-section-anchor',
				'content': 'Remove this Item',
				'removeThisRepeat': 1,
				'hideForNonAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-event-element-and-time',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Add a schedule item',
				'repeatSectionID': 'event-element-and-time',
				'hideForNonAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1
				*/
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
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container','div#tables-cleaning-equipment-rental-equipment-container','div#tables-cleaning-equipment-more-container'],
						'set': [
							{ 'fieldName': 'Registration Table Beginning Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Beginning Datetime'},
							{ 'fieldName': 'Registration Table Ending Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Ending Datetime'},
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
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container','div#tables-cleaning-equipment-rental-equipment-container','div#tables-cleaning-equipment-more-container']
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
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container','div#tables-cleaning-equipment-rental-equipment-container','div#tables-cleaning-equipment-more-container']
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_rentalequipment'], 
						'hide': [
							{ 'divID': 'tables-cleaning-equipment-rental-equipment-container' },
						],
						'optional': [
							{ 'fieldName': 'Rental Equipment Setup', 'type': 'radio' },
							{ 'fieldName': 'Rental Equipment Pickup Location', 'type': 'radio' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container','div#tables-cleaning-equipment-rental-equipment-container','div#tables-cleaning-equipment-more-container']
					}, {
						'allOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_more'], 
						'show': [
							{ 'divID': 'tables-cleaning-equipment-options-container' },
							{ 'divID': 'tables-cleaning-equipment-more-container' },
						],
						'require': [
							{ 'fieldName': 'More Tables and Equipment and Cleaning', 'type': 'textarea' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container','div#tables-cleaning-equipment-rental-equipment-container','div#tables-cleaning-equipment-more-container']
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_more'], 
						'hide': [
							{ 'divID': 'tables-cleaning-equipment-more-container' },
						],
						'optional': [
							{ 'fieldName': 'More Tables and Equipment and Cleaning', 'type': 'textarea' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container','div#tables-cleaning-equipment-rental-equipment-container','div#tables-cleaning-equipment-more-container']
					}, {
						'noneOfSpecificCheckboxesAreChecked': ['input#tables-and-equipment-and-cleaning_registrationtable','input#tables-and-equipment-and-cleaning_rentalequipment','input#tables-and-equipment-and-cleaning_more'], 
						'hide': [
							{ 'divID': 'tables-cleaning-equipment-options-container' },
						],
						'calibrateOddEvenSubsectionClasses': ['div#tables-cleaning-equipment-registration-table-times-container','div#tables-cleaning-equipment-rental-equipment-container','div#tables-cleaning-equipment-more-container']
					}
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'tables-cleaning-equipment-options-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
				'htmlID': 'tables-cleaning-equipment-registration-table-times-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Registration Table Beginning Datetime',
				'labelContent': 'Setup Completed By',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Registration Table Ending Datetime',
				'labelContent': 'Breakdown Starting',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				'disabledForNonAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				'disabledForNonAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
					// }, {
					//	 'value': 'afterSetup',
					//	 'display': 'Porter service will not be needed'
					}
				],
				'disabledForNonAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'More Tables and Equipment and Cleaning',
				'labelContent': 'What more tables, equipment, and cleaning?',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'wpc-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'WPC Other',
				'labelContent': 'What other from WPC?',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
						'hideForNonAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						'hideForAdmin': ["Pending Revision", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'help-desk-or-infra-account-number-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'av-account-number-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'other-exhibit-maintenance-service-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
						'value': 'under20',
						'display': '<20 cars are expected, so I will leave validation at info desk'
					}, {
						'value': '20Plus',
						'display': '20+ cars are expected, so I will submit a request for free or $5 flat rate validator'
					}, {
						'value': 'none',
						'display': 'No parking validation needed'
					}
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
							{ 'fieldName': 'Security Detail Account Number','type': 'text' }, 
							{ 'fieldName': 'Security Detail Location', 'type': 'text' }, 
							{ 'fieldName': 'Security Detail Beginning Datetime', 'type': 'datetime' }, 
							{ 'fieldName': 'Security Detail Ending Datetime', 'type': 'datetime' }
						],
						'set': [
							{ 'fieldName': 'Security Detail Location','type': 'text', 'method': 'dynamic', 'value': '$("input#Event-Space").val()'},
							{ 'fieldName': 'Security Detail Beginning Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Beginning Datetime'},
							{ 'fieldName': 'Security Detail Ending Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Ending Datetime'},
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'security-detail-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Security Detail Location',
				'labelContent': 'Location',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Security Detail Beginning Datetime',
				'labelContent': 'Starting',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Security Detail Ending Datetime',
				'labelContent': 'Ending',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				'fieldName': 'Guest Access',
				'choiceSetLabel': 'Guest Access',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, guests will need special access'
					}
				],
				'onChange': [
					{ 
						'thisFieldIsChecked': 1, 
						'show': [{ 'divID': 'guest-access-details-container' }],
						'require': [
							{ 'fieldName': 'Guest Access Location', 'type': 'text' },
							{ 'fieldName': 'Guest Access Beginning Datetime', 'type': 'datetime' },
							{ 'fieldName': 'Guest Access Ending Datetime', 'type': 'datetime' }
						],
						'set': [
							{ 'fieldName': 'Guest Access Location','type': 'text', 'method': 'dynamic', 'value': '$("input#Event-Space").val()'},
							{ 'fieldName': 'Guest Access Beginning Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Beginning Datetime'},
							{ 'fieldName': 'Guest Access Ending Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Event Ending Datetime'},
						]
					}, { 
						'thisFieldIsChecked': 0,
						'hide': [{ 'divID': 'guest-access-details-container' }],
						'optional': [
							{ 'fieldName': 'Guest Access Location', 'type': 'text' },
							{ 'fieldName': 'Guest Access Beginning Datetime', 'type': 'datetime' },
							{ 'fieldName': 'Guest Access Ending Datetime', 'type': 'datetime' }
						]
					}
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'guest-access-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],

			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'subsection',
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Guest Access Location',
				'labelContent': 'Location',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Guest Access Beginning Datetime',
				'labelContent': 'Starting',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Guest Access Ending Datetime',
				'labelContent': 'Ending',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'elevator-access-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
						'value': 'fiveMinuteDelay',
						'display': 'I will need a five-minute delay'
					}, {
						'value': 'tempControl',
						'display': 'I will need temperature control'
					}, {
						'value': 'more',
						'display': 'More'
					}
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
							{ 'fieldName': 'Temperature Control Beginning Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Space Reserved Beginning Datetime'},
							{ 'fieldName': 'Temperature Control Ending Datetime', 'type': 'datetime', 'method': 'dynamic', 'valueFromFieldName': 'Space Reserved Ending Datetime'},
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
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'facilities-temperature-control-subsection',
				'htmlClass': 'subsection',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Temperature Control Beginning Datetime',
				'labelContent': 'Temperature Control Starting',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Temperature Control Ending Datetime',
				'labelContent': 'Temperature Control Ending',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'More Facilities',
				'labelContent': 'What more from Facilities?',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
						'hideForNonAdmin': ['Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				'onChange': [
					{ 'thisFieldIsChecked': 1, 'set': [{ 'fieldName': 'Number of Crowd Managers', 'type': 'text', 'method': 'dynamic', 'value': 'Math.max(1, Math.floor($("input#Total-Attendance").val()/250))' }], 'show': [{ 'divID': 'crowd-management-details-container' }], 'require': [{ 'fieldName': 'Number of Crowd Managers', 'type': 'text' }] },
					{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': 'crowd-management-details-container' }], 'optional': [{ 'fieldName': 'Number of Crowd Managers', 'type': 'text' }] }
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'crowd-management-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
						'hideForNonAdmin': ['Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
					{ 'thisFieldIsChecked': 1, 'show': [{ 'divID': 'buyout-details-container' }], 'require': [{ 'fieldName': 'Buyout Venues', 'type': 'check' },{ 'fieldName': 'Buyout Scheduled or Not', 'type': 'radio' },{ 'fieldName': 'Buyout Titles', 'type': 'text' },{ 'fieldName': 'Buyout Show Time', 'type': 'text' },{ 'fieldName': 'Buyout Order Number', 'type': 'text' }] },
					{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': 'buyout-details-container' }], 'optional': [{ 'fieldName': 'Buyout Venues', 'type': 'check' },{ 'fieldName': 'Other Buyout Venue', 'type': 'text' },{ 'fieldName': 'Buyout Scheduled or Not', 'type': 'radio' },{ 'fieldName': 'Buyout Titles', 'type': 'text' },{ 'fieldName': 'Buyout Show Time', 'type': 'text' },{ 'fieldName': 'Buyout Order Number', 'type': 'text' }] },
				],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'buyout-details-container',
				'htmlClass': 'subsection-container',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Other Buyout Venue',
				'labelContent': 'Specify Other Venue',
				'hideForNonAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Revision', 'Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Titles',
				'labelContent': 'Title(s)',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Show Time',
				'labelContent': 'Show Time(s)',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Order Number',
				'labelContent': 'Order Number',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
			








			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Buyout Notes',
				'labelContent': 'Notes',
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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
				"disabledForNonAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Approved", "Completed", "Disapproved", "Cancelled"],
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

	fData.CustomScriptLast += 	'if ($("input#Request-Status").val() == "") { \n' +
								'   $().SetInHouseNeedsSheetRequestAdditionalViewAccess(); \n' +
								'} \n';

	// data import

	fData.CustomScriptLast = 	'$("#Import-from-Event-Space-Request").on("click", function () { \n' + 
								'	$().ImportEventSpaceRequestDataToEventRequest($("#id-or-link_Event-Space-Request-ID").val()); \n' + 
								'}); \n';

	// event space = other

	fData.CustomScriptLast += 	'if ($("input#event-space_other").is(":checked") && $("input#Request-Status").val() != "Pending Revision") { \n' +
								'   $("div#event-space-specification-container").show("fast").removeClass("hidden"); \n' + 
								'   $("div#label-and-control_Other-Event-Space").show("fast").removeClass("hidden"); \n' +
								'} \n';

	// event space = Skyline or d'Arbeloff

	fData.CustomScriptLast += 	'if ($("input#event-space_skyline-or-darbeloff").is(":checked") && $("input#Request-Status").val() != "Pending Revision") { \n' +
								'   $("div#event-space-specification-container").show("fast").removeClass("hidden"); \n' +
								'   $("div#label-and-control_Skyline-or-dArbeloff").show("fast").removeClass("hidden"); \n' +
								'} \n';

	// floor plan

	fData.CustomScriptLast +=	'$("select#Change-Request-Status").on("change", function () { \n ' + 
								'	if($(this).val() == "Approve") { \n' +
								'		$().SetFieldToRequired("Floor-Plan", "complexFile", 0); \n' + 
								'	} else {  \n' + 
								'		$().SetFieldToOptional("Floor-Plan", "complexFile", 0); \n' + 
								'	} \n' + 
								'}); \n';

	// Tables, Equipment, and Cleaning

	fData.CustomScriptLast += 	'if ($("input#tables-and-equipment-and-cleaning_registrationtable").is(":checked")) { \n' + 
								'   $("div#tables-cleaning-equipment-options-container").show("fast").removeClass("hidden"); \n' + 
								'   $("div#tables-cleaning-equipment-registration-table-times-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Registration-Table-Beginning-Datetime", "datetime", 0); \n' + 
								'		$().SetFieldToRequired("Registration-Table-Ending-Datetime", "datetime", 0); \n' + 
								'	} \n' +
								'} \n';

	fData.CustomScriptLast += 	'if ($("input#tables-and-equipment-and-cleaning_rentalequipment").is(":checked")) { \n' +
								'   $("div#tables-cleaning-equipment-options-container").show("fast").removeClass("hidden"); \n' +
								'   $("div#tables-cleaning-equipment-rental-equipment-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Rental-Equipment-Setup", "radio", 0); \n' + 
								'		$().SetFieldToRequired("Rental-Equipment-Pickup-Location", "radio", 0); \n' + 
								'	} \n' +
								'} \n';

	fData.CustomScriptLast += 	'if ($("input#tables-and-equipment-and-cleaning_more").is(":checked")) { \n' +
								'   $("div#tables-cleaning-equipment-options-container").show("fast").removeClass("hidden"); \n' +
								'   $("div#tables-cleaning-equipment-more-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("More-Tables-and-Equipment-and-Cleaning", "textarea", 0); \n' + 
								'	} \n' +
								'} \n';

	// Wolfgang Puck Catering

	fData.CustomScriptLast += 	'if ($("input#wolfgang-puck-catering_linens").is(":checked") || $("input#wolfgang-puck-catering_menu").is(":checked") || $("input#wolfgang-puck-catering_other").is(":checked")) { \n' +
								'   $("div#wpc-details-container").show("fast").removeClass("hidden"); \n' +
								'   $("div#label-and-control_WPC-Account-Number").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("WPC-Account-Number", "text", 0); \n' + 
								'	} \n' +
								'} \n';


	fData.CustomScriptLast += 	'if ($("input#wolfgang-puck-catering_other").is(":checked")) { \n' +
								'   $("div#label-and-control_WPC-Other").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("WPC-Other", "textarea", 0); \n' + 
								'	} \n' +
								'} \n';

	// IIT Help Desk and/or Infrastracture

	fData.CustomScriptLast += 	'if ($("input#iit-help-desk-and-infrastracture_yes").is(":checked")) { \n' +
								'   $("div#help-desk-or-infra-account-number-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Help-Desk-or-Infrastracture-Account-Number", "text", 0); \n' + 
								'	} \n' +
								'} \n';

	// IIT A/V

	fData.CustomScriptLast += 	'if ($("input#iit-av_yes").is(":checked")) { \n' +
								'   $("div#av-account-number-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("AV-Account-Number", "text", 0); \n' + 
								'	} \n' +
								'} \n';

	// Exhibit Maintenance

	fData.CustomScriptLast += 	'if ($("input#exhibit-maintenance_other").is(":checked")) { \n' +
								'   $("div#other-exhibit-maintenance-service-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Other-Exhibit-Maintenance-Service", "textarea", 0); \n' + 
								'	} \n' +
								'} \n';

	// Security Detail

	fData.CustomScriptLast += 	'if ($("input#security-detail_yes").is(":checked")) { \n' +
								'   $("div#security-detail-details-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Security-Detail-Account-Number", "text", 0); \n' + 
								'		$().SetFieldToRequired("Security-Detail-Location", "text", 0); \n' + 
								'		$().SetFieldToRequired("Security-Detail-Beginning-Datetime", "datetime", 0); \n' + 
								'		$().SetFieldToRequired("Security-Detail-Ending-Datetime", "datetime", 0); \n' + 
								'	} \n' +
								'} \n';

	// Guest Access

	fData.CustomScriptLast += 	'if ($("input#guest-access_yes").is(":checked")) { \n' +
								'   $("div#guest-access-details-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Guest-Access-Location", "text", 0); \n' + 
								'		$().SetFieldToRequired("Guest-Access-Beginning-Datetime", "datetime", 0); \n' + 
								'		$().SetFieldToRequired("Guest-Access-Ending-Datetime", "datetime", 0); \n' + 
								'	} \n' +
								'} \n';

	// Elevator Access

	fData.CustomScriptLast += 	'if ($("input#elevator-access_4andor5").is(":checked")) { \n' +
								'   $("div#elevator-access-details-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Elevator-Access-Security", "radio", 0); \n' + 
								'	} \n' +
								'} \n';


	// Facilities

	fData.CustomScriptLast += 	'if ($("input#facilities_tempcontrol").is(":checked") || $("input#facilities_more").is(":checked")) { \n' +
								'   $("div#facilities-subsection-container").show("fast").removeClass("hidden"); \n' +
								'} \n';

	fData.CustomScriptLast += 	'if ($("input#facilities_tempcontrol").is(":checked")) { \n' +
								'   $("div#facilities-temperature-control-subsection").show("fast").removeClass("hidden"); \n' +
								'   $("div#label-and-control_Temperature-Control-Beginning-Datetime").show("fast").removeClass("hidden"); \n' +
								'   $("div#label-and-control_Temperature-Control-Ending-Datetime").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Temperature-Control-Beginning-Datetime", "datetime", 0); \n' + 
								'		$().SetFieldToRequired("Temperature-Control-Ending-Datetime", "datetime", 0); \n' + 
								'	} \n' +
								'} \n';

	fData.CustomScriptLast += 	'if ($("input#facilities_more").is(":checked")) { \n' +
								'   $("div#facilities-more-subsection").show("fast").removeClass("hidden"); \n' +
								'   $("div#label-and-control_More-Facilities").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("More-Facilities", "textarea", 0); \n' + 
								'	} \n' +
								'} \n';

	// Crowd Management

	fData.CustomScriptLast += 	'if ($("input#crowd-management_yes").is(":checked")) { \n' +
								'   $("div#crowd-management-details-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Number-of-Crowd-Managers", "textarea", 0); \n' + 
								'	} \n' +
								'} \n';

	// Buyouts

	fData.CustomScriptLast += 	'if ($("input#buyouts_yes").is(":checked")) { \n' +
								'   $("div#buyout-details-container").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Buyout-Venues", "check", 0); \n' + 
								'		$().SetFieldToRequired("Buyout-Scheduled-or-Not", "radio", 0); \n' + 
								'		$().SetFieldToRequired("Buyout-Titles", "text", 0); \n' + 
								'		$().SetFieldToRequired("Buyout-Show-Time", "text", 0); \n' + 
								'		$().SetFieldToRequired("Buyout-Order-Number", "text", 0); \n' + 
								'	} \n' +
								'} \n';

	fData.CustomScriptLast += 	'if ($("input#buyout-venues_other").is(":checked")) { \n' +
								'   $("div#label-and-control_Other-Buyout-Venue").show("fast").removeClass("hidden"); \n' +
								'	if ($("input#Request-Status").val() == "Pending Revision" || $("input#Request-Status").val() == "Pending Approval") { \n' +
								'		$().SetFieldToRequired("Other-Buyout-Venue", "text", 0); \n' + 
								'	} \n' +
								'} \n';

	fData.CustomScriptLast += 	'$("div#container_about-the-requester").hide("fast").addClass("hidden"); \n';









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