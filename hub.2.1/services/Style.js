/* eslint-disable indent */

module.exports = {
	
	// FONT

	FontFamily: () =>
		'font-family: \'akzidenz-grotesk-pro\', -apple-system, BlinkMacSystemFont,\'Roboto\', \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, \'Liberation Sans\', Arial, \'Lucida Grande\', sans-serif;',


	// for large screens
	// augmented fourth scale above 1
	// minor third scale below 1
	FontSize: (token, screenSize) => {
		if (token === 'base') {
			return 1.8;
		} else if (screenSize !== 'small') {
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
			default:
				return 'auto';
		}
	},

	/* Elevation: (distanceFromBase, distanceFromPreviousLayer, darkMode) => {
		const overlayColor = module.exports.Color('ux-overlay', darkMode, 0.05);
		const overlayColorAlpha = module.exports.Color('ux-overlay', darkMode, 0.05);
		const baseColor = module.exports.Color('ux-base', darkMode);
		return `linear-gradient(to right, ${overlayColor}, ${overlayColor}),
							linear-gradient(to right, ${baseColor}, ${baseColor})`;
	}, */

	// SHADOWS
	/* offset-x | offset-y | blur-radius | spread-radius | color */
	Shadow: (shadowToken) => {
		switch (shadowToken) {
			case 'ux-l-1':
				return `0 0.4px .9px rgba(0, 0, 0, 0.13),
						0 0.8px .22px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-2':
				return `0 0.8px 1.8px rgba(0, 0, 0, 0.13),
						0 0.15px .45px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-3':
				return `0 1.2px 2.7px rgba(0, 0, 0, 0.13),
						0 .22px .68px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-4':
				return `0 1.6px 5.4px rgba(0, 0, 0, 0.13),
						0 .3px .9px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-6':
				return `0 2.4px 5.4px rgba(0, 0, 0, 0.13),
						0 0.45px 1.35px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-8':
			default:
				return `0 3.2px 7.2px rgba(0, 0, 0, 0.13),
						0 0.6px 1.8px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-9':
				return `0 3.6px 8.1px rgba(0, 0, 0, 0.13),
						0 0.68px 2.03px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-12':
				return `0 4.8px 10.8px rgba(0, 0, 0, 0.13),
						0 0.9px 2.7px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-16':
				return `0 6.4px 14.4px rgba(0, 0, 0, 0.13),
						0 1.2px 3.6px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-24':
				return `0 9.6px 21.6px rgba(0, 0, 0, 0.13),
						0 1.8px 5.4px rgba(0, 0, 0, 0.11)`;
			case 'ux-l-32':
				return `0 12.8px 28.8px rgba(0, 0, 0, 0.22),
						0 2.4px 7.2px rgba(0, 0, 0, 0.18)`;
			case 'ux-l-40':
				return `0 16px 36px rgba(0, 0, 0, 0.22),
						0 3px 9px rgba(0, 0, 0, 0.18)`;
			case 'ux-l-48':
				return `0 19.2px 43.2px rgba(0, 0, 0, 0.22),
						0 3.8px 10.8px rgba(0, 0, 0, 0.18)`;
			case 'ux-l-64':
				return `0 25.6px 57.6px rgba(0, 0, 0, 0.22),
						0 4.8px 14.4px rgba(0, 0, 0, 0.18)`;
			case 'ux-l-80':
				return `0 32px 72px rgba(0, 0, 0, 0.22),
						0 6px 18px rgba(0, 0, 0, 0.18)`;
			case 'ux-l-96':
				return `0 38.4px 86.4px rgba(0, 0, 0, 0.22),
						0 7.2px 21.6px rgba(0, 0, 0, 0.18)`;
			case 'ux-l-192':
				return `0 76.8px 172.8px rgba(0, 0, 0, 0.13),
						0 14.4px 43.2px rgba(0, 0, 0, 0.11)`;
		}
	},

	// COLORS

	Color: (colorToken, darkMode, alpha) => {
		if (colorToken.substring(0, 3) === 'ux-') {
			return module.exports.ColorUXStatement(colorToken, darkMode);
		} else if (alpha) {
			return `rgba(${module.exports.ColorRGBValue(colorToken, darkMode)},${alpha})`;
		} 
		return `rgb(${module.exports.ColorRGBValue(colorToken, darkMode)})`;
	},

	ColorUXStatement: (colorToken, darkMode) => {
		switch (colorToken) {
			// base, elevations, text
			case 'ux-base':
				if (darkMode) {
					return module.exports.Color('grey-26');
				}
				return module.exports.Color('grey-05');
			/* case 'ux-overlay':
				if (darkMode) {
					return module.exports.Color('white');
				}
				return module.exports.Color('black'); */
			case 'ux-l-1': // 1 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.05);
				} */
				return module.exports.Color('white', null, 0.05);
			case 'ux-l-2': // 2 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.07);
				} */
				return module.exports.Color('white', null, 0.07);
			case 'ux-l-3': // 3 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.08);
				} */
				return module.exports.Color('white', null, 0.08);
			case 'ux-l-4': // 4 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.09);
				} */
				return module.exports.Color('white', null, 0.09);
			case 'ux-l-5': // 6 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.11);
				} */
				return module.exports.Color('white', null, 0.11);
			case 'ux-l-6': // 8 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.12);
				} */
				return module.exports.Color('white', null, 0.12);
			case 'ux-l-7': // 12 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.14);
				} */
				return module.exports.Color('white', null, 0.14);
			case 'ux-l-8': // 16 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.15);
				} */
				return module.exports.Color('white', null, 0.15);
			case 'ux-l-9': // 24 dp
				/* if (darkMode) {
					return module.exports.Color('white', null, 0.16);
				} */
				return module.exports.Color('white', null, 0.16);

			case 'ux-base-text':
				if (darkMode) {
					return module.exports.Color('white');
				}
				return module.exports.Color('grey-26');

			// selected hues

			case 'ux-pink':
				if (darkMode) {
					return module.exports.Color('pink-4');
				}
				return module.exports.Color('pink-7');
			case 'ux-orange':
				if (darkMode) {
					return module.exports.Color('orange-4');
				}
				return module.exports.Color('orange-2');
			case 'ux-yellow':
				if (darkMode) {
					return module.exports.Color('yellow-4');
				}
				return module.exports.Color('yellow-2');
			case 'ux-teal':
				if (darkMode) {
					return module.exports.Color('teal-4');
				}
				return module.exports.Color('teal-2');
			case 'ux-green':
				if (darkMode) {
					return module.exports.Color('green-4');
				}
				return module.exports.Color('green-7');
			case 'ux-blue':
				if (darkMode) {
					return module.exports.Color('blue-4');
				}
				return module.exports.Color('blue-7');
			case 'ux-aqua':
				if (darkMode) {
					return module.exports.Color('aqua-4');
				}
				return module.exports.Color('aqua-7');
			case 'ux-purple':
				if (darkMode) {
					return module.exports.Color('purple-4');
				}
				return module.exports.Color('purple-7');

			// special cases

			case 'ux-interactive-default':
				if (darkMode) {
					return module.exports.Color('pink-4');
				}
				return module.exports.Color('pink-7');
			case 'ux-interactive-active':
				if (darkMode) {
					return module.exports.Color('pink-4');
				}
				return module.exports.Color('pink-8');
			case 'ux-error':
				if (darkMode) {
					return module.exports.Color('pink-4');
				}
				return module.exports.Color('pink-8');
		
			default:
				return '';
		}
	},

	ColorRGBValue: (token, darkMode) => {
		switch (token) {
			default:
			case 'black':
				return '0,0,0';
			case 'white':
				return '255,255,255';
			case 'grey-01':
				return '249,249,249';
			case 'grey-02':
				return '242,242,242';
			case 'grey-03':
				return '238,238,238';
			case 'grey-04':
				return '236,236,236';
			case 'grey-05':
				return '230,230,230';
			case 'grey-06':
				return '225,225,225';
			case 'grey-07':
				return '221,221,221';
			case 'grey-08':
				return '212,212,212';
			case 'grey-09':
				return '204,204,204';
			case 'grey-10':
				return '195,195,195';
			case 'grey-11':
				return '187,187,187';
			case 'grey-12':
				return '178,178,178';
			case 'grey-13':
				return '170,170,170';
			case 'grey-14':
				return '153,153,153';
			case 'grey-15':
				return '136,136,136';
			case 'grey-16':
				return '119,119,119';
			case 'grey-17':
				return '102,102,102';
			case 'grey-18':
				return '85,85,85';
			case 'grey-19':
				return '68,68,68';
			case 'grey-20':
				return '58,58,58';
			case 'grey-21':
				return '51,51,51';
			case 'grey-22':
				return '45,45,45';
			case 'grey-23':
				return '36,36,36';
			case 'grey-24':
				return '33,33,33';
			case 'grey-25':
				return '31,31,31';
			case 'grey-26':
				return '18,18,18';

			// --- PRIMARY

			case 'primary-red':
				return '218,41,28';
			case 'primary-blue':
				return '105,179,231';
			case 'primary-pink':
				return '218,24,132';
			case 'primary-green':
				return '73,197,177';
			case 'primary-yellow':
				return '254,221,0';

			// --- BOLD

			case 'bold-purple':
				return '73,12,102';
			case 'bold-green':
				return '3,68,54';
			case 'bold-maroon':
				return '121,35,46';
			case 'bold-orange':
				return '226,67,1';
			case 'bold-pink':
				return '166,0,99';

			// --- SUBTLE

			case 'subtle-yellow':
				return '242,234,154';
			case 'subtle-orange':
				return '255,201,153';
			case 'subtle-coral':
				return '255,180,170';
			case 'subtle-pink':
				return '229,197,211';
			case 'subtle-green':
				return '198,242,239';
			case 'subtle-blue':
				return '148,192,233';

			// --- PINK

			case 'pink-1':
				return '243,229,235';
			case 'pink-2':
				return module.exports.ColorRGBValue('subtle-pink');
			case 'pink-3':
				return '226,153,191';
			case 'pink-4':
				return '223,110,171';
			case 'pink-5':
				return '220,67,151';
			case 'pink-6':
				return module.exports.ColorRGBValue('primary-pink');
			case 'pink-7':
				return module.exports.ColorRGBValue('bold-pink');
			case 'pink-8':
				return '132,8,82';
			case 'pink-9':
				return '98,17,65';
			case 'pink-10':
				return '64,26,49';

			// --- PURPLE

			case 'purple-1':
				return '241,232,245';
			case 'purple-2':
				return '228,211,237';
			case 'purple-3':
				return '209,182,224';
			case 'purple-4':
				return '187,149,209';
			case 'purple-5':
				return '169,122,198';
			case 'purple-6':
				return '145,94,174';
			case 'purple-7':
				return '121,67,150';
			case 'purple-8':
				return '97,39,126';
			case 'purple-9':
				return module.exports.ColorRGBValue('bold-purple');
			case 'purple-10':
				return '44,0,64';

			// --- BLUES

			case 'blue-1':
				return '222,235,247';
			case 'blue-2':
				return '185,213,240';
			case 'blue-5':
				return '84,152,202';
			case 'blue-6':
				return '63,126,173';
			case 'blue-7':
				return '42,99,144';
			case 'blue-8':
				return '21,73,115';
			case 'blue-10':
				return '0,32,59';

			// --- AQUA

			case 'aqua-0':
				return '229,249,255';
			case 'aqua-1':
				return '209,238,247';
			case 'aqua-2':
				return '167,213,228';
			case 'aqua-3':
				return '125,188,209';
			case 'aqua-4':
				return '83,163,190';
			case 'aqua-5':
				return '41,138,171';
			case 'aqua-6':
				return module.exports.ColorRGBValue('bold-aqua');
			case 'aqua-7':
				return '0,95,127';
			case 'aqua-8':
				return '0,77,102';
			case 'aqua-9':
				return '0,58,77';
			case 'aqua-10':
				return '1,40,53';

			// --- TEAL

			case 'teal-1':
				return '213,243,243';
			case 'teal-2':
				return '184,218,218';
			case 'teal-3':
				return '155,194,194';
			case 'teal-4':
				return '127,169,170';
			case 'teal-5':
				return '98,145,146';
			case 'teal-6':
				return module.exports.ColorRGBValue('bold-teal');
			case 'teal-7':
				return '52,103,104';
			case 'teal-8':
				return '35,86,87';
			case 'teal-9':
				return '18,69,70';
			case 'teal-10':
				return '1,52,53';

			// --- GREEN

			case 'green-1':
				return module.exports.ColorRGBValue('subtle-green');
			case 'green-2':
				return '166,230,219';
			case 'green-3':
				return '135,219,205';
			case 'green-4':
				return '104,208,191';
			case 'green-5':
				return module.exports.ColorRGBValue('primary-green');
			case 'green-6':
				return '55,164,146';
			case 'green-7':
				return '38,132,115';
			case 'green-8':
				return '20,100,84';
			case 'green-9':
				return module.exports.ColorRGBValue('bold-green');
			case 'green-10':
				return '3,51,40';

			// --- YELLOW

			case 'yellow-1':
				return module.exports.ColorRGBValue('subtle-yellow');
			case 'yellow-2':
				return '245,230,79';
			case 'yellow-3':
				return module.exports.ColorRGBValue('primary-yellow');
			case 'yellow-4':
				return '237,196,20';
			case 'yellow-5':
				return '227,188,19';
			case 'yellow-10':
				return '69,56,0';

			// --- ORANGE

			case 'orange-1':
				return '249,233,219';
			case 'orange-2':
				return '252,217,186';
			case 'orange-3':
				return module.exports.ColorRGBValue('subtle-orange');
			case 'orange-4':
				return '245,156,102';
			case 'orange-5':
				return '235,111,51';
			case 'orange-6':
				return module.exports.ColorRGBValue('bold-orange');

			// --- CORAL

			case 'coral-1':
				return '247,228,226';
			case 'coral-2':
				return '251,204,198';
			case 'coral-3':
				return module.exports.ColorRGBValue('subtle-coral');
			case 'coral-4':
				return '255,149,139';
			case 'coral-5':
				return '252,116,106';
		}
	},
};
