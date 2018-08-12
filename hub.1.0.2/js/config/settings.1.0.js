

(function ($) {


    // ============
    // ---- GENERAL
    // ============

    // debug info will print to console, if true
    var debug = true;

    // config global nav
    var globalNavigationList =  '<ul role="navigation" id="mos_global-navigation">' +
                                '    <li><a href="https://bmos.sharepoint.com/">The Hub</a></li>' +
                                '    <li><a href="https://bmos.sharepoint.com/SitePages/Communities.aspx">Communities</a></li>' +
                                '</ul>';

    var maintenanceMessage =    '<div id="maintenance-mode" class="mos-form-section overlay hidden">' +
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



    // ============
    // ---- SWF
    // ============

    // latest SWF API version; requests use the version of the API with which they were created
    var globalMOSSWFLatestVersion = '1.0';

    // set true or false for all SWFs in maintenance mode
    var allSWFsInMaintenanceMode = false;

    // add specific SWF site tokens here when only they are in maintenance mode
    var SWFsInMaintenance = [
        //'iit-swf-starter',
        'iit-swf-update',
        //'iit-equipment-loan',
        // 'iit-event-av',
        //'iit-firewall-change',
        //'iit-vpn-access',
        //'iit-admin-access',
        //'iit-hub-feature',
        //'iit-network-access',
        //'ps-overnight-parking',
        //'ps-garage-access',
        //'ps-garage-discount',
        //'ps-key',
        //'ps-cal',
        //'ed-archives-use',
        //'ed-incoming-loan',
        //'ed-interdepartmental-loan',
        //'mea-interpreter',
        //'mea-mc-project',
        //'mea-promo',
        //'mea-logo',
        //'mea-photo',
        //'hr-contact-change',
        //'hr-direct-deposit'
    ];



    $.fn.ReturnGlobalNavigationList = function () {
        return globalNavigationList;
    }



    $.fn.ReturnMaintenanceMessage = function () {
        return maintenanceMessage;
    }



    $.fn.ReturnGlobalMOSSWFLatestVersion = function () {
        return globalMOSSWFLatestVersion;
    }



    $.fn.ReturnMaintenanceModeAllSWFs = function () {
        var currentUserIsComponentGrpAdmin = $().UserIsComponentGrpAdmin();
        if (currentUserIsComponentGrpAdmin == 1) { allSWFsInMaintenanceMode = false; }
        return allSWFsInMaintenanceMode;
    }



    $.fn.ReturnMaintenanceModeThisSWF = function (swfLocation) {
        var siteNeedle = swfLocation.toString().split('/')[4];
        var thisSWFInMaintenanceMode = false;
        $.each(SWFsInMaintenance, function (i, maint) {
            if (maint == siteNeedle) {
                thisSWFInMaintenanceMode = true;
            }
        });
        var currentUserIsComponentGrpAdmin = $().UserIsComponentGrpAdmin(undefined, 1);
        if (currentUserIsComponentGrpAdmin == 1) { thisSWFInMaintenanceMode = false; }
        return thisSWFInMaintenanceMode;
    }

})(jQuery);
