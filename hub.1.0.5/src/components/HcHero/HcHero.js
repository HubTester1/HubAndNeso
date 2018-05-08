
// ----- IMPORTS

import * as React from 'react';
import HcStaffLookup from '../HcStaffLookup/HcStaffLookup';
import HcMessages from '../HcMessages/HcMessages';


import './HcHero.sass';
import './HcHeroSmall.sass';
import './HcHeroMediumLarge.sass';

// ----- COMPONENT

const HcHero = props => (
	<div id="hero-container">
		<HcStaffLookup />
		{
			props.heroType === 'large' &&

			<HcMessages
				uData={props.uData}
				allOrTop="top"
			/>
		}
	</div>
);

export default HcHero;
