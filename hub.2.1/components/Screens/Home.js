
import { connect } from 'react-redux';
import Utilities from '../../services/Utilities';
import * as PartialScreenRegistry from '../PartialScreens/Home/HomeRegistry';

const screenKey = 'Home';

const PartialScreen = ({ screenType, sData }) => {
	// all partial screens are imported as PartialScreenRegistry, above; create component equal
	// 		to the partial screen component specified in sData; render said component below
	const selctedPartialScreenName = sData.p ?
		Utilities.ReturnStringWithInitialCapital(sData.p) :
		sData.screens[screenKey].defaultPartial;
	const SelectedPartialScreen = PartialScreenRegistry[selctedPartialScreenName];
	return (<SelectedPartialScreen screenType />);
};

export default connect(state => state)(PartialScreen);
