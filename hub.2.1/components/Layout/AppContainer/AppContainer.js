
// ----- IMPORTS

import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import StylePatterns from '../../../services/StylePatterns';
import { createGlobalStyle } from 'styled-components';
import ScreenSizes from '../../../services/ScreenSizes';
import AppGrid from '../AppGrid/AppGrid';

const GlobalStyle = createGlobalStyle`
	@import url('https://use.typekit.net/sul5jci.css');
	* { box-sizing: border-box; }
	html {
		${StylePatterns.FontFamily()}
		font-size: 10px;
		text-align: center;
	}
	@supports (font-variation-settings: normal) {
		html {
			font-family: ${StylePatterns.FontFamily()};
		}
	}
	body {
		font-weight: ${StylePatterns.FontWeight('light')};
		margin: 0;
		background-color: ${props => (StylePatterns.Color('backgroundColor', props.colorMode))};
		color: ${props => (StylePatterns.Color('bodyColor', props.colorMode))};
		text-align: left;
	}
	@media screen and (-webkit-min-device-pixel-ratio:0) {
		@font-face {
			font-family: "LineAwesome";
			src: url("../fonts/line-awesome.svg?v=1.1.#fa") format("svg");
		}
	}
	.transition-entering {
		animation-name: entering-animation;
		animation-duration: .5s;
	}
	@keyframes entering-animation {
		0%		{opacity: 0;}
		100%	{opacity: 1;}
	}
	h1 {
		font-weight: ${StylePatterns.FontWeight('semi-bold')};
		margin: 1rem 0 .25rem;
	}
	h2 {
		font-weight: ${StylePatterns.FontWeight('semi-bold')};
		margin: 1rem 0 .25rem;
	}
	h3 {
		font-weight: ${StylePatterns.FontWeight('semi-bold')};
		margin: 1rem 0 .25rem;
	}
	h4 {
		font-weight: ${StylePatterns.FontWeight('medium')};
		margin: 1rem 0 .25rem;
	}
	h5 {
		font-weight: ${StylePatterns.FontWeight('medium')};
		margin: .5rem 0 .25rem;
	}
	h6 {
		font-weight: ${StylePatterns.FontWeight('regular')};
		font-style:  italic;
		margin: .5rem 0 .25rem;
	}
	p, ul, ol {
		margin: 0 0 2rem 0;
		padding: 0;
	}
	ul ul,
	ol ol {
		margin: 0;
		padding: 0;
	}
	ul li,
	ol li {
		list-style-position: outside;
		vertical-align: text-top;
		margin: 0 0 .25rem 1.8rem;
	}
	ul li {
		list-style-type: square;
		list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIElEQVQoU2NkIAAY09LS/qOrmTVrFiNMbFAoIOgLQgoAA4QUCSjONAIAAAAASUVORK5CYII=');
	}
	ul ul li {
		list-style-type: disc;
		list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAATElEQVQoU2NkIAAYQfIzZ878f//+fQZFRUWG9PR0sBgMMIIkz549CxcwNjZGUcRYUVHx/927d3AFQkJCDB0dHXBTCJtA0A1E+QKfIgBQeyMJtPI08AAAAABJRU5ErkJggg==');
	}
	a,
	a:visited {
		text-decoration: none;
		color: ${props => (StylePatterns.Color('interactiveDefault', props.colorMode))};
		transition: color .25s;
		border-bottom: .1rem dotted ${StylePatterns.Color('interactive-on-dark-default')};

		&:hover,
		&:active {
			color: ${StylePatterns.Color('interactive-on-dark-active')};
			border-bottom: .1rem dotted ${StylePatterns.Color('interactive-on-dark-active')};
		}
	}
	em {
		color: ${StylePatterns.Color('blue-12')};
		font-style: normal;
	}
	b {
		font-weight: ${StylePatterns.FontWeight('bold')};
	}
	${({ screenType }) => screenType === 'small' && `
		body {
			font-size: ${StylePatterns.FontSize('m', 'small')};
		}
		h1 {
			font-size: ${StylePatterns.FontSize('xxxl', 'small')};
		}
		h2 {
			font-size: ${StylePatterns.FontSize('xxl', 'small')};
		}
		h3 {
			font-size: ${StylePatterns.FontSize('xl', 'small')};
		}
		h4 {
			font-size: ${StylePatterns.FontSize('l', 'small')};
		}
		h5 {
			font-size: ${StylePatterns.FontSize('m', 'small')};
		}
		h6 {
			font-size: ${StylePatterns.FontSize('m', 'small')};
		}
	`}
	${({ screenType }) => screenType === 'medium' && `
		body {
			font-size: ${StylePatterns.FontSize('m', 'medium')};
		}
		h1 {
			font-size: ${StylePatterns.FontSize('xxxl', 'medium')};
		}
		h2 {
			font-size: ${StylePatterns.FontSize('xxl', 'medium')};
		}
		h3 {
			font-size: ${StylePatterns.FontSize('xl', 'medium')};
		}
		h4 {
			font-size: ${StylePatterns.FontSize('l', 'medium')};
		}
		h5 {
			font-size: ${StylePatterns.FontSize('m', 'medium')};
		}
		h6 {
			font-size: ${StylePatterns.FontSize('m', 'medium')};
		}
	`}
	${({ screenType }) => screenType === 'large' && `
		body {
			font-size: ${StylePatterns.FontSize('m', 'large')};
		}
		h1 {
			font-size: ${StylePatterns.FontSize('xxxl', 'large')};
		}
		h2 {
			font-size: ${StylePatterns.FontSize('xxl', 'large')};
		}
		h3 {
			font-size: ${StylePatterns.FontSize('xl', 'large')};
		}
		h4 {
			font-size: ${StylePatterns.FontSize('l', 'large')};
		}
		h5 {
			font-size: ${StylePatterns.FontSize('m', 'large')};
		}
		h6 {
			font-size: ${StylePatterns.FontSize('m', 'large')};
		}
	`}
	div.sticky-outer-wrapper.active div.sticky-inner-wrapper {
		z-index: ${StylePatterns.ZIndex('smallNav')};
	}
`;
const AppContainer = (props) => {
	// if (props.initStatesReady.length === props.initStatesToReadyQuantity && !props.stateError) {
		return (
			<div id="app-container">
				<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
					<GlobalStyle
						screenType="small"
						// colorMode={props.uData.preferences.colorMode}

					/>
					<AppGrid
						screenType="small"
						title={props.title}
						content={props.children}
					/>
				</MediaQuery>
				<MediaQuery
					minWidth={ScreenSizes.ReturnMediumMin()}
					maxWidth={ScreenSizes.ReturnMediumMax()}
				>
					<GlobalStyle
						screenType="medium"
						// colorMode={props.uData.preferences.colorMode}

					/>
					<AppGrid
						screenType="medium"
						title={props.title}
						content={props.children}
					/>
				</MediaQuery>
				<MediaQuery minWidth={ScreenSizes.ReturnLargeMin()}>
					<GlobalStyle
						screenType="large"
						// colorMode={props.uData.preferences.colorMode}

					/>
					<AppGrid
						screenType="large"
						title={props.title}
						content={props.children}
					/>
				</MediaQuery>
			</div>
		);
	// }
};
const ConnectedAppContainer = connect((state) => {
	return state;
})(AppContainer);

export default ConnectedAppContainer;
