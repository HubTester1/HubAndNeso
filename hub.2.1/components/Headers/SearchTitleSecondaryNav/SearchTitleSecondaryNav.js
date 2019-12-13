
// Primary purpose: search and h1 and partial screen tabs (secondary nav) header

import { connect } from 'react-redux';
import styled from 'styled-components';
import Sticky from 'react-sticky-el';
import Style from '../../../services/Style';

const Header = styled.header`
	height: 5rem;
	z-index: 999;
	background-color: ${props => (props.stuck ? '#322' : '#411')};
`;
const Wrapper = styled.div`
	background-color: #000;
`;
const Tab = styled.p`
	${({ selected }) => selected && `
		border-bottom: 1px dotted blue;
	`}
`;
const SiteTitle = styled.h1`
	${Style.BlockHidden()}
`;
const AppHeaderSearchTitleSecondaryNav = ({ hData, sData, dispatch }) => {
	const screenTitle = sData.screens[sData.s].title;
	const partialScreenKeysArray = Object.keys(sData.screens[sData.s].partials);
	const selectedPartialScreen = sData.p;
	return (
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
				<SiteTitle>The Hub</SiteTitle>
				<h2>{screenTitle}</h2>
				
				{
					partialScreenKeysArray.map(keyValue => (
						<Tab
							selected={keyValue === selectedPartialScreen}
							key={keyValue}
						>
							{sData.screens[sData.s].partials[keyValue].title}
						</Tab>
					))
				}
			</Wrapper>
		</Sticky>
	);
};

export default connect(state => state)(AppHeaderSearchTitleSecondaryNav);
