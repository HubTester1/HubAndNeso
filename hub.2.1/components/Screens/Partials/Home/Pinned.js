
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
