
// Primary purpose: main content

import styled from 'styled-components';

const MainContainer = styled.main`
	${props => props.screenType === 'small' && `
		margin-bottom: 12rem;
	`}
`;

const AppMainContent = ({ children, title, screenType }) => (
	<MainContainer
		screenType={screenType}
	>
		<h1>{title}</h1>
		{children}
	</MainContainer>
);

export default AppMainContent;
