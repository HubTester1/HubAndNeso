$(document).ready(() => {
	$('div#adoption-1 p#apps_lead-in').click(() => {
        $("#apps-list").slideToggle("slow");
    });

	// config global nav
	let globalNavigationList = 
		'<ul role="navigation" id="mos_global-navigation">' +
			'<li><a href="https://bmos.sharepoint.com/">The Hub</a></li>' +
			'<li><a href="https://bmos.sharepoint.com/SitePages/Communities.aspx">Communities</a></li>' +
		'</ul>';

	// config adoption ads
	let homepagesWithOneDriveAds = [
		'model2',
	];


	let oneDriveAd = '<div class="adoption-ad onedrive">' +
                        ' This is the ad.' +
                        '</div>';

	//        <div id="adoption-zone">
	//   <div class="adoption vertical" id="adoption-1">
	//      <p>A terabyte to call your own � and access anywhere.</p>
	//      <ul id="calls-to-action">
	//         <li id="use">
	//            <a href="https://bmos-my.sharepoint.com/" target="_blank">Use your OneDrive now</a></li>
	//         <li id="apps">
	//            <p id="apps_lead-in">For your device</p>
	//            <ul id="apps-list">
	//               <li> 
	//                  <a href="http://support.microsoft.com/kb/2903984" target="_blank">Windows 7+</a></li>
	//               <li> 
	//                  <a href="http://go.microsoft.com/fwlink/?LinkId=397417" target="_blank">Android</a></li>
	//               <li> 
	//                  <a href="http://go.microsoft.com/fwlink/?LinkID=394714" target="_blank">iOS</a></li>
	//               <li> 
	//                  <a href="http://apps.microsoft.com/windows/en-us/app/skydrive-pro/d78bf57e-27fe-403e-b49b-701dedfdbf9e" target="_blank">Windows tablet</a></li>
	//               <li>Windows Phone � already built into Office Mobile</li>
	//               <li>Mac OS X - Coming later in 2014</li>
	//            </ul>
	//         </li>
	//         <li id="help">
	//            <a href="mailto:jbaker@mos.org">Get help</a></li>
	//      </ul>
	//   </div>
	// </div>


	// ----- nothing below should need to be configured for a change to existing navigational structures


	// set global nav
	$('div.ms-breadcrumb-top').remove();

	// set logo
	document.querySelector('div#siteIcon a img')
		.setAttribute('src', '/sites/hubprod/Asset%20Library/BrandHorizontal.svg');

	// get component ID
	mData = $().ReturnThisSiteSettings();

	console.log('$().ReturnThisSiteSettings()');
	console.log(mData);


	// use component ID to look up quicklaunches
	mData = $.extend(
		$().GetFieldsFromOneRow({
			listName: 'ComponentLog',
			'select': [
				{
					'nameHere': 'quickLaunches',
					nameInList: 'QuickLaunches',
				},
			],
			where: {
				field: 'ComponentID',
				type: 'Number',
				'value': mData.componentID,
			},
		}),
		mData,
	);

	if (typeof (mData.quickLaunches) !== 'undefined' && mData.quickLaunches != '') {
	    // parse quickLaunches string into array
	    mData.quickLaunches = JSON.parse(mData.quickLaunches);

	    // for each array element (each quickLaunch), get its data, build its markup, and append it
	    $.each(mData.quickLaunches, (i, q) => {
	        $().GetQuickLaunchDataAndBuildMarkupAndAppend(q);
	    });
	}

	if ($('#community-homepage').length) {
	    let siteNeedle = swfLocation.toString().split('/')[4];
	    let appendAd = 0;
	    $.each(homepagesWithOneDriveAds, (i, o) => {
	        if (o == siteNeedle) { appendAd = 1; }
	    });
	    if (appendAd == 1) {
	        $('#community-homepage').append(oneDriveAd);
	    }
	}
});


