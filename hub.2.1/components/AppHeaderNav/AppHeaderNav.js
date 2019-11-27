/* eslint-disable  react/react-in-jsx-scope */

import Link from 'next/link';
import styled from 'styled-components';
import StylePatterns from '../../services/StylePatterns';


const HeaderLarge = styled.div`
	position: fixed;
	left: 0;
	width: 20rem;
	height: 100%;
	z-index: 999;
	overflow-y: auto;
	background-color: #000;
`;
/* const BrandContainerLarge = styled.div`
	padding: 4rem 5rem 1rem 2rem;
`; */

const NavLarge = styled.nav`
	padding: 2rem;
`;

const NavLargeList = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
`;
const NavLargeListItem = styled.li`
	display: block;	
	list-style: none;
	position: relative;
	margin: 0;
	font-size: ${StylePatterns.FontSize('m', 'medium')};
	font-weight: ${StylePatterns.FontWeight('light')};
`;
const NavLargeLink = styled(Link)`
	display: block;
	padding: 1.9rem 0 1.9rem;
	border-bottom: 0;

	&:hover {
		border-bottom: 0;
	}

`;

const AppHeaderNav = props => (
	<header>
		{
			props.screenType === 'large' &&

			<HeaderLarge>
				{/* <BrandContainerLarge>
					<BrandLink
						to="/"
					>
						<Brand />
					</BrandLink>
				</BrandContainerLarge> */}
				{/* <HeaderLargeTagline>
					<p>Greater Boston</p>
					<p>
						<a href={ProfileBrief}>
							Profile Brief
									<Icon
								iconPosition="after"
								iconContent="cloud-download"
								iconSize="1.5"
							/>
						</a>

					</p>
				</HeaderLargeTagline> */}
				<NavLarge>
					<NavLargeList>
						<NavLargeListItem><NavLargeLink href="/"><a>The Hub</a></NavLargeLink></NavLargeListItem>
						<NavLargeListItem><NavLargeLink href="/news"><a>News</a></NavLargeLink></NavLargeListItem>
						<NavLargeListItem><NavLargeLink href="/classfieds"><a>Classfieds</a></NavLargeLink></NavLargeListItem>
						<NavLargeListItem><NavLargeLink href="/org"><a>Organization, Teams, & Staff</a></NavLargeLink></NavLargeListItem>
						<NavLargeListItem><NavLargeLink href="/around"><a>Around The Hub</a></NavLargeLink></NavLargeListItem>
					</NavLargeList>
					<NavLargeList>
						<NavLargeListItem><NavLargeLink href="/servicenow"><a>Help</a></NavLargeLink></NavLargeListItem>
						<NavLargeListItem><NavLargeLink href="/settings"><a>Settings</a></NavLargeLink></NavLargeListItem>
					</NavLargeList>
				</NavLarge>
			</HeaderLarge>
		}
	</header>
);

export default AppHeaderNav;
