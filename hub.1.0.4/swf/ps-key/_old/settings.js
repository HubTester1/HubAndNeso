(function ($) {

    var thisSiteSettings = {
        'componentID': 126,
        'devModeCode': 0,
        'devModeAdminNotifications': 0,
        'notifications': 1
    };

    $.fn.ReturnThisSiteSettings = function () {
        return thisSiteSettings;
    }

})(jQuery);