
// Primary purpose: compute and inject global styles, get screen type, call Grid

import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import Style from '../../services/Style';
import Screen from '../../services/Screen';
import Grid from './Grid';

const GlobalStyle = createGlobalStyle`
	@import url('https://use.typekit.net/sul5jci.css');
	* { box-sizing: border-box; }
	html {
		${Style.FontFamily()}
		font-size: 10px;
		text-align: center;
	}
	body {
		font-weight: ${Style.FontWeight('light')};
		margin: 0;
		background-color: ${props => (Style.Color('backgroundColor', props.colorMode))};
		color: ${props => (Style.Color('bodyColor', props.colorMode))};
		text-align: left;
	}
	h1 {
		font-weight: ${Style.FontWeight('bold')};
		margin: 1rem 0 .25rem;
	}
	h2 {
		font-weight: ${Style.FontWeight('bold')};
		margin: 1rem 0 .25rem;
	}
	h3 {
		font-weight: ${Style.FontWeight('bold')};
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
		border-bottom: .1rem dotted ${props => (Style.Color('interactiveDefault', props.colorMode))};

		&:hover,
		&:active {
			color: ${props => (Style.Color('interactiveActive', props.colorMode))};
			border-bottom: .1rem dotted ${props => (Style.Color('interactiveActive', props.colorMode))};
		}
	}
	em {
		font-style: italic;
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
`;


/* 	div.sticky-outer-wrapper.active div.sticky-inner-wrapper {
		z-index: ${Style.ZIndex('smallNav')};
	} */

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
