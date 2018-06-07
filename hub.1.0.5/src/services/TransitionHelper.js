
/* eslint-disable */

(function ($) {
	
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

			personaSet += '	<span class="avatar-container"><span class="avatar"';
			if (userProfileValues.PictureURL != "") {
				personaSet += ' style="background: #fff url(\'' + userProfileValues.PictureURL + '\') no-repeat center center;background-size: cover"> \n';
			} else {
				userProfileValues.firstInitial = userProfileValues.FirstName.slice(0, 1).toUpperCase();
				userProfileValues.lastInitial = userProfileValues.LastName.slice(0, 1).toUpperCase();
				personaSet += '><span class="avatar-initials">' + userProfileValues.firstInitial + userProfileValues.lastInitial + '</span>';
			}

			personaSet +=  '</span></span> \n' +
						'	<span class="name_title"> \n';
			if (typeof(userProfileValues.PreferredName) != 'undefined' && userProfileValues.PreferredName != '') {
				if (typeof(userProfileValues["SPS-PersonalSiteCapabilities"]) != 'undefined' && userProfileValues["SPS-PersonalSiteCapabilities"] != '') {
					personaSet += '		<a class="profile" href="https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=' + userProfileValues["msOnline-ObjectId"] + '" target="_blank">' + userProfileValues.PreferredName + '</a> \n';
				} else {
					personaSet += '		<span class="name">' + userProfileValues.PreferredName + '</span> \n';
				}
			}

			if (typeof(userProfileValues.Title) != 'undefined' && userProfileValues.Title != '') {
				personaSet += '		<span class="title">' + userProfileValues.Title + '</span> \n';
			}

			personaSet +=	'	</span> \n' + 
							'</div>\n';
		});

		personaSet += '</div>';

		$("div#" + personaData.destinationID).append(personaSet);
	};


	$.fn.ReturnCurrentUserData = function () {

		var currentUserLookupValue = $().SPServices.SPGetCurrentUser({
			fieldNames: [
				"Name", // i:0#.f|membership|jbaker@mos.org
			],
			debug: false
		});
		return $().ReturnUserDataUsingAccountName(currentUserLookupValue.Name);
	};




	$.fn.ReturnUserDataUsingAccountName = function (accountName) {
		var userData = {};

		$().SPServices({
			operation: "GetUserProfileByName",
			async: false,
			AccountName: accountName,
			completefunc: function (xData, Status) {
				$(xData.responseXML).SPFilterNode("PropertyData").each(function () {
					userData[$(this).find("Name").text()] = $(this).find("Value").text();
				});
			}
		});

		// return user's data with better property names
		return {
			"account": userData.AccountName,
			"name": userData.PreferredName,
			"email": userData.WorkEmail.toLowerCase(),
			"dept": userData.Department,
			"firstName": userData.FirstName,
			"lastName": userData.LastName,
			"phone": userData.WorkPhone,
			"userName": userData.UserName.toLowerCase(),
			"pictureURL": userData.PictureURL
		};
	};
	
	$(document).ready(function () {
		console.log('using transition-helper m2');
		$("img.ms-siteicon-img").attr("src", "/sites/hubprod/Asset%20Library/BrandHorizontalOpt.svg");
		$("div.ms-breadcrumb-top").remove();
		$("div#loading-screen").fadeOut(750).addClass("hidden");
		$("div#s4-bodyContainer").fadeTo(750, 1);
		var uData = $().ReturnCurrentUserData();
		if (uData.userName == 'jbaker@mos.org') {
			$("div#s4-ribbonrow").css("display", "block");
			$("div#s4-bodyContainer ").css("padding-top", "1rem");
		}
	});

})(jQuery);
