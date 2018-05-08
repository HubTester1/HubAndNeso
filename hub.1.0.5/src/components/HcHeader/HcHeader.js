
/* eslint-disable react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';

import Hamburger from '../Hamburger/Hamburger';
import BrandLogoOnlyH1Link from '../Brands/BrandLogoOnlyH1Link';
import BrandHorizontalH1Link from '../Brands/BrandHorizontalH1Link';
import HcNav from '../HcNav/HcNav';

import './HcHeader.sass';
import './HcHeaderSmall.sass';
import './HcHeaderMediumLarge.sass';

// ----- COMPONENT

export default class HcHeader extends React.Component {
	render() {
		return (
			<header 
				id="hc-header" 
				className="mos-react-component-root"
			>
				{
					this.props.headerType === 'small' &&

					<div id="hamburger-and-brand-container">
						<Hamburger
							showSmallNav={this.props.handleHamburgerClick}
						/>
						<BrandLogoOnlyH1Link />
						{/* {
							this.props.showSmallNav && */}

						<HcNav
							navType="small"
						/>
						{/* } */}
					</div>
				}
				{
					this.props.headerType === 'large' &&

					<div>
						<BrandHorizontalH1Link />
						<HcNav
							navType="large"
						/>
					</div>
				}
			</header>
		);
	}
}
