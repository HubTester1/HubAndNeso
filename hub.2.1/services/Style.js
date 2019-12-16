
module.exports = {
	
	// FONT

	FontFamily: () =>
		'font-family: \'akzidenz-grotesk-pro\', -apple-system, BlinkMacSystemFont,\'Roboto\', \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, \'Liberation Sans\', Arial, \'Lucida Grande\', sans-serif;',


	// for large screens
	// augmented fourth scale above 1
	// minor third scale below 1
	FontSize: (token, screenType) => {
		if (token === 'base') {
			return 1.8;
		} else if (screenType !== 'small') {
			switch (token) {
			case 'xxxl':
				return `${module.exports.FontSize('base') * 3.998}rem`;
			case 'xxl':
				return `${module.exports.FontSize('base') * 2.827}rem`;
			case 'xl':
				return `${module.exports.FontSize('base') * 1.999}rem`;
			case 'l':
				return `${module.exports.FontSize('base') * 1.414}rem`;
			case 'm':
			default:
				return `${module.exports.FontSize('base') * 1}rem`;
			case 's':
				return `${module.exports.FontSize('base') * 0.833}rem`;
			case 'xs':
				return `${module.exports.FontSize('base') * 0.694}rem`;
			case 'xxs':
				return `${module.exports.FontSize('base') * 0.579}rem`;
			}
		} else {
			switch (token) {
			case 'xxxl':
				return `${module.exports.FontSize('base') * 2.441}rem`;
			case 'xxl':
				return `${module.exports.FontSize('base') * 1.728}rem`;
			case 'xl':
				return `${module.exports.FontSize('base') * 1.44}rem`;
			case 'l':
				return `${module.exports.FontSize('base') * 1.2}rem`;
			case 'm':
			default:
				return `${module.exports.FontSize('base') * 1}rem`;
			case 's':
				return `${module.exports.FontSize('base') * 0.833}rem`;
			case 'xs':
				return `${module.exports.FontSize('base') * 0.694}rem`;
			case 'xxs':
				return `${module.exports.FontSize('base') * 0.579}rem`;			
			}
		}
	},

	FontWeight: (token) => {
		switch (token) {
		default:
		case 'light':
			return '300';
		case 'regular':
			return '400';
		case 'medium':
			return '500';
		case 'bold':
			return '700';
		case 'extra-bold':
			return '800';
		case 'black':
			return '900';
		}
	},

	FontStyle: (token) => {
		switch (token) {
		default:
		case 'normal':
			return 'normal';
		case 'italic':
			return 'italic';
		}
	},

	// Z-INDEX

	/* ZIndex: (token, screenType) => {
		switch (token) {
			case 'commandBarButtonActive':
				return '1';
			case 'commandBarButtonActive:':
				return '1';
			case 'stickyHeader:':
				return '1000';
			case 'modalFullMessage:':
				return '2000';
			case 'modalFullImage:':
				return '2010';
			case 'overlayScreenContainer:':
				return '3000';
			case 'overlayScreen:':
				return '3001';
		}
	}, */

	// COLORS

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

	Color: (token, darkMode) => {
		switch (token) {
			default:
			case 'black':
				return '#000000';
			case 'white':
				return '#ffffff';
			case 'grey-01':
				return '#f9f9f9';
			case 'grey-02':
				return '#f2f2f2';
			case 'grey-03':
				return '#eeeeee';				
			case 'grey-04':
				return '#ececec';
			case 'grey-05':
				return '#e6e6e6';
			case 'grey-06':
				return '#e1e1e1';
			case 'grey-07':
				return '#dddddd';
			case 'grey-08':
				return '#d4d4d4';
			case 'grey-09':
				return '#cccccc';
			case 'grey-10':
				return '#c3c3c3';
			case 'grey-11':
				return '#bbbbbb';
			case 'grey-12':
				return '#b2b2b2';
			case 'grey-13':
				return '#aaaaaa';
			case 'grey-14':
				return '#999999';
			case 'grey-15':
				return '#888888';
			case 'grey-16':
				return '#777777';
			case 'grey-17':
				return '#666666';
			case 'grey-18':
				return '#555555';
			case 'grey-19':
				return '#444444';
			case 'grey-20':
				return '#3a3a3a';
			case 'grey-21':
				return '#333333';
			case 'grey-22':
				return '#2d2d2d';
			case 'grey-23':
				return '#242424';
			case 'grey-24':
				return '#222222';
			case 'grey-25':
				return '#1f1f1f';
			case 'grey-26':
				return '#111111';

			// --- PRIMARY

			case 'primary-red':
				return '#da291c';
			case 'primary-blue':
				return '#69b3e7';
			case 'primary-pink':
				return '#da1884';
			case 'primary-green':
				return '#49c5b1';
			case 'primary-yellow':
				return '#fedd00';

			// --- BOLD

			case 'bold-purple':
				return '#490c66';
			case 'bold-blue':
				return '002f56';
			case 'bold-aqua':
				return '007298';
			case 'bold-green':
				return '#034436';
			case 'bold-teal':
				return '46797a';
			case 'bold-maroon':
				return '#79232e';
			case 'bold-pink':
				return 'a60063';
			case 'bold-orange':
				return '#e24301';

			// --- SUBTLE

			case 'subtle-yellow':
				return '#f2ea9a';
			case 'subtle-orange':
				return '#ffc999';
			case 'subtle-coral':
				return '#ffb4aa';
			case 'subtle-pink':
				return '#e5c5d3';
			case 'subtle-green':
				return '#c6f2ef';
			case 'subtle-blue':
				return '#94c0e9';

			// --- PINK

			case 'pink-1':
				return '#f3e5eb';
			case 'pink-2':
				return module.exports.Color('subtle-pink');
			case 'pink-3':
				return '#e299bf';
			case 'pink-4':
				return '#df6eab';
			case 'pink-5':
				return '#dc4397';
			case 'pink-6':
				return module.exports.Color('primary-pink');
			case 'pink-7':
				return module.exports.Color('bold-pink');
			case 'pink-8':
				return '#840852';
			case 'pink-9':
				return '#621141';
			case 'pink-10':
				return '#401a31';

			// --- PURPLE

			case 'purple-1':
				return '#f1e8f5';
			case 'purple-2':
				return '#e4d3ed';
			case 'purple-3':
				return '#d1b6e0';
			case 'purple-4':
				return '#bb95d1';
			case 'purple-5':
				return '#a97ac6';
			case 'purple-6':
				return '#915eae';
			case 'purple-7':
				return '#794396';
			case 'purple-8':
				return '#61277e';
			case 'purple-9':
				return module.exports.Color('bold-purple');
			case 'purple-10':
				return '#2c0040';

			// --- BLUES

			case 'blue-1':
				return '#deebf7';
			case 'blue-2':
				return '#b9d5f0';
			case 'blue-3':
				return module.exports.Color('subtle-blue');
			case 'blue-4':
				return module.exports.Color('primary-blue');
			case 'blue-5':
				return '#5498ca';
			case 'blue-6':
				return '#3f7ead';
			case 'blue-7':
				return '#2a6390';
			case 'blue-8':
				return '#154973';
			case 'blue-9':
				return module.exports.Color('bold-blue');
			case 'blue-10':
				return '#00203b';

			// --- AQUA

			case 'aqua-0':
				return '#e5f9ff';
			case 'aqua-1':
				return '#d1eef7';
			case 'aqua-2':
				return '#a7d5e4';
			case 'aqua-3':
				return '#7dbcd1';
			case 'aqua-4':
				return '#53a3be';
			case 'aqua-5':
				return '#298aab';
			case 'aqua-6':
				return module.exports.Color('bold-aqua');
			case 'aqua-7':
				return '#005f7f';
			case 'aqua-8':
				return '#004d66';
			case 'aqua-9':
				return '#003a4d';
			case 'aqua-10':
				return '#012835';

			// --- TEAL

			case 'teal-1':
				return '#d5f3f3';
			case 'teal-2':
				return '#b8dada';
			case 'teal-3':
				return '#9bc2c2';
			case 'teal-4':
				return '#7fa9aa';
			case 'teal-5':
				return '#629192';
			case 'teal-6':
				return module.exports.Color('bold-teal');
			case 'teal-7':
				return '#346768';
			case 'teal-8':
				return '#235657';
			case 'teal-9':
				return '#124546';
			case 'teal-10':
				return '#013435';

			// --- GREEN

			case 'green-1':
				return module.exports.Color('subtle-green');
			case 'green-2':
				return '#a6e6db';
			case 'green-3':
				return '#87dbcd';
			case 'green-4':
				return '#68d0bf';
			case 'green-5':
				return module.exports.Color('primary-green');
			case 'green-6':
				return '#37a492';
			case 'green-7':
				return '#268473';
			case 'green-8':
				return '#146454';
			case 'green-9':
				return module.exports.Color('bold-green');
			case 'green-10':
				return '#033328';

			// --- YELLOW

			case 'yellow-1':
				return module.exports.Color('subtle-yellow');
			case 'yellow-2':
				return '#f5e64f';
			case 'yellow-3':
				return module.exports.Color('primary-yellow');
			case 'yellow-4':
				return '#edc414';
			case 'yellow-5':
				return '#e3bc13';
			case 'yellow-10':
				return '#453800';

			// --- ORANGE

			case 'orange-1':
				return '#f9e9db';
			case 'orange-2':
				return '#fcd9ba';
			case 'orange-3':
				return module.exports.Color('subtle-orange');
			case 'orange-4':
				return '#f59c66';
			case 'orange-5':
				return '#eb6f33';
			case 'orange-6':
				return module.exports.Color('bold-orange');

			// --- CORAL

			case 'coral-1':
				return '#f7e4e2';
			case 'coral-2':
				return '#fbccc6';
			case 'coral-3':
				return module.exports.Color('subtle-coral');
			case 'coral-4':
				return '#ff958b';
			case 'coral-5':
				return '#fc746a';

			// ------------------
			// ALPHA COLORS
			// ------------------

			case 'black-5-percent':
				return `rgba(${module.exports.ReturnRGBFromHex(module.exports.Color('black'))}, .05)`;
			case 'black-10-percent':
				return `rgba(${module.exports.Color('black')}, .1)`;
			case 'black-20-percent':
				return `rgba(${module.exports.Color('black')}, .2)`;
			case 'black-30-percent':
				return `rgba(${module.exports.Color('black')}, .3)`;
			case 'black-40-percent':
				return `rgba(${module.exports.Color('black')}, .4)`;
			case 'black-50-percent':
				return `rgba(${module.exports.Color('black')}, .5)`;
			case 'black-60-percent':
				return `rgba(${module.exports.Color('black')}, .6)`;
			case 'black-70-percent':
				return `rgba(${module.exports.Color('black')}, .7)`;
			case 'black-80-percent':
				return `rgba(${module.exports.Color('black')}, .8)`;
			case 'black-90-percent':
				return `rgba(${module.exports.Color('black')}, .9)`;
			case 'grey-17-10-percent':
				return `rgba(${module.exports.Color('grey-17')}, .1)`;
			case 'grey-17-20-percent':
				return `rgba(${module.exports.Color('grey-17')}, .2)`;
			case 'grey-17-30-percent':
				return `rgba(${module.exports.Color('grey-17')}, .3)`;
			case 'grey-17-40-percent':
				return `rgba(${module.exports.Color('grey-17')}, .4)`;
			case 'grey-17-50-percent':
				return `rgba(${module.exports.Color('grey-17')}, .5)`;
			case 'grey-17-60-percent':
				return `rgba(${module.exports.Color('grey-17')}, .6)`;
			case 'grey-17-70-percent':
				return `rgba(${module.exports.Color('grey-17')}, .7)`;
			case 'grey-17-80-percent':
				return `rgba(${module.exports.Color('grey-17')}, .8)`;
			case 'grey-17-90-percent':
				return `rgba(${module.exports.Color('grey-17')}, .9)`;
			case 'grey-17-95-percent':
				return `rgba(${module.exports.Color('grey-17')}, .95)`;
			case 'grey-18-10-percent':
				return `rgba(${module.exports.Color('grey-18')}, .1)`;
			case 'grey-18-20-percent':
				return `rgba(${module.exports.Color('grey-18')}, .2)`;
			case 'grey-18-30-percent':
				return `rgba(${module.exports.Color('grey-18')}, .3)`;
			case 'grey-18-40-percent':
				return `rgba(${module.exports.Color('grey-18')}, .4)`;
			case 'grey-18-50-percent':
				return `rgba(${module.exports.Color('grey-18')}, .5)`;
			case 'grey-18-60-percent':
				return `rgba(${module.exports.Color('grey-18')}, .6)`;
			case 'grey-18-70-percent':
				return `rgba(${module.exports.Color('grey-18')}, .7)`;
			case 'grey-18-80-percent':
				return `rgba(${module.exports.Color('grey-18')}, .8)`;
			case 'grey-18-90-percent':
				return `rgba(${module.exports.Color('grey-18')}, .9)`;
			case 'grey-18-95-percent':
				return `rgba(${module.exports.Color('grey-18')}, .95)`;
			case 'white-5-percent':
				return `rgba(${module.exports.Color('white')}, .05)`;
			case 'white-10-percent':
				return `rgba(${module.exports.Color('white')}, .1)`;
			case 'white-20-percent':
				return `rgba(${module.exports.Color('white')}, .2)`;
			case 'white-30-percent':
				return `rgba(${module.exports.Color('white')}, .3)`;
			case 'white-40-percent':
				return `rgba(${module.exports.Color('white')}, .4)`;
			case 'white-50-percent':
				return `rgba(${module.exports.Color('white')}, .5)`;
			case 'white-60-percent':
				return `rgba(${module.exports.Color('white')}, .6)`;
			case 'white-70-percent':
				return `rgba(${module.exports.Color('white')}, .7)`;
			case 'white-80-percent':
				return `rgba(${module.exports.Color('white')}, .8)`;
			case 'white-90-percent':
				return `rgba(${module.exports.Color('white')}, .9)`;
			case 'white-95-percent':
				return `rgba(${module.exports.Color('white')}, .95)`;

			// YELLOW
			case 'yellow-1-10-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .1)`;
			case 'yellow-1-20-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .2)`;
			case 'yellow-1-30-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .3)`;
			case 'yellow-1-40-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .4)`;
			case 'yellow-1-50-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .5)`;
			case 'yellow-1-60-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .6)`;
			case 'yellow-1-70-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .7)`;
			case 'yellow-1-80-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .8)`;
			case 'yellow-1-90-percent':
				return `rgba(${module.exports.Color('yellow-1')}, .9)`;

			case 'yellow-2-10-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .1)`;
			case 'yellow-2-20-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .2)`;
			case 'yellow-2-30-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .3)`;
			case 'yellow-2-40-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .4)`;
			case 'yellow-2-50-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .5)`;
			case 'yellow-2-60-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .6)`;
			case 'yellow-2-70-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .7)`;
			case 'yellow-2-80-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .8)`;
			case 'yellow-2-90-percent':
				return `rgba(${module.exports.Color('yellow-2')}, .9)`;

			case 'yellow-3-10-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .1)`;
			case 'yellow-3-20-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .2)`;
			case 'yellow-3-30-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .3)`;
			case 'yellow-3-40-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .4)`;
			case 'yellow-3-50-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .5)`;
			case 'yellow-3-60-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .6)`;
			case 'yellow-3-70-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .7)`;
			case 'yellow-3-80-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .8)`;
			case 'yellow-3-90-percent':
				return `rgba(${module.exports.Color('yellow-3')}, .9)`;

			case 'yellow-4-10-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .1)`;
			case 'yellow-4-20-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .2)`;
			case 'yellow-4-30-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .3)`;
			case 'yellow-4-40-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .4)`;
			case 'yellow-4-50-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .5)`;
			case 'yellow-4-60-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .6)`;
			case 'yellow-4-70-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .7)`;
			case 'yellow-4-80-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .8)`;
			case 'yellow-4-90-percent':
				return `rgba(${module.exports.Color('yellow-4')}, .9)`;

			case 'yellow-5-10-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .1)`;
			case 'yellow-5-20-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .2)`;
			case 'yellow-5-30-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .3)`;
			case 'yellow-5-40-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .4)`;
			case 'yellow-5-50-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .5)`;
			case 'yellow-5-60-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .6)`;
			case 'yellow-5-70-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .7)`;
			case 'yellow-5-80-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .8)`;
			case 'yellow-5-90-percent':
				return `rgba(${module.exports.Color('yellow-5')}, .9)`;

			// AQUA

			case 'aqua-1-10-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .1)`;
			case 'aqua-1-20-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .2)`;
			case 'aqua-1-30-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .3)`;
			case 'aqua-1-40-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .4)`;
			case 'aqua-1-50-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .5)`;
			case 'aqua-1-60-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .6)`;
			case 'aqua-1-70-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .7)`;
			case 'aqua-1-80-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .8)`;
			case 'aqua-1-90-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .9)`;

			case 'aqua-2-10-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .1)`;
			case 'aqua-2-20-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .2)`;
			case 'aqua-2-30-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .3)`;
			case 'aqua-2-40-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .4)`;
			case 'aqua-2-50-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .5)`;
			case 'aqua-2-60-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .6)`;
			case 'aqua-2-70-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .7)`;
			case 'aqua-2-80-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .8)`;
			case 'aqua-2-90-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .9)`;

			case 'aqua-3-10-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .1)`;
			case 'aqua-3-20-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .2)`;
			case 'aqua-3-30-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .3)`;
			case 'aqua-3-40-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .4)`;
			case 'aqua-3-50-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .5)`;
			case 'aqua-3-60-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .6)`;
			case 'aqua-3-70-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .7)`;
			case 'aqua-3-80-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .8)`;
			case 'aqua-3-90-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .9)`;

			case 'aqua-4-10-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .1)`;
			case 'aqua-4-20-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .2)`;
			case 'aqua-4-30-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .3)`;
			case 'aqua-4-40-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .4)`;
			case 'aqua-4-50-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .5)`;
			case 'aqua-4-60-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .6)`;
			case 'aqua-4-70-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .7)`;
			case 'aqua-4-80-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .8)`;
			case 'aqua-4-90-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .9)`;

			case 'aqua-5-10-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .1)`;
			case 'aqua-5-20-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .2)`;
			case 'aqua-5-30-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .3)`;
			case 'aqua-5-40-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .4)`;
			case 'aqua-5-50-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .5)`;
			case 'aqua-5-60-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .6)`;
			case 'aqua-5-70-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .7)`;
			case 'aqua-5-80-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .8)`;
			case 'aqua-5-90-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .9)`;


			// GREEN

			case 'green-1-10-percent':
				return `rgba(${module.exports.Color('green-1')}, .1)`;
			case 'green-1-20-percent':
				return `rgba(${module.exports.Color('green-1')}, .2)`;
			case 'green-1-30-percent':
				return `rgba(${module.exports.Color('green-1')}, .3)`;
			case 'green-1-40-percent':
				return `rgba(${module.exports.Color('green-1')}, .4)`;
			case 'green-1-50-percent':
				return `rgba(${module.exports.Color('green-1')}, .5)`;
			case 'green-1-60-percent':
				return `rgba(${module.exports.Color('green-1')}, .6)`;
			case 'green-1-70-percent':
				return `rgba(${module.exports.Color('green-1')}, .7)`;
			case 'green-1-80-percent':
				return `rgba(${module.exports.Color('green-1')}, .8)`;
			case 'green-1-90-percent':
				return `rgba(${module.exports.Color('green-1')}, .9)`;

			case 'green-2-10-percent':
				return `rgba(${module.exports.Color('green-2')}, .1)`;
			case 'green-2-20-percent':
				return `rgba(${module.exports.Color('green-2')}, .2)`;
			case 'green-2-30-percent':
				return `rgba(${module.exports.Color('green-2')}, .3)`;
			case 'green-2-40-percent':
				return `rgba(${module.exports.Color('green-2')}, .4)`;
			case 'green-2-50-percent':
				return `rgba(${module.exports.Color('green-2')}, .5)`;
			case 'green-2-60-percent':
				return `rgba(${module.exports.Color('green-2')}, .6)`;
			case 'green-2-70-percent':
				return `rgba(${module.exports.Color('green-2')}, .7)`;
			case 'green-2-80-percent':
				return `rgba(${module.exports.Color('green-2')}, .8)`;
			case 'green-2-90-percent':
				return `rgba(${module.exports.Color('green-2')}, .9)`;

			case 'green-3-10-percent':
				return `rgba(${module.exports.Color('green-3')}, .1)`;
			case 'green-3-20-percent':
				return `rgba(${module.exports.Color('green-3')}, .2)`;
			case 'green-3-30-percent':
				return `rgba(${module.exports.Color('green-3')}, .3)`;
			case 'green-3-40-percent':
				return `rgba(${module.exports.Color('green-3')}, .4)`;
			case 'green-3-50-percent':
				return `rgba(${module.exports.Color('green-3')}, .5)`;
			case 'green-3-60-percent':
				return `rgba(${module.exports.Color('green-3')}, .6)`;
			case 'green-3-70-percent':
				return `rgba(${module.exports.Color('green-3')}, .7)`;
			case 'green-3-80-percent':
				return `rgba(${module.exports.Color('green-3')}, .8)`;
			case 'green-3-90-percent':
				return `rgba(${module.exports.Color('green-3')}, .9)`;

			case 'green-4-10-percent':
				return `rgba(${module.exports.Color('green-4')}, .1)`;
			case 'green-4-20-percent':
				return `rgba(${module.exports.Color('green-4')}, .2)`;
			case 'green-4-30-percent':
				return `rgba(${module.exports.Color('green-4')}, .3)`;
			case 'green-4-40-percent':
				return `rgba(${module.exports.Color('green-4')}, .4)`;
			case 'green-4-50-percent':
				return `rgba(${module.exports.Color('green-4')}, .5)`;
			case 'green-4-60-percent':
				return `rgba(${module.exports.Color('green-4')}, .6)`;
			case 'green-4-70-percent':
				return `rgba(${module.exports.Color('green-4')}, .7)`;
			case 'green-4-80-percent':
				return `rgba(${module.exports.Color('green-4')}, .8)`;
			case 'green-4-90-percent':
				return `rgba(${module.exports.Color('green-4')}, .9)`;

			case 'green-5-10-percent':
				return `rgba(${module.exports.Color('green-5')}, .1)`;
			case 'green-5-20-percent':
				return `rgba(${module.exports.Color('green-5')}, .2)`;
			case 'green-5-30-percent':
				return `rgba(${module.exports.Color('green-5')}, .3)`;
			case 'green-5-40-percent':
				return `rgba(${module.exports.Color('green-5')}, .4)`;
			case 'green-5-50-percent':
				return `rgba(${module.exports.Color('green-5')}, .5)`;
			case 'green-5-60-percent':
				return `rgba(${module.exports.Color('green-5')}, .6)`;
			case 'green-5-70-percent':
				return `rgba(${module.exports.Color('green-5')}, .7)`;
			case 'green-5-80-percent':
				return `rgba(${module.exports.Color('green-5')}, .8)`;
			case 'green-5-90-percent':
				return `rgba(${module.exports.Color('green-5')}, .9)`;

			case 'green-6-10-percent':
				return `rgba(${module.exports.Color('green-6')}, .1)`;
			case 'green-6-20-percent':
				return `rgba(${module.exports.Color('green-6')}, .2)`;
			case 'green-6-30-percent':
				return `rgba(${module.exports.Color('green-6')}, .3)`;
			case 'green-6-40-percent':
				return `rgba(${module.exports.Color('green-6')}, .4)`;
			case 'green-6-50-percent':
				return `rgba(${module.exports.Color('green-6')}, .5)`;
			case 'green-6-60-percent':
				return `rgba(${module.exports.Color('green-6')}, .6)`;
			case 'green-6-70-percent':
				return `rgba(${module.exports.Color('green-6')}, .7)`;
			case 'green-6-80-percent':
				return `rgba(${module.exports.Color('green-6')}, .8)`;
			case 'green-6-90-percent':
				return `rgba(${module.exports.Color('green-6')}, .9)`;

			case 'green-7-10-percent':
				return `rgba(${module.exports.Color('green-7')}, .1)`;
			case 'green-7-20-percent':
				return `rgba(${module.exports.Color('green-7')}, .2)`;
			case 'green-7-30-percent':
				return `rgba(${module.exports.Color('green-7')}, .3)`;
			case 'green-7-40-percent':
				return `rgba(${module.exports.Color('green-7')}, .4)`;
			case 'green-7-50-percent':
				return `rgba(${module.exports.Color('green-7')}, .5)`;
			case 'green-7-60-percent':
				return `rgba(${module.exports.Color('green-7')}, .6)`;
			case 'green-7-70-percent':
				return `rgba(${module.exports.Color('green-7')}, .7)`;
			case 'green-7-80-percent':
				return `rgba(${module.exports.Color('green-7')}, .8)`;
			case 'green-7-90-percent':
				return `rgba(${module.exports.Color('green-7')}, .9)`;

			case 'green-8-10-percent':
				return `rgba(${module.exports.Color('green-8')}, .1)`;
			case 'green-8-20-percent':
				return `rgba(${module.exports.Color('green-8')}, .2)`;
			case 'green-8-30-percent':
				return `rgba(${module.exports.Color('green-8')}, .3)`;
			case 'green-8-40-percent':
				return `rgba(${module.exports.Color('green-8')}, .4)`;
			case 'green-8-50-percent':
				return `rgba(${module.exports.Color('green-8')}, .5)`;
			case 'green-8-60-percent':
				return `rgba(${module.exports.Color('green-8')}, .6)`;
			case 'green-8-70-percent':
				return `rgba(${module.exports.Color('green-8')}, .7)`;
			case 'green-8-80-percent':
				return `rgba(${module.exports.Color('green-8')}, .8)`;
			case 'green-8-90-percent':
				return `rgba(${module.exports.Color('green-8')}, .9)`;

			case 'green-9-10-percent':
				return `rgba(${module.exports.Color('green-9')}, .1)`;
			case 'green-9-20-percent':
				return `rgba(${module.exports.Color('green-9')}, .2)`;
			case 'green-9-30-percent':
				return `rgba(${module.exports.Color('green-9')}, .3)`;
			case 'green-9-40-percent':
				return `rgba(${module.exports.Color('green-9')}, .4)`;
			case 'green-9-50-percent':
				return `rgba(${module.exports.Color('green-9')}, .5)`;
			case 'green-9-60-percent':
				return `rgba(${module.exports.Color('green-9')}, .6)`;
			case 'green-9-70-percent':
				return `rgba(${module.exports.Color('green-9')}, .7)`;
			case 'green-9-80-percent':
				return `rgba(${module.exports.Color('green-9')}, .8)`;
			case 'green-9-90-percent':
				return `rgba(${module.exports.Color('green-9')}, .9)`;

			case 'green-10-10-percent':
				return `rgba(${module.exports.Color('green-10')}, .1)`;
			case 'green-10-20-percent':
				return `rgba(${module.exports.Color('green-10')}, .2)`;
			case 'green-10-30-percent':
				return `rgba(${module.exports.Color('green-10')}, .3)`;
			case 'green-10-40-percent':
				return `rgba(${module.exports.Color('green-10')}, .4)`;
			case 'green-10-50-percent':
				return `rgba(${module.exports.Color('green-10')}, .5)`;
			case 'green-10-60-percent':
				return `rgba(${module.exports.Color('green-10')}, .6)`;
			case 'green-10-70-percent':
				return `rgba(${module.exports.Color('green-10')}, .7)`;
			case 'green-10-80-percent':
				return `rgba(${module.exports.Color('green-10')}, .8)`;
			case 'green-10-90-percent':
				return `rgba(${module.exports.Color('green-10')}, .9)`;

			// BLUE

			case 'blue-1-10-percent':
				return `rgba(${module.exports.Color('blue-1')}, .1)`;
			case 'blue-1-20-percent':
				return `rgba(${module.exports.Color('blue-1')}, .2)`;
			case 'blue-1-30-percent':
				return `rgba(${module.exports.Color('blue-1')}, .3)`;
			case 'blue-1-40-percent':
				return `rgba(${module.exports.Color('blue-1')}, .4)`;
			case 'blue-1-50-percent':
				return `rgba(${module.exports.Color('blue-1')}, .5)`;
			case 'blue-1-60-percent':
				return `rgba(${module.exports.Color('blue-1')}, .6)`;
			case 'blue-1-70-percent':
				return `rgba(${module.exports.Color('blue-1')}, .7)`;
			case 'blue-1-80-percent':
				return `rgba(${module.exports.Color('blue-1')}, .8)`;
			case 'blue-1-90-percent':
				return `rgba(${module.exports.Color('blue-1')}, .9)`;

			case 'blue-2-10-percent':
				return `rgba(${module.exports.Color('blue-2')}, .1)`;
			case 'blue-2-20-percent':
				return `rgba(${module.exports.Color('blue-2')}, .2)`;
			case 'blue-2-30-percent':
				return `rgba(${module.exports.Color('blue-2')}, .3)`;
			case 'blue-2-40-percent':
				return `rgba(${module.exports.Color('blue-2')}, .4)`;
			case 'blue-2-50-percent':
				return `rgba(${module.exports.Color('blue-2')}, .5)`;
			case 'blue-2-60-percent':
				return `rgba(${module.exports.Color('blue-2')}, .6)`;
			case 'blue-2-70-percent':
				return `rgba(${module.exports.Color('blue-2')}, .7)`;
			case 'blue-2-80-percent':
				return `rgba(${module.exports.Color('blue-2')}, .8)`;
			case 'blue-2-90-percent':
				return `rgba(${module.exports.Color('blue-2')}, .9)`;

			case 'blue-3-10-percent':
				return `rgba(${module.exports.Color('blue-3')}, .1)`;
			case 'blue-3-20-percent':
				return `rgba(${module.exports.Color('blue-3')}, .2)`;
			case 'blue-3-30-percent':
				return `rgba(${module.exports.Color('blue-3')}, .3)`;
			case 'blue-3-40-percent':
				return `rgba(${module.exports.Color('blue-3')}, .4)`;
			case 'blue-3-50-percent':
				return `rgba(${module.exports.Color('blue-3')}, .5)`;
			case 'blue-3-60-percent':
				return `rgba(${module.exports.Color('blue-3')}, .6)`;
			case 'blue-3-70-percent':
				return `rgba(${module.exports.Color('blue-3')}, .7)`;
			case 'blue-3-80-percent':
				return `rgba(${module.exports.Color('blue-3')}, .8)`;
			case 'blue-3-90-percent':
				return `rgba(${module.exports.Color('blue-3')}, .9)`;

			case 'blue-4-10-percent':
				return `rgba(${module.exports.Color('blue-4')}, .1)`;
			case 'blue-4-20-percent':
				return `rgba(${module.exports.Color('blue-4')}, .2)`;
			case 'blue-4-30-percent':
				return `rgba(${module.exports.Color('blue-4')}, .3)`;
			case 'blue-4-40-percent':
				return `rgba(${module.exports.Color('blue-4')}, .4)`;
			case 'blue-4-50-percent':
				return `rgba(${module.exports.Color('blue-4')}, .5)`;
			case 'blue-4-60-percent':
				return `rgba(${module.exports.Color('blue-4')}, .6)`;
			case 'blue-4-70-percent':
				return `rgba(${module.exports.Color('blue-4')}, .7)`;
			case 'blue-4-80-percent':
				return `rgba(${module.exports.Color('blue-4')}, .8)`;
			case 'blue-4-90-percent':
				return `rgba(${module.exports.Color('blue-4')}, .9)`;

			case 'blue-5-10-percent':
				return `rgba(${module.exports.Color('blue-5')}, .1)`;
			case 'blue-5-20-percent':
				return `rgba(${module.exports.Color('blue-5')}, .2)`;
			case 'blue-5-30-percent':
				return `rgba(${module.exports.Color('blue-5')}, .3)`;
			case 'blue-5-40-percent':
				return `rgba(${module.exports.Color('blue-5')}, .4)`;
			case 'blue-5-50-percent':
				return `rgba(${module.exports.Color('blue-5')}, .5)`;
			case 'blue-5-60-percent':
				return `rgba(${module.exports.Color('blue-5')}, .6)`;
			case 'blue-5-70-percent':
				return `rgba(${module.exports.Color('blue-5')}, .7)`;
			case 'blue-5-80-percent':
				return `rgba(${module.exports.Color('blue-5')}, .8)`;
			case 'blue-5-90-percent':
				return `rgba(${module.exports.Color('blue-5')}, .9)`;

			case 'blue-6-10-percent':
				return `rgba(${module.exports.Color('blue-6')}, .1)`;
			case 'blue-6-20-percent':
				return `rgba(${module.exports.Color('blue-6')}, .2)`;
			case 'blue-6-30-percent':
				return `rgba(${module.exports.Color('blue-6')}, .3)`;
			case 'blue-6-40-percent':
				return `rgba(${module.exports.Color('blue-6')}, .4)`;
			case 'blue-6-50-percent':
				return `rgba(${module.exports.Color('blue-6')}, .5)`;
			case 'blue-6-60-percent':
				return `rgba(${module.exports.Color('blue-6')}, .6)`;
			case 'blue-6-70-percent':
				return `rgba(${module.exports.Color('blue-6')}, .7)`;
			case 'blue-6-80-percent':
				return `rgba(${module.exports.Color('blue-6')}, .8)`;
			case 'blue-6-90-percent':
				return `rgba(${module.exports.Color('blue-6')}, .9)`;

			case 'blue-7-10-percent':
				return `rgba(${module.exports.Color('blue-7')}, .1)`;
			case 'blue-7-20-percent':
				return `rgba(${module.exports.Color('blue-7')}, .2)`;
			case 'blue-7-30-percent':
				return `rgba(${module.exports.Color('blue-7')}, .3)`;
			case 'blue-7-40-percent':
				return `rgba(${module.exports.Color('blue-7')}, .4)`;
			case 'blue-7-50-percent':
				return `rgba(${module.exports.Color('blue-7')}, .5)`;
			case 'blue-7-60-percent':
				return `rgba(${module.exports.Color('blue-7')}, .6)`;
			case 'blue-7-70-percent':
				return `rgba(${module.exports.Color('blue-7')}, .7)`;
			case 'blue-7-80-percent':
				return `rgba(${module.exports.Color('blue-7')}, .8)`;
			case 'blue-7-90-percent':
				return `rgba(${module.exports.Color('blue-7')}, .9)`;

			case 'blue-8-10-percent':
				return `rgba(${module.exports.Color('blue-8')}, .1)`;
			case 'blue-8-20-percent':
				return `rgba(${module.exports.Color('blue-8')}, .2)`;
			case 'blue-8-30-percent':
				return `rgba(${module.exports.Color('blue-8')}, .3)`;
			case 'blue-8-40-percent':
				return `rgba(${module.exports.Color('blue-8')}, .4)`;
			case 'blue-8-50-percent':
				return `rgba(${module.exports.Color('blue-8')}, .5)`;
			case 'blue-8-60-percent':
				return `rgba(${module.exports.Color('blue-8')}, .6)`;
			case 'blue-8-70-percent':
				return `rgba(${module.exports.Color('blue-8')}, .7)`;
			case 'blue-8-80-percent':
				return `rgba(${module.exports.Color('blue-8')}, .8)`;
			case 'blue-8-90-percent':
				return `rgba(${module.exports.Color('blue-8')}, .9)`;

			case 'blue-9-10-percent':
				return `rgba(${module.exports.Color('blue-9')}, .1)`;
			case 'blue-9-20-percent':
				return `rgba(${module.exports.Color('blue-9')}, .2)`;
			case 'blue-9-30-percent':
				return `rgba(${module.exports.Color('blue-9')}, .3)`;
			case 'blue-9-40-percent':
				return `rgba(${module.exports.Color('blue-9')}, .4)`;
			case 'blue-9-50-percent':
				return `rgba(${module.exports.Color('blue-9')}, .5)`;
			case 'blue-9-60-percent':
				return `rgba(${module.exports.Color('blue-9')}, .6)`;
			case 'blue-9-70-percent':
				return `rgba(${module.exports.Color('blue-9')}, .7)`;
			case 'blue-9-80-percent':
				return `rgba(${module.exports.Color('blue-9')}, .8)`;
			case 'blue-9-90-percent':
				return `rgba(${module.exports.Color('blue-9')}, .9)`;

			case 'blue-10-10-percent':
				return `rgba(${module.exports.Color('blue-10')}, .1)`;
			case 'blue-10-20-percent':
				return `rgba(${module.exports.Color('blue-10')}, .2)`;
			case 'blue-10-30-percent':
				return `rgba(${module.exports.Color('blue-10')}, .3)`;
			case 'blue-10-40-percent':
				return `rgba(${module.exports.Color('blue-10')}, .4)`;
			case 'blue-10-50-percent':
				return `rgba(${module.exports.Color('blue-10')}, .5)`;
			case 'blue-10-60-percent':
				return `rgba(${module.exports.Color('blue-10')}, .6)`;
			case 'blue-10-70-percent':
				return `rgba(${module.exports.Color('blue-10')}, .7)`;
			case 'blue-10-80-percent':
				return `rgba(${module.exports.Color('blue-10')}, .8)`;
			case 'blue-10-90-percent':
				return `rgba(${module.exports.Color('blue-10')}, .9)`;

			// CORAL

			case 'coral-1-10-percent':
				return `rgba(${module.exports.Color('coral-1')}, .1)`;
			case 'coral-1-20-percent':
				return `rgba(${module.exports.Color('coral-1')}, .2)`;
			case 'coral-1-30-percent':
				return `rgba(${module.exports.Color('coral-1')}, .3)`;
			case 'coral-1-40-percent':
				return `rgba(${module.exports.Color('coral-1')}, .4)`;
			case 'coral-1-50-percent':
				return `rgba(${module.exports.Color('coral-1')}, .5)`;
			case 'coral-1-60-percent':
				return `rgba(${module.exports.Color('coral-1')}, .6)`;
			case 'coral-1-70-percent':
				return `rgba(${module.exports.Color('coral-1')}, .7)`;
			case 'coral-1-80-percent':
				return `rgba(${module.exports.Color('coral-1')}, .8)`;
			case 'coral-1-90-percent':
				return `rgba(${module.exports.Color('coral-1')}, .9)`;

			case 'coral-2-10-percent':
				return `rgba(${module.exports.Color('coral-2')}, .1)`;
			case 'coral-2-20-percent':
				return `rgba(${module.exports.Color('coral-2')}, .2)`;
			case 'coral-2-30-percent':
				return `rgba(${module.exports.Color('coral-2')}, .3)`;
			case 'coral-2-40-percent':
				return `rgba(${module.exports.Color('coral-2')}, .4)`;
			case 'coral-2-50-percent':
				return `rgba(${module.exports.Color('coral-2')}, .5)`;
			case 'coral-2-60-percent':
				return `rgba(${module.exports.Color('coral-2')}, .6)`;
			case 'coral-2-70-percent':
				return `rgba(${module.exports.Color('coral-2')}, .7)`;
			case 'coral-2-80-percent':
				return `rgba(${module.exports.Color('coral-2')}, .8)`;
			case 'coral-2-90-percent':
				return `rgba(${module.exports.Color('coral-2')}, .9)`;

			case 'coral-3-10-percent':
				return `rgba(${module.exports.Color('coral-3')}, .1)`;
			case 'coral-3-20-percent':
				return `rgba(${module.exports.Color('coral-3')}, .2)`;
			case 'coral-3-30-percent':
				return `rgba(${module.exports.Color('coral-3')}, .3)`;
			case 'coral-3-40-percent':
				return `rgba(${module.exports.Color('coral-3')}, .4)`;
			case 'coral-3-50-percent':
				return `rgba(${module.exports.Color('coral-3')}, .5)`;
			case 'coral-3-60-percent':
				return `rgba(${module.exports.Color('coral-3')}, .6)`;
			case 'coral-3-70-percent':
				return `rgba(${module.exports.Color('coral-3')}, .7)`;
			case 'coral-3-80-percent':
				return `rgba(${module.exports.Color('coral-3')}, .8)`;
			case 'coral-3-90-percent':
				return `rgba(${module.exports.Color('coral-3')}, .9)`;

			case 'coral-4-10-percent':
				return `rgba(${module.exports.Color('coral-4')}, .1)`;
			case 'coral-4-20-percent':
				return `rgba(${module.exports.Color('coral-4')}, .2)`;
			case 'coral-4-30-percent':
				return `rgba(${module.exports.Color('coral-4')}, .3)`;
			case 'coral-4-40-percent':
				return `rgba(${module.exports.Color('coral-4')}, .4)`;
			case 'coral-4-50-percent':
				return `rgba(${module.exports.Color('coral-4')}, .5)`;
			case 'coral-4-60-percent':
				return `rgba(${module.exports.Color('coral-4')}, .6)`;
			case 'coral-4-70-percent':
				return `rgba(${module.exports.Color('coral-4')}, .7)`;
			case 'coral-4-80-percent':
				return `rgba(${module.exports.Color('coral-4')}, .8)`;
			case 'coral-4-90-percent':
				return `rgba(${module.exports.Color('coral-4')}, .9)`;

			case 'coral-5-10-percent':
				return `rgba(${module.exports.Color('coral-5')}, .1)`;
			case 'coral-5-20-percent':
				return `rgba(${module.exports.Color('coral-5')}, .2)`;
			case 'coral-5-30-percent':
				return `rgba(${module.exports.Color('coral-5')}, .3)`;
			case 'coral-5-40-percent':
				return `rgba(${module.exports.Color('coral-5')}, .4)`;
			case 'coral-5-50-percent':
				return `rgba(${module.exports.Color('coral-5')}, .5)`;
			case 'coral-5-60-percent':
				return `rgba(${module.exports.Color('coral-5')}, .6)`;
			case 'coral-5-70-percent':
				return `rgba(${module.exports.Color('coral-5')}, .7)`;
			case 'coral-5-80-percent':
				return `rgba(${module.exports.Color('coral-5')}, .8)`;
			case 'coral-5-90-percent':
				return `rgba(${module.exports.Color('coral-5')}, .9)`;

			// ORANGE

			case 'orange-1-10-percent':
				return `rgba(${module.exports.Color('orange-1')}, .1)`;
			case 'orange-1-20-percent':
				return `rgba(${module.exports.Color('orange-1')}, .2)`;
			case 'orange-1-30-percent':
				return `rgba(${module.exports.Color('orange-1')}, .3)`;
			case 'orange-1-40-percent':
				return `rgba(${module.exports.Color('orange-1')}, .4)`;
			case 'orange-1-50-percent':
				return `rgba(${module.exports.Color('orange-1')}, .5)`;
			case 'orange-1-60-percent':
				return `rgba(${module.exports.Color('orange-1')}, .6)`;
			case 'orange-1-70-percent':
				return `rgba(${module.exports.Color('orange-1')}, .7)`;
			case 'orange-1-80-percent':
				return `rgba(${module.exports.Color('orange-1')}, .8)`;
			case 'orange-1-90-percent':
				return `rgba(${module.exports.Color('orange-1')}, .9)`;

			case 'orange-2-10-percent':
				return `rgba(${module.exports.Color('orange-2')}, .1)`;
			case 'orange-2-20-percent':
				return `rgba(${module.exports.Color('orange-2')}, .2)`;
			case 'orange-2-30-percent':
				return `rgba(${module.exports.Color('orange-2')}, .3)`;
			case 'orange-2-40-percent':
				return `rgba(${module.exports.Color('orange-2')}, .4)`;
			case 'orange-2-50-percent':
				return `rgba(${module.exports.Color('orange-2')}, .5)`;
			case 'orange-2-60-percent':
				return `rgba(${module.exports.Color('orange-2')}, .6)`;
			case 'orange-2-70-percent':
				return `rgba(${module.exports.Color('orange-2')}, .7)`;
			case 'orange-2-80-percent':
				return `rgba(${module.exports.Color('orange-2')}, .8)`;
			case 'orange-2-90-percent':
				return `rgba(${module.exports.Color('orange-2')}, .9)`;

			case 'orange-3-10-percent':
				return `rgba(${module.exports.Color('orange-3')}, .1)`;
			case 'orange-3-20-percent':
				return `rgba(${module.exports.Color('orange-3')}, .2)`;
			case 'orange-3-30-percent':
				return `rgba(${module.exports.Color('orange-3')}, .3)`;
			case 'orange-3-40-percent':
				return `rgba(${module.exports.Color('orange-3')}, .4)`;
			case 'orange-3-50-percent':
				return `rgba(${module.exports.Color('orange-3')}, .5)`;
			case 'orange-3-60-percent':
				return `rgba(${module.exports.Color('orange-3')}, .6)`;
			case 'orange-3-70-percent':
				return `rgba(${module.exports.Color('orange-3')}, .7)`;
			case 'orange-3-80-percent':
				return `rgba(${module.exports.Color('orange-3')}, .8)`;
			case 'orange-3-90-percent':
				return `rgba(${module.exports.Color('orange-3')}, .9)`;

			case 'orange-4-10-percent':
				return `rgba(${module.exports.Color('orange-4')}, .1)`;
			case 'orange-4-20-percent':
				return `rgba(${module.exports.Color('orange-4')}, .2)`;
			case 'orange-4-30-percent':
				return `rgba(${module.exports.Color('orange-4')}, .3)`;
			case 'orange-4-40-percent':
				return `rgba(${module.exports.Color('orange-4')}, .4)`;
			case 'orange-4-50-percent':
				return `rgba(${module.exports.Color('orange-4')}, .5)`;
			case 'orange-4-60-percent':
				return `rgba(${module.exports.Color('orange-4')}, .6)`;
			case 'orange-4-70-percent':
				return `rgba(${module.exports.Color('orange-4')}, .7)`;
			case 'orange-4-80-percent':
				return `rgba(${module.exports.Color('orange-4')}, .8)`;
			case 'orange-4-90-percent':
				return `rgba(${module.exports.Color('orange-4')}, .9)`;

			case 'orange-5-10-percent':
				return `rgba(${module.exports.Color('orange-5')}, .1)`;
			case 'orange-5-20-percent':
				return `rgba(${module.exports.Color('orange-5')}, .2)`;
			case 'orange-5-30-percent':
				return `rgba(${module.exports.Color('orange-5')}, .3)`;
			case 'orange-5-40-percent':
				return `rgba(${module.exports.Color('orange-5')}, .4)`;
			case 'orange-5-50-percent':
				return `rgba(${module.exports.Color('orange-5')}, .5)`;
			case 'orange-5-60-percent':
				return `rgba(${module.exports.Color('orange-5')}, .6)`;
			case 'orange-5-70-percent':
				return `rgba(${module.exports.Color('orange-5')}, .7)`;
			case 'orange-5-80-percent':
				return `rgba(${module.exports.Color('orange-5')}, .8)`;
			case 'orange-5-90-percent':
				return `rgba(${module.exports.Color('orange-5')}, .9)`;

			case 'orange-6-10-percent':
				return `rgba(${module.exports.Color('orange-6')}, .1)`;
			case 'orange-6-20-percent':
				return `rgba(${module.exports.Color('orange-6')}, .2)`;
			case 'orange-6-30-percent':
				return `rgba(${module.exports.Color('orange-6')}, .3)`;
			case 'orange-6-40-percent':
				return `rgba(${module.exports.Color('orange-6')}, .4)`;
			case 'orange-6-50-percent':
				return `rgba(${module.exports.Color('orange-6')}, .5)`;
			case 'orange-6-60-percent':
				return `rgba(${module.exports.Color('orange-6')}, .6)`;
			case 'orange-6-70-percent':
				return `rgba(${module.exports.Color('orange-6')}, .7)`;
			case 'orange-6-80-percent':
				return `rgba(${module.exports.Color('orange-6')}, .8)`;
			case 'orange-6-90-percent':
				return `rgba(${module.exports.Color('orange-6')}, .9)`;

			// PINK

			case 'pink-1-10-percent':
				return `rgba(${module.exports.Color('pink-1')}, .1)`;
			case 'pink-1-20-percent':
				return `rgba(${module.exports.Color('pink-1')}, .2)`;
			case 'pink-1-30-percent':
				return `rgba(${module.exports.Color('pink-1')}, .3)`;
			case 'pink-1-40-percent':
				return `rgba(${module.exports.Color('pink-1')}, .4)`;
			case 'pink-1-50-percent':
				return `rgba(${module.exports.Color('pink-1')}, .5)`;
			case 'pink-1-60-percent':
				return `rgba(${module.exports.Color('pink-1')}, .6)`;
			case 'pink-1-70-percent':
				return `rgba(${module.exports.Color('pink-1')}, .7)`;
			case 'pink-1-80-percent':
				return `rgba(${module.exports.Color('pink-1')}, .8)`;
			case 'pink-1-90-percent':
				return `rgba(${module.exports.Color('pink-1')}, .9)`;

			case 'pink-2-10-percent':
				return `rgba(${module.exports.Color('pink-2')}, .1)`;
			case 'pink-2-20-percent':
				return `rgba(${module.exports.Color('pink-2')}, .2)`;
			case 'pink-2-30-percent':
				return `rgba(${module.exports.Color('pink-2')}, .3)`;
			case 'pink-2-40-percent':
				return `rgba(${module.exports.Color('pink-2')}, .4)`;
			case 'pink-2-50-percent':
				return `rgba(${module.exports.Color('pink-2')}, .5)`;
			case 'pink-2-60-percent':
				return `rgba(${module.exports.Color('pink-2')}, .6)`;
			case 'pink-2-70-percent':
				return `rgba(${module.exports.Color('pink-2')}, .7)`;
			case 'pink-2-80-percent':
				return `rgba(${module.exports.Color('pink-2')}, .8)`;
			case 'pink-2-90-percent':
				return `rgba(${module.exports.Color('pink-2')}, .9)`;

			case 'pink-3-10-percent':
				return `rgba(${module.exports.Color('pink-3')}, .1)`;
			case 'pink-3-20-percent':
				return `rgba(${module.exports.Color('pink-3')}, .2)`;
			case 'pink-3-30-percent':
				return `rgba(${module.exports.Color('pink-3')}, .3)`;
			case 'pink-3-40-percent':
				return `rgba(${module.exports.Color('pink-3')}, .4)`;
			case 'pink-3-50-percent':
				return `rgba(${module.exports.Color('pink-3')}, .5)`;
			case 'pink-3-60-percent':
				return `rgba(${module.exports.Color('pink-3')}, .6)`;
			case 'pink-3-70-percent':
				return `rgba(${module.exports.Color('pink-3')}, .7)`;
			case 'pink-3-80-percent':
				return `rgba(${module.exports.Color('pink-3')}, .8)`;
			case 'pink-3-90-percent':
				return `rgba(${module.exports.Color('pink-3')}, .9)`;

			case 'pink-4-10-percent':
				return `rgba(${module.exports.Color('pink-4')}, .1)`;
			case 'pink-4-20-percent':
				return `rgba(${module.exports.Color('pink-4')}, .2)`;
			case 'pink-4-30-percent':
				return `rgba(${module.exports.Color('pink-4')}, .3)`;
			case 'pink-4-40-percent':
				return `rgba(${module.exports.Color('pink-4')}, .4)`;
			case 'pink-4-50-percent':
				return `rgba(${module.exports.Color('pink-4')}, .5)`;
			case 'pink-4-60-percent':
				return `rgba(${module.exports.Color('pink-4')}, .6)`;
			case 'pink-4-70-percent':
				return `rgba(${module.exports.Color('pink-4')}, .7)`;
			case 'pink-4-80-percent':
				return `rgba(${module.exports.Color('pink-4')}, .8)`;
			case 'pink-4-90-percent':
				return `rgba(${module.exports.Color('pink-4')}, .9)`;

			case 'pink-5-10-percent':
				return `rgba(${module.exports.Color('pink-5')}, .1)`;
			case 'pink-5-20-percent':
				return `rgba(${module.exports.Color('pink-5')}, .2)`;
			case 'pink-5-30-percent':
				return `rgba(${module.exports.Color('pink-5')}, .3)`;
			case 'pink-5-40-percent':
				return `rgba(${module.exports.Color('pink-5')}, .4)`;
			case 'pink-5-50-percent':
				return `rgba(${module.exports.Color('pink-5')}, .5)`;
			case 'pink-5-60-percent':
				return `rgba(${module.exports.Color('pink-5')}, .6)`;
			case 'pink-5-70-percent':
				return `rgba(${module.exports.Color('pink-5')}, .7)`;
			case 'pink-5-80-percent':
				return `rgba(${module.exports.Color('pink-5')}, .8)`;
			case 'pink-5-90-percent':
				return `rgba(${module.exports.Color('pink-5')}, .9)`;

			case 'pink-6-10-percent':
				return `rgba(${module.exports.Color('pink-6')}, .1)`;
			case 'pink-6-20-percent':
				return `rgba(${module.exports.Color('pink-6')}, .2)`;
			case 'pink-6-30-percent':
				return `rgba(${module.exports.Color('pink-6')}, .3)`;
			case 'pink-6-40-percent':
				return `rgba(${module.exports.Color('pink-6')}, .4)`;
			case 'pink-6-50-percent':
				return `rgba(${module.exports.Color('pink-6')}, .5)`;
			case 'pink-6-60-percent':
				return `rgba(${module.exports.Color('pink-6')}, .6)`;
			case 'pink-6-70-percent':
				return `rgba(${module.exports.Color('pink-6')}, .7)`;
			case 'pink-6-80-percent':
				return `rgba(${module.exports.Color('pink-6')}, .8)`;
			case 'pink-6-90-percent':
				return `rgba(${module.exports.Color('pink-6')}, .9)`;

			case 'pink-7-10-percent':
				return `rgba(${module.exports.Color('pink-7')}, .1)`;
			case 'pink-7-20-percent':
				return `rgba(${module.exports.Color('pink-7')}, .2)`;
			case 'pink-7-30-percent':
				return `rgba(${module.exports.Color('pink-7')}, .3)`;
			case 'pink-7-40-percent':
				return `rgba(${module.exports.Color('pink-7')}, .4)`;
			case 'pink-7-50-percent':
				return `rgba(${module.exports.Color('pink-7')}, .5)`;
			case 'pink-7-60-percent':
				return `rgba(${module.exports.Color('pink-7')}, .6)`;
			case 'pink-7-70-percent':
				return `rgba(${module.exports.Color('pink-7')}, .7)`;
			case 'pink-7-80-percent':
				return `rgba(${module.exports.Color('pink-7')}, .8)`;
			case 'pink-7-90-percent':
				return `rgba(${module.exports.Color('pink-7')}, .9)`;

			case 'pink-8-10-percent':
				return `rgba(${module.exports.Color('pink-8')}, .1)`;
			case 'pink-8-20-percent':
				return `rgba(${module.exports.Color('pink-8')}, .2)`;
			case 'pink-8-30-percent':
				return `rgba(${module.exports.Color('pink-8')}, .3)`;
			case 'pink-8-40-percent':
				return `rgba(${module.exports.Color('pink-8')}, .4)`;
			case 'pink-8-50-percent':
				return `rgba(${module.exports.Color('pink-8')}, .5)`;
			case 'pink-8-60-percent':
				return `rgba(${module.exports.Color('pink-8')}, .6)`;
			case 'pink-8-70-percent':
				return `rgba(${module.exports.Color('pink-8')}, .7)`;
			case 'pink-8-80-percent':
				return `rgba(${module.exports.Color('pink-8')}, .8)`;
			case 'pink-8-90-percent':
				return `rgba(${module.exports.Color('pink-8')}, .9)`;

			case 'pink-9-10-percent':
				return `rgba(${module.exports.Color('pink-9')}, .1)`;
			case 'pink-9-20-percent':
				return `rgba(${module.exports.Color('pink-9')}, .2)`;
			case 'pink-9-30-percent':
				return `rgba(${module.exports.Color('pink-9')}, .3)`;
			case 'pink-9-40-percent':
				return `rgba(${module.exports.Color('pink-9')}, .4)`;
			case 'pink-9-50-percent':
				return `rgba(${module.exports.Color('pink-9')}, .5)`;
			case 'pink-9-60-percent':
				return `rgba(${module.exports.Color('pink-9')}, .6)`;
			case 'pink-9-70-percent':
				return `rgba(${module.exports.Color('pink-9')}, .7)`;
			case 'pink-9-80-percent':
				return `rgba(${module.exports.Color('pink-9')}, .8)`;
			case 'pink-9-90-percent':
				return `rgba(${module.exports.Color('pink-9')}, .9)`;

			case 'pink-10-10-percent':
				return `rgba(${module.exports.Color('pink-10')}, .1)`;
			case 'pink-10-20-percent':
				return `rgba(${module.exports.Color('pink-10')}, .2)`;
			case 'pink-10-30-percent':
				return `rgba(${module.exports.Color('pink-10')}, .3)`;
			case 'pink-10-40-percent':
				return `rgba(${module.exports.Color('pink-10')}, .4)`;
			case 'pink-10-50-percent':
				return `rgba(${module.exports.Color('pink-10')}, .5)`;
			case 'pink-10-60-percent':
				return `rgba(${module.exports.Color('pink-10')}, .6)`;
			case 'pink-10-70-percent':
				return `rgba(${module.exports.Color('pink-10')}, .7)`;
			case 'pink-10-80-percent':
				return `rgba(${module.exports.Color('pink-10')}, .8)`;
			case 'pink-10-90-percent':
				return `rgba(${module.exports.Color('pink-10')}, .9)`;

			// AQUA

			case 'aqua-1-10-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .1)`;
			case 'aqua-1-20-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .2)`;
			case 'aqua-1-30-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .3)`;
			case 'aqua-1-40-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .4)`;
			case 'aqua-1-50-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .5)`;
			case 'aqua-1-60-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .6)`;
			case 'aqua-1-70-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .7)`;
			case 'aqua-1-80-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .8)`;
			case 'aqua-1-90-percent':
				return `rgba(${module.exports.Color('aqua-1')}, .9)`;

			case 'aqua-2-10-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .1)`;
			case 'aqua-2-20-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .2)`;
			case 'aqua-2-30-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .3)`;
			case 'aqua-2-40-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .4)`;
			case 'aqua-2-50-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .5)`;
			case 'aqua-2-60-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .6)`;
			case 'aqua-2-70-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .7)`;
			case 'aqua-2-80-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .8)`;
			case 'aqua-2-90-percent':
				return `rgba(${module.exports.Color('aqua-2')}, .9)`;

			case 'aqua-3-10-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .1)`;
			case 'aqua-3-20-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .2)`;
			case 'aqua-3-30-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .3)`;
			case 'aqua-3-40-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .4)`;
			case 'aqua-3-50-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .5)`;
			case 'aqua-3-60-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .6)`;
			case 'aqua-3-70-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .7)`;
			case 'aqua-3-80-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .8)`;
			case 'aqua-3-90-percent':
				return `rgba(${module.exports.Color('aqua-3')}, .9)`;

			case 'aqua-4-10-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .1)`;
			case 'aqua-4-20-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .2)`;
			case 'aqua-4-30-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .3)`;
			case 'aqua-4-40-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .4)`;
			case 'aqua-4-50-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .5)`;
			case 'aqua-4-60-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .6)`;
			case 'aqua-4-70-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .7)`;
			case 'aqua-4-80-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .8)`;
			case 'aqua-4-90-percent':
				return `rgba(${module.exports.Color('aqua-4')}, .9)`;

			case 'aqua-5-10-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .1)`;
			case 'aqua-5-20-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .2)`;
			case 'aqua-5-30-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .3)`;
			case 'aqua-5-40-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .4)`;
			case 'aqua-5-50-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .5)`;
			case 'aqua-5-60-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .6)`;
			case 'aqua-5-70-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .7)`;
			case 'aqua-5-80-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .8)`;
			case 'aqua-5-90-percent':
				return `rgba(${module.exports.Color('aqua-5')}, .9)`;

			case 'aqua-6-10-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .1)`;
			case 'aqua-6-20-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .2)`;
			case 'aqua-6-30-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .3)`;
			case 'aqua-6-40-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .4)`;
			case 'aqua-6-50-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .5)`;
			case 'aqua-6-60-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .6)`;
			case 'aqua-6-70-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .7)`;
			case 'aqua-6-80-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .8)`;
			case 'aqua-6-90-percent':
				return `rgba(${module.exports.Color('aqua-6')}, .9)`;

			case 'aqua-7-10-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .1)`;
			case 'aqua-7-20-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .2)`;
			case 'aqua-7-30-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .3)`;
			case 'aqua-7-40-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .4)`;
			case 'aqua-7-50-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .5)`;
			case 'aqua-7-60-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .6)`;
			case 'aqua-7-70-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .7)`;
			case 'aqua-7-80-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .8)`;
			case 'aqua-7-90-percent':
				return `rgba(${module.exports.Color('aqua-7')}, .9)`;

			case 'aqua-8-10-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .1)`;
			case 'aqua-8-20-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .2)`;
			case 'aqua-8-30-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .3)`;
			case 'aqua-8-40-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .4)`;
			case 'aqua-8-50-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .5)`;
			case 'aqua-8-60-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .6)`;
			case 'aqua-8-70-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .7)`;
			case 'aqua-8-80-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .8)`;
			case 'aqua-8-90-percent':
				return `rgba(${module.exports.Color('aqua-8')}, .9)`;

			case 'aqua-9-10-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .1)`;
			case 'aqua-9-20-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .2)`;
			case 'aqua-9-30-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .3)`;
			case 'aqua-9-40-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .4)`;
			case 'aqua-9-50-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .5)`;
			case 'aqua-9-60-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .6)`;
			case 'aqua-9-70-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .7)`;
			case 'aqua-9-80-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .8)`;
			case 'aqua-9-90-percent':
				return `rgba(${module.exports.Color('aqua-9')}, .9)`;

			case 'aqua-10-10-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .1)`;
			case 'aqua-10-20-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .2)`;
			case 'aqua-10-30-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .3)`;
			case 'aqua-10-40-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .4)`;
			case 'aqua-10-50-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .5)`;
			case 'aqua-10-60-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .6)`;
			case 'aqua-10-70-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .7)`;
			case 'aqua-10-80-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .8)`;
			case 'aqua-10-90-percent':
				return `rgba(${module.exports.Color('aqua-10')}, .9)`;

			// PURPLE

			case 'purple-1-10-percent':
				return `rgba(${module.exports.Color('purple-1')}, .1)`;
			case 'purple-1-20-percent':
				return `rgba(${module.exports.Color('purple-1')}, .2)`;
			case 'purple-1-30-percent':
				return `rgba(${module.exports.Color('purple-1')}, .3)`;
			case 'purple-1-40-percent':
				return `rgba(${module.exports.Color('purple-1')}, .4)`;
			case 'purple-1-50-percent':
				return `rgba(${module.exports.Color('purple-1')}, .5)`;
			case 'purple-1-60-percent':
				return `rgba(${module.exports.Color('purple-1')}, .6)`;
			case 'purple-1-70-percent':
				return `rgba(${module.exports.Color('purple-1')}, .7)`;
			case 'purple-1-80-percent':
				return `rgba(${module.exports.Color('purple-1')}, .8)`;
			case 'purple-1-90-percent':
				return `rgba(${module.exports.Color('purple-1')}, .9)`;

			case 'purple-2-10-percent':
				return `rgba(${module.exports.Color('purple-2')}, .1)`;
			case 'purple-2-20-percent':
				return `rgba(${module.exports.Color('purple-2')}, .2)`;
			case 'purple-2-30-percent':
				return `rgba(${module.exports.Color('purple-2')}, .3)`;
			case 'purple-2-40-percent':
				return `rgba(${module.exports.Color('purple-2')}, .4)`;
			case 'purple-2-50-percent':
				return `rgba(${module.exports.Color('purple-2')}, .5)`;
			case 'purple-2-60-percent':
				return `rgba(${module.exports.Color('purple-2')}, .6)`;
			case 'purple-2-70-percent':
				return `rgba(${module.exports.Color('purple-2')}, .7)`;
			case 'purple-2-80-percent':
				return `rgba(${module.exports.Color('purple-2')}, .8)`;
			case 'purple-2-90-percent':
				return `rgba(${module.exports.Color('purple-2')}, .9)`;

			case 'purple-3-10-percent':
				return `rgba(${module.exports.Color('purple-3')}, .1)`;
			case 'purple-3-20-percent':
				return `rgba(${module.exports.Color('purple-3')}, .2)`;
			case 'purple-3-30-percent':
				return `rgba(${module.exports.Color('purple-3')}, .3)`;
			case 'purple-3-40-percent':
				return `rgba(${module.exports.Color('purple-3')}, .4)`;
			case 'purple-3-50-percent':
				return `rgba(${module.exports.Color('purple-3')}, .5)`;
			case 'purple-3-60-percent':
				return `rgba(${module.exports.Color('purple-3')}, .6)`;
			case 'purple-3-70-percent':
				return `rgba(${module.exports.Color('purple-3')}, .7)`;
			case 'purple-3-80-percent':
				return `rgba(${module.exports.Color('purple-3')}, .8)`;
			case 'purple-3-90-percent':
				return `rgba(${module.exports.Color('purple-3')}, .9)`;

			case 'purple-4-10-percent':
				return `rgba(${module.exports.Color('purple-4')}, .1)`;
			case 'purple-4-20-percent':
				return `rgba(${module.exports.Color('purple-4')}, .2)`;
			case 'purple-4-30-percent':
				return `rgba(${module.exports.Color('purple-4')}, .3)`;
			case 'purple-4-40-percent':
				return `rgba(${module.exports.Color('purple-4')}, .4)`;
			case 'purple-4-50-percent':
				return `rgba(${module.exports.Color('purple-4')}, .5)`;
			case 'purple-4-60-percent':
				return `rgba(${module.exports.Color('purple-4')}, .6)`;
			case 'purple-4-70-percent':
				return `rgba(${module.exports.Color('purple-4')}, .7)`;
			case 'purple-4-80-percent':
				return `rgba(${module.exports.Color('purple-4')}, .8)`;
			case 'purple-4-90-percent':
				return `rgba(${module.exports.Color('purple-4')}, .9)`;

			case 'purple-5-10-percent':
				return `rgba(${module.exports.Color('purple-5')}, .1)`;
			case 'purple-5-20-percent':
				return `rgba(${module.exports.Color('purple-5')}, .2)`;
			case 'purple-5-30-percent':
				return `rgba(${module.exports.Color('purple-5')}, .3)`;
			case 'purple-5-40-percent':
				return `rgba(${module.exports.Color('purple-5')}, .4)`;
			case 'purple-5-50-percent':
				return `rgba(${module.exports.Color('purple-5')}, .5)`;
			case 'purple-5-60-percent':
				return `rgba(${module.exports.Color('purple-5')}, .6)`;
			case 'purple-5-70-percent':
				return `rgba(${module.exports.Color('purple-5')}, .7)`;
			case 'purple-5-80-percent':
				return `rgba(${module.exports.Color('purple-5')}, .8)`;
			case 'purple-5-90-percent':
				return `rgba(${module.exports.Color('purple-5')}, .9)`;

			case 'purple-6-10-percent':
				return `rgba(${module.exports.Color('purple-6')}, .1)`;
			case 'purple-6-20-percent':
				return `rgba(${module.exports.Color('purple-6')}, .2)`;
			case 'purple-6-30-percent':
				return `rgba(${module.exports.Color('purple-6')}, .3)`;
			case 'purple-6-40-percent':
				return `rgba(${module.exports.Color('purple-6')}, .4)`;
			case 'purple-6-50-percent':
				return `rgba(${module.exports.Color('purple-6')}, .5)`;
			case 'purple-6-60-percent':
				return `rgba(${module.exports.Color('purple-6')}, .6)`;
			case 'purple-6-70-percent':
				return `rgba(${module.exports.Color('purple-6')}, .7)`;
			case 'purple-6-80-percent':
				return `rgba(${module.exports.Color('purple-6')}, .8)`;
			case 'purple-6-90-percent':
				return `rgba(${module.exports.Color('purple-6')}, .9)`;

			case 'purple-7-10-percent':
				return `rgba(${module.exports.Color('purple-7')}, .1)`;
			case 'purple-7-20-percent':
				return `rgba(${module.exports.Color('purple-7')}, .2)`;
			case 'purple-7-30-percent':
				return `rgba(${module.exports.Color('purple-7')}, .3)`;
			case 'purple-7-40-percent':
				return `rgba(${module.exports.Color('purple-7')}, .4)`;
			case 'purple-7-50-percent':
				return `rgba(${module.exports.Color('purple-7')}, .5)`;
			case 'purple-7-60-percent':
				return `rgba(${module.exports.Color('purple-7')}, .6)`;
			case 'purple-7-70-percent':
				return `rgba(${module.exports.Color('purple-7')}, .7)`;
			case 'purple-7-80-percent':
				return `rgba(${module.exports.Color('purple-7')}, .8)`;
			case 'purple-7-90-percent':
				return `rgba(${module.exports.Color('purple-7')}, .9)`;

			case 'purple-8-10-percent':
				return `rgba(${module.exports.Color('purple-8')}, .1)`;
			case 'purple-8-20-percent':
				return `rgba(${module.exports.Color('purple-8')}, .2)`;
			case 'purple-8-30-percent':
				return `rgba(${module.exports.Color('purple-8')}, .3)`;
			case 'purple-8-40-percent':
				return `rgba(${module.exports.Color('purple-8')}, .4)`;
			case 'purple-8-50-percent':
				return `rgba(${module.exports.Color('purple-8')}, .5)`;
			case 'purple-8-60-percent':
				return `rgba(${module.exports.Color('purple-8')}, .6)`;
			case 'purple-8-70-percent':
				return `rgba(${module.exports.Color('purple-8')}, .7)`;
			case 'purple-8-80-percent':
				return `rgba(${module.exports.Color('purple-8')}, .8)`;
			case 'purple-8-90-percent':
				return `rgba(${module.exports.Color('purple-8')}, .9)`;

			case 'purple-9-10-percent':
				return `rgba(${module.exports.Color('purple-9')}, .1)`;
			case 'purple-9-20-percent':
				return `rgba(${module.exports.Color('purple-9')}, .2)`;
			case 'purple-9-30-percent':
				return `rgba(${module.exports.Color('purple-9')}, .3)`;
			case 'purple-9-40-percent':
				return `rgba(${module.exports.Color('purple-9')}, .4)`;
			case 'purple-9-50-percent':
				return `rgba(${module.exports.Color('purple-9')}, .5)`;
			case 'purple-9-60-percent':
				return `rgba(${module.exports.Color('purple-9')}, .6)`;
			case 'purple-9-70-percent':
				return `rgba(${module.exports.Color('purple-9')}, .7)`;
			case 'purple-9-80-percent':
				return `rgba(${module.exports.Color('purple-9')}, .8)`;
			case 'purple-9-90-percent':
				return `rgba(${module.exports.Color('purple-9')}, .9)`;

			case 'purple-10-10-percent':
				return `rgba(${module.exports.Color('purple-10')}, .1)`;
			case 'purple-10-20-percent':
				return `rgba(${module.exports.Color('purple-10')}, .2)`;
			case 'purple-10-30-percent':
				return `rgba(${module.exports.Color('purple-10')}, .3)`;
			case 'purple-10-40-percent':
				return `rgba(${module.exports.Color('purple-10')}, .4)`;
			case 'purple-10-50-percent':
				return `rgba(${module.exports.Color('purple-10')}, .5)`;
			case 'purple-10-60-percent':
				return `rgba(${module.exports.Color('purple-10')}, .6)`;
			case 'purple-10-70-percent':
				return `rgba(${module.exports.Color('purple-10')}, .7)`;
			case 'purple-10-80-percent':
				return `rgba(${module.exports.Color('purple-10')}, .8)`;
			case 'purple-10-90-percent':
				return `rgba(${module.exports.Color('purple-10')}, .9)`;





			// CONTEXT COLORS

			/* case 'interactive-default':
				return 'aqua-7';
			case 'interactive-active':
				return 'aqua-8';
			case 'interactive-default-darkened-1':
				return 'aqua-8';
			case 'interactive-active-darkened-1':
				return 'aqua-9';
			case 'interactive-default-darkened-2':
				return 'aqua-9';
			case 'interactive-active-darkened-2':
				return 'aqua-10';
			case 'interactive-light':
				return 'aqua-1';
			case 'interactive-light-active':
				return 'aqua-2';
			case 'text-on-interactive-default':
				return 'white';
			case 'text-on-interactive-active':
				return 'white';
			case 'text-on-interactive-light':
				return 'aqua-7';
			case 'text-on-interactive-light-active':
				return 'aqua-9'; */




			case 'interface1':
				if (darkMode) {
					return module.exports.Color('grey-25');
				}
				return module.exports.Color('white');
			case 'interface2':
				if (darkMode) {
					return module.exports.Color('grey-23');
				}
				return module.exports.Color('grey-01');
			case 'interface3':
				if (darkMode) {
					return module.exports.Color('grey-22');
				}
				return module.exports.Color('grey-02');
			case 'interface4':
				if (darkMode) {
					return module.exports.Color('grey-21');
				}
				return module.exports.Color('grey-04');
			case 'interface5':
				if (darkMode) {
					return module.exports.Color('grey-20');
				}
				return module.exports.Color('grey-05');
			case 'interface6':
				if (darkMode) {
					return module.exports.Color('grey-19');
				}
				return module.exports.Color('grey-06');







			case 'bodyColor':
				return module.exports.Color('interface1', darkMode);

			case 'backgroundColor':
				return module.exports.Color('interface1', !darkMode);

			case 'interactiveDefault':
				if (darkMode) {
					return module.exports.Color('interactive-on-dark-default');
				}
				return module.exports.Color('interactive-on-light-default');
		}
	},


	// TRANSITIONS, ANIMATION

	StandardTransitionTime: () => '.25s',


	// HIDDEN

	BlockHidden: () =>
		`display: block;
		width: 0;
		height: 0;
		padding: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	OverrideBlockHidden: () =>
		`display: block;
		width: auto;
		height: auto;
		text-indent: 0;
		white-space: normal;
		overflow: visible;`,
	InlineHidden: () =>
		`display: inline-block;
		width: 0;
		height: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	TableColumnHidden: () =>
		`display: table-cell;
		width: 0;
		height: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,


	// ALIGNMENT


	VerticalAlignMiddle: () =>
		`position: relative;
		top: 50%;
		transform: translateY(-50%);`,


	// Z-INDEX

	ZIndex: (token) => {
		switch (token) {
		case 'smallNav':
			return 1000;
		default: 'auto';
		}
	},
};
