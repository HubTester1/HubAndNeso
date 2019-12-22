
import { connect } from 'react-redux';
import Plane from '../../../../Ingredients/Plane/Plane';
import Button from '../../../../Ingredients/Button/Button';

const UX = ({ uData }) => (
	<Plane
		elevationLevel="0"
		heightInRem="30"
		paddingInRem="2"
	>
			Level 2, static
			
		<Button
			elevationLevel="4"
			backgroundColor="ux-pink"
			contentColor="blue-3"
			heightInRem="20"
			paddingInRem="2"
			interactive
		>
				Button Text Here
		</Button>
			

	</Plane>
);

export default connect(state => state)(UX);
