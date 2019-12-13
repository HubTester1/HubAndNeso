
// ----- IMPORTS

import shortID from 'shortid';
import APIClient from '../../services/ApiClient';

// ----- DATA

module.exports = {

	ReturnSeasonsData: () =>
		// return a new promise
		new Promise((resolve, reject) => {
			// collect data async from multiple sources
			const seasonQueryPromises = [
				APIClient
					.GetAPIData('http://localhost:3000/api/datesTimes/all-post-scheduling-seasons'),
				APIClient
					.GetAPIData('http://localhost:3000/api/datesTimes/current-post-scheduling-season'),
			];
			// wait for all queries to be completed
			Promise.all(seasonQueryPromises)
				// if the promises are resolved with the data
				.then((seasonQueriesReturnArray) => {
					// extract the results 
					const allSeasonsData = seasonQueriesReturnArray[0];
					const currentSeason = {
						value: seasonQueriesReturnArray[1].data.name,
						display: seasonQueriesReturnArray[1].data.friendlyName,
					};
					// extract name and friendly name, add react key, for each unique season
					const allSeasons = [];
					allSeasonsData.data.forEach((returnedSeason) => {
						let optionAlreadyAdded = false;
						allSeasons.forEach((addedSeason) => {
							if (addedSeason.value === returnedSeason.name) {
								optionAlreadyAdded = true;
							}
						});
						if (!optionAlreadyAdded) {
							allSeasons.push({
								value: returnedSeason.name,
								display: returnedSeason.friendlyName,
								key: shortID.generate(),
							});
						}
					});
					// resolve this promise with the allSeasons
					resolve({
						currentSeason,
						allSeasons,
					});
				})
				// if the promise is rejected with an error
				.catch((dashError) => {
					// reject this promise with the error
					reject(dashError);
				});
		}),
};
