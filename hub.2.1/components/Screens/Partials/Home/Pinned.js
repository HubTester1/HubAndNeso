/**
 * @name Partial Screen - Pinned
 * @component
 * @category Components - Screens
 * @description Must document upon completion. Connected to Redux store.
 * @returns {Component} &lt;Pinned />
 *
 * @todo params, types, required or optional
 * @todo document upon completion
 */

import { connect } from 'react-redux';
import { ReturnPartialScreenTitle } from '../../../../services/State/Selectors';
import PartialScreenHeader from '../Common/PartialScreenHeader';

const Pinned = ({ partialScreenTitle }) => (
	<div>
		<PartialScreenHeader
			title={partialScreenTitle}
		/>
		Pinned partial screen
	</div>
);

const mapStateToProps = state => ({ 
	partialScreenTitle: ReturnPartialScreenTitle(state) 
});

export default connect(
	mapStateToProps,
)(Pinned);
