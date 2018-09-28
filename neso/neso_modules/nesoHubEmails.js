
// ----- PULL IN MODULES

const nesoDBQueries = require('./nesoDBQueries');
const moment = require('moment');
const nesoEmail = require('./nesoEmail');

// ----- DEFINE HEALTH FUNCTIONS

module.exports = {

	SendEmails: emailsToSend =>
		// return a new promise
		new Promise((resolve, reject) => {
			// for each email
			emailsToSend.forEach((emailData) => {
				// create standardized hub email
				const standardizedHubEmail = 
					module.exports.CreateStandardHubEmail(emailData);
				// send the email
				nesoEmail.SendEmail(standardizedHubEmail);
			});
			// when completed, resolve this promise; note: 
			// 		SendEmail function will handle errors
			resolve('delegated');
		}),

	CreateStandardHubEmail: emailData => ({
		to: emailData.to,
		from: 'The Hub <noreply@mos.org>',
		subject: emailData.subject,
		html: `<div style="font-family: 'wf_segoe-ui_normal', 'Segoe UI', 'Segoe WP', Arial, sans-serif; color: #212121; font-size: 15px">${emailData.bodyUnique}<p style="font-weight: 700">The Hub</p></div>`,
		system: 'hub',
		type: emailData.emailType,
		event: emailData.caller,
	}),

	ReturnGSESignupReminderNotificationsForOneSchedule: schedule => 
		// return a new promise
		new Promise((resolve, reject) => {
			// set up var
			const notificationsToReturn = [];
			// get a promise to retrieve all submitted schedules
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('gseJobs', {
				ID: parseInt(schedule.JobID, 10),
			}, {})
			// if the promise is resolved with the docs
				.then((jobQueryResult) => {
					const job = jobQueryResult.docs[0];
					const jobAdmin = job.AllRequestData['Requested-For'][0];
					// get a promise to retrieve all submitted schedules
					nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('gseSignups', {
						ScheduleID: schedule.ID.toString(),
					}, {})
						// if the promise is resolved with the docs
						.then((signupsResult) => {
							const signupsArray = signupsResult.docs;
							signupsArray.forEach((signup, signupIndex) => {
								// extract data as vars
								const signupPerson = signup.AllRequestData['Requested-For'][0];
								const signupLink =
												`<a href="https://bmos.sharepoint.com/sites/hr-service-signups/SitePages/App.aspx?r=${signup.ID}">review the details</a>`;
								const jobAdminLink = 
												`<a href="mailto:${jobAdmin.description}">${jobAdmin.displayText}</a>`;
								const scheduleStartDatetimeRaw = 
												schedule.Date.slice(0, 10) +
												schedule.StartTime.slice(10, 20);
								const scheduleStartDatetime = 
												moment(scheduleStartDatetimeRaw).isDST() ?
													moment(scheduleStartDatetimeRaw).subtract(1, 'hour') :
													moment(scheduleStartDatetimeRaw);
								const scheduleStartDateString = moment(scheduleStartDatetime).format('MMMM D');
								const scheduleStartTimeString = moment(scheduleStartDatetime).format('h:mm a');
								// push a notification object
								notificationsToReturn.push({
									emailType: 'Notification',
									caller: 'signupReminder requestedFor',
									to: signupPerson.description,
									subject: `GSE Signup #${signup.ID}: reminder`,
									bodyUnique: `Please report to ${job.Location} on ${scheduleStartDateString} at ${scheduleStartTimeString} for "${job.JobTitle}". Feel free to ${signupLink} or contact ${jobAdminLink} with any questions.`,
								});
								// if this is the last signup in signupsArray
								if ((signupIndex + 1) === signupsArray.length) {
									// resolve this promise with all notifications
									resolve(notificationsToReturn);
								}
							});
						})
					// if the promise is rejected with an error, then 
					// 		reject this promise with an error
						.catch((error) => { reject(error); });
				})
			// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		}),

	ProcessGSESignupReminderNotifications: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// set up vars
			const tomorrowTruncated = moment().add(1, 'day').format('YYYY-MM-DD');
			const oneWeekOutTruncated = moment().add(1, 'week').format('YYYY-MM-DD');
			const notificationsToSend = [];
			// get a promise to retrieve all submitted schedules
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('gseSchedules', {
				RequestStatus: 'Submitted',
			}, {})
				// if the promise is resolved with the docs
				.then((scheduleQueryResult) => {
					// set up container for schedules that have ended in the last hour
					const schedulesProcessingPromises = [];
					// for each submitted schedule
					scheduleQueryResult.docs.forEach((submittedGSESchedule) => {
						// clone param
						const scheduleClone = submittedGSESchedule;
						// if this schedule is for tomorrow or a week from now
						const scheduleStartDateTruncated =
							scheduleClone.Date.slice(0, 10);
						if (
							scheduleStartDateTruncated === tomorrowTruncated || 
							scheduleStartDateTruncated === oneWeekOutTruncated
						) {
							// push promise to return signup notifications for it
							schedulesProcessingPromises
								.push(module.exports.ReturnGSESignupReminderNotificationsForOneSchedule(scheduleClone));
						}
					});
					// when all schedule processing promises are resolved
					Promise.all(schedulesProcessingPromises)
						.then((scheduleProcessingResults) => {
							// extract the emails from the results
							// for each schedule/result 
							scheduleProcessingResults.forEach((scheduleProcessingResult) => {
								scheduleProcessingResult.forEach((notification) => {
									notificationsToSend.push(notification);
								});
							});
							// send the emails
							module.exports.SendEmails(notificationsToSend)
								// if the promise is resolved with a result, then 
								// 		resolve this promise with the result
								.then((result) => { resolve(result); })
								// if the promise is rejected with an error, then 
								// 		reject this promise with an error
								.catch((error) => { reject(error); });
							// resolve this promise with the file processing results
							resolve('delegated');
						});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),

	ProcessGSEScheduleCreditReminderNotifications: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// set up vars
			const notificationsToSend = [];
			const now = moment();
			const oneHourAgo = moment(now).subtract(1, 'hour');
			// console.log(now);
			// console.log(oneHourAgo);
			// get a promise to retrieve all submitted schedules
			nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('gseSchedules', {
				RequestStatus: 'Submitted',
			}, {})
				// if the promise is resolved with the docs
				.then((scheduleQueryResult) => {
					// set up container for schedules that have ended in the last hour
					const currentGSESchedules = [];
					// for each submitted schedule
					scheduleQueryResult.docs.forEach((submittedGSESchedule) => {
						// clone param
						const scheduleClone = submittedGSESchedule;
						// determine the schedule's start and end time
						const scheduleStartDatetimeRaw = 
							scheduleClone.Date.slice(0, 10) + 
							scheduleClone.StartTime.slice(10, 20);
						const scheduleStartDatetime = 
						moment(scheduleStartDatetimeRaw).isDST() ?
							moment(scheduleStartDatetimeRaw).subtract(1, 'hour') :
							moment(scheduleStartDatetimeRaw);
						const scheduleEndDatetime = 
						(scheduleClone.ShiftLength === '3.5 hours') ?
							moment(scheduleStartDatetime).add(3.5, 'hours') :
							moment(scheduleStartDatetime).add(7, 'hours');
						// if this schedule ends in the last hour (exclusive of one hour ago, 
						// 		inclusive of now, granularity in minutes)
						if (moment(scheduleEndDatetime).isBetween(oneHourAgo, now, 'minute', '(]')) {
							// add the calculated times to the schedule so we don't have to recalculate them
							scheduleClone.scheduleStartDatetime =
								scheduleStartDatetime;
							scheduleClone.scheduleEndDatetime =
								scheduleEndDatetime;
							// push this shedule to the container
							currentGSESchedules.push(scheduleClone);
						}
					});
					// for each schedule that has ended in the last hour
					currentGSESchedules.forEach((schedule) => {
						// get a promise to retrieve all submitted schedules
						nesoDBQueries.ReturnAllSpecifiedDocsFromCollection('gseJobs', {
							ID: parseInt(schedule.JobID, 10),
						}, {})
							// if the promise is resolved with the docs, then resolve this promise with the docs
							.then((jobQueryResult) => { 
								const job = jobQueryResult.docs[0];
								const jobAdmin = job.AllRequestData['Requested-For'][0];
								const scheduleLink =
									`<a href="https://bmos.sharepoint.com/sites/hr-service-schedules/SitePages/App.aspx?r=${schedule.ID}">grant or deny credit</a>`;
								const endDateString =
									moment(schedule.scheduleEndDatetime)
										.format('MMMM D');
								const endTimeString =
									moment(schedule.scheduleEndDatetime)
										.format('h:mm a');
								notificationsToSend.push({
									emailType: 'Notification',
									caller: 'creditReminder jobAdmin',
									to: jobAdmin.description,
									subject: `GSE Schedule #${schedule.ID}: credit reminder`,
									bodyUnique: `This schedule for "${job.JobTitle}" ended on ${endDateString} at ${endTimeString}. Please ${scheduleLink} to those who signed up.`,
								});

								module.exports.SendEmails(notificationsToSend)
									// if the promise is resolved with a result, then 
									// 		resolve this promise with the result
									.then((result) => { resolve(result); })
									// if the promise is rejected with an error, then 
									// 		reject this promise with an error
									.catch((error) => { reject(error); });
							})
							// if the promise is rejected with an error, then reject this promise with an error
							.catch((error) => { reject(error); });
					});


					resolve('result');
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => {
					reject(error);
				});
		}),
};
