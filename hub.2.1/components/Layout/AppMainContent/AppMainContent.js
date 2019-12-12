
// Primary purpose: show requested screen

import styled from 'styled-components';
import { connect } from 'react-redux';


const MainContainer = styled.main`
	${props => props.screenType === 'small' && `
		margin-bottom: 12rem;
	`}
`;

const AppMainContent = ({ screenType, sData }) => (
	<MainContainer
		screenType={screenType}
	>
		{
			sData.s === 'home' &&

			<p>Home screen.</p>
		}
		{
			sData.s === 'messages' &&

			<p>Messages screen.</p>
		}
	</MainContainer>
);

export default connect(state => state)(AppMainContent);
