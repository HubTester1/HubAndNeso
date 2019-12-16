
// Primary purpose: search and h1 and partial screen tabs (secondary nav) header

import { connect } from 'react-redux';
import Sticky from 'react-sticky-el';
import styled from 'styled-components';
import Style from '../../../services/Style';

const Wrapper = styled.div`
	background-color: ${props => (Style.Color('interface2', props.darkMode))};
`;
const Header = styled.header`
	height: 5rem;
	z-index: 999;
`;
const Tab = styled.p`
	${({ selected }) => selected && `
		border-bottom: ${props => (Style.Color('interface1', props.darkMode))};
	`}
`;
const ScreenTitleElement = styled.h2.attrs(props => ({
	role: 'heading',
	'aria-level': '2',
}))``;
const SearchTitleSecondaryNav = ({
	hData,
	sData,
	uData,
	dispatch,
}) => {
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
			<Wrapper
				darkMode={uData.user.preferences.darkMode}
			>
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
				<ScreenTitleElement>{screenTitle}</ScreenTitleElement>
				<nav role="navigation">
					{
						partialScreenKeysArray.map(keyValue => (
							<Tab
								selected={keyValue === selectedPartialScreen}
								key={keyValue}
								darkMode={uData.user.preferences.darkMode}
							>
								{sData.screens[sData.s].partials[keyValue].title}
							</Tab>
						))
					}
				</nav>
			</Wrapper>
		</Sticky>
	);
};

export default connect(state => state)(SearchTitleSecondaryNav);
