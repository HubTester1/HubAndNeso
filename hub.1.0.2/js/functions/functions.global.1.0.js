

(function ($) {


    $.fn.GetQuickLaunchDataAndBuildMarkupAndAppend = function (quickLaunchList) {


        // get a data promise for links (list items) that current user has permission to read
        var quickLaunchItemsPromise = $().SPServices.SPGetListItemsJson({
            webURL: '/sites/hubprod/',
            listName: quickLaunchList,
            //viewName: '',
            CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0" Ascending="TRUE"/></OrderBy></Query>',
            //CAMLViewFields: '',
            //CAMLRowLimit: '',
            //CAMLQueryOptions: '',
            //changeToken: '',
            //contains: '',
            mapping: null,
            mappingOverrides: null,
            debug: false
        });

        // when data promise is fulfilled
        $.when(quickLaunchItemsPromise).done(function () {

            // start the markup string
            var quickLaunchMarkup = '<ul class="root ms-core-listMenu-root static">';

            // for each link "datum"
            $.each(this.data, function (i, d) {

                // compare properly-encoded tokens to determine if this link is to the current page
                d.URL.Url = ReplaceAll(' ', '%20', d.URL.Url);
                var pagePath = ReplaceAll(' ', '%20', location.pathname);
                var thisIsCurrentPage = 0;
                StrInStr(d.URL.Url, location.pathname) != false ? thisIsCurrentPage = 1 : thisIsCurrentPage = 0;

                // build the markup for this link, making additional allowances if the link is to the current page
                quickLaunchMarkup += '   <li class="static';
                if (thisIsCurrentPage == 1) { quickLaunchMarkup += ' selected'; }
                quickLaunchMarkup += '">' +
                                        '       <a class="static ';
                if (thisIsCurrentPage == 1) { quickLaunchMarkup += ' selected ms-core-listMenu-selected '; }
                quickLaunchMarkup += 'menu-item ms-core-listMenu-item ms-displayInline ms-navedit-linkNode" title="' + d.URL.Description + '" href="' + d.URL.Url + '">' +
                                        '           <span class="additional-background ms-navedit-flyoutArrow">' +
                                        '               <span class="menu-item-text">' + d.URL.Description + '</span>';
                if (thisIsCurrentPage == 1) { quickLaunchMarkup += '               <span class="ms-hidden">Currently selected</span>'; }
                quickLaunchMarkup += '           </span>' +
                                        '       </a>' +
                                        '   </li>';
            });

            quickLaunchMarkup += '</ul>';

            $('div.ms-core-listMenu-verticalBox').append(quickLaunchMarkup);
        });
    }



    $.fn.GetFieldsFromAllRows = function (options) {
    
        var returnValue = [];

        var opt = $.extend({}, {
            listName: "SWFList",
            webURL: "https://bmos.sharepoint.com" + _spPageContextInfo.webServerRelativeUrl,
            completefunc: null
        }, options);

        // if listname is component log or component group log and no webURL was supplied
        if ((opt.listName == 'ComponentLog' || opt.listName == 'Component Group Log') && typeof (options.webURL) == 'undefined') {
            // assume HubProd
            opt.webURL = 'https://bmos.sharepoint.com/sites/hubprod';
        }

        var query = "<Query>" +
                    "   <OrderBy>" +
                    "       <FieldRef Name='" + opt.order.field + "' Ascending='" + opt.order.ascending + "'></FieldRef>" +
                    "   </OrderBy>" +
                    "</Query>";

        var fields = "<ViewFields>";
        $.each(opt.select, function (i, oneField) {
            fields += " <FieldRef Name='" + oneField.nameInList + "' />"
        });
        fields += "</ViewFields>";

        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: opt.webURL,
            listName: opt.listName,
            CAMLViewFields: fields,
            CAMLQuery: query,
            CAMLQueryOptions: "<QueryOptions><ExpandUserField>TRUE</ExpandUserField></QueryOptions>",
            completefunc: function (xData, Status) {
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    var zRow = $(this);
                    var returnRow = {};

                    $.each(opt.select, function (i, oneField) {

                        if (oneField.nameHere == "formData") {

                            var value = $(zRow).attr("ows_" + oneField.nameInList);

                            var regexOne = new RegExp("\r", "g");
                            var regexTwo = new RegExp("\n", "g");
                            value = value.replace(regexOne, "'");
                            value = value.replace(regexTwo, "'");

                            eval("var formDataObj=" + value);

                            returnRow[oneField.nameHere] = formDataObj;

                        } else {

                            value = $(zRow).attr("ows_" + oneField.nameInList);

                            if (typeof (oneField.linkField) != "undefined") {
                                if (oneField.linkField == 1) {
                                    value = value.split(",")[0];
                                }
                            }

                            returnRow[oneField.nameHere] = value;
                        }

                    });

                    returnValue.push(returnRow);
                });
            }
        });

        return returnValue;
    }



    $.fn.GetFieldsFromOneRow = function (options) {

        var returnValue = {};

        // assume we're going to query this site's SWFList if a specific list wasn't supplied
        var opt = $.extend({}, {
            listName: "SWFList",
            webURL: "https://bmos.sharepoint.com" + _spPageContextInfo.webServerRelativeUrl,
            completefunc: null
        }, options);

        // if listname is component log or component group log and no webURL was supplied
        if ((opt.listName == 'ComponentLog' || opt.listName == 'Component Group Log') && typeof (options.webURL) == 'undefined') {
            // assume HubProd
            opt.webURL = 'https://bmos.sharepoint.com/sites/hubprod';
        }

        var query = "<Query>" +
                        "<Where>" +
                            "<Eq>" +
                                "<FieldRef Name='" + opt.where.field + "'></FieldRef>" +
                                "<Value Type='" + opt.where.type + "'>" + opt.where.value + "</Value>" +
                            "</Eq>" +
                        "</Where>" +
                    "</Query>";

        var fields = "<ViewFields>";
        $.each(opt.select, function (i, oneField) {
            fields += "<FieldRef Name='" + oneField.nameInList + "' />"
        });
        fields += "</ViewFields>";

        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: opt.webURL,
            listName: opt.listName,
            CAMLViewFields: fields,
            CAMLQuery: query,
            CAMLQueryOptions: "<QueryOptions><ExpandUserField>TRUE</ExpandUserField></QueryOptions>",
            completefunc: function (xData, Status) {
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    var zRow = $(this);

                    $.each(opt.select, function (i, oneField) {

                        if (oneField.nameHere == "formData" || oneField.nameHere == "defaultDataForNewRequests") {

                            var value = $(zRow).attr("ows_" + oneField.nameInList);

                            var regexOne = new RegExp("\r", "g");
                            var regexTwo = new RegExp("\n", "g");
                            value = value.replace(regexOne, "'");
                            value = value.replace(regexTwo, "'");

                            eval("var formDataObj=" + value);

                            returnValue[oneField.nameHere] = formDataObj;

                        } else {

                            value = $(zRow).attr("ows_" + oneField.nameInList);

                            if (typeof (oneField.linkField) != "undefined") {
                                if (oneField.linkField == 1) {
                                    
                                    value = ReplaceAll(",,", "DOUBLECOMMAREPLACEMENT", value);
                                    value = value.split(",")[0];
                                    value = ReplaceAll("DOUBLECOMMAREPLACEMENT", ",", value);
                                }
                            }

                            returnValue[oneField.nameHere] = value;

                        }
                    });
                });
            }
        });

        return returnValue;
    }



    $.fn.ReturnCurrentUserData = function() {

        var currentUserLookupValue = $().SPServices.SPGetCurrentUser({
            fieldNames: [
                "Name", // i:0#.f|membership|jbaker@mos.org
            ],
            debug: false
        });

        var currentUserProfileValues = {};

        $().SPServices({
            operation: "GetUserProfileByName",
            async: false,
            AccountName: currentUserLookupValue.Name,
            completefunc: function(xData, Status) {
                $(xData.responseXML).SPFilterNode("PropertyData").each(function() {
                    currentUserProfileValues[$(this).find("Name").text()] = $(this).find("Value").text();
                });
            }
        });

        // return user's data with better property names
        return {
            "account": currentUserProfileValues.AccountName,
            "name": currentUserProfileValues.PreferredName,
            "email": currentUserProfileValues.WorkEmail.toLowerCase(),
            "dept": currentUserProfileValues.Department,
            "firstName": currentUserProfileValues.FirstName,
            "lastName": currentUserProfileValues.LastName,
            "phone": currentUserProfileValues.WorkPhone,
            "userName": currentUserProfileValues.UserName.toLowerCase()
        };
    }



    $.fn.UserIsComponentGrpAdmin = function (uData, ComponentGroupID) {
        
        if (typeof(uData) == "undefined") {
            uData = $().ReturnCurrentUserData();
        }

        var componentGrpAdmins = $().GetFieldsFromOneRow({
            "listName": "Component Group Log",
            "select": [
                {
                    "nameHere": "componentGrpAdminsString",
                    "nameInList": "GroupAdminAccess"
                }
            ],
            "where": {
                "field": "ComponentGroupID",
                "type": "Number",
                "value": ComponentGroupID,
            }
        });

        // return 1 if current user's username is in group admin string; else return 0
        return (StrInStr(componentGrpAdmins.componentGrpAdminsString, uData.userName, 0) != false) ? 1 : 0;
    }



    $.fn.UserIsComponentAdmin = function (uData) {
        
        if (typeof(uData) == "undefined") {
            uData = $().ReturnCurrentUserData();
        }

        var mData = $().ReturnThisSiteSettings();

        var componentAdmins = $().GetFieldsFromOneRow({
            "listName": "ComponentLog",
            "select": [
                {
                    "nameHere": "componentAdminsString",
                    "nameInList": "AdminAccess"
                }
            ],
            "where": {
                "field": "ComponentID",
                "type": "Number",
                "value": mData.componentID,
            }
        });

        // return 1 if current user's username is in group admin string; else return 0
        return (StrInStr(componentAdmins.componentAdminsString, uData.userName, 0) != false) ? 1 : 0;
    }



    $.fn.GetParamFromUrl = function (urlParams, paramToReturn) {

        // set up var
        var param = "";
        var paramEquals = "";
        // try to split up URL params into array
        var urlParams = urlParams.substring(1).split("&");

        // if URL did contain params
        if (urlParams[0] != "") {

            // iterate over each param
            $.each(urlParams, function (i, singleParam) {

                if (StrInStr(singleParam, paramToReturn, 0) != false) {

                    // try to get param param in form "=x"
                    paramEquals = StrInStr(singleParam, paramToReturn + "=", 0);

                    if (paramEquals != false) {
                        param = paramEquals.substr(parseInt(paramToReturn.length) + 1);
                    }
                }

            });

        }

        return param;
    }



    $.fn.RenderMaintenanceMessage = function () {
        var maintenanceDiv = '<div id="maintenance-mode" class="mos-form-section overlay hidden">' +
                                '    <div class="section-content hidden">' +
                                '        <div class="message">' +
                                '            <a href="/">' +
                                '                <img src="https://bmos.sharepoint.com/sites/hubprod/Asset%20Library/logo_the-hub.png" />' +
                                '            </a>' +
                                '            <p>' +
                                '                This area is down for maintenance,' +
                                '                but please enjoy this gratuitous pic of some' +
                                '                sweet kitty action.' +
                                '            </p>' +
                                '        </div>' +
                                '    </div>' +
                                '</div>';
        $('div#all-content-container').append(maintenanceDiv);
        $('div#maintenance-mode').fadeIn(1000);
    }



    $.fn.RenderInPagePersonaSet = function(personaData) {

        var personaSet = '<div class="in-page-personas';

        if (typeof(personaData.classValues) != "undefined" && personaData.classValues != null) {
            personaSet += ' ' + personaData.classValues;
        }

        personaSet +=  '">\n';

        if (typeof(personaData.title) != "undefined" && personaData.title != null) {
            personaSet += '<' + personaData.title.tag + '>' + personaData.title.content + '</' + personaData.title.tag + '>\n';
        }

        $.each(personaData.people, function(i, accountPart) {
            personaSet += '<div class="in-page-persona">\n';

            var userProfileValues = {};
            
            $().SPServices({
                operation: "GetUserProfileByName",
                async: false,
                AccountName: "i:0#.f|membership|" + accountPart + "@mos.org",
                completefunc: function(xData, Status) {
                    $(xData.responseXML).SPFilterNode("PropertyData").each(function() {
                        userProfileValues[$(this).find("Name").text()] = $(this).find("Value").text();
                    });
                }
            });

            personaSet += '   <span class="avatar-container"><span class="avatar"';

            if (userProfileValues.PictureURL != "") {
                personaSet += ' style="background: #fff url(\'' + userProfileValues.PictureURL + '\') no-repeat center center"> \n';
            } else {
                userProfileValues.firstInitial = userProfileValues.FirstName.slice(0, 1).toUpperCase();
                userProfileValues.lastInitial = userProfileValues.LastName.slice(0, 1).toUpperCase();
                personaSet += '><span class="avatar-initials">' + userProfileValues.firstInitial + userProfileValues.lastInitial + '</span>';
            }

            personaSet +=  '</span></span> \n' +
                        '   <span class="name_title"> \n';

            if (typeof(userProfileValues.PreferredName) != 'undefined' && userProfileValues.PreferredName != '') {
                if (typeof(userProfileValues["SPS-PersonalSiteCapabilities"]) != 'undefined' && userProfileValues["SPS-PersonalSiteCapabilities"] != '') {
                    personaSet += '       <a class="profile" href="https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=' + userProfileValues["msOnline-ObjectId"] + '" target="_blank">' + userProfileValues.PreferredName + '</a> \n';
                } else {
                    personaSet += '       <span class="name">' + userProfileValues.PreferredName + '</span> \n';
                }
            }

            if (typeof(userProfileValues.Title) != 'undefined' && userProfileValues.Title != '') {
                personaSet += '       <span class="title">' + userProfileValues.Title + '</span> \n';
            }

            personaSet +=   '   </span> \n' + 
                            '</div>\n';
        });

        personaSet += '</div>';

        console.log(personaSet);

        $("div#" + personaData.destinationID).append(personaSet);
    }



    $.fn.RedirectToHomePage = function() {
        window.location = _spPageContextInfo.webServerRelativeUrl + "/SitePages/Home.aspx";
    }

})(jQuery);




function StrInStr(haystack, needle, flag) {

   var position = 0;
   haystack = haystack + '';
   needle = needle + '';
   position = haystack.indexOf(needle);

   if (position == -1) {
	  return false;
   } else {
	  if (flag == 1) {
		 // return from beginning of string to beginning of needle
		 return haystack.substr(0, position);
	  } else if (flag == 2) {
		 // return ?
		 return haystack.slice(needle.length);
      } else if (flag == 3) {
         // return from needle to end of string, needle-exclusive
         return haystack.slice(position + needle.length);
      } else {
		 // return from needle to end of string, needle-inclusive
		 return haystack.slice(position);
	  }
   }
}



function ReplaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}



function ReplaceFirst(find, replace, str) {
    return str.replace(find, replace);
}
