/* eslint-disable  react/react-in-jsx-scope */

import styled from 'styled-components';
import StylePatterns from '../../services/StylePatterns';

const MainContainer = styled.main`
	margin-left: ${props => (props.screenType === 'large' ?
		'20rem' : '0')};
	padding-top: ${props => (props.screenType === 'large' ?
		'5rem' : '0')};
`;

const AppMainContent = ({ children, title, screenType }) => (
	<MainContainer
		screenType={screenType}
	>
		{
			screenType === 'large' &&

			<div>
				<h1>{title}</h1>
				{children}
			</div>
		}
	</MainContainer>
);

export default AppMainContent;
