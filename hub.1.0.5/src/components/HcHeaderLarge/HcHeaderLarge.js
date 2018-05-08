
/* eslint-disable react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';

import BrandHorizontalH1Link from '../Brands/BrandHorizontalH1Link';
import HcNavLarge from '../HcNavLarge/HcNavLarge';

import './HcHeaderLarge.sass';

// ----- COMPONENT

export default class HcHeader extends React.Component {
	render() {
		return (
			<header id="hc-header" className="mos-react-component-root">
				<BrandHorizontalH1Link />
				<HcNavLarge />
			</header>
		);
	}
}
