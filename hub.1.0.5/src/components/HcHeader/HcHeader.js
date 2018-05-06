
// ----- IMPORTS

import * as React from 'react';
import MediaQuery from 'react-responsive';

import ScreenSizes from '../../services/ScreenSizes';

import BrandHorizontal from '../Brands/BrandHorizontal';
import HcTopCommandBar from '../HcTopCommandBar/HcTopCommandBar';

// ----- COMPONENT

const HcHeader = props => (
	<header id="hc-header" className="mos-react-component-root">
		<div id="brand-container">
			<a id="brand-link" href="/">
				<h1 id="brand-header">
					<span className="brand-text">The Hub</span>
					<BrandHorizontal
						textColor="#fff"
					/>
				</h1>
			</a>
		</div>
		<MediaQuery maxDeviceWidth={ScreenSizes.ReturnSmallMax()}>
			<p>Hamburger</p>
		</MediaQuery>
		<MediaQuery minDeviceWidth={ScreenSizes.ReturnMediumMin()}>
			<HcTopCommandBar />
		</MediaQuery>
	</header>
);

export default HcHeader;
