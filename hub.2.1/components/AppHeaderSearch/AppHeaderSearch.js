/* eslint-disable  react/react-in-jsx-scope */

import styled from 'styled-components';
import StylePatterns from '../../services/StylePatterns';


const HeaderLarge = styled.div`
	position: fixed;
	left: 20rem;
	height: 5rem;
	width: 100%;
	z-index: 999;
	overflow-y: auto;
	background-color: #222;
`;

const AppHeaderSearch = props => (
	<header>
		{
			props.screenType === 'large' &&

			<HeaderLarge>
				<input type="text" />
			</HeaderLarge>
		}
	</header>
);

export default AppHeaderSearch;
