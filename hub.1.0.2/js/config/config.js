

$(document).ready(function() {




    // ============
    // ---- SET UP VARS
    // ============


    var mData = $().ReturnThisSiteSettings();

    if (typeof(mData.axle) != "undefined" && mData.axle == 1) {
        mData.componentGroupID = 1;
    }
        
    if (typeof(mData.community) != "undefined" && mData.community == 1) {
        mData.componentGroupID = 2;
    }

    if (typeof(mData.swf) != "undefined" && mData.swf == 1) {
        mData.componentGroupID = 3;
    }

    if (typeof(mData.visualization) != "undefined" && mData.visualization == 1) {
        mData.componentGroupID = 4;
    }

    mData = $.extend(
        $().GetFieldsFromOneRow({
            "listName": "ComponentLog",
            "select": [{
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

    var uData = $().ReturnCurrentUserData();
    uData.isAdmin = $().UserIsComponentAdmin(uData);
    uData.isComponentGrpAdmin = $().UserIsComponentGrpAdmin(uData, mData.componentGroupID);
    if (uData.isComponentGrpAdmin == 1) { uData.isAdmin = 1; }


    // ============
    // ---- BODY CLASS
    // ============

    if (typeof(mData.axle) != "undefined" && mData.axle == 1) {
        $("body").addClass("axle");
    }

    if (typeof(mData.community) != "undefined" && mData.community == 1) {
        $("body").addClass("community");
    }

    if (typeof(mData.swf) != "undefined" && mData.swf == 1) {
        $("body").addClass("structured-workflow");
    }

    if (typeof(mData.visualization) != "undefined" && mData.visualization == 1) {
        $("body").addClass("visualization");
    }



    // ============
    // ---- RIBBON
    // ============

    // reveal ribbon under the following conditions

    // ------- other conditions need to be set when this code gets applied to other component types

    // for swfs, only component group admins need the ribbon
    if (mData.swf == 1 && uData.isComponentGrpAdmin == 1) {
        $("div#s4-ribbonrow").css("display", "block");
        $("div#s4-bodyContainer ").css("padding-top", "1rem");
    }

    // for communities, show the ribbon
    if (mData.community == 1) {
        $("div#s4-ribbonrow").css("display", "block");
        $("div#s4-bodyContainer ").css("padding-top", "1rem");
    }

    // for visualizations, only component group admins need the ribbon
    if (mData.visualization == 1 && uData.isComponentGrpAdmin == 1) {
        $("div#s4-ribbonrow").css("display", "block");
        $("div#s4-bodyContainer ").css("padding-top", "1rem");
    }



    // ============
    // ---- ADOPTION AD
    // ============

    // enable sliding on adoption ads
    $("div#adoption-1 p#apps_lead-in").click(function() {
        $("#apps-list").slideToggle("slow");
    });



    // ============
    // ---- NAVIGATION
    // ============

    mData.globalNavigationList = $().ReturnGlobalNavigationList();

    // set global nav
    $('div.ms-breadcrumb-top').html(mData.globalNavigationList);

    // for swfs, modify site icon link
    if (mData.swf == 1) {
        $('div#siteIcon a').attr("href", "/");
    }

    // get component ID
    mData = $().ReturnThisSiteSettings();

    // look up local nav (quicklaunch)
    mData = $.extend(
        $().GetFieldsFromOneRow({
            "listName": "ComponentLog",
            "select": [{
                "nameHere": "quickLaunches",
                "nameInList": "QuickLaunches"
            }],
            "where": {
                "field": "ComponentID",
                "type": "Number",
                "value": mData.componentID,
            }
        }),
        mData
    );

    // set local nav (quicklaunch)
    if (typeof(mData.quickLaunches) != 'undefined' && mData.quickLaunches != '') {

        // parse quickLaunches string into array
        mData.quickLaunches = JSON.parse(mData.quickLaunches);

        // for each array element (each quickLaunch), get its data, build its markup, and append it
        $.each(mData.quickLaunches, function(i, q) {
            $().GetQuickLaunchDataAndBuildMarkupAndAppend(q);
        });

    }



    // ============
    // ---- COLLAPSIBLE
    // ============

    $('.collapsible').collapsible();



    // ============
    // ---- FADE IN PAGE, ELIMINATE BACKGROUND ANIMATION
    // ============

    $("div#s4-bodyContainer").fadeTo(1000, 1);
    setTimeout(function() {
        $("div#s4-workspace").css("background", "none");
    }, 1500);

});
