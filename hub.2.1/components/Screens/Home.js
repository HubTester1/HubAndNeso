
import { connect } from 'react-redux';
import Utilities from '../../services/Utilities';
import * as PartialScreenRegistry from '../PartialScreens/Home/HomeRegistry';

const PartialScreen = ({ screenType, sData }) => {
	// all partial screens are imported as PartialScreenRegistry, above; create component equal
	// 		to the partial screen component specified in sData; render said component below
	const SelectedPartialScreen = 
		PartialScreenRegistry[Utilities.ReturnStringWithInitialCapital(sData.p)];
	return (<SelectedPartialScreen screenType />);
};

export default connect(state => state)(PartialScreen);
