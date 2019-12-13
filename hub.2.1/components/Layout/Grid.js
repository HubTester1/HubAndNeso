
// Primary purpose: layout of headers and ScreenContainer content

import styled from 'styled-components';
import PrimaryNav from '../Headers/PrimaryNav/PrimaryNav';
import SearchTitleSecondaryNav from '../Headers/SearchTitleSecondaryNav/SearchTitleSecondaryNav';
import Screen from '../Screens/Screen';

const GridContainer = styled.div`
	${props => props.screenType === 'small' && `
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 10rem auto 10rem;
		grid-template-areas:	"top"
								"mid"
								"bottom";
	`}
`;
const SearchTitleSecondaryNavAndMainContainer = styled.main.attrs({
	role: 'main',
})`${props => props.screenType !== 'small' && `
		margin-left: 6.8rem;
	`}
`;
const Grid = props => (
	<GridContainer>
		<PrimaryNav
			screenType={props.screenType}
		/>
		<SearchTitleSecondaryNavAndMainContainer
			screenType={props.screenType}
		>
			<SearchTitleSecondaryNav
				screenType={props.screenType}
			/>
			<Screen
				screenType={props.screenType}
			/>
		</SearchTitleSecondaryNavAndMainContainer>
	</GridContainer>
);

export default Grid;
