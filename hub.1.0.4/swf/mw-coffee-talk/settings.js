
(function ($) {

	var mData = {
		'componentID': 74,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'devAdminNotifications': 0,
		'notifications': 0,
	};

	console.log("using settings m1");








	var dev = '';










	var oData = {
		'my': {
			'buttons': [
				{
					"linkType": "goForward",
					"anchorText": "Calendar",
					"href": "/sites/" + dev + "mw-coffee-talk/SitePages/App.aspx?f=cal",
					"target": null
				}
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
						'displayName': "Title",
						'internalName': "TalkTitle",
					}, {
						'displayName': 'Speaker(s)',
						'internalName': 'Speakers',
						'userName': 1
					}, {
						'displayName': "Date & Time",
						'internalName': "Datetime",
						'friendlyFormatOnLoad': {
							'incomingFormat': null,
							'returnFormat': 'dddd, MMM D, YYYY, hA',
							'determineYearDisplayDynamically': 1
						}
					}, {
						'displayName': "Space",
						'internalName': "Space",
					}
				],
				'tables': [
					{
						'tableTitle': 'Pending Approval',
						'tableID': 'pending-approval',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Pending Approval',
					}, {
						'tableTitle': 'Approved',
						'tableID': 'approved',
						'someColsAreUsers': 1,
						'myRSQueryRelevantStatus': 'Approved',
					}, {
						'tableTitle': 'Cancelled & Disapproved',
						'tableID': 'cancelled-sisapproved',
						'someColsAreUsers': 1,
						'myRSQueryTwoRelevantStatuses': ['Disapproved', 'Cancelled'],
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackPendingAndApproval': 1,
		'standardElementGroups': {
			'standardThisRequestAndRequesterElements': 1,
			'standardAdminElements': {
				'changeRequestStatus': [
					{ "value": "Approve", "display": "This request is approved" },
					{ "value": "Disapprove", "display": "This request is disapproved" },
					{ "value": "Cancel", "display": "This request has been cancelled" },
				]
			},
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'superSimpleChangeNotifications': {
			'beginningOfLife': { 'admin': 1, 'requester': 1 },
			'approved': { 'admin': 1, 'requester': 1 },
			'endOfLife': { 'admin': ['Cancelled'], 'requester': 1 }
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': "markup",
				'tag': "h2",
				'content': "Talk Details",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Talk Title",
				'listFieldName': 'TalkTitle',
				'labelContent': "Title",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"disabledForNonAdmin": ["Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Speakers",
				"labelContent": "Speaker(s)",
				'listFieldName': 'Speakers',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Disapproved", "Cancelled"],
				'helpNotes': [{
					'text': 'Include yourself, if you\'re a speaker.',
					'htmlID': "talk-speakers",
					'hideForNonAdmin': ["Approved", "Disapproved", "Cancelled"],
					'hideForAdmin': ["Approved", "Disapproved", "Cancelled"]
				}],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Description',
				'labelContent': 'Description',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'datetime',
				'fieldName': 'Datetime',
				'listFieldName': 'Datetime',
				'labelContent': 'Date and Time',
				'requiredForNonAdmin': [''],
				'requiredForAdmin': [''],
				"disabledForNonAdmin": ["Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Disapproved", "Cancelled"],
				'helpNotes': [{
					'text': 'Talks occur every other Wednesday at 9 am and alternate Wednesdays at 3:30 pm. Please make sure you\'re requesting an open spot.',
					'htmlID': "talk-datetime",
					'hideForNonAdmin': ["Approved", "Disapproved", "Cancelled"],
					'hideForAdmin': ["Approved", "Disapproved", "Cancelled"]
				}],



			}, {
				'elementType': "markup",
				'tag': "div",
				'begin': 1,
				'htmlID': "space-admin",
				'hideForNonAdmin': ["Approved", "Cancelled", "Disapproved"],
				'hideForAdmin': ["Approved", "Cancelled", "Disapproved"],
			}, {
				'elementType': "field",
				'controlType': "check",
				'fieldName': "Alternate Space Requester Boolean",
				'choiceSetLabel': "Do you need an alternate space?",
				'choices': [{
					'value': "yes",
					'display': "Yes, I need an alternate space"
				}],
				'disabledForNonAdmin': ["Approved", "Cancelled", "Disapproved"],
				'disabledForAdmin': ["Approved", "Cancelled", "Disapproved"],
				'helpNotes': [{
					'text': 'Coffee Talk is on the Science Live Stage (9 am talks) or in Hornblower (3:30 pm talks). Alternate spaces are not guaranteed.',
					'htmlID': "talk-alternate-space-boolean",
					'hideForNonAdmin': ["Pending Approval", "Approved", "Disapproved", "Cancelled"],
					'hideForAdmin': ["Approved", "Disapproved", "Cancelled"]
				}],
				'onChange': [{
						'thisFieldIsChecked': 1,
						'show': [
							{ 'fieldName': 'Alternate Space Requested' },
							{ 'fieldName': 'Alternate Space Request Explanation' }
						],
						'require': [
							{
								'fieldName': "Alternate Space Requested",
								'type': "text"
							}, {
								'fieldName': "Alternate Space Request Explanation",
								'type': "textarea"
							}
						]
					}, {
						'thisFieldIsChecked': 0,
						'hide': [{
								'fieldName': 'Alternate Space Requested'
							},
							{
								'fieldName': 'Alternate Space Request Explanation'
							}
						],
						'optional': [{
							'fieldName': "Alternate Space Requested",
							'type': "text"
						}, {
							'fieldName': "Alternate Space Request Explanation",
							'type': "textarea"
						}]
					},
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Alternate Space Requested',
				'labelContent': 'Which alternate space?',
				"disabledForNonAdmin": ["Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Disapproved", "Cancelled"],
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'helpNotes': [{
					'text': 'Alternate spaces are not guaranteed, but the Coffee Talk team will attempt arrangements on your behalf.',
					'htmlID': "talk-alternate-space-requeted",
					'hideForNonAdmin': ["Pending Approval", "Approved", "Disapproved", "Cancelled"],
					'hideForAdmin': ["Approved", "Disapproved", "Cancelled"]
				}],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Alternate Space Request Explanation',
				'labelContent': 'Why are you requesting an alternate space?',
				"disabledForNonAdmin": ["Approved", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Disapproved", "Cancelled"],
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,


			}, {
				'elementType': "markup",
				'tag': "div",
				'begin': 1,
				'htmlID': "space-admin",
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'hideForAdmin': ["", ],
			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': "Space Assignment",
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "radio",
				'fieldName': "Standard or Alternate Space Admin",
				'choiceSetLabel': "Standard Space or Alternate",
				'choices': [{
					'value': "Science Live Stage",
					'display': "Science Live Stage &mdash; 9 am talks"
				}, {
					'value': "Hornblower",
					'display': "Hornblower &mdash; 3:30 pm talks"
				}, {
					'value': "Alternate",
					'display': "Alternate"
				}],
				'disabledForNonAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'disabledForAdmin': ["Disapproved", "Cancelled"],
				'onChange': [{
					"anyOfSpecificCheckboxesAreChecked": ["#standard-or-alternate-space-admin_alternate"],
					'show': [{
						'fieldName': 'Alternate Space Selection'
					}],
					'require': [{
						'fieldName': "Alternate Space Selection",
						'type': "text"
					}]
				}, {
					"noneOfSpecificCheckboxesAreChecked": ["#standard-or-alternate-space-admin_alternate"],
					'hide': [{
							'fieldName': 'Alternate Space Selection'
					}],
					'optional': [{
						'fieldName': "Alternate Space Selection",
						'type': "text"
					}]
				}, ],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Alternate Space Selection',
				'labelContent': 'Which alternate space?',
				'disabledForNonAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'disabledForAdmin': ["Disapproved", "Cancelled"],
				'hideForNonAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
			}, {
				'elementType': "markup",
				'tag': "div",
				'end': 1,

			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Space Assignment',
				'listFieldName': 'Space',
				'labelContent': 'Space',
				'disabledForNonAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'disabledForAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
				'hideForNonAdmin': ["", "Pending Approval", ],
				'hideForAdmin': ["", "Pending Approval", "Approved", "Cancelled", "Disapproved"],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';


	fData.CustomScriptLast = 'if ($("input#alternate-space-requester-boolean_yes").is(":checked")) { \n' +
		'   $("div#label-and-control_Alternate-Space-Requested, div#label-and-control_Alternate-Space-Request-Explanation").show("fast").removeClass("hidden"); \n' +
		'} \n';

	fData.CustomScriptLast += '$("div#container_about-the-requester").hide("fast").addClass("hidden"); \n';

	fData.CustomScriptLast += '$().ProcessCoffeeTalkSpaceFieldsViewAccessOnLoad(); \n';

	fData.CustomScriptLast += '$("input#standard-or-alternate-space-admin_science-live-stage, input#standard-or-alternate-space-admin_hornblower, input#standard-or-alternate-space-admin_alternate, input#Alternate-Space-Selection").on("change", function() { \n' +
		'	$().ProcessCoffeeTalkSpaceFieldsPopulation(); \n' +
		'}); \n';


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