(function ($) {
	$.fn.GetQuickLaunchDataAndBuildMarkupAndAppend = function (quickLaunchList) {
		// get a data promise for links (list items) that current user has permission to read
		const quickLaunchItemsPromise = $().SPServices.SPGetListItemsJson({
			webURL: '/sites/hubprod/',
			listName: quickLaunchList,
			// viewName: '',
			CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0" Ascending="TRUE"/></OrderBy></Query>',
			// CAMLViewFields: '',
			// CAMLRowLimit: '',
			// CAMLQueryOptions: '',
			// changeToken: '',
			// contains: '',
			mapping: null,
			mappingOverrides: null,
			debug: false,
		});

		// when data promise is fulfilled
		$.when(quickLaunchItemsPromise).done(function () {
			// start the markup string
			let quickLaunchMarkup = '<ul class="root ms-core-listMenu-root static">';

			// for each link "datum"
			$.each(this.data, (i, d) => {
				// compare properly-encoded tokens to determine if this link is to the current page
				d.URL.Url = ReplaceAll(' ', '%20', d.URL.Url);
				let pagePath = ReplaceAll(' ', '%20', location.pathname);
				let thisIsCurrentPage = 0;
				StrInStr(d.URL.Url, location.pathname) != false ? thisIsCurrentPage = 1 : thisIsCurrentPage = 0;

				// build the markup for this link, making additional allowances if the link is to the current page
				quickLaunchMarkup += '   <li class="static';
				if (thisIsCurrentPage == 1) { quickLaunchMarkup += ' selected'; }
				quickLaunchMarkup += '">' +
                                        '       <a class="static ';
				if (thisIsCurrentPage == 1) { quickLaunchMarkup += ' selected ms-core-listMenu-selected '; }
				quickLaunchMarkup += `menu-item ms-core-listMenu-item ms-displayInline ms-navedit-linkNode" title="${  d.URL.Description  }" href="${  d.URL.Url  }">` +
                                        `           <span class="additional-background ms-navedit-flyoutArrow">` +
                                        `               <span class="menu-item-text">${  d.URL.Description  }</span>`;
				if (thisIsCurrentPage == 1) { quickLaunchMarkup += '               <span class="ms-hidden">Currently selected</span>'; }
				quickLaunchMarkup += '           </span>' +
                                        '       </a>' +
                                        '   </li>';
			});

			quickLaunchMarkup += '</ul>';

			$('div.ms-core-listMenu-verticalBox').append(quickLaunchMarkup);
		});
	};


	$.fn.GetFieldsFromOneRow = function (options) {
		const returnValue = {};

		// assume we're going to query this site's SWFList if a specific list wasn't supplied
		const opt = $.extend({}, {
			listName: 'SWFList',
			webURL: `https://bmos.sharepoint.com${  _spPageContextInfo.webServerRelativeUrl}`,
			completefunc: null,
		}, options);

		// if listname is component log or component group log and no webURL was supplied
		if ((opt.listName == 'ComponentLog' || opt.listName == 'Component Group Log') && typeof (options.webURL) === 'undefined') {
			// assume HubProd
			opt.webURL = 'https://bmos.sharepoint.com/sites/hubprod';
		}

		const query = `${'<Query>' +
                        '<Where>' +
                            '<Eq>' +
                                "<FieldRef Name='"}${  opt.where.field  }'></FieldRef>` +
                                `<Value Type='${  opt.where.type  }'>${  opt.where.value  }</Value>` +
                            `</Eq>` +
                        `</Where>` +
                    `</Query>`;

		let fields = '<ViewFields>';
		$.each(opt.select, (i, oneField) => {
			fields += `<FieldRef Name='${  oneField.nameInList  }' />`;
		});
		fields += '</ViewFields>';

		$().SPServices({
			operation: 'GetListItems',
			async: false,
			webURL: opt.webURL,
			listName: opt.listName,
			CAMLViewFields: fields,
			CAMLQuery: query,
			CAMLQueryOptions: '<QueryOptions><ExpandUserField>TRUE</ExpandUserField></QueryOptions>',
			completefunc(xData, Status) {
				$(xData.responseXML).SPFilterNode('z:row').each(function () {
					let zRow = $(this);
					$.each(opt.select, (i, oneField) => {

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
			},
		});

		return returnValue;
	};
}(jQuery));


function StrInStr(haystack, needle, bool) {

    var pos = 0;
    haystack += '';
    pos = haystack.toLowerCase()
    .indexOf((needle + '')
    .toLowerCase());

    if (pos == -1) {
        return false;
    } 
        if (bool == 1) {
            return haystack.substr(0, pos);
        } 
            return haystack.slice(pos);
        
    
}


function ReplaceAll(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
}
