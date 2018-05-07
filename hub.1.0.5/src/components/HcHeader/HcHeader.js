
/* eslint-disable react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';
import MediaQuery from 'react-responsive';

import ScreenSizes from '../../services/ScreenSizes';

import Hamburger from '../Hamburger/Hamburger';
import BrandHorizontalH1Link from '../Brands/BrandHorizontalH1Link';
import HcNavLarge from '../HcNavLarge/HcNavLarge';

import './HcHeader.sass';
import './HcHeaderSmall.sass';
import './HcHeaderLarge.sass';

// ----- COMPONENT

export default class HcHeader extends React.Component {
	render() {
		return (
			<header className="hc-header mos-react-component-root">
				<MediaQuery maxDeviceWidth={ScreenSizes.ReturnSmallMax()}>
					<Hamburger />
				</MediaQuery>
				<BrandHorizontalH1Link />
				<MediaQuery minDeviceWidth={ScreenSizes.ReturnMediumMin()}>
					<HcNavLarge />
				</MediaQuery>
			</header>
		);
	}
}
