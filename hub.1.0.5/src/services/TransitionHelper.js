
/* eslint-disable */

(function ($) {

	// data for the current user
	var uData = {};

	// metadata for all of The Hub and for all of this app
	var mData = {};
	
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

	$.fn.SetCurrentUserData = function () {

		var currentUserLookupValue = $().SPServices.SPGetCurrentUser({
			fieldNames: [
				"Name", // i:0#.f|membership|jbaker@mos.org
			],
			debug: false
		});
		uData = $().ReturnUserDataUsingAccountName(currentUserLookupValue.Name);
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

	$.fn.GetAndSetMaintenanceModeData = function () {

		// console.log("--- getting new MM data");

		// --- set up internal promise to configure

		var deferred = $.Deferred();

		// console.log("gonna get the data");

		$.ajax({
			async: false,
			method: "GET",
			dataType: "json",
			url: "https://bmos.sharepoint.com/sites/hubprod/Code5/mos.1.0.5.MaintenanceMode.js?ts=" + Date.now(),
		})
			.done(function (hubData) {
				// console.log("maintenance mode: hubData:");
				// console.log(hubData);

				$.ajax({
					async: false,
					method: "GET",
					dataType: "json",
					url: "https://neso.mos.org/health/check?ts=" + Date.now(),
				})
					.done(function (nesoData) {

						// console.log("maintenance mode: nesoData:");
						// console.log(nesoData);

						// flag for Neso health
						// if neso didn't have a problem returning the info
						if (nesoData.error === false) {
							// extract the info for syntactic convenience
							var nesoHealthDoc = nesoData.docs[0];
							// if the info indicates that Neso is healthy
							if (nesoHealthDoc.healthy === true) {
								mData.nesoIsHealthy = true;
								// if the info indicates that Neso is NOT healthy
							} else {
								mData.nesoIsHealthy = false;
							}
							// if neso had a problem returning the info
						} else {
							mData.nesoIsHealthy = false;
						}

						// flag for all Hub components in maintenance mode
						mData.allComponentsInMaintenanceMode = hubData.allComponentsInMaintenanceMode;

						// flag for Hub Central in maintenance mode
						mData.hubCentralInMaintenanceMode = hubData.hubCentralInMaintenanceMode;

						// flag for all SWFs in maintenance mode
						mData.allSWFsInMaintenanceMode = hubData.allSWFsInMaintenanceMode;

						// flag for specific component site tokens when only they are in maintenance mode;
						//		note that Hub Central cannot be set here
						mData.componentsInMaintenanceMode = hubData.componentsInMaintenanceMode;

						mData.maintenanceModeForThisUserExpirationTimestamp = Date.now() + mData.maintenanceModeCacheLifespan;

						deferred.resolve();
						return deferred.promise();

					})
					.fail(function (error) {
						// console.log("no such luck");
						// console.log(error);

						deferred.resolve();
						return deferred.promise();
					});
			})
			.fail(function (error) {
				// console.log("no such luck - HUB");
				// console.log(error);

				deferred.resolve();
				return deferred.promise();
			});
	};

	$(document).ready(function () {
		console.log('using transition-helper m1');

		// set a container for all data retrieval / setting promises
		var allDataRetrievalAndSettingPromises = [];

		// push to container all data retrieval / setting promises; there's only one now, 
		//		but we're set up to add more without re-writing in the future
		allDataRetrievalAndSettingPromises.push($().GetAndSetMaintenanceModeData(), $().SetCurrentUserData());

		// wait for all data retrieval / setting promises to complete (pass or fail) 
		$.when.apply($, allDataRetrievalAndSettingPromises).always(function () {
			// if Hub Central is in maintenance mode
			// if (uData.userName == 'jbaker@mos.org') {
			if (mData.hubCentralInMaintenanceMode || mData.allComponentsInMaintenanceMode) {
				$('body').addClass('is-in-maintenance-mode');
				$('div#overlays-screen-container').fadeIn(750).removeClass("hidden");
				$('div#maintenance-mode').fadeIn(750).removeClass("hidden");
			} else {
				$("img.ms-siteicon-img").attr("src", "/sites/hubprod/Asset%20Library/BrandHorizontalOpt.svg");
				$("div.ms-breadcrumb-top").remove();
				if (uData.userName == 'jbaker@mos.org') {
					$("div#s4-ribbonrow").css("display", "block");
					$("div#s4-bodyContainer ").css("padding-top", "1rem");
				}
				$("div#loading-screen").fadeOut(750).addClass("hidden");
				$("div#s4-bodyContainer").fadeTo(750, 1);
				if (uData.userName == 'jbaker@mos.org') {
					$("div#s4-ribbonrow").css("display", "block");
					$("div#s4-bodyContainer ").css("padding-top", "1rem");
				}
			}
		});
	});

})(jQuery);
