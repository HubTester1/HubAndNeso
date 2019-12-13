
// Primary purpose: navigational header

import Link from 'next/link';
import styled from 'styled-components';
import Style from '../../../services/Style';

import Icon from '../../Ingredients/Icon/Icon.Pres';
import Button from '../../Ingredients/Button/Button.Pres';

const Header = styled.header`
	${props => props.screenType !== 'small' && `
		height: 100%;
		width: 6.8rem;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		overflow-x: hidden;
	`}
	${props => props.screenType === 'small' && `
		grid-area: bottom;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
	`}
	z-index: 999;
	background-color: #003;
`;
const SiteTitleElement = styled.h1.attrs(props => ({
	role: 'heading',
	'aria-level': '1',
}))`
	${Style.BlockHidden()}
`;
const Nav = styled.nav`
	padding: 2rem;
`;
const NavList = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
`;
const NavListItem = styled.li`
	display: block;	
	list-style: none;
	position: relative;
	margin: 0;
	font-size: ${Style.FontSize('m', 'medium')};
	font-weight: ${Style.FontWeight('light')};
`;
const AppHeaderPrimaryNav = ({ screenType }) => (
	<Header
		screenType={screenType}
		role="banner"
	>
		<SiteTitleElement>The Hub</SiteTitleElement>
		<Nav
			role="navigation"
		>
			<NavList>
				<NavListItem>
					<Button
						buttonHeight="3"
						iconPosition="before"
						iconContent="tachometer"
						contentHeight="2.2"
						text="The Hub"
						textInvisible={screenType === 'small'}
						defaultBackgroundColor="transparent"
						defaultContentColor={Style.Color('red5')}
						activeBackgroundColor="transparent"
						activeContentColor={Style.Color('red3')}
						clickHandler={null}
					/>
				</NavListItem>
				<NavListItem>
					<Link href="/news">
						<a>News</a>
					</Link>
				</NavListItem>
				<NavListItem>
					<Link href="/classfieds">
						<a>Classfieds</a>
					</Link>
				</NavListItem>
				<NavListItem>
					<Link href="/org">
						<a>Organization, Teams, & Staff</a>
					</Link>
				</NavListItem>
				<NavListItem>
					<Link href="/around">
						<a>Around The Hub</a>
					</Link>
				</NavListItem>
			</NavList>
		</Nav>
	</Header>
);

export default AppHeaderPrimaryNav;
