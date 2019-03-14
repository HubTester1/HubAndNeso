
(function ($) {

	var mData = {
		// 'componentID': 79,
		'componentID': 173,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 1,
		'notifications': 1,
	};

	console.log("using settings m3");



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
		'autoProcessApprovals': 1,
		'approvalStmt': 'Approval indicates that the above passes should be issued',
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Complete", "display": "All work for this request has been completed" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				]
			},
			'standardApprovalElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'standardChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'newlyApprOrPending': { 'admin': 1, 'requester': 1 },
			// 'assignmentHasChanged': { 'workNewlyNeededNotify': 1, 'workNotNeededNotify': 1 },
			'endOfLife': {
				'admin': 1,
				'requester': {
					'uniqueBody': function (uriRequest, requestNick) {
						return '<p>This is the <a href="' + uriRequest + '">request you nicknamed "' + requestNick +
							'"</a>. Please pick up your passes soon. <a href="mailto:' + eData.adminEmailString + '">Contact the admin</a> with any ' +
							'issues related to this request.'
					}
				}
			},
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				"elementType": "markup",
				"tag": "h2",
				"content": "Pass Details",
				"begin": 1,
				"end": 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Quantity",
				'labelContent': "Number of Passes",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Venue",
				'labelContent': "Venue",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Users",
				'labelContent': "Who will use these passes?",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': 'datePicker',
				'fieldName': "Pass Initiation Date",
				'labelContent': "Pass Initiation Date",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': 'datePicker',
				'fieldName': "Pass Expiration Date",
				'labelContent': "Pass Expiration Date",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': 'datePicker',
				'fieldName': "Pass Pickup Date",
				'labelContent': "Pass Pickup Date",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': "Due to the short notice, passes may not be ready for pickup by this date.",
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
				'controlType': "textarea",
				'fieldName': "Reason",
				'labelContent': "Reason for Requesting Passes",
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Additional Information",
				'labelContent': "Additional Information",
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = 'if ($("input#Request-Status").val() == "") { \n' + 
		'   $("div#container_approvals").hide("fast").addClass("hidden"); \n' +
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
