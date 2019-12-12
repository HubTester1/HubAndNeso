
// ----- IMPORTS

import styled from 'styled-components';
import AppHeaderSearch from '../AppHeaderSearch/AppHeaderSearch';
import AppHeaderNav from '../AppHeaderNav/AppHeaderNav';
import AppMainContent from '../AppMainContent/AppMainContent';

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
const AppHeaderSearchAndMainContainer = styled.div`
	${props => props.screenType !== 'small' && `
		margin-left: 6.8rem;
	`}
`;
const AppGrid = props => (
	<GridContainer>
		<AppHeaderNav
			screenType={props.screenType}
		/>
		<AppHeaderSearchAndMainContainer
			screenType={props.screenType}
		>
			<AppHeaderSearch
				screenType={props.screenType}
			/>
			<AppMainContent
				screenType={props.screenType}
				title={props.title}
			>
				{props.content}
			</AppMainContent>
		</AppHeaderSearchAndMainContainer>
	</GridContainer>
);

export default AppGrid;
