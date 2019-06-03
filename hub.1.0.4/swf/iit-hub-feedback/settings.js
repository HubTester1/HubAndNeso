
(function ($) {

	var mData = {
		'componentID': 174,
		'swf': 1,
		'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		// 'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		'currentRequestVersion': 2,
		'devAdminNotifications': 1,
		'notifications': 0,
		'detailTitle': 'Hub Feedback Submission'
	};

	console.log("using settings m3");


	var oData = {
		'adminHubFeedback': {
			'buttons': [
				{
				    "linkType": "newItem",
				    "anchorText": "New Submission",
					"href": "/sites/iit-hub-feedback/SitePages/App.aspx?r=0",
				    "target": null
				}, {
				    "linkType": "goForward",
				    "anchorText": "Analytics",
					"href": "/sites/iit-hub-feedback/SitePages/App.aspx?f=an",
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Sumbission ID',
						'internalName': 'ID',
						'formLink': 1
					// }, {
					// 	'displayName': 'Talk To',
					// 	'internalName': 'RequestedFor',
					// 	'userName': 1
					}, {
						'displayName': 'Sumbission Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableID': 'all',
						'someColsAreUsers': 1,
					}
				]
			}
		},

		'myHubFeedback': {
			'buttons': [
				{
					"linkType": "newItem",
					"anchorText": "New Submission",
					"href": "/sites/iit-hub-feedback/SitePages/App.aspx?r=0",
					"target": null
				}
			],
			'sections': {
				'commonColumns': [
					{
						'displayName': 'Sumbission ID',
						'internalName': 'ID',
						'formLink': 1
					}, {
						'displayName': 'Sumbission Date',
						'internalName': 'RequestDate',
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
					}
				],
				'tables': [
					{
						'tableID': 'my',
						'someColsAreUsers': 1,
						'basicMyEOLQueryRelevantValue': 0
					}
				]
			}
		}
	};



	var fData = {
		'autoTrackSubmissionAndCancellation': 1,
		'standardElementGroups': {
			'standardAdminElements': 1,
			'standardButtonElements': 1,
			'standardComponentGrpAdminOnlyElements': 1
		},
		'alwaysTalkToRequester': 1,
		'versioningMatters': 0,






		'uniqueElements': [
			{
				"elementType": "markup",
				"tag": "h2",
				"content": "This Sumbission",
				"htmlID": "header_this-request",
				"begin": 1,
				"end": 1,
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request ID",
				"labelContent": "Sumbission ID",
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Date",
				"labelContent": "Sumbission Date",
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
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Request Nickname",
				"labelContent": "Request Nickname",
				"listFieldName": "Title",
				"helpNotes": [{
					"text": "Give this schedule a name you can reference later",
					"htmlID": "request-nickname_help-note",
					"urgent": 0,
					"hideForNonAdmin": ["Submitted", "Completed", "Cancelled"],
					"hideForAdmin": ["Submitted", "Completed", "Cancelled"]
				}],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Cancelled"],
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
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
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Cancelled"],
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
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": [""],
				"disabledForNonAdmin": ["Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "check",
				"fieldName": "Requester Cancellation",
				"choiceSetLabel": "Cancellation",
				"choices": [{
					"value": "cancel",
					"display": "Yes, I wish to cancel this schedule"
				}],
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["Cancelled"],
				"disabledForAdmin": ["Cancelled"]
				// about the requester
			}, {
				"elementType": "markup",
				"tag": "div",
				"htmlID": "container_about-the-requester",
				"begin": 1,
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Requester",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Account",
				"labelContent": "Account",
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "peoplePicker",
				"fieldName": "Requested By",
				"labelContent": "Requested By",
				"listFieldName": "RequestedBy",
				"hideForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"hideForAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForNonAdmin": ["", "Submitted", "Completed", "Cancelled"],
				"disabledForAdmin": ["", "Submitted", "Completed", "Cancelled"]
			}, {
				"elementType": "markup",
				"tag": "div",
				"end": 1




















			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "Which of these is important for The Hub's future development?",
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
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'container_predefined',
				'begin': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'radio-button-set-fake-labels',
				'content':
					'<div class="radio-button-set-fake-label" id="fake-label_not-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_slightly-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_moderately-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_very-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_extremely-important"></div>',
				'begin': 1,
				'end': 1
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Faster",
				"choiceSetLabel": "Make everything faster",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Mobile-friendly",
				"choiceSetLabel": "Make everything mobile-friendly",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "More Museum Info",
				"choiceSetLabel": "Provide more information about the Museum's divisions, departments, and other teams",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "More Collaboration",
				"choiceSetLabel": "Provide more team spaces where we can privately work on files and have private conversations",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "IIT Help and Learning",
				"choiceSetLabel": "Provide IIT help information and learning resources",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Professional Development",
				"choiceSetLabel": "Provide other professional development resources",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Unified Search",
				"choiceSetLabel": "Provide one place where I can browse and search all of the information that is spread across The Hub",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Data Intregration",
				"choiceSetLabel": "Integrate data from one or more other Museum systems so that I can view it all together in one place",
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1









			/* }, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'What Else is Important?',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'container_user-defined',
				'begin': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'radio-button-set-fake-labels',
				'content':
					'<div class="radio-button-set-fake-label" id="fake-label_not-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_slightly-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_moderately-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_very-important"></div>' +
					'<div class="radio-button-set-fake-label" id="fake-label_extremely-important"></div>',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'user-defined-sets',
				'htmlClass': 'repeating-content-container',
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlID': 'user-defined-set',
				'htmlClass': 'repeat-container user-defined-set',
				'repeatable': 1
			
			
			
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Item of Importance',
				'labelContent': 'Describe one important thing',
				'htmlClass': 'item-of-importance',
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
			}, {
				"elementType": "field",
				"controlType": "radio",
				"fieldName": "Importance Level",
				"choiceSetLabel": "How important is this item?",
				'htmlClass': 'importance-level',
				"choices": [{
					"value": "0",
					"display": "Not Important"
				}, {
					"value": "1",
					"display": "Slightly Important"
				}, {
					"value": "2",
					"display": "Moderately Important"
				}, {
					"value": "3",
					"display": "Very Important"
				}, {
					"value": "4",
					"display": "Extremely Important"
				}],
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],


			}, {
				'elementType': 'markup',
				'tag': 'div',
				'begin': 1,
				'htmlClass': 'remove-section-anchor-container',
			}, {
				'elementType': "markup",
				'tag': "a",
				'begin': 1,
				'end': 1,
				'htmlClass': "remove-section-anchor",
				'content': "Remove",
				'removeThisRepeat': 1,
				'hideForNonAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'a',
				'begin': 1,
				'end': 1,
				'htmlID': 'repeat-user-defined-set',
				'htmlClass': 'repeat-section-anchor',
				'content': 'Add Another Item',
				'repeatSectionID': 'user-defined-set',
				'disabledForNonAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
				'disabledForAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
				'hideForNonAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
				'hideForAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1, */















			}, {
				'elementType': 'markup',
				'tag': 'div',
				'htmlID': 'container_tell-us-more',
				'begin': 1,
			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Tell Us More',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Other Development',
				'labelContent': 'What else should The Hub be doing?',
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				'helpNotes': [
					{
						'text': "Give us your good ideas, even if they're not your highest priority",
						'htmlID': "help-note_other-lower-priority",
						'hideForNonAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
						'hideForAdmin': ["Submitted", "Completed", "Disapproved", "Cancelled"],
					},
				],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Doing Well',
				'labelContent': 'Please tell us anything you have difficulty finding on The Hub',
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Usability Challenges',
				'labelContent': 'Please describe any parts of The Hub you find difficult to use',
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'field',
				'controlType': 'textarea',
				'fieldName': 'Doing Well',
				'labelContent': 'What is The Hub already doing well?',
				"disabledForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
			}, {
				'elementType': 'markup',
				'tag': 'div',
				'end': 1,
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = '$("input#Request-Nickname").val("nickname"); \n';

	fData.CustomScriptLast += '$("div#mos-form-submission-confirmation a.link_exit").remove();';
	
	fData.CustomScriptLast += '$("div#label-and-control_Requested-For").hide("fast").addClass("hidden");';


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
