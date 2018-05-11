
// ----- IMPORTS

import * as React from 'react';
import HcStaffLookup from '../HcStaffLookup/HcStaffLookup';
import HcMessages from '../HcMessages/HcMessages';
import HcBkgrdInfo from '../HcBkgrdInfo/HcBkgrdInfo';


import './HcHero.sass';
import './HcHeroSmall.sass';
import './HcHeroMediumLarge.sass';

// ----- COMPONENT

const HcHero = props => (
	<div id="hero-container" className="mos-react-component-root">
		{
			props.heroType === 'large' &&

			<div id="staff-lookup-and-background-info-and-top-messages">
				<div id="staff-lookup-and-background-info">
					<HcStaffLookup />
					<HcBkgrdInfo />
				</div>
				<HcMessages
					uData={props.uData}
					allOrTop="top"
				/>
			</div>
		}
		{
			props.heroType === 'small' &&

			<div id="staff-lookup-and-background-info">
				<HcStaffLookup />
				<HcBkgrdInfo />
			</div>
		}
	</div>
);

export default HcHero;
