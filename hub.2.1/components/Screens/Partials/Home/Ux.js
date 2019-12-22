
import { connect } from 'react-redux';
import Plane from '../../../Ingredients/Plane/Plane';

const UX = ({ uData }) => (
	<div>
		<Plane
			elevation="1"
			backgroundColor="ux-pink"
			contentColor="ux-yellow"
		>
			Level 0, filling container
			
			<Plane
				elevation="3"
				backgroundColor="ux-pink"
				contentColor="ux-yellow"
				interactive
			>
				Level 1
				<Plane
					elevation="5"
					backgroundColor="ux-pink"
					contentColor="ux-yellow"
				>
					Level 5
					
				</Plane>
			</Plane>
			

		</Plane>
		{/* <Plane
			colorToken="ux-l-2"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-8"
		>
			Level 2
		</Plane>
		<Plane
			colorToken="ux-l-3"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-9"
		>
			Level 2
		</Plane>
		<Plane
			colorToken="ux-l-4"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-1"
		>
			Level 4
		</Plane>
		<Plane
			colorToken="ux-l-5"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-1"
		>
			Level 5
		</Plane>
		<Plane
			colorToken="ux-l-6"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-1"
		>
			Level c
		</Plane>
		<Plane
			colorToken="ux-l-7"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-1"
		>
			Level 6
		</Plane>
		<Plane
			colorToken="ux-l-8"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-1"
		>
			Level 8
		</Plane>
		<Plane
			colorToken="ux-l-9"
			darkMode={uData.user.preferences.darkMode}
			shadowToken="ux-l-24"
		>
			Level 9
		</Plane> */}
		<br /><br /><br /><br /><br /><br />
	</div>
);

export default connect(state => state)(UX);
