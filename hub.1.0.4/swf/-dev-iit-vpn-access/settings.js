
(function ($) {



	var mData = {
		'componentID': 20083,
		"swf": 1,
		// "mosMainKey": "prod",
		// "mosMainKey": "dev",
		// "mosMainKey": "devMedium",
		"mosMainKey": "devLong",
		// "useRecordedMOSMainMajorVersion": 1,
		"currentRequestVersion": 1,
		"devAdminNotifications": 1,
		"notifications": 0
	};


	console.log("using settings m2");


	var oData = {
		'admin': {
			'buttons': [
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
						'basicRSQueryTwoRelevantStatuses': ["Pending Approval", "Approved"]
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicRSQueryTwoRelevantStatuses': ["Completed", "Cancelled"],
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
		'autoProcessApprovals': 1,
		'autoProcessAssignments': 1,
		'autoDateCompletion': 1,
		'approvalStmt': 'Approval indicates that the above access should be granted',
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardApprovalElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Complete", "display": "All work for this request has been completed" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				],
			},
			'standardAssignmentElements': 1,
			'standardCompletionElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'standardChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'newlyApprOrPending': { 'admin': 1, 'requester': 1 },
			'assignmentHasChanged': { 'workNewlyNeededNotify': 1, 'workNotNeededNotify': 1 },
			'endOfLife': {
				'admin': 1,
				'requester': {
					'completion': 'specific', //  generic
					'nonCompletion': 1
				}
			},
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Access Details',
				'begin': 1,
				'end': 1

			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Grant or Remove Access',
				'choiceSetLabel': 'Grant or Remove Access',
				'choices': [
					{
						'value': 'grant',
						'display': 'Grant'
					}, {
						'value': 'remove',
						'display': 'Remove'
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Type of User',
				'choiceSetLabel': 'Type of User',
				'choices': [
					{
						'value': 'staff',
						'display': 'Staff'
					}, {
						'value': 'nonstaff',
						'display': 'Non-Staff'
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'onChange': [
					// --- NOTE: staff agreement label exists in two places, so updates must be made twice
					{ 'thisFieldEquals': ['staff'], 'checkboxLabelUpdate': [{ 'labelFor': 'agreement_agreed', 'newLabel': 'The person for whom access is requested, whether myself or another, has read and understood the Museum\'s \\x3ca href=\\x22https://bmos.sharepoint.com/SitePages/VPN%20Remote%20Access%20Policy.aspx\\x22 target=\\x22_blank\\x22\\x3eVPN Remote Access Policy\\x3c/a\\x3e and agrees to abide by it as consideration for continued use of the Museum\'s network.', }] },
					{ 'thisFieldEquals': ['nonstaff'], 'checkboxLabelUpdate': [{ 'labelFor': 'agreement_agreed', 'newLabel': 'The person for whom access is requested, whether myself or another, has read and understood the Museum\'s \\x3ca href=\\x22https://bmos.sharepoint.com/SitePages/VPN%20Remote%20Access%20Policy.aspx\\x22 target=\\x22_blank\\x22\\x3eVPN Remote Access Policy\\x3c/a\\x3e and agrees to abide by it as consideration for continued use of the Museum\'s network. Since this person is not a staff member, I recognize that I am this person\'s sponsor as defined by said policy.' }] },
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'accessee name',
				'labelContent': 'Name of Person for whom Access is Requested',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Computer Description',
				'labelContent': 'Computer Description',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'helpNotes': [
					{
						'text': 'E.g., PC laptop, Mac desktop, etc.',
						'htmlID': 'computer-description_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				]
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Reason',
				'labelContent': 'Reason',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'helpNotes': [
					{
						'text': 'Which job responsibilities require this access?',
						'htmlID': 'reason_help-note',
						'hideForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
						'hideForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
					}
				]
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Agreement',
				'choiceSetLabel': 'Agreement',
				'choices': [
					{
						'value': 'agreed',
						// --- NOTE: staff agreement label exists in two places, so updates must be made twice
						'display': 'The person for whom access is requested, whether myself or another, has read and understood the Museum\'s \x3ca href=\x22https://bmos.sharepoint.com/SitePages/VPN%20Remote%20Access%20Policy.aspx\x22 target=\x22_blank\x22\x3eVPN Remote Access Policy\x3c/a\x3e and agrees to abide by it as consideration for continued use of the Museum\'s network.'
					}
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
			}
		]
	};
	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast =	'$("div#swf-specific-approval-preface").html("' +
                                '   If you are not a manager, then your manager\'s approval will be required.' +
								'   (IIT approval will be requested automatically.)' +
								'"); \n';

	fData.CustomScriptLast +=	'if ($("input#Request-Status").val().length <= 0) {' +
								'   $("div#approvers-people-picker_help-note").append(". ' +
								'       (An IIT approver will be added automatically.)' +
								'   "); \n' +
								'}';





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
