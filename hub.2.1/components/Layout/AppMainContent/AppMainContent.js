
// Primary purpose: show specified screen

// import styled from 'styled-components';
import { connect } from 'react-redux';
import Utilities from '../../../services/Utilities';
import * as ScreenRegistry from '../../Screens/ScreenRegistry';

/* const MainContainer = styled.main`
	${props => props.screenType === 'small' && `
		margin-bottom: 12rem;
	`}
`; */

const AppMainContent = ({ screenType, sData }) => {
	// all screens are imported as ScreenRegistry, above; create component equal to the
	// 		screen component specified in sData; render said component below
	const SelectedScreen = ScreenRegistry[Utilities.ReturnStringWithInitialCapital(sData.s)];
	return (<SelectedScreen screenType />);
};

export default connect(state => state)(AppMainContent);
