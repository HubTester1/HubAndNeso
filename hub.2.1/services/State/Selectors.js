/**
 * @name State Store Service - Selectors
 * @function
 * @category Services
 * @description Define state selectors for Reselect package, for performance enhancement.
 */

import { createSelector } from 'reselect';

// sData
export const ReturnSData = createSelector(
	({ sData }) => sData,
	sData => sData
);
export const ReturnScreenSize = createSelector(
	({ sData }) => sData.size,
	screenSize => screenSize
);
export const ReturnScreenTitle = createSelector(
	({ sData }) => sData.screens[sData.s].title,
	title => title
);
export const ReturnPartialScreenKey = createSelector(
	({ sData }) => sData.p,
	p => p
);
export const ReturnPartialScreenTitle = createSelector(
	({ sData }) => sData.screens[sData.s].partials[sData.p].title,
	title => title
);
export const ReturnPartialScreenTabsSpecs = createSelector(
	({ sData }) => {
		const partialScreenKeysArray = Object.keys(sData.screens[sData.s].partials);
		const partialScreenTabsSpecs = [];
		partialScreenKeysArray.forEach((keyValue) => {
			partialScreenTabsSpecs.push({
				title: sData.screens[sData.s].partials[keyValue].title,
				selected: keyValue === sData.p,
				key: keyValue
			});
		});
		return partialScreenTabsSpecs;
	},
	partialScreenTabsSpecs => partialScreenTabsSpecs
);

// uData
export const ReturnDarkMode = createSelector(
	({ uData }) => uData.user.preferences.darkMode,
	darkMode => darkMode
);

// hData
export const ReturnHeaderIsStuck = createSelector(
	({ hData }) => hData.headerStuck,
	headerStuck => headerStuck
);