
// Primary purpose: compute and inject global styles, get screen type, call Grid

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
		background-color: ${props => (Style.Color('ux-base', props.darkMode))};
		color: ${props => (Style.Color('ux-base-text', props.darkMode))};
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
		color: ${props => (Style.Color('ux-interactive-default', props.darkMode))};
		transition: color .25s;
		border-bottom: .1rem dotted ${props => (Style.Color('ux-interactive-default', props.darkMode))};

		&:hover,
		&:active {
			color: ${props => (Style.Color('interactive-active', props.darkMode))};
			border-bottom: .1rem dotted ${props => (Style.Color('interactive-active', props.darkMode))};
		}
	}
	em {
		font-style: italic;
	}
	b {
		font-weight: ${Style.FontWeight('bold')};
	}
	${({ screenSize }) => screenSize === 'small' && `
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
	${({ screenSize }) => screenSize === 'medium' && `
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
	${({ screenSize }) => screenSize === 'large' && `
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


const useWindowSize = (dispatch, sData) => {
	// eslint-disable-next-line no-undef
	React.useEffect(() => {
		const updateSize = () => {
			let screenSize = 'medium';
			const sDataCopy = JSON.parse(JSON.stringify(sData));
			if (window.matchMedia(`(max-width: ${Screen.ReturnSmallMax()}px)`).matches) {
				screenSize = 'small';
			} else if (window.matchMedia(`(min-width: ${Screen.ReturnLargeMin()}px)`).matches) {
				screenSize = 'large';
			}
			sDataCopy.size = screenSize;
			dispatch({
				type: 'SET_SCREEN_DATA',
				sData: sDataCopy,
			});
		};
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
};

const AppContainer = ({ uData, sData, dispatch }) => {
	useWindowSize(dispatch, sData);
	return (
		<div id="app-container">
			<GlobalStyle
				screenSize={sData.size}
				darkMode={uData.user.preferences.darkMode}
			/>
			<Grid screenSize={sData.size} />
		</div>
	); 
};

export default connect(state => state)(AppContainer);
