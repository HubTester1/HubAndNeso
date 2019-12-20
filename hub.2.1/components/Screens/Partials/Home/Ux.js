
import { connect } from 'react-redux';
import styled from 'styled-components';
import Style from '../../../../services/Style';

const Container = styled.div`
	padding: 2rem;
	background-color: ${props => (Style.Color(props.colorToken, props.darkMode))};
`;

const UX = ({ uData }) => (
	<div>
		<Container
			colorToken="ux-l-1"
			darkMode={uData.user.preferences.darkMode}
		>
			Level 1
		</Container>
	</div>
);

export default connect(state => state)(UX);
