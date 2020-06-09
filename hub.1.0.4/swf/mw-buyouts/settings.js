
(function ($) {

	var mData = {
		'componentID': 170,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 1,
		'notifications': 0,
	};

	console.log("using settings m3");

	var oData = {
		'mwBuyoutList': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Buyout",
					"href": "/sites/mw-buyouts/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Buyout Calendar",
					"href": "/sites/mw-buyouts/SitePages/App.aspx?f=cal",
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Hub Buyout ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Buyout Order Number',
						'internalName': 'BuyoutOrderNumber',
					}, {
						'displayName': 'Contact',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': 'Location',
						'internalName': 'BuyoutLocation',
					}, {
						'displayName': 'Date',
						'internalName': 'BuyoutDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 }
					}, {
						'displayName': 'Start Time',
						'internalName': 'BuyoutStartTime',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'h:mm a', 'determineYearDisplayDynamically': 0 }
					}
				],
				'tables': [
					{
						'tableTitle': '',
						'tableID': 'list-view',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Submitted',
						'sortColAndOrder': [0, 'desc'],
					}
				]
			}
		},
		'mwBuyoutCalendar': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Buyout",
					"href": "/sites/mw-buyouts/SitePages/App.aspx?r=0",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Buyout List",
					"href": "/sites/mw-buyouts/SitePages/App.aspx",
					"target": null
				}
			],
		}
	};


	var fData = {
		'additionalViewPermissionsFunction': 'ReturnOne',
		'autoTrackSubmissionAndCancellation': 1,
		'standardElementGroups': {
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Migrated From Quark",
			}, {
				"elementType": "field",
				"controlType": "hidden",
				"fieldName": "Legacy ID",
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "print-to-screen",
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
				"elementType": "markup",
				"tag": "h2",
				"content": "This Buyout on The Hub",
				"htmlID": "header_this-request",
				"begin": 1,
				"end": 1
				// }, {
				// 	'elementType': 'field',
				// 	'controlType': 'url',
				// 	'fieldName': 'Quark Request',
				// 	'labelContent': 'Quark Request',
				// 	'editableForNonAdmin': [],
				// 	'editableForAdmin': [],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request ID",
				"labelContent": "Hub Buyout ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Buyout Created on The Hub",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "This buyout was migrated from Quark, where creation dates were not recorded.",
						"htmlID": "request-date_help-note",
						"urgent": 0,
					}
				],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Nickname",
				"labelContent": "Buyout Title",
				"listFieldName": "Title",
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Self or Other",
				"labelContent": "If someone has questions, talk to you or someone else?",
				"setOptions": [
					{ "value": "Self", "display": "Talk to me" },
					{ "value": "Other", "display": "Talk to someone else" }
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"hideForNonAdmin": ["Submitted", "Cancelled"],
				"hideForAdmin": ["Submitted", "Cancelled"],
				"disabledForNonAdmin": ["Submitted", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Cancelled"],
				"onChange": [
					{ "thisFieldEquals": ["Self"], "hide": [{ "fieldName": "Requested For" }], "optional": [{ "fieldName": "Requested For", "type": "peoplepicker" }], "set": [{ "fieldName": "Requested For", "type": "peoplePicker", "value": "currentUser" }] },
					{ "thisFieldEquals": ["Other"], "show": [{ "fieldName": "Requested For" }], "require": [{ "fieldName": "Requested For", "type": "peoplepicker" }], "set": [{ "fieldName": "Requested For", "type": "peoplePicker", "value": "" }] }
				]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested For",
				"labelContent": "Contact",
				"listFieldName": "RequestedFor",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Legacy Contact",
				"labelContent": "Contact",
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "This buyout was migrated from Quark, and the contact person is not editable. To change the contact, delete this buyout from The Hub and create a new one.",
						"htmlID": "legacy-contact_help-note",
						"urgent": 0,
					}
				],
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Delete?",
				"choices": [
					{
						"value": "cancel",
						"display": "Yes, I wish to delete this buyout from The Hub"
					}
				],
				"hideForNonAdmin": ["", "Validator Picked Up", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
				"helpNotes": [
					{
						"text": "Affects only The Hub",
						"htmlID": "requester-cancellation_help-note",
						"urgent": 0,
					}
				],


				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Buyout Creator",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1













			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Buyout Details",
				"htmlID": "header_buyout-details",
				"begin": 1,
				"end": 1
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Order Number',
				'labelContent': 'Tessitura Order Number',
				"listFieldName": "BuyoutOrderNumber",
				// "requiredForNonAdmin": ["", "Submitted"],
				// "requiredForAdmin": ["", "Submitted"],
				'helpNotes': [
					{
						'text': "Formerly, LSI TRX#",
						'htmlID': "help-note_buyout-order-number",
						'hideForNonAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						'hideForAdmin': ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Buyout Product Title',
				'labelContent': 'Product Title',
				"listFieldName": "BuyoutProductTitle",
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Buyout Location',
				"listFieldName": "BuyoutLocation",
				'labelContent': 'Location',
				"setOptions": [
					{
						"value": "Omni Theater",
						"display": "Omni Theater"
					}, {
						"value": "Planetarium",
						"display": "Planetarium"
					}, {
						"value": "Skyline Room",
						"display": "Skyline Room"
					}, {
						"value": "Nichols Gallery",
						"display": "Nichols Gallery"
					}, {
						"value": "4-D Cinema",
						"display": "4-D Cinema"
					}, {
						"value": "Butterfly Garden",
						"display": "Butterfly Garden"
					}, {
						"value": "Stearns Gallery",
						"display": "Stearns Gallery"
					}
				],
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],















			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Buyout Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions',
				},




			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Buyout Date',
				"listFieldName": "BuyoutDate",
				'labelContent': 'Date',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				'elementType': 'field',
				'controlType': 'time',
				'fieldName': 'Start Time',
				'labelContent': 'Start Time',
				"listFieldName": "BuyoutStartTime",
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				'elementType': 'field',
				'controlType': 'time',
				'fieldName': 'End Time',
				'labelContent': 'End Time',
				"requiredForNonAdmin": ["", "Submitted"],
				"requiredForAdmin": ["", "Submitted"],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"],
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (fData.CustomScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = 'if ($("input#Legacy-Contact").val() != "") { \n' +
		'   $("div#label-and-control_Requested-For").hide("fast").addClass("hidden"); \n' +
		'   $("div#label-and-control_Legacy-Contact").show("fast").removeClass("hidden"); \n' +
		'} \n';

	/* fData.CustomScriptLast += 'if ($("input#Legacy-Event-Creation-Date").val() != "") { \n' +
		'   $("div#label-and-control_Request-Date").hide("fast").addClass("hidden"); \n' +
		'   $("div#label-and-control_Legacy-Event-Creation-Date").show("fast").removeClass("hidden"); \n' +
		'} \n'; */


	// =============================

	/* // selects
	fData.CustomScriptLast += '$("select#Self-or-Other option[value=\'Self\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#hours-input_Start-Time option[value=\'T09\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_Start-Time option[value=\':00:00\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#hours-input_End-Time option[value=\'T17\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#minutes-input_End-Time option[value=\':00:00\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#Buyout-Department option[value=\'Accessibility\']").attr("selected","selected"); \n';
	fData.CustomScriptLast += '$("select#Buyout-Location option[value=\'Omni Theater\']").attr("selected","selected"); \n';

	// hidden
	fData.CustomScriptLast += '$("input#time-storage_Start-Time").val("2000-01-01T09:00:00Z"); \n';
	fData.CustomScriptLast += '$("input#time-storage_End-Time").val("2000-01-01T17:00:00Z"); \n';

	// texts
	fData.CustomScriptLast += '$("input#Buyout-Order-Number").val("123456");';
	fData.CustomScriptLast += '$("input#Request-Nickname").val("Buyout Title");';
	fData.CustomScriptLast += '$("input#Buyout-Product-Title").val("Product Title");';
	fData.CustomScriptLast += '$("input#Buyout-Date").val("November 8, 2018");';

	// people picker
	fData.CustomScriptLast += 
		"	$().PutAddtlPeopleInPicker('Requested For', [{ \n" +
		"	'name': 'James Baker'," +
		"	'email': 'jbaker@mos.org'," +
		"	'account': 'i:0#.f|membership|jbaker@mos.org'" +
		"}]);"; */





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
