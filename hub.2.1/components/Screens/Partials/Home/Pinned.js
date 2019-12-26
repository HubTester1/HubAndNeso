/**
 * @name Partial Screen - Pinned
 * @component
 * @category Components - Screens
 * @description Must document upon completion. Connected to Redux store.
 * @returns {Component} &lt;Pinned />
 *
 * @todo mapStateToProps
 * @todo mapDispatchToProps
 * @todo params, types, required or optional
 * @todo document upon completion
 */


import { connect } from 'react-redux';
import PartialScreenHeader from '../Common/PartialScreenHeader';

const Pinned = ({ sData }) => (
	<div>
		<PartialScreenHeader
			title={sData.screens[sData.s].partials[sData.p].title}
		/>
		Pinned partial screen
	</div>
);

export default connect(state => state)(Pinned);
