
(function ($) {

	var mData = {
		'componentID': 101,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		// 'currentRequestVersion': 1,
		'devAdminNotifications': 0,
		'notifications': 1,
	};

	console.log("using settings m1");



	var oData = {
		'adminReferrals': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Referral",
					"href": "/sites/hr-referral/SitePages/App.aspx?r=0",
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Referral ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Referred By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': "Candidate Name",
						'internalName': "CandidateName",
					}, {
						'displayName': 'Referral Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableID': 'all-requests',
						'someColsAreUsers': 1,
						'basicAllQueryRelevantValue': 1
					}
				]
			}
		},
		'myReferrals': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Referral",
					"href": "/sites/hr-referral/SitePages/App.aspx?r=0",
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Referral ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Referred By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': "Candidate Name",
						'internalName': "CandidateName",
					}, {
						'displayName': 'Referral Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableID': 'all-requests',
						'someColsAreUsers': 1,
						'basicMyAllQueryRelevantValue': 1
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackSubmissionAndCancellation': 1,
		'alwaysTalkToRequester': 1,
		'standardElementGroups': {
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'referralNotifications': 1,
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
				"content": "This Referral",
				"htmlID": "header_this-referral",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlClass": "label-and-control",
				"htmlID": "requirement-legend",
				"content": '	<div class="label"></div>' +
					'	<div class="field-type-indication"><span class="field-type-indicator field-required"><span class="message message-required"></span></span></div>' +
					'	<div class="control">= required field</div>',
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request ID",
				"labelContent": "Referral ID",
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Referral Date",
				"listFieldName": "RequestDate",
				"friendlyFormatOnLoad": {
					'incomingFormat': null,
					'returnFormat': 'MMMM D, YYYY',
					'determineYearDisplayDynamically': 1
				},
				"isoFormatOnSubmit": {
					'incomingFormat': null,
					'returnFormat': null,
					'determineYearDisplayDynamically': null
				},
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Nickname",
				"labelContent": "Referral Nickname",
				"listFieldName": "Title",
				"helpNotes": [{
					"text": "Give this referral a name you can reference later",
					"htmlID": "referral-nickname_help-note",
					"urgent": 0,
					"hideForNonAdmin": ['Submitted', 'Cancelled'],
					"hideForAdmin": ['Submitted', 'Cancelled']
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"hideForAdmin": ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Self or Other",
				"labelContent": "If we have questions, talk to you or someone else?",
				"setOptions": [{
					"value": "Self",
					"display": "Talk to me"
				}, {
					"value": "Other",
					"display": "Talk to someone else"
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"hideForNonAdmin": ['Submitted', 'Cancelled'],
				"hideForAdmin": ['Submitted', 'Cancelled'],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"onChange": [{
					"thisFieldEquals": ["Self"],
					"hide": [{
						"fieldName": "Requested For"
					}],
					"optional": [{
						"fieldName": "Requested For",
						"type": "peoplepicker"
					}],
					"set": [{
						"fieldName": "Requested For",
						"type": "peoplePicker",
						"value": "currentUser"
					}]
				}, {
					"thisFieldEquals": ["Other"],
					"show": [{
						"fieldName": "Requested For"
					}],
					"require": [{
						"fieldName": "Requested For",
						"type": "peoplepicker"
					}],
					"set": [{
						"fieldName": "Requested For",
						"type": "peoplePicker",
						"value": ""
					}]
				}]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested For",
				"labelContent": "If needed, talk to",
				"listFieldName": "RequestedFor",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": [""],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this referral"
				}],
				"hideForNonAdmin": [''],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"]
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About Your Position",
				"begin": 1,
				"end": 1,
				"hideForNonAdmin": [],
				"hideForAdmin": ['Submitted', 'Cancelled'],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Referrer",
				"begin": 1,
				"end": 1,
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Requester Position Type",
				"labelContent": "Position Type",
				"setOptions": [{
					"value": "Staff",
					"display": "Staff"
				}, {
					"value": "Paid Intern",
					"display": "Paid Intern"
				}, {
					"value": "Unpaid Intern",
					"display": "Unpaid Intern"
				}, {
					"value": "Volunteer",
					"display": "Volunteer"
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"yieldsViewPermissions": 1,
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled']




















			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': "About the Referred Candidate",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Candidate Name",
				'listFieldName': "CandidateName",
				'labelContent': "Name",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Candidate Position Type",
				"labelContent": "Position Type",
				"setOptions": [{
					"value": "Staff",
					"display": "Staff"
				}, {
					"value": "Paid Intern",
					"display": "Paid Intern"
				}, {
					"value": "Unpaid Intern",
					"display": "Unpaid Intern"
				}, {
					"value": "Volunteer",
					"display": "Volunteer"
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],



				"onChange": [{




					"thisFieldEquals": ["Staff", "Paid Intern", "Unpaid Intern"],
					"show": [{
						"fieldName": "Position Name"
					}],
					"require": [{
						"fieldName": "Position Name",
						"type": "text"
					}],
					"hide": [{
						"fieldName": "Department"
					}],
					"optional": [{
						"fieldName": "Department",
						"type": "select"
					}],
				}, {



					"thisFieldEquals": ["Volunteer"],
					"hide": [{
						"fieldName": "Position Name"
					}],
					"optional": [{
						"fieldName": "Position Name",
						"type": "text"
					}],
					"show": [{
						"fieldName": "Candidate Department"
					}],
					"require": [{
						"fieldName": "Candidate Department",
						"type": "select"
					}],
				}],





			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Position Name",
				'labelContent': "Position Name",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "field",
				"controlType": "select",
				"fieldName": "Candidate Department",
				"labelContent": "Department",
				'loadOptions': {
					'function': 'LoadDepartmentSelectOptions'
				},
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled']





			}, {
				'elementType': "field",
				'controlType': "phone",
				'fieldName': "Candidate Phone",
				'labelContent': "Phone",
				'addtlValidationType': 'validPhone',
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
				"helpNotes": [
					{
						"text": "E.g., 617-723-2500",
						"htmlID": "candidate-phone-number_help-note",
						"urgent": 0,
						"hideForNonAdmin": ['Submitted', 'Cancelled'],
						"hideForAdmin": ['Submitted', 'Cancelled']
					}
				]
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Candidate Email",
				'labelContent': "Email",
				'addtlValidationType': 'validEmail',
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Reference",
				'labelContent': "Reference",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ['Submitted', 'Cancelled'],
				"disabledForAdmin": ['Submitted', 'Cancelled'],

			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "admin",
				"content": '',
				"begin": 1,
				"hideForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"hideForAdmin": ['', 'Submitted', 'Cancelled']
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": 'Request Status',
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Status",
				"listFieldName": "RequestStatus",
				"labelContent": "Request Status",
				"disabledForNonAdmin": ['', 'Submitted', 'Cancelled'],
				"disabledForAdmin": ['', 'Submitted', 'Cancelled']
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
	fData.CustomScriptLast = '$("div#label-and-control_Requested-For").addClass("hidden");';

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