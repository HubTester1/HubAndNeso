
import { connect } from 'react-redux';
import Plane from '../../../Ingredients/Plane/Plane';

const UX = ({ uData }) => (
	<Plane
		elevationLevel="2"
		heightInRem="30"
		paddingInRem="2"
	>
			Level 2, static
			
		<Plane
			elevationLevel="4"
			// backgroundColor="ux-pink"
			// contentColor="blue-3"
			heightInRem="20"
			paddingInRem="2"
			interactive
		>
				Level 4, interactive
			{/* <Plane
				elevationLevel="6"
				// backgroundColor="ux-pink"
				// contentColor="blue-4"
			>
					Level 5
					
			</Plane> */}
		</Plane>
			

	</Plane>
);

export default connect(state => state)(UX);
