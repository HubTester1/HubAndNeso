
(function ($) {

	var mData = {
		'componentID': 129,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m1");



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
						'displayName': "Make",
						'internalName': "BikeMake",
					}, {
						'displayName': "Model",
						'internalName': "BikeModel",
					}, {
						'displayName': 'Color',
						'internalName': 'BikeColor',
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
						'tableTitle': 'Cancelled and Disapproved',
						'tableID': 'cancelled-and-disapproved',
						'someColsAreUsers': 1,
						'basicRSQueryTwoRelevantStatuses': ['Cancelled', 'Disapproved']
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
						'displayName': "Make",
						'internalName': "BikeMake",
					}, {
						'displayName': "Model",
						'internalName': "BikeModel",
					}, {
						'displayName': 'Color',
						'internalName': 'BikeColor',
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
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Cancel", "display": "This request has been cancelled" },
					{ "value": "No Longer Needed", "display": "This request is no longer needed" }
				]
			},
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
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Bike Info',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Bike Make",
				"labelContent": "Bike Make",
				"listFieldName": "BikeMake",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Bike Model",
				"labelContent": "Bike Model",
				"listFieldName": "BikeModel",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Bike Color",
				"labelContent": "Bike Color",
				"listFieldName": "BikeColor",
				"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""]
			}, {
				'elementType': 'field',
				'controlType': 'check',
				'fieldName': 'Agreement',
				'choiceSetLabel': 'Agreement',
				'choices': [
					{
						'value': 'agreed',
						'display': 'I have read and understood the Museum\'s \x3ca href=\x22https://bmos.sharepoint.com/PublicSafetyDocs/Bike Cage Guidelines.docx\x22 target=\x22_blank\x22\x3eBike Cage Guidelines\x3c/a\x3e and agree to abide by them.'
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


	fData.CustomScriptLast = '';




	// fData.CustomScriptLast += '$("input#Request-Nickname").val("Created by Public Safety"); \n';
	// fData.CustomScriptLast += '$("select#Self-or-Other option[value=\'Self\']").attr("selected","selected"); \n';
	// fData.CustomScriptLast += '$("div#label-and-control_Request-Nickname, div#label-and-control_Agreement").hide("fast").addClass("hidden"); \n';
	// fData.CustomScriptLast += '$("div#label-and-control_Self-or-Other").hide("fast").addClass("hidden"); \n';
	// fData.CustomScriptLast += '$("div#label-and-control_Requested-For").show("fast").removeClass("hidden"); \n';
	// fData.CustomScriptLast += '$("label[for=\'Requested-For_TopSpan_EditorInput\']").text("Biker"); \n';
	// fData.CustomScriptLast += '$().SetFieldToRequired("Requested-For"); \n';
	// fData.CustomScriptLast += '$("input#agreement_agreed").prop("checked", true).attr("checked", true); \n';





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
