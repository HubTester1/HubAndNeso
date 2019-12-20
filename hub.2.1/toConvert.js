
const colorsOriginal = {
	black: '#000000',
	white: '#ffffff',
	'grey-01': '#f9f9f9',
	'grey-02': '#f2f2f2',
	'grey-03': '#eeeeee',				
	'grey-04': '#ececec',
	'grey-05': '#e6e6e6',
	'grey-06': '#e1e1e1',
	'grey-07': '#dddddd',
	'grey-08': '#d4d4d4',
	'grey-09': '#cccccc',
	'grey-10': '#c3c3c3',
	'grey-11': '#bbbbbb',
	'grey-12': '#b2b2b2',
	'grey-13': '#aaaaaa',
	'grey-14': '#999999',
	'grey-15': '#888888',
	'grey-16': '#777777',
	'grey-17': '#666666',
	'grey-18': '#555555',
	'grey-19': '#444444',
	'grey-20': '#3a3a3a',
	'grey-21': '#333333',
	'grey-22': '#2d2d2d',
	'grey-23': '#242424',
	'grey-24': '#212121',
	'grey-25': '#1f1f1f',
	'grey-26': '#121212',

	// --- PRIMARY

	'primary-red': '#da291c',
	'primary-blue': '#69b3e7',
	'primary-pink': '#da1884',
	'primary-green': '#49c5b1',
	'primary-yellow': '#fedd00',

	// --- BOLD

	'bold-purple': '#490c66',
	'bold-blue': '002f56',
	'bold-aqua': '007298',
	'bold-green': '#034436',
	'bold-teal': '46797a',
	'bold-maroon': '#79232e',
	'bold-pink': 'a60063',
	'bold-orange': '#e24301',

	// --- SUBTLE

	'subtle-yellow': '#f2ea9a',
	'subtle-orange': '#ffc999',
	'subtle-coral': '#ffb4aa',
	'subtle-pink': '#e5c5d3',
	'subtle-green': '#c6f2ef',
	'subtle-blue': '#94c0e9',

	// --- PINK

	'pink-1': '#f3e5eb',
	'pink-2': 'subtle-pink',
	'pink-3': '#e299bf',
	'pink-4': '#df6eab',
	'pink-5': '#dc4397',
	'pink-6': 'primary-pink',
	'pink-7': 'bold-pink',
	'pink-8': '#840852',
	'pink-9': '#621141',
	'pink-10': '#401a31',

	// --- PURPLE

	'purple-1': '#f1e8f5',
	'purple-2': '#e4d3ed',
	'purple-3': '#d1b6e0',
	'purple-4': '#bb95d1',
	'purple-5': '#a97ac6',
	'purple-6': '#915eae',
	'purple-7': '#794396',
	'purple-8': '#61277e',
	'purple-9': 'bold-purple',
	'purple-10': '#2c0040',

	// --- BLUES

	'blue-1': '#deebf7',
	'blue-2': '#b9d5f0',
	'blue-3': 'subtle-blue',
	'blue-4': 'primary-blue',
	'blue-5': '#5498ca',
	'blue-6': '#3f7ead',
	'blue-7': '#2a6390',
	'blue-8': '#154973',
	'blue-9': 'bold-blue',
	'blue-10': '#00203b',

	// --- AQUA

	'aqua-0': '#e5f9ff',
	'aqua-1': '#d1eef7',
	'aqua-2': '#a7d5e4',
	'aqua-3': '#7dbcd1',
	'aqua-4': '#53a3be',
	'aqua-5': '#298aab',
	'aqua-6': 'bold-aqua',
	'aqua-7': '#005f7f',
	'aqua-8': '#004d66',
	'aqua-9': '#003a4d',
	'aqua-10': '#012835',

	// --- TEAL

	'teal-1': '#d5f3f3',
	'teal-2': '#b8dada',
	'teal-3': '#9bc2c2',
	'teal-4': '#7fa9aa',
	'teal-5': '#629192',
	'teal-6': 'bold-teal',
	'teal-7': '#346768',
	'teal-8': '#235657',
	'teal-9': '#124546',
	'teal-10': '#013435',

	// --- GREEN

	'green-1': 'subtle-green',
	'green-2': '#a6e6db',
	'green-3': '#87dbcd',
	'green-4': '#68d0bf',
	'green-5': 'primary-green',
	'green-6': '#37a492',
	'green-7': '#268473',
	'green-8': '#146454',
	'green-9': 'bold-green',
	'green-10': '#033328',

	// --- YELLOW

	'yellow-1': 'subtle-yellow',
	'yellow-2': '#f5e64f',
	'yellow-3': 'primary-yellow',
	'yellow-4': '#edc414',
	'yellow-5': '#e3bc13',
	'yellow-10': '#453800',

	// --- ORANGE

	'orange-1': '#f9e9db',
	'orange-2': '#fcd9ba',
	'orange-3': 'subtle-orange',
	'orange-4': '#f59c66',
	'orange-5': '#eb6f33',
	'orange-6': 'bold-orange',

	// --- CORAL

	'coral-1': '#f7e4e2',
	'coral-2': '#fbccc6',
	'coral-3': 'subtle-coral',
	'coral-4': '#ff958b',
	'coral-5': '#fc746a',
};

const ReturnRGBFromHex = (hex) => {
	const regexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (regexResult) {
		const r = parseInt(regexResult[1], 16);
		const g = parseInt(regexResult[2], 16);
		const b = parseInt(regexResult[3], 16);
		return `${r},${g},${b}`;
	}
	return null;
};

const colorsNew = {};

const colorNames = Object.keys(colorsOriginal);

colorNames.forEach((colorName) => {
	const colorValueOriginal = colorsOriginal[colorName];
	if (colorValueOriginal.charAt(0) === '#') {
		colorsNew[colorName] = ReturnRGBFromHex(colorValueOriginal);
	}
});

console.log(colorsNew);
