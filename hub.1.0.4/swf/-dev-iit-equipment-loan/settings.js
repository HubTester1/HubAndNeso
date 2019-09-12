
(function ($) {

	var mData = {
		// 'componentID': 79,
		'componentID': 20080,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 1,
		'devAdminNotifications': 1,
		'notifications': 1,
	};

	console.log("using settings m204");



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
						'displayName': 'Requested By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Beginning Date - Requested',
						'internalName': 'LoanBeginningDateRequested',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'Beginning Time - Requested',
						'internalName': 'LoanBeginningTimeRequested',
					}, {
						'displayName': 'Beginning Date - Actual',
						'internalName': 'LoanBeginningDateActual',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'End Date - Requested',
						'internalName': 'LoanEndDateRequested',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'End Time - Requested',
						'internalName': 'LoanEndTimeRequested',
					}, {
						'displayName': 'Loaned By',
						'internalName': 'LoanedBy',
						'userName': 1
					}, {
						'displayName': 'Loaned To',
						'internalName': 'LoanedTo',
						'userName': 1
					}, {
						'displayName': 'Computers',
						'internalName': 'ComputersBoolean',
					}, {
						'displayName': 'Computer Quantity',
						'internalName': 'ComputersQuantity',
					}, {
						'displayName': 'Request Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableTitle': 'Unapproved',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Pending Approval',
						'sortColAndOrder': [4, 'asc'],
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
								'displayName': 'Talk To',
								'internalName': 'RequestedFor',
								'userName': 1
							}, {
								'displayName': 'Beginning Date - Requested',
								'internalName': 'LoanBeginningDateRequested',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Beginning Time - Requested',
								'internalName': 'LoanBeginningTimeRequested',
							}, {
								'displayName': 'End Date - Requested',
								'internalName': 'LoanEndDateRequested',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'End Time - Requested',
								'internalName': 'LoanEndTimeRequested',
							}, {
								'displayName': 'Computers',
								'internalName': 'ComputersBoolean',
							}, {
								'displayName': 'Computer Quantity',
								'internalName': 'ComputersQuantity',
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						]
					}, {
						'tableTitle': 'Unloaned',
						'tableID': 'unloaned',
						'someColsAreUsers': 1,
						'customCAMLQuery': '<Where>' +
							'  <And>' +
							'    <Eq>' +
							'      <FieldRef Name="RequestStatus"></FieldRef>' +
							'      <Value Type="Text">Approved</Value>' +
							'    </Eq>' +
							'    <IsNull>' +
							'      <FieldRef Name="LoanedTo"></FieldRef>' +
							'    </IsNull>' +
							'  </And>' +
							'</Where>',
						'sortColAndOrder': [4, 'asc'],
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
								'displayName': 'Talk To',
								'internalName': 'RequestedFor',
								'userName': 1
							}, {
								'displayName': 'Beginning Date - Requested',
								'internalName': 'LoanBeginningDateRequested',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Beginning Time - Requested',
								'internalName': 'LoanBeginningTimeRequested',
							}, {
								'displayName': 'End Date - Requested',
								'internalName': 'LoanEndDateRequested',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'End Time - Requested',
								'internalName': 'LoanEndTimeRequested',
							}, {
								'displayName': 'Computers',
								'internalName': 'ComputersBoolean',
							}, {
								'displayName': 'Computer Quantity',
								'internalName': 'ComputersQuantity',
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						]
					}, {
						'tableTitle': 'Loaned',
						'tableID': 'loaned',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Loaned',
						'sortColAndOrder': [4, 'asc'],
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicEOLQueryRelevantValue': 1,
						'sortColAndOrder': [4, 'desc'],
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
								'displayName': 'Talk To',
								'internalName': 'RequestedFor',
								'userName': 1
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus',
							}, {
								'displayName': 'Beginning Date - Requested',
								'internalName': 'LoanBeginningDateRequested',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Beginning Time - Requested',
								'internalName': 'LoanBeginningTimeRequested',
							}, {
								'displayName': 'Beginning Date - Actual',
								'internalName': 'LoanBeginningDateActual',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'End Date - Requested',
								'internalName': 'LoanEndDateRequested',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'End Time - Requested',
								'internalName': 'LoanEndTimeRequested',
							}, {
								'displayName': 'End Date - Actual',
								'internalName': 'LoanEndDateActual',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Loaned By',
								'internalName': 'LoanedBy',
								'userName': 1
							}, {
								'displayName': 'Loaned To',
								'internalName': 'LoanedTo',
								'userName': 1
							}, {
								'displayName': 'Returned By',
								'internalName': 'ReturnedBy',
								'userName': 1
							}, {
								'displayName': 'Returned To',
								'internalName': 'ReturnedTo',
								'userName': 1
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
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
		'autoTrackPendingAndApprovalAndLoanAndReturn': 1,
		'approvalStmt': 'Approval indicates that the specified equipment will be ready for pick up and that it may be returned at the specified date and time.',
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'superSimpleChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 0, 'requester': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': ['Cancelled'] }
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Loan Request Details',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Loan Beginning Date',
				'labelContent': 'Loan Beginning Date',
				'listFieldName': 'LoanBeginningDateRequested',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Loan Beginning Time',
				'labelContent': 'Loan Beginning Time',
				'listFieldName': 'LoanBeginningTimeRequested',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				"helpNotes": [
					{
						"text": "E.g., 9 am",
						"htmlID": "loan-beginning-date_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"]
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Loan End Date',
				'labelContent': 'Loan End Date',
				'listFieldName': 'LoanEndDateRequested',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled']
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Loan End Time',
				'labelContent': 'Loan End Time',
				'listFieldName': 'LoanEndTimeRequested',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Completed', 'Disapproved', 'Cancelled'],
				"helpNotes": [
					{
						"text": "E.g., 5 pm",
						"htmlID": "loan-beginning-date_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"]
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Equipment Quantities and Types',
				'labelContent': 'Equipment Quantities and Types',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Loan Purpose',
				'labelContent': 'Loan Purpose',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'radio',
				'fieldName': 'Computers Boolean',
				'listFieldName': 'ComputersBoolean',
				'choiceSetLabel': 'Computer Needed',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I need one or more computers'
					}, {
						'value': 'no',
						'display': 'No, I don\'t need a computer'
					}
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{ 'thisFieldEquals': ['yes'], 'show': [{ 'fieldName': 'Computers Quantity' }], 'require': [{ 'fieldName': 'Computers Quantity', 'type': 'select' }] },
					{ 'thisFieldEquals': ['no'], 'hide': [{ 'fieldName': 'Computers Quantity' }], 'optional': [{ 'fieldName': 'Computers Quantity', 'type': 'select' }] }
				],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Computers Quantity',
				'listFieldName': 'ComputersQuantity',
				'labelContent': 'How many computers?',
				"setOptions": [
					{
						"value": "1",
						"display": "1"
					}, {
						"value": "2",
						"display": "2"
					}, {
						"value": "3",
						"display": "3"
					}, {
						"value": "4",
						"display": "4"
					}, {
						"value": "5",
						"display": "5"
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Special Software Needed Boolean',
				'choiceSetLabel': 'Special Software Needed',
				'choices': [
					{
						'value': 'yes',
						'display': 'Yes, I need special software beyond Microsoft Office and web browsers'
					}
				],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'onChange': [
					{ 'thisFieldIsChecked': 1, 'show': [{ 'fieldName': 'Special Software Needs' }], 'require': [{ 'fieldName': 'Special Software Needs', 'type': 'textarea' }] },
					{ 'thisFieldIsChecked': 0, 'hide': [{ 'fieldName': 'Special Software Needs' }], 'optional': [{ 'fieldName': 'Special Software Needs', 'type': 'textarea' }] }
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Special Software Needs',
				'labelContent': 'Which special software?',
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForNonAdmin': ['', 'Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['', 'Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],

			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Agreement',
				'choiceSetLabel': 'Agreement',
				'choices': [
					{
						'value': 'agreed',
						'display': 'I agree that I will care for this equipment during the loan period, that I will report any loss or damage within 24 hours, and that I will return the equipment by the specified date and time.'
					}
				],
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				'disabledForNonAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'disabledForAdmin': ['Pending Approval', 'Approved', 'Loaned', 'Completed', 'Disapproved', 'Cancelled'],




















				"elementType": "markup",
				"tag": "div",
				"htmlID": "admin",
				"content": '',
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": []
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": 'Admin',
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "approval-notification-history",
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "h3",
				"content": 'Approval Notification History',
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "markup",
				"tag": "table",
				"htmlID": "table_approval-notification-history",
				"content": '  <thead>' +
					'       <tr>' +
					'           <th id="th_recipient">Recipient</th>' +
					'           <th id="th_needed-or-not">Needed or Not Needed</th>' +
					'           <th id="th_date">Date & Time</th>' +
					'       </tr>' +
					'   </thead>' +
					'   <tbody>' +
					'   </tbody>',
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"content": 'Request Status and Notes',
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Change Request Status",
				"labelContent": "Change Request Status",
				"setOptions": [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Loaned", "display": "Equipment has been loaned" },
					{ "value": "Complete", "display": "Equipment has been returned" },
					{ "value": "Cancel", "display": "This request has been cancelled" }
				],
				"hideForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Completed", "Disapproved", "Cancelled"],
				'onChange': [
					{ "thisFieldEquals": ["Loaned"], "show": [{ "divID": "loan" }], "require": [{ "fieldName": "Loan Item Quantity", "type": "text" }, { "fieldName": "Loan Item Asset ID", "type": "text" }, { "fieldName": "Loan Item Description", "type": "text" }, { "fieldName": "Loan Date", "type": "datePicker" }, { "fieldName": "Loaned To", "type": "peoplepicker" }, { "fieldName": "Loaned By", "type": "peoplepicker" }] },
					{ "thisFieldEquals": ["Complete"], "show": [{ "divID": "return" }], "require": [{ "fieldName": "Return Date", "type": "datePicker" }, { "fieldName": "Returned To", "type": "peoplepicker" }, { "fieldName": "Returned By", "type": "peoplepicker" }] },
					{ "thisFieldEquals": ["", "Cancel"], 'addlOrConditions': ['$("input#Request-Status").val() == ""', '$("input#Request-Status").val() == "Approved"'], "hide": [{ "divID": "loan" }, { "divID": "return" }], "optional": [{ "fieldName": "Loan Item Quantity", "type": "text" }, { "fieldName": "Loan Item Asset ID", "type": "text" }, { "fieldName": "Loan Item Description", "type": "text" }, { "fieldName": "Loan Date", "type": "datePicker" }, { "fieldName": "Loaned To", "type": "peoplepicker" }, { "fieldName": "Loaned By", "type": "peoplepicker" }, { "fieldName": "Return Date", "type": "datePicker" }, { "fieldName": "Returned To", "type": "peoplepicker" }, { "fieldName": "Returned By", "type": "peoplepicker" }] },
				],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ["", "Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "New Admin Notes",
				"labelContent": "Admin Notes"
			}, {
				"elementType": "field",
				"controlType": "textarea",
				"fieldName": "Historical Admin Notes",
				"labelContent": "Historical Admin Notes",
				"disabledForNonAdmin": ["", "Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Approved", 'Loaned', "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1,













			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "loan",
				"hideForNonAdmin": ["", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approved", "Disapproved", "Cancelled"],
				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"content": 'Loan',
				"begin": 1,
				"end": 1
			}, {
				"elementType": "markup",
				"tag": "h4",
				"content": 'Items',
				"begin": 1,
				"end": 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'loan-item-specification-sets',
				'htmlClass': 'repeating-content-container',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'loan-item-specification-set',
				'htmlClass': 'subsection repeat-container',
				'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Loan Item Quantity',
				'labelContent': 'Quantity',
				"disabledForNonAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Loan Item Asset ID',
				'labelContent': 'Asset ID',
				"disabledForNonAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Loan Item Description',
				'labelContent': 'Description',
				"disabledForNonAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlClass': 'remove-section-anchor',
				'content': 'Remove this Item',
				'removeThisRepeat': 1,
				'hideForNonAdmin': ['Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Loaned', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-loan-item-specification-set',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Insert an Item',
				'repeatSectionID': 'loan-item-specification-set',
				'hideForNonAdmin': ['Loaned', 'Completed', 'Disapproved', 'Cancelled'],
				'hideForAdmin': ['Loaned', 'Completed', 'Disapproved', 'Cancelled'],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,















			}, {
				"elementType": "markup",
				"tag": "h4",
				"content": 'Date & People',
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "datePicker",
				"fieldName": "Loan Date",
				"labelContent": "Loan Date",
				"listFieldName": "LoanBeginningDateActual",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"disabledForNonAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Loaned To",
				"labelContent": "Loaned To",
				"listFieldName": "LoanedTo",
				"disabledForNonAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Loaned By",
				"labelContent": "Loaned By",
				"listFieldName": "LoanedBy",
				"disabledForNonAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Loaned", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1











			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "return",
				"hideForNonAdmin": ["", "Pending Approval", "Approved", "Loaned", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approved", "Loaned", "Disapproved", "Cancelled"],
				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h3",
				"content": 'Return',
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "datePicker",
				"fieldName": "Return Date",
				"labelContent": "Return Date",
				"listFieldName": "LoanEndDateActual",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"disabledForNonAdmin": ["Completed"],
				"disabledForAdmin": ["Completed"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Returned To",
				"labelContent": "Returned To",
				"listFieldName": "ReturnedTo",
				"disabledForNonAdmin": ["Completed"],
				"disabledForAdmin": ["Completed"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Returned By",
				"labelContent": "Returned By",
				"listFieldName": "ReturnedBy",
				"disabledForNonAdmin": ["Completed"],
				"disabledForAdmin": ["Completed"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1,
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = 'if ($("input#special-software-needed-boolean_yes").is(":checked")) { \n' +
		'   $("div#label-and-control_Special-Software-Needs").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += 'if ($("input#computers-boolean_yes").is(":checked")) { \n' +
		'   $("div#label-and-control_Computers-Quantity").show("fast").removeClass("hidden"); \n' +
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
