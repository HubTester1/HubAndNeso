/* eslint-disable  react/react-in-jsx-scope */

import Link from 'next/link';
import styled from 'styled-components';
import StylePatterns from '../../services/StylePatterns';


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
	`}
	z-index: 999;
	background-color: #003;

`;

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

const AppHeaderNav = props => (
	<Header
		screenType={props.screenType}
	>
		<NavLarge>
			<NavLargeList>
				<NavLargeListItem>
					<Link href="/">
						<a>The Hub</a>
					</Link>
				</NavLargeListItem>
				<NavLargeListItem>
					<Link href="/news">
						<a>News</a>
					</Link>
				</NavLargeListItem>
				<NavLargeListItem>
					<Link href="/classfieds">
						<a>Classfieds</a>
					</Link>
				</NavLargeListItem>
				<NavLargeListItem>
					<Link href="/org">
						<a>Organization, Teams, & Staff</a>
					</Link>
				</NavLargeListItem>
				<NavLargeListItem>
					<Link href="/around">
						<a>Around The Hub</a>
					</Link>
				</NavLargeListItem>
			</NavLargeList>
		</NavLarge>
	</Header>
);

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


export default AppHeaderNav;
