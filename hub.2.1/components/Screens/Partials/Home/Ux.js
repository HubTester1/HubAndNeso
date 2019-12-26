
import { connect } from 'react-redux';
import Plane from '../../../Ingredients/Plane/Plane';
import Button from '../../../Ingredients/Button/Button';

const UX = ({ uData }) => (
	<Plane
		paddingInRem="2"
		elevationLevel="2"
	>
		<Button
			elevationLevel="4"
			backgroundColor="ux-pink"
			contentColor="blue-grey-5"
			heightInRem="5"
			widthInRem="17"
			marginInRem="2"
			interactive
			text="Button Text Here"
			iconContent="Messages"
			iconPosition="after"
		/>
		<Plane
			paddingInRem="2"
			elevationLevel="4"
			marginInRem="2"
		>
			This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button.
		</Plane>
		<Plane
			paddingInRem="2"
			elevationLevel="16"
			marginInRem="2"
		>
			This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button. This is a paragraph under the button.
		</Plane>
	</Plane>
);

export default connect(state => state)(UX);
