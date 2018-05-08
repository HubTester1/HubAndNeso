
/* eslint-disable react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';

import Hamburger from '../Hamburger/Hamburger';
import BrandLogoOnlyH1Link from '../Brands/BrandLogoOnlyH1Link';

import './HcHeaderSmall.sass';

// ----- COMPONENT

export default class HcHeaderSmall extends React.Component {
	render() {
		return (
			<header id="hc-header--small-screen" className="hc-header--small-screen mos-react-component-root">
				<Hamburger />
				<BrandLogoOnlyH1Link />
			</header>
		);
	}
}
