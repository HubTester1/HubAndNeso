
(function ($) {

	var mData = {
		'componentID': 124,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m47");



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
						'displayName': 'Requester Name',
						'internalName': 'RequesterName',
					}, {
						'displayName': 'Requester Phone',
						'internalName': 'RequesterPhone',
					}, {
						'displayName': 'Requester Department',
						'internalName': 'RequesterDepartment',
					}, {
						'displayName': 'Vehicle Make',
						'internalName': 'VehicleMake',
					}, {
						'displayName': 'Vehicle Model',
						'internalName': 'VehicleModel',
					}, {
						'displayName': 'License Plate State',
						'internalName': 'LicensePlateState',
					}, {
						'displayName': 'License Plate Number',
						'internalName': 'LicensePlateNumber',
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
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Approved'
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
						'myRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Approved'
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackPendingAndApprovalAndNoLongerNeeded': 1,
		'standardElementGroups': {
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'superSimpleChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 0, 'requester': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': ['Cancelled', 'Disapproved'] }
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
				"labelContent": "Request ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Request Date",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Nickname",
				"labelContent": "Request Nickname",
				"listFieldName": "Title",
				"helpNotes": [
					{
						"text": "Give this request a name you can reference later",
						"htmlID": "request-nickname_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [
					{
						"value": "cancel",
						"display": "Yes, I wish to cancel this request"
					}
				],
				"hideForNonAdmin": ["", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"begin": 1,
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Requester",
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"listFieldName": "RequesterName",
				"disabledForNonAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Employee ID",
				"labelContent": "Employee ID",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"listFieldName": "RequesterDepartment",
				"disabledForNonAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"listFieldName": "RequesterPhone",
				"disabledForNonAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Vehicle Info',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Vehicle Make",
				"labelContent": "Make",
				"listFieldName": "VehicleMake",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Vehicle Model",
				"labelContent": "Model",
				"listFieldName": "VehicleModel",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "License Plate Number",
				"labelContent": "License Plate Number",
				"listFieldName": "LicensePlateNumber",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "License Plate State",
				"labelContent": "License Plate State",
				"listFieldName": "LicensePlateState",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]

			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "admin",
				"content": '',
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": [""]
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
				"hideForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
				"hideForNonAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Change Request Status",
				"labelContent": "Change Request Status",
				"setOptions": [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Cancel", "display": "This request has been cancelled" },
					{ "value": "No Longer Needed", "display": "This request is no longer needed" }
				],
				"hideForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
				"disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1
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
