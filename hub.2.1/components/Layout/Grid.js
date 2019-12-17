
// Primary purpose: layout of headers and ScreenContainer content

import styled from 'styled-components';
import PrimaryNav from '../Headers/PrimaryNav/PrimaryNav';
import SearchTitleSecondaryNav from '../Headers/SearchTitleSecondaryNav/SearchTitleSecondaryNav';
import Screen from '../Screens/Screen';

const GridContainer = styled.div`
	${props => props.screenSize === 'small' && `
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 10rem auto 10rem;
		grid-template-areas:	"top"
								"mid"
								"bottom";
	`}
`;
const SearchTitleSecondaryNavAndMainContainer = styled.main`
	${props => props.screenSize !== 'small' && `
		margin-left: 6.8rem;
	`}
`;
const Grid = ({ screenSize }) => (
	<GridContainer>
		<PrimaryNav />
		<SearchTitleSecondaryNavAndMainContainer
			screenSize={screenSize}
			role="main"
		>
			<SearchTitleSecondaryNav />
			<Screen />
		</SearchTitleSecondaryNavAndMainContainer>
	</GridContainer>
);

export default Grid;
