
// Primary purpose: layout of headers and main content

import styled from 'styled-components';
import AppHeaderSearchTitleSecondaryNav from '../AppHeaderSearchTitleSecondaryNav/AppHeaderSearchTitleSecondaryNav';
import AppHeaderPrimaryNav from '../AppHeaderPrimaryNav/AppHeaderPrimaryNav';
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
const AppHeaderSearchTitleSecondaryNavAndMainContainer = styled.div`
	${props => props.screenType !== 'small' && `
		margin-left: 6.8rem;
	`}
`;
const AppGrid = props => (
	<GridContainer>
		<AppHeaderPrimaryNav
			screenType={props.screenType}
		/>
		<AppHeaderSearchTitleSecondaryNavAndMainContainer
			screenType={props.screenType}
		>
			<AppHeaderSearchTitleSecondaryNav
				screenType={props.screenType}
			/>
			<AppMainContent
				screenType={props.screenType}
			/>
		</AppHeaderSearchTitleSecondaryNavAndMainContainer>
	</GridContainer>
);

export default AppGrid;
