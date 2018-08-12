$(document).ready(function () {

    console.log('using N3');


    // site search page styling

    // small screen styles

    // centralize as much as possible

    // cross-browser testing

    // fake hub generation and styles

    // swf styles





    // deferred

        // kb styles

        // search site collection styles




    // --- RETRIEVE SITE DATA

    // get component ID
    mData = $().ReturnThisSiteSettings();

    // use component ID to look up quicklaunches
    mData = $.extend(
        $().GetFieldsFromOneRow({
            "listName": "ComponentLog",
            "select": [
                {
                    "nameHere": "siteTitle",
                    "nameInList": "Title"
                }, {
                    "nameHere": "url",
                    "nameInList": "URIRoot"
                }, {
                    "nameHere": "navLocal",
                    "nameInList": "z4ti"
                }
            ],
            "where": {
                "field": "ComponentID",
                "type": "Number",
                "value": mData.componentID,
            }
        }),
        mData
    );



    // --- SET CLASS NAME ON BODY TAG

    $('body').addClass(ReplaceAll(' ', '-', mData.siteTitle).toLowerCase());



    // --- BUILD & APPEND HEADERS

    var smScreenHeaderBaseMarkup = '    <nav id="navigation_small-screen" role="navigation">' +
                                    '        <div id="navigation-header_small-screen">' +
                                    '            <button type="button" id="apps-navigation-toggle">' +
                                    '                <span class="sr-only">Toggle apps navigation</span>' +
                                    '                <span class="icon-square-dot-row">' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                </span>' +
                                    '                <span class="icon-square-dot-row">' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                </span>' +
                                    '                <span class="icon-square-dot-row">' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                    <span class="icon-square-dot"></span>' +
                                    '                </span>' +
                                    '            </button>' +
                                    '            <div id="small-screen-brand"></div>' +
                                    '            <button type="button" id="primary-navigation-toggle">' +
                                    '                <span class="sr-only">Toggle primary navigation</span>' +
                                    '                <span class="icon-bar"></span>' +
                                    '                <span class="icon-bar"></span>' +
                                    '                <span class="icon-bar"></span>' +
                                    '            </button>' +
                                    '        </div> <!-- /#navigation-header_small-screen -->' +
                                    '        <div id="container_apps-navigation">' +
                                    '        </div><!-- /#apps-navigation -->' +
                                    '        <div id="container_primary-navigation">' +
                                    '            <div id="container_global-navigation"></div>' +
                                    '            <div id="container_local-navigation_search">' +
                                    '                <div id="container_local-navigation"></div>' +
                                    '            </div>' +
                                    '        </div><!-- /#primary-navigation -->' +
                                    '    </nav>';

    var containerSearchSmallScreen = $('div#container_search_small-screen').clone();
    var containerSearchLargeScreen = $('div#container_search_large-screen').clone();

    $('div#container_search_small-screen').remove();
    $('div#container_search_large-screen').remove();

    $('header#small-screen-header').append(smScreenHeaderBaseMarkup);

    $('header#small-screen-header div#container_local-navigation_search').append(containerSearchSmallScreen);
    $('header#large-screen-header div#container_brand_local-navigation_search').append(containerSearchLargeScreen);



    // --- BUILD & APPEND NAVS

    // build and append global nav
    $().BuildAndAppendNav('NavGlobal', 'Global Navigation', 'header#small-screen-header div#container_global-navigation');
    $().BuildAndAppendNav('NavGlobal', 'Global Navigation', 'header#large-screen-header div#container_global-navigation');

    // build and append apps nav
    $().BuildAndAppendNav('NavApps', 'Apps Navigation', 'header#small-screen-header div#container_apps-navigation');

    // build and append local nav(s), as needed
    if (typeof (mData.navLocal) != 'undefined' && mData.navLocal != '') {
        
        // parse navLocal string into array
        mData.navLocal = JSON.parse(mData.navLocal);

        // for each array element (each quickLaunch), build and append the corresponding markup
        $.each(mData.navLocal, function (i, q) {
            $().BuildAndAppendNav(q, 'Local Navigation', 'header#small-screen-header div#container_local-navigation');
            $().BuildAndAppendNav(q, 'Local Navigation', '', 1);
        });
    }



    // --- BUILD & APPEND ASIDE

    var asideBaseMarkup = '<div id="container_brand_museum"></div>' +
                            '<div id="container_adoption-ad"></div>';

    $('aside').append(asideBaseMarkup);

    var adBankObject = {
        'oneDriveAd':   '<div id="onedrive-ad" class="adoption-ad">' +
                        '    <h2><span>A terabyte </span><span>just for you</span></h2>' +
                        '    <p><span>OneDrive Cloud Storage</span><span>@ Museum of Science</span></p>' +
                        '    <ul id="calls-to-action">' +
                        '        <li id="use-now"><a href="https://bmos-my.sharepoint.com/" target="_blank">Use it now</a></li>' +
                        '        <li id="sync"><a href="mailto:jbaker@mos.org?subject=OneDrive sync assistance">Sync it</a></li>' +
                        '        <li id="help"><a href="mailto:jbaker@mos.org?subject=OneDrive assistance">Get help</a></li>' +
                        '    </ul>' +
                        '</div>',
        //'adTwo':        '<div class="adoption-ad">' +
        //                '    <h2>Ad Two</h2>' +
        //                '</div>',
        //'adThree':      '<div class="adoption-ad">' +
        //                '    <h2>Ad Three</h2>' +
        //                '</div>',
        //'adFour':       '<div class="adoption-ad">' +
        //                '    <h2>Ad Four</h2>' +
        //                '</div>'
    };


    var AdBankArray = $.map(adBankObject, function (value, key) { return value; });
    $('div#container_adoption-ad').append(AdBankArray[Math.floor(Math.random() * AdBankArray.length)]);





    // --- SET BRAND IMG, TEXT, & URL
    
    if (mData.componentID < 1000) {
        mData.siteTitle = 'The Hub';
        mData.url = '/';
    }

    $('div#large-screen-brand').html('<a id="link_large-screen-brand" href="' + StrInStr(mData.url, ',', 1) + '"><span id="logo_large-screen-brand"><img src="/sites/hubdev/DevImages/logo_sp_reverse.svg" alt="" /></span><span id="text_large-screen-brand">' + mData.siteTitle + '</span></a>');
    $('div#small-screen-brand').html('<a id="link_small-screen-brand" href="' + StrInStr(mData.url, ',', 1) + '"><span id="logo_small-screen-brand"><img src="/sites/hubdev/DevImages/logo_sp_reverse.svg" alt="" /></span><span id="text_small-screen-brand">' + mData.siteTitle + '</span></a>');









    // if ($("#community-homepage").length) {

    //     var siteNeedle = swfLocation.toString().split('/')[4];
    //     var appendAd = 0;
    //     $.each(homepagesWithOneDriveAds, function (i, o) {
    //         if (o == siteNeedle) { appendAd = 1; }
    //     });
    //     if (appendAd == 1) {
    //         $("#community-homepage").append(oneDriveAd);
    //     }

    // }










});



