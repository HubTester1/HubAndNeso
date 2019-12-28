

import { connect } from 'react-redux';
import { ReturnPartialScreenTitle } from '../../../../services/State/Selectors';
import Plane from '../../../Ingredients/Plane/Plane';
import PartialScreenHeader from '../Common/PartialScreenHeader';
import Button from '../../../Ingredients/Button/Button';

const UX = ({ partialScreenTitle }) => (
	<Plane
		paddingInRem="2"
		elevationLevel="2"
	>
		<PartialScreenHeader
			title={partialScreenTitle}
		/>
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

const mapStateToProps = state => ({
	partialScreenTitle: ReturnPartialScreenTitle(state)
});

export default connect(
	mapStateToProps,
)(UX);
