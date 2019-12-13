
// Primary purpose: compute and inject global styles, get screen type, call Grid

import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import Style from '../../services/Style';
import Screen from '../../services/Screen';
import Grid from './Grid';

import LineAwesomeEOT from '../Ingredients/Fonts/line-awesome.eot';
import LineAwesomeTTF from '../Ingredients/Fonts/line-awesome.ttf';
import LineAwesomeWOFF from '../Ingredients/Fonts/line-awesome.woff';
import LineAwesomeWOFF2 from '../Ingredients/Fonts/line-awesome.woff2';
import LineAwesomeSVG from '../Ingredients/Fonts/line-awesome.svg';

const GlobalStyle = createGlobalStyle`
	@import url('https://use.typekit.net/sul5jci.css');
	* { box-sizing: border-box; }
	html {
		${Style.FontFamily()}
		font-size: 10px;
		text-align: center;
	}
	@supports (font-variation-settings: normal) {
		html {
			font-family: ${Style.FontFamily()};
		}
	}
	body {
		font-weight: ${Style.FontWeight('light')};
		margin: 0;
		background-color: ${props => (Style.Color('backgroundColor', props.colorMode))};
		color: ${props => (Style.Color('bodyColor', props.colorMode))};
		text-align: left;
	}
	@font-face {
		font-family: 'LineAwesome';
		src: url(${LineAwesomeEOT});
		src: url(${LineAwesomeEOT}) format("embedded-opentype"),
			url(${LineAwesomeWOFF2}) format("woff2"),
			url(${LineAwesomeWOFF}) format("woff"),
			url(${LineAwesomeTTF}) format("truetype"),
			url(${LineAwesomeSVG}) format("svg");
		font-weight: normal;
		font-style: normal;
	}
	@media screen and (-webkit-min-device-pixel-ratio:0) {
		@font-face {
			font-family: "LineAwesome";
			src: url("../Ingredients/Fonts/line-awesome.svg?v=1.1.#fa") format("svg");
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
		font-weight: ${Style.FontWeight('semi-bold')};
		margin: 1rem 0 .25rem;
	}
	h2 {
		font-weight: ${Style.FontWeight('semi-bold')};
		margin: 1rem 0 .25rem;
	}
	h3 {
		font-weight: ${Style.FontWeight('semi-bold')};
		margin: 1rem 0 .25rem;
	}
	h4 {
		font-weight: ${Style.FontWeight('medium')};
		margin: 1rem 0 .25rem;
	}
	h5 {
		font-weight: ${Style.FontWeight('medium')};
		margin: .5rem 0 .25rem;
	}
	h6 {
		font-weight: ${Style.FontWeight('regular')};
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
		color: ${props => (Style.Color('interactiveDefault', props.colorMode))};
		transition: color .25s;
		border-bottom: .1rem dotted ${Style.Color('interactive-on-dark-default')};

		&:hover,
		&:active {
			color: ${Style.Color('interactive-on-dark-active')};
			border-bottom: .1rem dotted ${Style.Color('interactive-on-dark-active')};
		}
	}
	em {
		color: ${Style.Color('blue-12')};
		font-style: normal;
	}
	b {
		font-weight: ${Style.FontWeight('bold')};
	}
	${({ screenType }) => screenType === 'small' && `
		body {
			font-size: ${Style.FontSize('m', 'small')};
		}
		h1 {
			font-size: ${Style.FontSize('xxxl', 'small')};
		}
		h2 {
			font-size: ${Style.FontSize('xxl', 'small')};
		}
		h3 {
			font-size: ${Style.FontSize('xl', 'small')};
		}
		h4 {
			font-size: ${Style.FontSize('l', 'small')};
		}
		h5 {
			font-size: ${Style.FontSize('m', 'small')};
		}
		h6 {
			font-size: ${Style.FontSize('m', 'small')};
		}
	`}
	${({ screenType }) => screenType === 'medium' && `
		body {
			font-size: ${Style.FontSize('m', 'medium')};
		}
		h1 {
			font-size: ${Style.FontSize('xxxl', 'medium')};
		}
		h2 {
			font-size: ${Style.FontSize('xxl', 'medium')};
		}
		h3 {
			font-size: ${Style.FontSize('xl', 'medium')};
		}
		h4 {
			font-size: ${Style.FontSize('l', 'medium')};
		}
		h5 {
			font-size: ${Style.FontSize('m', 'medium')};
		}
		h6 {
			font-size: ${Style.FontSize('m', 'medium')};
		}
	`}
	${({ screenType }) => screenType === 'large' && `
		body {
			font-size: ${Style.FontSize('m', 'large')};
		}
		h1 {
			font-size: ${Style.FontSize('xxxl', 'large')};
		}
		h2 {
			font-size: ${Style.FontSize('xxl', 'large')};
		}
		h3 {
			font-size: ${Style.FontSize('xl', 'large')};
		}
		h4 {
			font-size: ${Style.FontSize('l', 'large')};
		}
		h5 {
			font-size: ${Style.FontSize('m', 'large')};
		}
		h6 {
			font-size: ${Style.FontSize('m', 'large')};
		}
	`}
	div.sticky-outer-wrapper.active div.sticky-inner-wrapper {
		z-index: ${Style.ZIndex('smallNav')};
	}
`;
const AppContainer = props => (
	<div id="app-container">
		<MediaQuery maxWidth={Screen.ReturnSmallMax()}>
			<GlobalStyle
				screenType="small"
				colorMode={props.uData.user.preferences.colorMode}
			/>
			<Grid screenType="small" />
		</MediaQuery>
		<MediaQuery
			minWidth={Screen.ReturnMediumMin()}
			maxWidth={Screen.ReturnMediumMax()}
		>
			<GlobalStyle
				screenType="medium"
				colorMode={props.uData.user.preferences.colorMode}
			/>
			<Grid screenType="medium" />
		</MediaQuery>
		<MediaQuery minWidth={Screen.ReturnLargeMin()}>
			<GlobalStyle
				screenType="large"
				colorMode={props.uData.user.preferences.colorMode}
			/>
			<Grid screenType="large" />
		</MediaQuery>
	</div>
);

export default connect(state => state)(AppContainer);
