
/* eslint-disable react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';

import Hamburger from '../Hamburger/Hamburger';
import BrandLogoOnlyH1Link from '../Brands/BrandLogoOnlyH1Link';
import BrandHorizontalH1Link from '../Brands/BrandHorizontalH1Link';
import HcNavLarge from '../HcNavLarge/HcNavLarge';

import './HcHeader.sass';
import './HcHeaderSmall.sass';
import './HcHeaderLarge.sass';

// ----- COMPONENT

export default class HcHeader extends React.Component {
	render() {
		return (
			<header id="hc-header" className="mos-react-component-root">
				{
					this.props.headerType === 'small' &&

					<div>
						<Hamburger />
						<BrandLogoOnlyH1Link />
					</div>
				}
				{
					this.props.headerType === 'large' &&

					<div>
						<BrandHorizontalH1Link />
						<HcNavLarge />
					</div>
				}
			</header>
		);
	}
}
