(function($) {


    // ---- GLOBAL VARS

    var globalMData = {};
    var globalRData = {};
    var globalUData = {};
    var globalMOSSWFLatestVersion = $().ReturnGlobalMOSSWFLatestVersion();
    var globalSubmissionValuePairs;
    var globalErrorEmailsToSend = [];



    // ---- MOST FREQUENTLY NEEDED



    $.fn.ReturnUniqueElementsOfCorrectVersion = function(uniqueElements, mData, rData) {

        var elementsToReturn = [];

        // first determine which version to load
        var requestVersionToLoad = null;

        // for a new request, get current version
        if (rData.requestStatus == "") {
            requestVersionToLoad = mData.currentRequestVersion;
            // for a previous request, if there's a stored version number, get it
        } else {
            if (typeof(rData.requestVersion) != "undefined") {
                requestVersionToLoad = rData.requestVersion;
            }
        }
        // for a previous request with no stored version number, stick with null

        $.each(uniqueElements, function(i, element) {

            // if this element has no version number, use it
            // if this element has a version number and it matches the version to load, use it
            // if this element has a version number == 1 and the version to load is null

            if (typeof(element.requestVersion) == "undefined" || (typeof(element.requestVersion) != "undefined" && (element.requestVersion == requestVersionToLoad || (element.requestVersion == 1 && requestVersionToLoad == null)))) {
                elementsToReturn = elementsToReturn.concat(element);
            }
        });
        return elementsToReturn;
    }



    $.fn.InitializeForm = function(mData, uniqueElements, customScriptFirst, customScriptLast) {



        // ========================================================
        // SET UP VARS
        // ========================================================

        console.log('using mos-swf.js m1');

        // THIS REQUEST SYSTEM'S METADATA

        // extend mData with Component Log data, with Component Group Log data, 
        // and with assumption that form data should come from SWFList 
        // if no other listName has been supplied

        mData.componentGroupID = 3;

        mData = $.extend(
            $().ReturnThisSiteSettings(),
            $().GetFieldsFromOneRow({
                "listName": "ComponentLog",
                "select": [{
                    "nameHere": "uriAdmin",
                    "nameInList": "URIAdmin",
                    "linkField": 1
                }, {
                    "nameHere": "uriRequester",
                    "nameInList": "URIRequester",
                    "linkField": 1
                }, {
                    "nameHere": "uriRequest",
                    "nameInList": "URIRequest",
                    "linkField": 1
                }, {
                    "nameHere": "uriRequestAlternate",
                    "nameInList": "URIRequestAlternate",
                    "linkField": 1
                }, {
                    "nameHere": "uriRoot",
                    "nameInList": "URIRoot",
                    "linkField": 1
                }, {
                    "nameHere": "uriWFHistory",
                    "nameInList": "URIWFHistory",
                    "linkField": 1
                }, {
                    "nameHere": "requiredApproversString",
                    "nameInList": "RequiredApprovers"
                }, {
                    "nameHere": "componentAdmin",
                    "nameInList": "AdminAccess"
                }, {
                    "nameHere": "viewAccess",
                    "nameInList": "ViewAccess"
                }, {
                    "nameHere": "requestName",
                    "nameInList": "RequestName"
                }, {
                    "nameHere": "adminNotificationPersons",
                    "nameInList": "AdminNotifications"
                }, {
                    "nameHere": "autoAssignments1",
                    "nameInList": "AutoAssignments1"
                }, {
                    "nameHere": "autoAssignments2",
                    "nameInList": "AutoAssignments2"
                }],
                "where": {
                    "field": "ComponentID",
                    "type": "Number",
                    "value": mData.componentID,
                }
            }),
            $().GetFieldsFromOneRow({
                "listName": "Component Group Log",
                "select": [{
                    "nameHere": "componentGrpAdmin",
                    "nameInList": "GroupAdminAccess"
                }, {
                    "nameHere": "componentGrpAdminNotifications",
                    "nameInList": "GroupAdminNotifications"
                }, {
                    "nameHere": "devAdminNotificationPersons",
                    "nameInList": "DevAdminNotifications"
                }],
                "where": {
                    "field": "ComponentGroupID",
                    "type": "Number",
                    "value": mData.componentGroupID,
                }
            }), {
                "listName": "SWFList",
            },
            mData
        );

        // if mData.adminNotificationPersons == 1, overwrite the admin notifications data pulled from Component Log with
        //      data from Component Group Log
        if (typeof(mData.devAdminNotifications) != 'undefined' && mData.devAdminNotifications == 1) {
            mData.adminNotificationPersons = mData.devAdminNotificationPersons;
        }

        // set semicolon-delimited string of admin emails
        mData.adminEmailString = $().ReturnUserEmailStringAndArray(mData.adminNotificationPersons).string;
        mData.adminEmailArray = $().ReturnUserEmailStringAndArray(mData.adminNotificationPersons).array;
        mData.componentGrpAdminEmailString = $().ReturnUserEmailStringAndArray(mData.componentGrpAdminNotifications).string;
        mData.componentGrpAdminEmailArray = $().ReturnUserEmailStringAndArray(mData.componentGrpAdminNotifications).array;
        mData.requiredApproversArray = $().ReturnUserDataFromPersonOrGroupFieldString(mData.requiredApproversString);


        // THIS REQUEST'S DATA

        // get request ID from URL (if it exists), store in global var for submission function
        var rData = {
            requestID: $().GetParamFromUrl(location.search, "requestID"),
            returnURI: $().GetParamFromUrl(location.search, "returnURI")
        };

        // if there is a request id, then get data for this request
        if (rData.requestID != "") {
            rData = $.extend($().GetFieldsFromOneRow({
                "select": [{
                    "nameHere": "requestStatus",
                    "nameInList": "RequestStatus"
                }, {
                    "nameHere": "endOfLife",
                    "nameInList": "EndOfLife"
                }, {
                    "nameHere": "lastModifiedAtLoad",
                    "nameInList": "Modified"
                }, {
                    "nameHere": "requesterID",
                    "nameInList": "Author"
                }, {
                    "nameHere": "formData",
                    "nameInList": "AllRequestData"
                }, {
                    "nameHere": "requestVersion",
                    "nameInList": "RequestVersion"
                }],
                "where": {
                    "field": "ID",
                    "type": "Number",
                    "value": rData.requestID,
                }
            }), rData);
        }
        if (typeof(rData.requestStatus) == "undefined") {
            rData.requestStatus = "";
        }

        // THIS REQUEST'S DEFAULT DATA FOR NEW REQUESTS

        if (typeof(mData.defaultDataForNewRequests) != "undefined") {
            rData = $.extend($().GetFieldsFromOneRow({
                'webURL': mData.defaultDataForNewRequests.webURL,
                'listName': mData.defaultDataForNewRequests.listName,
                'select': mData.defaultDataForNewRequests.select,
                'where': mData.defaultDataForNewRequests.where,
            }), rData);
        }

        // THIS USER'S DATA

        var uData = $().ReturnCurrentUserData();
        uData.isAdmin = $().UserIsComponentAdmin(uData);
        uData.isComponentGrpAdmin = $().UserIsComponentGrpAdmin(uData, mData.componentGroupID);
        if (uData.isComponentGrpAdmin == 1) { uData.isAdmin = 1; }

        uData.browserFamilyAndVersion = bowser.name + ' ' + bowser.version;

        if (typeof(bowser.mobile) != 'undefined' && bowser.mobile == true) {
            uData.formFactor = 'mobile';
        } else if (typeof(bowser.tablet) != 'undefined' && bowser.tablet == true) {
            uData.formFactor = 'tablet';
        } else {
            uData.formFactor = 'probably desktop';
        }

        if (typeof(bowser.android) != 'undefined' && bowser.android == true) {
            uData.os = 'Android';
        } else if (typeof(bowser.ios) != 'undefined' && bowser.ios == true) {
            if (typeof(bowser.ipad) != 'undefined' && bowser.ipad == true) {
                uData.os = 'iOS (iPad)';
            } else if (typeof(bowser.iphone) != 'undefined' && bowser.iphone == true) {
                uData.os = 'iOS (iPhone)';
            } else if (typeof(bowser.ipod) != 'undefined' && bowser.ipod == true) {
                uData.os = 'iOS (iPhod)';
            }
        } else if (typeof(bowser.windowsphone) != 'undefined' && bowser.windowsphone == true) {
            uData.os = 'Windows Phone';
        } else if (typeof(bowser.mac) != 'undefined' && bowser.mac == true) {
            uData.os = 'Mac';
        } else if (typeof(bowser.linux) != 'undefined' && bowser.linux == true) {
            uData.os = 'Linux';
        } else {
            uData.os = 'Probably Windows';
        }

        if (typeof(bowser.osversion) != 'undefined') {
            uData.os = uData.os + ' ' + bowser.osversion;
        }

        // COMBINE STANDARD AND UNIQUE FORM ELEMENTS

        var standardThisRequestAndRequesterElements = [
            // this request
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
                "htmlID": "header_this-request",
                "begin": 1,
                "end": 1
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlClass": "label-and-control",
                "htmlID": "requirement-legend",
                "content": '    <div class="label"></div>' +
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
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Request Date",
                "labelContent": "Request Date",
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
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Request Nickname",
                "labelContent": "Request Nickname",
                "listFieldName": "Title",
                "helpNotes": [{
                    "text": "Give this request a name you can reference later",
                    "htmlID": "request-nickname_help-note",
                    "urgent": 0,
                    "hideForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                    "hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
                }],
                "requiredForNonAdmin": [""],
                "requiredForAdmin": [""],
                "disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
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
                "hideForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
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
                "disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "check",
                "fieldName": "Requester Cancellation",
                "choiceSetLabel": "Cancellation",
                "choices": [{
                    "value": "cancel",
                    "display": "Yes, I wish to cancel this request"
                }],
                "hideForNonAdmin": ["", "Validator Picked Up", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Completed", "Disapproved", "Cancelled"]
                    // about the requester
            }, {
                "elementType": "markup",
                "tag": "div",
                "begin": 1,
                "hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Submitted", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": [""],
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
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Requester Department",
                "labelContent": "Department",
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Requester Email",
                "labelContent": "Email",
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Requester Phone",
                "labelContent": "Phone",
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Requester Account",
                "labelContent": "Account",
                "yieldsViewPermissions": 1,
                "hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Requested By",
                "labelContent": "Requested By",
                "listFieldName": "RequestedBy",
                "yieldsViewPermissions": 1,
                "hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Pending Approval", "Approved", "Loaned", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "end": 1
            }
        ];

        var standardApprovalElements = [
            {
                "elementType": "markup",
                "tag": "h2",
                "htmlID": "header_approvals",
                "content": "Approvals",
                "begin": 1,
                "end": 1
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlID": "swf-specific-approval-preface",
                "htmlClass": "preface",
                "begin": 1,
                "end": 1,
                "hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlClass": "preface",
                "content": "By submitting this request, you approve it. For any additional person whose approval will be required, " +
                    "enter a name or mos.org email address in the Approvers field.",
                "begin": 1,
                "end": 1,
                "hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlClass": "preface",
                "content": "To remove an unneeded approver, select the \"X\" to the right of the name.",
                "begin": 1,
                "end": 1,
                "hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlClass": "preface",
                "content": "Here to approve? Just find your name and set the corresponding approval indicator " +
                    "to 'I approve'. If your approval has been requested in error, please " +
                    "<a href='' class='link_admin-email'>contact the admin</a>.",
                "htmlID": "approval-instructions",
                "begin": 1,
                "end": 1,
                "hideForNonAdmin": ["", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlClass": "preface",
                "content": "Here to approve? No need. Someone has already disapproved this request.",
                "htmlClass": "urgent",
                "htmlID": "disregard-approval-notice",
                "begin": 1,
                "end": 1,
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlClass": "preface",
                "content": "Admin - If the approval requirements are incorrect, " +
                    "<ul>" +
                    "   <li>Delete an unneeded approver by selecting the \"X\" to the right of the name.</li>" +
                    "   <li>Add a needed approver by entering a name or mos.org email address in the Approvers field.</li>" +
                    "   <li>Added and deleted approvers will be notified automatically.</li>" +
                    "<ul>",
                "begin": 1,
                "end": 1,
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Approvers on Load",
                "labelContent": "Approvers on Load",
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Approvers",
                "labelContent": "Approvers",
                "yieldsViewPermissions": 1,
                "hideForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
                "helpNotes": [{
                    "text": "All and only the the people listed here will be required to approve this request",
                    "htmlID": "approvers-people-picker_help-note",
                    "urgent": 0
                }]
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlID": "all-approvals",
                "content": '',
                "begin": 1,
                "end": 1
            }
        ];

        if (typeof(mData.standardElementGroups.standardAdminAssignmentCompletionElements) != "undefined") {

            var standardAdminAssignmentCompletionElements1 = [{
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
                    '        <tr>' +
                    '             <th id="th_recipient">Recipient</th>' +
                    '             <th id="th_needed-or-not">Needed or Not Needed</th>' +
                    '             <th id="th_date">Date & Time</th>' +
                    '        </tr>' +
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
                "setOptions": mData.standardElementGroups.standardAdminAssignmentCompletionElements.changeRequestStatus,
                "hideForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
                'onChange': [
                    { "thisFieldEquals": ["Approve"], "require": [{ "fieldName": "Assigned To", "type": "peoplepicker" }], "enable": [{ "fieldName": "Assigned To", "type": "peoplepicker" }], "show": [{ "divID": "assignment" }] },
                    { "thisFieldEquals": ["Complete"], "require": [{ "fieldName": "Completed By", "type": "peoplepicker" }], "enable": [{ "fieldName": "Completed By", "type": "peoplepicker" }], "show": [{ "divID": "completion" }, { "divID": "assignment" }] },
                    { "thisFieldEquals": ["", "Cancel", "Disapprove"], "optional": [{ "fieldName": "Assigned To", "type": "peoplepicker" }, { "fieldName": "Completed By", "type": "peoplepicker" }], "disable": [{ "fieldName": "Assigned To", "type": "peoplepicker" }, { "fieldName": "Completed By", "type": "peoplepicker" }], "hide": [{ "divID": "completion" }, { "divID": "assignment" }] },
                ],
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
                "end": 1,
            }];

            var standardAdminAssignmentCompletionElements2 = [{
                "elementType": "markup",
                "tag": "div",
                "htmlID": "assignment",
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval"],
                "begin": 1,
            }, {
                "elementType": "markup",
                "tag": "h3",
                "content": 'Assignment',
                "begin": 1,
                "end": 1
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Assigned To on Load",
                "labelContent": "Assigned To on Load",
                "yieldsViewPermissions": 1,
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Assigned To",
                "labelContent": "Assigned To",
                "listFieldName": "AssignedTo",
                "disabledForNonAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "datePicker",
                "fieldName": "Assignment Date",
                "labelContent": "Assignment Date",
                "listFieldName": "AssignmentDate",
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
                "disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "end": 1
            }, {
                "elementType": "markup",
                "tag": "div",
                "htmlID": "completion",
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "begin": 1,
            }, {
                "elementType": "markup",
                "tag": "h3",
                "content": 'Completion',
                "begin": 1,
                "end": 1
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Completed By",
                "labelContent": "Completed By",
                "listFieldName": "CompletedBy",
                "disabledForNonAdmin": ["Pending Approval", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Approval", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "datePicker",
                "fieldName": "Completion Date",
                "labelContent": "Completion Date",
                "listFieldName": "CompletionDate",
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
                "disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "end": 1,
            }];


            if (typeof(mData.standardElementGroups.standardAdminAssignmentCompletionElements.additionalAdminFields) != "undefined") {
                var standardAdminAssignmentCompletionElements = standardAdminAssignmentCompletionElements1.concat(mData.standardElementGroups.standardAdminAssignmentCompletionElements.additionalAdminFields).concat(standardAdminAssignmentCompletionElements2);
            } else {
                var standardAdminAssignmentCompletionElements = standardAdminAssignmentCompletionElements1.concat(standardAdminAssignmentCompletionElements2);
            }
        }

        if (mData.standardElementGroups.standardAdminElements != undefined) {

            var standardAdminElements1 = [{
                "elementType": "markup",
                "tag": "div",
                "htmlID": "admin",
                "content": '',
                "begin": 1,
                "hideForNonAdmin": ["", "Open", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
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
                "hideForNonAdmin": ["", "Open", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Open", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
                    '        <tr>' +
                    '             <th id="th_recipient">Recipient</th>' +
                    '             <th id="th_needed-or-not">Needed or Not Needed</th>' +
                    '             <th id="th_date">Date & Time</th>' +
                    '        </tr>' +
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
                "setOptions": mData.standardElementGroups.standardAdminElements.changeRequestStatus,
                "hideForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["Completed", "Disapproved", "Cancelled"],
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Request Status",
                "listFieldName": "RequestStatus",
                "labelContent": "Request Status",
                "disabledForNonAdmin": ["", "Open", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Open", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
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
                "end": 1,
            }];

            if (typeof(mData.standardElementGroups.standardAdminElements.additionalAdminFields) != "undefined") {
                var standardAdminElements = standardAdminElements1.concat(mData.standardElementGroups.standardAdminElements.additionalAdminFields);
            } else {
                var standardAdminElements = standardAdminElements1;
            }

            console.log(standardAdminElements);

        }

        var standardAssignmentElements = [
            {
                "elementType": "markup",
                "tag": "div",
                "htmlID": "assignment",
                "hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval"],
                "begin": 1,
            }, {
                "elementType": "markup",
                "tag": "h3",
                "content": 'Assignment',
                "begin": 1,
                "end": 1
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Assigned To on Load",
                "labelContent": "Assigned To on Load",
                "yieldsViewPermissions": 1,
                "hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForNonAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Assigned To",
                "labelContent": "Assigned To",
                "listFieldName": "AssignedTo",
                "disabledForNonAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "datePicker",
                "fieldName": "Assignment Date",
                "labelContent": "Assignment Date",
                "listFieldName": "AssignmentDate",
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
                "disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "end": 1
            }
        ];

        var standardCompletionElements = [
            {
                "elementType": "markup",
                "tag": "div",
                "htmlID": "completion",
                "hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "begin": 1,
            }, {
                "elementType": "markup",
                "tag": "h3",
                "content": 'Completion',
                "begin": 1,
                "end": 1
            }, {
                "elementType": "field",
                "controlType": "peoplePicker",
                "fieldName": "Completed By",
                "labelContent": "Completed By",
                "listFieldName": "CompletedBy",
                "disabledForNonAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Disapproved", "Cancelled"]
            }, {
                "elementType": "field",
                "controlType": "datePicker",
                "fieldName": "Completion Date",
                "labelContent": "Completion Date",
                "listFieldName": "CompletionDate",
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
                "disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
            }, {
                "elementType": "markup",
                "tag": "div",
                "end": 1,
            }
        ];

        var standardButtonElements = [
            {
                "elementType": "markup",
                "tag": "div",
                "htmlID": "submit-or-exit",
                "content": '    <div class="label-and-control">' +
                    '    <div class="label"></div>' +
                    '    <div class="field-type-indication"></div>' +
                    '    <div class="control">' +
                    '             <div id="submission-notice">Please check your information before submitting. ' +
                    '                   You won\'t be able to make edits afterward.</div>' +
                    '             <input class="button_submit" type="button" value="Submit"></div>' +
                    '   </div>' +
                    '   <div class="label-and-control">' +
                    '    <div class="label"></div>' +
                    '    <div class="field-type-indication"></div>' +
                    '    <div class="control"><a class="link_exit-sans-save" href="">Don\'t Save</a></div>' +
                    '   </div>',
                "begin": 1,
                "end": 1,
                "hideForNonAdmin": ["Completed", "Disapproved", "Cancelled"]
            }
        ];

        var standardComponentGrpAdminOnlyElements = [
            {
                "elementType": "markup",
                "tag": "div",
                "htmlID": "component-group-admin-only",
                "begin": 1,
                "hideForNonAdmin": ["", "Submitted", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
                "hideForAdmin": ["", "Submitted", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
            }, {
                "elementType": "field",
                "controlType": "textarea",
                "fieldName": "Approval Nodes Storage",
                "labelContent": "Approval Nodes Storage"
            }, {
                "elementType": "field",
                "controlType": "textarea",
                "fieldName": "Approval Nodes Script Storage",
                "labelContent": "Approval Nodes Script Storage"
            }, {
                "elementType": "field",
                "controlType": "textarea",
                "fieldName": "Approval Notification Rows Storage",
                "labelContent": "Approval Notification Rows Storage"
            }, {
                "elementType": "field",
                "controlType": "textarea",
                "fieldName": "Approval Notification Rows Storage",
                "labelContent": "Approval Notification Rows Storage"
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Beginning of Life",
                "labelContent": "Beginning of Life",
                "listFieldName": "BeginningOfLife",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "End of Life",
                "labelContent": "End of Life",
                "listFieldName": "EndOfLife",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Approval Newly Needed Notify",
                "labelContent": "Approval Newly Needed Notify",
                "listFieldName": "ApprovalNewlyNeededNotify",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Approval Not Needed Notify",
                "labelContent": "Approval Not Needed Notify",
                "listFieldName": "ApprovalNotNeededNotify",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Approval Still Needed Notify",
                "labelContent": "Approval Still Needed Notify",
                "listFieldName": "ApprovalStillNeededNotify",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Newly Approved or Pending",
                "labelContent": "Newly Approved or Pending",
                "listFieldName": "NewlyApprovedOrPending",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Auto Assignments 1",
                "labelContent": "Auto Assignments 1",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Auto Assignments 2",
                "labelContent": "Auto Assignments 2",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Work Newly Needed Notify",
                "labelContent": "Work Newly Needed Notify",
                "listFieldName": "WorkNewlyNeededNotify",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Work Not Needed Notify",
                "labelContent": "Work Not Needed Notify",
                "listFieldName": "WorkNotNeededNotify",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Newly Assigned",
                "labelContent": "Newly Assigned",
                "listFieldName": "NewlyAssigned",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Last Modified Timestamp at Load",
                "labelContent": "Last Modified Timestamp at Load",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Last Modified Timestamp at Submit",
                "labelContent": "Last Modified Timestamp at Submit",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Last Modified Timestamp Mismatch",
                "labelContent": "Last Modified Timestamp Mismatch",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Admin Email",
                "labelContent": "Admin Email",
                "listFieldName": "AdminEmail",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Request Name",
                "labelContent": "Request Name",
                "listFieldName": "RequestName",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Required Approvers",
                "labelContent": "Required Approvers",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "URI Admin",
                "labelContent": "URI Admin",
                "listFieldName": "URIAdmin",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "URI Requester",
                "labelContent": "URI Requester",
                "listFieldName": "URIRequester",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "URI Request",
                "labelContent": "URI Request",
                "listFieldName": "URIRequest",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "SWF Version",
                "labelContent": "SWF Version",
                "listFieldName": "SWFVersion"
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Request Version",
                "labelContent": "Request Version",
                "listFieldName": "RequestVersion"
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Component Group Admin",
                "labelContent": "Component Group Admin",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Component Admin",
                "labelContent": "Component Admin",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "View Access",
                "labelContent": "View Access",
                "yieldsViewPermissions": 1,
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Current User Name",
                "labelContent": "Current User Name",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Current User Account",
                "labelContent": "Current User Account",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Current User is Admin",
                "labelContent": "Current User is Admin",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Current User is Component Group Admin",
                "labelContent": "Current User is Component Group Admin",
            }, {
                "elementType": "field",
                "controlType": "textarea",
                "fieldName": "User Machine History",
                "labelContent": "User Machine History",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Component ID",
                "labelContent": "Component ID",
            }, {
                "elementType": "field",
                "controlType": "text",
                "fieldName": "Component ID",
                "labelContent": "Component ID",
            }, {
                "elementType": "markup",
                "tag": "div",
                "end": 1,
            }
        ];

        if (mData.standardElementGroups != undefined) {

            if (mData.standardElementGroups.standardThisRequestAndRequesterElements != undefined) {
                mData.elements = standardThisRequestAndRequesterElements;
            } else {
                mData.elements = [];
            }

            mData.elements = mData.elements.concat($().ReturnUniqueElementsOfCorrectVersion(uniqueElements, mData, rData));

            if (mData.standardElementGroups.standardApprovalElements != undefined) {
                mData.elements = mData.elements.concat(standardApprovalElements);
            }

            if (mData.standardElementGroups.standardAdminAssignmentCompletionElements != undefined) {
                mData.elements = mData.elements.concat(standardAdminAssignmentCompletionElements);
            }

            if (mData.standardElementGroups.standardAdminElements != undefined) {
                mData.elements = mData.elements.concat(standardAdminElements);
            }

            if (mData.standardElementGroups.standardAdminNotesElements != undefined) {
                mData.elements = mData.elements.concat(standardAdminNotesElements);
            }

            if (mData.standardElementGroups.standardAssignmentElements != undefined) {
                mData.elements = mData.elements.concat(standardAssignmentElements);
            }

            if (mData.standardElementGroups.standardCompletionElements != undefined) {
                mData.elements = mData.elements.concat(standardCompletionElements);
            }

            if (mData.standardElementGroups.standardButtonElements != undefined) {
                mData.elements = mData.elements.concat(standardButtonElements);
            }

            if (mData.standardElementGroups.standardComponentGrpAdminOnlyElements != undefined) {
                mData.elements = mData.elements.concat(standardComponentGrpAdminOnlyElements);
            }

        }



        // OVERLAY MESSAGES

        var overlayMessages = '<div id="overlays-container"> \n' +
            '<div id="mos-form-submission-confirmation" class="mos-form-section overlay"> \n' +
            '   <div class="section-content hidden"> \n' +
            '       <p>Thanks! Your information has been received.</p> \n' +
            '       <div id ="mos-form-submission-confirmation-additional-message"></div> \n' +
            '       <a class="link_exit" href="">Exit</a> \n' +
            '   </div> \n' +
            '</div> \n' +
            ' \n' +
            ' \n' +
            '<div id="mos-form-data-errors" class="mos-form-section overlay hidden"> \n' +
            '   <div class="section-content hidden"> \n' +
            '         <div class="message"> \n' +
            '               <p><span class="urgent">Oops!</span> The highlighted fields contain errors. E.g.,</p> \n' +
            ' \n' +
            '               <div id="label-and-control_Error-Example" class="label-and-control text contains-errors hello"> \n' +
            '                    <div class="label"><label for="error-example">Field Name</label></div> \n' +
            '                    <div class="field-type-indication"> \n' +
            '                         <span id="field-type-indicator_error-example" class="field-type-indicator field-optional"> \n' +
            '                               <span class="message message-optional">Optional Field</span> \n' +
            '                         </span> \n' +
            '                    </div> \n' +
            '                    <div class="control"> \n' +
            '                         <input id="error-example" aria-describedby ="field-type-indicator_error-example" type="text" /> \n' +
            '                         <div class="error-message">Error message</div> \n' +
            '                    </div> \n' +
            '               </div> \n' +
            ' \n' +
            '               <p>Please make changes and re-submit  :)</p> \n' +
            '         </div> \n' +
            '         <input class="button_dismiss" type="button" value="Dismiss"> \n' +
            '    </div> \n' +
            '</div> \n' +
            ' \n' +
            ' \n' +
            '<div id="last-modified-mismatch" class="mos-form-section overlay hidden"> \n' +
            '    <div class="section-content hidden urgent"> \n' +
            '         <div class="message"> \n' +
            '               <p> \n' +
            '                    <span class="urgent">Whoopsie!</span> Someone else saved changes to this form while you were working.  \n' +
            '         Please make a copy of any info you don\'t want to lose and then refresh  \n' +
            '         this page to get the other person\'s updates. \n' +
            '    </p> \n' +
            '</div> \n' +
            '<input class="button_dismiss" type="button" value="Dismiss"> \n' +
            '</div> \n' +
            '</div> \n' +
            ' \n' +
            ' \n' +
            '<div id="swfList-error_new-request" class="mos-form-section overlay hidden"> \n' +
            '    <div class="section-content hidden urgent"> \n' +
            '         <div class="message"> \n' +
            '               <p> \n' +
            '                    <span class="urgent">Yikes!</span> We had a problem saving your information. \n' +
            '                   IIT has been notified, but, after exiting, if you don\'t see this request, please try creating it once more. \n' +
            '             </p> \n' +
            '        </div> \n' +
            '        <a class="link_exit" href="">Exit</a> \n' +
            '   </div> \n' +
            '</div> \n' +
            ' \n' +
            ' \n' +
            '<div id="swfList-error_updated-request" class="mos-form-section overlay hidden"> \n' +
            '    <div class="section-content hidden urgent"> \n' +
            '         <div class="message"> \n' +
            '               <p> \n' +
            '                    <span class="urgent">Yikes!</span> We had a problem saving your information. \n' +
            '                   IIT has been notified, but, after exiting, please try to submit your changes once more. \n' +
            '             </p> \n' +
            '        </div> \n' +
            '        <a class="link_exit" href="">Exit</a> \n' +
            '   </div> \n' +
            '</div> \n' +
            ' \n' +
            ' \n' +
            '<div id="attachment-error" class="mos-form-section overlay hidden"> \n' +
            '    <div class="section-content hidden urgent"> \n' +
            '         <div class="message"> \n' +
            '               <p> \n' +
            '                    <span class="urgent">Eek!</span> Most of your request was received, but we had \n' +
            '                   a problem with one or more attachments. IIT has been notified, but do please make sure the appropriate person has your files.\n' +
            '             </p> \n' +
            '        </div> \n' +
            '        <a class="link_exit" href="">Exit</a> \n' +
            '   </div> \n' +
            '</div> \n' +
            ' \n' +
            ' \n' +
            '<div id="wait-while-working" class="mos-form-section overlay hidden"> \n' +
            '    <div class="section-content hidden"> \n' +
            '         <div class="message"> \n' +
            '               <p> \n' +
            '                    Working on it \n' +
            '               </p> \n' +
            '               <img src="https://bmos.sharepoint.com/sites/hubprod/Asset%20Library/waiting_horizontally-sliding-circles.gif" alt="" /> \n' +
            '         </div> \n' +
            '    </div> \n' +
            '</div>';
        overlayMessages += $().ReturnNoViewPermissionMessage();
        overlayMessages += '</div>';



        // ========================================================
        // ENSURE VIEW PERMISSION
        // ========================================================



        // append overlay messages to all-content in case the no-view-permission message must displace the form
        $("div#all-content-container").append(overlayMessages);

        // if request status != '' and user is not an admin
        if (rData.requestStatus != "" && uData.isAdmin == 0) {

            var permitted = []; // array of non-admin users who have permission to view the form
            var hasPermission = 0; // this user's permission flag
            console.log("mData.elements");
            console.log(mData.elements);
            // for each element
            $.each(mData.elements, function(i, elem) {
                // if it yields view permissions
                if (typeof(elem.yieldsViewPermissions) != "undefined") {
                    if (elem.yieldsViewPermissions == 1) {
                        // push its value to permitted
                        if (typeof(rData.formData[ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))]) == 'string') {
                            permitted.push(rData.formData[ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))]);
                        } else if (typeof(rData.formData[ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))]) == 'object') {
                            $.each(rData.formData[ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))], function(i, p) {
                                permitted.push(p.account);
                            });
                        }
                    }
                }
            });
            console.log("permitted");
            console.log(permitted);
            $.each(permitted, function(i, p) {
                if (StrInStr(p, uData.account, 0)) {
                    hasPermission = 1;
                }
            });

            if (hasPermission == 0) {
                $('div#overlays-container').fadeIn(200);
                $('div#mos-form-no-view-permission').fadeIn(400);
                return;
            }
        }



        // ========================================================
        // BUILD FORM MARKUP & PARTIAL SCRIPT; INSERT FORM MARKUP
        // ========================================================



        var formMarkup = '';

        var formScript = '';

        $.each(mData.elements, function(i, elem) {

            switch (elem.elementType) {
                case "field":

                    switch (elem.controlType) {

                        case "text":
                            formMarkup += $().BuildTextField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "textarea":
                            formMarkup += $().BuildTextAreaField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "select":
                            formMarkup += $().BuildSelectField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "listItemChooser":
                            formMarkup += $().BuildListItemChooserField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "buttonWithLabel":
                            formMarkup += $().BuildButtonWithLabelField(elem, uData.isAdmin, rData.requestStatus);
                            break;

                        case "peoplePicker":
                            formMarkup += $().BuildPeoplePickerField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "radio":
                        case "check":
                            formMarkup += $().BuildRadioButtonsOrCheckboxes(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "datePicker":
                            formMarkup += $().BuildDatePicker(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "time":
                            formMarkup += $().BuildTime(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "datetime":
                            formMarkup += $().BuildDatetime(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "file":
                            formMarkup += $().BuildFileField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "url":
                            formMarkup += $().BuildURLField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                        case "phone":
                            formMarkup += $().BuildPhoneField(elem, uData.isAdmin, rData.requestStatus);
                            formScript += $().BuildScript(elem, uData, mData);
                            break;

                    }
                    break;

                case "multifield":
                    formMarkup += $().BuildMultifield(elem, uData.isAdmin, rData.requestStatus);
                    formScript += $().BuildScript(elem, uData, mData);
                    break;

                case "markup":
                    formMarkup += $().BuildMarkup(elem, uData.isAdmin, rData.requestStatus);
                    formScript += $().BuildScript(elem, uData, mData);
                    break;
            }
        });

        // insert base markup into form container div
        $("div#mos-form").append(formMarkup);

        // insert approval nodes, if any
        if (rData.requestID != "") {
            if (typeof(rData.formData['Approval-Nodes-Storage']) != 'undefined') {
                $("div#all-approvals").html(HtmlDecode(rData.formData['Approval-Nodes-Storage']));
            }
        }

        // add a class to form container div to serve as styling hook
        $("div#mos-form, div#overlays-container").addClass(ReplaceAll("\\.", "", ReplaceAll(" ", "-", mData.requestName)).toLowerCase());



        // ========================================================
        // CREATE, FORMAT FORM FIELD CONTROLS
        // ========================================================

        // for each div with relevant attribute, create PeoplePicker control
        $("div[data-control-type='PeoplePicker']").each(function() {
            var peoplePickerDiv = $(this).attr("ID");
            InitializePeoplePicker(peoplePickerDiv);
        });

        // format field requirements
        //      do this before populating form; population will repeat the original, as needed;
        //      assumption here is that if the original is required, then all repeats should be required, too;
        //      therefore, require the original before repeating it
        $('div#mos-form').find('.required').each(function() {
            $(this).SetFieldToRequired($(this).attr("id"));
        });

        // disable appropriate fields
        //      do this before populating form; population will repeat the original, as needed;
        //      assumption here is that if the original is disabled, then all repeats should be disabled, too;
        //      therefore, disable the original before repeating it
        $('div#mos-form').find('.disabled').each(function() {
            $(this).SetFieldToDisabled('#' + $(this).attr("id"));
        });

        // load select options, set datepickers on appropriate fields
        $.each(mData.elements, function(i, elem) {

            if (elem.controlType == "select") {
                if (typeof(elem.loadOptions) != "undefined") {
                    if (typeof(elem.restrictions) == "undefined") {
                        $("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions(elem.loadOptions);
                    } else {
                        $("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions(elem.loadOptions, elem.restrictions);
                    }
                }
            }
            if (elem.controlType == "datePicker") {
                // if this field is not readonly or disabled
                if (!($("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("readonly")) && !($("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("disabled"))) {
                    $("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).datepicker({
                        changeMonth: "true",
                        changeYear: "true",
                        dateFormat: "MM d, yy"
                    });
                }
            }
            if (elem.controlType == "datetime") {
                // if this field is not readonly or disabled
                if (!($("#date-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("readonly")) && !($("#date-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("disabled"))) {
                    $("#date-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).datepicker({
                        changeMonth: "true",
                        changeYear: "true",
                        dateFormat: "MM d, yy"
                    });
                }
            }
            if (elem.controlType == "datetime" || elem.controlType == "time") {
                if (typeof(elem.hoursRestrictions) == "undefined") {
                    $("#hours-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
                        listName: "Hours",
                        firstOptionText: "",
                        displayField: "Title",
                        valueField: "fy2v",
                        orderField: "Order",
                    });
                } else {
                    $("#hours-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
                        listName: "Hours",
                        firstOptionText: "",
                        displayField: "Title",
                        valueField: "fy2v",
                        orderField: "Order",
                        restrictions: elem.hoursRestrictions
                    });
                }
                if (typeof(elem.minutesRestrictions) == "undefined") {
                    $("#minutes-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
                        listName: "Minutes",
                        firstOptionText: "",
                        displayField: "Title",
                        valueField: "amky",
                        orderField: "Order"
                    });
                } else {
                    $("#minutes-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
                        listName: "Minutes",
                        firstOptionText: "",
                        displayField: "Title",
                        valueField: "amky",
                        orderField: "Order",
                        restrictions: elem.minutesRestrictions
                    });
                }
            }
        });



        // ========================================================
        // POPULATE FORM FIELDS & SCRIPT TAG
        // ========================================================



        // if request is not new, populate form fields with previously-submitted data
        //      and get approval node scripts

        var approvalNodeScripts = '';

        if (rData.requestStatus == "" && typeof(rData.defaultDataForNewRequests) != "undefined") {
            PopulateFormData("div#mos-form", rData.defaultDataForNewRequests, mData.uriRoot, rData.requestID);
        }

        if (rData.requestStatus != "") {

            // set stored object's data, if any
            if (typeof(rData.formData) != "undefined") {
                PopulateFormData("div#mos-form", rData.formData, mData.uriRoot, rData.requestID, mData.checkForAlternateEventDataToPopulate);
            }

            // set rData and mData values that are displayed to user
            $("input#Request-ID").val(rData.requestID);
            $("input#Request-Status").val(rData.requestStatus);
            $("a.link_admin-email").attr("href", "mailto:" + mData.adminEmailString);

            // set notification history rows, if any
            if (typeof($('textarea#Approval-Notification-Rows-Storage').val()) != "undefined") {
                $("table#table_approval-notification-history tbody").append($('textarea#Approval-Notification-Rows-Storage').val());
            }

            // get approval node scripts, if any
            if (typeof($('textarea#Approval-Nodes-Script-Storage').val()) != "undefined") {
                approvalNodeScripts += ReplaceAll("'", "", $('textarea#Approval-Nodes-Script-Storage').val());
            }

        }

        // if request is new
        if (rData.requestStatus == '') {

            // set current user's data as requester's data
            $('input#Requester-Name').val(uData.name);
            $('input#Requester-Department').val(uData.dept);
            $('input#Requester-Email').val(uData.email.toLowerCase());
            $('input#Requester-Phone').val(uData.phone);
            $('input#Requester-Account').val(uData.account);

            // if designated, set current user's dept as event dept
            if (typeof(mData.autoPopulateEventDeparment) != 'undefined' && mData.autoPopulateEventDeparment == 1) {
                $('input#Event-Department').val(uData.dept);
            }

            // set required approvers
            $("input#Required-Approvers").val(mData.requiredApproversString);

            // if alwaysTalkToRequester, populate and hide relevant fields
            if (typeof(mData.alwaysTalkToRequester) != 'undefined' && mData.alwaysTalkToRequester == 1) {
                $('option[value="Self"]').prop('selected', true);
                $().PutAddtlPeopleInPicker('Requested For', [{
                    'name': uData.name,
                    'email': uData.email,
                    'account': uData.account
                }]);
                $("div#label-and-control_Self-or-Other").hide("fast").addClass("hidden");
            }

        }

        // set "button" link href
        $("a.link_exit, a.link_exit-sans-save").attr("href", rData.returnURI);

        // set field values for developer's convenience and to record version numbers
        $("input#Last-Modified-Timestamp-at-Load").val(rData.lastModifiedAtLoad);
        $("input#Admin-Email").val(mData.adminEmailString);
        $("input#Request-Name").val(mData.requestName);
        $("input#Auto-Assignments-1").val(mData.autoAssignments1);
        $("input#Auto-Assignments-2").val(mData.autoAssignments2);
        $("input#URI-Admin").val(mData.uriAdmin);
        $("input#URI-Requester").val(mData.uriRequester);
        $("input#URI-Request").val(mData.uriRequest);
        if (rData.requestStatus == '') {
            $("input#SWF-Version").val(globalMOSSWFLatestVersion);
            $("input#Request-Version").val(mData.currentRequestVersion);
        }
        $("input#Component-Group-Admin").val(mData.componentGrpAdmin);
        $("input#Component-Admin").val(mData.componentAdmin);
        $("input#View-Access").val(mData.viewAccess);
        $("input#Current-User-Name").val(uData.userName);
        $('input#Current-User-Account').val(uData.Name);
        $("input#Current-User-is-Admin").val(uData.isAdmin);
        $("input#Current-User-is-Component-Group-Admin").val(uData.isComponentGrpAdmin);
        $("input#Component-ID").val(mData.componentID);
        
        // concatenate built and stored scripts and append inside script#mos-form-script
        $("script#mos-form-script").append('$( document ).ready(function() { \n\n' + customScriptFirst + '\n\n' + formScript + '\n\n' + approvalNodeScripts + '\n\n' + customScriptLast + '\n\n}); \n');



        // ========================================================
        // CLEAR FORM FIELDS
        // ========================================================



        $("input#Last-Modified-Timestamp-at-Submit").val();
        $("input#Last-Modified-Timestamp-Mismatch").val();
        $("select#Change-Request-Status").val();
        $("textarea#Admin-To-Requester-Message-Addendum").val();
        $("input#Approval-Newly-Needed-Notify").val("none");
        $("input#Approval-Not-Needed-Notify").val("none");
        $("input#Approval-Still-Needed-Notify").val("none");
        $("input#Newly-Approved-or-Pending").val(0);

        if (rData.requestStatus != "") {

            // clear stuff that's only for new requests
            $("input#Required-Approvers").val();
            $("input#Beginning-of-Life").val();

        }



        // ========================================================
        // FORMAT FORM
        // ========================================================

        // set friendly formats on date fields designated in mData.elements
        $.each(mData.elements, function(i, elem) {
            
            // if element needs its date value formatted on load
            if (typeof(elem.friendlyFormatOnLoad) != "undefined") {

                // determine the date field selector from the element's other properties
                var fieldSelector = "#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName));

                // if the field has a value
                if (typeof($(fieldSelector).val()) != "undefined" && $(fieldSelector).val() != "") {

                    // if the field is disabled or readonly
                    if (typeof($(fieldSelector).attr('disabled')) != "undefined" || typeof($(fieldSelector).attr('readonly')) != "undefined") {

                        // if this date needs to be re-stored in iso format
                        if (typeof(elem.isoFormatOnSubmit) != "undefined") {
                            // store the db-stored date in the markup
                            //      (it'll be re-used for db storage upon submit, in case 
                            //       friendly format doesn't include year)
                            $(fieldSelector).attr('data-iso-date-on-load', $(fieldSelector).val());
                        }
                    }
                    // get the formatted value using the field value and the properties of friendlyFormatOnLoad
                    $(fieldSelector).val($().ReturnFormattedDateTime($(fieldSelector).val(), elem.friendlyFormatOnLoad.incomingFormat, elem.friendlyFormatOnLoad.returnFormat, elem.friendlyFormatOnLoad.determineYearDisplayDynamically));

                }

            }

            // if element needs its date value formatted on load
            if (typeof(elem.setDateFromURLOnLoad) != "undefined") {

                // determine the date field selector from the element's other properties
                var fieldSelector = "#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName));

                // get the iso-formatted date from the URL
                var dateToSetISO = $().GetParamFromUrl(location.search, elem.setDateFromURLOnLoad.parameter);

                // get the date in friendly format (datepicker-matching format)
                var dateToSetSpecifiedFormat = $().ReturnFormattedDateTime(dateToSetISO, null, elem.setDateFromURLOnLoad.returnFormat, elem.setDateFromURLOnLoad.determineYearDisplayDynamically);

                // set the field
                $(fieldSelector).val(dateToSetSpecifiedFormat);

            }

        });

        // show approval notification history if it contains data
        if ($("table#table_approval-notification-history tbody tr").length) {
            $("div#approval-notification-history").show("fast").removeClass("hidden");
        }

        // show assignment date if it contains data
        if ($("input#Assignment-Date").val() != "") {
            $("div#label-and-control_Assignment-Date").show("fast").removeClass("hidden");
        }

        // show completion date if it contains data
        if ($("input#Completion-Date").val() != "") {
            $("div#label-and-control_Completion-Date").show("fast").removeClass("hidden");
        }

        // append approvalPreface, if appropriate
        if (typeof(mData.approvalPreface) != 'undefined') {
            $('div#swf-specific-approval-preface').html(mData.approvalPreface);
        }

        // enable approval radio buttons and notes for this user, as relevant
        if (rData.endOfLife != 1) {
            $('div[data-approver-email="' + uData.email.toLowerCase() + '"] input[name^="Approval-Indicator_"]').prop("disabled", false);
            $('div[data-approver-email="' + uData.email.toLowerCase() + '"] textarea[id^="Approval-Notes_"]').prop("disabled", false);
        }

        // if request is at end of life and there are no approval nodes, hide 'Approvals' header
        if (rData.endOfLife == 1 && $("div#all-approvals").children().length == 0) {
            $('h2#header_approvals').addClass('hidden');
        }

        // if there are no admin historical notes, hide the textarea
        //      (otherwise, it breaks up the vertical rhythm)
        if (typeof($('textarea#Historical-Admin-Notes').val()) == 'undefined') {
            $('div#label-and-control_Historical-Admin-Notes').addClass('hidden');
        } else if ($('textarea#Historical-Admin-Notes').val() == '') {
            $('div#label-and-control_Historical-Admin-Notes').addClass('hidden');
        }

        // if there are admin historical notes, resize the textarea to fit all of them
        if (typeof($('textarea#Historical-Admin-Notes').val()) != 'undefined' && $('textarea#Historical-Admin-Notes').val() != '') {
            $('textarea#Historical-Admin-Notes').height(0);
            $('textarea#Historical-Admin-Notes').height($('textarea#Historical-Admin-Notes')[0].scrollHeight);
        }

        // if RS = Completed, show completion info
        if (rData.requestStatus == "Completed") {
            $("div#completion").removeClass("hidden");
        }



        // ========================================================
        // APPEND, INITIALIZE CONTACT DIALOG
        // ========================================================

        // insert markup into container div
        $("div#all-content-container").append("<div id=\"persona-card-dialog\"></div>");

        $("div#persona-card-dialog").dialog({
            autoOpen: false,
            draggable: true,
            show: {
                effect: "bounce",
                times: 2,
                duration: 500
            },
            width: 400,
        });



        // ========================================================
        // BEGIN LISTENING FOR EVENTS
        // ========================================================



        // when user clicks link tester, open corresponding link in new tab
        $('a.link-tester').click(function() {
            window.open($(this).closest('div.control').find('input[type="url"]').val(), '_blank');
        });

        // when approved or disapproved, set signature and date
        $('input[name^="Approval-Indicator_"]').change(function() {
            $(this).closest('div.approver-container').find('input[id^="Approval-Signature_"]').val(uData.name).attr('value', uData.name);
            $(this).closest('div.approver-container').find('input[id^="Approval-Date_"]').val($().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY')).attr('value', $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY'));
        });

        // when user initiates an RS change, show / hide completion info
        // $("select#Change-Request-Status").change(function() {
        //    if ($("select#Change-Request-Status").val() == "Complete") {
        //          if (!$("div#completion").is(":visible")) {
        //               $("div#completion").show("fast").removeClass("hidden");
        //          }
            







        //    } else {
        //          if ($("div#completion").is(":visible")) {
        //               $("div#completion").hide("fast").addClass("hidden");
        //          }
        //    }
        //    if ($("select#Change-Request-Status").val() == "Approve") {
        //          if ($('div#assignment').length > 0 && !$("div#assignment").is(":visible")) {
        //               $("div#assignment").show("fast").removeClass("hidden");
        //               $().SetFieldToEnabled("#Assigned-To");
        //          }
        //    } else {
        //          if ($('div#assignment').length > 0 && $("div#assignment").is(":visible")) {
        //               $("div#assignment").hide("fast").addClass("hidden");
        //               $().SetFieldToDisabled("#Assigned-To");
        //          }
        //    }
        // });

        // when a radio button is clicked, set its "checked" attribute
        //      and remove that attribute from others with same name
        $("input[type='radio']").change(function() {

            // get this radio button's id
            var clickedID = $(this).attr("id");

            // get this radio button's name
            var clickedName = $(this).attr("name");

            // set "checked" attribute on this radio button
            $(this).attr("checked", true);

            // iterate over all other radio buttons with the same name
            $("input[name='" + clickedName + "']").each(function(i, sameName) {

                // if this radio button isn't the one that was clicked
                if ($(sameName).attr("id") != clickedID) {

                    // remove its "checked" attribute
                    $(sameName).removeAttr("checked");
                }
            });
        });

        // when a checkbox is clicked, set / remove its "checked" attribute
        $("input[type='checkbox']").change(function() {
            if ($(this).is(":checked")) {
                $(this).attr("checked", true);
            } else {
                $(this).removeAttr("checked");
            }
        });

        // when submit button is clicked, call $.fn.ProcessSubmission()
        $("input.button_submit").click(function() {
            $().ProcessSubmission();
        });

        // when a dismiss button is clicked, fade out its top-level, message-specific ancestor + the overlay container
        $("input.button_dismiss").click(function() {
            $('div#overlays-container').fadeOut(200);
            $(this).closest('div.mos-form-section.overlay').fadeOut(200);
        });

        // when resolved PeoplePicker entity is clicked, open the corresponding persona card
        $('div#all-content-container').on('click', 'span.ms-entity-resolved', function() {

            // close and empty

            $("div#persona-card-dialog").dialog("close");
            $("div[aria-describedby='persona-card-dialog'] div.ui-dialog-titlebar span.ui-dialog-title").empty();
            $("div#persona-card-dialog").empty();

            var userProfileValues = {};
            $().SPServices({
                operation: "GetUserProfileByName",
                async: false,
                AccountName: $(this).closest("span.sp-peoplepicker-userSpan").attr("sid"),
                completefunc: function(xData, Status) {
                    $(xData.responseXML).SPFilterNode("PropertyData").each(function() {
                        userProfileValues[$(this).find("Name").text()] = $(this).find("Value").text();
                    });
                }
            });

            console.log(userProfileValues);

            // create and insert header

            var dialogHeader = '<span id="persona-card-dialog-header"> \n' +
                '   <span id="avatar" \n';

            if (userProfileValues.PictureURL != "") {
                dialogHeader += '        style="background-image: url(\'' + userProfileValues.PictureURL + '\')"> \n';
            } else {
                userProfileValues.firstInitial = userProfileValues.FirstName.slice(0, 1).toUpperCase();
                userProfileValues.lastInitial = userProfileValues.LastName.slice(0, 1).toUpperCase();
                dialogHeader += '        ><span id="avatar-initials">' + userProfileValues.firstInitial + userProfileValues.lastInitial + '</span> \n';
            }

            dialogHeader += '   </span> \n' +
                '   <span id="name_title_department"> \n';

            if (typeof(userProfileValues.PreferredName) != 'undefined' && userProfileValues.PreferredName != '') {
                dialogHeader += '        <span id="name">' + userProfileValues.PreferredName + '</span> \n';
            }

            if (typeof(userProfileValues.Title) != 'undefined' && userProfileValues.Title != '') {
                dialogHeader += '        <span id="title">' + userProfileValues.Title + '</span> \n';
            }

            if (typeof(userProfileValues.Department) != 'undefined' && userProfileValues.Department != '') {
                dialogHeader += '        <span id="department">' + userProfileValues.Department + '</span> \n';
            }

            dialogHeader += '   </span> \n';

            $("div[aria-describedby=\'persona-card-dialog\'] div.ui-dialog-titlebar span.ui-dialog-title").append(dialogHeader);

            // create and insert body

            var dialogBody = '<ul id="persona-card-dialog-body"> \n';

            if (typeof(userProfileValues.WorkPhone) != 'undefined' && typeof(userProfileValues.CellPhone) != 'undefined' && userProfileValues.WorkPhone != '' && userProfileValues.CellPhone != '') {
                dialogBody += ' <li id="phone-numbers">\n' +
                    '        <ul>\n' +
                    '             <li id="business-phone-number">Business: ' + userProfileValues.WorkPhone + '</li> \n' +
                    '             <li id="mobile-phone-number">Mobile: ' + userProfileValues.CellPhone + '</li> \n' +
                    '        </ul>\n' +
                    '   </li> \n';
            } else if (typeof(userProfileValues.WorkPhone) != 'undefined' && userProfileValues.WorkPhone != '') {
                dialogBody += ' <li id="business-phone-number">Business: ' + userProfileValues.WorkPhone + '</li> \n';
            } else if (typeof(userProfileValues.WorkPhone) != 'undefined' && userProfileValues.WorkPhone != '') {
                dialogBody += ' <li id="mobile-phone-number">Mobile: ' + userProfileValues.CellPhone + '</li> \n';
            }

            if (typeof(userProfileValues.WorkEmail) != 'undefined' && userProfileValues.WorkEmail != '') {
                dialogBody += ' <li id="email"><a href="mailto:' + userProfileValues.WorkEmail + '">' + userProfileValues.WorkEmail + '</a></li> \n';
            }

            if (typeof(userProfileValues["SPS-PersonalSiteCapabilities"]) != 'undefined' && userProfileValues["SPS-PersonalSiteCapabilities"] != '') {
                dialogBody += ' <li id="profile"><a href="https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=' + userProfileValues["msOnline-ObjectId"] + '" target="_blank">Profile</a></li> \n';
            }

            dialogBody += '</ul> \n';

            $("div#persona-card-dialog").append(dialogBody);

            // position and open

            $("div#persona-card-dialog").dialog("option", "position", {
                my: "left bottom-20",
                of: this,
                collision: "fit"
            });
            $("div#persona-card-dialog").dialog("open");

        });

        $("input[id^='date-input_'], select[id^='hours-input_'], select[id^='minutes-input_']").on("change", function () {
            var container = $(this).closest("div.label-and-control");
            if ($(container).find("input[id^='date-input_']").length == 0) {
                var timeOnly = 1;
                var hoursID = $(container).find("select[id^='hours-input_']").attr("id");
                var minutesID = $(container).find("select[id^='minutes-input_']").attr("id");
                var storageID = $(container).find("input[id^='time-storage_']").attr("id");
            } else {
                var timeOnly = 0;
                var dateID = $(container).find("input[id^='date-input_']").attr("id");
                var hoursID = $(container).find("select[id^='hours-input_']").attr("id");
                var minutesID = $(container).find("select[id^='minutes-input_']").attr("id");
                var storageID = $(container).find("input[id^='datetime-storage_']").attr("id");
            }

            if (timeOnly == 1) {
                if ($("#" + hoursID).val().length > 0 && $("#" + minutesID).val().length > 0) {
                    $("#" + storageID).val($().ReturnISODateTimeFromParts({ "date": "January 01, 2000", "hour": $("#" + hoursID).val(), "minute": $("#" + minutesID).val() }));
                } else {
                    $("#" + storageID).val("");
                }
            } else {
                if ($("#" + dateID).val().length > 0 && $("#" + hoursID).val().length > 0 && $("#" + minutesID).val().length > 0) {
                    $("#" + storageID).val($().ReturnISODateTimeFromParts({ "date": $("#" + dateID).val(), "hour": $("#" + hoursID).val(), "minute": $("#" + minutesID).val() }));
                } else {
                    $("#" + storageID).val("");
                }
            }
        });



        // ========================================================
        // STORE SOME DATA GLOBALLY; PRESENT FORM TO USER
        // ========================================================



        globalMData = mData;
        globalRData = rData;
        globalUData = uData;

        $("div#mos-form").fadeTo(1000, 1);
    };



    $.fn.ProcessSubmission = function() {



        // ========================================================
        // SET UP VARS
        // ========================================================



        // assume submission to SWFList, if no other listName already in mData
        var mData = $.extend({}, {
            listName: "SWFList"
        }, globalMData);
        var rData = globalRData;
        var uData = globalUData;

        var NowAsFriendlyDateSansYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D');
        var NowAsFriendlyDateWithYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY');
        var NowAsFriendlyDateTimeSansYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D h:mm a');
        var NowAsFriendlyDateTimeWithYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY h:mm a');
        var NowAsISOLocal = $().ReturnFormattedDateTime('nowLocal', null, null);
        var NowAsISOUTC = $().ReturnFormattedDateTime('nowUTC', null, null);

        var beginningOfLife = 0;
        var endOfLife = 0;
        var endOfLifeIsNew = 0;
        rData.endOfLife = endOfLife;
        rData.endOfLifeIsNew = endOfLifeIsNew;



        // ========================================================
        // VALIDATE USER-ENTERED DATA, CONVERTED DATES, LAST MODIFICATION TIMESTAMP
        // ========================================================



        // validate user-entered data
        if ($("div#mos-form").ValidateForm() != false) {

            // get last modification date
            rData = $.extend(
                $().GetFieldsFromOneRow({
                    'listName': mData.listName,
                    'select': [{
                        'nameHere': 'lastModifiedAtSubmit',
                        'nameInList': 'Modified',
                    }],
                    "where": {
                        "field": "ID",
                        "type": "Number",
                        "value": rData.requestID,
                    }
                }), rData);

            rData.lastModifiedAtSubmit != rData.lastModifiedAtLoad ? rData.lastModMismatch = 1 : rData.lastModMismatch = 0;

            $("input#Last-Modified-Timestamp-at-Submit").val(rData.lastModifiedAtSubmit);
            $("input#Last-Modified-Timestamp-Mismatch").val(rData.lastModMismatch);

            if (rData.lastModMismatch == 1) {
                $('div#overlays-container').fadeIn(200);
                $('div#last-modified-mismatch').fadeIn(400);
            }

            if (rData.lastModMismatch == 0) {
                $('div#overlays-container').fadeIn(200);
                $('div#wait-while-working').fadeIn(400);



                // ========================================================
                // CONVERT FRIENDLY DATES TO ISO
                // ========================================================



                $.each(mData.elements, function(i, elem) {

                    // if element needs its date value formatted on SUBMIT
                    if (typeof(elem.isoFormatOnSubmit) != "undefined") {

                        // determine the date field selector from the element's other properties
                        var fieldsSelector = "[id^='" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)) + "']";

                        $(fieldsSelector).each(function() {

                            // if the field has a value
                            if (typeof($(this).val()) != "undefined" && $(this).val() != "") {
                                // if the field is not disabled and not readonly
                                if (typeof($(fieldsSelector).attr('disabled')) == "undefined" && typeof($(fieldsSelector).attr('readonly')) == "undefined") {
                                    // get the formatted value using the field value and the properties of friendlyFormatOnLoad
                                    $(this).val($().ReturnFormattedDateTime($(this).val(), elem.isoFormatOnSubmit.incomingFormat, elem.isoFormatOnSubmit.returnFormat, elem.isoFormatOnSubmit.determineYearDisplayDynamically));
                                    // if the field is disabled
                                } else {
                                    // just use the data value that was set on load
                                    $(this).val($(this).attr('data-iso-date-on-load'));
                                }
                            }
                        });
                    }
                });



                // ========================================================
                // SET, CLEAR NON-APPROVAL, NON-RS FIELDS
                // ========================================================



                // set / clear beginningOfLife
                rData.requestStatus == '' ? beginningOfLife = 1 : beginningOfLife = 0;

                // set field for SP Designer
                $("input#Beginning-of-Life").val(beginningOfLife);

                // set requested by and request date (only for new request)
                if (rData.requestStatus == '') {
                    $("input#Request-Date").val(NowAsISOUTC);

                    if (typeof(mData.autoPopulateRequestedBy) != 'undefined' && mData.autoPopulateRequestedBy == 1) {
                        $().PutAddtlPeopleInPicker('Requested By', [{
                            'name': uData.name,
                            'email': uData.email.toLowerCase(),
                            'account': uData.account
                        }]);
                    }
                }

                // append user machine data to history
                var pastUserMachineHistoryEntries = $("textarea#User-Machine-History").val();
                var newUserMachineHistoryEntry = NowAsFriendlyDateTimeWithYear + ' - ' + uData.browserFamilyAndVersion + ' - ' + uData.formFactor + ' - ' + uData.os;
                var allUserMachineHistory = newUserMachineHistoryEntry + " \r \r" + pastUserMachineHistoryEntries;
                $("textarea#User-Machine-History").val(allUserMachineHistory);

                // append any new admin notes to historical and then clear new
                var newNotes = $("textarea#New-Admin-Notes").val();

                if (typeof(newNotes) != "undefined" && newNotes.length > 0) {
                    var historicalNotes = $("textarea#Historical-Admin-Notes").val();
                    var userDisplayName = $().SPServices.SPGetCurrentUser({
                        fieldName: "Title"
                    });
                    var newConcatNote = NowAsFriendlyDateTimeWithYear + ' - ' + userDisplayName + ' - ' + newNotes;

                    if (historicalNotes.length > 0) {
                        var allNotes = newConcatNote + " \r \r" + historicalNotes;
                    } else {
                        var allNotes = newConcatNote;
                    }

                    $("textarea#Historical-Admin-Notes").val(allNotes);
                    $("textarea#New-Admin-Notes").val('');
                }

                // find out if we'll need to keep the exceptional event data we started with,
                //      and clear the relevant boolean field if it's populated
                var keepExceptionalEventOccurrences = 0;

                if (typeof(mData.autoTrackKeepingRemovingExceptionalEventOccurrences) != 'undefined') {
                    // if the user hasn't elected to change the recurrence pattern
                    if ($("#" + mData.autoTrackKeepingRemovingExceptionalEventOccurrences.relevantBooleanID).prop("checked") == false) {
                        // set flag to indicate that exceptional event data will need to be kept
                        keepExceptionalEventOccurrences = 1;
                        // if the user has elected to change the recurrence pattern
                    } else {
                        // don't change the flag, as we won't be keeping the exceptional event data
                        // uncheck the relevant boolean field so that it's clear when the form reloads
                        $("#" + mData.autoTrackKeepingRemovingExceptionalEventOccurrences.relevantBooleanID).prop("checked", false);
                        $("#" + mData.autoTrackKeepingRemovingExceptionalEventOccurrences.relevantBooleanID).removeAttr("checked");
                    }
                }



                // ========================================================
                // HANDLE ASSIGNMENTS (if appropriate)
                // ========================================================
                
                if (typeof(mData.autoAddAssigneesFromFields) != "undefined" && rData.endOfLife != 1) {
                    $.each(mData.autoAddAssigneesFromFields, function(i, conditionAndFieldsSet) {
                        if(conditionAndFieldsSet.condition()) {
                            $().AddAssigneesFromFields(conditionAndFieldsSet.fields);
                        }
                    });
                }

                if (typeof(mData.autoProcessAssignments) != "undefined" && rData.endOfLife != 1) {



                    // ============
                    // ---- 1. SET UP VARS
                    // ============

                    var workNewlyNeededArray = [];
                    var workNotNeededArray = [];

                    if (typeof($('input#Assigned-To_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Assigned-To_TopSpan_HiddenInput').val() == "") {
                        var assignedToNowInitialArray = [];
                    } else {
                        var assignedToNowInitialArray = JSON.parse($('input#Assigned-To_TopSpan_HiddenInput').val());
                    }
                    if (typeof($('input#Assigned-To-on-Load_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Assigned-To-on-Load_TopSpan_HiddenInput').val() == "") {
                        var assignedToOnLoadInitialArray = [];
                    } else {
                        var assignedToOnLoadInitialArray = JSON.parse($('input#Assigned-To-on-Load_TopSpan_HiddenInput').val());
                    }

                    var assignedToNowToAdd = [];

                    var workNewlyNeededNotificationString = 'none';
                    var workNewlyNotNeededNotificationString = 'none';

                    var assignmentHasChanged = 0;



                    // ============
                    // ---- 2. WORK NEWLY NEEDED / NOT NEEDED
                    // ============

                    // -- get work newly needed

                    // for each assigned to now
                    $.each(assignedToNowInitialArray, function(i, assignedToNow) {

                        // set flag indicating that this assigned to now IS NOT in assigned to on load
                        var assignedToNowInAssignedToOnLOad = 0;

                        // for each assigned to on load
                        $.each(assignedToOnLoadInitialArray, function(i, assignedToOnLoad) {

                            // if this assigned to on load matches this assigned to now
                            if (assignedToNow.Key == assignedToOnLoad.Key) {

                                // alter flag to indicate that this assigned to now IS in assigned to on load
                                assignedToNowInAssignedToOnLOad = 1;
                            }
                        });

                        // if flag still indicates that this assigned to now IS NOT in assigned to on load
                        if (assignedToNowInAssignedToOnLOad == 0) {

                            // add assigned to to approval newly needed
                            workNewlyNeededArray.push(assignedToNow);

                            // alter flag indicating that assignment has changed
                            assignmentHasChanged = 1;

                        }

                    });

                    // -- get work newly not needed

                    // for each assigned to on load
                    $.each(assignedToOnLoadInitialArray, function(i, assignedToOnLoad) {

                        // set flag indicating that this assigned to on load IS NOT in assigned to now
                        var assignedToOnLoadInAssignedToNow = 0;

                        // for each assigned to now
                        $.each(assignedToNowInitialArray, function(i, assignedToNow) {

                            // if this assigned to on load matches this assigned to now
                            if (assignedToOnLoad.Key == assignedToNow.Key) {

                                // alter flag to indicate that this assigned to on load IS in assigned to now
                                assignedToOnLoadInAssignedToNow = 1;
                            }

                        });

                        // if flag still indicates that this assigned to on load IS NOT in assigned to now
                        if (assignedToOnLoadInAssignedToNow == 0) {

                            // add assigned to to approval newly not needed
                            workNotNeededArray.push(assignedToOnLoad);

                            // alter flag indicating that assignment has changed
                            assignmentHasChanged = 1;

                        }

                    });



                    // ============
                    // ---- 3. NOTIFICATION STRINGS
                    // ============

                    // set up var
                    // Note: Leave initial values as 'none', rather than empty string, 
                    //      for SP Designer workflow. Setting the field to an empty string will result in 
                    //      SP Designer evaluating the field as not empty. What's here is easier than having 
                    //      SP Designer determine if the field is empty but is not set to an empty string.

                    // for each element in workNewlyNeededArray
                    $.each(workNewlyNeededArray, function(i, a) {

                        if (typeof(a.Key) != 'undefined') {

                            // clear 'none' on first iteration
                            if (workNewlyNeededNotificationString == 'none') {
                                workNewlyNeededNotificationString = '';
                            }

                            // if this isn't the first iteration, prepend upcoming concatenation with a semicolon
                            if (i != 0) {
                                workNewlyNeededNotificationString += ';';
                            }

                            // concatenate email address
                            workNewlyNeededNotificationString += a.Description.toLowerCase();
                        }
                    });

                    // for each element in workNotNeededArray
                    $.each(workNotNeededArray, function(i, a) {

                        if (typeof(a.Key) != 'undefined') {

                            // clear 'none' on first iteration
                            if (workNewlyNotNeededNotificationString == 'none') {
                                workNewlyNotNeededNotificationString = '';
                            }

                            // if this isn't the first iteration, prepend upcoming concatenation with a semicolon
                            if (i != 0) {
                                workNewlyNotNeededNotificationString += ';';
                            }

                            // concatenate email address
                            workNewlyNotNeededNotificationString += a.Description.toLowerCase();
                        }
                    });



                    // ============
                    // ---- 4. STORAGE
                    // ============

                    // store notification flag and strings for SP Designer workflow
                    $('input#Work-Newly-Needed-Notify').val(workNewlyNeededNotificationString);
                    $('input#Work-Not-Needed-Notify').val(workNewlyNotNeededNotificationString);
                    $('input#Newly-Assigned').val(assignmentHasChanged);

                    // clear assigned to on load and store assigned to now as assigned to on load for next load
                    $().ClearPeoplePicker("Assigned-To-on-Load_TopSpan");

                    // get keys of approvers now
                    $.each(assignedToNowInitialArray, function(i, a) {

                        assignedToNowToAdd.push({
                            'name': a.DisplayText,
                            'email': a.Description.toLowerCase(),
                            'account': a.Key
                        });
                    });

                    // add approvers now keys to approvers on load
                    $().PutAddtlPeopleInPicker('Assigned To on Load', assignedToNowToAdd);

                    // if assignment has changed
                    if (assignmentHasChanged == 1) {
                        // set new assignment date
                        $("input#Assignment-Date").val(NowAsISOLocal);
                    }

                } // END if (mData.autoProcessAssignments == 1 && rData.endOfLife != 1)



                // ========================================================
                // HANDLE REQUEST STATUS OUTSIDE OF STANDARD APPROVALS (if appropriate)
                // ========================================================



                if (mData.autoTrackSubmissionAndCancellation == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var beginningOfLife = 0;
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    if (rData.requestStatus == '') {
                        newReqStatus = 'Submitted';
                        beginningOfLife = 1;
                        console.log("m1");
                        console.log(newReqStatus);
                    } else if (rData.requestStatus == 'Submitted') {
                        if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
                            newReqStatus = 'Cancelled';
                            beginningOfLife = 0;
                            endOfLife = 1;
                            endOfLifeIsNew = 1;
                        }
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.beginningOfLife = beginningOfLife;
                    rData.requestStatus = newReqStatus;

                        console.log("m2");
                        console.log(rData.requestStatus);

                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#Beginning-of-Life').val(endOfLife);
                    $('input#End-of-Life').val(endOfLife);
                }

                if (mData.autoTrackSubmissionAndCompletionAndCancellation == 1 && rData.endOfLife != 1) {

                    var newReqStatus = '';
                    var beginningOfLife = 0;
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    if (rData.requestStatus == '') {
                        newReqStatus = 'Submitted';
                        beginningOfLife = 1;
                    } else if (rData.requestStatus == 'Submitted') {
                        if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
                            newReqStatus = 'Cancelled';
                            beginningOfLife = 0;
                            endOfLife = 1;
                            endOfLifeIsNew = 1;
                        } else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
                            newReqStatus = 'Completed';
                            beginningOfLife = 0;
                            endOfLife = 1;
                            endOfLifeIsNew = 1;
                        }
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.beginningOfLife = beginningOfLife;
                    rData.requestStatus = newReqStatus;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#Beginning-of-Life').val(endOfLife);
                    $('input#End-of-Life').val(endOfLife);

                }

                if (mData.autoTrackPendingAndApproval == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    if (rData.requestStatus == '') {
                        newReqStatus = 'Pending Approval';
                    } else if (rData.requestStatus == 'Pending Approval' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
                        newReqStatus = 'Cancelled';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
                        newReqStatus = 'Approved';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
                        newReqStatus = 'Disapproved';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.requestStatus = newReqStatus;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#End-of-Life').val(endOfLife);

                }

                if (mData.autoTrackPendingAndApprovalAndCompleted == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    if (rData.requestStatus == '') {
                        newReqStatus = 'Pending Approval';
                    } else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
                        newReqStatus = 'Approved';
                    } else if (($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
                        newReqStatus = 'Cancelled';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
                        newReqStatus = 'Disapproved';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if (rData.requestStatus == 'Approved' && $('select#Change-Request-Status option:selected').val() == 'Complete') {
                        newReqStatus = 'Completed';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.requestStatus = newReqStatus;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#End-of-Life').val(endOfLife);

                }

                if (mData.autoTrackContactChangeStatuses == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;

                    var nameChangeAndOther = $("input#change-types_name").is(":checked") && ($("input#change-types_address").is(":checked") || $("input#change-types_emergencycontact").is(":checked")) ? 1 : 0;
                    var nameChangeOnly = $("input#change-types_name").is(":checked") && (!$("input#change-types_address").is(":checked") && !$("input#change-types_emergencycontact").is(":checked")) ? 1 : 0;
                    var otherOnly = !$("input#change-types_name").is(":checked") && ($("input#change-types_address").is(":checked") || $("input#change-types_emergencycontact").is(":checked")) ? 1 : 0;

                    if (rData.requestStatus == '' && nameChangeOnly == 1) {
                        newReqStatus = 'Pending Approval';
                    } else if (rData.requestStatus == '' && nameChangeAndOther == 1) {
                        newReqStatus = 'Name Change Pending Approval; Other Work Approved';
                    } else if (rData.requestStatus == '' && otherOnly == 1) {
                        newReqStatus = 'Approved';
                    } else if ((rData.requestStatus == 'Pending Approval' || rData.requestStatus == 'Name Change Pending Approval; Other Work Approved') && $('select#Change-Request-Status option:selected').val() == 'Approve') {
                        newReqStatus = 'Approved';
                    } else if (($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
                        newReqStatus = 'Cancelled';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Disapprove') {
                        newReqStatus = 'Disapproved';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
                        newReqStatus = 'Completed';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.requestStatus = newReqStatus;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#End-of-Life').val(endOfLife);

                }

                if (mData.autoTrackPendingAndApprovalAndNoLongerNeeded == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    if (rData.requestStatus == '') {
                        newReqStatus = 'Pending Approval';
                    } else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
                        newReqStatus = 'Cancelled';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
                        newReqStatus = 'Approved';
                    } else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
                        newReqStatus = 'Disapproved';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'No Longer Needed') {
                        newReqStatus = 'No Longer Needed';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.requestStatus = newReqStatus;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#End-of-Life').val(endOfLife);

                }

                if (mData.autoTrackValidatorIssueAndReceipt == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    if (rData.requestStatus == '') {
                        newReqStatus = 'Pending Validator Pickup';
                    } else if (rData.requestStatus == 'Pending Validator Pickup' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
                        newReqStatus = 'Cancelled';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if (rData.requestStatus == 'Validator Picked Up' && $('select#Change-Request-Status option:selected').val() == 'Cancel') {
                        newReqStatus = 'Cancelled';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if (rData.requestStatus == 'Pending Validator Pickup' && $('select#Change-Request-Status option:selected').val() == 'Validator Picked Up') {
                        newReqStatus = 'Validator Picked Up';
                    } else if ((rData.requestStatus == 'Pending Validator Pickup' || rData.requestStatus == 'Validator Picked Up') && $('select#Change-Request-Status option:selected').val() == 'Complete') {
                        newReqStatus = 'Completed';
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.requestStatus = newReqStatus;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#End-of-Life').val(endOfLife);

                }

                if (mData.autoTrackPendingAndApprovalAndLoanAndReturn == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var beginningOfLife = 0;
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    if (rData.requestStatus == '' && $('select#Change-Request-Status option:selected').val() == '') {
                        newReqStatus = 'Pending Approval';
                        beginningOfLife = 1;
                    } else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
                        newReqStatus = 'Cancelled';
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Approve') {
                        newReqStatus = 'Approved';
                        beginningOfLife = 0;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Disapprove') {
                        newReqStatus = 'Disapproved';
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Loaned') {
                        newReqStatus = 'Loaned';
                        beginningOfLife = 0;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
                        newReqStatus = 'Completed';
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.beginningOfLife = beginningOfLife;
                    rData.requestStatus = newReqStatus;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#Beginning-of-Life').val(endOfLife);
                    $('input#End-of-Life').val(endOfLife);

                }

                if (mData.autoTrackPendingAndApprovalAndTextAndWeb == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var beginningOfLife = 1;
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    var reqStatusIsNew = 0;

                    if (rData.requestStatus == '' && $('select#Change-Request-Status option:selected').val() == '') {
                        newReqStatus = 'Pending Approval';
                        reqStatusIsNew = 1;
                    } else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
                        newReqStatus = 'Cancelled';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Approved') {
                        newReqStatus = 'Approved';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Disapproved') {
                        newReqStatus = 'Disapproved';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Text Edited') {
                        beginningOfLife = 0;
                        reqStatusIsNew = 1;
                        newReqStatus = 'Text Edited';
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Web Live') {
                        beginningOfLife = 0;
                        reqStatusIsNew = 1;
                        newReqStatus = 'Web Live';
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
                        newReqStatus = 'Completed';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.beginningOfLife = beginningOfLife;
                    rData.requestStatus = newReqStatus;
                    rData.reqStatusIsNew = reqStatusIsNew;
                    globalRData = rData;
                    $('input#Request-Status, input#Request-Status-Static').val(newReqStatus);
                    $('input#Point-Person-Static').val($('select#Point-Person'));
                    $('input#Beginning-of-Life').val(beginningOfLife);
                    $('input#End-of-Life').val(endOfLife);
                }

                if (mData.autoTrackCommisionAndInterpreterAndInvoice == 1 && rData.endOfLife != 1) {
                    var newReqStatus = '';
                    var beginningOfLife = 1;
                    var endOfLife = 0;
                    var endOfLifeIsNew = 0;
                    var reqStatusIsNew = 0;

                    if (rData.requestStatus == '' && $('select#Change-Request-Status option:selected').val() == '') {
                        newReqStatus = 'Pending Submission to Commission';
                        reqStatusIsNew = 1;
                    } else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
                        newReqStatus = 'Cancelled';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Submitted to Commission') {
                        newReqStatus = 'Submitted to Commission';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Interpreter Assigned') {
                        newReqStatus = 'Interpreter Assigned';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Invoice Received') {
                        newReqStatus = 'Invoice Received';
                        beginningOfLife = 0;
                        reqStatusIsNew = 1;
                    } else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
                        newReqStatus = 'Completed';
                        reqStatusIsNew = 1;
                        beginningOfLife = 0;
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                    }
                    rData.endOfLifeIsNew = endOfLifeIsNew;
                    rData.endOfLife = endOfLife;
                    rData.beginningOfLife = beginningOfLife;
                    rData.requestStatus = newReqStatus;
                    rData.reqStatusIsNew = reqStatusIsNew;
                    globalRData = rData;
                    $('input#Request-Status').val(newReqStatus);
                    $('input#Beginning-of-Life').val(endOfLife);
                    $('input#End-of-Life').val(endOfLife);
                }


                // ========================================================
                // ADD TO CALENDAR (if appropriate)
                // ========================================================



                if (typeof(mData.addToCalendarOnApproval) != 'undefined' && rData.requestStatus == 'Approved') {

                    // get requester's name for use in calendar item
                    rData.requesterName = $().ReturnUserDataFromPersonOrGroupFieldString(rData.requesterID)[0].name;

                    // set up value pairs for new calendar item
                    var calendarValuePairs = [
                        ['Title', rData.requesterName],
                        ['EventDate', $('input#datetime-storage_Beginning-Datetime').val()],
                        ['EndDate', $('input#datetime-storage_End-Datetime').val()],
                        ['Category', 'On Leave']
                    ];

                    // send value pairs to SPServices UpdateListItems to create a new item
                    $().SPServices({
                        operation: 'UpdateListItems',
                        listName: mData.addToCalendarOnApproval.calendarName,
                        webURL: mData.addToCalendarOnApproval.calendarWebURL,
                        batchCmd: 'New',
                        ID: 0,
                        valuepairs: calendarValuePairs,
                        completefunc: function(xData, Status) {
                            $().HandleListUpdateReturn(xData, Status, 'Hub Attachment Error');
                        }
                    });
                }


                // ========================================================
                // ADD LOCATION (to form field and to external list) (if appropriate)
                // ========================================================



                if (typeof(mData.autoAddLocationToList) != 'undefined' && $("#" + mData.autoAddLocationToList.relevantAdditionID).val() != '') {

                    var valueToAdd = $("#" + mData.autoAddLocationToList.relevantAdditionID).val();

                    // if valueToAdd really can't be found in the list (guarding against duplicates; 
                    //      if valueToAdd doesn't match the text (not value) of any of the relevant select's
                    //      options, then we'll know that valueToAdd isn't in the SP list, either;
                    //      if the index of the option containing valueToAdd (not with value = valueToAdd) is returned as 'undefined', 
                    //      then there is no option in the relevant select containing valueToAdd, in which case valueToAdd isn't in the SP list)
                    if (typeof($().ReturnOptionIndexByText($("#" + mData.autoAddLocationToList.relevantSelectID), valueToAdd)) == 'undefined') {

                        var listValuePairs = [
                            ['Title', valueToAdd]
                        ];

                        // send value pairs to SPServices UpdateListItems to create a new item
                        $().SPServices({
                            operation: 'UpdateListItems',
                            listName: mData.autoAddLocationToList.listName,
                            webURL: mData.autoAddLocationToList.listWebURL,
                            batchCmd: 'New',
                            ID: 0,
                            valuepairs: listValuePairs,
                            completefunc: function(xData, Status) {
                                $().HandleListUpdateReturn(xData, Status, 'Hub Location Addition Error');
                            }
                        });
                    }

                    // append an option containing text valueToAdd so that the appropriate select option can be found when form data is populated
                    $("#" + mData.autoAddLocationToList.relevantSelectID).append("<option selected='selected'>" + valueToAdd + "</option>");

                    // clear the fields indicating that a location is to be added, 
                    //      so that this process doesn't get repeated unnecessarily on subsequent submissions
                    $("#" + mData.autoAddLocationToList.relevantBooleanID).prop("checked", false);
                    $("#" + mData.autoAddLocationToList.relevantBooleanID).removeAttr("checked");
                    $("#" + mData.autoAddLocationToList.relevantAdditionID).val("");

                }



                // ========================================================
                // HANDLE APPROVERS (if appropriate)
                // ========================================================



                if (mData.autoProcessApprovals == 1 && rData.endOfLife != 1) {

                    // TERMINOLOGY
                    // ---- ** 'Approvers on Load' are any approvers that were already 
                    //           submitted and were thus in place when the form was loaded;
                    //           user does not have access to these
                    // ---- ** 'Approvers Now' are the set of approvers that the user can enter and 
                    //           delete to indicate who the approvers SHOULD be
                    // ---- ** 'Required Approvers' are the set of approvers stored in the Component Log
                    //           that must be added to every request of this type (every child/instance of the component)
                    // ---- ** 'Approval Newly Needed' are the set of approvers who have been added between 
                    //           loading and submitting - i.e., they are approvers now but not approvers on load
                    // ---- ** 'Approval Newly Not Needed' are the set of approvers who have been deleted between 
                    //           loading and submitting - i.e., they are approvers on load but not approvers now



                    // OVERVIEW
                    // ---- 1. SET UP VARS, RE-DISABLE APPROVAL NODES - Sending emails here will use the 
                    //           notification arrays. SP Designer will use the strings.
                    // ---- 2. REQUIRED APPROVERS - If the request is new and there are required approvers, then
                    //           make sure that the required approvers are in approvers now. (By doing this
                    //           only for new requests, we allow that someone may need to delete a required 
                    //           approver and not have it added back programatically - e.g., if the approver
                    //           is on vacation and a subsitute will be manually added in the approver's place.)
                    // ---- 3. APPROVAL NEWLY NEEDED / NOT NEEDED - For each approver now, determine which
                    //           are not in approvers on load. These approvals are newly needed (i.e., approval 
                    //           is needed but the person has not been notified). For each approver on load, 
                    //           determine which are not in approvers now. These approvals are newly not needed 
                    //           (i.e., approval is no longer needed but the person has not been notified).
                    // ---- 4. NODES, SCRIPTS, AND HISTORY ROWS - 
                    //           
                    //           
                    //           
                    //           
                    // ---- 5. APPROVAL STILL NEEDED
                    //           
                    //           
                    //           
                    //           
                    // ---- 6. INTERMEDIATE STORAGE
                    //           
                    //           
                    //           
                    //           
                    // ---- 7. SET REQUEST STATUS
                    //           
                    //           
                    //           
                    //           
                    // ---- 8. FINAL STORAGE - Some request status stuff depends on approval stuff and vice versa, 
                    //           so wait until the very end to store everything. Here, we're actually storing HTML
                    //           and JavaScript in textarea fields so that it goes into the database and can be 
                    //           re-rendered on the next load



                    // ============
                    // ---- 1. SET UP VARS, RE-DISABLE APPROVAL NODES
                    // ============

                    var approvalNewlyNeededArray = [];
                    var approvalNotNeededArray = [];

                    if (typeof($('input#Approvers_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Approvers_TopSpan_HiddenInput').val() == "") {
                        var approversNowInitialArray = [];
                    } else {
                        var approversNowInitialArray = JSON.parse($('input#Approvers_TopSpan_HiddenInput').val());
                    }
                    if (typeof($('input#Approvers-on-Load_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Approvers-on-Load_TopSpan_HiddenInput').val() == "") {
                        var approversOnLoadInitialArray = [];
                    } else {
                        var approversOnLoadInitialArray = JSON.parse($('input#Approvers-on-Load_TopSpan_HiddenInput').val());
                    }
                    var requiredApproversToAdd = [];
                    var approversNowToAdd = [];

                    var approvalNewlyNeededNotificationArray = [];
                    var approvalNewlyNotNeededNotificationArray = [];
                    var approvalStillNeededNotificationArray = [];

                    var approvalNewlyNeededNotificationString = 'none';
                    var approvalNewlyNotNeededNotificationString = 'none';
                    var approvalStillNeededNotificationString = 'none';

                    $('div[data-approver-email="' + uData.email.toLowerCase() + '"] input[name^="Approval-Indicator_"]').prop("disabled", true);
                    $('div[data-approver-email="' + uData.email.toLowerCase() + '"] textarea[id^="Approval-Notes_"]').prop("disabled", true);



                    // ============
                    // ---- 2. ENSURE REQUESTER IS NOT IN APPROVERS NOW
                    // ============

                    // set flag indicating that requester IS NOT in approvers now
                    var requesterInApproversNow = 0;
                    var approversNowToKeep = [];

                    // for each approver now
                    $.each(approversNowInitialArray, function(i, approverNow) {

                        // if this approver now matches the requester
                        if (approverNow.Key == $("#Requester-Account").val()) {
                            // alter flag to indicate that requester IS in approvers now
                            requesterInApproversNow = 1;
                            // as long as we're iterating over approvers now anyway....
                            // if this approver now does NOT match the requester
                        } else {
                            // add this approver now's data to approversNowToKeep
                            approversNowToKeep.push({
                                'name': approverNow.DisplayText,
                                'email': approverNow.Description.toLowerCase(),
                                'account': approverNow.Key
                            });
                        }
                    });

                    // if the requester is in approvers now
                    if (requesterInApproversNow == 1) {

                        // clear approvers now
                        $().ClearPeoplePicker("Approvers_TopSpan");

                        // add approversNowToKeep back to approvers now
                        $().PutAddtlPeopleInPicker('Approvers', approversNowToKeep);

                        // get approvers now again, now that requester has been eliminated from it
                        if ($('input#Approvers_TopSpan_HiddenInput').val() == "") {
                            var approversNowInitialArray = [];
                        } else {
                            var approversNowInitialArray = JSON.parse($('input#Approvers_TopSpan_HiddenInput').val());
                        }
                    }



                    // ============
                    // ---- 2. REQUIRED APPROVERS
                    // ============

                    // if there are required approvers and RS = ""
                    if (rData.requestStatus == '' && mData.requiredApproversArray.length != 0) {

                        // for each required approver
                        $.each(mData.requiredApproversArray, function(i, r) {

                            // set flag indicating that this required approver IS NOT in approvers now
                            var requiredApproverAlreadyAdded = 0;

                            // iterate over each approver now
                            $.each(approversNowInitialArray, function(i, approverNow) {

                                // if this approver now matches this required approver
                                if (r.account == approverNow.Key) {

                                    // alter flag to indicate that this required approver IS in approvers now
                                    requiredApproverAlreadyAdded = 1;
                                }
                            });

                            // if flag still indicates that this required approver IS NOT in approvers now
                            //      and this required approver is not the requester
                            if (requiredApproverAlreadyAdded == 0 && r.account != $("#Requester-Account").val()) {

                                // add this required approver's data to requiredApproversToAdd
                                requiredApproversToAdd.push({
                                    'name': r.name,
                                    'email': r.email.toLowerCase(),
                                    'account': r.account
                                });
                            }
                        });

                        // add required approvers to approvers now
                        $().PutAddtlPeopleInPicker('Approvers', requiredApproversToAdd);

                        // get approvers now again, now that required approvers have been added to it
                        if ($('input#Approvers_TopSpan_HiddenInput').val() == "") {
                            var approversNowInitialArray = [];
                        } else {
                            var approversNowInitialArray = JSON.parse($('input#Approvers_TopSpan_HiddenInput').val());
                        }
                    }


                    // ============
                    // ---- 3. APPROVAL NEWLY NEEDED / NOT NEEDED
                    // ============

                    // -- get approvals newly needed

                    // for each approver now
                    $.each(approversNowInitialArray, function(i, approverNow) {

                        // set flag indicating that this approver now IS NOT in approvers on load
                        var approverNowInApproverOnLoad = 0;

                        // for each approver on load
                        $.each(approversOnLoadInitialArray, function(i, approverOnLoad) {

                            // if this approver on load matches this approver now
                            if (approverNow.Key == approverOnLoad.Key) {

                                // alter flag to indicate that this approver now IS in approvers on load
                                approverNowInApproverOnLoad = 1;
                            }
                        });

                        // if flag still indicates that this approver now IS NOT in approvers on load
                        if (approverNowInApproverOnLoad == 0) {

                            // add approver to approval newly needed
                            approvalNewlyNeededArray.push(approverNow);

                        }

                    });

                    // -- get approvals newly not needed

                    // for each approver on load
                    $.each(approversOnLoadInitialArray, function(i, approverOnLoad) {

                        // set flag indicating that this approver on load IS NOT in approvers now
                        var approverOnLoadInApproverNow = 0;

                        // for each approver on load
                        $.each(approversNowInitialArray, function(i, approverNow) {

                            // if this approver on load matches this approver now
                            if (approverOnLoad.Key == approverNow.Key) {

                                // alter flag to indicate that this approver on load IS in approvers now
                                approverOnLoadInApproverNow = 1;
                            }

                        });

                        // if flag still indicates that this approver on load IS NOT in approvers now
                        if (approverOnLoadInApproverNow == 0) {

                            // add approver to approval newly not needed
                            approvalNotNeededArray.push(approverOnLoad);

                        }

                    });



                    // ============
                    // ---- 4. NODES, SCRIPTS, AND HISTORY ROWS
                    // ============

                    // -- approval newly needed

                    // set up vars
                    var newNodes = '';
                    var newNodesScripts = '';
                    var newNotificationTableRows = '';

                    // build and append approval nodes, scripts, and notification history table rows
                    $.each(approvalNewlyNeededArray, function(i, a) {
                        newNodes += $().ReturnApprovalNode(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll("'", "", ReplaceAll(" ", "-", a.DisplayText))), a.Description.toLowerCase());
                        newNodesScripts += $().ReturnApprovalNodeScript(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll(" ", "-", a.DisplayText)), NowAsFriendlyDateSansYear);
                        newNotificationTableRows += $().ReturnNotificationHistoryRow(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll(" ", "-", a.DisplayText)), NowAsISOLocal, NowAsFriendlyDateTimeWithYear, "Needed");
                    });
                    $('div#all-approvals').append(newNodes);
                    $('table#table_approval-notification-history tbody').append(newNotificationTableRows);

                    // -- approval newly not needed

                    // reset var
                    newNotificationTableRows = '';

                    // remove approval nodes, add notification history table rows
                    $.each(approvalNotNeededArray, function(i, a) {
                        $('div[data-approver-email="' + a.Description.toLowerCase() + '"]').remove();
                        newNotificationTableRows += $().ReturnNotificationHistoryRow(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll(" ", "-", a.DisplayText)), NowAsISOLocal, NowAsFriendlyDateTimeWithYear, "Not Needed");
                    });
                    $('table#table_approval-notification-history tbody').append(newNotificationTableRows);



                    // ============
                    // ---- 5. NOTIFICATION STRINGS (& ONE ARRAY)
                    // ============

                    // set up var
                    // Note: Leave initial values as 'none', rather than empty string, 
                    //      for SP Designer workflow. Setting the field to an empty string will result in 
                    //      SP Designer evaluating the field as not empty. What's here is easier than having 
                    //      SP Designer determine if the field is empty but is not set to an empty string, which
                    //      is the only other option for "clearing" previously-set values.

                    // for each approval node with an empty approval status
                    $.each(approvalNewlyNeededArray, function(i, a) {

                        if (typeof(a.Key) != 'undefined') {

                            // clear 'none' on first iteration
                            if (approvalNewlyNeededNotificationString == 'none') {
                                approvalNewlyNeededNotificationString = '';
                            }

                            // if this isn't the first iteration, prepend upcoming concatenation with a semicolon
                            if (i != 0) {
                                approvalNewlyNeededNotificationString += ';';
                            }

                            // concatenate email address
                            approvalNewlyNeededNotificationString += a.Description.toLowerCase();
                        }
                    });

                    // for each approval node with an empty approval status
                    $.each(approvalNotNeededArray, function(i, a) {

                        if (typeof(a.Key) != 'undefined') {

                            // clear 'none' on first iteration
                            if (approvalNewlyNotNeededNotificationString == 'none') {
                                approvalNewlyNotNeededNotificationString = '';
                            }

                            // if this isn't the first iteration, prepend upcoming concatenation with a semicolon
                            if (i != 0) {
                                approvalNewlyNotNeededNotificationString += ';';
                            }

                            // concatenate email address
                            approvalNewlyNotNeededNotificationString += a.Description.toLowerCase();
                        }
                    });

                    // for each approval node with an empty approval status
                    $('div[data-approval-status=""]').each(function(i, d) {

                        // clear 'none' on first iteration
                        if (approvalStillNeededNotificationString == 'none') {
                            approvalStillNeededNotificationString = '';
                        }

                        // if this isn't the first iteration, prepend upcoming concatenation with a semicolon
                        if (i != 0) {
                            approvalStillNeededNotificationString += ';';
                        }

                        // concatenate email address to string
                        approvalStillNeededNotificationString += $(d).attr("data-approver-email");

                        // push email address to array
                        approvalStillNeededNotificationArray.push({
                            'Description': $(d).attr("data-approver-email")
                        });

                    });



                    // ============
                    // ---- 6. INTERMEDIATE STORAGE
                    // ============

                    // store notification strings for SP Designer workflow
                    $('input#Approval-Newly-Needed-Notify').val(approvalNewlyNeededNotificationString);
                    $('input#Approval-Not-Needed-Notify').val(approvalNewlyNotNeededNotificationString);
                    $('input#Approval-Still-Needed-Notify').val(approvalStillNeededNotificationString);

                    // clear approvers on load and store approvers now as approvers on load for next load
                    $().ClearPeoplePicker("Approvers-on-Load_TopSpan");

                    // get keys of approvers now
                    $.each(approversNowInitialArray, function(i, a) {
                        // add this approver now's account (key) to approversNowToAdd
                        approversNowToAdd.push({
                            'name': a.DisplayText,
                            'email': a.Description.toLowerCase(),
                            'account': a.Key
                        });
                    });

                    // add approvers now keys to approvers on load
                    $().PutAddtlPeopleInPicker('Approvers on Load', approversNowToAdd);


                    // ============
                    // ---- 7. SET REQUEST STATUS
                    // ============

                    // set up vars
                    var newReqStatus = '';
                    var someApprovalNodesAreBlank = 0;
                    var someApprovalNodesAreDisapproved = 0;
                    var statusChangeRequester = $('input#requester-cancellation_cancel:checked').length > 0 ? "Cancel" : "";
                    var statusChangeAdmin = $('select#Change-Request-Status').val();
                    var newlyApprOrPending = 0;
                    var statusChange = "";
                    if (statusChangeRequester == "Cancel" || statusChangeAdmin == "Cancel") {
                        statusChange = "Cancel";
                    } else if (statusChangeAdmin == "Complete") {
                        statusChange = "Complete";
                    }

                    // alter flags from their defaults if there are disapproved or blank approval nodes
                    $('div.approver-container').each(function(i, a) {
                        var approvalButtonChecked = 0;
                        var disapprovalButtonChecked = 0;

                        if ($(this).find('input[value="approve"]').is(':checked')) {
                            approvalButtonChecked = 1;
                        }
                        if ($(this).find('input[value="disapprove"]').is(':checked')) {
                            disapprovalButtonChecked = 1;
                        }

                        if (approvalButtonChecked == 0 && disapprovalButtonChecked == 0) {
                            someApprovalNodesAreBlank = 1;
                        }
                        if (disapprovalButtonChecked == 1) {
                            someApprovalNodesAreDisapproved = 1;
                        }

                    });

                    // set RS to pending approval upon new submission
                    if (rData.requestStatus == '') {
                        newReqStatus = 'Pending Approval';
                    }

                    // set RS to Approved
                    if (rData.requestStatus == "" || rData.requestStatus == "Pending Approval") {
                        if (someApprovalNodesAreDisapproved == 0 && someApprovalNodesAreBlank == 0) {
                            newReqStatus = 'Approved';
                            if (rData.requestStatus != 'Approved') {
                                newlyApprOrPending = 1;
                            }
                        }
                    }

                    // revert RS to Pending Approval
                    if (rData.requestStatus == "Approved" && someApprovalNodesAreBlank == 1) {
                        newReqStatus = 'Pending Approval';
                        newlyApprOrPending = 1;
                    }

                    // set RS to Completed
                    if (statusChange == "Complete") {
                        newReqStatus = 'Completed';
                    }

                    // set RS to Cancelled
                    if (statusChange == "Cancel") {
                        newReqStatus = 'Cancelled';
                    }

                    // set RS to Disapproved
                    if (someApprovalNodesAreDisapproved == 1) {
                        newReqStatus = 'Disapproved';
                    }

                    // set End of Life
                    if (newReqStatus == 'Completed' || newReqStatus == 'Cancelled' || newReqStatus == 'Disapproved') {
                        endOfLife = 1;
                        endOfLifeIsNew = 1;
                        rData.endOfLife = endOfLife;
                        rData.endOfLifeIsNew = endOfLifeIsNew;
                    }

                    // if we're at end of life, disable all approval stuff
                    if (endOfLife == 1) {
                        $('input[name^="Approval-Indicator_"]').prop("disabled", true);
                        $('textarea[id^="Approval-Notes_"]').prop("disabled", true);
                    }

                    // ============
                    // ---- 8. FINAL STORAGE
                    // ============


                    if (newReqStatus != '') {
                        $('input#Request-Status').val(newReqStatus);
                        $('input#End-of-Life').val(endOfLife);
                    }

                    $('input#Newly-Approved-or-Pending').val(newlyApprOrPending);
                    if (newReqStatus == 'Completed' && $("input#Completion-Date").val() == "") {
                        $("input#Completion-Date").val(NowAsISOLocal);
                    }

                    $('textarea#Approval-Nodes-Storage').val($('div#all-approvals').html());

                    var allNodesScripts = $('textarea#Approval-Nodes-Script-Storage').val() + newNodesScripts;
                    $('textarea#Approval-Nodes-Script-Storage').val(allNodesScripts);

                    $('textarea#Approval-Notification-Rows-Storage').val($('table#table_approval-notification-history tbody').html());

                    rData.requestStatus = newReqStatus;

                    globalMData = mData;
                    globalRData = rData;
                    globalUData = uData;
                } // END if (mData.autoProcessApprovals == 1 && rData.endOfLife != 1)



                // ========================================================
                // SET COMPLETION DATE (if needed)
                // ========================================================



                if (typeof(mData.autoDateCompletion) != 'undefined' && mData.autoDateCompletion == 1) {
                    if (globalRData.requestStatus == 'Completed' && $('input#Completion-Date').val() == '') {
                        $('input#Completion-Date').val(NowAsISOLocal);
                    }
                }



                // ========================================================
                // MODIFY CONFIRMATION MESSAGE (if needed)
                // ========================================================



                // if this is a new request and a newRequestConfirmationAddition has been provided
                if (rData.requestID == '' && typeof(mData.newRequestConfirmationAddition) != "undefined") {
                    // insert it into its container
                    $('div#mos-form-submission-confirmation-additional-message').append(mData.newRequestConfirmationAddition);
                    // add class to container's container for styling hook
                    $('div#mos-form-submission-confirmation').addClass('contains-additional-message');
                }

                // if this is a new request and a newRequestConditionalConfirmationAdditions have been provided
                if (rData.requestID == '' && typeof(mData.newRequestConditionalConfirmationAdditions) != "undefined") {

                    var additionalMessageContent = '';

                    $.each(mData.newRequestConditionalConfirmationAdditions, function(i, a) {
                        if (a.condition()) {
                            additionalMessageContent += a.addition;
                        }
                    });

                    // insert additionalMessageContent into its container
                    $('div#mos-form-submission-confirmation-additional-message').append(additionalMessageContent);

                    // add class to container's container for styling hook
                    if (additionalMessageContent != '') {
                        $('div#mos-form-submission-confirmation').addClass('contains-additional-message');
                    }
                }



                // ========================================================
                // SAVE LIST ITEM, ATTACHMENTS & PROCESS NOTIFICATION, ERROR EMAILS
                // ========================================================

                // get clones of the form
                var clonedForm = $("div#mos-form").clone();
                var clonedFormTwo = $("div#mos-form").clone();

                // set valuePairs to new array
                globalSubmissionValuePairs = new Array();

                // if not bypassing normal data saving
                if (typeof(mData.bypassNormalDataSaving) == 'undefined' || mData.bypassNormalDataSaving == 0) {

                    // start building the JSON string that will be stored
                    var formDataString = '{';

                    // handle the repeatables
                    formDataString += '"RepeatedElements": [';
                    $(clonedForm).find('[data-repeatable]').each(function() {
                        var repeatableString = '{"ID": "' + $(this).attr('id') + '",';
                        repeatableString += '"OriginalToRepeat": "' + $(this).attr('data-original-to-repeat') + '",';
                        repeatableString += BuildAllRequestDataObject(this);
                        repeatableString += '},';
                        formDataString += repeatableString;
                        $(this).remove();
                    });
                    formDataString += '],';

                    // handle the non-repeatables
                    formDataString += BuildAllRequestDataObject(clonedForm);

                    // end building the JSON string that will be stored
                    formDataString += '}';

                    // replace special characters
                    formDataString = formDataString.replace(/,(?=[^,]*$)/, '');
                }

                // if augmenting the AllRequestData object with some of the form data as an exceptional occurrence
                if (typeof(mData.augmentDataWithExceptionalEventOccurrence) != 'undefined' && mData.augmentDataWithExceptionalEventOccurrence == 1) {
                    var formDataString = ReturnAllRequestDataObjectAugmentedWithExceptionalEventOccurrence(clonedForm, rData.formData);
                }

                // if keeping exceptional occurrence data; i.e., so that non-date data can be edited for an event series without losing the exceptions
                if (keepExceptionalEventOccurrences == 1) {
                    var formDataString = ReturnAllRequestDataObjectWithExceptionalEventOccurrences(formDataString, rData.formData);
                }

                // push the string to valuePairs
                globalSubmissionValuePairs.push(["AllRequestData", CDataWrap(formDataString)]);

                // send value pairs to the list (create or update list item)
                if (globalRData.requestID != undefined && globalRData.requestID != 0) {
                    var batchCommand = 'Update';
                    var ID = globalRData.requestID;
                } else {
                    var batchCommand = 'New';
                    var ID = 0;
                }

                $().SPServices({
                    operation: 'UpdateListItems',
                    listName: mData.listName,
                    batchCmd: batchCommand,
                    ID: ID,
                    valuepairs: globalSubmissionValuePairs,
                    completefunc: function(xData, Status) {

                        // determine success of save; then...
                        var swfListSaveSuccess = $().HandleListUpdateReturn(xData, Status, 'Hub SWF List Item Error');

                        // if swfList save was NOT successful
                        if (swfListSaveSuccess == 0) {

                            // send error emails from queue, then...
                            $().SendEmails(globalErrorEmailsToSend).then(function() {
                                // display messages
                                $('div#wait-while-working').fadeOut(200);
                                if (batchCommand == 'New') {
                                    $('div#swfList-error_new-request').fadeIn(200);
                                } else {
                                    $('div#swfList-error_updated-request').fadeIn(200);
                                }
                            });

                        // if swfList save was successful
                        } else if (swfListSaveSuccess == 1) {

                            // save requestID in globalRData
                            globalRData.requestID = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");


                            // -- process notifications


                            // create promise to process any needed notifications
                            var notificationProcessingPromise = new $.Deferred();

                            // if notifications is NOT set to 1
                            if (typeof(mData.notifications) == "undefined" || mData.notifications != 1) {

                                notificationProcessingPromise.resolve();

                                // if notifications is set to 1
                            } else if (mData.notifications == 1) {

                                // if processing standard notifications
                                if (typeof(mData.standardChangeNotifications) != "undefined") {
                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
                                        // pass sData to ProcessStandardChangeNotifications
                                        $().ProcessStandardChangeNotifications({
                                            'newlyApprOrPending': newlyApprOrPending,
                                            'approvalNewlyNeededNotificationString': approvalNewlyNeededNotificationString,
                                            'approvalNewlyNeededArray': approvalNewlyNeededArray,
                                            'approvalNewlyNotNeededNotificationString': approvalNewlyNotNeededNotificationString,
                                            'approvalNotNeededArray': approvalNotNeededArray,
                                            'approvalStillNeededNotificationString': approvalStillNeededNotificationString,
                                            'approvalStillNeededNotificationArray': approvalStillNeededNotificationArray,
                                            'assignmentHasChanged': assignmentHasChanged,
                                            'workNewlyNeededNotificationString': workNewlyNeededNotificationString,
                                            'workNewlyNeededArray': workNewlyNeededArray,
                                            'workNewlyNotNeededNotificationString': workNewlyNotNeededNotificationString,
                                            'workNotNeededArray': workNotNeededArray,
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife

                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing super simple notifications
                                if (typeof(mData.superSimpleChangeNotifications) != "undefined") {
                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
                                        // pass sData to ProcessSuperSimpleChangeNotifications
                                        $().ProcessSuperSimpleChangeNotifications({
                                            'assignmentHasChanged': assignmentHasChanged,
                                            // 'workNewlyNeededNotificationString': workNewlyNeededNotificationString,
                                            'workNewlyNeededArray': workNewlyNeededArray,
                                            // 'workNewlyNotNeededNotificationString': workNewlyNotNeededNotificationString,
                                            'workNotNeededArray': workNotNeededArray,
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife
                                        
                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing event space notifications
                                if (typeof(mData.eventSpaceNotifications) != "undefined") {
                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
                                        // pass sData to ProcessEventSpaceNotifications
                                        $().ProcessEventSpaceNotifications({
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife
                                        
                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing promo request notifications
                                if (typeof(mData.promoReqNotifications) != "undefined") {

                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

                                        // pass sData to ProcessPromoReqNotifications
                                        $().ProcessPromoReqNotifications({
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife

                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing interpreter request notifications
                                if (typeof(mData.interpreterReqNotifications) != "undefined") {

                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

                                        // pass sData to ProcessPromoReqNotifications
                                        $().ProcessInterpreterReqNotifications({
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife

                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing mc project request notifications
                                if (typeof(mData.mcProjectReqNotifications) != "undefined") {

                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

                                        // pass sData to ProcessPromoReqNotifications
                                        $().ProcessMCProjectReqNotifications({
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife

                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing photo request notifications
                                if (typeof(mData.photoReqNotifications) != "undefined") {

                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

                                        // pass sData to ProcessPromoReqNotifications
                                        $().ProcessPhotoReqNotifications({
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife

                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing logo request notifications
                                if (typeof(mData.logoReqNotifications) != "undefined") {

                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

                                        // pass sData to ProcessPromoReqNotifications
                                        $().ProcessLogoReqNotifications({
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife

                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                                // if processing function space request notifications
                                if (typeof(mData.functionSpaceReqNotifications) != "undefined") {

                                    // if NOT just saving an allowed change after EOL has already been reached
                                    if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

                                        // pass sData to ProcessPromoReqNotifications
                                        $().ProcessFunctionSpaceReqNotifications({
                                            'beginningOfLife': beginningOfLife,
                                            'endOfLife': endOfLife

                                        // only when that's done
                                        }).then(function() {
                                            // resolve promise to process any needed notifications
                                            notificationProcessingPromise.resolve();
                                        });
                                    }
                                }

                            }



                            // -- process attachments


                            // create promise to process any attachments
                            var attachmentProcessingPromise = new $.Deferred();

                            // set up vars
                            var attachmentsToAttemptCounter = 0;
                            var attachmentsAttemptedCounter = 0;
                            var attachmentErrorCounter = 0;
                            var attachments = $(clonedFormTwo).find('input[type="file"]');

                            attachments.each(function() {
                                if (typeof(($(this))[0].files[0]) != 'undefined') {
                                    attachmentsToAttemptCounter++;
                                    $().CreateWFHistoryItem('Attachment Needed -- ' + ($(this))[0].files[0].name);
                                }
                            });

                            if (attachmentsToAttemptCounter <= 0) {
                                // resolve promise to process any attachments
                                attachmentProcessingPromise.resolve();
                            } else if (attachmentsToAttemptCounter > 0) {

                                // for each file input
                                attachments.each(function() {

                                    // try to get a file
                                    var file = ($(this))[0].files[0];

                                    // if got a file
                                    if (typeof(file) != 'undefined') {
                                        ReturnFileBufferDeferredPromise(file).then(function(buffer) {
                                            var binary = '';
                                            var bytes = new Uint8Array(buffer);
                                            var i = bytes.byteLength;

                                            while (i--) {
                                                binary = String.fromCharCode(bytes[i]) + binary;
                                            }

                                            setTimeout(function() {
                                                $().SPServices({
                                                    operation: 'AddAttachment',
                                                    listName: mData.listName,
                                                    listItemID: globalRData.requestID,
                                                    fileName: file.name,
                                                    attachment: btoa(binary),
                                                    completefunc: function(xData, Status) {

                                                        // record that an attempt was made
                                                        attachmentsAttemptedCounter++;
                                                        $().CreateWFHistoryItem('Attachment Attempted -- ' + file.name);

                                                        // record the attempt's result
                                                        var attachmentSaveSuccess = $().HandleListUpdateReturn(xData, Status, 'Hub Attachment Error');

                                                        // record an error, if one occurred
                                                        if (attachmentSaveSuccess != 1) {
                                                            attachmentErrorCounter++;
                                                            $().CreateWFHistoryItem('Attachment Error -- ' + file.name);
                                                        } else {
                                                            $().CreateWFHistoryItem('Attachment Success -- ' + file.name);
                                                        }

                                                        // if the number of attempts equals the number of attachments to attempt (all attempts are completed)
                                                        if (attachmentsAttemptedCounter == attachmentsToAttemptCounter) {
                                                            // resolve promise to process any attachments
                                                            attachmentProcessingPromise.resolve();
                                                        }
                                                    }
                                                });
                                            }, 750);
                                        });
                                    }
                                });
                            }

                            // when attachments and notifications have been processed
                            $.when(notificationProcessingPromise, attachmentProcessingPromise).done(function() {

                                // if there were no attachment errors
                                if (attachmentErrorCounter == 0) {
                                    // display confirmation
                                    $('div#wait-while-working').fadeOut(200);
                                    $('div#mos-form-submission-confirmation').fadeIn(200);
                                } else {

                                    // send error emails from queue, then...
                                    $().SendEmails(globalErrorEmailsToSend).then(function() {
                                        // display messages
                                        console.log('attachmentErrorCounter != 0');
                                        $('div#wait-while-working').fadeOut(200);
                                        $('div#attachment-error').fadeIn(200);
                                    });

                                }
                            });
                        }
                    }
                });

            } // END if (rData.lastModMismatch == 0)

            // if form data is not valid
        } else {
            $('div#overlays-container').fadeIn(200);
            $("#mos-form-data-errors").fadeIn(400);
        }

    }



    // ---- INITIALIZE PAGES



    $.fn.ReturnNoViewPermissionMessage = function() {
        return '<div id="mos-form-no-view-permission" class="mos-form-section overlay"> \n' +
            '    <div class="section-content hidden"> \n' +
            '         <p><span class="urgent">Uh-oh!</span> You don\'t have permission to view this.</p> \n' +
            '         <a class="link_exit" href="https://bmos.sharepoint.com">Exit</a> \n' +
            '    </div> \n' +
            '</div> \n' +
            ' \n' +
            ' \n';

    }



    $.fn.InitializeHomePage = function() {

        var mData = { "componentGroupID": 3 };

        var uData = $().ReturnCurrentUserData();
        uData.isComponentGrpAdmin = $().UserIsComponentGrpAdmin(uData, mData.componentGroupID);

        mData = $.extend(
            $().GetFieldsFromOneRow({
                "listName": "Component Group Log",
                "select": [{
                    "nameHere": "componentGrpAdmin",
                    "nameInList": "GroupAdminAccess"
                }],
                "where": {
                    "field": "ComponentGroupID",
                    "type": "Number",
                    "value": mData.componentGroupID,
                }
            }),
            mData
        );

        if (uData.isComponentGrpAdmin == 0) {

            // define redirect message
            var redirectMessage = '<div id="overlays-container"> \n ' +
                '   <div class="mos-form-section overlay" id="mos-form-redirecting"> \n ' +
                '       <div class="section-content hidden"> \n ' +
                '           <p>This page intentionally left blank.</p> \n ' +
                '            <p>Redirecting you now.</p> \n ' +
                '            <img src="https://bmos.sharepoint.com/sites/hubprod/Asset%20Library/waiting_horizontally-sliding-circles.gif" alt="" /> \n' +
                '       </div>\n ' +
                '   </div>\n ' +
                '</div>\n ';

            // append redirect message to all content container and fade in
            $('div#all-content-container').append(redirectMessage);
            $('div#overlays-container').fadeIn(200);
            $('div#mos-form-redirecting').fadeIn(400);

            // redirect
            window.location = "https://bmos.sharepoint.com/";
        }
    }



    $.fn.InitializeAdminPage = function(mData, tData, bData) {

        $('div#overlays-container').append($().ReturnNoViewPermissionMessage());

        mData.componentGroupID = 3;

        mData = $.extend(
            $().GetFieldsFromOneRow({
                "listName": "ComponentLog",
                "select": [{
                    "nameHere": "uriAdmin",
                    "nameInList": "URIAdmin",
                    "linkField": 1
                }, {
                    "nameHere": "uriRequest",
                    "nameInList": "URIRequest",
                    "linkField": 1
                }, {
                    "nameHere": "componentAdmin",
                    "nameInList": "AdminAccess"
                }, {
                    "nameHere": "requestName",
                    "nameInList": "RequestName"
                }],
                "where": {
                    "field": "ComponentID",
                    "type": "Number",
                    "value": mData.componentID,
                }
            }),
            $().GetFieldsFromOneRow({
                "listName": "Component Group Log",
                "select": [{
                    "nameHere": "componentGrpAdmin",
                    "nameInList": "GroupAdminAccess"
                }],
                "where": {
                    "field": "ComponentGroupID",
                    "type": "Number",
                    "value": mData.componentGroupID,
                }
            }),
            mData
        );

        mData.returnURI = mData.uriAdmin;
        mData.formURI = mData.uriRequest;

        var uData = $().ReturnCurrentUserData();
        uData.isAdmin = $().UserIsComponentAdmin(uData);
        uData.isComponentGrpAdmin = $().UserIsComponentGrpAdmin(uData, mData.componentGroupID);
        if (uData.isComponentGrpAdmin == 1) { uData.isAdmin = 1; }


        // if user is not an admin
        if (uData.isAdmin == 0) {
            // render a permission denied message
            $('div#overlays-container').fadeIn(200);
            $('div#mos-form-no-view-permission').fadeIn(400);
            return;
            // if user is an admin
        } else {
            // render 'new' button and datatables
            $().RenderSWFNewRequestButton(mData);
            if (typeof(bData) != "undefined") {
                var buttons = [];
                $.each(bData, function(i, button) {
                    button.classValues = button.classValues + " command-bar-button";
                    buttons.push(button);
                });
                $().RenderAdditionalButtons(buttons);
            }
            $().RenderAllDataTables(tData, mData);

            // add a class to #all-content-container to serve as styling hook
            $("div#all-content-container").addClass(ReplaceAll("\\.", "", ReplaceAll(" ", "-", mData.requestName)).toLowerCase());

        }
    }



    $.fn.InitializeListViewPage = function(mData, tData) {


        // same as InitializeAdminPage, but without the new request button - should def refactor to de-duplicate

        $('div#overlays-container').append($().ReturnNoViewPermissionMessage());

        mData.componentGroupID = 3;

        mData = $.extend(
            $().GetFieldsFromOneRow({
                "listName": "ComponentLog",
                "select": [{
                    "nameHere": "uriAdmin",
                    "nameInList": "URIAdmin",
                    "linkField": 1
                }, {
                    "nameHere": "uriRequest",
                    "nameInList": "URIRequest",
                    "linkField": 1
                }, {
                    "nameHere": "componentAdmin",
                    "nameInList": "AdminAccess"
                }],
                "where": {
                    "field": "ComponentID",
                    "type": "Number",
                    "value": mData.componentID,
                }
            }),
            $().GetFieldsFromOneRow({
                "listName": "Component Group Log",
                "select": [{
                    "nameHere": "componentGrpAdmin",
                    "nameInList": "GroupAdminAccess"
                }],
                "where": {
                    "field": "ComponentGroupID",
                    "type": "Number",
                    "value": mData.componentGroupID,
                }
            }),
            mData
        );

        mData.returnURI = mData.uriAdmin;
        mData.formURI = mData.uriRequest;

        var uData = $().ReturnCurrentUserData();
        uData.isAdmin = $().UserIsComponentAdmin(uData);
        uData.isComponentGrpAdmin = $().UserIsComponentGrpAdmin(uData, mData.componentGroupID);
        if (uData.isComponentGrpAdmin == 1) { uData.isAdmin = 1; }

        // if user is not an admin
        if (uData.isAdmin == 0) {
            // render a permission denied message
            $('div#overlays-container').fadeIn(200);
            $('div#mos-form-no-view-permission').fadeIn(400);
            return;
            // if user is an admin
        } else {
            // render 'new' button and datatables
            $().RenderAllDataTables(tData, mData);
        }
    }



    $.fn.InitializeRequesterPage = function(mData, tData) {

        mData = $.extend(
            $().GetFieldsFromOneRow({
                "listName": "ComponentLog",
                "select": [{
                    "nameHere": "uriRequester",
                    "nameInList": "URIRequester",
                    "linkField": 1
                }, {
                    "nameHere": "uriRequest",
                    "nameInList": "URIRequest",
                    "linkField": 1
                }, {
                    "nameHere": "requestName",
                    "nameInList": "RequestName"
                }],
                "where": {
                    "field": "ComponentID",
                    "type": "Number",
                    "value": mData.componentID,
                }
            }),
            mData
        );

        mData.returnURI = mData.uriRequester;
        mData.formURI = mData.uriRequest;

        // render 'new' button and datatables
        $().RenderSWFNewRequestButton(mData);
        $().RenderAllDataTables(tData, mData);


        // add a class to #all-content-container to serve as styling hook
        $("div#all-content-container").addClass(ReplaceAll("\\.", "", ReplaceAll(" ", "-", mData.requestName)).toLowerCase());

    }


    // ---- SUBMISSION, VALIDATION, & NOTIFICATION


    $.fn.HandleListUpdateReturn = function(xData, Status, subject) {

        var successFlag = 0;
        var spErrorCode = $(xData.responseXML).find('ErrorCode').text() != '' ? $(xData.responseXML).find('ErrorCode').text() : '""';
        var spErrorText = $(xData.responseXML).find('ErrorText').text() != '' && $(xData.responseXML).find('errorstring').text() != '' ? $(xData.responseXML).find('ErrorText').text() + $(xData.responseXML).find('errorstring').text() : '""';
        var spResponseXMLString = xData.responseXML == null ? 'null' : JSON.stringify(xData.responseXML.xml);

        if (Status == 'success' && (spErrorCode == '""' || spErrorCode == '0x00000000') && spErrorText == '""') {
            // return successFlag = 1
            return successFlag = 1;
        } else {

            // construct the email body
            var bodyUnique = '<ul>' +
                '<li>Affected User = ' + globalUData.name + ' (' + globalUData.userName + ')</li>' +
                '<li>Issue Datetime = ' + $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY h:mm a') + '</li>' +
                '<li>Affected System = ' + globalMData.requestName + '</li>' +
                '<li>Affected Request # = ' + globalRData.requestID + '</li>' +
                '<li>Browser = ' + globalUData.browserFamilyAndVersion + '</li>' +
                '<li>Form Factor = ' + globalUData.formFactor + '</li>' +
                '<li>OS = ' + globalUData.os + '</li>' +
                '<li>Status = ' + Status + '</li>' +
                '<li>spErrorCode = ' + spErrorCode + '</li>' +
                '<li>spErrorText = ' + spErrorText + '</li>' +
                '<li>spResponseXMLString = ' + spResponseXMLString + '</li>' +
                '<li>globalMData = ' + JSON.stringify(globalMData) + '</li>' +
                '<li>globalRData = ' + JSON.stringify(globalRData) + '</li>' +
                '<li>globalUData = ' + JSON.stringify(globalUData) + '</li>' +
                '<li>globalSubmissionValuePairs = ' + JSON.stringify(globalSubmissionValuePairs) + '</li>' +
                '</ul>';

            // push email for each component group admin
            $.each(globalMData.componentGrpAdminEmailArray, function(i, cgAdmin) {
                globalErrorEmailsToSend.push({
                    'emailType': 'Error',
                    'caller': 'HandleListUpdateReturn',
                    'to': cgAdmin,
                    'subject': subject,
                    'bodyUnique': bodyUnique
                });
            });

            // return successFlag = 0
            return successFlag;
        }
    };



    $.fn.ProcessStandardChangeNotifications = function(sData) {

        // ============
        // ---- 1. SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;

        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');
        sData.completedByLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Completed By');

        sData.requestNick = $("input#Request-Nickname").val();

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (false) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- 2. BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            if (typeof(eData.newlyApprOrPending) != "undefined" && eData.newlyApprOrPending == 1) {
                var beginningOfLifeApprovalMention = " and you'll be notified again when the relevant people have approved it";
            } else {
                var beginningOfLifeApprovalMention = "";
            }

            // admin
            if (typeof(eData.standardChangeNotifications.beginningOfLife.admin) != "undefined") {
                if (eData.standardChangeNotifications.beginningOfLife.admin == 1) {
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'beginningOfLife admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + 'new request received',
                            'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                                '<a href="' + eData.uriFormAdmin + '">review the details at any time</a>' +
                                beginningOfLifeApprovalMention + '.</p>' +
                                '<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
                                'with any questions or <a href="' + eData.uriPageAdmin + '">' +
                                'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
                        });
                    });
                }
            }

            // requester
            if (typeof(eData.standardChangeNotifications.beginningOfLife.requester) != "undefined") {
                if (eData.standardChangeNotifications.beginningOfLife.requester == 1) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'beginningOfLife requester',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + 'new request received',
                        'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
                            '<a href="' + eData.uriFormRequester + '">review the details at any time</a>' +
                                beginningOfLifeApprovalMention + '.</p>' +
                            '<p>In the meantime, you can <a href="mailto:' + eData.adminEmailString + '">' +
                            'contact the admin</a> with any questions or <a href="' + eData.uriPageRequester + '">' +
                            'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
                    });
                }
            }

        }


        // ============
        // ---- 3. APPROVAL NEWLY NEEDED
        // ============

        if (typeof(eData.autoProcessApprovals) != 'undefined' && eData.autoProcessApprovals == 1) {
            if (eData.approvalNewlyNeededArray != []) {
                $.each(eData.approvalNewlyNeededArray, function(i, a) {

                    if (typeof(a.EntityData) != 'undefined') {
                        if (typeof(a.EntityData.Email) != 'undefined') {
                            var addressee = a.EntityData.Email;
                        }
                    } else {
                        var addressee = a.Description.toLowerCase();
                    }

                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'approval newly needed',
                        'to': addressee,
                        'subject': eData.subjectPreface + 'for your approval',
                        'bodyUnique': '<p>This request\'s fulfillment depends on your approval. Please  ' +
                            '<a href="' + eData.uriFormApprover + '">review the details and enter your ' +
                            'approval (or disapproval) soon</a>. <a href="mailto:' + eData.requesterEmail + '">' +
                            'Contact the requester</a> or <a href="mailto:' + eData.adminEmailString + '">' +
                            'contact the admin</a> with any issues related to this request.</p>'
                    });
                });
            }
        }



        // ============
        // ---- 4. APPROVAL NOT NEEDED
        // ============

        if (typeof(eData.autoProcessApprovals) != 'undefined' && eData.autoProcessApprovals == 1) {
            if (eData.approvalNotNeededArray != []) {
                $.each(eData.approvalNotNeededArray, function(i, a) {

                    if (typeof(a.EntityData) != 'undefined') {
                        if (typeof(a.EntityData.Email) != 'undefined') {
                            var addressee = a.EntityData.Email;
                        }
                    } else {
                        var addressee = a.Description.toLowerCase();
                    }

                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'approval newly not needed',
                        'to': addressee,
                        'subject': eData.subjectPreface + 'approval not needed',
                        'bodyUnique': '<p>This request no longer requires your approval. Nothing personal. ' +
                            'Please <a href="mailto:' + eData.requesterEmail + '">' +
                            'contact the requester</a> or <a href="mailto:' + eData.adminEmailString + '">' +
                            'contact the admin</a> with any issues related to this request.</p>'
                    });
                });
            }
        }



        // ============
        // ---- 5. NEWLY APPROVED OR PENDING
        // ============

        if (typeof(eData.autoProcessApprovals) != 'undefined' && eData.autoProcessApprovals == 1) {
            if (eData.newlyApprOrPending == 1) {

                // approved
                if (eData.requestStatus == 'Approved') {

                    // admin
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'approved admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + 'approved',
                            'bodyUnique': '<p>As needed, <a href="' + eData.uriFormAdmin + '">review the request\'s details</a> ' +
                                'and contact ' + eData.requestedForLinkedNamesString + '. ' +
                                'When the work for this request has been completed, please <a href="' + eData.uriFormAdmin + '">' +
                                'update the request status</a>.</p>'
                        });
                    });

                    // requester
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'approved requester',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + 'approved',
                        'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You\'ll be notified ' +
                            'again when the work for this request has been completed, but you can ' +
                            '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                            'issues related thereto.'
                    });
                }

                // pending approval
                if (eData.requestStatus == 'Pending Approval') {

                    // admin
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'pending approval admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + 'pending approval',
                            'bodyUnique': '<p>The status of this request has been reverted to "Pending Approval". ' +
                                'You\'ll be notified again when the relevant people have approved this request.</p>' +
                                '<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
                                'or <a href="' + eData.uriPageAdmin + '">check up on this and any other ' +
                                eData.requestName + ' requests</a>.</p>'
                        });
                    });

                    // requester
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'pending approval requester',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + 'pending approval',
                        'bodyUnique': '<p>The status of <a href="' + eData.uriFormAdmin + '">the request ' +
                            'you nicknamed "' + eData.requestNick + '"</a> has been reverted to ' +
                            '"Pending Approval". You\'ll be notified again when the relevant people ' +
                            'have approved this request.</p>' +
                            '<p>In the meantime, you can <a href="mailto:' + eData.adminEmailString + '">' +
                            'contact the admin</a> with any questions or <a href="' + eData.uriPageRequester + '">' +
                            'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
                    });
                }
            }
        }



        // ============
        // ---- 6. ASSIGNMENTS
        // ============

        if (typeof(eData.autoProcessAssignments) != 'undefined') {
            if (eData.assignmentHasChanged == 1) {

                // do not prompt assignee to mark complete
                if (typeof(eData.autoProcessAssignments.promptToMarkComplete) == 'undefined') {

                    var workNeededBodyUnique =  '<p>This request has been assigned to you. As needed, ' +
                                                '<a href="' + eData.uriFormAdmin + '">review the details of this request</a> ' +
                                                'or contact ' + eData.requestedForLinkedNamesString + '.</p>';

                // prompt assignee to mark complete
                } else if (eData.autoProcessAssignments.promptToMarkComplete == 1) {

                    var workNeededBodyUnique =  '<p>This request has been assigned to you. As needed, ' +
                                                '<a href="' + eData.uriFormAdmin + '">review the details of this request</a> ' +
                                                'or contact ' + eData.requestedForLinkedNamesString + '.</p>' + 
                                                '<p>When your work is completed,  ' +
                                                '<a href="' + eData.uriFormAdmin + '">indicate this in the request</a>.</p>';
                }

                // finish setting up
                // work needed
                if (eData.workNewlyNeededArray != []) {
                    $.each(eData.workNewlyNeededArray, function(i, w) {

                        if (typeof(w.EntityData) != 'undefined') {
                            if (typeof(w.EntityData.Email) != 'undefined') {
                                var addressee = w.EntityData.Email;
                            }
                        } else {
                            var addressee = w.Description.toLowerCase();
                        }

                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'work needed',
                            'to': addressee,
                            'subject': eData.subjectPreface + 'assigned to you',
                            'bodyUnique': workNeededBodyUnique
                        });
                    });
                }

                // work not needed
                if (eData.workNotNeededArray != []) {
                    $.each(eData.workNotNeededArray, function(i, w) {

                        if (typeof(w.EntityData) != 'undefined') {
                            if (typeof(w.EntityData.Email) != 'undefined') {
                                var addressee = w.EntityData.Email;
                            }
                        } else {
                            var addressee = w.Description.toLowerCase();
                        }

                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'work not needed',
                            'to': addressee,
                            'subject': eData.subjectPreface + 'no longer assigned to you',
                            'bodyUnique': '<p>The request is no longer assigned to you.</p>'
                        });
                    });
                }
            }
        }



        // ============
        // ---- 7. END OF LIFE
        // ============

        if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

            // admin
            if (typeof(eData.standardChangeNotifications.endOfLife.admin) != "undefined") {
                if (eData.standardChangeNotifications.endOfLife.admin == 1) {
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'endOfLife admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                            'bodyUnique': '<p>Feel free to contact ' + eData.requestedForLinkedNamesString + ' ' +
                                'if you need to follow up.</p>'
                        });
                    });
                }
            }

            // requester
            if (typeof(eData.standardChangeNotifications.endOfLife.requester) != "undefined") {

                // completion - specific
                if (eData.requestStatus == 'Completed' && eData.standardChangeNotifications.endOfLife.requester.completion == 'specific') {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'endOfLife requester completion specific',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                        'bodyUnique': '<p>The <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                            '"</a> was completed. Contact ' + eData.completedByLinkedNamesString + ' with any issues.</p>'
                    });
                }

                // generic
                if ((eData.requestStatus == 'Completed' && eData.standardChangeNotifications.endOfLife.requester.completion == 'generic') ||
                    ((eData.requestStatus == 'Disapproved' || eData.requestStatus == 'Cancelled') && eData.standardChangeNotifications.endOfLife.requester.nonCompletion == 1)) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'endOfLife requester generic',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                        'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                            '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                            'issues related to this request.'
                    });
                }

                // completion - unique
                if (eData.requestStatus == 'Completed' && eData.standardChangeNotifications.endOfLife.requester.completion == 'unique') {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'endOfLife requester completion unique',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                        'bodyUnique': eData.standardChangeNotifications.endOfLife.requester.uniqueBody(eData.uriFormAdmin, eData.requestNick, eData.completedByLinkedNamesString)
                    });
                }
            }
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }
        $().SendEmails(notificationsToSend).then(function() {
            // return promise
            emailProcessingPromise.resolve();
        });
        return emailProcessingPromise.promise();
    }



    $.fn.ProcessSuperSimpleChangeNotifications = function(sData) {

        // ============
        // ---- SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;


        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

        sData.requestNick = $("input#Request-Nickname").val();

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            // admin
            if (typeof(eData.superSimpleChangeNotifications.beginningOfLife.admin) != "undefined") {
                if (eData.superSimpleChangeNotifications.beginningOfLife.admin == 1) {
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'beginningOfLife admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + 'new request received',
                            'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                                '<a href="' + eData.uriFormAdmin + '">review this request\'s details</a>, ' +
                                '<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
                                'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
                                'review other ' + eData.requestName + ' requests</a>.</p>'
                        });
                    });
                }
            }

            // requester
            if (typeof(eData.superSimpleChangeNotifications.beginningOfLife.requester) != "undefined") {
                if (eData.superSimpleChangeNotifications.beginningOfLife.requester == 1) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'beginningOfLife requester',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + 'new request received',
                        'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
                            '<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
                            '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
                            'with any questions, or <a href="' + eData.uriPageRequester + '">' +
                            'review other ' + eData.requestName + ' requests</a>.</p>'
                    });
                }
            }

        }



        // ============
        // ---- APPROVED
        // ============

        if (eData.requestStatus == "Approved") {

            console.log('RS = approved');

            if (typeof(eData.superSimpleChangeNotifications.approved) != "undefined") {

                // admin
                if (typeof(eData.superSimpleChangeNotifications.approved.admin) != "undefined") {
                    if (eData.superSimpleChangeNotifications.approved.admin == 1) {

                        console.log('gonna push admin email');

                        $.each(eData.adminEmailArray, function(i, toAdmin) {
                            notificationsToSend.push({
                                'emailType': 'Notification',
                                'caller': 'approved admin',
                                'to': toAdmin,
                                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                                'bodyUnique': '<p>As needed, <a href="' + eData.uriFormAdmin + '">review the request\'s details</a> ' +
                                    'and contact ' + eData.requestedForLinkedNamesString + '.'
                            });
                        });
                    }
                }

                // requester
                if (typeof(eData.superSimpleChangeNotifications.approved.requester) != "undefined") {
                    if (eData.superSimpleChangeNotifications.approved.requester == 1) {

                        console.log('gonna push requester email');

                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'approved requester',
                            'to': eData.requesterEmail,
                            'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                            'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
                                '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                                'issues related thereto.'
                        });
                    }
                }

            }
        }



        // ============
        // ---- ASSIGNMENTS
        // ============

        if (typeof(eData.autoProcessAssignments) != 'undefined' && eData.autoProcessAssignments == 1) {
            if (eData.assignmentHasChanged == 1) {

                // work needed
                if (eData.workNewlyNeededArray != []) {
                    $.each(eData.workNewlyNeededArray, function(i, w) {

                        if (typeof(w.EntityData) != 'undefined') {
                            if (typeof(w.EntityData.Email) != 'undefined') {
                                var addressee = w.EntityData.Email;
                            }
                        } else {
                            var addressee = w.Description.toLowerCase();
                        }

                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'work needed',
                            'to': addressee,
                            'subject': eData.subjectPreface + 'assigned to you',
                            'bodyUnique': '<p>This request has been assigned to you. As needed, ' +
                                '<a href="' + eData.uriFormAdmin + '">review the details of this request</a> ' +
                                'or contact ' + eData.requestedForLinkedNamesString + '.</p>'
                        });
                    });
                }

                // work not needed
                if (eData.workNotNeededArray != []) {
                    $.each(eData.workNotNeededArray, function(i, w) {

                        if (typeof(w.EntityData) != 'undefined') {
                            if (typeof(w.EntityData.Email) != 'undefined') {
                                var addressee = w.EntityData.Email;
                            }
                        } else {
                            var addressee = w.Description.toLowerCase();
                        }

                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'work not needed',
                            'to': addressee,
                            'subject': eData.subjectPreface + 'no longer assigned to you',
                            'bodyUnique': '<p>The request is no longer assigned to you.</p>'
                        });
                    });
                }

            }
        }



        // ============
        // ---- END OF LIFE
        // ============

        if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

            // admin
            var adminSendEOL = 0;
            var adminComparisonBank = [];

            if (typeof(eData.superSimpleChangeNotifications.endOfLife.admin) != "undefined") {
                if (eData.superSimpleChangeNotifications.endOfLife.admin == 1) {
                    adminSendEOL = 1;
                } else if (eData.superSimpleChangeNotifications.endOfLife.admin != 0) {
                    adminComparisonBank = eData.superSimpleChangeNotifications.endOfLife.admin;
                    if (adminComparisonBank.indexOf(eData.requestStatus) > -1) {
                        adminSendEOL = 1;
                    }
                }
                if (adminSendEOL == 1) {
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'endOfLife admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                            'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
                                'contact the requester</a> if you need to follow up.</p>'
                        });
                    });
                }
            }

            // requester
            var requesterSendEOL = 0;
            var requesterComparisonBank = [];

            if (typeof(eData.superSimpleChangeNotifications.endOfLife.requester) != "undefined") {
                if (eData.superSimpleChangeNotifications.endOfLife.requester == 1) {
                    requesterSendEOL = 1;
                } else if (eData.superSimpleChangeNotifications.endOfLife.requester != 0) {
                    requesterComparisonBank = eData.superSimpleChangeNotifications.endOfLife.requester;
                    if (requesterComparisonBank.indexOf(eData.requestStatus) > -1) {
                        requesterSendEOL = 1;
                    }
                }
                if (requesterSendEOL == 1) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'endOfLife requester generic',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                        'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                            '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                            'issues related to this request.'
                    });
                }
            }
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }

        $().SendEmails(notificationsToSend).then(function() {
            // return promise
            emailProcessingPromise.resolve();
        });

        return emailProcessingPromise.promise();

    }



    $.fn.ProcessEventSpaceNotifications = function(sData) {

        // ============
        // ---- SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;


        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

        sData.requestNick = $("input#Request-Nickname").val();

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        sData.adminToRequesterMessageAddendum = '';
        if (typeof($("textarea#Email-Message-Addendum").val()) != 'undefined' && $("textarea#Email-Message-Addendum").val() != '') {
            sData.adminToRequesterMessageAddendum = '<p>From the Admin:</p>' +
                '<blockquote>' + $("textarea#Email-Message-Addendum").val() + '</blockquote>';
        }

        sData.spaceReservedStarting = '';
        if (typeof($("input#datetime-storage_Space-Reserved-Beginning-Datetime").val()) != 'undefined' && $("input#datetime-storage_Space-Reserved-Beginning-Datetime").val() != '') {
            sData.spaceReservedStarting = $("input#datetime-storage_Space-Reserved-Beginning-Datetime").val().substring(0, 19);
            sData.spaceReservedStarting = $().ReturnFormattedDateTime(sData.spaceReservedStarting, null, 'MMMM D, YYYY h:mm a');
            sData.spaceReservedStarting = '<p>Your space reservation starts: ' + sData.spaceReservedStarting + '</p>';
        }

        sData.spaceReservedEnding = '';
        if (typeof($("input#datetime-storage_Space-Reserved-Ending-Datetime").val()) != 'undefined' && $("input#datetime-storage_Space-Reserved-Ending-Datetime").val() != '') {
            sData.spaceReservedEnding = $("input#datetime-storage_Space-Reserved-Ending-Datetime").val().substring(0, 19);
            sData.spaceReservedEnding = $().ReturnFormattedDateTime(sData.spaceReservedEnding, null, 'MMMM D, YYYY h:mm a');
            sData.spaceReservedEnding = '<p>Your space reservation ends: ' + sData.spaceReservedEnding + '</p>';
        }

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            // admin
            if (typeof(eData.eventSpaceNotifications.beginningOfLife.admin) != "undefined") {
                if (eData.eventSpaceNotifications.beginningOfLife.admin == 1) {
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'beginningOfLife admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + 'new request received',
                            'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                                '<a href="' + eData.uriFormAdmin + '">review this request\'s details</a>, ' +
                                '<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
                                'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
                                'review other ' + eData.requestName + ' requests</a>.</p>'
                        });
                    });
                }
            }

            // requester
            if (typeof(eData.eventSpaceNotifications.beginningOfLife.requester) != "undefined") {
                if (eData.eventSpaceNotifications.beginningOfLife.requester == 1) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'beginningOfLife requester',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + 'new request received',
                        'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
                            '<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
                            '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
                            'with any questions, or <a href="' + eData.uriPageRequester + '">' +
                            'review other ' + eData.requestName + ' requests</a>.</p>'
                    });
                }
            }

        }



        // ============
        // ---- APPROVED
        // ============

        if (eData.requestStatus == "Approved") {

            console.log('RS = approved');

            if (typeof(eData.eventSpaceNotifications.approved) != "undefined") {

                // admin
                if (typeof(eData.eventSpaceNotifications.approved.admin) != "undefined") {
                    if (eData.eventSpaceNotifications.approved.admin == 1) {

                        console.log('gonna push admin email');

                        $.each(eData.adminEmailArray, function(i, toAdmin) {
                            notificationsToSend.push({
                                'emailType': 'Notification',
                                'caller': 'approved admin',
                                'to': toAdmin,
                                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                                'bodyUnique': '<p>As needed, <a href="' + eData.uriFormAdmin + '">review the request\'s details</a> ' +
                                    'and contact ' + eData.requestedForLinkedNamesString + '.'
                            });
                        });
                    }
                }

                // requester
                if (typeof(eData.eventSpaceNotifications.approved.requester) != "undefined") {
                    if (eData.eventSpaceNotifications.approved.requester == 1) {

                        console.log('gonna push requester email');

                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'approved requester',
                            'to': eData.requesterEmail,
                            'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                            'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
                                '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                                'issues related thereto.' +
                                eData.spaceReservedStarting +
                                eData.spaceReservedEnding + 
                                eData.adminToRequesterMessageAddendum
                        });
                    }
                }

            }
        }



        // ============
        // ---- END OF LIFE
        // ============

        if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

            // admin
            var adminSendEOL = 0;
            var adminComparisonBank = [];

            if (typeof(eData.eventSpaceNotifications.endOfLife.admin) != "undefined") {
                if (eData.eventSpaceNotifications.endOfLife.admin == 1) {
                    adminSendEOL = 1;
                } else if (eData.eventSpaceNotifications.endOfLife.admin != 0) {
                    adminComparisonBank = eData.eventSpaceNotifications.endOfLife.admin;
                    if (adminComparisonBank.indexOf(eData.requestStatus) > -1) {
                        adminSendEOL = 1;
                    }
                }
                if (adminSendEOL == 1) {
                    $.each(eData.adminEmailArray, function(i, toAdmin) {
                        notificationsToSend.push({
                            'emailType': 'Notification',
                            'caller': 'endOfLife admin',
                            'to': toAdmin,
                            'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                            'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
                                'contact the requester</a> if you need to follow up.</p>'
                        });
                    });
                }
            }

            // requester
            var requesterSendEOL = 0;
            var requesterComparisonBank = [];

            if (typeof(eData.eventSpaceNotifications.endOfLife.requester) != "undefined") {
                if (eData.eventSpaceNotifications.endOfLife.requester == 1) {
                    requesterSendEOL = 1;
                } else if (eData.eventSpaceNotifications.endOfLife.requester != 0) {
                    requesterComparisonBank = eData.eventSpaceNotifications.endOfLife.requester;
                    if (requesterComparisonBank.indexOf(eData.requestStatus) > -1) {
                        requesterSendEOL = 1;
                    }
                }
                if (requesterSendEOL == 1) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'endOfLife requester generic',
                        'to': eData.requesterEmail,
                        'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                        'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                            '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                            'issues related to this request.' +
                            eData.adminToRequesterMessageAddendum
                    });
                }
            }
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }

        $().SendEmails(notificationsToSend).then(function() {
            // return promise
            emailProcessingPromise.resolve();
        });

        return emailProcessingPromise.promise();

    }



    $.fn.ProcessMCProjectReqNotifications = function(sData) {

        console.log('ProcessMCProjectReqNotifications');

        // ============
        // ---- SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;


        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

        sData.requestNick = $("input#Request-Nickname").val();

        sData.requesterPhone = $("input#Requester-Phone").val();
        sData.requesterDept = $("input#Requester-Department").val();

        sData.ProjectType = $("select#Project-Type").val();
        sData.DescribeOtherProjectType = $("textarea#Describe-Other-Project-Type").val();
        sData.SignType = $("select#Sign-Type").val();
        sData.DescribeOtherSignType = $("textarea#Describe-Other-Sign-Type").val();
        sData.NameplateType = $("select#Nameplate-Type").val();
        sData.DescribeOtherNameplateType = $("textarea#Describe-Other-Nameplate-Type").val();
        sData.NameplateName = $("input#Nameplate-Name").val();
        sData.NameplateDept = $("input#Nameplate-Dept").val();
        if ($('input#budget_dept').is(':checked')) {
            sData.Budget = "My department pays";
        } else if ($('input#budget_marcom').is(':checked')) {
            sData.Budget = "MarCom pays";
        } else {
            sData.Budget = "";
        }
        sData.Quantity = $("input#Quantity").val();
        sData.NeededDate = $().ReturnFormattedDateTime($("input#Needed-Date").val(), null, 'MMMM D');
        sData.EventDate = $().ReturnFormattedDateTime($("input#Event-Date").val(), null, 'MMMM D');
        sData.Description = $("textarea#Description").val();
        if ($('input#Attachment').val() != '') {
            sData.hasAttachments = "Yes";
        } else {
            sData.hasAttachments = "";
        }

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            var adminBeginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                '<a href="' + eData.uriFormAdmin + '">review this request\'s details and retrieve attachments</a>, ' +
                '<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
                'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
                'review other ' + eData.requestName + ' requests</a>.</p>' +
                '<h2>Request and Requester</h2>' +
                '<ul>' +
                '   <li><b>Request Nickname</b>: ' + eData.requestNick + '</li>' +
                '   <li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
                '   <li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
                '   <li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
                '</ul>' +
                '<h2>Project</h2>' +
                '<ul>' +
                '   <li><b>Project Type</b>: ' + eData.ProjectType + '</li>' +
                '   <li><b>Other Project Type Description</b>: ' + eData.DescribeOtherProjectType + '</li>' +
                '   <li><b>Sign Type</b>: ' + eData.SignType + '</li>' +
                '   <li><b>Other Sign Type Description</b>: ' + eData.DescribeOtherSignType + '</li>' +
                '   <li><b>Nameplate Type</b>: ' + eData.NameplateType + '</li>' +
                '   <li><b>Other Nameplate Type Description</b>: ' + eData.DescribeOtherNameplateType + '</li>' +
                '   <li><b>Nameplate Name</b>: ' + eData.NameplateName + '</li>' +
                '   <li><b>Nameplate Dept</b>: ' + eData.NameplateDept + '</li>' +
                '   <li><b>Budget</b>: ' + eData.Budget + '</li>' +
                '   <li><b>Quantity</b>: ' + eData.Quantity + '</li>' +
                '   <li><b>Date Needed</b>: ' + eData.NeededDate + '</li>' +
                '   <li><b>Event Date</b>: ' + eData.EventDate + '</li>' +
                '   <li><b>Description</b>: ' + eData.Description + '</li>' +
                '   <li><b>Attachments</b>: ' + eData.hasAttachments + '</li>' +
                '</ul>';

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'beginningOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'new request received',
                    'bodyUnique': adminBeginningOfLifeBodyUnique
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'beginningOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + 'new request received',
                'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
                    '<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
                    '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
                    'with any questions, or <a href="' + eData.uriPageRequester + '">' +
                    'review other ' + eData.requestName + ' requests</a>.</p>'
            });

        }


        // ============
        // ---- END OF LIFE
        // ============

        if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'endOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                    'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
                        'contact the requester</a> if you need to follow up.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'endOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                    '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                    'issues related to this request.'
            });
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }

        $().SendEmails(notificationsToSend).then(function() {
            // return promise
            emailProcessingPromise.resolve();
        });

        return emailProcessingPromise.promise();

    }



    $.fn.ProcessPhotoReqNotifications = function(sData) {

        console.log('ProcessPhotoReqNotifications');

        // ============
        // ---- SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;


        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

        sData.requestNick = $("input#Request-Nickname").val();

        sData.requesterPhone = $("input#Requester-Phone").val();
        sData.requesterDept = $("input#Requester-Department").val();

        sData.neededDate = $().ReturnFormattedDateTime($("input#Needed-Date").val(), null, 'MMMM D');
        sData.fileType = $("input#File-Type").val();
        sData.description = $("textarea#Description").val();
        if ($('input#Attachment').val() != '') {
            sData.hasAttachments = "Yes";
        } else {
            sData.hasAttachments = "";
        }
        sData.usage = $("textarea#Usage").val();

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            var adminBeginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                '<a href="' + eData.uriFormAdmin + '">review this request\'s details and retrieve attachments</a>, ' +
                '<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
                'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
                'review other ' + eData.requestName + ' requests</a>.</p>' +
                '<h2>Request and Requester</h2>' +
                '<ul>' +
                '   <li><b>Request Nickname</b>: ' + eData.requestNick + '</li>' +
                '   <li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
                '   <li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
                '   <li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
                '</ul>' +
                '<h2>Photo</h2>' +
                '<ul>' +
                '   <li><b>Date Needed</b>: ' + eData.neededDate + '</li>' +
                '   <li><b>File Type</b>: ' + eData.fileType + '</li>' +
                '   <li><b>Description</b>: ' + eData.description + '</li>' +
                '   <li><b>Attachments</b>: ' + eData.hasAttachments + '</li>' +
                '   <li><b>Usage</b>: ' + eData.usage + '</li>' +
                '</ul>';

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'beginningOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'new request received',
                    'bodyUnique': adminBeginningOfLifeBodyUnique
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'beginningOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + 'new request received',
                'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
                    '<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
                    '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
                    'with any questions, or <a href="' + eData.uriPageRequester + '">' +
                    'review other ' + eData.requestName + ' requests</a>.</p>'
            });

        }


        // ============
        // ---- END OF LIFE
        // ============

        if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'endOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                    'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
                        'contact the requester</a> if you need to follow up.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'endOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                    '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                    'issues related to this request.'
            });
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }

        $().SendEmails(notificationsToSend).then(function() {
            // return promise
            emailProcessingPromise.resolve();
        });

        return emailProcessingPromise.promise();
    }



    $.fn.ProcessLogoReqNotifications = function(sData) {

        console.log('ProcessLogoReqNotifications');

        // ============
        // ---- SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;


        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();


        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

        sData.requestNick = $("input#Request-Nickname").val();

        sData.requesterPhone = $("input#Requester-Phone").val();
        sData.requesterDept = $("input#Requester-Department").val();




        sData.projectName = $("input#Project-Name").val();
        sData.neededDate = $().ReturnFormattedDateTime($("input#Needed-Date").val(), null, 'MMMM D');
        sData.fileType = $("input#File-Type").val();
        sData.description = $("textarea#Description").val();
        if ($('input#Attachment').val() != '') {
            sData.hasAttachments = "Yes";
        } else {
            sData.hasAttachments = "";
        }
        sData.usage = $("select#Usage").val();
        sData.usageExplanation = $("textarea#Usage-Explanation").val();





        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            var adminBeginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                '<a href="' + eData.uriFormAdmin + '">review this request\'s details and retrieve attachments</a>, ' +
                '<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
                'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
                'review other ' + eData.requestName + ' requests</a>.</p>' +
                '<h2>Request and Requester</h2>' +
                '<ul>' +
                '   <li><b>Project Name</b>: ' + eData.projectName + '</li>' +
                '   <li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
                '   <li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
                '   <li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
                '</ul>' +
                '<h2>Photo</h2>' +
                '<ul>' +
                '   <li><b>Date Needed</b>: ' + eData.neededDate + '</li>' +
                '   <li><b>File Type</b>: ' + eData.fileType + '</li>' +
                '   <li><b>Description</b>: ' + eData.description + '</li>' +
                '   <li><b>Attachments</b>: ' + eData.hasAttachments + '</li>' +
                '   <li><b>Usage</b>: ' + eData.usage + '</li>' +
                '   <li><b>Usage Explanation</b>: ' + eData.usageExplanation + '</li>' +
                '</ul>';

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'beginningOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'new request received',
                    'bodyUnique': adminBeginningOfLifeBodyUnique
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'beginningOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + 'new request received',
                'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
                    '<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
                    '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
                    'with any questions, or <a href="' + eData.uriPageRequester + '">' +
                    'review other ' + eData.requestName + ' requests</a>.</p>'
            });

        }


        // ============
        // ---- END OF LIFE
        // ============

        if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'endOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                    'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
                        'contact the requester</a> if you need to follow up.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'endOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                    '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                    'issues related to this request.'
            });
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }

        $().SendEmails(notificationsToSend).then(function() {
            // return promise
            emailProcessingPromise.resolve();
        });

        return emailProcessingPromise.promise();
    }



    $.fn.ProcessPromoReqNotifications = function(sData) {

        console.log('ProcessPromoReqNotifications');

        // ============
        // ---- SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;

        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');
        sData.requestNick = $("input#Request-Nickname").val();

        sData.offeringTitle = $("input#Offering-Title").val();
        sData.webListingURL = $("input#Web-Listing-Link").val();

        if ($("input#date-input_Offering-Beginning-Datetime").val() != '') {
            sData.beginningEventDate = $().ReturnFormattedDateTime($("input#date-input_Offering-Beginning-Datetime").val(), null, 'MMMM D, YYYY');
        } else {
            sData.beginningEventDate = '';
        }

        if ($("input#Offering-Beginning-Date").val() != '') {
            sData.beginningRunDate = $().ReturnFormattedDateTime($("input#Offering-Beginning-Date").val(), null, 'MMMM D, YYYY');
        } else {
            sData.beginningRunDate = '';
        }

        if ($("input#Text-Edited-Date").val() != '') {
            sData.textEditedDate = $().ReturnFormattedDateTime($("input#Text-Edited-Date").val(), null, 'MMMM D');
        } else {
            sData.textEditedDate = '';
        }

        if ($("input#Web-Live-Date").val() != '') {
            sData.webLiveDate = $().ReturnFormattedDateTime($("input#Web-Live-Date").val(), null, 'MMMM D');
        } else {
            sData.webLiveDate = '';
        }

        sData.pointPerson = $("select#Point-Person").val();

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }

        if (rData.reqStatusIsNew == 1) {



            // ============
            // ---- BEGINNING OF LIFE (PENDING APPROVAL)
            // ============


            if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

                console.log('beginningOfLife = 1');

                // query
                if (typeof(eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Component Group Log",
                            "select": [{
                                "nameHere": "pendingApprovalRecipientsVerbose",
                                "nameInList": "DevAdminNotifications"
                            }],
                            "where": {
                                "field": "ComponentGroupID",
                                "type": "Number",
                                "value": 1,
                            }
                        }),
                        eData
                    );

                } else {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Promo Request Notification Recipients",
                            "select": [{
                                "nameHere": "pendingApprovalRecipientsVerbose",
                                "nameInList": "Recipients"
                            }],
                            "where": {
                                "field": "Title",
                                "type": "Text",
                                "value": "Pending Approval",
                            }
                        }),
                        eData
                    );
                }

                eData.pendingApprovalRecipients = $().ReturnUserEmailStringAndArray(eData.pendingApprovalRecipientsVerbose).array;

                // admin
                $.each(eData.pendingApprovalRecipients, function(i, toAdmin) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'beginningOfLife admin',
                        'to': toAdmin,
                        'subject': eData.subjectPreface + 'new request received',
                        'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. Please ' +
                            '<a href="' + eData.uriFormAdmin + '">approve (or disapprove) the request, ' +
                            'set a point person, and set Text Edited and Web Live dates</a> soon. ' +
                            'You can also <a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
                            'with any questions or <a href="' + eData.uriPageAdmin + '">review ' +
                            'other ' + eData.requestName + ' requests</a>.</p>'
                    });
                });

                // requester
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'beginningOfLife requester',
                    'to': eData.requesterEmail,
                    'subject': eData.subjectPreface + 'new request received',
                    'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
                        '<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
                        '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
                        'with any questions, or <a href="' + eData.uriPageRequester + '">' +
                        'review other ' + eData.requestName + ' requests</a>.</p>'
                });
            }



            // ============
            // ---- APPROVED
            // ============

            if (eData.requestStatus == "Approved") {

                console.log('RS = approved');

                // query
                if (typeof(eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Component Group Log",
                            "select": [{
                                "nameHere": "approvedRecipientsVerbose",
                                "nameInList": "DevAdminNotifications"
                            }],
                            "where": {
                                "field": "ComponentGroupID",
                                "type": "Number",
                                "value": 1,
                            }
                        }),
                        eData
                    );

                } else {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Promo Request Notification Recipients",
                            "select": [{
                                "nameHere": "approvedRecipientsVerbose",
                                "nameInList": "Recipients"
                            }],
                            "where": {
                                "field": "Title",
                                "type": "Text",
                                "value": "Approved",
                            }
                        }),
                        eData
                    );
                }

                eData.approvedRecipients = $().ReturnUserEmailStringAndArray(eData.approvedRecipientsVerbose).array;

                // admin
                $.each(eData.approvedRecipients, function(i, toAdmin) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'approved admin',
                        'to': toAdmin,
                        'subject': eData.subjectPreface + 'edit text by ' + eData.textEditedDate,
                        'bodyUnique': '<p><a href="' + eData.uriFormAdmin + '">Find out about this promotion</a> ' +
                            'which requires text to be edited by ' + eData.textEditedDate + '.</p>' +
                            '<p>When you\'re done, <a href="' + eData.uriFormAdmin + '">change ' +
                            'the request status</a>. As needed, <a href="mailto:' + eData.requesterEmail +
                            '">contact the requester</a> or <a href="mailto:' + eData.adminEmailString +
                            '">contact the admin</a> with any questions or <a href="' + eData.uriPageAdmin +
                            '">check up on this and any other requests</a>.</p>'
                    });
                });

            }



            // ============
            // ---- TEXT EDITED
            // ============

            if (eData.requestStatus == "Text Edited") {

                console.log('RS = text edited');

                // query
                if (typeof(eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Component Group Log",
                            "select": [{
                                "nameHere": "textEditedRecipientsVerbose",
                                "nameInList": "DevAdminNotifications"
                            }],
                            "where": {
                                "field": "ComponentGroupID",
                                "type": "Number",
                                "value": 1,
                            }
                        }),
                        eData
                    );

                } else {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Promo Request Notification Recipients",
                            "select": [{
                                "nameHere": "textEditedRecipientsVerbose",
                                "nameInList": "Recipients"
                            }],
                            "where": {
                                "field": "Title",
                                "type": "Text",
                                "value": "Text Edited",
                            }
                        }),
                        eData
                    );
                }

                eData.textEditedRecipients = $().ReturnUserEmailStringAndArray(eData.textEditedRecipientsVerbose).array;

                // admin
                $.each(eData.textEditedRecipients, function(i, toAdmin) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'text edited admin',
                        'to': toAdmin,
                        'subject': eData.subjectPreface + 'list on website by ' + eData.webLiveDate,
                        'bodyUnique': '<p><a href="' + eData.uriFormAdmin + '">Find out about this promotion</a> ' +
                            'which requires a web listing by ' + eData.webLiveDate + '.</p>' +
                            '<p>When the web listing is published, <a href="' + eData.uriFormAdmin + '">indicate ' +
                            'this and change the request status</a>. As needed, <a href="mailto:' + eData.requesterEmail +
                            '">contact the requester</a> or <a href="mailto:' + eData.adminEmailString +
                            '">contact the admin</a> with any questions or <a href="' + eData.uriPageAdmin +
                            '">check up on this and any other requests</a>.</p>'
                    });
                });

            }



            // ============
            // ---- WEB LIVE
            // ============

            if (eData.requestStatus == "Web Live") {

                console.log('RS = web live');

                // query
                if (typeof(eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Component Group Log",
                            "select": [{
                                "nameHere": "webLiveRecipientsVerbose",
                                "nameInList": "DevAdminNotifications"
                            }],
                            "where": {
                                "field": "ComponentGroupID",
                                "type": "Number",
                                "value": 1,
                            }
                        }),
                        eData
                    );

                } else {

                    eData = $.extend(
                        $().GetFieldsFromOneRow({
                            "webURL": "https://bmos.sharepoint.com/sites/hubprod",
                            "listName": "Promo Request Notification Recipients",
                            "select": [{
                                "nameHere": "webLiveRecipientsVerbose",
                                "nameInList": "Recipients"
                            }],
                            "where": {
                                "field": "Title",
                                "type": "Text",
                                "value": "Web Live",
                            }
                        }),
                        eData
                    );
                }

                eData.webLiveRecipients = $().ReturnUserEmailStringAndArray(eData.webLiveRecipientsVerbose).array;

                // admin
                $.each(eData.webLiveRecipients, function(i, toAdmin) {
                    notificationsToSend.push({
                        'emailType': 'Notification',
                        'caller': 'web live admin',
                        'to': toAdmin,
                        'subject': eData.subjectPreface + 'web listing is live',
                        'bodyUnique': '<p><a href="' + eData.webListingURL + '">The web listing</a> is now live ' +
                            'for "' + eData.offeringTitle + '" which begins on ' + eData.beginningEventDate + eData.beginningRunDate + '.</p>' +
                            '<p>' + eData.pointPerson + ', when all promotions are completed, <a href="' + eData.uriFormAdmin +
                            '">mark them as such and update the request status</a>.</p>' +
                            '<p>As needed, <a href="mailto:' + eData.requesterEmail +
                            '">contact the requester</a> or <a href="' + eData.uriPageAdmin +
                            '">check up on this and any other requests</a>.</p>'
                    });
                });

            }



            // ============
            // ---- END OF LIFE
            // ============

            if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

                // requester
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'endOfLife requester generic',
                    'to': eData.requesterEmail,
                    'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                    'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                        '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                        'issues related to this request.'
                });
            }



            // ============
            // ---- 7. SEND
            // ============

            // for debugging
            if (true) {
                console.log('notificationsToSend');
                console.log(notificationsToSend);
            }

            $().SendEmails(notificationsToSend).then(function() {
                // return promise
                emailProcessingPromise.resolve();
            });

            return emailProcessingPromise.promise();
        }

    }



    $.fn.ProcessInterpreterReqNotifications = function(sData) {

        console.log('ProcessInterpreterReqNotifications');

        // ============
        // ---- 1. SET UP VARS
        // ============

        var emailProcessingPromise = new $.Deferred();
        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;


        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.interpreterName = $("input#Interpreter-Name").val();
        sData.invoiceAmount = $("input#Invoice-Amount").val();
        sData.chargeAccount = $("input#Charge-Account").val();

        if (StrInStr(sData.invoiceAmount, "$", 0) == false) {
            sData.invoiceAmount = "$" + sData.invoiceAmount;
        }

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');
        sData.completedByLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Completed By');

        sData.requestNick = $("input#Request-Nickname").val();

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- 2. BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'beginningOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'new request received',
                    'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                        '<a href="' + eData.uriFormAdmin + '">review the details at any time</a>. ' +
                        'After submitting the request to the Commission, <a href="' + eData.uriFormAdmin + '">' +
                        'change the request status to reflect this</a>.</p>' +
                        '<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
                        'with any questions or <a href="' + eData.uriPageAdmin + '">' +
                        'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'beginningOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + 'new request received',
                'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
                    '<a href="' + eData.uriFormRequester + '">review the details at any time</a> ' +
                    'and you\'ll be notified again when an interpreter is assigned.</p>' +
                    '<p>In the meantime, you can <a href="mailto:' + eData.adminEmailString + '">' +
                    'contact the admin</a> with any questions or <a href="' + eData.uriPageRequester + '">' +
                    'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
            });
        }



        // ============
        // ---- 3. SUBMITTED TO COMMISSION
        // ============

        if (eData.requestStatus == 'Submitted to Commission') {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'submitted to commission admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'submitted to commission',
                    'bodyUnique': '<p>When an interpreter has been assigned, <a href="' + eData.uriFormAdmin + '">' +
                        'change the request status and enter the interpreter\'s name</a>.</p> ' +
                        '<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
                        'with any questions or <a href="' + eData.uriPageAdmin + '">' +
                        'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
                });
            });

        }



        // ============
        // ---- 4. INTERPRETER ASSIGNED
        // ============

        if (eData.requestStatus == 'Interpreter Assigned') {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'interpreter assigned admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'interpreter assigned',
                    'bodyUnique': '<p>When an invoice has been received, <a href="' + eData.uriFormAdmin + '">' +
                        'change the request status and enter the charge amount</a>.</p> ' +
                        '<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
                        'with any questions or <a href="' + eData.uriPageAdmin + '">' +
                        'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'interpreter assigned requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + 'interpreter assigned',
                'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". The interpreter is ' +
                    sData.interpreterName + '. You\'ll be notified again when the invoice is received.</p>' +
                    '<p>In the meantime, <a href="https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc=%7BD12C04AF-2C53-4575-9491-5FFBE4EC864A%7D&action=default">' +
                    'find out more about working with an interpreter</a>, <a href="mailto:' + eData.adminEmailString + '">' +
                    'contact the admin</a> with any questions, or <a href="' + eData.uriPageRequester + '">' +
                    'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
            });
        }



        // ============
        // ---- 5. INVOICE RECEIVED
        // ============

        if (eData.requestStatus == 'Invoice Received') {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'invoice received admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'invoice received',
                    'bodyUnique': '<p>When you\'ve charged the designated account, <a href="' + eData.uriFormAdmin + '">' +
                        'change the request status to reflect that the work for this request has been completed</a>.</p>' +
                        '<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
                        'with any questions or <a href="' + eData.uriPageAdmin + '">' +
                        'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'invoice received requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + 'invoice received',
                'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". The total cost for interpretation is ' +
                    sData.invoiceAmount + '. This will be charged to account #' + sData.chargeAccount + ' in two business days unless you ' +
                    '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> to change the account number.'
            });
        }



        // ============
        // ---- 6. END OF LIFE
        // ============

        if (typeof(eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'emailType': 'Notification',
                    'caller': 'endOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                    'bodyUnique': '<p>Feel free to contact ' + eData.requestedForLinkedNamesString + ' ' +
                        'if you need to follow up.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'emailType': 'Notification',
                'caller': 'endOfLife requester generic',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                    '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                    'issues related to this request.'
            });
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }

        $().SendEmails(notificationsToSend).then(function() {
            // return promise
            emailProcessingPromise.resolve();
        });

        return emailProcessingPromise.promise();
    }



    $.fn.ProcessFunctionSpaceReqNotifications = function(sData) {

        console.log('ProcessFunctionSpaceReqNotifications');

        // ============
        // ---- SET UP VARS
        // ============

        var mData = globalMData;
        var rData = globalRData;
        var uData = globalUData;


        sData.requesterName = $("input#Requester-Name").val();
        sData.requesterEmail = $("input#Requester-Email").val();

        sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

        sData.requestNick = $("input#Request-Nickname").val();

        sData.approvalNotes = $("textarea#Approval-Notes").val();

        mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

        mData.uriPageAdmin = mData.uriAdmin;
        mData.uriPageRequester = mData.uriRequester;
        mData.uriPageApprover = 'https://bmos.sharepoint.com';

        mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
        mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
        mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

        var eData = $.extend(sData, rData, mData, uData);

        var notificationsToSend = [];

        // for debugging
        if (true) {
            console.log('eData');
            console.log(eData);
        }



        // ============
        // ---- BEGINNING OF LIFE
        // ============

        if (typeof(eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'caller': 'beginningOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + 'new request received',
                    'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
                        '<a href="' + eData.uriFormAdmin + '">review this request\'s details</a>, ' +
                        '<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
                        'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
                        'review other ' + eData.requestName + ' requests</a>.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'caller': 'beginningOfLife requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + 'new request received',
                'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
                    '<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
                    '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
                    'with any questions, or <a href="' + eData.uriPageRequester + '">' +
                    'review other ' + eData.requestName + ' requests</a>.</p>'
            });
        }


        // ============
        // ---- APPROVED
        // ============

        if (eData.requestStatus == "Approved") {

            console.log('RS = approved');

            var messageAddendum = '';
            if (eData.approvalNotes != '') {
                messageAddendum = '<p>From ECS:</p>' +
                    '<blockquote>' + eData.approvalNotes + '</blockquote>';
            }

            // requester
            notificationsToSend.push({
                'caller': 'approved requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
                    '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                    'issues related thereto.</p>' +
                    messageAddendum
            });
        }



        // ============
        // ---- DISAPPROVED
        // ============

        if (eData.requestStatus == "Disapproved") {

            console.log('RS = disapproved');

            var messageAddendum = '';
            if (eData.approvalNotes != '') {
                messageAddendum = '<p>From ECS:</p>' +
                    '<blockquote>' + eData.approvalNotes + '</blockquote>';
            }

            // requester
            notificationsToSend.push({
                'caller': 'disapproved requester',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
                    '<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                    'issues related thereto.</p>' +
                    messageAddendum
            });
        }



        // ============
        // ---- CANCELLED
        // ============

        if (eData.requestStatus == 'Cancelled') {

            // admin
            $.each(eData.adminEmailArray, function(i, toAdmin) {
                notificationsToSend.push({
                    'caller': 'endOfLife admin',
                    'to': toAdmin,
                    'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                    'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
                        'contact the requester</a> if you need to follow up.</p>'
                });
            });

            // requester
            notificationsToSend.push({
                'caller': 'endOfLife requester generic',
                'to': eData.requesterEmail,
                'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
                'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
                    '"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
                    'issues related to this request.'
            });
        }



        // ============
        // ---- 7. SEND
        // ============

        // for debugging
        if (true) {
            console.log('notificationsToSend');
            console.log(notificationsToSend);
        }

        $.each(notificationsToSend, function(i, n) {
            setTimeout(function() {
                $().SendStandardHubEmail(n);
            }, 500);
        });

    }



    $.fn.ValidateForm = function(options) {

        // set form validation status flag
        var validForm = true;

        // remove any previoulsy-inserted error messages
        $("div#mos-form div.error-message").remove();
        $("div#mos-form div.contains-errors").removeClass("contains-errors");

        // for each input, select, and textarea
        $(this).find("input, select, textarea").each(function() {

            // set element flag
            var invalidField = 0;
            var msg = 0;

            // get element's value
            var value = $.trim($(this).val());

            // get element's special validation type, if exists
            addtlValidationType = $(this).attr("data-validation");

            // if element has "required" class
            if ($(this).hasClass("required")) {

                // console.log($(this).attr("id"));

                // if this element has a type attribute defined
                if (typeof($(this).attr("type")) != "undefined") {

                    // if element is of type radio or checkbox and there are no elelements in the named set checked
                    if (($(this).attr("type") == "radio" || $(this).attr("type") == "checkbox") && ($('input[name="' + $(this).attr("name") + '"]:checked').val() == undefined)) {
                        invalidField = 1;
                        msg = "At least one must be selected";

                        // if element is of type file and there is no file reference
                    } else if ($(this).attr("type") == "file" && typeof(($(this))[0].files[0]) == 'undefined') {
                        invalidField = 1;
                        msg = "At least one file must be selected";

                        // if this element is of a type other than radio, checkbox, or file and it has no value
                    } else if (($(this).attr("type") != "radio" && $(this).attr("type") != "checkbox") && (value.length == 0)) {
                        invalidField = 1;
                    }
                    // if this element does not have a type attribute defined and it has no value
                } else if ((value.length == 0)) {
                    invalidField = 1;
                }
            }

            // (whether this element is required or not,)
            // if it has an additional validation type and it has a value
            if (addtlValidationType != undefined && value != undefined && value.length > 0) {
                // perform the additional validation

                var addtlValidationTypeObject = isJSONParsable(ReplaceAll('DOUBLEQUOTE', '"', addtlValidationType));
                
                if (typeof(addtlValidationTypeObject) == "object") {
                    var addtlValidationTypeName = addtlValidationTypeObject.name;
                } else {
                    var addtlValidationTypeName = addtlValidationType;
                }

                switch (addtlValidationTypeName.trim()) {
                    case "validPeoplePicker":
                        validPeoplePicker(value, this);
                        break;
                    case "validDate":
                        validDate(value, this);
                        break;
                    case "validEmail":
                        validEmail(value, this);
                        break;
                    case "validNumber":
                        validNumber(value, this);
                        break;
                    case "validPositiveInteger":
                        validPositiveInteger(value, this);
                        break;
                    case "validSSN":
                        validSSN(value, this);
                        break;
                    case "validPhone":
                        validPhone(value, this);
                        break;
                    case "validURL":
                        validURL(value, this);
                        break;
                    case "validMaxQuantityChecked":
                        validMaxQuantityChecked(this);
                        break;
                    case "validAllVisibleCheckedInSet":
                        validAllVisibleCheckedInSet(addtlValidationTypeObject.checkboxFields, addtlValidationTypeObject.errorField, addtlValidationTypeObject.errorFieldValue, addtlValidationTypeObject.errorMessage);
                        break;
                }

            }

            // if the element is invalid, set the designated error message
            if (invalidField == 1) {
                $().SetErrorMessage(this, msg);
            }

        });

        // if there are any invalid fields
        if ($("div#mos-form div.error-message").first().html() != null) {
            // alter the form validation status
            validForm = false;
        }

        // return the form validation status
        return validForm;
    }



    $.fn.SetErrorMessage = function(element, msg) {
        if (typeof(msg) == 'undefined') {
            msg = 'Cannot be blank';
        } else if (msg == "") {
            msg = 'Cannot be blank';
        }

        if ($(element).closest("div.control").parent("div.label-and-control").hasClass("contains-errors") == false) {
            $(element).closest("div.control").append("<div class='error-message'>" + msg + "</div>");
            $(element).closest("div.control").parent("div.label-and-control").addClass("contains-errors");
        }
    };



    $.fn.RemoveErrorMessage = function(element) {
        $(element).closest("div.control").find("div.error-message").remove();
        $(element).closest("div.control").parent("div.label-and-control").removeClass("contains-errors");
    }



    $.fn.ValidateInRealTimeForPositiveInteger = function(value, element) {
        if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
            $().SetErrorMessage(element, 'Please enter a valid positive integer');
        } else {
            $().RemoveErrorMessage(element);
        }
    }



    $.fn.ValidateInRealTimeForDayOfWeek = function(value, element, dayOfWeek) {
        if (moment(value, "MMMM D, YYYY").day() != dayOfWeek) {
            $().SetErrorMessage(element, 'Please enter a Monday date');
        } else {
            $().RemoveErrorMessage(element);
        }
    }



    $.fn.ValidateInRealTimeForMaxQuantityCheckedInGroup = function(element, maxQuantityNumber, maxQuantityString) {
        if($("input[name='" + $(element).attr("name") + "']:checked").length > maxQuantityNumber) {
            $().SetErrorMessage(element, 'Please select no more than ' + maxQuantityString);
        } else {
            $().RemoveErrorMessage(element);
        }
    }



    $.fn.ValidateInRealTimeForAllVisibleCheckedInSet = function(checkboxFields, errorField, errorFieldValue, errorMessage) {

        if($("#" + errorField).val() == errorFieldValue) {
            
            var uncheckedInSet = 0;

            $.each(checkboxFields, function(i,checkboxField) {
                var checkboxSelector = '#' + ReplaceAll(" ", "", checkboxField);
                if ($(checkboxSelector).is(":visible") && !($(checkboxSelector).is(":checked"))) {
                    uncheckedInSet++;
                }
            });

            if (uncheckedInSet > 0) {
                $().SetErrorMessage("#" + errorField, errorMessage);
            } else {
                $().RemoveErrorMessage("#" + errorField);
            }
        }
    }



    $.fn.WarnIfTimeEarlierThan = function(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes, warningID) {
        
        if(typeof(timeOneHours) != "undefined" && typeof(timeOneMinutes) != "undefined" && typeof(timeTwoHours) != "undefined" && typeof(timeTwoMinutes) != "undefined") {
            
            var timeOneIsEarlier = $().ReturnTimeOneIsEarlierThanTimeTwo(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes);

            if (timeOneIsEarlier == 1) {
                if ($("#" + warningID).hasClass("hidden")) {
                    $("#" + warningID).show("fast").removeClass("hidden");
                }
            }
        }
    }



    $.fn.WarnIfTimeLaterThan = function(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes, warningID) {
        
        if(typeof(timeOneHours) != "undefined" && typeof(timeOneMinutes) != "undefined" && typeof(timeTwoHours) != "undefined" && typeof(timeTwoMinutes) != "undefined") {
            
            var timeOneIsLater = $().ReturnTimeOneIsLaterThanTimeTwo(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes);

            if (timeOneIsLater == 1) {
                if ($("#" + warningID).hasClass("hidden")) {
                    $("#" + warningID).show("fast").removeClass("hidden");
                }
            }
        }
    }



    $.fn.CreateWFHistoryItem = function(d) {
        // set up vars for new history item
        if (typeof(globalRData.requestID) != 'undefined') {
            var requestID = globalRData.requestID;
        } else {
            var requestID = 0;
        }
        var historyValuePairs = [
            ['MOSAPI', '1'],
            ['SWFListItemID', requestID],
            ['Description', d],
        ];
        // send value pairs to SPServices UpdateListItems to create a new item
        $().SPServices({
            operation: 'UpdateListItems',
            listName: 'Workflow History',
            webURL: StrInStr(globalMData.uriWFHistory, '/Lists/Workflow%20History', 1),
            batchCmd: 'New',
            ID: 0,
            valuepairs: historyValuePairs,
            completefunc: function(xData, Status) {
                notificationAttemptWFHistorySuccess = $().HandleListUpdateReturn(xData, Status, 'WF History List Error (Notification Attempt)');
            }
        });
    };



    $.fn.SendEmail = function(p) {

        p.siteurl = _spPageContextInfo.webServerRelativeUrl;
        p.urlTemplate = p.siteurl + "/_api/SP.Utilities.Utility.SendEmail";

        $.ajax({
            contentType: 'application/json',
            url: p.urlTemplate,
            type: "POST",
            data: JSON.stringify({
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                    'To': {
                        'results': [p.to]
                    },
                    'Body': p.body,
                    'Subject': p.subject
                }
            }),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            beforeSend: function() {
                $().CreateWFHistoryItem('Notification Attempt -- ' + p.to + ', ' + p.subject);
            },
            success: function(data) {
                $().CreateWFHistoryItem('Notification Success -- ' + p.to + ', ' + p.subject);
            },
            error: function(err) {
                $().CreateWFHistoryItem('Notification Failure -- ' + p.to + ', ' + p.subject);
            }
        });

    };



    $.fn.SendEmails = function(emailsToSend) {

        var emailSendingPromises = [];

        $.each(emailsToSend, function(i, p) {

            $().CreateStandardHubEmail(p);

            // p.from = "noreply@mos.org";
            p.siteurl = _spPageContextInfo.webServerRelativeUrl;
            p.urlTemplate = p.siteurl + "/_api/SP.Utilities.Utility.SendEmail";

            emailSendingPromises.push($.ajax({
                    contentType: 'application/json',
                    url: p.urlTemplate,
                    type: "POST",
                    data: JSON.stringify({
                        'properties': {
                            '__metadata': {
                                'type': 'SP.Utilities.EmailProperties'
                            },
                            // 'From': p.from,
                            'To': {
                                'results': [p.to]
                            },
                            'Body': p.body,
                            'Subject': p.subject
                        }
                    }),
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                    beforeSend: function() {
                        $().CreateWFHistoryItem(p.emailType + ' Attempt -- ' + p.to + ', ' + p.subject);
                    }
                })
                .done(function() {
                    $().CreateWFHistoryItem(p.emailType + ' Success -- ' + p.to + ', ' + p.subject);
                })
                .fail(function() {
                    $().CreateWFHistoryItem(p.emailType + ' Failure -- ' + p.to + ', ' + p.subject);
                }));

        });

        // Wait for all promises to complete (pass or fail) 
        return $.when.apply($, emailSendingPromises).always(function() {});
    }



    $.fn.CreateStandardHubEmail = function(n) {

        // augment message body
        n.body = '<div style="font-family: \'wf_segoe-ui_normal\', \'Segoe UI\', \'Segoe WP\', Arial, sans-serif; ' +
            '   color: #212121; font-size: 15px">' +
            n.bodyUnique +
            '   <p style="font-weight: 700">The Hub</p>' +
            '</div>';

        // return
        return n;
    };





















    $.fn.ProcessStandardHubEmail = function(p) {

        // augment message body
        p.body = '<div style="font-family: \'wf_segoe-ui_normal\', \'Segoe UI\', \'Segoe WP\', Arial, sans-serif; ' +
            '   color: #212121; font-size: 15px">' +
            p.bodyUnique +
            '   <p style="font-weight: 700">The Hub</p>' +
            '</div>';

        // send
        $().SendEmail(p);
    };






















    function validPeoplePicker(value, element) {
        var ppArray = JSON.parse($(element).val());
        $.each(ppArray, function(i, p) {
            if (p.IsResolved == false) {
                $().SetErrorMessage(element, 'Please begin entering a name or email address, and then select people from the resulting list');
            }
        });
    }



    function validDate(value, element) {

        // ======================================================================================= //
        //  IMPORTANT CONTEXTUAL NOTE: Chrome's JS engine will construct a date from a value 
        //      in 'February 14' format by substituting 2001 for the missing year. We don't 
        //      want that to happen, and we don't want to require users to replace a year we 
        //      eliminated for friendly formatting. However, since 2001 may be used legitimately 
        //      at some point, we can't just test for 2001 and replace it. Thus, we don't use
        //      date construction alone for validation. Because values could be in the correct
        //      format but still not contain valid month names, etc., we don't use regexes alone
        //      for validation.
        // ======================================================================================= //

        // if field is not disabled
        if (typeof($(element).attr('disabled')) != 'string') {
            var attemptDateConstruction = 0;

            // only allow the date construction test to be performed if value is in a known format
            //      (i.e., even if the JS engine *would* construct a date from the raw value, we're only going to 
            if (value.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/)) {
                attemptDateConstruction = 1;
            } else if (value.match(/([a-z]{3,9})\s(\d{1,2}),\s(\d{4})/i)) {
                attemptDateConstruction = 1;
            } else if (value.match(/([a-z]{3,9})\s(\d{1,2})/i)) {
                value += ', ' + moment().format('YYYY');
                $(element).val(value);
                attemptDateConstruction = 1;
            }

            // if either we haven't found a known format or we have but date construction fails
            if (attemptDateConstruction != 1 || !(!/Invalid|NaN/.test(new Date(value)))) {
                $().SetErrorMessage(element, 'Please enter a valid date');
            } else {
                var thisDate = new Date(value);
            }
        }
    }



    function validEmail(value, element) {
        if (!(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value))) {
            $().SetErrorMessage(element, 'Please enter a valid email address');
        }
    }



    function validNumber(value, element) {
        if (!(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))) {
            $().SetErrorMessage(element, 'Please enter a valid number');
        }
    }



    function validPositiveInteger(value, element) {
        if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
            $().SetErrorMessage(element, 'Please enter a valid positive integer');
        }
    }



    function validAllVisibleCheckedInSet(checkboxFields, errorField, errorFieldValue, errorMessage) {

        if($("#" + errorField).val() == errorFieldValue) {

            var uncheckedInSet = 0;

            $.each(checkboxFields, function(i,checkboxField) {
                var checkboxSelector = '#' + ReplaceAll(" ", "", checkboxField);
                if ($(checkboxSelector).is(":visible") && !($(checkboxSelector).is(":checked"))) {
                    uncheckedInSet++;
                }
            });

            if (uncheckedInSet > 0) {
                $().SetErrorMessage("#" + errorField, errorMessage);
            }
        }
    }



    function validSSN(value, element) {
        var regex = new RegExp("-", "g");
        value = value.replace(regex, "");
        var error = false;

        if (value.length != 9 || !(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))) {
            error = true;
        } else if (!(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))) {
            error = true;
        }
        if (error) {
            $().SetErrorMessage(element, 'Please enter a valid Social Security number');
        }
    }



    function validURL(value, element) {
        var urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        if (!urlPattern.test(value)) {
            $().SetErrorMessage(element, 'Please enter a valid URL');
        }
    }



    function validMaxQuantityChecked(element) {
        var maxQuantityNumber = $(element).attr("data-validation-quantity");
        var maxQuantityString = "";

        switch (maxQuantityNumber) {
            
            case "1":
                maxQuantityString = "one";
                break;
                
            case "2":
                maxQuantityString = "two";
                break;
                
            case "3":
                maxQuantityString = "three";
                break;
                
            case "4":
                maxQuantityString = "four";
                break;
                
            case "5":
                maxQuantityString = "five";
                break;
                
            case "6":
                maxQuantityString = "six";
                break;
                
            case "7":
                maxQuantityString = "seven";
                break;
                
            case "8":
                maxQuantityString = "eight";
                break;
                
            case "9":
                maxQuantityString = "nine";
                break;
                
            case "10":
                maxQuantityString = "ten";
                break;
                
        }

        if($("input[name='" + $(element).attr("name") + "']:checked").length > maxQuantityNumber) {
            $().SetErrorMessage(element, 'Please select no more than ' + maxQuantityString);
        }
    }



    function validPhone(value, element) {
        var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if (!phoneNumberPattern.test(value)) {
            $().SetErrorMessage(element, 'Please enter a valid phone number');
        }
    }


    // ---- INITIALIZE & POPULATE CONTROLS


    function InitializePeoplePicker(peoplePickerElementId) {

        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '450px';

        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);

        $('#' + peoplePickerElementId + '_TopSpan_HiddenInput').attr('data-validation', 'validPeoplePicker');

    }



    $.fn.PopulatePeoplePickerFromList = function(fieldNameOrSelector, userKeysAsString) {
        var metaObject = $().GetPeoplePickerMetaObject(fieldNameOrSelector);
        metaObject.picker.AddUserKeys(userKeysAsString, false);
    }



    $.fn.GetPeoplePickerMetaObject = function(fieldNameOrSelector) {
        // fieldNameOrSelector can be in any of these formats:
        //   -  div#mos-form #Requested-For
        //   -  #Requested-For
        //   -  Requested For
        var metaObject = {};
        metaObject.pickerID = ReplaceAll("\\.", "", ReplaceAll("#", "", ReplaceAll(" ", "-", ReplaceAll("div#mos-form ", "", fieldNameOrSelector))));
        metaObject.pickerTopSpanID = $("#" + metaObject.pickerID + '_TopSpan')[0].id;
        metaObject.picker = SPClientPeoplePicker.SPClientPeoplePickerDict[metaObject.pickerTopSpanID];
        return metaObject;
    }



    $.fn.PopulatePeoplePickerFromListAndResolve = function(fieldNameOrSelector, peopleObjectArray) {

        var metaObject = $().GetPeoplePickerMetaObject(fieldNameOrSelector);
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '450px';
        var allPeople = [];

        $.each(peopleObjectArray, function(i, p) {
            allPeople.push({
                'AutoFillDisplayText': p.displayText,
                'AutoFillKey': p.description,
                'Description': p.description,
                'DisplayText': p.displayText,
                'EntityType': 'User',
                'IsResolved': true,
                'Key': p.account,
                'Resolved': true
            });
        });

        setTimeout(function() {
            SPClientPeoplePicker_InitStandaloneControlWrapper(metaObject.pickerID, allPeople, schema);
            if ($('#' + metaObject.pickerID).hasClass("disabled") && !$('#' + metaObject.pickerTopSpanID).hasClass("disabled")) {
                $().SetFieldToDisabled('#' + metaObject.pickerID);
            }
        }, 500);
    }



    $.fn.PutAddtlPeopleInPicker = function(fieldNameOrSelector, newPeople) {
        var metaObject = $().GetPeoplePickerMetaObject(fieldNameOrSelector);
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '450px';
        var existingPeople = metaObject.picker.GetAllUserInfo();
        var allPeople = [];

        $.each(existingPeople, function(i, e) {
            allPeople.push({
                'AutoFillDisplayText': e.DisplayText,
                'AutoFillKey': e.Description,
                'Description': e.Description,
                'DisplayText': e.DisplayText,
                'EntityType': 'User',
                'IsResolved': true,
                'Key': e.Key,
                'Resolved': true
            });
        });

        $.each(newPeople, function(i, n) {
            allPeople.push({
                'AutoFillDisplayText': n.name,
                'AutoFillKey': n.email,
                'Description': n.email,
                'DisplayText': n.name,
                'EntityType': 'User',
                'IsResolved': true,
                'Key': n.account,
                'Resolved': true
            });
        });

        SPClientPeoplePicker_InitStandaloneControlWrapper(metaObject.pickerID, allPeople, schema);
    };



    $.fn.AddAssigneesFromFields = function(fields) {
        
        // this might ought to be combined with with $.fn.PutAddtlPeopleInPicker; impending deadline precludes the research to determine whether or not this would disrupt anything

        var metaObject = $().GetPeoplePickerMetaObject("Assigned-To");
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '450px';

        var newAssigneesString = "";

        $.each(fields, function(i, field) {
            if (i > 0) {
                newAssigneesString += ";#";
            }

            newAssigneesString += $('#' + field).val();
        });

        var existingAssignees = metaObject.picker.GetAllUserInfo();
        var newAssignees = $().ReturnUserDataFromPersonOrGroupFieldString(newAssigneesString);
        var allAssignees =[];

        // console.log("pp test 1");
        // console.log(metaObject.picker.GetAllUserInfo());
        $().ClearPeoplePicker("Assigned-To_TopSpan");
        // console.log("pp test 2");
        // console.log(metaObject.picker.GetAllUserInfo());

        $.each(existingAssignees, function(i, e) {
            allAssignees.push({
                'AutoFillDisplayText': e.DisplayText,
                'AutoFillKey': e.Description,
                'Description': e.Description,
                'DisplayText': e.DisplayText,
                'EntityType': 'User',
                'IsResolved': true,
                'Key': e.Key,
                'Resolved': true
            });
        });

        $.each(newAssignees, function(i, n) {

            var alreadyInAllAssignees = 0;

            $.each(allAssignees, function(i, a) {
                if (n.account == a.Key) {
                    alreadyInAllAssignees = 1;
                }
            });

            if (alreadyInAllAssignees == 0) {
                allAssignees.push({
                    'AutoFillDisplayText': n.name,
                    'AutoFillKey': n.email,
                    'Description': n.email,
                    'DisplayText': n.name,
                    'EntityType': 'User',
                    'IsResolved': true,
                    'Key': n.account,
                    'Resolved': true
                });
            }
        });

        SPClientPeoplePicker_InitStandaloneControlWrapper(metaObject.pickerID, allAssignees, schema);
    }



    $.fn.ClearPeoplePicker = function(id) {
        var ppobject = SPClientPeoplePicker.SPClientPeoplePickerDict[id];
        var usersobject = ppobject.GetAllUserInfo();
        usersobject.forEach(function(index) {
            ppobject.DeleteProcessedUser(usersobject[index]);
        });
        $("span#" + id + "_InitialHelpText").css("display", "inline");
    }



    $.fn.LoadSelectOptions = function(options, restrictions) {

        var opt = $.extend({}, {
            webURL: 'https://bmos.sharepoint.com/sites/hubprod',
            listName: "",
            firstOptionText: "",
            completefunc: null,
            restrictions: {'lowest': 0, 'highest': 1000000}
        }, options);
        var $this = this;

        return this.each(function() {

            var currentSelectedText = $($this).find("option:selected").text();

            $($this).empty();

            // multiply highest and lowest values by 100 because SP is storing the numbers as percentage values (1 = 100.000000...)
            var query = "<Query>" +
                "<Where>" +
                "<And>" +
                "   <Geq>" +
                "        <FieldRef Name='Order' />" +
                "        <Value Type='Number'>" +
                            opt.restrictions.lowest * 100 +
                "        </Value>" +
                "   </Geq>" +
                "   <Leq>" +
                "        <FieldRef Name='Order' />" +
                "        <Value Type='Number'>" +
                            opt.restrictions.highest * 100 +
                "        </Value>" +
                "   </Leq>" +
                "</And>" +
                "</Where>" +
                "   <OrderBy>" +
                "        <FieldRef Name='" + opt.orderField + "'/>" +
                "   </OrderBy>" +
                "</Query>";


            var method = "GetListItems";
            var fieldsToRead = "<ViewFields>" +
                "<FieldRef Name='" + opt.valueField + "' />" +
                "<FieldRef Name='" + opt.displayField + "' />" +
                "<FieldRef Name='" + opt.orderField + "' />" +
                "</ViewFields>";

            $().SPServices({
                operation: method,
                async: false,
                webURL: opt.webURL,
                listName: opt.listName,
                CAMLViewFields: fieldsToRead,
                CAMLQuery: query,
                completefunc: function(xData, Status) {
                    var options = "<option value=''> " + opt.firstOptionText + " </option>";

                    $(xData.responseXML).SPFilterNode("z:row").each(function() {

                        var optionOrder = ($(this).attr("ows_" + opt.orderField));
                        var optionValue = ($(this).attr("ows_" + opt.valueField));
                        var optionDisplay = ($(this).attr("ows_" + opt.displayField));

                        // replace single quotes / apostrophes so that the value renders correctly in browser
                        optionValue = optionValue.replace(/'/g, '&apos;');

                        if (optionDisplay.split(";#")[1] != undefined) {
                            optionDisplay = optionDisplay.split(";#")[1];
                        }

                        if ($.trim(optionDisplay) == $.trim(currentSelectedText)) {
                            options += "<option selected='selected' value='" + optionValue + "' >" + optionDisplay + "</option>";
                        } else {
                            options += "<option value='" + optionValue + "'>" + optionDisplay + "</option>";
                        }
                    });
                    $($this).append(options);
                    if (opt.completefunc !== null) {
                        opt.completefunc(this);
                    }

                }
            });

        });

    };



    $.fn.BuildMarkup = function(e, isAdmin, rStatus) {

        var markup = '';

        if (typeof(e.begin) != "undefined" && e.begin == 1) {
            markup = '\x3c' + e.tag;
            if (typeof(e.htmlID) != "undefined") {
                markup += ' id="' + e.htmlID + '"';
            }
            markup += ' class="';
            if (typeof(e.htmlClass) != "undefined") {
                markup += e.htmlClass
            }
            markup += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");
            markup += '"';
            if (typeof(e.scope) != "undefined") {
                markup += ' scope="' + e.scope + '"';
            }
            if (typeof(e.repeatable) != "undefined") {
                markup += ' data-repeatable="Y" ';
            }
            if (typeof(e.dataAttributes) != "undefined") {
                $.each(e.dataAttributes, function(i,dataAttribute){
                    markup += ' data-' + dataAttribute.key + '="' + dataAttribute.value + '" ';
                });
            }
            if (typeof(e.repeatSectionID) != "undefined") {
                markup += 'onclick="$().RepeatElement(\'' + e.repeatSectionID + '\');"';
            }
            if (typeof(e.removeThisRepeat) != "undefined") {
                markup += 'onclick="$().RemoveThisRepeat(this);"';
            }
            markup += '\x3e';
        }

        if (typeof(e.content) != "undefined") {
            markup += e.content;
        }

        if (typeof(e.end) != "undefined" && e.end == 1) {
            markup += '\x3c/' + e.tag + '\x3e';
        }

        return markup;

    }



    $.fn.BuildSelectField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        if (typeof(e.addtlValidationType) == "object") {
            e.addtlValidationType = ReplaceAll('"', 'DOUBLEQUOTE', JSON.stringify(e.addtlValidationType));
        }

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '           <select id="' + e.hypehnatedName + '" ';
        
        if (typeof(e.addtlValidationType) !== "undefined") {
            field += ' data-validation="' + e.addtlValidationType + '" ';
        }
        
        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }

        field += 'class="' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' ">';

        if (typeof(e.setOptions) != "undefined") {
            field += '                   <option value=""></option>';
            field += $().BuildSelectOptions(e);
        }

        field += '            </select>';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildMultifield = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-", e.multifieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-", e.multifieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control multifield';

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' + 
            '        <div id="' + e.hypehnatedName + '">';

        $.each(e.subfields, function(i, subfield) {

            subfield.hypehnatedName = ReplaceAll(",", "", ReplaceAll("&", "and", ReplaceAll("\\.", "", ReplaceAll(" ", "-", subfield.subfieldName))));
            subfield.hypehnatedNameLower = ReplaceAll(",", "", ReplaceAll("&", "and", ReplaceAll("\\.", "", ReplaceAll(" ", "-", subfield.subfieldName)))).toLowerCase();

            switch (subfield.controlType) {

                case "select":

                    field += '           <select id="' + subfield.hypehnatedName + '" ';

                    if (typeof(subfield.listFieldName) !== "undefined") {
                        field += ' listFieldName="' + subfield.listFieldName + '" ';
                    }

                    field += 'class="' +
                        $().AddMarkupClass(subfield, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
                        $().AddMarkupClass(subfield, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
                        '" ';

                    field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
                    if (typeof(subfield.helpNotes) != "undefined") {
                        field += $().AddHelpNotesReferences(subfield, isAdmin, rStatus);
                    }
                    field += ' ">';

                    if (typeof(subfield.setOptions) != "undefined") {
                        field += '                <option value=""></option>';
                        field += $().BuildSelectOptions(subfield);
                    }

                    field += '           </select>';

                    if (typeof(subfield.helpNotes) != "undefined") {
                        field += $().AddHelpNotes(subfield, isAdmin, rStatus);
                    }

                    break;

                case "text":

                    field += '        <input type="text" id="' + subfield.hypehnatedName + '"';

                    if (typeof(subfield.addtlValidationType) !== "undefined") {
                        field += ' data-validation="' + subfield.addtlValidationType + '" ';
                    }

                    if (typeof(subfield.listFieldName) !== "undefined") {
                        field += ' listFieldName="' + subfield.listFieldName + '" ';
                    }

                    field += 'class="' +
                        $().AddMarkupClass(subfield, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
                        $().AddMarkupClass(subfield, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
                        '" ';

                    field += ' aria-describedby="field-type-indicator_' + subfield.hypehnatedNameLower;
                    if (typeof(subfield.helpNotes) != "undefined") {
                        field += $().AddHelpNotesReferences(subfield, isAdmin, rStatus);
                    }
                    field += ' ">';

                    if (typeof(subfield.helpNotes) != "undefined") {
                        field += $().AddHelpNotes(subfield, isAdmin, rStatus);
                    }

                    break;

                case "checkWithQuantityField":

                    field += '           <div class="choice-container">' +
                        '                   <input  type="checkbox" name="' + e.hypehnatedName + '" id="' + e.hypehnatedNameLower + '_' + subfield.hypehnatedNameLower + '" value ="' + subfield.hypehnatedNameLower + '" ';

                    field += 'class="check-with-quantity-field ' +
                        $().AddMarkupClass(subfield, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin");

                    // we only want to look for one required radio button so we can validate the group only once (for performance)
                    if (i == 0) {
                        field += $().AddMarkupClass(subfield, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin");
                    }

                    field += '" ';

                    if (i == 0) {
                        if (typeof(e.addtlValidationType) !== "undefined") {
                            field += ' data-validation="' + e.addtlValidationType + '" ';
                        }
                        if (typeof(e.addtlValidationQuantity) !== "undefined") {
                            field += ' data-validation-quantity="' + e.addtlValidationQuantity + '" ';
                        }
                    }

                    field += 'aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' choice-set-label_' + e.hypehnatedNameLower;
                    
                    if (typeof(e.helpNotes) != "undefined") {
                        field += $().AddHelpNotesReferences(subfield, isAdmin, rStatus);
                    }
                    
                    field +=     ' ">' +
                                '                 <label for="' + e.hypehnatedNameLower + '_' + subfield.hypehnatedNameLower + '">' + subfield.subfieldName + '</label>' +
                                '            </div>' + 
                                '            <div class="subsection hidden">' +
                                '                 <div id="label-and-control_' + subfield.hypehnatedName + '" class="label-and-control text">' +
                                '                       <div class="label">' +
                                '                            <label for="' + subfield.hypehnatedName + '">Quantity</label>' +
                                '                       </div>' +
                                '                       <div class="field-type-indication"> <span id="field-type-indicator_' + subfield.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
                                '                       </div>' +
                                '                       <div class="control">' +
                                '                            <input id="' + subfield.hypehnatedName + '" class="subsection-quantity-input" aria-describedby="field-type-indicator_' + subfield.hypehnatedNameLower + ' ' + subfield.hypehnatedNameLower + '_help-note " type="text">' +
                                '                            <div class="help-text" id="' + subfield.hypehnatedNameLower + '_help-note">' + subfield.quantityType + '</div>' +
                                '                       </div>' +
                                '                 </div>' +
                                '            </div>';

                    break;

            }
        });





        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field +=     '       </div>' +
                    '    </div>' +
                    '</div>';

        return field;

    }



    $.fn.BuildPeoplePickerField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '_TopSpan_EditorInput">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '         <div id="' + e.hypehnatedName + '"';

        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }

        field += 'class="' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' data-control-type="PeoplePicker" aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += '">' +
            '         </div>';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildTextField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\,", "", ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)));
        e.hypehnatedNameLower = ReplaceAll("\\,", "", ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName))).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;



        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '         <input type="text" id="' + e.hypehnatedName + '"';

        if (typeof(e.addtlValidationType) !== "undefined") {
            field += ' data-validation="' + e.addtlValidationType + '" ';
        }

        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }

        field += 'class="' + 
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin");

        if (typeof(e.htmlClass) !== "undefined") {
            field += ' ' + e.htmlClass;
        }

        field += '" ';

        if (typeof(e.dataAttributes) != "undefined") {
            $.each(e.dataAttributes, function(i,dataAttribute){
                field += ' data-' + dataAttribute.key + '="' + dataAttribute.value + '" ';
            });
        }

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' ">';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildPhoneField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '         <input type="tel" id="' + e.hypehnatedName + '"';

        field += ' data-validation="validPhone"';

        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }

        field += 'class="' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        field += ' telephone-format-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' ">';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildTextAreaField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '         <textarea id="' + e.hypehnatedName + '"';

        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }

        field += 'class="' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += '"></textarea>';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildDatePicker = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '         <input type="text" id="' + e.hypehnatedName + '" data-is-date="true" data-validation="validDate"';

        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }

        field += 'class="date-input' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' ">';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildDatetime = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><span id="datetime-label_' + e.hypehnatedNameLower + '">' + e.labelContent + '</span></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">';

        // ---- Date Input

        field += '        <label for="date-input_' + e.hypehnatedName + '">' + e.labelContent + ' Date</label>' +
            '         <input type="text" id="date-input_' + e.hypehnatedName + '" data-is-date="true" validate="validDate"';
        field += 'class="date-input' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';
        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' ">';

        // ---- Hours Input

        field += '        <label for="hours-input_' + e.hypehnatedName + '">' + e.labelContent + ' Hours</label>' +
            '         <select id="hours-input_' + e.hypehnatedName + '" ';
        field += 'class="hours-input' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';
        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' "></select>';


        // ---- Minutes Input

        field += '        <label for="minutes-input_' + e.hypehnatedName + '">' + e.labelContent + ' Minutes</label>' +
            '         <select id="minutes-input_' + e.hypehnatedName + '" ';
        field += 'class="minutes-input' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';
        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' "></select>';

        // ---- Hidden Storage

        field += '        <input type="hidden" id="datetime-storage_' + e.hypehnatedName + '"';
        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }
        field += '>';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;
    }


    $.fn.ReturnEditabilityFlag = function(e, isAdmin, rStatus) {
        var editable = 0;
        var relevantRStatuses = [];

        // determine the relevant request statuses for editability
        if (isAdmin == 1 && typeof(e.editableForAdmin) != "undefined") {
            relevantRStatuses = e.editableForAdmin;
        }
        if (isAdmin == 0 && typeof(e.editableForNonAdmin) != "undefined") {
            relevantRStatuses = e.editableForNonAdmin;
        }

        // determine whether or not to change from anchor to input for editability
        $.each(relevantRStatuses, function(i, relevantRStatus) {
            if (relevantRStatus == rStatus) {
                editable = 1;
            }
        });

        return editable;
    }







    $.fn.BuildListItemChooserField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        var editable = $().ReturnEditabilityFlag(e, isAdmin, rStatus);

        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType +
                    $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin") + 
                    '">' +
                    '    <div class="label"><label for="' + e.hypehnatedName + '">';

        if (editable == 0) {
            field += e.nonEditableLabelContent;
        } else  {
            field += e.editableLabelContent;
        }

        field +=     '</label></div>' +
                    '    <div class="field-type-indication">' +
                    '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
                    '    </div>' +
                    '    <div class="control">';

        if (editable == 0) {
            if (e.fieldName == "Event Space Request ID") {
                field += '        <a href="" target="_blank" data-source-type="event-space-request" ';
            }
            if (e.fieldName == "Event Needs Request ID") {
                field += '        <a href="" target="_blank" data-source-type="event-needs-request" ';
            }
        } else  {
            field += '        <input type="text" ';

            if (typeof(e.addtlValidationType) !== "undefined") {
                field += ' data-validation="' + e.addtlValidationType + '" ';
            }

            if (typeof(e.listFieldName) !== "undefined") {
                field += ' listFieldName="' + e.listFieldName + '" ';
            }
        }

        field += 'id="id-or-link_' + e.hypehnatedName + '" class="id-or-link_list-item-chooser ';

        field += $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }

        if (editable == 0) {
            field += '"></a>';
        } else  {
            field +=     '">' +
                        '         <a id="anchor_' + e.hypehnatedName + '"' +
                        'class="anchor_list-item-chooser ' +
                        $().AddMarkupClass(e, isAdmin, rStatus, "hideButtonForAdmin", "hideButtonForNonAdmin") +
                        $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
                        '" aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
            
            if (typeof(e.helpNotes) != "undefined") {
                field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
            }
            
            field += ' ">' + e.choosingAnchorContent + '</a>';
        }

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildButtonWithLabelField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '         <a id="' + e.hypehnatedName + '" ';

        field += 'class="' + e.controlType +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' ">' + e.buttonContent + '</a>';

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildTime = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        if (typeof(e.htmlClass) != "undefined") {
            field += " " + e.htmlClass
        }

        field += '">' +
            '    <div class="label"><span id="time-label_' + e.hypehnatedNameLower + '">' + e.labelContent + '</span></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">';

        // ---- Date Input

        //field += '          <label for="date-input_' + e.hypehnatedName + '">' + e.labelContent + ' Date</label>' +
        //   '        <input type="text" id="date-input_' + e.hypehnatedName + '" data-is-date="true" validate="validDate"';
        //field += 'class="date-input' +
        //   $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
        //   $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
        //   '" ';
        //field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
        //if (typeof (e.helpNotes) != "undefined") { field += $().AddHelpNotesReferences(e, isAdmin, rStatus); }
        //field += ' ">';

        // ---- Hours Input

        field += '        <label for="hours-input_' + e.hypehnatedName + '">' + e.labelContent + ' Hours</label>' +
            '         <select id="hours-input_' + e.hypehnatedName + '" ';
        field += 'class="hours-input' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';
        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' time-label_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' "></select>';


        // ---- Minutes Input

        field += '        <label for="minutes-input_' + e.hypehnatedName + '">' + e.labelContent + ' Minutes</label>' +
            '         <select id="minutes-input_' + e.hypehnatedName + '" ';
        field += 'class="minutes-input' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';
        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' time-label_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }
        field += ' "></select>';

        // ---- Hidden Storage

        field += '        <input type="hidden" id="time-storage_' + e.hypehnatedName + '"';
        if (typeof(e.listFieldName) !== "undefined") {
            field += ' listFieldName="' + e.listFieldName + '" ';
        }
        field += '>';


        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildRadioButtonsOrCheckboxes = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><span id="choice-set-label_' + e.hypehnatedNameLower + '">' + e.choiceSetLabel + '</span></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">' +
            '        <div id="' + e.hypehnatedName + '">';

        $.each(e.choices, function(i, chc) {

            chc.hypehnatedValueLower = ReplaceAll(",", "", ReplaceAll("&", "and", ReplaceAll("\\.", "", ReplaceAll(" ", "-", chc.value)))).toLowerCase();

            field += '           <div class="choice-container">' +
                '                   <input  type="';
            if (e.controlType == "radio") {
                field += 'radio';
            }
            if (e.controlType == "check") {
                field += 'checkbox';
            }
            field += '" name="' + e.hypehnatedName + '" id="' + e.hypehnatedNameLower + '_' + chc.hypehnatedValueLower + '" value ="' + chc.value + '" ';

            if (typeof(e.listFieldName) !== "undefined") {
                field += ' listFieldName="' + e.listFieldName + '" ';
            }

            if (typeof(e.dataAttributes) != "undefined") {
                $.each(e.dataAttributes, function(i,dataAttribute){
                    field += ' data-' + dataAttribute.key + '="' + dataAttribute.value + '" ';
                });
            }

            field += 'class="' +
                $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin");

            // console.log(e);

            // we only want to look for one because we want to validate the group only once (for performance)
            if (i == 0) {
                field += $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin");
            }

            if (typeof(e.htmlClass) !== "undefined") {
                field += " " + e.htmlClass;
            }

            field += '" ';

            if (i == 0) {
                if (typeof(e.addtlValidationType) !== "undefined") {
                    field += ' data-validation="' + e.addtlValidationType + '" ';
                }
                if (typeof(e.addtlValidationQuantity) !== "undefined") {
                    field += ' data-validation-quantity="' + e.addtlValidationQuantity + '" ';
                }
            }


            field += 'aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' choice-set-label_' + e.hypehnatedNameLower;
            if (typeof(e.helpNotes) != "undefined") {
                field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
            }
            field += ' ">';
            field += '                <label for="' + e.hypehnatedNameLower + '_' + chc.hypehnatedValueLower + '">' + chc.display + '</label>';
            field += '           </div>'

        });

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '      </div>' +
            '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildFileField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">';

        field += $().AddInputOrLinkBeginning(e, isAdmin, rStatus, "editableForAdmin", "editableForNonAdmin", e.controlType);

        field += 'id="' + e.hypehnatedName + '" class="' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }

        field += $().AddInputOrLinkEnding(e, isAdmin, rStatus, "editableForAdmin", "editableForNonAdmin");

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.BuildURLField = function(e, isAdmin, rStatus) {

        e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
        e.hypehnatedNameLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName)).toLowerCase();

        // start building field
        var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

        field += $().AddMarkupClass(e, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");

        field += '">' +
            '    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
            '    <div class="field-type-indication">' +
            '         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
            '    </div>' +
            '    <div class="control">';

        field += $().AddInputOrLinkBeginning(e, isAdmin, rStatus, "editableForAdmin", "editableForNonAdmin", e.controlType);

        field += 'id="' + e.hypehnatedName + '" class="' +
            $().AddMarkupClass(e, isAdmin, rStatus, "disabledForAdmin", "disabledForNonAdmin") +
            $().AddMarkupClass(e, isAdmin, rStatus, "requiredForAdmin", "requiredForNonAdmin") +
            '" ';

        field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotesReferences(e, isAdmin, rStatus);
        }

        field += $().AddInputOrLinkEnding(e, isAdmin, rStatus, "editableForAdmin", "editableForNonAdmin");

        if (typeof(e.helpNotes) != "undefined") {
            field += $().AddHelpNotes(e, isAdmin, rStatus);
        }

        if (StrInStr(field, '<input', 0) != false) {
            field += '        <a class="link-tester">Check this link</a>';
        }

        field += '   </div>' +
            '</div>';

        return field;

    }



    $.fn.AddInputOrLinkBeginning = function(e, isAdmin, rStatus, adminProperty, nonAdminProperty, inputType) {

        var controlBeginningToAdd = '         <a href="" target="_blank" data-source-type="' + inputType + '" ';

        // determine the relevant request statuses for editability
        var relevantRStatuses = [];

        if (isAdmin == 1 && typeof(e[adminProperty]) != "undefined") {
            relevantRStatuses = e[adminProperty];
        }
        if (isAdmin == 0 && typeof(e[nonAdminProperty]) != "undefined") {
            relevantRStatuses = e[nonAdminProperty];
        }

        // if the actual request status is in the array of relevant request statuses for this user
        $.each(relevantRStatuses, function(i, rs) {
            if (rs == rStatus) {
                controlBeginningToAdd = '         <input type="' + inputType + '" '

                if (inputType == 'url') {
                    controlBeginningToAdd += ' data-validation="validURL" ';
                }


            }
        });

        return controlBeginningToAdd;

    }



    $.fn.AddInputOrLinkEnding = function(e, isAdmin, rStatus, adminProperty, nonAdminProperty) {

        var controlEndingToAdd = '"></a>';

        // determine the relevant request statuses for attachability
        var relevantRStatuses = [];

        if (isAdmin == 1 && typeof(e[adminProperty]) != "undefined") {
            relevantRStatuses = e[adminProperty];
        }
        if (isAdmin == 0 && typeof(e[nonAdminProperty]) != "undefined") {
            relevantRStatuses = e[nonAdminProperty];
        }

        // if the actual request status is in the array of relevant request statuses for this user
        $.each(relevantRStatuses, function(i, rs) {
            if (rs == rStatus) {
                controlEndingToAdd = '">'
            }
        });

        return controlEndingToAdd;

    }



    $.fn.AddHelpNotesReferences = function(e, isAdmin, rStatus) {

        var refsToAdd = "";

        $.each(e.helpNotes, function(i, note) {

            // determine which request status property of the note to pay attention to: hideForNonAdmin, hideForAdmin, or neither
            var relevantRStatuses = [];
            var dontAddFlag = 0;

            if (isAdmin = 1 && typeof(note.hideForAdmin) != "undefined") {
                relevantRStatuses = note.hideForAdmin;
            }
            if (isAdmin = 0 && typeof(note.hideForNonAdmin) != "undefined") {
                relevantRStatuses = note.hideForNonAdmin;
            }

            $.each(relevantRStatuses, function(i, rs) {
                if (rs == rStatus) {
                    dontAddFlag = 1;
                }
            });

            if (dontAddFlag == 0) {
                refsToAdd += ' ' + note.htmlID;
            }
        });

        return refsToAdd;

    }



    $.fn.AddHelpNotes = function(e, isAdmin, rStatus) {

        var notesToAdd = "";

        $.each(e.helpNotes, function(i, note) {

            notesToAdd += '       <div class="help-text';
            if (note.urgent == 1) {
                notesToAdd += ' urgent';
            }
            if (note.emphasis == 1) {
                notesToAdd += ' emphasis';
            }
            notesToAdd += $().AddMarkupClass(note, isAdmin, rStatus, "hideForAdmin", "hideForNonAdmin");
            notesToAdd += '" id="' + note.htmlID + '">' + note.text + '</div>';
        });

        return notesToAdd;

    }



    $.fn.AddMarkupClass = function(e, isAdmin, rStatus, adminProperty, nonAdminProperty) {

        var classToAdd = "";

        // determine which request status property of e to pay attention to: hideForNonAdmin, hideForAdmin, or neither
        var relevantRStatuses = [];

        if (isAdmin == 1 && typeof(e[adminProperty]) != "undefined") {
            relevantRStatuses = e[adminProperty];
        }
        if (isAdmin == 0 && typeof(e[nonAdminProperty]) != "undefined") {
            relevantRStatuses = e[nonAdminProperty];
        }

        // if the actual request status is in the array of relevant request statuses for this user
        $.each(relevantRStatuses, function(i, rs) {
            if (rs == rStatus) {
                if (nonAdminProperty == "hideForNonAdmin" || nonAdminProperty == "hideButtonForNonAdmin" || adminProperty == "hideForAdmin" || adminProperty == "hideButtonForAdmin") {
                    classToAdd = ' hidden';
                }
                if (nonAdminProperty == "disabledForNonAdmin" || adminProperty == "disabledForAdmin") {
                    classToAdd = ' disabled';
                }
                if (nonAdminProperty == "requiredForNonAdmin" || adminProperty == "requiredForAdmin") {
                    classToAdd = ' required';
                }
            }
        });

        return classToAdd;

    }



    $.fn.BuildSelectOptions = function(e) {

        var optionsToAdd = "";

        if (typeof(e.setOptions) != "undefined") {
            $.each(e.setOptions, function(i, opt) {
                optionsToAdd += '                 <option value="' + opt.value + '">' + opt.display + '</option>';
            });
        }

        return optionsToAdd;

    }



    $.fn.SetFieldToRequired = function(id, type, repeatable) {
        // console.log("id");
        // console.log(id);
        // console.log("type");
        // console.log(type);
        // console.log("repeatable");
        // console.log(repeatable);
        if (typeof(type) != "undefined") {
            type = type.toLowerCase();
            if (type == "radio" || type == "check" || type == "checkorradio") {
                $('input[name="' + id + '"]').first().addClass('required');
            } else if (type == "peoplepicker") {
                $('#' + id + '_TopSpan_HiddenInput').addClass('required');
            } else if (type == "text" || type == "textarea" || type == "url" || type == "file" || type == "select" || type == "datepicker") {
                $('#' + id).addClass("required");
            } else if (type == "datetime") {
                $('#date-input_' + id).addClass("required");
                $('#hours-input_' + id).addClass("required");
                $('#minutes-input_' + id).addClass("required");
            }
        } else if (typeof($('#' + id).attr('data-control-type') != 'undefined')) {
            if ($('#' + id).attr('data-control-type') == 'PeoplePicker') {
                var elID = $('#' + id).attr('id');
                $('#' + elID + '_TopSpan_HiddenInput').addClass('required');
            }
        } else {
            if ($('#' + id).hasClass("required") == false) {
                $('#' + id).addClass("required");
            }
        }

        if ($('#' + id).length) {
            $('#' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-required").children("span.message").removeClass("message-optional").addClass("message-required").text("Required Field");
        } else if ($('#date-input_' + id).length) {
            $('#date-input_' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-required").children("span.message").removeClass("message-optional").addClass("message-required").text("Required Field");
        }

        // if repeatable == 1, call this function again
        if (typeof(repeatable) != 'undefined' && repeatable == 1) {

            // find the id #s of the repeats
            var repeatIDs = [];

            if (type == "radio" || type == "check" || type == "checkorradio") {
                // repeat function needs to alter input names before this can begin to be made to work
                //$('input[name^="' + id + '-repeat"]').each(function () {
                //   repeatIDs.push($(this).attr('id'));
                //});
            } else if (type == "peoplepicker") {
                // repeat function needs to alter people picker IDs before this can begin to be made to work
                //$('#' + id + '_TopSpan_HiddenInput').each(function () {
                //   repeatIDs.push($(this).attr('id'));
                //});
            } else if (type == "text" || type == "textarea" || type == "select" || type == "datepicker") {
                $("[id^='" + id + "-repeat']").each(function() {
                    repeatIDs.push($(this).attr('id'));
                });
            } else if (type == "datetime") {
                $("[id^='date-input_" + id + "-repeat']").each(function() {
                    repeatIDs.push($(this).attr('id'));
                });
            }

            // for each repeatID
            $.each(repeatIDs, function(i, repeatID) {
                $().SetFieldToRequired(ReplaceAll('date-input_', '', repeatID), type, 0);
            });

        }
    }



    $.fn.SetFieldToOptional = function(id, type, repeatable) {

        if (typeof(type) != "undefined") {
            type = type.toLowerCase();
            if (type == "radio" || type == "check" || type == "checkorradio") {
                $('input[name="' + id + '"]').first().removeClass('required');
            } else if (type == "peoplepicker") {
                $('#' + id + '_TopSpan_HiddenInput').removeClass('required');
            } else if (type == "text" || type == "textarea" || type == "url" || type == "file" || type == "select" || type == "datepicker") {
                $('#' + id).removeClass("required");
            } else if (type == "datetime") {
                $('#date-input_' + id).removeClass("required");
                $('#hours-input_' + id).removeClass("required");
                $('#minutes-input_' + id).removeClass("required");
            }
        } else if (typeof($(id).attr('data-control-type') != 'undefined')) {
            if ($(id).attr('data-control-type') == 'PeoplePicker') {
                var elID = $(id).attr('id');
                $('#' + elID + '_TopSpan_HiddenInput').removeClass('required');
            }
        } else {
            $('#' + id).removeClass("required");
        }

        if ($('#' + id).length) {
            $('#' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-required").addClass("field-optional").children("span.message").removeClass("message-required").addClass("message-optional").text("Optional Field");
        } else if ($('#date-input_' + id).length) {
            $('#date-input_' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-required").addClass("field-optional").children("span.message").removeClass("message-required").addClass("message-optional").text("Optional Field");
        }

        // if repeatable == 1, call this function again
        if (typeof(repeatable) != 'undefined' && repeatable == 1) {

            // find the id #s of the repeats
            var repeatIDs = [];

            if (type == "radio" || type == "check" || type == "checkorradio") {
                // repeat function needs to alter input names before this can begin to be made to work
                //$('input[name^="' + id + '-repeat"]').each(function () {
                //   repeatIDs.push($(this).attr('id'));
                //});
            } else if (type == "peoplepicker") {
                // repeat function needs to alter people picker IDs before this can begin to be made to work
                //$('#' + id + '_TopSpan_HiddenInput').each(function () {
                //   repeatIDs.push($(this).attr('id'));
                //});
            } else if (type == "text" || type == "textarea" || type == "select" || type == "datepicker") {
                $("[id^='" + id + "-repeat']").each(function() {
                    repeatIDs.push($(this).attr('id'));
                });
            } else if (type == "datetime") {
                $("[id^='date-input_" + id + "-repeat']").each(function() {
                    repeatIDs.push($(this).attr('id'));
                });
            }

            // for each repeatID
            $.each(repeatIDs, function(i, repeatID) {
                $().SetFieldToOptional(ReplaceAll('date-input_', '', repeatID), type, 0);
            });

        }

    }



    $.fn.SetFieldToDisabled = function(e) {

        // if this is a PeoplePicker field
        if ($(e + '_TopSpan_EditorInput').length) {
            var elemID = e + '_TopSpan_EditorInput';
            $(elemID).prop("disabled", true);
            $(e + "_TopSpan_InitialHelpText").empty();
            $(e + "_TopSpan").attr("title", "").addClass("mos_people-picker-disabled");
            $(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-disabled").children("span.message").removeClass("message-optional").addClass("message-disabled").text("Disabled Field");
        } else {
            if (($(e).is("input") && $(e).attr("type") == "text") || $(e).is("textarea")) {
                $(e).prop("readonly", true);
                $(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-disabled").children("span.message").removeClass("message-optional").addClass("message-disabled").text("Read-only Field");
            } else {
                $(e).prop("disabled", true);
                $(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-disabled").children("span.message").removeClass("message-optional").addClass("message-disabled").text("Disabled Field");
            }
        }

    }



    $.fn.SetFieldToEnabled = function(e) {

        // if this is a PeoplePicker element
        if ($(e + '_TopSpan_EditorInput').length) {
            var p = 1;
            var elemID = e + '_TopSpan_EditorInput';
        } else {
            var p = 0;
            var elemID = e;
        }

        if ($(elemID).prop("disabled") != false) {
            $(elemID).prop("disabled", false);
        } else {
            $(elemID).prop("readonly", false);
        }

        if (p == 1) {
            $(e + "_TopSpan_InitialHelpText").text("Enter names or email addresses...");
            $(e + "_TopSpan").attr("title", "").removeClass("mos_people-picker-disabled");
        }

        if ($(elemID).hasClass("disabled")) {
            $(elemID).removeClass("disabled");
        }

        $(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-disabled").addClass("field-optional").children("span.message").removeClass("message-disabled").addClass("message-optional").text("Optional Field");
    }



    function PopulateFormData(form, formData, uriRoot, requestID, checkForAlternateEventDataToPopulate) {
        // console.log('got to here 01');
        var formDataCopy = {};
        // console.log('got to here 02');
        // console.log(formData);
        $.each(formData, function(formDatumKey, formDatumValue) {
            formDataCopy[formDatumKey] = formDatumValue;
        });
        // console.log('got to here 03');

        // if we should *check for* alternate event data to populate
        if (typeof(checkForAlternateEventDataToPopulate) != 'undefined') {

            //var occurrenceDate = $().GetParamFromUrl(location.search, "date");
            var exceptionID = $().GetParamFromUrl(location.search, "exceptionID");

            if (exceptionID != "") {
                $(formDataCopy["datesToAdd"]).each(function(i, e) {
                    if (e["exceptionID"] == exceptionID) {
                        formDataCopy["hours-input_Start-Time"] = e["hours-input_Start-Time"];
                        formDataCopy["minutes-input_Start-Time"] = e["minutes-input_Start-Time"];
                        formDataCopy["hours-input_End-Time"] = e["hours-input_End-Time"];
                        formDataCopy["minutes-input_End-Time"] = e["minutes-input_End-Time"];
                        formDataCopy["time-storage_Start-Time"] = e["time-storage_Start-Time"];
                        formDataCopy["time-storage_End-Time"] = e["time-storage_End-Time"];
                        formDataCopy["Event-Location"] = e["Event-Location"];
                        formDataCopy["Event-Notes"] = e["Event-Notes"];
                        formDataCopy["Exception-ID"] = e["exceptionID"];
                    }
                });
            }
        }

        // console.log('got to here 04');
        for (field in formDataCopy) {

            // get the field in the form that matches the stored data value
            element = $(form).find("#" + field);

            // if the stored data value is RepeatedElements
            if (field === "RepeatedElements") {

                // console.log('RepeatedEl field found');

                // get the array of stored repeat items
                var repeatableArray = formDataCopy[field];

                // for each item in that array
                for (index in repeatableArray) {

                    // if this array element has an original defined, then repeat said original
                    if (repeatableArray[index].OriginalToRepeat != "undefined") {
                        $().RepeatElement(repeatableArray[index].OriginalToRepeat, repeatableArray[index].ID);
                    }
                    // get the page element that correponds to this array element
                    var thisRepeatableForm = $(form).find("#" + repeatableArray[index].ID);

                    // treat the page element and the array element like a form to be populated
                    PopulateFormData(thisRepeatableForm, repeatableArray[index], uriRoot, requestID);
                }

            } else if ($(element).is("select")) {
                $().SetSelectByText(element, formDataCopy[field]);
                // console.log($(element));
            } else if ($(element).is("a")) {
                // console.log($(element));

                if (formDataCopy[field] != '') {

                    if ($(element).attr('data-source-type') == 'url') {
                        $(element).attr('href', formDataCopy[field]).text(formDataCopy[field]);
                    }

                    if ($(element).attr('data-source-type') == 'event-needs-request') {
                        $(element).attr('href', 'https://bmos.sharepoint.com/sites/vxo-event-needs/SitePages/In-House Needs Sheet Request.aspx?requestID=' + formDataCopy[field]).text('#' + formDataCopy[field]);
                    }

                    if ($(element).attr('data-source-type') == 'event-space-request') {
                        $(element).attr('href', 'https://bmos.sharepoint.com/sites/vxo-event-space/SitePages/Event Space Request.aspx?requestID=' + formDataCopy[field]).text('#' + formDataCopy[field]);
                    }

                    if ($(element).attr('data-source-type') == 'file') {
                        $(element).attr('href', uriRoot + '/Attachments/' + requestID + '/' + formDataCopy[field]).text(formDataCopy[field]);
                    }

                }
            } else if ($(element).is("div") || $(element).is("span")) {
                // console.log($(element));
                if ($(element).attr("data-control-type") != undefined && $(element).attr("data-control-type") == "PeoplePicker") {
                    if (formDataCopy[field] != '') {
                        $().PopulatePeoplePickerFromListAndResolve(element.selector, formDataCopy[field]);
                    }
                } else {
                    $(element).html(HtmlDecode(formDataCopy[field]));
                }
            } else {
                // console.log($(element));
                if ($(element).attr("type") == "radio" || $(element).attr("type") == "checkbox") {
                    if (StrInStr(element.selector, '#approval-indicator') == false) {
                        $(element).attr("checked", true);
                    }
                } else {
                    if (element.selector == 'div#mos-form #Historical-Admin-Notes') {
                        $(element).val(ReplaceAll("' '", "\r \r", HtmlDecode(formDataCopy[field])));
                    } else if (StrInStr(element.selector, '#approval-signature') == false && StrInStr(element.selector, '#approval-date') == false && StrInStr(element.selector, '#Approval-Notes') == false) {
                        $(element).val(HtmlDecode(formDataCopy[field]));
                    }
                }
            }
        }
    }



    $.fn.SetSelectByText = function(select, value) {
        var relevantOptionIndex = $().ReturnOptionIndexByText($(select), value);
        if (typeof(relevantOptionIndex) != 'undefined') {
            $(select).prop("selectedIndex", relevantOptionIndex);
        } else {
            console.log("wrong setting method");
            $(select).append("<option selected='selected'>" + value + "</option>");
        }
    }



    $.fn.ReturnOptionIndexByText = function(relevantSelect, relevantOptionText) {
        var relevantOptionIndex;
        $(relevantSelect).children("option").each(function(i) {
            if (HtmlEncode($(this).text().trim()) == HtmlEncode(relevantOptionText.trim())) {
                relevantOptionIndex = i;
            }
        });
        return relevantOptionIndex;
    }



    $.fn.ReturnSelectedOptionIndex = function(relevantSelect) {
        var relevantOptionIndex;
        $(relevantSelect + " option:selected").children("option").each(function(i) {
            if (HtmlEncode($(this).text().trim()) == HtmlEncode(relevantOptionText.trim())) {
                relevantOptionIndex = i;
            }
        });
        return relevantOptionIndex;
    }



    // ---- REPEAT & REMOVE REPEATS


    // doesn't handle people pickers
    $.fn.RepeatElement = function(originalToRepeat, submittedID) {



        // --- get the id # of the last existing repeat

        var lastRepeatIDNumber = 0;
        // if any repeats are found, get the number off of the end of the last one's id
        if ($("[id^='" + originalToRepeat + "-repeat']").length) {
            lastRepeatIDNumber = Number($("[id^='" + originalToRepeat + "-repeat']").last().attr('id').slice(-1));
        }



        // --- determine the id of the element after which to insert the repeat

        // if no repeats were found
        if (lastRepeatIDNumber == 0) {
            // insert after the original
            var insertAfterID = originalToRepeat;
            // otherwise
        } else {
            // construct an id to insert after
            var insertAfterID = originalToRepeat + '-repeat-' + lastRepeatIDNumber;
        }



        // --- use submittedID for newRepeatID, or construct a new one

        // if there's a submittedID
        if (typeof(submittedID) != 'undefined') {
            // use it
            var newRepeatID = submittedID;
            // otherwise
        } else {
            // construct a new one
            var newRepeatID = originalToRepeat + "-repeat-" + (lastRepeatIDNumber + 1);
        }



        // --- create and insert the new repeat; give it the appropriate ID and data-original-to-repeat values
        $("#" + insertAfterID).after($("#" + originalToRepeat).clone().attr("id", newRepeatID).attr("data-original-to-repeat", originalToRepeat));



        // --- clear the values in the new repeat
        $("#" + newRepeatID).find(':input').each(function() {
            switch (this.type) {
                case 'password':
                case 'text':
                case 'textarea':
                case 'file':
                case 'url':
                case 'select-one':
                case 'select-multiple':
                    $(this).val('');
                    break;
                case 'checkbox':
                case 'radio':
                    this.checked = false;
            }
        });

        $("#" + newRepeatID).find('a').each(function() {
            if ($(this).attr('data-source-type') == 'url' || $(this).attr('data-source-type') == 'file') {
                $(this).attr('href', '');
                $(this).text('');
            }
        });




        



        // --- update ID, for, aria-described-by attributes on new repeat's descendant elements

        $('#' + newRepeatID).find('[id^="label-and-control"], label, div.label > span, span.field-type-indicator, div.help-text, :input, a').each(function() {

            // if there's a submittedID
            if (typeof(submittedID) != 'undefined') {
                // use the number on the end of it
                var newRepeatDescendantIDNumber = submittedID.slice(-1);
                // otherwise
            } else {
                // construct a new one
                var newRepeatDescendantIDNumber = lastRepeatIDNumber + 1;
            }

            // if id exists, update it
            if (typeof($(this).attr('id')) != 'undefined') {
                $(this).attr('id', $(this).attr('id') + '-repeat-' + newRepeatDescendantIDNumber);
            }

            // if for exists, update it
            if (typeof($(this).attr('for')) != 'undefined') {
                $(this).attr('for', $(this).attr('for') + '-repeat-' + newRepeatDescendantIDNumber);
            }

            // if aria-described-by exists, update it
            if (typeof($(this).attr('aria-describedby')) != 'undefined') {
                var oldAriaDescribedByString = $(this).attr('aria-describedby');
                var oldAriaDescribedByArray = oldAriaDescribedByString.split(' ');
                var newAriaDescribedByString = '';
                var ariaDescriberSeparator = '';

                $.each(oldAriaDescribedByArray, function(i, d) {
                    if (d.length) {
                        newAriaDescribedByString += ariaDescriberSeparator + d + '-repeat-' + newRepeatDescendantIDNumber;
                        ariaDescriberSeparator = ' ';
                    }
                });

                $(this).attr('aria-describedby', newAriaDescribedByString);
            }

            // if listfieldname exists, remove it
            if (typeof($(this).attr('listfieldname')) != 'undefined') {
                $(this).removeAttr('listfieldname');
            }

        });



        // --- set datepickers in the new repeat

        $('#' + newRepeatID + ' input.date-input').removeClass('hasDatepicker');
        $('#' + newRepeatID + ' input.date-input').datepicker({
            'changeMonth': 'true',
            'changeYear': 'true',
            'dateFormat': 'MM d, yy'
        });
    }



    $.fn.RemoveThisRepeat = function(e) {
        $(e).closest('div.repeat-container').remove();
    }


    // ---- AUTO-GENERATED SCRIPT


    $.fn.BuildScript = function(e, uData, mData) {

        var stmtsToAdd = '';

        if (typeof(e.fieldName) != "undefined") {
            e.hypehnatedName = ReplaceAll("\\.", "", ReplaceAll(" ", "-",  e.fieldName));
            e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();
        }

        // if an onchange value has been defined
        if (typeof(e.onChange) != "undefined") {

            // set up the onchange event handler
            if (e.controlType == "radio" || e.controlType == "check") {

                var chcQuantity = e.choices.length;
                stmtsToAdd += '\n$("';

                $.each(e.choices, function(i, chc) {
                    chc.hypehnatedValueLower = ReplaceAll("\\.", "", ReplaceAll(" ", "-", chc.value)).toLowerCase();
                    stmtsToAdd += '#' + e.hypehnatedNameLower + '_' + chc.hypehnatedValueLower;
                    if ((i + 1) < chcQuantity) {
                        stmtsToAdd += ', ';
                    }
                });

                stmtsToAdd += '").on("change", function () { \n';

            } else if (e.controlType == "listItemChooser") {

                stmtsToAdd += '$("#id-or-link_' + e.hypehnatedName + '").on("change", function () { \n';

            } else if (e.controlType == "datetime") {

                stmtsToAdd += '$("#date-input_' + e.hypehnatedName + ', #hours-input_' + e.hypehnatedName + ', #minutes-input_' + e.hypehnatedName + '").on("change", function () { \n';

            } else {

                stmtsToAdd += '$("#' + e.hypehnatedName + '").on("change", function () { \n';
            }

            // for each object in the onChange array
            $.each(e.onChange, function(i, chg) {
                if (typeof(chg.thisFieldEquals) != "undefined") {
                    stmtsToAdd += ' var comparisonBank = [';
                    $.each(chg.thisFieldEquals, function(i, comp) {
                        if (i != 0) {
                            stmtsToAdd += ', ';
                        }
                        stmtsToAdd += '"' + comp + '"';
                    });
                    stmtsToAdd += ']; \n';
                    stmtsToAdd += ' if (comparisonBank.indexOf($(this).val()) > -1) { \n';
                } else if (typeof(chg.thisFieldNotEquals) != "undefined") {
                    stmtsToAdd += ' var comparisonBank = [';
                    $.each(chg.thisFieldNotEquals, function(i, comp) {
                        if (i != 0) {
                            stmtsToAdd += ', ';
                        }
                        stmtsToAdd += '"' + comp + '"';
                    });
                    stmtsToAdd += ']; \n';
                    stmtsToAdd += ' if (comparisonBank.indexOf($(this).val()) == -1) { \n';
                } else if (typeof(chg.thisFieldIsPositiveInteger) != "undefined") {
                    if (chg.thisFieldIsPositiveInteger == 1) {
                        stmtsToAdd += ' if (/^[0-9]*[1-9][0-9]*$/.test($(this).val())) { \n';
                    } else if (chg.thisFieldIsPositiveInteger == 0) {
                        stmtsToAdd += ' if (!(/^[0-9]*[1-9][0-9]*$/.test($(this).val()))) { \n';
                    }
                } else if (typeof(chg.thisFieldIsChecked) != "undefined") {
                    if (chg.thisFieldIsChecked == 1) {
                        stmtsToAdd += ' if ($(this).is(":checked")) { \n';
                    } else {
                        stmtsToAdd += ' if (!$(this).is(":checked")) { \n';
                    }
                } else if (typeof(chg.anyOfSpecificCheckboxesAreChecked) != "undefined") {
                    stmtsToAdd += ' if (';
                    $.each(chg.anyOfSpecificCheckboxesAreChecked, function(i, checkbox) {
                        if (i != 0) {
                            stmtsToAdd += ' || ';
                        }
                        stmtsToAdd += ' $("' + checkbox + '").is(":checked")';
                    });
                    stmtsToAdd += ') { \n';
                } else if (typeof(chg.allOfSpecificCheckboxesAreChecked) != "undefined") {
                    stmtsToAdd += ' if (';
                    $.each(chg.allOfSpecificCheckboxesAreChecked, function(i, checkbox) {
                        if (i != 0) {
                            stmtsToAdd += ' && ';
                        }
                        stmtsToAdd += ' $("' + checkbox + '").is(":checked")';
                    });
                    stmtsToAdd += ') { \n';
                } else if (typeof(chg.noneOfSpecificCheckboxesAreChecked) != "undefined") {
                    stmtsToAdd += ' if (';
                    $.each(chg.noneOfSpecificCheckboxesAreChecked, function(i, checkbox) {
                        if (i != 0) {
                            stmtsToAdd += ' && ';
                        }
                        stmtsToAdd += ' !($("' + checkbox + '").is(":checked"))';
                    });
                    stmtsToAdd += ') { \n';
                } else if (typeof(chg.thisFieldLessThan) != "undefined") {
                    stmtsToAdd += ' if ($(this).val() < ' + chg.thisFieldLessThan + ') { \n';
                } else if (typeof(chg.thisFieldLessThanEqualTo) != "undefined") {
                    stmtsToAdd += ' if ($(this).val() <= ' + chg.thisFieldLessThanEqualTo + ') { \n';
                } else if (typeof(chg.thisFieldGreaterThan) != "undefined") {
                    stmtsToAdd += ' if ($(this).val() > ' + chg.thisFieldLessThan + ') { \n';
                } else if (typeof(chg.thisFieldGreaterThanEqualTo) != "undefined") {
                    stmtsToAdd += ' if ($(this).val() >= ' + chg.thisFieldGreaterThanEqualTo + ') { \n';
                } else if (typeof(chg.thisDateFieldLessThanDaysFromNow) != "undefined") {
                    stmtsToAdd += ' if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date().toLocaleString() + '") < ' + chg.thisDateFieldLessThanDaysFromNow + ') { \n';
                } else if (typeof(chg.thisDateFieldLessThanEqualToDaysFromNow) != "undefined") {
                    stmtsToAdd += ' if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date() + '") <= ' + chg.thisDateFieldLessThanEqualToDaysFromNow + ') { \n';
                } else if (typeof(chg.thisDateFieldGreaterThanDaysFromNow) != "undefined") {
                    stmtsToAdd += ' if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date() + '") > ' + chg.thisDateFieldGreaterThanDaysFromNow + ') { \n';
                } else if (typeof(chg.thisDateFieldGreaterThanDaysFromNowEqualTo) != "undefined") {
                    stmtsToAdd += ' if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date().toLocaleString() + '") >= ' + chg.thisDateFieldGreaterThanDaysFromNowEqualTo + ') { \n';
                } else if (typeof(chg.thisTimeFieldSetEarlierThan) != "undefined") {
                    stmtsToAdd += ' if (typeof($("select#hours-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#hours-input_' + e.hypehnatedName + '").val() != "" && typeof($("select#minutes-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#minutes-input_' + e.hypehnatedName + '").val()!= "" && $().ReturnTimeOneIsEarlierThanTimeTwo($("select#hours-input_' + e.hypehnatedName + '").val(), $("select#minutes-input_' + e.hypehnatedName + '").val(), "' + chg.thisTimeFieldSetEarlierThan.hours + '", "' + chg.thisTimeFieldSetEarlierThan.minutes + '") != 0) { \n';
                } else if (typeof(chg.thisTimeFieldSetLaterThan) != "undefined") {
                    stmtsToAdd += ' if (typeof($("select#hours-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#hours-input_' + e.hypehnatedName + '").val() != "" && typeof($("select#minutes-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#minutes-input_' + e.hypehnatedName + '").val()!= "" && $().ReturnTimeOneIsLaterThanTimeTwo($("select#hours-input_' + e.hypehnatedName + '").val(), $("select#minutes-input_' + e.hypehnatedName + '").val(), "' + chg.thisTimeFieldSetLaterThan.hours + '", "' + chg.thisTimeFieldSetLaterThan.minutes + '") != 0) { \n';
                }

            

                if (typeof(chg.addlOrConditions) != "undefined") {
                    stmtsToAdd += '         if (';

                    $.each(chg.addlOrConditions, function(i, orCond) {
                        if (i != 0) {
                            stmtsToAdd += ' || ';
                        }
                        stmtsToAdd += orCond;
                    });

                    stmtsToAdd += ') { \n';
                }

                if (typeof(chg.addlAndConditions) != "undefined") {
                    stmtsToAdd += '         if (';

                    $.each(chg.addlAndConditions, function(i, andCond) {
                        if (i != 0) {
                            stmtsToAdd += ' && ';
                        }
                        stmtsToAdd += andCond;
                    });

                    stmtsToAdd += ') { \n';
                }



                // if this change includes a show
                if (typeof(chg.show) != "undefined") {

                    // for each value in the show array
                    $.each(chg.show, function(i, sh) {
                        if (typeof(sh.fieldName) != "undefined") {
                            var shID = '#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.fieldName));
                        }
                        if (typeof(sh.noteID) != "undefined") {
                            var shID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.noteID));
                        }
                        if (typeof(sh.divID) != "undefined") {
                            var shID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.divID));
                        }
                        if (typeof(sh.divClass) != "undefined") {
                            var shID = '.' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.divClass));
                        }

                        // if not visible, show
                        stmtsToAdd += '     if (!$("' + shID + '").is(":visible")) { \n' +
                            '           $("' + shID + '").show("fast"); \n' +
                            '           $("' + shID + '").removeClass("hidden"); \n' +
                            '       } \n';
                    });

                }

                // if this change includes a hide
                if (typeof(chg.hide) != "undefined") {

                    // for each value in the show array
                    $.each(chg.hide, function(i, hd) {
                        if (typeof(hd.fieldName) != "undefined") {
                            var hdID = '#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.fieldName));
                        }
                        if (typeof(hd.noteID) != "undefined") {
                            var hdID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.noteID));
                        }
                        if (typeof(hd.divID) != "undefined") {
                            var hdID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.divID));
                        }
                        if (typeof(hd.divClass) != "undefined") {
                            var hdID = '.' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.divClass));
                        }

                        // if visible, hide
                        stmtsToAdd += '     if ($("' + hdID + '").is(":visible")) { \n' +
                            '           $("' + hdID + '").hide("fast"); \n' +
                            '           $("' + hdID + '").addClass("hidden"); \n' +
                            '       } \n';
                    });

                }

                // if this change includes a require
                if (typeof(chg.require) != "undefined") {

                    // for each value in the require array
                    $.each(chg.require, function(i, req) {

                        // if repeatable isn't set, set to 0
                        req = $.extend({
                            'repeatable': 0
                        }, req);
                        // if not required, require
                        stmtsToAdd += '     if (!$("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", req.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-required")) { \n' +
                            '           $(this).SetFieldToRequired("' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", req.fieldName)) + '", "' + req.type + '", "' + req.repeatable + '"); \n' +
                            '       } \n';

                    });

                }

                // if this change includes an optional
                if (typeof(chg.optional) != "undefined") {

                    // for each value in the show array
                    $.each(chg.optional, function(i, optl) {

                        // if repeatable isn't set, set to 0
                        optl = $.extend({
                            'repeatable': 0
                        }, optl);
                        // if not optional, make optional
                        stmtsToAdd += '     if ($("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", optl.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-required")) { \n' +
                            '           $(this).SetFieldToOptional("' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", optl.fieldName)) + '", "' + optl.type + '", "' + optl.repeatable + '"); \n' +
                            '       } \n';
                    });

                }

                // if this change includes a disabled
                if (typeof(chg.disable) != "undefined") {

                    // for each value in the show array
                    $.each(chg.disable, function(i, dis) {
                        // if not visible, show
                        stmtsToAdd += '     if (!$("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", dis.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-disabled")) { \n';

                        if (typeof(dis.inputIDs) != 'undefined') {
                            $(dis.inputIDs).each(function(inputIDIndex, InputIDValue) {
                                stmtsToAdd += '         $().SetFieldToDisabled("#' + InputIDValue + '"); \n';
                            });
                        }

                        if (typeof(dis.selectIDs) != 'undefined') {
                            $(dis.selectIDs).each(function(selectIDIndex, selectIDValue) {
                                stmtsToAdd += '         $().SetFieldToDisabled("#' + selectIDValue + '"); \n';
                            });
                        }

                        if (typeof(dis.inputIDs) == 'undefined' && typeof(dis.selectIDs) == 'undefined') {
                            stmtsToAdd += '         $().SetFieldToDisabled("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", dis.fieldName)) + '"); \n';
                        }

                        stmtsToAdd += '     } \n';
                    });

                }

                // if this change includes an enabled
                if (typeof(chg.enable) != "undefined") {

                    // for each value in the show array
                    $.each(chg.enable, function(i, en) {
                        // if not visible, show
                        stmtsToAdd += '     if ($("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-disabled")) { \n';

                        if (typeof(en.inputIDs) != 'undefined') {
                            $(en.inputIDs).each(function(inputIDIndex, InputIDValue) {
                                stmtsToAdd += '         $().SetFieldToEnabled("#' + InputIDValue + '"); \n';
                                stmtsToAdd += '         if ($("#' + InputIDValue + '").attr("data-is-date") == true) { \n';
                                stmtsToAdd += '              $("#' + InputIDValue + '").datepicker({ \n';
                                stmtsToAdd += '                  changeMonth: "true", \n';
                                stmtsToAdd += '                   changeYear: "true", \n';
                                stmtsToAdd += '                   dateFormat: "MM d, yy" \n';
                                stmtsToAdd += '              }); \n';
                                stmtsToAdd += '         } \n';

                            });
                        }

                        if (typeof(en.selectIDs) != 'undefined') {
                            $(en.selectIDs).each(function(selectIDIndex, selectIDValue) {
                                stmtsToAdd += '         $().SetFieldToEnabled("#' + selectIDValue + '"); \n';
                            });
                        }

                        if (typeof(en.inputIDs) == 'undefined' && typeof(en.selectIDs) == 'undefined') {
                            stmtsToAdd += '         $().SetFieldToEnabled("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + '"); \n';
                            stmtsToAdd += '         if ($("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + '").attr("data-is-date") == "true") { \n';
                            stmtsToAdd += '              $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + '").datepicker({ \n';
                            stmtsToAdd += '                  changeMonth: "true", \n';
                            stmtsToAdd += '                   changeYear: "true", \n';
                            stmtsToAdd += '                   dateFormat: "MM d, yy" \n';
                            stmtsToAdd += '              }); \n';
                            stmtsToAdd += '         } \n';
                        }

                        stmtsToAdd += '     } \n';
                    });

                }

                // if this change includes a checkbox label update
                if (typeof(chg.checkboxLabelUpdate) != "undefined") {

                    // for each value in the checkboxLabelUpdate array
                    $.each(chg.checkboxLabelUpdate, function(i, l) {
                        stmtsToAdd += '     $("label[for=\'' + l.labelFor + '\']").html("' + l.newLabel + '"); \n';
                    });

                }

                // if this change includes a set
                if (typeof(chg.set) != "undefined") {

                    // for each value in the set array
                    $.each(chg.set, function(i, set) {
                        if (set.type == "text" || set.type == "textarea") {
                            if (typeof(set.method) != "undefined" && set.method == "dynamic") {
                                stmtsToAdd += '   $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val(' + set.value + '); \n';
                            } else {
                                stmtsToAdd += '   $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val("' + set.value + '"); \n';
                            }
                        } else if (set.type == "radio") {
                            // to be completed
                        } else if (set.type == "checkbox") {
                            // to be completed
                        } else if (set.type == "select") {
                            stmtsToAdd += '   $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").prop("selectedIndex", ' + set.optionIndex + '); \n';
                        } else if (set.type == "datetime") {
                            if (typeof(set.method) != "undefined" && set.method == "dynamic" && typeof(set.valueFromFieldName) != "undefined") {
                                stmtsToAdd += '   $("input#date-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val($("input#date-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.valueFromFieldName)) + '").val()); \n';
                                stmtsToAdd += '   $().SetSelectByText("#hours-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '", $("select#hours-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.valueFromFieldName)) + ' option:selected").text()); \n';
                                stmtsToAdd += '   $().SetSelectByText("#minutes-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '", $("select#minutes-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.valueFromFieldName)) + ' option:selected").text()); \n';
                            }
                        } else if (set.type == "datePicker") {
                            // to be completed
                        } else if (set.type == "peoplePicker") {
                            // currently, only clears OR adds; does not replace (clear THEN add)
                            // currently, other than current user, doesn't handle people dynamically
                            if (set.value == '') {
                                stmtsToAdd += '   $().ClearPeoplePicker("' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '_TopSpan"); \n';
                            } else if (set.value == 'currentUser') {
                                stmtsToAdd += '   $().PutAddtlPeopleInPicker("' + set.fieldName + '", [{"name": "' + uData.name + '", "email": "' + uData.email + '", "account": "' + uData.account + '" }]); \n';
                            }
                        }
                    });

                }

                if (typeof(chg.addlAndConditions) != "undefined" || typeof(chg.addlOrConditions) != "undefined") {
                    stmtsToAdd += '         } \n';
                }

                stmtsToAdd += ' } \n';

            });

            stmtsToAdd += '}); \n';
        }

        if (e.controlType == "listItemChooser") {

            stmtsToAdd += '\n$("#all-content-container").append("\\x3cdiv id=\\x22list-item-dialog\\x22\\x3e\\x3c/div\\x3e"); \n' +
                '$("div#list-item-dialog").dialog({ \n' +
                '   autoOpen: false, \n' +
                '   draggable: true, \n' +
                '   show: { effect: "bounce", times: 2, duration: 500 }, \n' +
                '   width: 635, \n' +
                '}); \n' +

                '$("div[aria-describedby=\'list-item-dialog\'] div.ui-dialog-titlebar span.ui-dialog-title").append("\\x3cspan class=\\x22list-dialog-header\\x22\\x3e' + e.dialogTitle + '\\x3c/span\\x3e"); \n' +
                '$("div#list-item-dialog").append("\\x3cdiv id=\\x22table-container\\x22\\x3e\\x3c/div\\x3e"); \n' +

                'var tData = ' + JSON.stringify(e.tData) + '; \n' +
                'var mData = ' + JSON.stringify(mData) + '; \n' +

                '$().RenderAllDataTables(tData, mData); \n' +

                '$("a#anchor_' + e.hypehnatedName + '").click(function() { \n' +
                '   $("div#list-item-dialog").dialog("option", "position", { my: "left bottom", at: "left top", of: $( "div#label-and-control_' + e.hypehnatedName + '" ) }); \n' +
                '   $("div#list-item-dialog").dialog("open"); \n' +
                '}); \n' +

                '$("div#list-item-dialog a.anchor_no-href").click(function() { \n' +
                '   $("input#id-or-link_' + e.hypehnatedName + '").val($(this).text()); \n' +
                '   $("input#id-or-link_' + e.hypehnatedName + '").trigger("change"); \n' +
                '   $("div#list-item-dialog").dialog("close"); \n' +
                '}); \n';
        }

        return stmtsToAdd;

    }


    // ---- STANDARD APPROVALS


    $.fn.ReturnApprovalNode = function(standardName, hyphenatedName, email) {
        email = email.toLowerCase();
        return '    <div id="approver_' + hyphenatedName + '" class="approver-container" data-approver-email="' + email + '" data-approval-status="">' +
            '         <h3>' + standardName + '</h3>' +
            '         <div id="label-and-control_Approval-Indicator_' + hyphenatedName + '" class="label-and-control radio">' +
            '               <div class="label">' +
            '                    <span id="choice-set-label_approval-indicator_' + hyphenatedName + '">Approval Indicator</span>' +
            '               </div>' +
            '               <div class="field-type-indication">' +
            '                    <span id="field-type-indicator_approval-indicator_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
            '                         <span class="message message-optional">Optional Field</span>' +
            '                    </span>' +
            '               </div>' +
            '               <div class="control">' +
            '                    <div class="choice-container">' +
            '                         <input disabled name="Approval-Indicator_' + hyphenatedName + '" id="approval-indicator_approve_' + hyphenatedName + '" value="approve" aria-describedby="field-type-indicator_approval-indicator choice-set-label_approval-indicator approval-indicator_help-note-1 " type="radio">' +
            '                         <label for="approval-indicator_approve_' + hyphenatedName + '">I approve</label>' +
            '                    </div>' +
            '                    <div class="choice-container">' +
            '                         <input disabled name="Approval-Indicator_' + hyphenatedName + '" id="approval-indicator_disapprove_' + hyphenatedName + '" value="disapprove" aria-describedby="field-type-indicator_approval-indicator choice-set-label_approval-indicator approval-indicator_help-note-1 " type="radio">' +
            '                         <label for="approval-indicator_disapprove_' + hyphenatedName + '">I disapprove</label>' +
            '                    </div>' +
            '                    <div class="help-text" id="approval-indicator_help-note-1_' + hyphenatedName + '">' +
            globalMData.approvalStmt +
            '                    </div>' +
            '                    <div class="help-text urgent hidden" id="approval-indicator_help-note-2_' + hyphenatedName + '">' +
            '                         Are you sure? The only way to undo this is for the requester to initiate a new request.' +
            '                    </div>' +
            '               </div>' +
            '         </div>' +
            '         <div id="label-and-control_Approval-Signature_' + hyphenatedName + '" class="label-and-control text">' +
            '               <div class="label"><label for="Approval-Signature_' + hyphenatedName + '">Signature</label></div>' +
            '               <div class="field-type-indication">' +
            '                    <span id="field-type-indicator_approval-signature_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
            '                         <span class="message message-optional">Optional Field</span>' +
            '                    </span>' +
            '               </div>' +
            '               <div class="control">' +
            '                    <input disabled id="Approval-Signature_' + hyphenatedName + '" class="" aria-describedby="field-type-indicator_approval-signature" type="text">' +
            '               </div>' +
            '         </div>' +
            '         <div id="label-and-control_Approval-Date_' + hyphenatedName + '" class="label-and-control text">' +
            '               <div class="label"><label for="Approval-Date">Date</label></div>' +
            '               <div class="field-type-indication">' +
            '                    <span id="field-type-indicator_approval-date_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
            '                         <span class="message message-optional">Optional Field</span>' +
            '                    </span>' +
            '               </div>' +
            '               <div class="control">' +
            '                    <input disabled id="Approval-Date_' + hyphenatedName + '" class="" aria-describedby="field-type-indicator_approval-date" type="text">' +
            '               </div>' +
            '         </div>' +
            '         <div id="label-and-control_Approval-Notes_' + hyphenatedName + '" class="label-and-control textarea">' +
            '               <div class="label"><label for="Approval-Notes">Notes</label></div>' +
            '               <div class="field-type-indication">' +
            '                    <span id="field-type-indicator_approval-notes_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
            '                         <span class="message message-optional">Optional Field</span>' +
            '                    </span>' +
            '               </div>' +
            '               <div class="control">' +
            '                    <textarea disabled id="Approval-Notes_' + hyphenatedName + '" class="" aria-describedby="field-type-indicator_approval-notes Approval-Notes_' + hyphenatedName + '_help-note"></textarea>' +
            '                    <div id="Approval-Notes_' + hyphenatedName + '_help-note" class="help-text">Visible to the requester and the admin</div>' +
            '               </div>' +
            '         </div>' +
            '   </div>';
    }



    $.fn.ReturnApprovalNodeScript = function(standardName, hyphenatedName, NowAsFriendlyDateSansYear) {
        return '     $("#approval-indicator_approve_' + hyphenatedName + ', #approval-indicator_disapprove_' + hyphenatedName + '").on("change", function () { \n' +
            '         if ($(this).val() == "disapprove") { \n' +
            '               if (!$("#approval-indicator_help-note-2_' + hyphenatedName + '").is(":visible")) { \n' +
            '                    $("#approval-indicator_help-note-2_' + hyphenatedName + '").show("fast"); \n' +
            '                    $("#approval-indicator_help-note-2_' + hyphenatedName + '").removeClass("hidden"); \n' +
            '               } \n' +
            '               if ($("#approval-indicator_help-note-1_' + hyphenatedName + '").is(":visible")) { \n' +
            '                    $("#approval-indicator_help-note-1_' + hyphenatedName + '").hide("fast"); \n' +
            '                    $("#approval-indicator_help-note-1_' + hyphenatedName + '").addClass("hidden"); \n' +
            '               } \n' +
            '               $("#approval-indicator_disapprove_' + hyphenatedName + '").attr("checked", true);' +
            '               $("#approval-indicator_approve_' + hyphenatedName + '").removeAttr("checked");' +
            '               $("#approver_' + hyphenatedName + '").attr("data-approval-status", "disapproved");' +
            '         } \n' +
            '         if ($(this).val() == "approve") { \n' +
            '               if (!$("#approval-indicator_help-note-1_' + hyphenatedName + '").is(":visible")) { \n' +
            '                    $("#approval-indicator_help-note-1_' + hyphenatedName + '").show("fast"); \n' +
            '                    $("#approval-indicator_help-note-1_' + hyphenatedName + '").removeClass("hidden"); \n' +
            '               } \n' +
            '               if ($("#approval-indicator_help-note-2_' + hyphenatedName + '").is(":visible")) { \n' +
            '                    $("#approval-indicator_help-note-2_' + hyphenatedName + '").hide("fast"); \n' +
            '                    $("#approval-indicator_help-note-2_' + hyphenatedName + '").addClass("hidden"); \n' +
            '               } \n' +
            '               $("#approval-indicator_approve_' + hyphenatedName + '").attr("checked", true);' +
            '               $("#approval-indicator_disapprove_' + hyphenatedName + '").removeAttr("checked");' +
            '               $("#approver_' + hyphenatedName + '").attr("data-approval-status", "approved");' +
            '         } \n' +
            '        $("input#Approval-Signature_' + hyphenatedName + '").val("' + standardName + '"); \n' +
            '        $("input#Approval-Date_' + hyphenatedName + '").val("' + NowAsFriendlyDateSansYear + '"); \n' +
            '    }); \n';;
    }



    $.fn.ReturnNotificationHistoryRow = function(standardName, hyphenatedName, NowAsISOLocal, NowAsFriendlyDateTimeWithYear, neededOrNot) {
        return '         <tr class="notification-set" id="notification-set_' + hyphenatedName + '_' + NowAsISOLocal + '">' +
            '             <th>' + standardName + '</th>' +
            '             <td>' + neededOrNot + '</td>' +
            '             <td>' + NowAsFriendlyDateTimeWithYear + '</td>' +
            '        </tr>';
    }


    // ---- UTILITIES



    function isJSONParsable (stringToTest){

        try {
            var o = JSON.parse(stringToTest);

            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object", 
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o == "object") {
                return o;
            }
        } catch (e) { }

        return false;
    };



    function ReturnFileBufferDeferredPromise(file) {
        var deferred = $.Deferred();
        var reader = new FileReader();

        reader.onload = function(e) {
            deferred.resolve(e.target.result);
        }

        reader.onerror = function(e) {
            deferred.reject(e.target.error);
        }

        reader.readAsArrayBuffer(file);

        return deferred.promise();
    }



    $.fn.ReturnNamesWLinkedEmailsFromPP = function(fieldName) {

        var dataLocationSelector = 'input#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", fieldName)) + '_TopSpan_HiddenInput';

        if (typeof($(dataLocationSelector).val()) == 'undefined' || $(dataLocationSelector).val() == [] || $(dataLocationSelector).val() == '') {
            peopleArray = [];
        } else {
            peopleArray = JSON.parse($(dataLocationSelector).val());
        }

        var peopleArrayIndexQty = peopleArray.length;
        var peopleArrayIndexLast = (peopleArrayIndexQty - 1);
        var linkedNamesString = '';

        $.each(peopleArray, function(i, r) {

            // if peopleArrayIndexQty == 1
            if (peopleArrayIndexQty == 1) {
                // set
                linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
            }
            // if peopleArrayIndexQty == 2
            if (peopleArrayIndexQty == 2) {
                // if i != 0, prepend with 'and'
                if (i != 0) {
                    linkedNamesString += ' and ';
                }
                // set
                linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
            }
            // if peopleArrayIndexQty > 2
            if (peopleArrayIndexQty > 2) {
                // if i == 0
                if (i == 0) {
                    linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
                    // if i != 0
                } else if (i != 0) {
                    // if i != peopleArrayIndexLast
                    if (i != peopleArrayIndexLast) {
                        // prepend with ', '
                        linkedNamesString += ', ';
                        // set
                        linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
                    }
                    // if i == peopleArrayIndexLast
                    if (i == peopleArrayIndexLast) {
                        // prepend with ', and '
                        linkedNamesString += ', and ';
                        // set
                        linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
                    }
                }
            }
        });

        return linkedNamesString;
    }



    function StrInStr(haystack, needle, flag) {

        var position = 0;
        haystack = (haystack + '');
        needle = (needle + '');
        position = haystack.indexOf(needle);

        if (position == -1) {
            return false;
        } else {
            if (flag == 1) {
                // retrun first part of the string
                return haystack.substr(0, position);
            } else if (flag == 2) {
                // return ?
                return haystack.slice(needle.length);
            } else {
                // return from end of needle to end of string
                return haystack.slice(position);
            }
        }
    }



    // function ReplaceAll(find, replace, str) {
    //    return str.replace(new RegExp(find, 'g'), replace);
    // }



    function Print(incoming) {
        $("div#print-to-screen").append(incoming);
    }



    function CDataWrap(value) {
        return "<![CDATA[" + value + "]]>";
    }



    function BuildAllRequestDataObject(formElement) {

        var formDataString = '';

        // handle inputs
        $(formElement).find('input').each(function() {

            // get this input's id
            var id = this.id;

            // don't save approval fields; they won't be populated individually, anyway; this data is saved in the "Approval Nodes Storage" field
            if (StrInStr(id, 'approval-signature') == false && StrInStr(id, 'approval-date') == false && StrInStr(id, 'Approval-Notes') == false && StrInStr(id, 'approval-indicator') == false) {

                // if this input is not a people picker
                if (id.indexOf('TopSpan_HiddenInput') < 0) {

                    // encode its value
                    var value = HtmlEncode($(this).val());

                    // get its type
                    var type = $(this).attr('type');

                    // default to type=text
                    if (type == undefined) {
                        type = 'text';
                    }

                    // if this input has a value and is not a button
                    if (value != undefined && value.length > 0 && type.toUpperCase() != 'BUTTON') {

                        // if this input is NOT a radio or checkbox - OR - if it's checked
                        if ((type.toUpperCase() != 'RADIO' && type.toUpperCase() != 'CHECKBOX') || $(this).attr('checked')) {
                            // create object property for it
                            formDataString += '"' + id + '":"' + value + '",';

                            // if this input has a listFieldName attribute
                            formVal = $(this).attr('listFieldName');
                            if (formVal != undefined) {
                                // if this input has an data-is-date attribute
                                if ($(this).attr('data-is-date') == 'true') {
                                    // convert it to ISO format string
                                    var thisDate = new Date(value);
                                    value = thisDate.toISOString();
                                }
                                // push listFieldName and value to globalSubmissionValuePairs
                                globalSubmissionValuePairs.push([$(this).attr('listFieldName'), value]);
                            }
                        }
                    }
                }
            }
        });

        // handle selects
        $(formElement).find('select').each(function() {
            id = this.id;

            if (id != 'Change-Request-Status') {
                value = $(this).find('option:selected').text();
                formDataString += '"' + id + '":"' + value + '",';

                formVal = $(this).attr('listFieldName');
                if (formVal != undefined) {
                    globalSubmissionValuePairs.push([$(this).attr('listFieldName'), value]);
                }
            }
        });

        // handle textareas
        $(formElement).find('textarea').each(function() {
            id = this.id;

            // don't save approval fields; they won't be populated individually, anyway; this data is saved in the "Approval Nodes Storage" field
            if (StrInStr(id, 'Approval-Notes') == false) {
                value = HtmlEncode($(this).val());

                if (value.length > 0) {
                    formDataString += '"' + id + '":"' + value + '",';
                    if ($(this).attr('listFieldName') != undefined) {
                        globalSubmissionValuePairs.push([$(this).attr('listFieldName'), CDataWrap(value)]);
                    }
                }
            }

        });

        // handle people pickers
        $(formElement).find('div[data-control-type="PeoplePicker"]').each(function() {

            // set up vars
            var spPP = SPClientPeoplePicker.SPClientPeoplePickerDict[$(this).attr('id') + '_TopSpan'];
            var people = spPP.GetAllUserInfo();


            // build an array of custom people objects
            if (people.length) {

                formDataString += '"' + this.id + '":[';
                var peopleSeparator = '';

                $.each(people, function(i, p) {
                    formDataString += peopleSeparator +
                        '{' +
                        '"account": "' + p.Key + '",' +
                        '"displayText": "' + p.DisplayText + '",' +
                        '"description": "' + p.Description + '"' +
                        '}';
                    peopleSeparator = ',';
                });

                formDataString += '],';
            } else {
                formDataString += '"' + this.id + '":"",';
            }

            // if this field is to be stored in the list
            if ($(this).attr('listFieldName') != undefined) {

                var listFieldValue = '';
                var listFieldValueSeparator = '';

                // build up a semicolon-delimited list of keys
                for (index in people) {
                    listFieldValue += listFieldValueSeparator + '-1;#' + people[index].Description;
                    listFieldValueSeparator = ';#';
                }

                globalSubmissionValuePairs.push([$(this).attr('listFieldName'), listFieldValue]);
            }
        });

        // handle divs
        $('div.listFieldName').each(function() {
            if ($(this).attr('data-control-type') == undefined) {
                if ($.trim($(this).html()).length > 0) {
                    var regex = new RegExp("\"", "g");
                    value = ($(this).html()).replace(regex, "'");

                    formDataString += '"' + this.id + '":"' + value + '",';
                    if ($(this).attr('listFieldName') != undefined) {
                        globalSubmissionValuePairs.push([$(this).attr('listFieldName'), CDataWrap($(this).html())]);
                    }
                }
            }
        });

        // handle links for url, file, and event request fields
        $(formElement).find('a[data-source-type="url"], a[data-source-type="file"], a[data-source-type="event-space-request"], a[data-source-type="event-needs-request"]').each(function() {
            id = this.id;

            value = HtmlEncode(ReplaceAll("#", "", $(this).text()));

            if (value.length > 0) {
                formDataString += '"' + id + '":"' + value + '",';
                if ($(this).attr('listFieldName') != undefined) {
                    globalSubmissionValuePairs.push([$(this).attr('listFieldName'), CDataWrap(value)]);
                }
            }

        });

        return formDataString;
    }



    function ReturnAllRequestDataObjectAugmentedWithExceptionalEventOccurrence(form, allRequestDataObject) {

        // note on general approach - we treat each exception as a date to skip and, if 
        //      the user isn't just removing an occurrence entirely, a date to add; this is true even if
        //      the date to skip and the date to add are the same; this allows us to consult only the skipped dates
        //      when rendering the series dates, and to just add all of the additional dates, all without 
        //      having to cross-consult skips and adds

        // if this event date on load was a pattern date
        if ($(form).find('input#Exception-ID').val() == "") {
            // store event date on load as a date to skip
            if (typeof(allRequestDataObject.datesToSkip) == 'undefined') {
                allRequestDataObject.datesToSkip = [];
            }
            allRequestDataObject.datesToSkip.push($(form).find('input#Event-Date-on-Load').val());

            // if event date on load was an exception date
        } else {

            // get index of element to remove
            var exceptionToRemoveIndex = -1;
            $(allRequestDataObject.datesToAdd).each(function(dateToAddIndex, dateToAddValue) {
                if (dateToAddValue.exceptionID == $(form).find('input#Exception-ID').val()) {
                    exceptionToRemoveIndex = dateToAddIndex;
                }
            });

            // remove the array element (datesToAdd object)
            if (exceptionToRemoveIndex > -1) {
                allRequestDataObject.datesToAdd.splice(exceptionToRemoveIndex, 1);
            }
        }

        // if we're not just removing
        if ($("input#requester-cancellation_cancel").prop("checked") == false) {

            // store form data as a date to add
            if (typeof(allRequestDataObject.datesToAdd) == 'undefined') {
                allRequestDataObject.datesToAdd = [];
                var thisExceptionID = "1";
            } else if (allRequestDataObject.datesToAdd.length == 0) {
                var thisExceptionID = "1";
            } else {

                var lastIncomingExceptionID = allRequestDataObject.datesToAdd[allRequestDataObject.datesToAdd.length - 1].exceptionID;
                var thisExceptionID = (parseInt(lastIncomingExceptionID) + 1).toString();
            }

            allRequestDataObject.datesToAdd.push({
                "exceptionID": thisExceptionID,
                "Event-Date": HtmlEncode($(form).find('input#Event-Date').val()),
                "hours-input_Start-Time": HtmlEncode($(form).find('select#hours-input_Start-Time').find('option:selected').text()),
                "minutes-input_Start-Time": HtmlEncode($(form).find('select#minutes-input_Start-Time').find('option:selected').text()),
                "hours-input_End-Time": HtmlEncode($(form).find('select#hours-input_End-Time').find('option:selected').text()),
                "minutes-input_End-Time": HtmlEncode($(form).find('select#minutes-input_End-Time').find('option:selected').text()),
                "time-storage_Start-Time": HtmlEncode($(form).find('input#time-storage_Start-Time').val()),
                "time-storage_End-Time": HtmlEncode($(form).find('input#time-storage_End-Time').val()),
                "Event-Location": HtmlEncode($(form).find('select#Event-Location').find('option:selected').text()),
                "Event-Notes": HtmlEncode($(form).find('textarea#Event-Notes').val()),
            });
        }
        return JSON.stringify(allRequestDataObject);
    }



    function ReturnAllRequestDataObjectWithExceptionalEventOccurrences(formDataString, originalFormData) {


        // if there is exceptional event data to keep
        if (typeof(originalFormData) != 'undefined') {
            if (typeof(originalFormData.datesToSkip) != 'undefined') {

                // stringify the objects inside the datesToSkip array
                var datesToSkipArrayLength = originalFormData.datesToSkip.length;
                var datesToSkipString = '';
                $(originalFormData.datesToSkip).each(function(i, v) {
                    datesToSkipString += JSON.stringify(this);
                    // if not the last one, add a comma
                    if (i + 1 < datesToSkipArrayLength) {
                        datesToSkipString += ',';
                    }
                });

                // stringify the objects inside the datesToAdd array
                var datesToAddArrayLength = originalFormData.datesToAdd.length;
                var datesToAddString = '';
                $(originalFormData.datesToAdd).each(function(i, v) {
                    datesToAddString += JSON.stringify(this);
                    // if not the last one, add a comma
                    if (i + 1 < datesToAddArrayLength) {
                        datesToAddString += ',';
                    }
                });

                // prep formDataString to receive it
                var incomingFormDataStringLength = formDataString.length;
                var formDataStringOpenedUp = formDataString.slice(0, incomingFormDataStringLength - 1); // remove the final curly brace
                var formDataStringPreppedToReceive = formDataStringOpenedUp + ","; // add a comma

                // attach exceptional event data to formDataString
                formDataString = formDataStringPreppedToReceive + '"datesToSkip":"[' + datesToSkipString + ']","datesToAdd":"[' + datesToAddString + ']"}';
            }
        }

        // return formDataString, whether it was modified or not
        return formDataString;
    }



    function HtmlEncode(string) {

        // if contains "&" but does not contain "&amp;" or "&quot;"  (hasn't already been encoded)
        if (StrInStr(string, '&', 0) != false && StrInStr(string, '&amp;', 0) == false && StrInStr(string, '&quot;', 0) == false) {
            string = string.replace(/&/g, '&amp;');
        }

        return String(string)
            //.replace(/&/g, '&amp;')
            .replace(/\\/g, '%5C')
            .replace(/\r/g, '%0D')
            .replace(/\n/g, '%0A')
            .replace(/"/g, '&quot;');
        //.replace(/'/g, '&#39;')
        //.replace(/</g, '&lt;')
        //.replace(/>/g, '&gt;');
    }



    function HtmlDecode(str) {
        return String(str)
            .replace(/&amp;/g, '&')
            .replace(/%5C/g, '\\')
            .replace(/%0D/g, '\r')
            .replace(/%0A/g, '\n')
            .replace(/&quot;/g, '"');
        //;
        //.replace(/&#39;/g, '\'')
        //.replace(/</g, '&lt;')
        //.replace(/>/g, '&gt;');
    }


    $.fn.ReturnStringWithInitialCap = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    $.fn.ZeroFillString = function(string, places) {
        for (i = 0; string.length < places; i++) {
            string = '0' + string;
        }
        return string;
    }



    $.fn.ReturnUserDataFromPersonOrGroupFieldString = function(usersString) {

        // parse query response from SP list's Person or Group field 
        //      (at least, with People Only selected in column config - if groups are included this may not work)
        //      note that this this def won't work for getting data out of a people picker field


        // RAW VALUE = 6;#James Baker,#i:0#.f|membership|jbaker@mos.org,#jbaker@mos.org,#jbaker@mos.org,#James Baker,#https://bmos-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/jbaker_mos_org_MThumb.jpg,#Interactive Media,#Intranet Solutions Project Manager;#20;#Ben Wilson,#i:0#.f|membership|bwilson@mos.org,#bwilson@mos.org,#bwilson@mos.org,#Ben Wilson,#https://bmos-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/bwilson_mos_org_MThumb.jpg,#Interactive Media,#Interactive Media Manager"

        // [0] - 6                                                -- userID
        // [1] - James Baker                                     -- userName
        // [2] - i:0#.f|membership|jbaker@mos.org        -- account (loginName)
        // [3] - jbaker@mos.org                              -- email
        // [4] - jbaker@mos.org                              -- sipAddress
        // [5] - James Baker                                     -- name (title)
        // [6] - https://bmos-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/jbaker_mos_org_MThumb.jpg -- photoURL
        // [7] - Interactive Media                           -- dept
        // [8] - Intranet Solutions Project Manager   -- jobTitle


        var usersParts = usersString.split(';#');
        var distinctUsersAsStrings = [];
        var allUsersData = [];

        $.each(usersParts, function(i, usersPart) {

            // if i represents an even-numbered position in array
            if (i % 2 == 1) {
                var combinedUserParts = usersParts[i - 1] + ',#' + usersParts[i];
                distinctUsersAsStrings.push(combinedUserParts);
            }
        });

        $.each(distinctUsersAsStrings, function(i, s) {
            var thisUser = s.split(",#");
            if (thisUser.length == 2) {
                allUsersData.push({
                    userId: thisUser[0],
                    userName: thisUser[1]
                });
            } else if (thisUser.length == 6) {
                allUsersData.push({
                    userId: thisUser[0],
                    userName: thisUser[1].replace(/(,,)/g, ","),
                    account: thisUser[2].replace(/(,,)/g, ","),
                    email: thisUser[3].replace(/(,,)/g, ","),
                    sipAddress: thisUser[4].replace(/(,,)/g, ","),
                    name: thisUser[5].replace(/(,,)/g, ",")
                });
            } else if (thisUser.length == 9) {
                allUsersData.push({
                    userId: thisUser[0],
                    userName: thisUser[1].replace(/(,,)/g, ","),
                    account: thisUser[2].replace(/(,,)/g, ","),
                    email: thisUser[3].replace(/(,,)/g, ","),
                    sipAddress: thisUser[4].replace(/(,,)/g, ","),
                    name: thisUser[5].replace(/(,,)/g, ","),
                    photoURL: thisUser[6].replace(/(,,)/g, ","),
                    dept: thisUser[7].replace(/(,,)/g, ","),
                    jobTitle: thisUser[8].replace(/(,,)/g, ","),
                });
            }
        });

        return allUsersData;
    }



    $.fn.ReturnDateDifferenceInDays = function(dateOne, dateTwo) {

        var oneDay = 24 * 60 * 60 * 1000;
        var firstDate = new Date(dateOne);
        var secondDate = new Date(dateTwo);
        var timezoneOffsetInMs = new Date().getTimezoneOffset() * 60 * 1000;

        return Math.ceil(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

    }



    $.fn.ReturnTimeOneIsEarlierThanTimeTwo = function(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes) {
        
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;

        var timeOneIsEarlierThanTimeTwo = 0;

        if(typeof(timeOneHours) != "undefined" && typeof(timeOneMinutes) != "undefined" && typeof(timeTwoHours) != "undefined" && typeof(timeTwoMinutes) != "undefined") {
            var dateOne = moment().format('YYYY-MM-DD') + timeOneHours + timeOneMinutes;
            var dateTwo = moment().format('YYYY-MM-DD') + timeTwoHours + timeTwoMinutes;
            if ( moment(dateOne).isBefore(dateTwo) ) {
                timeOneIsEarlierThanTimeTwo = 1;
            }
        }

        return timeOneIsEarlierThanTimeTwo;
    }



    $.fn.ReturnTimeOneIsLaterThanTimeTwo = function(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes) {
        
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;

        var timeOneIsEarlierThanTimeTwo = 0;

        if(typeof(timeOneHours) != "undefined" && typeof(timeOneMinutes) != "undefined" && typeof(timeTwoHours) != "undefined" && typeof(timeTwoMinutes) != "undefined") {
            var dateOne = moment().format('YYYY-MM-DD') + timeOneHours + timeOneMinutes;
            var dateTwo = moment().format('YYYY-MM-DD') + timeTwoHours + timeTwoMinutes;
            if ( moment(dateOne).isAfter(dateTwo) ) {
                timeOneIsEarlierThanTimeTwo = 1;
            }
        }

        return timeOneIsEarlierThanTimeTwo;
    }



    $.fn.ReturnUserEmailStringAndArray = function(usersString) {

        var userArray = usersString.split(";#");
        var emailReturnObject = {
            array: [],
            string: ""
        };

        $.each(userArray, function(i, userDatum) {

            // if i is even
            if (i % 2 == 1) {
                userTextSplit = userArray[i].split(",#");

                emailReturnObject.array.push(userTextSplit[2]);
                if (i != 1) {
                    emailReturnObject.string += ';';
                }
                emailReturnObject.string += userTextSplit[2];
            }
        });

        return emailReturnObject;

    }



    $.fn.ReturnISODateTimeFromParts = function(dateTime, keyphrase) {

        // config locale
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;


        // e.g., 
        // dateTime.date     = April 15, 2015
        // dateTime.hour     = T22
        // dateTime.minute  = :15:00

        dateTime.date = moment(dateTime.date, 'MMMM D, YYYY').format('YYYY-MM-DD');

        return dateTime.date + dateTime.hour + dateTime.minute + 'Z';

    }



    $.fn.RenderDateTime = function(dateTimeString, timeFlag, useYearAnyway) {

        // config locale
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;

        // default to determining year usage dynamically
        if (typeof(useYearAnyway) == "undefined") {
            useYearAnyway = 0;
        }

        // if dateTimeString is set to 'nowLocal', reset to current datetime
        if (dateTimeString == 'nowLocal') {
            dateTimeString = moment().format();
        }

        // get timezone offset as standard format string - e.g., '-0400', for Boston in the summer
        var timezoneOffsetTotalMinutes = (new Date()).getTimezoneOffset(); // e.g., 240
        var timezoneOffsetHours = Math.floor(timezoneOffsetTotalMinutes / 60); // e.g., 4
        var timezoneOffsetRemainingMinutes = timezoneOffsetTotalMinutes % (timezoneOffsetHours * 60); // 0
        var timezoneOffsetHoursZeroFilled = $().ZeroFillString(timezoneOffsetHours.toString(), 2); // '04'
        var timezoneOffsetRemainingMinutesZeroFilled = $().ZeroFillString(timezoneOffsetRemainingMinutes.toString(), 2); // '00'
        var timezoneOffsetPosOrNeg = timezoneOffsetTotalMinutes > 0 ? '-' : '+'; // '-'
        var timezoneOffsetString = timezoneOffsetPosOrNeg + timezoneOffsetHoursZeroFilled + timezoneOffsetRemainingMinutesZeroFilled; // '-0400'

        // get datetime string in iso format with local timezone
        // var dateTimeISOStringLocal = (new Date(dateTimeString.replace(" ", "T"))).toISOString().replace("Z", timezoneOffsetString); // '2025-04-15T19:56:38.000-0400'
        var dateTimeISOStringLocal = (new Date(dateTimeString.replace(" ", "T"))).toISOString(); // '2025-04-15T19:56:38.000-0400'




        // set up base display format
        var displayFormat = 'MMMM D';

        // if this date's year differs from the current year
        if (moment(dateTimeISOStringLocal).format('YYYY') != moment().format('YYYY')) {
            // append date format with year
            displayFormat += ', YYYY';
            // otherwise, if useYearAnyway flag is set to 1
        } else if (typeof(useYearAnyway) != "undefined") {
            if (useYearAnyway == 1) {
                // append date format with year
                displayFormat += ', YYYY';
            }
        }

        // if timeFlag indicates that the time should be rendered
        if (timeFlag == 1) {
            // append date format with year
            displayFormat += ' h:mm a';
        }

        // return formatted dateTimeString
        return (moment(dateTimeISOStringLocal).format(displayFormat));

    }


    // ---- DATATABLES


    $.fn.RenderAllDataTables = function(tData, mData) {

        console.log('using mos-swf.js m1');


        $.each(tData.tables, function(i, t) {

            var columns = [];
            var query = '';
            var camlViewFields = "";
            var lookupFields = [];
            var datatableFields = [];
            var theadDetails = "";

            if (typeof(t.customColumns) != "undefined") {
                columns = t.customColumns;
            } else {
                columns = tData.commonColumns;
            }

            if (typeof(t.sortColAndOrder) == 'undefined') {
                t.sortColAndOrder = [0, 'asc'];
            }

            if (typeof(t.webURL) == 'undefined') {
                mData = $.extend(
                    $().GetFieldsFromOneRow({
                        "listName": "ComponentLog",
                        "select": [{
                            "nameHere": "uriRoot",
                            "nameInList": "URIRoot",
                            "linkField": 1
                        }],
                        "where": {
                            "field": "ComponentID",
                            "type": "Number",
                            "value": mData.componentID,
                        }
                    }),
                    mData
                );

                t.webURL = StrInStr(mData.uriRoot, '/Lists/SWFList', 1);
            }

            $.each(columns, function(i, column) {
                if (column.internalName != "") {
                    camlViewFields += "<FieldRef Name='" + column.internalName + "' />";
                    datatableFields.push({
                        "data": column.internalName
                    });
                }
                if (column.displayName != "") {
                    theadDetails += "<th>" + column.displayName + "</th>";
                }
                if (column.internalName != "" && typeof(column.formLink) !== "undefined") {
                    lookupFields.push({
                        "internalName": column.internalName,
                        "anchorNoHref": 0,
                        "formLink": column.formLink,
                        "userName": 0,
                        "friendlyFormatOnLoad": 0
                    });
                } else if (column.internalName != "" && typeof(column.anchorNoHref) !== "undefined") {
                    lookupFields.push({
                        "internalName": column.internalName,
                        "anchorNoHref": column.anchorNoHref,
                        "formLink": 0,
                        "userName": 0,
                        "friendlyFormatOnLoad": 0
                    });
                } else if (column.internalName != "" && typeof(column.userName) !== "undefined") {
                    lookupFields.push({
                        "internalName": column.internalName,
                        "anchorNoHref": 0,
                        "formLink": 0,
                        "userName": column.userName,
                        "friendlyFormatOnLoad": 0
                    });
                } else if (column.internalName != "" && typeof(column.friendlyFormatOnLoad) !== "undefined") {
                    lookupFields.push({
                        "internalName": column.internalName,
                        "anchorNoHref": 0,
                        "formLink": 0,
                        "userName": 0,
                        "friendlyFormatOnLoad": column.friendlyFormatOnLoad
                    });
                } else {
                    lookupFields.push({
                        "internalName": column.internalName,
                        "anchorNoHref": 0,
                        "formLink": 0,
                        "userName": 0,
                        "friendlyFormatOnLoad": 0
                    });
                }
            });

            if (typeof(t.basicRSQueryRelevantStatus) != "undefined") {
                query = "<Where>" +
                        "   <Eq>" +
                        "        <FieldRef Name='RequestStatus'></FieldRef>" +
                        "        <Value Type='Text'>" + t.basicRSQueryRelevantStatus + "</Value>" +
                        "   </Eq>" +
                        "</Where>";
            } else if (typeof(t.myRSQueryRelevantStatus) != "undefined") {

                var myName = $().SPServices.SPGetCurrentUser({
                    fieldName: "Title",
                    debug: false
                });

                if (typeof(mData.getRequesterFrom) == 'undefined') {
                    var getRequesterFrom = 'Author';
                } else {
                    var getRequesterFrom = mData.getRequesterFrom;
                }

                query = "<Where>" +
                    "   <And>" +
                    "        <Eq>" +
                    "             <FieldRef Name='RequestStatus'></FieldRef>" +
                    "             <Value Type='Text'>" + t.myRSQueryRelevantStatus + "</Value>" +
                    "        </Eq>" +
                    "        <Contains>" +
                    "             <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
                    "             <Value Type='Text'>" + myName + "</Value>" +
                    "        </Contains>" +
                    "   </And>" +
                    "</Where>";
            } else if (typeof(t.fieldGEQDaysBeforeToday) != "undefined") {
                query = "<Where>" +
                    "   <Geq>" +
                    "        <FieldRef Name='" + t.fieldGEQDaysBeforeToday[0] + "'></FieldRef>" +
                    "        <Value Type='DateTime'>" +
                    "             <Today OffsetDays='" + (-1 * t.fieldGEQDaysBeforeToday[1]) + "' />" +
                    "        </Value>" +
                    "   </Geq>" +
                    "</Where>";
            } else if (typeof(t.rsQueryAndFieldGEQDate) != "undefined") {
                query = "<Where>" +
                    "    <And>" +
                    "         <Eq>" +
                    "               <FieldRef Name='RequestStatus'></FieldRef>" +
                    "               <Value Type='Text'>" + t.rsQueryAndFieldGEQDate[0] + "</Value>" +
                    "         </Eq>" +
                    "         <Geq>" +
                    "             <FieldRef Name='" + t.rsQueryAndFieldGEQDate[1] + "'></FieldRef>" +
                    "             <Value Type='DateTime'>" + t.rsQueryAndFieldGEQDate[2] + "</Value>" +
                    "         </Geq>" +
                    "    </And>" +
                    "</Where>";
            } else if (typeof(t.rsQueryAndFieldLTDate) != "undefined") {
                query = "<Where>" +
                    "    <And>" +
                    "         <Eq>" +
                    "               <FieldRef Name='RequestStatus'></FieldRef>" +
                    "               <Value Type='Text'>" + t.rsQueryAndFieldLTDate[0] + "</Value>" +
                    "         </Eq>" +
                    "         <Lt>" +
                    "             <FieldRef Name='" + t.rsQueryAndFieldLTDate[1] + "'></FieldRef>" +
                    "             <Value Type='DateTime'>" + t.rsQueryAndFieldLTDate[2] + "</Value>" +
                    "         </Lt>" +
                    "    </And>" +
                    "</Where>";
            } else if (typeof(t.rsQueryAndFieldGEQDaysBeforeToday) != "undefined") {
                query = "<Where>" +
                    "    <And>" +
                    "         <Eq>" +
                    "               <FieldRef Name='RequestStatus'></FieldRef>" +
                    "               <Value Type='Text'>" + t.rsQueryAndFieldGEQDaysBeforeToday[0] + "</Value>" +
                    "         </Eq>" +
                    "         <Geq>" +
                    "             <FieldRef Name='" + t.rsQueryAndFieldGEQDaysBeforeToday[1] + "'></FieldRef>" +
                    "             <Value Type='DateTime'>" +
                    "                   <Today OffsetDays='" + (-1 * t.rsQueryAndFieldGEQDaysBeforeToday[2]) + "' />" +
                    "             </Value>" +
                    "         </Geq>" +
                    "    </And>" +
                    "</Where>";
            












            } else if (typeof(t.MyRSQueryAndFieldGEQDate) != "undefined") {

                var myName = $().SPServices.SPGetCurrentUser({
                    fieldName: "Title",
                    debug: false
                });

                if (typeof(mData.getRequesterFrom) == 'undefined') {
                    var getRequesterFrom = 'Author';
                } else {
                    var getRequesterFrom = mData.getRequesterFrom;
                }

                query = "<Where>" +
                    "    <And>" +
                    "         <Eq>" +
                    "               <FieldRef Name='RequestStatus'></FieldRef>" +
                    "               <Value Type='Text'>" + t.MyRSQueryAndFieldGEQDate[0] + "</Value>" +
                    "         </Eq>" +
                    "         <And>" +
                    "             <Geq>" +
                    "                   <FieldRef Name='" + t.MyRSQueryAndFieldGEQDate[1] + "'></FieldRef>" +
                    "                   <Value Type='DateTime'>" + t.MyRSQueryAndFieldGEQDate[2] + "</Value>" +
                    "             </Geq>" +
                    "             <Contains>" +
                    "                   <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
                    "                   <Value Type='Text'>" + myName + "</Value>" +
                    "             </Contains>" +
                    "        </And>" +
                    "   </And>" +
                    "</Where>";
            } else if (typeof(t.MyRSQueryAndFieldLTDate) != "undefined") {

                var myName = $().SPServices.SPGetCurrentUser({
                    fieldName: "Title",
                    debug: false
                });

                if (typeof(mData.getRequesterFrom) == 'undefined') {
                    var getRequesterFrom = 'Author';
                } else {
                    var getRequesterFrom = mData.getRequesterFrom;
                }

                query = "<Where>" +
                    "    <And>" +
                    "         <Eq>" +
                    "               <FieldRef Name='RequestStatus'></FieldRef>" +
                    "               <Value Type='Text'>" + t.MyRSQueryAndFieldLTDate[0] + "</Value>" +
                    "         </Eq>" +
                    "         <And>" +
                    "             <Lt>" +
                    "                   <FieldRef Name='" + t.MyRSQueryAndFieldLTDate[1] + "'></FieldRef>" +
                    "                   <Value Type='DateTime'>" + t.MyRSQueryAndFieldLTDate[2] + "</Value>" +
                    "             </Lt>" +
                    "             <Contains>" +
                    "                   <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
                    "                   <Value Type='Text'>" + myName + "</Value>" +
                    "             </Contains>" +
                    "         </And>" +
                    "    </And>" +
                    "</Where>";









            } else if (typeof(t.basicEOLQueryRelevantValue) != "undefined") {
                if (t.basicEOLQueryRelevantValue == 0) {
                    query = "<Where>" +
                        "   <Or>" +
                        "        <Eq>" +
                        "             <FieldRef Name='EndOfLife'></FieldRef>" +
                        "             <Value Type='Text'>0</Value>" +
                        "         </Eq>" +
                        "        <IsNull>" +
                        "             <FieldRef Name='EndOfLife'></FieldRef>" +
                        "        </IsNull>" +
                        "   </Or>" +
                        "</Where>";
                } else if (t.basicEOLQueryRelevantValue == 1) {
                    query = "<Where>" +
                        "   <Eq>" +
                        "        <FieldRef Name='EndOfLife'></FieldRef>" +
                        "        <Value Type='Text'>1</Value>" +
                        "   </Eq>" +
                        "</Where>";
                }
            } else if (typeof(t.basicMyEOLQueryRelevantValue) != "undefined") {

                var myName = $().SPServices.SPGetCurrentUser({
                    fieldName: "Title",
                    debug: false
                });

                if (typeof(mData.getRequesterFrom) == 'undefined') {
                    var getRequesterFrom = 'Author';
                } else {
                    var getRequesterFrom = mData.getRequesterFrom;
                }

                if (t.basicMyEOLQueryRelevantValue == 0) {
                    query = "<Where>" +
                        "   <And>" +
                        "       <Or>" +
                        "            <Eq>" +
                        "                 <FieldRef Name='EndOfLife'></FieldRef>" +
                        "                 <Value Type='Text'>0</Value>" +
                        "             </Eq>" +
                        "            <IsNull>" +
                        "                 <FieldRef Name='EndOfLife'></FieldRef>" +
                        "            </IsNull>" +
                        "       </Or>" +
                        "        <Contains>" +
                        "             <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
                        "             <Value Type='Text'>" + myName + "</Value>" +
                        "        </Contains>" +
                        "   </And>" +
                        "</Where>";
                } else if (t.basicMyEOLQueryRelevantValue == 1) {
                    query = "<Where>" +
                        "   <And>" +
                        "        <Eq>" +
                        "             <FieldRef Name='EndOfLife'></FieldRef>" +
                        "             <Value Type='Text'>1</Value>" +
                        "        </Eq>" +
                        "        <Contains>" +
                        "             <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
                        "             <Value Type='Text'>" + myName + "</Value>" +
                        "        </Contains>" +
                        "   </And>" +
                        "</Where>";
                }
            } else {
                query = t.customCAMLQuery;
            }




            var listForDatatable = $().GetListDataForDatatable({
                'listName': 'SWFList',
                'webURL': t.webURL,
                'query': query,
                'someColsAreUsers': t.someColsAreUsers,
                'viewFields': camlViewFields,
                'lookupFields': lookupFields,
                'formURI': mData.formURI,
                'returnURI': mData.returnURI
            });

            $().RenderListAsDatatable({
                'tableTitle': t.tableTitle,
                'tableID': t.tableID,
                'theadDetails': theadDetails,
                'listForDatatable': listForDatatable,
                'datatableFields': datatableFields,
                'sortColAndOrder': t.sortColAndOrder
            });

        });

    }



    $.fn.GetListDataForDatatable = function(options) {

        var returnValue = [];
        var opt = options;
        var fields = "<ViewFields>" +
            opt.viewFields +
            "</ViewFields>";

        var query = "<Query>" +
            opt.query +
            "</Query>";

        var queryOptions = "<QueryOptions></QueryOptions>";
        if (opt.someColsAreUsers == 1) {
            queryOptions = "<QueryOptions><ExpandUserField>TRUE</ExpandUserField></QueryOptions>"
        }

        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: opt.listName,
            webURL: opt.webURL,
            CAMLViewFields: fields,
            CAMLQuery: query,
            CAMLQueryOptions: queryOptions,
            completefunc: function(xData, Status) {

                // iterate through every list item returned
                $(xData.responseXML).SPFilterNode("z:row").each(function() {

                    var thisItem = $(this);
                    var itemDataForReturn = {};

                    $.each(opt.lookupFields, function(i, lookupField) {

                        if (typeof(thisItem.attr("ows_" + lookupField.internalName)) === "undefined") {
                            itemDataForReturn[lookupField.internalName] = "";
                        } else {

                            if (lookupField.formLink == 1) {

                                itemDataForReturn[lookupField.internalName] = "<a href='" + opt.formURI +
                                    "?requestID=" + thisItem.attr("ows_" + lookupField.internalName) +
                                    "&returnURI=" + opt.returnURI +
                                    "' class='link_request-id'>" + thisItem.attr("ows_" + lookupField.internalName) + "</a>";

                            } else if (lookupField.anchorNoHref == 1) {

                                itemDataForReturn[lookupField.internalName] = "<a class='anchor_no-href'>" + thisItem.attr("ows_" + lookupField.internalName) + "</a>";

                            } else if (lookupField.userName == 1) {

                                itemDataForReturn[lookupField.internalName] = $().RenderPersonLinks(thisItem.attr("ows_" + lookupField.internalName));

                            } else if (lookupField.friendlyFormatOnLoad != 0) {

                                itemDataForReturn[lookupField.internalName] = $().ReturnSortableDate(thisItem.attr("ows_" + lookupField.internalName), lookupField.friendlyFormatOnLoad.incomingFormat, lookupField.friendlyFormatOnLoad.returnFormat, lookupField.friendlyFormatOnLoad.determineYearDisplayDynamically);

                            } else {

                                itemDataForReturn[lookupField.internalName] = thisItem.attr("ows_" + lookupField.internalName);

                            }
                        }

                    });

                    returnValue.push(itemDataForReturn);
                });
            }
        });

        return returnValue;

    }



    $.fn.RenderPersonLinks = function(usersString) {

        // console.log(usersString);

        var returnValue = "";
        var userArray = usersString.split(";#");

        $.each(userArray, function(i, userData) {

            if (isNaN(userData) != false) {

                var userDataSplit = userData.split("#");

                if (StrInStr(userDataSplit[4], "@mos.org,", 1) != false) {
                    var userID = StrInStr(userDataSplit[4], "@mos.org,", 1);
                } else if (StrInStr(userDataSplit[4], "@MOS.ORG,", 1) != false) {
                    var userID = StrInStr(userDataSplit[4], "@MOS.ORG,", 1);
                } else {
                    var userID = userDataSplit[4];
                }

                if (StrInStr(userDataSplit[5], ",", 1) == false) {
                    var userName = userDataSplit[5];
                } else {
                    var userName = StrInStr(userDataSplit[5], ",", 1);
                }

                returnValue += '<div><a href="https://bmos-my.sharepoint.com/person.aspx?user=' + userID + '" target="_blank">' + userName + '</a></div>';
            }
        });

        return returnValue;

    }



    $.fn.ReturnSortableDate = function(dateTimeString, incomingFormat, returnFormat, determineYearDisplayDynamically) {

        // set up vars
        var retVal = '';

        retVal += '<span style="display: none">';
        retVal += $().ReturnFormattedDateTime(dateTimeString, incomingFormat, 'YYYY-MM-DD HH:mm', 0);
        retVal += '</span>';
        retVal += $().ReturnFormattedDateTime(dateTimeString, incomingFormat, returnFormat, determineYearDisplayDynamically);

        return retVal;
    }



    $.fn.ReturnFormattedDateTime = function(dateTimeString, incomingFormat, returnFormat, determineYearDisplayDynamically) {

        // config locale
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;

        // set up vars
        var retVal = '';

        // if dateTimeString is set to 'nowLocal', reset to string representing current datetime
        if (dateTimeString == 'nowLocal') {
            dateTimeString = moment().format();
        }

        // if dateTimeString is set to 'nowUTC', reset to string representing current datetime
        if (dateTimeString == 'nowUTC') {
            dateTimeString = moment().format('YYYY-MM-DDTHH:mm:ssZ');
        }

        // if need to determine year display dynamically
        //      (essentially, we'll only display year if it's not the current year)
        if (typeof(determineYearDisplayDynamically) != "undefined") {
            if (determineYearDisplayDynamically == 1) {

                // if there's an incoming format
                if (incomingFormat != null) {
                    // use that to to parse dateTimeString's year
                    var dateTimeStringYear = moment(dateTimeString, incomingFormat).format('YYYY');
                    // otherwise
                } else {
                    // assume dateTimeString is in ISO format
                    var dateTimeStringYear = moment(dateTimeString).format('YYYY');
                }

                // if dateTimeString's year != the current year
                if (moment(dateTimeString).format('YYYY') != moment().format('YYYY')) {
                    // set flag to display year
                    var displayYear = 1;
                    // otherwise
                } else {
                    // set flag to not display year
                    var displayYear = 0;
                }

                // if displayYear == 1 and returnFormat doesn't contain the year
                if (displayYear == 1 && StrInStr(returnFormat, ', YYYY', 0) == false) {
                    // add the year to returnFormat
                    returnFormat += ', YYYY';
                }
                // if displayYear == 0 and returnFormat DOES contain the year
                if (displayYear == 0 && StrInStr(returnFormat, ', YYYY', 0) != false) {
                    // remove the year from returnFormat
                    returnFormat = ReplaceAll(', YYYY', '', returnFormat);
                }
            }
        }

        // if incoming format is null, assume dateTimeString is in iso format
        if (incomingFormat == null) {
            // if return format is null
            if (returnFormat == null) {
                // use iso format to format dateTimeString
                retVal += moment(dateTimeString, incomingFormat).format();
                // if return format is not null
            } else {
                // use return format to format dateTimeString
                retVal += moment(dateTimeString, incomingFormat).format(returnFormat);
            }
        
        // if incoming format is not null, use it to parse dateTimeString
        } else {

            // if incomingFormat contains ', YYYY' and dateTimeString doesn't end with that value and determineYearDisplayDynamically == 1
            //  (E.g., incomingFormat == 'MMMM D, YYYY' and dateTimeString is only 'February 14'
            if (StrInStr(incomingFormat, ', YYYY') != false && StrInStr(dateTimeString, ', 2') == false && typeof(determineYearDisplayDynamically) != "undefined" && determineYearDisplayDynamically == 1) {
                // augment with the current year
                //  (since determineYearDisplayDynamically == 1, should be safe assumption (until it isn't))
                dateTimeString += ', ' + moment().format('YYYY');
            }

            // if return format is null
            if (returnFormat == null) {
                // use iso format to format dateTimeString
                retVal += moment(dateTimeString, incomingFormat).format();

            // if return format is not null
            } else {
                // use return format to format dateTimeString
                retVal += moment(dateTimeString, incomingFormat).format(returnFormat);
            }
        }

        return retVal;
    }



    $.fn.ReturnButtonLink = function(linkType, anchorText, href, idValue, classValues, target) {
        var newLink = "<a";
        if (typeof(idValue) != "null" && typeof(idValue) != "undefined" && idValue != "") {
            newLink += " id=\"" + idValue + "\"";
        }

        newLink += " class=\"button-link";

        switch (linkType) {

            case "newItem":
                newLink += " button-link_new-item";
                break;

            case "goForward":
                newLink += " button-link_go-forward";
                break;
        }

        if (typeof(classValues) != "null" && typeof(classValues) != "undefined" && classValues != "") {
            newLink += " " + classValues;
        }
        newLink += "\"";
        if (typeof(target) != "null" && typeof(target) != "undefined" && target != "") {
            newLink += " target=\"" + target + "\"";
        }
        newLink += " href=\"" + href + "\">" + anchorText + "</a>";
        return newLink;
    }



    $.fn.RenderSWFNewRequestButton = function(mData) {
        if (mData.formURI != "") {
            $("#table-container").before($().ReturnButtonLink("newItem", "new request", mData.formURI + '?returnURI=' + mData.returnURI, "", "button_swf-new-request-with-datatable"));
        }
    }



    $.fn.RenderAdditionalButtons = function(bData) {
        var buttonsMarkup = "";
        $.each(bData, function(i, button) {
            buttonsMarkup += $().ReturnButtonLink(button.linkType, button.anchorText, button.href, button.idValue, button.classValues, button.target)
        });
        $("#table-container").before(buttonsMarkup);
    }



    $.fn.RenderListAsDatatable = function(options) {

        var opt = options;

        if (typeof(opt.tableTitle) != "undefined") {
            $("#table-container").append("<h2 id='header_" + opt.tableID + "'>" + opt.tableTitle + "</h2>");
        }

        if (typeof(opt.listForDatatable[0]) == "undefined") {
            $("#table-container").append("<p class='message_no-requests-found'>No requests found</p>");
        } else {

            $("#table-container").append("<table id='" + opt.tableID + "'><thead><tr>" + opt.theadDetails + "</tr></thead></table>");

            $("#" + opt.tableID).DataTable({
                "data": opt.listForDatatable,
                "columns": opt.datatableFields,
                "dom": "ftp",
                "pageLength": 30,
                "pagingType": "simple",
                "order": opt.sortColAndOrder
            });
        }

    }



    $.fn.GetMondayThisWeekAsISODateString = function(relevantMondayISODateString) {
        var today = new Date();
        var day = today.getDay();
        var mondayThisWeekAsISODateString = moment().subtract(day - 1, 'days').format("YYYY-MM-DD");
        return mondayThisWeekAsISODateString;
    }



    $.fn.GenerateDatesForEveryXDaysEndNever = function(xVar, startDate) {
        // daily - every X days - custom start date - no end date
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var xVar = 3; // every X days
        //var startDate = "01/03/2016";
        var maxOccurrences = (365 * 5) / xVar;
        var ocurrencePattern = moment(startDate).subtract(xVar, 'days').recur().every(xVar).days();
        return ocurrencePattern.next(maxOccurrences, "L");

    }



    $.fn.GenerateDatesForEveryXDaysEndAfterYOccurrences = function(xVar, startDate, yVar) {
        // daily - every X days - custom start date - end after Y occurrences
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var xVar = 5; // every X days
        //var yVar = 5; // end after Y occurrences
        //var startDate = "01/01/2016";
        var ocurrencePattern = moment(startDate).subtract(xVar, 'days').recur().every(xVar).days();
        return ocurrencePattern.next(yVar, "L");

    }



    $.fn.GenerateDatesForEveryXDaysEndByDateY = function(xVar, startDate, yVar) {
        // daily - every X days - custom start date - end by date Y
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var xVar = 3; // every X days
        //var yVar = "01/30/2016"; // end by date Y
        //var startDate = "01/01/2016";
        var ocurrencePattern = moment().recur(startDate, yVar).every(xVar).days();
        return ocurrencePattern.all("L");

    }



    $.fn.GenerateDatesForEveryWeekdayEndNever = function(startDate) {
        // daily - every weekday - custom start date - no end date
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        var maxOccurrences = 52 * 5 * 5;
        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).daysOfWeek();
        return ocurrencePattern.next(maxOccurrences, "L");

    }



    $.fn.GenerateDatesForEveryWeekdayEndAfterXOccurrences = function(startDate, xVar) {
        // daily - every weekday - custom start date - end after X occurrences
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/02/2016";
        //var xVar = 5; // end after X occurrences
        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).daysOfWeek();
        return ocurrencePattern.next(xVar, "L");

    }



    $.fn.GenerateDatesForEveryWeekdayEndByDateX = function(startDate, xVar) {
        // daily - every weekday - custom start date - end by date X
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = "01/31/2016"; // end by date X
        var ocurrencePattern = moment().recur(startDate, xVar).every(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).daysOfWeek();
        return ocurrencePattern.all("L");

    }



    $.fn.GenerateDatesForEveryXWeeksOnYDaysEndNever = function(xVar, yVar, startDate) {
        // weekly - every X weeks on [array of days of week] - custom start date - no end date
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 3; // every X weeks
        //var yVar = ["Monday", "Tuesday", "Wednesday"]; // array of days of week
        var maxOccurrences = (5 * 52) / xVar; // 5 years of occurrences
        var qtyOccurrencesInFodder = maxOccurrences * xVar * yVar.length;
        var chunkSize = yVar.length;
        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek();
        var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
        return $().GetEveryNthChunkAsUnchunked(ocurrenceFodder, chunkSize, xVar);
    }



    $.fn.GenerateDatesForEveryXWeeksOnYDaysEndAfterZOccurrences = function(xVar, yVar, startDate, zVar) {
        // weekly - every X weeks on [array of days of week] - custom start date - end after Z occurrences
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 4; // every X weeks
        //var yVar = ["Thursday", "Friday"]; // array of days of week
        //var zVar = 17; // end after Z occurrences

        var qtyWeeksInSelectedOccurrences = Math.ceil(zVar / yVar.length); // err on side of too many, not too few; extra dates will be removed later
        var qtyOccurrencesInFodder = zVar * xVar; // qtyWeeksInSelectedOccurrences * qty weeks until each ocurrencePattern * qty days in weeks
        var chunkSize = yVar.length;

        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek();
        var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
        var selectedOcurrences = $().GetEveryNthChunkAsUnchunked(ocurrenceFodder, chunkSize, xVar);

        // ensure only the desired number of selected occurrences are in the final batch
        var occrrencesPared = [];
        $.each(selectedOcurrences, function(k, v) {
            // k is 0-indexed; zVar is 1-indexed
            if (k < zVar) {
                occrrencesPared.push(v)
            }
        });

        return occrrencesPared;
    }



    $.fn.GenerateDatesForEveryXWeeksOnYDaysEndByDateZ = function(xVar, yVar, startDate, zVar) {
        // weekly - every X weeks on [array of days of week] - custom start date - end by date Z
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 3; // every X weeks
        //var yVar = ["Monday", "Tuesday", "Wednesday"]; // array of days of week
        //var zVar = "08/31/2016"; // end by date Z

        var chunkSize = yVar.length;

        var ocurrencePattern = moment().recur(startDate, zVar).every(yVar).daysOfWeek();
        var ocurrenceFodder = ocurrencePattern.all("L");
        return $().GetEveryNthChunkAsUnchunked(ocurrenceFodder, chunkSize, xVar);

    }



    $.fn.GenerateDatesForEveryXDaysOfEveryYMonthsEndNever = function(xVar, yVar, startDate) {
        // monthly - every day X of every Y months - custom start date - no end date
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X day
        //var yVar = 8; // every Y months
        var maxOccurrences = 5 * (12 / yVar); // 5 years of occurrences
        var qtyOccurrencesInFodder = maxOccurrences * yVar;
        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(xVar).daysOfMonth();
        var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
        return $().GetFirstAndEveryNthDate(ocurrenceFodder, yVar);
    }



    $.fn.GenerateDatesForEveryXDaysOfEveryYMonthsEndAfterYOccurrences = function(xVar, yVar, startDate, zVar) {
        // monthly - every day X of every Y months - custom start date - end after Z occurrences
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X day
        //var yVar = 8; // every Y months
        //var zVar = 5; // end after Z occurrences
        var qtyOccurrencesInFodder = zVar * yVar;
        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(xVar).daysOfMonth();
        var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
        return $().GetFirstAndEveryNthDate(ocurrenceFodder, yVar);
    }



    $.fn.GenerateDatesForEveryXDaysOfEveryYMonthsEndByDateY = function(xVar, yVar, startDate, zVar) {
        // monthly - every day X of every Y months - custom start date - end by date Z
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X day
        //var yVar = 3; // every Y months
        //var zVar = "08/31/2020"; // end by date Z
        var ocurrencePattern = moment().recur(startDate, zVar).every(xVar).daysOfMonth();
        var ocurrenceFodder = ocurrencePattern.all("L");
        return $().GetFirstAndEveryNthDate(ocurrenceFodder, yVar);
    }



    $.fn.GenerateDatesForEveryXYDayOfEveryZMonthsEndNever = function(xVar, yVar, zVar, startDate) {
        // monthly - every X (ordinal) Y (day of week) of every Z month(s) - custom start date - no end date
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/04/2016";
        //var xVar = 1; // every X (ordinal)
        //var yVar = "Monday"; // day of week
        //var zVar = 2; // months
        var maxOccurrences = 5 * (12 / zVar); // 5 years of occurrences
        var qtyOccurrencesInFodder = maxOccurrences * zVar;
        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay();
        var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
        return $().GetFirstAndEveryNthDate(ocurrenceFodder, zVar);
    }



    $.fn.GenerateDatesForEveryXYDayOfEveryZMonthsEndAfterYOccurrences = function(xVar, yVar, zVar, startDate, aVar) {
        // monthly - every X (ordinal/last) Y (day of week) of every Z month(s) - custom start date - end after A occurrences
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/04/2016";
        //var xVar = 1; // every X (ordinal)
        //var yVar = "Monday"; // day of week
        //var zVar = 2; // months
        //var aVar = 5; // end after A occurrences
        var qtyOccurrencesInFodder = aVar * zVar;
        var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay();
        var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
        return $().GetFirstAndEveryNthDate(ocurrenceFodder, zVar);
    }



    $.fn.GenerateDatesForEveryXYDayOfEveryZMonthsEndByDateY = function(xVar, yVar, zVar, startDate, aVar) {
        // monthly - every X (ordinal/last) Y (day of week) of every Z month(s) - custom start date - end by date A
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/04/2016";
        //var xVar = 1; // every X (ordinal)
        //var yVar = "Monday"; // day of week
        //var zVar = 2; // months
        //var aVar = "10/31/2016"; // end by date A
        var ocurrencePattern = moment().recur(startDate, aVar).every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay();
        var ocurrenceFodder = ocurrencePattern.all("L");
        return $().GetFirstAndEveryNthDate(ocurrenceFodder, zVar);
    }



    $.fn.GenerateDatesForEveryXDayYMonthEveryYearEndNever = function(xVar, yVar, startDate) {
        // yearly - every X month Y date - custom start date - no end date
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X month
        //var yVar = 3; // Y date
        var maxOccurrences = 5;
        var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfMonth().every(xVar - 1).monthsOfYear();
        return ocurrencePattern.next(maxOccurrences, "L");

    }



    $.fn.GenerateDatesForEveryXDayYMonthEveryYearEndAfterYOccurrences = function(xVar, yVar, startDate, zVar) {
        // yearly - every X month Y date - custom start date - end after Z occurrences
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X month
        //var yVar = 3; // Y date
        //var zVar = 5; // end after Z occurrences
        var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfMonth().every(xVar - 1).monthsOfYear();
        return allOcurrences = ocurrencePattern.next(zVar, "L");

    }



    $.fn.GenerateDatesForEveryXDayYMonthEveryYearEndByDateY = function(xVar, yVar, startDate, zVar) {
        // yearly - every X month Y date - custom start date - end by date Z
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X month
        //var yVar = 3; // Y date
        //var zVar = "01/31/2025"; // end by date Z
        var ocurrencePattern = moment().recur(startDate, zVar).every(yVar).daysOfMonth().every(xVar - 1).monthsOfYear();
        return allOcurrences = ocurrencePattern.all("L");

    }



    $.fn.GenerateDatesForEveryXYDayZMonthEveryYearEndNever = function(xVar, yVar, zVar, startDate) {
        // yearly - every X (ordinal/last) Y (day of week) of Z month - custom start date - no end date
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X (ordinal)
        //var yVar = "Monday"; // day of week
        //var zVar = 1; // month
        var maxOccurrences = 5;
        var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay().every(zVar - 1).monthsOfYear();
        return ocurrencePattern.next(maxOccurrences, "L");

    }



    $.fn.GenerateDatesForEveryXYDayZMonthEveryYearEndAfterYOccurrences = function(xVar, yVar, zVar, startDate, aVar) {
        // yearly - every X (ordinal/last) Y (day of week) of Z month - custom start date - end after A occurrences
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        //var startDate = "01/01/2016";
        //var xVar = 1; // every X (ordinal)
        //var yVar = "Monday"; // day of week
        //var zVar = 1; // month
        //var aVar = 5; // end after A occurrences
        var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay().every(zVar - 1).monthsOfYear(); //.subtract(1, 'days')
        return allOcurrences = ocurrencePattern.next(aVar, "L");

    }



    $.fn.GenerateDatesForEveryXYDayZMonthEveryYearEndByDateY = function(xVar, yVar, zVar, startDate, aVar) {
        // yearly - every X (ordinal/last) Y (day of week) of Z month - custom start date - end by date A
        moment.locale('en');
        moment.suppressDeprecationWarnings = true;
        var startDate = "01/01/2016";
        var xVar = 1; // every X (ordinal)
        var yVar = "Monday"; // day of week
        var zVar = 1; // month
        var aVar = "10/31/2020"; // end by date A

        var ocurrencePattern = moment().recur(startDate, aVar).every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay().every(zVar - 1).monthsOfYear(); //.subtract(1, 'days')
        return allOcurrences = ocurrencePattern.all("L");

    }



    $.fn.GetFirstAndEveryNthDate = function(getFromArray, n) {

        if (n == 0 || n == 1) {
            var returnArray = getFromArray;
        } else {
            // pop off the first date and keep it
            var returnArray = [];
            returnArray.push(getFromArray[0]);

            // create a dummy array of all dates but the first
            var allButFirst = [];
            $.each(getFromArray, function(k, v) {
                if (k != 0) {
                    allButFirst.push(v);
                }
            });

            $.each(allButFirst, function(k, v) {
                if (((k + 1) % n) == 0) {
                    returnArray.push(v);
                }
            });
        }

        return returnArray;
    }




    $.fn.GetEveryNthChunkAsUnchunked = function(getFromArray, chunkSize, n) {

        if (n == 0 || n == 1) {
            var returnArray = getFromArray;
        } else {

            var chunkedArray = [];
            var chunkedFilteredArray = [];
            var returnArray = [];
            var i, j, tempArray; //, chunk = yVar.length
            for (i = 0, j = getFromArray.length; i < j; i += chunkSize) {
                tempArray = getFromArray.slice(i, i + chunkSize);
                chunkedArray.push(tempArray);
            }

            // pop off the first chunk and keep it
            chunkedFilteredArray.push(chunkedArray[0]);

            // create a dummy array of all chunks but the first
            var allChunksButFirst = [];
            $.each(chunkedArray, function(k, v) {
                if (k != 0) {
                    allChunksButFirst.push(v);
                }
            });

            $.each(allChunksButFirst, function(k, v) {
                if (((k + 1) % n) == 0) {
                    chunkedFilteredArray.push(v);
                }
            });

            $.each(chunkedFilteredArray, function(k, v) {
                $.each(v, function(k2, v2) {
                    returnArray.push(v2);
                });
            });


        }

        return returnArray;
    }




    $.fn.ImportEventNeedsRequestDataToEventAVRequest = function(requestID) {

        console.log("function called");

        var eventRData = $().GetFieldsFromOneRow({
            "listName": "swfList",
            "webURL": "https://bmos.sharepoint.com/sites/vxo-event-needs",
            "select": [{
                "nameHere": "formData",
                "nameInList": "AllRequestData"
            }],
            "where": {
                "field": "ID",
                "type": "Number",
                "value": requestID,
            }
        });


        console.log(eventRData.formData);

        var eventRDataSelected = {};

        if ("Event-Name" in eventRData.formData){ eventRDataSelected["Event-Name"] = eventRData.formData["Event-Name"]; }

        if ("Event-Space" in eventRData.formData){ eventRDataSelected["Event-Space"] = eventRData.formData["Event-Space"]; }

        if ("date-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Beginning-Datetime"] = eventRData.formData["date-input_Event-Beginning-Datetime"]; }
        if ("hours-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Beginning-Datetime"] = eventRData.formData["hours-input_Event-Beginning-Datetime"]; }
        if ("minutes-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Beginning-Datetime"] = eventRData.formData["minutes-input_Event-Beginning-Datetime"]; }
        if ("datetime-storage_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Beginning-Datetime"] = eventRData.formData["datetime-storage_Event-Beginning-Datetime"]; }

        if ("date-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Ending-Datetime"] = eventRData.formData["date-input_Event-Ending-Datetime"]; }
        if ("hours-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Ending-Datetime"] = eventRData.formData["hours-input_Event-Ending-Datetime"]; }
        if ("minutes-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Ending-Datetime"] = eventRData.formData["minutes-input_Event-Ending-Datetime"]; }
        if ("datetime-storage_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Ending-Datetime"] = eventRData.formData["datetime-storage_Event-Ending-Datetime"]; }

        if ("Event-Location" in eventRData.formData) { eventRDataSelected["Event-Location"] = eventRData.formData["Event-Location"]; }
        if ("Onsite-Contact" in eventRData.formData) { eventRDataSelected["Onsite-Contact"] = eventRData.formData["Onsite-Contact"]; }
        if ("IIT-Account-Number" in eventRData.formData) { eventRDataSelected["Account-Number"] = eventRData.formData["IIT-Account-Number"]; }


        PopulateFormData("div#mos-form", eventRDataSelected, "https://bmos.sharepoint.com/sites/vxo-function/Lists/SWFList", requestID, undefined);
    }



    $.fn.ImportEventSpaceRequestDataToEventRequest = function(requestID) {

        var eventRData = $().GetFieldsFromOneRow({
            "listName": "swfList",
            "webURL": "https://bmos.sharepoint.com/sites/vxo-event-space",
            "select": [{
                "nameHere": "formData",
                "nameInList": "AllRequestData"
            }],
            "where": {
                "field": "ID",
                "type": "Number",
                "value": requestID,
            }
        });

        console.log(eventRData.formData);

        var eventRDataSelected = {};

        if ("Event-Name" in eventRData.formData){ eventRDataSelected["Event-Name"] = eventRData.formData["Event-Name"]; }
        if ("Total-Attendance" in eventRData.formData){ eventRDataSelected["Total-Attendance"] = eventRData.formData["Total-Attendance"]; }
        if ("Requested-Space" in eventRData.formData){ eventRDataSelected["Event-Space"] = eventRData.formData["Requested-Space"]; }

        if ("date-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Beginning-Datetime"] = eventRData.formData["date-input_Event-Beginning-Datetime"]; }
        if ("hours-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Beginning-Datetime"] = eventRData.formData["hours-input_Event-Beginning-Datetime"]; }
        if ("minutes-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Beginning-Datetime"] = eventRData.formData["minutes-input_Event-Beginning-Datetime"]; }
        if ("datetime-storage_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Beginning-Datetime"] = eventRData.formData["datetime-storage_Event-Beginning-Datetime"]; }

        if ("date-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Ending-Datetime"] = eventRData.formData["date-input_Event-Ending-Datetime"]; }
        if ("hours-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Ending-Datetime"] = eventRData.formData["hours-input_Event-Ending-Datetime"]; }
        if ("minutes-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Ending-Datetime"] = eventRData.formData["minutes-input_Event-Ending-Datetime"]; }
        if ("datetime-storage_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Ending-Datetime"] = eventRData.formData["datetime-storage_Event-Ending-Datetime"]; }

        if ("date-input_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Space-Reserved-Beginning-Datetime"] = eventRData.formData["date-input_Space-Reserved-Beginning-Datetime"]; }
        if ("hours-input_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Space-Reserved-Beginning-Datetime"] = eventRData.formData["hours-input_Space-Reserved-Beginning-Datetime"]; }
        if ("minutes-input_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Space-Reserved-Beginning-Datetime"] = eventRData.formData["minutes-input_Space-Reserved-Beginning-Datetime"]; }
        if ("datetime-storage_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Space-Reserved-Beginning-Datetime"] = eventRData.formData["datetime-storage_Space-Reserved-Beginning-Datetime"]; }

        if ("date-input_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Space-Reserved-Ending-Datetime"] = eventRData.formData["date-input_Space-Reserved-Ending-Datetime"]; }
        if ("hours-input_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Space-Reserved-Ending-Datetime"] = eventRData.formData["hours-input_Space-Reserved-Ending-Datetime"]; }
        if ("minutes-input_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Space-Reserved-Ending-Datetime"] = eventRData.formData["minutes-input_Space-Reserved-Ending-Datetime"]; }
        if ("datetime-storage_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Space-Reserved-Ending-Datetime"] = eventRData.formData["datetime-storage_Space-Reserved-Ending-Datetime"]; }

        if ("Event-Location" in eventRData.formData) { eventRDataSelected["Event-Location"] = eventRData.formData["Event-Location"]; }
        if ("Onsite-Contact" in eventRData.formData) { eventRDataSelected["Onsite-Contact"] = eventRData.formData["Onsite-Contact"]; }
        if ("IIT-Account-Number" in eventRData.formData) { eventRDataSelected["Account-Number"] = eventRData.formData["IIT-Account-Number"]; }


        PopulateFormData("div#mos-form", eventRDataSelected, "https://bmos.sharepoint.com/sites/vxo-function/Lists/SWFList", requestID, undefined);
    }



    $.fn.ImportEventNeedsRequestDataToCateringRequest = function(requestID) {

        var eventRData = $().GetFieldsFromOneRow({
            "listName": "swfList",
            "webURL": "https://bmos.sharepoint.com/sites/vxo-event-needs",
            "select": [{
                "nameHere": "formData",
                "nameInList": "AllRequestData"
            }],
            "where": {
                "field": "ID",
                "type": "Number",
                "value": requestID,
            }
        });

        var eventRDataSelected = {};

        if ("date-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Beginning-Datetime"] = eventRData.formData["date-input_Event-Beginning-Datetime"]; }
        if ("hours-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Beginning-Datetime"] = eventRData.formData["hours-input_Event-Beginning-Datetime"]; }
        if ("minutes-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Beginning-Datetime"] = eventRData.formData["minutes-input_Event-Beginning-Datetime"]; }
        if ("datetime-storage_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Beginning-Datetime"] = eventRData.formData["datetime-storage_Event-Beginning-Datetime"]; }

        if ("date-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Ending-Datetime"] = eventRData.formData["date-input_Event-Ending-Datetime"]; }
        if ("hours-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Ending-Datetime"] = eventRData.formData["hours-input_Event-Ending-Datetime"]; }
        if ("minutes-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Ending-Datetime"] = eventRData.formData["minutes-input_Event-Ending-Datetime"]; }
        if ("datetime-storage_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Ending-Datetime"] = eventRData.formData["datetime-storage_Event-Ending-Datetime"]; }

        if ("Total-Attendance" in eventRData.formData){ eventRDataSelected["Total-Attendance"] = eventRData.formData["Total-Attendance"]; }

        if ("Onsite-Contact" in eventRData.formData) { eventRDataSelected["Onsite-Contact"] = eventRData.formData["Onsite-Contact"]; }

        if ("WPC-Account-Number" in eventRData.formData) { eventRDataSelected["Account-Number"] = eventRData.formData["WPC-Account-Number"]; }

        PopulateFormData("div#mos-form", eventRDataSelected, "https://bmos.sharepoint.com/sites/vxo-function/Lists/SWFList", requestID, undefined);

        if (typeof($("input#Total-Attendance").val()) != "undefined" && $("input#Total-Attendance").val() != "" && $("input#Total-Attendance").val() != "0" && (/^[0-9]*[1-9][0-9]*$/.test($("input#Total-Attendance").val()))) {
            $().SetFieldToEnabled("#checkbox-for-boxed-lunches_boxedlunches");
            $().SetFieldToEnabled("#checkbox-for-upscale-sandwich-buffet_upscalesandwichbuffet");
            $().SetFieldToEnabled("#checkbox-for-delicatessen-buffet_delicatessenbuffet");
        }
    }



    $.fn.SetSubtotalAndTotalFromTableRowPriceAndQuantity = function(quantityNumberElement) {
        
        var commonParentElement = $(quantityNumberElement).closest("tr");
        var previousQuantityNumberElement = $(commonParentElement).find("input.previous-quantity");
        var priceNumberElement = $(commonParentElement).find("span.price-amount");
        var subtotalNumberElement = $(commonParentElement).find("input.subtotal-input");
        var totalNumberElement = $("input#Request-Total");

        var priceString = $(priceNumberElement).text();
        var quantityString = $(quantityNumberElement).val();
        var previousQuantityString = $(previousQuantityNumberElement).val();
        var subtotalString = $(subtotalNumberElement).text();
        var totalString = $(totalNumberElement).val();
        
        var priceNumber = Number(ReplaceAll(",","", priceString));
        var totalNumber = Number(ReplaceAll("\\$","", ReplaceAll(",","", totalString)));



        // if quantityString is empty string

            // set quantityNumber to 0
            // clear error message

        // if quantityString is not empty string

            // if quantityString is 0

                // set quantityNumber to 0
                // clear error message

            // if quantityString is not 0

                // if quantityString is not positive integer

                    // set quantityNumber to 0
                    // set error message

                // if quantityString is positive integer

                    // set quantityNumber to quantityString
                    // clear error message 

        // if quantityNumber is 0

            // set subtotalNumber to 0

        // if quantityNumber is not 0

            // set subtotalNumber to priceNumber * quantityNumber

        // if previousQuantityString is empty or is 0 (initial entry)

            // set previousQuantityNumber to 0

        // else

            // set previousQuantityNumber to previousQuantityString

        // if previousQuantityNumber is 0 (initial entry)

            // set newTotalNumber to previousTotalNumber + subtotalNumber

        // if previousQuantityNumber is not 0 (not initial entry)

            // set quantityDifferenceNumber to quantityNumber - previousQuantityNumber (may be negative)

            // set totalDifferenceNumber to priceNumber * quantityDifferenceNumber (may be negative)

            // set newTotalNumber to previousTotalNumber + totalDifferenceNumber

        // if quantityNumber|subtotalNumber|newTotalNumber is 0

            // set subtotalPrefix|newTotalPrefix to empty
            // set quantityString|subtotalString|newTotalString to empty

        // if quantityNumber|subtotalNumber|newTotalNumber is not 0

            // set subtotalPrefix|newTotalPrefix to $
            // set quantityString|subtotalString|newTotalString to quantityNumber|subtotalNumber|newTotalNumber

        // set prefixes and values: quantity|previousQuantity|subtotal|total


        if (quantityString == "") {
            var quantityNumber = 0;
            $(commonParentElement).find("div.error-message").remove();
            $(commonParentElement).find("div.contains-errors").removeClass("contains-errors");

        } else {
            if (quantityString == "0") {
                var quantityNumber = 0;
                $(commonParentElement).find("div.error-message").remove();
                $(commonParentElement).find("div.contains-errors").removeClass("contains-errors");
            } else {
                if (!(/^[0-9]*[1-9][0-9]*$/.test(quantityString))) {
                    var quantityNumber = 0;
                    $().SetErrorMessage(quantityElement, 'Please enter a valid positive integer');
                } else {
                    var quantityNumber = Number(quantityString);
                    $(commonParentElement).find("div.error-message").remove();
                    $(commonParentElement).find("div.contains-errors").removeClass("contains-errors");
                }
            }
        }

        if(quantityNumber == 0) {
            var newSubtotalNumber = 0;
        } else {
            var newSubtotalNumber = priceNumber * quantityNumber;
        }

        if (previousQuantityString == "" || previousQuantityString == "0") {
            var previousQuantityNumber = 0;
        } else {
            var previousQuantityNumber = Number(previousQuantityString);
        }
        // console.log("previousQuantityNumber = " + previousQuantityNumber);

        if (previousQuantityNumber == 0) {
            totalNumber = totalNumber + newSubtotalNumber;
        } else {
            var quantityDifferenceNumber = quantityNumber - previousQuantityNumber;
            var totalDifferenceNumber = priceNumber * quantityDifferenceNumber;
            totalNumber = totalNumber + totalDifferenceNumber;
        }
        // console.log("totalNumber = " + totalNumber);

        if (quantityNumber == 0) {
            quantityString = "";
            previousQuantityString = "";
        } else {
            quantityString = quantityNumber.toString();
            previousQuantityString = quantityString;
        }
        // console.log("quantityString = " + quantityString);

        if (newSubtotalNumber == 0) {
            subtotalString = "";
        } else {
            subtotalString = "$" + newSubtotalNumber.toLocaleString();
        }
        // console.log("subtotalString = " + subtotalString);

        if (totalNumber == 0) {
            totalString = "$0";
        } else {
            totalString = "$" + totalNumber.toLocaleString();
            if ($("div#parent_total").hasClass("hidden")) {
                $("div#parent_total").show("fast").removeClass("hidden");
            }
        }
        // console.log("totalString = " + totalString);

        $(quantityNumberElement).val(quantityString);
        $(previousQuantityNumberElement).val(previousQuantityString);
        $(subtotalNumberElement).val(subtotalString);
        $(totalNumberElement).val(totalString);

    }



    $.fn.SetSubtotalAndTotalFromTableRowPriceAndTotalAttendance = function(selectionElement) {

        var commonParentElement = $(selectionElement).closest("tr");
        var priceNumberElement = $(commonParentElement).find("span.price-amount");
        var quantityNumberElement = $("input#Total-Attendance");
        var subtotalNumberElement = $(commonParentElement).find("input.subtotal-input");
        var totalNumberElement = $("input#Request-Total");

        var priceString = $(priceNumberElement).text();
        var quantityString = $(quantityNumberElement).val();
        var subtotalString = "";
        var totalString = $(totalNumberElement).val();

        var priceNumber = Number(priceString);
        var quantityNumber = Number(quantityString);
        var totalNumber = Number(ReplaceAll("\\$","", ReplaceAll(",","", totalString)));
        var subtotalNumber = priceNumber * quantityNumber;

        if ($(selectionElement).is(":checked")) {
            totalNumber = totalNumber + subtotalNumber;
        } else {
            totalNumber = totalNumber - subtotalNumber;
            subtotalNumber = 0;
        }

        if (subtotalNumber == 0) {
            subtotalString = "";
        } else {
            subtotalString = "$" + subtotalNumber.toLocaleString();
        }

        if (totalNumber == 0) {
            totalString = "$0";
        } else {
            totalString = "$" + totalNumber.toLocaleString();
            if ($("div#parent_total").hasClass("hidden")) {
                $("div#parent_total").show("fast").removeClass("hidden");
            }
        }

        $(subtotalNumberElement).val(subtotalString);
        $(totalNumberElement).val(totalString);

    }

    $.fn.ShowAndHideSelectedAndUnselectedCateringSelectionOptions = function() {

        // for each primary category div
        $("div.parent_primary-category").each(function(i, primaryCategory) {

            var showPrimaryCategory = 0;
            var parentPrimaryCategoryDivID = $(primaryCategory).attr("id");

            // for each tr
            $(primaryCategory).find("tbody tr").each(function(i, row) {

                var showRow = 0;
                var quantityInputValueForThisRow = $("div#" + parentPrimaryCategoryDivID + " tr#" + $(row).attr("id") + " input.quantity-input").val();
                var selectionCheckboxForThisRowIsChecked = $("div#" + parentPrimaryCategoryDivID + " tr#" + $(row).attr("id") + " input.item-selection").is(":checked");
                // console.log($(row).attr("id"));
                // if there's a quantity for this row
                if (typeof(quantityInputValueForThisRow) != "undefined" && quantityInputValueForThisRow != "") {
                    // console.log(row);
                    // set flags to show the row and the primary category div
                    showRow = 1;
                    showPrimaryCategory = 1;
                }

                // if there's a checked checkbox for this row
                if (selectionCheckboxForThisRowIsChecked) {
                    
                    // set flags to show the row and the primary category div
                    showRow = 1;
                    showPrimaryCategory = 1;
                }

                // if showRow = 0 && row is not hidden, hide the row
                if (showRow == 0 && !($(row).hasClass("hidden"))) {
                    $(row).hide("fast").addClass("hidden")
                }

            });
            // if showPrimaryCategory = 1 && primary category div is hidden, show the primary category div
            if (showPrimaryCategory == 1 && $(primaryCategory).hasClass("hidden")) {
                $(primaryCategory).show("fast").removeClass("hidden")
            }


        });
    }



    // $.fn.ShowAndHideAvailableCateringSelectionOptions = function() {

    //    // console.log('showing and hiding');

    //    var eventBeginningDateTime = $("input#datetime-storage_Event-Beginning-Datetime").val();
    //    var eventEndingDateTime = $("input#datetime-storage_Event-Ending-Datetime").val();
    //    var eventBeginningDate = eventBeginningDateTime.slice(0,10);
    //    var eventEndingDate = eventEndingDateTime.slice(0,10);
    //    var eventBeginningTime = eventBeginningDateTime.slice(11,16);
    //    var eventEndingTime = eventEndingDateTime.slice(11,16);
    //    var eventTotalAttendance = $("input#Total-Attendance").val();

    //    // console.log(eventBeginningDateTime);
    //    // console.log(eventEndingDateTime);

    //    if (eventBeginningDateTime != "" && eventEndingDateTime != "" && eventTotalAttendance != "" && eventTotalAttendance != "0") {

    //          var primaryCategoriesAvailable = 0;

    //          $("div.parent_primary-category").each(function(i, primaryCategory) {
                
    //               if (!($(this).hasClass("hidden"))) {
    //                    primaryCategoriesAvailable++;
    //               }

    //               var thisPrimaryCategoryBeginningTime = $(this).attr("data-available-beginning");
    //               var thisPrimaryCategoryEndingTime = $(this).attr("data-available-ending");

    //               // console.log($(this).find("h2").text() + " beginning time = " + eventBeginningDate + 'T' + thisPrimaryCategoryBeginningTime + ':00Z');
    //               // console.log($(this).find("h2").text() + " ending time = " + eventBeginningDate + 'T' + thisPrimaryCategoryEndingTime + ':00Z');

    //               // if this primary category should be available
    //               if (eventBeginningTime == thisPrimaryCategoryBeginningTime || moment(eventBeginningDateTime).isBetween(eventBeginningDate + 'T' + thisPrimaryCategoryBeginningTime + ':00Z', eventBeginningDate + 'T' + thisPrimaryCategoryEndingTime + ':00Z')) {
    //                    if ($(this).hasClass("hidden")) {
    //                          $(this).show("fast").removeClass("hidden");
    //                          primaryCategoriesAvailable++;
    //                    }
    //               // if this primary category should NOT be available
    //               } else {

    //                    if (!($(this).hasClass("hidden"))) {
    //                          $(this).hide("fast").addClass("hidden");
    //                          primaryCategoriesAvailable--;
    //                          $(this).find("input.quantity-input").each(function( index ) {
    //                               $(this).val("0");
    //                               $().SetSubtotalAndTotalFromTableRowPriceAndQuantity(this);
    //                          });
    //                          $(this).find("input.item-selection").each(function( index ) {
    //                               if ($(this).is(":checked")) {
    //                                    $(this).prop("checked", false).attr("checked", false);
    //                                    $().SetSubtotalAndTotalFromTableRowPriceAndTotalAttendance(this);
    //                               }
    //                          });
    //                    }
    //               }
    //          });

    //          if (primaryCategoriesAvailable == 0) {
    //               if (!($("div#parent_total").hasClass("hidden"))) {
    //                    $("div#parent_total").hide("fast").addClass("hidden");
    //               }
    //               if ($("ul#data-entry-requirement-notices").hasClass("hidden")) {
    //                    $("ul#data-entry-requirement-notices").show("fast").removeClass("hidden");
    //               }
    //          } else {                     
    //               if ($("div#parent_total").hasClass("hidden")) {
    //                    $("div#parent_total").show("fast").removeClass("hidden");
    //               }
    //               if (!($("ul#data-entry-requirement-notices").hasClass("hidden"))) {
    //                    $("ul#data-entry-requirement-notices").hide("fast").addClass("hidden");
    //               }
    //          }
    //    }
    // }



})(jQuery);

// Textarea and select clone() bug workaround | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Motivation.
// jQuery's clone() method works in most cases, but it fails to copy the value of textareas and select elements. This patch replaces jQuery's clone() method with a wrapper that fills in the
// values after the fact.

// An interesting error case submitted by Piotr Przybyl: If two <select> options had the same value, the clone() method would select the wrong one in the cloned box. The fix, suggested by Piotr
// and implemented here, is to use the selectedIndex property on the <select> box itself rather than relying on jQuery's value-based val().

(function(original) {
    jQuery.fn.clone = function() {
        var result = original.apply(this, arguments),
            my_textareas = this.find('textarea').add(this.filter('textarea')),
            result_textareas = result.find('textarea').add(result.filter('textarea')),
            my_selects = this.find('select').add(this.filter('select')),
            result_selects = result.find('select').add(result.filter('select'));

        for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
        for (var i = 0, l = my_selects.length; i < l; ++i) {
            for (var j = 0, m = my_selects[i].options.length; j < m; ++j) {
                if (my_selects[i].options[j].selected === true) {
                    result_selects[i].options[j].selected = true;
                }
            }
        }
        return result;
    };
})(jQuery.fn.clone);
