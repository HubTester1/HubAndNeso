
module.exports = {

	
	// FONT

	FontSize: (token) => {
		switch (token) {
		case 'xxxl':
			return `${1.8 * 2.441}rem`;
		case 'xxl':
			return `${1.8 * 1.728}rem`;
		case 'xl':
			return `${1.8 * 1.44}rem`;
		case 'l':
			return `${1.8 * 1.2}rem`;
		case 'm':
		default:
			return `${1.8 * 1}rem`;
		case 's':
			return `${1.8 * 0.833}rem`;
		case 'xs':
			return `${1.8 * 0.694}rem`;
		case 'xxs':
			return `${1.8 * 0.579}rem`;
		}
	},

	FontWeight: (token) => {
		switch (token) {
		default:
		case 'normal':
			return '400';
		case 'bold':
			return '900';
		}
	},

	FontStyle: (token) => {
		switch (token) {
		default:
		case 'normal':
			return 'normal';
		case 'bold':
			return 'italic';
		}
	},

	
	// COLORS

	Color: (token) => {
		switch (token) {
		case 'yellow':
			return '#fbbd4e';
		default:
		case 'blue1':
			return '#081015';
		case 'blue2':
			return '#0b171e';
		case 'blue3':
			return '#102029';
		case 'blue4':
			return '#18303d';
		case 'blue5':
			return '#234659';
		case 'red1':
			return '#470006';
		case 'red2':
			return '#5d0007';
		case 'red3':
			return '#8a0009';
		case 'red4':
			return '#a3000b';
		case 'red5':
			return '#bd000d';
		case 'grey1':
			return '#eee';
		case 'grey2':
			return '#e6e6e6';
		case 'grey3':
			return '#ddd';
		case 'grey4':
			return '#d4d4d4';
		case 'grey5':
			return '#ccc';
		case 'grey6':
			return '#c3c3c3';
		case 'grey7':
			return '#bbb';
		case 'grey8':
			return '#b2b2b2';
		case 'grey9':
			return '#aaa';
		case 'grey10':
			return '#999';
		case 'grey11':
			return '#888';
		case 'grey12':
			return '#777';
		case 'grey13':
			return '#666';
		case 'grey14':
			return '#555';
		case 'grey15':
			return '#444';
		case 'grey16':
			return '#333';
		case 'grey17':
			return '#222';
		case 'grey18':
			return '#111';
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
	VerticalAlignMiddle: () =>
		`position: relative;
		top: 50%;
		transform: translateY(-50%);`,
};
