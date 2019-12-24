
import { connect } from 'react-redux';
import Plane from '../../../Ingredients/Plane/Plane';
import Button from '../../../Ingredients/Button/Button';

const UX = ({ uData }) => (
	<Button
		elevationLevel="4"
		backgroundColor="ux-pink"
		contentColor="blue-3"
		heightInRem="5"
		paddingInRem="1"
		interactive
		text="Button Text Here"
	/>
);

export default connect(state => state)(UX);
