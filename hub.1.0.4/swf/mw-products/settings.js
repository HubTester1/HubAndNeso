
(function ($) {

	var mData = {
		'componentID': 170,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
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
						'tableTitle': 'Submitted',
						'tableID': 'submitted',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Submitted'
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
		// 'bypassNormalDataSaving': 1,
		// 'customDataSavingFunction': 'ReturnGSESchedulesSubmissionValuePairArrayTest',
		/*'autoProcessApprovals': 1,
		'autoProcessAssignments': 1,
		'autoDateCompletion': 1,
		'approvalStmt': 'Approval indicates that the above access should be granted',
		'newRequestConditionalConfirmationAdditions': [
			{
				'condition': function () {
					return !($('input#has-computer_has-computer').is(':checked')) ||
						$('input#needs-reg-vpn_needsregvpn').is(':checked') ||
						$('input#needs-fundraising_needsfundraising').is(':checked');
				},
				'addition': '<h2>Please Note</h2>'
			}, {
				'condition': function () { return !($('input#has-computer_has-computer').is(':checked')); },
				'addition': '<div class="single-message"><p>If a computer needs to be purchased, a signing manager needs to ' +
							'email the Help Desk with an account code for the purchase of a new ' +
							'machine. Please also indicate any specialty software other than Office ' +
							'or other equipment that needs to be purchased.</p>' +
							'<p><a href="' +
							'mailto:ithelp@mos.org?subject=computer purchase needed&body=Please charge to the following account:' +
							'">Start the email now</a></p></div>'
			}, {
				'condition': function () { return $('input#needs-reg-vpn_needsregvpn').is(':checked'); },
				'addition': '<div class="single-message"><p>Regular VPN Access also requires <a target="_blank" '+
							'href="https://bmos.sharepoint.com/sites/iit-vpn-access/SitePages/My%20VPN%20Access%20Requests.aspx">' +
							'this additional request</a>.</p>'
			}, {
				'condition': function () { return $('input#needs-fundraising_needsfundraising').is(':checked'); },
				'addition': '<div class="single-message"><p>Fundraising Database Access also requires <a target="_blank" ' +
							'href="https://bmos.sharepoint.com/AdvDMSFiles/Fundraising-Database-Access-Request.doc">' +
							'this additional request</a>.</p>'
			}
		],*/
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': 1,
			/*'standardApprovalElements': 1,
			'standardAdminAssignmentCompletionElements': {
				'changeRequestStatus': [
					{ "value": "Complete", "display": "All work for this request has been completed" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				]
			},*/
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'testNotifications': 1,
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': "markup",
				'tag': "h2",
				'content': "Files",
				'begin': 1,
				'end': 1





			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'attachments',
				'htmlClass': 'repeating-content-container',
				// 'hideForNonAdmin': ['Submitted','Completed', 'Cancelled'],
				// 'hideForAdmin': ['Submitted','Completed', 'Cancelled'],
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
						'hideForNonAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled']
					}
				],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				// 'hideForNonAdmin': ["", "Completed", "Disapproved", "Cancelled", "Disapproved", "Cancelled"],
				// 'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],






			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled'],
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
				'disabledForNonAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled'],
				'hideForNonAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled'],
				'hideForAdmin': ['Pending Approval', 'Submitted', 'Completed', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1

			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Additional Info",
				'labelContent': "Additional Information",
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]







				/*			}, {
								'elementType': 'field',
								'controlType': 'mosFile',
								'fieldName': 'MOS Custom File',
								'labelContent': 'MOS Custom File',
								'populatableForNonAdmin': ["", "Pending Approval"],
								'populatableForAdmin': ["", "Pending Approval"],
								'replaceableForNonAdmin': ['Pending Approval', 'Approved'],
								'replaceableForAdmin': ['Pending Approval', 'Approved'],
								'helpNotes': [
									{
										'text': "Files larger than 20 MB may take a long time to upload",
										'htmlID': "file-attachment-size-recommendation",
									}
								],
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								// 'hideForNonAdmin': ["", "Completed", "Disapproved", "Cancelled", "Disapproved", "Cancelled"],
								// 'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Text Field",
								'labelContent': "Text Field",
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				*/









				/*			}, {
								'elementType': 'markup',
								'tag': 'div',
								'begin': 1,
								'htmlID': 'offering-datetime-sets',
								'htmlClass': 'repeating-content-container', 
								// 'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
								// 'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled']
							}, {
								'elementType': 'markup',
								'tag': 'div',
								'begin': 1,
								'htmlID': 'offering-datetime-set',
								'htmlClass': 'repeat-container', 
								'repeatable': 1
							}, {
								'elementType': 'field',
								'controlType': 'datePicker',
								'fieldName': 'Offering Beginning Datetime',
								'labelContent': 'Beginning Date and Time',
								// 'listFieldName': 'BeginningEventDate',
								'requiredForNonAdmin': ['Pending Approval', 'Approved', 'Text Edited', 'Web Live', 'Completed', 'Disapproved', 'Cancelled'],
								'requiredForAdmin': ['Completed', 'Disapproved', 'Cancelled'],
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
				*/



				/*			}, {
								'elementType': "markup",
								'tag': "h2",
								'content': "Access Type",
								'begin': 1,
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "radio",
								'fieldName': "Staff or Volunteer",
								'choiceSetLabel': "Staff or Volunteer",
								'choices': [
										{
											'value': "staff",
											'display': "Staff"
										}, {
											'value': "volunteer",
											'display': "Volunteer"
										}, {
											'value': "contractor",
											'display': "Contractor"
										}
								],
								'onChange': [
									{ 'thisFieldEquals': ['staff', 'contractor'], 'addlAndConditions': ['$("input#new-or-change_new").is(":checked")'], 'show': [{ 'fieldName': 'Unpaid Intern' }], 'require': [{ 'fieldName': 'Unpaid Intern', 'type': 'radio' }] },
									{ 'thisFieldEquals': ['volunteer'], 'hide': [{ 'fieldName': 'Unpaid Intern' }], 'optional': [{ 'fieldName': 'Unpaid Intern', 'type': 'radio' }] },
									{ 'thisFieldEquals': ['staff', 'contractor'], 'hide': [{ 'fieldName': 'Personal Email Address' }] },
									{ 'thisFieldEquals': ['volunteer'], 'show': [{ 'fieldName': 'Personal Email Address' }] },
									{ 'thisFieldEquals': ['staff', 'contractor'], 'show': [{ 'divClass': 'staff-or-contractor-only-container' }] },
									{ 'thisFieldEquals': ['volunteer'], 'hide': [{ 'divClass': 'staff-or-contractor-only-container' }] },
								],
								// 'requiredForNonAdmin': [''],
								// 'requiredForAdmin': [''],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "radio",
								'fieldName': "Single or Multiple",
								'choiceSetLabel': "Single Person or Multiple People",
								'choices': [
										{
											'value': "single",
											'display': "Single Person"
										}, {
											'value': "multiple",
											'display': "Multiple People"
										}
								],
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "radio",
								'fieldName': "New or Change",
								'choiceSetLabel': "New Account or Account Change",
								'choices': [
										{
											'value': "new",
											'display': "New Account(s)"
										}, {
											'value': "change",
											'display': "Account Change"
										}
								],
								'onChange': [
									{ 'thisFieldEquals': ["new"], 'addlAndConditions': ['$("input#staff-or-volunteer_staff").is(":checked")'], 'show': [{ 'fieldName': 'Unpaid Intern' }], 'require': [{ 'fieldName': "Unpaid Intern", 'type': "radio" }] },
									{ 'thisFieldEquals': ["new"], 'require': [{ 'fieldName': "Start Date", 'type': "text" }] },
									{ 'thisFieldEquals': ["change"], 'hide': [{ 'fieldName': "Unpaid Intern" }], 'optional': [{ 'fieldName': "Unpaid Intern", 'type': "radio" }, { 'fieldName': "Start Date", 'type': "text" }] }
								],
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "radio",
								'fieldName': "Unpaid Intern",
								'choiceSetLabel': "Unpaid Intern",
								'choices': [
										{
											'value': "intern",
											'display': "Yes, this is for an unpaid intern"
										}, {
											'value': "notIntern",
											'display': "No, this is not for an unpaid intern"
										}
								],
								'hideForNonAdmin': ["", "Completed", "Disapproved", "Cancelled", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "markup",
								'tag': "h2",
								'content': "Staff, Volunteer, or Contractor Details",
								'begin': 1,
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Name",
								'labelContent': "Name",
								'listFieldName': "StaffVolNames",
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Department",
								'labelContent': "Department",
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Title",
								'labelContent': "Title",
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Supervisor",
								'labelContent': "Supervisor",
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Office Location",
								'labelContent': "Office Location",
								// 'requiredForNonAdmin': [""],
								// 'requiredForAdmin': [""],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "datePicker",
								'fieldName': "Start Date",
								'labelContent': "Start Date",
								'listFieldName': "StartDate",
								"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
								"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'helpNotes': [
									{
										'text': "Due to the short notice, changes may not be complete by this Start Date.",
										'htmlID': "start-date-too-soon",
										'emphasis': 1,
										'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
										'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
									}
								],
								'onChange': [
									{ 'thisDateFieldLessThanDaysFromNow': "7", 'show': [{ 'noteID': "start-date-too-soon" }] },
									{ 'thisDateFieldGreaterThanDaysFromNowEqualTo': "7", 'hide': [{ 'noteID': "start-date-too-soon" }] }
								],
							}, {
								'elementType': "field",
								'controlType': "datePicker",
								'fieldName': "End Date",
								'labelContent': "End Date",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Has Computer",
								'choiceSetLabel': "Do You Have a Computer For this Person?",
								'choices': [
										{
											'value': "has-computer",
											'display': "Yes, I have a computer"
										}
								],
								'onChange': [
									{ 'thisFieldIsChecked': 1, 'show': [{ 'fieldName': "Computer Tag" }], 'require': [{ 'fieldName': "Computer Tag", 'type': "text" }] },
									{ 'thisFieldIsChecked': 0, 'hide': [{ 'fieldName': "Computer Tag" }], 'optional': [{ 'fieldName': "Computer Tag", 'type': "text" }] }
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Computer Tag",
								'labelContent': "Computer Asset Tag Number",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForNonAdmin': ["", "Completed", "Disapproved", "Cancelled", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				
				
							}, {
								'elementType': "markup",
								'tag': "h2",
								'content': "Access Details",
								'begin': 1,
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Account",
								'choiceSetLabel': "Needs a Network Account (to access computers)?",
								'choices': [
									{
										'value': "needsAccount",
										'display': "Yes, needs network account"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Intranet",
								'choiceSetLabel': "Needs Access to a Part of Quark or the Hub?",
								'choices': [
									{
										'value': "needsIntranet",
										'display': "Yes, needs Intranet access"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'onChange': [
									{ 'thisFieldIsChecked': 1, 'show': [{ 'divID': "intranet-parts-and-access-types" }], 'require': [{ 'fieldName': "Intranet URL", 'type': "text" }, { 'fieldName': "Intranet Access Type", 'type': "text" }] },
									{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': "intranet-parts-and-access-types" }], 'optional': [{ 'fieldName': "Intranet URL", 'type': "text" }, { 'fieldName': "Intranet Access Type", 'type': "text" }] }
								],
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlID': "intranet-parts-and-access-types",
								'htmlClass': "subsection-container repeating-content-container",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlID': "intranet-part-and-access-type",
								'htmlClass': "subsection repeat-container",
								'repeatable': 1
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Intranet URL",
								'labelContent': "Which Part?",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'helpNotes': [
									{
										'text': "E.g., https'://matrix.mos.org/depts/iit",
										'htmlID': "intranet-url_help-note",
										'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
										'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
									}
								]
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Intranet Access Type",
								'labelContent': "What Kind of Access?",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'helpNotes': [
									{
										'text': "E.g., view, edit, receive notifications, etc.",
										'htmlID': "intranet-access-type_help-note",
										'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
										'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
								'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1,
							}, {
								'elementType': "markup",
								'tag': "a",
								'begin': 1,
								'end': 1,
								'htmlID': "repeat-intranet-part-and-access-type",
								'htmlClass': "repeat-section-anchor",
								'content': "Insert a Part",
								'repeatSectionID': "intranet-part-and-access-type",
								'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "text",
								'fieldName': "Personal Email Address",
								'labelContent': "Personal Email Address",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'helpNotes': [
									{
										'text': "If used for Museum correspondence; e.g., myname@outlook.com",
										'htmlID': "intranet-access-type_help-note",
										'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
										'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
									}
								]
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Email and Calendar",
								'choiceSetLabel': "Needs mos.org Email and Calendar?",
								'choices': [
									{
										'value': "needsEmailCalendar",
										'display': "Yes, needs email and calendar"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Needs Email List",
								'labelContent': "Email Lists to Which this Person or Group Should be Added",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlClass': "staff-or-contractor-only-container",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
							}, {
								'elementType': "field",
								'controlType': "check",
								'requestVersion': 2,
								'fieldName': "Needs Shared Email",
								'choiceSetLabel': "Needs Access to Shared Email Accounts?",
								'choices': [
									{
										'value': "needsSharedEmail",
										'display': "Yes, needs access to shared email accounts"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'onChange': [
									{ 'thisFieldIsChecked': 1, 'show': [{ 'divID': "shared-email-options-subsection-container"}]},
									{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': "shared-email-options-subsection-container"}]}
								],
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlID': "shared-email-options-subsection-container",
								'htmlClass': "subsection-container",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlID': "shared-email-options-subsection",
								'htmlClass': "subsection",
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'requestVersion': 2,
								'fieldName': "Which Shared Email",
								'labelContent': "Which Shared Email Accounts?",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "check",
								'requestVersion': 2,
								'fieldName': "New Shared Email Account",
								'choiceSetLabel': "New Shared Email Account?",
								'choices': [
									{
										'value': "newSharedEmail",
										'display': "Yes, this is a new shared email account"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "check",
								'requestVersion': 2,
								'fieldName': 'Send As Access',
								'choiceSetLabel': 'Should be able to "send as" this account?',
								'choices': [
									{
										'value': 'sendAs',
										'display': 'Yes, allow "send as"'
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1,
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Needs Shared Calendar",
								'labelContent': "Shared Calendars to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Zeus Home Folder",
								'choiceSetLabel': "Needs Zeus Home Folder?",
								'choices': [
									{
										'value': "needsZeusHomeFolder",
										'display': "Yes, needs Zeus home folder"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Needs Existing Zeus Share",
								'labelContent': "Existing Zeus Shared Folders to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'helpNotes': [
									{
										'text': "No need to specify Zeus\\Shared\\Public",
										'htmlID': "needs-existing-zeus-share_help-note",
										'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
										'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
									}
								]
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Needs New Zeus Share",
								'labelContent': "New Zeus Shared Folders to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlClass': "staff-or-contractor-only-container",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Phone",
								'choiceSetLabel': "Needs Phone?",
								'choices': [
									{
										'value': "needsPhone",
										'display': "Yes, needs phone"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'onChange': [
									{ 'thisFieldIsChecked': 1, 'show': [{ 'divID': "phone-extensions-and-options-subsection-container" }] },
									{ 'thisFieldIsChecked': 0, 'hide': [{ 'divID': "phone-extensions-and-options-subsection-container" }] },
								],
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlID': "phone-extensions-and-options-subsection-container",
								'htmlClass': "subsection-container",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlID': "phone-extensions-and-options-subsection",
								'htmlClass': "subsection",
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Which Phone",
								'labelContent': "Extensions to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Which Phone Options",
								'labelContent': "Phone Options Needed",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1,
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'requestVersion': 1,
								'fieldName': "Which Non-Financial Reports",
								'labelContent': "Non-Financial Reports to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'requestVersion': 2,
								'fieldName': "Which Non-Financial Crystal Reports",
								'labelContent': "Non-Financial Crystal Reports to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'helpNotes': [
									{
										'text': "Most reports are on Tessitura",
										'htmlID': "most-reports-are-on-tessitura",
										'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
										'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
									}
								],
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Which Financial Reports",
								'labelContent': "Financial Reports to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "check",
								'requestVersion': 1,
								'fieldName': "Needs Ticketing or POS",
								'choiceSetLabel': "Needs Admits / POS Access?",
								'choices': [
									{
										'value': "needsTicketingOrPOS",
										'display': "Yes, needs Admits / POS access"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "check",
								'requestVersion': 1,
								'fieldName': "Needs Sale Wizard",
								'choiceSetLabel': "Needs Sale Wizard Access?",
								'choices': [
									{
										'value': "needsSaleWizard",
										'display': "Yes, needs Sale Wizard access"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "check",
								'requestVersion': 2,
								'fieldName': "Needs Tessitura",
								'choiceSetLabel': "Needs Tessitura Access?",
								'choices': [
									{
										'value': "needsTessitura",
										'display': "Yes, needs Tessitura access"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'onChange': [
									{ 'thisFieldIsChecked': 1, 'show': [{ 'fieldName': "Specify Tessitura Access" }, { 'fieldName': "Tessitura Access Agreement Signed" }], 'require': [{ 'fieldName': "Specify Tessitura Access", 'type': "textarea" }, { 'fieldName': "Tessitura Access Agreement Signed", 'type': "radio" }] },
									{ 'thisFieldIsChecked': 0, 'hide': [{ 'fieldName': "Specify Tessitura Access" }, { 'fieldName': "Tessitura Access Agreement Signed" }], 'optional': [{ 'fieldName': "Specify Tessitura Access", 'type': "text" }, { 'fieldName': "Tessitura Access Agreement Signed", 'type': "radio" }] }
								],
							}, {
								'elementType': "field",
								'controlType': "radio",
								'requestVersion': 2,
								'fieldName': "Tessitura Access Agreement Signed",
								'choiceSetLabel': "Tessitura Access Agreement Signed",
								'choices': [
									{
										'value': "hasSigned",
										'display': "Tessitura Access Agreement has been forwarded to Human Resources"
									}, {
										'value': "willHaveSigned",
										'display': "Signer has not yet started, but I will be responsible for this being forwarded to Human Resources"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'requestVersion': 2,
								'fieldName': "Specify Tessitura Access",
								'labelContent': "Specify the Tessitura Access this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'helpNotes': [
									{
										'text': "I.e., department, reporting, etc.",
										'htmlID': "tessitura-access-specification",
										'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
										'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
									}
								],
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlClass': "staff-or-contractor-only-container",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "check",
								'requestVersion': 1,
								'fieldName': "Needs Fundraising",
								'choiceSetLabel': "Needs Millennium Access?",
								'choices': [
									{
										'value': "needsFundraising",
										'display': "Yes, needs Millennium access"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Track-It Technician",
								'choiceSetLabel': "Needs to be Added to Track-It as a Technician?",
								'choices': [
									{
										'value': "needsTrackItTechnician",
										'display': "Yes, needs to be a Track-It technician"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Needs Other",
								'labelContent': "Other Databases or Systems to Which this Person or Group Should Have Access",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "markup",
								'tag': "div",
								'begin': 1,
								'htmlClass': "staff-or-contractor-only-container",
								'hideForNonAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'hideForAdmin': ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Web VPN",
								'choiceSetLabel': "Needs Web VPN Access?",
								'choices': [
									{
										'value': "needsWebVPN",
										'display': "Yes, needs web VPN access"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "field",
								'controlType': "check",
								'fieldName': "Needs Reg VPN",
								'choiceSetLabel': "Needs Regular VPN Access?",
								'choices': [
									{
										'value': "needsRegVPN",
										'display': "Yes, needs regular VPN access"
									}
								],
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
							}, {
								'elementType': "markup",
								'tag': "div",
								'end': 1
							}, {
								'elementType': "field",
								'controlType': "textarea",
								'fieldName': "Additional Info",
								'labelContent': "Additional Information",
								'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
								'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				*/
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
