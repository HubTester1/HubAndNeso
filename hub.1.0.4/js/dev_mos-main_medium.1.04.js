/* eslint-disable */
(function ($) {

	// data for the current user
	var uData = {};

	// metadata for all of The Hub and for all of this app
	var mData = {};

	// data for the form component of the app; agnostic as to any specific request
	var fData = {};

	// data for a specific request; i.e., will be, largely, data from a row of SWFList
	var rData = {};

	// data for the overview screen for this user
	var oData = {};

	// misc
	var globalSubmissionValuePairsArray;
	var globalSubmissionValuePairsArrayOfArrays;
	var globalLastRequestIDs = [];
	var globalErrorEmailsToSend = [];


	// ============
	// ---- SCREENS
	// ============

	$.fn.ConfigureAndShowScreenContainerAndAllScreens = function () {

		/*
			this is the main function that is called when a user lands on any page;
			master page <head> loads mos-loader; mos-loader loads mos-main; mos-main 
			contains the anonymous function that is the parent of this funciton; that
			anonymous parent function is self-invoking, so *it* is called on every
			page load, and it contains a call to this function on the document ready event

			thus, on every page load, after we receive a basic / default page from 
			SharePoint Online (i.e., document is ready), this function will be called

			the purpose of this function is to control the building / configuration of
			the screen container and every screen, via additional *asynchronous* function 
			calls, and to show the screen container and appropriate screen to the user 
			only when all (async) building / configuration has completed
		*/


		// start by inserting the app container into the SharePoint page
		$("a#mainContent").after(
			// $("html").prepend(
			'<div id="app-container">' +
			'	<div id="overlays-screen-container" class="screen-container hidden" style="display: none;"></div>' +
			'</div>'
		);

		// set a container for all screen / container configuration promises
		var allScreenAndContainerConfigurationPromises = [];

		// push to container promises to configure screens / container

		// overlays come first, because we may need one for maintenance mode, etc.
		allScreenAndContainerConfigurationPromises.push($().ConfigureOverlayScreens());

		// find out if this user should be denied further configuration due to maintenance mode
		$().TryMaintenanceModeThisComponentThisUser(initialLoad = 1);

		// if further configuration will NOT be denied due to maintenance mode
		if (mData.maintenanceModeForThisUser === 0) {

			// screen container
			allScreenAndContainerConfigurationPromises.push($().ConfigureScreenContainer());

			// swfs, as needed
			if (typeof (mData.swf) != "undefined" && mData.swf === 1 && mData.thisPageIsASWFAppPage === 1) {
				allScreenAndContainerConfigurationPromises.push($().ConfigureSWFScreens());
			}
		}

		// wait for all promises to complete (pass or fail) 
		$.when.apply($, allScreenAndContainerConfigurationPromises).always(function () {
			// move #app-container to appropriate location
			// var appContainer = $("div#app-container").detach();
			// $("a#mainContent").after(appContainer);
			// $("a#mainContent").after('<!-- app container -->');
			// appContainer = null;

			// show screen
			$().HideScreen("loading");
			$().ShowScreenContainer();
		});
	};



	$.fn.ConfigureOverlayScreens = function () {

		// --- set up internal promise to configure

		var deferred = $.Deferred();

		// --- do config

		$("div#overlays-screen-container").append(
			'<div id="mos-form-submission-confirmation" class="overlay-screen hidden" style="display: none;"> \n' +
			'	<div class="screen-content hidden"> \n' +
			'		<p>Thanks! Your information has been received.</p> \n' +
			'		<div id ="mos-form-submission-confirmation-additional-message"></div> \n' +
			'		<a data-button-type="exitAndRebuildNonRequest" class="link_exit">Exit</a> \n' +
			'	</div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="mos-form-data-errors" class="overlay-screen hidden" style="display: none;"> \n' +
			'	<div class="screen-content hidden"> \n' +
			'		  <div class="message"> \n' +
			'				<p><span class="urgent">Oops!</span> The form\'s highlighted fields contain errors. Those fields look like this:</p> \n' +
			' \n' +
			'				<div id="label-and-control_Error-Example" class="label-and-control text contains-errors hello"> \n' +
			'					 <div class="label"><label for="error-example">Field Name</label></div> \n' +
			'					 <div class="field-type-indication"> \n' +
			'						  <span id="field-type-indicator_error-example" class="field-type-indicator field-optional"> \n' +
			'								<span class="message message-optional">Optional Field</span> \n' +
			'						  </span> \n' +
			'					 </div> \n' +
			'					 <div class="control"> \n' +
			'						  <input id="error-example" aria-describedby ="field-type-indicator_error-example" type="text" /> \n' +
			'						  <div class="error-message">Error message</div> \n' +
			'					 </div> \n' +
			'				</div> \n' +
			' \n' +
			'				<p>Please dismiss this message, make changes, and re-submit.</p> \n' +
			'		  </div> \n' +
			'		  <a data-button-type="dismiss" class="overlay-dismiss-button">Dismiss</a> \n' +
			'	 </div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="last-modified-mismatch" class="overlay-screen hidden" style="display: none;"> \n' +
			'	<div class="screen-content hidden urgent"> \n' +
			'		<div class="message"> \n' +
			'			<p> \n' +
			'				<span class="urgent">Whoopsie!</span> Someone else saved changes to this form while you were working.  \n' +
			'		 		Please make a copy of any info you don\'t want to lose and then refresh  \n' +
			'		  		this page to get the other person\'s updates. \n' +
			'	 		</p> \n' +
			'		</div> \n' +
			'		<a data-button-type="dismiss" class="overlay-dismiss-button">Dismiss</a> \n' +
			'	</div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="delete-file-attachment" class="overlay-screen hidden" style="display: none;"> \n' +
			'	<div class="screen-content hidden urgent"> \n' +
			'		<div class="message"> \n' +
			'			<p> \n' +
			'				<span class="urgent">Sure?</span> Even if you don\'t save other changes, this file will be \n' +
			'				permanently deleted. \n' +
			'			</p> \n' +
			'		</div> \n' +
			'		<a data-button-type="file-deletion-confirmation" class="overlay-dismiss-button">Yes, Delete Now</a> \n' +
			'		<a data-button-type="dismiss" class="overlay-dismiss-button">No, Don\'t Delete</a> \n' +
			'	</div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="swfList-error_new-request" class="overlay-screen hidden" style="display: none;"> \n' +
			'	 <div class="screen-content hidden urgent"> \n' +
			'		  <div class="message"> \n' +
			'				<p> \n' +
			'					 <span class="urgent">Yikes!</span> We had a problem saving your information. \n' +
			'					IIT has been notified, but, after exiting, if you don\'t see this request, please try creating it once more. \n' +
			'			  </p> \n' +
			'		 </div> \n' +
			'		 <a data-button-type="exitAndRebuildNonRequest" class="link_exit">Exit</a> \n' +
			'	</div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="swfList-error_updated-request" class="overlay-screen hidden" style="display: none;"> \n' +
			'	 <div class="screen-content hidden urgent"> \n' +
			'		  <div class="message"> \n' +
			'				<p> \n' +
			'					 <span class="urgent">Yikes!</span> We had a problem saving your information. \n' +
			'					IIT has been notified, but, after exiting, please try to submit your changes once more. \n' +
			'			  </p> \n' +
			'		 </div> \n' +
			'		 <a data-button-type="exitAndRebuildNonRequest" class="link_exit">Exit</a> \n' +
			'	</div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="attachment-error" class="overlay-screen hidden" style="display: none;"> \n' +
			'	 <div class="screen-content hidden urgent"> \n' +
			'		  <div class="message"> \n' +
			'				<p> \n' +
			'					 <span class="urgent">Eek!</span> Most of your request was received, but we had \n' +
			'					a problem with one or more attachments. IIT has been notified, but do please make sure the appropriate person has your files.\n' +
			'			  </p> \n' +
			'		 </div> \n' +
			'		 <a data-button-type="exitAndRebuildNonRequest" class="link_exit">Exit</a> \n' +
			'	</div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="wait-while-working" class="overlay-screen hidden" style="display: none;"> \n' +
			'	 <div class="screen-content hidden"> \n' +
			'		  <div class="message"> \n' +
			'				<p> \n' +
			'					 Working on it \n' +
			'				</p> \n' +
			'				<div id="waiting-animation"> \n' +
			'					<div></div> \n' +
			'					<div></div> \n' +
			'					<div></div> \n' +
			'					<div></div> \n' +
			'				</div> \n' +
			'		  </div> \n' +
			'	 </div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="mos-form-no-view-permission" class="overlay-screen hidden" style="display: none;"> \n' +
			'	 <div class="screen-content hidden"> \n' +
			'		  <p><span class="urgent">Uh-oh!</span> You don\'t have permission to view this.</p> \n' +
			'		  <a data-button-type="exit" class="link_exit" href="https://bmos.sharepoint.com">Exit</a> \n' +
			'	 </div> \n' +
			'</div> \n' +
			' \n' +
			' \n' +
			'<div id="maintenance-mode" class="overlay-screen hidden" style="display: none;"> \n' +
			'	<div class="screen-content hidden"> \n' +
			'		<div class="message"> \n' +
			'			<a href="/"> \n' +
			'				<img src="https://bmos.sharepoint.com/sites/hubprod/Asset%20Library/logo_the-hub.png" /> \n' +
			'			</a> \n' +
			'			<p> \n' +
			'				This area is down for maintenance, \n' +
			'				but please enjoy this gratuitous pic of some \n' +
			'				sweet kitty action. \n' +
			'			</p> \n' +
			'		</div> \n' +
			'	</div> \n' +
			'</div>'
		);

		// --- signify confiuration completion

		deferred.resolve();
		return deferred.promise();
	};



	$.fn.ConfigureScreenContainer = function () {

		// --- set up internal promise to configure

		var deferred = $.Deferred();

		// --- body class

		if (typeof (mData.axle) != "undefined" && mData.axle === 1) {
			$("body").addClass("axle");
		}

		if (typeof (mData.community) != "undefined" && mData.community === 1) {
			$("body").addClass("community");
		}

		if (typeof (mData.swf) != "undefined" && mData.swf === 1) {
			$("body").addClass("structured-workflow");
		}

		if (typeof (mData.visualization) != "undefined" && mData.visualization === 1) {
			$("body").addClass("visualization");
		}

		// --- show ribbon

		// for swfs, only component group admins need the ribbon
		if (mData.swf === 1 && uData.isComponentGrpAdmin === 1) {
			$("div#s4-ribbonrow").css("display", "block");
			$("div#s4-bodyContainer ").css("padding-top", "1rem");
		}

		// for communities, show the ribbon
		if (mData.community === 1) {
			$("div#s4-ribbonrow").css("display", "block");
			$("div#s4-bodyContainer ").css("padding-top", "1rem");
		}

		// for visualizations, only component group admins need the ribbon
		if (mData.visualization === 1 && uData.isComponentGrpAdmin === 1) {
			$("div#s4-ribbonrow").css("display", "block");
			$("div#s4-bodyContainer ").css("padding-top", "1rem");
		}

		// --- adoption ad

		$("div#adoption-1 p#apps_lead-in").click(function () {
			$("#apps-list").slideToggle("slow");
		});

		// --- navigation

		// set global nav
		$('div.ms-breadcrumb-top').html(mData.globalNavigationList);

		// for swfs, modify site icon link
		if (mData.swf === 1) {
			$('div#siteIcon a').attr("href", "/");
		}

		// set local nav (quicklaunch)
		if (typeof (mData.quickLaunches) != 'undefined' && mData.quickLaunches != '') {

			// parse quickLaunches string into array
			mData.quickLaunches = JSON.parse(mData.quickLaunches);

			// for each array element (each quickLaunch), get its data, build its markup, and append it
			$.each(mData.quickLaunches, function (i, quickLaunch) {
				$().GetQuickLaunchDataAndBuildMarkupAndAppend(quickLaunch);
			});

		}

		// --- collapsible

		$('.collapsible').collapsible();

		// --- signify configuration completion
		deferred.resolve();
		return deferred.promise();
	};



	$.fn.ShowScreenContainer = function () {
		$("div#s4-bodyContainer").fadeTo(mData.gracefulScreenTransitionTime, 1);
	};



	$.fn.ReplacePageTitle = function (newTitle) {
		$("span#DeltaPlaceHolderPageTitleInTitleArea").html(newTitle);
		$("head title").text("The Hub - " + newTitle);
	};



	$.fn.AddBrowserHistoryEntry = function (toScreen, title, pageAndParameters) {
		history.pushState({ "toScreen": toScreen }, title, pageAndParameters);
	};



	$.fn.ReplaceBrowserHistoryEntry = function (toScreen, title, pageAndParameters) {
		history.replaceState({ "toScreen": toScreen }, title, pageAndParameters);
	};



	$.fn.ReturnNewPageTitle = function (toScreen) {

		var newTitle = "";

		switch (toScreen) {
			case "maintenance":
				newTitle = mData.requestName + " Requests are Down for Maintenance";
				break;
			case "adminRequests":
				newTitle = "Admin " + mData.requestName + " Requests";
				break;
			case "myRequests":
				newTitle = "My " + mData.requestName + " Requests";
				break;
			case "newRequest":
			case "existingRequest":
				if (mData.detailTitle) {
					mData.detailTitle.forEach(function (detailTitleObject) {
						detailTitleObject.roles.forEach(function (titleRole) {
							uData.roles.forEach(function (userRole) {
								if (userRole == titleRole) {
									newTitle = detailTitleObject.title
								}
							});
						});
					});
				} else {
					newTitle = mData.requestName + " Request";
				}
				break;
			case "overlayFormSubmissionConfirmation":
				newTitle = mData.requestName + " Request Information has been Received";
				break;
			case "gpcInitialConceptApprovalViewer":
			case "gpcSubmissionApprovalViewer":
				newTitle = mData.requestName + " Requests";
				break;
			case "adminReferrals":
				newTitle = "All Referrals";
				break;
			case "myReferrals":
				newTitle = "My Referrals";
				break;

			case "adminEventAV":
				newTitle = "Admin Event AV Requests";
				break;
			case "gseJobsHRAdmin":
				newTitle = "All GSE Jobs";
				break;
			case "gseJobsJobAdmin":
				newTitle = "My GSE Jobs";
				break;
			case "gseJobsManager":
				newTitle = "My and My Staff Members' GSE Jobs";
				break;


			case "gseSchedulesCalendarHRAdmin":
				newTitle = "All GSE Schedules";
				break;
			case "gseSchedulesCalendarJobAdmin":
				newTitle = "My GSE Schedules";
				break;
			case "gseSchedulesCalendarManager":
				newTitle = "GSE Schedules";
				break;
			case "gseSchedulesCalendarStaff":
				newTitle = "GSE Signup Opportunities";
				break;


			case "gseSchedulesListHRAdmin":
				newTitle = "All GSE Schedules";
				break;
			case "gseSchedulesListJobAdmin":
				newTitle = "My GSE Schedules";
				break;
			case "gseSchedulesListManager":
				newTitle = "GSE Schedules";
				break;
			case "gseSchedulesListStaff":
				newTitle = "GSE Signup Opportunities";
				break;


			case "gseSignupsHRAdmin":
				newTitle = "All GSE Signups";
				break;
			// case "gseSignupsJobAdmin":
			// 	newTitle = "My GSE Signups";
			// 	break;
			case "gseSignupsManager":
				newTitle = "My and My Staff Members' GSE Signups";
				break;
			case "gseSignupsStaff":
				newTitle = "My GSE Signups";
				break;
		}

		return newTitle
	};



	$.fn.UpdateBrowserHistoryAsNeeded = function (toScreen, requestID, addBrowserHistoryEntry, replaceBrowserHistoryEntry) {

		var newTitle = $().ReturnNewPageTitle(toScreen);

		switch (toScreen) {
			case "maintenance":
			case "adminRequests":
			case "myRequests":
			case "gpcInitialConceptApprovalViewer":
			case "gpcSubmissionApprovalViewer":

			case "adminEventAV":

			case "adminReferrals":
			case "myReferrals":

			case "gseJobsHRAdmin":
			case "gseJobsJobAdmin":
			case "gseJobsManager":

			case "gseSchedulesListHRAdmin":
			case "gseSchedulesListJobAdmin":
			case "gseSchedulesListManager":
			case "gseSchedulesListStaff":

			case "gseSignupsHRAdmin":
			// case "gseSignupsJobAdmin":
			case "gseSignupsManager":
			case "gseSignupsStaff":
				if (addBrowserHistoryEntry === 1) { $().AddBrowserHistoryEntry(toScreen, newTitle, "App.aspx"); }
				if (replaceBrowserHistoryEntry === 1) { $().ReplaceBrowserHistoryEntry(toScreen, newTitle, "App.aspx"); }
				break;

			case "gseSchedulesCalendarHRAdmin":
			case "gseSchedulesCalendarJobAdmin":
			case "gseSchedulesCalendarManager":
			case "gseSchedulesCalendarStaff":
				if (addBrowserHistoryEntry === 1) { $().AddBrowserHistoryEntry(toScreen, newTitle, "App.aspx?f=cal"); }
				if (replaceBrowserHistoryEntry === 1) { $().ReplaceBrowserHistoryEntry(toScreen, newTitle, "App.aspx?f=cal"); }
				break;

			case "newRequest":
				if (addBrowserHistoryEntry === 1) { $().AddBrowserHistoryEntry(toScreen, newTitle, "App.aspx?r=0"); }
				if (replaceBrowserHistoryEntry === 1) { $().ReplaceBrowserHistoryEntry(toScreen, newTitle, "App.aspx?r=0"); }
				break;
			case "existingRequest":
				if (addBrowserHistoryEntry === 1) { $().AddBrowserHistoryEntry(toScreen, newTitle, "App.aspx?r=" + requestID); }
				if (replaceBrowserHistoryEntry === 1) { $().ReplaceBrowserHistoryEntry(toScreen, newTitle, "App.aspx?r=" + requestID); }
				break;
			case "overlayFormSubmissionConfirmation":
				if (addBrowserHistoryEntry === 1) { $().AddBrowserHistoryEntry(toScreen, newTitle, "App.aspx?r=" + requestID); }
				if (replaceBrowserHistoryEntry === 1) { $().ReplaceBrowserHistoryEntry(toScreen, newTitle, "App.aspx?r=" + requestID); }
				break;
		}
	};



	$.fn.ShowScreen = function (toScreen, requestID, addBrowserHistoryEntry, replaceBrowserHistoryEntry) {

		var newTitle = $().ReturnNewPageTitle(toScreen);

		switch (toScreen) {
			case "maintenance":
				$().ReplacePageTitle(newTitle);
				$('div#overlays-screen-container').fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				$('div#maintenance-mode').fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				break;
			case "loading":
				$("div#loading-screen").fadeIn(mData.quickScreenTransitionTime).removeClass("hidden");
				break;



			case "adminRequests":
			case "myRequests":
			case "gpcInitialConceptApprovalViewer":
			case "gpcSubmissionApprovalViewer":

			case "adminEventAV":

			case "adminReferrals":
			case "myReferrals":

			case "gseJobsHRAdmin":
			case "gseJobsJobAdmin":
			case "gseJobsManager":

			case "gseSchedulesListHRAdmin":
			case "gseSchedulesListJobAdmin":
			case "gseSchedulesListManager":
			case "gseSchedulesListStaff":

			case "gseSignupsHRAdmin":
			// case "gseSignupsJobAdmin":
			case "gseSignupsManager":
			case "gseSignupsStaff":

				$().ReplacePageTitle(newTitle);
				$("div#overview-screen-container").fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				$("div#overview-screen-container table.dataTable").each(function () {
					var tableToResize = $(this).DataTable();
					tableToResize.columns.adjust().draw();
				});
				$('#s4-workspace').scrollTop(0);
				break;

			case "gseSchedulesCalendarHRAdmin":
			case "gseSchedulesCalendarJobAdmin":
			case "gseSchedulesCalendarManager":
			case "gseSchedulesCalendarStaff":
				$().ReplacePageTitle(newTitle);
				$("div#overview-screen-container").fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				$('#s4-workspace').scrollTop(0);
				break;

			case "newRequest":
				$().ReplacePageTitle(newTitle);
				$("div#request-screen-container").fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				$('#s4-workspace').scrollTop(0);
				break;
			case "existingRequest":
				$().ReplacePageTitle(newTitle);
				$('#s4-workspace').scrollTop(0);
				$("div#request-screen-container").fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				break;
			case "overlayFormSubmissionConfirmation":
				$().ReplacePageTitle(newTitle);
				$("div#overlays-screen-container").fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				$("div#mos-form-submission-confirmation").fadeIn(mData.gracefulScreenTransitionTime).removeClass("hidden");
				break;
		}
	};



	$.fn.HideScreen = function (screen) {
		switch (screen) {
			case "maintenance":
				$("div#overlays-screen-container, div#maintenance-mode").fadeOut(mData.gracefulScreenTransitionTime).addClass("hidden");
				break;
			case "overlays":
				$("div#overlay-screen:visible").fadeOut(mData.gracefulScreenTransitionTime).addClass("hidden");
				$("div#overlays-screen-container").fadeOut(mData.gracefulScreenTransitionTime).addClass("hidden");
				break;
			case "loading":
				$("div#loading-screen").fadeOut(mData.gracefulScreenTransitionTime).addClass("hidden");
				// console.log('total screen initialization time = ' + (Date.now() - loadingStartTime)/1000 + ' seconds');
				break;
			case "overview":
			case "adminRequests":
			case "myRequests":
			case "gpcInitialConceptApprovalViewer":
			case "gpcSubmissionApprovalViewer":

			case "adminEventAV":

			case "adminReferrals":
			case "myReferrals":

			case "gseJobsHRAdmin":
			case "gseJobsJobAdmin":
			case "gseJobsManager":

			case "gseSchedulesListHRAdmin":
			case "gseSchedulesListJobAdmin":
			case "gseSchedulesListManager":
			case "gseSchedulesListStaff":

			case "gseSchedulesCalendarHRAdmin":
			case "gseSchedulesCalendarJobAdmin":
			case "gseSchedulesCalendarManager":
			case "gseSchedulesCalendarStaff":

			case "gseSignupsHRAdmin":
			case "gseSignupsManager":
			case "gseSignupsStaff":
				$("div#overview-screen-container").fadeOut(mData.gracefulScreenTransitionTime).addClass("hidden");
				break;
			case "request":
			case "newRequest":
			case "existingRequest":
				$("div#request-screen-container").fadeOut(mData.gracefulScreenTransitionTime).addClass("hidden");
				break;
		}
	};



	$.fn.ConfigureScreen = function (screen, passedRequestID, rebuildOverlays) {
		switch (screen) {
			case "request":
			case "newRequest":
			case "existingRequest":
				$().ConfigureRequest(passedRequestID);
				if (rebuildOverlays == 1) {
					$().ConfigureOverlayScreens();
				}
				break;
			case "overlays":
				$().ConfigureOverlayScreens();
				break;
			case "myRequests":
				$().ConfigureOverviewScreen("my");
				break;
			case "adminRequests":
				$().ConfigureOverviewScreen("admin");
				break;
			case "gpcInitialConceptApprovalViewer":
				$().ConfigureOverviewScreen("gpcInitialConceptApprovalViewer");
				break;
			case "gpcSubmissionApprovalViewer":
				$().ConfigureOverviewScreen("gpcSubmissionApprovalViewer");
				break;


			case "adminEventAV":
				$().ConfigureOverviewScreen("adminEventAV");
				break;

			case "adminReferrals":
				$().ConfigureOverviewScreen("adminReferrals");
				break;
			case "myReferrals":
				$().ConfigureOverviewScreen("myReferrals");
				break;


			case "gseJobsHRAdmin":
				$().ConfigureOverviewScreen("gseJobsHRAdmin");
				break;
			case "gseJobsJobAdmin":
				$().ConfigureOverviewScreen("gseJobsJobAdmin");
				break;
			case "gseJobsManager":
				$().ConfigureOverviewScreen("gseJobsManager");
				break;


			case "gseSchedulesCalendarHRAdmin":
				$().ConfigureOverviewScreen("gseSchedulesCalendarHRAdmin");
				break;
			case "gseSchedulesCalendarJobAdmin":
				$().ConfigureOverviewScreen("gseSchedulesCalendarJobAdmin");
				break;
			case "gseSchedulesCalendarManager":
				$().ConfigureOverviewScreen("gseSchedulesCalendarManager");
				break;
			case "gseSchedulesCalendarStaff":
				$().ConfigureOverviewScreen("gseSchedulesCalendarStaff");
				break;


			case "gseSchedulesListHRAdmin":
				$().ConfigureOverviewScreen("gseSchedulesListHRAdmin");
				break;
			case "gseSchedulesListJobAdmin":
				$().ConfigureOverviewScreen("gseSchedulesListJobAdmin");
				break;
			case "gseSchedulesListManager":
				$().ConfigureOverviewScreen("gseSchedulesListManager");
				break;
			case "gseSchedulesListStaff":
				$().ConfigureOverviewScreen("gseSchedulesListStaff");
				break;


			case "gseSignupsHRAdmin":
				$().ConfigureOverviewScreen("gseSignupsHRAdmin");
				break;
			// case "gseSignupsJobAdmin":
			// 	$().ConfigureOverviewScreen("gseSignupsJobAdmin");
			// 	break;
			case "gseSignupsManager":
				$().ConfigureOverviewScreen("gseSignupsManager");
				break;
			case "gseSignupsStaff":
				$().ConfigureOverviewScreen("gseSignupsStaff");
				break;


		}
	};



	$.fn.TransitionAppScreens = function (options) {

		// we don't really want these timeouts; however, observation indicates that a given step / group of steps for this process 
		//		needs to be given a moment before the next starts; without these timeouts, nothing really happens on the screen 
		//		until the last step is completed and then the final result flashes onto the screen, and the user actually
		//		has to wait *longer* for the screen to become usable

		// console.log("show loading");
		$().ShowScreen("loading");

		setTimeout(function () {

			$.each(options.fromScreens, function (i, fromScreen) {
				// console.log("hide " + fromScreen);
				$().HideScreen(fromScreen);
			});

			setTimeout(function () {
				// refresh data, as needed, and show overview screen
				var overviewScreens = [
					"adminRequests",
					"myRequests",
					"gpcInitialConceptApprovalViewer",
					"gpcSubmissionApprovalViewer",
					"adminReferrals",
					"myReferrals",
					"adminEventAV",
					"gseJobsHRAdmin",
					"gseJobsJobAdmin",
					"gseJobsManager",
					"gseSchedulesCalendarHRAdmin",
					"gseSchedulesCalendarJobAdmin",
					"gseSchedulesCalendarManager",
					"gseSchedulesCalendarStaff",
					"gseSchedulesListHRAdmin",
					"gseSchedulesListJobAdmin",
					"gseSchedulesListManager",
					"gseSchedulesListStaff",
					"gseSignupsHRAdmin",
					"gseSignupsManager",
					"gseSignupsStaff",
				];
				if (overviewScreens.indexOf(options.toScreen) > -1) {

					// check to see if we need to stop for maintenance mode
					$().TryMaintenanceModeThisComponentThisUser();

					// if we don't need to stop for maintenance mode
					if (uData.maintenanceModeForThisUser != 1) {

						// update history, as needed
						// console.log("update browser history");
						$().UpdateBrowserHistoryAsNeeded(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);

						if (typeof (options.rebuildOverview) != "undefined" && options.rebuildOverview === 1) {
							// console.log("remove " + options.toScreen);
							$().RemoveScreen(options.toScreen);
							// console.log("configure " + options.toScreen);
							$().ConfigureScreen(options.toScreen);
						}

						// console.log("remove overlays");
						$().RemoveScreen("overlays");
						// console.log("configure overlays");
						$().ConfigureScreen("overlays");

						// console.log("show " + options.toScreen);
						$().ShowScreen(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);
					}
					// populate request data prior to showing request
				} else if (options.toScreen === "existingRequest") {

					// check to see if we need to stop for maintenance mode
					$().TryMaintenanceModeThisComponentThisUser();

					// if we don't need to stop for maintenance mode
					if (uData.maintenanceModeForThisUser != 1) {
						// update history, as needed
						$().UpdateBrowserHistoryAsNeeded(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);
						// console.log("remove " + options.toScreen);
						$().RemoveScreen(options.toScreen);
						// console.log("configure " + options.toScreen + " for options.requestID = " + options.requestID);
						$().ConfigureScreen(options.toScreen, options.requestID);
						// PopulateRequestScreen(options.requestID);
						// console.log("show " + options.toScreen + " for options.requestID = " + options.requestID);
						$().ShowScreen(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);
					}
					// show request
				} else if (options.toScreen === "newRequest") {

					// check to see if we need to stop for maintenance mode
					$().TryMaintenanceModeThisComponentThisUser();

					// if we don't need to stop for maintenance mode
					if (uData.maintenanceModeForThisUser != 1) {
						// update history, as needed
						$().UpdateBrowserHistoryAsNeeded(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);
						// console.log("remove " + options.toScreen);
						$().ShowScreen(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);
					}
				} else {
					// update history, as needed
					$().UpdateBrowserHistoryAsNeeded(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);
					// console.log("remove " + options.toScreen);
					$().ShowScreen(options.toScreen, options.requestID, options.addBrowserHistoryEntry, options.replaceBrowserHistoryEntry);
				}

				// var relTime = Date.now();
				// console.log("start hiding");
				$().HideScreen("loading");
				// console.log("finish hiding loading at " + (Date.now() - relTime)/1000 + ' seconds');
				// console.log("");

				if (options.toScreen !== "newRequest" && options.toScreen !== "existingRequest") {
					setTimeout(function () {

						$.each(options.fromScreens, function (i, fromScreen) {
							// console.log("remove " + fromScreen + " at " + (Date.now() - relTime)/1000 + ' seconds');
							$().RemoveScreen(fromScreen, options.rebuildOverlays);
							// console.log("configure " + fromScreen); // + " at " + (Date.now() - relTime)/1000 + ' seconds'
							$().ConfigureScreen(fromScreen, options.requestID, options.rebuildOverlays);
							// console.log("finished " + fromScreen + " at " + (Date.now() - relTime)/1000 + ' seconds');
							// console.log("");
						});
					}, 500);
				}
			}, 750);
		}, 500);
	};



	$.fn.RemoveScreen = function (screen, rebuildOverlays) {
		switch (screen) {
			case "request":
			case "newRequest":
			case "existingRequest":
				$("div#request-screen-container").empty();
				$("div#persona-card-dialog").remove();
				$("div#list-item-dialog").remove();
				if (rebuildOverlays == 1) {
					$("div#overlays-screen-container").empty();
				}
				break;
			case "overlays":
				$("div#overlays-screen-container").empty();
				break;
			case "adminRequests":
			case "myRequests":
			case "gpcInitialConceptApprovalViewer":
			case "gpcSubmissionApprovalViewer":
			case "adminReferrals":
			case "myReferrals":
			case "adminEventAV":
			case "gseJobsHRAdmin":
			case "gseJobsJobAdmin":
			case "gseJobsManager":
			case "gseSchedulesCalendarHRAdmin":
			case "gseSchedulesCalendarJobAdmin":
			case "gseSchedulesCalendarManager":
			case "gseSchedulesCalendarStaff":
			case "gseSchedulesListHRAdmin":
			case "gseSchedulesListJobAdmin":
			case "gseSchedulesListManager":
			case "gseSchedulesListStaff":
			case "gseSignupsHRAdmin":
			case "gseSignupsManager":
			case "gseSignupsStaff":
				$("div#overview-screen-container").empty().removeClass('adminRequests-requests myRequests-requests gpcInitialConceptApprovalViewer-requests gpcSubmissionApprovalViewer-requests adminReferrals-requests myReferrals-requests adminEventAV-requests gseJobsHRAdmin-requests gseJobsJobAdmin-requests gseJobsManager-requests gseSchedulesCalendarHRAdmin-requests gseSchedulesCalendarJobAdmin-requests gseSchedulesCalendarManager-requests gseSchedulesCalendarStaff-requests gseSchedulesListHRAdmin-requests gseSchedulesListJobAdmin-requests gseSchedulesListManager-requests gseSchedulesListStaff-requests gseSignupsHRAdmin-requests gseSignupsManager-requests gseSignupsStaff-requests');
				$("div#overview-screen-container").append('<div id="overview-table-container" class="table-container"></div>');
				break;
		}
	};



	$.fn.ConfigureSWFScreens = function () {

		// --- set up internal promise to configure

		var deferred = $.Deferred();

		// --- do config

		// insert request screen container and overview screen container
		$("div#app-container").append(
			'<div id="request-screen-container" class="screen-container hidden"></div>' +
			'<div id="overview-screen-container" class="screen-container hidden">' +
			'	<div id="overview-table-container" class="table-container"></div>' +
			'</div>'
		);

		// show either a (new or existing) request screen, the my requests screen, or 
		//		the admin requests screen

		// set up some vars

		// initialScreen is the one that will be shown initially
		var initialScreen = "";

		// secondaryScreen is the one that will be prepared in the background after 
		//		showing the initial screen
		var secondaryScreen = "";

		// overview screen is that which contains an overview of requests, e.g.,
		//		a my requests screen, an admin requests screen, etc.
		var overviewScreen = "";

		// if user is admin
		if (uData.isAdmin === 1) {
			overviewScreen = "adminRequests";
			// if user is NOT admin and does NOT need an alternate overview screen
		} else {
			overviewScreen = "myRequests";
		}

		// if user needs an alternate overview screen
		if (typeof (uData.alternateOverviewScreen) != "undefined" && uData.alternateOverviewScreen !== 0) {
			overviewScreen = uData.alternateOverviewScreen;
		}

		// if the URL contains a request ID (r) and it is 0 and the URL does NOT contain a GSE Schedule ID
		if (rData.requestID != "" && rData.requestID == 0 && rData.gseScheduleID == "") {
			initialScreen = "newRequest";
			secondaryScreen = overviewScreen;
			// if the URL contains a request ID (r) greater than 0 -OR- the URL contains a GSE Schedule ID (gseScheduleID) greater than 0
		} else if ((rData.requestID != "" && rData.requestID > 0) || (rData.gseScheduleID != "" && rData.gseScheduleID > 0)) {
			initialScreen = "existingRequest";
			secondaryScreen = overviewScreen;
			// if the URL does not contain a request ID (r)
		} else if (rData.requestID === "") {
			initialScreen = overviewScreen;
			secondaryScreen = "newRequest";
		}

		// configure and show initial screen
		$().ConfigureScreen(initialScreen, rData.requestID);
		$().ShowScreen(initialScreen, rData.requestID, 0, 1);

		// configure (but don't show) secondary screen
		$().ConfigureScreen(secondaryScreen);

		// add a class to the app container
		$("div#app-container").addClass($().ReturnHyphenatedFieldNameOrValue(mData.requestName).toLowerCase());

		// don't show the normal SharePoint content holder
		$("div#ctl00_PlaceHolderMain_WikiField").css("display", "none");


		// begin listening for events

		var controlKeyIsPressed = 0;

		window.onpopstate = function (event) {

			// console.log(event);
			// console.log(initialScreen);
			var fromScreenIDs = [];
			var fromScreens = [];
			var toScreen = "";

			$("div.screen-container:visible").each(function (i, screenContainer) {
				fromScreenIDs.push($(this).attr("id"));
			});
			if (fromScreenIDs.indexOf("overlays-screen-container") > -1) {
				fromScreens.push("overlays");
			}
			if (fromScreenIDs.indexOf("request-screen-container") > -1) {
				fromScreens.push("request");
			}
			if (fromScreenIDs.indexOf("overview-screen-container") > -1) {
				fromScreens.push("overview");
			}

			// console.log(event.state);
			// console.log(typeof(event.state));
			// console.log(typeof(typeof(event.state)));

			if (event.state != null && typeof (event.state.toScreen) !== "undefined") {
				toScreen = event.state.toScreen;
			} else {
				toScreen = initialScreen;
			}

			// console.log("toScreen = " + toScreen);

			$().TransitionAppScreens({ "fromScreens": fromScreens, "toScreen": toScreen, "requestID": null, "addBrowserHistoryEntry": 0 });
		};

		// prevent accidental page unload on hitting return
		$(document).keydown(function (keyDownEvent) {
			if (keyDownEvent.which == "13") {
				window.onbeforeunload = function () {
					return "If you navigate away from this screen without saving changes, then you will lose your unsaved changes.";
				}
			}
		});

		// track whether or not the Control key is being pressed
		$(document).keydown(function (keyDownEvent) {
			if (keyDownEvent.which == "17") {
				controlKeyIsPressed = 1;
			}
		});

		$(document).keyup(function () {
			controlKeyIsPressed = 0;
		});

		// on clicking new request button
		$("div#overview-screen-container").on("click", "a[data-button-type='newRequest']", function (clickEvent) {
			// left click only
			if (clickEvent.which == 1 && controlKeyIsPressed == 0) {
				// prevent default behaviour
				clickEvent.preventDefault();
				// transition screen: new request
				$().TransitionAppScreens({ "fromScreens": [overviewScreen], "toScreen": "newRequest", "requestID": null, "addBrowserHistoryEntry": 1 });
				// middle click
			} else if (clickEvent.which == 2) {
				// prevent default behaviour
				clickEvent.preventDefault();
			}
		});

		// on clicking existing request ID
		$("div#overview-screen-container").on("click", "a[data-button-type='existingRequest']", function (clickEvent) {
			// left click only
			if (clickEvent.which == 1 && controlKeyIsPressed == 0) {
				// prevent default behaviour
				clickEvent.preventDefault();
				// transition screen: populated request
				var selectedRequestID = $(this).attr("data-request-id");
				$().TransitionAppScreens({ "fromScreens": [overviewScreen], "toScreen": "existingRequest", "requestID": selectedRequestID, "addBrowserHistoryEntry": 1 });
				// middle click
			} else if (clickEvent.which == 2) {
				// prevent default behaviour
				clickEvent.preventDefault();
			}
		});

		// on clicking Don't Save; overlays will not have been modified from defaults, so no need to rebuild them
		$("div#request-screen-container").on("click", "a[data-button-type='noSave']", function () {
			// transition screen: overview screen
			$().TransitionAppScreens({ "fromScreens": ["request"], "toScreen": overviewScreen, "requestID": null, "addBrowserHistoryEntry": 1 });
		});

		// on clicking Exit; overlays will not have been modified from defaults, so no need to rebuild them
		$("div#overlays-screen-container").on("click", "a[data-button-type='exit']", function () {
			// transition screen: overview screen
			$().TransitionAppScreens({ "fromScreens": ["overlays"], "toScreen": overviewScreen, "requestID": null, "addBrowserHistoryEntry": 1 });
		});

		// on clicking Exit(AndRebuildOverview); overlays may have been modified from defaults, so rebuild them
		$("div#overlays-screen-container").on("click", "a[data-button-type='exitAndRebuildNonRequest']", function () {
			// transition screen: overview screen
			$().TransitionAppScreens({ "fromScreens": ["overlays", "request"], "toScreen": overviewScreen, "requestID": null, "addBrowserHistoryEntry": 1, "replaceBrowserHistoryEntry": 0, "rebuildOverview": 1, "rebuildOverlays": 1 });
		});

		// on clicking Save; no screen transition happening here
		$("div#request-screen-container").on("click", "a[data-button-type='save']", function () {
			// Process Submission
			$().ProcessSubmission();
		});

		// on clicking Signup; no screen transition happening here
		$("div#request-screen-container").on("click", "a[data-button-type='gse-schedule-signup']", function () {
			// Process GSE Signup
			$().ProcessGSESignup();
		});

		// on clicking Dismiss; no screen transition happening here
		$("div#overlays-screen-container").on("click", "a[data-button-type='dismiss']", function () {
			$('div#overlays-screen-container').fadeOut(200);
			$(this).closest('div.overlay-screen').fadeOut(200);
		});

		// --- signify confiuration completion
		deferred.resolve();
		return deferred.promise();
	};



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
				if (StrInStr(d.URL.Url, location.pathname) != false) {
					thisIsCurrentPage = 1;
				}

				// build the markup for this link, making additional allowances if the link is to the current page
				quickLaunchMarkup += '	<li class="static';
				if (thisIsCurrentPage === 1) { quickLaunchMarkup += ' selected'; }
				quickLaunchMarkup += '">' +
					'		<a class="static ';
				if (thisIsCurrentPage === 1) { quickLaunchMarkup += ' selected ms-core-listMenu-selected '; }
				quickLaunchMarkup += 'menu-item ms-core-listMenu-item ms-displayInline ms-navedit-linkNode" title="' + d.URL.Description + '" href="' + d.URL.Url + '">' +
					'			<span class="additional-background ms-navedit-flyoutArrow">' +
					'				<span class="menu-item-text">' + d.URL.Description + '</span>';
				if (thisIsCurrentPage === 1) { quickLaunchMarkup += '				<span class="ms-hidden">Currently selected</span>'; }
				quickLaunchMarkup += '			</span>' +
					'		</a>' +
					'	</li>';
			});

			quickLaunchMarkup += '</ul>';

			$('div.ms-core-listMenu-verticalBox').append(quickLaunchMarkup);
		});
	};


	// ============
	// ---- UTILITY FUNCTIONS
	// ============

	$.fn.ResizeTextareaToFitAllContents = function (textareaID) {

		var primaryElement = $('textarea#' + textareaID);

		// get the initial height of the textarea
		var primaryElementInitialScrollHeight = $(primaryElement).prop('scrollHeight');

		// if initial height is greater than zero, then the textarea is not hidden and the process is straightforward
		if (primaryElementInitialScrollHeight > 0) {
			// set height to 0; this makes the scroll height equivalent to the height of all of the content (rounded to nearest integer, so could be rounded down)
			$(primaryElement).height(0);
			// set height to scroll height + 1 (one extra pixel accounts for the rounding down)
			$(primaryElement).height($(primaryElement)[0].scrollHeight);

			// if we're dealing with a hidden textarea
		} else {
			// append a non-hidden (but invisible) clone
			var clonedElement = $(primaryElement).clone();
			var clonedElementScrollHeight = 0;

			$(clonedElement).attr("id", "cloned-textarea").addClass("hidden-cloned-textarea");
			$("div#app-container").append(clonedElement);
			$("textarea#cloned-textarea").val($(primaryElement).val());

			// set height to 0; this makes the scroll height equivalent to the height of all of the content (rounded to nearest integer, so could be rounded down)
			$("textarea#cloned-textarea").height(0);
			// get scroll height
			clonedElementScrollHeight = $("textarea#cloned-textarea")[0].scrollHeight;
			// remove cloned element
			$("textarea#cloned-textarea").remove();

			// set height to 0; this makes the scroll height equivalent to the height of all of the content (rounded to nearest integer, so could be rounded down)
			$(primaryElement).height(0);
			// set height to scroll height + 1 (one extra pixel accounts for the rounding down) + 10 
			//		(observation reveals that, somehow, the result is still sometimes half a line of text too small)
			$(primaryElement).height(clonedElementScrollHeight + 1 + 10);
		}
	};



	$.fn.GetFieldsFromSpecifiedRows = function (options) {

		var returnValue = [];

		var opt = $.extend({}, {
			listName: "SWFList",
			webURL: "https://bmos.sharepoint.com" + _spPageContextInfo.webServerRelativeUrl,
			completefunc: null
		}, options);

		// if listname is component log or component group log and no webURL was supplied
		if ((opt.listName === 'ComponentLog' || opt.listName === 'Component Group Log') && typeof (options.webURL) === 'undefined') {
			// assume HubProd
			opt.webURL = 'https://bmos.sharepoint.com/sites/hubprod';
		}


		var query = "<Query>" +
			"<Where>";
		if (opt.where.ands) { query += "<And>"; }
		// curently assumes there are no more than two ands
		$.each(opt.where.ands, function (i, andObject) {
			query += "<Eq>" +
				"<FieldRef Name='" + andObject.field + "'></FieldRef>" +
				"<Value Type='" + andObject.type + "'>" + andObject.value + "</Value>" +
				"</Eq>";
		});

		if (opt.where.ands) { query += "</And>"; }
		query += "</Where>" +
			"</Query>";

		var fields = "<ViewFields>";
		$.each(opt.select, function (i, oneField) {
			fields += " <FieldRef Name='" + oneField.nameInList + "' />";
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

						if (oneField.nameHere === "formData") {

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
								if (oneField.linkField === 1) {
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
	};





	$.fn.GetFieldsFromAllRows = function (options) {

		var returnValue = [];

		var opt = $.extend({}, {
			listName: "SWFList",
			webURL: "https://bmos.sharepoint.com" + _spPageContextInfo.webServerRelativeUrl,
			completefunc: null
		}, options);

		// if listname is component log or component group log and no webURL was supplied
		if ((opt.listName === 'ComponentLog' || opt.listName === 'Component Group Log') && typeof (options.webURL) === 'undefined') {
			// assume HubProd
			opt.webURL = 'https://bmos.sharepoint.com/sites/hubprod';
		}

		var query = "<Query>" +
			"	<OrderBy>" +
			"		<FieldRef Name='" + opt.order.field + "' Ascending='" + opt.order.ascending + "'></FieldRef>" +
			"	</OrderBy>" +
			"</Query>";

		var fields = "<ViewFields>";
		$.each(opt.select, function (i, oneField) {
			fields += " <FieldRef Name='" + oneField.nameInList + "' />";
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

						if (oneField.nameHere === "formData") {

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
								if (oneField.linkField === 1) {
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
	};



	function GetFieldsFromOneRow(options) {

		var returnValue = {};

		// assume we're going to query this site's SWFList if a specific list wasn't supplied
		var opt = $.extend({}, {
			listName: "SWFList",
			webURL: mData.fullSiteBaseURL,
			completefunc: null
		}, options);

		// if listname is component log or component group log and no webURL was supplied
		if ((opt.listName === 'ComponentLog' || opt.listName === 'Component Group Log') && typeof (options.webURL) === 'undefined') {
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
			fields += "<FieldRef Name='" + oneField.nameInList + "' />";
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

						if (
							oneField.nameHere === "formData" ||
							oneField.nameHere === "defaultDataForNewRequests" ||
							oneField.nameHere === "gseJobData" ||
							oneField.nameHere === "gseScheduleData"
						) {
							console.log('found field to interpret');

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
								if (oneField.linkField === 1) {

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



	// Phase out this function expression in favor of the function declaration
	$.fn.GetFieldsFromOneRow = function (options) {

		var returnValue = {};

		// assume we're going to query this site's SWFList if a specific list wasn't supplied
		var opt = $.extend({}, {
			listName: "SWFList",
			webURL: "https://bmos.sharepoint.com" + _spPageContextInfo.webServerRelativeUrl,
			completefunc: null
		}, options);

		// if listname is component log or component group log and no webURL was supplied
		if ((opt.listName === 'ComponentLog' || opt.listName === 'Component Group Log') && typeof (options.webURL) === 'undefined') {
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
			fields += "<FieldRef Name='" + oneField.nameInList + "' />";
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

						if (
							oneField.nameHere === "formData" ||
							oneField.nameHere === "defaultDataForNewRequests" ||
							oneField.nameHere === "gseJobData" ||
							oneField.nameHere === "gseScheduleData"
						) {

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
								if (oneField.linkField === 1) {

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



	$.fn.ReturnCurrentUserData = function () {

		var currentUserLookupValue = $().SPServices.SPGetCurrentUser({
			fieldNames: [
				"Name", // i:0#.f|membership|jbaker@mos.org
			],
			debug: false
		});
		return $().ReturnUserDataUsingAccountName(currentUserLookupValue.Name);
	};


	$.fn.UserIsComponentGrpAdmin = function () {
		// return 1 if current user's username is in component group admin string; else return 0
		return (StrInStr(mData.componentGrpAdmin, uData.userName, 0) != false) ? 1 : 0;
	};



	$.fn.UserIsComponentAdmin = function () {

		// set up this user flag
		var userIsComponentAdmin = 0;
		// if current user's username is in component admin string
		if (StrInStr(mData.componentAdmin, uData.userName, 0) != false) {
			// this user is component admin
			userIsComponentAdmin = 1;
			// otherwise, if this is a GSE component
		} else if (mData.requestName === "GSE Job" || mData.requestName === "GSE Schedule" || mData.requestName === "GSE Signup") {
			// if this user is an HR Admin
			var gseGroups = $().ReturnGSEGroups();
			$.each(gseGroups.HRAdmins, function (i, person) {
				if (person.accountLong === uData.account) {
					// this user is component admin
					userIsComponentAdmin = 1;
				}
			});
		}
		// return this user flag
		return userIsComponentAdmin;
	};



	$.fn.UserNeeedsAlternateOverviewScreen = function () {

		var userNeeedsAlternateOverviewScreen = 0;

		switch (mData.requestName) {
			case "GPC Initial Concept Approval":
				if (uData.isAdmin === 0) {
					var gpcGroups = $().ReturnGPCGroups();
					$.each(gpcGroups.InitialConceptViewAccess, function (i, person) {
						if (person.accountLong === uData.account) {
							userNeeedsAlternateOverviewScreen = "gpcInitialConceptApprovalViewer";
						}
					});
				}
				break;
			case "GPC Submission Approval":
				if (uData.isAdmin === 0) {
					var gpcGroups = $().ReturnGPCGroups();
					$.each(gpcGroups.SubmissionApprovalViewAccess, function (i, person) {
						if (person.accountLong === uData.account) {
							userNeeedsAlternateOverviewScreen = "gpcSubmissionApprovalViewer";
						}
					});
				}
				break;




			case "Refer a Friend":
				if (uData.isAdmin === 0) {
					userNeeedsAlternateOverviewScreen = "myReferrals";
				} else {
					userNeeedsAlternateOverviewScreen = "adminReferrals";
				}
				break;

			case "Event AV":
				if (uData.isAdmin === 1) {
					userNeeedsAlternateOverviewScreen = "adminEventAV";
				}
				break;





			case "GSE Job":
				if (uData.roles.indexOf("gseHRAdmin") > -1) {
					userNeeedsAlternateOverviewScreen = "gseJobsHRAdmin";
				} else if (uData.roles.indexOf("gseJobAdmin") > -1) {
					userNeeedsAlternateOverviewScreen = "gseJobsJobAdmin";
				} else if (uData.roles.indexOf("gseManager") > -1) {
					userNeeedsAlternateOverviewScreen = "gseJobsManager";
				}
				break;
			case "GSE Schedule":
				if (GetParamFromUrl(location.search, "f") === "cal") {
					if (uData.roles.indexOf("gseHRAdmin") > -1) {
						userNeeedsAlternateOverviewScreen = "gseSchedulesCalendarHRAdmin";
					} else if (uData.roles.indexOf("gseJobAdmin") > -1) {
						userNeeedsAlternateOverviewScreen = "gseSchedulesCalendarJobAdmin";
					} else if (uData.roles.indexOf("gseManager") > -1) {
						userNeeedsAlternateOverviewScreen = "gseSchedulesCalendarManager";
					} else {
						userNeeedsAlternateOverviewScreen = "gseSchedulesCalendarStaff";
					}
				} else {
					if (uData.roles.indexOf("gseHRAdmin") > -1) {
						userNeeedsAlternateOverviewScreen = "gseSchedulesListHRAdmin";
					} else if (uData.roles.indexOf("gseJobAdmin") > -1) {
						userNeeedsAlternateOverviewScreen = "gseSchedulesListJobAdmin";
					} else if (uData.roles.indexOf("gseManager") > -1) {
						userNeeedsAlternateOverviewScreen = "gseSchedulesListManager";
					} else {
						userNeeedsAlternateOverviewScreen = "gseSchedulesListStaff";
					}
				}
				break;
			case "GSE Signup":
				if (uData.roles.indexOf("gseHRAdmin") > -1) {
					userNeeedsAlternateOverviewScreen = "gseSignupsHRAdmin";
					// } else if (uData.roles.indexOf("gseJobAdmin") > -1) {
					// 	userNeeedsAlternateOverviewScreen = "gseSignupsJobAdmin";
				} else if (uData.roles.indexOf("gseManager") > -1) {
					userNeeedsAlternateOverviewScreen = "gseSignupsManager";
				} else {
					userNeeedsAlternateOverviewScreen = "gseSignupsStaff";
				}
				break;
		}

		return userNeeedsAlternateOverviewScreen;
	};



	function GetParamFromUrl(urlParams, paramToReturn) {

		// set up var
		var param = "";
		var paramEquals = "";
		// try to split up URL params into array
		urlParams = urlParams.substring(1).split("&");

		// if URL did contain params
		if (urlParams[0] != "") {

			// iterate over each param
			$.each(urlParams, function (i, singleParam) {

				if (StrInStr(singleParam, paramToReturn, 0) != false) {

					// try to get param param in form "=x"
					paramEquals = StrInStr(singleParam, paramToReturn + "=");

					if (paramEquals != false) {
						param = paramEquals.substr(parseInt(paramToReturn.length) + 1);
					}
				}

			});

		}
		return param;
	}



	function ReturnSiteTokenFromURL() {
		if (typeof (mData.axle) != "undefined" && mData.axle == 1) {
			return false;
		} else {
			return StrInStr(ReplaceAll('/sites/', '', window.location.pathname), '/', 1);
		}
	}



	function ReturnSitePageTokenFromURL() {
		var pageToken = "notASitePage";
		// try the standard url
		var attemptedPartialPageToken = StrInStr(window.location.pathname, '/SitePages/', 3);
		// in case the url has been partly or fully lowercased
		if (attemptedPartialPageToken === false) {
			attemptedPartialPageToken = StrInStr(window.location.pathname, '/sitepages/', 3);
		}
		// strip away a file extension
		if (attemptedPartialPageToken != false) {
			pageToken = ReplaceAll('.aspx', '', attemptedPartialPageToken);
		}
		return pageToken;
	}



	function ReturnThisPageIsASWFAppPage() {
		var thisPageIsASWFAppPage = 0;
		// if (mData.pageToken != "notASitePage") {
		if (mData.swfAppPageTokens.indexOf(mData.pageToken) > -1) {
			thisPageIsASWFAppPage = 1;
		}
		// }
		return thisPageIsASWFAppPage;
	}



	function ReturnFullSiteBaseURLFromSitePageURL() {
		var siteToken = ReturnSiteTokenFromURL();

		if (siteToken === false) {
			return false;
		} else {
			return 'https://bmos.sharepoint.com/sites/' + siteToken;
		}
	}



	$.fn.ReturnWorkflowContactsMarkup = function (personArray) {

		var personaSet = '<div class="in-page-personas">';

		personaSet += '<h2>Request Admins</h2>';

		$.each(personArray, function (i, person) {



			person.nameParts = person.name.split(" ");
			person.firstInitial = person.nameParts[0].slice(0, 1).toUpperCase();
			person.lastInitial = person.nameParts[1].slice(0, 1).toUpperCase();

			personaSet += '<div class="in-page-persona"> \n' +
				'	<span class="avatar-container"> \n' +
				'		<span class="avatar"> \n' +
				'			<span class="avatar-initials">' + person.firstInitial + person.lastInitial + '</span> \n' +
				'			<span class="avatar-photo" style="background-image: url(\'/_layouts/15/userphoto.aspx?size=M&accountname=' + person.sipAddress + '\');"></span> \n' +
				'		</span> \n' +
				'	</span> \n' +
				'	<span class="name_title"> \n' +
				'		<a class="profile" href="https://bmos-my.sharepoint.com:443/Person.aspx?accountname=' + encodeURIComponent(person.account) +
				'" target="_blank">' + person.name + '</a> \n' +
				'		<span class="title">' + person.jobTitle + '</span> \n' +
				'	</span> \n' +
				'</div>\n';
		});

		personaSet += '</div>';
		return personaSet;
	};



	$.fn.RenderInPagePersonaSet = function (personaData) {

		var personaSet = '<div class="in-page-personas';

		if (typeof (personaData.classValues) != "undefined" && personaData.classValues != null) {
			personaSet += ' ' + personaData.classValues;
		}

		personaSet += '">\n';

		if (typeof (personaData.title) != "undefined" && personaData.title != null) {
			personaSet += '<' + personaData.title.tag + '>' + personaData.title.content + '</' + personaData.title.tag + '>\n';
		}

		$.each(personaData.people, function (i, accountPart) {
			personaSet += '<div class="in-page-persona">\n';

			var userProfileValues = {};

			$().SPServices({
				operation: "GetUserProfileByName",
				async: false,
				AccountName: "i:0#.f|membership|" + accountPart + "@mos.org",
				completefunc: function (xData, Status) {
					$(xData.responseXML).SPFilterNode("PropertyData").each(function () {
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

			personaSet += '</span></span> \n' +
				'	<span class="name_title"> \n';
			if (typeof (userProfileValues.PreferredName) != 'undefined' && userProfileValues.PreferredName != '') {
				if (typeof (userProfileValues["SPS-PersonalSiteCapabilities"]) != 'undefined' && userProfileValues["SPS-PersonalSiteCapabilities"] != '') {
					personaSet += '		<a class="profile" href="https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=' + userProfileValues["msOnline-ObjectId"] + '" target="_blank">' + userProfileValues.PreferredName + '</a> \n';
				} else {
					personaSet += '		<span class="name">' + userProfileValues.PreferredName + '</span> \n';
				}
			}

			if (typeof (userProfileValues.Title) != 'undefined' && userProfileValues.Title != '') {
				personaSet += '		<span class="title">' + userProfileValues.Title + '</span> \n';
			}

			personaSet += '	</span> \n' +
				'</div>\n';
		});

		personaSet += '</div>';

		$("div#" + personaData.destinationID).append(personaSet);
	};



	$.fn.RedirectToHomePage = function () {
		window.location = _spPageContextInfo.webServerRelativeUrl + "/SitePages/Home.aspx";
	};


	function StrInStr(haystack, needle, flag) {

		var position = 0;
		haystack = haystack + '';
		needle = needle + '';
		position = haystack.indexOf(needle);

		if (position === -1) {
			return false;
		} else {
			if (typeof (flag) != "undefined") {
				if (flag === 1) {
					// return from beginning of string to beginning of needle
					return haystack.substr(0, position);
				} else if (flag === 2) {
					// return ?
					return haystack.slice(needle.length);
				} else if (flag === 3) {
					// return from needle to end of string, needle-exclusive
					return haystack.slice(position + needle.length);
				}
			} else {
				// return from needle to end of string, needle-inclusive
				return haystack.slice(position);
			}
		}
	}



	function ReplaceAll(needle, replacementNeedle, haystack) {
		return haystack.replace(new RegExp(needle, 'g'), replacementNeedle);
	}



	function ReplaceFirst(find, replace, str) {
		return str.replace(find, replace);
	}



	$.fn.TryMaintenanceModeThisComponentThisUser = function (initialLoad) {

		// if the mData.maintenanceModeForThisUser timestamp was set (e.g., the ajax operation didn't fail, etc.)
		if (typeof (mData.maintenanceModeForThisUserExpirationTimestamp) === "number") {

			// if user is not component group admin
			if (uData.isComponentGrpAdmin != 1) {

				// console.log("not a CG admin");

				// if this is the initial load
				if (typeof (initialLoad) != "undefined" && initialLoad === 1) {
					// console.log("this is the initial load!!!");
					// set flag according to whether or not component is in maintenance mode
					mData.maintenanceModeForThisUser = ReturnMaintenanceModeThisComponent();

					// if this is NOT the initial load, then don't check unless the mData.maintenanceModeForThisUserExpirationTimestamp flag has expired
				} else if (mData.maintenanceModeForThisUserExpirationTimestamp <= Date.now()) {
					// console.log("not the initial load and flag HAS expired");
					// update maintenance mode info via ajax
					$().GetAndSetMaintenanceModeData();

					// set flag according to whether or not component is in maintenance mode
					mData.maintenanceModeForThisUser = ReturnMaintenanceModeThisComponent();

					// if still not in maintenance mode for this user
					if (mData.maintenanceModeForThisUser === 0) {
						// extend the expiration
						mData.maintenanceModeForThisUserExpirationTimestamp = Date.now() + mData.maintenanceModeCacheLifespan;
						// console.log("it's currently " + Date.now());
						// console.log("maintenance mode will be checked again after " + mData.maintenanceModeForThisUserExpirationTimestamp);
					}
				} else {
					// console.log("   not the initial load and flag HAS ((NOT)) expired");
					// console.log('   flag will expire in ' + (mData.maintenanceModeForThisUserExpirationTimestamp - Date.now()) / 1000 + 'seconds');
				}
				// if user IS component group admin
			} else {
				// set flag indicating that this component is NOT in maintenance mode for this user
				mData.maintenanceModeForThisUser = 0;
			}

			// whether or not this is the initial load
			// if in maintenance mode for this user
			if (mData.maintenanceModeForThisUser === 1) {
				// show the maintenance screen
				// console.log("showing maintenance screen");
				$().ShowScreen("maintenance", null, 0, 0);
				// if not in maintenance mode for this user
			}

			// if the mData.maintenanceModeForThisUser timestamp was never set (e.g., because the ajax operation failed)
		} else {

			// show the maintenance screen
			$().ShowScreen("maintenance", null, 0, 0);
		}
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
			url: "https://bmos.sharepoint.com/sites/hubprod/Code4/js/mos-maintenance-mode.js?ts=" + Date.now(),
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



	function ReturnMaintenanceModeThisComponent() {

		// console.log("checking MM for this component");

		// set flag indicating that this component is NOT in maintenance mode
		var inMaintenanceMode = 0;
		// if all components are in maintenance mode
		if (mData.allComponentsInMaintenanceMode) {
			// alter flag
			inMaintenanceMode = 1;
			// if this is Hub Central and it's in maintenance mode
		} else if (typeof (mData.axle) != "undefined" && mData.axle === 1 && mData.hubCentralInMaintenanceMode) {
			// alter flag
			inMaintenanceMode = 1;
			// if this is a swf and all swfs are in maintenance mode
		} else if (typeof (mData.swf) != "undefined" && mData.swf === 1 && mData.allSWFsInMaintenanceMode) {
			// alter flag
			inMaintenanceMode = 1;
			// if this is a swf and Neso is not healthy
		} else if (typeof (mData.swf) != "undefined" && mData.swf === 1 && mData.nesoIsHealthy === false) {
			// alter flag
			inMaintenanceMode = 1;
		} else {
			// for each of the components that are in maintenance mode
			$.each(mData.componentsInMaintenanceMode, function (i, componentInMaintenanceMode) {
				// if the component's site token matches this component's site token
				if (componentInMaintenanceMode === mData.siteToken) {
					// alter flag
					inMaintenanceMode = 1;
				}
			});
		}

		// console.log("inMaintenanceMode = " + inMaintenanceMode);
		return inMaintenanceMode;
	}



	// ============
	// ---- SWF FUNCTIONS
	// ============

	// ---- MOST FREQUENTLY NEEDED


	/* 
		$.fn.GetJobValues = function (jobId) {
			// reconsider
			var options = {
				"select": [{
					"nameHere": "formData",
					"nameInList": "AllRequestData"
				}],
				"where": {
					"field": "ID",
					"type": "Number",
					"value": jobId,
				}
			};

			var jobValues = {};

			// assume we're going to query this site's SWFList if a specific list wasn't supplied
			var opt = $.extend({}, {
				listName: "SWFList",
				webURL: "https://bmos.sharepoint.com/sites/hr-service-jobs",
				completefunc: null
			}, options);

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
				fields += "<FieldRef Name='" + oneField.nameInList + "' />";
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

							if (oneField.nameHere === "formData" || oneField.nameHere === "defaultDataForNewRequests") {

								var value = $(zRow).attr("ows_" + oneField.nameInList);

								var regexOne = new RegExp("\r", "g");
								var regexTwo = new RegExp("\n", "g");
								value = value.replace(regexOne, "'");
								value = value.replace(regexTwo, "'");

								eval("var formDataObj=" + value);

								jobValues[oneField.nameHere] = formDataObj;

							} else {

								value = $(zRow).attr("ows_" + oneField.nameInList);

								if (typeof (oneField.linkField) != "undefined") {
									if (oneField.linkField === 1) {

										value = ReplaceAll(",,", "DOUBLECOMMAREPLACEMENT", value);
										value = value.split(",")[0];
										value = ReplaceAll("DOUBLECOMMAREPLACEMENT", ",", value);
									}
								}
								jobValues[oneField.nameHere] = value;
							}
						});
					});
				}
			});

			return jobValues;
		}
	 */



	/* $.fn.ConfigureExistingGSESignup = function (passedScheduleID) {
		// reconsider
		if (typeof (passedRequestID) != "undefined" && passedRequestID === "0") {
			rData = { "requestID": "" };
		} else {
			rData = { "requestID": GetParamFromUrl(location.search, "r") };
		}

		if (rData.requestID != "") {
			rData = $.extend(
				rData,
				$().GetFieldsFromOneRow({
					"select": [{
						"nameHere": "department",
						"nameInList": "Department"
					}, {
						"nameHere": "jobId",
						"nameInList": "JobID"
					}, {
						"nameHere": "scheduleId",
						"nameInList": "ScheduleID"
					}, {
						"nameHere": "userContact",
						"nameInList": "UserContact"
					}, {
						"nameHere": "jobTitle",
						"nameInList": "JobTitle"
					}, {
						"nameHere": "formData",
						"nameInList": "AllRequestData"
					}],
					"where": {
						"field": "ID",
						"type": "Number",
						"value": rData.requestID,
					}
				})
			);
		}

		$('#JobID').val(rData['jobId']);
		$('#ScheduleID').val(rData['scheduleId']);
		$('#UserContact').val(rData['userContact']);
		$('#JobTitle').val(rData['jobTitle']);
	}



	$.fn.ConfigureExistingGSESchedule = function (passedScheduleID) {

			// scorey: here, 
			//  ** query SWFList, build screen 3.1, insert it into the container, listen for the signup button to be clicked, and start trying maintenance mode
			//  ** look at ConfigureRequest for examples of querying SWFList, instering into the container, listening for button clicks, and trying for maintenance mode
			//  ** in terms of markup / appearance, probably best to model the signup button on the Save button, rather than the buttons at the top of the overview screens
			//  ** clicking the cignup button should either trigger ProcessSubmission function (and that function will need to be modified to create a signup) or a different function

		// $("div#request-screen-container").append("<p>This is 3.1 Signup Opportunity for User.</p>");

		rData = { "scheduleID": passedScheduleID };
		rData = $.extend(
			rData,
			$().GetFieldsFromOneRow({
				"select": [{
					"nameHere": "jobID",
					"nameInList": "JobID"
				}, {
					"nameHere": "GSEScheduleData",
					"nameInList": "AllRequestData"
				}],
				"where": {
					"field": "ID",
					"type": "Number",
					"value": rData.scheduleID,
				}
			})
		);
		rData = $.extend(
			rData,
			$().GetFieldsFromOneRow({
				"select": [{
					"nameHere": "GSEJobData",
					"nameInList": "AllRequestData"
				}],
				"webURL": "https://bmos.sharepoint.com/sites/hr-service-jobs",
				"where": {
					"field": "ID",
					"type": "Number",
					"value": rData.jobID,
				}
			})
		);
		rData.shiftLength = rData['shiftlength_35-hours'] ? '3.5 hours' : '7.5 hours';
		var opportunityJobDuties = [];
		rData.GSEJobData.RepeatedElements.forEach((repeatElement) => {
			// console.log('repeatElement');
			// console.log(repeatElement);
			if (StrInStr(repeatElement.ID, 'gse-job-duty') != -1) {
				// console.log('found a duty');
				var repeatElementKeys = Object.keys(repeatElement);
				// console.log('repeatElementKeys');
				// console.log(repeatElementKeys);
				repeatElementKeys.forEach((repeatElementKey) => {
					if (StrInStr(repeatElementKey, 'Job-Duty')) {
						opportunityJobDuties.push(repeatElement[repeatElementKey]);
					}
				});
			}
		});
		var opportunityMarkup =	'<div id="gse-signup-opportunity-display" class="request-detail-display">' + 
			'	<h3>' + rData.GSEJobData['Job-Title'] + '</h3>' + 
			'	<div class="request-detail-display__field">' + 
			'	<h4>Logistics</h4>' + 
			'	<ul>' + 
			'		<li>Positions Available: <span style="background-color: #fcc">X </span> out of ' + 
					rData.GSEScheduleData['Number-of-Positions'] + '</li>' + 
			'		<li>Date: ' + $().ReturnFormattedDateTime(rData.GSEScheduleData['Date'], null, 'dddd, MMMM D, YYYY', 1) + '</li>' + 
			'		<li>Length: ' + rData.shiftLength + '</li>' + 
			'		<li>Start Time: ' + $().ReturnFormattedDateTime(rData.GSEScheduleData['time-storage_StartTime'], null, 'h:mm a') + '</li>' + 
			'		<li>Break Time: ' + $().ReturnFormattedDateTime(rData.GSEScheduleData['time-storage_BreakTime'], null, 'h:mm a') + '</li>' + 
			'		<li>Meal Time: ' + $().ReturnFormattedDateTime(rData.GSEScheduleData['time-storage_MealTime'], null, 'h:mm a') + '</li>' + 
			'		<li>Reporting to: <a href="mailto:' + rData.GSEJobData['Job-Admin'][0].description + '">' + 
						rData.GSEJobData['Job-Admin'][0].displayText + '</a></li>' + 
			'		<li>Department: ' + rData.GSEJobData['Department'] + '</li>' + 
			'	</ul>' + 
			'	</div>' + 
			'	<div class="request-detail-display__field">' + 
			'		<h4>Job Description</h4>' + 
					ReplaceAll('%0A', '<br />', rData.GSEJobData['Job-Description']) + 
			'	</div>';

		if (rData.GSEJobData['Training-Requirements']) {
			opportunityMarkup +=	'	<div class="request-detail-display__field">' +
									'		<h4>Training Requirements</h4>' +
											ReplaceAll('%0A', '<br />', rData.GSEJobData['Training-Requirements']) +
									'	</div>';
		}

		opportunityMarkup +=	'	<div class="request-detail-display__field">' + 
								'		<h4>Dress Requirements</h4>' + 
								'		Must wear MOS badge above the waist at all times.<br />' + 
								'		Clothing and shoes must be in good condition.<br />';

		if (rData.GSEJobData['Dress-Requirements']) {
			opportunityMarkup += ReplaceAll('%0A', '<br />', rData.GSEJobData['Dress-Requirements']);
		}

		opportunityMarkup +=	'</div>' + 
			'	<div class="request-detail-display__field">' + 
			'		<h4>Job Duties</h4>';
		
		opportunityJobDutyElement = opportunityJobDuties[1] ? 'li' : 'p';

		if (opportunityJobDuties[1]) {
			opportunityMarkup += '		<ul>';
		}

		opportunityJobDuties.forEach((opportunityJobDuty) => {
			opportunityMarkup += '			<' + opportunityJobDutyElement + '>' + opportunityJobDuty + '</' + opportunityJobDutyElement + '>';
		});

		if (opportunityJobDuties[1]) {
			opportunityMarkup += '		</ul>';
		}

		opportunityMarkup += '	</div>' +
			'	<div class="request-detail-display__field-set">' + 
			'		<h4>Physical Requirements</h4>' + 
			'		<h5>How Much Weight Will Be Handled</h5>' + 
			'		<ul>' +
			'			<li>Lifting: ' + 
							rData.GSEJobData['Physical-Demand-Lifting'] + ' lbs' +
			'			</li>' +
			'			<li>Carrying: ' + 
							rData.GSEJobData['Physical-Demand-Carrying'] + ' lbs' +
			'			</li>' +
			'			<li>Pushing: ' + 
							rData.GSEJobData['Physical-Demand-Pushing'] + ' lbs' +
			'			</li>' +
			'			<li>Pulling: ' + 
							rData.GSEJobData['Physical-Demand-Pulling'] + ' lbs' +
			'			</li>' +
			'		</ul>' +



			'		<h5>How Much Weight Will Be Handled</h5>' + 
			'		<ul>' +
			'			<li>Standing: ' + 
							rData.GSEJobData['Physical-Demand-Standing'] + '%' +
			'			</li>' +
			'			<li>Sitting: ' + 
							rData.GSEJobData['Physical-Demand-Sitting'] + '%' +
			'			</li>' +
			'			<li>Walking: ' + 
							rData.GSEJobData['Physical-Demand-Walking'] + '%' +
			'			</li>' +
			'		</ul>' +
			'	</div>' + 
			// '	<input id="Request-Nickname" listfieldname="Title" type="hidden" value="' + uData.userName + '-' + rData.jobID + '-' + rData.scheduleID + '">' + 
			// '	<input id="Schedule-ID" name="schedule-id" listfieldname="ScheduleID" type="hidden" value="' + rData.scheduleID + '">' + 
			// '	<input id="Job-ID" name="job-id" listfieldname="JobID" type="hidden" value="' + rData.jobID + '">' + 
			// '	<input id="Requested-For" name="requested-for" listfieldname="JobID" type="hidden" value="' + rData.jobID + '">' + 
			// '	' + 
			'	<a id="gse-schedule-signup-button" data-button-type="gse-schedule-signup">Sign up</a>' +
			'</div>';

		$("div#request-screen-container").append(opportunityMarkup);
	}; */



	$.fn.ConfigureRequest = function (passedRequestID) {

		// if this is a GSE Sschedule and this user is not HR Admin, Job Admin, or Manager
		if (mData.requestName === "GSE Schedule" && uData.roles.indexOf("gseUserOnly") > -1) {
			// forget this function and go to ConfigureExistingGSESchedule instead
			$().ConfigureExistingGSESchedule(passedRequestID);
			// if this is not a GSE Schedule or this user is HR Admin, Job Admin, or Manager
		} else {

			// ========================================================
			// SET UP VARS
			// ========================================================

			// console.log('betweenLoadingAndInitialization time = ' + (Date.now() - loadingFinishTime)/1000 + ' seconds');

			// if mData.adminNotificationPersons === 1, overwrite the admin notifications data pulled from Component Log with
			//		data from Component Group Log
			if (typeof (mData.devAdminNotifications) != 'undefined' && mData.devAdminNotifications === 1) {
				mData.adminNotificationPersons = mData.devAdminNotificationPersons;
			}

			// set semicolon-delimited string of admin emails
			mData.adminEmailString = $().ReturnUserEmailStringAndArray(mData.adminNotificationPersons).string;
			mData.adminEmailArray = $().ReturnUserEmailStringAndArray(mData.adminNotificationPersons).array;
			mData.componentGrpAdminEmailString = $().ReturnUserEmailStringAndArray(mData.componentGrpAdminNotifications).string;
			mData.componentGrpAdminEmailArray = $().ReturnUserEmailStringAndArray(mData.componentGrpAdminNotifications).array;

			mData.requiredApproversArray = (mData.requiredApproversString) ?
				$().ReturnUserDataFromPersonOrGroupFieldString(mData.requiredApproversString) :
				[];

			mData.conditionalApproversArray = (mData.conditionalApproversString) ?
				$().ReturnUserDataFromPersonOrGroupFieldString(mData.conditionalApproversString) :
				[];

			// THIS REQUEST'S DATA
			// reset rData and get request id from url param
			if (typeof (passedRequestID) != "undefined" && passedRequestID === "0") {
				rData = { "requestID": "" };
				rData.gseScheduleID = GetParamFromUrl(location.search, "gseScheduleID");
			} else {
				rData = { "requestID": GetParamFromUrl(location.search, "r") };
			}

			// if request id is undefined or "0", then this is a new request, which is signified everywhere by an empty id string
			if (typeof (rData.requestID) === "undefined" || rData.requestID === "0") { rData.requestID = ""; }

			// if there is a request id, then get data for this request

			if (rData.requestID != "") {

				rData = $.extend(
					rData,
					$().GetFieldsFromOneRow({
						"select": [{
							"nameHere": "requestStatus",
							"nameInList": "RequestStatus"
						}, {
							"nameHere": "endOfLife",
							"nameInList": "EndOfLife"
						}, {
							"nameHere": "lastModifiedAtLoad",
							"nameInList": "Modified"
						}, {
							"nameHere": "requesterID",
							"nameInList": "Author"
						}, {
							"nameHere": "formData",
							"nameInList": "AllRequestData"
						}, {
							"nameHere": "requestVersion",
							"nameInList": "RequestVersion"
						}],
						"where": {
							"field": "ID",
							"type": "Number",
							"value": rData.requestID,
						}
					})
				);
			}

			if (typeof (rData.requestStatus) === "undefined") {
				rData.requestStatus = "";
			}

			if (rData.requestID != "") {
				rData.formDataOnLoad = rData.formData;
				rData.formDataOnLoad.requestStatus = rData.requestStatus;
			}

			/* 
				// consider

				if (rData.requestID != "") {
					if (mData.requestName != "GSE Signup") {
						rData.formDataOnLoad = rData.formData;
						rData.formDataOnLoad.requestStatus = rData.requestStatus;
					} else {
						rData.formDataOnLoad = [];
						rData.formDataOnLoad.requestStatus = '';
					}
				}
			 */

			// THIS REQUEST'S DEFAULT DATA FOR NEW REQUESTS

			if (typeof (mData.defaultDataForNewRequests) != "undefined") {
				rData = $.extend($().GetFieldsFromOneRow({
					'webURL': mData.defaultDataForNewRequests.webURL,
					'listName': mData.defaultDataForNewRequests.listName,
					'select': mData.defaultDataForNewRequests.select,
					'where': mData.defaultDataForNewRequests.where,
				}), rData);
			}

			// CAPTURE MACHINE DATA
			uData.browserFamilyAndVersion = bowser.name + ' ' + bowser.version;

			if (typeof (bowser.mobile) != 'undefined' && bowser.mobile === true) {
				uData.formFactor = 'mobile';
			} else if (typeof (bowser.tablet) != 'undefined' && bowser.tablet === true) {
				uData.formFactor = 'tablet';
			} else {
				uData.formFactor = 'probably desktop';
			}

			if (typeof (bowser.android) != 'undefined' && bowser.android === true) {
				uData.os = 'Android';
			} else if (typeof (bowser.ios) != 'undefined' && bowser.ios === true) {
				if (typeof (bowser.ipad) != 'undefined' && bowser.ipad === true) {
					uData.os = 'iOS (iPad)';
				} else if (typeof (bowser.iphone) != 'undefined' && bowser.iphone === true) {
					uData.os = 'iOS (iPhone)';
				} else if (typeof (bowser.ipod) != 'undefined' && bowser.ipod === true) {
					uData.os = 'iOS (iPhod)';
				}
			} else if (typeof (bowser.windowsphone) != 'undefined' && bowser.windowsphone === true) {
				uData.os = 'Windows Phone';
			} else if (typeof (bowser.mac) != 'undefined' && bowser.mac === true) {
				uData.os = 'Mac';
			} else if (typeof (bowser.linux) != 'undefined' && bowser.linux === true) {
				uData.os = 'Linux';
			} else {
				uData.os = 'Probably Windows';
			}

			if (typeof (bowser.osversion) != 'undefined') {
				uData.os = uData.os + ' ' + bowser.osversion;
			}

			// COMBINE STANDARD AND UNIQUE FORM ELEMENTS

			if (typeof (fData.standardElementGroups.standardPrintButton) != "undefined") {

				var standardPrintButton = [
					{
						'elementType': 'markup',
						'tag': 'a',
						'htmlID': 'standard-printer-button-inside-request',
						'content': fData.standardElementGroups.standardPrintButton.buttonText,
						'dataAttributes': [{
							'key': 'print-function',
							'value': fData.standardElementGroups.standardPrintButton.printFunction
						}],
						'begin': 1,
						'end': 1,
						// 'hideForNonAdmin': [""],
						// 'hideForAdmin': [""],
					}
				];

				if (typeof (fData.standardElementGroups.standardPrintButton.hideForNonAdmin) !== "undefined") {
					standardPrintButton[0]["hideForNonAdmin"] = fData.standardElementGroups.standardPrintButton.hideForNonAdmin;
				} else {
					standardPrintButton[0]["hideForNonAdmin"] = [""];
				}

				if (typeof (fData.standardElementGroups.standardPrintButton.hideForAdmin) !== "undefined") {
					standardPrintButton[0]["hideForAdmin"] = fData.standardElementGroups.standardPrintButton.hideForAdmin;
				} else {
					standardPrintButton[0]["hideForAdmin"] = [""];
				}
			}

			var standardThisRequestAndRequesterElements = [
				// this request
				{
					"elementType": "markup",
					"tag": "div",
					"htmlID": "print-to-screen",
					"begin": 1,
					"end": 1
				}, {
					"elementType": "markup",
					"tag": "h2",
					"content": "This Request",
					"htmlID": "header_this-request",
					"begin": 1,
					"end": 1
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlClass": "label-and-control",
					"htmlID": "requirement-legend",
					"content": '	<div class="label"></div>' +
						'	<div class="field-type-indication"><span class="field-type-indicator field-required"><span class="message message-required"></span></span></div>' +
						'	<div class="control">= required field</div>',
					"begin": 1,
					"end": 1
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Request ID",
					"labelContent": "Request ID",
					"hideForNonAdmin": [""],
					"hideForAdmin": [""],
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Request Date",
					"labelContent": "Request Date",
					"listFieldName": "RequestDate",
					"friendlyFormatOnLoad": {
						'incomingFormat': null,
						'returnFormat': 'MMMM D, YYYY',
						'determineYearDisplayDynamically': 1
					},
					"isoFormatOnSubmit": {
						'incomingFormat': null,
						'returnFormat': null,
						'determineYearDisplayDynamically': null
					},
					"hideForNonAdmin": [""],
					"hideForAdmin": [""],
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Request Nickname",
					"labelContent": "Request Nickname",
					"listFieldName": "Title",
					"helpNotes": [{
						"text": "Give this request a name you can reference later",
						"htmlID": "request-nickname_help-note",
						"urgent": 0,
						"hideForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
					}],
					"requiredForNonAdmin": [""],
					"requiredForAdmin": [""],
					"disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "select",
					"fieldName": "Self or Other",
					"labelContent": "If we have questions, talk to you or someone else?",
					"setOptions": [{
						"value": "Self",
						"display": "Talk to me"
					}, {
						"value": "Other",
						"display": "Talk to someone else"
					}],
					"requiredForNonAdmin": [""],
					"requiredForAdmin": [""],
					"hideForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"onChange": [{
						"thisFieldEquals": ["Self"],
						"hide": [{
							"fieldName": "Requested For"
						}],
						"optional": [{
							"fieldName": "Requested For",
							"type": "peoplepicker"
						}],
						"set": [{
							"fieldName": "Requested For",
							"type": "peoplePicker",
							"value": "currentUser"
						}]
					}, {
						"thisFieldEquals": ["Other"],
						"show": [{
							"fieldName": "Requested For"
						}],
						"require": [{
							"fieldName": "Requested For",
							"type": "peoplepicker"
						}],
						"set": [{
							"fieldName": "Requested For",
							"type": "peoplePicker",
							"value": ""
						}]
					}]
				}, {
					"elementType": "field",
					"controlType": "peoplePicker",
					"fieldName": "Requested For",
					"labelContent": "If needed, talk to",
					"listFieldName": "RequestedFor",
					"yieldsViewPermissions": 1,
					"hideForNonAdmin": [""],
					"hideForAdmin": [""],
					"disabledForNonAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "check",
					"fieldName": "Requester Cancellation",
					"choiceSetLabel": "Cancellation",
					"choices": [{
						"value": "cancel",
						"display": "Yes, I wish to cancel this request"
					}],
					"hideForNonAdmin": ["", "Validator Picked Up", "Loaned", "Archived", "Completed", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Archived", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForNonAdmin": ["Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Completed", "Archived", "Disapproved", "Cancelled"]
					// about the requester
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlID": "container_about-the-requester",
					"begin": 1,
					"hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "Submitted", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": [""],
				}, {
					"elementType": "markup",
					"tag": "h2",
					"content": "About the Requester",
					"begin": 1,
					"end": 1
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Requester Name",
					"labelContent": "Name",
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Requester Department",
					"labelContent": "Department",
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Requester Email",
					"labelContent": "Email",
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Requester Phone",
					"labelContent": "Phone",
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Requester Account",
					"labelContent": "Account",
					"yieldsViewPermissions": 1,
					"hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "peoplePicker",
					"fieldName": "Requested By",
					"labelContent": "Requested By",
					"listFieldName": "RequestedBy",
					"yieldsViewPermissions": 1,
					"hideForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForNonAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Submission to Commission", "Submitted to Commission", "Interpreter Assigned", "Invoice Received", "Submitted", "Text Edited", "Web Live", "Pending Validator Pickup", "Validator Picked Up", "In Development", "Pending Approval", "Approved", "Grant Proposal Submitted", "Grant Awarded", "Grant Declined", "Loaned", "Completed", "Archived", "Disapproved", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"end": 1
				}
			];

			var standardApprovalElements = [
				{
					"elementType": "markup",
					"tag": "div",
					"htmlID": "container_approvals",
					"begin": 1,
				}, {
					"elementType": "markup",
					"tag": "h2",
					"htmlID": "header_approvals",
					"content": "Approvals",
					"begin": 1,
					"end": 1
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlID": "swf-specific-approval-preface",
					"htmlClass": "preface",
					"begin": 1,
					"end": 1,
					"hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlClass": "preface",
					"content": "By submitting this request, you approve it. For any additional person whose approval will be required, " +
						"enter a name or mos.org email address in the Approvers field.",
					"begin": 1,
					"end": 1,
					"hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlClass": "preface",
					"content": "To remove an unneeded approver, select the \"X\" to the right of the name.",
					"begin": 1,
					"end": 1,
					"hideForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlClass": "preface",
					"content": "Here to approve? Just find your name and set the corresponding approval indicator " +
						"to 'I approve'. If your approval has been requested in error, please " +
						"<a href='' class='link_admin-email'>contact the admin</a>.",
					"htmlID": "approval-instructions",
					"begin": 1,
					"end": 1,
					"hideForNonAdmin": ["", "In Development", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "In Development", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlClass": "preface",
					"content": "Here to approve? No need. Someone has already disapproved this request.",
					"htmlClass": "urgent",
					"htmlID": "disregard-approval-notice",
					"begin": 1,
					"end": 1,
					"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Completed", "Cancelled"],
					"hideForAdmin": ["", "In Development", "Pending Approval", "Approved", "Completed", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlClass": "preface",
					"content": "Admin - If the approval requirements are incorrect, " +
						"<ul>" +
						"	<li>Delete an unneeded approver by selecting the \"X\" to the right of the name.</li>" +
						"	<li>Add a needed approver by entering a name or mos.org email address in the Approvers field.</li>" +
						"	<li>Added and deleted approvers will be notified automatically.</li>" +
						"<ul>",
					"begin": 1,
					"end": 1,
					"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "In Development", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "peoplePicker",
					"fieldName": "Approvers on Load",
					"labelContent": "Approvers on Load",
					"hideForNonAdmin": ["", "In Development", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "In Development", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "peoplePicker",
					"fieldName": "Approvers",
					"labelContent": "Approvers",
					"yieldsViewPermissions": 1,
					"hideForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["Completed", "Disapproved", "Cancelled"],
					"disabledForNonAdmin": ["Completed", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Completed", "Disapproved", "Cancelled"],
					"helpNotes": [{
						"text": "All and only the the people listed here will be required to approve this request",
						"htmlID": "approvers-people-picker_help-note",
						"urgent": 0
					}]
				}, {
					"elementType": "markup",
					"tag": "div",
					"htmlID": "all-approvals",
					"content": '',
					"begin": 1,
					"end": 1
				}, {
					"elementType": "markup",
					"tag": "div",
					"end": 1
				}
			];

			if (typeof (fData.standardElementGroups.standardAdminAssignmentCompletionElements) != "undefined") {

				var standardAdminAssignmentCompletionElements1 = [
					{
						"elementType": "markup",
						"tag": "div",
						"htmlID": "admin",
						"content": '',
						"begin": 1,
						"hideForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": [""]
					}, {
						"elementType": "markup",
						"tag": "h2",
						"content": 'Admin',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "div",
						"htmlID": "approval-notification-history",
						"begin": 1,
						"hideForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}, {
						"elementType": "markup",
						"tag": "h3",
						"content": 'Approval Notification History',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "table",
						"htmlID": "table_approval-notification-history",
						"content": '  <thead>' +
							'		 <tr>' +
							'			  <th id="th_recipient">Recipient</th>' +
							'			  <th id="th_needed-or-not">Needed or Not Needed</th>' +
							'			  <th id="th_date">Date & Time</th>' +
							'		 </tr>' +
							'	</thead>' +
							'	<tbody>' +
							'	</tbody>',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "div",
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "h3",
						"content": 'Request Status and Notes',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "field",
						"controlType": "select",
						"fieldName": "Change Request Status",
						"labelContent": "Change Request Status",
						"setOptions": fData.standardElementGroups.standardAdminAssignmentCompletionElements.changeRequestStatus,
						"hideForNonAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Submitted", "Completed", "Disapproved", "Cancelled"],
						'onChange': [
							{ "thisFieldEquals": ["Approve"], "require": [{ "fieldName": "Assigned To", "type": "peoplepicker" }], "enable": [{ "fieldName": "Assigned To", "type": "peoplepicker" }], "show": [{ "divID": "assignment" }] },
							{ "thisFieldEquals": ["Complete"], "require": [{ "fieldName": "Completed By", "type": "peoplepicker" }], "enable": [{ "fieldName": "Completed By", "type": "peoplepicker" }], "show": [{ "divID": "completion" }, { "divID": "assignment" }] },
							{ "thisFieldEquals": ["", "Cancel", "Disapprove"], "optional": [{ "fieldName": "Assigned To", "type": "peoplepicker" }, { "fieldName": "Completed By", "type": "peoplepicker" }], "disable": [{ "fieldName": "Assigned To", "type": "peoplepicker" }, { "fieldName": "Completed By", "type": "peoplepicker" }], "hide": [{ "divID": "completion" }, { "divID": "assignment" }] },
						],
					}, {
						"elementType": "field",
						"controlType": "text",
						"fieldName": "Request Status",
						"listFieldName": "RequestStatus",
						"labelContent": "Request Status",
						"disabledForNonAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["", "Submitted", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}, {
						"elementType": "field",
						"controlType": "textarea",
						"fieldName": "New Admin Notes",
						"labelContent": "Admin Notes"
					}, {
						"elementType": "field",
						"controlType": "textarea",
						"fieldName": "Historical Admin Notes",
						"labelContent": "Historical Admin Notes",
						"disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}, {
						"elementType": "markup",
						"tag": "div",
						"end": 1,
					}
				];

				var standardAdminAssignmentCompletionElements2 = [
					{
						"elementType": "markup",
						"tag": "div",
						"htmlID": "assignment",
						"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["", "Pending Approval"],
						"begin": 1,
					}, {
						"elementType": "markup",
						"tag": "h3",
						"content": 'Assignment',
						"begin": 1,
						"end": 1
					}, {
						"elementType": "field",
						"controlType": "peoplePicker",
						"fieldName": "Assigned To on Load",
						"labelContent": "Assigned To on Load",
						"yieldsViewPermissions": 1,
						"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"disabledForNonAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}, {
						"elementType": "field",
						"controlType": "peoplePicker",
						"fieldName": "Assigned To",
						"labelContent": "Assigned To",
						"listFieldName": "AssignedTo",
						"disabledForNonAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"]
					}, {
						"elementType": "field",
						"controlType": "datePicker",
						"fieldName": "Assignment Date",
						"labelContent": "Assignment Date",
						"listFieldName": "AssignmentDate",
						"friendlyFormatOnLoad": {
							'incomingFormat': null,
							'returnFormat': 'MMMM D, YYYY',
							'determineYearDisplayDynamically': 1
						},
						"isoFormatOnSubmit": {
							'incomingFormat': null,
							'returnFormat': null,
							'determineYearDisplayDynamically': null
						},
						"disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}, {
						"elementType": "markup",
						"tag": "div",
						"end": 1
					}, {
						"elementType": "markup",
						"tag": "div",
						"htmlID": "completion",
						"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"begin": 1,
					}, {
						"elementType": "markup",
						"tag": "h3",
						"content": 'Completion',
						"begin": 1,
						"end": 1
					}, {
						"elementType": "field",
						"controlType": "peoplePicker",
						"fieldName": "Completed By",
						"labelContent": "Completed By",
						"listFieldName": "CompletedBy",
						"disabledForNonAdmin": ["Pending Approval", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["Pending Approval", "Disapproved", "Cancelled"]
					}, {
						"elementType": "field",
						"controlType": "datePicker",
						"fieldName": "Completion Date",
						"labelContent": "Completion Date",
						"listFieldName": "CompletionDate",
						"friendlyFormatOnLoad": {
							'incomingFormat': null,
							'returnFormat': 'MMMM D, YYYY',
							'determineYearDisplayDynamically': 1
						},
						"isoFormatOnSubmit": {
							'incomingFormat': null,
							'returnFormat': null,
							'determineYearDisplayDynamically': null
						},
						"disabledForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForNonAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"],
						"hideForAdmin": ["", "Pending Approval", "Approved", "Completed", "Disapproved", "Cancelled"]
					}, {
						"elementType": "markup",
						"tag": "div",
						"end": 1,
					}
				];


				if (typeof (fData.standardElementGroups.standardAdminAssignmentCompletionElements.additionalAdminFields) != "undefined") {
					var standardAdminAssignmentCompletionElements = standardAdminAssignmentCompletionElements1.concat(fData.standardElementGroups.standardAdminAssignmentCompletionElements.additionalAdminFields).concat(standardAdminAssignmentCompletionElements2);
				} else {
					var standardAdminAssignmentCompletionElements = standardAdminAssignmentCompletionElements1.concat(standardAdminAssignmentCompletionElements2);
				}
			}

			if (fData.standardElementGroups.standardAdminElements != undefined) {

				var standardAdminElements1 = [
					{
						"elementType": "markup",
						"tag": "div",
						"htmlID": "admin",
						"content": '',
						"begin": 1,
						"hideForNonAdmin": ["", "Open", "Submitted", "Signed Up", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"],
						"hideForAdmin": [""]
					}, {
						"elementType": "markup",
						"tag": "h2",
						"content": 'Admin',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "div",
						"htmlID": "approval-notification-history",
						"begin": 1,
						"hideForNonAdmin": ["", "Open", "Submitted", "Signed Up", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"],
						"hideForAdmin": ["", "Open", "Submitted", "Signed Up", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"]
					}, {
						"elementType": "markup",
						"tag": "h3",
						"content": 'Approval Notification History',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "table",
						"htmlID": "table_approval-notification-history",
						"content": '  <thead>' +
							'		 <tr>' +
							'			  <th id="th_recipient">Recipient</th>' +
							'			  <th id="th_needed-or-not">Needed or Not Needed</th>' +
							'			  <th id="th_date">Date & Time</th>' +
							'		 </tr>' +
							'	</thead>' +
							'	<tbody>' +
							'	</tbody>',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "div",
						"end": 1,
					}, {
						"elementType": "markup",
						"tag": "h3",
						"content": 'Request Status and Notes',
						"begin": 1,
						"end": 1,
					}, {
						"elementType": "field",
						"controlType": "select",
						"fieldName": "Change Request Status",
						"labelContent": "Change Request Status",
						"setOptions": fData.standardElementGroups.standardAdminElements.changeRequestStatus,
						"hideForNonAdmin": ["Submitted", "Signed Up", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"],
						"hideForAdmin": ["Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"],
					}, {
						"elementType": "field",
						"controlType": "text",
						"fieldName": "Request Status",
						"listFieldName": "RequestStatus",
						"labelContent": "Request Status",
						"disabledForNonAdmin": ["", "Open", "Submitted", "Signed Up", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["", "Open", "Submitted", "Signed Up", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"]
					}, {
						"elementType": "field",
						"controlType": "textarea",
						"fieldName": "New Admin Notes",
						"labelContent": "Admin Notes"
					}, {
						"elementType": "field",
						"controlType": "textarea",
						"fieldName": "Historical Admin Notes",
						"labelContent": "Historical Admin Notes",
						"disabledForNonAdmin": ["", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"],
						"disabledForAdmin": ["", "In Development", "Pending Revision", "Pending Approval", "Approved", "Completed", "Credit Granted", "Credit Denied", "Archived", "Disapproved", "Cancelled"]
					}, {
						"elementType": "markup",
						"tag": "div",
						"end": 1
					}
				];

				if (typeof (fData.standardElementGroups.standardAdminElements.additionalAdminFields) != "undefined") {
					var standardAdminElements = standardAdminElements1.concat(fData.standardElementGroups.standardAdminElements.additionalAdminFields);
				} else {
					var standardAdminElements = standardAdminElements1;
				}
			}

			var standardAssignmentElements = [
				{
					"elementType": "markup",
					"tag": "div",
					"htmlID": "assignment",
					"hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Approval"],
					"begin": 1,
				}, {
					"elementType": "markup",
					"tag": "h3",
					"content": 'Assignment',
					"begin": 1,
					"end": 1
				}, {
					"elementType": "field",
					"controlType": "peoplePicker",
					"fieldName": "Assigned To on Load",
					"labelContent": "Assigned To on Load",
					"yieldsViewPermissions": 1,
					"hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"disabledForNonAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "peoplePicker",
					"fieldName": "Assigned To",
					"labelContent": "Assigned To",
					"listFieldName": "AssignedTo",
					"disabledForNonAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Pending Approval", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "datePicker",
					"fieldName": "Assignment Date",
					"labelContent": "Assignment Date",
					"listFieldName": "AssignmentDate",
					"friendlyFormatOnLoad": {
						'incomingFormat': null,
						'returnFormat': 'MMMM D, YYYY',
						'determineYearDisplayDynamically': 1
					},
					"isoFormatOnSubmit": {
						'incomingFormat': null,
						'returnFormat': null,
						'determineYearDisplayDynamically': null
					},
					"disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"end": 1
				}
			];

			var standardCompletionElements = [
				{
					"elementType": "markup",
					"tag": "div",
					"htmlID": "completion",
					"hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"begin": 1,
				}, {
					"elementType": "markup",
					"tag": "h3",
					"content": 'Completion',
					"begin": 1,
					"end": 1
				}, {
					"elementType": "field",
					"controlType": "peoplePicker",
					"fieldName": "Completed By",
					"labelContent": "Completed By",
					"listFieldName": "CompletedBy",
					"disabledForNonAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["Pending Approval", "Name Change Pending Approval; Other Work Approved", "Disapproved", "Cancelled"]
				}, {
					"elementType": "field",
					"controlType": "datePicker",
					"fieldName": "Completion Date",
					"labelContent": "Completion Date",
					"listFieldName": "CompletionDate",
					"friendlyFormatOnLoad": {
						'incomingFormat': null,
						'returnFormat': 'MMMM D, YYYY',
						'determineYearDisplayDynamically': 1
					},
					"isoFormatOnSubmit": {
						'incomingFormat': null,
						'returnFormat': null,
						'determineYearDisplayDynamically': null
					},
					"disabledForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"disabledForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForNonAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"]
				}, {
					"elementType": "markup",
					"tag": "div",
					"end": 1,
				}
			];

			var standardButtonElements = [
				{
					"elementType": "markup",
					"tag": "div",
					"htmlID": "submit-or-exit",
					"content": '	<div class="label-and-control">' +
						'	 <div class="label"></div>' +
						'	 <div class="field-type-indication"></div>' +
						'	 <div class="control">' +
						'		<div id="submission-notice">Please check your information before saving it. ' +
						'			You won\'t be able to make edits afterward.</div>' +
						'		<a data-button-type="save" id="form-submit-button">Save</a>' +
						'	</div>' +
						'	</div>' +
						'	<div class="label-and-control">' +
						'		<div class="label"></div>' +
						'		<div class="field-type-indication"></div>' +
						'		<div class="control"><a data-button-type="noSave" id="exit-sans-save-button">Don\'t Save</a></div>' +
						'	</div>',
					"begin": 1,
					"end": 1,
					"hideForNonAdmin": ["Completed", "Disapproved", "Cancelled"]
				}
			];

			var standardButtonElementsInitiallyHidden = [
				{
					"elementType": "markup",
					"tag": "div",
					"htmlID": "submit-or-exit",
					"content": '	<div class="label-and-control">' +
						'	 <div class="label"></div>' +
						'	 <div class="field-type-indication"></div>' +
						'	 <div class="control">' +
						'		<div id="submission-notice">Please check your information before saving it. ' +
						'			You won\'t be able to make edits afterward.</div>' +
						'		<a data-button-type="save" id="form-submit-button">Save</a>' +
						'	</div>' +
						'	</div>' +
						'	<div class="label-and-control">' +
						'		<div class="label"></div>' +
						'		<div class="field-type-indication"></div>' +
						'		<div class="control"><a data-button-type="noSave" id="exit-sans-save-button">Don\'t Save</a></div>' +
						'	</div>',
					"begin": 1,
					"end": 1,
					"hideForAdmin": [""],
					"hideForNonAdmin": ["", "Completed", "Disapproved", "Cancelled"]
				}
			];

			var standardComponentGrpAdminOnlyElements = [
				{
					"elementType": "markup",
					"tag": "div",
					"htmlID": "component-group-admin-only",
					"begin": 1,
					"hideForNonAdmin": ["", "Submitted", "In Development", "Pending Revision", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
					"hideForAdmin": ["", "Submitted", "In Development", "Pending Revision", "Pending Approval", "Name Change Pending Approval; Other Work Approved", "Approved", "Completed", "Disapproved", "Cancelled"],
				}, {
					"elementType": "field",
					"controlType": "textarea",
					"fieldName": "Approval Nodes Storage",
					"labelContent": "Approval Nodes Storage"
				}, {
					"elementType": "field",
					"controlType": "textarea",
					"fieldName": "Approval Nodes Script Storage",
					"labelContent": "Approval Nodes Script Storage"
				}, {
					"elementType": "field",
					"controlType": "textarea",
					"fieldName": "Approval Notification Rows Storage",
					"labelContent": "Approval Notification Rows Storage"
				}, {
					"elementType": "field",
					"controlType": "textarea",
					"fieldName": "Approval Notification Rows Storage",
					"labelContent": "Approval Notification Rows Storage"
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Beginning of Life",
					"labelContent": "Beginning of Life",
					"listFieldName": "BeginningOfLife",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "End of Life",
					"labelContent": "End of Life",
					"listFieldName": "EndOfLife",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Approval Newly Needed Notify",
					"labelContent": "Approval Newly Needed Notify",
					"listFieldName": "ApprovalNewlyNeededNotify",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Approval Not Needed Notify",
					"labelContent": "Approval Not Needed Notify",
					"listFieldName": "ApprovalNotNeededNotify",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Approval Still Needed Notify",
					"labelContent": "Approval Still Needed Notify",
					"listFieldName": "ApprovalStillNeededNotify",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Newly Approved or Pending",
					"labelContent": "Newly Approved or Pending",
					"listFieldName": "NewlyApprovedOrPending",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Auto Assignments 1",
					"labelContent": "Auto Assignments 1",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Auto Assignments 2",
					"labelContent": "Auto Assignments 2",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Work Newly Needed Notify",
					"labelContent": "Work Newly Needed Notify",
					"listFieldName": "WorkNewlyNeededNotify",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Work Not Needed Notify",
					"labelContent": "Work Not Needed Notify",
					"listFieldName": "WorkNotNeededNotify",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Newly Assigned",
					"labelContent": "Newly Assigned",
					"listFieldName": "NewlyAssigned",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Last Modified Timestamp at Load",
					"labelContent": "Last Modified Timestamp at Load",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Last Modified Timestamp at Submit",
					"labelContent": "Last Modified Timestamp at Submit",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Last Modified Timestamp Mismatch",
					"labelContent": "Last Modified Timestamp Mismatch",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Admin Email",
					"labelContent": "Admin Email",
					"listFieldName": "AdminEmail",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Request Name",
					"labelContent": "Request Name",
					"listFieldName": "RequestName",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Required Approvers",
					"labelContent": "Required Approvers",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "URI Admin",
					"labelContent": "URI Admin",
					"listFieldName": "URIAdmin",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "URI Requester",
					"labelContent": "URI Requester",
					"listFieldName": "URIRequester",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "URI Request",
					"labelContent": "URI Request",
					"listFieldName": "URIRequest",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "SWF Version",
					"labelContent": "SWF Version",
					"listFieldName": "SWFVersion"
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Request Version",
					"labelContent": "Request Version",
					"listFieldName": "RequestVersion"
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Component Group Admin",
					"labelContent": "Component Group Admin",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Component Admin",
					"labelContent": "Component Admin",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "View Access",
					"labelContent": "View Access",
					"yieldsViewPermissions": 1,
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Current User Display Name",
					"labelContent": "Current User Display Name",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Current User Name",
					"labelContent": "Current User Name",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Current User Account",
					"labelContent": "Current User Account",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Current User is Admin",
					"labelContent": "Current User is Admin",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Current User is Component Group Admin",
					"labelContent": "Current User is Component Group Admin",
				}, {
					"elementType": "field",
					"controlType": "textarea",
					"fieldName": "User Machine History",
					"labelContent": "User Machine History",
				}, {
					"elementType": "field",
					"controlType": "text",
					"fieldName": "Component ID",
					"labelContent": "Component ID",
				}, {
					"elementType": "markup",
					"tag": "div",
					"end": 1,
				}
			];

			if (typeof (fData.standardElementGroups) != "undefined") {

				if (fData.standardElementGroups.standardPrintButton != undefined) {
					fData.elements = standardPrintButton;
				} else {
					fData.elements = [];
				}

				if (fData.standardElementGroups.standardThisRequestAndRequesterElements != undefined) {
					fData.elements = fData.elements.concat(standardThisRequestAndRequesterElements);
				}

				fData.elements = fData.elements.concat($().ReturnUniqueElementsOfCorrectVersion());

				if (fData.standardElementGroups.standardApprovalElements != undefined) {
					fData.elements = fData.elements.concat(standardApprovalElements);
				}

				if (fData.standardElementGroups.standardAdminAssignmentCompletionElements != undefined) {
					fData.elements = fData.elements.concat(standardAdminAssignmentCompletionElements);
				}

				if (fData.standardElementGroups.standardAdminElements != undefined) {
					fData.elements = fData.elements.concat(standardAdminElements);
				}

				if (fData.standardElementGroups.standardAdminNotesElements != undefined) {
					fData.elements = fData.elements.concat(standardAdminNotesElements);
				}

				if (fData.standardElementGroups.standardAssignmentElements != undefined) {
					fData.elements = fData.elements.concat(standardAssignmentElements);
				}

				if (fData.standardElementGroups.standardCompletionElements != undefined) {
					fData.elements = fData.elements.concat(standardCompletionElements);
				}

				if (fData.standardElementGroups.standardButtonElements != undefined) {
					fData.elements = fData.elements.concat(standardButtonElements);
				}

				if (fData.standardElementGroups.standardButtonElementsInitiallyHidden != undefined) {
					fData.elements = fData.elements.concat(standardButtonElementsInitiallyHidden);
				}

				if (fData.standardElementGroups.standardComponentGrpAdminOnlyElements != undefined) {
					fData.elements = fData.elements.concat(standardComponentGrpAdminOnlyElements);
				}
			}


			// ========================================================
			// ENSURE VIEW PERMISSION
			// ========================================================

			// if request status != '' and user is not an admin
			if (rData.requestStatus != "" && uData.isAdmin === 0) {

				var permitted = []; // array of non-admin users who have permission to view the form
				var hasViewingPermissionThisRequest = 0; // this user's permission flag
				// for each element
				$.each(fData.elements, function (i, elem) {
					// if it yields view permissions
					if (typeof (elem.yieldsViewPermissions) != "undefined" && elem.yieldsViewPermissions === 1) {
						// push its value to permitted
						if (typeof (rData.formData[$().ReturnHyphenatedFieldNameOrValue(elem.fieldName)]) === 'string') {
							permitted.push(rData.formData[$().ReturnHyphenatedFieldNameOrValue(elem.fieldName)]);
						} else if (typeof (rData.formData[$().ReturnHyphenatedFieldNameOrValue(elem.fieldName)]) === 'object') {
							$.each(rData.formData[$().ReturnHyphenatedFieldNameOrValue(elem.fieldName)], function (i, p) {
								permitted.push(p.account);
							});
						}
					}
				});
				$.each(permitted, function (i, p) {
					if (StrInStr(p, uData.account)) {
						hasViewingPermissionThisRequest = 1;
					}
				});
				if (hasViewingPermissionThisRequest === 0 && typeof (fData.additionalViewPermissionsFunction) != "undefined") {
					hasViewingPermissionThisRequest = CallFunctionFromString(fData.additionalViewPermissionsFunction, { "rData": rData });
				}
				if (hasViewingPermissionThisRequest === 0) {
					$('div#overlays-screen-container').fadeIn(200);
					$('div#mos-form-no-view-permission').fadeIn(400);
					return;
				}
			}



			// ========================================================
			// BUILD FORM MARKUP & PARTIAL SCRIPT; INSERT FORM MARKUP
			// ========================================================

			var formMarkup = '';

			var formScript = '';

			$.each(fData.elements, function (i, elem) {

				switch (elem.elementType) {
					case "field":

						switch (elem.controlType) {

							case "text":
								formMarkup += $().BuildTextField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "textarea":
								formMarkup += $().BuildTextAreaField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "select":
								formMarkup += $().BuildSelectField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "listItemChooser":
								formMarkup += $().BuildListItemChooserField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "buttonWithLabel":
								formMarkup += $().BuildButtonWithLabelField(elem);
								break;

							case "peoplePicker":
								formMarkup += $().BuildPeoplePickerField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "radio":
							case "check":
								formMarkup += $().BuildRadioButtonsOrCheckboxes(elem);
								formScript += $().BuildScript(elem);
								break;

							case "datePicker":
								formMarkup += $().BuildDatePicker(elem);
								formScript += $().BuildScript(elem);
								break;

							case "time":
								formMarkup += $().BuildTime(elem);
								formScript += $().BuildScript(elem);
								break;

							case "datetime":
								formMarkup += $().BuildDatetime(elem);
								formScript += $().BuildScript(elem);
								break;

							case "file":
								formMarkup += $().BuildFileField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "mosFile":
								formMarkup += $().BuildMOSFileField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "legacyFileSet":
								formMarkup += $().BuildLegacyFileSetField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "url":
								formMarkup += $().BuildURLField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "phone":
								formMarkup += $().BuildPhoneField(elem);
								formScript += $().BuildScript(elem);
								break;

							case "hidden":
								formMarkup += $().BuildHiddenField(elem);
								formScript += $().BuildScript(elem);
								break;
						}
						break;

					case "multifield":
						formMarkup += $().BuildMultifield(elem);
						formScript += $().BuildScript(elem);
						break;

					case "markup":
						formMarkup += $().BuildMarkup(elem);
						formScript += $().BuildScript(elem);
						break;
				}
			});

			// insert base markup into form container div
			$("div#request-screen-container").append('<div id="request-form">' + formMarkup + '</div>');

			// insert approval nodes, if any
			if (rData.requestID != "" && rData.requestID > 0) {
				if (typeof (rData.formData['Approval-Nodes-Storage']) != 'undefined') {
					$("div#all-approvals").html(HtmlDecode(rData.formData['Approval-Nodes-Storage']));
				}
			}

			/*
				// consider

				if (rData.requestID != "" && rData.requestID > 0) {
					if (mData.requestName != "GSE Signup") {
						if (typeof(rData.formData['Approval-Nodes-Storage']) != 'undefined') {
							$("div#all-approvals").html(HtmlDecode(rData.formData['Approval-Nodes-Storage']));
						}
					}
				}
			*/

			// add a class to form container div to serve as styling hook
			$("div#request-form, div#overlays-screen-container").addClass(ReplaceAll("\\.", "", ReplaceAll(" ", "-", mData.requestName)).toLowerCase());

			// ========================================================
			// CREATE, FORMAT FORM FIELD CONTROLS
			// ========================================================

			// for each div with relevant attribute, create PeoplePicker control
			$("div[data-control-type='PeoplePicker']").each(function () {
				var peoplePickerDiv = $(this).attr("ID");
				InitializePeoplePicker(peoplePickerDiv);
			});

			// format field requirements
			//		do this before populating form; population will repeat the original, as needed;
			//		assumption here is that if the original is required, then all repeats should be required, too;
			//		therefore, require the original before repeating it
			$('div#request-form').find('.required').each(function () {
				$(this).SetFieldToRequired($(this).attr("id"));
			});

			// disable appropriate fields
			//		do this before populating form; population will repeat the original, as needed;
			//		assumption here is that if the original is disabled, then all repeats should be disabled, too;
			//		therefore, disable the original before repeating it
			$('div#request-form').find('.disabled').each(function () {
				$(this).SetFieldToDisabled('#' + $(this).attr("id"));
			});

			// load select options, set datepickers on appropriate fields
			$.each(fData.elements, function (i, elem) {

				if (elem.controlType === "select") {
					if (typeof (elem.loadOptions) != "undefined") {
						if (typeof (elem.restrictions) === "undefined") {
							$("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions(elem.loadOptions);
						} else {
							$("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions(elem.loadOptions, elem.restrictions);
						}
					}
				}
				if (elem.controlType === "datePicker") {
					// if this field is not readonly or disabled
					if (!($("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("readonly")) && !($("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("disabled"))) {
						$("#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).datepicker({
							changeMonth: "true",
							changeYear: "true",
							dateFormat: "MM d, yy"
						});
					}
				}
				if (elem.controlType === "datetime") {
					// if this field is not readonly or disabled
					if (!($("#date-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("readonly")) && !($("#date-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)))[0].hasAttribute("disabled"))) {
						$("#date-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).datepicker({
							changeMonth: "true",
							changeYear: "true",
							dateFormat: "MM d, yy"
						});
					}
				}
				if (elem.controlType === "datetime" || elem.controlType === "time") {
					if (typeof (elem.hoursRestrictions) === "undefined") {
						$("#hours-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
							listName: "Hours",
							firstOptionText: "",
							displayField: "Title",
							valueField: "fy2v",
							orderField: "Order",
						});
					} else {
						$("#hours-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
							listName: "Hours",
							firstOptionText: "",
							displayField: "Title",
							valueField: "fy2v",
							orderField: "Order",
							restrictions: elem.hoursRestrictions
						});
					}
					if (typeof (elem.minutesRestrictions) === "undefined") {
						$("#minutes-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
							listName: "Minutes",
							firstOptionText: "",
							displayField: "Title",
							valueField: "amky",
							orderField: "Order"
						});
					} else {
						$("#minutes-input_" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName))).LoadSelectOptions({
							listName: "Minutes",
							firstOptionText: "",
							displayField: "Title",
							valueField: "amky",
							orderField: "Order",
							restrictions: elem.minutesRestrictions
						});
					}
				}
			});



			// ========================================================
			// POPULATE FORM FIELDS & SCRIPT TAG
			// ========================================================

			var approvalNodeScripts = '';

			// if request is new and there is default data for new requests
			if (rData.requestStatus == "" && typeof (rData.defaultDataForNewRequests) != "undefined") {
				PopulateFormData("div#request-form", rData.defaultDataForNewRequests, mData.uriRoot, rData.requestID);
			}

			// if request is not new
			if (rData.requestStatus != "") {

				// set stored object's data, if any
				if (typeof (rData.formData) != "undefined") {
					PopulateFormData("div#request-form", rData.formData, mData.uriRoot, rData.requestID, mData.checkForAlternateEventDataToPopulate);
				}

				// set rData and mData values that are displayed to user
				$("input#Request-ID").val(rData.requestID);
				$("input#Request-Status").val(rData.requestStatus);
				$("a.link_admin-email").attr("href", "mailto:" + mData.adminEmailString);

				// set notification history rows, if any
				if (typeof ($('textarea#Approval-Notification-Rows-Storage').val()) != "undefined") {
					$("table#table_approval-notification-history tbody").append($('textarea#Approval-Notification-Rows-Storage').val());
				}

				// get approval node scripts, if any
				if (typeof ($('textarea#Approval-Nodes-Script-Storage').val()) != "undefined") {
					approvalNodeScripts += ReplaceAll("'", "", $('textarea#Approval-Nodes-Script-Storage').val());
				}
			}

			// if this is a GSE Signup (either new or existing)
			if (mData.requestName == "GSE Signup") {
				// if this is an existing GSE Signup, in which case a GSE Schedule ID was not specified in the URL 
				if (rData.requestStatus != "") {
					// extract the schedule ID from the saved request data
					rData.gseScheduleID = rData.formDataOnLoad['Schedule-ID'];
				}
				// get the relevant job data
				rData = $.extend(
					rData,
					$().GetFieldsFromOneRow({
						"select": [{
							"nameHere": "gseJobID",
							"nameInList": "JobID"
						}, {
							"nameHere": "gseScheduleData",
							"nameInList": "AllRequestData"
						}],
						"webURL": "https://bmos.sharepoint.com/sites/hr-service-schedules",
						"where": {
							"field": "ID",
							"type": "Number",
							"value": rData.gseScheduleID,
						}
					})
				);
				// get the relevant schedule data
				rData = $.extend(
					rData,
					$().GetFieldsFromOneRow({
						"select": [{
							"nameHere": "gseJobData",
							"nameInList": "AllRequestData"
						}],
						"webURL": "https://bmos.sharepoint.com/sites/hr-service-jobs",
						"where": {
							"field": "ID",
							"type": "Number",
							"value": rData.gseJobID,
						}
					})
				);
				// delete schedule and job request statuses so that they don't get used as / confused with this signup's status
				delete rData.gseJobData['Request-Status'];
				delete rData.gseScheduleData['Request-Status'];
				// calculate positions remaining

				// prep some of the data before populating fields and placeholders with it
				var otherSignupsForThisSchedule = $().GetFieldsFromSpecifiedRows({
					"select": [{
						"nameHere": "anotherSignupIDThisSchedule",
						"nameInList": "ID"
					}],
					"where": {
						"ands": [
							{
								"field": "ScheduleID",
								"type": "Text",
								"value": rData.gseScheduleID,
							}, {
								"field": "RequestStatus",
								"type": "Text",
								"value": "Signed Up",
							}
						]
					}
				});
				rData.gseScheduleData['Positions-Available'] =
					parseInt(rData.gseScheduleData['Number-of-Positions']) - otherSignupsForThisSchedule.length;
				rData.gseScheduleData['Friendly-Date'] = $().ReturnFormattedDateTime(rData.gseScheduleData['Date'], null, 'dddd, MMMM D, YYYY', 1);
				rData.gseScheduleData['Shift-Length'] = rData.gseScheduleData['shiftlength_35-hours'] ? '3.5 hours' : '7 hours';
				rData.gseScheduleData['Start-Time'] = $().ReturnFormattedDateTime(rData.gseScheduleData['time-storage_StartTime'], null, 'h:mm a');
				rData.gseScheduleData['Break-Time'] = $().ReturnFormattedDateTime(rData.gseScheduleData['time-storage_BreakTime'], null, 'h:mm a');
				rData.gseScheduleData['Meal-Time'] = $().ReturnFormattedDateTime(rData.gseScheduleData['time-storage_MealTime'], null, 'h:mm a');

				rData.gseJobData['Job-Admin-Name'] = rData.gseJobData['Job-Admin'][0].description;
				rData.gseJobData['Job-Description-Formatted'] = '<p>' + ReplaceAll('%0A', '</p><p>', rData.gseJobData['Job-Description']) + '</p>';
				if (rData.gseJobData['Training-Requirements']) {
					rData.gseJobData['Training-Requirements-Formatted'] = '<p>' + ReplaceAll('%0A', '</p><p>', rData.gseJobData['Training-Requirements']) + '</p>';
				}
				if (rData.gseJobData['Dress-Requirements']) {
					rData.gseJobData['Dress-Requirements-Formatted'] = '<p>' + ReplaceAll('%0A', '</p><p>', rData.gseJobData['Dress-Requirements']) + '</p>';
				}

				var opportunityJobDuties = [];
				rData.gseJobData.RepeatedElements.forEach((repeatElement) => {
					// console.log('repeatElement');
					// console.log(repeatElement);
					if (StrInStr(repeatElement.ID, 'gse-job-duty') != -1) {
						// console.log('found a duty');
						var repeatElementKeys = Object.keys(repeatElement);
						// console.log('repeatElementKeys');
						// console.log(repeatElementKeys);
						repeatElementKeys.forEach((repeatElementKey) => {
							if (StrInStr(repeatElementKey, 'Job-Duty')) {
								opportunityJobDuties.push(repeatElement[repeatElementKey]);
							}
						});
					}
				});

				var opportunityJobDutyElement = opportunityJobDuties[1] ? 'li' : 'p';

				rData.gseJobData['Job-Duties-List-Items'] = '';

				opportunityJobDuties.forEach((opportunityJobDuty) => {
					rData.gseJobData['Job-Duties-List-Items'] += '			<' + opportunityJobDutyElement + '>' + opportunityJobDuty + '</' + opportunityJobDutyElement + '>';
				});

				console.log('rData.gseScheduleData');
				console.log(rData.gseScheduleData);
				console.log('rData.gseJobData');
				console.log(rData.gseJobData);

				// populate the placeholder <span>s with job and schedule data
				PopulateFormData("div#request-form", rData.gseJobData, mData.uriRoot, rData.requestID, mData.checkForAlternateEventDataToPopulate);
				PopulateFormData("div#request-form", rData.gseScheduleData, mData.uriRoot, rData.requestID, mData.checkForAlternateEventDataToPopulate);
			}

			// if this is a *new* GSE Signup
			if (rData.requestStatus == "" && mData.requestName == "GSE Signup" && rData.gseScheduleID != "" && rData.gseScheduleID > 0) {
				// manually populate specific signup fields with user, job, and schedule data
				$("input#Request-Nickname").val(rData.gseJobID + '-' + rData.gseScheduleID + '-' + ReplaceAll('@mos.org', '', uData.userName));
				$("input#Job-ID").val(rData.gseJobID);
				$("input#Schedule-ID").val(rData.gseScheduleID);
			}

			// if this is an *existing* GSE Signup
			if (rData.requestStatus != "" && mData.requestName == "GSE Signup") {
				// manually copy some admin data to requester-accessible fields
				$("input#Request-Status-for-Requester").val(rData.requestStatus);
				$("textarea#Credit-Denial-Reason-for-Requester").val(rData.formDataOnLoad['Credit-Denial-Reason']);
			}

			// if request is new
			if (rData.requestStatus === '') {

				// set current user's data as requester's data
				$('input#Requester-Name').val(uData.name);
				$('input#Requester-Department').val(uData.dept);
				$('input#Requester-Email').val(uData.email.toLowerCase());
				$('input#Requester-Phone').val(uData.phone);
				$('input#Requester-Account').val(uData.account);

				// if designated, set current user's dept as event dept
				if (typeof (mData.autoPopulateEventDeparment) != 'undefined' && mData.autoPopulateEventDeparment === 1) {
					$('input#Event-Department').val(uData.dept);
				}

				// set required approvers
				$("input#Required-Approvers").val(mData.requiredApproversString);

				// if alwaysTalkToRequester, populate and hide relevant fields
				if (typeof (fData.alwaysTalkToRequester) != 'undefined' && fData.alwaysTalkToRequester === 1) {

					$('option[value="Self"]').prop('selected', true);
					$().PutAddtlPeopleInPicker('Requested For', [{
						'name': uData.name,
						'email': uData.email,
						'account': uData.account
					}]);
					$("div#label-and-control_Self-or-Other").hide("fast").addClass("hidden");
				}

			}

			// set "button" link href
			$("a.link_exit, a.link_exit-sans-save").attr("href", rData.returnURI);

			// set field values for developer's convenience and to record version numbers
			$("input#Last-Modified-Timestamp-at-Load").val(rData.lastModifiedAtLoad);
			$("input#Admin-Email").val(mData.adminEmailString);
			$("input#Request-Name").val(mData.requestName);
			$("input#Auto-Assignments-1").val(mData.autoAssignments1);
			$("input#Auto-Assignments-2").val(mData.autoAssignments2);
			$("input#URI-Admin").val(mData.uriAdmin);
			$("input#URI-Requester").val(mData.uriRequester);
			$("input#URI-Request").val(mData.uriRequest);
			if (rData.requestStatus === '') {
				$("input#SWF-Version").val(mData.apiLatestVersion);
				$("input#Request-Version").val(mData.currentRequestVersion);
			}
			$("input#Component-Group-Admin").val(mData.componentGrpAdmin);
			$("input#Component-Admin").val(mData.componentAdmin);
			$("input#Current-User-Display-Name").val(uData.name);
			$("input#Current-User-Name").val(uData.userName);
			$('input#Current-User-Account').val(uData.Name);
			$("input#Current-User-is-Admin").val(uData.isAdmin);
			$("input#Current-User-is-Component-Group-Admin").val(uData.isComponentGrpAdmin);
			$("input#Component-ID").val(mData.componentID);
			// concatenate built and stored scripts and append inside script#request-form-script




			$("div#request-screen-container").append('<script id="request-form-script" type="text/javascript"> \n\n$( document ).ready(function() { \n\n' + fData.CustomScriptFirst + '\n\n' + formScript + '\n\n' + approvalNodeScripts + '\n\n' + fData.CustomScriptLast + '\n\n}); \n\n</script> \n');



			// ========================================================
			// CLEAR FORM FIELDS
			// ========================================================

			$("input#Last-Modified-Timestamp-at-Submit").val();
			$("input#Last-Modified-Timestamp-Mismatch").val();
			$("select#Change-Request-Status").val();
			$("input#requester-reversion-to-pending-revision_revert").prop('checked', false).attr("checked", false);
			$("input#requester-restart-approval-process_ready").prop('checked', false).attr("checked", false);
			$("textarea#Admin-To-Requester-Message-Addendum").val();
			$("input#Approval-Newly-Needed-Notify").val("none");
			$("input#Approval-Not-Needed-Notify").val("none");
			$("input#Approval-Still-Needed-Notify").val("none");
			$("input#Newly-Approved-or-Pending").val(0);

			if (rData.requestStatus != "") {

				// clear stuff that's only for new requests
				$("input#Required-Approvers").val();
				$("input#Beginning-of-Life").val();

			}



			// ========================================================
			// FORMAT FORM
			// ========================================================

			// set friendly formats on date fields designated in mData.elements
			$.each(fData.elements, function (i, elem) {

				// if element needs its date value formatted on load
				if (typeof (elem.friendlyFormatOnLoad) != "undefined") {

					// determine the date field selector from the element's other properties
					var fieldSelector = "#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName));

					// if the field has a value
					if (typeof ($(fieldSelector).val()) != "undefined" && $(fieldSelector).val() != "") {
						// console.log("this field has a value");

						// if the field is disabled or readonly
						if (typeof ($(fieldSelector).attr('disabled')) != "undefined" || typeof ($(fieldSelector).attr('readonly')) != "undefined") {
							// console.log("this field is disabled/RO");

							// if this date needs to be re-stored in iso format
							if (typeof (elem.isoFormatOnSubmit) != "undefined") {
								// console.log("has isoFormatOnSubmit");
								// store the db-stored date in the markup
								//		(it'll be re-used for db storage upon submit, in case 
								//		 friendly format doesn't include year)
								$(fieldSelector).attr('data-iso-date-on-load', $(fieldSelector).val());
							}
						}
						// get the formatted value using the field value and the properties of friendlyFormatOnLoad
						$(fieldSelector).val($().ReturnFormattedDateTime($(fieldSelector).val(), elem.friendlyFormatOnLoad.incomingFormat, elem.friendlyFormatOnLoad.returnFormat, elem.friendlyFormatOnLoad.determineYearDisplayDynamically));
					}
				}

				// if element needs its date value formatted on load
				if (typeof (elem.setDateFromURLOnLoad) != "undefined") {

					// determine the date field selector from the element's other properties
					var fieldSelector = "#" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName));

					// get the iso-formatted date from the URL
					var dateToSetISO = GetParamFromUrl(location.search, elem.setDateFromURLOnLoad.parameter);

					// get the date in friendly format (datepicker-matching format)
					var dateToSetSpecifiedFormat = $().ReturnFormattedDateTime(dateToSetISO, null, elem.setDateFromURLOnLoad.returnFormat, elem.setDateFromURLOnLoad.determineYearDisplayDynamically);

					// set the field
					$(fieldSelector).val(dateToSetSpecifiedFormat);
				}
			});

			// show approval notification history if it contains data
			if ($("table#table_approval-notification-history tbody tr").length) {
				$("div#approval-notification-history").show("fast").removeClass("hidden");
			}

			// show assignment date if it contains data
			if ($("input#Assignment-Date").val() != "") {
				$("div#label-and-control_Assignment-Date").show("fast").removeClass("hidden");
			}

			// show completion date if it contains data
			if ($("input#Completion-Date").val() != "") {
				$("div#label-and-control_Completion-Date").show("fast").removeClass("hidden");
			}

			// append approvalPreface, if appropriate
			if (typeof (mData.approvalPreface) != 'undefined') {
				$('div#swf-specific-approval-preface').html(mData.approvalPreface);
			}

			// enable approval radio buttons and notes for this user, as relevant
			if (rData.endOfLife != 1) {
				$('div[data-approver-email="' + uData.email.toLowerCase() + '"] input[name^="Approval-Indicator_"]').prop("disabled", false);
				$('div[data-approver-email="' + uData.email.toLowerCase() + '"] textarea[id^="Approval-Notes_"]').prop("disabled", false);
			}

			// if request is at end of life and there are no approval nodes, hide 'Approvals' header
			if (rData.endOfLife === 1 && $("div#all-approvals").children().length === 0) {
				$('h2#header_approvals').addClass('hidden');
			}

			// if there are no historical admin notes, hide the textarea
			//		(otherwise, it breaks up the vertical rhythm)
			if (typeof ($('textarea#Historical-Admin-Notes').val()) === 'undefined') {
				$('div#label-and-control_Historical-Admin-Notes').addClass('hidden');
			} else if ($('textarea#Historical-Admin-Notes').val() === '') {
				$('div#label-and-control_Historical-Admin-Notes').addClass('hidden');
			}

			// if there are no historical other preservable notes, hide the textarea
			//		(otherwise, it breaks up the vertical rhythm)
			if (typeof ($('textarea#Historical-Other-Preservable-Notes').val()) === 'undefined') {
				$('div#label-and-control_Historical-Other-Preservable-Notes').addClass('hidden');
			} else if ($('textarea#Historical-Other-Preservable-Notes').val() === '') {
				$('div#label-and-control_Historical-Other-Preservable-Notes').addClass('hidden');
			}

			// if there are historical admin notes, resize the textarea to fit all of them
			if (typeof ($('textarea#Historical-Admin-Notes').val()) != 'undefined' && $('textarea#Historical-Admin-Notes').val() != '') {
				$().ResizeTextareaToFitAllContents('Historical-Admin-Notes');
			}

			// if there are historical other preservable notes, resize the textarea to fit all of them
			if (typeof ($('textarea#Historical-Other-Preservable-Notes').val()) != 'undefined' && $('textarea#Historical-Other-Preservable-Notes').val() != '') {
				$().ResizeTextareaToFitAllContents('Historical-Other-Preservable-Notes');
			}

			// if RS = Completed, show completion info
			if (rData.requestStatus === "Completed") {
				$("div#completion").removeClass("hidden");
			}

			// for each mos file field
			$("div.mos-drag-and-drop-file-attachment").each(function () {
				var thisFileFieldID = $(this).attr("ID");
				var thisFileName = $("div#" + thisFileFieldID).find("input.mos-drag-and-drop-file-name").val();

				// if the hidden inputs have been populated with data by PopulateFormData(), then set the UI to present the file info to the 
				if (typeof (thisFileName) == "string" && thisFileName != "") {

					var thisFileIsInQuarkFiles = $("div#" + thisFileFieldID).find("input.mos-drag-and-drop-file-in-quark-files").val();
					var thisFileURI = "";

					if (thisFileIsInQuarkFiles == "1") {
						var legacyID = $("input#legacy-id").val();
						thisFileURI = mData.fullSiteBaseURL + "/QuarkFiles/" + legacyID + "/" + thisFileName;
					} else {
						thisFileURI = mData.fullSiteBaseURL + "/Lists/SWFList/Attachments/" + rData.requestID + "/" + thisFileName;
					}

					var fileInputID = $("#" + thisFileFieldID).find("div.mos-drag-and-drop-file-input").attr("id");
					var thisfileNameFormatted = ReplaceAll(' ', '%20', thisFileName);

					var thisFileSize = $("div#" + thisFileFieldID).find("input.mos-drag-and-drop-file-size").val();
					var thisFileTypeClass = $("div#" + thisFileFieldID).find("input.mos-drag-and-drop-file-type-class").val();
					var filePresentationContainerID = $("#" + thisFileFieldID).find("a.mos-drag-and-drop-file-container").attr("id");
					var fileUploadIconID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-upload-icon").attr("id");
					var filePreviewID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-preview").attr("id");
					var fileNameAndSizePresentationID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-name-and-size").attr("id");
					var fileControlID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-control").attr("id");
					var progressBarID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-progress progress").attr("id");

					// set the UI
					$("#" + fileNameAndSizePresentationID).find("div.mos-drag-and-drop-file-name").text(thisFileName);
					$("#" + fileNameAndSizePresentationID).find("div.mos-drag-and-drop-file-size").text(thisFileSize);
					$("#" + thisFileFieldID).removeClass("populatable").addClass("attached");
					if (thisFileTypeClass == "specific-image") {
						$("#" + filePreviewID).css("background-image", "url(" + thisFileURI + ")");
					}
					$("#" + filePreviewID).addClass(thisFileTypeClass);
					$("#" + filePresentationContainerID).attr("href", thisFileURI);
				}
			});


			// modify submission notice & button text, as needed
			if (typeof (fData.conditionalSubmissionNoticesAndButtonValues) != "undefined") {
				$.each(fData.conditionalSubmissionNoticesAndButtonValues, function (i, noticeAndORValue) {
					if (noticeAndORValue.condition()) {
						if (typeof (noticeAndORValue.submissionNotice) != "undefined") {
							$("div#submission-notice").html(noticeAndORValue.submissionNotice);
						}
						if (typeof (noticeAndORValue.buttonValue) != "undefined") {
							$("input#form-submit-button").attr("value", noticeAndORValue.buttonValue);
						}
						if (typeof (noticeAndORValue.buttonWidth) != "undefined") {
							$("input#form-submit-button").css("width", noticeAndORValue.buttonWidth);
							$("a.link_exit-sans-save").css("width", noticeAndORValue.buttonWidth);
						}
					}
				});
			}


			// append, initialize contact dialog
			$("div#app-container").append("<div id=\"persona-card-dialog\"></div>");

			$("div#persona-card-dialog").dialog({
				autoOpen: false,
				draggable: true,
				show: {
					effect: "bounce",
					times: 2,
					duration: 500
				},
				width: 400,
			});



			// ========================================================
			// BEGIN LISTENING FOR EVENTS
			// ========================================================

			// when user clicks link tester, open corresponding link in new tab
			$('a.link-tester').click(function () {
				window.open($(this).closest('div.control').find('input[type="url"]').val(), '_blank');
			});

			// when approved or disapproved, set signature and date
			$('input[name^="Approval-Indicator"]').change(function () {
				$(this).closest('div.approver-container').find('input[id^="Approval-Signature"]').val(uData.name).attr('value', uData.name);
				$(this).closest('div.approver-container').find('input[id^="Approval-Date"]').val($().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY')).attr('value', $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY'));
			});

			// when a radio button is clicked, set its "checked" attribute
			//		and remove that attribute from others with same name
			$("input[type='radio']").change(function () {

				// get this radio button's id
				var clickedID = $(this).attr("id");

				// get this radio button's name
				var clickedName = $(this).attr("name");

				// set "checked" attribute on this radio button
				$(this).attr("checked", true);

				// iterate over all other radio buttons with the same name
				$("input[name='" + clickedName + "']").each(function (i, sameName) {

					// if this radio button isn't the one that was clicked
					if ($(sameName).attr("id") != clickedID) {

						// remove its "checked" attribute
						$(sameName).removeAttr("checked");
					}
				});
			});

			// when a checkbox is clicked, set / remove its "checked" attribute
			$("input[type='checkbox']").change(function () {
				if ($(this).is(":checked")) {
					$(this).attr("checked", true);
				} else {
					$(this).removeAttr("checked");
				}
			});

			// when resolved PeoplePicker entity is clicked, open the corresponding persona card
			$('div#request-form').on('click', 'span.ms-entity-resolved', function () {

				// close and empty

				$("div#persona-card-dialog").dialog("close");
				$("div[aria-describedby='persona-card-dialog'] div.ui-dialog-titlebar span.ui-dialog-title").empty();
				$("div#persona-card-dialog").empty();

				var userProfileValues = {};
				$().SPServices({
					operation: "GetUserProfileByName",
					async: false,
					AccountName: $(this).closest("span.sp-peoplepicker-userSpan").attr("sid"),
					completefunc: function (xData, Status) {
						$(xData.responseXML).SPFilterNode("PropertyData").each(function () {
							userProfileValues[$(this).find("Name").text()] = $(this).find("Value").text();
						});
					}
				});

				// create and insert header

				var dialogHeader = '<span id="persona-card-dialog-header"> \n' +
					'	<span id="avatar" \n';

				if (userProfileValues.PictureURL != "") {
					dialogHeader += '		 style="background-image: url(\'' + userProfileValues.PictureURL + '\')"> \n';
				} else {
					userProfileValues.firstInitial = userProfileValues.FirstName.slice(0, 1).toUpperCase();
					userProfileValues.lastInitial = userProfileValues.LastName.slice(0, 1).toUpperCase();
					dialogHeader += '		 ><span id="avatar-initials">' + userProfileValues.firstInitial + userProfileValues.lastInitial + '</span> \n';
				}

				dialogHeader += '	</span> \n' +
					'	<span id="name_title_department"> \n';

				if (typeof (userProfileValues.PreferredName) != 'undefined' && userProfileValues.PreferredName != '') {
					dialogHeader += '		 <span id="name">' + userProfileValues.PreferredName + '</span> \n';
				}

				if (typeof (userProfileValues.Title) != 'undefined' && userProfileValues.Title != '') {
					dialogHeader += '		 <span id="title">' + userProfileValues.Title + '</span> \n';
				}

				if (typeof (userProfileValues.Department) != 'undefined' && userProfileValues.Department != '') {
					dialogHeader += '		 <span id="department">' + userProfileValues.Department + '</span> \n';
				}

				dialogHeader += '	</span></span> \n';

				$("div[aria-describedby='persona-card-dialog'] div.ui-dialog-titlebar span.ui-dialog-title").append(dialogHeader);

				// create and insert body

				var dialogBody = '<ul id="persona-card-dialog-body"> \n';

				if (typeof (userProfileValues.WorkPhone) != 'undefined' && typeof (userProfileValues.CellPhone) != 'undefined' && userProfileValues.WorkPhone != '' && userProfileValues.CellPhone != '') {
					dialogBody += '	<li id="phone-numbers">\n' +
						'		 <ul>\n' +
						'			  <li id="business-phone-number">Business: ' + userProfileValues.WorkPhone + '</li> \n' +
						'			  <li id="mobile-phone-number">Mobile: ' + userProfileValues.CellPhone + '</li> \n' +
						'		 </ul>\n' +
						'	</li> \n';
				} else if (typeof (userProfileValues.WorkPhone) != 'undefined' && userProfileValues.WorkPhone != '') {
					dialogBody += '	<li id="business-phone-number">Business: ' + userProfileValues.WorkPhone + '</li> \n';
				} else if (typeof (userProfileValues.WorkPhone) != 'undefined' && userProfileValues.WorkPhone != '') {
					dialogBody += '	<li id="mobile-phone-number">Mobile: ' + userProfileValues.CellPhone + '</li> \n';
				}

				if (typeof (userProfileValues.WorkEmail) != 'undefined' && userProfileValues.WorkEmail != '') {
					dialogBody += '	<li id="email"><a href="mailto:' + userProfileValues.WorkEmail + '">' + userProfileValues.WorkEmail + '</a></li> \n';
				}

				if (typeof (userProfileValues["SPS-PersonalSiteCapabilities"]) != 'undefined' && userProfileValues["SPS-PersonalSiteCapabilities"] != '') {
					dialogBody += '	<li id="profile"><a href="https://bmos-my.sharepoint.com/_layouts/15/me.aspx?u=' + userProfileValues["msOnline-ObjectId"] + '" target="_blank">Profile</a></li> \n';
				}

				dialogBody += '</ul> \n';

				$("div#persona-card-dialog").append(dialogBody);

				// position and open

				$("div#persona-card-dialog").dialog("option", "position", {
					my: "left bottom-20",
					of: this,
					collision: "fit"
				});
				$("div#persona-card-dialog").dialog("open");
			});

			// datetime and time elements
			// when a date or time element changes
			$("input[id^='date-input_'], select[id^='hours-input_'], select[id^='minutes-input_']").on("change", function () {
				var container = $(this).closest("div.label-and-control");
				if ($(container).find("input[id^='date-input_']").length === 0) {
					var timeOnly = 1;
					var hoursID = $(container).find("select[id^='hours-input_']").attr("id");
					var minutesID = $(container).find("select[id^='minutes-input_']").attr("id");
					var storageID = $(container).find("input[id^='time-storage_']").attr("id");
				} else {
					var timeOnly = 0;
					var dateID = $(container).find("input[id^='date-input_']").attr("id");
					var hoursID = $(container).find("select[id^='hours-input_']").attr("id");
					var minutesID = $(container).find("select[id^='minutes-input_']").attr("id");
					var storageID = $(container).find("input[id^='datetime-storage_']").attr("id");
				}

				if (timeOnly === 1) {
					if ($("#" + hoursID).val().length > 0 && $("#" + minutesID).val().length > 0) {
						$("#" + storageID).val($().ReturnISODateTimeFromParts({ "date": "January 01, 2000", "hour": $("#" + hoursID).val(), "minute": $("#" + minutesID).val() }));
					} else {
						$("#" + storageID).val("");
					}
				} else {
					if ($("#" + dateID).val().length > 0 && $("#" + hoursID).val().length > 0 && $("#" + minutesID).val().length > 0) {
						$("#" + storageID).val($().ReturnISODateTimeFromParts({ "date": $("#" + dateID).val(), "hour": $("#" + hoursID).val(), "minute": $("#" + minutesID).val() }));
					} else {
						$("#" + storageID).val("");
					}
				}
			});

			// when a printer button is clicked
			$("a#standard-printer-button-inside-request").on("click", function () {
				var printFunction = $(this).attr("data-print-function");
				var printContent = [$("textarea#All-Request-Data").val()];
				CallFunctionFromString(printFunction, printContent);
			});

			// when replaceable file attachment deletion control is clicked, display confirmation, overlay
			$('div#request-form').on('click', 'div.mos-drag-and-drop-file-control', function (clickEvent) {
				// prevent default behaviour
				clickEvent.preventDefault();
				// record which file field is relevant
				rData.lastUsedFileFieldID = $(this).closest("div.mos-drag-and-drop-file-attachment").attr("ID");
				// if there was never a file attached
				if ($(this).closest("div.mos-drag-and-drop-file-attachment").hasClass("attachment-error")) {
					// delete the file attachment
					$().DeleteRequestFileAttachment(rData.lastUsedFileFieldID);
					// if there was a file attached
				} else {
					// present the confirmation
					$('div#overlays-screen-container').fadeIn(200);
					$('div#delete-file-attachment').fadeIn(400);
				}
			});

			// when file attachment deletion confirmation button is clicked, delete the file, clear the data, hide confirmation overlay, and inform the user
			$("div#overlays-screen-container").on("click", "a[data-button-type='file-deletion-confirmation']", function () {
				// delete the file attachment
				$().DeleteRequestFileAttachment(rData.lastUsedFileFieldID);
			});

			var chosenFiles = false;

			$("div#request-form").on('drag dragstart dragend dragover dragenter dragleave drop', 'div.mos-drag-and-drop-file-attachment', function (e) {
				e.preventDefault();
				e.stopPropagation();
			})
				.on('dragover dragenter', function () {
					$(this).addClass('dragged-over');
					$(this).find("div.mos-drag-and-drop-file-input label").html("Drop here.");
				})
				.on('dragleave dragend drop', function () {
					$(this).removeClass('dragged-over');
					$(this).find("div.mos-drag-and-drop-file-input label").html("<span class=\"mos-file-selection-prompt\">Tap or click here to select a file</span>"); // Drop a file here, or 
				})
				.on('drop', function (e) {
					var controlID = this.id;
					chosenFiles = e.originalEvent.dataTransfer.files;
					$.each(chosenFiles, function (i, chosenFile) {
						$().UploadRequestFileAttachment(chosenFile, controlID);
					});
				});

			$("div#request-form").on("change", "div.mos-drag-and-drop-file-attachment div.mos-drag-and-drop-file-input input.mos-file-selector", function (e) {
				var fileInputID = this.id;
				var controlID = $("#" + fileInputID).closest('div.mos-drag-and-drop-file-attachment').attr("id");
				chosenFiles = e.target.files;
				$.each(chosenFiles, function (i, chosenFile) {
					$().UploadRequestFileAttachment(chosenFile, controlID);
				});
			});



			// ========================================================
			// PRESENT FORM TO USER & BEGIN MONITORING MAINTENANCE MODE
			// ========================================================

			$("div#request-form").fadeTo(1, 1);

			//  console.log('total screen initialization time = ' + (Date.now() - loadingStartTime)/1000 + ' seconds');

			setInterval(function () { $().TryMaintenanceModeThisComponentThisUser(); }, mData.maintenanceModeCheckFrequency);
		}
	};



	$.fn.ProcessSubmission = function () {

		// ========================================================
		// SET UP VARS
		// ========================================================

		var NowAsFriendlyDateSansYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D');
		var NowAsFriendlyDateWithYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY');
		var NowAsFriendlyDateTimeSansYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D h:mm a');
		var NowAsFriendlyDateTimeWithYear = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY h:mm a');
		var NowAsISOLocal = $().ReturnFormattedDateTime('nowLocal', null, null);
		var NowAsISOUTC = $().ReturnFormattedDateTime('nowUTC', null, null);

		var beginningOfLife = 0;
		var endOfLife = 0;
		var endOfLifeIsNew = 0;
		rData.endOfLife = endOfLife;
		rData.endOfLifeIsNew = endOfLifeIsNew;

		var workingMessage = $("div#app-container div#overlays-screen-container div#wait-while-working div.message p");




		// ========================================================
		// VALIDATE USER-ENTERED DATA, CONVERTED DATES, LAST MODIFICATION TIMESTAMP
		// ========================================================

		$(workingMessage).text("Checking your info");

		// validate user-entered data
		if ($("div#request-form").ValidateForm() != false) {

			// get last modification date
			rData = $.extend(
				$().GetFieldsFromOneRow({
					'listName': mData.defaultListNameForSWFRequestData,
					'select': [{
						'nameHere': 'lastModifiedAtSubmit',
						'nameInList': 'Modified',
					}],
					"where": {
						"field": "ID",
						"type": "Number",
						"value": rData.requestID,
					}
				}),
				rData
			);

			rData.lastModifiedAtSubmit != rData.lastModifiedAtLoad && rData.lastModifiedAtSubmit != rData.lastModifiedAtAttachment ? rData.lastModMismatch = 1 : rData.lastModMismatch = 0;

			$("input#Last-Modified-Timestamp-at-Submit").val(rData.lastModifiedAtSubmit);
			$("input#Last-Modified-Timestamp-Mismatch").val(rData.lastModMismatch);

			if (rData.lastModMismatch === 1) {
				rData = {};
				$('div#overlays-screen-container').fadeIn(200);
				$('div#last-modified-mismatch').fadeIn(400);
			}

			if (rData.lastModMismatch === 0) {
				$('div#overlays-screen-container').fadeIn(200);
				$('div#wait-while-working').fadeIn(400);



				// ========================================================
				// CONVERT FRIENDLY DATES TO ISO
				// ========================================================

				$(workingMessage).text("Preparing dates");

				$.each(fData.elements, function (i, elem) {

					// if element needs its date value formatted on SUBMIT
					if (typeof (elem.isoFormatOnSubmit) != "undefined") {

						// determine the date field selector from the element's other properties
						var fieldsSelector = "[id^='" + ReplaceAll("\\.", "", ReplaceAll(" ", "-", elem.fieldName)) + "']";
						// console.log(fieldsSelector);

						$(fieldsSelector).each(function () {

							// if the field has a value
							if (typeof ($(this).val()) != "undefined" && $(this).val() != "") {

								// if the field is not disabled and not readonly
								if (typeof ($(fieldsSelector).attr('disabled')) === "undefined" && typeof ($(fieldsSelector).attr('readonly')) === "undefined") {

									// get the formatted value using the field value and the properties of friendlyFormatOnLoad
									$(this).val($().ReturnFormattedDateTime($(this).val(), elem.isoFormatOnSubmit.incomingFormat, elem.isoFormatOnSubmit.returnFormat, elem.isoFormatOnSubmit.determineYearDisplayDynamically));

									// if the field is disabled
								} else {

									// just use the data value that was set on load
									$(this).val($(this).attr('data-iso-date-on-load'));
								}
							}
						});
					}
				});



				// ========================================================
				// SET, CLEAR NON-APPROVAL, NON-RS FIELDS
				// ========================================================

				$(workingMessage).text("Preparing some info");

				// set / clear beginningOfLife
				rData.requestStatus === '' ? beginningOfLife = 1 : beginningOfLife = 0;

				// set field for SP Designer
				$("input#Beginning-of-Life").val(beginningOfLife);

				// set requested by and request date (only for new request)
				if (rData.requestStatus === '') {
					$("input#Request-Date").val(NowAsISOUTC);

					if (typeof (fData.autoPopulateRequestedBy) != 'undefined' && fData.autoPopulateRequestedBy === 1) {
						$().PutAddtlPeopleInPicker('Requested By', [{
							'name': uData.name,
							'email': uData.email.toLowerCase(),
							'account': uData.account
						}]);
					}
				}

				$(workingMessage).text("Recording some history");

				// append user machine data to history
				var pastUserMachineHistoryEntries = $("textarea#User-Machine-History").val();
				var newUserMachineHistoryEntry = NowAsFriendlyDateTimeWithYear + ' - ' + uData.browserFamilyAndVersion + ' - ' + uData.formFactor + ' - ' + uData.os;
				var allUserMachineHistory = newUserMachineHistoryEntry + " \r \r" + pastUserMachineHistoryEntries;
				$("textarea#User-Machine-History").val(allUserMachineHistory);

				// if this is a GPC Submission Approval request
				if (rData.requestName == "GPC Submission Approval") {
					// if this request is being submitted for the committee's approval
					if ((rData.requestStatus === '' || rData.requestStatus === 'In Development') && $('input#ready-for-submission-to-committee_yes:checked').length > 0) {
						// signify that the names of the people with whom needs should be discussed are "locked down"
						$("input#names-locked").val("1");
					}
				}

				// append any new admin notes to historical and then clear new
				var newAdminNotes = $("textarea#New-Admin-Notes").val();

				// preserve a copy of the comment
				rData.newAdminNotes = newAdminNotes;

				if (typeof (newAdminNotes) != "undefined" && newAdminNotes.length > 0) {
					var historicalAdminNotes = $("textarea#Historical-Admin-Notes").val();
					var userDisplayName = $().SPServices.SPGetCurrentUser({
						fieldName: "Title"
					});
					var newConcatAdminNote = NowAsFriendlyDateTimeWithYear + ' - ' + userDisplayName + ' - ' + newAdminNotes;

					if (historicalAdminNotes.length > 0) {
						var allAdminNotes = newConcatAdminNote + " \r \r" + historicalAdminNotes;
					} else {
						var allAdminNotes = newConcatAdminNote;
					}

					$("textarea#Historical-Admin-Notes").val(allAdminNotes);
					$("textarea#New-Admin-Notes").val('');
				}


				// append any new other preservable notes to historical and then clear new
				var newOtherPreservableNotes = $("textarea#New-Other-Preservable-Notes").val();

				// preserve a copy of the comment
				rData.newOtherPreservableNotes = newOtherPreservableNotes;

				if (typeof (newOtherPreservableNotes) != "undefined" && newOtherPreservableNotes.length > 0) {
					var historicalOtherPreservableNotes = $("textarea#Historical-Other-Preservable-Notes").val();
					var userDisplayName = $().SPServices.SPGetCurrentUser({
						fieldName: "Title"
					});
					var newConcatOtherPreservableNote = NowAsFriendlyDateTimeWithYear + ' - ' + userDisplayName + ' - ' + newOtherPreservableNotes;

					if (historicalOtherPreservableNotes.length > 0) {
						var allOtherPreservableNotes = newConcatOtherPreservableNote + " \r \r" + historicalOtherPreservableNotes;
					} else {
						var allOtherPreservableNotes = newConcatOtherPreservableNote;
					}

					$("textarea#Historical-Other-Preservable-Notes").val(allOtherPreservableNotes);
					$("textarea#New-Other-Preservable-Notes").val('');
				}

				// find out if we'll need to keep the exceptional event data we started with,
				//		and clear the relevant boolean field if it's populated
				var keepExceptionalEventOccurrences = 0;

				if (typeof (fData.autoTrackKeepingRemovingExceptionalEventOccurrences) != 'undefined') {
					// if the user hasn't elected to change the recurrence pattern
					if ($("#" + fData.autoTrackKeepingRemovingExceptionalEventOccurrences.relevantBooleanID).prop("checked") === false) {
						// set flag to indicate that exceptional event data will need to be kept
						keepExceptionalEventOccurrences = 1;
						// if the user has elected to change the recurrence pattern
					} else {
						// don't change the flag, as we won't be keeping the exceptional event data
						// uncheck the relevant boolean field so that it's clear when the form reloads
						$("#" + fData.autoTrackKeepingRemovingExceptionalEventOccurrences.relevantBooleanID).prop("checked", false);
						$("#" + fData.autoTrackKeepingRemovingExceptionalEventOccurrences.relevantBooleanID).removeAttr("checked");
					}
				}



				// ========================================================
				// HANDLE ASSIGNMENTS (if appropriate)
				// ========================================================

				if (typeof (fData.autoAddAssigneesFromFields) != "undefined" && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Assignments");

					$.each(fData.autoAddAssigneesFromFields, function (i, conditionAndFieldsSet) {
						if (conditionAndFieldsSet.condition()) {
							$().AddAssigneesFromFields(conditionAndFieldsSet.fields);
						}
					});
				}

				if (typeof (fData.autoProcessAssignments) != "undefined" && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Assignments");



					// ============
					// ---- 1. SET UP VARS
					// ============

					var workNewlyNeededArray = [];
					var workNotNeededArray = [];

					if (typeof ($('input#Assigned-To_TopSpan_HiddenInput').val()) === 'undefined' || $('input#Assigned-To_TopSpan_HiddenInput').val() === "") {
						var assignedToNowInitialArray = [];
					} else {
						var assignedToNowInitialArray = JSON.parse($('input#Assigned-To_TopSpan_HiddenInput').val());
					}
					if (typeof ($('input#Assigned-To-on-Load_TopSpan_HiddenInput').val()) === 'undefined' || $('input#Assigned-To-on-Load_TopSpan_HiddenInput').val() === "") {
						var assignedToOnLoadInitialArray = [];
					} else {
						var assignedToOnLoadInitialArray = JSON.parse($('input#Assigned-To-on-Load_TopSpan_HiddenInput').val());
					}

					var assignedToNowToAdd = [];

					var workNewlyNeededNotificationString = 'none';
					var workNewlyNotNeededNotificationString = 'none';

					var assignmentHasChanged = 0;



					// ============
					// ---- 2. WORK NEWLY NEEDED / NOT NEEDED
					// ============

					// -- get work newly needed

					// for each assigned to now
					$.each(assignedToNowInitialArray, function (i, assignedToNow) {

						// set flag indicating that this assigned to now IS NOT in assigned to on load
						var assignedToNowInAssignedToOnLOad = 0;

						// for each assigned to on load
						$.each(assignedToOnLoadInitialArray, function (i, assignedToOnLoad) {

							// if this assigned to on load matches this assigned to now
							if (assignedToNow.Key === assignedToOnLoad.Key) {

								// alter flag to indicate that this assigned to now IS in assigned to on load
								assignedToNowInAssignedToOnLOad = 1;
							}
						});

						// if flag still indicates that this assigned to now IS NOT in assigned to on load
						if (assignedToNowInAssignedToOnLOad === 0) {

							// add assigned to to approval newly needed
							workNewlyNeededArray.push(assignedToNow);

							// alter flag indicating that assignment has changed
							assignmentHasChanged = 1;

						}

					});

					// -- get work newly not needed

					// for each assigned to on load
					$.each(assignedToOnLoadInitialArray, function (i, assignedToOnLoad) {

						// set flag indicating that this assigned to on load IS NOT in assigned to now
						var assignedToOnLoadInAssignedToNow = 0;

						// for each assigned to now
						$.each(assignedToNowInitialArray, function (i, assignedToNow) {

							// if this assigned to on load matches this assigned to now
							if (assignedToOnLoad.Key === assignedToNow.Key) {

								// alter flag to indicate that this assigned to on load IS in assigned to now
								assignedToOnLoadInAssignedToNow = 1;
							}

						});

						// if flag still indicates that this assigned to on load IS NOT in assigned to now
						if (assignedToOnLoadInAssignedToNow === 0) {

							// add assigned to to approval newly not needed
							workNotNeededArray.push(assignedToOnLoad);

							// alter flag indicating that assignment has changed
							assignmentHasChanged = 1;

						}

					});



					// ============
					// ---- 3. NOTIFICATION STRINGS
					// ============

					// set up var
					// Note: Leave initial values as 'none', rather than empty string, 
					//		for SP Designer workflow. Setting the field to an empty string will result in 
					//		SP Designer evaluating the field as not empty. What's here is easier than having 
					//		SP Designer determine if the field is empty but is not set to an empty string.

					// for each element in workNewlyNeededArray
					$.each(workNewlyNeededArray, function (i, a) {

						if (typeof (a.Key) != 'undefined') {

							// clear 'none' on first iteration
							if (workNewlyNeededNotificationString === 'none') {
								workNewlyNeededNotificationString = '';
							}

							// if this isn't the first iteration, prepend upcoming concatenation with a semicolon
							if (i != 0) {
								workNewlyNeededNotificationString += ';';
							}

							// concatenate email address
							workNewlyNeededNotificationString += a.Description.toLowerCase();
						}
					});

					// for each element in workNotNeededArray
					$.each(workNotNeededArray, function (i, a) {

						if (typeof (a.Key) != 'undefined') {

							// clear 'none' on first iteration
							if (workNewlyNotNeededNotificationString === 'none') {
								workNewlyNotNeededNotificationString = '';
							}

							// if this isn't the first iteration, prepend upcoming concatenation with a semicolon
							if (i != 0) {
								workNewlyNotNeededNotificationString += ';';
							}

							// concatenate email address
							workNewlyNotNeededNotificationString += a.Description.toLowerCase();
						}
					});



					// ============
					// ---- 4. STORAGE
					// ============

					// store notification flag and strings for SP Designer workflow
					$('input#Work-Newly-Needed-Notify').val(workNewlyNeededNotificationString);
					$('input#Work-Not-Needed-Notify').val(workNewlyNotNeededNotificationString);
					$('input#Newly-Assigned').val(assignmentHasChanged);

					// clear assigned to on load and store assigned to now as assigned to on load for next load
					$().ClearPeoplePicker("Assigned-To-on-Load_TopSpan");

					// get keys of approvers now
					$.each(assignedToNowInitialArray, function (i, a) {

						assignedToNowToAdd.push({
							'name': a.DisplayText,
							'email': a.Description.toLowerCase(),
							'account': a.Key
						});
					});

					// add approvers now keys to approvers on load
					$().PutAddtlPeopleInPicker('Assigned To on Load', assignedToNowToAdd);

					// if assignment has changed
					if (assignmentHasChanged === 1) {
						// set new assignment date
						$("input#Assignment-Date").val(NowAsISOLocal);
					}

				} // END if (fData.autoProcessAssignments === 1 && rData.endOfLife != 1)



				// ========================================================
				// HANDLE REQUEST STATUS OUTSIDE OF STANDARD APPROVALS (if appropriate)
				// ========================================================



				if (fData.autoTrackSubmissionAndCancellation === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var previousReqStatus = rData.requestStatus;
					var newReqStatus = '';
					var beginningOfLife = 0;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus === '') {
						newReqStatus = 'Submitted';
						beginningOfLife = 1;
					} else if (rData.requestStatus === 'Submitted') {
						if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() === 'Cancel') {
							newReqStatus = 'Cancelled';
							beginningOfLife = 0;
							endOfLife = 1;
							endOfLifeIsNew = 1;
						}
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.beginningOfLife = beginningOfLife;
					rData.requestStatus = newReqStatus;
					rData.previousRequestStatus = previousReqStatus;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#Beginning-of-Life').val(endOfLife);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackSubmissionAndCompletionAndCancellation === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var beginningOfLife = 0;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus === '') {
						newReqStatus = 'Submitted';
						beginningOfLife = 1;
					} else if (rData.requestStatus === 'Submitted') {
						if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() === 'Cancel') {
							newReqStatus = 'Cancelled';
							beginningOfLife = 0;
							endOfLife = 1;
							endOfLifeIsNew = 1;
						} else if ($('select#Change-Request-Status option:selected').val() === 'Complete') {
							newReqStatus = 'Completed';
							beginningOfLife = 0;
							endOfLife = 1;
							endOfLifeIsNew = 1;
						}
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.beginningOfLife = beginningOfLife;
					rData.requestStatus = newReqStatus;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#Beginning-of-Life').val(endOfLife);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackPendingAndApproval === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus == '') {
						newReqStatus = 'Pending Approval';
					} else if (rData.requestStatus == 'Pending Approval' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
						newReqStatus = 'Approved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
						newReqStatus = 'Disapproved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					globalRData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackGSEJobStatuses === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus == '') {
						newReqStatus = 'Pending Approval';
					} else if (rData.requestStatus == 'Pending Approval' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Approved' && ($('input#requester-archival_archive:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Archive')) {
						newReqStatus = 'Archived';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
						newReqStatus = 'Approved';
					} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
						newReqStatus = 'Disapproved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					globalRData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackGSESignupStatuses === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus == '') {
						newReqStatus = 'Signed Up';
					} else if (rData.requestStatus == 'Signed Up' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Signed Up' && $('select#Change-Request-Status option:selected').val() == 'Grant Credit') {
						newReqStatus = 'Credit Granted';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Signed Up' && $('select#Change-Request-Status option:selected').val() == 'Deny Credit') {
						newReqStatus = 'Credit Denied';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					globalRData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				/*	// consider

					if (fData.autoTrackGSEJobStatuses === 1 && rData.endOfLife != 1) {
						
						$(workingMessage).text("Handling Request Status");
	 
						var newReqStatus = '';
						var endOfLife = 0;
						var endOfLifeIsNew = 0;
						if (rData.requestStatus == '') {
							newReqStatus = 'Pending Approval';
						} else if (rData.requestStatus == 'Pending Approval' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
							newReqStatus = 'Cancelled';
							endOfLife = 1;
							endOfLifeIsNew = 1;
						} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
							newReqStatus = 'Approved';
						} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
							newReqStatus = 'Disapproved';
							endOfLife = 1;
							endOfLifeIsNew = 1;
						}
						rData.endOfLifeIsNew = endOfLifeIsNew;
						rData.endOfLife = endOfLife;
						rData.requestStatus = newReqStatus;
						globalRData = rData;
						$('input#Request-Status').val(newReqStatus);
						$('input#End-of-Life').val(endOfLife);
					}

					// consider

					if (fData.autoTrackGSEJobStatuses === 1 && rData.endOfLife != 1) {
						
						$(workingMessage).text("Handling Request Status");
	 
						var newReqStatus = '';
						var endOfLife = 0;
						var endOfLifeIsNew = 0;
						if (rData.requestStatus == '') {
							newReqStatus = 'Pending Approval';
						} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
							newReqStatus = 'Approved';
						} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
							newReqStatus = 'Disapproved';
							endOfLife = 1;
							endOfLifeIsNew = 1;
						}
						rData.endOfLifeIsNew = endOfLifeIsNew;
						rData.endOfLife = endOfLife;
						rData.requestStatus = newReqStatus;
						globalRData = rData;
						$('input#Request-Status').val(newReqStatus);
						$('input#End-of-Life').val(endOfLife);
					}

				// consider

				if (fData.autoTrackGSEScheduleStatuses === 1 && rData.endofLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var beginningOfLife = 0;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus === '') {
						newReqStatus = 'Submitted';
						beginningOfLife = 1;
					} else if (rData.requestStatus === 'Submitted') {
						if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() === 'Cancel') {
							newReqStatus = 'Cancelled';
							beginningOfLife = 0;
							endOfLife = 1;
							endOfLifeIsNew = 1;
						}
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.beginningOfLife = beginningOfLife;
					rData.requestStatus = newReqStatus;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#Beginning-of-Life').val(endOfLife);
					$('input#End-of-Life').val(endOfLife);
				}
				*/

				if (fData.autoTrackEventNeedsStatuses === 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus === '') {
						newReqStatus = 'Pending Approval';
					} else if (rData.requestStatus === 'Approved' && $('input#requester-reversion-to-pending-approval_revert:checked').length > 0) {
						newReqStatus = 'Pending Approval';
					} else if (rData.requestStatus === 'Pending Approval' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() === 'Cancel')) {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus === 'Pending Approval' && $('select#Change-Request-Status option:selected').val() === 'Approve') {
						newReqStatus = 'Approved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus === 'Pending Approval' && $('select#Change-Request-Status option:selected').val() === 'Disapprove') {
						newReqStatus = 'Disapproved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (typeof (fData.autoTrackGPCConceptStatuses) !== "undefined" && fData.autoTrackGPCConceptStatuses === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var beginningOfLifeIsNew = 0;
					var pendingApprovalIsNew = 0;
					var approvalPendingCommentsIsNew = 0;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;

					if (rData.requestStatus === '' && $('input#ready-for-submission-to-committee_yes:checked').length === 0) {
						newReqStatus = 'In Development';
						beginningOfLifeIsNew = 1;
					} else if ((rData.requestStatus === '' || rData.requestStatus === 'In Development' || rData.requestStatus === 'Approval Pending Comments') && $('input#ready-for-submission-to-committee_yes:checked').length > 0) {
						newReqStatus = 'Pending Approval';
						pendingApprovalIsNew = 1;
					} else if (rData.requestStatus === 'Pending Approval' && $('select#Change-Request-Status option:selected').val() === 'Approval Pending Comments') {
						newReqStatus = 'Approval Pending Comments';
						approvalPendingCommentsIsNew = 1;
						$("input#ready-for-submission-to-committee_yes").prop("checked", false).removeAttr("checked");
						$("input#Submission-Signature").val("");
						$("input#Submission-Date").val("");
					} else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() === 'Cancel') {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;

					} else if ((rData.requestStatus === 'Pending Approval' || rData.requestStatus === 'Approval Pending Comments') && $('select#Change-Request-Status option:selected').val() === 'Approve') { //  || (someApprovalNodesAreDisapproved === 0 && someApprovalNodesAreNeedInfo === 0 && someApprovalNodesAreBlank === 0))
						newReqStatus = 'Approved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ((rData.requestStatus === 'Pending Approval' || rData.requestStatus === 'Approval Pending Comments') && $('select#Change-Request-Status option:selected').val() === 'Disapprove') {
						newReqStatus = 'Disapproved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.requestStatus = newReqStatus;
					rData.beginningOfLifeIsNew = beginningOfLifeIsNew;
					rData.pendingApprovalIsNew = pendingApprovalIsNew;
					rData.approvalPendingCommentsIsNew = approvalPendingCommentsIsNew;
					rData.endOfLife = endOfLife;
					rData.endOfLifeIsNew = endOfLifeIsNew;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (typeof (fData.autoTrackGPCSubmissionStatuses) !== "undefined" && fData.autoTrackGPCSubmissionStatuses === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = rData.requestStatus;
					var beginningOfLifeIsNew = 0;
					var pendingApprovalIsNew = 0;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					var quantityOfApprovalNodes = 0;
					var quantityOfApprovalNodesMarkedApproved = 0;
					/*var quantityOfApprovalNodesMarkedDisapproved = 0;*/
					var quantityOfApprovalNodesMarkedNeedInfo = 0;
					var someApprovalNodesAreBlank = 0;
					var allApprovalNodesAreMarked = 0;
					var qtyOfApprovalNodesMarked = 0;
					var approvalIsNew = 0;
					var grantProposalSubmittedIsNew = 0;
					var grantAwardedIsNew = 0;
					var grantDeclinedIsNew = 0;

					$('div.approver-container').each(function (i, a) {
						quantityOfApprovalNodes++;
						if ($(this).find('input[value="approve"]').is(':checked')) {
							quantityOfApprovalNodesMarkedApproved++;
							qtyOfApprovalNodesMarked++;
						}
						/*if ($(this).find('input[value="disapprove"]').is(':checked')) {
							quantityOfApprovalNodesMarkedDisapproved++;
							qtyOfApprovalNodesMarked++;
						}*/
						if ($(this).find('input[value="needInfo"]').is(':checked')) {
							quantityOfApprovalNodesMarkedNeedInfo++;
							qtyOfApprovalNodesMarked++;
						}
					});

					if (qtyOfApprovalNodesMarked < quantityOfApprovalNodes) {
						someApprovalNodesAreBlank = 1;
					} else {
						allApprovalNodesAreMarked = 1;
					}

					if (rData.requestStatus === '' && $('input#ready-for-submission-to-committee_yes:checked').length === 0) {
						newReqStatus = 'In Development';
						beginningOfLifeIsNew = 1;
					} else if ((rData.requestStatus === '' || rData.requestStatus === 'In Development' || rData.requestStatus === 'Approval Pending Comments') && $('input#ready-for-submission-to-committee_yes:checked').length > 0) {
						newReqStatus = 'Pending Approval';
						pendingApprovalIsNew = 1;
					} else if (rData.requestStatus === 'Pending Approval' && quantityOfApprovalNodesMarkedNeedInfo > 0 && $('select#Change-Request-Status option:selected').val() == "") {
						newReqStatus = 'Approval Pending Comments';
						approvalPendingCommentsIsNew = 1;
						$("input#ready-for-submission-to-committee_yes").prop("checked", false).removeAttr("checked");
						$("input#Submission-Signature").val("");
						$("input#Submission-Date").val("");
					} else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() === 'Cancel') {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ((rData.requestStatus === 'Pending Approval' || rData.requestStatus === 'Approval Pending Comments') &&
						($('select#Change-Request-Status option:selected').val() === 'GrantProposalReadyForSubmission' || (allApprovalNodesAreMarked == 1 && quantityOfApprovalNodesMarkedApproved === quantityOfApprovalNodes))) {
						newReqStatus = 'Grant Proposal Ready for Submission';
						approvalIsNew = 1;
						/*} else if (rData.requestStatus === 'Pending Approval' && $('select#Change-Request-Status option:selected').val() === 'Disapprove') { // || quantityOfApprovalNodesMarkedDisapproved > 0
							newReqStatus = 'Disapproved';
							endOfLife = 1;
							endOfLifeIsNew = 1;*/
					} else if ((rData.requestStatus === 'Pending Approval' || rData.requestStatus === 'Approval Pending Comments' || rData.requestStatus === 'Grant Proposal Ready for Submission') && $('select#Change-Request-Status option:selected').val() === 'GrantProposalSubmitted') {
						newReqStatus = 'Grant Proposal Submitted';
						grantProposalSubmittedIsNew = 1;
					} else if ((rData.requestStatus === 'Grant Proposal Ready for Submission' || rData.requestStatus === 'Grant Proposal Submitted') && $('select#Change-Request-Status option:selected').val() === 'GrantAwarded') {
						newReqStatus = 'Grant Awarded';
						grantAwardedIsNew = 1;
					} else if ((rData.requestStatus === 'Grant Proposal Ready for Submission' || rData.requestStatus === 'Grant Proposal Submitted') && $('select#Change-Request-Status option:selected').val() === 'GrantDeclined') {
						newReqStatus = 'Grant Declined';
						grantDeclinedIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					rData.beginningOfLifeIsNew = beginningOfLifeIsNew;
					rData.pendingApprovalIsNew = pendingApprovalIsNew;
					rData.approvalIsNew = approvalIsNew;
					rData.grantProposalSubmittedIsNew = grantProposalSubmittedIsNew;
					rData.grantAwardedIsNew = grantAwardedIsNew;
					rData.grantDeclinedIsNew = grantDeclinedIsNew;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackPendingAndApprovalAndCompleted === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = null;
					var newlyApproved = 0;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus === '') {
						newReqStatus = 'Pending Approval';
					} else if (rData.requestStatus === 'Approved' && $('input#requester-reversion-to-pending-revision_revert:checked').length > 0) {
						newReqStatus = 'Pending Revision';
					} else if (rData.requestStatus === 'Pending Revision' && $('input#requester-restart-approval-process_ready:checked').length > 0) {
						newReqStatus = 'Pending Approval';
					} else if (rData.requestStatus === 'Pending Approval' && $('select#Change-Request-Status option:selected').val() === 'Approve') {
						newReqStatus = 'Approved';
						newlyApproved = 1;
					} else if (($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() === 'Cancel')) {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus === 'Pending Approval' && $('select#Change-Request-Status option:selected').val() === 'Disapprove') {
						newReqStatus = 'Disapproved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus === 'Approved' && $('select#Change-Request-Status option:selected').val() === 'Complete') {
						newReqStatus = 'Completed';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					if (newReqStatus != null) {
						rData.requestStatus = newReqStatus;
						$('input#Request-Status').val(newReqStatus);
					}
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackContactChangeStatuses === 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var endOfLife = 0;
					var endOfLifeIsNew = 0;

					var nameChangeAndOther = $("input#change-types_name").is(":checked") && ($("input#change-types_address").is(":checked") || $("input#change-types_emergencycontact").is(":checked")) ? 1 : 0;
					var nameChangeOnly = $("input#change-types_name").is(":checked") && (!$("input#change-types_address").is(":checked") && !$("input#change-types_emergencycontact").is(":checked")) ? 1 : 0;
					var otherOnly = !$("input#change-types_name").is(":checked") && ($("input#change-types_address").is(":checked") || $("input#change-types_emergencycontact").is(":checked")) ? 1 : 0;

					if (rData.requestStatus == '' && nameChangeOnly == 1) {
						newReqStatus = 'Pending Approval';
					} else if (rData.requestStatus == '' && nameChangeAndOther == 1) {
						newReqStatus = 'Name Change Pending Approval; Other Work Approved';
					} else if (rData.requestStatus == '' && otherOnly == 1) {
						newReqStatus = 'Approved';
					} else if ((rData.requestStatus == 'Pending Approval' || rData.requestStatus == 'Name Change Pending Approval; Other Work Approved') && $('select#Change-Request-Status option:selected').val() == 'Approve') {
						newReqStatus = 'Approved';
					} else if (($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Disapprove') {
						newReqStatus = 'Disapproved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
						newReqStatus = 'Completed';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackPendingAndApprovalAndNoLongerNeeded == 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus == '') {
						newReqStatus = 'Pending Approval';
					} else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Approve') {
						newReqStatus = 'Approved';
					} else if (rData.requestStatus == 'Pending Approval' && $('select#Change-Request-Status option:selected').val() == 'Disapprove') {
						newReqStatus = 'Disapproved';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'No Longer Needed') {
						newReqStatus = 'No Longer Needed';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackValidatorIssueAndReceipt == 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus == '') {
						newReqStatus = 'Pending Validator Pickup';
					} else if (rData.requestStatus == 'Pending Validator Pickup' && ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel')) {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Validator Picked Up' && $('select#Change-Request-Status option:selected').val() == 'Cancel') {
						newReqStatus = 'Cancelled';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if (rData.requestStatus == 'Pending Validator Pickup' && $('select#Change-Request-Status option:selected').val() == 'Validator Picked Up') {
						newReqStatus = 'Validator Picked Up';
					} else if ((rData.requestStatus == 'Pending Validator Pickup' || rData.requestStatus == 'Validator Picked Up') && $('select#Change-Request-Status option:selected').val() == 'Complete') {
						newReqStatus = 'Completed';
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.requestStatus = newReqStatus;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackPendingAndApprovalAndLoanAndReturn == 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var beginningOfLife = 0;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					if (rData.requestStatus == '' && $('select#Change-Request-Status option:selected').val() == '') {
						newReqStatus = 'Pending Approval';
						beginningOfLife = 1;
					} else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
						newReqStatus = 'Cancelled';
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Approve') {
						newReqStatus = 'Approved';
						beginningOfLife = 0;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Disapprove') {
						newReqStatus = 'Disapproved';
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Loaned') {
						newReqStatus = 'Loaned';
						beginningOfLife = 0;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
						newReqStatus = 'Completed';
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.beginningOfLife = beginningOfLife;
					rData.requestStatus = newReqStatus;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#Beginning-of-Life').val(endOfLife);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackPendingAndApprovalAndTextAndWeb == 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var beginningOfLife = 1;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					var reqStatusIsNew = 0;

					if (rData.requestStatus == '' && $('select#Change-Request-Status option:selected').val() == '') {
						newReqStatus = 'Pending Approval';
						reqStatusIsNew = 1;
					} else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
						newReqStatus = 'Cancelled';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Approved') {
						newReqStatus = 'Approved';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Disapproved') {
						newReqStatus = 'Disapproved';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Text Edited') {
						beginningOfLife = 0;
						reqStatusIsNew = 1;
						newReqStatus = 'Text Edited';
					} else if ($('select#Change-Request-Status option:selected').val() == 'Web Live') {
						beginningOfLife = 0;
						reqStatusIsNew = 1;
						newReqStatus = 'Web Live';
					} else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
						newReqStatus = 'Completed';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.beginningOfLife = beginningOfLife;
					rData.requestStatus = newReqStatus;
					rData.reqStatusIsNew = reqStatusIsNew;
					rData = rData;
					$('input#Request-Status, input#Request-Status-Static').val(newReqStatus);
					$('input#Point-Person-Static').val($('select#Point-Person'));
					$('input#Beginning-of-Life').val(beginningOfLife);
					$('input#End-of-Life').val(endOfLife);
				}

				if (fData.autoTrackCommisionAndInterpreterAndInvoice == 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					var newReqStatus = '';
					var beginningOfLife = 1;
					var endOfLife = 0;
					var endOfLifeIsNew = 0;
					var reqStatusIsNew = 0;

					if (rData.requestStatus == '' && $('select#Change-Request-Status option:selected').val() == '') {
						newReqStatus = 'Pending Submission to Commission';
						reqStatusIsNew = 1;
					} else if ($('input#requester-cancellation_cancel:checked').length > 0 || $('select#Change-Request-Status option:selected').val() == 'Cancel') {
						newReqStatus = 'Cancelled';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Submitted to Commission') {
						newReqStatus = 'Submitted to Commission';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Interpreter Assigned') {
						newReqStatus = 'Interpreter Assigned';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Invoice Received') {
						newReqStatus = 'Invoice Received';
						beginningOfLife = 0;
						reqStatusIsNew = 1;
					} else if ($('select#Change-Request-Status option:selected').val() == 'Complete') {
						newReqStatus = 'Completed';
						reqStatusIsNew = 1;
						beginningOfLife = 0;
						endOfLife = 1;
						endOfLifeIsNew = 1;
					}
					rData.endOfLifeIsNew = endOfLifeIsNew;
					rData.endOfLife = endOfLife;
					rData.beginningOfLife = beginningOfLife;
					rData.requestStatus = newReqStatus;
					rData.reqStatusIsNew = reqStatusIsNew;
					rData = rData;
					$('input#Request-Status').val(newReqStatus);
					$('input#Beginning-of-Life').val(endOfLife);
					$('input#End-of-Life').val(endOfLife);
				}


				// ========================================================
				// ADD TO CALENDAR (if appropriate)
				// ========================================================



				if (typeof (fData.addToCalendarOnApproval) != 'undefined' && rData.requestStatus == 'Approved') {

					$(workingMessage).text("Adding to Calendar");

					// get requester's name for use in calendar item
					rData.requesterName = $().ReturnUserDataFromPersonOrGroupFieldString(rData.requesterID)[0].name;

					// set up value pairs for new calendar item
					var calendarValuePairs = [
						['Title', rData.requesterName],
						['EventDate', $('input#datetime-storage_Beginning-Datetime').val()],
						['EndDate', $('input#datetime-storage_End-Datetime').val()],
						['Category', 'On Leave']
					];

					// send value pairs to SPServices UpdateListItems to create a new item
					$().SPServices({
						operation: 'UpdateListItems',
						listName: mData.addToCalendarOnApproval.calendarName,
						webURL: mData.addToCalendarOnApproval.calendarWebURL,
						batchCmd: 'New',
						ID: 0,
						valuepairs: calendarValuePairs,
						completefunc: function (xData, Status) {
							$().HandleListUpdateReturn(xData, Status, 'Hub Attachment Error');
						}
					});
				}



				// ========================================================
				// ADD LOCATION (to form field and to external list) (if appropriate)
				// ========================================================

				if (typeof (fData.autoAddLocationToList) != 'undefined' && $("#" + fData.autoAddLocationToList.relevantAdditionID).val() != '') {

					$(workingMessage).text("Adding Location to List");

					var valueToAdd = $("#" + fData.autoAddLocationToList.relevantAdditionID).val();

					// if valueToAdd really can't be found in the list (guarding against duplicates; 
					//		if valueToAdd doesn't match the text (not value) of any of the relevant select's
					//		options, then we'll know that valueToAdd isn't in the SP list, either;
					//		if the index of the option containing valueToAdd (not with value = valueToAdd) is returned as 'undefined', 
					//		then there is no option in the relevant select containing valueToAdd, in which case valueToAdd isn't in the SP list)
					if (typeof ($().ReturnOptionIndexByText($("#" + fData.autoAddLocationToList.relevantSelectID), valueToAdd)) == 'undefined') {

						var listValuePairs = [
							['Title', valueToAdd]
						];

						// send value pairs to SPServices UpdateListItems to create a new item
						$().SPServices({
							operation: 'UpdateListItems',
							listName: fData.autoAddLocationToList.listName,
							webURL: fData.autoAddLocationToList.listWebURL,
							batchCmd: 'New',
							ID: 0,
							valuepairs: listValuePairs,
							completefunc: function (xData, Status) {
								$().HandleListUpdateReturn(xData, Status, 'Hub Location Addition Error');
							}
						});
					}

					// append an option containing text valueToAdd so that the appropriate select option can be found when form data is populated
					$("#" + fData.autoAddLocationToList.relevantSelectID).append("<option selected='selected'>" + valueToAdd + "</option>");

					// clear the fields indicating that a location is to be added, 
					//		so that this process doesn't get repeated unnecessarily on subsequent submissions
					$("#" + fData.autoAddLocationToList.relevantBooleanID).prop("checked", false);
					$("#" + fData.autoAddLocationToList.relevantBooleanID).removeAttr("checked");
					$("#" + fData.autoAddLocationToList.relevantAdditionID).val("");
				}



				// ========================================================
				// HANDLE APPROVERS (if appropriate)
				// ========================================================

				if (fData.autoProcessApprovals == 1 && rData.endOfLife != 1) {

					$(workingMessage).text("Handling Request Status");

					// TERMINOLOGY
					// ---- ** 'Approvers on Load' are any approvers that were already 
					//			 submitted and were thus in place when the form was loaded;
					//			 user does not have access to these
					// ---- ** 'Approvers Now' are the set of approvers that the user can enter and 
					//			 delete to indicate who the approvers SHOULD be
					// ---- ** 'Required Approvers' are the set of approvers stored in the Component Log
					//			 that must be added to every request of this type (every child/instance of the component)
					// ---- ** 'Approval Newly Needed' are the set of approvers who have been added between 
					//			 loading and submitting - i.e., they are approvers now but not approvers on load
					// ---- ** 'Approval Newly Not Needed' are the set of approvers who have been deleted between 
					//			 loading and submitting - i.e., they are approvers on load but not approvers now



					// OVERVIEW
					// ---- 1. SET UP VARS, RE-DISABLE APPROVAL NODES - Sending emails here will use the 
					//			 notification arrays. SP Designer will use the strings.
					// ---- 2. REQUIRED APPROVERS - If the request is new and there are required approvers, then
					//			 make sure that the required approvers are in approvers now. (By doing this
					//			 only for new requests, we allow that someone may need to delete a required 
					//			 approver and not have it added back programatically - e.g., if the approver
					//			 is on vacation and a subsitute will be manually added in the approver's place.)
					// ---- 3. APPROVAL NEWLY NEEDED / NOT NEEDED - For each approver now, determine which
					//			 are not in approvers on load. These approvals are newly needed (i.e., approval 
					//			 is needed but the person has not been notified). For each approver on load, 
					//			 determine which are not in approvers now. These approvals are newly not needed 
					//			 (i.e., approval is no longer needed but the person has not been notified).
					// ---- 4. NODES, SCRIPTS, AND HISTORY ROWS - 
					//			 
					// ---- 5. APPROVAL STILL NEEDED
					//			 
					// ---- 6. INTERMEDIATE STORAGE
					//			 
					// ---- 7. SET REQUEST STATUS
					//			 
					// ---- 8. FINAL STORAGE - Some request status stuff depends on approval stuff and vice versa, 
					//			 so wait until the very end to store everything. Here, we're actually storing HTML
					//			 and JavaScript in textarea fields so that it goes into the database and can be 
					//			 re-rendered on the next load



					// ============
					// ---- 1. SET UP VARS, RE-DISABLE APPROVAL NODES
					// ============

					var approvalNewlyNeededArray = [];
					var approvalNotNeededArray = [];

					if (typeof ($('input#Approvers_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Approvers_TopSpan_HiddenInput').val() == "") {
						var approversNowInitialArray = [];
					} else {
						var approversNowInitialArray = JSON.parse($('input#Approvers_TopSpan_HiddenInput').val());
					}
					if (typeof ($('input#Approvers-on-Load_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Approvers-on-Load_TopSpan_HiddenInput').val() == "") {
						var approversOnLoadInitialArray = [];
					} else {
						var approversOnLoadInitialArray = JSON.parse($('input#Approvers-on-Load_TopSpan_HiddenInput').val());
					}
					var requiredApproversToAdd = [];
					var conditionalApproversToAdd = [];
					var approversNowToAdd = [];

					var approvalNewlyNeededNotificationArray = [];
					var approvalNewlyNotNeededNotificationArray = [];
					var approvalStillNeededNotificationArray = [];

					var approvalNewlyNeededNotificationString = 'none';
					var approvalNewlyNotNeededNotificationString = 'none';
					var approvalStillNeededNotificationString = 'none';

					var readyForGPCSubmission = 0;
					if ($("input#ready-for-submission-to-committee_yes").length && $("input#ready-for-submission-to-committee_yes").is(':checked')) {
						readyForGPCSubmission = 1;
					}

					$('div[data-approver-email="' + uData.email.toLowerCase() + '"] input[name^="Approval-Indicator_"]').prop("disabled", true);
					$('div[data-approver-email="' + uData.email.toLowerCase() + '"] textarea[id^="Approval-Notes_"]').prop("disabled", true);



					// ============
					// ---- 2. ENSURE REQUESTER IS NOT IN APPROVERS NOW
					// ============

					// set flag indicating that requester IS NOT in approvers now
					var requesterInApproversNow = 0;
					var approversNowToKeep = [];

					// for each approver now
					$.each(approversNowInitialArray, function (i, approverNow) {

						// if this approver now matches the requester
						if (approverNow.Key == $("#Requester-Account").val()) {
							// alter flag to indicate that requester IS in approvers now
							requesterInApproversNow = 1;
							// as long as we're iterating over approvers now anyway....
							// if this approver now does NOT match the requester
						} else {
							// add this approver now's data to approversNowToKeep
							approversNowToKeep.push({
								'name': approverNow.DisplayText,
								'email': approverNow.Description.toLowerCase(),
								'account': approverNow.Key
							});
						}
					});

					// if the requester is in approvers now
					if (requesterInApproversNow == 1) {

						// clear approvers now
						$().ClearPeoplePicker("Approvers_TopSpan");

						// add approversNowToKeep back to approvers now
						$().PutAddtlPeopleInPicker('Approvers', approversNowToKeep);

						// get approvers now again, now that requester has been eliminated from it
						if ($('input#Approvers_TopSpan_HiddenInput').val() == "") {
							var approversNowInitialArray = [];
						} else {
							var approversNowInitialArray = JSON.parse($('input#Approvers_TopSpan_HiddenInput').val());
						}
					}



					// ============
					// ---- 2. CONDITIONAL APPROVERS && REQUIRED APPROVERS
					// ============

					// CONDITIONAL

					// if there are conditional approvers flag is set and there are conditional approvers
					if (typeof (fData.conditionalApprovals) != 'undefined' && mData.conditionalApproversArray.length != 0) {

						// if the specified condition is met
						if (fData.conditionalApprovals()) {

							// if onlyAutoProcessApprovalsAfterDevelopment is set, then set flag indicating whether or not request is ready for approval
							if (typeof (fData.onlyAutoProcessApprovalsAfterDevelopment) != "undefined") {

								// readyForApproval = 0
								var readyForApproval = 0;

								// if RS = "" OR RS == "In Development"
								if (rData.requestStatus == '' || rData.requestStatus == 'In Development') {

									// if request is marked as ready for approval
									if ($("input#ready-for-submission-to-committee_yes").is(":checked")) {
										// set readyForApproval = 1
										readyForApproval = 1;
									}
								}
							}

							// if onlyAutoProcessApprovalsAfterDevelopment is undefined and RS = "" OR
							//		onlyAutoProcessApprovalsAfterDevelopment is set and readyForApproval = 1
							if ((typeof (fData.onlyAutoProcessApprovalsAfterDevelopment) == "undefined" && rData.requestStatus == '') ||
								(typeof (fData.onlyAutoProcessApprovalsAfterDevelopment) != "undefined" && readyForApproval == 1)) {

								// for each conditional approver
								$.each(mData.conditionalApproversArray, function (i, r) {

									// set flag indicating that this conditional approver IS NOT in approvers now
									var conditionalApproverAlreadyAdded = 0;

									// iterate over each approver now
									$.each(approversNowInitialArray, function (i, approverNow) {

										// if this approver now matches this conditional approver
										if (r.account == approverNow.Key) {

											// alter flag to indicate that this conditional approver IS in approvers now
											conditionalApproverAlreadyAdded = 1;
										}
									});

									// if flag still indicates that this conditional approver IS NOT in approvers now
									//		and this conditional approver is not the requester
									if (conditionalApproverAlreadyAdded == 0 && r.account != $("#Requester-Account").val()) {

										// add this conditional approver's data to conditional
										conditionalApproversToAdd.push({
											'name': r.name,
											'email': r.email.toLowerCase(),
											'account': r.account
										});
									}
								});

								// add conditional approvers to approvers now
								$().PutAddtlPeopleInPicker('Approvers', conditionalApproversToAdd);

								// get approvers now again, now that conditional approvers have been added to it
								if ($('input#Approvers_TopSpan_HiddenInput').val() == "") {
									var approversNowInitialArray = [];
								} else {
									var approversNowInitialArray = JSON.parse($('input#Approvers_TopSpan_HiddenInput').val());
								}
							}
						}
					}

					// REQUIRED

					// if there are required approvers
					if (mData.requiredApproversArray.length != 0) {

						// if onlyAutoProcessApprovalsAfterDevelopment is set, then set flag indicating whether or not request is ready for approval
						if (typeof (fData.onlyAutoProcessApprovalsAfterDevelopment) != "undefined") {

							// readyForApproval = 0
							var readyForApproval = 0;

							// if RS = "" OR RS == "In Development"
							if (rData.requestStatus == '' || rData.requestStatus == 'In Development') {

								// if request is marked as ready for approval
								if ($("input#ready-for-submission-to-committee_yes").is(":checked")) {
									// set readyForApproval = 1
									readyForApproval = 1;
								}
							}
						}


						// if onlyAutoProcessApprovalsAfterDevelopment is undefined and RS = "" OR
						//		onlyAutoProcessApprovalsAfterDevelopment is set and readyForApproval = 1
						if ((typeof (fData.onlyAutoProcessApprovalsAfterDevelopment) == "undefined" && rData.requestStatus == '') ||
							(typeof (fData.onlyAutoProcessApprovalsAfterDevelopment) != "undefined" && readyForApproval == 1)) {

							// for each required approver
							$.each(mData.requiredApproversArray, function (i, r) {

								// set flag indicating that this required approver IS NOT in approvers now
								var requiredApproverAlreadyAdded = 0;

								// iterate over each approver now
								$.each(approversNowInitialArray, function (i, approverNow) {

									// if this approver now matches this required approver
									if (r.account == approverNow.Key) {

										// alter flag to indicate that this required approver IS in approvers now
										requiredApproverAlreadyAdded = 1;
									}
								});

								// if flag still indicates that this required approver IS NOT in approvers now
								//		and this required approver is not the requester
								if (requiredApproverAlreadyAdded == 0 && r.account != $("#Requester-Account").val()) {

									// add this required approver's data to requiredApproversToAdd
									requiredApproversToAdd.push({
										'name': r.name,
										'email': r.email.toLowerCase(),
										'account': r.account
									});
								}
							});

							// add required approvers to approvers now
							$().PutAddtlPeopleInPicker('Approvers', requiredApproversToAdd);

							// get approvers now again, now that required approvers have been added to it
							if ($('input#Approvers_TopSpan_HiddenInput').val() == "") {
								var approversNowInitialArray = [];
							} else {
								var approversNowInitialArray = JSON.parse($('input#Approvers_TopSpan_HiddenInput').val());
							}
						}
					}


					// ============
					// ---- 3. APPROVAL NEWLY NEEDED / NOT NEEDED
					// ============

					// -- get approvals newly needed

					// for each approver now
					$.each(approversNowInitialArray, function (i, approverNow) {

						// set flag indicating that this approver now IS NOT in approvers on load
						var approverNowInApproverOnLoad = 0;

						// for each approver on load
						$.each(approversOnLoadInitialArray, function (i, approverOnLoad) {

							// if this approver on load matches this approver now
							if (approverNow.Key == approverOnLoad.Key) {

								// alter flag to indicate that this approver now IS in approvers on load
								approverNowInApproverOnLoad = 1;
							}
						});

						// if flag still indicates that this approver now IS NOT in approvers on load
						if (approverNowInApproverOnLoad == 0) {

							// add approver to approval newly needed
							approvalNewlyNeededArray.push(approverNow);
						}
					});

					// -- get approvals newly not needed

					// for each approver on load
					$.each(approversOnLoadInitialArray, function (i, approverOnLoad) {

						// set flag indicating that this approver on load IS NOT in approvers now
						var approverOnLoadInApproverNow = 0;

						// for each approver on load
						$.each(approversNowInitialArray, function (i, approverNow) {

							// if this approver on load matches this approver now
							if (approverOnLoad.Key == approverNow.Key) {

								// alter flag to indicate that this approver on load IS in approvers now
								approverOnLoadInApproverNow = 1;
							}
						});

						// if flag still indicates that this approver on load IS NOT in approvers now
						if (approverOnLoadInApproverNow == 0) {

							// add approver to approval newly not needed
							approvalNotNeededArray.push(approverOnLoad);
						}
					});



					// ============
					// ---- 4. NODES, SCRIPTS, AND HISTORY ROWS
					// ============

					// -- approval newly needed

					// set up vars
					var newNodes = '';
					var newNodesScripts = '';
					var newNotificationTableRows = '';

					// build and append approval nodes, scripts, and notification history table rows
					$.each(approvalNewlyNeededArray, function (i, a) {
						newNodes += $().ReturnApprovalNode(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll("'", "", ReplaceAll(" ", "-", a.DisplayText))), a.Description.toLowerCase());
						newNodesScripts += $().ReturnApprovalNodeScript(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll(" ", "-", a.DisplayText)), NowAsFriendlyDateWithYear);
						newNotificationTableRows += $().ReturnNotificationHistoryRow(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll(" ", "-", a.DisplayText)), NowAsISOLocal, NowAsFriendlyDateTimeWithYear, "Needed");
					});
					$('div#all-approvals').append(newNodes);
					$('table#table_approval-notification-history tbody').append(newNotificationTableRows);

					// -- approval newly not needed

					// reset var
					newNotificationTableRows = '';

					// remove approval nodes, add notification history table rows
					$.each(approvalNotNeededArray, function (i, a) {
						$('div[data-approver-email="' + a.Description.toLowerCase() + '"]').remove();
						newNotificationTableRows += $().ReturnNotificationHistoryRow(a.DisplayText, ReplaceAll("\\.", "", ReplaceAll(" ", "-", a.DisplayText)), NowAsISOLocal, NowAsFriendlyDateTimeWithYear, "Not Needed");
					});
					$('table#table_approval-notification-history tbody').append(newNotificationTableRows);



					// ============
					// ---- 5. NOTIFICATION STRINGS (& ONE ARRAY)
					// ============

					// set up var
					// Note: Leave initial values as 'none', rather than empty string, 
					//		for SP Designer workflow. Setting the field to an empty string will result in 
					//		SP Designer evaluating the field as not empty. What's here is easier than having 
					//		SP Designer determine if the field is empty but is not set to an empty string, which
					//		is the only other option for "clearing" previously-set values.

					// for each approval node with an empty approval status
					$.each(approvalNewlyNeededArray, function (i, a) {

						if (typeof (a.Key) != 'undefined') {

							// clear 'none' on first iteration
							if (approvalNewlyNeededNotificationString == 'none') {
								approvalNewlyNeededNotificationString = '';
							}

							// if this isn't the first iteration, prepend upcoming concatenation with a semicolon
							if (i != 0) {
								approvalNewlyNeededNotificationString += ';';
							}

							// concatenate email address
							approvalNewlyNeededNotificationString += a.Description.toLowerCase();
						}
					});

					// for each approval node with an empty approval status
					$.each(approvalNotNeededArray, function (i, a) {

						if (typeof (a.Key) != 'undefined') {

							// clear 'none' on first iteration
							if (approvalNewlyNotNeededNotificationString == 'none') {
								approvalNewlyNotNeededNotificationString = '';
							}

							// if this isn't the first iteration, prepend upcoming concatenation with a semicolon
							if (i != 0) {
								approvalNewlyNotNeededNotificationString += ';';
							}

							// concatenate email address
							approvalNewlyNotNeededNotificationString += a.Description.toLowerCase();
						}
					});

					// for each approval node with an empty approval status
					$('div[data-approval-status=""]').each(function (i, d) {

						// clear 'none' on first iteration
						if (approvalStillNeededNotificationString == 'none') {
							approvalStillNeededNotificationString = '';
						}

						// if this isn't the first iteration, prepend upcoming concatenation with a semicolon
						if (i != 0) {
							approvalStillNeededNotificationString += ';';
						}

						// concatenate email address to string
						approvalStillNeededNotificationString += $(d).attr("data-approver-email");

						// push email address to array
						approvalStillNeededNotificationArray.push({
							'Description': $(d).attr("data-approver-email")
						});
					});



					// ============
					// ---- 6. INTERMEDIATE STORAGE
					// ============

					// store notification strings for SP Designer workflow
					$('input#Approval-Newly-Needed-Notify').val(approvalNewlyNeededNotificationString);
					$('input#Approval-Not-Needed-Notify').val(approvalNewlyNotNeededNotificationString);
					$('input#Approval-Still-Needed-Notify').val(approvalStillNeededNotificationString);

					// clear approvers on load and store approvers now as approvers on load for next load
					$().ClearPeoplePicker("Approvers-on-Load_TopSpan");

					// get keys of approvers now
					$.each(approversNowInitialArray, function (i, a) {
						// add this approver now's account (key) to approversNowToAdd
						approversNowToAdd.push({
							'name': a.DisplayText,
							'email': a.Description.toLowerCase(),
							'account': a.Key
						});
					});

					// add approvers now keys to approvers on load
					$().PutAddtlPeopleInPicker('Approvers on Load', approversNowToAdd);


					// ============
					// ---- 7. SET REQUEST STATUS
					// ============

					// set up vars
					var newReqStatus = '';
					var someApprovalNodesAreBlank = 0;
					var someApprovalNodesAreDisapproved = 0;
					var statusChangeRequester = $('input#requester-cancellation_cancel:checked').length > 0 ? "Cancel" : "";
					var statusChangeAdmin = $('select#Change-Request-Status').val();
					var newlyApprOrPending = 0;
					var statusChange = "";
					if (statusChangeRequester == "Cancel" || statusChangeAdmin == "Cancel") {
						statusChange = "Cancel";
					} else if (statusChangeAdmin == "Complete") {
						statusChange = "Complete";
					}

					// alter flags from their defaults if there are disapproved or blank approval nodes
					$('div.approver-container').each(function (i, a) {
						var approvalButtonChecked = 0;
						var disapprovalButtonChecked = 0;

						if ($(this).find('input[value="approve"]').is(':checked')) {
							approvalButtonChecked = 1;
						}
						if ($(this).find('input[value="disapprove"]').is(':checked')) {
							disapprovalButtonChecked = 1;
						}

						if (approvalButtonChecked == 0 && disapprovalButtonChecked == 0) {
							someApprovalNodesAreBlank = 1;
						}
						if (disapprovalButtonChecked == 1) {
							someApprovalNodesAreDisapproved = 1;
						}
					});

					// set RS upon new submission
					if (rData.requestStatus == '') {
						// if this request may undergo development prior to being submitted for approval
						if (typeof (fData.devPriorToApproval) != "undefined") {
							// if this is a GPC Submission Approval Request that is ready for submission to the committee
							if (readyForGPCSubmission == 1) {
								// set Pending Approval
								newReqStatus = 'Pending Approval';
								// if this is either NOT a GPC Submission Approval Request or NOT one that is ready for submission to the committee
							} else {
								// set In Development
								newReqStatus = 'In Development';
							}
							// if this request may NOT undergo development prior to being submitted for approval
						} else {
							newReqStatus = 'Pending Approval';
						}
					}

					// set RS for request in development
					if (rData.requestStatus == 'In Development') {
						// if this is a GPC Submission Approval Request that is ready for submission to the committee
						if (readyForGPCSubmission == 1) {
							// set Pending Approval
							newReqStatus = 'Pending Approval';
						}
					}


					// set RS to Approved
					if ((rData.requestStatus == "" || rData.requestStatus == "Pending Approval") && (newReqStatus != 'In Development')) {
						if (someApprovalNodesAreDisapproved == 0 && someApprovalNodesAreBlank == 0) {
							newReqStatus = 'Approved';
							if (rData.requestStatus != 'Approved') {
								newlyApprOrPending = 1;
							}
						}
					}

					// revert RS to Pending Approval
					if (rData.requestStatus == "Approved" && someApprovalNodesAreBlank == 1) {
						newReqStatus = 'Pending Approval';
						newlyApprOrPending = 1;
					}

					// set RS to Completed
					if (statusChange == "Complete") {
						newReqStatus = 'Completed';
					}

					// set RS to Cancelled
					if (statusChange == "Cancel") {
						newReqStatus = 'Cancelled';
					}

					// set RS to Disapproved
					if (someApprovalNodesAreDisapproved == 1) {
						newReqStatus = 'Disapproved';
					}

					// set RS to Grant Proposal Submitted
					if (statusChange == "GrantProposalSubmitted") {
						newReqStatus = 'Grant Proposal Submitted';
					}

					// set RS to Grant Awarded
					if (statusChange == "GrantAwarded") {
						newReqStatus = 'Grant Awarded';
					}

					// set RS to Grant Declined
					if (statusChange == "GrantDeclined") {
						newReqStatus = 'Grant Declined';
					}

					// set End of Life
					if (newReqStatus == 'Completed' || newReqStatus == 'Cancelled' || newReqStatus == 'Disapproved' || newReqStatus == 'Grant Awarded' || newReqStatus == 'Grant Declined') {
						endOfLife = 1;
						endOfLifeIsNew = 1;
						rData.endOfLife = endOfLife;
						rData.endOfLifeIsNew = endOfLifeIsNew;
					}

					// if we're at end of life, disable all approval stuff
					if (endOfLife == 1) {
						$('input[name^="Approval-Indicator_"]').prop("disabled", true);
						$('textarea[id^="Approval-Notes_"]').prop("disabled", true);
					}

					// ============
					// ---- 8. FINAL STORAGE
					// ============


					if (newReqStatus != '') {
						$('input#Request-Status').val(newReqStatus);
						$('input#End-of-Life').val(endOfLife);
					}

					$('input#Newly-Approved-or-Pending').val(newlyApprOrPending);
					if (newReqStatus == 'Completed' && $("input#Completion-Date").val() == "") {
						$("input#Completion-Date").val(NowAsISOLocal);
					}

					$("div#all-approvals textarea").each(function () {
						$(this).text($(this).val());
					});

					$('textarea#Approval-Nodes-Storage').val($('div#all-approvals').html());

					var allNodesScripts = $('textarea#Approval-Nodes-Script-Storage').val() + newNodesScripts;
					$('textarea#Approval-Nodes-Script-Storage').val(allNodesScripts);

					$('textarea#Approval-Notification-Rows-Storage').val($('table#table_approval-notification-history tbody').html());

					rData.requestStatus = newReqStatus;
				} // END if (fData.autoProcessApprovals == 1 && rData.endOfLife != 1)



				// ========================================================
				// SET COMPLETION DATE (if needed)
				// ========================================================

				if (typeof (fData.autoDateCompletion) != 'undefined' && fData.autoDateCompletion == 1) {

					$(workingMessage).text("Handling Completion Date");

					if (rData.requestStatus == 'Completed' && $('input#Completion-Date').val() == '') {
						$('input#Completion-Date').val(NowAsISOLocal);
					}
				}



				// ========================================================
				// HANDLE GSE SCHEDULES & SIGNUPS MODIFICATIONS (if needed)
				// ========================================================

				if (typeof (fData.autoProcessGSEScheduleAndSignupModification) != 'undefined' && fData.autoProcessGSEScheduleAndSignupModification == 1) {

					$(workingMessage).text("Handling GSE Modifications");

					// if this app is GSE Schedule and this schedule is being cancelled

					// find all of the relevant signups, [change their status to cancelled and email relevant people]

					// if this app is [GSE Signups] and this user is cancelling her signup

					// [change this signup status to cancelled [and email relevant people]]

					// if this app is [GSE Schedule] and schedule data is being modified but schedule is not being cancelled

					// [email everyone signed up for this schedule that information has changed]

				}




















				// ========================================================
				// MODIFY CONFIRMATION MESSAGE (if needed)
				// ========================================================

				$(workingMessage).text("Preparing Confirmation");

				// if this is a new request and a newRequestConfirmationAddition has been provided
				if (rData.requestID == '' && typeof (fData.newRequestConfirmationAddition) != "undefined") {
					// insert it into its container
					$('div#mos-form-submission-confirmation-additional-message').append(fData.newRequestConfirmationAddition);
					// add class to container's container for styling hook
					$('div#mos-form-submission-confirmation').addClass('contains-additional-message');
				}

				// if this is a new request and a newRequestConditionalConfirmationAdditions have been provided
				if (rData.requestID == '' && typeof (fData.newRequestConditionalConfirmationAdditions) !== "undefined") {

					var additionalMessageContent = '';

					$.each(fData.newRequestConditionalConfirmationAdditions, function (i, a) {
						if (a.condition()) {
							additionalMessageContent += a.addition;
						}
					});

					// insert additionalMessageContent into its container
					$('div#mos-form-submission-confirmation-additional-message').append(additionalMessageContent);

					// add class to container's container for styling hook
					if (additionalMessageContent != '') {
						$('div#mos-form-submission-confirmation').addClass('contains-additional-message');
					}
				}












				// ========================================================
				// SAVE LIST ITEM & PROCESS NOTIFICATION, ERROR EMAILS
				// ========================================================

				$(workingMessage).text("Saving Your Info");

				// get a clone of the form
				var clonedForm = $("div#request-form").clone();

				// re/set globalSubmissionValuePairsArrayOfArrays to new, empty array
				globalSubmissionValuePairsArrayOfArrays = [];

				// if saving data normally
				// i.e., if bypassNormalDataSaving is undefined or (it's not set to 1 and it's not set to an array that contains the request status on load)
				if (typeof (fData.bypassNormalDataSaving) == 'undefined' || (fData.bypassNormalDataSaving != 1 && fData.bypassNormalDataSaving.indexOf(rData.previousRequestStatus) == -1)) {
					// console.log('NOT bypassing'); console.log(fData.bypassNormalDataSaving); console.log(rData.previousRequestStatus);
					globalSubmissionValuePairsArrayOfArrays.push(ReturnStandardSubmissionValuePairArray(clonedForm));
				}
				//  else { console.log('bypassing'); }

				// if augmenting the AllRequestData object with some of the form data as an exceptional occurrence
				if (typeof (fData.augmentDataWithExceptionalEventOccurrence) != 'undefined' && fData.augmentDataWithExceptionalEventOccurrence == 1) {
					globalSubmissionValuePairsArrayOfArrays.push(ReturnAllRequestDataObjectAugmentedWithExceptionalEventOccurrence(clonedForm, rData.formData));
				}

				// if keeping exceptional occurrence data; i.e., so that non-date data can be edited for an event series without losing the exceptions
				if (keepExceptionalEventOccurrences == 1) {
					globalSubmissionValuePairsArrayOfArrays.push(ReturnAllRequestDataObjectWithExceptionalEventOccurrences(formDataString, rData.formData));
				}


				// if saving data using a custom function
				// i.e., if customDataSavingFunction is NOT undefined and its requestStatuses array contains the request status on load
				if (typeof (fData.customDataSavingFunction) !== 'undefined' && fData.customDataSavingFunction.requestStatuses.indexOf(rData.previousRequestStatus) != -1) {
					// console.log('custom data saving for this status');
					switch (fData.customDataSavingFunction.useFunction) {
						case 'ReturnNewGSESchedulesSubmissionValuePairArrayOfArrays':
							globalSubmissionValuePairsArrayOfArrays = ReturnNewGSESchedulesSubmissionValuePairArrayOfArrays(clonedForm);
							break;
					}
				}

				var allCreateOrUpdateListItemPromises = [];

				// for each array of value pairs in globalSubmissionValuePairsArrayOfArrays
				$.each(globalSubmissionValuePairsArrayOfArrays, function (i, submissionValuePairsArray) {
					allCreateOrUpdateListItemPromises.push($().CreateOrUpdateListItem(mData, rData, submissionValuePairsArray));
				});

				// wait for all promises to complete (pass or fail) 
				$.when.apply($, allCreateOrUpdateListItemPromises).always(function () {

					// save requestID in rData
					rData.requestID = globalLastRequestIDs[globalLastRequestIDs.length - 1];

					/*
						// consider
						rData.requestID = globalLastRequestIDs[0];

					*/

					// -- process notifications

					// create promise to process any needed notifications
					var notificationProcessingPromise = new $.Deferred();

					// if notifications is NOT set to 1
					if (typeof (mData.notifications) == "undefined" || mData.notifications != 1) {

						notificationProcessingPromise.resolve();

						// if notifications is set to 1
					} else if (mData.notifications == 1) {

						$(workingMessage).text("Preparing Emails");

						// if processing standard notifications
						if (typeof (fData.standardChangeNotifications) != "undefined") {
							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
								// pass sData to ProcessStandardChangeNotifications

								$().ProcessStandardChangeNotifications({
									'newlyApprOrPending': newlyApprOrPending,
									'approvalNewlyNeededNotificationString': approvalNewlyNeededNotificationString,
									'approvalNewlyNeededArray': approvalNewlyNeededArray,
									'approvalNewlyNotNeededNotificationString': approvalNewlyNotNeededNotificationString,
									'approvalNotNeededArray': approvalNotNeededArray,
									'approvalStillNeededNotificationString': approvalStillNeededNotificationString,
									'approvalStillNeededNotificationArray': approvalStillNeededNotificationArray,
									'assignmentHasChanged': assignmentHasChanged,
									'workNewlyNeededNotificationString': workNewlyNeededNotificationString,
									'workNewlyNeededArray': workNewlyNeededArray,
									'workNewlyNotNeededNotificationString': workNewlyNotNeededNotificationString,
									'workNotNeededArray': workNotNeededArray,
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing super simple notifications
						if (typeof (fData.superSimpleChangeNotifications) != "undefined") {
							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
								// pass sData to ProcessSuperSimpleChangeNotifications
								$().ProcessSuperSimpleChangeNotifications({
									'assignmentHasChanged': assignmentHasChanged,
									// 'workNewlyNeededNotificationString': workNewlyNeededNotificationString,
									'workNewlyNeededArray': workNewlyNeededArray,
									// 'workNewlyNotNeededNotificationString': workNewlyNotNeededNotificationString,
									'workNotNeededArray': workNotNeededArray,
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing event space notifications
						if (typeof (fData.eventSpaceNotifications) != "undefined") {
							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
								// pass sData to ProcessEventSpaceNotifications
								$().ProcessEventSpaceNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing event needs notifications
						if (typeof (fData.eventNeedsNotifications) != "undefined") {
							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
								// pass sData to ProcessEventNeedsNotifications
								$().ProcessEventNeedsNotifications({
									'beginningOfLife': beginningOfLife,
									'newReqStatus': newReqStatus,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing event space notifications
						if (typeof (fData.gpcInitialConceptApprovalRequestNotifications) != "undefined") {
							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
								// pass sData to ProcessEventSpaceNotifications
								$().ProcessGPCInitialConceptApprovalRequestNotifications()

									// only when that's done
									.then(function () {
										// resolve promise to process any needed notifications
										notificationProcessingPromise.resolve();
									});
							}
						}

						// if processing event space notifications
						if (typeof (fData.gpcSubmissionApprovalRequestNotifications) != "undefined") {
							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {
								// pass sData to ProcessEventSpaceNotifications
								$().ProcessGPCSubmissionApprovalRequestNotifications({
									'requestStatus': rData.requestStatus,
									'beginningOfLifeIsNew': rData.beginningOfLifeIsNew,
									'formDataOnLoad': rData.formDataOnLoad
									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing promo request notifications
						if (typeof (fData.promoReqNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessPromoReqNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing interpreter request notifications
						if (typeof (fData.interpreterReqNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessInterpreterReqNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing volunteer service request notifications
						if (typeof (fData.referralNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessReferralNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing volunteer service request notifications
						if (typeof (fData.vsReqNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessVolunteerServicesReqNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing mc project request notifications
						if (typeof (fData.mcProjectReqNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessMCProjectReqNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing mc project request notifications
						if (typeof (fData.testNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessTestNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing photo request notifications
						if (typeof (fData.photoReqNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessPhotoReqNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing logo request notifications
						if (typeof (fData.logoReqNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessLogoReqNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}

						// if processing function space request notifications
						if (typeof (fData.functionSpaceReqNotifications) != "undefined") {

							// if NOT just saving an allowed change after EOL has already been reached
							if (rData.endOfLife == 0 || (rData.endOfLife == 1 && rData.endOfLifeIsNew == 1)) {

								// pass sData to ProcessPromoReqNotifications
								$().ProcessFunctionSpaceReqNotifications({
									'beginningOfLife': beginningOfLife,
									'endOfLife': endOfLife

									// only when that's done
								}).then(function () {
									// resolve promise to process any needed notifications
									notificationProcessingPromise.resolve();
								});
							}
						}
					}

					// when notifications have been processed
					$.when(notificationProcessingPromise).done(function () {

						$(workingMessage).text("Wrapping Up");

						$('div#wait-while-working').fadeOut(200);
						$().TransitionAppScreens({ "fromScreens": ["request"], "toScreen": "overlayFormSubmissionConfirmation", "requestID": "0" });
					});

				});


			} // END if (rData.lastModMismatch == 0)

			// if form data is not valid
		} else {
			$('div#overlays-screen-container').fadeIn(200);
			$("#mos-form-data-errors").fadeIn(400);
		}
	};



	// ---- INITIALIZE PAGES

	$.fn.ReturnUniqueElementsOfCorrectVersion = function () {

		var elementsToReturn = [];

		// first determine which version to load
		var requestVersionToLoad = null;

		// for a new request, get current version
		if (rData.requestStatus == "") {
			requestVersionToLoad = mData.currentRequestVersion;
			// for a previous request, if there's a stored version number, get it
		} else {
			if (typeof (rData.requestVersion) != "undefined") {
				requestVersionToLoad = rData.requestVersion;
			}
		}
		// for a previous request with no stored version number, stick with null

		$.each(fData.uniqueElements, function (i, element) {

			// if this element has no version number, use it
			// if this element has a version number and it matches the version to load, use it
			// if this element has a version number == 1 and the version to load is null

			if (typeof (element.requestVersion) == "undefined" || (typeof (element.requestVersion) != "undefined" && (element.requestVersion == requestVersionToLoad || (element.requestVersion == 1 && requestVersionToLoad == null)))) {
				elementsToReturn = elementsToReturn.concat(element);
			}
		});
		return elementsToReturn;
	};



	$.fn.ReturnThisUserHasSpecifiedRole = function (role) {
		if (uData.roles.indexOf(role) > -1) {
			return 1;
		} else {
			return 0;
		}
	};



	$.fn.ReturnThisUserPermittedThisButton = function (button) {
		// set permission flag, assuming no permission
		var thisUserPermittedThisButton = 0;
		// if use of this button is restricted to users with 1+ roles
		if (typeof (button.restrictedToRoles) !== "undefined") {
			// for each relevant role
			$.each(button.restrictedToRoles, function (i, role) {
				// if we haven't already found a relevant role for this user and this user has this role
				if (thisUserPermittedThisButton === 0 && $().ReturnThisUserHasSpecifiedRole(role) == 1) {
					// alter permission flag to indicate that use of this button is allowed
					thisUserPermittedThisButton = 1;
				}
			});
			// if user of this button is NOT restricted
		} else {
			// alter permission flag to indicate that use of this button is allowed
			thisUserPermittedThisButton = 1;
		}
		// return permission flag
		return thisUserPermittedThisButton;
	};



	$.fn.RenderOverviewScreenButtons = function (buttonSet, renderSWFNewRequestButton) {
		// if no new request button rendering flag was set or if it was set to 1
		if (typeof (renderSWFNewRequestButton) === "undefined" || renderSWFNewRequestButton === 1) {
			// render a new request button
			$().RenderSWFNewRequestButton();
		}
		// if there's a set of other buttons
		if (typeof (buttonSet) !== "undefined") {
			// set an empty array of buttons to render
			var buttonsToRender = [];
			// for each button in the set
			$.each(buttonSet, function (i, button) {
				// if this user has permissions for this button
				if ($().ReturnThisUserPermittedThisButton(button) === 1) {
					// add an HTML class to this button
					button.classValues = button.classValues + " command-bar-button";
					// push this button to the array of buttons to render
					buttonsToRender.push(button);
				}
			});
			// render the buttons to render
			$().RenderAdditionalButtons(buttonsToRender);
		}
	};



	$.fn.RenderOverviewScreenPreamble = function (preambleMarkup) {
		if (typeof (preambleMarkup) !== "undefined" && preambleMarkup !== '') {
			$("#overview-table-container").before(preambleMarkup);
		}
	};



	$.fn.RenderWorkflowContacts = function () {
		var workflowContactsMarkup = $().ReturnWorkflowContactsMarkup($().ReturnUserDataFromPersonOrGroupFieldString(mData.adminContacts));
		$("div#overview-screen-container").append('<div id="workflow-contacts">' + workflowContactsMarkup + '</div>');
	};



	$.fn.ConfigureOverviewScreen = function (type) {
		if (type === "admin") {
			$().RenderOverviewScreenButtons(oData.admin.buttons);
			$().RenderOverviewScreenPreamble(oData.admin.preamble);
			$().RenderAllDataTables(oData.admin.sections, "overview-table-container");
		} else if (type === "my") {
			$().RenderOverviewScreenButtons(oData.my.buttons);
			$().RenderOverviewScreenPreamble(oData.my.preamble);
			$().RenderAllDataTables(oData.my.sections, "overview-table-container");
			$().RenderWorkflowContacts();
		} else if (type === "gpcInitialConceptApprovalViewer") {
			$().RenderOverviewScreenButtons(oData.gpcInitialConceptApprovalViewer.buttons);
			$().RenderAllDataTables(oData.gpcInitialConceptApprovalViewer.sections, "overview-table-container");
			$().RenderWorkflowContacts();
		} else if (type === "gpcSubmissionApprovalViewer") {
			$().RenderOverviewScreenButtons(oData.gpcSubmissionApprovalViewer.buttons);
			$().RenderAllDataTables(oData.gpcSubmissionApprovalViewer.sections, "overview-table-container");
			$().RenderWorkflowContacts();


		} else if (type === "adminEventAV") {
			// $().RenderOverviewScreenButtons(oData.adminEventAV.buttons, 0);

			$().RenderAdminEventAVOverviewScreen();


			// $().RenderAllDataTables(oData.adminEventAV.sections, "overview-table-container");

		} else if (type === "adminReferrals") {
			$().RenderOverviewScreenButtons(oData.adminReferrals.buttons, 0);
			$().RenderAllDataTables(oData.adminReferrals.sections, "overview-table-container");
		} else if (type === "myReferrals") {
			$().RenderOverviewScreenButtons(oData.myReferrals.buttons, 0);
			$().RenderAllDataTables(oData.myReferrals.sections, "overview-table-container");
			$().RenderWorkflowContacts();


		} else if (type === "gseJobsHRAdmin") {
			// scorey: control how oData.gseJobsHRAdmin gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseJobsHRAdmin.buttons, 0);
			// $("div#overview-table-container").html("<p>This is 1.2 Jobs List for HR Admin (gseJobsHRAdmin).</p>");
			$().RenderAllDataTables(oData.gseJobsHRAdmin.sections, "overview-table-container");
		} else if (type === "gseJobsJobAdmin") {
			// scorey: control how oData.gseJobsJobAdmin gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseJobsJobAdmin.buttons, 0);
			// $("div#overview-table-container").html("<p>This is 1.2 Jobs List for Job Admin (gseJobsJobAdmin).</p>");
			$().RenderAllDataTables(oData.gseJobsJobAdmin.sections, "overview-table-container");
		} else if (type === "gseJobsManager") {
			// scorey: control how oData.gseJobsManager gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseJobsManager.buttons, 0);
			// $("div#overview-table-container").html("<p>This is 1.2 Jobs List for Manager (gseJobsManager).</p>");
			$().RenderAllDataTables(oData.gseJobsManager.sections, "overview-table-container");


		} else if (type === "gseSchedulesCalendarHRAdmin") {
			// scorey: control how oData.gseSchedulesCalendarHRAdmin gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesCalendarHRAdmin.buttons, 0);
			$("div#overview-table-container").html("<p>This is 2.2 Schedules Calendar for HR Admin (gseSchedulesCalendarHRAdmin).</p>");
		} else if (type === "gseSchedulesCalendarJobAdmin") {
			// scorey: control how oData.gseSchedulesCalendarJobAdmin gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesCalendarJobAdmin.buttons, 0);
			$("div#overview-table-container").html("<p>This is 2.2 Schedules Calendar for Job Admin (gseSchedulesCalendarJobAdmin).</p>");
		} else if (type === "gseSchedulesCalendarManager") {
			// scorey: control how oData.gseSchedulesCalendarManager gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesCalendarManager.buttons, 0);
			$("div#overview-table-container").html("<p>This is 2.2 Schedules Calendar for Manager (gseSchedulesCalendarManager).</p>");
		} else if (type === "gseSchedulesCalendarStaff") {
			// scorey: control how oData.gseSchedulesCalendarStaff gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesCalendarStaff.buttons, 0);
			$("div#overview-table-container").html("<p>This is 2.2 Schedules Calendar for Staff (gseSchedulesCalendarStaff).</p>");


		} else if (type === "gseSchedulesListHRAdmin") {
			// scorey: control how oData.gseSchedulesListHRAdmin gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesListHRAdmin.buttons, 0);
			// $("div#overview-table-container").html("<p>This is 2.3 Schedules List for HR Admin (gseSchedulesListHRAdmin).</p>");
			$().RenderAllDataTables(oData.gseSchedulesListHRAdmin.sections, "overview-table-container");
		} else if (type === "gseSchedulesListJobAdmin") {
			// scorey: control how oData.gseSchedulesListJobAdmin gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesListJobAdmin.buttons, 0);
			// $("div#overview-table-container").html("<p>This is 2.3 Schedules List for Job Admin (gseSchedulesListJobAdmin).</p>");
			$().RenderAllDataTables(oData.gseSchedulesListJobAdmin.sections, "overview-table-container");
		} else if (type === "gseSchedulesListManager") {
			// scorey: control how oData.gseSchedulesListManager gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesListManager.buttons, 0);
			// $("div#overview-table-container").html("<p>This is 2.3 Schedules List for Manager (gseSchedulesListManager).</p>");
			$().RenderAllDataTables(oData.gseSchedulesListManager.sections, "overview-table-container");
		} else if (type === "gseSchedulesListStaff") {
			// scorey: control how oData.gseSchedulesListStaff gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSchedulesListStaff.buttons, 0);
			// $("div#overview-table-container").html("<p>This is 2.3 Schedules List for Staff (gseSchedulesListStaff).</p>");
			$().RenderAllDataTables(oData.gseSchedulesListStaff.sections, "overview-table-container");
		} else if (type === "gseSignupsHRAdmin") {
			// scorey: control how oData.gseSignupsHRAdmin gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSignupsHRAdmin.buttons, 0);
			//$("div#overview-table-container").html("<p>This is 3.2 Signups List for HR Admin (gseSignupsHRAdmin).</p>");
			$().RenderAllDataTables(oData.gseSignupsHRAdmin.sections, "overview-table-container");
		} else if (type === "gseSignupsManager") {
			// scorey: control how oData.gseSignupsManager gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSignupsManager.buttons, 0);
			//$("div#overview-table-container").html("<p>This is 3.2 Signups List for Manager (gseSignupsManager).</p>");
			$().RenderAllDataTables(oData.gseSignupsManager.sections, "overview-table-container");
		} else if (type === "gseSignupsStaff") {
			// scorey: control how oData.gseSignupsStaff gets used to build a screen here
			$().RenderOverviewScreenButtons(oData.gseSignupsStaff.buttons, 0);
			//$("div#overview-table-container").html("<p>This is 3.2 Signups List for Staff (including Job Admins) (gseSignupsStaff).</p>");
			$().RenderAllDataTables(oData.gseSignupsStaff.sections, "overview-table-container");
		}

		$("div#overview-screen-container").addClass(type + "-requests");
		setInterval(function () { $().TryMaintenanceModeThisComponentThisUser(); }, mData.maintenanceModeCheckFrequency);
	}




	// ---- SUBMISSION, VALIDATION, & NOTIFICATION


	$.fn.HandleListUpdateReturn = function (xData, Status, subject) {

		var successFlag = 0;
		var spErrorCode = $(xData.responseXML).find('ErrorCode').text() != '' ? $(xData.responseXML).find('ErrorCode').text() : '""';
		var spErrorText = $(xData.responseXML).find('ErrorText').text() != '' && $(xData.responseXML).find('errorstring').text() != '' ? $(xData.responseXML).find('ErrorText').text() + $(xData.responseXML).find('errorstring').text() : '""';
		var spResponseXMLString = xData.responseXML == null ? 'null' : JSON.stringify(xData.responseXML.xml);

		if (Status == 'success' && (spErrorCode == '""' || spErrorCode == '0x00000000') && spErrorText == '""') {
			return successFlag = 1;
		} else {

			// construct the email body
			var bodyUnique = '<ul>' +
				'<li>Affected User = ' + uData.name + ' (' + uData.userName + ')</li>' +
				'<li>Issue Datetime = ' + $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY h:mm a') + '</li>' +
				'<li>Affected System = ' + mData.requestName + '</li>' +
				'<li>Affected Request # = ' + rData.requestID + '</li>' +
				'<li>Affected GSE Schedule # = ' + rData.scheduleID + '</li>' +
				'<li>Browser = ' + uData.browserFamilyAndVersion + '</li>' +
				'<li>Form Factor = ' + uData.formFactor + '</li>' +
				'<li>OS = ' + uData.os + '</li>' +
				'<li>Status = ' + Status + '</li>' +
				'<li>spErrorCode = ' + spErrorCode + '</li>' +
				'<li>spErrorText = ' + spErrorText + '</li>' +
				'<li>spResponseXMLString = ' + spResponseXMLString + '</li>' +
				'<li>mData = ' + JSON.stringify(mData) + '</li>' +
				'<li>rData = ' + JSON.stringify(rData) + '</li>' +
				'<li>uData = ' + JSON.stringify(uData) + '</li>' +
				'<li>globalSubmissionValuePairsArray = ' + JSON.stringify(globalSubmissionValuePairsArray) + '</li>' +
				'</ul>';

			// push email for each component group admin
			$.each(mData.componentGrpAdminEmailArray, function (i, cgAdmin) {
				globalErrorEmailsToSend.push({
					'emailType': 'Error',
					'caller': 'HandleListUpdateReturn',
					'to': cgAdmin,
					'subject': subject,
					'bodyUnique': bodyUnique
				});
			});

			globalErrorEmailsToSend.push({
				'emailType': 'Error',
				'caller': 'HandleListUpdateReturn',
				'to': 'scorey@mos.org',
				'subject': subject,
				'bodyUnique': bodyUnique
			});

			return successFlag;
		}
	};



	$.fn.ProcessStandardChangeNotifications = function (sData) {

		// ============
		// ---- 1. SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');
		sData.completedByLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Completed By');

		sData.requestNick = $("input#Request-Nickname").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}


		// ============
		// ---- 2. BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			if (typeof (eData.newlyApprOrPending) != "undefined" && eData.newlyApprOrPending == 1) {
				var beginningOfLifeApprovalMention = " and you'll be notified again when the relevant people have approved it";
			} else {
				var beginningOfLifeApprovalMention = "";
			}

			// admin
			if (typeof (eData.standardChangeNotifications.beginningOfLife.admin) != "undefined") {
				if (eData.standardChangeNotifications.beginningOfLife.admin == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'beginningOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'new request received',
							'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
								'<a href="' + eData.uriRequest + '">review the details at any time</a>' +
								beginningOfLifeApprovalMention + '.</p>' +
								'<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
								'with any questions or <a href="' + eData.uriOverview + '">' +
								'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
						});
					});
				}
			}

			// requester
			if (typeof (eData.standardChangeNotifications.beginningOfLife.requester) != "undefined") {
				if (eData.standardChangeNotifications.beginningOfLife.requester == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'beginningOfLife requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'new request received',
						'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
							'<a href="' + eData.uriRequest + '">review the details at any time</a>' +
							beginningOfLifeApprovalMention + '.</p>' +
							'<p>In the meantime, you can <a href="mailto:' + eData.adminEmailString + '">' +
							'contact the admin</a> with any questions or <a href="' + eData.uriOverview + '">' +
							'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
					});
				}
			}
		}


		// ============
		// ---- 3. APPROVAL NEWLY NEEDED
		// ============

		if (typeof (eData.autoProcessApprovals) != 'undefined' && eData.autoProcessApprovals == 1) {
			if (eData.approvalNewlyNeededArray != []) {
				$.each(eData.approvalNewlyNeededArray, function (i, a) {

					if (typeof (a.EntityData) != 'undefined') {
						if (typeof (a.EntityData.Email) != 'undefined') {
							var addressee = a.EntityData.Email;
						}
					} else {
						var addressee = a.Description.toLowerCase();
					}

					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'approval newly needed',
						'to': addressee,
						'subject': eData.subjectPreface + 'for your approval',
						'bodyUnique': '<p>This request\'s fulfillment depends on your approval. Please  ' +
							'<a href="' + eData.uriRequest + '">review the details and enter your ' +
							'approval (or disapproval) soon</a>. <a href="mailto:' + eData.requesterEmail + '">' +
							'Contact the requester</a> or <a href="mailto:' + eData.adminEmailString + '">' +
							'contact the admin</a> with any issues related to this request.</p>'
					});
				});
			}
		}



		// ============
		// ---- 4. APPROVAL NOT NEEDED
		// ============

		if (typeof (eData.autoProcessApprovals) != 'undefined' && eData.autoProcessApprovals == 1) {
			if (eData.approvalNotNeededArray != []) {
				$.each(eData.approvalNotNeededArray, function (i, a) {

					if (typeof (a.EntityData) != 'undefined') {
						if (typeof (a.EntityData.Email) != 'undefined') {
							var addressee = a.EntityData.Email;
						}
					} else {
						var addressee = a.Description.toLowerCase();
					}

					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'approval newly not needed',
						'to': addressee,
						'subject': eData.subjectPreface + 'approval not needed',
						'bodyUnique': '<p>This request no longer requires your approval. Nothing personal. ' +
							'Please <a href="mailto:' + eData.requesterEmail + '">' +
							'contact the requester</a> or <a href="mailto:' + eData.adminEmailString + '">' +
							'contact the admin</a> with any issues related to this request.</p>'
					});
				});
			}
		}



		// ============
		// ---- 5. NEWLY APPROVED OR PENDING
		// ============

		if (typeof (eData.autoProcessApprovals) != 'undefined' && eData.autoProcessApprovals == 1) {
			if (eData.newlyApprOrPending == 1) {

				// approved
				if (eData.requestStatus == 'Approved') {

					// admin
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'approved admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'approved',
							'bodyUnique': '<p>As needed, <a href="' + eData.uriRequest + '">review the request\'s details</a> ' +
								'and contact ' + eData.requestedForLinkedNamesString + '. ' +
								'When the work for this request has been completed, please <a href="' + eData.uriRequest + '">' +
								'update the request status</a>.</p>'
						});
					});

					// requester
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'approved requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'approved',
						'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You\'ll be notified ' +
							'again when the work for this request has been completed, but you can ' +
							'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
							'issues related thereto.'
					});
				}

				// pending approval
				if (eData.requestStatus == 'Pending Approval') {

					// admin
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'pending approval admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'pending approval',
							'bodyUnique': '<p>The status of this request has been reverted to "Pending Approval". ' +
								'You\'ll be notified again when the relevant people have approved this request.</p>' +
								'<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
								'or <a href="' + eData.uriOverview + '">check up on this and any other ' +
								eData.requestName + ' requests</a>.</p>'
						});
					});

					// requester
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'pending approval requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'pending approval',
						'bodyUnique': '<p>The status of <a href="' + eData.uriRequest + '">the request ' +
							'you nicknamed "' + eData.requestNick + '"</a> has been reverted to ' +
							'"Pending Approval". You\'ll be notified again when the relevant people ' +
							'have approved this request.</p>' +
							'<p>In the meantime, you can <a href="mailto:' + eData.adminEmailString + '">' +
							'contact the admin</a> with any questions or <a href="' + eData.uriOverview + '">' +
							'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
					});
				}
			}
		}



		// ============
		// ---- 6. ASSIGNMENTS
		// ============

		if (typeof (eData.autoProcessAssignments) != 'undefined') {
			if (eData.assignmentHasChanged == 1) {

				// do not prompt assignee to mark complete
				if (typeof (eData.autoProcessAssignments.promptToMarkComplete) == 'undefined') {

					var workNeededBodyUnique = '<p>This request has been assigned to you. As needed, ' +
						'<a href="' + eData.uriRequest + '">review the details of this request</a> ' +
						'or contact ' + eData.requestedForLinkedNamesString + '.</p>';

					// prompt assignee to mark complete
				} else if (eData.autoProcessAssignments.promptToMarkComplete == 1) {

					var workNeededBodyUnique = '<p>This request has been assigned to you. As needed, ' +
						'<a href="' + eData.uriRequest + '">review the details of this request</a> ' +
						'or contact ' + eData.requestedForLinkedNamesString + '.</p>' +
						'<p>When your work is completed,  ' +
						'<a href="' + eData.uriRequest + '">indicate this in the request</a>.</p>';
				}

				// finish setting up
				// work needed
				if (eData.workNewlyNeededArray != []) {
					$.each(eData.workNewlyNeededArray, function (i, w) {

						if (typeof (w.EntityData) != 'undefined') {
							if (typeof (w.EntityData.Email) != 'undefined') {
								var addressee = w.EntityData.Email;
							}
						} else {
							var addressee = w.Description.toLowerCase();
						}

						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'work needed',
							'to': addressee,
							'subject': eData.subjectPreface + 'assigned to you',
							'bodyUnique': workNeededBodyUnique
						});
					});
				}

				// work not needed
				if (eData.workNotNeededArray != []) {
					$.each(eData.workNotNeededArray, function (i, w) {

						if (typeof (w.EntityData) != 'undefined') {
							if (typeof (w.EntityData.Email) != 'undefined') {
								var addressee = w.EntityData.Email;
							}
						} else {
							var addressee = w.Description.toLowerCase();
						}

						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'work not needed',
							'to': addressee,
							'subject': eData.subjectPreface + 'no longer assigned to you',
							'bodyUnique': '<p>The request is no longer assigned to you.</p>'
						});
					});
				}
			}
		}



		// ============
		// ---- 7. END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			if (typeof (eData.standardChangeNotifications.endOfLife.admin) != "undefined") {
				if (eData.standardChangeNotifications.endOfLife.admin == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'endOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
							'bodyUnique': '<p>Feel free to contact ' + eData.requestedForLinkedNamesString + ' ' +
								'if you need to follow up.</p>'
						});
					});
				}
			}

			// requester
			if (typeof (eData.standardChangeNotifications.endOfLife.requester) != "undefined") {

				// completion - specific
				if (eData.requestStatus == 'Completed' && eData.standardChangeNotifications.endOfLife.requester.completion == 'specific') {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'endOfLife requester completion specific',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
						'bodyUnique': '<p>The <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
							'"</a> was completed. Contact ' + eData.completedByLinkedNamesString + ' with any issues.</p>'
					});
				}

				// generic
				if ((eData.requestStatus == 'Completed' && eData.standardChangeNotifications.endOfLife.requester.completion == 'generic') ||
					((eData.requestStatus == 'Disapproved' || eData.requestStatus == 'Cancelled') && eData.standardChangeNotifications.endOfLife.requester.nonCompletion == 1)) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'endOfLife requester generic',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
						'bodyUnique': '<p>This is the <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
							'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
							'issues related to this request.'
					});
				}

				// completion - unique
				if (eData.requestStatus == 'Completed' && eData.standardChangeNotifications.endOfLife.requester.completion == 'unique') {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'endOfLife requester completion unique',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
						'bodyUnique': eData.standardChangeNotifications.endOfLife.requester.uniqueBody(eData.uriRequest, eData.requestNick, eData.completedByLinkedNamesString)
					});
				}
			}
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}
		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});
		return emailProcessingPromise.promise();
	};



	$.fn.ProcessSuperSimpleChangeNotifications = function (sData) {

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			// admin
			if (typeof (eData.superSimpleChangeNotifications.beginningOfLife.admin) != "undefined") {
				if (eData.superSimpleChangeNotifications.beginningOfLife.admin == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'beginningOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'new request received',
							'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
								'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
								'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
								'with any questions, or <a href="' + eData.uriOverview + '">' +
								'review other ' + eData.requestName + ' requests</a>.</p>'
						});
					});
				}
			}

			// requester
			if (typeof (eData.superSimpleChangeNotifications.beginningOfLife.requester) != "undefined") {
				if (eData.superSimpleChangeNotifications.beginningOfLife.requester == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'beginningOfLife requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'new request received',
						'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
							'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
							'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
							'with any questions, or <a href="' + eData.uriOverview + '">' +
							'review other ' + eData.requestName + ' requests</a>.</p>'
					});
				}
			}
		}



		// ============
		// ---- APPROVED
		// ============

		if (eData.requestStatus == "Approved") {

			console.log('RS = approved');

			if (typeof (eData.superSimpleChangeNotifications.approved) != "undefined") {

				// admin
				if (typeof (eData.superSimpleChangeNotifications.approved.admin) != "undefined") {
					if (eData.superSimpleChangeNotifications.approved.admin == 1) {

						console.log('gonna push admin email');

						$.each(eData.adminEmailArray, function (i, toAdmin) {
							notificationsToSend.push({
								'emailType': 'Notification',
								'caller': 'approved admin',
								'to': toAdmin,
								'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
								'bodyUnique': '<p>As needed, <a href="' + eData.uriRequest + '">review the request\'s details</a> ' +
									'and contact ' + eData.requestedForLinkedNamesString + '.'
							});
						});
					}
				}

				// requester
				if (typeof (eData.superSimpleChangeNotifications.approved.requester) != "undefined") {
					if (eData.superSimpleChangeNotifications.approved.requester == 1) {

						console.log('gonna push requester email');

						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'approved requester',
							'to': eData.requesterEmail,
							'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
							'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
								'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
								'issues related thereto.'
						});
					}
				}

			}
		}



		// ============
		// ---- ASSIGNMENTS
		// ============

		if (typeof (eData.autoProcessAssignments) != 'undefined' && eData.autoProcessAssignments == 1) {
			if (eData.assignmentHasChanged == 1) {

				// work needed
				if (eData.workNewlyNeededArray != []) {
					$.each(eData.workNewlyNeededArray, function (i, w) {

						if (typeof (w.EntityData) != 'undefined') {
							if (typeof (w.EntityData.Email) != 'undefined') {
								var addressee = w.EntityData.Email;
							}
						} else {
							var addressee = w.Description.toLowerCase();
						}

						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'work needed',
							'to': addressee,
							'subject': eData.subjectPreface + 'assigned to you',
							'bodyUnique': '<p>This request has been assigned to you. As needed, ' +
								'<a href="' + eData.uriRequest + '">review the details of this request</a> ' +
								'or contact ' + eData.requestedForLinkedNamesString + '.</p>'
						});
					});
				}

				// work not needed
				if (eData.workNotNeededArray != []) {
					$.each(eData.workNotNeededArray, function (i, w) {

						if (typeof (w.EntityData) != 'undefined') {
							if (typeof (w.EntityData.Email) != 'undefined') {
								var addressee = w.EntityData.Email;
							}
						} else {
							var addressee = w.Description.toLowerCase();
						}

						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'work not needed',
							'to': addressee,
							'subject': eData.subjectPreface + 'no longer assigned to you',
							'bodyUnique': '<p>The request is no longer assigned to you.</p>'
						});
					});
				}

			}
		}



		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			var adminSendEOL = 0;
			var adminComparisonBank = [];

			if (typeof (eData.superSimpleChangeNotifications.endOfLife.admin) != "undefined") {
				if (eData.superSimpleChangeNotifications.endOfLife.admin == 1) {
					adminSendEOL = 1;
				} else if (eData.superSimpleChangeNotifications.endOfLife.admin != 0) {
					adminComparisonBank = eData.superSimpleChangeNotifications.endOfLife.admin;
					if (adminComparisonBank.indexOf(eData.requestStatus) > -1) {
						adminSendEOL = 1;
					}
				}
				if (adminSendEOL == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'endOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
							'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
								'contact the requester</a> if you need to follow up.</p>'
						});
					});
				}
			}

			// requester
			var requesterSendEOL = 0;
			var requesterComparisonBank = [];

			if (typeof (eData.superSimpleChangeNotifications.endOfLife.requester) != "undefined") {
				if (eData.superSimpleChangeNotifications.endOfLife.requester == 1) {
					requesterSendEOL = 1;
				} else if (eData.superSimpleChangeNotifications.endOfLife.requester != 0) {
					requesterComparisonBank = eData.superSimpleChangeNotifications.endOfLife.requester;
					if (requesterComparisonBank.indexOf(eData.requestStatus) > -1) {
						requesterSendEOL = 1;
					}
				}
				if (requesterSendEOL == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'endOfLife requester generic',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
						'bodyUnique': '<p>This is the <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
							'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
							'issues related to this request.'
					});
				}
			}
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ReturnGPCSubmissionApprovalRequestChangedComment = function (sData) {

		var changedCommentToReturn = 0;
		var approvalNoteIDArray = [
			"Approval-Notes---Finance",
			"Approval-Notes---Logistics",
			"Approval-Notes---EDC",
			"Approval-Notes---EEP",
			"Approval-Notes---CFG",
			"Approval-Notes---DIM",
			"PID-Comments",
			"Other-Reviewer-Comments"
		];

		$.each(approvalNoteIDArray, function (i, approvalNoteID) {
			// if a previous version of this comment existed
			if (typeof (sData.formDataOnLoad[approvalNoteID]) != "undefined") {
				// if the previous version differs from the current version
				if (sData.formDataOnLoad[approvalNoteID] != HtmlEncode($("#" + approvalNoteID).val())) {
					// the changed comment to return is the current version
					changedCommentToReturn = $("#" + approvalNoteID).val();
				}
				// if no previous version of this comment existed
			} else {
				// if there is a current version of this comment
				if (typeof ($("#" + approvalNoteID).val()) !== "undefined" && $("#" + approvalNoteID).val() != "") {
					// the changed comment to return is the current version
					changedCommentToReturn = $("#" + approvalNoteID).val();
				}
			}
		});

		/*// if a comment was added to Other Reviewers Comments
		if(typeof(rData.newOtherPreservableNotes) != "undefined" && rData.newOtherPreservableNotes != "") {
			// the changed comment to return is the comment that was added
			changedCommentToReturn = sData.newOtherPreservableNotes;
		}*/


		return changedCommentToReturn;
	};



	$.fn.ReturnUniquePersonsArrayFromPersonsArray = function (personsArray) {

		var personsToKeepArray = [];

		$.each(personsArray, function (i, incomingPerson) {

			thisPersonAlreadyKept = 0;

			$.each(personsToKeepArray, function (i, keptPerson) {
				if (typeof (incomingPerson.Key) !== "undefined") {
					var incomingPersonComparisonProperty = "Key";
				} else {
					var incomingPersonComparisonProperty = "account";
				}

				if (typeof (keptPerson.Key) !== "undefined") {
					var keptPersonComparisonProperty = "Key";
				} else {
					var keptPersonComparisonProperty = "account";
				}

				if (incomingPerson[incomingPersonComparisonProperty] == keptPerson[keptPersonComparisonProperty]) {
					thisPersonAlreadyKept = 1;
				}
			});

			if (thisPersonAlreadyKept == 0) {
				personsToKeepArray.push(incomingPerson);
			}
		});

		return personsToKeepArray;
	};



	$.fn.ReturnEmailArrayFromPersonsArray = function (personsArray) {

		var emailArray = [];

		$.each(personsArray, function (i, person) {
			if (typeof (person.Description) !== "undefined") {
				var personEmailProperty = "Description";
			} else {
				var personEmailProperty = "email";
			}

			emailArray.push(person[personEmailProperty]);
		});

		return emailArray;
	};



	$.fn.ReturnGPCProposalDeveloperName = function () {
		var proposalDeveloperPPValue = [];
		var proposalDeveloperName = '';
		if ($('input#Proposal-Developer_TopSpan_HiddenInput').val()) {
			proposalDeveloperPPValue = JSON.parse($('input#Proposal-Developer_TopSpan_HiddenInput').val());
			proposalDeveloperName = proposalDeveloperPPValue[0].DisplayText;
		}
		return proposalDeveloperName;
	};



	$.fn.ReturnGPCRequesterSetPersonsArray = function () {

		var requestersInRequest = [];

		if (typeof ($('input#Requested-For_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Requested-For_TopSpan_HiddenInput').val() == "") {
			var requestedForInitialArray = [];
		} else {
			var requestedForInitialArray = JSON.parse($('input#Requested-For_TopSpan_HiddenInput').val());
		}

		if (typeof ($('input#MOS-Principal-Investigator_TopSpan_HiddenInput').val()) == 'undefined' || $('input#MOS-Principal-Investigator_TopSpan_HiddenInput').val() == "") {
			var mosPrincipalInvestigatorInitialArray = [];
		} else {
			var mosPrincipalInvestigatorInitialArray = JSON.parse($('input#MOS-Principal-Investigator_TopSpan_HiddenInput').val());
		}

		if (typeof ($('input#MOS-Co-Investigator_TopSpan_HiddenInput').val()) == 'undefined' || $('input#MOS-Co-Investigator_TopSpan_HiddenInput').val() == "") {
			var mosCoInvestigatorInitialArray = [];
		} else {
			var mosCoInvestigatorInitialArray = JSON.parse($('input#MOS-Co-Investigator_TopSpan_HiddenInput').val());
		}

		if (typeof ($('input#Proposal-Developer_TopSpan_HiddenInput').val()) == 'undefined' || $('input#Proposal-Developer_TopSpan_HiddenInput').val() == "") {
			var proposalDeveloperInitialArray = [];
		} else {
			var proposalDeveloperInitialArray = JSON.parse($('input#Proposal-Developer_TopSpan_HiddenInput').val());
		}

		requestersInRequest = requestedForInitialArray.concat(mosPrincipalInvestigatorInitialArray, mosCoInvestigatorInitialArray, proposalDeveloperInitialArray);

		return requestersInRequest;
	};



	$.fn.ReturnGPCRequesterSetEmailArray = function () {

		var requestersInRequest = $().ReturnGPCRequesterSetPersonsArray();
		var requestersToKeep = $().ReturnUniquePersonsArrayFromPersonsArray(requestersInRequest);
		var requesterSetEmailArray = $().ReturnEmailArrayFromPersonsArray(requestersToKeep);

		return requesterSetEmailArray;
	};



	$.fn.ReturnDevAdminPersonsArray = function () {
		var devAdminPersonsString = $().GetFieldsFromOneRow({
			"webURL": "https://bmos.sharepoint.com/sites/hubprod",
			"listName": "Component Group Log",
			"select": [{
				"nameHere": "returnedString",
				"nameInList": "DevAdminNotifications"
			}],
			"where": {
				"field": "ComponentGroupID",
				"type": "Number",
				"value": 3,
			}
		});

		var devAdminPersonsArray = $().ReturnUserDataFromPersonOrGroupFieldString(devAdminPersonsString.returnedString);

		return devAdminPersonsArray;
	};



	$.fn.ReturnDevAdminPlusGPCRequesterSetPersonsArray = function () {
		var requestersInRequest = $().ReturnGPCRequesterSetPersonsArray();
		var devAdminPersons = $().ReturnDevAdminPersonsArray();
		var devAdminPlusGPCRequesterSetPersonsArray = requestersInRequest.concat(devAdminPersons);
		return devAdminPlusGPCRequesterSetPersonsArray;
	};



	$.fn.ReturnGPCInitialConceptGPCNotificationEmailArray = function () {
		if (typeof (mData.devAdminNotifications) != 'undefined' && mData.devAdminNotifications === 1) {
			var initialConceptNotificationEmailArray = $().ReturnUserEmailStringAndArray(mData.devAdminNotificationPersons).array;
		} else {
			var initialConceptNotificationRecipients = $().ReturnGPCInitialConceptGPCNotificationPersonsArray();;
			var initialConceptNotificationRecipientsToKeep = $().ReturnUniquePersonsArrayFromPersonsArray(initialConceptNotificationRecipients);
			var initialConceptNotificationEmailArray = $().ReturnEmailArrayFromPersonsArray(initialConceptNotificationRecipientsToKeep);
		}
		return initialConceptNotificationEmailArray;
	};



	$.fn.ReturnGPCSubmissionApprovalGPCNotificationEmailArray = function () {
		if (typeof (mData.devAdminNotifications) != 'undefined' && mData.devAdminNotifications === 1) {
			var submissionApprovalNotificationEmailArray = $().ReturnUserEmailStringAndArray(mData.devAdminNotificationPersons).array;
		} else {
			var submissionApprovalNotificationRecipients = $().ReturnGPCSubmissionApprovalGPCNotificationPersonsArray();
			var submissionApprovalNotificationRecipientsToKeep = $().ReturnUniquePersonsArrayFromPersonsArray(submissionApprovalNotificationRecipients);
			var submissionApprovalNotificationEmailArray = $().ReturnEmailArrayFromPersonsArray(submissionApprovalNotificationRecipientsToKeep);
		}

		return submissionApprovalNotificationEmailArray;
	};



	$.fn.ReturnGPCInitialConceptGPCNotificationPersonsArray = function () {
		var gpcGroups = $().ReturnGPCGroups();
		var initialConceptNotificationRecipients = gpcGroups.InitialConceptNotifications.concat(mData.adminNotificationPersons);
		return initialConceptNotificationRecipients;
	};



	$.fn.ReturnGPCSubmissionApprovalGPCNotificationPersonsArray = function () {
		var gpcGroups = $().ReturnGPCGroups();
		var submissionApprovalNotificationRecipients = gpcGroups.SubmissionApprovalNotifications.concat(mData.adminNotificationPersons);
		return submissionApprovalNotificationRecipients;
	};



	$.fn.ReturnGPCInitialConceptGPCNotificationPersonsPlusRequesterSetPersonsArray = function () {

		var initialConceptNotificationRecipients = $().ReturnGPCInitialConceptGPCNotificationPersonsArray();;
		var requestersInRequest = $().ReturnGPCRequesterSetPersonsArray();
		var initialConceptGPCNotificationPersonsPlusRequesterSetPersonsArray = requestersInRequest.concat(initialConceptNotificationRecipients);

		return initialConceptGPCNotificationPersonsPlusRequesterSetPersonsArray;
	};



	$.fn.ReturnGPCSubmissionApprovalGPCNotificationPersonsPlusRequesterSetPersonsArray = function () {

		var submissionApprovalNotificationRecipients = $().ReturnGPCSubmissionApprovalGPCNotificationPersonsArray();;
		var requestersInRequest = $().ReturnGPCRequesterSetPersonsArray();
		var submissionApprovalGPCNotificationPersonsPlusRequesterSetPersonsArray = requestersInRequest.concat(submissionApprovalNotificationRecipients);

		return submissionApprovalGPCNotificationPersonsPlusRequesterSetPersonsArray;
	};



	$.fn.ReturnGPCInitialConceptGPCNotificationPersonsPlusRequesterSetEmailArray = function () {

		if (typeof (mData.devAdminNotifications) != 'undefined' && mData.devAdminNotifications === 1) {
			var personArray = $().ReturnDevAdminPlusGPCRequesterSetPersonsArray();
		} else {
			var personArray = $().ReturnGPCInitialConceptGPCNotificationPersonsPlusRequesterSetPersonsArray();
		}
		var personsToKeep = $().ReturnUniquePersonsArrayFromPersonsArray(personArray);
		var emailArray = $().ReturnEmailArrayFromPersonsArray(personsToKeep);

		return emailArray;
	};



	$.fn.ReturnGPCSubmissionApprovalGPCNotificationPersonsPlusRequesterSetEmailArray = function () {

		if (typeof (mData.devAdminNotifications) != 'undefined' && mData.devAdminNotifications === 1) {
			var personArray = $().ReturnDevAdminPlusGPCRequesterSetPersonsArray();
		} else {
			var personArray = $().ReturnGPCSubmissionApprovalGPCNotificationPersonsPlusRequesterSetPersonsArray();
		}
		var personsToKeep = $().ReturnUniquePersonsArrayFromPersonsArray(personArray);
		var emailArray = $().ReturnEmailArrayFromPersonsArray(personsToKeep);

		return emailArray;
	};



	$.fn.ProcessGPCInitialConceptApprovalRequestNotifications = function (sData) {

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();
		var sData = {};

		sData.proposalDeveloperName = $().ReturnGPCProposalDeveloperName();
		sData.requesterSetEmailArray = $().ReturnGPCRequesterSetEmailArray();
		sData.gpcEmailArray = $().ReturnGPCInitialConceptGPCNotificationEmailArray();
		sData.gpcPlusRequesterSetEmailArray = $().ReturnGPCInitialConceptGPCNotificationPersonsPlusRequesterSetEmailArray();

		if (typeof ($("input#Project-Title").val()) !== "undefined" && $("input#Project-Title").val() !== "") {
			sData.subject = mData.requestName + ' Request #' + rData.requestID + ' (' + $("input#Project-Title").val() + ')';
		} else {
			sData.subject = mData.requestName + ' Request #' + rData.requestID;
		}

		if (typeof ($("textarea#PID-Comments").val()) !== "undefined" && $("textarea#PID-Comments").val() !== "") {
			sData.pidComments = $("textarea#PID-Comments").val();
		} else {
			sData.pidComments = "No comments were included.";
		}

		if (typeof ($("textarea#GPC-Comments").val()) !== "undefined" && $("textarea#GPC-Comments").val() !== "") {
			sData.gpcComments = $("textarea#GPC-Comments").val();
		} else {
			sData.gpcComments = "No comments were included.";
		}

		sData.requestNick = $("input#Request-Nickname").val();

		sData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		sData.uriRequest = sData.uriOverview + "?r=" + rData.requestID;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- IN DEVELOPMENT
		// ============

		if (eData.requestStatus == "In Development" && eData.beginningOfLifeIsNew == 1) {

			// requester
			$.each(eData.requesterSetEmailArray, function (i, toRequester) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'inDevelopment requesterSet',
					'to': toRequester,
					'subject': eData.subject,
					'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
						'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
						'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
						'with any questions, or <a href="' + eData.uriOverview + '">' +
						'review other ' + eData.requestName + ' Requests</a>.</p>'
				});
			});
		}



		// ============
		// ---- PENDING APPROVAL
		// ============

		if (eData.requestStatus == "Pending Approval" && eData.pendingApprovalIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'pendingApproval gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>' + eData.proposalDeveloperName + ' has submitted the ' +
						'above‐referenced project for Concept Approval. ' +
						'The proposal will be reviewed at the next GPC meeting. You may review the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>' + eData.proposalDeveloperName + '’s comments:</p>' +
						'<p>' + eData.pidComments + '</p>'
				});
			});
		}



		// ============
		// ---- APPROVAL PENDING COMMENTS
		// ============

		if (eData.requestStatus == "Approval Pending Comments" && eData.approvalPendingCommentsIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toRequester) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'approvalPendingComments requesterSet',
					'to': toRequester,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been reviewed by GPC. Approval is withheld pending ' +
						'resolution of certain questions or issues. Please see comments below, and respond using the GPC ' +
						'site (do not reply via e‐mail).</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>GPC comments:</p>' +
						'<p>' + sData.gpcComments + '</p>'
				});
			});
		}



		// ============
		// ---- APPROVED
		// ============

		if (eData.requestStatus == "Approved" && eData.endOfLifeIsNew == 1) {

			// gpc
			$.each(eData.gpcEmailArray, function (i, toGPC) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'approved gpc',
					'to': toGPC,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been reviewed by GPC and is approved. The proposal developer has been ' +
						'instructed to create a GPC Submission Approval Request for this project.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>GPC comments:</p>' +
						'<p>' + sData.gpcComments + '</p>'
				});
			});

			// requester
			$.each(eData.requesterSetEmailArray, function (i, toRequester) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'approved requesterSet',
					'to': toRequester,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been reviewed by GPC and is approved. Please convert your proposal to a ' +
						'<a href="https://bmos.sharepoint.com/sites/gpc-submission/SitePages/App.aspx">GPC Submission Approval Request</a>' +
						', and submit it and all required attachments to the GPC at least two weeks before your proposal is due to the ' +
						'funder/prime recipient.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>GPC comments:</p>' +
						'<p>' + sData.gpcComments + '</p>'
				});
			});
		}



		// ============
		// ---- DISAPPROVED
		// ============

		if (eData.requestStatus == "Disapproved" && eData.endOfLifeIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'disapproved gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been reviewed by GPC and has been disapproved. ' +
						'Please see comments below.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>GPC comments:</p>' +
						'<p>' + sData.gpcComments + '</p>'
				});
			});
		}



		// ============
		// ---- CANCELLED
		// ============

		if (eData.requestStatus == "Cancelled" && eData.endOfLifeIsNew == 1) {

			if (eData.formDataOnLoad.requestStatus != "In Development") {
				// gpc
				$.each(eData.gpcEmailArray, function (i, toPerson) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'cancelled gpc',
						'to': toPerson,
						'subject': eData.subject,
						'bodyUnique': '<p>The above‐referenced project has been withdrawn from consideration.</p>' +
							'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
							'<a href="' + eData.uriRequest + '">here</a>.</p>' +
							'<p>GPC comments:</p>' +
							'<p>' + eData.gpcComments + '</p>'
					});
				});
			}

			// requester
			$.each(eData.requesterSetEmailArray, function (i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'cancelled requesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been withdrawn from consideration.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>GPC comments:</p>' +
						'<p>' + eData.gpcComments + '</p>'
				});
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessGPCSubmissionApprovalRequestNotifications = function (sData) {

		console.log("rData");
		console.log(rData);

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.proposalDeveloperName = $().ReturnGPCProposalDeveloperName();
		sData.requesterSetEmailArray = $().ReturnGPCRequesterSetEmailArray();
		sData.gpcEmailArray = $().ReturnGPCSubmissionApprovalGPCNotificationEmailArray();
		sData.gpcPlusRequesterSetEmailArray = $().ReturnGPCSubmissionApprovalGPCNotificationPersonsPlusRequesterSetEmailArray();

		if (typeof ($("input#Project-Title").val()) !== "undefined" && $("input#Project-Title").val() !== "") {
			sData.subject = mData.requestName + ' Request #' + rData.requestID + ' (' + $("input#Project-Title").val() + ')';
		} else {
			sData.subject = mData.requestName + ' Request #' + rData.requestID;
		}

		/*if (typeof(rData.newPIDComments) === "undefined" || rData.newPIDComments === "") {
			rData.newPIDComments = "No comments were included.";
		}*/

		sData.requestNick = $("input#Request-Nickname").val();

		if (typeof ($("textarea#PID-Comments").val()) !== "undefined" && $("textarea#PID-Comments").val() !== "") {
			sData.pidComments = $("textarea#PID-Comments").val();
		} else {
			sData.pidComments = "No comments were included.";
		}

		sData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		sData.uriRequest = sData.uriOverview + "?r=" + rData.requestID;

		if (sData.beginningOfLifeIsNew == 0 && typeof (sData.formDataOnLoad) !== "undefined") {
			sData.gpcSubmissionApprovalRequestChangedComment = $().ReturnGPCSubmissionApprovalRequestChangedComment(sData);
		}

		var eData = $.extend(rData, sData, mData, uData, fData);



		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- IN DEVELOPMENT
		// ============

		if (eData.requestStatus == "In Development" && eData.beginningOfLifeIsNew == 1) {

			// requester
			$.each(eData.requesterSetEmailArray, function (i, toRequester) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'inDevelopment requesterSet',
					'to': toRequester,
					'subject': eData.subject,
					'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
						'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
						'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
						'with any questions, or <a href="' + eData.uriOverview + '">' +
						'review other ' + eData.requestName + ' Requests</a>.</p>'
				});
			});
		}



		// ============
		// ---- PENDING APPROVAL
		// ============

		if (eData.requestStatus == "Pending Approval" && eData.pendingApprovalIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toPerson) {

				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'pendingApproval gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>' + eData.proposalDeveloperName + ' has submitted the ' +
						'above‐referenced project for Submission Approval. ' +
						'You may review the proposal <a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>' + eData.proposalDeveloperName + '’s comments:</p>' +
						'<p>' + eData.pidComments + '</p>'
				});
			});
		}



		// ============
		// ---- NEW COMMENT ADDED DURING PENDING APPROVAL / APPROVAL PENDING COMMENTS
		// ============

		if (((eData.requestStatus == "Pending Approval" || eData.requestStatus == "Approval Pending Comments") && eData.pendingApprovalIsNew != 1) || (eData.requestStatus == "Grant Proposal Ready for Submission" && eData.approvalIsNew == 1)) {

			// if a changed comment was detected
			if (sData.gpcSubmissionApprovalRequestChangedComment != 0) {
				// to GPC
				$.each(eData.gpcEmailArray, function (i, toPerson) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'pendingApproval gpc',
						'to': toPerson,
						'subject': eData.subject,
						'bodyUnique': '<p>A new comment has been submitted on the above-referenced project. If this comment requires a response, please respond using ' +
							'the GPC site (do not reply via email). You may review the proposal <a href="' + eData.uriRequest + '">here</a>.</p>' +
							'<p>Comments:</p>' +
							'<p>' + uData.name + ': ' + eData.gpcSubmissionApprovalRequestChangedComment + '</p>'
					});
				});
				// to requester set
				$.each(eData.requesterSetEmailArray, function (i, toPerson) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'pendingApproval requesterSet',
						'to': toPerson,
						'subject': eData.subject,
						'bodyUnique': '<p>A new comment has been submitted on the above-referenced project. Please review all of the current comments. If any comment ' +
							'requires a response, please add a comment in the <b>Submission to Committee</b> section on the GPC site (do not reply via email). ' +
							'You may review the proposal <a href="' + eData.uriRequest + '">here</a>.</p>' +
							'<p>Comments:</p>' +
							'<p>' + uData.name + ': ' + eData.gpcSubmissionApprovalRequestChangedComment + '</p>'
					});
				});
			}
		}

		// ============
		// ---- APPROVED
		// ============

		if (eData.requestStatus == "Grant Proposal Ready for Submission" && eData.approvalIsNew == 1) {

			// gpc
			$.each(eData.gpcEmailArray, function (i, toGPC) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'approved gpc',
					'to': toGPC,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been approved for submission.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>'

				});
			});

			// requester
			$.each(eData.requesterSetEmailArray, function (i, toRequester) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'approved requesterSet',
					'to': toRequester,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been approved for submission. Please work with Accounting and ' +
						'Advancement to submit your proposal.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>'
				});
			});
		}

		/*// ============
		// ---- DISAPPROVED
		// ============

		if (eData.requestStatus == "Disapproved" && eData.endOfLifeIsNew == 1) {
			
			$.each(eData.gpcPlusRequesterSetEmailArray, function(i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'disapproved gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been reviewed by GPC and has been disapproved for submission. ' + 
						'Please see comments regarding this proposal ' + 
						'<a href="' + eData.uriRequest + '">here</a>.</p>'
				});
			});
		}*/



		// ============
		// ---- CANCELLED
		// ============

		if (eData.requestStatus == "Cancelled" && eData.endOfLifeIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'cancelled gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been withdrawn from consideration.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>' +
						'<p>GPC comments:</p>' +
						'<p>' + uData.name + ': ' + sData.pidComments + '</p>'
				});
			});
		}



		// ============
		// ---- PROPOSAL SUBMITTED TO FUNDER
		// ============

		if (eData.requestStatus == "Grant Proposal Submitted" && eData.grantProposalSubmittedIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'grantProposalSubmitted gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been submitted to the funder.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>'
				});
			});
		}



		// ============
		// ---- GRANT AWARDED
		// ============

		if (eData.requestStatus == "Grant Awarded" && eData.grantAwardedIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'grantAwarded gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been awarded by the funder. Accounting and Advancement will follow ' +
						'up with the PI regarding next steps.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>'
				});
			});
		}



		// ============
		// ---- GRANT DECLINED
		// ============

		if (eData.requestStatus == "Grant Declined" && eData.grantDeclinedIsNew == 1) {

			$.each(eData.gpcPlusRequesterSetEmailArray, function (i, toPerson) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'grantDeclined gpcPlusRequesterSet',
					'to': toPerson,
					'subject': eData.subject,
					'bodyUnique': '<p>The above‐referenced project has been declined by the funder.</p>' +
						'<p>This notice was generated by ' + eData.name + '. You may view the proposal ' +
						'<a href="' + eData.uriRequest + '">here</a>.</p>'
				});
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessEventNeedsNotifications = function (sData) {

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();
		sData.replacedFloorplan = $('input#Replacement-flag-for-Floor-Plan').val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			// admin
			if (typeof (eData.eventNeedsNotifications.beginningOfLife.admin) != "undefined") {
				if (eData.eventNeedsNotifications.beginningOfLife.admin == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'beginningOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'new request received',
							'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
								'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
								'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
								'with any questions, or <a href="' + eData.uriOverview + '">' +
								'review other ' + eData.requestName + ' requests</a>.</p>'
						});
					});
				}
			}

			// requester
			if (typeof (eData.eventNeedsNotifications.beginningOfLife.requester) != "undefined") {
				if (eData.eventNeedsNotifications.beginningOfLife.requester == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'beginningOfLife requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'new request received',
						'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
							'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
							'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
							'with any questions, or <a href="' + eData.uriOverview + '">' +
							'review other ' + eData.requestName + ' requests</a>.</p>'
					});
				}
			}
		}



		// ============
		// ---- APPROVED
		// ============

		// if this request is newly approved
		if (eData.newReqStatus == "Approved") {

			console.log('RS = approved');

			if (typeof (eData.eventNeedsNotifications.approved) != "undefined") {

				// query to get the additional recipients

				// if we're doing devAdminNotifications
				if (typeof (eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

					// get the value from the Component Group Log
					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Component Group Log",
							"select": [{
								"nameHere": "approvedAdditionalRecipientsVerbose",
								"nameInList": "DevAdminNotifications"
							}],
							"where": {
								"field": "ComponentGroupID",
								"type": "Number",
								"value": 3,
							}
						}),
						eData
					);

					// if we're NOT doing devAdminNotifications
				} else {

					// get the value from EventNeedsNotificationRecipients
					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "EventNeedsNotificationRecipients",
							"select": [{
								"nameHere": "approvedAdditionalRecipientsVerbose",
								"nameInList": "Recipients"
							}],
							"where": {
								"field": "Title",
								"type": "Text",
								"value": "Approved Testing",
								// "value": "Approved",
							}
						}),
						eData
					);
				}

				// pull the additional recipients' needed values out of the query results
				eData.approvedAdditionalRecipients = $().ReturnUserEmailStringAndArray(eData.approvedAdditionalRecipientsVerbose).array;

				// admin
				if (typeof (eData.eventNeedsNotifications.approved.admin) != "undefined") {
					if (eData.eventNeedsNotifications.approved.admin == 1) {

						$.each(eData.adminEmailArray, function (i, toAdmin) {
							notificationsToSend.push({
								'emailType': 'Notification',
								'caller': 'approved admin',
								'to': toAdmin,
								'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
								'bodyUnique': '<p>As needed, <a href="' + eData.uriRequest + '">review the request\'s details</a> ' +
									'and contact ' + eData.requestedForLinkedNamesString + '.'
							});
						});
					}
				}

				// requester
				if (typeof (eData.eventNeedsNotifications.approved.requester) != "undefined") {
					if (eData.eventNeedsNotifications.approved.requester == 1) {

						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'approved requester',
							'to': eData.requesterEmail,
							'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
							'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
								'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
								'issues related thereto.'
						});
					}
				}

				// additional
				if (typeof (eData.eventNeedsNotifications.approved.additional) != "undefined") {
					if (eData.eventNeedsNotifications.approved.additional == 1) {

						$.each(eData.approvedAdditionalRecipients, function (i, toAdditional) {
							notificationsToSend.push({
								'emailType': 'Notification',
								'caller': 'approved additional',
								'to': toAdditional,
								'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
								'bodyUnique': '<p>As needed, <a href="' + eData.uriRequest + '">review the request\'s details</a> ' +
									'and contact ' + eData.requestedForLinkedNamesString + '.'
							});
						});
					}
				}
			}
			// if this request is not newly approved but RS = approved and floorplan has changed
		} else if (eData.requestStatus == "Approved" && eData.replacedFloorplan == 1) {

			// query to get the additional recipients

			// if we're doing devAdminNotifications
			if (typeof (eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

				// get the value from the Component Group Log
				eData = $.extend(
					$().GetFieldsFromOneRow({
						"webURL": "https://bmos.sharepoint.com/sites/hubprod",
						"listName": "Component Group Log",
						"select": [{
							"nameHere": "approvedAdditionalRecipientsVerbose",
							"nameInList": "DevAdminNotifications"
						}],
						"where": {
							"field": "ComponentGroupID",
							"type": "Number",
							"value": 3,
						}
					}),
					eData
				);
				// if we're NOT doing devAdminNotifications
			} else {

				// get the value from EventNeedsNotificationRecipients
				eData = $.extend(
					$().GetFieldsFromOneRow({
						"webURL": "https://bmos.sharepoint.com/sites/hubprod",
						"listName": "EventNeedsNotificationRecipients",
						"select": [{
							"nameHere": "approvedAdditionalRecipientsVerbose",
							"nameInList": "Recipients"
						}],
						"where": {
							"field": "Title",
							"type": "Text",
							"value": "Floor Plan Changed Testing",
							// "value": "Floor Plan Changed",
						}
					}),
					eData
				);
			}
			// pull the additional recipients' needed values out of the query results
			eData.approvedAdditionalRecipients = $().ReturnUserEmailStringAndArray(eData.approvedAdditionalRecipientsVerbose).array;

			// admin
			if (typeof (eData.eventNeedsNotifications.floorplanChanged.admin) != "undefined") {
				if (eData.eventNeedsNotifications.floorplanChanged.admin == 1) {

					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'floorplanChanged admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'floorplan has changed',
							'bodyUnique': '<p>As needed, <a href="' + eData.uriRequest + '">review the request\'s details</a> ' +
								'and contact ' + eData.requestedForLinkedNamesString + '.'
						});
					});
				}
			}

			// requester
			if (typeof (eData.eventNeedsNotifications.floorplanChanged.requester) != "undefined") {
				if (eData.eventNeedsNotifications.floorplanChanged.requester == 1) {

					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'floorplanChanged requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'floorplan has changed',
						'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
							'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
							'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
							'with any questions, or <a href="' + eData.uriOverview + '">' +
							'review other ' + eData.requestName + ' requests</a>.</p>'
					});
				}
			}

			// additional
			if (typeof (eData.eventNeedsNotifications.floorplanChanged.additional) != "undefined") {
				if (eData.eventNeedsNotifications.floorplanChanged.additional == 1) {

					$.each(eData.approvedAdditionalRecipients, function (i, toAdditional) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'floorplanChanged additional',
							'to': toAdditional,
							'subject': eData.subjectPreface + 'floorplan has changed',
							'bodyUnique': '<p>As needed, <a href="' + eData.uriRequest + '">review the request\'s details</a> ' +
								'and contact ' + eData.requestedForLinkedNamesString + '.'
						});
					});
				}
			}
		}



		// ============
		// ---- REVERSION TO PENDING APPROVAL
		// ============

		if ((typeof (eData.beginningOfLife) === 'undefined' || eData.beginningOfLife !== 1) && eData.newReqStatus == "Pending Approval") {

			// REWORD EMAILS


			// admin
			if (typeof (eData.eventNeedsNotifications.pendingApproval.admin) != "undefined") {
				if (eData.eventNeedsNotifications.pendingApproval.admin == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'pendingApproval admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'pending approval',
							'bodyUnique': '<p>Changes have been made to this request. You can ' +
								'<a href="' + eData.uriRequest + '">review and approve this request</a>, ' +
								'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
								'with any issues, or <a href="' + eData.uriOverview + '">' +
								'review other ' + eData.requestName + ' requests</a>.</p>'
						});
					});
				}
			}

			// requester
			if (typeof (eData.eventNeedsNotifications.pendingApproval.requester) != "undefined") {
				if (eData.eventNeedsNotifications.pendingApproval.requester == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'pendingApproval requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'pending approval',
						'bodyUnique': '<p>Changes to the request you nicknamed "' + eData.requestNick + '" have been received ' +
							'for approval. You can <a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
							'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
							'with any questions, or <a href="' + eData.uriOverview + '">' +
							'review other ' + eData.requestName + ' requests</a>.</p>'
					});
				}
			}
		}



		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			var adminSendEOL = 0;
			var adminComparisonBank = [];

			if (typeof (eData.eventNeedsNotifications.endOfLife.admin) != "undefined") {
				if (eData.eventNeedsNotifications.endOfLife.admin == 1) {
					adminSendEOL = 1;
				} else if (eData.eventNeedsNotifications.endOfLife.admin != 0) {
					adminComparisonBank = eData.eventNeedsNotifications.endOfLife.admin;
					if (adminComparisonBank.indexOf(eData.requestStatus) > -1) {
						adminSendEOL = 1;
					}
				}
				if (adminSendEOL == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'endOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
							'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
								'contact the requester</a> if you need to follow up.</p>'
						});
					});
				}
			}

			// requester
			var requesterSendEOL = 0;
			var requesterComparisonBank = [];

			if (typeof (eData.eventNeedsNotifications.endOfLife.requester) != "undefined") {
				if (eData.eventNeedsNotifications.endOfLife.requester == 1) {
					requesterSendEOL = 1;
				} else if (eData.eventNeedsNotifications.endOfLife.requester != 0) {
					requesterComparisonBank = eData.eventNeedsNotifications.endOfLife.requester;
					if (requesterComparisonBank.indexOf(eData.requestStatus) > -1) {
						requesterSendEOL = 1;
					}
				}
				if (requesterSendEOL == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'endOfLife requester generic',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
						'bodyUnique': '<p>This is the <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
							'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
							'issues related to this request.'
					});
				}
			}
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessEventSpaceNotifications = function (sData) {

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriPageAdmin = mData.uriAdmin;
		mData.uriPageRequester = mData.uriRequester;
		mData.uriPageApprover = 'https://bmos.sharepoint.com';

		mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
		mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
		mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

		sData.adminToRequesterMessageAddendum = '';
		if (typeof ($("textarea#Email-Message-Addendum").val()) != 'undefined' && $("textarea#Email-Message-Addendum").val() != '') {
			sData.adminToRequesterMessageAddendum = '<p>From the Admin:</p>' +
				'<blockquote>' + $("textarea#Email-Message-Addendum").val() + '</blockquote>';
		}

		sData.spaceReservedStarting = '';
		if (typeof ($("input#datetime-storage_Space-Reserved-Beginning-Datetime").val()) != 'undefined' && $("input#datetime-storage_Space-Reserved-Beginning-Datetime").val() != '') {
			sData.spaceReservedStarting = $("input#datetime-storage_Space-Reserved-Beginning-Datetime").val().substring(0, 19);
			sData.spaceReservedStarting = $().ReturnFormattedDateTime(sData.spaceReservedStarting, null, 'MMMM D, YYYY h:mm a');
			sData.spaceReservedStarting = '<p>Your space reservation starts: ' + sData.spaceReservedStarting + '</p>';
		}

		sData.spaceReservedEnding = '';
		if (typeof ($("input#datetime-storage_Space-Reserved-Ending-Datetime").val()) != 'undefined' && $("input#datetime-storage_Space-Reserved-Ending-Datetime").val() != '') {
			sData.spaceReservedEnding = $("input#datetime-storage_Space-Reserved-Ending-Datetime").val().substring(0, 19);
			sData.spaceReservedEnding = $().ReturnFormattedDateTime(sData.spaceReservedEnding, null, 'MMMM D, YYYY h:mm a');
			sData.spaceReservedEnding = '<p>Your space reservation ends: ' + sData.spaceReservedEnding + '</p>';
		}

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			// admin
			if (typeof (eData.eventSpaceNotifications.beginningOfLife.admin) != "undefined") {
				if (eData.eventSpaceNotifications.beginningOfLife.admin == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'beginningOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + 'new request received',
							'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
								'<a href="' + eData.uriFormAdmin + '">review this request\'s details</a>, ' +
								'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
								'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
								'review other ' + eData.requestName + ' requests</a>.</p>'
						});
					});
				}
			}

			// requester
			if (typeof (eData.eventSpaceNotifications.beginningOfLife.requester) != "undefined") {
				if (eData.eventSpaceNotifications.beginningOfLife.requester == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'beginningOfLife requester',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + 'new request received',
						'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
							'<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
							'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
							'with any questions, or <a href="' + eData.uriPageRequester + '">' +
							'review other ' + eData.requestName + ' requests</a>.</p>'
					});
				}
			}

		}



		// ============
		// ---- APPROVED
		// ============

		if (eData.requestStatus == "Approved") {

			console.log('RS = approved');

			if (typeof (eData.eventSpaceNotifications.approved) != "undefined") {

				// admin
				if (typeof (eData.eventSpaceNotifications.approved.admin) != "undefined") {
					if (eData.eventSpaceNotifications.approved.admin == 1) {

						console.log('gonna push admin email');

						$.each(eData.adminEmailArray, function (i, toAdmin) {
							notificationsToSend.push({
								'emailType': 'Notification',
								'caller': 'approved admin',
								'to': toAdmin,
								'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
								'bodyUnique': '<p>As needed, <a href="' + eData.uriFormAdmin + '">review the request\'s details</a> ' +
									'and contact ' + eData.requestedForLinkedNamesString + '.'
							});
						});
					}
				}

				// requester
				if (typeof (eData.eventSpaceNotifications.approved.requester) != "undefined") {
					if (eData.eventSpaceNotifications.approved.requester == 1) {

						console.log('gonna push requester email');

						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'approved requester',
							'to': eData.requesterEmail,
							'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
							'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
								'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
								'issues related thereto.' +
								eData.spaceReservedStarting +
								eData.spaceReservedEnding +
								eData.adminToRequesterMessageAddendum
						});
					}
				}

			}
		}



		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			var adminSendEOL = 0;
			var adminComparisonBank = [];

			if (typeof (eData.eventSpaceNotifications.endOfLife.admin) != "undefined") {
				if (eData.eventSpaceNotifications.endOfLife.admin == 1) {
					adminSendEOL = 1;
				} else if (eData.eventSpaceNotifications.endOfLife.admin != 0) {
					adminComparisonBank = eData.eventSpaceNotifications.endOfLife.admin;
					if (adminComparisonBank.indexOf(eData.requestStatus) > -1) {
						adminSendEOL = 1;
					}
				}
				if (adminSendEOL == 1) {
					$.each(eData.adminEmailArray, function (i, toAdmin) {
						notificationsToSend.push({
							'emailType': 'Notification',
							'caller': 'endOfLife admin',
							'to': toAdmin,
							'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
							'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
								'contact the requester</a> if you need to follow up.</p>'
						});
					});
				}
			}

			// requester
			var requesterSendEOL = 0;
			var requesterComparisonBank = [];

			if (typeof (eData.eventSpaceNotifications.endOfLife.requester) != "undefined") {
				if (eData.eventSpaceNotifications.endOfLife.requester == 1) {
					requesterSendEOL = 1;
				} else if (eData.eventSpaceNotifications.endOfLife.requester != 0) {
					requesterComparisonBank = eData.eventSpaceNotifications.endOfLife.requester;
					if (requesterComparisonBank.indexOf(eData.requestStatus) > -1) {
						requesterSendEOL = 1;
					}
				}
				if (requesterSendEOL == 1) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'endOfLife requester generic',
						'to': eData.requesterEmail,
						'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
						'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
							'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
							'issues related to this request.' +
							eData.adminToRequesterMessageAddendum
					});
				}
			}
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessVolunteerServicesReqNotifications = function (sData) {

		console.log('ProcessVolunteerServicesReqNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		sData.requesterPhone = $("input#Requester-Phone").val();
		sData.requesterDept = $("input#Requester-Department").val();

		sData.primaryStaffContactArray = JSON.parse($('input#Primary-Staff-Contact_TopSpan_HiddenInput').val());
		sData.primaryStaffContactName = sData.primaryStaffContactArray[0]["DisplayText"];
		sData.primaryStaffContactEmail = sData.primaryStaffContactArray[0]["Description"];

		sData.secondaryStaffContactArray = JSON.parse($('input#Secondary-Staff-Contact_TopSpan_HiddenInput').val());
		sData.secondaryStaffContactName = sData.secondaryStaffContactArray[0]["DisplayText"];
		sData.secondaryStaffContactEmail = sData.secondaryStaffContactArray[0]["Description"];

		sData.SpecialEventOrProject = $("textarea#Special-Event-or-Project").val();

		sData.VolunteerTasks = $("textarea#Volunteer-Tasks").val();
		sData.NumberOfVolunteersDesired = $("input#Number-of-Volunteers-Desired").val();
		sData.EventOrProjectDate = $().ReturnFormattedDateTime($("input#Event-or-Project-Date").val(), null, 'dddd, MMMM D, YYYY');
		sData.VolunteerArrivalTimeDate = $().ReturnFormattedDateTime($("input#Event-or-Project-Date").val(), null, 'YYYY-MM-DD');
		sData.VolunteerArrivalTimeTimezone = $().ReturnFormattedDateTime($("input#Event-or-Project-Date").val(), null, 'Z');
		sData.VolunteerArrivalTimeHours = $("select#hours-input_Volunteer-Arrival-Time option:selected").val();
		sData.VolunteerArrivalTimeMinutes = $("select#minutes-input_Volunteer-Arrival-Time option:selected").val();
		sData.VolunteerArrivalTime = $().ReturnFormattedDateTime(sData.VolunteerArrivalTimeDate + sData.VolunteerArrivalTimeHours + sData.VolunteerArrivalTimeMinutes + sData.VolunteerArrivalTimeTimezone, null, 'h:mm a');
		sData.EstimatedNumberOfHoursNeeded = $("input#Estimated-Number-of-Hours-Needed").val();
		sData.SpecialSkillsRequired = $("textarea#Special-Skills-Required").val();
		sData.AdditionalComments = $("textarea#Additional-Comments").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;


		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}

		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			var recipientEmailArray = [];
			var otherNotificationsInitialArray = [];

			recipientEmailArray.push(eData.primaryStaffContactEmail);
			recipientEmailArray.push(eData.secondaryStaffContactEmail);
			recipientEmailArray.push(eData.requesterEmail);

			if (typeof ($('input#Other-Notifications_TopSpan_HiddenInput').val()) !== 'undefined' && $('input#Other-Notifications_TopSpan_HiddenInput').val() !== "") {
				otherNotificationsInitialArray = JSON.parse($('input#Other-Notifications_TopSpan_HiddenInput').val());
			}
			$.each(otherNotificationsInitialArray, function (i, otherNotification) {
				recipientEmailArray.push(otherNotification.Description);
			});
			$.each(eData.adminEmailArray, function (i, adminEmail) {
				recipientEmailArray.push(adminEmail);
			});

			var uniqueRecipientEmailArray = [];
			$.each(recipientEmailArray, function (i, email) {
				if ($.inArray(email, uniqueRecipientEmailArray) === -1) uniqueRecipientEmailArray.push(email);
			});

			var beginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
				'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
				'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
				'with any questions, or <a href="' + eData.uriOverview + '">' +
				'review other ' + eData.requestName + ' requests</a>.</p>' +
				'<h2>Requester</h2>' +
				'<ul>' +
				'	<li><b>Name</b>: ' + eData.requesterName + '</li>' +
				'	<li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
				'	<li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
				'	<li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
				'</ul>' +
				'<h2>Staff Contacts</h2>' +
				'<ul>' +
				'	<li><b>Primary</b>: ' + eData.primaryStaffContactName + '</li>' +
				'	<li><b>Secondary</b>: ' + eData.secondaryStaffContactName + '</li>' +
				'</ul>' +
				'<h2>Project</h2>' +
				'<ul>' +
				'	<li><b>Special Event or Project</b>: ' + eData.SpecialEventOrProject + '</li>' +
				'	<li><b>Volunteer Tasks</b>: ' + eData.VolunteerTasks + '</li>' +
				'	<li><b>Number of Volunteers Desired</b>: ' + eData.NumberOfVolunteersDesired + '</li>' +
				'	<li><b>Event or Project Date</b>: ' + eData.EventOrProjectDate + '</li>' +
				'	<li><b>Volunteer Arrival Time</b>: ' + eData.VolunteerArrivalTime + '</li>' +
				'	<li><b>Estimated Number of Hours Needed</b>: ' + eData.EstimatedNumberOfHoursNeeded + '</li>' +
				'	<li><b>Special Skills Required</b>: ' + eData.SpecialSkillsRequired + '</li>' +
				'	<li><b>Additional Comments</b>: ' + eData.AdditionalComments + '</li>' +
				'</ul>';

			// all
			$.each(uniqueRecipientEmailArray, function (i, toRecipient) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife all',
					'to': toRecipient,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': beginningOfLifeBodyUnique
				});
			});
		}


		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
						'contact the requester</a> if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'endOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessReferralNotifications = function (sData) {

		console.log('ProcessReferralNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		sData.requesterPhone = $("input#Requester-Phone").val();
		sData.requesterDept = $("input#Requester-Department").val();

		sData.requesterPositionType = $("select#Requester-Position-Type").val();

		sData.candidateName = $("input#Candidate-Name").val();
		sData.candidatePositionType = $("select#Candidate-Position-Type").val();
		sData.candidatePhone = $("input#Candidate-Phone").val();
		sData.candidateEmail = $("input#Candidate-Email").val();
		sData.candidateReference = $("textarea#Reference").val();



		/*		sData.primaryStaffContactArray = JSON.parse($('input#Primary-Staff-Contact_TopSpan_HiddenInput').val());
				sData.primaryStaffContactName = sData.primaryStaffContactArray[0]["DisplayText"];
		
				sData.secondaryStaffContactArray = JSON.parse($('input#Secondary-Staff-Contact_TopSpan_HiddenInput').val());
				sData.secondaryStaffContactName = sData.secondaryStaffContactArray[0]["DisplayText"];
		
				sData.SpecialEventOrProject = $("textarea#Special-Event-or-Project").val();
		
				sData.VolunteerTasks = $("textarea#Volunteer-Tasks").val();
				sData.NumberOfVolunteersDesired = $("input#Number-of-Volunteers-Desired").val();
				sData.EventOrProjectDate = $().ReturnFormattedDateTime($("input#Event-or-Project-Date").val(), null, 'dddd, MMMM D, YYYY');
				sData.VolunteerArrivalTimeDate = $().ReturnFormattedDateTime($("input#Event-or-Project-Date").val(), null, 'YYYY-MM-DD');
				sData.VolunteerArrivalTimeTimezone = $().ReturnFormattedDateTime($("input#Event-or-Project-Date").val(), null, 'Z');
				sData.VolunteerArrivalTimeHours = $("select#hours-input_Volunteer-Arrival-Time option:selected").val();
				sData.VolunteerArrivalTimeMinutes = $("select#minutes-input_Volunteer-Arrival-Time option:selected").val();
				sData.VolunteerArrivalTime = $().ReturnFormattedDateTime(sData.VolunteerArrivalTimeDate + sData.VolunteerArrivalTimeHours + sData.VolunteerArrivalTimeMinutes + sData.VolunteerArrivalTimeTimezone, null, 'h:mm a');
				sData.EstimatedNumberOfHoursNeeded = $("input#Estimated-Number-of-Hours-Needed").val();
				sData.SpecialSkillsRequired = $("textarea#Special-Skills-Required").val();
				sData.AdditionalComments = $("textarea#Additional-Comments").val();
		*/
		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;


		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}

		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			console.log("eData.devAdminNotifications");
			console.log(eData.devAdminNotifications);

			// query
			if (typeof (eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

				eData = $.extend(
					$().GetFieldsFromOneRow({
						"webURL": "https://bmos.sharepoint.com/sites/hubprod",
						"listName": "Component Group Log",
						"select": [{
							"nameHere": "submittedRecipientsVerbose",
							"nameInList": "DevAdminNotifications"
						}],
						"where": {
							"field": "ComponentGroupID",
							"type": "Number",
							"value": 3,
						}
					}),
					eData
				);

			} else {

				eData = $.extend(
					$().GetFieldsFromOneRow({
						"webURL": "https://bmos.sharepoint.com/sites/hubprod",
						"listName": "Refer a Friend Notification Recipients",
						"select": [{
							"nameHere": "submittedRecipientsVerbose",
							"nameInList": "Recipients"
						}],
						"where": {
							"field": "Title",
							"type": "Text",
							"value": eData.candidatePositionType,
						}
					}),
					eData
				);
			}

			eData.allReferralNotificationRecipients = $().ReturnUserEmailStringAndArray(eData.submittedRecipientsVerbose).array;
			eData.allReferralNotificationRecipients.push(eData.requesterEmail);

			var beginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new referral. You can ' +
				'<a href="' + eData.uriRequest + '">review this referral\'s details</a>, ' +
				'<a href="mailto:' + eData.requesterEmail + '">contact the referrer</a> ' +
				'with any questions, or <a href="' + eData.uriOverview + '">' +
				'review other referrals</a>.</p>' +
				'<h2>About the Referrer</h2>' +
				'<ul>' +
				'	<li><b>Name</b>: ' + eData.requesterName + '</li>' +
				'	<li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
				'	<li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
				'	<li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
				'	<li><b>Position Type</b>: ' + eData.requesterPositionType + '</li>' +
				'</ul>' +
				'<h2>About the Referred Candidate</h2>' +
				'<ul>' +
				'	<li><b>Name</b>: ' + eData.candidateName + '</li>' +
				'	<li><b>Position Type</b>: ' + eData.candidatePositionType + '</li>' +
				'	<li><b>Phone</b>: ' + eData.candidatePhone + '</li>' +
				'	<li><b>Email</b>: ' + eData.candidateEmail + '</li>' +
				'	<li><b>Reference</b>: ' + eData.candidateReference + '</li>' +
				'</ul>' +
				'<h2>Office Use Only</h2>' +
				'<ul>' +
				'	<li><b>Candidate Hired As</b>: </li>' +
				'	<li><b>Candidate Hired On</b>: </li>' +
				'	<li><b>Passes Awarded</b>: </li>' +
				'	<li><b>Card sent</b>: </li>' +
				'	<li><b>Payroll Check Request</b> (if applicable): </li>' +
				'</ul>';

			// all
			$.each(eData.allReferralNotificationRecipients, function (i, toRecipient) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife all',
					'to': toRecipient,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': beginningOfLifeBodyUnique
				});
			});
		}


		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
						'contact the requester</a> if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'endOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessMCProjectReqNotifications = function (sData) {

		console.log('ProcessMCProjectReqNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		sData.requesterPhone = $("input#Requester-Phone").val();
		sData.requesterDept = $("input#Requester-Department").val();

		sData.ProjectType = $("select#Project-Type").val();
		sData.DescribeOtherProjectType = $("textarea#Describe-Other-Project-Type").val();
		sData.SignType = $("select#Sign-Type").val();
		sData.DescribeOtherSignType = $("textarea#Describe-Other-Sign-Type").val();
		sData.NameplateType = $("select#Nameplate-Type").val();
		sData.DescribeOtherNameplateType = $("textarea#Describe-Other-Nameplate-Type").val();
		sData.NameplateName = $("input#Nameplate-Name").val();
		sData.NameplateDept = $("input#Nameplate-Dept").val();
		if ($('input#budget_dept').is(':checked')) {
			sData.Budget = "My department pays";
		} else if ($('input#budget_marcom').is(':checked')) {
			sData.Budget = "MarCom pays";
		} else {
			sData.Budget = "";
		}
		sData.Quantity = $("input#Quantity").val();
		sData.NeededDate = $().ReturnFormattedDateTime($("input#Needed-Date").val(), null, 'MMMM D');
		sData.EventDate = $().ReturnFormattedDateTime($("input#Event-Date").val(), null, 'MMMM D');
		sData.Description = $("textarea#Description").val();
		sData.hasAttachments = "No";
		$('input.mos-drag-and-drop-file-name').each(function () {
			if (typeof ($(this).val()) !== "undefined" && $(this).val() != '') {
				sData.hasAttachments = "Yes";
			}
		});

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;


		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}

		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			var adminBeginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
				'<a href="' + eData.uriRequest + '">review this request\'s details and retrieve attachments</a>, ' +
				'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
				'with any questions, or <a href="' + eData.uriOverview + '">' +
				'review other ' + eData.requestName + ' requests</a>.</p>' +
				'<h2>Request and Requester</h2>' +
				'<ul>' +
				'	<li><b>Request Nickname</b>: ' + eData.requestNick + '</li>' +
				'	<li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
				'	<li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
				'	<li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
				'</ul>' +
				'<h2>Project</h2>' +
				'<ul>' +
				'	<li><b>Project Type</b>: ' + eData.ProjectType + '</li>' +
				'	<li><b>Other Project Type Description</b>: ' + eData.DescribeOtherProjectType + '</li>' +
				'	<li><b>Sign Type</b>: ' + eData.SignType + '</li>' +
				'	<li><b>Other Sign Type Description</b>: ' + eData.DescribeOtherSignType + '</li>' +
				'	<li><b>Nameplate Type</b>: ' + eData.NameplateType + '</li>' +
				'	<li><b>Other Nameplate Type Description</b>: ' + eData.DescribeOtherNameplateType + '</li>' +
				'	<li><b>Nameplate Name</b>: ' + eData.NameplateName + '</li>' +
				'	<li><b>Nameplate Dept</b>: ' + eData.NameplateDept + '</li>' +
				'	<li><b>Budget</b>: ' + eData.Budget + '</li>' +
				'	<li><b>Quantity</b>: ' + eData.Quantity + '</li>' +
				'	<li><b>Date Needed</b>: ' + eData.NeededDate + '</li>' +
				'	<li><b>Event Date</b>: ' + eData.EventDate + '</li>' +
				'	<li><b>Description</b>: ' + eData.Description + '</li>' +
				'	<li><b>Attachments</b>: ' + eData.hasAttachments + '</li>' +
				'</ul>';

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': adminBeginningOfLifeBodyUnique
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'beginningOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'new request received',
				'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
					'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
					'with any questions, or <a href="' + eData.uriOverview + '">' +
					'review other ' + eData.requestName + ' requests</a>.</p>'
			});

		}


		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
						'contact the requester</a> if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'endOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};




	$.fn.ProcessTestNotifications = function (sData) {

		console.log('ProcessTestNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (false) {
			console.log('eData');
			console.log(eData);
		}

		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
						'<a href="' + eData.uriRequest + '">review this request\'s details.'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'beginningOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'new request received',
				'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
					'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
					'with any questions, or <a href="' + eData.uriOverview + '">' +
					'review other ' + eData.requestName + ' requests</a>.</p>'
			});

		}



		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
						'contact the requester</a> if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'endOfLife requester generic',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessPhotoReqNotifications = function (sData) {

		console.log('ProcessPhotoReqNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		sData.requesterPhone = $("input#Requester-Phone").val();
		sData.requesterDept = $("input#Requester-Department").val();

		sData.neededDate = $().ReturnFormattedDateTime($("input#Needed-Date").val(), null, 'MMMM D');
		sData.fileType = $("input#File-Type").val();
		sData.description = $("textarea#Description").val();
		if ($('input#Attachment').val() != '') {
			sData.hasAttachments = "Yes";
		} else {
			sData.hasAttachments = "";
		}
		sData.usage = $("textarea#Usage").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriPageAdmin = mData.uriAdmin;
		mData.uriPageRequester = mData.uriRequester;
		mData.uriPageApprover = 'https://bmos.sharepoint.com';

		mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
		mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
		mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			var adminBeginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
				'<a href="' + eData.uriFormAdmin + '">review this request\'s details and retrieve attachments</a>, ' +
				'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
				'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
				'review other ' + eData.requestName + ' requests</a>.</p>' +
				'<h2>Request and Requester</h2>' +
				'<ul>' +
				'	<li><b>Request Nickname</b>: ' + eData.requestNick + '</li>' +
				'	<li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
				'	<li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
				'	<li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
				'</ul>' +
				'<h2>Photo</h2>' +
				'<ul>' +
				'	<li><b>Date Needed</b>: ' + eData.neededDate + '</li>' +
				'	<li><b>File Type</b>: ' + eData.fileType + '</li>' +
				'	<li><b>Description</b>: ' + eData.description + '</li>' +
				'	<li><b>Attachments</b>: ' + eData.hasAttachments + '</li>' +
				'	<li><b>Usage</b>: ' + eData.usage + '</li>' +
				'</ul>';

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': adminBeginningOfLifeBodyUnique
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'beginningOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'new request received',
				'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
					'<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
					'with any questions, or <a href="' + eData.uriPageRequester + '">' +
					'review other ' + eData.requestName + ' requests</a>.</p>'
			});

		}


		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
						'contact the requester</a> if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'endOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessLogoReqNotifications = function (sData) {

		console.log('ProcessLogoReqNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();


		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		sData.requesterPhone = $("input#Requester-Phone").val();
		sData.requesterDept = $("input#Requester-Department").val();




		sData.projectName = $("input#Project-Name").val();
		sData.neededDate = $().ReturnFormattedDateTime($("input#Needed-Date").val(), null, 'MMMM D');
		sData.fileType = $("input#File-Type").val();
		sData.description = $("textarea#Description").val();
		if ($('input#Attachment').val() != '') {
			sData.hasAttachments = "Yes";
		} else {
			sData.hasAttachments = "";
		}
		sData.usage = $("select#Usage").val();
		sData.usageExplanation = $("textarea#Usage-Explanation").val();





		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriPageAdmin = mData.uriAdmin;
		mData.uriPageRequester = mData.uriRequester;
		mData.uriPageApprover = 'https://bmos.sharepoint.com';

		mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
		mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
		mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			var adminBeginningOfLifeBodyUnique = '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
				'<a href="' + eData.uriFormAdmin + '">review this request\'s details and retrieve attachments</a>, ' +
				'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
				'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
				'review other ' + eData.requestName + ' requests</a>.</p>' +
				'<h2>Request and Requester</h2>' +
				'<ul>' +
				'	<li><b>Project Name</b>: ' + eData.projectName + '</li>' +
				'	<li><b>Email</b>: ' + eData.requesterEmail + '</li>' +
				'	<li><b>Phone</b>: ' + eData.requesterPhone + '</li>' +
				'	<li><b>Dept</b>: ' + eData.requesterDept + '</li>' +
				'</ul>' +
				'<h2>Photo</h2>' +
				'<ul>' +
				'	<li><b>Date Needed</b>: ' + eData.neededDate + '</li>' +
				'	<li><b>File Type</b>: ' + eData.fileType + '</li>' +
				'	<li><b>Description</b>: ' + eData.description + '</li>' +
				'	<li><b>Attachments</b>: ' + eData.hasAttachments + '</li>' +
				'	<li><b>Usage</b>: ' + eData.usage + '</li>' +
				'	<li><b>Usage Explanation</b>: ' + eData.usageExplanation + '</li>' +
				'</ul>';

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': adminBeginningOfLifeBodyUnique
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'beginningOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'new request received',
				'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
					'<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
					'with any questions, or <a href="' + eData.uriPageRequester + '">' +
					'review other ' + eData.requestName + ' requests</a>.</p>'
			});

		}


		// ============
		// ---- END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
						'contact the requester</a> if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'endOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessPromoReqNotifications = function (sData) {

		console.log('ProcessPromoReqNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');
		sData.requestNick = $("input#Request-Nickname").val();

		sData.offeringTitle = $("input#Offering-Title").val();
		sData.webListingURL = $("input#Web-Listing-Link").val();

		if ($("input#date-input_Offering-Beginning-Datetime").val() != '') {
			sData.beginningEventDate = $().ReturnFormattedDateTime($("input#date-input_Offering-Beginning-Datetime").val(), null, 'MMMM D, YYYY');
		} else {
			sData.beginningEventDate = '';
		}

		if ($("input#Offering-Beginning-Date").val() != '') {
			sData.beginningRunDate = $().ReturnFormattedDateTime($("input#Offering-Beginning-Date").val(), null, 'MMMM D, YYYY');
		} else {
			sData.beginningRunDate = '';
		}

		if ($("input#Text-Edited-Date").val() != '') {
			sData.textEditedDate = $().ReturnFormattedDateTime($("input#Text-Edited-Date").val(), null, 'MMMM D');
		} else {
			sData.textEditedDate = '';
		}

		if ($("input#Web-Live-Date").val() != '') {
			sData.webLiveDate = $().ReturnFormattedDateTime($("input#Web-Live-Date").val(), null, 'MMMM D');
		} else {
			sData.webLiveDate = '';
		}

		sData.pointPerson = $("select#Point-Person").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriOverview = mData.fullSiteBaseURL + "/SitePages/" + mData.pageToken + ".aspx"
		mData.uriRequest = mData.uriOverview + "?r=" + rData.requestID;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}

		if (rData.reqStatusIsNew == 1) {



			// ============
			// ---- BEGINNING OF LIFE (PENDING APPROVAL)
			// ============


			if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

				console.log('beginningOfLife = 1');

				// query
				if (typeof (eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Component Group Log",
							"select": [{
								"nameHere": "pendingApprovalRecipientsVerbose",
								"nameInList": "DevAdminNotifications"
							}],
							"where": {
								"field": "ComponentGroupID",
								"type": "Number",
								"value": 3,
							}
						}),
						eData
					);

				} else {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Promo Request Notification Recipients",
							"select": [{
								"nameHere": "pendingApprovalRecipientsVerbose",
								"nameInList": "Recipients"
							}],
							"where": {
								"field": "Title",
								"type": "Text",
								"value": "Pending Approval",
							}
						}),
						eData
					);
				}

				eData.pendingApprovalRecipients = $().ReturnUserEmailStringAndArray(eData.pendingApprovalRecipientsVerbose).array;

				// admin
				$.each(eData.pendingApprovalRecipients, function (i, toAdmin) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'beginningOfLife admin',
						'to': toAdmin,
						'subject': eData.subjectPreface + 'new request received',
						'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. Please ' +
							'<a href="' + eData.uriRequest + '">approve (or disapprove) the request, ' +
							'set a point person, and set Text Edited and Web Live dates</a> soon. ' +
							'You can also <a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
							'with any questions or <a href="' + eData.uriOverview + '">review ' +
							'other ' + eData.requestName + ' requests</a>.</p>'
					});
				});

				// requester
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife requester',
					'to': eData.requesterEmail,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
						'<a href="' + eData.uriRequest + '">review this request\'s details</a>, ' +
						'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
						'with any questions, or <a href="' + eData.uriOverview + '">' +
						'review other ' + eData.requestName + ' requests</a>.</p>'
				});
			}



			// ============
			// ---- APPROVED
			// ============

			if (eData.requestStatus == "Approved") {

				console.log('RS = approved');

				// query
				if (typeof (eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Component Group Log",
							"select": [{
								"nameHere": "approvedRecipientsVerbose",
								"nameInList": "DevAdminNotifications"
							}],
							"where": {
								"field": "ComponentGroupID",
								"type": "Number",
								"value": 3,
							}
						}),
						eData
					);

				} else {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Promo Request Notification Recipients",
							"select": [{
								"nameHere": "approvedRecipientsVerbose",
								"nameInList": "Recipients"
							}],
							"where": {
								"field": "Title",
								"type": "Text",
								"value": "Approved",
							}
						}),
						eData
					);
				}

				eData.approvedRecipients = $().ReturnUserEmailStringAndArray(eData.approvedRecipientsVerbose).array;

				// admin
				$.each(eData.approvedRecipients, function (i, toAdmin) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'approved admin',
						'to': toAdmin,
						'subject': eData.subjectPreface + 'edit text by ' + eData.textEditedDate,
						'bodyUnique': '<p><a href="' + eData.uriRequest + '">Find out about this promotion</a> ' +
							'which requires text to be edited by ' + eData.textEditedDate + '.</p>' +
							'<p>When you\'re done, <a href="' + eData.uriRequest + '">change ' +
							'the request status</a>. As needed, <a href="mailto:' + eData.requesterEmail +
							'">contact the requester</a> or <a href="mailto:' + eData.adminEmailString +
							'">contact the admin</a> with any questions or <a href="' + eData.uriOverview +
							'">check up on this and any other requests</a>.</p>'
					});
				});

			}



			// ============
			// ---- TEXT EDITED
			// ============

			if (eData.requestStatus == "Text Edited") {

				console.log('RS = text edited');

				// query
				if (typeof (eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Component Group Log",
							"select": [{
								"nameHere": "textEditedRecipientsVerbose",
								"nameInList": "DevAdminNotifications"
							}],
							"where": {
								"field": "ComponentGroupID",
								"type": "Number",
								"value": 3,
							}
						}),
						eData
					);

				} else {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Promo Request Notification Recipients",
							"select": [{
								"nameHere": "textEditedRecipientsVerbose",
								"nameInList": "Recipients"
							}],
							"where": {
								"field": "Title",
								"type": "Text",
								"value": "Text Edited",
							}
						}),
						eData
					);
				}

				eData.textEditedRecipients = $().ReturnUserEmailStringAndArray(eData.textEditedRecipientsVerbose).array;

				// admin
				$.each(eData.textEditedRecipients, function (i, toAdmin) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'text edited admin',
						'to': toAdmin,
						'subject': eData.subjectPreface + 'list on website by ' + eData.webLiveDate,
						'bodyUnique': '<p><a href="' + eData.uriRequest + '">Find out about this promotion</a> ' +
							'which requires a web listing by ' + eData.webLiveDate + '.</p>' +
							'<p>When the web listing is published, <a href="' + eData.uriRequest + '">indicate ' +
							'this and change the request status</a>. As needed, <a href="mailto:' + eData.requesterEmail +
							'">contact the requester</a> or <a href="mailto:' + eData.adminEmailString +
							'">contact the admin</a> with any questions or <a href="' + eData.uriOverview +
							'">check up on this and any other requests</a>.</p>'
					});
				});

			}



			// ============
			// ---- WEB LIVE
			// ============

			if (eData.requestStatus == "Web Live") {

				console.log('RS = web live');

				// query
				if (typeof (eData.devAdminNotifications) != 'undefined' && eData.devAdminNotifications == 1) {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Component Group Log",
							"select": [{
								"nameHere": "webLiveRecipientsVerbose",
								"nameInList": "DevAdminNotifications"
							}],
							"where": {
								"field": "ComponentGroupID",
								"type": "Number",
								"value": 3,
							}
						}),
						eData
					);

				} else {

					eData = $.extend(
						$().GetFieldsFromOneRow({
							"webURL": "https://bmos.sharepoint.com/sites/hubprod",
							"listName": "Promo Request Notification Recipients",
							"select": [{
								"nameHere": "webLiveRecipientsVerbose",
								"nameInList": "Recipients"
							}],
							"where": {
								"field": "Title",
								"type": "Text",
								"value": "Web Live",
							}
						}),
						eData
					);
				}

				eData.webLiveRecipients = $().ReturnUserEmailStringAndArray(eData.webLiveRecipientsVerbose).array;

				// admin
				$.each(eData.webLiveRecipients, function (i, toAdmin) {
					notificationsToSend.push({
						'emailType': 'Notification',
						'caller': 'web live admin',
						'to': toAdmin,
						'subject': eData.subjectPreface + 'web listing is live',
						'bodyUnique': '<p><a href="' + eData.webListingURL + '">The web listing</a> is now live ' +
							'for "' + eData.offeringTitle + '" which begins on ' + eData.beginningEventDate + eData.beginningRunDate + '.</p>' +
							'<p>' + eData.pointPerson + ', when all promotions are completed, <a href="' + eData.uriRequest +
							'">mark them as such and update the request status</a>.</p>' +
							'<p>As needed, <a href="mailto:' + eData.requesterEmail +
							'">contact the requester</a> or <a href="' + eData.uriOverview +
							'">check up on this and any other requests</a>.</p>'
					});
				});

			}



			// ============
			// ---- END OF LIFE
			// ============

			if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

				// requester
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife requester generic',
					'to': eData.requesterEmail,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>This is the <a href="' + eData.uriRequest + '">request you nicknamed "' + eData.requestNick +
						'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
						'issues related to this request.'
				});
			}



			// ============
			// ---- 7. SEND
			// ============

			// for debugging
			if (true) {
				console.log('notificationsToSend');
				console.log(notificationsToSend);
			}

			$().SendEmails(notificationsToSend).then(function () {
				// return promise
				emailProcessingPromise.resolve();
			});

			return emailProcessingPromise.promise();
		}
	};



	$.fn.ProcessInterpreterReqNotifications = function (sData) {

		console.log('ProcessInterpreterReqNotifications');

		// ============
		// ---- 1. SET UP VARS
		// ============

		var emailProcessingPromise = new $.Deferred();

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.interpreterName = $("input#Interpreter-Name").val();
		sData.invoiceAmount = $("input#Invoice-Amount").val();
		sData.chargeAccount = $("input#Charge-Account").val();

		if (StrInStr(sData.invoiceAmount, "$", 0) == false) {
			sData.invoiceAmount = "$" + sData.invoiceAmount;
		}

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');
		sData.completedByLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Completed By');

		sData.requestNick = $("input#Request-Nickname").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriPageAdmin = mData.uriAdmin;
		mData.uriPageRequester = mData.uriRequester;
		mData.uriPageApprover = 'https://bmos.sharepoint.com';

		mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
		mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
		mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- 2. BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'beginningOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
						'<a href="' + eData.uriFormAdmin + '">review the details at any time</a>. ' +
						'After submitting the request to the Commission, <a href="' + eData.uriFormAdmin + '">' +
						'change the request status to reflect this</a>.</p>' +
						'<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
						'with any questions or <a href="' + eData.uriPageAdmin + '">' +
						'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'beginningOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'new request received',
				'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
					'<a href="' + eData.uriFormRequester + '">review the details at any time</a> ' +
					'and you\'ll be notified again when an interpreter is assigned.</p>' +
					'<p>In the meantime, you can <a href="mailto:' + eData.adminEmailString + '">' +
					'contact the admin</a> with any questions or <a href="' + eData.uriPageRequester + '">' +
					'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
			});
		}



		// ============
		// ---- 3. SUBMITTED TO COMMISSION
		// ============

		if (eData.requestStatus == 'Submitted to Commission') {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'submitted to commission admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'submitted to commission',
					'bodyUnique': '<p>When an interpreter has been assigned, <a href="' + eData.uriFormAdmin + '">' +
						'change the request status and enter the interpreter\'s name</a>.</p> ' +
						'<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
						'with any questions or <a href="' + eData.uriPageAdmin + '">' +
						'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
				});
			});

		}



		// ============
		// ---- 4. INTERPRETER ASSIGNED
		// ============

		if (eData.requestStatus == 'Interpreter Assigned') {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'interpreter assigned admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'interpreter assigned',
					'bodyUnique': '<p>When an invoice has been received, <a href="' + eData.uriFormAdmin + '">' +
						'change the request status and enter the charge amount</a>.</p> ' +
						'<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
						'with any questions or <a href="' + eData.uriPageAdmin + '">' +
						'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'interpreter assigned requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'interpreter assigned',
				'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". The interpreter is ' +
					sData.interpreterName + '. You\'ll be notified again when the invoice is received.</p>' +
					'<p>In the meantime, <a href="https://bmos.sharepoint.com/_layouts/15/WopiFrame.aspx?sourcedoc=%7BD12C04AF-2C53-4575-9491-5FFBE4EC864A%7D&action=default">' +
					'find out more about working with an interpreter</a>, <a href="mailto:' + eData.adminEmailString + '">' +
					'contact the admin</a> with any questions, or <a href="' + eData.uriPageRequester + '">' +
					'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
			});
		}



		// ============
		// ---- 5. INVOICE RECEIVED
		// ============

		if (eData.requestStatus == 'Invoice Received') {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'invoice received admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'invoice received',
					'bodyUnique': '<p>When you\'ve charged the designated account, <a href="' + eData.uriFormAdmin + '">' +
						'change the request status to reflect that the work for this request has been completed</a>.</p>' +
						'<p>In the meantime, you can contact ' + eData.requestedForLinkedNamesString + ' ' +
						'with any questions or <a href="' + eData.uriPageAdmin + '">' +
						'check up on this and any other ' + eData.requestName + ' requests</a>.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'invoice received requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'invoice received',
				'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". The total cost for interpretation is ' +
					sData.invoiceAmount + '. This will be charged to account #' + sData.chargeAccount + ' in two business days unless you ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> to change the account number.'
			});
		}



		// ============
		// ---- 6. END OF LIFE
		// ============

		if (typeof (eData.endOfLife) != 'undefined' && eData.endOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'emailType': 'Notification',
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to contact ' + eData.requestedForLinkedNamesString + ' ' +
						'if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'emailType': 'Notification',
				'caller': 'endOfLife requester generic',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$().SendEmails(notificationsToSend).then(function () {
			// return promise
			emailProcessingPromise.resolve();
		});

		return emailProcessingPromise.promise();
	};



	$.fn.ProcessFunctionSpaceReqNotifications = function (sData) {

		console.log('ProcessFunctionSpaceReqNotifications');

		// ============
		// ---- SET UP VARS
		// ============

		sData.requesterName = $("input#Requester-Name").val();
		sData.requesterEmail = $("input#Requester-Email").val();

		sData.requestedForLinkedNamesString = $().ReturnNamesWLinkedEmailsFromPP('Requested For');

		sData.requestNick = $("input#Request-Nickname").val();

		sData.approvalNotes = $("textarea#Approval-Notes").val();

		mData.subjectPreface = mData.requestName + ' Request #' + rData.requestID + ': ';

		mData.uriPageAdmin = mData.uriAdmin;
		mData.uriPageRequester = mData.uriRequester;
		mData.uriPageApprover = 'https://bmos.sharepoint.com';

		mData.uriFormAdmin = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageAdmin;
		mData.uriFormRequester = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageRequester;
		mData.uriFormApprover = mData.uriRequest + '?requestID=' + rData.requestID + '&returnURI=' + mData.uriPageApprover;

		var eData = $.extend(sData, rData, mData, uData, fData);

		var notificationsToSend = [];

		// for debugging
		if (true) {
			console.log('eData');
			console.log(eData);
		}



		// ============
		// ---- BEGINNING OF LIFE
		// ============

		if (typeof (eData.beginningOfLife) != 'undefined' && eData.beginningOfLife == 1) {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'caller': 'beginningOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + 'new request received',
					'bodyUnique': '<p>' + eData.requesterName + ' has submitted a new request. You can ' +
						'<a href="' + eData.uriFormAdmin + '">review this request\'s details</a>, ' +
						'<a href="mailto:' + eData.requesterEmail + '">contact the requester</a> ' +
						'with any questions, or <a href="' + eData.uriPageAdmin + '">' +
						'review other ' + eData.requestName + ' requests</a>.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'caller': 'beginningOfLife requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + 'new request received',
				'bodyUnique': '<p>The request you nicknamed "' + eData.requestNick + '" has been received. You can ' +
					'<a href="' + eData.uriFormRequester + '">review this request\'s details</a>, ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> ' +
					'with any questions, or <a href="' + eData.uriPageRequester + '">' +
					'review other ' + eData.requestName + ' requests</a>.</p>'
			});
		}


		// ============
		// ---- APPROVED
		// ============

		if (eData.requestStatus == "Approved") {

			console.log('RS = approved');

			var messageAddendum = '';
			if (eData.approvalNotes != '') {
				messageAddendum = '<p>From ECS:</p>' +
					'<blockquote>' + eData.approvalNotes + '</blockquote>';
			}

			// requester
			notificationsToSend.push({
				'caller': 'approved requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related thereto.</p>' +
					messageAddendum
			});
		}



		// ============
		// ---- DISAPPROVED
		// ============

		if (eData.requestStatus == "Disapproved") {

			console.log('RS = disapproved');

			var messageAddendum = '';
			if (eData.approvalNotes != '') {
				messageAddendum = '<p>From ECS:</p>' +
					'<blockquote>' + eData.approvalNotes + '</blockquote>';
			}

			// requester
			notificationsToSend.push({
				'caller': 'disapproved requester',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the request you nicknamed "' + eData.requestNick + '". You can ' +
					'<a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related thereto.</p>' +
					messageAddendum
			});
		}



		// ============
		// ---- CANCELLED
		// ============

		if (eData.requestStatus == 'Cancelled') {

			// admin
			$.each(eData.adminEmailArray, function (i, toAdmin) {
				notificationsToSend.push({
					'caller': 'endOfLife admin',
					'to': toAdmin,
					'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
					'bodyUnique': '<p>Feel free to <a href="mailto:' + eData.requesterEmail + '">' +
						'contact the requester</a> if you need to follow up.</p>'
				});
			});

			// requester
			notificationsToSend.push({
				'caller': 'endOfLife requester generic',
				'to': eData.requesterEmail,
				'subject': eData.subjectPreface + eData.requestStatus.toLowerCase(),
				'bodyUnique': '<p>This is the <a href="' + eData.uriFormAdmin + '">request you nicknamed "' + eData.requestNick +
					'"</a>. Please <a href="mailto:' + eData.adminEmailString + '">contact the admin</a> with any ' +
					'issues related to this request.'
			});
		}



		// ============
		// ---- 7. SEND
		// ============

		// for debugging
		if (true) {
			console.log('notificationsToSend');
			console.log(notificationsToSend);
		}

		$.each(notificationsToSend, function (i, n) {
			setTimeout(function () {
				$().SendStandardHubEmail(n);
			}, 500);
		});
	};



	$.fn.ValidateForm = function (options) {

		// set form validation status flag
		var validForm = true;

		// remove any previoulsy-inserted error messages
		$("div#request-form div.error-message").remove();
		$("div#request-form div.contains-errors").removeClass("contains-errors");

		// for each input, select, and textarea
		$(this).find("input, select, textarea, div.mos-drag-and-drop-file-attachment").each(function () {

			// set element flag
			var invalidField = 0;
			var msg = 0;

			// get element's value
			var value = $.trim($(this).val());

			// get element's special validation type, if exists
			addtlValidationType = $(this).attr("data-validation");

			// if element has "required" class
			if ($(this).hasClass("required")) {

				// console.log($(this).attr("id"));

				// if this is a file attachment
				if ($(this).hasClass("mos-drag-and-drop-file-attachment")) {
					var fileStorageNameForValidation = $(this).find("input.mos-drag-and-drop-file-name").val();
					if (typeof (fileStorageNameForValidation) == "undefined" || fileStorageNameForValidation == "") {
						invalidField = 1;
						msg = "At least one file must be selected";
					}

					// if this element has a type attribute defined
				} else if (typeof ($(this).attr("type")) != "undefined") {

					// if element is of type radio or checkbox and there are no elelements in the named set checked
					if (($(this).attr("type") == "radio" || $(this).attr("type") == "checkbox") && ($('input[name="' + $(this).attr("name") + '"]:checked').val() == undefined)) {
						invalidField = 1;
						msg = "At least one must be selected";

						// // if element is of type file and there is no file reference
						// } else if ($(this).attr("type") == "file" && typeof(($(this))[0].files[0]) == 'undefined') {
						// 	invalidField = 1;
						// 	msg = "At least one file must be selected";

						// if this element is of a type other than radio, checkbox, or file and it has no value
					} else if ($(this).attr("type") != "radio" && $(this).attr("type") != "checkbox" && $(this).attr("type") != "file" && (value.length == 0)) {
						invalidField = 1;
					}
					// if this element does not have a type attribute defined and it has no value
				} else if ((value.length == 0)) {
					invalidField = 1;
				}
			}

			// (whether this element is required or not,)
			// if it has an additional validation type of validAttachment
			// (this will be a div and thus will not have a value)
			if (addtlValidationType != undefined && addtlValidationType == "validAttachment") {
				validAttachment(this);
				// if it has an additional validation type and it has a value
			} else if (addtlValidationType != undefined && value != undefined && value.length > 0) {
				// perform the additional validation

				var addtlValidationTypeObject = isJSONParsable(ReplaceAll('DOUBLEQUOTE', '"', addtlValidationType));

				if (typeof (addtlValidationTypeObject) == "object") {
					var addtlValidationTypeName = addtlValidationTypeObject.name;
				} else {
					var addtlValidationTypeName = addtlValidationType;
				}

				switch (addtlValidationTypeName.trim()) {
					case "validPeoplePicker":
						validPeoplePicker(value, this);
						break;
					case "validDate":
						validDate(value, this);
						break;
					case "validEmail":
						validEmail(value, this);
						break;
					case "validNumber":
						validNumber(value, this);
						break;
					case "validPositiveInteger":
						validPositiveInteger(value, this);
						break;
					case "validSSN":
						validSSN(this);
						break;
					case "validPhone":
						validPhone(value, this);
						break;
					case "validURL":
						validURL(value, this);
						break;
					case "validMaxQuantityChecked":
						validMaxQuantityChecked(this);
						break;
					case "validAllVisibleCheckedInSet":
						validAllVisibleCheckedInSet(addtlValidationTypeObject.checkboxFields, addtlValidationTypeObject.errorField, addtlValidationTypeObject.errorFieldValue, addtlValidationTypeObject.errorMessage);
						break;
				}
			}

			// if the element is invalid, set the designated error message
			if (invalidField == 1) {
				$().SetErrorMessage(this, msg);
			}
		});

		// if there are any invalid fields
		if ($("div#request-form div.error-message").first().html() != null) {
			// alter the form validation status
			validForm = false;
		}

		// return the form validation status
		return validForm;
	};



	$.fn.SetErrorMessage = function (element, msg) {
		if (typeof (msg) == 'undefined') {
			msg = 'Cannot be blank';
		} else if (msg == "") {
			msg = 'Cannot be blank';
		}

		if ($(element).closest("div.control").parent("div.label-and-control").hasClass("contains-errors") == false) {
			$(element).closest("div.control").append("<div class='error-message'>" + msg + "</div>");
			$(element).closest("div.control").parent("div.label-and-control").addClass("contains-errors");
		}
	};



	$.fn.RemoveErrorMessage = function (element) {
		$(element).closest("div.control").find("div.error-message").remove();
		$(element).closest("div.control").parent("div.label-and-control").removeClass("contains-errors");
	};



	$.fn.ValidateInRealTimeForPositiveInteger = function (value, element) {
		if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
			$().SetErrorMessage(element, 'Please enter a valid positive integer');
		} else {
			$().RemoveErrorMessage(element);
		}
	};



	$.fn.ValidateInRealTimeForPositiveGrantCostsInUSD = function (value, element) {
		if (!(/^((\$)?([0-9]{1,3})?(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?)?$/.test(value))) {
			$().SetErrorMessage(element, 'Please enter a positive number. Use numeric characters, optionally using commas to separate groups of three numerals and a decimal to separate the integer portion from the fractional portion of the number. Avoid all other characters, including spaces. Convert to USD, if grant will be in another currency.');
			return 0;
		} else {
			$().RemoveErrorMessage(element);
			return 1;
		}
	};



	$.fn.ValidateInRealTimeForPositiveNumberInUSDFormat = function (value, element) {
		if (!(/^((\$)?([0-9]{1,3})?(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?)?$/.test(value))) {
			$().SetErrorMessage(element, 'Please enter a positive number. Use numeric characters, optionally using commas to separate groups of three numerals and a decimal to separate the integer portion from the fractional portion of the number.');
			return 0;
		} else {
			$().RemoveErrorMessage(element);
			return 1;
		}
	};



	$.fn.ValidateInRealTimeForPositiveFloat = function (value, element) {
		if (!(/^((\$)?([0-9]{1,3})?(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?)?$/.test(value))) {
			$().SetErrorMessage(element, 'Please enter a valid positive number');
			return 0;
		} else {
			$().RemoveErrorMessage(element);
			return 1;
		}
	};



	$.fn.ValidateInRealTimeForDayOfWeek = function (value, element, dayOfWeek) {
		if (moment(value, "MMMM D, YYYY").day() != dayOfWeek) {
			$().SetErrorMessage(element, 'Please enter a Monday date');
		} else {
			$().RemoveErrorMessage(element);
		}
	};



	$.fn.ValidateInRealTimeForMaxQuantityCheckedInGroup = function (element, maxQuantityNumber, maxQuantityString) {
		if ($("input[name='" + $(element).attr("name") + "']:checked").length > maxQuantityNumber) {
			$().SetErrorMessage(element, 'Please select no more than ' + maxQuantityString);
		} else {
			$().RemoveErrorMessage(element);
		}
	};



	$.fn.ValidateInRealTimeForAllVisibleCheckedInSet = function (checkboxFields, errorFieldID, errorFieldValue, errorMessage) {

		if ($("#" + errorFieldID).val() == errorFieldValue) {

			var uncheckedInSet = 0;

			$.each(checkboxFields, function (i, checkboxField) {
				var checkboxSelector = '#' + ReplaceAll(" ", "", checkboxField);
				if ($(checkboxSelector).is(":visible") && !($(checkboxSelector).is(":checked"))) {
					uncheckedInSet++;
				}
			});

			if (uncheckedInSet > 0) {
				$().SetErrorMessage("#" + errorFieldID, errorMessage);
			} else {
				$().RemoveErrorMessage("#" + errorFieldID);
			}
		} else {
			$().RemoveErrorMessage("#" + errorFieldID);
		}
	}



	$.fn.WarnIfTimeEarlierThan = function (timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes, warningID) {

		if (typeof (timeOneHours) != "undefined" && typeof (timeOneMinutes) != "undefined" && typeof (timeTwoHours) != "undefined" && typeof (timeTwoMinutes) != "undefined") {

			var timeOneIsEarlier = $().ReturnTimeOneIsEarlierThanTimeTwo(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes);

			if (timeOneIsEarlier == 1) {
				if ($("#" + warningID).hasClass("hidden")) {
					$("#" + warningID).show("fast").removeClass("hidden");
				}
			}
		}
	};



	$.fn.WarnIfTimeLaterThan = function (timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes, warningID) {

		if (typeof (timeOneHours) != "undefined" && typeof (timeOneMinutes) != "undefined" && typeof (timeTwoHours) != "undefined" && typeof (timeTwoMinutes) != "undefined") {

			var timeOneIsLater = $().ReturnTimeOneIsLaterThanTimeTwo(timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes);

			if (timeOneIsLater == 1) {
				if ($("#" + warningID).hasClass("hidden")) {
					$("#" + warningID).show("fast").removeClass("hidden");
				}
			}
		}
	};



	$.fn.CreateWFHistoryItem = function (d) {
		// set up vars for new history item
		if (rData.requestID && rData.requestID != '') {
			var requestID = rData.requestID;
		} else {
			var requestID = 0;
		}
		var historyValuePairs = [
			['MOSAPI', '1'],
			['SWFListItemID', requestID],
			['Description', d],
		];
		// send value pairs to SPServices UpdateListItems to create a new item
		$().SPServices({
			operation: 'UpdateListItems',
			listName: 'Workflow History',
			webURL: StrInStr(mData.uriWFHistory, '/Lists/Workflow%20History', 1),
			batchCmd: 'New',
			ID: 0,
			valuepairs: historyValuePairs,
			completefunc: function (xData, Status) {
				notificationAttemptWFHistorySuccess = $().HandleListUpdateReturn(xData, Status, 'WF History List Error (CreateWFHistoryItem)');
			}
		});
	};



	$.fn.SendEmails = function (emailsToSend) {

		var emailSendingPromises = [];

		$.each(emailsToSend, function (i, emailData) {

			var standardizedHubEmail = $().CreateStandardHubEmail(emailData);

			emailSendingPromises.push($.ajax({
				url: "https://neso.mos.org/email/send",
				type: "POST",
				crossDomain: true,
				contentType: 'application/json',
				data: JSON.stringify(standardizedHubEmail),
				beforeSend: function () {
					$().CreateWFHistoryItem(standardizedHubEmail.type + ' Attempt -- ' + standardizedHubEmail.to + ', ' + standardizedHubEmail.subject);
				}
			})
				.done(function () {
					$().CreateWFHistoryItem(standardizedHubEmail.type + ' Success -- ' + standardizedHubEmail.to + ', ' + standardizedHubEmail.subject);
				})
				.fail(function () {
					$().CreateWFHistoryItem(standardizedHubEmail.type + ' Failure -- ' + standardizedHubEmail.to + ', ' + standardizedHubEmail.subject);
				}));
		});

		// wait for all promises to complete (pass or fail) 
		return $.when.apply($, emailSendingPromises).always(function () { });
	};



	$.fn.CreateStandardHubEmail = function (emailData) {

		return {
			'to': emailData.to,
			'from': 'The Hub <noreply@mos.org>',
			'subject': emailData.subject,
			'html': '<div style="font-family: \'wf_segoe-ui_normal\', \'Segoe UI\', \'Segoe WP\', Arial, sans-serif; ' +
				'	color: #212121; font-size: 15px">' +
				emailData.bodyUnique +
				'	<p style="font-weight: 700">The Hub</p>' +
				'</div>',
			'system': 'hub',
			'type': emailData.emailType,
			'event': emailData.caller
		};
	};



	$.fn.ProcessStandardHubEmail = function (p) {

		// augment message body
		p.body = '<div style="font-family: \'wf_segoe-ui_normal\', \'Segoe UI\', \'Segoe WP\', Arial, sans-serif; ' +
			'	color: #212121; font-size: 15px">' +
			p.bodyUnique +
			'	<p style="font-weight: 700">The Hub</p>' +
			'</div>';

		// send
		$().SendEmail(p);
	};



	function validPeoplePicker(value, element) {
		var ppArray = JSON.parse($(element).val());
		$.each(ppArray, function (i, p) {
			if (p.IsResolved == false) {
				$().SetErrorMessage(element, 'Please begin entering a name or email address, and then select people from the resulting list');
			}
		});
	}



	function validDate(value, element) {

		// ======================================================================================= //
		//  IMPORTANT CONTEXTUAL NOTE: Chrome's JS engine will construct a date from a value 
		//		in 'February 14' format by substituting 2001 for the missing year. We don't 
		//		want that to happen, and we don't want to require users to replace a year we 
		//		eliminated for friendly formatting. However, since 2001 may be used legitimately 
		//		at some point, we can't just test for 2001 and replace it. Thus, we don't use
		//		date construction alone for validation. Because values could be in the correct
		//		format but still not contain valid month names, etc., we don't use regexes alone
		//		for validation.
		// ======================================================================================= //

		// if field is not disabled
		if (typeof ($(element).attr('disabled')) != 'string') {
			var attemptDateConstruction = 0;

			// only allow the date construction test to be performed if value is in a known format
			//		(i.e., even if the JS engine *would* construct a date from the raw value, we're only going to 
			if (value.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/)) {
				attemptDateConstruction = 1;
			} else if (value.match(/([a-z]{3,9})\s(\d{1,2}),\s(\d{4})/i)) {
				attemptDateConstruction = 1;
			} else if (value.match(/([a-z]{3,9})\s(\d{1,2})/i)) {
				value += ', ' + moment().format('YYYY');
				$(element).val(value);
				attemptDateConstruction = 1;
			}

			// if either we haven't found a known format or we have but date construction fails
			if (attemptDateConstruction != 1 || !(!/Invalid|NaN/.test(new Date(value)))) {
				$().SetErrorMessage(element, 'Please enter a valid date');
			} else {
				var thisDate = new Date(value);
			}
		}
	}



	function validEmail(value, element) {
		if (!(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value))) {
			$().SetErrorMessage(element, 'Please enter a valid email address');
		}
	}



	function validNumber(value, element) {
		if (!(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))) {
			$().SetErrorMessage(element, 'Please enter a valid number');
		}
	}



	function validPositiveInteger(value, element) {
		if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
			$().SetErrorMessage(element, 'Please enter a valid positive integer');
		}
	}



	function validAllVisibleCheckedInSet(checkboxFields, errorField, errorFieldValue, errorMessage) {

		if ($("#" + errorField).val() == errorFieldValue) {

			var uncheckedInSet = 0;

			$.each(checkboxFields, function (i, checkboxField) {
				var checkboxSelector = '#' + ReplaceAll(" ", "", checkboxField);
				if ($(checkboxSelector).is(":visible") && !($(checkboxSelector).is(":checked"))) {
					uncheckedInSet++;
				}
			});

			if (uncheckedInSet > 0) {
				$().SetErrorMessage("#" + errorField, errorMessage);
			}
		}
	}



	function validSSN(value, element) {
		var regex = new RegExp("-", "g");
		value = value.replace(regex, "");
		var error = false;

		if (value.length != 9 || !(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))) {
			error = true;
		} else if (!(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))) {
			error = true;
		}
		if (error) {
			$().SetErrorMessage(element, 'Please enter a valid Social Security number');
		}
	}



	function validAttachment(element) {
		if ($(element).hasClass('attachment-error')) {
			$().SetErrorMessage(element, 'Please delete this unattached file.');
		}
	}



	function validURL(value, element) {
		var urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
		if (!urlPattern.test(value)) {
			$().SetErrorMessage(element, 'Please enter a valid URL');
		}
	}



	function validMaxQuantityChecked(element) {
		var maxQuantityNumber = $(element).attr("data-validation-quantity");
		var maxQuantityString = "";

		switch (maxQuantityNumber) {

			case "1":
				maxQuantityString = "one";
				break;

			case "2":
				maxQuantityString = "two";
				break;

			case "3":
				maxQuantityString = "three";
				break;

			case "4":
				maxQuantityString = "four";
				break;

			case "5":
				maxQuantityString = "five";
				break;

			case "6":
				maxQuantityString = "six";
				break;

			case "7":
				maxQuantityString = "seven";
				break;

			case "8":
				maxQuantityString = "eight";
				break;

			case "9":
				maxQuantityString = "nine";
				break;

			case "10":
				maxQuantityString = "ten";
				break;

		}

		if ($("input[name='" + $(element).attr("name") + "']:checked").length > maxQuantityNumber) {
			$().SetErrorMessage(element, 'Please select no more than ' + maxQuantityString);
		}
	}



	function validPhone(value, element) {
		var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
		if (!phoneNumberPattern.test(value)) {
			$().SetErrorMessage(element, 'Please enter a valid phone number');
		}
	}


	// ---- INITIALIZE & POPULATE CONTROLS


	function InitializePeoplePicker(peoplePickerElementId) {

		var schema = {};
		schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
		schema['SearchPrincipalSource'] = 15;
		schema['ResolvePrincipalSource'] = 15;
		schema['AllowMultipleValues'] = true;
		schema['MaximumEntitySuggestions'] = 50;
		schema['Width'] = '450px';

		this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);

		$('#' + peoplePickerElementId + '_TopSpan_HiddenInput').attr('data-validation', 'validPeoplePicker');
	}



	$.fn.PopulatePeoplePickerFromList = function (fieldNameOrSelector, userKeysAsString) {
		var metaObject = $().GetPeoplePickerMetaObject(fieldNameOrSelector);
		metaObject.picker.AddUserKeys(userKeysAsString, false);
	};



	$.fn.GetPeoplePickerMetaObject = function (fieldNameOrSelector) {
		// fieldNameOrSelector can be in any of these formats:
		//	 -	div#request-form #Requested-For
		//	 -	#Requested-For
		//	 -	Requested For
		var metaObject = {};
		metaObject.pickerID = ReplaceAll("\\.", "", ReplaceAll("#", "", ReplaceAll(" ", "-", ReplaceAll("div#request-form ", "", fieldNameOrSelector))));
		metaObject.pickerTopSpanID = $("#" + metaObject.pickerID + '_TopSpan')[0].id;
		metaObject.picker = SPClientPeoplePicker.SPClientPeoplePickerDict[metaObject.pickerTopSpanID];
		return metaObject;
	};



	$.fn.PopulatePeoplePickerFromListAndResolve = function (fieldNameOrSelector, peopleObjectArray) {

		// --- set up internal promise to configure

		// var deferred = $.Deferred();

		var metaObject = $().GetPeoplePickerMetaObject(fieldNameOrSelector);
		var schema = {};
		schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
		schema['SearchPrincipalSource'] = 15;
		schema['ResolvePrincipalSource'] = 15;
		schema['AllowMultipleValues'] = true;
		schema['MaximumEntitySuggestions'] = 50;
		schema['Width'] = '450px';
		var allPeople = [];

		$.each(peopleObjectArray, function (i, p) {
			allPeople.push({
				'AutoFillDisplayText': p.displayText,
				'AutoFillKey': p.description,
				'Description': p.description,
				'DisplayText': p.displayText,
				'EntityType': 'User',
				'IsResolved': true,
				'Key': p.account,
				'Resolved': true
			});
		});

		setTimeout(function () {
			SPClientPeoplePicker_InitStandaloneControlWrapper(metaObject.pickerID, allPeople, schema);
			if ($('#' + metaObject.pickerID).hasClass("disabled") && !$('#' + metaObject.pickerTopSpanID).hasClass("disabled")) {
				$().SetFieldToDisabled('#' + metaObject.pickerID);
			}
		}, 100);
	};



	$.fn.PutAddtlPeopleInPicker = function (fieldNameOrSelector, newPeople) {
		var metaObject = $().GetPeoplePickerMetaObject(fieldNameOrSelector);
		var schema = {};
		schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
		schema['SearchPrincipalSource'] = 15;
		schema['ResolvePrincipalSource'] = 15;
		schema['AllowMultipleValues'] = true;
		schema['MaximumEntitySuggestions'] = 50;
		schema['Width'] = '450px';
		var existingPeople = metaObject.picker.GetAllUserInfo();
		var allPeople = [];

		$.each(existingPeople, function (i, e) {
			allPeople.push({
				'AutoFillDisplayText': e.DisplayText,
				'AutoFillKey': e.Description,
				'Description': e.Description,
				'DisplayText': e.DisplayText,
				'EntityType': 'User',
				'IsResolved': true,
				'Key': e.Key,
				'Resolved': true
			});
		});

		$.each(newPeople, function (i, n) {
			allPeople.push({
				'AutoFillDisplayText': n.name,
				'AutoFillKey': n.email,
				'Description': n.email,
				'DisplayText': n.name,
				'EntityType': 'User',
				'IsResolved': true,
				'Key': n.account,
				'Resolved': true
			});
		});
		SPClientPeoplePicker_InitStandaloneControlWrapper(metaObject.pickerID, allPeople, schema);
	};



	$.fn.PutCurrentUserInField = function (fieldName) {
		$().PutAddtlPeopleInPicker(fieldName, [{
			'name': uData.name,
			'email': uData.email,
			'account': uData.account
		}]);
	};



	$.fn.AddAssigneesFromFields = function (fields) {

		// this might ought to be combined with with $.fn.PutAddtlPeopleInPicker; impending deadline precludes the research to determine whether or not this would disrupt anything

		var metaObject = $().GetPeoplePickerMetaObject("Assigned-To");
		var schema = {};
		schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
		schema['SearchPrincipalSource'] = 15;
		schema['ResolvePrincipalSource'] = 15;
		schema['AllowMultipleValues'] = true;
		schema['MaximumEntitySuggestions'] = 50;
		schema['Width'] = '450px';

		var newAssigneesString = "";

		$.each(fields, function (i, field) {
			if (i > 0) {
				newAssigneesString += ";#";
			}

			newAssigneesString += $('#' + field).val();
		});

		var existingAssignees = metaObject.picker.GetAllUserInfo();
		var newAssignees = $().ReturnUserDataFromPersonOrGroupFieldString(newAssigneesString);
		var allAssignees = [];

		// console.log("pp test 1");
		// console.log(metaObject.picker.GetAllUserInfo());
		$().ClearPeoplePicker("Assigned-To_TopSpan");
		// console.log("pp test 2");
		// console.log(metaObject.picker.GetAllUserInfo());

		$.each(existingAssignees, function (i, e) {
			allAssignees.push({
				'AutoFillDisplayText': e.DisplayText,
				'AutoFillKey': e.Description,
				'Description': e.Description,
				'DisplayText': e.DisplayText,
				'EntityType': 'User',
				'IsResolved': true,
				'Key': e.Key,
				'Resolved': true
			});
		});

		$.each(newAssignees, function (i, n) {

			var alreadyInAllAssignees = 0;

			$.each(allAssignees, function (i, a) {
				if (n.account == a.Key) {
					alreadyInAllAssignees = 1;
				}
			});

			if (alreadyInAllAssignees == 0) {
				allAssignees.push({
					'AutoFillDisplayText': n.name,
					'AutoFillKey': n.email,
					'Description': n.email,
					'DisplayText': n.name,
					'EntityType': 'User',
					'IsResolved': true,
					'Key': n.account,
					'Resolved': true
				});
			}
		});

		SPClientPeoplePicker_InitStandaloneControlWrapper(metaObject.pickerID, allAssignees, schema);
	};



	$.fn.ClearPeoplePicker = function (id) {
		var ppobject = SPClientPeoplePicker.SPClientPeoplePickerDict[id];
		var usersobject = ppobject.GetAllUserInfo();
		usersobject.forEach(function (index) {
			ppobject.DeleteProcessedUser(usersobject[index]);
		});
		$("span#" + id + "_InitialHelpText").css("display", "inline");
	};



	$.fn.LoadSelectOptions = function (options, restrictions) {
		// if a loading function was specified
		if (options.function) {
			var functionParameters = {};
			if (options.params) {
				functionParameters = options.params;
			}
			functionParameters.selectID = this.selector;
			// call the function and pass the parameters
			CallFunctionFromString(options.function, functionParameters);
			// if a loading function was NOT specified
		} else {
			// assume loading from a SharePoint list
			var opt = $.extend({}, {
				webURL: 'https://bmos.sharepoint.com/sites/hubprod',
				listName: "",
				firstOptionText: "",
				completefunc: null,
				restrictions: { 'lowest': 0, 'highest': 1000000 }
			}, options);
			var $this = this;

			return this.each(function () {

				var currentSelectedText = $($this).find("option:selected").text();

				$($this).empty();

				// multiply highest and lowest values by 100 because SP is storing the numbers as percentage values (1 = 100.000000...)
				var query = "<Query>" +
					"<Where>" +
					"<And>" +
					"	<Geq>" +
					"		 <FieldRef Name='Order' />" +
					"		 <Value Type='Number'>" +
					opt.restrictions.lowest * 100 +
					"		 </Value>" +
					"	</Geq>" +
					"	<Leq>" +
					"		 <FieldRef Name='Order' />" +
					"		 <Value Type='Number'>" +
					opt.restrictions.highest * 100 +
					"		 </Value>" +
					"	</Leq>" +
					"</And>" +
					"</Where>" +
					"	<OrderBy>" +
					"		 <FieldRef Name='" + opt.orderField + "'/>" +
					"	</OrderBy>" +
					"</Query>";


				var method = "GetListItems";
				var fieldsToRead = "<ViewFields>" +
					"<FieldRef Name='" + opt.valueField + "' />" +
					"<FieldRef Name='" + opt.displayField + "' />" +
					"<FieldRef Name='" + opt.orderField + "' />" +
					"</ViewFields>";

				$().SPServices({
					operation: method,
					async: false,
					webURL: opt.webURL,
					listName: opt.listName,
					CAMLViewFields: fieldsToRead,
					CAMLQuery: query,
					completefunc: function (xData, Status) {
						var options = "<option value=''> " + opt.firstOptionText + " </option>";

						$(xData.responseXML).SPFilterNode("z:row").each(function () {

							var optionOrder = ($(this).attr("ows_" + opt.orderField));
							var optionValue = ($(this).attr("ows_" + opt.valueField));
							var optionDisplay = ($(this).attr("ows_" + opt.displayField));

							// replace single quotes / apostrophes so that the value renders correctly in browser
							optionValue = optionValue.replace(/'/g, '&apos;');

							if (optionDisplay.split(";#")[1] != undefined) {
								optionDisplay = optionDisplay.split(";#")[1];
							}

							if ($.trim(optionDisplay) == $.trim(currentSelectedText)) {
								options += "<option selected='selected' value='" + optionValue + "' >" + optionDisplay + "</option>";
							} else {
								options += "<option value='" + optionValue + "'>" + optionDisplay + "</option>";
							}
						});
						$($this).append(options);
						if (opt.completefunc !== null) {
							opt.completefunc(this);
						}

					}
				});

			});
		}
	};



	$.fn.LoadDepartmentSelectOptions = function (parameters) {

		$.ajax({
			async: false,
			method: "GET",
			dataType: "json",
			url: 'https://neso.mos.org/activeDirectory/depts',
		})
			.done(function (returnedDepartments) {

				var selectID = parameters.selectID;
				var departments = returnedDepartments.docs[0].departments;
				var options = "<option value=''></option>";
				var currentSelectedText = $(selectID).find("option:selected").text();

				if (parameters.otherOptionPosition && parameters.otherOptionPosition === 'top') {
					options += "<option value='other'>Other</option>";
				}

				$.each(departments, function (i, department) {
					if ($.trim(department) == $.trim(currentSelectedText)) {
						options += "<option selected='selected' value='" + department + "' >" + department + "</option>";
					} else {
						options += "<option value='" + department + "'>" + department + "</option>";
					}
				});

				$(selectID).append(options);
			});
	};



	$.fn.BuildMarkup = function (e) {

		var markup = '';

		if (typeof (e.begin) != "undefined" && e.begin == 1) {
			markup = '\x3c' + e.tag;
			if (typeof (e.htmlID) != "undefined") {
				markup += ' id="' + e.htmlID + '"';
			}
			markup += ' class="';
			if (typeof (e.htmlClass) != "undefined") {
				markup += e.htmlClass
			}
			markup += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");
			markup += '"';
			if (typeof (e.scope) != "undefined") {
				markup += ' scope="' + e.scope + '"';
			}
			if (typeof (e.repeatable) != "undefined") {
				markup += ' data-repeatable="Y" ';
			}
			if (typeof (e.dataAttributes) != "undefined") {
				$.each(e.dataAttributes, function (i, dataAttribute) {
					markup += ' data-' + dataAttribute.key + '="' + dataAttribute.value + '" ';
				});
			}
			if (typeof (e.repeatSectionID) != "undefined") {
				markup += 'onclick="$().RepeatElement(\'' + e.repeatSectionID + '\');"';
			}
			if (typeof (e.removeThisRepeat) != "undefined") {
				markup += 'onclick="$().RemoveThisRepeat(this);"';
			}
			markup += '\x3e';
		}

		if (typeof (e.content) != "undefined") {
			markup += e.content;
		}

		if (typeof (e.end) != "undefined" && e.end == 1) {
			markup += '\x3c/' + e.tag + '\x3e';
		}

		return markup;
	};



	$.fn.BuildSelectField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		if (typeof (e.addtlValidationType) == "object") {
			e.addtlValidationType = ReplaceAll('"', 'DOUBLEQUOTE', JSON.stringify(e.addtlValidationType));
		}

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'			<select id="' + e.hypehnatedName + '" ';

		if (typeof (e.addtlValidationType) !== "undefined") {
			field += ' data-validation="' + e.addtlValidationType + '" ';
		}

		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}

		field += 'class="' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' ">';

		if (typeof (e.setOptions) != "undefined") {
			field += '					 <option value=""></option>';
			field += $().BuildSelectOptions(e);
		}

		field += '			  </select>';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildMultifield = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control multifield';

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		 <div id="' + e.hypehnatedName + '">';

		$.each(e.subfields, function (i, subfield) {

			subfield.hypehnatedName = ReplaceAll(",", "", ReplaceAll("&", "and", ReplaceAll("\\.", "", ReplaceAll(" ", "-", subfield.subfieldName))));
			subfield.hypehnatedNameLower = ReplaceAll(",", "", ReplaceAll("&", "and", ReplaceAll("\\.", "", ReplaceAll(" ", "-", subfield.subfieldName)))).toLowerCase();

			switch (subfield.controlType) {

				case "select":

					field += '			 <select id="' + subfield.hypehnatedName + '" ';

					if (typeof (subfield.listFieldName) !== "undefined") {
						field += ' listFieldName="' + subfield.listFieldName + '" ';
					}

					field += 'class="' +
						$().AddMarkupClass(subfield, uData.isAdmin, rData.requestStatus, "disabledForAdmin", "disabledForNonAdmin") +
						$().AddMarkupClass(subfield, uData.isAdmin, rData.requestStatus, "requiredForAdmin", "requiredForNonAdmin") +
						'" ';

					field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
					if (typeof (subfield.helpNotes) != "undefined") {
						field += $().AddHelpNotesReferences(subfield, uData.isAdmin, rData.requestStatus);
					}
					field += ' ">';

					if (typeof (subfield.setOptions) != "undefined") {
						field += '				  <option value=""></option>';
						field += $().BuildSelectOptions(subfield);
					}

					field += '			 </select>';

					if (typeof (subfield.helpNotes) != "undefined") {
						field += $().AddHelpNotes(subfield, uData.isAdmin, rData.requestStatus);
					}

					break;

				case "text":

					field += '		  <input type="text" id="' + subfield.hypehnatedName + '"';

					if (typeof (subfield.addtlValidationType) !== "undefined") {
						field += ' data-validation="' + subfield.addtlValidationType + '" ';
					}

					if (typeof (subfield.listFieldName) !== "undefined") {
						field += ' listFieldName="' + subfield.listFieldName + '" ';
					}

					field += 'class="' +
						$().AddMarkupClass(subfield, uData.isAdmin, rData.requestStatus, "disabledForAdmin", "disabledForNonAdmin") +
						$().AddMarkupClass(subfield, uData.isAdmin, rData.requestStatus, "requiredForAdmin", "requiredForNonAdmin") +
						'" ';

					field += ' aria-describedby="field-type-indicator_' + subfield.hypehnatedNameLower;
					if (typeof (subfield.helpNotes) != "undefined") {
						field += $().AddHelpNotesReferences(subfield, uData.isAdmin, rData.requestStatus);
					}
					field += ' ">';

					if (typeof (subfield.helpNotes) != "undefined") {
						field += $().AddHelpNotes(subfield, uData.isAdmin, rData.requestStatus);
					}

					break;

				case "checkWithQuantityField":

					field += '			 <div class="choice-container">' +
						'					<input  type="checkbox" name="' + e.hypehnatedName + '" id="' + e.hypehnatedNameLower + '_' + subfield.hypehnatedNameLower + '" value ="' + subfield.hypehnatedNameLower + '" ';

					field += 'class="check-with-quantity-field ' +
						$().AddMarkupClass(subfield, uData.isAdmin, rData.requestStatus, "disabledForAdmin", "disabledForNonAdmin");

					// we only want to look for one required radio button so we can validate the group only once (for performance)
					if (i == 0) {
						field += $().AddMarkupClass(subfield, uData.isAdmin, rData.requestStatus, "requiredForAdmin", "requiredForNonAdmin");
					}

					field += '" ';

					if (i == 0) {
						if (typeof (e.addtlValidationType) !== "undefined") {
							field += ' data-validation="' + e.addtlValidationType + '" ';
						}
						if (typeof (e.addtlValidationQuantity) !== "undefined") {
							field += ' data-validation-quantity="' + e.addtlValidationQuantity + '" ';
						}
					}

					field += 'aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' choice-set-label_' + e.hypehnatedNameLower;

					if (typeof (e.helpNotes) != "undefined") {
						field += $().AddHelpNotesReferences(subfield, uData.isAdmin, rData.requestStatus);
					}

					field += ' ">' +
						'				  <label for="' + e.hypehnatedNameLower + '_' + subfield.hypehnatedNameLower + '">' + subfield.subfieldName + '</label>' +
						'			 </div>' +
						'			 <div class="subsection hidden">' +
						'				  <div id="label-and-control_' + subfield.hypehnatedName + '" class="label-and-control text">' +
						'						<div class="label">' +
						'							 <label for="' + subfield.hypehnatedName + '">Quantity</label>' +
						'						</div>' +
						'						<div class="field-type-indication"> <span id="field-type-indicator_' + subfield.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
						'						</div>' +
						'						<div class="control">' +
						'							 <input id="' + subfield.hypehnatedName + '" class="subsection-quantity-input" aria-describedby="field-type-indicator_' + subfield.hypehnatedNameLower + ' ' + subfield.hypehnatedNameLower + '_help-note " type="text">' +
						'							 <div class="help-text" id="' + subfield.hypehnatedNameLower + '_help-note">' + subfield.quantityType + '</div>' +
						'						</div>' +
						'				  </div>' +
						'			 </div>';

					break;

			}
		});





		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '		 </div>' +
			'	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildPeoplePickerField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '_TopSpan_EditorInput">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		  <div id="' + e.hypehnatedName + '"';

		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}

		field += 'class="' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' data-control-type="PeoplePicker" aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += '">' +
			'		  </div>';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildHiddenField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<input type="hidden" id="' + e.hypehnatedNameLower + '" name="' + e.hypehnatedNameLower + '"';

		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}

		if (typeof (e.value) !== "undefined") {
			field += ' value="' + e.value + '"';
		}

		field += '>';

		return field;
	};



	$.fn.BuildTextField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		  <input type="text" id="' + e.hypehnatedName + '"';

		if (typeof (e.addtlValidationType) !== "undefined") {
			field += ' data-validation="' + e.addtlValidationType + '" ';
		}

		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}
		field += 'class="' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin");

		if (typeof (e.htmlClass) !== "undefined") {
			field += ' ' + e.htmlClass
		}

		field += '" ';
		if (typeof (e.dataAttributes) != "undefined") {
			$.each(e.dataAttributes, function (i, dataAttribute) {
				field += ' data-' + dataAttribute.key + '="' + dataAttribute.value + '" ';
			});
		}
		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' ">';
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}
		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildPhoneField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		  <input type="tel" id="' + e.hypehnatedName + '"';

		field += ' data-validation="validPhone"';

		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}

		field += 'class="' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		field += ' telephone-format-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' ">';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildTextAreaField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		if (typeof (e.htmlClass) !== "undefined") {
			field += ' ' + e.htmlClass
		}

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		  <textarea id="' + e.hypehnatedName + '"';

		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}

		field += 'class="' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin");

		if (typeof (e.htmlClass) !== "undefined") {
			field += ' ' + e.htmlClass
		}

		field += '" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += '"></textarea>';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildDatePicker = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		  <input type="text" id="' + e.hypehnatedName + '" data-is-date="true" data-validation="validDate"';

		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}

		field += 'class="date-input' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' ">';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildDatetime = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><span id="datetime-label_' + e.hypehnatedNameLower + '">' + e.labelContent + '</span></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">';

		// ---- Date Input

		field += '		  <label for="date-input_' + e.hypehnatedName + '">' + e.labelContent + ' Date</label>' +
			'		  <input type="text" id="date-input_' + e.hypehnatedName + '" data-is-date="true" validate="validDate"';
		field += 'class="date-input' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';
		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' ">';

		// ---- Hours Input

		field += '		  <label for="hours-input_' + e.hypehnatedName + '">' + e.labelContent + ' Hours</label>' +
			'		  <select id="hours-input_' + e.hypehnatedName + '" ';
		field += 'class="hours-input' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';
		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' "></select>';


		// ---- Minutes Input

		field += '		  <label for="minutes-input_' + e.hypehnatedName + '">' + e.labelContent + ' Minutes</label>' +
			'		  <select id="minutes-input_' + e.hypehnatedName + '" ';
		field += 'class="minutes-input' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';
		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' "></select>';

		// ---- Hidden Storage

		field += '		  <input type="hidden" id="datetime-storage_' + e.hypehnatedName + '"';
		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}
		field += '>';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.ReturnEditabilityFlag = function (e) {
		var editable = 0;
		var relevantRStatuses = [];

		// determine the relevant request statuses for editability
		if (uData.isAdmin == 1 && typeof (e.editableForAdmin) != "undefined") {
			relevantRStatuses = e.editableForAdmin;
		}
		if (uData.isAdmin == 0 && typeof (e.editableForNonAdmin) != "undefined") {
			relevantRStatuses = e.editableForNonAdmin;
		}

		// determine whether or not to change from anchor to input for editability
		$.each(relevantRStatuses, function (i, relevantRStatus) {
			if (relevantRStatus == rData.requestStatus) {
				editable = 1;
			}
		});

		return editable;
	};



	$.fn.BuildListItemChooserField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		e.dataSourceTypeName = ReplaceAll("\\.", "", ReplaceAll(" ", "-", ReplaceAll(" ID", "", e.fieldName))).toLowerCase();

		var editable = $().ReturnEditabilityFlag(e, uData.isAdmin, rData.requestStatus);

		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType +
			$().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin") +
			'">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">';

		if (editable == 0) {
			field += e.nonEditableLabelContent;
		} else {
			field += e.editableLabelContent;
		}

		field += '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">';

		if (editable == 0) {

			field += '		  <a href="" target="_blank" data-source-type="' + e.dataSourceTypeName + '" ';

		} else {
			field += '		  <input type="text" ';

			if (typeof (e.addtlValidationType) !== "undefined") {
				field += ' data-validation="' + e.addtlValidationType + '" ';
			}

			if (typeof (e.listFieldName) !== "undefined") {
				field += ' listFieldName="' + e.listFieldName + '" ';
			}
		}

		field += 'id="id-or-link_' + e.hypehnatedName + '" class="id-or-link_list-item-chooser ';

		field += $().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}

		if (editable == 0) {
			field += '"></a>';
		} else {
			field += '">' +
				'		  <a id="anchor_' + e.hypehnatedName + '"' +
				'class="anchor_list-item-chooser ' +
				$().AddMarkupClass(e, "hideButtonForAdmin", "hideButtonForNonAdmin") +
				$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
				'" aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;

			if (typeof (e.helpNotes) != "undefined") {
				field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
			}

			field += ' ">' + e.choosingAnchorContent + '</a>';
		}

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildButtonWithLabelField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		  <a id="' + e.hypehnatedName + '" ';

		field += 'class="' + e.controlType +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' ">' + e.buttonContent + '</a>';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildTime = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		if (typeof (e.htmlClass) != "undefined") {
			field += " " + e.htmlClass
		}

		field += '">' +
			'	 <div class="label"><span id="time-label_' + e.hypehnatedNameLower + '">' + e.labelContent + '</span></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">';

		// ---- Date Input

		//field += '		  <label for="date-input_' + e.hypehnatedName + '">' + e.labelContent + ' Date</label>' +
		//	 '		  <input type="text" id="date-input_' + e.hypehnatedName + '" data-is-date="true" validate="validDate"';
		//field += 'class="date-input' +
		//	 $().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
		//	 $().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
		//	 '" ';
		//field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' datetime-label_' + e.hypehnatedNameLower;
		//if (typeof (e.helpNotes) != "undefined") { field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus); }
		//field += ' ">';

		// ---- Hours Input

		field += '		  <label for="hours-input_' + e.hypehnatedName + '">' + e.labelContent + ' Hours</label>' +
			'		  <select id="hours-input_' + e.hypehnatedName + '" ';
		field += 'class="hours-input' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';
		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' time-label_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' "></select>';


		// ---- Minutes Input

		field += '		  <label for="minutes-input_' + e.hypehnatedName + '">' + e.labelContent + ' Minutes</label>' +
			'		  <select id="minutes-input_' + e.hypehnatedName + '" ';
		field += 'class="minutes-input' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';
		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' time-label_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' "></select>';

		// ---- Hidden Storage

		field += '		  <input type="hidden" id="time-storage_' + e.hypehnatedName + '"';
		if (typeof (e.listFieldName) !== "undefined") {
			field += ' listFieldName="' + e.listFieldName + '" ';
		}
		field += '>';


		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildRadioButtonsOrCheckboxes = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><span id="choice-set-label_' + e.hypehnatedNameLower + '">' + e.choiceSetLabel + '</span></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		 <div id="' + e.hypehnatedName + '">';

		$.each(e.choices, function (i, chc) {

			chc.hypehnatedValueLower = $().ReturnHyphenatedFieldNameOrValue(chc.value).toLowerCase();

			field += '			 <div class="choice-container">' +
				'					<input  type="';
			if (e.controlType == "radio") {
				field += 'radio';
			}
			if (e.controlType == "check") {
				field += 'checkbox';
			}
			field += '" name="' + e.hypehnatedName + '" id="' + e.hypehnatedNameLower + '_' + chc.hypehnatedValueLower + '" value ="' + chc.value + '" ';

			if (typeof (e.listFieldName) !== "undefined") {
				field += ' listFieldName="' + e.listFieldName + '" ';
			}

			if (typeof (e.dataAttributes) != "undefined") {
				$.each(e.dataAttributes, function (i, dataAttribute) {
					field += ' data-' + dataAttribute.key + '="' + dataAttribute.value + '" ';
				});
			}

			field += 'class="' +
				$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin");

			// console.log(e);

			// we only want to look for one because we want to validate the group only once (for performance)
			if (i == 0) {
				field += $().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin");
			}

			if (typeof (e.htmlClass) !== "undefined") {
				field += " " + e.htmlClass;
			}

			field += '" ';

			if (i == 0) {
				if (typeof (e.addtlValidationType) !== "undefined") {
					field += ' data-validation="' + e.addtlValidationType + '" ';
				}
				if (typeof (e.addtlValidationQuantity) !== "undefined") {
					field += ' data-validation-quantity="' + e.addtlValidationQuantity + '" ';
				}
			}


			field += 'aria-describedby="field-type-indicator_' + e.hypehnatedNameLower + ' choice-set-label_' + e.hypehnatedNameLower;
			if (typeof (e.helpNotes) != "undefined") {
				field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
			}
			field += ' ">';
			field += '				  <label for="' + e.hypehnatedNameLower + '_' + chc.hypehnatedValueLower + '">' + chc.display + '</label>';
			field += '			 </div>'

		});

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '		</div>' +
			'	</div>' +
			'</div>';

		return field;
	};



	$.fn.BuildFileField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'    <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'    <div class="field-type-indication">' +
			'         <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'    </div>' +
			'    <div class="control">';

		field += $().AddInputOrLinkBeginning(e, "editableForAdmin", "editableForNonAdmin");

		field += 'id="' + e.hypehnatedName + '" class="mos-file ' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}

		field += $().AddInputOrLinkEnding(e, uData.isAdmin, rData.requestStatus, "editableForAdmin", "editableForNonAdmin");

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '   </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildMOSFileField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// set populatability and replaceability flags
		var populatable = 0;
		var replaceable = 0;

		if (uData.isAdmin == 1) {
			if (typeof (e.populatableForAdmin) != "undefined") {
				if (e.populatableForAdmin.indexOf(rData.requestStatus) != -1) { populatable = 1; }
			}
			if (typeof (e.replaceableForAdmin) != "undefined") {
				if (e.replaceableForAdmin.indexOf(rData.requestStatus) != -1) { replaceable = 1; }
			}
		}
		if (uData.isAdmin == 0) {
			if (typeof (e.populatableForNonAdmin) != "undefined") {
				if (e.populatableForNonAdmin.indexOf(rData.requestStatus) != -1) { populatable = 1; }
			}
			if (typeof (e.replaceableForNonAdmin) != "undefined") {
				if (e.replaceableForNonAdmin.indexOf(rData.requestStatus) != -1) { replaceable = 1; }
			}
		}

		if (populatable == 0 && typeof (e.populatablePerFunction) != "undefined") {

			/*// commented out because, for GPC, handling differently; however, this may be useful for other cases
			switch (e.populatablePerFunction) {
				
				case "ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess":
					populatable = $().ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess(rData.requestStatus);
					break;
			}*/

		}

		if (replaceable == 0 && typeof (e.replaceablePerFunction) != "undefined") {

			/*// commented out because, for GPC, handling differently; however, this may be useful for other cases
			switch (e.populatablePerFunction) {
				
				case "ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess":
					replaceable = $().ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess(rData.requestStatus);
					break;
			}*/

		}

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		<div  id="' + e.hypehnatedName + '" data-validation="validAttachment" ';



		// if (typeof(e.listFieldName) !== "undefined") {
		// 	field += ' listFieldName="' + e.listFieldName + '" ';
		// }
		field += 'class="mos-drag-and-drop-file-attachment ' +
			// $().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin");

		if (populatable == 1) {
			field += ' populatable';
		}

		if (replaceable == 1) {
			field += ' replaceable';
		}

		if (typeof (e.htmlClass) !== "undefined") {
			field += ' ' + e.htmlClass;
		}

		field += '" ';
		if (typeof (e.dataAttributes) != "undefined") {
			$.each(e.dataAttributes, function (i, dataAttribute) {
				field += ' data-' + dataAttribute.key + '="' + dataAttribute.value + '" ';
			});
		}
		field += ' data-control-type="MOSFile" aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}
		field += ' ">' +
			'			<div id="mos-drag-and-drop-file-input_' + e.hypehnatedName + '" class="mos-drag-and-drop-file-input">' +
			'				<input class="mos-file-selector" type="file" name="files[]" id="file_' + e.hypehnatedName + '" />' +
			'				<label for="file_' + e.hypehnatedName + '"><span class="mos-file-selection-prompt">Tap or click here to select a file</span></label>' + // Drop a file here, or 
			'			</div>' +
			'			<a id="mos-drag-and-drop-file-container_' + e.hypehnatedName + '" class="mos-drag-and-drop-file-container" target="_blank">' +
			'				<div id="mos-drag-and-drop-file-upload-icon_' + e.hypehnatedName + '"  class="mos-drag-and-drop-file-upload-icon"></div>' +
			'				<div id="mos-drag-and-drop-file-preview_' + e.hypehnatedName + '"  class="mos-drag-and-drop-file-preview"></div>' +
			'				<div id="mos-drag-and-drop-file-name-and-size_' + e.hypehnatedName + '"  class="mos-drag-and-drop-file-name-and-size">' +
			'					<div class="mos-drag-and-drop-file-name"></div>' +
			'					<div class="mos-drag-and-drop-file-size"></div>' +
			'				</div>' +
			'				<div id="mos-drag-and-drop-file-control_' + e.hypehnatedName + '"  class="mos-drag-and-drop-file-control"></div>' +
			'				<div id="mos-drag-and-drop-file-progress_' + e.hypehnatedName + '"  class="mos-drag-and-drop-file-progress">' +
			'					<progress id="progress-bar_' + e.hypehnatedName + '" value="0" max="1"></progress>' +
			'				</div>' +
			'			</a>' +
			'			<div id="mos-drag-and-drop-file-storage_' + e.hypehnatedName + '" class="mos-drag-and-drop-file-storage">' +
			'				<input type="hidden" id="mos-drag-and-drop-file-name_' + e.hypehnatedName + '" name="mos-drag-and-drop-file-name_' + e.hypehnatedName + '" class="mos-drag-and-drop-file-name" >' +
			'				<input type="hidden" id="mos-drag-and-drop-file-size_' + e.hypehnatedName + '" name="mos-drag-and-drop-file-size_' + e.hypehnatedName + '" class="mos-drag-and-drop-file-size" >' +
			'				<input type="hidden" id="mos-drag-and-drop-file-type-class_' + e.hypehnatedName + '" name="mos-drag-and-drop-file-type-class_' + e.hypehnatedName + '" class="mos-drag-and-drop-file-type-class" >' +
			'				<input type="hidden" id="mos-drag-and-drop-file-in-quark-files_' + e.hypehnatedName + '" name="mos-drag-and-drop-file-in-quark-files_' + e.hypehnatedName + '" class="mos-drag-and-drop-file-in-quark-files" >' +
			'			</div>';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}
		field += '	 </div>';

		// finish building field
		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildLegacyFileSetField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">' +
			'		<div class="legacy-file-set" data-control-type="LegacyFileSet" ';

		field += 'id="' + e.hypehnatedName + '" class="' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}

		field += '"></div>';

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.BuildURLField = function (e) {

		e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
		e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();

		// start building field
		var field = '<div id="label-and-control_' + e.hypehnatedName + '" class="label-and-control ' + e.controlType;

		field += $().AddMarkupClass(e, "hideForAdmin", "hideForNonAdmin");

		field += '">' +
			'	 <div class="label"><label for="' + e.hypehnatedName + '">' + e.labelContent + '</label></div>' +
			'	 <div class="field-type-indication">' +
			'		  <span id="field-type-indicator_' + e.hypehnatedNameLower + '" class="field-type-indicator field-optional"><span class="message message-optional">Optional Field</span></span>' +
			'	 </div>' +
			'	 <div class="control">';

		field += $().AddInputOrLinkBeginning(e, "editableForAdmin", "editableForNonAdmin");

		field += 'id="' + e.hypehnatedName + '" class="' +
			$().AddMarkupClass(e, "disabledForAdmin", "disabledForNonAdmin") +
			$().AddMarkupClass(e, "requiredForAdmin", "requiredForNonAdmin") +
			'" ';

		field += ' aria-describedby="field-type-indicator_' + e.hypehnatedNameLower;
		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotesReferences(e, uData.isAdmin, rData.requestStatus);
		}

		field += $().AddInputOrLinkEnding(e, uData.isAdmin, rData.requestStatus, "editableForAdmin", "editableForNonAdmin");

		if (typeof (e.helpNotes) != "undefined") {
			field += $().AddHelpNotes(e, uData.isAdmin, rData.requestStatus);
		}

		if (StrInStr(field, '<input', 0) != false) {
			field += '		  <a class="link-tester">Check this link</a>';
		}

		field += '	 </div>' +
			'</div>';

		return field;
	};



	$.fn.AddInputOrLinkBeginning = function (e, adminProperty, nonAdminProperty) {

		var controlBeginningToAdd = '		  <a href="" target="_blank" data-source-type="' + e.controlType + '" ';

		// determine the relevant request statuses for editability
		var relevantRStatuses = [];

		if (uData.isAdmin == 1 && typeof (e[adminProperty]) != "undefined") {
			relevantRStatuses = e[adminProperty];
		}
		if (uData.isAdmin == 0 && typeof (e[nonAdminProperty]) != "undefined") {
			relevantRStatuses = e[nonAdminProperty];
		}

		// if the actual request status is in the array of relevant request statuses for this user
		$.each(relevantRStatuses, function (i, rs) {
			if (rs == rData.requestStatus) {
				controlBeginningToAdd = '		  <input type="' + e.controlType + '" '
				if (e.controlType == 'url') {
					controlBeginningToAdd += ' data-validation="validURL" ';
				}
			}
		});

		return controlBeginningToAdd;
	};



	$.fn.AddInputOrLinkEnding = function (e, adminProperty, nonAdminProperty) {

		var controlEndingToAdd = '"></a>';

		// determine the relevant request statuses for attachability
		var relevantRStatuses = [];

		if (uData.isAdmin == 1 && typeof (e[adminProperty]) != "undefined") {
			relevantRStatuses = e[adminProperty];
		}
		if (uData.isAdmin == 0 && typeof (e[nonAdminProperty]) != "undefined") {
			relevantRStatuses = e[nonAdminProperty];
		}

		// if the actual request status is in the array of relevant request statuses for this user
		$.each(relevantRStatuses, function (i, rs) {
			if (rs == rData.requestStatus) {
				controlEndingToAdd = '">'
			}
		});

		return controlEndingToAdd;
	};



	$.fn.AddHelpNotesReferences = function (e) {

		var refsToAdd = "";

		$.each(e.helpNotes, function (i, note) {

			// determine which request status property of the note to pay attention to: hideForNonAdmin, hideForAdmin, or neither
			var relevantRStatuses = [];
			var dontAddFlag = 0;

			if (uData.isAdmin == 1 && typeof (note.hideForAdmin) != "undefined") {
				relevantRStatuses = note.hideForAdmin;
			}
			if (uData.isAdmin == 0 && typeof (note.hideForNonAdmin) != "undefined") {
				relevantRStatuses = note.hideForNonAdmin;
			}

			$.each(relevantRStatuses, function (i, rs) {
				if (rs == rData.requestStatus) {
					dontAddFlag = 1;
				}
			});

			if (dontAddFlag == 0) {
				refsToAdd += ' ' + note.htmlID;
			}
		});

		return refsToAdd;
	};



	$.fn.AddHelpNotes = function (e) {

		var notesToAdd = "";

		$.each(e.helpNotes, function (i, note) {

			notesToAdd += '		  <div class="help-text';
			if (note.urgent == 1) {
				notesToAdd += ' urgent';
			}
			if (note.emphasis == 1) {
				notesToAdd += ' emphasis';
			}
			notesToAdd += $().AddMarkupClass(note, "hideForAdmin", "hideForNonAdmin");
			notesToAdd += '" id="' + note.htmlID + '">' + note.text + '</div>';
		});

		return notesToAdd;
	};



	$.fn.AddMarkupClass = function (e, adminProperty, nonAdminProperty) {

		var classToAdd = "";

		// determine which request status property of e to pay attention to: hideForNonAdmin, hideForAdmin, or neither
		var relevantRStatuses = [];

		if (uData.isAdmin == 1 && typeof (e[adminProperty]) != "undefined") {
			relevantRStatuses = e[adminProperty];
		}
		if (uData.isAdmin == 0 && typeof (e[nonAdminProperty]) != "undefined") {
			relevantRStatuses = e[nonAdminProperty];
		}

		// if the actual request status is in the array of relevant request statuses for this user
		$.each(relevantRStatuses, function (i, rs) {
			if (rs == rData.requestStatus) {
				if (nonAdminProperty == "hideForNonAdmin" || nonAdminProperty == "hideButtonForNonAdmin" || adminProperty == "hideForAdmin" || adminProperty == "hideButtonForAdmin") {
					classToAdd = ' hidden';
				}
				if (nonAdminProperty == "disabledForNonAdmin" || adminProperty == "disabledForAdmin") {
					classToAdd = ' disabled';
				}
				if (nonAdminProperty == "requiredForNonAdmin" || adminProperty == "requiredForAdmin") {
					classToAdd = ' required';
				}
			}
		});

		return classToAdd;
	};



	$.fn.BuildSelectOptions = function (e) {

		var optionsToAdd = "";

		if (typeof (e.setOptions) != "undefined") {
			$.each(e.setOptions, function (i, opt) {
				optionsToAdd += '				  <option value="' + opt.value + '">' + opt.display + '</option>';
			});
		}

		return optionsToAdd;
	};



	$.fn.ReturnHyphenatedFieldNameOrValue = function (nameOrValue) {
		return ReplaceAll("&eacute;", "e", ReplaceAll("\\.", "", ReplaceAll("\\'", "", ReplaceAll(" ", "-", nameOrValue))));
	};



	$.fn.SetFieldToRequired = function (id, type, repeatable) {
		if (typeof (type) != "undefined") {
			type = type.toLowerCase();
			if (type == "radio" || type == "check" || type == "checkorradio") {
				$('input[name="' + id + '"]').first().addClass('required');
			} else if (type == "peoplepicker") {
				$('#' + id + '_TopSpan_HiddenInput').addClass('required');
			} else if (type == "text" || type == "textarea" || type == "url" || type == "file" || type == "complexfile" || type == "select" || type == "datepicker") {
				$('#' + id).addClass("required");
			} else if (type == "listitemchooser") {
				$('#id-or-link_' + id).addClass("required");
			} else if (type == "datetime") {
				$('#date-input_' + id).addClass("required");
				$('#hours-input_' + id).addClass("required");
				$('#minutes-input_' + id).addClass("required");
			}
		} else if (typeof ($('#' + id).attr('data-control-type') != 'undefined')) {
			if ($('#' + id).attr('data-control-type') == 'PeoplePicker') {
				var elID = $('#' + id).attr('id');
				$('#' + elID + '_TopSpan_HiddenInput').addClass('required');
			}
		} else {
			if ($('#' + id).hasClass("required") == false) {
				$('#' + id).addClass("required");
			}
		}

		if ($('#' + id).length) {
			$('#' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-required").children("span.message").removeClass("message-optional").addClass("message-required").text("Required Field");
		} else if ($('#id-or-link_' + id).length) {
			$('#id-or-link_' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-required").children("span.message").removeClass("message-optional").addClass("message-required").text("Required Field");
		} else if ($('#date-input_' + id).length) {
			$('#date-input_' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-required").children("span.message").removeClass("message-optional").addClass("message-required").text("Required Field");
		}

		// if repeatable == 1, call this function again
		if (typeof (repeatable) != 'undefined' && repeatable == 1) {

			// find the id #s of the repeats
			var repeatIDs = [];

			if (type == "radio" || type == "check" || type == "checkorradio") {
				// repeat function needs to alter input names before this can begin to be made to work
				//$('input[name^="' + id + '-repeat"]').each(function () {
				//	 repeatIDs.push($(this).attr('id'));
				//});
			} else if (type == "peoplepicker") {
				// repeat function needs to alter people picker IDs before this can begin to be made to work
				//$('#' + id + '_TopSpan_HiddenInput').each(function () {
				//	 repeatIDs.push($(this).attr('id'));
				//});
			} else if (type == "text" || type == "textarea" || type == "select" || type == "datepicker") {
				$("[id^='" + id + "-repeat']").each(function () {
					repeatIDs.push($(this).attr('id'));
				});
			} else if (type == "datetime") {
				$("[id^='date-input_" + id + "-repeat']").each(function () {
					repeatIDs.push($(this).attr('id'));
				});
			}

			// for each repeatID
			$.each(repeatIDs, function (i, repeatID) {
				$().SetFieldToRequired(ReplaceAll('date-input_', '', repeatID), type, 0);
			});
		}
	};



	$.fn.SetFieldToOptional = function (id, type, repeatable) {

		if (typeof (type) != "undefined") {
			type = type.toLowerCase();
			if (type == "radio" || type == "check" || type == "checkorradio") {
				$('input[name="' + id + '"]').first().removeClass('required');
			} else if (type == "peoplepicker") {
				$('#' + id + '_TopSpan_HiddenInput').removeClass('required');
			} else if (type == "text" || type == "textarea" || type == "url" || type == "file" || type == "complexfile" || type == "mosFile" || type == "select" || type == "datepicker") {
				$('#' + id).removeClass("required");
			} else if (type == "listitemchooser") {
				$('#id-or-link_' + id).removeClass("required");
			} else if (type == "datetime") {
				$('#date-input_' + id).removeClass("required");
				$('#hours-input_' + id).removeClass("required");
				$('#minutes-input_' + id).removeClass("required");
			}
		} else if (typeof ($(id).attr('data-control-type') != 'undefined')) {
			if ($(id).attr('data-control-type') == 'PeoplePicker') {
				var elID = $(id).attr('id');
				$('#' + elID + '_TopSpan_HiddenInput').removeClass('required');
			}
		} else {
			$('#' + id).removeClass("required");
		}

		if ($('#' + id).length) {
			$('#' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-required").addClass("field-optional").children("span.message").removeClass("message-required").addClass("message-optional").text("Optional Field");
		} else if ($('#id-or-link_' + id).length) {
			console.log("found the field for real");
			$('#id-or-link_' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-required").addClass("field-optional").children("span.message").removeClass("message-required").addClass("message-optional").text("Optional Field");
		} else if ($('#date-input_' + id).length) {
			$('#date-input_' + id).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-required").addClass("field-optional").children("span.message").removeClass("message-required").addClass("message-optional").text("Optional Field");
		}

		// if repeatable == 1, call this function again
		if (typeof (repeatable) != 'undefined' && repeatable == 1) {

			// find the id #s of the repeats
			var repeatIDs = [];

			if (type == "radio" || type == "check" || type == "checkorradio") {
				// repeat function needs to alter input names before this can begin to be made to work
				//$('input[name^="' + id + '-repeat"]').each(function () {
				//	 repeatIDs.push($(this).attr('id'));
				//});
			} else if (type == "peoplepicker") {
				// repeat function needs to alter people picker IDs before this can begin to be made to work
				//$('#' + id + '_TopSpan_HiddenInput').each(function () {
				//	 repeatIDs.push($(this).attr('id'));
				//});
			} else if (type == "text" || type == "textarea" || type == "select" || type == "datepicker") {
				$("[id^='" + id + "-repeat']").each(function () {
					repeatIDs.push($(this).attr('id'));
				});
			} else if (type == "datetime") {
				$("[id^='date-input_" + id + "-repeat']").each(function () {
					repeatIDs.push($(this).attr('id'));
				});
			}

			// for each repeatID
			$.each(repeatIDs, function (i, repeatID) {
				$().SetFieldToOptional(ReplaceAll('date-input_', '', repeatID), type, 0);
			});

		}
	};



	$.fn.SetFieldToDisabled = function (e, caller) {

		// if this is a PeoplePicker field
		if ($(e + '_TopSpan_EditorInput').length) {
			var elemID = e + '_TopSpan_EditorInput';
			$(elemID).prop("disabled", true);
			$(e + "_TopSpan_InitialHelpText").empty();
			$(e + "_TopSpan").attr("title", "").addClass("mos_people-picker-disabled");
			$(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-disabled").children("span.message").removeClass("message-optional").addClass("message-disabled").text("Disabled Field");

		} else if (($(e).is("input") && ($(e).attr("type") == "text") || $(e).attr("type") == "url") || $(e).is("textarea")) {
			$(e).prop("readonly", true);
			$(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-disabled").children("span.message").removeClass("message-optional").addClass("message-disabled").text("Read-only Field");
			// for url fields, hide the "check this link" button
			if ($(e).is("input") && $(e).attr("type") == "url") {
				$(e).closest("div.control").find("a.link-tester").hide("fast").addClass("hidden");
			}
		} else if ($(e).hasClass('mos-drag-and-drop-file-attachment')) {
			$(e).removeClass('populatable replaceable');
			$(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-disabled").children("span.message").removeClass("message-optional").addClass("message-disabled").text("Disabled Field");

		} else {
			$(e).prop("disabled", true);
			$(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-optional").addClass("field-disabled").children("span.message").removeClass("message-optional").addClass("message-disabled").text("Disabled Field");
		}
	};



	$.fn.SetFieldToEnabled = function (e) {

		// if this is a PeoplePicker element
		if ($(e + '_TopSpan_EditorInput').length) {
			var p = 1;
			var elemID = e + '_TopSpan_EditorInput';
		} else {
			var p = 0;
			var elemID = e;
		}

		if ($(elemID).prop("disabled") != false) {
			$(elemID).prop("disabled", false);
		} else {
			$(elemID).prop("readonly", false);
		}

		if (p == 1) {
			$(e + "_TopSpan_InitialHelpText").text("Enter names or email addresses...");
			$(e + "_TopSpan").attr("title", "").removeClass("mos_people-picker-disabled");
		}

		if ($(elemID).hasClass("disabled")) {
			$(elemID).removeClass("disabled");
		}

		$(e).closest("div.control").prev("div.field-type-indication").children("span.field-type-indicator").removeClass("field-disabled").addClass("field-optional").children("span.message").removeClass("message-disabled").addClass("message-optional").text("Optional Field");
	};



	function PopulateFormData(form, formData, uriRoot, requestID, checkForAlternateEventDataToPopulate) {

		var formDataCopy = {};

		$.each(formData, function (formDatumKey, formDatumValue) {
			formDataCopy[formDatumKey] = formDatumValue;
		});

		// if we should *check for* alternate event data to populate
		if (typeof (checkForAlternateEventDataToPopulate) != 'undefined') {

			//var occurrenceDate = GetParamFromUrl(location.search, "date");
			var exceptionID = GetParamFromUrl(location.search, "exceptionID");

			if (exceptionID != "") {
				$(formDataCopy["datesToAdd"]).each(function (i, e) {
					if (e["exceptionID"] == exceptionID) {
						formDataCopy["hours-input_Start-Time"] = e["hours-input_Start-Time"];
						formDataCopy["minutes-input_Start-Time"] = e["minutes-input_Start-Time"];
						formDataCopy["hours-input_End-Time"] = e["hours-input_End-Time"];
						formDataCopy["minutes-input_End-Time"] = e["minutes-input_End-Time"];
						formDataCopy["time-storage_Start-Time"] = e["time-storage_Start-Time"];
						formDataCopy["time-storage_End-Time"] = e["time-storage_End-Time"];
						formDataCopy["Event-Location"] = e["Event-Location"];
						formDataCopy["Event-Notes"] = e["Event-Notes"];
						formDataCopy["Exception-ID"] = e["exceptionID"];
					}
				});
			}
		}

		// console.log('formDataCopy');
		// console.log(formDataCopy);

		for (field in formDataCopy) {

			// console.log('field');
			// console.log(field);

			// get the field in the form that matches the stored data value
			element = $(form).find("#" + field);

			// if the stored data value is RepeatedElements
			if (field === "RepeatedElements") {

				// console.log('RepeatedEl field found');

				// get the array of stored repeat items
				var repeatableArray = formDataCopy[field];

				// for each item in that array
				for (index in repeatableArray) {

					// if this array element has an original defined, then repeat said original
					if (repeatableArray[index].OriginalToRepeat != "undefined") {
						$().RepeatElement(repeatableArray[index].OriginalToRepeat, repeatableArray[index].ID);
					}
					// get the page element that correponds to this array element
					var thisRepeatableForm = $(form).find("#" + repeatableArray[index].ID);

					// treat the page element and the array element like a form to be populated
					PopulateFormData(thisRepeatableForm, repeatableArray[index], uriRoot, requestID);
				}

			} else if ($(element).is("select")) {
				$().SetSelectByText(element, formDataCopy[field]);
				// console.log($(element));
			} else if ($(element).is("a")) {
				// console.log($(element));

				if (formDataCopy[field] != '') {

					if ($(element).attr('data-source-type') == 'url') {
						$(element).attr('href', formDataCopy[field]).text(formDataCopy[field]);
					}

					if ($(element).attr('data-source-type') == 'event-needs-request') {
						$(element).attr('href', 'https://bmos.sharepoint.com/sites/vxo-event-needs/SitePages/App.aspx?r=' + formDataCopy[field]).text('#' + formDataCopy[field]);
					}

					if ($(element).attr('data-source-type') == 'event-space-request') {
						$(element).attr('href', 'https://bmos.sharepoint.com/sites/vxo-event-space/SitePages/App.aspx?r=' + formDataCopy[field]).text('#' + formDataCopy[field]);
					}

					if ($(element).attr('data-source-type') == 'gpc-initial-concept-approval-request') {
						$(element).attr('href', 'https://bmos.sharepoint.com/sites/gpc-concept/SitePages/App.aspx?r=' + formDataCopy[field]).text('#' + formDataCopy[field]);
					}

					if ($(element).attr('data-source-type') == 'file') {
						$(element).attr('href', uriRoot + '/Attachments/' + requestID + '/' + formDataCopy[field]).text(formDataCopy[field]);
					}

				}
			} else if ($(element).is("div") || $(element).is("span")) {
				// console.log($(element));
				if ($(element).attr("data-control-type") != undefined && $(element).attr("data-control-type") == "PeoplePicker") {
					if (formDataCopy[field] != '') {
						// allPeoplePickerResolutionPromises.push(
						$().PopulatePeoplePickerFromListAndResolve(element.selector, formDataCopy[field])
						// );
					}
				} else if ($(element).attr("data-control-type") != undefined && $(element).attr("data-control-type") == "LegacyFileSet") {
					if (formDataCopy[field] != '') {
						$().PopulateLegacyFileSetLinks(element.selector, formDataCopy[field]);
					}
				} else {
					$(element).html(HtmlDecode(formDataCopy[field]));
				}
			} else {
				// console.log(field);
				// console.log($(element));
				if ($(element).attr("type") == "radio" || $(element).attr("type") == "checkbox") {
					if ((typeof (fData.saveApprovalFields) != 'undefined' && fData.saveApprovalFields == 1) || (StrInStr(element.selector, '#approval-indicator') == false)) {
						$(element).attr("checked", true);
					}
				} else {
					if (element.selector == 'div#request-form #Historical-Admin-Notes' || element.selector == 'div#request-form #Historical-Other-Preservable-Notes') {
						$(element).val(ReplaceAll("' '", "\r \r", HtmlDecode(formDataCopy[field])));
					} else if ((typeof (fData.saveApprovalFields) != 'undefined' && fData.saveApprovalFields == 1) || (StrInStr(element.selector, '#approval-signature') == false && StrInStr(element.selector, '#approval-date') == false && StrInStr(element.selector, '#Approval-Notes') == false)) {
						$(element).val(HtmlDecode(formDataCopy[field]));
					}
				}
			}
		}
	}



	$.fn.PopulateLegacyFileSetLinks = function (selector, fileArray) {

		var markup = '';
		var multipleFiles = 0;

		if (fileArray.length > 1) {
			multipleFiles = 1;
		}

		if (multipleFiles == 1) { markup += '<ul>'; }

		$(fileArray).each(function (fileIndex, fileValue) {
			var fileName = StrInStr(fileValue, "/", 3);
			if (multipleFiles == 1) { markup += '<li>'; }
			markup += '<a href="../LegacyFiles/' + fileValue + '" target="_blank">' + fileName + '</a>';
			if (multipleFiles == 1) { markup += '</li>'; }
		})

		if (multipleFiles == 1) { markup += '</ul>'; }

		$(selector).html(markup);
	};



	$.fn.SetSelectByText = function (select, value) {
		var relevantOptionIndex = $().ReturnOptionIndexByText($(select), value);
		if (typeof (relevantOptionIndex) != 'undefined') {
			$(select).prop("selectedIndex", relevantOptionIndex);
		} else {
			console.log("wrong setting method");
			$(select).append("<option selected='selected'>" + value + "</option>");
		}
	};



	$.fn.ReturnOptionIndexByText = function (relevantSelect, relevantOptionText) {
		var relevantOptionIndex;
		$(relevantSelect).children("option").each(function (i) {
			if (HtmlEncode($(this).text().trim()) == HtmlEncode(relevantOptionText.trim())) {
				relevantOptionIndex = i;
			}
		});
		return relevantOptionIndex;
	};



	$.fn.ReturnSelectedOptionIndex = function (relevantSelect) {
		var relevantOptionIndex;
		$(relevantSelect + " option:selected").children("option").each(function (i) {
			if (HtmlEncode($(this).text().trim()) == HtmlEncode(relevantOptionText.trim())) {
				relevantOptionIndex = i;
			}
		});
		return relevantOptionIndex;
	};



	// ---- REPEAT & REMOVE REPEATS



	// doesn't handle people pickers
	$.fn.RepeatElement = function (originalToRepeat, submittedID) {

		// --- get the id # of the last existing repeat

		var lastRepeatIDNumber = 0;
		// if any repeats are found, get the number off of the end of the last one's id
		if ($("[id^='" + originalToRepeat + "-repeat']").length) {
			lastRepeatIDNumber = Number($("[id^='" + originalToRepeat + "-repeat']").last().attr('id').slice(-1));
		}



		// --- determine the id of the element after which to insert the repeat

		// if no repeats were found
		if (lastRepeatIDNumber == 0) {
			// insert after the original
			var insertAfterID = originalToRepeat;
			// otherwise
		} else {
			// construct an id to insert after
			var insertAfterID = originalToRepeat + '-repeat-' + lastRepeatIDNumber;
		}



		// --- use submittedID for newRepeatID, or construct a new one

		// if there's a submittedID
		if (typeof (submittedID) != 'undefined') {
			// use it
			var newRepeatID = submittedID;
			// otherwise
		} else {
			// construct a new one
			var newRepeatID = originalToRepeat + "-repeat-" + (lastRepeatIDNumber + 1);
		}



		// --- create and insert the new repeat; give it the appropriate ID and data-original-to-repeat values
		$("#" + insertAfterID).after($("#" + originalToRepeat).clone().attr("id", newRepeatID).attr("data-original-to-repeat", originalToRepeat));


		// --- update ID, for, aria-described-by attributes on new repeat's descendant elements
		$('#' + newRepeatID)
			.find('[id^="label-and-control"], label, div.label > span, span.field-type-indicator, div.help-text, :input, a, div.mos-drag-and-drop-file-attachment, div.mos-drag-and-drop-file-attachment div, div.mos-drag-and-drop-file-attachment progress') // div.mos-drag-and-drop-file-attachment, div.mos-drag-and-drop-file-input, a.mos-drag-and-drop-file-container div, a.mos-drag-and-drop-file-container progress
			.each(function () {

				// console.log($(this));

				// if there's a submittedID
				if (typeof (submittedID) != 'undefined') {
					// use the number on the end of it
					var newRepeatDescendantIDNumber = submittedID.slice(-1);
					// otherwise
				} else {
					// construct a new one
					var newRepeatDescendantIDNumber = lastRepeatIDNumber + 1;
				}

				// if id exists, update it
				if (typeof ($(this).attr('id')) != 'undefined') {
					$(this).attr('id', $(this).attr('id') + '-repeat-' + newRepeatDescendantIDNumber);
				}

				// if for exists, update it
				if (typeof ($(this).attr('for')) != 'undefined') {
					$(this).attr('for', $(this).attr('for') + '-repeat-' + newRepeatDescendantIDNumber);
				}

				// if aria-described-by exists, update it
				if (typeof ($(this).attr('aria-describedby')) != 'undefined') {
					var oldAriaDescribedByString = $(this).attr('aria-describedby');
					var oldAriaDescribedByArray = oldAriaDescribedByString.split(' ');
					var newAriaDescribedByString = '';
					var ariaDescriberSeparator = '';

					$.each(oldAriaDescribedByArray, function (i, d) {
						if (d.length) {
							newAriaDescribedByString += ariaDescriberSeparator + d + '-repeat-' + newRepeatDescendantIDNumber;
							ariaDescriberSeparator = ' ';
						}
					});

					$(this).attr('aria-describedby', newAriaDescribedByString);
				}

				// if listfieldname exists, remove it
				if (typeof ($(this).attr('listfieldname')) != 'undefined') {
					$(this).removeAttr('listfieldname');
				}
			});


		// --- clear the values in the new repeat
		$("#" + newRepeatID).find(':input').each(function () {
			switch (this.type) {
				case 'password':
				case 'text':
				case 'textarea':
				case 'file':
				case 'url':
				case 'select-one':
				case 'select-multiple':
					$(this).val('');
					break;
				case 'checkbox':
				case 'radio':
					this.checked = false;
			}
		});

		$("#" + newRepeatID).find('a').each(function () {
			// do not remove file-related functionality here; still used for older requests which load with the old file control
			if ($(this).attr('data-source-type') == 'url' || $(this).attr('data-source-type') == 'file') {
				$(this).attr('href', '');
				$(this).text('');
			}
		});

		// if the new repeat is a mosFile field
		if ($('#' + newRepeatID + ' > div').hasClass('mosFile')) {
			var fileFieldID = $('#' + newRepeatID + ' div.mos-drag-and-drop-file-attachment').attr("id");
			var fileStorageNameID = $("#" + fileFieldID).find("div.mos-drag-and-drop-file-storage input.mos-drag-and-drop-file-name").attr("id");
			var fileStorageSizeID = $("#" + fileFieldID).find("div.mos-drag-and-drop-file-storage  input.mos-drag-and-drop-file-size").attr("id");
			var fileStorageTypeClassID = $("#" + fileFieldID).find("div.mos-drag-and-drop-file-storage input.mos-drag-and-drop-file-type-class").attr("id");

			// clear hidden input
			$("#" + fileStorageNameID).val("");
			$("#" + fileStorageSizeID).val("");
			$("#" + fileStorageTypeClassID).val("");
			$("div#" + fileFieldID).find("input.mos-drag-and-drop-file-in-quark-files").val("");

			// reset the UI to the populateable state
			$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-name").text("");
			$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-size").text("");
			$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-preview")
				.removeClass("specific-image word-file excel-file powerpoint-file pdf-file tiff-file ai-file eps-file svg-file text-file generic-file")
				.removeAttr("style");

			// set state
			$("#" + fileFieldID).removeClass('replaceable attached attachment-completed attachment-error attaching partial-progress full-progress attachment-completed').addClass('populatable');
			$("#" + fileFieldID).closest("div.label-and-control").removeClass('contains-errors');
			$("#" + fileFieldID).closest("div.label-and-control").find("div.error-message").remove();
		}


		// --- set datepickers in the new repeat

		$('#' + newRepeatID + ' input.date-input').removeClass('hasDatepicker');
		$('#' + newRepeatID + ' input.date-input').datepicker({
			'changeMonth': 'true',
			'changeYear': 'true',
			'dateFormat': 'MM d, yy'
		});
	};



	$.fn.RemoveThisRepeat = function (e) {
		$(e).closest('div.repeat-container').remove();
	};


	// ---- AUTO-GENERATED SCRIPT


	$.fn.BuildScript = function (e) {

		var stmtsToAdd = '';

		if (typeof (e.fieldName) != "undefined") {
			e.hypehnatedName = $().ReturnHyphenatedFieldNameOrValue(e.fieldName);
			e.hypehnatedNameLower = e.hypehnatedName.toLowerCase();
		}

		// if an onchange value has been defined
		if (typeof (e.onChange) != "undefined") {

			// set up the onchange event handler
			if (e.controlType == "radio" || e.controlType == "check") {

				var chcQuantity = e.choices.length;
				stmtsToAdd += '\n$("';

				$.each(e.choices, function (i, chc) {
					chc.hypehnatedValueLower = $().ReturnHyphenatedFieldNameOrValue(chc.value).toLowerCase();
					stmtsToAdd += '#' + e.hypehnatedNameLower + '_' + chc.hypehnatedValueLower;
					if ((i + 1) < chcQuantity) {
						stmtsToAdd += ', ';
					}
				});

				stmtsToAdd += '").on("change", function () { \n';

			} else if (e.controlType == "listItemChooser") {

				stmtsToAdd += '$("#id-or-link_' + e.hypehnatedName + '").on("change", function () { \n';

			} else if (e.controlType == "datetime") {

				stmtsToAdd += '$("#date-input_' + e.hypehnatedName + ', #hours-input_' + e.hypehnatedName + ', #minutes-input_' + e.hypehnatedName + '").on("change", function () { \n';

			} else {

				stmtsToAdd += '$("#' + e.hypehnatedName + '").on("change", function () { \n';
			}

			// for each object in the onChange array
			$.each(e.onChange, function (i, chg) {
				if (typeof (chg.alwaysTrue) != "undefined") {
					stmtsToAdd += '	if (true) { \n';
				} else if (typeof (chg.thisFieldEquals) != "undefined") {
					stmtsToAdd += '	var comparisonBank = [';
					$.each(chg.thisFieldEquals, function (i, comp) {
						if (i != 0) {
							stmtsToAdd += ', ';
						}
						stmtsToAdd += '"' + comp + '"';
					});
					stmtsToAdd += ']; \n';
					stmtsToAdd += '	if (comparisonBank.indexOf($(this).val()) > -1) { \n';
				} else if (typeof (chg.thisFieldNotEquals) != "undefined") {
					stmtsToAdd += '	var comparisonBank = [';
					$.each(chg.thisFieldNotEquals, function (i, comp) {
						if (i != 0) {
							stmtsToAdd += ', ';
						}
						stmtsToAdd += '"' + comp + '"';
					});
					stmtsToAdd += ']; \n';
					stmtsToAdd += '	if (comparisonBank.indexOf($(this).val()) == -1) { \n';
				} else if (typeof (chg.thisFieldIsPositiveInteger) != "undefined") {
					if (chg.thisFieldIsPositiveInteger == 1) {
						stmtsToAdd += '	if (/^[0-9]*[1-9][0-9]*$/.test($(this).val())) { \n';
					} else if (chg.thisFieldIsPositiveInteger == 0) {
						stmtsToAdd += '	if (!(/^[0-9]*[1-9][0-9]*$/.test($(this).val()))) { \n';
					}
				} else if (typeof (chg.thisFieldIsChecked) != "undefined") {
					if (chg.thisFieldIsChecked == 1) {
						stmtsToAdd += '	if ($(this).is(":checked")) { \n';
					} else {
						stmtsToAdd += '	if (!$(this).is(":checked")) { \n';
					}
				} else if (typeof (chg.anyOfSpecificCheckboxesAreChecked) != "undefined") {
					stmtsToAdd += '	if (';
					$.each(chg.anyOfSpecificCheckboxesAreChecked, function (i, checkbox) {
						if (i != 0) {
							stmtsToAdd += ' || ';
						}
						stmtsToAdd += ' $("' + checkbox + '").is(":checked")';
					});
					stmtsToAdd += ') { \n';
				} else if (typeof (chg.allOfSpecificCheckboxesAreChecked) != "undefined") {
					stmtsToAdd += '	if (';
					$.each(chg.allOfSpecificCheckboxesAreChecked, function (i, checkbox) {
						if (i != 0) {
							stmtsToAdd += ' && ';
						}
						stmtsToAdd += ' $("' + checkbox + '").is(":checked")';
					});
					stmtsToAdd += ') { \n';
				} else if (typeof (chg.noneOfSpecificCheckboxesAreChecked) != "undefined") {
					stmtsToAdd += '	if (';
					$.each(chg.noneOfSpecificCheckboxesAreChecked, function (i, checkbox) {
						if (i != 0) {
							stmtsToAdd += ' && ';
						}
						stmtsToAdd += ' !($("' + checkbox + '").is(":checked"))';
					});
					stmtsToAdd += ') { \n';
				} else if (typeof (chg.anyOfSpecificCheckboxesAreCheckedInAllCheckboxSets) != "undefined") {
					stmtsToAdd += ' if (';
					$.each(chg.anyOfSpecificCheckboxesAreCheckedInAllCheckboxSets, function (i, checkboxSet) {
						if (i != 0) {
							stmtsToAdd += ' && ';
						}
						stmtsToAdd += '(';

						$.each(checkboxSet, function (i, checkbox) {
							if (i != 0) {
								stmtsToAdd += ' || ';
							}
							stmtsToAdd += ' $("' + checkbox + '").is(":checked")';
						});
						stmtsToAdd += ')';
					});
					stmtsToAdd += ') { \n';
				} else if (typeof (chg.noneOfSpecificCheckboxesAreCheckedInAnyCheckboxSets) != "undefined") {
					stmtsToAdd += ' if (';
					$.each(chg.noneOfSpecificCheckboxesAreCheckedInAnyCheckboxSets, function (i, checkboxSet) {
						if (i != 0) {
							stmtsToAdd += ' || ';
						}
						stmtsToAdd += '(';

						$.each(checkboxSet, function (i, checkbox) {
							if (i != 0) {
								stmtsToAdd += ' && ';
							}
							stmtsToAdd += ' !$("' + checkbox + '").is(":checked")';
						});
						stmtsToAdd += ')';
					});
					stmtsToAdd += ') { \n';
				} else if (typeof (chg.thisFieldLessThan) != "undefined") {
					stmtsToAdd += '	if ($(this).val() < ' + chg.thisFieldLessThan + ') { \n';
				} else if (typeof (chg.thisFieldLessThanEqualTo) != "undefined") {
					stmtsToAdd += '	if ($(this).val() <= ' + chg.thisFieldLessThanEqualTo + ') { \n';
				} else if (typeof (chg.thisFieldGreaterThan) != "undefined") {
					stmtsToAdd += '	if ($(this).val() > ' + chg.thisFieldLessThan + ') { \n';
				} else if (typeof (chg.thisFieldGreaterThanEqualTo) != "undefined") {
					stmtsToAdd += '	if ($(this).val() >= ' + chg.thisFieldGreaterThanEqualTo + ') { \n';
				} else if (typeof (chg.thisDateFieldLessThanDaysFromNow) != "undefined") {
					stmtsToAdd += '	if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date().toLocaleString() + '") < ' + chg.thisDateFieldLessThanDaysFromNow + ') { \n';
				} else if (typeof (chg.thisDateFieldLessThanEqualToDaysFromNow) != "undefined") {
					stmtsToAdd += '	if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date() + '") <= ' + chg.thisDateFieldLessThanEqualToDaysFromNow + ') { \n';
				} else if (typeof (chg.thisDateFieldGreaterThanDaysFromNow) != "undefined") {
					stmtsToAdd += '	if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date() + '") > ' + chg.thisDateFieldGreaterThanDaysFromNow + ') { \n';
				} else if (typeof (chg.thisDateFieldGreaterThanDaysFromNowEqualTo) != "undefined") {
					stmtsToAdd += '	if ($().ReturnDateDifferenceInDays($(this).val(), "' + new Date().toLocaleString() + '") >= ' + chg.thisDateFieldGreaterThanDaysFromNowEqualTo + ') { \n';
				} else if (typeof (chg.thisTimeFieldSetEarlierThan) != "undefined") {
					stmtsToAdd += '	if (typeof($("select#hours-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#hours-input_' + e.hypehnatedName + '").val() != "" && typeof($("select#minutes-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#minutes-input_' + e.hypehnatedName + '").val()!= "" && $().ReturnTimeOneIsEarlierThanTimeTwo($("select#hours-input_' + e.hypehnatedName + '").val(), $("select#minutes-input_' + e.hypehnatedName + '").val(), "' + chg.thisTimeFieldSetEarlierThan.hours + '", "' + chg.thisTimeFieldSetEarlierThan.minutes + '") != 0) { \n';
				} else if (typeof (chg.thisTimeFieldSetLaterThan) != "undefined") {
					stmtsToAdd += '	if (typeof($("select#hours-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#hours-input_' + e.hypehnatedName + '").val() != "" && typeof($("select#minutes-input_' + e.hypehnatedName + '").val()) != "undefined" && $("select#minutes-input_' + e.hypehnatedName + '").val()!= "" && $().ReturnTimeOneIsLaterThanTimeTwo($("select#hours-input_' + e.hypehnatedName + '").val(), $("select#minutes-input_' + e.hypehnatedName + '").val(), "' + chg.thisTimeFieldSetLaterThan.hours + '", "' + chg.thisTimeFieldSetLaterThan.minutes + '") != 0) { \n';
				}



				if (typeof (chg.addlOrConditions) != "undefined") {
					stmtsToAdd += '			if (';

					$.each(chg.addlOrConditions, function (i, orCond) {
						if (i != 0) {
							stmtsToAdd += ' || ';
						}
						stmtsToAdd += orCond;
					});

					stmtsToAdd += ') { \n';
				}

				if (typeof (chg.addlAndConditions) != "undefined") {
					stmtsToAdd += '			if (';

					$.each(chg.addlAndConditions, function (i, andCond) {
						if (i != 0) {
							stmtsToAdd += ' && ';
						}
						stmtsToAdd += andCond;
					});

					stmtsToAdd += ') { \n';
				}



				// if this change includes a show
				if (typeof (chg.show) != "undefined") {

					// for each value in the show array
					$.each(chg.show, function (i, sh) {
						if (typeof (sh.fieldName) != "undefined") {
							var shID = '#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.fieldName));
						}
						if (typeof (sh.noteID) != "undefined") {
							var shID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.noteID));
						}
						if (typeof (sh.divID) != "undefined") {
							var shID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.divID));
						}
						if (typeof (sh.headerID) != "undefined") {
							var shID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.headerID));
						}
						if (typeof (sh.divClass) != "undefined") {
							var shID = '.' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", sh.divClass));
						}

						// if not visible, show
						stmtsToAdd += '		if (!$("' + shID + '").is(":visible")) { \n' +
							'			$("' + shID + '").show("fast"); \n' +
							'			$("' + shID + '").removeClass("hidden"); \n' +
							'		} \n';
					});

				}

				// if this change includes a hide
				if (typeof (chg.hide) != "undefined") {

					// for each value in the show array
					$.each(chg.hide, function (i, hd) {
						if (typeof (hd.fieldName) != "undefined") {
							var hdID = '#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.fieldName));
						}
						if (typeof (hd.noteID) != "undefined") {
							var hdID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.noteID));
						}
						if (typeof (hd.divID) != "undefined") {
							var hdID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.divID));
						}
						if (typeof (hd.headerID) != "undefined") {
							var hdID = '#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.headerID));
						}
						if (typeof (hd.divClass) != "undefined") {
							var hdID = '.' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", hd.divClass));
						}

						// if visible, hide
						stmtsToAdd += '		if (!$("' + hdID + '").hasClass("hidden")) { \n' +
							'			$("' + hdID + '").hide("fast"); \n' +
							'			$("' + hdID + '").addClass("hidden"); \n' +
							'		} \n';
					});

				}

				// if this change includes a require
				if (typeof (chg.require) != "undefined") {

					// for each value in the require array
					$.each(chg.require, function (i, req) {

						// if repeatable isn't set, set to 0
						req = $.extend({
							'repeatable': 0
						}, req);
						// if not required, require
						stmtsToAdd += '		if (!$("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", req.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-required")) { \n' +
							'			$(this).SetFieldToRequired("' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", req.fieldName)) + '", "' + req.type + '", "' + req.repeatable + '"); \n' +
							'		} \n';

					});

				}

				// if this change includes an optional
				if (typeof (chg.optional) != "undefined") {

					// for each value in the show array
					$.each(chg.optional, function (i, optl) {

						// if repeatable isn't set, set to 0
						optl = $.extend({
							'repeatable': 0
						}, optl);
						// if not optional, make optional
						stmtsToAdd += '		if ($("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", optl.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-required")) { \n' +
							'			$(this).SetFieldToOptional("' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", optl.fieldName)) + '", "' + optl.type + '", "' + optl.repeatable + '"); \n' +
							'		} \n';
					});

				}

				// if this change includes a disabled
				if (typeof (chg.disable) != "undefined") {

					// for each value in the show array
					$.each(chg.disable, function (i, dis) {
						// if not visible, show
						stmtsToAdd += '		if (!$("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", dis.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-disabled")) { \n';

						if (typeof (dis.inputIDs) != 'undefined') {
							$(dis.inputIDs).each(function (inputIDIndex, InputIDValue) {
								stmtsToAdd += '			$().SetFieldToDisabled("#' + InputIDValue + '"); \n';
							});
						}

						if (typeof (dis.selectIDs) != 'undefined') {
							$(dis.selectIDs).each(function (selectIDIndex, selectIDValue) {
								stmtsToAdd += '			$().SetFieldToDisabled("#' + selectIDValue + '"); \n';
							});
						}

						if (typeof (dis.inputIDs) == 'undefined' && typeof (dis.selectIDs) == 'undefined') {
							stmtsToAdd += '			$().SetFieldToDisabled("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", dis.fieldName)) + '"); \n';
						}

						stmtsToAdd += '		} \n';
					});

				}

				// if this change includes an enabled
				if (typeof (chg.enable) != "undefined") {

					// for each value in the show array
					$.each(chg.enable, function (i, en) {
						// if not visible, show
						stmtsToAdd += '		if ($("#label-and-control_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + ' div.field-type-indication span.field-type-indicator").hasClass("field-disabled")) { \n';

						if (typeof (en.inputIDs) != 'undefined') {
							$(en.inputIDs).each(function (inputIDIndex, InputIDValue) {
								stmtsToAdd += '			$().SetFieldToEnabled("#' + InputIDValue + '"); \n';
								stmtsToAdd += '			if ($("#' + InputIDValue + '").attr("data-is-date") == true) { \n';
								stmtsToAdd += '				 $("#' + InputIDValue + '").datepicker({ \n';
								stmtsToAdd += '					 changeMonth: "true", \n';
								stmtsToAdd += '					  changeYear: "true", \n';
								stmtsToAdd += '					  dateFormat: "MM d, yy" \n';
								stmtsToAdd += '				 }); \n';
								stmtsToAdd += '			} \n';

							});
						}

						if (typeof (en.selectIDs) != 'undefined') {
							$(en.selectIDs).each(function (selectIDIndex, selectIDValue) {
								stmtsToAdd += '			$().SetFieldToEnabled("#' + selectIDValue + '"); \n';
							});
						}

						if (typeof (en.inputIDs) == 'undefined' && typeof (en.selectIDs) == 'undefined') {
							stmtsToAdd += '			$().SetFieldToEnabled("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + '"); \n';
							stmtsToAdd += '			if ($("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + '").attr("data-is-date") == "true") { \n';
							stmtsToAdd += '				 $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", en.fieldName)) + '").datepicker({ \n';
							stmtsToAdd += '					 changeMonth: "true", \n';
							stmtsToAdd += '					  changeYear: "true", \n';
							stmtsToAdd += '					  dateFormat: "MM d, yy" \n';
							stmtsToAdd += '				 }); \n';
							stmtsToAdd += '			} \n';
						}

						stmtsToAdd += '		} \n';
					});

				}

				// if this change includes a calibration of odd & even subsection classes
				if (typeof (chg.calibrateOddEvenSubsectionClasses) != "undefined") {

					// for each value in the calibrateOddEvenSubsectionClasses array

					stmtsToAdd += '		var visibleSubsectionCounter = 0;';
					stmtsToAdd += '		$("';

					$.each(chg.calibrateOddEvenSubsectionClasses, function (i, subsection) {
						if (i != 0) { stmtsToAdd += ','; }
						stmtsToAdd += subsection;
					});

					stmtsToAdd += '").each(function(i,subsection) { \n';
					stmtsToAdd += '		$(this).removeClass("odd-visible-subsection even-visible-subsection"); \n';
					stmtsToAdd += '		if ($(this).is(":visible")) { \n';
					stmtsToAdd += '			visibleSubsectionCounter++; \n';
					stmtsToAdd += '			if (visibleSubsectionCounter % 2 == 1) { \n';
					stmtsToAdd += '				$(this).addClass("odd-visible-subsection"); \n';
					stmtsToAdd += '			} else { \n';
					stmtsToAdd += '				$(this).addClass("even-visible-subsection"); \n';
					stmtsToAdd += '			} \n';
					stmtsToAdd += '		} \n';
					stmtsToAdd += '}); \n';
				}

				// if this change includes a checkbox label update
				if (typeof (chg.checkboxLabelUpdate) != "undefined") {

					// for each value in the checkboxLabelUpdate array
					$.each(chg.checkboxLabelUpdate, function (i, l) {
						stmtsToAdd += '		$("label[for=\'' + l.labelFor + '\']").html("' + l.newLabel + '"); \n';
					});

				}

				// if this change includes a set
				if (typeof (chg.set) != "undefined") {

					// for each value in the set array
					$.each(chg.set, function (i, set) {
						if (set.type == "text" || set.type == "textarea") {
							if (typeof (set.method) != "undefined" && set.method == "dynamic") {
								stmtsToAdd += '	  $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val(' + set.value + '); \n';
							} else {
								stmtsToAdd += '	  $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val("' + set.value + '"); \n';
							}
						} else if (set.type == "checkbox" || set.type == "radio") {
							if (set.checked == 0) { set.checked = false; }
							if (set.checked == 1) { set.checked = true; }
							var inputID = $().ReturnHyphenatedFieldNameOrValue(set.fieldName).toLowerCase() + '_' + $().ReturnHyphenatedFieldNameOrValue(set.valueAffected).toLowerCase();
							stmtsToAdd += '	  $("#' + inputID + '").prop("checked", ' + set.checked + '); \n';
							stmtsToAdd += set.checked ?
								'	  $("#' + inputID + '").attr("checked", true); \n' :
								'	  $("#' + inputID + '").removeAttr("checked"); \n';

						} else if (set.type == "select") {
							if (typeof (set.copyField) != "undefined") {
								var copyFieldID = $().ReturnHyphenatedFieldNameOrValue(set.copyField);
								stmtsToAdd += '	  $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").prop("selectedIndex", $("#' + copyFieldID + '").prop("selectedIndex")); \n';

							} else {
								stmtsToAdd += '	  $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").prop("selectedIndex", ' + set.optionIndex + '); \n';
							}
						} else if (set.type == "datetime") {
							if (typeof (set.method) != "undefined" && set.method == "dynamic" && typeof (set.valueFromFieldName) != "undefined") {
								stmtsToAdd += '	  $("input#date-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val($("input#date-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.valueFromFieldName)) + '").val()); \n';
								stmtsToAdd += '	  $().SetSelectByText("#hours-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '", $("select#hours-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.valueFromFieldName)) + ' option:selected").text()); \n';
								stmtsToAdd += '	  $().SetSelectByText("#minutes-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '", $("select#minutes-input_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.valueFromFieldName)) + ' option:selected").text()); \n';
								stmtsToAdd += '	  $("input#datetime-storage_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val($("input#datetime-storage_' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.valueFromFieldName)) + '").val()); \n';
							}
						} else if (set.type == "datePicker") {
							// to be completed
						} else if (set.type == "peoplePicker") {
							// currently, only clears OR adds; does not replace (clear THEN add)
							// currently, other than current user, doesn't handle people dynamically
							if (set.value == '') {
								stmtsToAdd += '	  $().ClearPeoplePicker("' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '_TopSpan"); \n';
							} else if (set.value == 'currentUser') {
								stmtsToAdd += '	  $().PutAddtlPeopleInPicker("' + set.fieldName + '", [{"name": "' + uData.name + '", "email": "' + uData.email + '", "account": "' + uData.account + '" }]); \n';
							}
						} else if (set.type == "hidden") {
							stmtsToAdd += '	  $("#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", set.fieldName)) + '").val("' + set.value + '"); \n';
						}
					});

				}

				if (typeof (chg.addlAndConditions) != "undefined" || typeof (chg.addlOrConditions) != "undefined") {
					stmtsToAdd += '			} \n';
				}

				stmtsToAdd += '	} \n';

			});

			stmtsToAdd += '}); \n';
		}

		if (e.controlType == "listItemChooser") {

			stmtsToAdd += '\n$("#app-container").append("\x3cdiv id=\\x22list-item-dialog\\x22\x3e\x3c/div\x3e"); \n' +
				'$("div#list-item-dialog").dialog({ \n' +
				'	autoOpen: false, \n' +
				'	draggable: true, \n' +
				'	show: { effect: "bounce", times: 2, duration: 500 }, \n' +
				'	width: 1200, \n' +
				'	maxHeight: 600, \n' +
				'}); \n' +

				'$("div[aria-describedby=\'list-item-dialog\'] div.ui-dialog-titlebar span.ui-dialog-title").append("\x3cspan class=\\x22list-dialog-header\\x22\x3e' + e.dialogTitle + '\x3c/span\x3e"); \n' +
				'$("div#list-item-dialog").append("\x3cdiv id=\\x22list-item-table-container\\x22 class=\\x22table-container\\x22\x3e\x3c/div\x3e"); \n' +

				'var sections = ' + JSON.stringify(e.listItemViewSections) + '; \n' +

				'$().RenderAllDataTables(sections, "list-item-table-container"); \n' +

				'$("a#anchor_' + e.hypehnatedName + '").click(function() { \n' +
				'	$("div#list-item-dialog").dialog("open"); \n' +
				'}); \n' +

				'$("div#list-item-dialog a.anchor_no-href").click(function() { \n' +
				'	$("input#id-or-link_' + e.hypehnatedName + '").val($(this).text()); \n' +
				'	$("input#id-or-link_' + e.hypehnatedName + '").trigger("change"); \n' +
				'	$("div#list-item-dialog").dialog("close"); \n' +
				'}); \n';
		}

		return stmtsToAdd;
	};


	// ---- STANDARD APPROVALS


	$.fn.ReturnApprovalNode = function (standardName, hyphenatedName, email) {
		email = email.toLowerCase();
		return '	<div id="approver_' + hyphenatedName + '" class="approver-container" data-approver-email="' + email + '" data-approval-status="">' +
			'		  <h3>' + standardName + '</h3>' +
			'		  <div id="label-and-control_Approval-Indicator_' + hyphenatedName + '" class="label-and-control radio">' +
			'				<div class="label">' +
			'					 <span id="choice-set-label_approval-indicator_' + hyphenatedName + '">Approval Indicator</span>' +
			'				</div>' +
			'				<div class="field-type-indication">' +
			'					 <span id="field-type-indicator_approval-indicator_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
			'						  <span class="message message-optional">Optional Field</span>' +
			'					 </span>' +
			'				</div>' +
			'				<div class="control">' +
			'					 <div class="choice-container">' +
			'						  <input disabled name="Approval-Indicator_' + hyphenatedName + '" id="approval-indicator_approve_' + hyphenatedName + '" value="approve" aria-describedby="field-type-indicator_approval-indicator choice-set-label_approval-indicator approval-indicator_help-note-1 " type="radio">' +
			'						  <label for="approval-indicator_approve_' + hyphenatedName + '">I approve</label>' +
			'					 </div>' +
			'					 <div class="choice-container">' +
			'						  <input disabled name="Approval-Indicator_' + hyphenatedName + '" id="approval-indicator_disapprove_' + hyphenatedName + '" value="disapprove" aria-describedby="field-type-indicator_approval-indicator choice-set-label_approval-indicator approval-indicator_help-note-1 " type="radio">' +
			'						  <label for="approval-indicator_disapprove_' + hyphenatedName + '">I disapprove</label>' +
			'					 </div>' +
			'					 <div class="help-text" id="approval-indicator_help-note-1_' + hyphenatedName + '">' +
			fData.approvalStmt +
			'					 </div>' +
			'					 <div class="help-text urgent hidden" id="approval-indicator_help-note-2_' + hyphenatedName + '">' +
			'						  Are you sure? The only way to undo this is for the requester to initiate a new request.' +
			'					 </div>' +
			'				</div>' +
			'		  </div>' +
			'		  <div id="label-and-control_Approval-Signature_' + hyphenatedName + '" class="label-and-control text">' +
			'				<div class="label"><label for="Approval-Signature_' + hyphenatedName + '">Signature</label></div>' +
			'				<div class="field-type-indication">' +
			'					 <span id="field-type-indicator_approval-signature_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
			'						  <span class="message message-optional">Optional Field</span>' +
			'					 </span>' +
			'				</div>' +
			'				<div class="control">' +
			'					 <input disabled id="Approval-Signature_' + hyphenatedName + '" class="" aria-describedby="field-type-indicator_approval-signature" type="text">' +
			'				</div>' +
			'		  </div>' +
			'		  <div id="label-and-control_Approval-Date_' + hyphenatedName + '" class="label-and-control text">' +
			'				<div class="label"><label for="Approval-Date">Date</label></div>' +
			'				<div class="field-type-indication">' +
			'					 <span id="field-type-indicator_approval-date_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
			'						  <span class="message message-optional">Optional Field</span>' +
			'					 </span>' +
			'				</div>' +
			'				<div class="control">' +
			'					 <input disabled id="Approval-Date_' + hyphenatedName + '" class="" aria-describedby="field-type-indicator_approval-date" type="text">' +
			'				</div>' +
			'		  </div>' +
			'		  <div id="label-and-control_Approval-Notes_' + hyphenatedName + '" class="label-and-control textarea">' +
			'				<div class="label"><label for="Approval-Notes">Notes</label></div>' +
			'				<div class="field-type-indication">' +
			'					 <span id="field-type-indicator_approval-notes_' + hyphenatedName + '" class="field-type-indicator field-optional">' +
			'						  <span class="message message-optional">Optional Field</span>' +
			'					 </span>' +
			'				</div>' +
			'				<div class="control">' +
			'					 <textarea disabled id="Approval-Notes_' + hyphenatedName + '" class="" aria-describedby="field-type-indicator_approval-notes Approval-Notes_' + hyphenatedName + '_help-note"></textarea>' +
			'					 <div id="Approval-Notes_' + hyphenatedName + '_help-note" class="help-text">Visible to the requester and the admin</div>' +
			'				</div>' +
			'		  </div>' +
			'	</div>';
	};



	$.fn.ReturnApprovalNodeScript = function (standardName, hyphenatedName, NowAsFriendlyDateWithYear) {
		return '	 $("#approval-indicator_approve_' + hyphenatedName + ', #approval-indicator_disapprove_' + hyphenatedName + '").on("change", function () { \n' +
			'		  if ($(this).val() == "disapprove") { \n' +
			'				if (!$("#approval-indicator_help-note-2_' + hyphenatedName + '").is(":visible")) { \n' +
			'					 $("#approval-indicator_help-note-2_' + hyphenatedName + '").show("fast"); \n' +
			'					 $("#approval-indicator_help-note-2_' + hyphenatedName + '").removeClass("hidden"); \n' +
			'				} \n' +
			'				if ($("#approval-indicator_help-note-1_' + hyphenatedName + '").is(":visible")) { \n' +
			'					 $("#approval-indicator_help-note-1_' + hyphenatedName + '").hide("fast"); \n' +
			'					 $("#approval-indicator_help-note-1_' + hyphenatedName + '").addClass("hidden"); \n' +
			'				} \n' +
			'				$("#approval-indicator_disapprove_' + hyphenatedName + '").attr("checked", true);' +
			'				$("#approval-indicator_approve_' + hyphenatedName + '").removeAttr("checked");' +
			'				$("#approver_' + hyphenatedName + '").attr("data-approval-status", "disapproved");' +
			'		  } \n' +
			'		  if ($(this).val() == "approve") { \n' +
			'				if (!$("#approval-indicator_help-note-1_' + hyphenatedName + '").is(":visible")) { \n' +
			'					 $("#approval-indicator_help-note-1_' + hyphenatedName + '").show("fast"); \n' +
			'					 $("#approval-indicator_help-note-1_' + hyphenatedName + '").removeClass("hidden"); \n' +
			'				} \n' +
			'				if ($("#approval-indicator_help-note-2_' + hyphenatedName + '").is(":visible")) { \n' +
			'					 $("#approval-indicator_help-note-2_' + hyphenatedName + '").hide("fast"); \n' +
			'					 $("#approval-indicator_help-note-2_' + hyphenatedName + '").addClass("hidden"); \n' +
			'				} \n' +
			'				$("#approval-indicator_approve_' + hyphenatedName + '").attr("checked", true);' +
			'				$("#approval-indicator_disapprove_' + hyphenatedName + '").removeAttr("checked");' +
			'				$("#approver_' + hyphenatedName + '").attr("data-approval-status", "approved");' +
			'		  } \n' +
			'		 $("input#Approval-Signature_' + hyphenatedName + '").val("' + standardName + '"); \n' +
			'		 $("input#Approval-Date_' + hyphenatedName + '").val("' + NowAsFriendlyDateWithYear + '"); \n' +
			'	 }); \n';;
	};



	$.fn.ReturnNotificationHistoryRow = function (standardName, hyphenatedName, NowAsISOLocal, NowAsFriendlyDateTimeWithYear, neededOrNot) {
		return '		 <tr class="notification-set" id="notification-set_' + hyphenatedName + '_' + NowAsISOLocal + '">' +
			'			  <th>' + standardName + '</th>' +
			'			  <td>' + neededOrNot + '</td>' +
			'			  <td>' + NowAsFriendlyDateTimeWithYear + '</td>' +
			'		 </tr>';
	};



	// ---- PRINTING



	function ReturnRequestFormDataFromDOMAsObject() {
		// get data from form as string
		var clonedForm = $("div#request-form").clone();
		var repeatables = $(clonedForm).find('[data-repeatable]');
		var formData = '{';
		// handle the repeatable section
		formData += '"RepeatedElements": [';
		repeatables.each(function (index, value) {
			var thisIsLastRepeatable = false;
			if ((repeatables.length - 1) === index) {
				thisIsLastRepeatable = true;
			}
			var repeatableString = '{"ID": "' + $(this).attr('id') + '",';
			repeatableString += '"OriginalToRepeat": "' + $(this).attr('data-original-to-repeat') + '",';
			repeatableString += ReturnRequestStorageObjectPropertiesAndPushRequestColumns(this);
			repeatableString = repeatableString.substring(0, repeatableString.length - 1); // remove trailing comma
			repeatableString += '}';
			if (!thisIsLastRepeatable) {
				repeatableString += ',';
			}
			formData += repeatableString;
			$(this).remove();
		});
		// finish off the repeatable section
		formData += '],';
		// handle the non-repeatables
		formData += ReturnRequestStorageObjectPropertiesAndPushRequestColumns(clonedForm);
		// remove trailing comma
		formData = formData.substring(0, formData.length - 1);
		// end building the JSON string that will be stored
		formData += '}';
		console.log(formData);
		// get object from string
		formData = JSON.parse(formData);
		return formData;
	}


	function PrintOutsideEmploymentRequest() {

		// set working message
		var workingMessage = $("div#app-container div#overlays-screen-container div#wait-while-working div.message p");
		$(workingMessage).text("Checking your info");

		// if user-entered data is valid
		if ($("div#request-form").ValidateForm() != false) {

			// get user-entered data as an object
			var formData = ReturnRequestFormDataFromDOMAsObject();

			// get the current date
			var currentDate = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY');

			// construct print content
			var printContent = '<h1>Outside Employment Request</h1>' +
				'<h2>Request Date</h2>' +
				'<p>' + currentDate + '</p>' +
				'<h2>Staff Member</h2>' +
				'<ul style="margin: 0;">' +
				'	<li><b>Staff Member Name:</b> ' + formData["Staff-Member-Name"] + '</li>' +
				'	<li><b>Staff Member Position:</b> ' + formData["Staff-Member-Position"] + '</li>' +
				'	<li><b>Manager\'s Name:</b> ' + formData["Manager-Name"] + '</li>' +
				'</ul>' +
				'<h2>Outside Employment</h2>' +
				'<h3>Proposed Outside Employer</h3>' +
				'<p>' + formData["Outside-Employer"] + '</p>' +
				'<h3>Proposed Start Date With Outside Employer</h3>' +
				'<p>' + formData["Start-Date"] + '</p>' +
				'<h3>Proposed Primary Responsibilities of Outside Employment</h3>' +
				'<p>' + formData["Primary-Responsibilities"] + '</p>' +
				'<h3>Relation of Outside Responsibilities to Museum Responsibilities</h3>' +
				'<p>' + formData["Relevant-Responsibilities"] + '</p>' +
				'<h3>Museum Materials Used in Outside Employment</h3>' +
				'<p>' + formData["Relevant-Materials"] + '</p>' +
				'<h2>Approvals</h2>' +
				'<table style="width: 100%;">' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 25%; height: 40px; text-align: right">Signature of Staff Member</td>' +
				'		<td style="width: 45%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 25%; height: 40px; text-align: right">Signature of Manager</td>' +
				'		<td style="width: 45%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 25%; height: 40px; text-align: right">Signature of Controller</td>' +
				'		<td style="width: 45%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 25%; height: 40px; text-align: right">Signature of VP of HR</td>' +
				'		<td style="width: 45%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'<table>';


			printContent = ReturnPrintableContentWithStandardWrapper(printContent, "hr-outside-employment");

			// send print content to printer
			PrintToPrinter(printContent);

			// if user-entered data is NOT valid
		} else {
			// display invalid data overlay
			$('div#overlays-screen-container').fadeIn(200);
			$("#mos-form-data-errors").fadeIn(400);
		}
	}


	function PrintEmploymentAuthorizationRequest() {

		// set working message
		var workingMessage = $("div#app-container div#overlays-screen-container div#wait-while-working div.message p");
		$(workingMessage).text("Checking your info");

		// if user-entered data is valid
		if ($("div#request-form").ValidateForm() != false) {

			// get user-entered data as an object
			var formData = ReturnRequestFormDataFromDOMAsObject();

			// get the current date
			var currentDate = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY');

			// get the quantity of account sets
			var accountSetPropertyNameSuffix = '';

			// construct print content
			var printContent = '<h1>Employment Authorization Request</h1>' +
				'<p>' + currentDate + '</p>' +
				'<h2>Human Resources\' Use Only</h2>' +
				'<table style="width: 100%;">' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 18%; height: 40px; text-align: right">EAR Requisition #</td>' +
				'		<td style="width: 17%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 20; height: 40px; text-align: right">Recruiter Assigned</td>' +
				'		<td style="width: 45%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 18%; height: 40px; text-align: right">EEO Classification</td>' +
				'		<td style="width: 17%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 20%; height: 40px; text-align: right">Position Filled By</td>' +
				'		<td style="width: 45%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 18%; height: 40px;"></td>' +
				'		<td style="width: 17%; height: 40px;"></td>' +
				'		<td style="width: 20%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 45%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'<table>' +
				'<h2>Job Data</h2>' +
				'<table style="width: 100%;">' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 50%; vertical-align: top;">' +
				'			<ul style="margin: 0;">';

			if (formData["Department"] != "Other") {
				printContent += '				<li><b>Department:</b> ' + formData["Department"] + '</li>';
			}
			if (formData["Department"] == "Other") {
				printContent += '				<li><b>Department:</b> ' + formData["Other-Department"] + '</li>';
			}

			printContent += '				<li><b>Position Title:</b> ' + formData["Position-Title"] + '</li>' +
				'				<li><b>Grade:</b> ' + formData["Grade"] + '</li>' +
				'				<li><b>Employee Classification:</b> ' + formData["Employee-Classification"] + '</li>' +
				'				<li><b>Scheduled Hours, Biweekly:</b> ' + formData["Scheduled-Hours-Biweekly"] + '</li>' +
				'				<li><b>Scheduled Hours, Annually:</b> ' + formData["Scheduled-Hours-Annually"] + '</li>' +
				'				<li><b>Proposed Hourly Wage:</b> ' + formData["Proposed-Hourly-Wage"] + '</li>' +
				'				<li><b>Proposed Annualized Salary:</b> ' + formData["Proposed-Annualized-Salary"] + '</li>' +
				'				<li><b>Proposed Start Date:</b> ' + formData["Proposed-Start-Date"] + '</li>';

			if (formData["Employee-Classification"] != "Regular FT" && formData["Employee-Classification"] != "Regular PT") {
				printContent += '				<li><b>Proposed End Date:</b> ' + formData["Proposed-End-Date"] + '</li>';
			}

			if (typeof (formData["overtime-status_exempt"]) !== "undefined") {
				printContent += '				<li><b>Overtime Status:</b> Exempt</li>';
			}

			if (typeof (formData["overtime-status_nonexempt"]) !== "undefined") {
				printContent += '				<li><b>Overtime Status:</b> Non-exempt</li>';
			}

			printContent += '				<li><b>Work Schedule:</b> ' + formData["Schedule"] + '</li>' +
				'				<li><b>Funding Source:</b> ' + formData["Funding-Source"] + '</li>' +
				'			</ul>' +
				'		</td>' +
				'		<td style="width: 50%; vertical-align: top;">' +
				'			<ul>';







			if (formData["Funding-Source"] == "Grant Funds" || formData["Funding-Source"] == "Endowment Funds") {
				printContent += '				<li><b>Accounts:</b> ' +
					'					<ol>';

				$.each(formData["RepeatedElements"], function (i, accountSet) {

					if (i != 0) { accountSetPropertyNameSuffix = '-repeat-' + i; }
					printContent += '						<li>Account ' + (i + 1) +
						'							<ol>' +
						'								<li><b>Grant Object Code:</b> ' + accountSet["Grant-Object-Code" + accountSetPropertyNameSuffix] + '</li>' +
						'								<li><b>Grant Source Code:</b> ' + accountSet["Grant-Source-Code" + accountSetPropertyNameSuffix] + '</li>' +
						'								<li><b>Percent Salary from this Account:</b> ' + accountSet["Percent-Salary-from-this-Account" + accountSetPropertyNameSuffix] + '</li>' +
						'							</ol>' +
						'						</li>';
				});

				printContent += '					</ol>' +
					'				</li>';
			}

			printContent += '				<li><b>Workspace Approved by Facilities?:</b> Yes</li>';














			if (typeof (formData["job-opening-reason_backfill"]) !== "undefined") {
				printContent += '				<li><b>Reason for Submission:</b> Backfill for ' + formData["Backfill-For"] + '</li>';
			}
			if (typeof (formData["job-opening-reason_promotion"]) !== "undefined") {
				printContent += '				<li><b>Reason for Submission:</b> Promotion for ' + formData["Promotion-For"] + '</li>';
			}
			if (typeof (formData["job-opening-reason_wageorschedulechange"]) !== "undefined") {
				printContent += '				<li><b>Reason for Submission:</b> Wage / Schedule Change for ' + formData["Wage-or-Schedule-Change-For"] + '</li>';
			}
			if (typeof (formData["job-opening-reason_additiontofte"]) !== "undefined") {
				printContent += '				<li><b>Reason for Submission:</b> Addition to Budgeted FTE</li>';
			}

			if (typeof (formData["Replacement-Salary"]) !== "undefined") {
				printContent += '				<li><b>Last Salary for Position:</b> ' + formData["Replacement-Salary"] + '</li>';
				var salaryChangeString = parseFloat(formData["Salary-Change"].replace("\$", "").replace(/[,]/g, ""));
				printContent += '				<li><b>Salary Change:</b> ' + formData["Salary-Change"] + '</li>';
				if (salaryChangeString !== 0) {
					printContent += '				<li><b>Salary Change Reason:</b> ' + formData["Salary-Change-Reason"] + '</li>';
				}
			}

			// if (typeof(formData["hrc-grading_graded"]) !== "undefined") {
			// 	printContent += '				<li><b>HRC Grading:</b> Graded by HRC</li>' + 
			// 					'				<li><b>HRC Grading Last Updated:</b> ' + formData["HRC-Last-Updated"] + '</li>';
			// }

			// if (typeof(formData["hrc-grading_pending"]) !== "undefined") {
			// 	printContent += '				<li><b>HRC Grading:</b> Pending</li>';
			// }

			printContent += '		</td>' +
				'	</tr>' +
				'<table>';


			printContent += '<h2>Approvals</h2>' +
				'<table style="width: 100%;">' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 20%; height: 40px; text-align: right">Manager/Director</td>' +
				'		<td style="width: 50%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 20%; height: 40px; text-align: right">Vice President</td>' +
				'		<td style="width: 50%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'	<tr style="width: 100%;">' +
				'		<td style="width: 20%; height: 40px; text-align: right">Human Resources</td>' +
				'		<td style="width: 50%; height: 40px; border-bottom: 2px solid black"></td>' +
				'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
				'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
				'	</tr>' +
				'<table>';

			printContent = ReturnPrintableContentWithStandardWrapper(printContent, "hr-employment-authorization");

			// send print content to printer
			PrintToPrinter(printContent);

			// if user-entered data is NOT valid
		} else {
			// display invalid data overlay
			$('div#overlays-screen-container').fadeIn(200);
			$("#mos-form-data-errors").fadeIn(400);
		}
	}



	function PrintPersonnelActionRequest() {

		// set working message
		var workingMessage = $("div#app-container div#overlays-screen-container div#wait-while-working div.message p");
		$(workingMessage).text("Checking your info");

		// if user-entered data is valid
		if ($("div#request-form").ValidateForm() != false) {

			// get user-entered data as an object
			var formData = ReturnRequestFormDataFromDOMAsObject();
			console.log(formData);

			// get the current date
			var currentDate = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY');

















			// get the quantity of account sets
			var accountSetPropertyNameSuffix;

			// set up status change employee data
			var statusChangeEmployeeData;

			// construct print content
			var printContent = '<h1>Personnel Action Request</h1>' +
				'<p>' + currentDate + '</p>';

			if (formData["Action"] == "New Hire") {
				printContent += '<h2>New Hire</h2>';
			}

			if (formData["Action"] == "Rehire") {
				printContent += '<h2>Rehire</h2>';
			}

			if (formData["Action"] == "New Hire" || formData["Action"] == "Rehire") {
				printContent += '<ul style="margin: 0;">' +
					'	<li><b>First Name:</b> ' + formData["Hire-First-Name"] + '</li>' +
					'	<li><b>Last Name:</b> ' + formData["Hire-Last-Name"] + '</li>' +
					'	<li><b>Manager / Supervisor:</b> ' + formData["Hire-Manager"][0]["displayText"] + '</li>' +
					'	<li><b>Department:</b> ' + formData["Hire-Department"] + '</li>' +
					'	<li><b>Position Title:</b> ' + formData["Hire-Position-Title"] + '</li>' +
					'	<li><b>Grade:</b> ' + formData["Hire-Grade"] + '</li>' +
					'	<li><b>Employee Classification:</b> ' + formData["Hire-Employee-Classification"] + '</li>' +
					'	<li><b>Scheduled Hours, Biweekly:</b> ' + formData["Hire-Scheduled-Hours-Biweekly"] + '</li>' +
					'	<li><b>Scheduled Hours, Annually:</b> ' + formData["Hire-Scheduled-Hours-Annually"] + '</li>' +
					'	<li><b>Proposed Hourly Wage:</b> ' + formData["Hire-Proposed-Hourly-Wage"] + '</li>' +
					'	<li><b>Proposed Annualized Salary:</b> ' + formData["Hire-Proposed-Annualized-Salary"] + '</li>' +
					'	<li><b>Anticipated Start Date:</b> ' + formData["Hire-Start-Date"] + '</li>';
				if (formData["Hire-Employee-Classification"] != "Regular FT" && formData["Hire-Employee-Classification"] != "Regular PT") {
					printContent += '	<li><b>Anticipated End Date:</b> ' + formData["Hire-End-Date"] + '</li>';
				}
				printContent += '	<li><b>Funding Source:</b> ' + formData["Hire-Funding-Source"] + '</li>';

				if (formData["Hire-Funding-Source"] == "Grant Funds" || formData["Hire-Funding-Source"] == "Endowment Funds") {
					printContent += '	<li><b>Account(s):</b> <ol>';
					var accountSetIdentifier = 'Hire-account-numbers-set';
					$.each(formData["RepeatedElements"], function (i, accountSet) {
						if (StrInStr(accountSet.ID, accountSetIdentifier)) {
							accountSetPropertyNameSuffix = StrInStr(accountSet.ID, accountSetIdentifier, 3);
							printContent += '						<li>Account<ol>' +
								'							<li><b>Grant Object Code:</b> ' + accountSet["Hire-Grant-Object-Code" + accountSetPropertyNameSuffix] + '</li>' +
								'							<li><b>Grant Source Code:</b> ' + accountSet["Hire-Grant-Source-Code" + accountSetPropertyNameSuffix] + '</li>' +
								'							<li><b>Percent Salary from this Account:</b> ' + accountSet["Hire-Percent-Salary-from-this-Account" + accountSetPropertyNameSuffix] + '</li>' +
								'						</ol></li>';
						}

					});
					printContent += '					</ol></li>';
				}
				printContent += '</ul>';
			}




			// --- STATUS CHANGE


			if (formData["Action"] == "Status Change") {

				var staffUserID = StrInStr(formData["Status-Change-Staff-Member"][0]["description"], '@mos.org', 1);

				console.log('staffUserID');
				console.log(staffUserID);

				$.ajax({
					async: false,
					method: "GET",
					dataType: "json",
					url: 'https://neso.mos.org/activeDirectory/user/' + staffUserID,
				})
					.done(function (returnedUserData) {
						statusChangeEmployeeData = returnedUserData.docs;

						printContent += '<h2>Staff Member</h2>' +
							'<ul style="margin: 0;">' +
							'				<li><b>Name:</b> ' + statusChangeEmployeeData.displayName + '</li>' +
							'				<li><b>ID:</b> ' + statusChangeEmployeeData.employeeID + '</li>' +
							'				<li><b>Department:</b> ' + statusChangeEmployeeData.department + '</li>' +
							'				<li><b>Division:</b> ' + statusChangeEmployeeData.division + '</li>' +
							'				<li><b>Title:</b> ' + statusChangeEmployeeData.title + '</li>' +
							'			</ul>';



						// --- POSITION CHANGE


						if (typeof (formData["status-change_position-change"]) !== "undefined") {

							printContent += '<h2>Position Change</h2>' +
								'<table style="width: 100%;">' +
								'	<tr style="width: 100%;">';



							// 				'		<td style="width: 50%;>' +
							// 				'			<h3>From</h3>' + 
							// 				'			<ul style="margin: 0;">' + 
							// 				'				<li><b>Position Title:</b> ' + formData["Position-Change-Previous-Position-Title"] + '</li>' + 
							// 				'				<li><b>Department:</b> ' + formData["Position-Change-Previous-Department"] + '</li>' + 
							// 				'				<li><b>Manager / Supervisor:</b> ' + formData["Position-Change-Previous-Manager"][0]["displayText"] + '</li>' + 
							// 				'				<li><b>Grade:</b> ' + formData["Position-Change-Previous-Grade"] + '</li>' + 
							// 				'				<li><b>Scheduled Hours, Biweekly:</b> ' + formData["Position-Change-Previous-Scheduled-Hours-Biweekly"] + '</li>' + 
							// 				'				<li><b>Scheduled Hours, Annually:</b> ' + formData["Position-Change-Previous-Scheduled-Hours-Annually"] + '</li>' + 
							// 				'				<li><b>Employee Classification:</b> ' + formData["Position-Change-Previous-Employee-Classification"] + '</li>' + 
							// 				'				<li><b>Start Date:</b> ' + formData["Position-Change-Previous-Start-Date"] + '</li>';

							// if (formData["Position-Change-Previous-Employee-Classification"] != "Regular FT" && formData["Position-Change-Previous-Employee-Classification"] != "Regular PT") {
							// 	printContent += '				<li><b>End Date:</b> ' + formData["Position-Change-Previous-End-Date"] + '</li>';
							// }

							// printContent += '			</ul>' + 
							// 				'		</td>' + 



							printContent += '		<td style="width: 50%;>' +
								'			<ul style="margin: 0;">' +
								'				<li><b>Position Title:</b> ' + formData["Position-Change-Position-Title"] + '</li>' +
								'				<li><b>Department:</b> ' + formData["Position-Change-Department"] + '</li>' +
								'				<li><b>Manager / Supervisor:</b> ' + formData["Position-Change-Manager"][0]["displayText"] + '</li>' +
								'				<li><b>Grade:</b> ' + formData["Position-Change-Grade"] + '</li>' +
								'				<li><b>Scheduled Hours, Biweekly:</b> ' + formData["Position-Change-Scheduled-Hours-Biweekly"] + '</li>' +
								'				<li><b>Scheduled Hours, Annually:</b> ' + formData["Position-Change-Scheduled-Hours-Annually"] + '</li>' +
								'				<li><b>Employee Classification:</b> ' + formData["Position-Change-Employee-Classification"] + '</li>' +
								'				<li><b>Anticipated Start Date:</b> ' + formData["Position-Change-Start-Date"] + '</li>';

							if (formData["Position-Change-Employee-Classification"] != "Regular FT" && formData["Position-Change-Employee-Classification"] != "Regular PT") {
								printContent += '				<li><b>Anticipated End Date:</b> ' + formData["Position-Change-End-Date"] + '</li>';
							}

							printContent += '			</ul>' +
								'		</td>' +
								'	</tr>' +
								'</table>';
						}






						// --- TERMINATION


						if (typeof (formData["status-change_title-change"]) !== "undefined") {
							printContent += '<h2>Title Change</h2>' +
								'<ul style="margin: 0;">' +
								'	<li><b>Current Position Title:</b> ' + formData["Title-Change-Current-Position-Title"] + '</li>' +
								'	<li><b>New Position Title:</b> ' + formData["Title-Change-New-Position-Title"] + '</li>';
						}





						// --- ADDITIONAL POSITION


						if (typeof (formData["status-change_additional-position"]) !== "undefined") {
							printContent += '<h2>Additional Position</h2>' +
								'<ul style="margin: 0;">' +
								'	<li><b>Position Title:</b> ' + formData["Additional-Position-Position-Title"] + '</li>' +
								'	<li><b>Department:</b> ' + formData["Additional-Position-Department"] + '</li>' +
								'	<li><b>Grade:</b> ' + formData["Additional-Position-Grade"] + '</li>' +
								'	<li><b>Scheduled Hours, Biweekly:</b> ' + formData["Additional-Position-Scheduled-Hours-Biweekly"] + '</li>' +
								'	<li><b>Scheduled Hours, Annually:</b> ' + formData["Additional-Position-Scheduled-Hours-Annually"] + '</li>' +
								'	<li><b>Proposed Hourly Wage:</b> ' + formData["Additional-Position-Proposed-Hourly-Wage"] + '</li>' +
								'	<li><b>Proposed Annualized Salary:</b> ' + formData["Additional-Position-Proposed-Annualized-Salary"] + '</li>' +
								'	<li><b>Employee Classification:</b> ' + formData["Additional-Position-Employee-Classification"] + '</li>' +
								'	<li><b>Start Date:</b> ' + formData["Additional-Position-Start-Date"] + '</li>';

							if (formData["Additional-Position-Employee-Classification"] != "Regular FT" && formData["Additional-Position-Employee-Classification"] != "Regular PT") {
								printContent += '	<li><b>End Date:</b> ' + formData["Additional-Position-End-Date"] + '</li>';
							}
							printContent += '	<li><b>Funding Source:</b> ' + formData["Additional-Position-Funding-Source"] + '</li>';

							if (formData["Additional-Position-Funding-Source"] == "Grant Funds" || formData["Additional-Position-Funding-Source"] == "Endowment Funds") {
								printContent += '	<li><b>Accounts:</b> <ol>';
								var accountSetIdentifier = 'Additional-Position-account-numbers-set';
								$.each(formData["RepeatedElements"], function (i, accountSet) {
									if (StrInStr(accountSet.ID, accountSetIdentifier)) {
										accountSetPropertyNameSuffix = StrInStr(accountSet.ID, accountSetIdentifier, 3);
										printContent += '						<li>Account<ol>' +
											'							<li><b>Grant Object Code:</b> ' + accountSet["Additional-Position-Grant-Object-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Grant Source Code:</b> ' + accountSet["Additional-Position-Grant-Source-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Percent Salary from this Account:</b> ' + accountSet["Additional-Position-Percent-Salary-from-this-Account" + accountSetPropertyNameSuffix] + '</li>' +
											'						</ol></li>';
									}

								});
								printContent += '					</ol></li>';
							}
						}



						// --- WAGE CHANGE


						if (typeof (formData["status-change_wage-change"]) !== "undefined") {
							printContent += '<h2>Wage Change</h2>' +
								'<ul style="margin: 0;">' +
								'	<li><b>Anticipated Start Date:</b> ' + formData["Wage-Change-Effective-Beginning-Date"] + '</li>' +
								'	<li><b>Department:</b> ' + formData["Wage-Change-Department"] + '</li>' +
								'	<li><b>Scheduled Hours, Biweekly:</b> ' + formData["Wage-Change-Scheduled-Hours-Biweekly"] + '</li>' +
								'	<li><b>Scheduled Hours, Annually:</b> ' + formData["Wage-Change-Scheduled-Hours-Annually"] + '</li>' +
								// '	<li><b>Previous Hourly Wage:</b> ' + formData["Wage-Change-Previous-Hourly-Wage"] + '</li>' + 
								'	<li><b>Hourly Wage:</b> ' + formData["Wage-Change-Hourly-Wage"] + '</li>' +
								'	<li><b>Annualized Salary:</b> ' + formData["Wage-Change-Annualized-Salary"] + '</li>';

							if (formData["Wage-Change-Reason"] == "Adjustment") {
								printContent += '	<li><b>Reason:</b> ' + formData["Wage-Change-Reason-Explanation"] + '</li>';
							} else {
								printContent += '	<li><b>Reason:</b> ' + formData["Wage-Change-Reason"] + '</li>';
							}
							printContent += '	<li><b>Funding Source:</b> ' + formData["Wage-Change-Funding-Source"] + '</li>';

							if (formData["Wage-Change-Funding-Source"] == "Grant Funds" || formData["Wage-Change-Funding-Source"] == "Endowment Funds") {
								printContent += '	<li><b>Account(s):</b> <ol>';
								var accountSetIdentifier = 'Wage-Change-account-numbers-set';
								$.each(formData["RepeatedElements"], function (i, accountSet) {
									if (StrInStr(accountSet.ID, accountSetIdentifier)) {
										accountSetPropertyNameSuffix = StrInStr(accountSet.ID, accountSetIdentifier, 3);
										printContent += '						<li>Account<ol>' +
											'							<li><b>Grant Object Code:</b> ' + accountSet["Wage-Change-Grant-Object-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Grant Source Code:</b> ' + accountSet["Wage-Change-Grant-Source-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Percent Salary from this Account:</b> ' + accountSet["Wage-Change-Percent-Salary-from-this-Account" + accountSetPropertyNameSuffix] + '</li>' +
											'						</ol></li>';
									}

								});
								printContent += '					</ol></li>';
							}
						}




						// --- SCHEDULE CHANGE


						if (typeof (formData["status-change_schedule-change"]) !== "undefined") {
							printContent += '<h2>Schedule Change</h2>' +
								'<ul style="margin: 0;">' +
								'	<li><b>Position Title:</b> ' + formData["Schedule-Change-Position-Title"] + '</li>' +
								'	<li><b>Anticipated Start Date:</b> ' + formData["Schedule-Change-Effective-Beginning-Date"] + '</li>';
							if (typeof (formData["Schedule-Change-Effective-End-Date"]) !== "undefined") {
								printContent += '	<li><b>Anticipated End Date:</b> ' + formData["Schedule-Change-Effective-End-Date"] + '</li>';
							}
							printContent += '	<li><b>Department:</b> ' + formData["Schedule-Change-Department"] + '</li>' +
								// '	<li><b>Previous Scheduled Hours, Biweekly:</b> ' + formData["Schedule-Change-Previous-Scheduled-Hours-Biweekly"] + '</li>' + 
								'	<li><b>Scheduled Hours, Biweekly:</b> ' + formData["Schedule-Change-Scheduled-Hours-Biweekly"] + '</li>' +
								'	<li><b>Reason:</b> ' + formData["Schedule-Change-Reason"] + '</li>' +
								'	<li><b>Funding Source:</b> ' + formData["Schedule-Change-Funding-Source"] + '</li>';


							if (formData["Schedule-Change-Funding-Source"] == "Grant Funds" || formData["Schedule-Change-Funding-Source"] == "Endowment Funds") {
								printContent += '	<li><b>Account(s):</b> <ol>';
								var accountSetIdentifier = 'Schedule-Change-account-numbers-set';
								$.each(formData["RepeatedElements"], function (i, accountSet) {
									if (StrInStr(accountSet.ID, accountSetIdentifier)) {
										accountSetPropertyNameSuffix = StrInStr(accountSet.ID, accountSetIdentifier, 3);
										printContent += '						<li>Account<ol>' +
											'							<li><b>Grant Object Code:</b> ' + accountSet["Schedule-Change-Grant-Object-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Grant Source Code:</b> ' + accountSet["Schedule-Change-Grant-Source-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Percent Salary from this Account:</b> ' + accountSet["Schedule-Change-Percent-Salary-from-this-Account" + accountSetPropertyNameSuffix] + '</li>' +
											'						</ol></li>';
									}

								});
								printContent += '					</ol></li>';
							}
							printContent += '</ul>';
						}



						// --- TEMPORARY EXTENSION


						if (typeof (formData["status-change_temporary-extension"]) !== "undefined") {
							printContent += '<h2>Temporary Extension</h2>' +
								'<ul style="margin: 0;">' +
								'	<li><b>Position Title:</b> ' + formData["Temporary-Extension-Position-Title"] + '</li>' +
								'	<li><b>Anticipated Start Date:</b> ' + formData["Temporary-Extension-Effective-Beginning-Date"] + '</li>' +
								'	<li><b>Anticipated End Date:</b> ' + formData["Temporary-Extension-Effective-Ending-Date"] + '</li>' +
								'	<li><b>Reason:</b> ' + formData["Temporary-Extension-Reason"] + '</li>' +
								'	<li><b>Funding Source:</b> ' + formData["Temporary-Extension-Funding-Source"] + '</li>';

							if (formData["Temporary-Extension-Funding-Source"] == "Grant Funds" || formData["Temporary-Extension-Funding-Source"] == "Endowment Funds") {
								printContent += '	<li><b>Accounts:</b> <ol>';
								var accountSetIdentifier = 'Temporary-Extension-account-numbers-set';
								$.each(formData["RepeatedElements"], function (i, accountSet) {
									if (StrInStr(accountSet.ID, accountSetIdentifier)) {
										accountSetPropertyNameSuffix = StrInStr(accountSet.ID, accountSetIdentifier, 3);
										printContent += '						<li>Account<ol>' +
											'							<li><b>Grant Object Code:</b> ' + accountSet["Temporary-Extension-Grant-Object-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Grant Source Code:</b> ' + accountSet["Temporary-Extension-Grant-Source-Code" + accountSetPropertyNameSuffix] + '</li>' +
											'							<li><b>Percent Salary from this Account:</b> ' + accountSet["Temporary-Extension-Percent-Salary-from-this-Account" + accountSetPropertyNameSuffix] + '</li>' +
											'						</ol></li>';
									}

								});
								printContent += '					</ol></li>';
							}

						}



						// --- TERMINATION


						if (typeof (formData["status-change_termination"]) !== "undefined") {
							printContent += '<h2>Termination</h2>' +
								'<ul style="margin: 0;">' +
								'	<li><b>Terminated Position:</b> ' + formData["Job-Being-Terminated"] + '</li>' +
								'	<li><b>Termination Date:</b> ' + formData["Termination-Date"] + '</li>' +
								'	<li><b>Last Date Worked:</b> ' + formData["Last-Date-Worked"] + '</li>';

							if (formData["Termination-Reason"] == "Voluntary") {
								printContent += '	<li><b>Reason:</b> Voluntary</li>' +
									'	<li><b>Reason Explanation:</b> ' + formData["Voluntary-Termination-Reason-Explanation"] + '</li>';
							}

							if (formData["Termination-Reason"] == "Involuntary") {
								printContent += '	<li><b>Reason:</b> Involuntary</li>' +
									'	<li><b>Reason Explanation:</b> ' + formData["Involuntary-Termination-Reason-Explanation"] + '</li>';
							}

							// if (formData["Termination-Reason"] == "Other") {
							// 	printContent += '	<li><b>Reason:</b> Other</li>' + 
							// 					'	<li><b>Reason Explanation:</b> ' + formData["Other-Termination-Reason-Explanation"] + '</li>';
							// }
						}



















						printContent += '<h2>Approvals</h2>' +
							'<table style="width: 100%;">' +
							'	<tr style="width: 100%;">' +
							'		<td style="width: 20%; height: 40px; text-align: right">Manager/Director</td>' +
							'		<td style="width: 50%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
							'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
							'	</tr>' +
							'	<tr style="width: 100%;">' +
							'		<td style="width: 20%; height: 40px; text-align: right">Vice President</td>' +
							'		<td style="width: 50%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
							'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
							'	</tr>' +
							'	<tr style="width: 100%;">' +
							'		<td style="width: 20%; height: 40px; text-align: right">Human Resources</td>' +
							'		<td style="width: 50%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 10%; height: 40px; text-align: right">Date</td>' +
							'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
							'	</tr>' +
							'<table>' +
							'<h2>Human Resources\' Use Only</h2>' +
							'<table style="width: 100%;">' +
							'	<tr style="width: 100%;">' +
							'		<td style="width: 4%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 8%; height: 40px;">' +
							'			Exempt' +
							'		</td>' +
							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 4%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 8%; height: 40px;">' +
							'			Non-exempt' +
							'		</td>' +
							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 8%; height: 40px; text-align: right;">' +
							'			EAR #:' +
							'		</td>' +
							'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 13%; height: 40px; text-align: right;">' +
							'			Worker\'s Comp #:' +
							'		</td>' +
							'		<td style="width: 16%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 4%; height: 40px;"></td>' +
							'	</tr>' +
							'</table>' +
							'<table style="width: 100%;">' +
							'	<tr style="width: 100%;">' +
							'		<td style="width: 8%; height: 40px;">' +
							'			Benefits:' +
							'		</td>' +
							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 4%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 6%; height: 40px;">' +
							'			FT (E)' +
							'		</td>' +
							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 4%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 6%; height: 40px;">' +
							'			PT (P)' +
							'		</td>' +
							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 4%; height: 40px; border-bottom: 2px solid black"></td>' +
							'		<td style="width: 15%; height: 40px;">' +
							'			403(b) Only (I)' +
							'		</td>' +
							'		<td style="width: 41%; height: 40px;"></td>' +
							'	</tr>' +
							'</table>' +
							'<table style="width: 100%;">' +
							'	<tr style="width: 100%;">' +


							'		<td style="width: 8%; height: 40px; text-align: right;">' +
							'			SSN:' +
							'		</td>' +
							'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black">' +
							'		</td>' +


							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 8%; height: 40px; text-align: right;">' +
							'			DOB:' +
							'		</td>' +
							'		<td style="width: 20%; height: 40px; border-bottom: 2px solid black">' +
							'		</td>' +


							'		<td style="width: 4%; height: 40px;"></td>' +
							'		<td style="width: 15%; height: 40px; text-align: right;">' +
							'			Remaining vacation Hrs:' +
							'		</td>' +
							'		<td style="width: 21%; height: 40px; border-bottom: 2px solid black">' +
							'		</td>' +


							'	</tr>' +
							'<table>';

					});
			}

			printContent = ReturnPrintableContentWithStandardWrapper(printContent, "hr-personnel-action");

			// send print content to printer
			PrintToPrinter(printContent);

			// if user-entered data is NOT valid
		} else {
			// display invalid data overlay
			$('div#overlays-screen-container').fadeIn(200);
			$("#mos-form-data-errors").fadeIn(400);
		}
	}



	function PrintNeedsSheet() {

		moment.locale('en');
		moment.suppressDeprecationWarnings = true;

		// get raw data
		var sheetData = rData.formData;
		// console.log(JSON.stringify(sheetData));
		var onsiteContactUserProfileValues = {};
		$().SPServices({
			operation: "GetUserProfileByName",
			async: false,
			AccountName: sheetData["Onsite-Contact"][0]["account"],
			completefunc: function (xData, Status) {
				$(xData.responseXML).SPFilterNode("PropertyData").each(function () {
					onsiteContactUserProfileValues[$(this).find("Name").text()] = $(this).find("Value").text();
				});
			}
		});

		// process some of the data

		sheetData["Printer-Buyout-Venues"] = [];

		if (typeof (sheetData["buyout-venues_other"]) !== "undefined") {
			if (typeof (sheetData["Other-Buyout-Venue"]) !== "undefined" && sheetData["Other-Buyout-Venue"] != "") {
				sheetData["Printer-Buyout-Venues"].push(sheetData["Other-Buyout-Venue"]);
			} else {
				sheetData["Printer-Buyout-Venues"].push("Other, not specified");
			}
		}

		if (typeof (sheetData["buyout-venues_omni"]) !== "undefined") {
			sheetData["Printer-Buyout-Venues"].push("Omni");
		}

		if (typeof (sheetData["buyout-venues_planetarium"]) !== "undefined") {
			sheetData["Printer-Buyout-Venues"].push("Planetarium");
		}

		if (typeof (sheetData["buyout-venues_4dtheater"]) !== "undefined") {
			sheetData["Printer-Buyout-Venues"].push("4-D Theater");
		}

		if (typeof (sheetData["buyout-venues_nichols"]) !== "undefined") {
			sheetData["Printer-Buyout-Venues"].push("Nichols");
		}

		if (typeof (sheetData["buyout-venues_stearns"]) !== "undefined") {
			sheetData["Printer-Buyout-Venues"].push("Stearns");
		}

		sheetData["Printer-Event-Spaces"] = [];

		if (typeof (sheetData["event-space_skyline-or-darbeloff"]) !== "undefined") {
			if (typeof (sheetData["Skyline-or-dArbeloff"]) !== "undefined" && sheetData["Skyline-or-dArbeloff"] != "") {
				sheetData["Printer-Event-Spaces"].push(sheetData["Skyline-or-dArbeloff"]);
			} else {
				sheetData["Printer-Event-Spaces"].push("Skyline or d'Arbeloff");
			}
		}

		if (typeof (sheetData["event-space_other"]) !== "undefined") {
			if (typeof (sheetData["Other-Event-Space"]) !== "undefined" && sheetData["Other-Event-Space"] != "") {
				sheetData["Printer-Event-Spaces"].push(sheetData["Other-Event-Space"]);
			} else {
				sheetData["Printer-Event-Spaces"].push("Not yet specified");
			}
		}

		if (typeof (sheetData["event-space_atrium"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Atrium");
		}

		if (typeof (sheetData["event-space_blue-wing"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Blue Wing");
		}

		if (typeof (sheetData["event-space_green-wing"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Green Wing");
		}

		if (typeof (sheetData["event-space_museum-cafe"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Museum Café");
		}

		if (typeof (sheetData["event-space_nichols"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Nichols");
		}

		if (typeof (sheetData["event-space_hhl"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Hall of Human Life");
		}

		if (typeof (sheetData["event-space_omni-and-planetarium-foyer"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Omni and Planetarium Foyer");
		}

		if (typeof (sheetData["event-space_omni-and-planetarium-foyer-and-atrium"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Omni and Planetarium Foyer and Atrium");
		}

		if (typeof (sheetData["event-space_6th-floor"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("6th floor");
		}

		if (typeof (sheetData["event-space_hodgkinson"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Hodgkinson");
		}

		if (typeof (sheetData["event-space_hornblower"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Hornblower");
		}

		if (typeof (sheetData["event-space_lower-morse"]) !== "undefined") {
			sheetData["Printer-Event-Spaces"].push("Lower Morse");
		}




		if (typeof (sheetData["tables-and-equipment-and-cleaning_rentalequipment"]) != "undefined") {
			if (typeof (sheetData["rental-equipment-setup_vendor"]) != "undefined") {
				sheetData["Printer-Rental-Equipment-Setup"] = "Vendor";
			} else {
				sheetData["Printer-Rental-Equipment-Setup"] = "C&W";
			}
			if (typeof (sheetData["rental-equipment-pickup-location_door16ramp"]) != "undefined") {
				sheetData["Rental-Equipment-Pickup-Location"] = "Door #16 Ramp";
			} else if (typeof (sheetData["rental-equipment-pickup-location_receiving"]) != "undefined") {
				sheetData["Rental-Equipment-Pickup-Location"] = "Receiving";
			} else {
				sheetData["Rental-Equipment-Pickup-Location"] = "Event Space";
			}



			if (typeof (sheetData["rental-equipment-porter-service_beforesetup"]) != "undefined" && typeof (sheetData["rental-equipment-porter-service_aftersetup"]) != "undefined") {
				sheetData["Rental-Equipment-Porter-Service"] = "Porter service needed for both setup and pickup";
			}
			if (typeof (sheetData["rental-equipment-porter-service_beforesetup"]) != "undefined" && typeof (sheetData["rental-equipment-porter-service_aftersetup"]) == "undefined") {
				sheetData["Rental-Equipment-Porter-Service"] = "Porter service needed for setup only";
			}
			if (typeof (sheetData["rental-equipment-porter-service_beforesetup"]) == "undefined" && typeof (sheetData["rental-equipment-porter-service_aftersetup"]) != "undefined") {
				sheetData["Rental-Equipment-Porter-Service"] = "Porter service needed for pickup only";
			}
			if (typeof (sheetData["rental-equipment-porter-service_beforesetup"]) == "undefined" && typeof (sheetData["rental-equipment-porter-service_aftersetup"]) == "undefined") {
				sheetData["Rental-Equipment-Porter-Service"] = "Porter service not needed";
			}
		}

		sheetData["Printer-Onsite-Contact-Name"] = onsiteContactUserProfileValues["PreferredName"];
		sheetData["Printer-Onsite-Contact-Department"] = onsiteContactUserProfileValues["Department"];
		sheetData["Printer-Onsite-Contact-Phone"] = onsiteContactUserProfileValues["WorkPhone"];
		sheetData["Printer-Event-Beginning-Time"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Event-Beginning-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Event-Ending-Time"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Event-Ending-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Space-Reserved-Beginning-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Space-Reserved-Beginning-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Space-Reserved-Ending-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Space-Reserved-Ending-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Registration-Table-Beginning-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Registration-Table-Beginning-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Registration-Table-Ending-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Registration-Table-Ending-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Guest-Access-Beginning-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Guest-Access-Beginning-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Guest-Access-Ending-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Guest-Access-Ending-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Security-Detail-Beginning-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Security-Detail-Beginning-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Security-Detail-Ending-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Security-Detail-Ending-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Temperature-Control-Beginning-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Temperature-Control-Beginning-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");
		sheetData["Printer-Temperature-Control-Ending-Datetime"] = $().ReturnFormattedDateTime(sheetData["datetime-storage_Temperature-Control-Ending-Datetime"], "YYYY-MM-DDTHH:mm:ss", "h:mm a");

		// build the sheet to be printed
		var printContent = '<h1>In-House Needs Sheet</h1>';

		if (sheetData["Printer-Event-Spaces"].length > 1) {
			var eventSpacesUseList = 1;
			var eventSpacesOpeningTag = '<li>';
			var eventSpacesClosingTag = '</li>';
		} else {
			var eventSpacesUseList = 0;
			var eventSpacesOpeningTag = '';
			var eventSpacesClosingTag = '';
		}

		// event basics
		printContent += '<h2>Event Basics</h2>' +
			'<table class="layout-table" style="margin: 0 0 20px;">' +
			'	<tbody><tr><td><ul style="margin: 0;">' +
			'		<li><b>Event Date:</b> ' + sheetData["date-input_Event-Beginning-Datetime"] + '</li>' +
			'		<li><b>Event Times:</b> ' + sheetData["Printer-Event-Beginning-Time"] + ' - ' + sheetData["Printer-Event-Ending-Time"] + '</li>' +
			'		<li><b>Event Name:</b> ' + sheetData["Event-Name"] + '</li>' +
			'		<li><b>Total Attendance:</b> ' + sheetData["Total-Attendance"] + '</li>' +
			'		<li><b>Non-staff Attendance:</b> ' + sheetData["Total-Non-Staff-Attendance"] + '</li>' +
			'		<li><b>Event Space:</b> ';

		if (eventSpacesUseList == 1) {
			printContent += '<ul style="margin: 0;">';
		}

		$.each(sheetData["Printer-Event-Spaces"], function (i, eventSpace) {
			printContent += eventSpacesOpeningTag + eventSpace + eventSpacesClosingTag;
		});

		if (eventSpacesUseList == 1) {
			printContent += '</ul>';
		}

		printContent += '</li>' +
			'		<li><b>Space Reservation Times:</b> ' + sheetData["Printer-Space-Reserved-Beginning-Datetime"] + ' - ' + sheetData["Printer-Space-Reserved-Ending-Datetime"] + '</li>' +
			'	</ul></td>' +
			'	<td><ul style="margin: 0;"><li><b>Onsite Contact:</b><ul>' +
			'		<li><b>Name:</b> ' + sheetData["Printer-Onsite-Contact-Name"] + '</li>' +
			'		<li><b>Department:</b> ' + sheetData["Printer-Onsite-Contact-Department"] + '</li>' +
			'		<li><b>Phone:</b> ' + sheetData["Printer-Onsite-Contact-Phone"] + '</li>' +
			'	</ul></li></ul></td></tr></tbody>' +
			'<table>';

		// event schedule
		if (typeof (sheetData["Schedule"]) != "undefined") {
			printContent += '<h2>Event Schedule</h2>';
			printContent += ReplaceAll("%0A", "<br />", sheetData["Schedule"]);
		}

		// services needed
		printContent += '<h2>Services Needed</h2>' +
			'<table class="layout-table" style="margin: 0 0 20px;">' +
			'	<tbody>' +
			'		<tr>' +
			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>C&W</h3>';

		var tablesEquipmentCleaningHasContent = 0;
		if (typeof (sheetData["tables-and-equipment-and-cleaning_registrationtable"]) != "undefined" ||
			typeof (sheetData["tables-and-equipment-and-cleaning_rentalequipment"]) != "undefined" ||
			typeof (sheetData["tables-and-equipment-and-cleaning_more"]) != "undefined") {
			tablesEquipmentCleaningHasContent = 1;
		}

		if ((typeof (sheetData["tables-and-equipment-and-cleaning_registrationtable"]) != "undefined" && typeof (sheetData["tables-and-equipment-and-cleaning_rentalequipment"]) != "undefined") ||
			(typeof (sheetData["tables-and-equipment-and-cleaning_rentalequipment"]) != "undefined" && typeof (sheetData["tables-and-equipment-and-cleaning_more"]) != "undefined") ||
			(typeof (sheetData["tables-and-equipment-and-cleaning_registrationtable"]) != "undefined" && typeof (sheetData["tables-and-equipment-and-cleaning_more"]) != "undefined")) {
			var tablesEquipmentCleaningUseList = 1;
			var tablesEquipmentCleaningOpeningTag = '<li>';
			var tablesEquipmentCleaningClosingTag = '</li>';
		} else {
			var tablesEquipmentCleaningUseList = 0;
			var tablesEquipmentCleaningOpeningTag = '<p>';
			var tablesEquipmentCleaningClosingTag = '</p>';
		}

		if (tablesEquipmentCleaningHasContent == 1) {
			if (tablesEquipmentCleaningUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			if (typeof (sheetData["tables-and-equipment-and-cleaning_registrationtable"]) != "undefined") {
				printContent += tablesEquipmentCleaningOpeningTag + '<b>Registration Table:</b><ul style="margin: 0;">' +
					'	<li><b>Setup Completed By: </b>' + sheetData["Printer-Registration-Table-Beginning-Datetime"] + '</li>' +
					'	<li><b>Breakdown Starting: </b>' + sheetData["Printer-Registration-Table-Ending-Datetime"] + '</li>' +
					'</ul>' + tablesEquipmentCleaningClosingTag;
			}

			if (typeof (sheetData["tables-and-equipment-and-cleaning_rentalequipment"]) != "undefined") {
				printContent += tablesEquipmentCleaningOpeningTag + '<b>Rental Equipment:</b><ul style="margin: 0;">' +
					'	<li><b>Setup: </b>' + sheetData["Printer-Rental-Equipment-Setup"] + '</li>' +
					'	<li><b>Pickup Location: </b>' + sheetData["Rental-Equipment-Pickup-Location"] + '</li>' +
					'	<li><b>Porter Service: </b>' + sheetData["Rental-Equipment-Porter-Service"] + '</li>' +
					'</ul>' + tablesEquipmentCleaningClosingTag;
			}

			if (typeof (sheetData["tables-and-equipment-and-cleaning_more"]) != "undefined") {
				printContent += tablesEquipmentCleaningOpeningTag + '<b>Notes: </b><br />' + ReplaceAll("%0A", "<br />", sheetData["More-Tables-and-Equipment-and-Cleaning"]) + tablesEquipmentCleaningClosingTag;
			}


			if (tablesEquipmentCleaningUseList == 1) {
				printContent += '</ul>';
			}
		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>' +
			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>Exhibit Maintenance</h3>';









		var exhibitMaintenanceHasContent = 0;
		if (typeof (sheetData["exhibit-maintenance_scatterbenches"]) != "undefined" ||
			typeof (sheetData["exhibit-maintenance_other"]) != "undefined") {
			exhibitMaintenanceHasContent = 1;
		}

		if (typeof (sheetData["exhibit-maintenance_scatterbenches"]) != "undefined" && typeof (sheetData["exhibit-maintenance_other"]) != "undefined") {
			var exhibitMaintenanceUseList = 1;
			var exhibitMaintenanceOpeningTag = '<li>';
			var exhibitMaintenanceClosingTag = '</li>';
		} else {
			var exhibitMaintenanceUseList = 0;
			var exhibitMaintenanceOpeningTag = '<p>';
			var exhibitMaintenanceClosingTag = '</p>';
		}

		if (exhibitMaintenanceHasContent == 1) {
			if (exhibitMaintenanceUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			if (typeof (sheetData["exhibit-maintenance_scatterbenches"]) != "undefined") {
				printContent += exhibitMaintenanceOpeningTag + '<b>Scatter CS&T benches in the Blue Wing level 1</b>' + exhibitMaintenanceClosingTag;
			}

			if (typeof (sheetData["exhibit-maintenance_other"]) != "undefined") {
				printContent += exhibitMaintenanceOpeningTag + '<b>Notes: </b><br />' + ReplaceAll("%0A", "<br />", sheetData["Other-Exhibit-Maintenance-Service"]) + exhibitMaintenanceClosingTag;
			}


			if (exhibitMaintenanceUseList == 1) {
				printContent += '</ul>';
			}
		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>' +
			'		</tr>';

		printContent += '		<tr>' +
			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>WPC</h3>';
		var wpcHasContent = 0;
		if (typeof (sheetData["wolfgang-puck-catering_linens"]) != "undefined" ||
			typeof (sheetData["wolfgang-puck-catering_menu"]) != "undefined" ||
			typeof (sheetData["wolfgang-puck-catering_other"]) != "undefined") {
			wpcHasContent = 1;
		}

		var wpcUseList = 1;
		var wpcOpeningTag = '<li>';
		var wpcClosingTag = '</li>';

		if (wpcHasContent == 1) {
			if (wpcUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			if (typeof (sheetData["wolfgang-puck-catering_linens"]) != "undefined") {
				printContent += wpcOpeningTag + '<b>Linens</b>' + wpcClosingTag;
			}

			if (typeof (sheetData["wolfgang-puck-catering_menu"]) != "undefined") {
				printContent += wpcOpeningTag + '<b>Menu</b>' + wpcClosingTag;
			}

			if (typeof (sheetData["wolfgang-puck-catering_other"]) != "undefined") {
				printContent += wpcOpeningTag + '<b>Notes: </b><br />' + ReplaceAll("%0A", "<br />", sheetData["WPC-Other"]) + wpcClosingTag;
			}

			printContent += wpcOpeningTag + '<b>Account: </b>' + sheetData["WPC-Account-Number"] + wpcClosingTag;

			if (wpcUseList == 1) {
				printContent += '</ul>';
			}

		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>' +
			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>IIT AV</h3>';

		var iitAVHasContent = 0;
		if (typeof (sheetData["iit-av_yes"]) != "undefined") {
			iitAVHasContent = 1;
		}

		var iitAVUseList = 1;
		var iitAVOpeningTag = '<li>';
		var iitAVClosingTag = '</li>';

		if (iitAVHasContent == 1) {
			if (iitAVUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			printContent += iitAVOpeningTag + '<b>Assistance needed</b>' + iitAVClosingTag;

			printContent += iitAVOpeningTag + '<b>Account: </b>' + sheetData["AV-Account-Number"] + iitAVClosingTag;

			if (iitAVUseList == 1) {
				printContent += '</ul>';
			}
		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>' +
			'		</tr>';

		printContent += '		<tr>' +
			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>IIT Help Desk / Infrastracture</h3>';


		var iitInfraHasContent = 0;
		if (typeof (sheetData["iit-help-desk-and-infrastracture_yes"]) != "undefined") {
			iitInfraHasContent = 1;
		}

		var iitInfraUseList = 1;
		var iitInfraOpeningTag = '<li>';
		var iitInfraClosingTag = '</li>';

		if (iitInfraHasContent == 1) {
			if (iitInfraUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			printContent += iitInfraOpeningTag + '<b>Assistance needed</b>' + iitInfraClosingTag;

			printContent += iitInfraOpeningTag + '<b>Account: </b>' + sheetData["Help-Desk-or-Infrastracture-Account-Number"] + iitInfraClosingTag;

			if (iitInfraUseList == 1) {
				printContent += '</ul>';
			}
		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>' +
			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>Public Safety</h3>';

		var publicSafetyContentQuantity = 0;
		if (typeof (sheetData["parking-validation_under20"]) != "undefined") { publicSafetyContentQuantity++; }
		if (typeof (sheetData["parking-validation_20plus"]) != "undefined") { publicSafetyContentQuantity++; }
		if (typeof (sheetData["security-detail_yes"]) != "undefined") { publicSafetyContentQuantity++; }
		if (typeof (sheetData["guest-access_yes"]) != "undefined") { publicSafetyContentQuantity++; }
		if (typeof (sheetData["elevator-access_4andor5"]) != "undefined") { publicSafetyContentQuantity++; }
		if (typeof (sheetData["crowd-management_yes"]) != "undefined") { publicSafetyContentQuantity++; }

		if (publicSafetyContentQuantity > 0) {
			var publicSafetyHasContent = 1;
		} else {
			var publicSafetyHasContent = 0;
		}

		if (publicSafetyContentQuantity > 1) {
			var publicSafetyUseList = 1;
			var publicSafetyOpeningTag = '<li>';
			var publicSafetyClosingTag = '</li>';
		} else {
			var publicSafetyUseList = 0;
			var publicSafetyOpeningTag = '<p>';
			var publicSafetyClosingTag = '</p>';
		}

		if (publicSafetyHasContent == 1) {
			if (publicSafetyUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			if (typeof (sheetData["parking-validation_under20"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Parking: </b>Leaving validation at Info Desk' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["parking-validation_20plus"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Parking: </b>Requested free or $5 flat rate validator' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["security-detail_yes"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Security Detail:</b><ul style="margin: 0;">' +
					'	<li><b>Account: </b>' + sheetData["Security-Detail-Account-Number"] + '</li>' +
					'	<li><b>Location: </b>' + sheetData["Security-Detail-Location"] + '</li>' +
					'	<li><b>Starting: </b>' + sheetData["Printer-Security-Detail-Beginning-Datetime"] + '</li>' +
					'	<li><b>Ending: </b>' + sheetData["Printer-Security-Detail-Ending-Datetime"] + '</li>' +
					'</ul>' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["guest-access_yes"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Guest Access:</b><ul style="margin: 0;">' +
					'	<li><b>Location: </b>' + sheetData["Guest-Access-Location"] + '</li>' +
					'	<li><b>Starting: </b>' + sheetData["Printer-Guest-Access-Beginning-Datetime"] + '</li>' +
					'	<li><b>Ending: </b>' + sheetData["Printer-Guest-Access-Ending-Datetime"] + '</li>' +
					'</ul>' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["elevator-access_4andor5"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Key off elevator for 4th and 5th floor</b>' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["elevator-access_6ordarb"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Key off elevator for 6th floor and d\'Arb</b>' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["elevator-access_4andor5"]) != "undefined" && typeof (sheetData["elevator-access-security_hired"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>A security guard will be hired for 4th and 5th floor elevator access</b>' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["elevator-access_4andor5"]) != "undefined" && typeof (sheetData["elevator-access-security_internal"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Security for 4th and 5th floor elevator access will be handled internally</b>' + publicSafetyClosingTag;
			}

			if (typeof (sheetData["crowd-management_yes"]) != "undefined") {
				printContent += publicSafetyOpeningTag + '<b>Crowd Management: </b>' + sheetData["Number-of-Crowd-Managers"] + ' crowd manager(s) needed<ul>' +
					'</ul>' + publicSafetyClosingTag;
			}

			if (publicSafetyUseList == 1) {
				printContent += '</ul>';
			}

		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>' +
			'		</tr>';
		printContent += '		<tr>' +

			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>Facilities</h3>';

		var facilitiesContentQuantity = 0;
		if (typeof (sheetData["facilities_fiveminutedelay"]) != "undefined") { facilitiesContentQuantity++; }
		if (typeof (sheetData["facilities_tempcontrol"]) != "undefined") { facilitiesContentQuantity++; }
		if (typeof (sheetData["facilities_more"]) != "undefined") { facilitiesContentQuantity++; }

		if (facilitiesContentQuantity > 0) {
			var facilitiesHasContent = 1;
		} else {
			var facilitiesHasContent = 0;
		}

		if (facilitiesContentQuantity > 1) {
			var facilitiesUseList = 1;
			var facilitiesOpeningTag = '<li>';
			var facilitiesClosingTag = '</li>';
		} else {
			var facilitiesUseList = 0;
			var facilitiesOpeningTag = '<p>';
			var facilitiesClosingTag = '</p>';
		}

		if (facilitiesHasContent == 1) {
			if (facilitiesUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}


			if (typeof (sheetData["facilities_fiveminutedelay"]) != "undefined") {
				printContent += facilitiesOpeningTag + '<b>Five-minute delay</b>' + facilitiesClosingTag;
			}

			if (typeof (sheetData["facilities_tempcontrol"]) != "undefined") {
				printContent += facilitiesOpeningTag + '<b>Temperature Control: </b><ul style="margin: 0;">' +
					'	<li><b>Starting: </b>' + sheetData["Printer-Temperature-Control-Beginning-Datetime"] + '</li>' +
					'	<li><b>Ending: </b>' + sheetData["Printer-Temperature-Control-Ending-Datetime"] + '</li>' +
					'</ul>' + facilitiesClosingTag;
			}

			if (typeof (sheetData["facilities_more"]) != "undefined") {
				printContent += facilitiesOpeningTag + '<b>Notes: </b><br />' + ReplaceAll("%0A", "<br />", sheetData["More-Facilities"]) + facilitiesClosingTag;
			}


			if (facilitiesUseList == 1) {
				printContent += '</ul>';
			}

		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>' +
			'		</tr>';

		printContent += '		<tr>' +
			'			<td style="border: 2px solid black;padding: 1rem;">' +
			'				<h3>Buyouts</h3>';

		var buyoutsHasContent = 0;
		if (typeof (sheetData["buyouts_yes"]) != "undefined") {
			buyoutsHasContent = 1;
		}

		var buyoutsUseList = 1;
		var buyoutsOpeningTag = '<li>';
		var buyoutsClosingTag = '</li>';

		if (buyoutsHasContent == 1) {
			if (buyoutsUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}


			if (sheetData["Printer-Buyout-Venues"].length > 1) {
				var buyoutVenuesUseList = 1;
				var buyoutVenuesOpeningTag = '<li>';
				var buyoutVenuesClosingTag = '</li>';
			} else {
				var buyoutVenuesUseList = 0;
				var buyoutVenuesOpeningTag = '';
				var buyoutVenuesClosingTag = '';
			}
			printContent += buyoutsOpeningTag + '<b>Venue(s): </b>';

			if (buyoutVenuesUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			$.each(sheetData["Printer-Buyout-Venues"], function (i, buyoutVenue) {
				printContent += buyoutVenuesOpeningTag + buyoutVenue + buyoutVenuesClosingTag;
			});

			if (buyoutVenuesUseList == 1) {
				printContent += '</ul>';
			}

			printContent += buyoutsClosingTag;

			printContent += buyoutsOpeningTag + '<b>Scheduled: </b>';
			if (typeof (sheetData["buyout-scheduled-or-not_scheduled"]) != "undefined") {
				printContent += 'Yes';
			}
			if (typeof (sheetData["buyout-scheduled-or-not_unscheduled"]) != "undefined") {
				printContent += 'No';
			}
			printContent += buyoutsClosingTag;

			printContent += buyoutsOpeningTag + '<b>Title(s): </b>' + sheetData["Buyout-Titles"];
			printContent += buyoutsOpeningTag + '<b>Show Time(s): </b>' + sheetData["Buyout-Show-Time"];
			printContent += buyoutsOpeningTag + '<b>Order Number: </b>' + sheetData["Buyout-Order-Number"];
			printContent += buyoutsOpeningTag + '<b>Notes: </b>' + sheetData["Buyout-Notes"];


			if (buyoutsUseList == 1) {
				printContent += '</ul>';
			}
		} else {
			printContent += '<p>Nothing needed.</p>';
		}

		printContent += '			</td>';

		if (typeof (sheetData["Additional-Notes"]) != "undefined") {
			printContent += '			<td colspan="2" style="border: 2px solid black;padding: 1rem;">' +
				'				<h3>Additional Notes</h3>';
			printContent += ReplaceAll("%0A", "<br />", sheetData["Additional-Notes"]);
			printContent += '			</td>';
		}



		printContent += '		</tr>';

		printContent += '	</tbody>' +
			'<table>';

		printContent = ReturnPrintableContentWithStandardWrapper(printContent, "vxo-event-needs");
		PrintToPrinter(printContent);
	}



	$.fn.PrintGPCInitialConceptApprovalRequest = function () {

		moment.locale('en');
		moment.suppressDeprecationWarnings = true;

		// get raw data
		var sheetData = rData.formData;
		var printerRequestID = rData.requestID;
		var requesterData = $().ReturnUserDataUsingAccountName(sheetData["Requester-Account"]);
		var mosPIData = $().ReturnUserDataUsingAccountName(sheetData["MOS-Principal-Investigator"][0]["account"]);
		if (typeof (sheetData["MOS-Co-Investigator"][0]) != "undefined") {
			var mosCoPIExists = 1;
			var mosCoPIData = $().ReturnUserDataUsingAccountName(sheetData["MOS-Co-Investigator"][0]["account"]);
		} else {
			var mosCoPIExists = 0;
		}

		var mosPDData = $().ReturnUserDataUsingAccountName(sheetData["Proposal-Developer"][0]["account"]);

		// process some of the data
		var requesterIsUnique = 0;

		if (requesterData.userName !== mosPIData.userName &&
			requesterData.userName !== mosPDData.userName) {
			requesterIsUnique = 1;
		}

		if (requesterIsUnique === 0 && mosCoPIExists === 1) {
			if (requesterData.userName !== mosCoPIData.userName) {
				requesterIsUnique = 1;
			}
		}

		sheetData["Printer-MOS-PI-Name"] = mosPIData["name"];
		sheetData["Printer-MOS-PI-Department"] = mosPIData["dept"];
		sheetData["Printer-MOS-PI-Phone"] = mosPIData["phone"];
		sheetData["Printer-MOS-PI-Email"] = mosPIData["email"];

		if (mosCoPIExists === 1) {
			sheetData["Printer-MOS-Co-PI-Name"] = mosCoPIData["name"];
			sheetData["Printer-MOS-Co-PI-Department"] = mosCoPIData["dept"];
			sheetData["Printer-MOS-Co-PI-Phone"] = mosCoPIData["phone"];
			sheetData["Printer-MOS-Co-PI-Email"] = mosCoPIData["email"];
		}

		sheetData["Printer-MOS-PD-Name"] = mosPDData["name"];
		sheetData["Printer-MOS-PD-Department"] = mosPDData["dept"];
		sheetData["Printer-MOS-PD-Phone"] = mosPDData["phone"];
		sheetData["Printer-MOS-PD-Email"] = mosPDData["email"];

		if (requesterIsUnique === 1) {
			sheetData["Printer-Requester-Name"] = mosPIData["name"];
			sheetData["Printer-Requester-Department"] = mosPIData["dept"];
			sheetData["Printer-Requester-Phone"] = mosPIData["phone"];
			sheetData["Printer-Requester-Email"] = mosPIData["email"];
		}

		if (typeof (sheetData["MOS-Direct-Costs"]) != "undefined" ||
			typeof (sheetData["IDC"]) != "undefined" ||
			typeof (sheetData["Total-MOS-Budget"]) != "undefined" ||
			typeof (sheetData["Total-Project-Budget"]) != "undefined") {
			var printBudgetTable = 1;
		} else {
			var printBudgetTable = 0;
		}

		if (typeof (sheetData["museum-role_primerecipient"]) != "undefined") {
			sheetData["Printer-Museum-Role"] = "Prime Recipient";
		} else {
			sheetData["Printer-Museum-Role"] = "Subawardee";
		}

		if (typeof (sheetData["new-or-existing-program_new"]) != "undefined") {
			sheetData["Printer-New-Or-Existing"] = "New";
		} else {
			sheetData["Printer-New-Or-Existing"] = "Existing";
		}

		if (typeof (sheetData["cost-share-required_yes"]) != "undefined") {
			sheetData["Printer-Cost-Sharing-Required"] = "Yes";
		} else {
			sheetData["Printer-Cost-Sharing-Required"] = "No";
		}

		if (typeof (sheetData["subawards-or-not_yes"]) != "undefined") {
			sheetData["Printer-Subawards-or-Not"] = "Yes";
		} else {
			sheetData["Printer-Subawards-or-Not"] = "No";
		}

		var quantityOfStaffingNeeds = 0;
		var quantityOfSpaceNeeds = 0;
		var quantityOfOtherNeeds = 0;

		if (typeof (sheetData["staffing-needs_pi-direct-reports"]) != "undefined") {
			quantityOfStaffingNeeds++;
		}

		if (typeof (sheetData["staffing-needs_eep"]) != "undefined") {
			quantityOfStaffingNeeds++;
		}

		if (typeof (sheetData["staffing-needs_edc"]) != "undefined") {
			quantityOfStaffingNeeds++;
		}

		if (typeof (sheetData["staffing-needs_interactive-media"]) != "undefined") {
			quantityOfStaffingNeeds++;
		}

		if (typeof (sheetData["staffing-needs_infrastructure"]) != "undefined") {
			quantityOfStaffingNeeds++;
		}

		if (typeof (sheetData["staffing-needs_research-and-evaluation"]) != "undefined") {
			quantityOfStaffingNeeds++;
		}

		if (typeof (sheetData["staffing-needs_new-staff"]) != "undefined") {
			quantityOfStaffingNeeds++;
		}

		if (typeof (sheetData["space-needs_new-office-space"]) != "undefined") {
			quantityOfSpaceNeeds++;
		}

		if (typeof (sheetData["space-needs_exhibit-halls-space"]) != "undefined") {
			quantityOfSpaceNeeds++;
		}

		if (typeof (sheetData["other-needs_external-evaluator"]) != "undefined") {
			quantityOfOtherNeeds++;
		}

		sheetData["Printer-Proposal-Due-Date"] = $().ReturnFormattedDateTime(sheetData["Proposal-Due-Date"], "YYYY-MM-DDTHH:mm:ss", "MMMM D, YYYY");



		// build the sheet to be printed
		var printContent = '<h1>GPC Initial Concept Approval Request</h1>';

		printContent += '<p><b>Request ID: </b>' + printerRequestID + '</p>';

		printContent += '<h2>Project Basics</h2>' +
			'<table class="layout-table">' +
			'	<tbody><tr><td><ul style="margin: 0;">' +
			'		<li><b>Project Title: </b> ' + sheetData["Project-Title"] + '</li>' +
			'		<li><b>Funder: </b> ' + sheetData["Funder"] + '</li>';
		if (typeof (sheetData["RFP-or-Other-Relevant-Website"]) !== "undefined") {
			printContent += '		<li><b>RFP or Other Website: </b> ' + sheetData["RFP-or-Other-Relevant-Website"] + '</li>';
		}

		printContent += '		<li><b>Proposal Type: </b> ' + sheetData["Proposal-Type"] + '</li>' +
			'		<li><b>Proposal Due Date: </b> ' + sheetData["Printer-Proposal-Due-Date"] + '</li>' +
			'		<li><b>Museum Role: </b> ' + sheetData["Printer-Museum-Role"] + '</li>';

		if (typeof (sheetData["Prime-Institution"]) != "undefined") {
			printContent += '<li><b>Prime Institution: </b> ' + sheetData["Prime-Institution"] + '</li>';
		}

		if (typeof (sheetData["Outside-PI"]) != "undefined") {
			printContent += '<li><b>Outside PI: </b> ' + sheetData["Outside-PI"] + '</li>';
		}

		printContent += '	</ul></td>' +
			'	<td><ul style="margin: 0;">' +

			'	<li><b>MOS Principal Investigator:</b><ul style="margin-bottom: 0;">' +
			'		<li><b>Name:</b> ' + sheetData["Printer-MOS-PI-Name"] + '</li>' +
			'		<li><b>Department:</b> ' + sheetData["Printer-MOS-PI-Department"] + '</li>' +
			'		<li><b>Phone:</b> ' + sheetData["Printer-MOS-PI-Phone"] + '</li>' +
			'		<li><b>Email:</b> ' + sheetData["Printer-MOS-PI-Email"] + '</li>' +
			'	</ul></li>';

		if (mosCoPIExists === 1) {
			printContent += '	<li><b>MOS Co-Principal Investigator:</b><ul style="margin-bottom: 0;">' +
				'		<li><b>Name:</b> ' + sheetData["Printer-MOS-Co-PI-Name"] + '</li>' +
				'		<li><b>Department:</b> ' + sheetData["Printer-MOS-Co-PI-Department"] + '</li>' +
				'		<li><b>Phone:</b> ' + sheetData["Printer-MOS-Co-PI-Phone"] + '</li>' +
				'		<li><b>Email:</b> ' + sheetData["Printer-MOS-Co-PI-Email"] + '</li>' +
				'	</ul></li>';
		}

		printContent += '	<li><b>MOS Proposal Developer:</b><ul style="margin-bottom: 0;">' +
			'		<li><b>Name:</b> ' + sheetData["Printer-MOS-PD-Name"] + '</li>' +
			'		<li><b>Department:</b> ' + sheetData["Printer-MOS-PD-Department"] + '</li>' +
			'		<li><b>Phone:</b> ' + sheetData["Printer-MOS-PD-Phone"] + '</li>' +
			'		<li><b>Email:</b> ' + sheetData["Printer-MOS-PD-Email"] + '</li>' +
			'	</ul></li>';

		if (requesterIsUnique === 1) {
			printContent += '	<li><b>Requester:</b><ul style="margin-bottom: 0;">' +
				'		<li><b>Name:</b> ' + sheetData["Printer-Requester-Name"] + '</li>' +
				'		<li><b>Department:</b> ' + sheetData["Printer-Requester-Department"] + '</li>' +
				'		<li><b>Phone:</b> ' + sheetData["Printer-Requester-Phone"] + '</li>' +
				'		<li><b>Email:</b> ' + sheetData["Printer-Requester-Email"] + '</li>' +
				'	</ul></li>';
		}

		printContent += '	</ul></td></tr></tbody>' +
			'</table>';

		printContent += '<table class="layout-table">' +
			'	<tbody><tr><td><h2>Project Description</h2><ul style="margin: 0;">' +
			'		<li><b>Refer to File: </b> ' + sheetData["mos-drag-and-drop-file-name_Project-Description-File"] + '</li>' +
			'		<li><b>New or Existing Program: </b> ' + sheetData["Printer-New-Or-Existing"] + '</li>' +
			'	</ul><h2>Project Needs</h2>';

		if (quantityOfStaffingNeeds > 0) {
			printContent += '<h3>Staffing Needs</h3>';

			if (quantityOfStaffingNeeds > 1) {
				var staffingNeedsUseList = 1;
				var staffingNeedsOpeningTag = '<li>';
				var staffingNeedsClosingTag = '</li>';
			} else {
				var staffingNeedsUseList = 0;
				var staffingNeedsOpeningTag = '<p>';
				var staffingNeedsClosingTag = '</p>';
			}

			if (staffingNeedsUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			if (typeof (sheetData["staffing-needs_pi-direct-reports"]) != "undefined") {
				printContent += staffingNeedsOpeningTag + 'PI\'s Direct Reports' + staffingNeedsClosingTag;
			}

			if (typeof (sheetData["staffing-needs_eep"]) != "undefined") {
				printContent += staffingNeedsOpeningTag + 'Education & Enrichment Programs' + staffingNeedsClosingTag;
			}

			if (typeof (sheetData["staffing-needs_edc"]) != "undefined") {
				printContent += staffingNeedsOpeningTag + 'Exhibit Development & Conservation' + staffingNeedsClosingTag;
			}

			if (typeof (sheetData["staffing-needs_interactive-media"]) != "undefined") {
				printContent += staffingNeedsOpeningTag + 'Web & Interactive Media' + staffingNeedsClosingTag;
			}

			if (typeof (sheetData["staffing-needs_infrastructure"]) != "undefined") {
				printContent += staffingNeedsOpeningTag + 'IIT Infrastructure' + staffingNeedsClosingTag;
			}

			if (typeof (sheetData["staffing-needs_research-and-evaluation"]) != "undefined") {
				printContent += staffingNeedsOpeningTag + 'Research & Evaluation' + staffingNeedsClosingTag;
			}

			if (typeof (sheetData["staffing-needs_new-staff"]) != "undefined") {
				printContent += staffingNeedsOpeningTag + 'New Staff' + staffingNeedsClosingTag;
			}

			if (staffingNeedsUseList == 1) {
				printContent += '</ul>';
			}
		}

		if (quantityOfSpaceNeeds > 0) {
			printContent += '<h3>Space Needs</h3>';

			if (quantityOfSpaceNeeds > 1) {
				var spaceNeedsUseList = 1;
				var spaceNeedsOpeningTag = '<li>';
				var spaceNeedsClosingTag = '</li>';
			} else {
				var spaceNeedsUseList = 0;
				var spaceNeedsOpeningTag = '<p>';
				var spaceNeedsClosingTag = '</p>';
			}

			if (spaceNeedsUseList == 1) {
				printContent += '<ul style="margin: 0;">';
			}

			if (typeof (sheetData["space-needs_new-office-space"]) != "undefined") {
				printContent += spaceNeedsOpeningTag + 'New Office Space' + spaceNeedsClosingTag;
			}

			if (typeof (sheetData["space-needs_exhibit-halls-space"]) != "undefined") {
				printContent += spaceNeedsOpeningTag + 'Exhibit Halls Space' + spaceNeedsClosingTag;
			}

			if (spaceNeedsUseList == 1) {
				printContent += '</ul>';
			}
		}

		if (quantityOfOtherNeeds > 0) {
			printContent += '<h3>Other Needs</h3>' +
				'<p>' + sheetData["other-needs_external-evaluator"] + '</p>';
		}

		printContent += '	</td>' +
			'	<td id="budget-summary"><h2>Budget Summary</h2>';

		if (printBudgetTable == 1) {
			printContent += '	<table><tbody>';
			if (typeof (sheetData["MOS-Direct-Costs"]) != "undefined") {
				printContent += '		<tr><td class="label"><b>MOS Direct Costs</b></td> <td class="content">' + sheetData["MOS-Direct-Costs"] + '</td></tr>';
			}
			if (typeof (sheetData["IDC"]) != "undefined") {
				printContent += '		<tr><td class="label"><b>IDC</b></td> <td class="content">' + sheetData["IDC"] + '</td></tr>';
			}
			if (typeof (sheetData["Total-MOS-Budget"]) != "undefined") {
				printContent += '		<tr><td class="label"><b>Total MOS Budget</b></td> <td class="content">' + sheetData["Total-MOS-Budget"] + '</td></tr>';
			}
			if (typeof (sheetData["Total-Project-Budget"]) != "undefined") {
				printContent += '		<tr><td class="label"><b>Total Project Budget</b></td> <td class="content">' + sheetData["Total-Project-Budget"] + '</td></tr>';
			}
			printContent += '	</tbody></table>';
		}

		if (typeof (sheetData["Printer-Subawards-or-Not"]) != "undefined") {
			printContent += '	<ul style="margin: 0;">' +
				'		<li><b>Will cost sharing be required?</b> ' + sheetData["Printer-Cost-Sharing-Required"] + '</li>' +
				'		<li><b>Will there be subawards?</b> ' + sheetData["Printer-Subawards-or-Not"] + '</li>' +
				'	</ul>';
		} else {
			printContent += '	<p style="margin: 0;"><b>Will cost sharing be required?</b> ' + sheetData["Printer-Cost-Sharing-Required"] + '</p>';
		}

		printContent += '</td></tr></tbody></table>';

		if (typeof (sheetData["PID-Comments"]) != "undefined") {
			printContent += '<h2>Principal Investigator / Proposal Developer Comments</h2>' +
				'<div>' + sheetData["PID-Comments"] + '</div>';
		}

		if (typeof (sheetData["GPC-Comments"]) != "undefined") {
			printContent += '<h2>GPC Comments</h2>' +
				'<div>' + sheetData["GPC-Comments"] + '</div>';
		}

		printContent = ReturnPrintableContentWithStandardWrapper(printContent, "gpc-initial-concept-approval");
		PrintToPrinter(printContent);
	};



	$.fn.PrintGPCSubmissionApprovalRequest = function () {

		moment.locale('en');
		moment.suppressDeprecationWarnings = true;

		// get raw data
		var sheetData = rData.formData;
		var printerRequestID = rData.requestID;
		var requesterData = $().ReturnUserDataUsingAccountName(sheetData["Requester-Account"]);
		var mosPIData = $().ReturnUserDataUsingAccountName(sheetData["MOS-Principal-Investigator"][0]["account"]);
		if (typeof (sheetData["MOS-Co-Investigator"][0]) != "undefined") {
			var mosCoPIExists = 1;
			var mosCoPIData = $().ReturnUserDataUsingAccountName(sheetData["MOS-Co-Investigator"][0]["account"]);
		} else {
			var mosCoPIExists = 0;
		}
		var mosPDData = $().ReturnUserDataUsingAccountName(sheetData["Proposal-Developer"][0]["account"]);

		// process some of the data
		var requesterIsUnique = 0;

		if (requesterData.userName !== mosPIData.userName &&
			requesterData.userName !== mosPDData.userName) {
			requesterIsUnique = 1;
		}

		if (requesterIsUnique === 0 && mosCoPIExists === 1) {
			if (requesterData.userName !== mosCoPIData.userName) {
				requesterIsUnique = 1;
			}
		}

		sheetData["Printer-MOS-PI-Name"] = mosPIData["name"];
		sheetData["Printer-MOS-PI-Department"] = mosPIData["dept"];
		sheetData["Printer-MOS-PI-Phone"] = mosPIData["phone"];
		sheetData["Printer-MOS-PI-Email"] = mosPIData["email"];

		if (mosCoPIExists === 1) {
			sheetData["Printer-MOS-Co-PI-Name"] = mosCoPIData["name"];
			sheetData["Printer-MOS-Co-PI-Department"] = mosCoPIData["dept"];
			sheetData["Printer-MOS-Co-PI-Phone"] = mosCoPIData["phone"];
			sheetData["Printer-MOS-Co-PI-Email"] = mosCoPIData["email"];
		}

		sheetData["Printer-MOS-PD-Name"] = mosPDData["name"];
		sheetData["Printer-MOS-PD-Department"] = mosPDData["dept"];
		sheetData["Printer-MOS-PD-Phone"] = mosPDData["phone"];
		sheetData["Printer-MOS-PD-Email"] = mosPDData["email"];

		if (requesterIsUnique === 1) {
			sheetData["Printer-Requester-Name"] = mosPIData["name"];
			sheetData["Printer-Requester-Department"] = mosPIData["dept"];
			sheetData["Printer-Requester-Phone"] = mosPIData["phone"];
			sheetData["Printer-Requester-Email"] = mosPIData["email"];
		}

		if (typeof (sheetData["museum-role_primerecipient"]) != "undefined") {
			sheetData["Printer-Museum-Role"] = "Prime Recipient";
		} else {
			sheetData["Printer-Museum-Role"] = "Subawardee";
		}


		if (typeof (sheetData["subaward-materials-or-not_yes"]) != "undefined") {
			sheetData["Printer-Subawards-or-Not"] = "In Hand";
		} else {
			sheetData["Printer-Subawards-or-Not"] = "None";
		}

		if (typeof (sheetData["eep-needs_yes"]) != "undefined") {
			sheetData["Printer-EEP-Needs"] = "Education and Enrichment Programs staff needs have been negotiated with " + $("input#eep-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["eep-needs_no"]) != "undefined") {
			sheetData["Printer-EEP-Needs"] = "Education and Enrichment Programs staff needs have <i>not</i> been negotiated with " + $("input#eep-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["eep-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-EEP-Needs"] = "Education and Enrichment Programs staff needs are not applicable";
		}

		if (typeof (sheetData["edc-needs_yes"]) != "undefined") {
			sheetData["Printer-EDC-Needs"] = "Exhibit Development and Conservation staff needs have been negotiated with " + $("input#edc-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["edc-needs_no"]) != "undefined") {
			sheetData["Printer-EDC-Needs"] = "Exhibit Development and Conservation staff needs have <i>not</i> been negotiated with " + $("input#edc-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["edc-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-EDC-Needs"] = "Exhibit Development and Conservation staff needs are not applicable";
		}

		if (typeof (sheetData["web-needs_yes"]) != "undefined") {
			sheetData["Printer-Web-Needs"] = "Website needs (whether internal or external) have been negotiated with " + $("input#web-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["web-needs_no"]) != "undefined") {
			sheetData["Printer-Web-Needs"] = "Website needs (whether internal or external) have <i>not</i> been negotiated with " + $("input#web-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["web-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-Web-Needs"] = "Website needs (whether internal or external) are not applicable";
		}

		if (typeof (sheetData["infra-needs_yes"]) != "undefined") {
			sheetData["Printer-Infra-Needs"] = "IIT infrastructure needs have been negotiated with " + $("input#infra-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["infra-needs_no"]) != "undefined") {
			sheetData["Printer-Infra-Needs"] = "IIT infrastructure needs have <i>not</i> been negotiated with " + $("input#infra-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["infra-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-Infra-Needs"] = "IIT infrastructure needs are not applicable";
		}

		if (typeof (sheetData["re-needs_yes"]) != "undefined") {
			sheetData["Printer-RE-Needs"] = "Research & Evaluation needs have been negotiated with " + $("input#re-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["re-needs_no"]) != "undefined") {
			sheetData["Printer-RE-Needs"] = "Research & Evaluation needs have <i>not</i> been negotiated with " + $("input#re-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["re-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-RE-Needs"] = "Research & Evaluation needs are not applicable";
		}

		if (typeof (sheetData["external-evaluator-needs_yes"]) != "undefined") {
			sheetData["Printer-EE-Needs"] = "External evaluator has been contacted; scope, timeline, and budget have been agreed to";
		} else if (typeof (sheetData["external-evaluator-needs_no"]) != "undefined") {
			sheetData["Printer-EE-Needs"] = "External evaluator has <i>not</i> been contacted";
		} else if (typeof (sheetData["external-evaluator-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-EE-Needs"] = "External evaluator is not applicable";
		}

		if (typeof (sheetData["irb-needs_yes"]) != "undefined") {
			sheetData["Printer-IRB-Needs"] = "IRB review has been negotiated with " + $("input#irb-review-discussee-on-load").val();
		} else if (typeof (sheetData["irb-needs_no"]) != "undefined") {
			sheetData["Printer-IRB-Needs"] = "IRB review has <i>not</i> been negotiated with " + $("input#irb-review-discussee-on-load").val();
		} else if (typeof (sheetData["irb-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-IRB-Needs"] = "IRB review is not applicable";
		}

		if (typeof (sheetData["new-staff-needs_yes"]) != "undefined") {
			sheetData["Printer-New-Staff-Needs"] = "New staff positions will be required";
		} else if (typeof (sheetData["new-staff-needs_no"]) != "undefined") {
			sheetData["Printer-New-Staff-Needs"] = "New staff positions will <i>not</i> be required";
		} else if (typeof (sheetData["new-staff-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-New-Staff-Needs"] = "New staff positions are not applicable";
		}

		if (typeof (sheetData["office-space-needs_yes"]) != "undefined") {
			sheetData["Printer-Office-Space-Needs"] = "New office space will be required";
		} else if (typeof (sheetData["office-space-needs_no"]) != "undefined") {
			sheetData["Printer-Office-Space-Needs"] = "New office space will <i>not</i> be required";
		} else if (typeof (sheetData["office-space-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-Office-Space-Needs"] = "New office space is not applicable";
		}

		if (typeof (sheetData["exhibit-halls-space-needs_yes"]) != "undefined") {
			sheetData["Printer-Exhibits-Needs"] = "Exhibit Halls space needs have been negotiated with " + $("input#re-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["exhibit-halls-space-needs_no"]) != "undefined") {
			sheetData["Printer-Exhibits-Needs"] = "Exhibit Halls space needs have <i>not</i> been negotiated with " + $("input#re-needs-negotiator-on-load").val();
		} else if (typeof (sheetData["exhibit-halls-space-needs_notapplicable"]) != "undefined") {
			sheetData["Printer-Exhibits-Needs"] = "Exhibit Halls space needs are not applicable";
		}


		sheetData["Printer-Proposal-Due-Date"] = $().ReturnFormattedDateTime(sheetData["Proposal-Due-Date"], "YYYY-MM-DDTHH:mm:ss", "MMMM D, YYYY");
		if (typeof (sheetData["Expected-Decision-Date"]) != "undefined") {
			sheetData["Printer-Expected-Decision-Date"] = $().ReturnFormattedDateTime(sheetData["Expected-Decision-Date"], "YYYY-MM-DDTHH:mm:ss", "MMMM D, YYYY");
		} else {
			sheetData["Printer-Expected-Decision-Date"] = "Unknown";
		}

		// build the sheet to be printed
		var printContent = '<h1>GPC Initial Concept Approval Request</h1>';

		printContent += '<p><b>Request ID: </b>' + printerRequestID + '</p>';

		printContent += '<h2>Project Basics</h2>' +
			'<table class="layout-table">' +
			'	<tbody><tr><td><ul style="margin: 0;">' +
			'		<li><b>Project Title: </b> ' + sheetData["Project-Title"] + '</li>' +
			'		<li><b>Funder: </b> ' + sheetData["Funder"] + '</li>' +
			'		<li><b>RFP or Other Website: </b> ' + sheetData["RFP-or-Other-Relevant-Website"] + '</li>' +
			'		<li><b>Proposal Type: </b> ' + sheetData["Proposal-Type"] + '</li>' +
			'		<li><b>Proposal Due Date: </b> ' + sheetData["Printer-Proposal-Due-Date"] + '</li>' +
			'		<li><b>Expected Decision Date: </b> ' + sheetData["Printer-Expected-Decision-Date"] + '</li>' +
			'		<li><b>Museum Role: </b> ' + sheetData["Printer-Museum-Role"] + '</li>';

		if (typeof (sheetData["Prime-Institution"]) != "undefined") {
			printContent += '<li><b>Prime Institution: </b> ' + sheetData["Prime-Institution"] + '</li>';
		}

		if (typeof (sheetData["Outside-PI"]) != "undefined") {
			printContent += '<li><b>Outside PI: </b> ' + sheetData["Outside-PI"] + '</li>';
		}

		printContent += '	</ul></td>' +
			'	<td><ul style="margin: 0;">' +

			'	<li><b>MOS Principal Investigator:</b><ul style="margin-bottom: 0;">' +
			'		<li><b>Name:</b> ' + sheetData["Printer-MOS-PI-Name"] + '</li>' +
			'		<li><b>Department:</b> ' + sheetData["Printer-MOS-PI-Department"] + '</li>' +
			'		<li><b>Phone:</b> ' + sheetData["Printer-MOS-PI-Phone"] + '</li>' +
			'		<li><b>Email:</b> ' + sheetData["Printer-MOS-PI-Email"] + '</li>' +
			'	</ul></li>';

		if (mosCoPIExists === 1) {
			printContent += '	<li><b>MOS Co-Principal Investigator:</b><ul style="margin-bottom: 0;">' +
				'		<li><b>Name:</b> ' + sheetData["Printer-MOS-Co-PI-Name"] + '</li>' +
				'		<li><b>Department:</b> ' + sheetData["Printer-MOS-Co-PI-Department"] + '</li>' +
				'		<li><b>Phone:</b> ' + sheetData["Printer-MOS-Co-PI-Phone"] + '</li>' +
				'		<li><b>Email:</b> ' + sheetData["Printer-MOS-Co-PI-Email"] + '</li>' +
				'	</ul></li>';
		}

		printContent += '	<li><b>MOS Proposal Developer:</b><ul style="margin-bottom: 0;">' +
			'		<li><b>Name:</b> ' + sheetData["Printer-MOS-PD-Name"] + '</li>' +
			'		<li><b>Department:</b> ' + sheetData["Printer-MOS-PD-Department"] + '</li>' +
			'		<li><b>Phone:</b> ' + sheetData["Printer-MOS-PD-Phone"] + '</li>' +
			'		<li><b>Email:</b> ' + sheetData["Printer-MOS-PD-Email"] + '</li>' +
			'	</ul></li>';

		if (requesterIsUnique === 1) {
			printContent += '	<li><b>Requester:</b><ul style="margin-bottom: 0;">' +
				'		<li><b>Name:</b> ' + sheetData["Printer-Requester-Name"] + '</li>' +
				'		<li><b>Department:</b> ' + sheetData["Printer-Requester-Department"] + '</li>' +
				'		<li><b>Phone:</b> ' + sheetData["Printer-Requester-Phone"] + '</li>' +
				'		<li><b>Email:</b> ' + sheetData["Printer-Requester-Email"] + '</li>' +
				'	</ul></li>';
		}

		printContent += '	</ul></td></tr></tbody>' +
			'</table>';

		printContent += '<table class="layout-table">' +
			'	<tbody><tr><td><h2>Project Narrative</h2><p style="margin: 0;">' +
			'		<b>Refer to File: </b> ' + sheetData["Project-Narrative-File"] +
			'	</p><h2>Project Needs</h2>';

		printContent += '<h3>Staffing and Similar Needs</h3><ul style="margin-bottom: 0;">' +
			'		<li>' + sheetData["Printer-EEP-Needs"];

		if (typeof (sheetData["EEP-Staff-Member-Names"]) != "undefined") {
			printContent += '			<div>EEP Staff Member Names: ' + sheetData["EEP-Staff-Member-Names"] + '</div';
		}

		printContent += '		</li><li>' + sheetData["Printer-EDC-Needs"];

		if (typeof (sheetData["EDC-Staff-Member-Names"]) != "undefined") {
			printContent += '			<div>EDC Staff Member Names: ' + sheetData["EDC-Staff-Member-Names"] + '</div';
		}

		printContent += '		</li><li>' + sheetData["Printer-Web-Needs"] + '</li>' +
			'		<li>' + sheetData["Printer-Infra-Needs"] + '</li>' +
			'		<li>' + sheetData["Printer-RE-Needs"] + '</li>' +
			'		<li>' + sheetData["Printer-EE-Needs"] + '</li>' +
			'		<li>' + sheetData["Printer-IRB-Needs"] + '</li>' +
			'		<li>' + sheetData["Printer-New-Staff-Needs"];

		if (typeof (sheetData["New-Staff-Positions"]) != "undefined") {
			printContent += '			<div>New Staff Positions Required: ' + sheetData["New-Staff-Positions"] + '</div';
		}

		printContent += '	</li></ul>' +
			'<h3>Space Needs</h3><ul style="margin-bottom: 0;">' +
			'		<li>' + sheetData["Printer-Office-Space-Needs"];

		if (typeof (sheetData["Staff-Quantity-for-Office-Space"]) != "undefined") {
			printContent += '			<div>For how many staff members will new office space be required? ' + sheetData["Staff-Quantity-for-Office-Space"] + '</div';
		}

		printContent += '		</li><li>' + sheetData["Printer-Exhibits-Needs"] + '</li>' +
			'	</ul>';


		printContent += '	</td>' +
			'	<td id="project-budget"><h2>Project Budget</h2>' +
			'	<table><tbody>' +
			'		<tr><td class="label"><b>MOS Direct Costs</b></td> <td class="content">' + sheetData["MOS-Direct-Costs"] + '</td></tr>' +
			'		<tr><td class="label"><b>IDC</b></td> <td class="content">' + sheetData["IDC"] + '</td></tr>' +
			'		<tr><td class="label"><b>Total MOS Budget</b></td> <td class="content">' + sheetData["Total-MOS-Budget"] + '</td></tr>';

		if (typeof (sheetData["Total-Project-Budget"]) != "undefined") {
			printContent += '		<tr><td class="label"><b>Total Project Budget</b></td> <td class="content">' + sheetData["Total-Project-Budget"] + '</td></tr>';
		}

		printContent += '		<tr><td class="label"><b>Cost Share</b></td> <td class="content">' + sheetData["Cost-Share"] + '</td></tr>' +
			'	</tbody></table>' +
			'	<ul style="margin: 0;">' +
			'		<li><b>Required Subaward Materials:</b> ' + sheetData["Printer-Subawards-or-Not"] + '</li>';

		if (typeof (sheetData["Project-Budget-Justification-File"]) != "undefined") {
			printContent += '		<li><b>Refer to Files: </b> <ul style="margin-bottom: 0;">' +
				'			<li>' + sheetData["Project-Budget-File"] + '</li>' +
				'			<li>' + sheetData["Project-Budget-Justification-File"] + '</li></ul></li>';
		} else {
			printContent += '		<li><b>Refer to File: </b> ' + sheetData["Project-Budget-File"] + '</li>';
		}

		printContent += '	</ul></td></tr></tbody></table>';

		if (typeof (sheetData["PID-Comments"]) != "undefined") {
			printContent += '<h2>Principal Investigator / Proposal Developer Comments</h2>' +
				'<div>' + sheetData["PID-Comments"] + '</div>';
		}

		printContent = ReturnPrintableContentWithStandardWrapper(printContent, "gpc-submission-approval");
		PrintToPrinter(printContent);
	};



	function ReturnPrintableContentWithStandardWrapper(printContent, wrapperID) {
		return '<div id="' + wrapperID + '">' +
			'<div id="print-header" ' +
			'style="text-align: center; margin: 0 0 20px;' +
			'"><img src="/sites/hubprod/Asset Library/header_print-view.png" style="margin: 0 auto;" /></div>' +
			'<div id="print-body">' + printContent + '</div></div>';
	}



	function PrintToPrinter(printContent) {
		$("body").append('<div id="printer-content"></div>');
		$("div#printer-content").html(printContent);
		$("form#aspnetForm").hide();
		window.print();
		$("div#printer-content").remove();
		$("form#aspnetForm").show();
	}



	// ---- UTILITIES

	function CallFunctionFromString(functionName, functionArgumentsObject) {

		switch (functionName) {

			case "PrintNeedsSheet":
				PrintNeedsSheet();
				break;

			case "PrintOutsideEmploymentRequest":
				PrintOutsideEmploymentRequest();
				break;

			case "PrintEmploymentAuthorizationRequest":
				PrintEmploymentAuthorizationRequest();
				break;

			case "PrintPersonnelActionRequest":
				PrintPersonnelActionRequest();
				break;

			case "PrintGPCInitialConceptApprovalRequest":
				$().PrintGPCInitialConceptApprovalRequest();
				break;

			case "PrintGPCSubmissionApprovalRequest":
				$().PrintGPCSubmissionApprovalRequest();
				break;

			case "ReturnGPCInitialConceptApprovalRequestAdditionalViewAccess":
				return $().ReturnGPCInitialConceptApprovalRequestAdditionalViewAccess(functionArgumentsObject);
				break;

			case "ReturnGPCSubmissionApprovalRequestAdditionalViewAccess":
				return $().ReturnGPCSubmissionApprovalRequestAdditionalViewAccess(functionArgumentsObject);
				break;

			case "ReturnGPCPeopleEditingAccess":
				return $().ReturnGPCPeopleEditingAccess();
				break;

			case "LoadDepartmentSelectOptions":
				return $().LoadDepartmentSelectOptions(functionArgumentsObject);
				break;

			case "ReturnUserIsGSEHRAdmin":
				return $().ReturnUserIsGSEHRAdmin();
				break;


		}
	}



	function isJSONParsable(stringToTest) {

		try {
			var o = JSON.parse(stringToTest);

			// Handle non-exception-throwing cases:
			// Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
			// but... JSON.parse(null) returns null, and typeof null === "object", 
			// so we must check for that, too. Thankfully, null is falsey, so this suffices:
			if (o && typeof o == "object") {
				return o;
			}
		} catch (e) { }

		return false;
	}



	function ReturnFileBufferDeferredPromise(file) {
		var deferred = $.Deferred();
		var reader = new FileReader();

		reader.onload = function (e) {
			console.log("reader.onload");
			console.log("e = ");
			console.log(e);
			deferred.resolve(e.target.result);
		}

		reader.onerror = function (e) {
			console.log("reader.onerror");
			console.log("e = ");
			console.log(e);
			deferred.reject(e.target.error);
		}

		reader.readAsArrayBuffer(file);

		return deferred.promise();
	}



	$.fn.ReturnNamesWLinkedEmailsFromPP = function (fieldName) {

		var dataLocationSelector = 'input#' + ReplaceAll("\\.", "", ReplaceAll(" ", "-", fieldName)) + '_TopSpan_HiddenInput';

		if (typeof ($(dataLocationSelector).val()) == 'undefined' || $(dataLocationSelector).val() == [] || $(dataLocationSelector).val() == '') {
			peopleArray = [];
		} else {
			peopleArray = JSON.parse($(dataLocationSelector).val());
		}

		var peopleArrayIndexQty = peopleArray.length;
		var peopleArrayIndexLast = (peopleArrayIndexQty - 1);
		var linkedNamesString = '';

		$.each(peopleArray, function (i, r) {

			// if peopleArrayIndexQty == 1
			if (peopleArrayIndexQty == 1) {
				// set
				linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
			}
			// if peopleArrayIndexQty == 2
			if (peopleArrayIndexQty == 2) {
				// if i != 0, prepend with 'and'
				if (i != 0) {
					linkedNamesString += ' and ';
				}
				// set
				linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
			}
			// if peopleArrayIndexQty > 2
			if (peopleArrayIndexQty > 2) {
				// if i == 0
				if (i == 0) {
					linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
					// if i != 0
				} else if (i != 0) {
					// if i != peopleArrayIndexLast
					if (i != peopleArrayIndexLast) {
						// prepend with ', '
						linkedNamesString += ', ';
						// set
						linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
					}
					// if i == peopleArrayIndexLast
					if (i == peopleArrayIndexLast) {
						// prepend with ', and '
						linkedNamesString += ', and ';
						// set
						linkedNamesString += '<a href="mailto:' + r.Description.toLowerCase() + '">' + r.DisplayText + '</a>';
					}
				}
			}
		});

		return linkedNamesString;
	};



	function Print(incoming) {
		$("div#print-to-screen").append(incoming);
	}



	function CDataWrap(value) {
		return "<![CDATA[" + value + "]]>";
	}



	function ReturnRequestStorageObjectPropertiesAndPushRequestColumns(formElement) {

		// this is probably kinda hokey, but 3 days prior to major release this is what works
		if (typeof (globalSubmissionValuePairsArray) === "undefined") {
			globalSubmissionValuePairsArray = [];
		}

		var formDataString = '';

		// handle inputs that aren't people pickers
		$(formElement).find('input').each(function () {

			// get this input's id
			var id = this.id;

			// unless otherwise indicated, don't save approval fields; in most cases, these fields won't be populated individually as the corresponding data is saved in the "Approval Nodes Storage" field
			if ((typeof (fData.saveApprovalFields) != 'undefined' && fData.saveApprovalFields == 1) || (StrInStr(id, 'approval-signature') == false && StrInStr(id, 'approval-date') == false && StrInStr(id, 'Approval-Notes') == false && StrInStr(id, 'approval-indicator') == false)) {

				// if this input is not a people picker
				if (id.indexOf('TopSpan_HiddenInput') < 0) {

					// get its type
					var type = $(this).attr('type');

					// default to type=text
					if (type == undefined) {
						type = 'text';
					}

					// if this input is not a file picker
					if (type.toUpperCase() != "FILE") {

						// encode its value
						var value = HtmlEncode($(this).val());

						// if this input has a value and is not a button
						if (value != undefined && value.length > 0 && type.toUpperCase() != 'BUTTON') {

							// if this input is NOT a radio or checkbox - OR - if it's checked
							if ((type.toUpperCase() != 'RADIO' && type.toUpperCase() != 'CHECKBOX') || $(this).attr('checked')) {

								// create object property for it
								formDataString += '"' + id + '":"' + value + '",';

								// if this input has a listFieldName attribute
								formVal = $(this).attr('listFieldName');
								if (formVal != undefined) {
									// if this input has an data-is-date attribute
									if ($(this).attr('data-is-date') == 'true') {
										// convert it to ISO format string
										var thisDate = new Date(value);
										value = thisDate.toISOString();
									}
									// push listFieldName and value to globalSubmissionValuePairsArray
									globalSubmissionValuePairsArray.push([$(this).attr('listFieldName'), value]);
								}
							}
						}
					}
				}
			}
		});

		// handle selects
		$(formElement).find('select').each(function () {
			id = this.id;

			if (id != 'Change-Request-Status') {
				value = $(this).find('option:selected').text();
				formDataString += '"' + id + '":"' + value + '",';

				formVal = $(this).attr('listFieldName');
				if (formVal != undefined) {
					globalSubmissionValuePairsArray.push([$(this).attr('listFieldName'), value]);
				}
			}
		});

		// handle textareas
		$(formElement).find('textarea').each(function () {
			id = this.id;

			// unless otherwise indicated, don't save approval fields; in most cases, these fields won't be populated individually as the corresponding data is saved in the "Approval Nodes Storage" field
			if ((typeof (fData.saveApprovalFields) != 'undefined' && fData.saveApprovalFields == 1) || StrInStr(id, 'Approval-Notes') == false) {
				value = HtmlEncode($(this).val());

				if (value.length > 0) {
					formDataString += '"' + id + '":"' + value + '",';
					if ($(this).attr('listFieldName') != undefined) {
						globalSubmissionValuePairsArray.push([$(this).attr('listFieldName'), CDataWrap(value)]);
					}
				}
			}
		});

		// handle people pickers
		$(formElement).find('div[data-control-type="PeoplePicker"]').each(function () {

			// set up vars
			var spPP = SPClientPeoplePicker.SPClientPeoplePickerDict[$(this).attr('id') + '_TopSpan'];
			var people = spPP.GetAllUserInfo();


			// build an array of custom people objects
			if (people.length) {

				formDataString += '"' + this.id + '":[';
				var peopleSeparator = '';

				$.each(people, function (i, p) {
					formDataString += peopleSeparator +
						'{' +
						'"account": "' + p.Key + '",' +
						'"displayText": "' + p.DisplayText + '",' +
						'"description": "' + p.Description + '"' +
						'}';
					peopleSeparator = ',';
				});

				formDataString += '],';
			} else {
				formDataString += '"' + this.id + '":"",';
			}

			// if this field is to be stored in the list
			if ($(this).attr('listFieldName') != undefined) {

				var listFieldValue = '';
				var listFieldValueSeparator = '';

				// build up a semicolon-delimited list of keys
				for (index in people) {
					listFieldValue += listFieldValueSeparator + '-1;#' + people[index].Description;
					listFieldValueSeparator = ';#';
				}

				globalSubmissionValuePairsArray.push([$(this).attr('listFieldName'), listFieldValue]);
			}
		});

		// handle divs
		$('div.listFieldName').each(function () {
			if ($(this).attr('data-control-type') == undefined) {
				if ($.trim($(this).html()).length > 0) {
					var regex = new RegExp("\"", "g");
					value = ($(this).html()).replace(regex, "'");

					formDataString += '"' + this.id + '":"' + value + '",';
					if ($(this).attr('listFieldName') != undefined) {
						globalSubmissionValuePairsArray.push([$(this).attr('listFieldName'), CDataWrap($(this).html())]);
					}
				}
			}
		});

		// handle links for url, file, and event request fields
		$(formElement).find('a[data-source-type="url"], a[data-source-type="file"], a[data-source-type="event-space-request"], a[data-source-type="event-needs-request"], a[data-source-type="gpc-initial-concept-approval-request"]').each(function () {
			id = this.id;

			value = HtmlEncode(ReplaceAll("#", "", $(this).text()));

			if (value.length > 0) {
				formDataString += '"' + id + '":"' + value + '",';
				if ($(this).attr('listFieldName') != undefined) {
					globalSubmissionValuePairsArray.push([$(this).attr('listFieldName'), CDataWrap(value)]);
				}
			}
		});

		return formDataString;
	}



	$.fn.CreateOrUpdateListItem = function (mData, rData, submissionValuePairsArray, webURL) {

		// --- set up internal promise to configure

		var deferred = $.Deferred();

		// --- do create or update

		// set up vars

		var batchCommand = 'New';
		var ID = 0;

		if (rData.requestID != undefined && rData.requestID != 0) {
			batchCommand = 'Update';
			ID = rData.requestID;
		}

		// send the data to the list

		var updateListItemsOptions = {
			operation: 'UpdateListItems',
			listName: mData.defaultListNameForSWFRequestData,
			batchCmd: batchCommand,
			ID: ID,
			valuepairs: submissionValuePairsArray,
			completefunc: function (xData, Status) {


				// determine success of save; then...
				var swfListSaveSuccess = $().HandleListUpdateReturn(xData, Status, 'Hub SWF List Item Error');

				// if swfList save was NOT successful
				if (swfListSaveSuccess == 0) {

					// send error emails from queue, then...
					$().SendEmails(globalErrorEmailsToSend).then(function () {
						// display messages
						$('div#wait-while-working').fadeOut(200);
						if (batchCommand == 'New') {
							$('div#swfList-error_new-request').fadeIn(200);
						} else {
							$('div#swfList-error_updated-request').fadeIn(200);
						}
					});

					// --- signify completion

					// deferred.resolve();

					// if swfList save was successful
				} else if (swfListSaveSuccess == 1) {

					var requestID = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");
					globalLastRequestIDs.push(requestID);

					// --- signify completion

					deferred.resolve();

				}
			}
		};

		if (webURL) {
			updateListItemsOptions.webURL = webURL;
		}

		$().SPServices(updateListItemsOptions);
		return deferred.promise();
	};



	function ReturnStandardSubmissionValuePairArray(form) {

		// re/set globalSubmissionValuePairsArray to new, empty array
		globalSubmissionValuePairsArray = [];
		// start building the JSON string that will be stored
		var formDataString = '{';

		// handle the repeatables
		formDataString += '"RepeatedElements": [';
		$(form).find('[data-repeatable]').each(function () {
			var repeatableString = '{"ID": "' + $(this).attr('id') + '",';
			repeatableString += '"OriginalToRepeat": "' + $(this).attr('data-original-to-repeat') + '",';
			repeatableString += ReturnRequestStorageObjectPropertiesAndPushRequestColumns(this);
			repeatableString += '},';
			formDataString += repeatableString;
			$(this).remove();
		});
		formDataString += '],';

		// handle the non-repeatables
		formDataString += ReturnRequestStorageObjectPropertiesAndPushRequestColumns(form);

		// end building the JSON string that will be stored
		formDataString += '}';

		// replace special characters
		formDataString = formDataString.replace(/,(?=[^,]*$)/, '');

		// push the string to valuePairs
		globalSubmissionValuePairsArray.push(["AllRequestData", CDataWrap(formDataString)]);

		// return the array
		return globalSubmissionValuePairsArray;
	}




































	function ReturnNewGSESchedulesSubmissionValuePairArrayOfArrays(form) {
		/*
			overview / context notes
			1. for each date that was added, one row will be created in SWFList
			2. for each row to be created in SWFList, one array must be added to globalSubmissionValuePairsArrayOfArrays
			3. each array consists of an element for every SWFList column that will be populated
			4. one of those elements corresponds to the AllRequestData column

			for each date in the form, add to globalSubmissionValuePairsArrayOfArrays an array of elements for every SWFList column that will be populated

		*/

		// set up vars
		// the dates for which we'll create rows in SWFList
		var scheduleDates = [];
		var submissionValuePairsArrayOfArraysToReturn = [];

		// get the dates; we'll create one row in SWFList for each date
		// note: the repeatable dates will create inputs with IDs that begin the same way but are unique; 
		// 		if that's confusing, then add some dates to a form and inspect the inputs' IDs; to get
		//		all of the repeatable date fields, we'll match the beginning of the IDs
		// note: change the partial ID being searched for to correspond to the field name you've chosen for the form; 
		// 		using the caret character means we'll find every input whose ID *begins* with this partial ID
		$(form).find('input[id^="Repeating-Date"]').each(function () {
			scheduleDates.push($(this).val());
		});

		// console.log('scheduleDates');
		// console.log(scheduleDates);

		// for each date that was found
		$.each(scheduleDates, function (i, scheduleDate) {

			// re/set globalSubmissionValuePairsArray to new, empty array
			// this corresponds to one row to be created in SWFList
			globalSubmissionValuePairsArray = [];

			// skip any empty dates
			if (scheduleDate !== '') {
				// get date in ISO format
				var scheduleDateISO = $().ReturnFormattedDateTime(scheduleDate, null, null, null);

				// start building the JSON string that will be stored
				var formDataString = '{';

				// simulate handled repeatables
				formDataString += '"RepeatedElements": [],';

				// handle the non-repeatables
				formDataString += ReturnRequestStorageObjectPropertiesAndPushRequestColumns(form);

				// append this schedule date to formDataString
				// note: change "Name-of-Date-Field", below, to [some ID you make up]; this pertains to
				// 		how the schedule date will be stored; it doesn't correspond to the form you've already created;
				// 		be aware that in future project stages it may be discovered that a different name makes sense, so
				// 		this may need to be changed
				formDataString += '"Date": "' + scheduleDateISO + '",';

				// end building the JSON string that will be stored
				formDataString += '}';

				// replace special characters
				formDataString = formDataString.replace(/,(?=[^,]*$)/, '');

				// push the string to globalSubmissionValuePairsArray
				globalSubmissionValuePairsArray.push(["AllRequestData", CDataWrap(formDataString)]);

				// push scheduleDate to submissionValuePairsArray
				// note: this means that scheduleDate will also get a separate column in SWFList; this is done
				// 		because we will need to query against this column
				// note: because this data / column is handled manually here, don't define a listFieldName for 
				// 		the corresponding form field in settings.js
				globalSubmissionValuePairsArray.push(["Date", scheduleDateISO]);

				// console.log('ReturnNewGSESchedulesSubmissionValuePairArrayOfArrays - globalSubmissionValuePairsArray');
				// console.log(globalSubmissionValuePairsArray);

				// push globalSubmissionValuePairsArray to the array to return
				submissionValuePairsArrayOfArraysToReturn.push(globalSubmissionValuePairsArray);
			}
		});

		// return the array
		return submissionValuePairsArrayOfArraysToReturn;
	}


















	/* function ReturnNewGSESchedulesSubmissionValuePairArrayOfArraysTest(form) {

		// 	overview / context notes
		// 	1. for each date that was added, one row will be created in SWFList
		// 	2. for each row to be created in SWFList, one array must be added to globalSubmissionValuePairsArrayOfArrays
		// 	3. each array consists of an element for every SWFList column that will be populated
		// 	4. one of those elements corresponds to the AllRequestData column

		// set up vars
		// the dates for which we'll create rows in SWFList
		var scheduleDates = [];
		var submissionValuePairsArrayOfArraysToReturn = [];

		// get the dates; we'll create one row in SWFList for each date
		// note: the repeatable dates will create inputs with IDs that begin the same way but are unique; 
		// 		if that's confusing, then add some dates to a form and inspect the inputs' IDs; to get
		//		all of the repeatable date fields, we'll match the beginning of the IDs
		// note: change the partial ID being searched for to correspond to the field name you've chosen for the form; 
		// 		using the caret character means we'll find every input whose ID *begins* with this partial ID
		$(form).find('input[id^="Offering-Beginning-Datetime"]').each(function () {
			scheduleDates.push($(this).val());
		});

		// for each date that was found
		$.each(scheduleDates, function (i, scheduleDate) {

			// re/set globalSubmissionValuePairsArray to new, empty array
			// this corresponds to one row to be created in SWFList
			globalSubmissionValuePairsArray = [];

			// skip any empty dates
			if (scheduleDate !== '') {
				// get date in ISO format
				var scheduleDateISO = $().ReturnFormattedDateTime(scheduleDate, null, null, null);

				// start building the JSON string that will be stored
				var formDataString = '{';

				// simulate handled repeatables
				formDataString += '"RepeatedElements": [],';

				// handle the non-repeatables
				formDataString += ReturnRequestStorageObjectPropertiesAndPushRequestColumns(form);

				// append this schedule date to formDataString
				// note: change "Name-of-Date-Field", below, to [some ID you make up]; this pertains to
				// 		how the schedule date will be stored; it doesn't correspond to the form you've already created;
				// 		be aware that in future project stages it may be discovered that a different name makes sense, so
				// 		this may need to be changed
				formDataString += '"Offering-Beginning-Datetime": "' + scheduleDateISO + '",';

				// end building the JSON string that will be stored
				formDataString += '}';

				// replace special characters
				formDataString = formDataString.replace(/,(?=[^,]*$)/, '');

				// push the string to globalSubmissionValuePairsArray
				globalSubmissionValuePairsArray.push(["AllRequestData", CDataWrap(formDataString)]);

				// push scheduleDate to globalSubmissionValuePairsArray
				// note: this means that scheduleDate will also get a separate column in SWFList; this is done
				// 		because we will need to query against this column
				// note: because this data / column is handled manually here, don't define a listFieldName for 
				// 		the corresponding form field in settings.js
				globalSubmissionValuePairsArray.push(["TestDate", scheduleDateISO]);

				// push globalSubmissionValuePairsArray to the array to return
				submissionValuePairsArrayOfArraysToReturn.push(globalSubmissionValuePairsArray);
			}
		});

		// return the array
		return submissionValuePairsArrayOfArraysToReturn;
	} */



	function ReturnAllRequestDataObjectAugmentedWithExceptionalEventOccurrence(form, allRequestDataObject) {

		// re/set globalSubmissionValuePairsArray to new, empty array
		globalSubmissionValuePairsArray = [];

		var formDataString = '';

		// note on general approach - we treat each exception as a date to skip and, if 
		//		the user isn't just removing an occurrence entirely, a date to add; this is true even if
		//		the date to skip and the date to add are the same; this allows us to consult only the skipped dates
		//		when rendering the series dates, and to just add all of the additional dates, all without 
		//		having to cross-consult skips and adds

		// if this event date on load was a pattern date
		if ($(form).find('input#Exception-ID').val() == "") {
			// store event date on load as a date to skip
			if (typeof (allRequestDataObject.datesToSkip) == 'undefined') {
				allRequestDataObject.datesToSkip = [];
			}
			allRequestDataObject.datesToSkip.push($(form).find('input#Event-Date-on-Load').val());

			// if event date on load was an exception date
		} else {

			// get index of element to remove
			var exceptionToRemoveIndex = -1;
			$(allRequestDataObject.datesToAdd).each(function (dateToAddIndex, dateToAddValue) {
				if (dateToAddValue.exceptionID == $(form).find('input#Exception-ID').val()) {
					exceptionToRemoveIndex = dateToAddIndex;
				}
			});

			// remove the array element (datesToAdd object)
			if (exceptionToRemoveIndex > -1) {
				allRequestDataObject.datesToAdd.splice(exceptionToRemoveIndex, 1);
			}
		}

		// if we're not just removing
		if ($("input#requester-cancellation_cancel").prop("checked") == false) {

			// store form data as a date to add
			if (typeof (allRequestDataObject.datesToAdd) == 'undefined') {
				allRequestDataObject.datesToAdd = [];
				var thisExceptionID = "1";
			} else if (allRequestDataObject.datesToAdd.length == 0) {
				var thisExceptionID = "1";
			} else {

				var lastIncomingExceptionID = allRequestDataObject.datesToAdd[allRequestDataObject.datesToAdd.length - 1].exceptionID;
				var thisExceptionID = (parseInt(lastIncomingExceptionID) + 1).toString();
			}

			allRequestDataObject.datesToAdd.push({
				"exceptionID": thisExceptionID,
				"Event-Date": HtmlEncode($(form).find('input#Event-Date').val()),
				"hours-input_Start-Time": HtmlEncode($(form).find('select#hours-input_Start-Time').find('option:selected').text()),
				"minutes-input_Start-Time": HtmlEncode($(form).find('select#minutes-input_Start-Time').find('option:selected').text()),
				"hours-input_End-Time": HtmlEncode($(form).find('select#hours-input_End-Time').find('option:selected').text()),
				"minutes-input_End-Time": HtmlEncode($(form).find('select#minutes-input_End-Time').find('option:selected').text()),
				"time-storage_Start-Time": HtmlEncode($(form).find('input#time-storage_Start-Time').val()),
				"time-storage_End-Time": HtmlEncode($(form).find('input#time-storage_End-Time').val()),
				"Event-Location": HtmlEncode($(form).find('select#Event-Location').find('option:selected').text()),
				"Event-Notes": HtmlEncode($(form).find('textarea#Event-Notes').val()),
			});
		}

		// get allRequestDataObject as a string
		formDataString = JSON.stringify(allRequestDataObject);
		// push the string to valuePairs
		globalSubmissionValuePairsArray.push(["AllRequestData", CDataWrap(formDataString)]);
		// return the array
		return globalSubmissionValuePairsArray;
	}



	function ReturnAllRequestDataObjectWithExceptionalEventOccurrences(formDataString, originalFormData) {

		// re/set globalSubmissionValuePairsArray to new, empty array
		globalSubmissionValuePairsArray = [];

		// if there is exceptional event data to keep
		if (typeof (originalFormData) != 'undefined') {
			if (typeof (originalFormData.datesToSkip) != 'undefined') {

				// stringify the objects inside the datesToSkip array
				var datesToSkipArrayLength = originalFormData.datesToSkip.length;
				var datesToSkipString = '';
				$(originalFormData.datesToSkip).each(function (i, v) {
					datesToSkipString += JSON.stringify(this);
					// if not the last one, add a comma
					if (i + 1 < datesToSkipArrayLength) {
						datesToSkipString += ',';
					}
				});

				// stringify the objects inside the datesToAdd array
				var datesToAddArrayLength = originalFormData.datesToAdd.length;
				var datesToAddString = '';
				$(originalFormData.datesToAdd).each(function (i, v) {
					datesToAddString += JSON.stringify(this);
					// if not the last one, add a comma
					if (i + 1 < datesToAddArrayLength) {
						datesToAddString += ',';
					}
				});

				// prep formDataString to receive it
				var incomingFormDataStringLength = formDataString.length;
				var formDataStringOpenedUp = formDataString.slice(0, incomingFormDataStringLength - 1); // remove the final curly brace
				var formDataStringPreppedToReceive = formDataStringOpenedUp + ","; // add a comma

				// attach exceptional event data to formDataString
				formDataString = formDataStringPreppedToReceive + '"datesToSkip":"[' + datesToSkipString + ']","datesToAdd":"[' + datesToAddString + ']"}';
			}
		}
		// push the string to valuePairs
		globalSubmissionValuePairsArray.push(["AllRequestData", CDataWrap(formDataString)]);
		// return the array
		return globalSubmissionValuePairsArray;
	}



	function ReturnFileNameFromEndOfHtmlEncodedPath(pathAndName) {
		// if pathAndName does not contain an encoded backslash
		if (StrInStr(pathAndName, '%5C', 0) == false) {

			//return full, unchanged pathAndName
			return pathAndName;

			// if pathAndName contains an encoded backslash
		} else {

			// find the position of the last encoded backslash
			var lastEncodedBackslashPosition = pathAndName.lastIndexOf('%5C') + 3;

			// return the portion of pathAndName after the last encoded backslash
			return pathAndName.slice(lastEncodedBackslashPosition);
		}
	}



	function ReturnPathFromBeginningOfDecodedAbsoluteURL(pathAndName) {
		// if pathAndName does not contain a forward slash
		if (StrInStr(pathAndName, '/', 0) == false) {

			// return indication that there is no path
			return false;

		} else {

			// find the position of the last forward slash
			var lastForwardSlashPosition = pathAndName.lastIndexOf('/');

			// return the portion of pathAndName before the last forward slash
			return pathAndName.slice(0, lastForwardSlashPosition);
		}
	}



	function HtmlEncode(string) {

		// if contains "&" but does not contain "&amp;" or "&quot;"  (hasn't already been encoded)
		if (StrInStr(string, '&', 0) != false && StrInStr(string, '&amp;', 0) == false && StrInStr(string, '&quot;', 0) == false) {
			string = string.replace(/&/g, '&amp;');
		}

		return String(string)
			//.replace(/&/g, '&amp;')
			.replace(/\\/g, '%5C')
			.replace(/\r/g, '%0D')
			.replace(/\n/g, '%0A')
			.replace(/"/g, '&quot;');
		//.replace(/'/g, '&#39;')
		//.replace(/</g, '&lt;')
		//.replace(/>/g, '&gt;');
	}



	function HtmlDecode(str) {
		return String(str)
			.replace(/&amp;/g, '&')
			.replace(/%5C/g, '\\')
			.replace(/%0D/g, '\r')
			.replace(/%0A/g, '\n')
			.replace(/&quot;/g, '"');
		//.replace(/&#39;/g, '\'')
		//.replace(/</g, '&lt;')
		//.replace(/>/g, '&gt;');
	}


	$.fn.ReturnStringWithInitialCap = function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};


	$.fn.ZeroFillString = function (string, places) {
		for (i = 0; string.length < places; i++) {
			string = '0' + string;
		}
		return string;
	};



	$.fn.ReturnUserDataFromPersonOrGroupFieldString = function (usersString) {

		// parse query response from SP list's Person or Group field 
		//		(at least, with People Only selected in column config - if groups are included this may not work)
		//		note that this this def won't work for getting data out of a people picker field


		// RAW VALUE = 6;#James Baker,#i:0#.f|membership|jbaker@mos.org,#jbaker@mos.org,#jbaker@mos.org,#James Baker,#https://bmos-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/jbaker_mos_org_MThumb.jpg,#Interactive Media,#Intranet Solutions Project Manager;#20;#Ben Wilson,#i:0#.f|membership|bwilson@mos.org,#bwilson@mos.org,#bwilson@mos.org,#Ben Wilson,#https://bmos-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/bwilson_mos_org_MThumb.jpg,#Interactive Media,#Interactive Media Manager"

		// [0] - 6										-- userID
		// [1] - James Baker							-- userName
		// [2] - i:0#.f|membership|jbaker@mos.org		-- account (loginName)
		// [3] - jbaker@mos.org							-- email
		// [4] - jbaker@mos.org							-- sipAddress
		// [5] - James Baker							-- name (title)
		// [6] - https://bmos-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/jbaker_mos_org_MThumb.jpg -- photoURL
		// [7] - Interactive Media						-- dept
		// [8] - Intranet Solutions Project Manager	    -- jobTitle


		var usersParts = usersString.split(';#');
		var distinctUsersAsStrings = [];
		var allUsersData = [];

		$.each(usersParts, function (i, usersPart) {

			// if i represents an even-numbered position in array
			if (i % 2 == 1) {
				var combinedUserParts = usersParts[i - 1] + ',#' + usersParts[i];
				distinctUsersAsStrings.push(combinedUserParts);
			}
		});

		$.each(distinctUsersAsStrings, function (i, s) {
			var thisUser = s.split(",#");
			if (thisUser.length == 2) {
				allUsersData.push({
					userId: thisUser[0],
					userName: thisUser[1]
				});
			} else if (thisUser.length == 6) {
				allUsersData.push({
					userId: thisUser[0],
					userName: thisUser[1].replace(/(,,)/g, ","),
					account: thisUser[2].replace(/(,,)/g, ","),
					email: thisUser[3].replace(/(,,)/g, ","),
					sipAddress: thisUser[4].replace(/(,,)/g, ","),
					name: thisUser[5].replace(/(,,)/g, ",")
				});
			} else if (thisUser.length == 9) {
				allUsersData.push({
					userId: thisUser[0],
					userName: thisUser[1].replace(/(,,)/g, ","),
					account: thisUser[2].replace(/(,,)/g, ","),
					email: thisUser[3].replace(/(,,)/g, ","),
					sipAddress: thisUser[4].replace(/(,,)/g, ","),
					name: thisUser[5].replace(/(,,)/g, ","),
					photoURL: thisUser[6].replace(/(,,)/g, ","),
					dept: thisUser[7].replace(/(,,)/g, ","),
					jobTitle: thisUser[8].replace(/(,,)/g, ","),
				});
			}
		});

		return allUsersData;
	};



	$.fn.ReturnDateDifferenceInDays = function (dateOne, dateTwo) {

		var oneDay = 24 * 60 * 60 * 1000;
		var firstDate = new Date(dateOne);
		var secondDate = new Date(dateTwo);
		var timezoneOffsetInMs = new Date().getTimezoneOffset() * 60 * 1000;

		return Math.ceil(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

	};



	$.fn.ReturnTimeOneIsEarlierThanTimeTwo = function (timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes) {

		moment.locale('en');
		moment.suppressDeprecationWarnings = true;

		var timeOneIsEarlierThanTimeTwo = 0;

		if (typeof (timeOneHours) != "undefined" && typeof (timeOneMinutes) != "undefined" && typeof (timeTwoHours) != "undefined" && typeof (timeTwoMinutes) != "undefined") {
			var dateOne = moment().format('YYYY-MM-DD') + timeOneHours + timeOneMinutes;
			var dateTwo = moment().format('YYYY-MM-DD') + timeTwoHours + timeTwoMinutes;
			if (moment(dateOne).isBefore(dateTwo)) {
				timeOneIsEarlierThanTimeTwo = 1;
			}
		}

		return timeOneIsEarlierThanTimeTwo;
	};



	$.fn.ReturnTimeOneIsLaterThanTimeTwo = function (timeOneHours, timeOneMinutes, timeTwoHours, timeTwoMinutes) {

		moment.locale('en');
		moment.suppressDeprecationWarnings = true;

		var timeOneIsEarlierThanTimeTwo = 0;

		if (typeof (timeOneHours) != "undefined" && typeof (timeOneMinutes) != "undefined" && typeof (timeTwoHours) != "undefined" && typeof (timeTwoMinutes) != "undefined") {
			var dateOne = moment().format('YYYY-MM-DD') + timeOneHours + timeOneMinutes;
			var dateTwo = moment().format('YYYY-MM-DD') + timeTwoHours + timeTwoMinutes;
			if (moment(dateOne).isAfter(dateTwo)) {
				timeOneIsEarlierThanTimeTwo = 1;
			}
		}

		return timeOneIsEarlierThanTimeTwo;
	};



	$.fn.ReturnUserEmailStringAndArray = function (usersString) {

		var userArray = usersString.split(";#");
		var emailReturnObject = {
			array: [],
			string: ""
		};

		$.each(userArray, function (i, userDatum) {

			// if i is even
			if (i % 2 == 1) {
				userTextSplit = userArray[i].split(",#");

				emailReturnObject.array.push(userTextSplit[2]);
				if (i != 1) {
					emailReturnObject.string += ';';
				}
				emailReturnObject.string += userTextSplit[2];
			}
		});

		return emailReturnObject;
	};



	$.fn.ReturnISODateTimeFromParts = function (dateTime, keyphrase) {

		// config locale
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;


		// e.g., 
		// dateTime.date	 = April 15, 2015
		// dateTime.hour	 = T22
		// dateTime.minute  = :15:00

		dateTime.date = moment(dateTime.date, 'MMMM D, YYYY').format('YYYY-MM-DD');
		// dateTime.timezone = moment(dateTime.date, 'MMMM D, YYYY').format('Z');

		return dateTime.date + dateTime.hour + dateTime.minute + 'Z';
	};



	$.fn.RenderDateTime = function (dateTimeString, timeFlag, useYearAnyway) {

		// config locale
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;

		// default to determining year usage dynamically
		if (typeof (useYearAnyway) == "undefined") {
			useYearAnyway = 0;
		}

		// if dateTimeString is set to 'nowLocal', reset to current datetime
		if (dateTimeString == 'nowLocal') {
			dateTimeString = moment().format();
		}

		// get timezone offset as standard format string - e.g., '-0400', for Boston in the summer
		var timezoneOffsetTotalMinutes = (new Date()).getTimezoneOffset(); // e.g., 240
		var timezoneOffsetHours = Math.floor(timezoneOffsetTotalMinutes / 60); // e.g., 4
		var timezoneOffsetRemainingMinutes = timezoneOffsetTotalMinutes % (timezoneOffsetHours * 60); // 0
		var timezoneOffsetHoursZeroFilled = $().ZeroFillString(timezoneOffsetHours.toString(), 2); // '04'
		var timezoneOffsetRemainingMinutesZeroFilled = $().ZeroFillString(timezoneOffsetRemainingMinutes.toString(), 2); // '00'
		var timezoneOffsetPosOrNeg = timezoneOffsetTotalMinutes > 0 ? '-' : '+'; // '-'
		var timezoneOffsetString = timezoneOffsetPosOrNeg + timezoneOffsetHoursZeroFilled + timezoneOffsetRemainingMinutesZeroFilled; // '-0400'

		// get datetime string in iso format with local timezone
		// var dateTimeISOStringLocal = (new Date(dateTimeString.replace(" ", "T"))).toISOString().replace("Z", timezoneOffsetString); // '2025-04-15T19:56:38.000-0400'
		var dateTimeISOStringLocal = (new Date(dateTimeString.replace(" ", "T"))).toISOString(); // '2025-04-15T19:56:38.000-0400'

		// set up base display format
		var displayFormat = 'MMMM D';

		// if this date's year differs from the current year
		if (moment(dateTimeISOStringLocal).format('YYYY') != moment().format('YYYY')) {
			// append date format with year
			displayFormat += ', YYYY';
			// otherwise, if useYearAnyway flag is set to 1
		} else if (typeof (useYearAnyway) != "undefined") {
			if (useYearAnyway == 1) {
				// append date format with year
				displayFormat += ', YYYY';
			}
		}

		// if timeFlag indicates that the time should be rendered
		if (timeFlag == 1) {
			// append date format with year
			displayFormat += ' h:mm a';
		}

		// return formatted dateTimeString
		return (moment(dateTimeISOStringLocal).format(displayFormat));
	};


	// ---- CUSTOM OVERVIEW SCREENS

	$.fn.RenderAdminEventAVOverviewScreen = function () {

		// get date params
		var startDateFrom = GetParamFromUrl(location.search, 'startDateFrom');
		var startDateTo = GetParamFromUrl(location.search, 'startDateTo');

		if (startDateFrom == "") {
			startDateFrom = $().ReturnFormattedDateTime('nowLocal', null, 'YYYY-MM-DD');
		}

		if (startDateTo == "") {
			startDateTo = moment(startDateFrom, 'YYYY-MM-DD').add(14, "days").format('YYYY-MM-DD');
		}

		var tData = {
			'commonColumns': [
				{
					'displayName': 'Request ID',
					'internalName': 'ID',
					'formLink': 1
				}, {
					'displayName': 'Requested By',
					'internalName': 'RequestedBy',
					'userName': 1
				}, {
					'displayName': 'Talk To',
					'internalName': 'RequestedFor',
					'userName': 1
				}, {
					'displayName': 'Event Starts',
					'internalName': 'EventBeginningDatetime',
					'groupingFriendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'ddd, MMM D, YYYY', 'determineYearDisplayDynamically': 1 }
				}, {
					'displayName': 'Request Date',
					'internalName': 'RequestDate',
					'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
				}
			],
			'tables': [
				{
					'tableID': 'pending-approval',
					'someColsAreUsers': 1,
					'grouping': {
						'zeroIndexedColumnNumber': 3,
						'numberColsForHeaderToSpan': 4
					},
					'customCAMLQuery': '<Where>' +
						'   <And>' +
						'       <Eq>' +
						'           <FieldRef Name="RequestStatus"></FieldRef>' +
						'           <Value Type="Text">Pending Approval</Value>' +
						'       </Eq>' +
						// '       <And>' +
						// '           <Geq>' +
						// '               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						// '               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateFrom + 'T00:00:00Z</Value>' +
						// '           </Geq>' +
						// '           <Leq>' +
						// '               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						// '               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateTo + 'T00:00:00Z</Value>' +
						// '           </Leq>' +
						// '       </And>' +
						'   </And>' +
						'</Where>'
				}, {
					'tableID': 'approved',
					'someColsAreUsers': 1,
					'customCAMLQuery': '<Where>' +
						'   <And>' +
						'       <Eq>' +
						'           <FieldRef Name="RequestStatus"></FieldRef>' +
						'           <Value Type="Text">Approved</Value>' +
						'       </Eq>' +
						'       <And>' +
						'           <Geq>' +
						'               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						'               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateFrom + 'T00:00:00Z</Value>' +
						'           </Geq>' +
						'           <Leq>' +
						'               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						'               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateTo + 'T00:00:00Z</Value>' +
						'           </Leq>' +
						'       </And>' +
						'   </And>' +
						'</Where>',
					'grouping': {
						'zeroIndexedColumnNumber': 3,
						'numberColsForHeaderToSpan': 6
					},
					'customColumns': [
						{
							'displayName': 'Request ID',
							'internalName': 'ID',
							'formLink': 1
						}, {
							'displayName': 'Talk To',
							'internalName': 'RequestedFor',
							'userName': 1
						}, {
							'displayName': 'Event Name',
							'internalName': 'EventName'
						}, {
							'displayName': 'Event Date and Time',
							'internalName': 'EventBeginningDatetime',
							'groupingFriendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'ddd, MMM D, YYYY', 'determineYearDisplayDynamically': 1 }
							// }, {
							// 	'displayName': 'Start Time',
							// 	'internalName': 'EventBeginningDatetime',
							// 	'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'h:mm a' }
							// }, {
							// 	'displayName': 'End Time',
							// 	'internalName': 'EventEndingDatetime',
							// 	'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'h:mm a' }
						}, {
							'displayName': 'Request Date',
							'internalName': 'RequestDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Assigned To',
							'internalName': 'AssignedTo',
							'userName': 1
						}, {
							'displayName': 'Assignment Date',
							'internalName': 'AssignmentDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}
					],
					'sortColAndOrder': [3, 'asc']
				}, {
					'tableID': 'approved-ng',
					'someColsAreUsers': 1,
					'customCAMLQuery': '<Where>' +
						'   <And>' +
						'       <Eq>' +
						'           <FieldRef Name="RequestStatus"></FieldRef>' +
						'           <Value Type="Text">Approved</Value>' +
						'       </Eq>' +
						'       <And>' +
						'           <Geq>' +
						'               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						'               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateFrom + 'T00:00:00Z</Value>' +
						'           </Geq>' +
						'           <Leq>' +
						'               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						'               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateTo + 'T00:00:00Z</Value>' +
						'           </Leq>' +
						'       </And>' +
						'   </And>' +
						'</Where>',
					'customColumns': [
						{
							'displayName': 'Request ID',
							'internalName': 'ID',
							'formLink': 1
						}, {
							'displayName': 'Talk To',
							'internalName': 'RequestedFor',
							'userName': 1
						}, {
							'displayName': 'Event Name',
							'internalName': 'EventName'
							// }, {
							// 	'displayName': 'Event Date',
							// 	'internalName': 'EventBeginningDatetime',
							// 	'groupingFriendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'ddd, MMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Event Start Date & Time',
							'internalName': 'EventBeginningDatetime',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'ddd, MMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Event End Date & Time',
							'internalName': 'EventEndingDatetime',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'ddd, MMM D, YYYY h:mm a', 'determineYearDisplayDynamically': 1 }
							// }, {
							// 	'displayName': 'Request Date',
							// 	'internalName': 'RequestDate',
							// 	'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Assigned To',
							'internalName': 'AssignedTo',
							'userName': 1
						}, {
							'displayName': 'Assignment Date',
							'internalName': 'AssignmentDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}
					],
					'sortColAndOrder': [3, 'asc']

				}, {
					'tableID': 'closed',
					'someColsAreUsers': 1,
					'grouping': {
						'zeroIndexedColumnNumber': 4,
						'numberColsForHeaderToSpan': 9
					},
					'customCAMLQuery': '<Where>' +
						'   <And>' +
						'       <Eq>' +
						'           <FieldRef Name="EndOfLife"></FieldRef>' +
						'           <Value Type="Text">1</Value>' +
						'       </Eq>' +
						'       <And>' +
						'           <Geq>' +
						'               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						'               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateFrom + 'T00:00:00Z</Value>' +
						'           </Geq>' +
						'           <Leq>' +
						'               <FieldRef Name="EventBeginningDatetime"></FieldRef>' +
						'               <Value Type="DateTime" IncludeTimeValue="FALSE">' + startDateTo + 'T00:00:00Z</Value>' +
						'           </Leq>' +
						'       </And>' +
						'   </And>' +
						'</Where>',
					'customColumns': [
						{
							'displayName': 'Request ID',
							'internalName': 'ID',
							'formLink': 1
						}, {
							'displayName': 'Request Status',
							'internalName': 'RequestStatus'
						}, {
							'displayName': 'Requested By',
							'internalName': 'RequestedBy',
							'userName': 1
						}, {
							'displayName': 'Talk To',
							'internalName': 'RequestedFor',
							'userName': 1
						}, {
							'displayName': 'Event Date and Time',
							'internalName': 'EventBeginningDatetime',
							'groupingFriendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'ddd, MMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Request Date',
							'internalName': 'RequestDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Assigned To',
							'internalName': 'AssignedTo',
							'userName': 1
						}, {
							'displayName': 'Assignment Date',
							'internalName': 'AssignmentDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}, {
							'displayName': 'Completed By',
							'internalName': 'CompletedBy',
							'userName': 1
						}, {
							'displayName': 'Completion Date',
							'internalName': 'CompletionDate',
							'friendlyFormatOnLoad': { 'incomingFormat': null, 'returnFormat': 'MMMM D, YYYY', 'determineYearDisplayDynamically': 1 }
						}
					]
				}
			]
		};

		// insert container and sub-containers
		$("div#overview-table-container").prepend('<div id="container_command-bar-and-tables"> \n' +
			'   <div id="container_command-bar"></div> \n' +
			'   <div id="table-container"></div> \n' +
			'</div>');

		var commandBarContents = '<h2 id="header_command-bar">Commands</h2> \n' +
			'<div id="container_new-request-control"> \n' +
			'   <a class="button-link button-link_new-item button_swf-new-request-with-datatable" data-button-type="newRequest" href="/sites/' + mData.siteToken + '/SitePages/App.aspx?r=0">New Request</a> \n' +
			'</div> \n' +
			'<ul id="container_tab-controls"> \n' +
			'   <li><a href="#table-container_pending-approval">Pending Approval</a></li> \n' +
			'   <li><a href="#table-container_approved">Approved</a></li> \n' +
			'   <li><a href="#table-container_approved-ng">Approved NG</a></li> \n' +
			'   <li><a href="#table-container_closed">Closed</a></li> \n' +
			'</ul> \n' +
			'<div id="container_date-filter-controls-and-header"> \n' +
			'   <div id="text_date-filter-controls" class="collapsible">Dates</div> \n' +
			'   <div id="container_date-filter-controls"> \n' +
			'        <div id="date-filter-controls-notice">Date filters are effective for Approved and Closed requests.</div> \n' +
			'        <div class="container_date-filter-control"> \n' +
			'            <label class="date-selector-label" for="filter--start-date_from">Start Date From</label> \n' +
			'            <input class="date-selector" id="filter--start-date_from" name="filter--start-date_from" type="text"> \n' +
			'        </div> \n' +
			'        <div class="container_date-filter-control"> \n' +
			'            <label class="date-selector-label" for="filter--start-date_to">Start Date To</label> \n' +
			'            <input class="date-selector" id="filter--start-date_to" name="filter--start-date_to" type="text"> \n' +
			'        </div> \n' +
			'        <div class="container_date-filter-control"> \n' +
			'            <a id="filter--submit-button">Update</a> \n' +
			'        </div> \n' +
			'    </div> \n' +
			'</div> \n';


		$().RenderAllDataTables(tData, "table-container");

		// insert contents into containers
		$("div#container_command-bar").html(commandBarContents);

		// turn some command bar elements into tab controls and the turn the corresponding contents into tabbed content
		$("div#container_command-bar-and-tables").tabs();

		// set datepickers on date filter fields
		$("input#filter--start-date_to, input#filter--start-date_from").datepicker({
			changeMonth: "true",
			changeYear: "true",
			dateFormat: "MM d, yy"
		});

		// set currently-used dates into date fields
		$("input#filter--start-date_from").val(moment(startDateFrom, 'YYYY-MM-DD').format('MMMM D, YYYY'));
		$("input#filter--start-date_to").val(moment(startDateTo, 'YYYY-MM-DD').format('MMMM D, YYYY'));

		// collapse collapsible
		$('.collapsible').collapsible();

		// listen for date filtering
		$("a#filter--submit-button").click(function () {

			var startDateFromFieldValue = $("input#filter--start-date_from").val();
			var startDateToFieldValue = $("input#filter--start-date_to").val();

			if (startDateFromFieldValue == "") {
				startDateFromFieldValue = $().ReturnFormattedDateTime('nowLocal', null, 'MMMM D, YYYY');
			}

			if (startDateToFieldValue == "") {
				startDateToFieldValue = moment(startDateFromFieldValue, 'MMMM D, YYYY').add(14, "days").format('MMMM D, YYYY');
			}

			var newStartDateFrom = $().ReturnFormattedDateTime(startDateFromFieldValue, null, 'YYYY-MM-DD');
			var newStartDateTo = $().ReturnFormattedDateTime(startDateToFieldValue, null, 'YYYY-MM-DD');

			window.location = "/sites/" + mData.siteToken + "/SitePages/App.aspx?startDateFrom=" + newStartDateFrom + "&startDateTo=" + newStartDateTo;
		});
	};


	// ---- DATATABLES


	$.fn.RenderAllDataTables = function (sections, targetID) {

		$.each(sections.tables, function (i, t) {

			// var setupStartTime = Date.now();

			var columns = [];
			var query = '';
			var camlViewFields = "";
			var lookupFields = [];
			var datatableFields = [];
			var theadDetails = "";

			if (typeof (t.customColumns) != "undefined") {
				columns = t.customColumns;
			} else {
				columns = sections.commonColumns;
			}

			if (typeof (t.sortColAndOrder) == 'undefined') {
				t.sortColAndOrder = [0, 'asc'];
			}

			if (typeof (t.webURL) == 'undefined') {
				mData = $.extend(
					$().GetFieldsFromOneRow({
						"listName": "ComponentLog",
						"select": [{
							"nameHere": "uriRoot",
							"nameInList": "URIRoot",
							"linkField": 1
						}],
						"where": {
							"field": "ComponentID",
							"type": "Number",
							"value": mData.componentID,
						}
					}),
					mData
				);

				t.webURL = StrInStr(mData.uriRoot, '/Lists/SWFList', 1);
			}

			$.each(columns, function (i, column) {
				if (column.internalName != "") {
					camlViewFields += "<FieldRef Name='" + column.internalName + "' />";
					datatableFields.push({
						"data": column.internalName
					});
				}
				if (column.displayName != "") {
					theadDetails += "<th>" + column.displayName + "</th>";
				}
				if (column.internalName != "" && typeof (column.formLink) !== "undefined") {
					lookupFields.push({
						"internalName": column.internalName,
						"anchorNoHref": 0,
						"formLink": column.formLink,
						"userName": 0,
						"friendlyFormatOnLoad": 0,
						"groupingFriendlyFormatOnLoad": 0
					});
				} else if (column.internalName != "" && typeof (column.anchorNoHref) !== "undefined") {
					lookupFields.push({
						"internalName": column.internalName,
						"anchorNoHref": column.anchorNoHref,
						"formLink": 0,
						"userName": 0,
						"friendlyFormatOnLoad": 0,
						"groupingFriendlyFormatOnLoad": 0
					});
				} else if (column.internalName != "" && typeof (column.userName) !== "undefined") {
					lookupFields.push({
						"internalName": column.internalName,
						"anchorNoHref": 0,
						"formLink": 0,
						"userName": column.userName,
						"friendlyFormatOnLoad": 0,
						"groupingFriendlyFormatOnLoad": 0
					});
				} else if (column.internalName != "" && typeof (column.friendlyFormatOnLoad) !== "undefined") {
					lookupFields.push({
						"internalName": column.internalName,
						"anchorNoHref": 0,
						"formLink": 0,
						"userName": 0,
						"friendlyFormatOnLoad": column.friendlyFormatOnLoad,
						"groupingFriendlyFormatOnLoad": 0
					});
				} else if (column.internalName != "" && typeof (column.groupingFriendlyFormatOnLoad) !== "undefined") {
					lookupFields.push({
						"internalName": column.internalName,
						"anchorNoHref": 0,
						"formLink": 0,
						"userName": 0,
						"friendlyFormatOnLoad": 0,
						"groupingFriendlyFormatOnLoad": column.groupingFriendlyFormatOnLoad
					});
				} else {
					lookupFields.push({
						"internalName": column.internalName,
						"anchorNoHref": 0,
						"formLink": 0,
						"userName": 0,
						"friendlyFormatOnLoad": 0,
						"groupingFriendlyFormatOnLoad": 0
					});
				}
			});

			if (typeof (t.basicRSQueryRelevantStatus) != "undefined") {
				query = "<Where>" +
					"	<Eq>" +
					"		 <FieldRef Name='RequestStatus'></FieldRef>" +
					"		 <Value Type='Text'>" + t.basicRSQueryRelevantStatus + "</Value>" +
					"	</Eq>" +
					"</Where>";
			} else if (typeof (t.basicRSQueryTwoRelevantStatuses) != "undefined") {
				query = "<Where>" +
					"	<Or>" +
					"		<Eq>" +
					"			<FieldRef Name='RequestStatus'></FieldRef>" +
					"			<Value Type='Text'>" + t.basicRSQueryTwoRelevantStatuses[0] + "</Value>" +
					"		</Eq>" +
					"		<Eq>" +
					"			<FieldRef Name='RequestStatus'></FieldRef>" +
					"			<Value Type='Text'>" + t.basicRSQueryTwoRelevantStatuses[1] + "</Value>" +
					"		</Eq>" +
					"	</Or>" +
					"</Where>";
			} else if (typeof (t.myRSQueryTwoRelevantStatuses) != "undefined") {

				if (typeof (mData.getRequesterFrom) == 'undefined') {
					var getRequesterFrom = 'Author';
				} else {
					var getRequesterFrom = mData.getRequesterFrom;
				}

				query = "<Where>" +
					"	<And>" +
					"	<Or>" +
					"		<Eq>" +
					"			<FieldRef Name='RequestStatus'></FieldRef>" +
					"			<Value Type='Text'>" + t.myRSQueryTwoRelevantStatuses[0] + "</Value>" +
					"		</Eq>" +
					"		<Eq>" +
					"			<FieldRef Name='RequestStatus'></FieldRef>" +
					"			<Value Type='Text'>" + t.myRSQueryTwoRelevantStatuses[1] + "</Value>" +
					"		</Eq>" +
					"	</Or>" +
					"		 <Contains>" +
					"			  <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
					"			  <Value Type='Text'>" + uData.name + "</Value>" +
					"		 </Contains>" +
					"	</And>" +
					"</Where>";
			} else if (typeof (t.myRSQueryRelevantStatus) != "undefined") {

				var getRequesterFrom = 'Author';
				if (t.getRequesterFrom) {
					getRequesterFrom = t.getRequesterFrom;
				}
				if (mData.getRequesterFrom) {
					getRequesterFrom = mData.getRequesterFrom;
				}

				query = "<Where>" +
					"	<And>" +
					"		 <Eq>" +
					"			  <FieldRef Name='RequestStatus'></FieldRef>" +
					"			  <Value Type='Text'>" + t.myRSQueryRelevantStatus + "</Value>" +
					"		 </Eq>" +
					"		 <Contains>" +
					"			  <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
					"			  <Value Type='Text'>" + uData.name + "</Value>" +
					"		 </Contains>" +
					"	</And>" +
					"</Where>";
				/* } else if (typeof (t.myRSQueryRelevantStatus) != "undefined") {
	
					if (typeof (mData.getRequesterFrom) == 'undefined') {
						var getRequesterFrom = 'Author';
					} else {
						var getRequesterFrom = mData.getRequesterFrom;
					}
	
					query = "<Where>" +
						"	<And>" +
						"		 <Eq>" +
						"			  <FieldRef Name='RequestStatus'></FieldRef>" +
						"			  <Value Type='Text'>" + t.myRSQueryRelevantStatus + "</Value>" +
						"		 </Eq>" +
						"		 <Contains>" +
						"			  <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
						"			  <Value Type='Text'>" + uData.name + "</Value>" +
						"		 </Contains>" +
						"	</And>" +
						"</Where>"; */









			} else if (typeof (t.myRSQueryRelevantStatusUnassigned) != "undefined") {
				if (typeof (mData.getRequesterFrom) == 'undefined') {
					var getRequesterFrom = 'Author';
				} else {
					var getRequesterFrom = mData.getRequesterFrom;
				}

				query = "<Where>" +
					"	<And>" +
					"		<And>" +
					"			<Eq>" +
					"				<FieldRef Name='RequestStatus'></FieldRef>" +
					"				<Value Type='Text'>" + t.myRSQueryRelevantStatus + "</Value>" +
					"			</Eq>" +
					"			<IsNull>" +
					"				<FieldRef Name='AssignedTo'></FieldRef>" +
					"			</IsNull>" +
					"		</And>" +
					"		<Contains>" +
					"			<FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
					"			<Value Type='Text'>" + uData.name + "</Value>" +
					"		 </Contains>" +
					"	</And>" +
					"</Where>";

			} else if (typeof (t.myRSQueryRelevantStatusAssigned) != "undefined") {
				if (typeof (mData.getRequesterFrom) == 'undefined') {
					var getRequesterFrom = 'Author';
				} else {
					var getRequesterFrom = mData.getRequesterFrom;
				}

				query = "<Where>" +
					"	<And>" +
					"		<And>" +
					"			<Eq>" +
					"				<FieldRef Name='RequestStatus'></FieldRef>" +
					"				<Value Type='Text'>" + t.myRSQueryRelevantStatus + "</Value>" +
					"			</Eq>" +
					"			<IsNotNull>" +
					"				<FieldRef Name='AssignedTo'></FieldRef>" +
					"			</IsNotNull>" +
					"		</And>" +
					"		<Contains>" +
					"			<FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
					"			<Value Type='Text'>" + uData.name + "</Value>" +
					"		 </Contains>" +
					"	</And>" +
					"</Where>";

			} else if (typeof (t.fieldGEQDaysBeforeToday) != "undefined") {
				query = "<Where>" +
					"	<Geq>" +
					"		 <FieldRef Name='" + t.fieldGEQDaysBeforeToday[0] + "'></FieldRef>" +
					"		 <Value Type='DateTime'>" +
					"			  <Today OffsetDays='" + (-1 * t.fieldGEQDaysBeforeToday[1]) + "' />" +
					"		 </Value>" +
					"	</Geq>" +
					"</Where>";
			} else if (typeof (t.rsQueryAndFieldGEQDate) != "undefined") {
				query = "<Where>" +
					"	 <And>" +
					"		  <Eq>" +
					"				<FieldRef Name='RequestStatus'></FieldRef>" +
					"				<Value Type='Text'>" + t.rsQueryAndFieldGEQDate[0] + "</Value>" +
					"		  </Eq>" +
					"		  <Geq>" +
					"			  <FieldRef Name='" + t.rsQueryAndFieldGEQDate[1] + "'></FieldRef>" +
					"			  <Value Type='DateTime'>" + t.rsQueryAndFieldGEQDate[2] + "</Value>" +
					"		  </Geq>" +
					"	 </And>" +
					"</Where>";
			} else if (typeof (t.rsQueryAndFieldLTDate) != "undefined") {
				query = "<Where>" +
					"	 <And>" +
					"		  <Eq>" +
					"				<FieldRef Name='RequestStatus'></FieldRef>" +
					"				<Value Type='Text'>" + t.rsQueryAndFieldLTDate[0] + "</Value>" +
					"		  </Eq>" +
					"		  <Lt>" +
					"			  <FieldRef Name='" + t.rsQueryAndFieldLTDate[1] + "'></FieldRef>" +
					"			  <Value Type='DateTime'>" + t.rsQueryAndFieldLTDate[2] + "</Value>" +
					"		  </Lt>" +
					"	 </And>" +
					"</Where>";
			} else if (typeof (t.rsQueryAndFieldGEQDaysBeforeToday) != "undefined") {
				query = "<Where>" +
					"	 <And>" +
					"		  <Eq>" +
					"				<FieldRef Name='RequestStatus'></FieldRef>" +
					"				<Value Type='Text'>" + t.rsQueryAndFieldGEQDaysBeforeToday[0] + "</Value>" +
					"		  </Eq>" +
					"		  <Geq>" +
					"			  <FieldRef Name='" + t.rsQueryAndFieldGEQDaysBeforeToday[1] + "'></FieldRef>" +
					"			  <Value Type='DateTime'>" +
					"					<Today OffsetDays='" + (-1 * t.rsQueryAndFieldGEQDaysBeforeToday[2]) + "' />" +
					"			  </Value>" +
					"		  </Geq>" +
					"	 </And>" +
					"</Where>";
			} else if (typeof (t.MyRSQueryAndFieldGEQDate) != "undefined") {

				var myName = $().SPServices.SPGetCurrentUser({
					fieldName: "Title",
					debug: false
				});

				if (typeof (mData.getRequesterFrom) == 'undefined') {
					var getRequesterFrom = 'Author';
				} else {
					var getRequesterFrom = mData.getRequesterFrom;
				}

				query = "<Where>" +
					"	 <And>" +
					"		  <Eq>" +
					"				<FieldRef Name='RequestStatus'></FieldRef>" +
					"				<Value Type='Text'>" + t.MyRSQueryAndFieldGEQDate[0] + "</Value>" +
					"		  </Eq>" +
					"		  <And>" +
					"			  <Geq>" +
					"					<FieldRef Name='" + t.MyRSQueryAndFieldGEQDate[1] + "'></FieldRef>" +
					"					<Value Type='DateTime'>" + t.MyRSQueryAndFieldGEQDate[2] + "</Value>" +
					"			  </Geq>" +
					"			  <Contains>" +
					"					<FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
					"					<Value Type='Text'>" + uData.name + "</Value>" +
					"			  </Contains>" +
					"		 </And>" +
					"	</And>" +
					"</Where>";
			} else if (typeof (t.MyRSQueryAndFieldLTDate) != "undefined") {

				var myName = $().SPServices.SPGetCurrentUser({
					fieldName: "Title",
					debug: false
				});

				if (typeof (mData.getRequesterFrom) == 'undefined') {
					var getRequesterFrom = 'Author';
				} else {
					var getRequesterFrom = mData.getRequesterFrom;
				}

				query = "<Where>" +
					"	 <And>" +
					"		  <Eq>" +
					"				<FieldRef Name='RequestStatus'></FieldRef>" +
					"				<Value Type='Text'>" + t.MyRSQueryAndFieldLTDate[0] + "</Value>" +
					"		  </Eq>" +
					"		  <And>" +
					"			  <Lt>" +
					"					<FieldRef Name='" + t.MyRSQueryAndFieldLTDate[1] + "'></FieldRef>" +
					"					<Value Type='DateTime'>" + t.MyRSQueryAndFieldLTDate[2] + "</Value>" +
					"			  </Lt>" +
					"			  <Contains>" +
					"					<FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
					"					<Value Type='Text'>" + uData.name + "</Value>" +
					"			  </Contains>" +
					"		  </And>" +
					"	 </And>" +
					"</Where>";
			} else if (typeof (t.basicEOLQueryRelevantValue) != "undefined") {
				if (t.basicEOLQueryRelevantValue == 0) {
					query = "<Where>" +
						"	<Or>" +
						"		 <Eq>" +
						"			  <FieldRef Name='EndOfLife'></FieldRef>" +
						"			  <Value Type='Text'>0</Value>" +
						"		  </Eq>" +
						"		 <IsNull>" +
						"			  <FieldRef Name='EndOfLife'></FieldRef>" +
						"		 </IsNull>" +
						"	</Or>" +
						"</Where>";
				} else if (t.basicEOLQueryRelevantValue == 1) {
					query = "<Where>" +
						"	<Eq>" +
						"		 <FieldRef Name='EndOfLife'></FieldRef>" +
						"		 <Value Type='Text'>1</Value>" +
						"	</Eq>" +
						"</Where>";
				}
			} else if (typeof (t.basicMyEOLQueryRelevantValue) != "undefined") {

				var myName = $().SPServices.SPGetCurrentUser({
					fieldName: "Title",
					debug: false
				});

				var getRequesterFrom = 'Author';


				if (mData.getRequesterFrom) {
					getRequesterFrom = mData.getRequesterFrom;
				}
				if (t.getRequesterFrom) {
					getRequesterFrom = t.getRequesterFrom;
				}

				if (t.basicMyEOLQueryRelevantValue == 0) {
					query = "<Where>" +
						"	<And>" +
						"		<Or>" +
						"			 <Eq>" +
						"				  <FieldRef Name='EndOfLife'></FieldRef>" +
						"				  <Value Type='Text'>0</Value>" +
						"			  </Eq>" +
						"			 <IsNull>" +
						"				  <FieldRef Name='EndOfLife'></FieldRef>" +
						"			 </IsNull>" +
						"		</Or>" +
						"		 <Contains>" +
						"			  <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
						"			  <Value Type='Text'>" + uData.name + "</Value>" +
						"		 </Contains>" +
						"	</And>" +
						"</Where>";
				} else if (t.basicMyEOLQueryRelevantValue == 1) {
					query = "<Where>" +
						"	<And>" +
						"		 <Eq>" +
						"			  <FieldRef Name='EndOfLife'></FieldRef>" +
						"			  <Value Type='Text'>1</Value>" +
						"		 </Eq>" +
						"		 <Contains>" +
						"			  <FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
						"			  <Value Type='Text'>" + uData.name + "</Value>" +
						"		 </Contains>" +
						"	</And>" +
						"</Where>";
				}
			} else if (typeof (t.basicMyAllQueryRelevantValue) != "undefined") {

				var myName = $().SPServices.SPGetCurrentUser({
					fieldName: "Title",
					debug: false
				});

				if (typeof (mData.getRequesterFrom) == 'undefined') {
					var getRequesterFrom = 'Author';
				} else {
					var getRequesterFrom = mData.getRequesterFrom;
				}

				query = "<Where>" +
					"	<Contains>" +
					"		<FieldRef Name='" + getRequesterFrom + "'></FieldRef>" +
					"			<Value Type='Text'>" + uData.name + "</Value>" +
					"		</Contains>" +
					"</Where>";
			} else if (typeof (t.customCAMLQuery) != "undefined") {
				query = ReplaceAll('myName', uData.name, t.customCAMLQuery);
			}

			var listForDatatable = $().GetListDataForDatatable({
				'listName': 'SWFList',
				'webURL': t.webURL,
				'query': query,
				'someColsAreUsers': t.someColsAreUsers,
				'viewFields': camlViewFields,
				'lookupFields': lookupFields,
				'formURI': mData.formURI,
				'returnURI': mData.returnURI
			});

			$().RenderListAsDatatable({
				'tableTitle': t.tableTitle,
				'tableID': t.tableID,
				'theadDetails': theadDetails,
				'listForDatatable': listForDatatable,
				'datatableFields': datatableFields,
				'sortColAndOrder': t.sortColAndOrder,
				'grouping': t.grouping,
				'targetID': targetID,
			});
		});
	};



	$.fn.GetListDataForDatatable = function (options) {

		var returnValue = [];
		var opt = options;
		var fields = "<ViewFields>" +
			opt.viewFields +
			"</ViewFields>";

		var query = "<Query>" +
			opt.query +
			"</Query>";

		var queryOptions = "<QueryOptions></QueryOptions>";
		if (opt.someColsAreUsers == 1) {
			queryOptions = "<QueryOptions><ExpandUserField>TRUE</ExpandUserField></QueryOptions>"
		}

		$().SPServices({
			operation: "GetListItems",
			async: false,
			listName: opt.listName,
			webURL: opt.webURL,
			CAMLViewFields: fields,
			CAMLQuery: query,
			CAMLQueryOptions: queryOptions,
			completefunc: function (xData, Status) {

				// iterate through every list item returned
				$(xData.responseXML).SPFilterNode("z:row").each(function () {

					var thisItem = $(this);
					var itemDataForReturn = {};

					$.each(opt.lookupFields, function (i, lookupField) {

						if (typeof (thisItem.attr("ows_" + lookupField.internalName)) === "undefined") {
							itemDataForReturn[lookupField.internalName] = "";
						} else {

							if (lookupField.formLink == 1) {

								var thisRequestID = thisItem.attr("ows_" + lookupField.internalName);

								itemDataForReturn[lookupField.internalName] = "<a href = \"" + mData.fullSiteBaseURL + "/SitePages/App.aspx?r=" + thisRequestID +
									"\" data-button-type=\"existingRequest\" " +
									"data-request-id=\"" + thisRequestID + "\"" +
									"class=\"link_request-id\">" +
									thisRequestID + "</a>";

							} else if (lookupField.anchorNoHref == 1) {

								itemDataForReturn[lookupField.internalName] = "<a class='anchor_no-href'>" + thisItem.attr("ows_" + lookupField.internalName) + "</a>";

							} else if (lookupField.userName == 1) {

								itemDataForReturn[lookupField.internalName] = $().RenderPersonLinks(thisItem.attr("ows_" + lookupField.internalName));

							} else if (lookupField.friendlyFormatOnLoad != 0) {

								itemDataForReturn[lookupField.internalName] = $().ReturnSortableDate(thisItem.attr("ows_" + lookupField.internalName), lookupField.friendlyFormatOnLoad.incomingFormat, lookupField.friendlyFormatOnLoad.returnFormat, lookupField.friendlyFormatOnLoad.determineYearDisplayDynamically);

							} else if (lookupField.groupingFriendlyFormatOnLoad != 0) {

								itemDataForReturn[lookupField.internalName] = $().ReturnFormattedDateTime(thisItem.attr("ows_" + lookupField.internalName), lookupField.groupingFriendlyFormatOnLoad.incomingFormat, lookupField.groupingFriendlyFormatOnLoad.returnFormat, lookupField.groupingFriendlyFormatOnLoad.determineYearDisplayDynamically);

							} else {

								itemDataForReturn[lookupField.internalName] = thisItem.attr("ows_" + lookupField.internalName);

							}
						}

					});

					returnValue.push(itemDataForReturn);
				});
			}
		});

		return returnValue;
	};



	$.fn.RenderPersonLinks = function (usersString) {

		// console.log(usersString);

		var returnValue = "";
		var userArray = usersString.split(";#");

		$.each(userArray, function (i, userData) {

			if (isNaN(userData) != false) {

				var userDataSplit = userData.split("#");

				if (StrInStr(userDataSplit[4], "@mos.org,", 1) != false) {
					var userID = StrInStr(userDataSplit[4], "@mos.org,", 1);
				} else if (StrInStr(userDataSplit[4], "@MOS.ORG,", 1) != false) {
					var userID = StrInStr(userDataSplit[4], "@MOS.ORG,", 1);
				} else {
					var userID = userDataSplit[4];
				}

				if (StrInStr(userDataSplit[5], ",", 1) == false) {
					var userName = userDataSplit[5];
				} else {
					var userName = StrInStr(userDataSplit[5], ",", 1);
				}

				returnValue += '<div><a href="https://bmos-my.sharepoint.com/person.aspx?user=' + userID + '" target="_blank">' + userName + '</a></div>';
			}
		});

		return returnValue;
	};



	$.fn.ReturnSortableDate = function (dateTimeString, incomingFormat, returnFormat, determineYearDisplayDynamically) {

		// set up vars
		var retVal = '';

		retVal += '<span style="display: none">';
		retVal += $().ReturnFormattedDateTime(dateTimeString, incomingFormat, 'YYYY-MM-DD HH:mm', 0);
		retVal += '</span>';
		retVal += $().ReturnFormattedDateTime(dateTimeString, incomingFormat, returnFormat, determineYearDisplayDynamically);

		return retVal;
	};



	$.fn.ReturnFormattedDateTime = function (dateTimeString, incomingFormat, returnFormat, determineYearDisplayDynamically) {

		// config locale
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;

		// set up vars
		var retVal = '';

		// if dateTimeString is set to 'nowLocal', reset to string representing current datetime
		if (dateTimeString == 'nowLocal') {
			dateTimeString = moment().format();
		}

		// if dateTimeString is set to 'nowUTC', reset to string representing current datetime
		if (dateTimeString == 'nowUTC') {
			dateTimeString = moment().format('YYYY-MM-DDTHH:mm:ssZ');
		}

		// if need to determine year display dynamically
		//		(essentially, we'll only display year if it's not the current year)
		if (typeof (determineYearDisplayDynamically) != "undefined") {
			if (determineYearDisplayDynamically == 1) {

				// if there's an incoming format
				if (incomingFormat != null) {
					// use that to to parse dateTimeString's year
					var dateTimeStringYear = moment(dateTimeString, incomingFormat).format('YYYY');
					// otherwise
				} else {
					// assume dateTimeString is in ISO format
					var dateTimeStringYear = moment(dateTimeString).format('YYYY');
				}

				// if dateTimeString's year != the current year
				if (moment(dateTimeString).format('YYYY') != moment().format('YYYY')) {
					// set flag to display year
					var displayYear = 1;
					// otherwise
				} else {
					// set flag to not display year
					var displayYear = 0;
				}

				// if displayYear == 1 and returnFormat doesn't contain the year
				if (displayYear == 1 && StrInStr(returnFormat, ', YYYY', 0) == false) {
					// add the year to returnFormat
					returnFormat += ', YYYY';
				}
				// if displayYear == 0 and returnFormat DOES contain the year
				if (displayYear == 0 && StrInStr(returnFormat, ', YYYY', 0) != false) {
					// remove the year from returnFormat
					returnFormat = ReplaceAll(', YYYY', '', returnFormat);
				}
			}
		}

		// if incoming format is null, assume dateTimeString is in iso format
		if (incomingFormat == null) {
			// if return format is null
			if (returnFormat == null) {
				// use iso format to format dateTimeString
				retVal += moment(dateTimeString, incomingFormat).format();
				// if return format is not null
			} else {
				// use return format to format dateTimeString
				retVal += moment(dateTimeString, incomingFormat).format(returnFormat);
			}

			// if incoming format is not null, use it to parse dateTimeString
		} else {

			// if incomingFormat contains ', YYYY' and dateTimeString doesn't end with that value and determineYearDisplayDynamically == 1
			//  (E.g., incomingFormat == 'MMMM D, YYYY' and dateTimeString is only 'February 14'
			if (StrInStr(incomingFormat, ', YYYY') != false && StrInStr(dateTimeString, ', 2') == false && typeof (determineYearDisplayDynamically) != "undefined" && determineYearDisplayDynamically == 1) {
				// augment with the current year
				//  (since determineYearDisplayDynamically == 1, should be safe assumption (until it isn't))
				dateTimeString += ', ' + moment().format('YYYY');
			}

			// if return format is null
			if (returnFormat == null) {
				// use iso format to format dateTimeString
				retVal += moment(dateTimeString, incomingFormat).format();

				// if return format is not null
			} else {
				// use return format to format dateTimeString
				retVal += moment(dateTimeString, incomingFormat).format(returnFormat);
			}
		}

		return retVal;
	};



	$.fn.ReturnButtonLink = function (linkType, anchorText, href, idValue, classValues, target) {
		var newLink = "<a";
		if (typeof (idValue) != "undefined" && idValue != null && idValue != "") {
			newLink += " id=\"" + idValue + "\"";
		}

		newLink += " class=\"button-link";

		switch (linkType) {

			case "newItem":
				newLink += " button-link_new-item";
				break;

			case "goForward":
				newLink += " button-link_go-forward";
				break;
		}

		if (typeof (classValues) != "undefined" && classValues != null && classValues != "") {
			newLink += " " + classValues;
		}
		newLink += "\"";
		if (typeof (target) != "undefined" && target != null && target != "") {
			newLink += " target=\"" + target + "\"";
		}

		if (linkType == "newItem") {
			newLink += "data-button-type=\"newRequest\" href=\"" + mData.fullSiteBaseURL + "/SitePages/App.aspx?r=0\""
		}

		if (typeof (href) != "undefined" && href != null && href != "") {
			newLink += " href=\"" + href + "\"";
		}

		newLink += ">" + anchorText + "</a>";

		return newLink;
	};



	$.fn.RenderSWFNewRequestButton = function () {
		$("#overview-table-container").before($().ReturnButtonLink("newItem", "New Request", null, "", "button_swf-new-request-with-datatable"));
	};



	$.fn.RenderAdditionalButtons = function (buttons) {
		var buttonsMarkup = "";
		$.each(buttons, function (i, button) {
			// business rule: even if there's a function restricting rendering permission, the button will always render for admins; if this changes, 
			//		will need to update GPC requests
			if (uData.isAdmin === 1 || typeof (button.renderPermissionsFunction) == "undefined") {
				buttonsMarkup += $().ReturnButtonLink(button.linkType, button.anchorText, button.href, button.idValue, button.classValues, button.target);
			} else {
				if (CallFunctionFromString(button.renderPermissionsFunction) === 1) {
					buttonsMarkup += $().ReturnButtonLink(button.linkType, button.anchorText, button.href, button.idValue, button.classValues, button.target);
				}
			}
		});
		$("#overview-table-container").before(buttonsMarkup);
	};



	$.fn.RenderListAsDatatable = function (options) {

		var opt = options;

		var tableMarkup = '<div id="table-container_' + opt.tableID + '"> \n';

		if (typeof (opt.tableTitle) != "undefined") {
			tableMarkup += '<h2 id="header_' + opt.tableID + '">' + opt.tableTitle + '</h2>';
		}

		if (typeof (opt.listForDatatable[0]) == "undefined") {
			tableMarkup += '<p class="message_no-requests-found">No requests found</p></div>';
			$("#" + opt.targetID).append(tableMarkup);
		} else {
			tableMarkup += '<table id="' + opt.tableID + '"><thead><tr>' + opt.theadDetails + '</tr></thead></table>';
			$("#" + opt.targetID).append(tableMarkup);

			if (typeof (opt.grouping) == "undefined") {
				opt.columnDefs = [];
				opt.groupingFunction = function () { };
			} else {

				opt.columnDefs = [{ "visible": false, "targets": opt.grouping.zeroIndexedColumnNumber }];

				opt.groupingFunction = function () {

					var api = this.api();
					var rows = api.rows({ page: 'current' }).nodes();
					var last = null;

					api.column(opt.grouping.zeroIndexedColumnNumber, { page: 'current' }).data().each(function (group, i) {
						if (last !== group) {
							$(rows).eq(i).before('<tr class="group"><td colspan="' + opt.grouping.numberColsForHeaderToSpan + '">' + group + '</td></tr>');
							last = group;
						}
					});

					var tracker = 0;

					$("table#" + opt.tableID + " > tbody > tr").each(function () {
						if ($(this).hasClass("group")) {
							tracker = 0;
						} else {
							tracker++;
							$(this).removeClass("odd even");
							if (tracker % 2 == 0) {
								$(this).addClass("even");
							} else {
								$(this).addClass("odd");
							}
						}
					});
				};
			}

			$("#" + opt.tableID).DataTable({
				"data": opt.listForDatatable,
				"columns": opt.datatableFields,
				"dom": "ftp",
				"pageLength": 30,
				"pagingType": "simple",
				"order": opt.sortColAndOrder,
				"drawCallback": opt.groupingFunction,
				"columnDefs": opt.columnDefs,
				"autoWidth": false
			});
		}
	};



	$.fn.GetMondayThisWeekAsISODateString = function (relevantMondayISODateString) {
		var today = new Date();
		var day = today.getDay();
		var mondayThisWeekAsISODateString = moment().subtract(day - 1, 'days').format("YYYY-MM-DD");
		return mondayThisWeekAsISODateString;
	};



	$.fn.GenerateDatesForEveryXDaysEndNever = function (xVar, startDate) {
		// daily - every X days - custom start date - no end date
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var xVar = 3; // every X days
		//var startDate = "01/03/2016";
		var maxOccurrences = (365 * 5) / xVar;
		var ocurrencePattern = moment(startDate).subtract(xVar, 'days').recur().every(xVar).days();
		return ocurrencePattern.next(maxOccurrences, "L");
	};



	$.fn.GenerateDatesForEveryXDaysEndAfterYOccurrences = function (xVar, startDate, yVar) {
		// daily - every X days - custom start date - end after Y occurrences
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var xVar = 5; // every X days
		//var yVar = 5; // end after Y occurrences
		//var startDate = "01/01/2016";
		var ocurrencePattern = moment(startDate).subtract(xVar, 'days').recur().every(xVar).days();
		return ocurrencePattern.next(yVar, "L");
	};



	$.fn.GenerateDatesForEveryXDaysEndByDateY = function (xVar, startDate, yVar) {
		// daily - every X days - custom start date - end by date Y
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var xVar = 3; // every X days
		//var yVar = "01/30/2016"; // end by date Y
		//var startDate = "01/01/2016";
		var ocurrencePattern = moment().recur(startDate, yVar).every(xVar).days();
		return ocurrencePattern.all("L");
	};



	$.fn.GenerateDatesForEveryWeekdayEndNever = function (startDate) {
		// daily - every weekday - custom start date - no end date
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		var maxOccurrences = 52 * 5 * 5;
		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).daysOfWeek();
		return ocurrencePattern.next(maxOccurrences, "L");
	};



	$.fn.GenerateDatesForEveryWeekdayEndAfterXOccurrences = function (startDate, xVar) {
		// daily - every weekday - custom start date - end after X occurrences
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/02/2016";
		//var xVar = 5; // end after X occurrences
		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).daysOfWeek();
		return ocurrencePattern.next(xVar, "L");
	};



	$.fn.GenerateDatesForEveryWeekdayEndByDateX = function (startDate, xVar) {
		// daily - every weekday - custom start date - end by date X
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = "01/31/2016"; // end by date X
		var ocurrencePattern = moment().recur(startDate, xVar).every(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).daysOfWeek();
		return ocurrencePattern.all("L");
	};



	$.fn.GenerateDatesForEveryXWeeksOnYDaysEndNever = function (xVar, yVar, startDate) {
		// weekly - every X weeks on [array of days of week] - custom start date - no end date
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 3; // every X weeks
		//var yVar = ["Monday", "Tuesday", "Wednesday"]; // array of days of week
		var maxOccurrences = (5 * 52) / xVar; // 5 years of occurrences
		var qtyOccurrencesInFodder = maxOccurrences * xVar * yVar.length;
		var chunkSize = yVar.length;
		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek();
		var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
		return $().GetEveryNthChunkAsUnchunked(ocurrenceFodder, chunkSize, xVar);
	};



	$.fn.GenerateDatesForEveryXWeeksOnYDaysEndAfterZOccurrences = function (xVar, yVar, startDate, zVar) {
		// weekly - every X weeks on [array of days of week] - custom start date - end after Z occurrences
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 4; // every X weeks
		//var yVar = ["Thursday", "Friday"]; // array of days of week
		//var zVar = 17; // end after Z occurrences

		var qtyWeeksInSelectedOccurrences = Math.ceil(zVar / yVar.length); // err on side of too many, not too few; extra dates will be removed later
		var qtyOccurrencesInFodder = zVar * xVar; // qtyWeeksInSelectedOccurrences * qty weeks until each ocurrencePattern * qty days in weeks
		var chunkSize = yVar.length;

		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek();
		var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
		var selectedOcurrences = $().GetEveryNthChunkAsUnchunked(ocurrenceFodder, chunkSize, xVar);

		// ensure only the desired number of selected occurrences are in the final batch
		var occrrencesPared = [];
		$.each(selectedOcurrences, function (k, v) {
			// k is 0-indexed; zVar is 1-indexed
			if (k < zVar) {
				occrrencesPared.push(v)
			}
		});

		return occrrencesPared;
	};



	$.fn.GenerateDatesForEveryXWeeksOnYDaysEndByDateZ = function (xVar, yVar, startDate, zVar) {
		// weekly - every X weeks on [array of days of week] - custom start date - end by date Z
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 3; // every X weeks
		//var yVar = ["Monday", "Tuesday", "Wednesday"]; // array of days of week
		//var zVar = "08/31/2016"; // end by date Z

		var chunkSize = yVar.length;

		var ocurrencePattern = moment().recur(startDate, zVar).every(yVar).daysOfWeek();
		var ocurrenceFodder = ocurrencePattern.all("L");
		return $().GetEveryNthChunkAsUnchunked(ocurrenceFodder, chunkSize, xVar);
	};



	$.fn.GenerateDatesForEveryXDaysOfEveryYMonthsEndNever = function (xVar, yVar, startDate) {
		// monthly - every day X of every Y months - custom start date - no end date
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X day
		//var yVar = 8; // every Y months
		var maxOccurrences = 5 * (12 / yVar); // 5 years of occurrences
		var qtyOccurrencesInFodder = maxOccurrences * yVar;
		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(xVar).daysOfMonth();
		var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
		return $().GetFirstAndEveryNthDate(ocurrenceFodder, yVar);
	};



	$.fn.GenerateDatesForEveryXDaysOfEveryYMonthsEndAfterYOccurrences = function (xVar, yVar, startDate, zVar) {
		// monthly - every day X of every Y months - custom start date - end after Z occurrences
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X day
		//var yVar = 8; // every Y months
		//var zVar = 5; // end after Z occurrences
		var qtyOccurrencesInFodder = zVar * yVar;
		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(xVar).daysOfMonth();
		var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
		return $().GetFirstAndEveryNthDate(ocurrenceFodder, yVar);
	};



	$.fn.GenerateDatesForEveryXDaysOfEveryYMonthsEndByDateY = function (xVar, yVar, startDate, zVar) {
		// monthly - every day X of every Y months - custom start date - end by date Z
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X day
		//var yVar = 3; // every Y months
		//var zVar = "08/31/2020"; // end by date Z
		var ocurrencePattern = moment().recur(startDate, zVar).every(xVar).daysOfMonth();
		var ocurrenceFodder = ocurrencePattern.all("L");
		return $().GetFirstAndEveryNthDate(ocurrenceFodder, yVar);
	};



	$.fn.GenerateDatesForEveryXYDayOfEveryZMonthsEndNever = function (xVar, yVar, zVar, startDate) {
		// monthly - every X (ordinal) Y (day of week) of every Z month(s) - custom start date - no end date
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/04/2016";
		//var xVar = 1; // every X (ordinal)
		//var yVar = "Monday"; // day of week
		//var zVar = 2; // months
		var maxOccurrences = 5 * (12 / zVar); // 5 years of occurrences
		var qtyOccurrencesInFodder = maxOccurrences * zVar;
		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay();
		var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
		return $().GetFirstAndEveryNthDate(ocurrenceFodder, zVar);
	};



	$.fn.GenerateDatesForEveryXYDayOfEveryZMonthsEndAfterYOccurrences = function (xVar, yVar, zVar, startDate, aVar) {
		// monthly - every X (ordinal/last) Y (day of week) of every Z month(s) - custom start date - end after A occurrences
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/04/2016";
		//var xVar = 1; // every X (ordinal)
		//var yVar = "Monday"; // day of week
		//var zVar = 2; // months
		//var aVar = 5; // end after A occurrences
		var qtyOccurrencesInFodder = aVar * zVar;
		var ocurrencePattern = moment(startDate).subtract(1, 'days').recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay();
		var ocurrenceFodder = ocurrencePattern.next(qtyOccurrencesInFodder, "L");
		return $().GetFirstAndEveryNthDate(ocurrenceFodder, zVar);
	};



	$.fn.GenerateDatesForEveryXYDayOfEveryZMonthsEndByDateY = function (xVar, yVar, zVar, startDate, aVar) {
		// monthly - every X (ordinal/last) Y (day of week) of every Z month(s) - custom start date - end by date A
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/04/2016";
		//var xVar = 1; // every X (ordinal)
		//var yVar = "Monday"; // day of week
		//var zVar = 2; // months
		//var aVar = "10/31/2016"; // end by date A
		var ocurrencePattern = moment().recur(startDate, aVar).every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay();
		var ocurrenceFodder = ocurrencePattern.all("L");
		return $().GetFirstAndEveryNthDate(ocurrenceFodder, zVar);
	};



	$.fn.GenerateDatesForEveryXDayYMonthEveryYearEndNever = function (xVar, yVar, startDate) {
		// yearly - every X month Y date - custom start date - no end date
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X month
		//var yVar = 3; // Y date
		var maxOccurrences = 5;
		var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfMonth().every(xVar - 1).monthsOfYear();
		return ocurrencePattern.next(maxOccurrences, "L");
	};



	$.fn.GenerateDatesForEveryXDayYMonthEveryYearEndAfterYOccurrences = function (xVar, yVar, startDate, zVar) {
		// yearly - every X month Y date - custom start date - end after Z occurrences
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X month
		//var yVar = 3; // Y date
		//var zVar = 5; // end after Z occurrences
		var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfMonth().every(xVar - 1).monthsOfYear();
		return allOcurrences = ocurrencePattern.next(zVar, "L");
	};



	$.fn.GenerateDatesForEveryXDayYMonthEveryYearEndByDateY = function (xVar, yVar, startDate, zVar) {
		// yearly - every X month Y date - custom start date - end by date Z
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X month
		//var yVar = 3; // Y date
		//var zVar = "01/31/2025"; // end by date Z
		var ocurrencePattern = moment().recur(startDate, zVar).every(yVar).daysOfMonth().every(xVar - 1).monthsOfYear();
		return allOcurrences = ocurrencePattern.all("L");
	};



	$.fn.GenerateDatesForEveryXYDayZMonthEveryYearEndNever = function (xVar, yVar, zVar, startDate) {
		// yearly - every X (ordinal/last) Y (day of week) of Z month - custom start date - no end date
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X (ordinal)
		//var yVar = "Monday"; // day of week
		//var zVar = 1; // month
		var maxOccurrences = 5;
		var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay().every(zVar - 1).monthsOfYear();
		return ocurrencePattern.next(maxOccurrences, "L");
	};



	$.fn.GenerateDatesForEveryXYDayZMonthEveryYearEndAfterYOccurrences = function (xVar, yVar, zVar, startDate, aVar) {
		// yearly - every X (ordinal/last) Y (day of week) of Z month - custom start date - end after A occurrences
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		//var startDate = "01/01/2016";
		//var xVar = 1; // every X (ordinal)
		//var yVar = "Monday"; // day of week
		//var zVar = 1; // month
		//var aVar = 5; // end after A occurrences
		var ocurrencePattern = moment(startDate).recur().every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay().every(zVar - 1).monthsOfYear(); //.subtract(1, 'days')
		return allOcurrences = ocurrencePattern.next(aVar, "L");
	};



	$.fn.GenerateDatesForEveryXYDayZMonthEveryYearEndByDateY = function (xVar, yVar, zVar, startDate, aVar) {
		// yearly - every X (ordinal/last) Y (day of week) of Z month - custom start date - end by date A
		moment.locale('en');
		moment.suppressDeprecationWarnings = true;
		var startDate = "01/01/2016";
		var xVar = 1; // every X (ordinal)
		var yVar = "Monday"; // day of week
		var zVar = 1; // month
		var aVar = "10/31/2020"; // end by date A

		var ocurrencePattern = moment().recur(startDate, aVar).every(yVar).daysOfWeek().every(xVar - 1).weeksOfMonthByDay().every(zVar - 1).monthsOfYear(); //.subtract(1, 'days')
		return allOcurrences = ocurrencePattern.all("L");
	};



	$.fn.GetFirstAndEveryNthDate = function (getFromArray, n) {

		if (n == 0 || n == 1) {
			var returnArray = getFromArray;
		} else {
			// pop off the first date and keep it
			var returnArray = [];
			returnArray.push(getFromArray[0]);

			// create a dummy array of all dates but the first
			var allButFirst = [];
			$.each(getFromArray, function (k, v) {
				if (k != 0) {
					allButFirst.push(v);
				}
			});

			$.each(allButFirst, function (k, v) {
				if (((k + 1) % n) == 0) {
					returnArray.push(v);
				}
			});
		}

		return returnArray;
	};



	$.fn.GetEveryNthChunkAsUnchunked = function (getFromArray, chunkSize, n) {

		if (n == 0 || n == 1) {
			var returnArray = getFromArray;
		} else {

			var chunkedArray = [];
			var chunkedFilteredArray = [];
			var returnArray = [];
			var i, j, tempArray; //, chunk = yVar.length
			for (i = 0, j = getFromArray.length; i < j; i += chunkSize) {
				tempArray = getFromArray.slice(i, i + chunkSize);
				chunkedArray.push(tempArray);
			}

			// pop off the first chunk and keep it
			chunkedFilteredArray.push(chunkedArray[0]);

			// create a dummy array of all chunks but the first
			var allChunksButFirst = [];
			$.each(chunkedArray, function (k, v) {
				if (k != 0) {
					allChunksButFirst.push(v);
				}
			});

			$.each(allChunksButFirst, function (k, v) {
				if (((k + 1) % n) == 0) {
					chunkedFilteredArray.push(v);
				}
			});

			$.each(chunkedFilteredArray, function (k, v) {
				$.each(v, function (k2, v2) {
					returnArray.push(v2);
				});
			});


		}

		return returnArray;
	};




	$.fn.ImportEventNeedsRequestDataToEventAVRequest = function (requestID) {

		console.log("function called");

		var eventRData = $().GetFieldsFromOneRow({
			"listName": "swfList",
			"webURL": "https://bmos.sharepoint.com/sites/vxo-event-needs",
			"select": [{
				"nameHere": "formData",
				"nameInList": "AllRequestData"
			}],
			"where": {
				"field": "ID",
				"type": "Number",
				"value": requestID,
			}
		});


		console.log(eventRData.formData);

		var eventRDataSelected = {};

		if ("Event-Name" in eventRData.formData) { eventRDataSelected["Event-Name"] = eventRData.formData["Event-Name"]; }

		if ("Event-Space" in eventRData.formData) { eventRDataSelected["Event-Space"] = eventRData.formData["Event-Space"]; }

		if ("date-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Beginning-Datetime"] = eventRData.formData["date-input_Event-Beginning-Datetime"]; }
		if ("hours-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Beginning-Datetime"] = eventRData.formData["hours-input_Event-Beginning-Datetime"]; }
		if ("minutes-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Beginning-Datetime"] = eventRData.formData["minutes-input_Event-Beginning-Datetime"]; }
		if ("datetime-storage_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Beginning-Datetime"] = eventRData.formData["datetime-storage_Event-Beginning-Datetime"]; }

		if ("date-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Ending-Datetime"] = eventRData.formData["date-input_Event-Ending-Datetime"]; }
		if ("hours-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Ending-Datetime"] = eventRData.formData["hours-input_Event-Ending-Datetime"]; }
		if ("minutes-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Ending-Datetime"] = eventRData.formData["minutes-input_Event-Ending-Datetime"]; }
		if ("datetime-storage_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Ending-Datetime"] = eventRData.formData["datetime-storage_Event-Ending-Datetime"]; }

		if ("Event-Location" in eventRData.formData) { eventRDataSelected["Event-Location"] = eventRData.formData["Event-Location"]; }
		if ("Onsite-Contact" in eventRData.formData) { eventRDataSelected["Onsite-Contact"] = eventRData.formData["Onsite-Contact"]; }
		if ("IIT-Account-Number" in eventRData.formData) { eventRDataSelected["Account-Number"] = eventRData.formData["IIT-Account-Number"]; }


		PopulateFormData("div#request-form", eventRDataSelected, "https://bmos.sharepoint.com/sites/vxo-function/Lists/SWFList", requestID, undefined);
	};



	$.fn.ImportEventSpaceRequestDataToEventRequest = function (requestID) {

		var eventRData = $().GetFieldsFromOneRow({
			"listName": "swfList",
			"webURL": "https://bmos.sharepoint.com/sites/vxo-event-space",
			"select": [{
				"nameHere": "formData",
				"nameInList": "AllRequestData"
			}],
			"where": {
				"field": "ID",
				"type": "Number",
				"value": requestID,
			}
		});

		console.log(eventRData.formData);

		var eventRDataSelected = {};

		if ("Event-Name" in eventRData.formData) { eventRDataSelected["Event-Name"] = eventRData.formData["Event-Name"]; }
		if ("Total-Attendance" in eventRData.formData) { eventRDataSelected["Total-Attendance"] = eventRData.formData["Total-Attendance"]; }
		if ("Requested-Space" in eventRData.formData) { eventRDataSelected["event-space_" + $().ReturnHyphenatedFieldNameOrValue(eventRData.formData["Requested-Space"]).toLowerCase()] = $().ReturnHyphenatedFieldNameOrValue(eventRData.formData["Requested-Space"]).toLowerCase(); }
		if ("Other-Event-Space" in eventRData.formData) { eventRDataSelected["Other-Event-Space"] = eventRData.formData["Other-Event-Space"]; }

		if ("date-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Beginning-Datetime"] = eventRData.formData["date-input_Event-Beginning-Datetime"]; }
		if ("hours-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Beginning-Datetime"] = eventRData.formData["hours-input_Event-Beginning-Datetime"]; }
		if ("minutes-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Beginning-Datetime"] = eventRData.formData["minutes-input_Event-Beginning-Datetime"]; }
		if ("datetime-storage_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Beginning-Datetime"] = eventRData.formData["datetime-storage_Event-Beginning-Datetime"]; }

		if ("date-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Ending-Datetime"] = eventRData.formData["date-input_Event-Ending-Datetime"]; }
		if ("hours-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Ending-Datetime"] = eventRData.formData["hours-input_Event-Ending-Datetime"]; }
		if ("minutes-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Ending-Datetime"] = eventRData.formData["minutes-input_Event-Ending-Datetime"]; }
		if ("datetime-storage_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Ending-Datetime"] = eventRData.formData["datetime-storage_Event-Ending-Datetime"]; }

		if ("date-input_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Space-Reserved-Beginning-Datetime"] = eventRData.formData["date-input_Space-Reserved-Beginning-Datetime"]; }
		if ("hours-input_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Space-Reserved-Beginning-Datetime"] = eventRData.formData["hours-input_Space-Reserved-Beginning-Datetime"]; }
		if ("minutes-input_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Space-Reserved-Beginning-Datetime"] = eventRData.formData["minutes-input_Space-Reserved-Beginning-Datetime"]; }
		if ("datetime-storage_Space-Reserved-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Space-Reserved-Beginning-Datetime"] = eventRData.formData["datetime-storage_Space-Reserved-Beginning-Datetime"]; }

		if ("date-input_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Space-Reserved-Ending-Datetime"] = eventRData.formData["date-input_Space-Reserved-Ending-Datetime"]; }
		if ("hours-input_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Space-Reserved-Ending-Datetime"] = eventRData.formData["hours-input_Space-Reserved-Ending-Datetime"]; }
		if ("minutes-input_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Space-Reserved-Ending-Datetime"] = eventRData.formData["minutes-input_Space-Reserved-Ending-Datetime"]; }
		if ("datetime-storage_Space-Reserved-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Space-Reserved-Ending-Datetime"] = eventRData.formData["datetime-storage_Space-Reserved-Ending-Datetime"]; }

		if ("Event-Location" in eventRData.formData) { eventRDataSelected["Event-Location"] = eventRData.formData["Event-Location"]; }
		if ("Onsite-Contact" in eventRData.formData) { eventRDataSelected["Onsite-Contact"] = eventRData.formData["Onsite-Contact"]; }
		if ("IIT-Account-Number" in eventRData.formData) { eventRDataSelected["Account-Number"] = eventRData.formData["IIT-Account-Number"]; }


		PopulateFormData("div#request-form", eventRDataSelected, "https://bmos.sharepoint.com/sites/vxo-function/Lists/SWFList", requestID, undefined);
		if ("Requested-Space" in eventRData.formData && eventRData.formData["Requested-Space"] === "Other") {
			$("#event-space_other").trigger("change");
		}
	};



	$.fn.ImportEventNeedsRequestDataToCateringRequest = function (requestID) {

		var eventRData = $().GetFieldsFromOneRow({
			"listName": "swfList",
			"webURL": "https://bmos.sharepoint.com/sites/vxo-event-needs",
			"select": [{
				"nameHere": "formData",
				"nameInList": "AllRequestData"
			}],
			"where": {
				"field": "ID",
				"type": "Number",
				"value": requestID,
			}
		});

		var eventRDataSelected = {};

		if ("date-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Beginning-Datetime"] = eventRData.formData["date-input_Event-Beginning-Datetime"]; }
		if ("hours-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Beginning-Datetime"] = eventRData.formData["hours-input_Event-Beginning-Datetime"]; }
		if ("minutes-input_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Beginning-Datetime"] = eventRData.formData["minutes-input_Event-Beginning-Datetime"]; }
		if ("datetime-storage_Event-Beginning-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Beginning-Datetime"] = eventRData.formData["datetime-storage_Event-Beginning-Datetime"]; }

		if ("date-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["date-input_Event-Ending-Datetime"] = eventRData.formData["date-input_Event-Ending-Datetime"]; }
		if ("hours-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["hours-input_Event-Ending-Datetime"] = eventRData.formData["hours-input_Event-Ending-Datetime"]; }
		if ("minutes-input_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["minutes-input_Event-Ending-Datetime"] = eventRData.formData["minutes-input_Event-Ending-Datetime"]; }
		if ("datetime-storage_Event-Ending-Datetime" in eventRData.formData) { eventRDataSelected["datetime-storage_Event-Ending-Datetime"] = eventRData.formData["datetime-storage_Event-Ending-Datetime"]; }

		if ("Total-Attendance" in eventRData.formData) { eventRDataSelected["Total-Attendance"] = eventRData.formData["Total-Attendance"]; }

		if ("Onsite-Contact" in eventRData.formData) { eventRDataSelected["Onsite-Contact"] = eventRData.formData["Onsite-Contact"]; }

		if ("WPC-Account-Number" in eventRData.formData) { eventRDataSelected["Account-Number"] = eventRData.formData["WPC-Account-Number"]; }

		PopulateFormData("div#request-form", eventRDataSelected, "https://bmos.sharepoint.com/sites/vxo-function/Lists/SWFList", requestID, undefined);

		if (typeof ($("input#Total-Attendance").val()) != "undefined" && $("input#Total-Attendance").val() != "" && $("input#Total-Attendance").val() != "0" && (/^[0-9]*[1-9][0-9]*$/.test($("input#Total-Attendance").val()))) {
			$().SetFieldToEnabled("#checkbox-for-boxed-lunches_boxedlunches");
			$().SetFieldToEnabled("#checkbox-for-upscale-sandwich-buffet_upscalesandwichbuffet");
			$().SetFieldToEnabled("#checkbox-for-delicatessen-buffet_delicatessenbuffet");
		}
	};



	$.fn.SetSubtotalAndTotalFromTableRowPriceAndQuantity = function (quantityNumberElement) {

		var commonParentElement = $(quantityNumberElement).closest("tr");
		var previousQuantityNumberElement = $(commonParentElement).find("input.previous-quantity");
		var priceNumberElement = $(commonParentElement).find("span.price-amount");
		var subtotalNumberElement = $(commonParentElement).find("input.subtotal-input");
		var totalNumberElement = $("input#Request-Total");

		var priceString = $(priceNumberElement).text();
		var quantityString = $(quantityNumberElement).val();
		var previousQuantityString = $(previousQuantityNumberElement).val();
		var subtotalString = $(subtotalNumberElement).text();
		var totalString = $(totalNumberElement).val();

		var priceNumber = Number(ReplaceAll(",", "", priceString));
		var totalNumber = Number(ReplaceAll("\\$", "", ReplaceAll(",", "", totalString)));



		// if quantityString is empty string

		// set quantityNumber to 0
		// clear error message

		// if quantityString is not empty string

		// if quantityString is 0

		// set quantityNumber to 0
		// clear error message

		// if quantityString is not 0

		// if quantityString is not positive integer

		// set quantityNumber to 0
		// set error message

		// if quantityString is positive integer

		// set quantityNumber to quantityString
		// clear error message 

		// if quantityNumber is 0

		// set subtotalNumber to 0

		// if quantityNumber is not 0

		// set subtotalNumber to priceNumber * quantityNumber

		// if previousQuantityString is empty or is 0 (initial entry)

		// set previousQuantityNumber to 0

		// else

		// set previousQuantityNumber to previousQuantityString

		// if previousQuantityNumber is 0 (initial entry)

		// set newTotalNumber to previousTotalNumber + subtotalNumber

		// if previousQuantityNumber is not 0 (not initial entry)

		// set quantityDifferenceNumber to quantityNumber - previousQuantityNumber (may be negative)

		// set totalDifferenceNumber to priceNumber * quantityDifferenceNumber (may be negative)

		// set newTotalNumber to previousTotalNumber + totalDifferenceNumber

		// if quantityNumber|subtotalNumber|newTotalNumber is 0

		// set subtotalPrefix|newTotalPrefix to empty
		// set quantityString|subtotalString|newTotalString to empty

		// if quantityNumber|subtotalNumber|newTotalNumber is not 0

		// set subtotalPrefix|newTotalPrefix to $
		// set quantityString|subtotalString|newTotalString to quantityNumber|subtotalNumber|newTotalNumber

		// set prefixes and values: quantity|previousQuantity|subtotal|total


		if (quantityString == "") {
			var quantityNumber = 0;
			$(commonParentElement).find("div.error-message").remove();
			$(commonParentElement).find("div.contains-errors").removeClass("contains-errors");

		} else {
			if (quantityString == "0") {
				var quantityNumber = 0;
				$(commonParentElement).find("div.error-message").remove();
				$(commonParentElement).find("div.contains-errors").removeClass("contains-errors");
			} else {
				if (!(/^[0-9]*[1-9][0-9]*$/.test(quantityString))) {
					var quantityNumber = 0;
					$().SetErrorMessage(quantityElement, 'Please enter a valid positive integer');
				} else {
					var quantityNumber = Number(quantityString);
					$(commonParentElement).find("div.error-message").remove();
					$(commonParentElement).find("div.contains-errors").removeClass("contains-errors");
				}
			}
		}

		if (quantityNumber == 0) {
			var newSubtotalNumber = 0;
		} else {
			var newSubtotalNumber = priceNumber * quantityNumber;
		}

		if (previousQuantityString == "" || previousQuantityString == "0") {
			var previousQuantityNumber = 0;
		} else {
			var previousQuantityNumber = Number(previousQuantityString);
		}
		// console.log("previousQuantityNumber = " + previousQuantityNumber);

		if (previousQuantityNumber == 0) {
			totalNumber = totalNumber + newSubtotalNumber;
		} else {
			var quantityDifferenceNumber = quantityNumber - previousQuantityNumber;
			var totalDifferenceNumber = priceNumber * quantityDifferenceNumber;
			totalNumber = totalNumber + totalDifferenceNumber;
		}
		// console.log("totalNumber = " + totalNumber);

		if (quantityNumber == 0) {
			quantityString = "";
			previousQuantityString = "";
		} else {
			quantityString = quantityNumber.toString();
			previousQuantityString = quantityString;
		}
		// console.log("quantityString = " + quantityString);

		if (newSubtotalNumber == 0) {
			subtotalString = "";
		} else {
			subtotalString = "$" + newSubtotalNumber.toLocaleString();
		}
		// console.log("subtotalString = " + subtotalString);

		if (totalNumber == 0) {
			totalString = "$0";
		} else {
			totalString = "$" + totalNumber.toLocaleString();
			if ($("div#parent_total").hasClass("hidden")) {
				$("div#parent_total").show("fast").removeClass("hidden");
			}
		}
		// console.log("totalString = " + totalString);

		$(quantityNumberElement).val(quantityString);
		$(previousQuantityNumberElement).val(previousQuantityString);
		$(subtotalNumberElement).val(subtotalString);
		$(totalNumberElement).val(totalString);
	};



	$.fn.SetSubtotalAndTotalFromTableRowPriceAndTotalAttendance = function (selectionElement) {

		var commonParentElement = $(selectionElement).closest("tr");
		var priceNumberElement = $(commonParentElement).find("span.price-amount");
		var quantityNumberElement = $("input#Total-Attendance");
		var subtotalNumberElement = $(commonParentElement).find("input.subtotal-input");
		var totalNumberElement = $("input#Request-Total");

		var priceString = $(priceNumberElement).text();
		var quantityString = $(quantityNumberElement).val();
		var subtotalString = "";
		var totalString = $(totalNumberElement).val();

		var priceNumber = Number(priceString);
		var quantityNumber = Number(quantityString);
		var totalNumber = Number(ReplaceAll("\\$", "", ReplaceAll(",", "", totalString)));
		var subtotalNumber = priceNumber * quantityNumber;

		if ($(selectionElement).is(":checked")) {
			totalNumber = totalNumber + subtotalNumber;
		} else {
			totalNumber = totalNumber - subtotalNumber;
			subtotalNumber = 0;
		}

		if (subtotalNumber == 0) {
			subtotalString = "";
		} else {
			subtotalString = "$" + subtotalNumber.toLocaleString();
		}

		if (totalNumber == 0) {
			totalString = "$0";
		} else {
			totalString = "$" + totalNumber.toLocaleString();
			if ($("div#parent_total").hasClass("hidden")) {
				$("div#parent_total").show("fast").removeClass("hidden");
			}
		}

		$(subtotalNumberElement).val(subtotalString);
		$(totalNumberElement).val(totalString);
	};



	$.fn.ShowAndHideSelectedAndUnselectedCateringSelectionOptions = function () {

		// for each primary category div
		$("div.parent_primary-category").each(function (i, primaryCategory) {

			var showPrimaryCategory = 0;
			var parentPrimaryCategoryDivID = $(primaryCategory).attr("id");

			// for each tr
			$(primaryCategory).find("tbody tr").each(function (i, row) {

				var showRow = 0;
				var quantityInputValueForThisRow = $("div#" + parentPrimaryCategoryDivID + " tr#" + $(row).attr("id") + " input.quantity-input").val();
				var selectionCheckboxForThisRowIsChecked = $("div#" + parentPrimaryCategoryDivID + " tr#" + $(row).attr("id") + " input.item-selection").is(":checked");
				// console.log($(row).attr("id"));
				// if there's a quantity for this row
				if (typeof (quantityInputValueForThisRow) != "undefined" && quantityInputValueForThisRow != "") {
					// console.log(row);
					// set flags to show the row and the primary category div
					showRow = 1;
					showPrimaryCategory = 1;
				}

				// if there's a checked checkbox for this row
				if (selectionCheckboxForThisRowIsChecked) {

					// set flags to show the row and the primary category div
					showRow = 1;
					showPrimaryCategory = 1;
				}

				// if showRow = 0 && row is not hidden, hide the row
				if (showRow == 0 && !($(row).hasClass("hidden"))) {
					$(row).hide("fast").addClass("hidden")
				}

			});
			// if showPrimaryCategory = 1 && primary category div is hidden, show the primary category div
			if (showPrimaryCategory == 1 && $(primaryCategory).hasClass("hidden")) {
				$(primaryCategory).show("fast").removeClass("hidden")
			}


		});
	};



	/*$.fn.ShowAndHideAvailableCateringSelectionOptions = function() {

		  // console.log('showing and hiding');

		  var eventBeginningDateTime = $("input#datetime-storage_Event-Beginning-Datetime").val();
		  var eventEndingDateTime = $("input#datetime-storage_Event-Ending-Datetime").val();
		  var eventBeginningDate = eventBeginningDateTime.slice(0,10);
		  var eventEndingDate = eventEndingDateTime.slice(0,10);
		  var eventBeginningTime = eventBeginningDateTime.slice(11,16);
		  var eventEndingTime = eventEndingDateTime.slice(11,16);
		  var eventTotalAttendance = $("input#Total-Attendance").val();

		  // console.log(eventBeginningDateTime);
		  // console.log(eventEndingDateTime);

		  if (eventBeginningDateTime != "" && eventEndingDateTime != "" && eventTotalAttendance != "" && eventTotalAttendance != "0") {

				var primaryCategoriesAvailable = 0;

				$("div.parent_primary-category").each(function(i, primaryCategory) {
				
					 if (!($(this).hasClass("hidden"))) {
						  primaryCategoriesAvailable++;
					 }

					 var thisPrimaryCategoryBeginningTime = $(this).attr("data-available-beginning");
					 var thisPrimaryCategoryEndingTime = $(this).attr("data-available-ending");

					 // console.log($(this).find("h2").text() + " beginning time = " + eventBeginningDate + 'T' + thisPrimaryCategoryBeginningTime + ':00Z');
					 // console.log($(this).find("h2").text() + " ending time = " + eventBeginningDate + 'T' + thisPrimaryCategoryEndingTime + ':00Z');

					 // if this primary category should be available
					 if (eventBeginningTime == thisPrimaryCategoryBeginningTime || moment(eventBeginningDateTime).isBetween(eventBeginningDate + 'T' + thisPrimaryCategoryBeginningTime + ':00Z', eventBeginningDate + 'T' + thisPrimaryCategoryEndingTime + ':00Z')) {
						  if ($(this).hasClass("hidden")) {
								$(this).show("fast").removeClass("hidden");
								primaryCategoriesAvailable++;
						  }
					 // if this primary category should NOT be available
					 } else {

						  if (!($(this).hasClass("hidden"))) {
								$(this).hide("fast").addClass("hidden");
								primaryCategoriesAvailable--;
								$(this).find("input.quantity-input").each(function( index ) {
									 $(this).val("0");
									 $().SetSubtotalAndTotalFromTableRowPriceAndQuantity(this);
								});
								$(this).find("input.item-selection").each(function( index ) {
									 if ($(this).is(":checked")) {
										  $(this).prop("checked", false).attr("checked", false);
										  $().SetSubtotalAndTotalFromTableRowPriceAndTotalAttendance(this);
									 }
								});
						  }
					 }
				});

				if (primaryCategoriesAvailable == 0) {
					 if (!($("div#parent_total").hasClass("hidden"))) {
						  $("div#parent_total").hide("fast").addClass("hidden");
					 }
					 if ($("ul#data-entry-requirement-notices").hasClass("hidden")) {
						  $("ul#data-entry-requirement-notices").show("fast").removeClass("hidden");
					 }
				} else {					 
					 if ($("div#parent_total").hasClass("hidden")) {
						  $("div#parent_total").show("fast").removeClass("hidden");
					 }
					 if (!($("ul#data-entry-requirement-notices").hasClass("hidden"))) {
						  $("ul#data-entry-requirement-notices").hide("fast").addClass("hidden");
					 }
				}
		  }
	};*/



	$.fn.ProcessGPCCurrencyFields = function () {
		var dcNumberIsValid = $().ValidateInRealTimeForPositiveGrantCostsInUSD($("input#MOS-Direct-Costs").val(), "input#MOS-Direct-Costs");
		var idcNumberIsValid = $().ValidateInRealTimeForPositiveGrantCostsInUSD($("input#IDC").val(), "input#IDC");
		if (dcNumberIsValid == 0 || idcNumberIsValid == 0) {
			$("input#Total-MOS-Budget").val("");
		} else {
			var directCostsString = $("input#MOS-Direct-Costs").val().replace("\$", "").replace(/[,]/g, "");
			var indirectCostsString = $("input#IDC").val().replace("\$", "").replace(/[,]/g, "");

			if (directCostsString == "") { directCostsString = "0"; }
			if (indirectCostsString == "") { indirectCostsString = "0"; }
			$("input#Total-MOS-Budget").val(numeral(parseFloat(directCostsString) + parseFloat(indirectCostsString)).format('$0,0.00'));
			if (directCostsString != "0") {
				$("input#MOS-Direct-Costs").val(numeral(directCostsString).format('$0,0.00'));
			}
			if (indirectCostsString != "0") {
				$("input#IDC").val(numeral(indirectCostsString).format('$0,0.00'));
			}
		}

		if (typeof ($("input#Total-Project-Budget").val()) !== "undefined" && $("input#Total-Project-Budget").val() != "" && $("input#Total-Project-Budget").val() != "0") {
			$("input#Total-Project-Budget").val(numeral($("input#Total-Project-Budget").val().replace("\$", "").replace(/[,]/g, "")).format('$0,0.00'));
		}
		if (typeof ($("input#Cost-Share").val()) !== "undefined" && $("input#Cost-Share").val() != "" && $("input#Cost-Share").val() != "0") {
			$("input#Cost-Share").val(numeral($("input#Cost-Share").val().replace("\$", "").replace(/[,]/g, "")).format('$0,0.00'));
		}
	};



	$.fn.ProcessEARAndPARHourFields = function (biweeklyHoursFieldID, annualHoursFieldID) {
		var biWeeklyHoursString = $("input#" + biweeklyHoursFieldID).val().replace("\$", "").replace(/[,]/g, "");
		if (biWeeklyHoursString != '') {
			var biWeeklyHoursIsValid = $().ValidateInRealTimeForPositiveFloat(biWeeklyHoursString, "input#" + biweeklyHoursFieldID);
			var biWeeklyPeriodsPerAnnum = 26;
			if (biWeeklyHoursIsValid == 1) {
				$("input#" + annualHoursFieldID).val(parseFloat(biWeeklyHoursString) * biWeeklyPeriodsPerAnnum);
				return 1;
			} else {
				$("input#" + annualHoursFieldID).val('');
				return 0;
			}
		} else {
			$("input#" + annualHoursFieldID).val('');
			return 0;
		}

	};



	$.fn.ProcessEARAndPARHourAndWageFields = function (hourlyWageFieldID, annualWageFieldID, biweeklyHoursFieldID, annualHoursFieldID, lastSalaryFieldID) {
		var earHoursFieldsProcessed = $().ProcessEARAndPARHourFields(biweeklyHoursFieldID, annualHoursFieldID);
		if (earHoursFieldsProcessed == 1) {
			var hourlyWageString = $("input#" + hourlyWageFieldID).val().replace("\$", "").replace(/[,]/g, "");
			if (hourlyWageString != '') {
				var biWeeklyHoursString = $("input#" + biweeklyHoursFieldID).val().replace("\$", "").replace(/[,]/g, "");
				var hourlyWageIsValid = $().ValidateInRealTimeForPositiveNumberInUSDFormat(hourlyWageString, "input#" + hourlyWageFieldID);
				var biWeeklyPeriodsPerAnnum = 26;
				if (hourlyWageIsValid == 1) {
					var annualWageString = parseFloat(hourlyWageString) * parseFloat(biWeeklyHoursString) * biWeeklyPeriodsPerAnnum;
					$("input#" + hourlyWageFieldID).val(numeral(parseFloat(hourlyWageString)).format('$0,0.00'));
					$("input#" + annualWageFieldID).val(numeral(annualWageString).format('$0,0.00'));

					if (lastSalaryFieldID) {
						var lastSalaryString = $("input#" + lastSalaryFieldID).val().replace("\$", "").replace(/[,]/g, "");
						if (lastSalaryString != '') {
							var salaryChangeString = parseFloat(annualWageString) - parseFloat(lastSalaryString);
							$("input#" + lastSalaryFieldID).val(numeral(parseFloat(lastSalaryString)).format('$0,0.00'));
							$("input#Salary-Change").val(numeral(parseFloat(salaryChangeString)).format('$0,0.00'));
							$().SetFieldToRequired('Salary-Change', 'text');
							$("div#label-and-control_Salary-Change").show("fast").removeClass("hidden");
							if (salaryChangeString != 0) {
								$().SetFieldToRequired('Salary-Change-Reason', 'textarea');
								$("div#label-and-control_Salary-Change-Reason").show("fast").removeClass("hidden");
							}
						}
					}
				} else {
					$("input#" + annualWageFieldID).val("");
				}
			} else {
				$("input#" + annualWageFieldID).val('');
			}
		} else {
			var hourlyWageString = $("input#" + hourlyWageFieldID).val().replace("\$", "").replace(/[,]/g, "");
			$("input#" + hourlyWageFieldID).val(numeral(parseFloat(hourlyWageString)).format('$0,0.00'));
		}
	};



	$.fn.ProcessEARPercentFields = function (fieldID) {
		var numeralString = $('input#' + fieldID).val().replace("\%", "").replace(/[,]/g, "");
		$('input#' + fieldID).val(numeral(parseFloat(numeralString) * .01).format('0.00%'));
	};



	$.fn.ReturnManagers = function () {
		var managers = [];
		// query the api for the data
		$.ajax({
			async: false,
			method: "GET",
			dataType: "json",
			url: "https://neso.mos.org/activeDirectory/managers?ts=" + Date.now(),
		})
			.done(function (nesoData) {
				// console.log("nesoData:");
				// console.log(nesoData);
				managers = nesoData.docs;
			})
			.fail(function (error) {
				// console.log("no such luck - NESO");
				// console.log(error);
				managers = error;
			});
		return managers;
	};



	$.fn.ReturnGSEGroupsFromSP = function () {
		// get the config data stored as AllRequestData in /sites/hr-service-config/Lists/SWFList
		var allRequestDataObject = $().GetFieldsFromOneRow({
			"listName": "SWFList",
			"webURL": "https://bmos.sharepoint.com/sites/hr-service-config",
			"select": [{
				"nameHere": "formData",
				"nameInList": "AllRequestData"
			}],
			"where": {
				"field": "ID",
				"type": "Number",
				"value": 1,
			}
		});

		// specify the 'form fields' data to extract from allRequestDataObject
		var gseGroupsKeys = [
			'HR-Admins',
			'Job-Admins'
		];

		// set up var
		var gseGroups = {};

		// iterate over the form data keys and values
		$.each(allRequestDataObject.formData, function (formDatumKey, formDatumValue) {
			// if this form datum value is a person
			if (formDatumValue != "") {
				// if this form datum key matches an element of gseGroupsKeys
				if (gseGroupsKeys.indexOf(formDatumKey) > -1) {
					// get a new key (for future ease; prefer dot notation)
					var newKey = ReplaceAll("-", "", formDatumKey);
					// create an empty array using the new key
					gseGroups[newKey] = [];
					// for each person object in this formDatumValue
					$.each(formDatumValue, function (i, person) {
						// add the person's name and email to the new array
						var newPerson = {};
						newPerson['name'] = person.displayText;
						newPerson['email'] = person.description;
						newPerson['account'] = ReplaceAll("@mos.org", "", person.description.toLowerCase());
						newPerson['accountLong'] = person.account.toLowerCase();
						gseGroups[newKey].push(newPerson);
					});
				}
			}
		});
		// return the data
		return gseGroups;
	};



	$.fn.ReturnGSEGroups = function () {
		// get data from SP and Neso
		var gseGroupsFromSP = $().ReturnGSEGroupsFromSP();
		var managers = $().ReturnManagers();
		// set up var to return
		var gseGroups = gseGroupsFromSP;
		// add Managers empty array
		gseGroups.Managers = [];
		// for each queried manager
		managers.forEach((manager) => {
			// push the manager's data to main var
			gseGroups.Managers.push({
				account: manager.account,
				accountLong: 'i:0#.f|membership|' + manager.account + '@mos.org',
				email: manager.email,
				name: manager.displayName,
			});
		});
		// manually add sp3
		gseGroups.Managers.push({
			account: 'sp3',
			accountLong: 'i:0#.f|membership|sp3@mos.org',
			email: 'sp3@mos.org',
			name: 'Hub Tester3',
		});
		// return main var
		return gseGroups;
	};



	$.fn.ReturnUserIsGSEHRAdmin = function () {
		var userIsGSEHRAdmin = 0;
		var gseGroups = $().ReturnGSEGroups();
		$.each(gseGroups.HRAdmins, function (i, person) {
			if (person.accountLong === uData.account) {
				userIsGSEHRAdmin = 1;
			}
		});
		return userIsGSEHRAdmin;
	};

	$.fn.ReturnUserIsGSEJobAdmin = function () {
		var userIsGSEJobAdmin = 0;
		var gseGroups = $().ReturnGSEGroups();
		$.each(gseGroups.JobAdmins, function (i, person) {
			if (person.accountLong === uData.account) {
				userIsGSEJobAdmin = 1;
			}
		});
		return userIsGSEJobAdmin;
	};

	$.fn.ReturnUserIsGSEManager = function () {
		var userIsGSEManager = 0;
		var gseGroups = $().ReturnGSEGroups();
		$.each(gseGroups.Managers, function (i, person) {
			if (person) {
				if (person.accountLong === uData.account) {
					userIsGSEManager = 1;
				}
			}
		});
		return userIsGSEManager;
	};




	$.fn.ReturnGPCGroups = function () {

		// get the config data stored as AllRequestData in /sites/gpc-configuration/Lists/SWFList
		var allRequestDataObject = $().GetFieldsFromOneRow({
			"listName": "SWFList",
			"webURL": "https://bmos.sharepoint.com/sites/gpc-configuration",
			"select": [{
				"nameHere": "formData",
				"nameInList": "AllRequestData"
			}],
			"where": {
				"field": "ID",
				"type": "Number",
				"value": 1252,
			}
		});

		// specify the 'form fields' data to extract from allRequestDataObject
		var gpcGroupsKeys = [
			'EEP-Needs-Negotiator',
			'EDC-Needs-Negotiator',
			'Web-Needs-Negotiator',
			'Infra-Needs-Negotiator',
			'RE-Needs-Negotiator',
			'IRB-Review-Discussee',
			'EH-Needs-Negotiator',
			'Edit-Project-Narrative',
			'Edit-Project-Budget',
			'Edit-Project-Budget-Justification',
			'Finance-Approvers',
			// 'Logistics-Approvers',
			'EDC-Approvers',
			'EEP-Approvers',
			'CFG-Approvers',
			'DIM-Approvers',
			'Other-Concept-Reviewers',
			'Other-Submission-Reviewers',
			'Initial-Concept-View-Access',
			'Submission-Approval-View-Access',
			'Signers',
			'Concept-Viewers',
			'Submission-Viewers',
			'Edit-GPC-People',
			'Use-Change-Request-Status',
			'Initial-Concept-Notifications',
			'Submission-Approval-Notifications'
		];

		// set up var
		var gpcGroups = {};

		// iterate over the form data keys and values
		$.each(allRequestDataObject.formData, function (formDatumKey, formDatumValue) {
			// if this form datum value is a person
			if (formDatumValue != "") {
				// if this form datum key matches an element of gpcGroupsKeys
				if (gpcGroupsKeys.indexOf(formDatumKey) > -1) {
					// get a new key (for future ease; prefer dot notation)
					var newKey = ReplaceAll("-", "", formDatumKey);
					// create an empty array using the new key
					gpcGroups[newKey] = [];
					// for each person object in this formDatumValue
					$.each(formDatumValue, function (i, person) {
						// add the person's name and email to the new array
						var newPerson = {};
						newPerson['name'] = person.displayText;
						newPerson['email'] = person.description;
						newPerson['account'] = ReplaceAll("@mos.org", "", person.description.toLowerCase());
						newPerson['accountLong'] = person.account.toLowerCase();
						gpcGroups[newKey].push(newPerson);
					});
				}
			}
		});

		// send to caller
		return gpcGroups;
	};



	$.fn.ReturnUserIsGPCPeopleEditor = function () {
		var userIsGPCPeopleEditor = false;
		var gpcGroups = $().ReturnGPCGroups();
		$.each(gpcGroups.EditGPCPeople, function (i, person) {
			if (person.accountLong === uData.account) {
				userIsGPCPeopleEditor = true;
			}
		});
		return userIsGPCPeopleEditor;
	};




	$.fn.SetGPCSubmissionNeedsPeople = function () {

		// get gpcGroups (people) data
		var gpcGroups = $().ReturnGPCGroups();

		// set form config data
		var spanIDsAndReplacementKeySets = [
			{
				'radioSetName': 'EEP-Needs',
				'choiceSetLabelSpanID': 'choice-set-label_EEP-needs-negotiator',
				'affirmativeLabelSpanID': 'affirmative-label_EEP-needs-negotiator',
				'negativeLabelSpanID': 'negative-label_EEP-needs-negotiator',
				'hiddenrecordKeeperID': 'eep-needs-negotiator-on-load',
				'replacementKey': 'EEPNeedsNegotiator'
			}, {
				'radioSetName': 'EDC-Needs',
				'choiceSetLabelSpanID': 'choice-set-label_EDC-needs-negotiator',
				'affirmativeLabelSpanID': 'affirmative-label_EDC-needs-negotiator',
				'negativeLabelSpanID': 'negative-label_EDC-needs-negotiator',
				'hiddenrecordKeeperID': 'edc-needs-negotiator-on-load',
				'replacementKey': 'EDCNeedsNegotiator'
			}, {
				'radioSetName': 'Web-Needs',
				'choiceSetLabelSpanID': 'choice-set-label_Web-needs-negotiator',
				'affirmativeLabelSpanID': 'affirmative-label_Web-needs-negotiator',
				'negativeLabelSpanID': 'negative-label_Web-needs-negotiator',
				'hiddenrecordKeeperID': 'web-needs-negotiator-on-load',
				'replacementKey': 'WebNeedsNegotiator'
			}, {
				'radioSetName': 'Infra-Needs',
				'choiceSetLabelSpanID': 'choice-set-label_Infra-needs-negotiator',
				'affirmativeLabelSpanID': 'affirmative-label_Infra-needs-negotiator',
				'negativeLabelSpanID': 'negative-label_Infra-needs-negotiator',
				'hiddenrecordKeeperID': 'infra-needs-negotiator-on-load',
				'replacementKey': 'InfraNeedsNegotiator'
			}, {
				'radioSetName': 'RE-Needs',
				'choiceSetLabelSpanID': 'choice-set-label_RE-needs-negotiator',
				'affirmativeLabelSpanID': 'affirmative-label_RE-needs-negotiator',
				'negativeLabelSpanID': 'negative-label_RE-needs-negotiator',
				'hiddenrecordKeeperID': 're-needs-negotiator-on-load',
				'replacementKey': 'RENeedsNegotiator'
			}, {
				'radioSetName': 'IRB-Needs',
				'choiceSetLabelSpanID': 'choice-set-label_IRB-review-discussee',
				'affirmativeLabelSpanID': 'affirmative-label_IRB-review-discussee',
				'negativeLabelSpanID': 'negative-label_IRB-review-discussee',
				'hiddenrecordKeeperID': 'irb-review-discussee-on-load',
				'replacementKey': 'IRBReviewDiscussee'
			}, {
				'radioSetName': 'EH-Needs',
				'choiceSetLabelSpanID': 'choice-set-label_EH-needs-negotiator',
				'affirmativeLabelSpanID': 'affirmative-label_EH-needs-negotiator',
				'negativeLabelSpanID': 'negative-label_EH-needs-negotiator',
				'hiddenrecordKeeperID': 'eh-needs-negotiator-on-load',
				'replacementKey': 'EHNeedsNegotiator'
			}
		];

		// for each form config data set
		$.each(spanIDsAndReplacementKeySets, function (i, spanIDsAndReplacementKeySet) {

			// get the value that will replace the placeholders (and possibly be recorded in hidden fields)
			var recordedValue = $("input#" + spanIDsAndReplacementKeySet.hiddenrecordKeeperID).val();
			var replacementValue = '';
			var replacementPersonObjectsArray = gpcGroups[spanIDsAndReplacementKeySet.replacementKey];
			var personCount = replacementPersonObjectsArray.length;

			if (personCount == 1) {
				replacementValue += replacementPersonObjectsArray[0]['name'];
			} else if (personCount == 2) {
				replacementValue += replacementPersonObjectsArray[0]['name'] + ' and/or ' + replacementPersonObjectsArray[1]['name'];
			} else if (personCount > 2) {
				$.each(replacementPersonObjectsArray, function (i, replacementPersonObject) {
					if (i != 0) { replacementValue += ', '; }
					if (i == (personCount - 1)) { replacementValue += ' and/or '; }
					replacementValue += replacementPersonObjectsArray[i]['name'];
				});
			}

			// if a hidden value already exists and the names are not locked down
			if (recordedValue != "" && $("input#names-locked").val() != "1") {
				// if the hidden value doesn't match the new value
				if (recordedValue != replacementValue) {
					// if a radio button has been selected
					if ($("input[name='" + spanIDsAndReplacementKeySet.radioSetName + "']").is(":checked")) {
						// if the value of the selected radio button is not "notApplicable"
						if ($("input[name='" + spanIDsAndReplacementKeySet.radioSetName + "']:checked").val() != 'notApplicable') {
							// iterate over all buttons in the group
							$("input[name='" + spanIDsAndReplacementKeySet.radioSetName + "']").each(function (i, radioButton) {
								// unset both checked property and checked attribute (the attribute setting is triggered by an event listener in initialization function)
								$(radioButton).prop('checked', false).removeAttr("checked");
							});

							// present a message to user
							var displacementValue = '<p class=\"submission-notice-addition emphasis\">' +
								recordedValue + '	has been replaced by ' +
								replacementValue + ' in the Project Needs section of this request. ' +
								'	Your response has been cleared from the corresponding field. ' +
								'	Please ensure that relevant needs have been discussed with ' +
								replacementValue + ' and respond to this field again.' +
								'</p>';
							$("div#submission-notice").prepend(displacementValue);
						}
					}
				}
			}

			$("span#" + spanIDsAndReplacementKeySet.choiceSetLabelSpanID).text(replacementValue);
			$("span#" + spanIDsAndReplacementKeySet.affirmativeLabelSpanID).text(replacementValue);
			$("span#" + spanIDsAndReplacementKeySet.negativeLabelSpanID).text(replacementValue);
			$("input#" + spanIDsAndReplacementKeySet.hiddenrecordKeeperID).val(replacementValue);
		});
	};



	$.fn.ReturnGPCInitialConceptApprovalRequestAdditionalViewAccess = function (incomingArgs) {

		var gpcGroups = $().ReturnGPCGroups();
		var hasViewPermission = 0;

		// don't allow view access to requests that are in development -- this is the reason we can't
		//		just put the relevant names in the ViewAccess column in ComponentLog
		if (incomingArgs.rData.requestStatus != "In Development") {
			$.each(gpcGroups.InitialConceptViewAccess, function (i, person) {
				if (person.accountLong === uData.account) {
					hasViewPermission = 1;
				}
			});
		}
		return hasViewPermission;
	};



	$.fn.ReturnGPCSubmissionApprovalRequestAdditionalViewAccess = function (incomingArgs) {

		var gpcGroups = $().ReturnGPCGroups();
		var hasViewPermission = 0;

		// don't allow view access to requests that are in development -- this is the reason we can't
		//		just put the relevant names in the ViewAccess column in ComponentLog
		if (incomingArgs.rData.requestStatus != "In Development") {
			$.each(gpcGroups.SubmissionApprovalViewAccess, function (i, person) {
				if (person.accountLong === uData.account) {
					hasViewPermission = 1;
				}
			});
		}

		return hasViewPermission;
	};



	$.fn.ReturnGPCPeopleEditingAccess = function () {

		var gpcGroups = $().ReturnGPCGroups();
		var hasViewPermission = 0;

		$.each(gpcGroups.EditGPCPeople, function (i, person) {
			if (person.accountLong === uData.account) {
				hasViewPermission = 1;
			}
		});

		return hasViewPermission;
	};



	$.fn.ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess = function (rStatus) {

		if (typeof (rStatus) == "undefined" || rStatus === null) {
			rStatus = rData.requestStatus;
		}

		var gpcGroups = $().ReturnGPCGroups();
		var writeAccess = 0;

		// if RS == Pending Approval or Approval Pending Comments
		if (rStatus == 'Pending Approval' || rStatus == 'Approval Pending Comments') {

			// if the current user is one of the people who can edit
			$.each(gpcGroups.EditProjectNarrative, function (i, person) {
				if (person.accountLong == uData.account) {
					writeAccess = 1;
				}
			});
		}

		return writeAccess;
	};



	$.fn.ReturnGPCSubmissionApprovalRequestProjectBudgetWriteAccess = function (rStatus) {

		if (typeof (rStatus) == "undefined" || rStatus === null) {
			rStatus = rData.requestStatus;
		}

		var gpcGroups = $().ReturnGPCGroups();
		var writeAccess = 0;

		// if RS == Pending Approval or Approval Pending Comments
		if (rStatus == 'Pending Approval' || rStatus == 'Approval Pending Comments') {

			// if the current user is one of the people who can edit
			$.each(gpcGroups.EditProjectBudget, function (i, person) {
				if (person.accountLong == uData.account) {
					writeAccess = 1;
				}
			});
		}

		return writeAccess;
	};



	$.fn.ReturnGPCSubmissionApprovalRequestProjectBudgetJustificationWriteAccess = function (rStatus) {

		if (typeof (rStatus) == "undefined" || rStatus === null) {
			rStatus = rData.requestStatus;
		}

		var gpcGroups = $().ReturnGPCGroups();
		var writeAccess = 0;

		// if RS == Pending Approval or Approval Pending Comments
		if (rStatus == 'Pending Approval' || rStatus == 'Approval Pending Comments') {

			// if the current user is one of the people who can edit
			$.each(gpcGroups.EditProjectBudgetJustification, function (i, person) {
				if (person.accountLong == uData.account) {
					writeAccess = 1;
				}
			});
		}

		return writeAccess;
	};



	$.fn.UserIsInFieldOfAllRequestData = function (fieldName) {

		var UserIsInFieldOfAllRequestData = 0;

		if (typeof (rData.formData) !== "undefined") {

			var fieldPeopleArray = rData['formData'][ReplaceAll("\\.", "", ReplaceAll(" ", "-", fieldName))];

			if (Array.isArray(fieldPeopleArray)) {
				$.each(fieldPeopleArray, function (i, fieldPerson) {
					if (fieldPerson.account == uData.account) {
						UserIsInFieldOfAllRequestData = 1;
					}
				});
			}
		}

		return UserIsInFieldOfAllRequestData;
	};


	$.fn.SetGPCInitialConceptApprovalRequestNonWriteAccess = function () {

		// context:
		//		1 - some users are given view permissions in other functions
		//		2 - since these people are not admins, they have the same field editing permissions as the requester 
		//			(because standard setup assumes that anyone who can view and isn't the admin is the requester)
		//		3 - they should not have editing rights
		//		5 - PI, PD, etc. are treated as the requester
		//		6 - Don't do anything at all if this is a new request (RS = ""); anyone can begin a new request

		// for viewers who are not admin and not requester / PI / co-PI / PD,
		//		1 - all non-file fields will be disabled
		//		2 - file fields will be "disabled" if

		// don't do anything if this is a new request
		if ($("input#Request-Status").val() != "") {

			// set up vars; start off assuming that editing rights will be deined
			var userIsAdminOrRequester = 0;

			// determine whether or not the viewer is both not an admin and not a requester; only for such a viewer do we need to consider the possibility of special editing rights
			if (uData.isAdmin == 1 || $().UserIsInFieldOfAllRequestData("Requested For") == 1 || $().UserIsInFieldOfAllRequestData("MOS Principal Investigator") == 1 || $().UserIsInFieldOfAllRequestData("MOS Co-Investigator") == 1 || $().UserIsInFieldOfAllRequestData("Proposal Developer") == 1) {
				userIsAdminOrRequester = 1;
			}

			// if this user is NOT admin or requester
			if (userIsAdminOrRequester == 0) {

				// 1 - disable non-file fields

				// handle inputs
				$("#request-form").find('input').each(function () {
					var thisInputID = $(this).attr("id");
					if (thisInputID.indexOf('TopSpan_HiddenInput') < 0) {
						var thisInputType = $(this).attr("type");
						$('#' + thisInputID).addClass('disabled');
						if (thisInputType != "file" && thisInputType != "hidden" && thisInputType != "button") {
							$().SetFieldToDisabled('#' + thisInputID);
						}
					}
				});

				// handle people pickers
				$("#request-form").find('div[data-control-type="PeoplePicker"]').each(function () {
					var thisPeoplePickerID = $(this).attr("id");
					$('#' + thisPeoplePickerID).addClass('disabled');
					$().SetFieldToDisabled('#' + thisPeoplePickerID);
				});

				// handle selects
				$("#request-form").find('select').each(function () {
					var thisSelectID = $(this).attr("id");
					$('#' + thisSelectID).addClass('disabled');
					$().SetFieldToDisabled('#' + thisSelectID);
				});

				// handle others
				$('textarea#PID-Comments').addClass('disabled');
				// $('textarea#EEP-Staff-Member-Names').addClass('disabled');
				// $('textarea#EDC-Staff-Member-Names').addClass('disabled');
				// $('textarea#New-Staff-Positions').addClass('disabled');
				$().SetFieldToDisabled('textarea#PID-Comments');
				// $().SetFieldToDisabled('textarea#EEP-Staff-Member-Names');
				// $().SetFieldToDisabled('textarea#EDC-Staff-Member-Names');
				// $().SetFieldToDisabled('textarea#New-Staff-Positions');

				$("div#label-and-control_Request-Nickname").hide("fast").addClass("hidden");
				$("div#label-and-control_Requester-Cancellation").hide("fast").addClass("hidden");
				$("div#label-and-control_Ready-for-Submission-to-Committee").hide("fast").addClass("hidden");
				$("div#rfp-or-other-website-link_help-note").hide("fast").addClass("hidden");
				$("input#Proposal-Due-Date").datepicker("destroy");
				$("input#Expected-Decision-Date").datepicker("destroy");


				// 2 - disable file fields

				// project narrative
				if ($().ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess() == 0) {
					$().SetFieldToDisabled("#Project-Description-File");
				}
			}
		}
	};



	$.fn.SetGPCSubmissionApprovalRequestNonWriteAccess = function () {

		// context:
		//		1 - some users are given view permissions in other functions
		//		2 - since these people are not admins, they have the same field editing permissions as the requester 
		//			(because standard setup assumes that anyone who can view and isn't the admin is the requester)
		//		3 - for most fields they should not have editing rights
		//		4 - some of these people should have the right to edit particular fields during particular request statuses; 
		//			it just happens to be the case that the fields they should be able to edit are file fields; therefore,
		//			all non-file fields can always be disabled for these people
		//		5 - PI, PD, etc. are treated as the requester
		//		6 - Don't do anything at all if this is a new request (RS = ""); anyone can begin a new request

		// for viewers who are not admin and not requester / PI / co-PI / PD,
		//		1 - all non-file fields will be disabled
		//		2 - file fields will be "disabled" if

		// don't do anything if this is a new request
		if ($("input#Request-Status").val() != "") {

			// set up vars; start off assuming that editing rights will be deined
			var userIsAdminOrRequester = 0;
			/*var someUsersHavepecialEditingRightsThisRequestStatus = 0;
			var userMayHaveSpecialEditingRightsForThisRequestStatus = 0;*/

			// determine whether or not the viewer is both not an admin and not a requester; only for such a viewer do we need to consider the possibility of special editing rights
			if (uData.isAdmin == 1 || $().UserIsInFieldOfAllRequestData("Requested For") == 1 || $().UserIsInFieldOfAllRequestData("MOS Principal Investigator") == 1 || $().UserIsInFieldOfAllRequestData("MOS Co-Investigator") == 1 || $().UserIsInFieldOfAllRequestData("Proposal Developer") == 1) {
				userIsAdminOrRequester = 1;
			}

			/*// determine whether or not the current RS is one in which special editing rights should be considered
			if ($("input#Request-Status").val() == "Pending Approval") {
				someUsersHavepecialEditingRightsThisRequestStatus = 1;
			}
			
			// determine whether or not we should consider special editing rights for this viewer given the current RS
			if (userIsAdminOrRequester == 0 && someUsersHavepecialEditingRightsThisRequestStatus == 1) {
				userMayHaveSpecialEditingRightsForThisRequestStatus = 1;
			}*/

			// if this user is NOT admin or requester
			if (userIsAdminOrRequester == 0) {

				// 1 - disable and make optional non-file fields

				// handle inputs
				$("#request-form").find('input').each(function () {
					var thisInputID = $(this).attr("id");
					if (thisInputID.indexOf('TopSpan_HiddenInput') < 0) {
						var thisInputType = $(this).attr("type");
						var thisInputIsDate = $(this).attr("data-is-date");
						$('#' + thisInputID).addClass('disabled');
						if (thisInputType != "file" && thisInputType != "hidden" && thisInputType != "button") {
							$().SetFieldToDisabled('#' + thisInputID);
							$().SetFieldToOptional(thisInputID, thisInputType);
						}
						if (thisInputType === "text" && typeof (thisInputIsDate) !== "undefined" && thisInputIsDate === "true") {
							var thisInputDateISO = $().ReturnFormattedDateTime($('#' + thisInputID).val(), 'MMMM D, YYYY', null);
							$('#' + thisInputID).attr('data-iso-date-on-load', thisInputDateISO);
						}
					}
				});

				// handle people pickers
				$("#request-form").find('div[data-control-type="PeoplePicker"]').each(function () {
					var thisPeoplePickerID = $(this).attr("id");
					$('#' + thisPeoplePickerID).addClass('disabled');
					$().SetFieldToDisabled('#' + thisPeoplePickerID);
					$().SetFieldToOptional(thisPeoplePickerID, "peoplepicker");
				});

				// handle selects
				$("#request-form").find('select').each(function () {
					var thisSelectID = $(this).attr("id");
					$('#' + thisSelectID).addClass('disabled');
					$().SetFieldToDisabled('#' + thisSelectID);
					$().SetFieldToOptional(thisSelectID, "select");
				});

				// handle others
				$('textarea#PID-Comments').addClass('disabled');
				$('textarea#EEP-Staff-Member-Names').addClass('disabled');
				$('textarea#EDC-Staff-Member-Names').addClass('disabled');
				$('textarea#New-Staff-Positions').addClass('disabled');
				$().SetFieldToDisabled('textarea#PID-Comments');
				$().SetFieldToDisabled('textarea#EEP-Staff-Member-Names');
				$().SetFieldToDisabled('textarea#EDC-Staff-Member-Names');
				$().SetFieldToDisabled('textarea#New-Staff-Positions');

				$("div#label-and-control_Request-Nickname").hide("fast").addClass("hidden");
				$("div#label-and-control_Requester-Cancellation").hide("fast").addClass("hidden");
				$("div#label-and-control_Ready-for-Submission-to-Committee").hide("fast").addClass("hidden");
				$("div#rfp-or-other-website-link_help-note").hide("fast").addClass("hidden");
				$("input#Proposal-Due-Date").datepicker("destroy");
				$("input#Expected-Decision-Date").datepicker("destroy");


				// 2 - disable and make optional file fields

				// project narrative
				if ($().ReturnGPCSubmissionApprovalRequestProjectNarrativeWriteAccess() == 0) {
					$().SetFieldToDisabled("#Project-Narrative-File");
					$().SetFieldToOptional("Project-Narrative-File", "mosFile");
				}

				// project budget
				if ($().ReturnGPCSubmissionApprovalRequestProjectBudgetWriteAccess() == 0) {
					$().SetFieldToDisabled("#Project-Budget-File");
					$().SetFieldToOptional("Project-Budget-File", "mosFile");
				}

				// project budget justification
				if ($().ReturnGPCSubmissionApprovalRequestProjectBudgetJustificationWriteAccess() == 0) {
					$().SetFieldToDisabled("#Project-Budget-Justification-File");
					$().SetFieldToOptional("Project-Budget-Justification-File", "mosFile");
				}
			}
		}
	};



	$.fn.EnableGPCSubmissionApprovalRequestStatusManagement = function () {

		// get gpcGroups (people) data
		var gpcGroups = $().ReturnGPCGroups();
		// console.log(gpcGroups);

		var requestStatusChangers = gpcGroups.UseChangeRequestStatus;
		// console.log(requestStatusChangers);
		var requestStatusChangerAccountsComparisonBank = [];
		$.each(requestStatusChangers, function (i, requestStatusChangerObject) {
			requestStatusChangerAccountsComparisonBank.push(requestStatusChangerObject.account);
		});
		// console.log(requestStatusChangerAccountsComparisonBank);
		var thisUserAccountBrief = ReplaceAll("i:0#.f\\|membership\\|", "", ReplaceAll("@mos.org", "", uData.account.toLowerCase()));
		// console.log(thisUserAccountBrief);
		if (requestStatusChangerAccountsComparisonBank.indexOf(thisUserAccountBrief) > -1) {
			$('div#label-and-control_Change-Request-Status').show("fast").removeClass("hidden");
			$().SetFieldToEnabled('#Change-Request-Status');
		}
	};



	$.fn.RedisableGPCSubmissionApprovalCommitteeResponses = function () {

		/*
			See comment at beginning of $.fn.EnableGPCSubmissionApprovalCommitteeResponses.
		*/

		$('div.approver-container').each(function () {

			var scopeContainerID = $(this).attr('id');

			$('#' + scopeContainerID + ' input[name^="Approval-Indicator"]').each(function (i, radioButton) {
				var radioButtonID = $(radioButton).attr('id');
				$().SetFieldToDisabled('#' + radioButtonID, "RedisableGPCSubmissionApprovalCommitteeResponses");
			});

			var textareaID = $('#' + scopeContainerID + ' textarea[id^="Approval-Notes"]').attr('id');
			$().SetFieldToDisabled('#' + textareaID);

		});
	};



	$.fn.EnableGPCSubmissionApprovalCommitteeResponses = function () {

		/*	For each approval node, the header needs to be set any time it is visible, but the controls should be 
			enabled only when they can be used. However, the algo for determining each is essentially the same and 
			is complex. In the future, the algo should be externalized from this function and setting the headers 
			and enabling the controls should happen independently. For now, we both set headers and enable controls, 
			and we'll separately re-disable controls when appropriate. 
		*/


		// get gpcGroups (people) data
		var gpcGroups = $().ReturnGPCGroups();

		// for each approval
		$('div.approver-container').each(function () {

			var scopeContainerID = $(this).attr('id');

			var approverKey = $('#' + scopeContainerID).attr("data-approver-key");
			var approvers = gpcGroups[approverKey];

			// get name(s) of approver(s)
			var namesOfAllApprovers = "";
			var personCount = approvers.length;

			if (personCount == 1) {
				namesOfAllApprovers += approvers[0]['name'];
			} else if (personCount == 2) {
				namesOfAllApprovers += approvers[0]['name'] + ' or ' + approvers[1]['name'];
			} else if (personCount > 2) {
				$.each(approvers, function (i, approverObject) {
					if (i != 0) { namesOfAllApprovers += ', '; }
					if (i == (personCount - 1)) { namesOfAllApprovers += 'or '; }
					namesOfAllApprovers += approvers[i]['name'];
				});
			}

			var nameOfPastApprover = $('#' + scopeContainerID + ' input[id^="Approval-Signature"]').val();

			// if there's no one who can approve
			if (typeof (approvers) == "undefined") {
				// if someone has already approved
				if (nameOfPastApprover != "") {
					// use that person's name for the header and otherwise leave the approval alone
					$('#' + scopeContainerID).find("h3").text(nameOfPastApprover);
					// if no one has approved yet
				} else {
					// hide it
					$('#' + scopeContainerID).hide("fast").addClass("hidden");
				}

				// if there IS at least one person who can approve
			} else {

				// if someone has already approved but this person IS NOT someone who can approve now
				if (nameOfPastApprover != "" && StrInStr(namesOfAllApprovers, nameOfPastApprover) == false) {

					// keep the past approval in place and add the past approver's name to the header -- this is a very uncommon occurrence, so we intentionally
					//		do not account for it when constructing the header string above
					if (personCount == 1) {
						namesOfAllApprovers += ' or ' + nameOfPastApprover;
					} else if (personCount == 2) {
						namesOfAllApprovers = ReplaceAll(' or ', ', ', namesOfAllApprovers);
						namesOfAllApprovers += ' or ' + nameOfPastApprover;
					} else if (personCount > 2) {
						namesOfAllApprovers = ReplaceAll(', or ', ', ', namesOfAllApprovers);
						namesOfAllApprovers += ', or ' + nameOfPastApprover;
					}

					// set h3
					$('#' + scopeContainerID).find("h3").text(namesOfAllApprovers);

					// if no one has approved yet OR if someone has approved and that person is still eligible to approve
				} else {

					// set h3
					$('#' + scopeContainerID).find("h3").text(namesOfAllApprovers);

					// if the current user is one of the people who can approve
					var approverAccountsComparisonBank = [];
					$.each(approvers, function (i, approverObject) {
						approverAccountsComparisonBank.push(approverObject.account);
					});

					var thisUserAccountBrief = ReplaceAll("i:0#.f\\|membership\\|", "", ReplaceAll("@mos.org", "", uData.account.toLowerCase()));

					if (approverAccountsComparisonBank.indexOf(thisUserAccountBrief) > -1) {

						// un-disable fields

						// radio buttons
						$('#' + scopeContainerID + ' input[name^="Approval-Indicator"]').each(function (i, radioButton) {
							var radioButtonID = $(radioButton).attr('id');
							$().SetFieldToEnabled('#' + radioButtonID);
						});

						// textarea
						var textareaID = $('#' + scopeContainerID + ' textarea[id^="Approval-Notes"]').attr('id');
						$().SetFieldToEnabled('#' + textareaID);
					}
				}
			}
		});

		// enable the other reviewers' comments textarea
		var otherReviewers = gpcGroups.OtherSubmissionReviewers;
		var otherReviewerAccountsComparisonBank = [];
		$.each(otherReviewers, function (i, otherReviewerObject) {
			otherReviewerAccountsComparisonBank.push(otherReviewerObject.account);
		});
		var thisUserAccountBrief = ReplaceAll("i:0#.f\\|membership\\|", "", ReplaceAll("@mos.org", "", uData.account.toLowerCase()));
		if (otherReviewerAccountsComparisonBank.indexOf(thisUserAccountBrief) > -1) {
			// un-disabletextarea
			$().SetFieldToEnabled('#New-Other-Preservable-Notes');
		}
	};



	$.fn.EnableGPCConceptApprovalCommitteeResponses = function () {

		// get gpcGroups (people) data
		var gpcGroups = $().ReturnGPCGroups();

		// enable the other reviewers' comments textarea
		var otherReviewers = gpcGroups.OtherConceptReviewers;
		var otherReviewerAccountsComparisonBank = [];
		$.each(otherReviewers, function (i, otherReviewerObject) {
			otherReviewerAccountsComparisonBank.push(otherReviewerObject.account);
		});
		var thisUserAccountBrief = ReplaceAll("i:0#.f\\|membership\\|", "", ReplaceAll("@mos.org", "", uData.account.toLowerCase()));
		if (otherReviewerAccountsComparisonBank.indexOf(thisUserAccountBrief) > -1) {
			// un-disabletextarea
			$().SetFieldToEnabled('#GPC-Comments');
		}
	};



	$.fn.SetInHouseNeedsSheetRequestAdditionalViewAccess = function () {
		$("input#View-Access").val(mData.viewAccess);
	};



	$.fn.ImportGPCConceptRequestDataToGPCSubmissionRequest = function (requestID) {

		var conceptRData = $().GetFieldsFromOneRow({
			"listName": "swfList",
			"webURL": "https://bmos.sharepoint.com/sites/gpc-concept",
			"select": [{
				"nameHere": "formData",
				"nameInList": "AllRequestData"
			}],
			"where": {
				"field": "ID",
				"type": "Number",
				"value": requestID,
			}
		});

		console.log(conceptRData);

		var conceptRDataSelected = {};

		if ("Project-Title" in conceptRData.formData) { conceptRDataSelected["Project-Title"] = conceptRData.formData["Project-Title"]; }
		if ("MOS-Principal-Investigator" in conceptRData.formData) { conceptRDataSelected["MOS-Principal-Investigator"] = conceptRData.formData["MOS-Principal-Investigator"]; }
		if ("MOS-Co-Investigator" in conceptRData.formData) { conceptRDataSelected["MOS-Co-Investigator"] = conceptRData.formData["MOS-Co-Investigator"]; }
		if ("Proposal-Developer" in conceptRData.formData) { conceptRDataSelected["Proposal-Developer"] = conceptRData.formData["Proposal-Developer"]; }

		if ("Funder" in conceptRData.formData) { conceptRDataSelected["Funder"] = conceptRData.formData["Funder"]; }
		if ("RFP-or-Other-Relevant-Website" in conceptRData.formData) { conceptRDataSelected["RFP-or-Other-Relevant-Website"] = conceptRData.formData["RFP-or-Other-Relevant-Website"]; }
		if ("Proposal-Type" in conceptRData.formData) { conceptRDataSelected["Proposal-Type"] = conceptRData.formData["Proposal-Type"]; }
		if ("Proposal-Due-Date" in conceptRData.formData) { conceptRDataSelected["Proposal-Due-Date"] = conceptRData.formData["Proposal-Due-Date"]; }
		if ("museum-role_primerecipient" in conceptRData.formData) { conceptRDataSelected["museum-role_primerecipient"] = conceptRData.formData["museum-role_primerecipient"]; }
		if ("museum-role_subawardee" in conceptRData.formData) { conceptRDataSelected["museum-role_subawardee"] = conceptRData.formData["museum-role_subawardee"]; }
		if ("Prime-Institution" in conceptRData.formData) { conceptRDataSelected["Prime-Institution"] = conceptRData.formData["Prime-Institution"]; }
		if ("Outside-PI" in conceptRData.formData) { conceptRDataSelected["Outside-PI"] = conceptRData.formData["Outside-PI"]; }

		if ("MOS-Direct-Costs" in conceptRData.formData) { conceptRDataSelected["MOS-Direct-Costs"] = conceptRData.formData["MOS-Direct-Costs"]; }
		if ("IDC" in conceptRData.formData) { conceptRDataSelected["IDC"] = conceptRData.formData["IDC"]; }
		if ("Total-MOS-Budget" in conceptRData.formData) { conceptRDataSelected["Total-MOS-Budget"] = conceptRData.formData["Total-MOS-Budget"]; }
		if ("Total-Project-Budget" in conceptRData.formData) { conceptRDataSelected["Total-Project-Budget"] = conceptRData.formData["Total-Project-Budget"]; }


		PopulateFormData("div#request-form", conceptRDataSelected, "https://bmos.sharepoint.com/sites/vxo-function/Lists/SWFList", requestID, undefined);

		if (typeof ($("input#Proposal-Due-Date").val()) != "undefined" && $("input#Proposal-Due-Date").val() != "") {
			$("input#Proposal-Due-Date").attr('data-iso-date-on-load', $("input#Proposal-Due-Date").val());
			$("input#Proposal-Due-Date").val($().ReturnFormattedDateTime($("input#Proposal-Due-Date").val(), null, 'MMMM D, YYYY', 0));
		}

		if ("museum-role_subawardee" in conceptRData.formData) {
			$("div#label-and-control_Prime-Institution").show("fast").removeClass("hidden");
			$("div#label-and-control_Outside-PI").show("fast").removeClass("hidden");
		}
	};



	$.fn.SetProgressBarValue = function (progressBarID, value) {
		$('#' + progressBarID).attr('value', value)
	};



	$.fn.ReturnFileSizeFormattedToOneSignificantDigit = function (fileSize) {
		var fileSizeString = fileSize.toFixed(1).toString();
		var quantityOfDigitsInFileSizeString = fileSizeString.length;
		var lastDigitInFileSizeString = fileSizeString.charAt(quantityOfDigitsInFileSizeString - 1);
		if (lastDigitInFileSizeString == "0") {
			fileSizeString = fileSizeString.substring(0, quantityOfDigitsInFileSizeString - 2);
		}
		return fileSizeString;
	};



	$.fn.DeleteRequestFileAttachment = function (fileFieldID) {

		// get references to DOM elements
		var fileStorageNameID = $("#" + fileFieldID).find("div.mos-drag-and-drop-file-storage input.mos-drag-and-drop-file-name").attr("id");
		var fileStorageSizeID = $("#" + fileFieldID).find("div.mos-drag-and-drop-file-storage  input.mos-drag-and-drop-file-size").attr("id");
		var fileStorageTypeClassID = $("#" + fileFieldID).find("div.mos-drag-and-drop-file-storage input.mos-drag-and-drop-file-type-class").attr("id");

		var fileWasAttached = typeof ($("#" + fileStorageNameID).val()) !== "undefined" && $("#" + fileStorageNameID).val() !== "";
		var fileIsInQuarkFiles = $("div#" + fileFieldID).find("input.mos-drag-and-drop-file-in-quark-files").val();

		// delete file attachment, if it exists and is not a Quark file
		if (fileIsInQuarkFiles != 1 && fileWasAttached) {
			// if (fileIsInQuarkFiles != 1) {
			var attachmentToDeleteURI = mData.fullSiteBaseURL + "/Lists/SWFList/Attachments/" + rData.requestID + "/" + $("#" + fileStorageNameID).val();
			$().SPServices({
				operation: "DeleteAttachment",
				listName: mData.defaultListNameForSWFRequestData,
				listItemID: rData.requestID,
				url: attachmentToDeleteURI,
				completefunc: function (xData, Status) {

					var deletionSuccess = $().HandleListUpdateReturn(xData, Status, 'Hub Attachment Deletion Error');

					if (deletionSuccess === 1) {

						// update last modified time
						$().UpdateLastModifiedFileAttachment();

						// clear hidden input
						$("#" + fileStorageNameID).val("");
						$("#" + fileStorageSizeID).val("");
						$("#" + fileStorageTypeClassID).val("");

						// reset the UI to the populateable state
						$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-name").text("");
						$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-size").text("");
						$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-preview")
							.removeClass("specific-image word-file excel-file powerpoint-file pdf-file tiff-file ai-file eps-file svg-file text-file generic-file")
							.removeAttr("style");

						// set state
						$("#" + fileFieldID).removeClass('replaceable attached attachment-completed').addClass('populatable');

						// hide confirmation display
						$('div#overlays-screen-container').fadeOut(200);
						$('div#delete-file-attachment').fadeOut(200);
					} else {
						// to do

					}
				}
			});
			// if this is a Quark file or no file was attached
		} else {
			// don't try delete the file, but update the UI as if the file was deleted

			// clear hidden input
			$("#" + fileStorageNameID).val("");
			$("#" + fileStorageSizeID).val("");
			$("#" + fileStorageTypeClassID).val("");
			$("div#" + fileFieldID).find("input.mos-drag-and-drop-file-in-quark-files").val("");

			// reset the UI to the populateable state
			$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-name").text("");
			$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-size").text("");
			$("#" + fileFieldID).find("a.mos-drag-and-drop-file-container").find("div.mos-drag-and-drop-file-preview")
				.removeClass("specific-image word-file excel-file powerpoint-file pdf-file tiff-file ai-file eps-file svg-file text-file generic-file")
				.removeAttr("style");

			// set state
			$("#" + fileFieldID).removeClass('replaceable attached attachment-completed attachment-error').addClass('populatable');
			$("#" + fileFieldID).closest("div.label-and-control").removeClass('contains-errors');
			$("#" + fileFieldID).closest("div.label-and-control").find("div.error-message").remove();

			// hide confirmation display
			$('div#overlays-screen-container').fadeOut(200);
			$('div#delete-file-attachment').fadeOut(200);
		}
	};



	$.fn.UploadRequestFileAttachment = function (file, controlID) {

		// if file exists / is not undefined
		if (typeof (file) != 'undefined') {

			// check that file size does not exceed 2GB limit
			if (file.size <= 2000000000) {

				// disable form submit button; this will be re-enabled when the last modified timestamp is updated
				$("a#form-submit-button").attr("disabled", "true");

				// unset any validation errors

				$("#" + controlID).closest("div.control").parent("div.label-and-control").removeClass('contains-errors');
				$("#" + controlID).removeClass('attachment-error');
				$("#" + controlID).closest("div.control").find('div.error-message').remove();

				// get IDs of DOM elements that will be updated

				// starting from the file input, get parent containers
				var fileInputID = $("#" + controlID).find("div.mos-drag-and-drop-file-input").attr("id");
				var filePresentationContainerID = $("#" + controlID).find("a.mos-drag-and-drop-file-container").attr("id");
				var fileStorageContainerID = $("#" + controlID).find("div.mos-drag-and-drop-file-storage").attr("id");
				// inside the presentation container
				var fileUploadIconID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-upload-icon").attr("id");
				var filePreviewID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-preview").attr("id");
				var fileNameAndSizePresentationID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-name-and-size").attr("id");
				var fileControlID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-control").attr("id");
				var progressBarID = $("#" + filePresentationContainerID).find("div.mos-drag-and-drop-file-progress progress").attr("id");
				// inside the storage container
				var fileStorageNameID = $("#" + fileStorageContainerID).find("input.mos-drag-and-drop-file-name").attr("id");
				var fileStorageSizeID = $("#" + fileStorageContainerID).find("input.mos-drag-and-drop-file-size").attr("id");
				var fileStorageTypeClassID = $("#" + fileStorageContainerID).find("input.mos-drag-and-drop-file-type-class").attr("id");

				// declare placeholders
				var attachedFileURL = "";
				var fileTypeClass = "";
				var tempSaveSuccess = 0;

				// set the file's name and size in the UI

				// perform some file size conversions
				var fileSizeInKB = file.size / 1000;
				var fileSizeInMB = fileSizeInKB / 1000;
				var fileSizeInGB = fileSizeInMB / 1000;

				// set fileSizeToReport to the first file size conversion to be less than 4 digits
				var fileSizeToReport = "";
				if (Math.round(fileSizeInKB) > 0 && Math.round(fileSizeInKB) < 1000) {
					fileSizeToReport = fileSizeInKB;
					fileSizeToReport = $().ReturnFileSizeFormattedToOneSignificantDigit(fileSizeToReport);
					fileSizeToReport = fileSizeToReport + " KB";
				} else if (Math.round(fileSizeInMB) > 0 && Math.round(fileSizeInMB) < 1000) {
					fileSizeToReport = fileSizeInMB;
					fileSizeToReport = $().ReturnFileSizeFormattedToOneSignificantDigit(fileSizeToReport);
					fileSizeToReport = fileSizeToReport + " MB";
				} else if (Math.round(fileSizeInGB) > 0 && Math.round(fileSizeInGB) < 1000) {
					fileSizeToReport = fileSizeInGB;
					fileSizeToReport = $().ReturnFileSizeFormattedToOneSignificantDigit(fileSizeToReport);
					fileSizeToReport = fileSizeToReport + " GB";
				} else {
					fileSizeToReport = file.size + " bytes";
				}

				// set the file info in UI and communicate state change
				$("#" + fileNameAndSizePresentationID).find("div.mos-drag-and-drop-file-name").text(file.name);
				$("#" + fileNameAndSizePresentationID).find("div.mos-drag-and-drop-file-size").text(fileSizeToReport);
				$("#" + controlID).addClass("attaching partial-progress");


				// create a promise to get ID of request to which files will be attached
				var listItemIDRetrievalPromise = new $.Deferred();

				// if a request ID does not already exist
				if (typeof (rData.requestID) == undefined || rData.requestID == 0 || rData.requestID == "") {

					// create a request with minimal temporary content and get the request's ID
					var tempSubmissionValuePairs = [["Title", "Temporary Title"]];
					$().SPServices({
						operation: 'UpdateListItems',
						listName: mData.defaultListNameForSWFRequestData,
						batchCmd: 'New',
						ID: 0,
						valuepairs: tempSubmissionValuePairs,
						completefunc: function (xData, Status) {

							// error handling
							tempSaveSuccess = $().HandleListUpdateReturn(xData, Status, 'Hub Temp Save Error');
							if (tempSaveSuccess != 1) {

								// issue validation error that stops this request from being submitted
								// issue error message indicating we can't save data for this request right now, but please try again later after refreshing this screen
								// TO DO

								console.log("error: item creation");
								// decide: listItemIDRetrievalPromise.resolve();
								// TO DO
							} else {
								// get the request ID
								rData.requestID = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");
								listItemIDRetrievalPromise.resolve();
							}
						}
					});
				} else {
					listItemIDRetrievalPromise.resolve();
				}

				$.when(listItemIDRetrievalPromise).done(function () {

					var esimatedBytesUploadedPerSecond = 350000; // based purely on observation; upload speeds vary considerably, but this seems to create a relatively smooth UX
					var uploadProgressPercentage = .1;
					var uploadComplete = 0;

					$().SetProgressBarValue(progressBarID, uploadProgressPercentage);

					// report 10% progress; this is just to make the user aware that something is happening; 
					//		this doesn't actually correspond to 10% of anything in particular

					// the actual file upload will be represented by the middle ~80% of the progress bar; 
					// 		every second, we'll report estimated progress of 250kb; here, we'll determine the
					//		size of the update increments

					// if the file size is larger than 250000 bytes, in which case we're going to do more than one per-second update 
					if (file.size > esimatedBytesUploadedPerSecond) {
						// calculate how many time to report progress
						var quantityOfProgressReports = Math.floor(file.size / esimatedBytesUploadedPerSecond);
						// calculate what percentage of progress to report
						var estimatedProgressPercentage = +(Math.floor((.8 / quantityOfProgressReports) + "e+2") + "e-2");
						// dr zhivago 	= 2,293,355 / 250,000 	= 9.17342 	|| .8 / 9.17342 = .0872
						// ducks 		= 65,802 / 250,000 		= 0.2632 	|| .8 / 0.2632 = 3.0395...

						// if the file size is NOT larger than 250000 bytes, in which case we're going to do only one per-second update
					} else {
						// we'll report the progress one time
						var quantityOfProgressReports = 1;
						// we'll report all of the progress
						var estimatedProgressPercentage = .8;
					}

					// start async reporting of progress estimates
					setInterval(
						function () {
							if (uploadComplete == 0) {
								uploadProgressPercentage += estimatedProgressPercentage;
								// ensure that progress in this stage is never more than 80%
								if (uploadProgressPercentage > .8) { uploadProgressPercentage = .8; }

								// report estimated progress thus far
								// TO DO

								$().SetProgressBarValue(progressBarID, uploadProgressPercentage);
							}
						}
						, 1000);




					// start the actual file attachment process

					// read the file into memory
					var getFileBuffer = function (file) {

						var deferred = $.Deferred();
						var reader = new FileReader();

						reader.onload = function (e) {
							deferred.resolve(e.target.result);
						}

						reader.onerror = function (e) {
							deferred.reject(e.target.error);
						}

						reader.readAsArrayBuffer(file);

						return deferred.promise();
					};

					// then
					getFileBuffer(file).then(function (buffer) {

						var binary = "";
						var bytes = new Uint8Array(buffer);
						var i = bytes.byteLength;

						// convert it to binary
						while (i--) {
							binary = String.fromCharCode(bytes[i]) + binary;
						}

						// attempt to attach to the request (the SP list item)
						$().SPServices({
							operation: "AddAttachment",
							listName: mData.defaultListNameForSWFRequestData,
							listItemID: rData.requestID,
							fileName: file.name,
							attachment: btoa(binary),
							completefunc: function (xData, Status) {

								// set flag indicating that upload attempt is complete, so that any scheduled incremental progress reports will not occur;
								//		we don't want progress to jump to 100% and then have an incremental report knock it back down to a lower %
								uploadComplete = 1;

								// determine the success of the attempt
								var attachmentSaveSuccess = $().HandleListUpdateReturn(xData, Status, 'Hub Attachment Error');

								// if unsuccessful
								if (attachmentSaveSuccess != 1) {
									// issue attachment error; tell user to delete this and try again; if get this repeatedly, the file may be corrupted, 
									//		but the user can try again later after refreshing the screen
									// TO DO

									$("#" + controlID).removeClass('attaching  partial-progress').addClass('attachment-error');
									$().SetErrorMessage($("#" + controlID), 'We weren\'t able to attach this file. Please delete it and try again.');

									$().HandleListUpdateReturn(xData, Status, 'Hub Attachment Error');


									// if successful
								} else {

									// determine the attached file's URL and the type of preview we'll show
									attachedFileURL = mData.fullSiteBaseURL + "/Lists/SWFList/Attachments/" + rData.requestID + "/" + ReplaceAll(' ', '%20', file.name);

									if (StrInStr(file.type, "jpeg") != false || StrInStr(file.type, "png") != false || StrInStr(file.type, "gif") != false) {
										fileTypeClass = "specific-image";
									} else if (StrInStr(file.type, "wordprocessingml") != false) {
										fileTypeClass = "word-file";
									} else if (StrInStr(file.type, "spreadsheetml") != false) {
										fileTypeClass = "excel-file";
									} else if (StrInStr(file.type, "presentationml") != false) {
										fileTypeClass = "powerpoint-file";
									} else if (StrInStr(file.type, "pdf") != false) {
										fileTypeClass = "pdf-file";
									} else if (StrInStr(file.type, "photoshop") != false) {
										fileTypeClass = "psd-file";
									} else if (StrInStr(file.type, "tiff") != false) {
										fileTypeClass = "tiff-file";
									} else if (StrInStr(file.type, "illustrator") != false) {
										fileTypeClass = "ai-file";
									} else if (StrInStr(file.type, "eps") != false) {
										fileTypeClass = "eps-file";
									} else if (StrInStr(file.type, "svg") != false) {
										fileTypeClass = "svg-file";
									} else if (StrInStr(file.type, "text") != false) {
										fileTypeClass = "text-file";
									} else {
										fileTypeClass = "generic-file";
									}

									// communicate state changes and set to final state, including not only UI but data storage so that file can be re-rendered on reload
									uploadProgressPercentage = 1;
									$().SetProgressBarValue(progressBarID, uploadProgressPercentage);
									$("#" + controlID).removeClass('partial-progress').addClass('full-progress');
									setTimeout(function () {
										$("#" + controlID).removeClass('attaching  full-progress').addClass('attachment-completed');
										if (fileTypeClass == "specific-image") {
											$("#" + filePreviewID).css("background-image", "url(" + attachedFileURL + ")");
										}
										$("#" + filePreviewID).addClass(fileTypeClass).css("opacity", 1);
									}, 500);

									$("input#" + fileStorageNameID).val(file.name);
									$("input#" + fileStorageSizeID).val(fileSizeToReport);
									$("input#" + fileStorageTypeClassID).val(fileTypeClass);

									setTimeout(function () {
										$("#" + fileUploadIconID).css("opacity", 0);
										$("#" + filePresentationContainerID).attr("href", attachedFileURL);
										$("#" + controlID).removeClass('populatable').addClass('replaceable');
									}, 500);

									setTimeout(function () {
										$().UpdateLastModifiedFileAttachment();
									}, 5000);

								}
							}
						});
					});

				});

				// if file size exceeds 2 GB
			} else {
				// issue validation error indicating that size is too big
				// TO DO
			}

			// if file does not exist
		} else {
			// issue attachment error
			// TO DO
		}
	};



	$.fn.UpdateLastModifiedFileAttachment = function () {

		// get the last modifified time for this request
		delete rData.lastModifiedAtAttachment;

		rData = $.extend(
			$().GetFieldsFromOneRow({
				'listName': mData.defaultListNameForSWFRequestData,
				'select': [{
					'nameHere': 'lastModifiedAtAttachment',
					'nameInList': 'Modified',
				}],
				"where": {
					"field": "ID",
					"type": "Number",
					"value": rData.requestID,
				}
			}),
			rData
		);

		$("a#form-submit-button").removeAttr("disabled");
	};



	$(document).ready(function () {

		// ============
		// ---- CONFIG + MAIN QUERIES + GLOBAL VARS
		// ============


		// data for the current user
		uData = $().ReturnCurrentUserData();

		// metadata for all of The Hub and for all of this app
		mData = $().ReturnThisAppMData();

		// data for the form component of the app; agnostic as to any specific request
		fData = $().ReturnThisAppFData();

		// data for a specific request; i.e., will be, largely, data from a row of SWFList
		rData = { "requestID": GetParamFromUrl(location.search, "r") };

		// data for a specific GSE Schedule
		rData.gseScheduleID = GetParamFromUrl(location.search, "gseScheduleID");

		// data for the overview screen for this user
		oData = $().ReturnThisAppOData();

		// latest API version; requests use the version of the API with which they were created
		mData.apiLatestVersion = '1.0';

		// set screen transition times in ms
		mData.quickScreenTransitionTime = 1;
		mData.gracefulgracefulScreenTransitionTime = 750;

		// set global nav
		mData.globalNavigationList = '<ul role="navigation" id="mos_global-navigation">' +
			'	<li><a href="https://bmos.sharepoint.com/">The Hub</a></li>' +
			'	<li><a href="https://bmos.sharepoint.com/SitePages/Communities.aspx">Communities</a></li>' +
			'</ul>';

		// swf screens will only be rendered on swf site pages if the page token matches one of the strings in this array
		mData.swfAppPageTokens = ["App", "app"];

		mData.siteToken = ReturnSiteTokenFromURL();
		mData.fullSiteBaseURL = ReturnFullSiteBaseURLFromSitePageURL();
		mData.pageToken = ReturnSitePageTokenFromURL();

		mData.thisPageIsASWFAppPage = ReturnThisPageIsASWFAppPage();

		if (typeof (mData.axle) != "undefined" && mData.axle == 1) {
			mData.componentGroupID = 1;
		}

		if (typeof (mData.community) != "undefined" && mData.community == 1) {
			mData.componentGroupID = 2;
		}

		if (typeof (mData.swf) != "undefined" && mData.swf == 1) {
			mData.componentGroupID = 3;
		}

		if (typeof (mData.visualization) != "undefined" && mData.visualization == 1) {
			mData.componentGroupID = 4;
		}

		mData = $.extend(
			GetFieldsFromOneRow({
				"listName": "ComponentLog",
				"select": [
					{
						// "nameHere": "uriAdmin",
						// "nameInList": "URIAdmin",
						// "linkField": 1
						// }, {
						// 	"nameHere": "uriRequester",
						// 	"nameInList": "URIRequester",
						// 	"linkField": 1
						// }, {
						// 	"nameHere": "uriRequest",
						// 	"nameInList": "URIRequest",
						// 	"linkField": 1
						// }, {
						// 	"nameHere": "uriRequestAlternate",
						// 	"nameInList": "URIRequestAlternate",
						// 	"linkField": 1
						// }, {
						"nameHere": "uriRoot",
						"nameInList": "URIRoot",
						"linkField": 1
					}, {
						"nameHere": "uriWFHistory",
						"nameInList": "URIWFHistory",
						"linkField": 1
					}, {
						"nameHere": "requiredApproversString",
						"nameInList": "RequiredApprovers"
					}, {
						"nameHere": "conditionalApproversString",
						"nameInList": "ConditionalApprovers"
					}, {
						"nameHere": "componentAdmin",
						"nameInList": "AdminAccess"
					}, {
						"nameHere": "adminContacts",
						"nameInList": "AdminContacts"
					}, {
						"nameHere": "viewAccess",
						"nameInList": "ViewAccess"
					}, {
						"nameHere": "requestName",
						"nameInList": "RequestName"
					}, {
						"nameHere": "adminNotificationPersons",
						"nameInList": "AdminNotifications"
					}, {
						"nameHere": "autoAssignments1",
						"nameInList": "AutoAssignments1"
					}, {
						"nameHere": "autoAssignments2",
						"nameInList": "AutoAssignments2"
					}, {
						"nameHere": "quickLaunches",
						"nameInList": "QuickLaunches"
					}
				],
				"where": {
					"field": "ComponentID",
					"type": "Number",
					"value": mData.componentID,
				}
			}),
			GetFieldsFromOneRow({
				"listName": "Component Group Log",
				"select": [{
					"nameHere": "componentGrpAdmin",
					"nameInList": "GroupAdminAccess"
				}, {
					"nameHere": "componentGrpAdminNotifications",
					"nameInList": "GroupAdminNotifications"
				}, {
					"nameHere": "devAdminNotificationPersons",
					"nameInList": "DevAdminNotifications"
				}],
				"where": {
					"field": "ComponentGroupID",
					"type": "Number",
					"value": mData.componentGroupID,
				}
			}),
			{
				"defaultListNameForSWFRequestData": "SWFList",
			},
			mData
		);

		uData.isAdmin = $().UserIsComponentAdmin();
		uData.isComponentGrpAdmin = $().UserIsComponentGrpAdmin();
		if (uData.isComponentGrpAdmin === 1) {
			uData.isAdmin = 1;
		}

		uData.roles = [];
		if (uData.isAdmin == 1) { uData.roles.push("admin"); }
		if (uData.isComponentGrpAdmin == 1) { uData.roles.push("componentGrpAdmin"); }

		// uData.isComponentGrpAdmin = 0;
		// uData.isAdmin = 0;

		// if this is a GSE Request
		if (mData.requestName === "GSE Job" || mData.requestName === "GSE Schedule" || mData.requestName === "GSE Signup" || mData.requestName === "GSE Configuration") {
			if ($().ReturnUserIsGSEHRAdmin() === 1) {
				uData.roles.push("gseHRAdmin");
			} else if ($().ReturnUserIsGSEJobAdmin() === 1) {
				uData.roles.push("gseJobAdmin");
			} else if ($().ReturnUserIsGSEManager() === 1) {
				uData.roles.push("gseManager");
			} else {
				uData.roles.push("gseUserOnly");
			}
		}

		// if this is a GPC Request
		if (mData.requestName === "GPC Initial Concept Approval" || mData.requestName === "GPC Submission Approval" || mData.requestName === "GPC Configuration") {
			if ($().ReturnUserIsGPCPeopleEditor()) {
				uData.roles.push("gpcPeopleEditor");
			}
		}

		console.log(uData.roles);

		uData.alternateOverviewScreen = $().UserNeeedsAlternateOverviewScreen();

		// lifespan of maintenance mode flag, in ms; 
		// 		i.e., we'll check for maintenance mode again after this many milliseconds
		mData.maintenanceModeCacheLifespan = 300000; // = 5 minutes

		// how often to check if the maintenance mode flag has expired, in ms;
		//		i.e., in case the user doesn't transition between screens often enough to catch
		//		an expired maintenance mode flag, check for expiration after this many milliseconds
		mData.maintenanceModeCheckFrequency = 60000; // = 1 minute

		// flag for all Hub components in maintenance mode
		mData.allComponentsInMaintenanceMode;

		// flag for Hub Central in maintenance mode
		mData.hubCentralInMaintenanceMode;

		// flag for all SWFs in maintenance mode
		mData.allSWFsInMaintenanceMode;

		// flag for specific component site tokens when only they are in maintenance mode;
		//		note that Hub Central cannot be set here
		mData.componentsInMaintenanceMode;

		// flag for Neso health check
		mData.nesoIsHealthy;

		// flag indicating whether or not this component is in maintenance mode FOR THIS USER
		mData.maintenanceModeForThisUser = 0;

		// maintenance mode flag expiration timestamp
		mData.maintenanceModeForThisUserExpirationTimestamp;

		// set a container for all data retrieval / setting promises
		var allDataRetrievalAndSettingPromises = [];

		// push to container all data retrieval / setting promises; there's only one now, 
		//		but we're set up to add more without re-writing in the future
		allDataRetrievalAndSettingPromises.push($().GetAndSetMaintenanceModeData());

		// wait for all data retrieval / setting promises to complete (pass or fail) 
		$.when.apply($, allDataRetrievalAndSettingPromises).always(function () {

			console.log('using dev_mos-main_medium.1.04 m1');

			$().ConfigureAndShowScreenContainerAndAllScreens();
		});
	});

})(jQuery);




// Textarea and select clone() bug workaround | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Motivation.
// jQuery's clone() method works in most cases, but it fails to copy the value of textareas and select elements. This patch replaces jQuery's clone() method with a wrapper that fills in the
// values after the fact.

// An interesting error case submitted by Piotr Przybyl: If two <select> options had the same value, the clone() method would select the wrong one in the cloned box. The fix, suggested by Piotr
// and implemented here, is to use the selectedIndex property on the <select> box itself rather than relying on jQuery's value-based val().

(function (original) {
	jQuery.fn.clone = function () {
		var result = original.apply(this, arguments),
			my_textareas = this.find('textarea').add(this.filter('textarea')),
			result_textareas = result.find('textarea').add(result.filter('textarea')),
			my_selects = this.find('select').add(this.filter('select')),
			result_selects = result.find('select').add(result.filter('select'));

		for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
		for (var i = 0, l = my_selects.length; i < l; ++i) {
			for (var j = 0, m = my_selects[i].options.length; j < m; ++j) {
				if (my_selects[i].options[j].selected === true) {
					result_selects[i].options[j].selected = true;
				}
			}
		}
		return result;
	};
})(jQuery.fn.clone);

