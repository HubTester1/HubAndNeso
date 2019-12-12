
// Primary purpose: show requested screen

import styled from 'styled-components';
import { connect } from 'react-redux';


const MainContainer = styled.main`
	${props => props.screenType === 'small' && `
		margin-bottom: 12rem;
	`}
`;

const AppMainContent = ({
	screenType, screen, partialScreen, uData, isServerSide, 
}) => (
	<MainContainer
		screenType={screenType}
	>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
		<p>Why, hello there, beautiful.</p>
	</MainContainer>
);

export default connect(state => state)(AppMainContent);
