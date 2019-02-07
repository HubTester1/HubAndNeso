(function ($) {

	var mData = {
        "componentID": 84,
        "swf": 1,
		// 'mosMainKey': 'prod',
		// 'mosMainKey': 'dev',
		// 'mosMainKey': 'devMedium',
		'mosMainKey': 'devLong',
		// "useRecordedMOSMainMajorVersion": 1,
        "currentRequestVersion": 1,
        "devAdminNotifications": 1,
        "notifications": 0
    };

	console.log("using settings m1");



	var oData = {
		'admin': {
			'buttons': [
			],
			'preamble': '<p style="font-size: 2rem; font-weight: 300; margin-top: 1rem">Direct Deposit Requests must be printed. Please be mindful of additional information at the top of the form.</p>',
			'sections': {
				'commonColumns': [
				],
				'tables': [
				]
			}
		},
		'my': {
			'buttons': [
			],
			'preamble': '<p style="font-size: 2rem; font-weight: 300; margin-top: 1rem">Direct Deposit Requests must be printed. Please be mindful of additional information at the top of the form.</p>',
			'sections': {
				'commonColumns': [
				],
				'tables': [
				]
			}
		}
	};



	var fData = {
		'standardElementGroups': {
			'standardPrintButton': {
				'buttonText': 'Print Request',
				'printFunction': 'PrintDirectDepositRequest',
				'hideForNonAdmin': [],
				'hideForAdmin': [],
			},
			'standardComponentGrpAdminOnlyElements': 1
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
				'tag': "p",
				'content': 'Print this request, sign, and submit to Human Resources. Please be mindful of the information that will appear at the top of the printed request.',
				'begin': 1,
				'end': 1
			}, {

				/* 'elementType': 'markup',
				'tag': 'p',
				'content': '<strong>This form must be <span class="screen-only">printed and</span>returned to Human Resources with a <em>voided</em> check</strong> &mdash; not a deposit slip. If this is a savings account or you do not have checks, contact your bank for an official form that includes your account number, ABA number, and bank authorization. If an account is currently on file, an additional voided check is not necessary.',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'p',
				'content': 'Assume that you will receive a live check until you can verify with your bank that your direct deposit has been activated. Direct deposits and/or any changes to direct deposits take at least one extra pay period to go into effect.',
				'begin': 1,
				'end': 1
			}, { */
				"elementType": "markup",
				"tag": "h2",
				"content": "About You",
				"htmlID": "header_about-you",
				"begin": 1,
				"end": 1,
			}, {
				"elementType": "markup",
				"tag": "h2",
				"content": "About the Requester",
				"htmlID": "header_about-the-requester",
				"begin": 1,
				"end": 1
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Name",
				"labelContent": "Name",
				"disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Department",
				"labelContent": "Department",
				"disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Email",
				"labelContent": "Email",
				"disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Phone",
				"labelContent": "Phone",
				"disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]


			}, {
				"elementType": "field",
				"controlType": "text",
				"fieldName": "Requester Employee ID",
				"labelContent": "Employee ID",
				"disabledForNonAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				"disabledForAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				"helpNotes": [{
					"text": "Found on your name badge, near your last name",
					"htmlID": "requester-employee-id_help-note",
					"urgent": 0,
				}],




			}, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Accounts and Amounts',
				'begin': 1,
				'end': 1










			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Account 1',
				'begin': 1,
				'end': 1
				// }, {
				//      'elementType': 'markup',
				//      'tag': 'div',
				//      'begin': 1,
				//      'htmlID': 'accounts-and-amounts',
				//      'htmlClass': 'repeating-content-container', // subsection-container 
				//  }, {
				//      'elementType': 'markup',
				//      'tag': 'div',
				//      'begin': 1,
				//      'htmlID': 'account-and-amount',
				//      'htmlClass': 'repeat-container', // subsection 
				//      'repeatable': 1
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Account Type',
				'labelContent': 'Account Type',
				"setOptions": [
					{
						"value": "checking",
						"display": "Checking"
					}, {
						"value": "savings",
						"display": "Savings"
					}, {
						"value": "onFile",
						"display": "Current account on file"
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],



			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Bank Name',
				'labelContent': 'Bank / Branch Name',
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Bank Transit ABA Number',
				'labelContent': 'Bank Transit ABA Number',
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Account Number',
				'labelContent': 'Account Number',
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Deposit Amount',
				'labelContent': 'Deposit Amount',
				"setOptions": [
					{
						"value": "total",
						"display": "Deposit total amount"
					}, {
						"value": "fixed",
						"display": "Deposit fixed amount"
					}, {
						"value": "remainder",
						"display": "Deposit remainder of total net amount"
					}
				],
				"requiredForNonAdmin": [""],
				"requiredForAdmin": [""],
				'onChange': [
					{ 'thisFieldEquals': ['fixed'], 'show': [{ 'fieldName': 'Fixed Amount' }], 'require': [{ 'fieldName': 'Fixed Amount', 'type': 'text' }] },
					{ 'thisFieldNotEquals': ['fixed'], 'hide': [{ 'fieldName': 'Fixed Amount' }], 'optional': [{ 'fieldName': 'Fixed Amount', 'type': 'text' }] },
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Fixed Amount',
				'labelContent': 'Fixed Amount',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""]
				/*                }, {
									'elementType': 'markup',
									'tag': 'a',
									'begin': 1,
									'end': 1,
									'htmlClass': 'remove-section-anchor',
									'content': 'Remove this Account',
									'removeThisRepeat': 1,
								}, {
									'elementType': 'markup',
									'tag': 'div',
									'end': 1,
								}, {
									'elementType': 'markup',
									'tag': 'a',
									'begin': 1,
									'end': 1,
									'htmlID': 'repeat-account-and-amount',
									'htmlClass': 'repeat-section-anchor',
									'content': 'Add an Account',
									'repeatSectionID': 'account-and-amount',
								}, {
									'elementType': 'markup',
									'tag': 'div',
									'end': 1
				*/









			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Account 2',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Account Type 2',
				'labelContent': 'Account Type',
				"setOptions": [
					{
						"value": "checking",
						"display": "Checking"
					}, {
						"value": "savings",
						"display": "Savings"
					}, {
						"value": "onFile",
						"display": "Current account on file"
					}
				],
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],



			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Bank Name 2',
				'labelContent': 'Bank / Branch Name',
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Bank Transit ABA Number 2',
				'labelContent': 'Bank Transit ABA Number',
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Account Number 2',
				'labelContent': 'Account Number',
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Deposit Amount 2',
				'labelContent': 'Deposit Amount',
				"setOptions": [
					{
						"value": "total",
						"display": "Deposit total amount"
					}, {
						"value": "fixed",
						"display": "Deposit fixed amount"
					}, {
						"value": "remainder",
						"display": "Deposit remainder of total net amount"
					}
				],
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
				'onChange': [
					{ 'thisFieldEquals': ['fixed'], 'show': [{ 'fieldName': 'Fixed Amount 2' }], 'require': [{ 'fieldName': 'Fixed Amount 2', 'type': 'text' }] },
					{ 'thisFieldNotEquals': ['fixed'], 'hide': [{ 'fieldName': 'Fixed Amount 2' }], 'optional': [{ 'fieldName': 'Fixed Amount 2', 'type': 'text' }] },
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Fixed Amount 2',
				'labelContent': 'Fixed Amount',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""]














			}, {
				'elementType': 'markup',
				'tag': 'h3',
				'content': 'Account 3',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Account Type 3',
				'labelContent': 'Account Type',
				"setOptions": [
					{
						"value": "checking",
						"display": "Checking"
					}, {
						"value": "savings",
						"display": "Savings"
					}, {
						"value": "onFile",
						"display": "Current account on file"
					}
				],
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],



			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Bank Name 3',
				'labelContent': 'Bank / Branch Name',
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Bank Transit ABA Number 3',
				'labelContent': 'Bank Transit ABA Number',
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Account Number 3',
				'labelContent': 'Account Number',
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
			}, {
				'elementType': 'field',
				'controlType': 'select',
				'fieldName': 'Deposit Amount 3',
				'labelContent': 'Deposit Amount',
				"setOptions": [
					{
						"value": "total",
						"display": "Deposit total amount"
					}, {
						"value": "fixed",
						"display": "Deposit fixed amount"
					}, {
						"value": "remainder",
						"display": "Deposit remainder of total net amount"
					}
				],
				// "requiredForNonAdmin": [""],
				// "requiredForAdmin": [""],
				'onChange': [
					{ 'thisFieldEquals': ['fixed'], 'show': [{ 'fieldName': 'Fixed Amount 3' }], 'require': [{ 'fieldName': 'Fixed Amount 3', 'type': 'text' }] },
					{ 'thisFieldNotEquals': ['fixed'], 'hide': [{ 'fieldName': 'Fixed Amount 3' }], 'optional': [{ 'fieldName': 'Fixed Amount 3', 'type': 'text' }] },
				],
			}, {
				'elementType': 'field',
				'controlType': 'text',
				'fieldName': 'Fixed Amount 3',
				'labelContent': 'Fixed Amount',
				"hideForNonAdmin": [""],
				"hideForAdmin": [""]
































			/* }, {
				'elementType': 'markup',
				'tag': 'h2',
				'content': 'Authorization Agreement',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'p',
				'content': 'Reminder: You must print and sign this agreement. Please be mindful of additional information at the top of this form.',
				'htmlID': 'print-reminder',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'p',
				'content': 'I (we) hereby authorize the Museum of Science, either directly or through its payroll service provider, to deposit any amounts owed me, by initiating credit entries to my account at the financial institution (hereinafter "Bank") indicated on this form.  Further, I authorize Bank to accept and to credit any credit entries indicated by the Museum, either directly or through its payroll service provider, to my account.  In the event that the Museum deposits funds erroneously into my account, I authorize the Museum, either directly or through its payroll service provider, to debit my account for an amount not to exceed the original amount of the erroneous credit.',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'p',
				'content': 'This authorization is to remain in full force and effect until the Museum and Bank have received written notification from me (or either name on joint account) of its termination in such time and in such manner as to afford the Museum and Bank a reasonable opportunity to act on it.',
				'begin': 1,
				'end': 1
			}, {
				'elementType': 'markup',
				'tag': 'table',
				'htmlClass': 'signature-and-date',
				'content': '<tr id="first-signature">' +
					'   <td class="label signature"><span class="label">Signature</span></td>' +
					'   <td class="space signature"></td>' +
					'   <td class="label date"><span class="label">Date</span></td>' +
					'   <td class="space date"></td>' +
					'</tr>' +
					'<tr id="second-signature">' +
					'   <td class="label signature"><span class="label">Additional Signature</span> <span class="label_help-note">(If Joint Account)</span></td>' +
					'   <td class="space signature"></td>' +
					'   <td class="label date"><span class="label">Date</span></td>' +
					'   <td class="space date"></td>' +
					'</tr>',
				'begin': 1,
				'end': 1 */

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
