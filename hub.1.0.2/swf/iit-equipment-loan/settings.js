(function ($) {

    var thisSiteSettings = {
        'componentID': 80,
        "swf": 1,
        "swfAPIKey": "prod",
        // "swfAPIKey": "dev",
        // "swfAPIKey": "devMedium",
        // "swfAPIKey": "devLong",
        "currentRequestVersion": 1,
        "devFiles": 0,
        "devAdminNotifications": 0,
        "notifications": 1    };

    $.fn.ReturnThisSiteSettings = function () {
        return thisSiteSettings;
    }

})(jQuery);