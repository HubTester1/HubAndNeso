/* eslint-disable */
(function ($) {

	var mData = {
		'componentID': 96,
		'swf': 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
		// 'currentRequestVersion': 1,
		'devAdminNotifications': 1,
		'notifications': 0,
	};

	console.log("using settings m1");

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
						'displayName': 'Requested By',
						'internalName': 'Author',
						'userName': 1
					}, {
						'displayName': 'Talk To',
						'internalName': 'RequestedFor',
						'userName': 1
					}, {
						'displayName': "Staff, Volunteer, Contractor Name(s)",
						'internalName': "StaffVolNames",
					}, {
						'displayName': "Start Date",
						'internalName': "StartDate",
						'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
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
						'basicRSQueryRelevantStatus': 'Pending Approval'
					}, {
						'tableTitle': 'Unassigned',
						'tableID': 'unassigned',
						'someColsAreUsers': 1,
						'customCAMLQuery': '<Where>' +
							'  <And>' +
							'	<Eq>' +
							'	  <FieldRef Name="RequestStatus"></FieldRef>' +
							'	  <Value Type="Text">Approved</Value>' +
							'	</Eq>' +
							'	<IsNull>' +
							'	  <FieldRef Name="AssignedTo"></FieldRef>' +
							'	</IsNull>' +
							'  </And>' +
							'</Where>'
					}, {
						'tableTitle': 'Assigned',
						'tableID': 'assigned',
						'someColsAreUsers': 1,
						'customCAMLQuery': '<Where>' +
							'  <And>' +
							'	<Eq>' +
							'	  <FieldRef Name="RequestStatus"></FieldRef>' +
							'	  <Value Type="Text">Approved</Value>' +
							'	</Eq>' +
							'	<IsNotNull>' +
							'	  <FieldRef Name="AssignedTo"></FieldRef>' +
							'	</IsNotNull>' +
							'  </And>' +
							'</Where>',
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
								'displayName': "Staff, Volunteer, Contractor Name(s)",
								'internalName': "StaffVolNames",
							}, {
								'displayName': "Start Date",
								'internalName': "StartDate",
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Assigned To',
								'internalName': 'AssignedTo',
								'userName': 1
							}, {
								'displayName': 'Assignment Date',
								'internalName': 'AssignmentDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}
						]
					}, {
						'tableTitle': 'Closed',
						'tableID': 'closed',
						'someColsAreUsers': 1,
						'sortColAndOrder': [0, 'desc'],
						'basicEOLQueryRelevantValue': 1,
						'customColumns': [
							{
								'displayName': 'Request ID',
								'internalName': 'ID',
								'formLink': 1
							}, {
								'displayName': 'Request Status',
								'internalName': 'RequestStatus'
							}, {
								'displayName': 'Requested By',
								'internalName': 'Author',
								'userName': 1
							}, {
								'displayName': 'Talk To',
								'internalName': 'RequestedFor',
								'userName': 1
							}, {
								'displayName': "Staff, Volunteer, Contractor Name(s)",
								'internalName': "StaffVolNames",
							}, {
								'displayName': 'Request Date',
								'internalName': 'RequestDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Assigned To',
								'internalName': 'AssignedTo',
								'userName': 1
							}, {
								'displayName': 'Assignment Date',
								'internalName': 'AssignmentDate',
								'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							}, {
								'displayName': 'Completed By',
								'internalName': 'CompletedBy',
								'userName': 1
							}, {
								'displayName': 'Completion Date',
								'internalName': 'CompletionDate',
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
						'displayName': "Staff Volunteer Name(s)",
						'internalName': "StaffVolNames",
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
		'standardElementGroups': {
			'standardPrintButton': {
				'buttonText': 'Print Request',
				'printFunction': 'PrintOutsideEmploymentRequest',
				'hideForNonAdmin': [],
				'hideForAdmin': [],
			},
		},
		'versioningMatters': 0,






		'uniqueElements': [
			{
				'elementType': "markup",
				'tag': "h2",
				'content': 'Process',
				'begin': 1,
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "ol",
				'begin': 1,
			}, {
				'elementType': "markup",
				'tag': "li",
				'content': 'Before accepting employment outside the Museum, staff members are required to complete, print, and submit this request to Human Resources.',
				'begin': 1,
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "li",
				'content': 'HR will ensure that no conflicts of interest may arise as a result of a staff member\'s proposed outside employment, and will advise the staff member of whether the Museum will approve her / his outside employment.',
				'begin': 1,
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "ol",
				'end': 1
			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': 'Staff Member',
				'begin': 1,
				'end': 1
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
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Staff Member Name",
				'labelContent': "Name",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Staff Member Position",
				'labelContent': "Position",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Manager Name",
				'labelContent': "Manager's Name",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				'elementType': "markup",
				'tag': "h2",
				'content': 'Outside Employment',
				'begin': 1,
				'end': 1
			}, {
				'elementType': "field",
				'controlType': "text",
				'fieldName': "Outside Employer",
				'labelContent': "Proposed Outside Employer",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				'elementType': "field",
				'controlType': "datePicker",
				'fieldName': "Start Date",
				'labelContent': "Proposed Start Date With Outside Employer",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],






			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Primary Responsibilities",
				'labelContent': "Proposed Primary Responsibilities of Outside Employment",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Relevant Responsibilities",
				'labelContent': "How does the proposed outside employment directly or indirectly relate to your responsibilities at the Museum?",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
			}, {
				'elementType': "field",
				'controlType': "textarea",
				'fieldName': "Relevant Materials",
				'labelContent': "Which materials developed at or used by the Museum are you planning to use at your outside employment?",
				'requiredForNonAdmin': [""],
				'requiredForAdmin': [""],
				"helpNotes": [{
					"text": "Under no circumstances may any Museum supplies, property, or items from Museum collections be used in outside employment.",
					"htmlID": "relevant-materials_help-note",
					"urgent": 0,
				}],
			}
		]
	};


	// configure customScript for this SWF here
	//	  (customScriptFirst will be prepended to auto-generated script)
	//	  (customScriptLast will be appended to auto-generated script)
	fData.CustomScriptFirst = '';

	fData.CustomScriptLast = '$("input#Staff-Member-Name").val("My Name"); \n';
	fData.CustomScriptLast += '$("input#Staff-Member-Position").val("My pos"); \n';
	fData.CustomScriptLast += '$("input#Manager-Name").val("My Mgr"); \n';
	fData.CustomScriptLast += '$("input#Outside-Employer").val("Outside employer"); \n';
	fData.CustomScriptLast += '$("input#Start-Date").val("June 15, 2018"); \n';
	fData.CustomScriptLast += '$("textarea#Primary-Responsibilities").val("These are my responsibilities."); \n';
	fData.CustomScriptLast += '$("textarea#Relevant-Responsibilities").val("How they\'re relevant."); \n';
	fData.CustomScriptLast += '$("textarea#Relevant-Materials").val("These are the materials."); \n';




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
