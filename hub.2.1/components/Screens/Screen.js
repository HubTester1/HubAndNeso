/**
 * @name Screen
 * @component
 * @category Components - Screens
 * @description Main content within app. Corresponds to "s" url param. Connected to Redux store.
 * @returns {Component} &lt;Screen />
 *
 * @todo params, types, required or optional
 */

import { connect } from 'react-redux';
import { ReturnPartialScreenKey } from '../../services/State/Selectors';
import Utilities from '../../services/Utilities';
import * as PartialScreenRegistry from './Partials/Registry';

const Screen = ({ p }) => {
	// all partial screens are imported as PartialScreenRegistry, above; create component equal
	// 		to the partial screen component specified in sData; render said component below
	const SelectedPartialScreen =
		PartialScreenRegistry[Utilities.ReturnStringWithInitialCapital(p)];
	return (<SelectedPartialScreen />);
};

const mapStateToProps = state => ({ p: ReturnPartialScreenKey(state)});

export default connect(
	mapStateToProps,
)(Screen);