(function ($) {

    // ---- GLOBAL VARS

    var globalUData = {};


    // ---- XYZ XYZ

    $.fn.BuildAndAppendNav = function (navList, navTitle, appendTo, prependAndAppendToQuickLaunch) {

        // get a data promise for links (list items) that current user has permission to read
        var menuItemsPromise = $().SPServices.SPGetListItemsJson({
            webURL: '/sites/hubprod/',
            listName: navList,
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
        $.when(menuItemsPromise).done(function () {

            // start zero-length markup strings
            var navMarkup = '';

            // for each link "datum"
            $.each(this.data, function (i, d) {

                // compare properly-encoded tokens to determine if this link is to the current page

                var pagePath = ReplaceAll(' ', '%20', location.pathname);

                if (typeof (d.URL) != 'undefined') {
                    d.URL.Url = ReplaceAll(' ', '%20', d.URL.Url);
                    var URLIsCurrentPage = 0;
                    if (StrInStr(d.URL.Url, location.pathname) != false) { URLIsCurrentPage = 1; }
                }

                // build the markup for this link, making additional allowances if the link is to the current page
                if (typeof (d.URL) != 'undefined') {

                    navMarkup += '   <li id="' + ReplaceAll("&", "and", ReplaceAll("'", "", ReplaceAll(" ", "-", d.URL.Description))).toLowerCase() + '"';
                    if (URLIsCurrentPage == 1) { navMarkup += ' class="selected"'; }
                    navMarkup +=    '>' +
                                    '       <a';
                    if (URLIsCurrentPage == 1) { navMarkup += ' class="selected"'; }
                    navMarkup +=    ' title="' + d.URL.Description + '" href="' + d.URL.Url + '">' +
                                        d.URL.Description;
                    if (URLIsCurrentPage == 1) { navMarkup += '               <span class="ms-hidden">Currently selected</span>'; }
                    navMarkup +=    '       </a>' +
                                    '   </li>';
                }


            });

            // if there are menu items, wrap them and append them
            if (navMarkup.length > 0) {

                if (appendTo != '') {
                    $(appendTo).append( '<h2 id="header_' + ReplaceAll(" ", "-", navTitle).toLowerCase() + '">' + navTitle + '</h2>' +
                                        '<ul id="' + ReplaceAll(" ", "-", navTitle).toLowerCase() + '">' +
                                            navMarkup +
                                        '</ul>');
                } else if (prependAndAppendToQuickLaunch == 1) {
                    $('div#sideNavBox').prepend('<h2 id="header_' + ReplaceAll(" ", "-", navTitle).toLowerCase() + '">' + navTitle + '</h2>');
                    $('div[class="ms-core-sideNavBox-removeLeftMargin"]:not(.ms-quicklaunchouter) div.ms-core-listMenu-verticalBox').append('<ul id="' + ReplaceAll(" ", "-", navTitle).toLowerCase() + '">' +
                                                                        navMarkup +
                                                                    '</ul>');
                }

            }

        });

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

                        if (oneField.nameHere == "formData") {

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
                                    value = value.split(",")[0];
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


    $.fn.ReturnCurrentUserData = function () {

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
            completefunc: function (xData, Status) {
                $(xData.responseXML).SPFilterNode("PropertyData").each(function () {
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





})(jQuery);



function StrInStr(haystack, needle, bool) {

    var pos = 0;
    haystack += '';
    pos = haystack.toLowerCase()
    .indexOf((needle + '')
    .toLowerCase());

    if (pos == -1) {
        return false;
    } else {
        if (bool == 1) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}



function ReplaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}


