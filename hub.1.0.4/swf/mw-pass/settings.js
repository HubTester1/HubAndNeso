
(function ($) {

	var mData = {
		'componentID': 173,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m4");



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
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': "Number of Passes",
						'internalName': "Quantity",
					}, {
						'displayName': "Venue",
						'internalName': "Venue",
					}, {
						'displayName': 'Pickup Date',
						'internalName': 'PickupDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved'
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
			'preamble': '<p style="margin-top: 1rem;">Request 25+ Museum paper passes. ' +
				'Please request smaller quantities of passes from Marketing or your VP.</p>' + 
				'<p>If you\'re required to keep a log of your passes, this log must be reviewed ' +
				'by Brian Therrien or Yasmina Blaise before your request can be approved.</p>' +
				'<p>Allow 7 days for approval and fulfillment.</p>',
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': "Number of Passes",
						'internalName': "Quantity",
					}, {
						'displayName': "Venue",
						'internalName': "Venue",
					}, {
						'displayName': 'Pickup Date',
						'internalName': 'PickupDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Approved'
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'sortColAndOrder': [0, 'desc'],
						'basicMyEOLQueryRelevantValue': 1,
					}
				]
			}
		}
	};



	var fData = {
		'autoProcessApprovals': 1,
		'approvalStmt': 'Approval indicates that the above passes should be issued',
		'newRequestConditionalConfirmationAdditions': [
			{
				'condition': function () { return ($('input#replenishment-or-not_replenishing').is(':checked')); },
				'addition': '<p>Before your request can be approved, you must submit your pass log to Brian Therrien or Yasmina Blaise for review.</p>'
			}
		],
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
				'controlType': 'radio',
				'fieldName': "Replenishment or Not",
				'choiceSetLabel': "Are you replenishing a stock of passes?",
				'choices': [
					{
						'value': "replenishing",
						'display': "Yes, I am replenishing a stock"
					}, {
						'value': "notReplenishing",
						'display': "No, this is a one-off request"
					}
				],
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]

			
			
			
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Quantity",
				'listFieldName': "Quantity",
				'labelContent': "Number of Passes",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				'disabledForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Venue",
				'listFieldName': "Venue",
				'labelContent': "Venue",
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
				'listFieldName': "PickupDate",
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
				'fieldName': "Campaign",
				'labelContent': "For which campaign / appeal will these passes be used?",
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
