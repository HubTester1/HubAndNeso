
// Primary purpose: search and h1 and partial screen tabs header

import { connect } from 'react-redux';
import styled from 'styled-components';
import Sticky from 'react-sticky-el';
import Utilities from '../../../services/Utilities';


const Header = styled.header`
	height: 5rem;
	z-index: 999;
	background-color: ${props => (props.stuck ? '#322' : '#411')};
`;

const Wrapper = styled.div`
	background-color: #000;
`;

const AppHeaderSearchTitleSecondaryNav = ({ hData, sData, dispatch }) => (
	<Sticky
		onFixedToggle={(free) => {
			dispatch({
				type: 'SET_HEADER_STUCK',
				headerStuck: !free,
			});
		}}
		wrapperCmp="div"
	>
		<Wrapper>
			<Header
				stuck={hData.headerStuck}
			>
				<input type="text" />

				{
					hData.headerStuck &&

				<p>This is stuck.</p>
				}
				{
					!hData.headerStuck &&

				<p>This is NOT stuck.</p>
				}
			</Header>
			<h1>{sData.screens[Utilities.ReturnStringWithInitialCapital(sData.s)].title}</h1>
			{/* <p>sData.screens[Utilities.ReturnStringWithInitialCapital(sData.s)].title}</p> */}
		</Wrapper>
	</Sticky>
);

export default connect(state => state)(AppHeaderSearchTitleSecondaryNav);
