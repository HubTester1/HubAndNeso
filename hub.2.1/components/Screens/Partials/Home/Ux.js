
import { connect } from 'react-redux';
import Plane from '../../../Ingredients/Plane/Plane';
import Button from '../../../Ingredients/Button/Button';

const UX = ({ uData }) => (
	<div>
		<Button
			elevationLevel="4"
			backgroundColor="ux-pink"
			contentColor="blue-5"
			heightInRem="5"
			widthInRem="20"
			paddingInRem="1"
			interactive
			text="Button Text Here"
		/>
		<p>This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. </p>
	</div>
);

export default connect(state => state)(UX);
