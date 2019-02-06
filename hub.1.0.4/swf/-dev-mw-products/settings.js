
(function ($) {

	var mData = {
		'componentID': 10172,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		'devAdminNotifications': 1,
		'notifications': 0,
		'detailTitle': 'Museum Product',
	};

	console.log("using settings m1");



	var oData = {
		'mwProductsList': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Product",
					"target": null
				}, {
					"linkType": "goForward",
					"anchorText": "Product Timeline",
					"href": "/SitePages/App.aspx?f=tl",
					"hrefWithLocalSiteToken": 1,
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Product Title',
						'internalName': 'Title',
					}, {
						'displayName': 'Category',
						'internalName': 'ProductCategory',
					}, {
						'displayName': 'Start',
						'internalName': 'ProductStartDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}, {
						'displayName': 'End',
						'internalName': 'ProductEndDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableID': 'list-view',
						'someColsAreUsers': 1,
						'basicRSQueryRelevantStatus': 'Submitted',
						'sortColAndOrder': [0, 'desc'],
					}
				]
			}
		},
	};



	var fData = {
		'autoTrackSubmissionAndCancellation': 1,
		'standardElementGroups': {
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
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
				"labelContent": "Timeline Item ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Product Created",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Legacy Product Creation Date",
				"labelContent": "Product Created",
				"friendlyFormatOnLoad": { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 },
				"isoFormatOnSubmit": { 'incomingFormat': null, 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"hideForNonAdmin": ["", "Submitted", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Cancelled"],
				"helpNotes": [
					{
						"text": "This product was migrated from Quark, and this date is approximate.",
						"htmlID": "legacy-product-creation-date_help-note",
						"urgent": 0,
					}
				],
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
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Remove",
				"choices": [
					{
						"value": "cancel",
						"display": "Yes, I wish to remove this event from the timeline"
					}
				],
				"hideForNonAdmin": ["", "Cancelled"],
				"hideForAdmin": ["", "Cancelled"],
				"disabledForNonAdmin": ["", "Cancelled"],
				"disabledForAdmin": ["", "Cancelled"],



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
				"content": "About the Product Creator",
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
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Product Title',
				'labelContent': 'Title',
				"listFieldName": "Title",
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Product Category',
				"listFieldName": "ProductCategory",
				'labelContent': 'Category',
				'loadOptions': {
					'listName': 'MuseumProductCategories',
					'displayField': 'Title',
					'valueField': 'Value',
					'orderField': 'Order'
				},
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Product Start Date',
				'labelContent': 'Start Date',
				'listFieldName': 'ProductStartDate',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'datePicker',
				'fieldName': 'Product End Date',
				'labelContent': 'End Date',
				'listFieldName': 'ProductEndDate',
				'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 0 },
				'isoFormatOnSubmit': { 'incomingFormat': 'MMMM D, YYYY', 'returnFormat': null, 'determineYearDisplayDynamically': null },
				'helpNotes': [
					{
						'text': 'If permanent, leave blank',
						'htmlID': 'end-date_help-note',
					}
				]
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Product Description',
				'labelContent': 'Description',
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
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = 'if ($("input#Legacy-Product-Creation-Date").val() != "") { \n' +
		'   $("div#label-and-control_Request-Date").hide("fast").addClass("hidden"); \n' +
		'   $("div#label-and-control_Legacy-Product-Creation-Date").show("fast").removeClass("hidden"); \n' +
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
