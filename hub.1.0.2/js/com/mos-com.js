(function($) {


    $.fn.InitializeSitePage = function(mData, pData, customScriptFirst, customScriptLast) {



        console.log('using mos-com.js m1');

        // ========================================================
        // SET UP VARS
        // ========================================================

        mData = $.extend(
            $().GetFieldsFromOneRow({
                "listName": "ComponentLog",
                "select": [{
                    "nameHere": "title",
                    "nameInList": "Title",
                }],
                "where": {
                    "field": "ComponentID",
                    "type": "Number",
                    "value": mData.componentID,
                }
            }),
            mData
        );



        // ========================================================
        // BUILD PAGE MARKUP & PARTIAL SCRIPT
        // ========================================================



        var pageMarkup = '';

        var pageScript = '';

        $.each(pData.sections, function(i,section) {

            pageMarkup += $().BuildPageSectionBeginning(section.htmlID, section.htmlClass);

            $.each(section.elements, function(i, element) {

                switch (element.type) {
                    
                    case "yammerFeed":
                        pageMarkup += $().BuildYammerFeed(element);
                        pageScript += $().BuildPageScript(element);
                        break;
                }
            });

            pageMarkup += $().BuildPageSectionEnd();
        });



        // ========================================================
        // INSERT PAGE MARKUP, CLASS NAME, & SCRIPT
        // ========================================================



        // insert base markup into container
        $("div#main-content-container").append(pageMarkup);

        // add a class to container to serve as styling hook
        $("div#main-content-container").addClass(ReplaceAll("\\.", "", ReplaceAll(" ", "-", mData.title)).toLowerCase());
        
        // concatenate built and stored scripts and append inside script#mos-form-script
        $("script#page-script").append('$( document ).ready(function() { \n\n' + customScriptFirst + '\n\n' + pageScript + '\n\n' + customScriptLast + '\n\n}); \n');




        // $("div#mos-form").fadeTo(1000, 1);
    };







    $.fn.BuildPageSectionBeginning = function(htmlID, htmlClas) {

        return '<div id="' + htmlID + '" class="page-section ' + htmlClas + '">';
    }



    $.fn.BuildPageSectionEnd = function() {

        return '</div>';
    }



    $.fn.BuildYammerFeed = function(element) {

         return '<section id="yammer-feed"></section>';
    }



    $.fn.BuildPageScript = function(element) {
        
        var stmtsToAdd = '';

        if (element.type == "yammerFeed") {

            stmtsToAdd +=   "yam.connect.embedFeed({ \n" +
                            "    'container': '#yammer-feed', \n" +
                            "    'network': '" + element.network + "', \n" +
                            "    'feedType': 'group', \n" +
                            "    'feedId': '" + element.feedID + "', \n" +
                            "    'config': { \n" +
                            "        'use_sso': true, \n" +
                            "        'header': false, \n" +
                            "        'footer': false, \n" +
                            "        'showOpenGraphPreview': false, \n" +
                            "        'defaultToCanonical': false, \n" +
                            "        'hideNetworkName': true, \n" +
                            "        'promptText': 'Say something...' \n" +
                            "    } \n" +
                            "}); \n";
        }

        return stmtsToAdd;

    }



})(jQuery);