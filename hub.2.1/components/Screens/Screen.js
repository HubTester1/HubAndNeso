
import { connect } from 'react-redux';
import Utilities from '../../services/Utilities';
import * as PartialScreenRegistry from './Partials/Registry';

const Screen = ({ sData }) => {
	// all partial screens are imported as PartialScreenRegistry, above; create component equal
	// 		to the partial screen component specified in sData; render said component below
	const SelectedPartialScreen =
		PartialScreenRegistry[Utilities.ReturnStringWithInitialCapital(sData.p)];
	return (<SelectedPartialScreen />);
};

export default connect(state => state)(Screen);
