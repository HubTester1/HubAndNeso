/* eslint-disable */
(function ($) {

	var mData = {
		'componentID': 20126,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m1");



	var oData = {
		'admin': {
			'buttons': [],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Request ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Keys For',
						'internalName': 'KeysFor',
					}, {
						'displayName': 'Requested By',
						'internalName': 'RequestedBy',
						'userName': 1
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
						'tableTitle': 'Ready For Pickup <span class="table-title-parenthetical-note">(Last 30 Days)</span>',
						'tableID': 'ready-for-pickup',
						'someColsAreUsers': 1,
						'fieldGEQDaysBeforeToday': ['CompletionDate', 30],
					}
				]
			}
		},
		'my': {
			'buttons': [
			],
			'preamble': 'Please comply with the following in submitting your request. ' + 
				'<ul>' +
				'<li>Volunteers are not issued keys.</li>' + 
				'<li>Key requests for Interns will require additional approval from Human Resources. (Public Safety will seek approval from the appropriate person, as needed.)</li>' + 
				'<li>Accurately describe locations for which you are requesting keys.</li>' + 
				'<li>Clearly identify people being replaced.</li>' + 
				'</ul>',
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
		'autoDateCompletion': 1,
		'autoPopulateRequestedBy': 1,
		'approvalPreface': 'Approval is required from the key recipient\'s manager, supervisor, or VP.',
		'approvalStmt': 'Approval indicates that the designated keys should be issued.',
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
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'standardChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'newlyApprOrPending': { 'admin': 1, 'requester': 1 },
			'endOfLife': {
				'admin': 1,
				'requester': {
					'nonCompletion': 1,
					'completion': 'unique', //  specific, generic
					'uniqueBody': function (uriFormAdmin, requestNick, adminEmailString) {
						return '<p>This is the <a href="' + uriFormAdmin + '">request you nicknamed "' + requestNick +
							'"</a>. Please pick up keys in the Public Safety office. <a href="mailto:' + adminEmailString + '">Contact ' +
							'the admin</a> with any issues related to this request.';
					}
				}
			},
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Key Needs',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Keys are For",
				"labelContent": "Who are these keys for?",
				"listFieldName": "KeysFor",
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Reason for Keys",
				"labelContent": "Why are these keys needed?",
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"helpNotes": [
					{
						"text": "E.g., lost keys, new employee, replacing Jane Doe, etc.",
						"htmlID": "reason-for-keys_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				]
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Which Keys",
				"labelContent": "Which keys are needed?",
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"helpNotes": [
					{
						"text": "Describe either the keys or what you need to access",
						"htmlID": "which-keys_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Validator", "Validator Issued", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				]
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Completion Date',
				'begin': 1,
				'end': 1,
				"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "datePicker",
				"fieldName": "Completion Date",
				"labelContent": "Completion Date",
				"listFieldName": "CompletionDate",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = '$("option[value=\'Complete\']").text("Keys are ready for pickup"); \n \n';

	fData.customScriptLast += 'if ($("input#Keys-are-For").val() == "") { \n' +
		'   $("input#Keys-are-For").val($("input#Requester-Name").val()) \n' +
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
