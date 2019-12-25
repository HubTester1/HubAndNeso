/**
 * @module services/Utilities
 * @description Miscellaneous utility functions.
 */

module.exports = {
	ReturnStringWithInitialCapital: string => (
		string.replace(/^\w/, c => c.toUpperCase())
	),
	ReturnRGBFromHex: (hex) => {
		const regexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (regexResult) {
			const r = parseInt(regexResult[1], 16);
			const g = parseInt(regexResult[2], 16);
			const b = parseInt(regexResult[3], 16);
			return `${r},${g},${b}`;
		}
		return null;
	},
};
